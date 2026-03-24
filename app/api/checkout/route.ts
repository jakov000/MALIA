import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy123", {
  apiVersion: "2026-02-25.clover", // Use latest API version
});

const checkoutSchema = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(4),
  guestAddress: z.string().min(5),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  room: z.string().min(2),
  guestCount: z.number().min(1),
  cartTotal: z.number().min(0),
  voucherCode: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.parse(body);

    let voucherId = null;
    let discountApplied = 0;

    // Fetch live Room Config from DB
    const roomConfig = await db.roomConfig.findUnique({
      where: { roomName: parsed.room }
    });

    if (!roomConfig) {
      return NextResponse.json({ error: "Room configuration not found." }, { status: 404 });
    }

    // Server-side validation
    const start = new Date(parsed.startDate);
    const end = new Date(parsed.endDate);
    const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights < roomConfig.minStayDays) {
      return NextResponse.json({ error: `Mindestaufenthalt nicht erreicht. Minimum: ${roomConfig.minStayDays} Nächte.` }, { status: 400 });
    }

    const noCheckoutDays = JSON.parse(roomConfig.noCheckoutDays);
    if (noCheckoutDays.includes(end.getDay())) {
      return NextResponse.json({ error: "Abreise an diesem Wochentag nicht erlaubt." }, { status: 400 });
    }

    // ----------------------------------------------------------------------
    // SERVER-SIDE AVAILABILITY & OVERLAP CHECK (Hierarchical Room Logic)
    // ----------------------------------------------------------------------
    const relatedRooms = parsed.room === "THE ALPINE HIDEAWAY" 
      ? ["THE ALPINE HIDEAWAY", "THE RESIDENCE", "THE RETREAT"]
      : (parsed.room === "THE RESIDENCE" 
          ? ["THE RESIDENCE", "THE ALPINE HIDEAWAY"] 
          : ["THE RETREAT", "THE ALPINE HIDEAWAY"]);

    const overlappingBooking = await db.booking.findFirst({
      where: {
        status: "PAID",
        room: { in: relatedRooms },
        startDate: { lt: end },
        endDate: { gt: start },
      }
    });

    if (overlappingBooking) {
      return NextResponse.json({ error: "Dieser Zeitraum ist leider in der Zwischenzeit gebucht worden." }, { status: 400 });
    }

    const overlappingBlock = await db.blockedDate.findFirst({
      where: {
        room: { in: ["ALL", ...relatedRooms] },
        startDate: { lt: end },
        endDate: { gt: start },
      }
    });

    if (overlappingBlock) {
      return NextResponse.json({ error: "Dieser Zeitraum ist aufgrund von Sperrungen nicht verfügbar." }, { status: 400 });
    }
    // ----------------------------------------------------------------------

    // Server-side price calculation override (never trust client)
    let finalTotal = nights * roomConfig.pricePerNight;

    // Optional: Validate Voucher again server-side before creating checkout
    if (parsed.voucherCode) {
      const voucher = await db.voucher.findUnique({
        where: { code: parsed.voucherCode }
      });

      if (voucher && voucher.isActive && voucher.currentBalance > 0) {
        if (!voucher.expiresAt || new Date(voucher.expiresAt) > new Date()) {
          voucherId = voucher.id;
          if (voucher.discountType === "PERCENTAGE") {
            discountApplied = finalTotal * (voucher.discountValue / 100);
          } else {
            discountApplied = Math.min(voucher.currentBalance, finalTotal);
          }
          finalTotal = Math.max(0, finalTotal - discountApplied);
        }
      }
    }

    // Convert to cents for Stripe
    const amountInCents = Math.round(finalTotal * 100);

    // If total is 0 (due to 100% voucher), we can bypass stripe or create a quick booking directly.
    // Assuming for now they still go through Stripe or we handle 0 later.
    if (amountInCents === 0) {
      // Direct booking logic could go here
      return NextResponse.json({ error: "Total is 0, direct booking not implemented in this route yet." }, { status: 400 });
    }

    // 1. Create a PENDING Booking in DB
    const booking = await db.booking.create({
      data: {
        guestName: parsed.guestName,
        guestEmail: parsed.guestEmail,
        guestPhone: parsed.guestPhone,
        guestAddress: parsed.guestAddress,
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
        room: parsed.room,
        guests: parsed.guestCount,
        totalPrice: finalTotal,
        status: "PENDING",
        voucherId,
        notes: parsed.notes,
        source: "DIRECT"
      }
    });

    // 2. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Malia - ${parsed.room}`,
              description: `${parsed.guestCount} Gäste, von ${new Date(parsed.startDate).toLocaleDateString()} bis ${new Date(parsed.endDate).toLocaleDateString()}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking?canceled=true`,
      customer_email: parsed.guestEmail,
      metadata: {
        bookingId: booking.id, // Important for webhook to link payment to DB
        voucherId: voucherId || "",
        discountApplied: discountApplied.toString(),
      },
    });

    // Update booking with the stripe session id for tracking
    await db.booking.update({
      where: { id: booking.id },
      data: { stripeId: session.id },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { z } from "zod";
import { calculateStayPrice, type PricingResult } from "@/lib/pricing";
import { ruleBlocksNight, stayNights, staysOverlap } from "@/lib/stay-dates";
import { findOffer, offerStayAllowed } from "@/lib/offers";

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
  offer: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.parse(body);

    // Erlebnisangebot (Paket): Einheit, Dauer, Personen und Termin müssen passen,
    // der Preis kommt ausschließlich aus lib/offers.ts.
    const offer = parsed.offer ? findOffer(parsed.offer) : undefined;
    if (parsed.offer && !offer) {
      return NextResponse.json({ error: "Dieses Angebot gibt es nicht." }, { status: 400 });
    }

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
    // Add CalendarRule fetching
    const calendarRules = await db.calendarRule.findMany({
      where: {
        room: parsed.room,
        startDate: { lte: end },
        endDate: { gte: start }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Determine the active minimum stay for the check-in night
    let activeMinStay = roomConfig.minStayDays;
    const checkInNightRules = calendarRules.filter(r => {
      const ruleStart = new Date(r.startDate);
      ruleStart.setHours(0,0,0,0);
      const ruleEnd = new Date(r.endDate);
      ruleEnd.setHours(23,59,59,999);
      return start.getTime() >= ruleStart.getTime() && start.getTime() <= ruleEnd.getTime();
    });
    for (const rule of checkInNightRules) {
      if (rule.minStay !== null) activeMinStay = rule.minStay;
    }

    if (offer) {
      if (parsed.room !== offer.room) {
        return NextResponse.json({ error: "Dieses Angebot gilt für eine andere Einheit." }, { status: 400 });
      }
      if (parsed.guestCount > offer.maxGuests) {
        return NextResponse.json({ error: `Dieses Angebot gilt für bis zu ${offer.maxGuests} Personen.` }, { status: 400 });
      }
      if (!offerStayAllowed(offer, stayNights(start, end))) {
        return NextResponse.json({ error: "Dieser Termin ist für das Angebot nicht buchbar." }, { status: 400 });
      }
    }

    // Pakete haben ihre feste Dauer; der Mindestaufenthalt gilt nur für normale Buchungen.
    if (!offer && nights < activeMinStay) {
      return NextResponse.json({ error: `Mindestaufenthalt nicht erreicht. Minimum am Anreisetag: ${activeMinStay} Nächte.` }, { status: 400 });
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

    // Die Datenbank liefert nur Kandidaten (einen Tag Puffer je Seite), ob sie sich
    // wirklich überschneiden, entscheidet staysOverlap auf Kalendertagen - sonst
    // blockiert eine iCal-Sperre mit Abreise 12:00 die Anreise am selben Tag.
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const candidateWindow = {
      startDate: { lt: new Date(end.getTime() + ONE_DAY) },
      endDate: { gt: new Date(start.getTime() - ONE_DAY) },
    };
    const requestedStay = { startDate: start, endDate: end };

    // Eigene Sperren aus dem Admin-Kalender (Eigenbelegung, Geschlossen, Nicht
    // verfügbar) - nicht nur der Kalender im Browser darf sie durchsetzen. Alle
    // Regeln der Einheiten laden, nicht nur sperrende: Eine jüngere "Verfügbar"-
    // Regel hebt eine ältere Sperre auf, genau wie im Buchungskalender.
    const ruleCandidates = await db.calendarRule.findMany({
      where: {
        room: { in: ["ALL", ...relatedRooms] },
        startDate: { lte: new Date(end.getTime() + ONE_DAY) },
        endDate: { gte: new Date(start.getTime() - ONE_DAY) },
      },
      orderBy: { createdAt: 'asc' },
      select: { room: true, status: true, startDate: true, endDate: true },
    });

    const blockedByRule = stayNights(start, end).some(night =>
      relatedRooms.some(room => ruleBlocksNight(ruleCandidates, room, night))
    );

    if (blockedByRule) {
      return NextResponse.json({ error: "Dieser Zeitraum ist leider nicht verfügbar." }, { status: 400 });
    }

    const bookingCandidates = await db.booking.findMany({
      where: {
        status: "PAID",
        room: { in: relatedRooms },
        ...candidateWindow,
      },
      select: { startDate: true, endDate: true },
    });

    if (bookingCandidates.some(b => staysOverlap(b, requestedStay))) {
      return NextResponse.json({ error: "Dieser Zeitraum ist leider in der Zwischenzeit gebucht worden." }, { status: 400 });
    }

    const blockCandidates = await db.blockedDate.findMany({
      where: {
        room: { in: ["ALL", ...relatedRooms] },
        ...candidateWindow,
      },
      select: { startDate: true, endDate: true },
    });

    if (blockCandidates.some(b => staysOverlap(b, requestedStay))) {
      return NextResponse.json({ error: "Dieser Zeitraum ist aufgrund von Sperrungen nicht verfügbar." }, { status: 400 });
    }
    // ----------------------------------------------------------------------

    // Server-side price calculation override (never trust client)
    const pricing: PricingResult = offer
      ? { nights: offer.nights, basePrice: offer.price, discount: 0, total: offer.price, appliedSpecial: null }
      : calculateStayPrice(start, end, roomConfig.pricePerNight, calendarRules);
    let finalTotal = pricing.total;
    let specialDiscount = pricing.discount;

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
        source: "DIRECT",
        offer: offer?.slug ?? null,
      }
    });

    // 2. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: offer ? `Malia - ${offer.title.de} (${parsed.room})` : `Malia - ${parsed.room}`,
              description: `${parsed.guestCount} Gäste, von ${new Date(parsed.startDate).toLocaleDateString()} bis ${new Date(parsed.endDate).toLocaleDateString()}${offer ? ", inkl. Endreinigung und Kurtaxe" : ""}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking?canceled=true${offer ? `&angebot=${offer.slug}` : ""}`,
      customer_email: parsed.guestEmail,
      metadata: {
        bookingId: booking.id, // Important for webhook to link payment to DB
        voucherId: voucherId || "",
        discountApplied: (discountApplied + specialDiscount).toString(),
        specialApplied: pricing.appliedSpecial || "",
        offer: offer?.slug ?? "",
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

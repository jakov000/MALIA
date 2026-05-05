import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/mail";
import { generateInvoicePdf } from "@/lib/invoice";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy123", {
  apiVersion: "2026-02-25.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const bookingId = session.metadata?.bookingId;
      const voucherId = session.metadata?.voucherId;
      const discountAppliedStr = session.metadata?.discountApplied;
      const discountApplied = discountAppliedStr ? parseFloat(discountAppliedStr) : 0;

      if (bookingId) {
        // 1. Mark booking as PAID
        const booking = await db.booking.update({
          where: { id: bookingId },
          data: { status: "PAID" },
        });

        // 2. Reduce voucher balance if a voucher was used
        if (voucherId && discountApplied > 0) {
          const voucher = await db.voucher.findUnique({ where: { id: voucherId } });
          if (voucher) {
            await db.voucher.update({
              where: { id: voucherId },
              data: {
                currentBalance: Math.max(0, voucher.currentBalance - discountApplied),
              },
            });
          }
        }

        // 3. Send Confirmation Emails
        let invoicePdfBuffer = undefined;
        try {
          // Calculate sequential invoice number based on PAID bookings up to this one
          const paidCount = await db.booking.count({
            where: {
              status: "PAID",
              createdAt: { lte: booking.createdAt }
            }
          });
          const invoiceNumberStr = `RE-${new Date().getFullYear()}-${String(paidCount).padStart(3, "0")}`;
          
          invoicePdfBuffer = await generateInvoicePdf(booking, invoiceNumberStr);
        } catch (e) {
          console.error("Failed to generate custom invoice PDF:", e);
        }

        await sendBookingConfirmation(booking.guestEmail, booking.guestName, booking.startDate, booking.endDate, invoicePdfBuffer);
        await sendAdminNotification(booking);
        
        console.log(`Payment successful for booking ${bookingId}. Emails dispatched.`);
      }
      break;
    }
    // Handle other events like payment_failed if necessary
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}

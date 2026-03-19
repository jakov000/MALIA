import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";

// Zod validation schemas
const createBookingSchema = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  totalPrice: z.number().min(0),
  notes: z.string().optional(),
});

// GET fetching all bookings for Admin Dashboard
export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const bookings = await db.booking.findMany({
      where: status ? { status: status.toUpperCase() } : undefined,
      orderBy: { startDate: 'asc' }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Fetch Bookings Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST manually create a booking (Admin only)
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createBookingSchema.parse(body);

    const booking = await db.booking.create({
      data: {
        guestName: parsed.guestName,
        guestEmail: parsed.guestEmail,
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
        totalPrice: Number(parsed.totalPrice),
        notes: parsed.notes,
        status: "PAID",
        source: "DIRECT"
      }
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
    console.error("Create Booking Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

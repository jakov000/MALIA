import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { parseISO, startOfDay, endOfDay } from "date-fns";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const room = searchParams.get("room") || "THE ALPINE HIDEAWAY";
  
  // We fetch a 8 year window (-3 years, +5 years) 
  // so the user can freely scroll backwards and forwards in the UI without missing data.
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 3);
  startDate.setMonth(0, 1);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 8);

  try {
    // 1. Fetch CalendarRules
    const rules = await db.calendarRule.findMany({
      where: {
        room: room,
        startDate: { lte: endDate },
        endDate: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' } // Older rules first, newer rules override later
    });

    // 2. Fetch iCal BlockedDates (Airbnb, Booking, Feratel) for the selected room
    const blocks = await db.blockedDate.findMany({
      where: {
        room: { in: [room, "ALL"] },
        startDate: { lte: endDate },
        endDate: { gte: startDate }
      }
    });

    // 2.1 Fetch ALL iCal BlockedDates for the global list at the bottom
    const allBlocks = await db.blockedDate.findMany({
      where: {
        startDate: { lte: endDate },
        endDate: { gte: startDate }
      },
      orderBy: { startDate: 'desc' }
    });

    // 3. Fetch Actual Bookings
    const bookings = await db.booking.findMany({
      where: {
        room: room,
        status: { in: ['PAID', 'PENDING'] },
        startDate: { lte: endDate },
        endDate: { gte: startDate }
      }
    });

    // 4. Fetch ALL manually maintained CalendarRules across every room.
    // These are our OWN entries (Eigenbelegung, Sperren, Preis-/Mindestaufenthalt-Overrides).
    // They are listed globally - not just for the selected room - because a rule on
    // THE ALPINE HIDEAWAY also blocks THE RESIDENCE and THE RETREAT on the website.
    const allRules = await db.calendarRule.findMany({
      where: {
        NOT: { source: { in: ["AIRBNB", "BOOKING", "FERATEL"] } },
        startDate: { lte: endDate },
        endDate: { gte: startDate }
      },
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json({ rules, blocks, bookings, allBlocks, allRules });
  } catch (error) {
    console.error("Calendar GET error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { startDate, endDate, room, status, price, minStay } = body;

    if (!startDate || !endDate || !room) {
      return new NextResponse("Missing data", { status: 400 });
    }

    // We create a new overriding rule. 
    // In a fully-fledged PMS, you might split old rules, but trusting the 'createdAt' stack 
    // (newest rule wins for a given day) is safer and avoids fragmentation errors.
    const rule = await db.calendarRule.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        room,
        status: status || "AVAILABLE",
        price: price ? parseFloat(price) : null,
        minStay: minStay ? parseInt(minStay) : null,
        source: "MANUAL"
      }
    });

    return NextResponse.json({ success: true, rule });
  } catch (error) {
    console.error("Calendar POST error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

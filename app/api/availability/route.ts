import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const querySchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");

    if (!startParam || !endParam) {
      return NextResponse.json({ error: "Missing start or end date" }, { status: 400 });
    }

    const { start, end } = querySchema.parse({
      start: startParam,
      end: endParam,
    });

    const startDate = new Date(start);
    const endDate = new Date(end);

    // Get conflicting bookings (status = PAID)
    const bookings = await db.booking.findMany({
      where: {
        status: "PAID",
        OR: [
          {
            startDate: { lte: endDate },
            endDate: { gte: startDate },
          },
        ],
      },
      select: {
        startDate: true,
        endDate: true,
        room: true,
      },
    });

    // Get blocked dates (manual or iCal)
    const blockedDates = await db.blockedDate.findMany({
      where: {
        OR: [
          {
            startDate: { lte: endDate },
            endDate: { gte: startDate },
          },
        ],
      },
      select: {
        startDate: true,
        endDate: true,
        reason: true,
        room: true,
      },
    });

    return NextResponse.json({
      bookings,
      blockedDates,
      isAvailable: bookings.length === 0 && blockedDates.length === 0,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }
    console.error("Availability API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

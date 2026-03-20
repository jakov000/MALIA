import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";

const createBlockedSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  reason: z.string().optional(),
  room: z.string().optional(),
});

// GET all blocked dates
export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const blockedDates = await db.blockedDate.findMany({
      orderBy: { startDate: 'desc' }
    });

    return NextResponse.json(blockedDates);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST new manually blocked date
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { startDate, endDate, reason, room } = createBlockedSchema.parse(body);

    const blocked = await db.blockedDate.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        room: room || "ALL",
        source: "MANUAL",
      }
    });

    return NextResponse.json(blocked);
  } catch (error) {
     if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

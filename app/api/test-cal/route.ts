import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get("room") || "THE ALPINE HIDEAWAY";
  
  const blocks = await db.blockedDate.findMany({
    where: {
      room: { in: [room, "ALL"] }
    }
  });

  return NextResponse.json({ count: blocks.length, room, blocks });
}

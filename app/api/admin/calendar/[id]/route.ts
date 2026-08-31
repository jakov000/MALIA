import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

// Delete a manually created CalendarRule (Eigenbelegung, Sperre, Preis-Override)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;

    await db.calendarRule.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Calendar DELETE error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

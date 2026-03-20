import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    let configs = await db.roomConfig.findMany();
    
    // Seed default configs if they don't exist yet
    if (configs.length === 0) {
      const defaultSuites = [
        { roomName: "THE ALPINE HIDEAWAY", pricePerNight: 150 },
        { roomName: "THE RESIDENCE", pricePerNight: 120 },
        { roomName: "THE RETREAT", pricePerNight: 45 }
      ];
      
      await Promise.all(
        defaultSuites.map(suite => 
          db.roomConfig.create({
            data: {
              roomName: suite.roomName,
              pricePerNight: suite.pricePerNight,
              minStayDays: 1,
              noCheckoutDays: "[]"
            }
          })
        )
      );
      configs = await db.roomConfig.findMany();
    }
    
    return NextResponse.json(configs);
  } catch (error) {
    console.error("Error fetching room settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, pricePerNight, minStayDays, noCheckoutDays } = body;

    if (!id || pricePerNight === undefined || minStayDays === undefined || !noCheckoutDays) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updated = await db.roomConfig.update({
      where: { id },
      data: {
        pricePerNight,
        minStayDays,
        noCheckoutDays: JSON.stringify(noCheckoutDays) // Assume client sends array
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating room settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

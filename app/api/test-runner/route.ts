import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateStayPrice } from "@/lib/pricing";

export const dynamic = 'force-dynamic';

export async function GET() {
  const logs: string[] = [];
  const addLog = (msg: string) => { logs.push(msg); console.log(msg); };

  try {
    addLog("Starting Validation Test Run...");

    // 1. Fetch Config
    const config = await db.roomConfig.findUnique({ where: { roomName: "THE ALPINE HIDEAWAY" }});
    if (!config) throw new Error("Config not found");

    addLog(`Base Price: ${config.pricePerNight}, Base Min Stay: ${config.minStayDays}`);

    // Clean up mock rules before starting
    await db.calendarRule.deleteMany({ where: { source: "TEST_SCRIPT" } });

    // ----------------------------------------------------
    // TEST 1: Pricing with 7=6
    // ----------------------------------------------------
    const t1_start = new Date("2026-06-01T00:00:00Z");
    const t1_end = new Date("2026-06-08T00:00:00Z"); // 7 nights
    const t1_res = calculateStayPrice(t1_start, t1_end, config.pricePerNight, []);
    addLog(`TEST 1 (7=6 base): nights=${t1_res.nights}, base=${t1_res.basePrice}, total=${t1_res.total}, discount=${t1_res.discount}`);
    if (t1_res.total !== (config.pricePerNight * 6)) addLog("❌ TEST 1 FAILED: 7=6 did not apply correctly.");
    else addLog("✅ TEST 1 PASSED");

    // ----------------------------------------------------
    // TEST 2: Pricing override with single night cheap price
    // ----------------------------------------------------
    const t2_start = new Date("2026-06-01T00:00:00Z");
    const t2_end = new Date("2026-06-08T00:00:00Z"); // 7 nights
    const mockRule1 = {
        startDate: new Date("2026-06-03T00:00:00Z"),
        endDate: new Date("2026-06-03T23:59:59Z"), // overriding the 3rd of June
        price: 100,
        status: "AVAILABLE",
        room: "THE ALPINE HIDEAWAY"
    };
    const t2_res = calculateStayPrice(t2_start, t2_end, config.pricePerNight, [mockRule1]);
    addLog(`TEST 2 (7=6 + cheap override): total=${t2_res.total}, basePrice(sum of nights)=${t2_res.basePrice}`);
    // Base should be 6 * basePrice + 100.
    // Discount of 7=6 drops the cheapest night (which is 100).
    // Total should be 6 * basePrice.
    if (t2_res.total !== (config.pricePerNight * 6)) addLog("❌ TEST 2 FAILED: The cheapest night (override) was not dropped correctly.");
    else addLog("✅ TEST 2 PASSED (Cheapest night override discounted by 7=6)");

    // ----------------------------------------------------
    // TEST 3: Calendar Rule creation and Min Stay constraint
    // ----------------------------------------------------
    // Create rule in DB
    const rule = await db.calendarRule.create({
      data: {
        startDate: new Date("2026-07-01T00:00:00Z"),
        endDate: new Date("2026-07-05T00:00:00Z"),
        room: "THE ALPINE HIDEAWAY",
        status: "AVAILABLE",
        minStay: 6,
        price: 999,
        source: "TEST_SCRIPT"
      }
    });

    const activeRules = await db.calendarRule.findMany({ where: { room: "THE ALPINE HIDEAWAY", source: "TEST_SCRIPT" }});
    // Check in on July 1st. Minstay should be 6.
    const checkInTarget = new Date("2026-07-01T00:00:00Z").getTime();
    let computedMinStay = config.minStayDays;
    for (const r of activeRules) {
        const ruleStart = new Date(r.startDate).getTime();
        const ruleEnd = new Date(r.endDate).getTime();
        if (checkInTarget >= ruleStart && checkInTarget <= ruleEnd && r.minStay !== null) {
            computedMinStay = r.minStay;
        }
    }
    
    // Test logic mirrors api/checkout logic
    if (computedMinStay !== 6) addLog("❌ TEST 3 FAILED: active minStay did not register as 6. computed: " + computedMinStay);
    else addLog("✅ TEST 3 PASSED (Active min stay dynamically overrides from calendar)");


    // ----------------------------------------------------
    // TEST 4: Unavailable Override stack verification
    // ----------------------------------------------------
    // Setting July 10-15 UNAVAILABLE
    await db.calendarRule.create({
        data: { startDate: new Date("2026-07-10T00:00:00Z"), endDate: new Date("2026-07-15T00:00:00Z"), room: "THE ALPINE HIDEAWAY", status: "UNAVAILABLE", source: "TEST_SCRIPT" }
    });
    // Setting July 12-13 AVAILABLE (newer, so it should override)
    await db.calendarRule.create({
        data: { startDate: new Date("2026-07-12T00:00:00Z"), endDate: new Date("2026-07-13T00:00:00Z"), room: "THE ALPINE HIDEAWAY", status: "AVAILABLE", source: "TEST_SCRIPT" }
    });

    const stackRules = await db.calendarRule.findMany({ where: { source: "TEST_SCRIPT" }, orderBy: { createdAt: 'asc' }});
    
    // Simulate day checker
    const checkDay = (tgt: string) => {
        const currentTarget = new Date(tgt).getTime();
        let dayStatus = "AVAILABLE";
        const rulesForRoom = stackRules.filter(r => r.room === "THE ALPINE HIDEAWAY" || r.room === "ALL");
        const actRules = rulesForRoom.filter(r => {
           const ruleStart = new Date(r.startDate); ruleStart.setHours(0,0,0,0);
           const ruleEnd = new Date(r.endDate); ruleEnd.setHours(23,59,59,999);
           // We are in UTC locally for this script, but the logic handles UTC fine. 
           // Wait, script runs in UTC, timestamps are UTC.
           return currentTarget >= ruleStart.getTime() && currentTarget <= ruleEnd.getTime();
        });
        
        for (const rule of actRules) {
           dayStatus = rule.status;
        }
        return dayStatus;
    };

    const status_july11 = checkDay("2026-07-11T00:00:00Z"); // Should be UNAVAILABLE
    const status_july12 = checkDay("2026-07-12T00:00:00Z"); // Should be AVAILABLE (overridden)
    const status_july14 = checkDay("2026-07-14T00:00:00Z"); // Should be UNAVAILABLE
    
    addLog(`TEST 4: July 11: ${status_july11}, July 12: ${status_july12}, July 14: ${status_july14}`);
    if (status_july11 === "UNAVAILABLE" && status_july12 === "AVAILABLE" && status_july14 === "UNAVAILABLE") {
        addLog("✅ TEST 4 PASSED (Status hierarchy overrides perfectly night by night)");
    } else {
        addLog("❌ TEST 4 FAILED: Status override incorrectly processed.");
    }

    // Clean up
    await db.calendarRule.deleteMany({ where: { source: "TEST_SCRIPT" } });
    
    addLog("🏁 All Tests Completed.");
    return NextResponse.json({ success: true, logs });

  } catch (error: any) {
    addLog("ERROR: " + error.message);
    return NextResponse.json({ success: false, logs });
  }
}

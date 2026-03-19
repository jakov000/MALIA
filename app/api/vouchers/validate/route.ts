import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const validateVoucherSchema = z.object({
  code: z.string().min(3).toUpperCase(),
  cartTotal: z.number().min(0), // Total cost of booking before discount
});

// POST to validate a voucher and calculate the new total
// This is used directly by the checkout form, so it's public
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, cartTotal } = validateVoucherSchema.parse(body);

    const voucher = await db.voucher.findUnique({
      where: { code },
    });

    if (!voucher) {
      return NextResponse.json({ error: "Invalid voucher code" }, { status: 404 });
    }

    if (!voucher.isActive) {
      return NextResponse.json({ error: "Voucher is inactive or exhausted" }, { status: 400 });
    }

    if (voucher.expiresAt && new Date(voucher.expiresAt) < new Date()) {
      return NextResponse.json({ error: "Voucher has expired" }, { status: 400 });
    }

    if (voucher.currentBalance <= 0 && voucher.discountType === "FIXED") {
       return NextResponse.json({ error: "Voucher balance is zero" }, { status: 400 });
    }

    let discountApplied = 0;
    if (voucher.discountType === "PERCENTAGE") {
      discountApplied = cartTotal * (voucher.discountValue / 100);
    } else if (voucher.discountType === "FIXED") {
      // You can only apply up to the current balance or the cartTotal, whichever is smaller
      discountApplied = Math.min(voucher.currentBalance, cartTotal);
    }

    const finalTotal = Math.max(0, cartTotal - discountApplied);

    return NextResponse.json({
      voucherId: voucher.id,
      code: voucher.code,
      discountType: voucher.discountType,
      discountApplied,
      finalTotal,
    });

  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
    console.error("Validate Voucher Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

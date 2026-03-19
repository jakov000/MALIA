import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { z } from "zod";

const createVoucherSchema = z.object({
  code: z.string().min(3).toUpperCase(),
  discountValue: z.number().min(0),
  discountType: z.enum(["FIXED", "PERCENTAGE"]),
  expiresAt: z.string().datetime().nullable().optional(),
});

// GET fetching all vouchers for Admin
export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const vouchers = await db.voucher.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(vouchers);
  } catch (error) {
    console.error("Fetch Vouchers Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST create a new voucher (Admin only)
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createVoucherSchema.parse(body);

    // Check if code exists
    const existing = await db.voucher.findUnique({ where: { code: parsed.code } });
    if (existing) {
      return NextResponse.json({ error: "Voucher code already exists" }, { status: 400 });
    }

    const voucher = await db.voucher.create({
      data: {
        code: parsed.code,
        discountValue: parsed.discountValue,
        discountType: parsed.discountType,
        currentBalance: parsed.discountValue, // Start balance equals full value
        expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,
        isActive: true,
      }
    });

    return NextResponse.json(voucher, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues }, { status: 400 });
    console.error("Create Voucher Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { differenceInDays, getDay } from "date-fns";

export interface PricingResult {
  nights: number;
  basePrice: number;
  discount: number;
  total: number;
  appliedSpecial: "7=6" | "MIDWEEK" | null;
}

/**
 * Calculates the total stay price including automated specials.
 * 
 * Specials:
 * 1. 7=6: For every 7 nights, 1 night is free.
 * 2. MIDWEEK: 20% discount if stay is exactly 5 nights and covers Sun-Fri.
 */
export function calculateStayPrice(
  start: Date,
  end: Date,
  pricePerNight: number
): PricingResult {
  const nights = differenceInDays(end, start);
  const basePrice = Math.max(0, nights * pricePerNight);

  if (nights <= 0) {
    return { nights: 0, basePrice: 0, discount: 0, total: 0, appliedSpecial: null };
  }

  // --- 1. Calculate 7=6 Special ---
  const sevenSixFreeNights = Math.floor(nights / 7);
  const sevenSixDiscount = sevenSixFreeNights * pricePerNight;

  // --- 2. Calculate Midweek Special (20% for exactly 5 nights Sun-Fri) ---
  // Criteria: exactly 5 nights and check-in on Sunday, check-out on Friday.
  // User text says: "5 Nächte ... Sonntag bis Freitag"
  let midweekDiscount = 0;
  const isSunCheckIn = getDay(start) === 0; // 0 = Sunday
  const isFriCheckOut = getDay(end) === 5;  // 5 = Friday
  
  if (nights === 5 && isSunCheckIn && isFriCheckOut) {
    midweekDiscount = basePrice * 0.2;
  }

  // --- 3. Determine best discount ---
  let discount = 0;
  let appliedSpecial: "7=6" | "MIDWEEK" | null = null;

  if (sevenSixDiscount >= midweekDiscount && sevenSixDiscount > 0) {
    discount = sevenSixDiscount;
    appliedSpecial = "7=6";
  } else if (midweekDiscount > 0) {
    discount = midweekDiscount;
    appliedSpecial = "MIDWEEK";
  }

  return {
    nights,
    basePrice,
    discount: Math.round(discount * 100) / 100,
    total: Math.round((basePrice - discount) * 100) / 100,
    appliedSpecial
  };
}

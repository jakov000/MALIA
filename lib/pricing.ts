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
  pricePerNight: number,
  calendarRules: any[] = []
): PricingResult {
  const nightsCount = differenceInDays(end, start);
  if (nightsCount <= 0) {
    return { nights: 0, basePrice: 0, discount: 0, total: 0, appliedSpecial: null };
  }

  let basePrice = 0;
  const nightPrices: number[] = [];

  // Calculate price dynamically night by night
  for (let i = 0; i < nightsCount; i++) {
    const currentNight = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    // Find matching rule (newer rules override older ones if they exist, but Prisma orders by asc normally, meaning the last matched rule is the active one)
    const activeRules = calendarRules.filter(r => {
      const ruleStart = new Date(r.startDate);
      ruleStart.setHours(0,0,0,0);
      const ruleEnd = new Date(r.endDate);
      ruleEnd.setHours(23,59,59,999);
      const target = currentNight.getTime();
      return target >= ruleStart.getTime() && target <= ruleEnd.getTime();
    });
    
    // Choose the most recently created overriding rule with an explicit price
    let activePrice: number = pricePerNight;
    for (const rule of activeRules) {
      if (rule.price !== null) activePrice = rule.price;
    }
    
    basePrice += activePrice;
    nightPrices.push(activePrice);
  }

  // --- 1. Calculate 7=6 Special ---
  const sevenSixFreeNightsCount = Math.floor(nightsCount / 7);
  let sevenSixDiscount = 0;
  
  if (sevenSixFreeNightsCount > 0) {
    // Sort nights from highest to lowest, and take lowest for discount
    const sortedPrices = [...nightPrices].sort((a, b) => a - b);
    sevenSixDiscount = sortedPrices.slice(0, sevenSixFreeNightsCount).reduce((a, b) => a + b, 0);
  }

  // --- 2. Calculate Midweek Special (20% for exactly 5 nights Sun-Fri) ---
  let midweekDiscount = 0;
  const isSunCheckIn = getDay(start) === 0; // 0 = Sunday
  const isFriCheckOut = getDay(end) === 5;  // 5 = Friday
  
  if (nightsCount === 5 && isSunCheckIn && isFriCheckOut) {
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
    nights: nightsCount,
    basePrice,
    discount: Math.round(discount * 100) / 100,
    total: Math.round((basePrice - discount) * 100) / 100,
    appliedSpecial
  };
}

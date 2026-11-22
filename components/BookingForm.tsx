"use client";

import { useState, useEffect, useMemo } from "react";
import { format, differenceInDays, addDays } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { SUITES } from "@/lib/data";
import { useLocale, useTranslations } from "next-intl";
import { calculateStayPrice, type PricingResult } from "@/lib/pricing";
import { PROPERTY, unitByPath } from "@/lib/property-facts";
import { findOffer, formatEuro, offerStayAllowed, offerUpgradeApplies } from "@/lib/offers";
import type { Locale } from "@/lib/seo";

// The calendar hands us local midnight. toISOString() converts that to UTC and
// lands on the PREVIOUS day for every timezone east of UTC (Vienna is UTC+1/+2),
// which shifted both the stored stay and the server-side price by one night.
// We rebuild the instant from the picked calendar day and send UTC midnight -
// the same basis CalendarRule dates are stored on (<input type="date">).
const toUtcMidnight = (d: Date) =>
  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();

// Abreisetag: oben links belegt (rot), unten rechts frei (grün). Anreisetag umgekehrt.
const DEPARTURE_GRADIENT = 'linear-gradient(135deg, #fee2e2 50%, #dcfce7 50%)';
const ARRIVAL_GRADIENT = 'linear-gradient(135deg, #dcfce7 50%, #fee2e2 50%)';

// Kalendertag als "YYYY-MM-DD" – so prüfen lib/offers.ts und der Server die Nächte.
const ymd = (d: Date) => format(d, "yyyy-MM-dd");

export default function BookingForm({ offerSlug }: { offerSlug?: string }) {
  const t = useTranslations('BookingForm');
  const tRooms = useTranslations('Rooms');
  const locale = useLocale() as Locale;
  // Paketmodus (?angebot=…): Einheit, Dauer und Preis kommen aus dem Angebot.
  const offer = findOffer(offerSlug);
  
  const richOptions = {
    bold: (chunks: React.ReactNode) => <strong className="font-bold">{chunks}</strong>,
    br: () => <br />,
  };
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const [loadingDates, setLoadingDates] = useState(true);
  const [rawBookings, setRawBookings] = useState<any[]>([]);
  const [rawBlockedDates, setRawBlockedDates] = useState<any[]>([]);
  const [rawRules, setRawRules] = useState<any[]>([]);
  const [roomConfigs, setRoomConfigs] = useState<any[]>([]);
  
  const [step, setStep] = useState<1 | 2>(1); // 1 = Calendar & Suite, 2 = Form Details
  
  // Room and Guest Selection
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(() =>
    offer ? Math.max(0, SUITES.findIndex((s) => s.title === offer.room)) : 0
  );
  const [detailsRoomIndex, setDetailsRoomIndex] = useState<number | null>(null); // State for Room Details Modal

  const selectedRoom = SUITES[selectedRoomIndex];
  // Endreinigung und Ortstaxe stecken nicht im Online-Betrag und werden vor Ort
  // bezahlt. Die Endreinigung unterscheidet sich je Einheit, deshalb aus den
  // Stammdaten statt als fester Text.
  const selectedUnit = selectedRoom.href ? unitByPath(selectedRoom.href) : undefined;
  const unitMaxGuests = selectedRoom.persons.includes('-') ? parseInt(selectedRoom.persons.split('-')[1]) : parseInt(selectedRoom.persons);
  const maxGuests = offer ? Math.min(unitMaxGuests, offer.maxGuests) : unitMaxGuests;
  const minGuests = selectedRoom.persons.includes('-') ? parseInt(selectedRoom.persons.split('-')[0]) : parseInt(selectedRoom.persons);
  
  const [guestCount, setGuestCount] = useState<number>(minGuests);

  useEffect(() => {
    if (guestCount > maxGuests) setGuestCount(maxGuests);
    if (guestCount < minGuests) setGuestCount(minGuests);
  }, [selectedRoomIndex, maxGuests, minGuests, guestCount]);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  const [notes, setNotes] = useState("");
  
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherData, setVoucherData] = useState<{ id: string; discount: number; type: string } | null>(null);
  const [voucherError, setVoucherError] = useState("");
  const [validatingVoucher, setValidatingVoucher] = useState(false);

  const [checkingOut, setCheckingOut] = useState(false);

  // Fetch blocked dates on mount
  useEffect(() => {
    async function loadAvailability() {
      try {
        // Fetch long range to cover immediate bookings
        const todayStr = new Date().toISOString();
        const nextYearStr = addDays(new Date(), 365).toISOString();
        
        const res = await fetch(`/api/availability?start=${todayStr}&end=${nextYearStr}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setRawBookings(data.bookings || []);
          setRawBlockedDates(data.blockedDates || []);
          setRawRules(data.rules || []);
        }
        
        // Fetch specific room configurations
        const configRes = await fetch("/api/settings", { cache: "no-store" });
        if (configRes.ok) {
          const configData = await configRes.json();
          setRoomConfigs(configData);
        }
        
      } catch (err) {
        console.error("Failed to load availability", err);
      } finally {
        setLoadingDates(false);
      }
    }
    loadAvailability();
  }, []);

  // Dynamic Settings
  const activeConfig = roomConfigs.find(c => c.roomName === selectedRoom.title);
  const minStay = activeConfig?.minStayDays || 1;
  const noCheckoutDays: number[] = activeConfig && typeof activeConfig.noCheckoutDays === "string" 
    ? JSON.parse(activeConfig.noCheckoutDays) 
    : [];

  const roomRules = useMemo(() => {
    return rawRules.filter(r => r.room === selectedRoom.title || r.room === "ALL");
  }, [rawRules, selectedRoom.title]);

  const activeMinStay = useMemo(() => {
    let stay = activeConfig?.minStayDays || 1;
    if (date?.from) {
      const target = date.from.getTime();
      const checkInRules = roomRules.filter(r => {
        const ruleStart = new Date(r.startDate);
        ruleStart.setHours(0,0,0,0);
        const ruleEnd = new Date(r.endDate);
        ruleEnd.setHours(23,59,59,999);
        return target >= ruleStart.getTime() && target <= ruleEnd.getTime();
      });
      for (const rule of checkInRules) {
        if (rule.minStay !== null) stay = rule.minStay;
      }
    }
    return stay;
  }, [date?.from, roomRules, activeConfig]);

  const blockedDates = useMemo(() => {
    const allBlocked: Date[] = [];
    const getDatesInRange = (startDate: string, endDate: string) => {
      const d = new Date(startDate); d.setHours(0,0,0,0);
      const end = new Date(endDate); end.setHours(0,0,0,0);
      // Determine the nights. The checkout day itself is NOT a blocked night for the property!
      // This allows the next guest to check in on the checkout day.
      end.setDate(end.getDate() - 1); 
      
      const dates = [];
      while (d <= end) {
        dates.push(new Date(d));
        d.setDate(d.getDate() + 1);
      }
      return dates;
    };

    const relatedRooms = selectedRoom.title === "THE ALPINE HIDEAWAY" 
      ? ["THE ALPINE HIDEAWAY", "THE RESIDENCE", "THE RETREAT"]
      : (selectedRoom.title === "THE RESIDENCE" 
          ? ["THE RESIDENCE", "THE ALPINE HIDEAWAY"] 
          : ["THE RETREAT", "THE ALPINE HIDEAWAY"]);

    rawBookings.forEach((b: any) => {
      if (relatedRooms.includes(b.room)) {
        allBlocked.push(...getDatesInRange(b.startDate, b.endDate));
      }
    });

    rawBlockedDates.forEach((b: any) => {
      if (b.room === "ALL" || relatedRooms.includes(b.room)) {
        allBlocked.push(...getDatesInRange(b.startDate, b.endDate));
      }
    });

    // Resolve CalendarRules night-by-night exactly like the Admin Matrix does
    const startObj = new Date(); startObj.setHours(0,0,0,0);
    const endObj = addDays(startObj, 365);
    
    let d = new Date(startObj);
    while (d <= endObj) {
      const currentTarget = d.getTime();
      let isBlockedByRule = false;
      
      for (const reqRoom of relatedRooms) {
        let dayStatus = "AVAILABLE";
        const rulesForRoom = rawRules.filter(r => r.room === reqRoom || r.room === "ALL");
        const activeRules = rulesForRoom.filter(r => {
           const ruleStart = new Date(r.startDate);
           ruleStart.setHours(0,0,0,0);
           const ruleEnd = new Date(r.endDate);
           ruleEnd.setHours(23,59,59,999);
           return currentTarget >= ruleStart.getTime() && currentTarget <= ruleEnd.getTime();
        });
        
        // stack resolves from oldest to newest
        for (const rule of activeRules) {
           dayStatus = rule.status;
        }

        if (dayStatus === "UNAVAILABLE" || dayStatus === "OWN_USE" || dayStatus === "CLOSED") {
           isBlockedByRule = true;
           break; 
        }
      }

      if (isBlockedByRule) {
        // Only block if it hasn't been added yet (pure optimization, Date objects won't strictly deduplicate with `.includes()` but our DatePicker consumes arrays nicely)
        allBlocked.push(new Date(d));
      }
      d.setDate(d.getDate() + 1);
    }

    return allBlocked;
  }, [rawBookings, rawBlockedDates, selectedRoom.title]);

  // Wechseltage, im Kalender halb belegt (rot) und halb frei (grün):
  //  - Abreisetag: Nacht davor belegt, Nacht selbst frei. Der vorige Gast reist
  //    ab, der nächste kann am selben Tag anreisen.
  //  - Anreisetag: Nacht davor frei, Nacht selbst belegt. Wer davor wohnt, kann
  //    an diesem Tag noch abreisen.
  const { departureDays, arrivalDays } = useMemo(() => {
    const blockedKeys = new Set(blockedDates.map(d => d.getTime()));
    const today = new Date(); today.setHours(0,0,0,0);
    const departures = new Map<number, Date>();
    const arrivals = new Map<number, Date>();
    for (const night of blockedDates) {
      const next = addDays(night, 1);
      if (!blockedKeys.has(next.getTime()) && next >= today) departures.set(next.getTime(), next);
      // Abreisen geht frühestens morgen, ein Anreisetag heute bringt also nichts.
      if (!blockedKeys.has(addDays(night, -1).getTime()) && night > today) arrivals.set(night.getTime(), night);
    }
    return { departureDays: [...departures.values()], arrivalDays: [...arrivals.values()] };
  }, [blockedDates]);

  // Paketmodus: Anreise nur, wenn alle Nächte frei sind und die Regeln des
  // Angebots sie erlauben (Monate, Sperrzeiten, Fr/Sa). Die Abreise ergibt sich.
  const offerArrivals = useMemo(() => {
    if (!offer) return [];
    const blockedKeys = new Set(blockedDates.map(d => d.getTime()));
    const today = new Date(); today.setHours(0,0,0,0);
    const arrivals: Date[] = [];
    for (let i = 0; i <= 365; i++) {
      const arrival = addDays(today, i);
      const nights = Array.from({ length: offer.nights }, (_, n) => addDays(arrival, n));
      if (nights.every(n => !blockedKeys.has(n.getTime())) && offerStayAllowed(offer, nights.map(ymd))) {
        arrivals.push(arrival);
      }
    }
    return arrivals;
  }, [offer, blockedDates]);
  const offerArrivalKeys = useMemo(() => new Set(offerArrivals.map(d => d.getTime())), [offerArrivals]);
  const isOfferArrival = (d: Date) => {
    const day = new Date(d); day.setHours(0,0,0,0);
    return offerArrivalKeys.has(day.getTime());
  };

  // Compute Prices
  const basePricePerNight = activeConfig ? activeConfig.pricePerNight : parseInt(selectedRoom.price);

  const pricing = useMemo<PricingResult | null>(() => {
    if (!date?.from || !date?.to) return null;
    // Festpreis des Pakets – 7=6 und Midweek gelten hier nicht.
    if (offer) return { nights: offer.nights, basePrice: offer.price, discount: 0, total: offer.price, appliedSpecial: null };
    return calculateStayPrice(date.from, date.to, basePricePerNight, roomRules);
  }, [date, basePricePerNight, roomRules, offer]);

  const nights = pricing?.nights || 0;
  const subtotal = pricing?.basePrice || 0;
  const specialDiscount = pricing?.discount || 0;
  
  const discountAmount = useMemo(() => {
    if (!pricing) return 0;
    const afterSpecial = pricing.total;
    return voucherData 
      ? (voucherData.type === "PERCENTAGE" ? afterSpecial * (voucherData.discount / 100) : Math.min(voucherData.discount, afterSpecial)) 
      : 0;
  }, [pricing, voucherData]);

  const finalTotal = pricing ? Math.max(0, pricing.total - discountAmount) : 0;

  // Dynamic Calendar Constraints
  const getDisabledDates = () => {
    // Paketmodus: geklickt wird nur die Anreise, alles andere ist gesperrt.
    if (offer) return [{ before: new Date() }, (d: Date) => !isOfferArrival(d)];

    let disabled: any[] = [
      { before: new Date() }, // Cannot book past
      ...blockedDates
    ];

    if (date?.from && !date?.to) {
      // 1. Minimum Stay restriction
      if (activeMinStay > 1) {
        disabled.push({
          after: date.from,
          before: addDays(date.from, activeMinStay)
        });
      }

      // 2. Prevent overlapping into other bookings
      const nextBlockedDate = blockedDates
        .filter(d => d > date.from!)
        .sort((a, b) => a.getTime() - b.getTime())[0];
        
      if (nextBlockedDate) {
        // We MUST allow checking out on the 'nextBlockedDate' (the day the next guest arrives).
        // Since 'nextBlockedDate' is currently in 'disabled' (via ...blockedDates), we must remove it
        // from 'disabled' so the user can click it to complete their checkout.
        disabled = disabled.filter(
          matcher => !(matcher instanceof Date && matcher.getTime() === nextBlockedDate.getTime())
        );

        // Then we strictly disable everything AFTER the checkout day!
        disabled.push({ after: nextBlockedDate });
      }
    }

    return disabled;
  };

  const isPicked = (d: Date) =>
    d.getTime() === date?.from?.getTime() || d.getTime() === date?.to?.getTime();

  // Ist an diesem Wochentag keine Abreise erlaubt, bleibt der Anreisetag ganz belegt.
  const shownArrivals = arrivalDays.filter(d => !noCheckoutDays.includes(d.getDay()));
  const shownArrivalKeys = new Set(shownArrivals.map(d => d.getTime()));

  const modifiers = {
    booked: blockedDates.filter(d => !shownArrivalKeys.has(d.getTime())),
    // Ein gewählter An- oder Abreisetag behält die Auswahlfarbe des Kalenders.
    departure: departureDays.filter(d => !isPicked(d)),
    arrival: shownArrivals.filter(d => !isPicked(d)),
    noCheckout: (d: Date) => noCheckoutDays.includes(d.getDay())
  };

  const modifiersStyles: any = {
    // @ts-ignore
    booked: { textDecoration: 'line-through', color: '#991b1b', backgroundColor: '#fef2f2', borderRadius: '100%', opacity: 0.8 },
    departure: { background: DEPARTURE_GRADIENT, borderRadius: '100%' },
    // Klickbar erst als Abreise, wenn davor eine Anreise gewählt ist - bis dahin
    // wie belegte Tage leicht abgeblendet.
    arrival: { background: ARRIVAL_GRADIENT, borderRadius: '100%', opacity: 0.8 },
    // @ts-ignore
    noCheckout: { textDecoration: 'underline', textDecorationColor: '#f87171', textDecorationStyle: 'dotted', textUnderlineOffset: '4px' }
  };

  // Handlers
  const handleValidateVoucher = async () => {
    if (!voucherCode) return;
    setValidatingVoucher(true);
    setVoucherError("");
    setVoucherData(null);
    try {
      const res = await fetch("/api/vouchers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode, cartTotal: subtotal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('voucher_error_invalid'));
      
      setVoucherData({
        id: data.voucherId,
        discount: data.discountType === "PERCENTAGE" ? (data.discountApplied / subtotal * 100) : data.discountApplied, // Rough reverse calc for UI display
        type: data.discountType,
      });
    } catch (err: any) {
      setVoucherError(err.message);
    } finally {
      setValidatingVoucher(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date?.from || !date?.to || !guestName || !guestEmail) return;

    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          guestEmail,
          guestPhone,
          guestAddress,
          startDate: toUtcMidnight(date.from),
          endDate: toUtcMidnight(date.to),
          room: selectedRoom.title,
          guestCount,
          cartTotal: subtotal,
          voucherCode: voucherData ? voucherCode : undefined,
          notes,
          offer: offer?.slug,
        }),
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert(t('alert_error') + data.error);
      }
    } catch (err) {
      console.error(err);
      alert(t('alert_unexpected'));
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-transparent mt-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
      
      {/* Left Column: Calendar & Summary */}
      <div className="lg:col-span-7 space-y-12">
        <div>
          <div className="mb-8">
             <span className="text-[10px] uppercase tracking-[0.4em] text-[#3d3d29] mb-2 block font-bold">{t('step1')}</span>
             <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide uppercase">{t('title1')}</h2>
          </div>
          
          {offer ? (
            // Paketmodus: das Angebot ersetzt Specials-Hinweis und Zimmerauswahl.
            <div className="mb-10 p-6 bg-[#fdfaf8] border border-[#f3e8e2] rounded-sm">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-3">{t('offer_label')}</h4>
              <p className="font-serif text-2xl text-stone-900">{offer.title[locale]}</p>
              <p className="text-xs text-stone-600 mt-2 uppercase tracking-wider">
                {selectedRoom.title} · {offer.nights} {t('nights')} · {offer.maxGuests} {t('persons')}
              </p>
              <p className="text-sm text-stone-800 mt-3">
                {formatEuro(offer.price, locale)} <span className="text-xs text-stone-500 font-light">· {t('offer_included_note')}</span>
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-[10px] uppercase tracking-wider">
                <a href={`/${locale}/malia-specials/${offer.slug}`} className="text-stone-600 underline hover:text-stone-900">{t('offer_view')}</a>
                <a href={`/${locale}/booking`} className="text-stone-400 underline hover:text-stone-900">{t('offer_without')}</a>
              </div>
            </div>
          ) : (
          <>
          <div className="mb-10 p-6 bg-[#fdfaf8] border border-[#f3e8e2] rounded-sm">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-4">{t('specials_title')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">{t('special_76_title')}</p>
                <p className="text-xs text-stone-600 font-light leading-relaxed">{t('special_76_desc')}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">{t('special_midweek_title')}</p>
                <p className="text-xs text-stone-600 font-light leading-relaxed">{t('special_midweek_desc')}</p>
              </div>
            </div>
          </div>
          
          {/* Room Selection */}
          <div className="mb-8 space-y-4">
            <label className="block text-sm text-stone-600 font-medium">{t('which_hideaway')}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SUITES.map((suite, idx) => (
                <div key={idx} className="relative flex flex-col">
                  <button
                    type="button"
                    onClick={() => setSelectedRoomIndex(idx)}
                    className={`p-4 border text-left transition-colors flex flex-col justify-between h-24 w-full ${selectedRoomIndex === idx ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-400'}`}
                  >
                    <span className="font-serif text-sm uppercase tracking-wider pr-14 leading-tight">{suite.title}</span>
                    <span className="text-xs text-stone-500">{suite.persons} {t('persons')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setDetailsRoomIndex(idx); }}
                    className="absolute bottom-4 right-4 text-[10px] uppercase tracking-wider text-stone-400 hover:text-stone-800 hover:font-bold underline transition-all z-10"
                  >
                    {t('details')}
                  </button>
                </div>
              ))}
            </div>
          </div>
          </>
          )}

          {/* Guest Selection */}
          <div className="mb-10 w-full sm:w-1/2">
            <label className="block text-sm text-stone-600 font-medium mb-3">{t('guest_count')}</label>
            <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-white">
               <button 
                 onClick={() => setGuestCount(Math.max(minGuests, guestCount - 1))}
                 disabled={guestCount <= minGuests}
                 className="px-4 py-3 bg-stone-50 hover:bg-stone-100 disabled:opacity-50 text-stone-600 transition-colors w-12 flex justify-center items-center"
               >-</button>
               <div className="flex-1 text-center font-medium text-stone-900">{guestCount} {guestCount === 1 ? t('person') : t('persons')}</div>
               <button 
                 onClick={() => setGuestCount(Math.min(maxGuests, guestCount + 1))}
                 disabled={guestCount >= maxGuests}
                 className="px-4 py-3 bg-stone-50 hover:bg-stone-100 disabled:opacity-50 text-stone-600 transition-colors w-12 flex justify-center items-center"
               >+</button>
            </div>
            {offer && (
              <p className="text-xs text-stone-500 font-light mt-2">{t('offer_guests_max', { count: maxGuests })}</p>
            )}
          </div>

          <label className="block text-sm text-stone-600 font-medium mb-3">{t('select_dates')}</label>
          {offer && !loadingDates && (
            offerArrivals.length > 0 ? (
              <p className="text-xs text-stone-500 font-light mb-4 leading-relaxed">{t('offer_calendar_hint', { nights: offer.nights })}</p>
            ) : (
              <p className="text-sm text-stone-700 mb-4 p-4 bg-[#fdfaf8] border border-[#f3e8e2] leading-relaxed">
                {t('offer_no_dates')}{' '}
                <a href={`/${locale}/inquiry`} className="underline">{t('offer_inquiry_link')}</a>
              </p>
            )
          )}
          {loadingDates ? (
            <div className="flex items-center justify-center p-12 bg-stone-50 rounded-lg">
              <Loader2 className="animate-spin text-stone-400" size={32} />
            </div>
          ) : (
             <>
               <div className="bg-stone-50 p-6 md:p-8 rounded-lg flex justify-center border border-stone-200 overflow-hidden">
                 <div className="transform scale-110 origin-top">
                   <Calendar
                    mode="range"
                    // Mindestens eine Nacht. Ohne min setzt react-day-picker 9 beim ersten
                    // Klick Anreise UND Abreise auf denselben Tag - dann greift die Logik
                    // für "Anreise gewählt, Abreise offen" in getDisabledDates nie, und der
                    // Anreisetag des nächsten Gastes bleibt als Abreise gesperrt.
                    min={1}
                    selected={date}
                    // Im Paketmodus mit dem ersten möglichen Anreisemonat öffnen.
                    defaultMonth={offer ? offerArrivals[0] : undefined}
                    // @ts-ignore
                    onSelect={(range: DateRange | undefined, triggerDate: Date) => {
                      if (offer) {
                        // Feste Dauer: der Klick setzt die Anreise, die Abreise folgt daraus.
                        if (triggerDate && isOfferArrival(triggerDate)) {
                          setDate({ from: triggerDate, to: addDays(triggerDate, offer.nights) });
                        }
                        return;
                      }
                      if (range?.from && range?.to) {
                        // Check if any blocked date strictly falls between the selected check-in and check-out
                        const overlaps = blockedDates.some(d => {
                          const dt = d.getTime();
                          return dt > range.from!.getTime() && dt < range.to!.getTime();
                        });
                        if (overlaps) {
                          // Prevent selecting a range that spans across blocked dates!
                          // Reset the 'to' selection so they have to pick a valid checkout day.
                          setDate({ from: range.from, to: undefined });
                          return;
                        }
                      }
                      setDate(range);
                    }}
                    numberOfMonths={1}
                    disabled={getDisabledDates()}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    className="rounded-md mx-auto relative z-10"
                  />
                 </div>
              </div>
              {(departureDays.length > 0 || shownArrivals.length > 0 || noCheckoutDays.length > 0) && (
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {departureDays.length > 0 && (
                    <div className="inline-flex text-xs font-medium text-stone-600 items-center gap-3 bg-stone-50 py-2 px-4 rounded-sm border border-stone-100">
                       <span className="w-4 h-4 rounded-full shrink-0" style={{ background: DEPARTURE_GRADIENT }}></span>
                       <span className="tracking-wide">{t('departure_day')}</span>
                    </div>
                  )}
                  {shownArrivals.length > 0 && (
                    <div className="inline-flex text-xs font-medium text-stone-600 items-center gap-3 bg-stone-50 py-2 px-4 rounded-sm border border-stone-100">
                       <span className="w-4 h-4 rounded-full shrink-0" style={{ background: ARRIVAL_GRADIENT }}></span>
                       <span className="tracking-wide">{t('arrival_day')}</span>
                    </div>
                  )}
                  {noCheckoutDays.length > 0 && (
                    <div className="inline-flex text-xs font-medium text-stone-600 items-center gap-3 bg-stone-50 py-2 px-4 rounded-sm border border-stone-100">
                       <span className="w-8 border-b-[3px] border-red-400 border-dotted opacity-80"></span>
                       <span className="tracking-wide">{t('no_checkout_day')}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {date?.from && date?.to && (
          <div className="bg-[#3d3d29] text-white p-6 rounded-lg space-y-4">
            <h3 className="font-serif text-xl tracking-wider">{t('stay_title')}</h3>
            {offer && (
              <div className="flex justify-between gap-4 text-sm font-light">
                <span>{t('offer_label')}:</span>
                <span className="text-right">{offer.title[locale]}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-light">
              <span>{t('checkin')}</span>
              <span>{format(date.from, "dd. MMMM yyyy", { locale: de })}</span>
            </div>
            <div className="flex justify-between text-sm font-light">
              <span>{offer?.lateCheckout ? t('checkout_late', { time: offer.lateCheckout[locale] }) : t('checkout')}</span>
              <span>{format(date.to, "dd. MMMM yyyy", { locale: de })}</span>
            </div>
            <div className="flex justify-between text-sm font-light">
              <span>{t('room')}</span>
              <span className="uppercase text-xs tracking-wider">{selectedRoom.title}</span>
            </div>
            <div className="flex justify-between text-sm font-light">
              <span>{t('guests')}</span>
              <span>{guestCount} {guestCount === 1 ? t('person') : t('persons')}</span>
            </div>
            <div className="flex justify-between text-sm font-light">
              <span>{t('duration')}</span>
              <span>{nights} {nights === 1 ? t('night') : t('nights')}</span>
            </div>
            
            <hr className="border-stone-700 my-4" />
            
            {/* Validation Messages */}
            {!offer && date.to && nights < activeMinStay && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-sm text-sm mb-4">
                {t('min_stay_1')} <strong>{activeMinStay} {activeMinStay === 1 ? t('night') : t('nights')}</strong>.<br/>{t('min_stay_2')}
              </div>
            )}
            
            {!offer && date.to && noCheckoutDays.includes(date.to.getDay()) && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-sm text-sm mb-4">
                {t('checkout_error_1')} <strong>{format(date.to, "EEEE", { locale: de })}</strong> {t('checkout_error_2')}<br/>{t('checkout_error_3')}
              </div>
            )}

            <div className="flex justify-between items-center text-lg">
              <span>{offer ? t('offer_price') : t('subtotal')}</span>
              <span className={specialDiscount > 0 ? "line-through opacity-50 text-sm" : ""}>
                € {subtotal.toFixed(2)}
              </span>
            </div>

            {specialDiscount > 0 && (
              <div className="flex justify-between items-start text-sm text-green-400">
                <div className="flex flex-col">
                  <span className="font-medium uppercase tracking-wider text-[10px] bg-green-500/20 px-2 py-0.5 rounded-sm self-start mb-1">
                    {t('applied_special_label')}
                  </span>
                  <span>{pricing?.appliedSpecial === "7=6" ? t('special_76_name') : t('special_midweek_name')}</span>
                </div>
                <span>- € {specialDiscount.toFixed(2)}</span>
              </div>
            )}

            {voucherData && (
              <div className="flex justify-between items-center text-sm text-green-400">
                <span>{t('voucher_applied')}</span>
                <span>- € {discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-2xl font-serif mt-2 pt-4 border-t border-stone-700">
              <span>{t('total')}</span>
              <span>€ {finalTotal.toFixed(2)}</span>
            </div>

            {offer ? (
              <div className="text-xs font-light text-stone-300 leading-relaxed space-y-1">
                <p>{t('offer_included_note')}</p>
                {offerUpgradeApplies(offer, ymd(date.from)) && <p>{t('offer_upgrade_note')}</p>}
              </div>
            ) : selectedUnit && (
              <p className="text-xs font-light text-stone-300 leading-relaxed">
                {t('extra_costs_note', {
                  touristTax: PROPERTY.touristTaxPerPersonPerNight,
                  fromAge: PROPERTY.touristTaxExemptUnderAge,
                  cleaningFee: selectedUnit.cleaningFee,
                })}
              </p>
            )}

            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                // Im Paketmodus sind Dauer und Termin durch die Auswahl schon gültig.
                disabled={!offer && (nights < activeMinStay || (date?.to ? noCheckoutDays.includes(date.to.getDay()) : false))}
                className="w-full mt-6 py-3 bg-white text-stone-900 font-medium uppercase tracking-widest text-xs hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('continue_data')}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Form (Step 2) */}
      <div className={`lg:col-span-5 transition-opacity duration-700 mt-12 lg:mt-0 ${step === 2 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <div className="mb-8">
             <span className="text-[10px] uppercase tracking-[0.4em] text-[#3d3d29] mb-2 block font-bold">{t('step2')}</span>
             <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide uppercase">{t('title2')}</h2>
        </div>
        <form onSubmit={handleCheckout} className="space-y-5">
          <div>
            <label className="block text-sm text-stone-600 mb-1">{t('name_label')}</label>
            <input 
              required
              type="text" 
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              className="w-full border-b border-stone-300 py-2 px-1 focus:border-stone-900 focus:outline-none bg-transparent transition-colors" 
              placeholder={t('name_placeholder')}
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">{t('email_label')}</label>
            <input 
              required
              type="email" 
              value={guestEmail}
              onChange={e => setGuestEmail(e.target.value)}
              className="w-full border-b border-stone-300 py-2 px-1 focus:border-stone-900 focus:outline-none bg-transparent transition-colors" 
              placeholder={t('email_placeholder')}
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">{t('phone_label')}</label>
            <input 
              required
              type="tel" 
              value={guestPhone}
              onChange={e => setGuestPhone(e.target.value)}
              className="w-full border-b border-stone-300 py-2 px-1 focus:border-stone-900 focus:outline-none bg-transparent transition-colors" 
              placeholder={t('phone_placeholder')}
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">{t('address_label')}</label>
            <input 
              required
              type="text" 
              value={guestAddress}
              onChange={e => setGuestAddress(e.target.value)}
              className="w-full border-b border-stone-300 py-2 px-1 focus:border-stone-900 focus:outline-none bg-transparent transition-colors" 
              placeholder={t('address_placeholder')}
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">{t('notes_label')}</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full border-b border-stone-300 py-2 px-1 focus:border-stone-900 focus:outline-none bg-transparent transition-colors resize-none h-20" 
              placeholder={t('notes_placeholder')}
            />
          </div>

          <div className="bg-stone-50 p-4 border border-stone-200 mt-6 mt-8">
            <label className="block text-sm text-stone-900 font-medium mb-3">{t('voucher_label')}</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={voucherCode}
                onChange={e => setVoucherCode(e.target.value.toUpperCase())}
                className="flex-1 border border-stone-300 px-3 py-2 text-sm uppercase" 
                placeholder={t('voucher_placeholder')}
                disabled={!!voucherData}
              />
              <button 
                type="button"
                onClick={handleValidateVoucher}
                disabled={!voucherCode || validatingVoucher || !!voucherData}
                className="bg-[#bcc2b2] text-stone-800 px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#b0b8a5] disabled:opacity-50"
              >
                {validatingVoucher ? <Loader2 className="animate-spin w-4 h-4" /> : (voucherData ? t('voucher_button_applied') : t('voucher_button_check'))}
              </button>
            </div>
            {voucherError && <p className="text-red-500 text-xs mt-2">{voucherError}</p>}
            {voucherData && (
              <div className="flex justify-between items-center text-green-600 text-xs mt-2">
                <span>{t('voucher_success')}</span>
                <button type="button" onClick={() => {setVoucherData(null); setVoucherCode("")}} className="underline">{t('voucher_remove')}</button>
              </div>
            )}
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 text-xs text-stone-600 mt-6 flex flex-col gap-2 leading-relaxed shadow-sm">
            <p className="font-bold text-stone-800 uppercase tracking-widest text-[10px]">{t('cancellation_title')}</p>
            <ul className="list-none space-y-1">
              <li>• {t('cancel_60')} <span className="font-medium text-stone-800">{t('cancel_60_val')}</span></li>
              <li>• {t('cancel_30')} <span className="font-medium text-stone-800">50%</span> {t('cancel_cost')}</li>
              <li>• {t('cancel_14')} <span className="font-medium text-stone-800">70%</span> {t('cancel_cost')}</li>
              <li>• {t('cancel_less')} <span className="font-medium text-stone-800">100%</span> {t('cancel_cost')}</li>
            </ul>
          </div>

          <button 
            type="submit" 
            disabled={checkingOut || !date?.from || !date?.to || !guestName || !guestEmail || !guestPhone || !guestAddress}
            className="w-full bg-[#bcc2b2] text-stone-800 py-4 uppercase tracking-[0.2em] font-bold text-sm hover:bg-[#b0b8a5] transition-colors mt-8 disabled:opacity-50 flex justify-center items-center"
          >
            {checkingOut ? <Loader2 className="animate-spin mr-2" /> : null}
            {t('book_button')} ({finalTotal.toFixed(2)} €)
          </button>
          
          <p className="text-[10px] text-stone-500 text-center mt-4">
            {t('book_info')}
          </p>

        </form>
      </div>

      {/* Room Details Modal */}
      {detailsRoomIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
             onClick={() => setDetailsRoomIndex(null)}>
          <div 
            className="bg-white max-w-lg w-full p-8 rounded-sm shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()} // Prevent close when clicking inside modal
          >
            <button 
              type="button"
              onClick={() => setDetailsRoomIndex(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 text-2xl font-light leading-none"
            >
              &times;
            </button>
            
            <h3 className="font-serif text-2xl text-stone-900 mb-2 tracking-wide">{SUITES[detailsRoomIndex].title}</h3>
            <div className="flex gap-4 text-xs tracking-widest uppercase text-[#3d3d29] mb-6 font-medium">
              <span>{SUITES[detailsRoomIndex].sqm} m²</span>
              <span>•</span>
              <span>{SUITES[detailsRoomIndex].persons} {t('modal_guests')}</span>
              <span>•</span>
              <span>{t('modal_from')} {SUITES[detailsRoomIndex].price}</span>
            </div>
            
            <div className="text-stone-600 text-sm leading-relaxed mb-6 font-light space-y-4">
              {SUITES[detailsRoomIndex].title === "THE ALPINE HIDEAWAY" && (
                <>
                  <p>{tRooms.rich('Hideaway.p1', richOptions)}</p>
                  <p>{tRooms.rich('Hideaway.p2', richOptions)}</p>
                </>
              )}
              {SUITES[detailsRoomIndex].title === "THE RESIDENCE" && (
                <>
                  <p>{tRooms.rich('Residence.p1', richOptions)}</p>
                  <p>{tRooms.rich('Residence.p2', richOptions)}</p>
                </>
              )}
              {SUITES[detailsRoomIndex].title === "THE RETREAT" && (
                <>
                  <p>{tRooms.rich('Retreat.p1', richOptions)}</p>
                  <p>{tRooms.rich('Retreat.p2', richOptions)}</p>
                  <p>{tRooms.rich('Retreat.p3', richOptions)}</p>
                  <p>{tRooms.rich('Retreat.p4', richOptions)}</p>
                </>
              )}
            </div>
            
            <ul className="space-y-2 mb-8 border-t border-stone-100 pt-6">
              {SUITES[detailsRoomIndex].title === "THE ALPINE HIDEAWAY" && Array.from({ length: 15 }).map((_, i) => {
                const key = `Hideaway.bullets.${i}`;
                // Since raw data is an array in JSON but next-intl works better with keys for rich
                // and we don't know the exact length easily without raw, 
                // but we can check if it exists or use index-based keys if we restructure.
                // However, the current JSON structure for bullets is an array: "bullets": ["...", "..."]
                // next-intl 3 access array via index.
                return tRooms.has(`${key}`) ? (
                  <li key={i} className="flex gap-3 text-sm text-stone-700 font-light items-start">
                    <span className="text-[#3d3d29] mt-0.5">•</span>
                    <span>{tRooms.rich(key, richOptions)}</span>
                  </li>
                ) : null;
              })}
              {SUITES[detailsRoomIndex].title === "THE RESIDENCE" && Array.from({ length: 15 }).map((_, i) => {
                const key = `Residence.bullets.${i}`;
                return tRooms.has(`${key}`) ? (
                  <li key={i} className="flex gap-3 text-sm text-stone-700 font-light items-start">
                    <span className="text-[#3d3d29] mt-0.5">•</span>
                    <span>{tRooms.rich(key, richOptions)}</span>
                  </li>
                ) : null;
              })}
              {SUITES[detailsRoomIndex].title === "THE RETREAT" && Array.from({ length: 15 }).map((_, i) => {
                const key = `Retreat.bullets.${i}`;
                return tRooms.has(`${key}`) ? (
                  <li key={i} className="flex gap-3 text-sm text-stone-700 font-light items-start">
                    <span className="text-[#3d3d29] mt-0.5">•</span>
                    <span>{tRooms.rich(key, richOptions)}</span>
                  </li>
                ) : null;
              })}
            </ul>
            
            <Button 
              variant="primary" 
              onClick={() => {
                setSelectedRoomIndex(detailsRoomIndex);
                setDetailsRoomIndex(null);
              }}
              className="w-full justify-center"
            >
              {t('modal_button')}
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}

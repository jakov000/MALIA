"use client";

import { useState, useEffect } from "react";
import { format, differenceInDays, addDays } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { SUITES } from "@/lib/data";

export default function BookingForm() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const [loadingDates, setLoadingDates] = useState(true);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  
  const [step, setStep] = useState<1 | 2>(1); // 1 = Calendar & Suite, 2 = Form Details
  
  // Room and Guest Selection
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const selectedRoom = SUITES[selectedRoomIndex];
  const maxGuests = selectedRoom.persons.includes('-') ? parseInt(selectedRoom.persons.split('-')[1]) : parseInt(selectedRoom.persons);
  const minGuests = selectedRoom.persons.includes('-') ? parseInt(selectedRoom.persons.split('-')[0]) : parseInt(selectedRoom.persons);
  
  const [guestCount, setGuestCount] = useState<number>(minGuests);

  useEffect(() => {
    if (guestCount > maxGuests) setGuestCount(maxGuests);
    if (guestCount < minGuests) setGuestCount(minGuests);
  }, [selectedRoomIndex, maxGuests, minGuests, guestCount]);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
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
        
        const res = await fetch(`/api/availability?start=${todayStr}&end=${nextYearStr}`);
        if (res.ok) {
          const data = await res.json();
          const allBlocked: Date[] = [];
          
          // Helper to generate array of dates between start and end
          const getDatesInRange = (startDate: string, endDate: string) => {
            const date = new Date(startDate);
            const end = new Date(endDate);
            const dates = [];
            while (date <= end) {
              dates.push(new Date(date));
              date.setDate(date.getDate() + 1);
            }
            return dates;
          };

          data.bookings.forEach((b: any) => allBlocked.push(...getDatesInRange(b.startDate, b.endDate)));
          data.blockedDates.forEach((b: any) => allBlocked.push(...getDatesInRange(b.startDate, b.endDate)));
          
          setBlockedDates(allBlocked);
        }
      } catch (err) {
        console.error("Failed to load availability", err);
      } finally {
        setLoadingDates(false);
      }
    }
    loadAvailability();
  }, []);

  // Compute Prices
  const nights = date?.from && date?.to ? differenceInDays(date.to, date.from) : 0;
  const basePricePerNight = parseInt(selectedRoom.price);
  const subtotal = Math.max(0, nights * basePricePerNight);
  const discountAmount = voucherData 
    ? (voucherData.type === "PERCENTAGE" ? subtotal * (voucherData.discount / 100) : Math.min(voucherData.discount, subtotal)) 
    : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

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
      if (!res.ok) throw new Error(data.error || "Gutschein ungültig");
      
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
          startDate: date.from.toISOString(),
          endDate: date.to.toISOString(),
          room: selectedRoom.title,
          guestCount,
          cartTotal: subtotal,
          voucherCode: voucherData ? voucherCode : undefined,
          notes,
        }),
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert("Fehler bei der Buchung: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Ein unerwarteter Fehler ist aufgetreten.");
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
             <span className="text-[10px] uppercase tracking-[0.4em] text-[#7d3a2a] mb-2 block font-bold">Step 1</span>
             <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide uppercase">Wähle deinen Aufenthalt</h2>
          </div>
          
          {/* Room Selection */}
          <div className="mb-8 space-y-4">
            <label className="block text-sm text-stone-600 font-medium">Welches Hideaway?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SUITES.map((suite, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRoomIndex(idx)}
                  className={`p-4 border text-left transition-colors flex flex-col justify-between h-24 ${selectedRoomIndex === idx ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-400'}`}
                >
                  <span className="font-serif text-sm uppercase tracking-wider">{suite.title}</span>
                  <span className="text-xs text-stone-500">{suite.persons} Personen</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guest Selection */}
          <div className="mb-10 w-full sm:w-1/2">
            <label className="block text-sm text-stone-600 font-medium mb-3">Anzahl der Gäste</label>
            <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-white">
               <button 
                 onClick={() => setGuestCount(Math.max(minGuests, guestCount - 1))}
                 disabled={guestCount <= minGuests}
                 className="px-4 py-3 bg-stone-50 hover:bg-stone-100 disabled:opacity-50 text-stone-600 transition-colors w-12 flex justify-center items-center"
               >-</button>
               <div className="flex-1 text-center font-medium text-stone-900">{guestCount} {guestCount === 1 ? 'Person' : 'Personen'}</div>
               <button 
                 onClick={() => setGuestCount(Math.min(maxGuests, guestCount + 1))}
                 disabled={guestCount >= maxGuests}
                 className="px-4 py-3 bg-stone-50 hover:bg-stone-100 disabled:opacity-50 text-stone-600 transition-colors w-12 flex justify-center items-center"
               >+</button>
            </div>
          </div>

          <label className="block text-sm text-stone-600 font-medium mb-3">Zeitraum auswählen</label>
          {loadingDates ? (
            <div className="flex items-center justify-center p-12 bg-stone-50 rounded-lg">
              <Loader2 className="animate-spin text-stone-400" size={32} />
            </div>
          ) : (
             <div className="bg-stone-50 p-4 rounded-lg flex justify-center border border-stone-200">
               <Calendar
                mode="range"
                selected={date}
                // @ts-ignore
                onSelect={setDate}
                numberOfMonths={1}
                disabled={[
                  { before: new Date() }, // Cannot book past
                  ...blockedDates // Cannot book blocked
                ]}
                className="rounded-md mx-auto"
              />
            </div>
          )}
        </div>

        {date?.from && date?.to && (
          <div className="bg-stone-900 text-white p-6 rounded-lg space-y-4">
            <h3 className="font-serif text-xl tracking-wider">Dein Aufenthalt</h3>
            <div className="flex justify-between text-sm font-light">
              <span>Anreise:</span>
              <span>{format(date.from, "dd. MMMM yyyy", { locale: de })}</span>
            </div>
            <div className="flex justify-between text-sm font-light">
              <span>Abreise:</span>
              <span>{format(date.to, "dd. MMMM yyyy", { locale: de })}</span>
            </div>
            <div className="flex justify-between text-sm font-light">
              <span>Zimmer:</span>
              <span className="uppercase text-xs tracking-wider">{selectedRoom.title}</span>
            </div>
            <div className="flex justify-between text-sm font-light">
              <span>Gäste:</span>
              <span>{guestCount} {guestCount === 1 ? 'Person' : 'Personen'}</span>
            </div>
            <div className="flex justify-between text-sm font-light">
              <span>Dauer:</span>
              <span>{nights} {nights === 1 ? 'Nacht' : 'Nächte'}</span>
            </div>
            
            <hr className="border-stone-700 my-4" />
            
            <div className="flex justify-between items-center text-lg">
              <span>Zwischensumme:</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>

            {voucherData && (
              <div className="flex justify-between items-center text-sm text-green-400">
                <span>Gutschein eingelöst:</span>
                <span>- € {discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-2xl font-serif mt-2 pt-4 border-t border-stone-700">
              <span>Gesamt:</span>
              <span>€ {finalTotal.toFixed(2)}</span>
            </div>

            {step === 1 && (
              <button 
                onClick={() => setStep(2)}
                className="w-full mt-6 py-3 bg-white text-stone-900 font-medium uppercase tracking-widest text-xs hover:bg-stone-200 transition-colors"
              >
                Weiter zu den Daten
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Form (Step 2) */}
      <div className={`lg:col-span-5 transition-opacity duration-700 mt-12 lg:mt-0 ${step === 2 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <div className="mb-8">
             <span className="text-[10px] uppercase tracking-[0.4em] text-[#7d3a2a] mb-2 block font-bold">Step 2</span>
             <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide uppercase">Deine Daten</h2>
        </div>
        <form onSubmit={handleCheckout} className="space-y-5">
          <div>
            <label className="block text-sm text-stone-600 mb-1">Vollständiger Name *</label>
            <input 
              required
              type="text" 
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              className="w-full border-b border-stone-300 py-2 px-1 focus:border-stone-900 focus:outline-none bg-transparent transition-colors" 
              placeholder="Max Mustermann"
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">E-Mail Adresse *</label>
            <input 
              required
              type="email" 
              value={guestEmail}
              onChange={e => setGuestEmail(e.target.value)}
              className="w-full border-b border-stone-300 py-2 px-1 focus:border-stone-900 focus:outline-none bg-transparent transition-colors" 
              placeholder="max@beispiel.de"
            />
          </div>
          <div>
            <label className="block text-sm text-stone-600 mb-1">Sonderwünsche / Notizen</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full border-b border-stone-300 py-2 px-1 focus:border-stone-900 focus:outline-none bg-transparent transition-colors resize-none h-20" 
              placeholder="Früher Check-In, Allergien..."
            />
          </div>

          <div className="bg-stone-50 p-4 border border-stone-200 mt-6 mt-8">
            <label className="block text-sm text-stone-900 font-medium mb-3">Gutscheincode anwenden</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={voucherCode}
                onChange={e => setVoucherCode(e.target.value.toUpperCase())}
                className="flex-1 border border-stone-300 px-3 py-2 text-sm uppercase" 
                placeholder="PROMO2026"
                disabled={!!voucherData}
              />
              <button 
                type="button"
                onClick={handleValidateVoucher}
                disabled={!voucherCode || validatingVoucher || !!voucherData}
                className="bg-stone-900 text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-stone-700 disabled:opacity-50"
              >
                {validatingVoucher ? <Loader2 className="animate-spin w-4 h-4" /> : (voucherData ? 'Angewendet' : 'Prüfen')}
              </button>
            </div>
            {voucherError && <p className="text-red-500 text-xs mt-2">{voucherError}</p>}
            {voucherData && (
              <div className="flex justify-between items-center text-green-600 text-xs mt-2">
                <span>Code erfolgreich angewendet!</span>
                <button type="button" onClick={() => {setVoucherData(null); setVoucherCode("")}} className="underline">Entfernen</button>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={checkingOut || !date?.from || !date?.to || !guestName || !guestEmail}
            className="w-full bg-stone-900 text-white py-4 uppercase tracking-[0.2em] font-light text-sm hover:bg-stone-800 transition-colors mt-8 disabled:opacity-50 flex justify-center items-center"
          >
            {checkingOut ? <Loader2 className="animate-spin mr-2" /> : null}
            Kostenpflichtig buchen ({finalTotal.toFixed(2)} €)
          </button>
          
          <p className="text-[10px] text-stone-500 text-center mt-4">
            Du wirst sicher zu Stripe weitergeleitet, um die Zahlung abzuschließen.
          </p>

        </form>
      </div>
    </div>
  );
}

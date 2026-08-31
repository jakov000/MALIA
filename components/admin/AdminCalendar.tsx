"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2, Save, RefreshCw, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { format, addMonths, startOfMonth, getDaysInMonth, isWithinInterval, startOfDay, subMonths } from "date-fns";
import { de } from "date-fns/locale";

const ROOMS = ["THE ALPINE HIDEAWAY", "THE RESIDENCE", "THE RETREAT"];

// Which units a block actually takes off the market on the public site.
// Mirrors the `relatedRooms` logic in BookingForm.tsx: THE ALPINE HIDEAWAY is the
// whole chalet, THE RESIDENCE and THE RETREAT are the two parts of it.
const ROOM_AFFECTS: Record<string, string[]> = {
  "THE ALPINE HIDEAWAY": ["THE ALPINE HIDEAWAY", "THE RESIDENCE", "THE RETREAT"],
  "THE RESIDENCE": ["THE RESIDENCE", "THE ALPINE HIDEAWAY"],
  "THE RETREAT": ["THE RETREAT", "THE ALPINE HIDEAWAY"],
  "ALL": ROOMS,
};

const BLOCKING_STATUS = ["OWN_USE", "CLOSED", "UNAVAILABLE"];

const STATUS_LABEL: Record<string, string> = {
  OWN_USE: "Eigenbelegung",
  CLOSED: "Geschlossen",
  UNAVAILABLE: "Nicht verfügbar",
  AVAILABLE: "Verfügbar",
};

type DailyState = {
  status: "AVAILABLE" | "UNAVAILABLE" | "OWN_USE" | "CLOSED" | "BOOKED" | "EXTERNAL";
  price: number | null;
  minStay: number | null;
  source?: string;
  isInvalidDay?: boolean;
};

export default function AdminCalendar() {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({ rules: [], blocks: [], bookings: [], allBlocks: [], allRules: [] });

  // Filters for the combined list at the bottom
  const [listFilter, setListFilter] = useState<"BLOCKING" | "ALL">("BLOCKING");
  const [hidePast, setHidePast] = useState(true);
  
  // Settings Form State
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formStatus, setFormStatus] = useState("AVAILABLE");
  const [formPrice, setFormPrice] = useState("");
  const [formMinStay, setFormMinStay] = useState("");
  const [saving, setSaving] = useState(false);
  
  // Calendar View State
  const [baseDate, setBaseDate] = useState(() => startOfMonth(new Date()));
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchCalendarData();
  }, [selectedRoom, baseDate]);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/calendar?room=${encodeURIComponent(selectedRoom)}&t=${Date.now()}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStart || !formEnd) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: formStart,
          endDate: formEnd,
          room: selectedRoom,
          status: formStatus,
          price: formPrice ? parseFloat(formPrice) : null,
          minStay: formMinStay ? parseInt(formMinStay) : null
        })
      });
      if (res.ok) {
        fetchCalendarData();
        setFormPrice("");
        setFormMinStay("");
        alert("Einstellung gespeichert!");
      }
    } catch (error) {
      console.error(error);
      alert("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/ical/import", { method: "POST" });
      if (res.ok) {
        const result = await res.json();
        alert(`Synchronisation erfolgreich! ${result.importedCount} Sperrungen importiert.`);
        fetchCalendarData();
      } else {
        alert("Fehler bei der Synchronisation.");
      }
    } catch (err) {
      console.error(err);
      alert("Fehler bei der Synchronisation.");
    } finally {
      setSyncing(false);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    if (!confirm("Sperrung entfernen? Achtung: Beim nächsten iCal Sync könnte sie wieder importiert werden, wenn sie im Fremdportal noch existiert.")) return;
    try {
      const res = await fetch(`/api/blocked-dates/${id}`, { method: "DELETE" });
      if (res.ok) fetchCalendarData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!confirm("Eigenen Eintrag wirklich löschen? Der Zeitraum wird danach auf der Website wieder freigegeben (sofern keine andere Sperre greift).")) return;
    try {
      const res = await fetch(`/api/admin/calendar/${id}`, { method: "DELETE" });
      if (res.ok) fetchCalendarData();
      else alert("Löschen fehlgeschlagen.");
    } catch (err) {
      console.error(err);
      alert("Löschen fehlgeschlagen.");
    }
  };

  // Merge our own CalendarRules and the imported iCal blocks into one comparable list
  const combinedEntries = useMemo(() => {
    const todayStart = startOfDay(new Date()).getTime();

    const external = (data.allBlocks || []).map((b: any) => ({
      id: b.id,
      kind: "BLOCK" as const,
      startDate: b.startDate,
      endDate: b.endDate,
      room: b.room,
      source: b.source,
      reason: b.reason,
      status: null as string | null,
      price: null,
      minStay: null,
      blocks: true,
      invalid: false,
    }));

    const own = (data.allRules || []).map((r: any) => ({
      id: r.id,
      kind: "RULE" as const,
      startDate: r.startDate,
      endDate: r.endDate,
      room: r.room,
      source: "MANUELL",
      reason: r.reason,
      status: r.status as string,
      price: r.price,
      minStay: r.minStay,
      blocks: BLOCKING_STATUS.includes(r.status),
      // Ranges saved the wrong way round never match a single day - they look active
      // in this list but have no effect at all on the website.
      invalid: new Date(r.startDate).getTime() > new Date(r.endDate).getTime(),
    }));

    return [...external, ...own]
      .filter((e) => (listFilter === "ALL" ? true : e.blocks))
      .filter((e) => (hidePast ? new Date(e.endDate).getTime() >= todayStart : true))
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [data, listFilter, hidePast]);

  const ownBlockingCount = useMemo(
    () => (data.allRules || []).filter((r: any) => BLOCKING_STATUS.includes(r.status)).length,
    [data]
  );

  // Generate matrix
  const matrix = useMemo(() => {
    const months = [];

    for (let i = 0; i < 18; i++) {
      const monthDate = addMonths(baseDate, i);
      const daysInMonth = getDaysInMonth(monthDate);
      const daysRow: DailyState[] = [];

      for (let day = 1; day <= 31; day++) {
        if (day > daysInMonth) {
          daysRow.push({ status: "UNAVAILABLE", price: null, minStay: null, isInvalidDay: true });
          continue;
        }

        const currentDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
        const currentTarget = startOfDay(currentDate);

        let dayState: DailyState = { status: "AVAILABLE", price: null, minStay: null };

        // 1. Base Rules 
        const activeRules = data.rules.filter((r: any) => 
          isWithinInterval(currentTarget, { start: startOfDay(new Date(r.startDate)), end: startOfDay(new Date(r.endDate)) })
        );
        for (const rule of activeRules) {
          dayState.status = rule.status;
          if (rule.price !== null) dayState.price = rule.price;
          if (rule.minStay !== null) dayState.minStay = rule.minStay;
        }

        // 2. External Blocks 
        const externalBlock = data.blocks.find((b: any) => {
          const start = startOfDay(new Date(b.startDate)).getTime();
          const end = startOfDay(new Date(b.endDate)).getTime();
          const target = currentTarget.getTime();
          return target >= start && target < end;
        });
        if (externalBlock) {
          dayState.status = "EXTERNAL";
          dayState.source = externalBlock.source;
        }

        // 3. Direct Bookings 
        const directBooking = data.bookings.find((b: any) => {
          const start = startOfDay(new Date(b.startDate)).getTime();
          const end = startOfDay(new Date(b.endDate)).getTime();
          const target = currentTarget.getTime();
          return target >= start && target < end;
        });
        if (directBooking) {
          dayState.status = "BOOKED";
        }

        daysRow.push(dayState);
      }
      months.push({ date: monthDate, daysRow });
    }
    return months;
  }, [data, baseDate]);

  const getCellColor = (state: DailyState) => {
    if (state.isInvalidDay) return "bg-gray-100 text-gray-400";
    if (state.status === "AVAILABLE") return "bg-green-100/50 text-green-700 border-green-200 border";
    if (state.status === "OWN_USE") return "bg-pink-100/50 text-pink-700 border-pink-200 border";
    if (state.status === "CLOSED" || state.status === "UNAVAILABLE") return "bg-red-100/50 text-red-700 border-red-200 border";
    if (state.status === "BOOKED") return "bg-blue-100/50 text-blue-700 border-blue-200 border";
    
    // Distinguish Source for External
    if (state.status === "EXTERNAL") {
      if (state.source === "AIRBNB") return "bg-rose-100/60 text-rose-700 border-rose-200 border";
      if (state.source === "BOOKING") return "bg-indigo-100/50 text-indigo-700 border-indigo-200 border";
      return "bg-orange-100/50 text-orange-700 border-orange-200 border"; 
    }
    return "bg-white";
  };

  const getCellLabel = (state: DailyState) => {
    if (state.isInvalidDay) return "-";
    if (state.status === "OWN_USE") return "E";
    if (state.status === "CLOSED" || state.status === "UNAVAILABLE") return "X";
    if (state.status === "BOOKED") return "D"; // Direktbuchung
    
    // Distinguish Source for External
    if (state.status === "EXTERNAL") {
      if (state.source === "AIRBNB") return "A";
      if (state.source === "BOOKING") return "B";
      return "F"; 
    }
    
    return "1"; // "1" for available
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <select 
          value={selectedRoom} 
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="border-b-2 border-[#3d3d29] py-2 focus:outline-none bg-transparent text-lg font-serif uppercase tracking-widest text-[#3d3d29]"
        >
          {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Settings Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
        <h2 className="text-sm font-bold uppercase tracking-widest text-stone-800 mb-4">Einstellungen für diesen Zeitraum</h2>
        
        <form onSubmit={handleSaveRule} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end bg-stone-50 p-4 rounded-xl border border-stone-100">
          <div className="md:col-span-1">
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Von</label>
            <input required type="date" value={formStart} onChange={e => setFormStart(e.target.value)} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent text-sm" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Bis</label>
            <input required type="date" value={formEnd} onChange={e => setFormEnd(e.target.value)} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent text-sm" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Verfügbarkeit</label>
            <select value={formStatus} onChange={e => setFormStatus(e.target.value)} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent text-sm">
              <option value="AVAILABLE">Verfügbar</option>
              <option value="UNAVAILABLE">Nicht verfügbar</option>
              <option value="OWN_USE">Eigenbelegung</option>
              <option value="CLOSED">Geschlossen</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Preis pro Nacht (€)</label>
            <input type="number" step="0.01" value={formPrice} onChange={e => setFormPrice(e.target.value)} placeholder="Standard behalten" className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent text-sm placeholder:text-stone-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Mindestaufenthalt</label>
            <input type="number" value={formMinStay} onChange={e => setFormMinStay(e.target.value)} placeholder="Standard behalten" className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent text-sm placeholder:text-stone-300" />
          </div>
          <div className="md:col-span-1">
            <button type="submit" disabled={saving || !formStart || !formEnd} className="w-full bg-[#3d3d29] text-white flex items-center justify-center space-x-2 py-2.5 rounded-lg hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
              <span>Speichern</span>
            </button>
          </div>
        </form>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden relative flex flex-col">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 w-full h-full">
            <Loader2 className="animate-spin text-stone-400" size={32} />
          </div>
        )}
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between p-4 bg-stone-50 border-b border-stone-200">
          <h3 className="text-sm font-bold text-stone-800 uppercase tracking-widest">
            {format(baseDate, "MMMM yyyy", { locale: de })} bis {format(addMonths(baseDate, 17), "MMMM yyyy", { locale: de })}
          </h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setBaseDate(prev => subMonths(prev, 6))}
              className="p-1.5 bg-white border border-stone-200 rounded hover:bg-stone-100 transition-colors"
              title="6 Monate zurück"
            >
              <ChevronLeft size={18} className="text-stone-600" />
            </button>
            <button 
              onClick={() => setBaseDate(prev => addMonths(prev, 6))}
              className="p-1.5 bg-white border border-stone-200 rounded hover:bg-stone-100 transition-colors"
              title="6 Monate vor"
            >
              <ChevronRight size={18} className="text-stone-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto p-4 max-w-full">
          <div className="min-w-max">
            <div className="flex text-xs font-bold text-stone-600 mb-2">
              <div className="w-32 flex-shrink-0"></div>
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} className="w-8 text-center">{String(i + 1).padStart(2, '0')}</div>
              ))}
            </div>
            
            <div className="space-y-1 pb-4">
              {matrix.map((month) => (
                <div key={month.date.toISOString()} className="flex items-center text-xs">
                  <div className="w-32 flex-shrink-0 font-medium text-stone-700">
                    {format(month.date, "MMM yyyy", { locale: de })}
                  </div>
                  <div className="flex">
                    {month.daysRow.map((dayState, i) => (
                      <div 
                        key={i} 
                        title={`Status: ${dayState.status}\nQuelle: ${dayState.source || '-'}\nPreis: ${dayState.price ? dayState.price + '€' : 'Standard'}\nMin: ${dayState.minStay ? dayState.minStay + ' Nächte' : 'Standard'}`}
                        className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold cursor-default transition-colors ${getCellColor(dayState)}`}
                      >
                        {getCellLabel(dayState)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-stone-100 flex flex-wrap gap-4 text-xs text-stone-600 bg-stone-50 mt-auto">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 flex items-center justify-center text-[8px] text-green-700 font-bold">1</div>
            <span>Verfügbar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-100 border border-pink-200 flex items-center justify-center text-[8px] text-pink-700 font-bold">E</div>
            <span>Eigenbelegung</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 flex items-center justify-center text-[8px] text-red-700 font-bold">X</div>
            <span>Geschlossen</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-rose-100 border border-rose-200 flex items-center justify-center text-[8px] text-rose-700 font-bold">A</div>
            <span>Airbnb</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[8px] text-indigo-700 font-bold">B</div>
            <span>Booking.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 flex items-center justify-center text-[8px] text-blue-700 font-bold">D</div>
            <span>Direktbuchung</span>
          </div>
        </div>
      </div>

      {/* Combined list: our own entries + imported iCal blocks */}
      <div className="pt-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xl font-serif text-stone-800">Belegungen &amp; Sperren</h3>
            <p className="text-xs text-stone-500 mt-1">
              Eigene Einträge und importierte Fremdportal-Sperren im Vergleich &ndash; über alle Einheiten hinweg.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-md border border-stone-200 overflow-hidden text-[10px] uppercase tracking-wider font-bold">
              <button
                onClick={() => setListFilter("BLOCKING")}
                className={`px-4 py-2.5 transition-colors ${listFilter === "BLOCKING" ? "bg-[#3d3d29] text-white" : "bg-white text-stone-600 hover:bg-stone-50"}`}
              >
                Nur Sperren
              </button>
              <button
                onClick={() => setListFilter("ALL")}
                className={`px-4 py-2.5 transition-colors border-l border-stone-200 ${listFilter === "ALL" ? "bg-[#3d3d29] text-white" : "bg-white text-stone-600 hover:bg-stone-50"}`}
              >
                Alle Einträge
              </button>
            </div>
            <label className="flex items-center space-x-2 text-xs text-stone-600 cursor-pointer select-none">
              <input type="checkbox" checked={hidePast} onChange={e => setHidePast(e.target.checked)} className="accent-[#3d3d29]" />
              <span>Vergangene ausblenden</span>
            </label>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="text-xs uppercase tracking-widest hover:bg-stone-200 bg-stone-100 text-stone-700 py-2.5 px-6 rounded-md transition-colors flex items-center space-x-2 font-bold shadow-sm border border-stone-200"
            >
              {syncing ? <Loader2 className="animate-spin" size={14} /> : <span>Jetzt synchronisieren</span>}
            </button>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Zeitraum</th>
                <th className="px-6 py-4">Zimmer</th>
                <th className="px-6 py-4">Quelle</th>
                <th className="px-6 py-4">Art / Grund</th>
                <th className="px-6 py-4 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {combinedEntries.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-stone-400">Keine Einträge für diese Auswahl.</td></tr>
              ) : null}
              {combinedEntries.map((e: any) => {
                const affected = e.blocks ? (ROOM_AFFECTS[e.room] || [e.room]).filter((r: string) => r !== e.room) : [];
                return (
                  <tr key={`${e.kind}-${e.id}`} className={`hover:bg-stone-50/50 transition-colors ${e.invalid ? "bg-amber-50/60" : ""}`}>
                    <td className="px-6 py-4">
                      <span className="font-medium text-stone-900">{format(new Date(e.startDate), "dd.MM.yyyy")}</span>
                      <span className="text-stone-400 mx-3">-</span>
                      <span className="font-medium text-stone-900">{format(new Date(e.endDate), "dd.MM.yyyy")}</span>
                      {e.invalid && (
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mt-1">
                          Enddatum liegt vor Startdatum &ndash; ohne Wirkung
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                        {e.room === "ALL" ? "Alle Zimmer" : e.room}
                      </div>
                      {affected.length > 0 && !e.invalid && (
                        <div className="text-[10px] text-stone-400 mt-1 normal-case tracking-normal">
                          sperrt mit: {affected.join(", ")}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                        e.source === "AIRBNB" ? "bg-rose-100 text-rose-700" :
                        e.source === "BOOKING" ? "bg-indigo-100 text-indigo-700" :
                        e.source === "MANUELL" ? "bg-pink-100 text-pink-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {e.source === "MANUELL" ? "Eigener Eintrag" : e.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-xs">
                      {e.kind === "RULE" ? (
                        <>
                          <span className={e.blocks ? "font-bold text-stone-700" : "text-stone-500"}>
                            {STATUS_LABEL[e.status] || e.status}
                          </span>
                          {(e.price !== null || e.minStay !== null) && (
                            <span className="text-stone-400">
                              {e.price !== null ? ` · ${e.price} €` : ""}
                              {e.minStay !== null ? ` · min. ${e.minStay} Nächte` : ""}
                            </span>
                          )}
                          {e.reason ? <div className="text-stone-400 mt-1">{e.reason}</div> : null}
                        </>
                      ) : (
                        e.reason || "-"
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => e.kind === "RULE" ? handleDeleteRule(e.id) : handleDeleteBlock(e.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-2"
                        title="Löschen"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-stone-400 mt-3">
          {ownBlockingCount} eigene Sperren insgesamt hinterlegt. Fremdportal-Sperren kommen beim nächsten Sync erneut,
          solange sie bei Airbnb bzw. Booking.com bestehen &ndash; eigene Einträge bleiben gelöscht.
        </p>
      </div>

    </div>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2, Save, RefreshCw, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { format, addMonths, startOfMonth, getDaysInMonth, isWithinInterval, startOfDay, subMonths } from "date-fns";
import { de } from "date-fns/locale";

const ROOMS = ["THE ALPINE HIDEAWAY", "THE RESIDENCE", "THE RETREAT"];

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
  const [data, setData] = useState<any>({ rules: [], blocks: [], bookings: [] });
  
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

      {/* External Bookings List */}
      <div className="pt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-serif text-stone-800">Malia Blockierte Zeiträume</h3>
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="text-xs uppercase tracking-widest bg-stone-100-hover hover:bg-stone-200 bg-stone-100 text-stone-700 py-2.5 px-6 rounded-md transition-colors flex items-center space-x-2 font-bold shadow-sm border border-stone-200"
          >
            {syncing ? <Loader2 className="animate-spin" size={14} /> : <span>Jetzt synchronisieren</span>}
          </button>
        </div>
        
        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Zeitraum</th>
                <th className="px-6 py-4">Zimmer</th>
                <th className="px-6 py-4">Quelle</th>
                <th className="px-6 py-4">Grund</th>
                <th className="px-6 py-4 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {!data.allBlocks || data.allBlocks.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-stone-400">Keine Fremdbuchungen gefunden.</td></tr>
              ) : null}
              {data.allBlocks?.map((b: any) => (
                <tr key={b.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-stone-900">{format(new Date(b.startDate), "dd.MM.yyyy")}</span>
                    <span className="text-stone-400 mx-3">-</span>
                    <span className="font-medium text-stone-900">{format(new Date(b.endDate), "dd.MM.yyyy")}</span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                    {b.room === "ALL" ? "Alle Zimmer" : b.room}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                      b.source === "AIRBNB" ? "bg-rose-100 text-rose-700" :
                      b.source === "BOOKING" ? "bg-indigo-100 text-indigo-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {b.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-500 text-xs">
                    {b.reason || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteBlock(b.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-2"
                      title="Löschen"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

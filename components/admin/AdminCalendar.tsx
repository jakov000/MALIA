"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

type BlockedDate = {
  id: string;
  startDate: string;
  endDate: string;
  reason: string | null;
  source: string;
};

export default function AdminCalendar() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const fetchBlockedDates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blocked-dates");
      if (res.ok) setBlockedDates(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    
    setCreating(true);
    try {
      const res = await fetch("/api/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          reason
        }),
      });
      
      if (res.ok) {
        setStartDate("");
        setEndDate("");
        setReason("");
        fetchBlockedDates();
      } else {
        alert("Fehler beim Sperren des Zeitraums.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sperrung aufheben? Dieser Zeitraum wird wieder buchbar.")) return;
    try {
      const res = await fetch(`/api/blocked-dates/${id}`, { method: "DELETE" });
      if (res.ok) fetchBlockedDates();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-stone-400" size={32} /></div>;

  return (
    <div className="space-y-12">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-stone-100">
        <div>
          <h2 className="text-2xl font-serif text-stone-900 mb-1">Zeitraum manuell sperren</h2>
          <p className="text-stone-500 font-light text-sm mb-6">Blockiere Daten für private Nutzung, Reinigung oder Handwerker.</p>
        </div>
        
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Von</label>
            <input required type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Bis</label>
            <input required type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Grund (optional)</label>
            <input type="text" value={reason} onChange={e => setReason(e.target.value)} placeholder="z.B. Reparatur" className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent" />
          </div>
          <div className="md:col-span-1">
            <button type="submit" disabled={creating || !startDate || !endDate} className="w-full bg-stone-900 text-white flex items-center justify-center space-x-2 py-3 rounded-md hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs disabled:opacity-50">
              {creating ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
              <span>Sperren</span>
            </button>
          </div>
        </form>
      </div>

      <div className="pt-4">
        <h3 className="text-xl font-serif text-stone-800 mb-4">Malia Blockierte Zeiträume</h3>
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50 border-b text-stone-600 font-medium">
              <tr>
                <th className="px-6 py-4">Zeitraum</th>
                <th className="px-6 py-4">Quelle</th>
                <th className="px-6 py-4">Grund</th>
                <th className="px-6 py-4 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {blockedDates.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-stone-400">Keine Zeiträume blockiert.</td></tr>
              ) : null}
              {blockedDates.map((b) => (
                <tr key={b.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-stone-900">{format(new Date(b.startDate), "dd.MM.yyyy")}</span>
                    <span className="text-stone-400 mx-2">-</span>
                    <span className="font-medium text-stone-900">{format(new Date(b.endDate), "dd.MM.yyyy")}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                      b.source === "MANUAL" ? "bg-stone-200 text-stone-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {b.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-500">
                    {b.reason || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(b.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-2"
                      title="Entsperren"
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

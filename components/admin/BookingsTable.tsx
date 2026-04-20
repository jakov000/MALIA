"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Loader2, Trash2, XCircle } from "lucide-react";

type Booking = {
  id: string;
  guestName: string;
  guestEmail: string;
  startDate: string;
  endDate: string;
  room: string;
  totalPrice: number;
  status: string;
  source: string;
  notes: string | null;
  createdAt: string;
};

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Buchung wirklich komplett löschen? Dies kann nicht rückgängig gemacht werden.")) return;
    
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchBookings();
      } else {
        alert("Löschen fehlgeschlagen.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Buchung stornieren? Dadurch wird der Kalender für diesen Zeitraum wieder freigegeben.")) return;
    
    try {
      const res = await fetch(`/api/bookings/${id}`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" })
      });
      if (res.ok) {
        fetchBookings();
      } else {
        alert("Stornierung fehlgeschlagen.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-stone-400" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif text-stone-900">Alle Buchungen</h2>
          <p className="text-stone-500 font-light mt-1">Überblick über Gäste, Zahlungen und Aufenthalte.</p>
        </div>
      </div>

      <div className="bg-white border md:rounded-lg overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-50 border-b text-stone-600 font-medium">
            <tr>
              <th className="px-6 py-4">Gast</th>
              <th className="px-6 py-4">Objekt / Zeitraum</th>
              <th className="px-6 py-4">Preis</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Quelle</th>
              <th className="px-6 py-4 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {bookings.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-stone-400">Keine Buchungen gefunden.</td></tr>
            ) : null}
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-stone-900">{b.guestName}</div>
                  <div className="text-xs text-stone-500">{b.guestEmail}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-0.5 bg-stone-100 text-[#3d3d29] text-[10px] uppercase tracking-wider rounded-sm font-bold mb-1.5">{b.room}</span>
                  <div className="text-stone-900 block">{format(new Date(b.startDate), "dd.MM.yyyy")}</div>
                  <div className="text-stone-500 text-xs mt-0.5">bis {format(new Date(b.endDate), "dd.MM.yyyy")}</div>
                </td>
                <td className="px-6 py-4 text-stone-900 font-medium">
                  € {b.totalPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                    b.status === "PAID" ? "bg-green-100 text-green-700" :
                    b.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-stone-500 uppercase">
                  {b.source}
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  {b.status !== "CANCELLED" && (
                    <button 
                      onClick={() => handleCancel(b.id)}
                      className="text-stone-400 hover:text-orange-600 transition-colors p-2"
                      title="Buchung stornieren"
                    >
                      <XCircle size={16} />
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(b.id)}
                    className="text-stone-400 hover:text-red-600 transition-colors p-2"
                    title="Endgültig löschen"
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
  );
}

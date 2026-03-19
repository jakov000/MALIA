"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

type Voucher = {
  id: string;
  code: string;
  discountValue: number;
  discountType: "FIXED" | "PERCENTAGE";
  currentBalance: number;
  isActive: boolean;
  createdAt: string;
  expiresAt: string | null;
};

export default function VoucherManager() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create Form State
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"FIXED" | "PERCENTAGE">("FIXED");
  const [expires, setExpires] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/vouchers");
      if (res.ok) setVouchers(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    
    try {
      const res = await fetch("/api/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.toUpperCase(),
          discountValue: parseFloat(amount),
          discountType: type,
          // if empty, send undefined
          expiresAt: expires ? new Date(expires).toISOString() : undefined
        }),
      });
      
      if (res.ok) {
        setCode("");
        setAmount("");
        setExpires("");
        fetchVouchers();
      } else {
        const error = await res.json();
        alert(`Fehler: ${error.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Fehler beim Erstellen des Gutscheins");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Gutschein wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.")) return;
    try {
      const res = await fetch(`/api/vouchers/${id}`, { method: "DELETE" });
      if (res.ok) fetchVouchers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-stone-400" size={32} /></div>;

  return (
    <div className="space-y-12">
      {/* HEADER & NEW VOUCHER FORM */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-stone-100">
        <div>
          <h2 className="text-2xl font-serif text-stone-900 mb-1">Neuen Gutschein erstellen</h2>
          <p className="text-stone-500 font-light text-sm mb-6">Erstelle Rabattcodes für Gäste oder Kampagnen.</p>
        </div>
        
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Code</label>
            <input required type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none uppercase bg-transparent" placeholder="SOMMER26" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Wert</label>
            <input required type="number" min="1" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent" placeholder="50" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Typ</label>
            <select value={type} onChange={e => setType(e.target.value as any)} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent appearance-none rounded-none text-sm">
              <option value="FIXED">Euro (€)</option>
              <option value="PERCENTAGE">Prozent (%)</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Gültig bis</label>
            <input type="date" value={expires} onChange={e => setExpires(e.target.value)} className="w-full border-b border-stone-300 py-2 focus:border-stone-900 focus:outline-none bg-transparent text-sm" />
          </div>
          <div className="md:col-span-1">
            <button type="submit" disabled={creating || !code || !amount} className="w-full bg-stone-900 text-white flex items-center justify-center space-x-2 py-3 rounded-md hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs disabled:opacity-50">
              {creating ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
              <span>Erstellen</span>
            </button>
          </div>
        </form>
      </div>

      {/* VOUCHERS LIST */}
      <div className="pt-4">
        <h3 className="text-xl font-serif text-stone-800 mb-4">Aktive & Vergangene Gutscheine</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouchers.map((v) => (
            <div key={v.id} className={`p-6 border rounded-lg relative transition-all ${v.isActive ? "bg-white border-stone-200" : "bg-stone-50 border-stone-100 opacity-60"}`}>
              <button onClick={() => handleDelete(v.id)} className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
              
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#7d3a2a] mb-2">
                {v.isActive ? "Aktiv" : "Inaktiv"}
              </div>
              
              <h4 className="text-2xl font-serif tracking-widest text-stone-900 uppercase">{v.code}</h4>
              
              <div className="my-4 pt-4 border-t border-stone-100 flex justify-between items-center text-sm">
                <span className="text-stone-500">Wert/Rabatt:</span>
                <span className="font-medium text-stone-900">{v.discountType === "FIXED" ? `€ ${v.discountValue.toFixed(2)}` : `${v.discountValue}%`}</span>
              </div>
              
              {v.discountType === "FIXED" && (
                <div className="mb-4 flex justify-between items-center text-sm">
                  <span className="text-stone-500">Restliches Guthaben:</span>
                  <span className="font-medium text-stone-900">€ {v.currentBalance.toFixed(2)}</span>
                </div>
              )}

              {v.expiresAt && (
                <div className="flex justify-between items-center text-xs text-stone-400">
                  <span>Läuft ab am:</span>
                  <span>{new Date(v.expiresAt).toLocaleDateString("de-DE")}</span>
                </div>
              )}
            </div>
          ))}
          {vouchers.length === 0 && (
             <div className="col-span-full text-center py-12 text-stone-400 border border-dashed border-stone-300 rounded-lg">
               Keine Gutscheine vorhanden.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

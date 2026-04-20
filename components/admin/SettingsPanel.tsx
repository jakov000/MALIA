"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import Button from "@/components/ui/Button";

interface RoomConfig {
  id: string;
  roomName: string;
  pricePerNight: number;
  minStayDays: number;
  noCheckoutDays: string; // JSON array like "[0,6]" (Sun, Sat)
}

const WEEKDAYS = [
  { value: 1, label: "Montag" },
  { value: 2, label: "Dienstag" },
  { value: 3, label: "Mittwoch" },
  { value: 4, label: "Donnerstag" },
  { value: 5, label: "Freitag" },
  { value: 6, label: "Samstag" },
  { value: 0, label: "Sonntag" },
];

export default function SettingsPanel() {
  const [configs, setConfigs] = useState<RoomConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        setConfigs(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleUpdate = async (id: string, updates: Partial<RoomConfig>) => {
    setConfigs(configs.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const saveConfig = async (config: RoomConfig) => {
    setSavingId(config.id);
    try {
      // Decode the string holding the array to pass an actual array to PUT route
      const noCheckoutArray = JSON.parse(config.noCheckoutDays);
      
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: config.id,
          pricePerNight: config.pricePerNight,
          minStayDays: config.minStayDays,
          noCheckoutDays: noCheckoutArray
        })
      });
      if (!res.ok) alert("Fehler beim Speichern");
    } catch(err) {
      console.error(err);
      alert("Systemfehler beim Speichern.");
    } finally {
      setSavingId(null);
    }
  };

  const toggleCheckoutDay = (config: RoomConfig, dayValue: number) => {
    const currentDays: number[] = JSON.parse(config.noCheckoutDays);
    const newDays = currentDays.includes(dayValue) 
      ? currentDays.filter(d => d !== dayValue)
      : [...currentDays, dayValue];
      
    handleUpdate(config.id, { noCheckoutDays: JSON.stringify(newDays) });
  };

  if (loading) return <div className="p-8"><Loader2 className="animate-spin w-8 h-8 text-stone-400" /></div>;

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-serif text-stone-900 mb-2">Einstellungen</h1>
        <p className="text-stone-500">Verwalte Preise, Mindestaufenthalte und Abreise-Sperrtage für jedes Hideaway.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {configs.map(config => (
          <div key={config.id} className="bg-white border border-stone-200 p-6 rounded-sm shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-serif uppercase tracking-widest text-[#3d3d29]">{config.roomName}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Basic Settings */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Preis pro Nacht (€)</label>
                  <input 
                    type="number" 
                    min="1"
                    className="w-full border border-stone-300 p-3 rounded-sm focus:border-stone-900 focus:outline-none"
                    value={config.pricePerNight}
                    onChange={(e) => handleUpdate(config.id, { pricePerNight: parseFloat(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-stone-500 mt-1">Der Basispreis in Euro.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Mindestaufenthalt (Nächte)</label>
                  <input 
                    type="number" 
                    min="1"
                    className="w-full border border-stone-300 p-3 rounded-sm focus:border-stone-900 focus:outline-none"
                    value={config.minStayDays}
                    onChange={(e) => handleUpdate(config.id, { minStayDays: parseInt(e.target.value) || 1 })}
                  />
                  <p className="text-xs text-stone-500 mt-1">Gäste müssen mindestens diese Anzahl an Nächten buchen.</p>
                </div>
              </div>

              {/* Right Column: Checkout Restrictions */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Sperrtage für die Abreise</label>
                <p className="text-xs text-stone-500 mb-4">An diesen markierten Tagen kann der Gast <strong>nicht abreisen</strong> (Enddatum blockiert).</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {WEEKDAYS.map(day => {
                    const isSelected = JSON.parse(config.noCheckoutDays).includes(day.value);
                    return (
                      <button
                        key={day.value}
                        onClick={() => toggleCheckoutDay(config, day.value)}
                        className={`p-2 text-sm border rounded-sm transition-colors text-left flex items-center justify-between ${
                          isSelected 
                            ? 'bg-stone-900 border-stone-900 text-white font-medium' 
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        {day.label}
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white opacity-80"></span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end">
              <button 
                onClick={() => saveConfig(config)}
                disabled={savingId === config.id}
                className="bg-[#bcc2b2] text-stone-800 px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#b0b8a5] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {savingId === config.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Speichern
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

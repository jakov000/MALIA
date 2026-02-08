"use client";
import { useState, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import PageFooter from "@/components/PageFooter";
import Button from "@/components/ui/Button";

export default function DatenschutzEinstellungen() {
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    // Hier würde man normalerweise die gespeicherten Einstellungen aus dem LocalStorage lesen
    useEffect(() => {
        // const savedSettings = localStorage.getItem('cookieSettings');
        // if (savedSettings) { ... }
    }, []);

    const handleSave = () => {
        // Speichern der Einstellungen
        console.log("Settings saved:", { analytics, marketing });
        // localStorage.setItem('cookieSettings', JSON.stringify({ analytics, marketing }));
        alert("Einstellungen gespeichert");
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader title="Datenschutzeinstellungen" />
                <div className="space-y-8 font-light text-gray-600">
                    <p>Hier können Sie Ihre Datenschutzeinstellungen anpassen. Essenzielle Cookies sind für den Betrieb der Seite notwendig.</p>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-stone-50 border border-stone-100">
                            <div>
                                <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-1">Essenziell</h3>
                                <p className="text-xs">Notwendig für die grundlegende Funktion der Website.</p>
                            </div>
                            <input type="checkbox" checked disabled className="w-5 h-5 accent-stone-800" />
                        </div>

                        <div className="flex items-center justify-between p-6 bg-stone-50 border border-stone-100">
                            <div>
                                <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-1">Analyse</h3>
                                <p className="text-xs">Hilft uns zu verstehen, wie Besucher mit der Website interagieren.</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={analytics}
                                onChange={(e) => setAnalytics(e.target.checked)}
                                className="w-5 h-5 accent-stone-800"
                            />
                        </div>

                        <div className="flex items-center justify-between p-6 bg-stone-50 border border-stone-100">
                            <div>
                                <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-1">Marketing</h3>
                                <p className="text-xs">Ermöglicht personalisierte Werbung und Marketing-Funktionen.</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={marketing}
                                onChange={(e) => setMarketing(e.target.checked)}
                                className="w-5 h-5 accent-stone-800"
                            />
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button onClick={handleSave} variant="primary">Einstellungen speichern</Button>
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    );
}

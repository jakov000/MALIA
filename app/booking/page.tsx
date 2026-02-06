"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function BookingPage() {
    const VIOMA_BOOKING_URL = "https://zugang.vioma.de/booking/malia-hideaway";

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden bg-stone-900 flex items-center justify-center">
                <div className="absolute inset-0">
                    <img src="/pictures/hero/hero2/füllbild.jpg" className="w-full h-full object-cover opacity-60" alt="Booking Background" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center text-white"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-light block mb-4">Book your stay</span>
                    <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest">Jetzt Buchen</h1>
                </motion.div>
            </section>

            {/* Booking Integration */}
            <section className="py-12 md:py-24 px-4 bg-stone-50 min-h-[600px]">
                <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-sm overflow-hidden">

                    <div className="p-8 md:p-12 text-center border-b border-stone-100">
                        <h2 className="text-2xl font-serif text-stone-800 mb-4">Bestpreis-Garantie bei Direktbuchung</h2>
                        <p className="text-gray-500 font-light text-sm max-w-2xl mx-auto">
                            Buchen Sie Ihren Aufenthalt direkt über unser System und profitieren Sie von exklusiven Vorteilen und den besten Konditionen.
                        </p>
                    </div>

                    <div className="relative w-full h-[800px] md:h-[1000px] bg-stone-100 flex flex-col items-center justify-center p-8 text-center">
                        {/* HINWEIS: Dies ist ein Platzhalter, bis Vioma eingerichtet ist */}
                        <div className="bg-white p-8 max-w-lg shadow-lg">
                            <h3 className="text-xl font-serif mb-4 text-[#7d3a2a]">Buchungssystem Integration</h3>
                            <p className="text-gray-600 mb-6 text-sm">
                                Hier wird das Vioma-Buchungstool geladen. <br />
                                Da noch kein Vioma-Account verknüpft ist, können Sie uns gerne direkt eine Anfrage senden.
                            </p>
                            <a href="/inquiry" className="inline-block px-8 py-3 bg-stone-800 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-stone-700 transition-all">
                                Zur unverbindlichen Anfrage
                            </a>
                            <p className="mt-8 text-xs text-gray-400 border-t border-gray-100 pt-4">
                                <strong>Für den Administrator:</strong><br />
                                Sobald Sie Ihren Vioma-Zugangslink haben, öffnen Sie die Datei <code>app/booking/page.tsx</code> und ersetzen Sie <code>VIOMA_BOOKING_URL</code> mit Ihrem persönlichen Link.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

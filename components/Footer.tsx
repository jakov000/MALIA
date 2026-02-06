"use client";
import React from 'react';

export default function Footer() {
  // Deine spezifischen Vioma-Pfade
  const VIOMA_BOOKING_URL = "https://zugang.vioma.de/booking/malia-hideaway";
  const VIOMA_REQUEST_URL = "https://zugang.vioma.de/anfrage/malia-hideaway";

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-t border-gray-100 py-3 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-end gap-4 md:gap-8">

        {/* Datumsanzeige (Mock) */}
        <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-widest text-gray-500 font-sans">
          <div className="flex gap-2 items-baseline">
            <span className="font-bold text-gray-900 text-sm">ANREISE</span>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="font-bold text-gray-900 text-sm">ABREISE</span>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <a
            href="/booking"
            className="flex-1 md:flex-none px-8 py-3 bg-stone-900 text-center text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all"
          >
            Buchen
          </a>
          <a
            href="/inquiry"
            className="flex-1 md:flex-none px-8 py-3 border border-stone-300 text-center text-stone-600 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-50 transition-all"
          >
            Anfragen
          </a>
        </div>
      </div>
    </div>
  );
}
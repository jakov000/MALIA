"use client";
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const loc = (path: string) => `/${locale}${path}`;

  // Deine spezifischen Vioma-Pfade
  const VIOMA_BOOKING_URL = "https://zugang.vioma.de/booking/malia-hideaway";
  const VIOMA_REQUEST_URL = "https://zugang.vioma.de/anfrage/malia-hideaway";

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/436766207866" // Reale WhatsApp Nummer der Inhaber
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 md:right-12 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20b858] hover:scale-105 hover:shadow-2xl transition-all flex items-center justify-center group"
        title={t('whatsapp_title')}
      >
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
          <path d="M12.031 0C5.395 0 0 5.392 0 12.031c0 2.127.551 4.195 1.595 6.02L.012 24l6.115-1.604A12.003 12.003 0 0012.032 24c6.637 0 12.031-5.392 12.031-12.031C24.062 5.392 18.667 0 12.031 0zM12.031 22.022a9.973 9.973 0 01-5.093-1.39l-.364-.216-3.791.993 1.01-3.69-.238-.378a9.96 9.96 0 01-1.527-5.342C1.998 6.476 6.49 1.986 12.032 1.986c5.542 0 10.034 4.49 10.034 10.035 0 5.545-4.492 10.035-10.035 10.035zm5.503-7.525c-.302-.151-1.785-.882-2.062-.982-.278-.101-.482-.151-.682.151-.202.302-.782.982-.958 1.183-.176.201-.354.226-.656.075-.302-.151-1.274-.47-2.428-1.494-.897-.798-1.503-1.785-1.68-2.087-.175-.302-.019-.465.132-.616.136-.136.302-.352.453-.529.151-.176.202-.301.302-.503.1-.201.05-.377-.025-.528-.076-.151-.682-1.643-.935-2.25-.247-.591-.497-.512-.682-.52-.176-.008-.378-.01-.58-.01-.201 0-.528.076-.805.378-.277.302-1.056 1.03-1.056 2.514s1.082 2.915 1.233 3.117c.15.201 2.124 3.242 5.143 4.544.718.31 1.28.494 1.719.633.722.228 1.38.196 1.898.119.582-.086 1.785-.73 2.037-1.433.252-.704.252-1.307.176-1.432-.075-.126-.277-.202-.58-.353z" />
        </svg>
        {/* Optional: Hover Tooltip für Desktop */}
        <span className="absolute right-full mr-4 bg-white text-stone-700 text-xs px-3 py-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block font-sans font-medium">
          {t('whatsapp_tooltip')}
        </span>
      </a>

      {/* Main Booking Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 py-3 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-end gap-4 md:gap-8">
  
          {/* Booking Buttons */}
          <div className="flex gap-2 w-full md:w-auto">
            <a
              href={loc("/booking")}
              className="flex-1 md:flex-none px-8 py-3 bg-stone-900 text-center text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all"
            >
              {t('book')}
            </a>
            <a
              href={loc("/inquiry")}
              className="flex-1 md:flex-none px-8 py-3 border border-stone-300 text-center text-stone-600 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-50 transition-all"
            >
              {t('inquiry')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
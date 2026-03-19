"use client";

import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import BookingForm from "@/components/BookingForm";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Sub-component to handle URL search params (like ?canceled=true) without de-opting entire page
function BookingMessages() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get('canceled');

  if (canceled) {
    return (
      <div className="mb-8 p-4 bg-red-50 text-red-600 border border-red-100 rounded-md text-center text-sm">
        Buchung abgebrochen. Du hast nichts bezahlt und es wurde keine Reservierung getätigt.
      </div>
    );
  }
  return null;
}

export default function BookingPage() {
  return (
    <div className="bg-stone-50 min-h-screen font-sans flex flex-col">
      <Navbar />
      
      {/* Spacer for Navbar */}
      <div className="h-24 md:h-32 bg-white" />

      <main className="flex-1 max-w-[1800px] mx-auto w-full px-4 md:px-12 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#7d3a2a] font-bold">Reservierung</span>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 uppercase tracking-widest mt-4">
            Dein Aufenthalt
          </h1>
          <p className="text-stone-500 mt-4 font-light max-w-xl mx-auto">
            Wähle deine gewünschten Reisedaten und sichere dir dein alpines Hideaway in der Villa Tirol.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-stone-400">Lade...</div>}>
          <BookingMessages />
        </Suspense>

        <BookingForm />
        
      </main>

      <PageFooter />
    </div>
  );
}

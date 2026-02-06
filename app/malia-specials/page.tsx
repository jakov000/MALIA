"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Youtube, X, Check } from 'lucide-react';
import PageFooter from '@/components/PageFooter';

export default function MaliaSpecialsPage() {
  const [selectedSpecial, setSelectedSpecial] = useState<number | null>(null);

  // --- VIOMA KONFIGURATION ---
  // (Entfernt da nun interne Seiten genutzt werden)

  const specials = [
    {
      id: 1,
      shortTitle: "20% Rabatt",
      subtitle: "Sonntag bis Donnerstag",
      img: "/pictures/malia-specials/IMG_3045.jpeg",
      title: "Sonntag bis Donnerstag bis zu 20% Rabatt",
      description: "Genieße das MALIA von Sonntag bis Freitag – wenn die Tage stiller sind und mehr Raum für Erholung bleibt. Kein Programm. Kein Müssen. Nur Weite, Wärme, Sauna, klare Luft.",
      highlight: "Dein Aufenthalt ist bis zu 20 % vergünstigt im Vergleich zur regulären Buchung.",
      features: [
        "5 Nächte in Deinem alpinen Luxus-Chalet",
        "1 Flasche Sekt zur Begrüßung",
        "Privater Wellnessbereich (Sauna, Infrarot, freistehende Badewanne)",
        "Hochwertige Naturkosmetik (z. B. Zirbe, Latschenkiefer, Lavendel)",
        "Überdachte Parkplätze direkt am Haus",
        "Kaminholz für gemütliche Abende",
        "Welcome Selection: kleine regionale Produkte (z. B. Tee, Kräuter, Honig)",
        "1 Gratis Leih-Rodel (im Winter nach Verfügbarkeit)",
        "2 Gratis Leih-E-Bikes und Räder (nach Verfügbarkeit; im Sommer)",
        "Kostenloser Verleih von Rucksäcken und Thermoskannen",
        "Herrliches Erholen im luxuriösen MALIA-Ambiente"
      ]
    },
    {
      id: 2,
      shortTitle: "7 = 6",
      subtitle: "1 Nacht geschenkt",
      img: "/pictures/malia-specials/IMG_1393.jpeg", // Beispielbild
      title: "7 = 6 --> 1 Nacht geschenkt",
      description: "Bleib 7 Nächte im MALIA Alpine Hideaway und zahle nur 6. Ein Geschenk an alle, die wissen, dass echte Erholung Zeit braucht.",
      highlight: "Inklusive im 7=6 Calm Escape",
      features: [
        "7 Nächte im alpinen Luxus-Chalet (1 Nacht geschenkt)",
        "1 Flasche Sekt zur Begrüßung",
        "Privater Wellnessbereich mit Sauna, Infrarot & freistehender Badewanne",
        "Hochwertige Naturkosmetik (z. B. Zirbe, Latschenkiefer, Lavendel)",
        "Kaminholz für gemütliche Abende",
        "Welcome Selection mit kleinen regionalen Produkten (z. B. Tee, Kräuter, Honig)",
        "Überdachte Parkplätze direkt am Haus",
        "1 Gratis Leih-Rodel (Winter, nach Verfügbarkeit)",
        "2 Gratis Leih-E-Bikes oder Räder (Sommer, nach Verfügbarkeit)",
        "Kostenloser Verleih von Rucksäcken & Thermoskannen",
        "Herrliches Erholen im luxuriösen MALIA-Ambiente"
      ]
    }
  ];

  const currentSpecial = specials.find(s => s.id === selectedSpecial);

  return (
    <div className="bg-white min-h-screen">

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {selectedSpecial && currentSpecial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedSpecial(null)} // Schließt Modal beim Klick auf Hintergrund
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Verhindert Schließen beim Klick ins Modal
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative rounded-sm"
            >
              <button
                onClick={() => setSelectedSpecial(null)}
                className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors z-10"
              >
                <X size={24} className="text-stone-800" />
              </button>

              {/* --- MODAL INHALT (Ohne Bild) --- */}
              <div className="p-10 md:p-16 space-y-10">
                <div className="space-y-6 text-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#7d3a2a] font-bold">Special Offer</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-stone-800 uppercase tracking-wide leading-tight">
                    {currentSpecial.title}
                  </h2>
                  <p className="text-gray-600 font-light leading-relaxed max-w-xl mx-auto">
                    {currentSpecial.description}
                  </p>
                </div>

                <div className="bg-stone-50/80 p-8 border-y border-stone-100">
                  <p className="text-sm font-bold uppercase tracking-widest text-stone-800 mb-6 text-center">
                    {currentSpecial.highlight}
                  </p>
                  <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {currentSpecial.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-gray-600 font-light">
                        <Check size={14} className="text-[#7d3a2a] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center">
                  <a
                    href="/booking"
                    className="px-10 py-4 bg-stone-800 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-stone-700 transition-all min-w-[200px] text-center"
                  >
                    Jetzt Buchen
                  </a>
                  <a
                    href="/inquiry"
                    className="px-10 py-4 border border-stone-200 text-stone-800 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-stone-50 transition-all min-w-[200px] text-center"
                  >
                    Unverbindlich Anfragen
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pictures/malia-specials/ausblicksommer.jpeg"
            className="w-full h-full object-cover"
            alt="MALIA Angebote"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6">
            <svg width="60" height="80" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L85 60H70L95 90H60L85 110H15L40 90H5L30 60H15L50 10Z" stroke="white" strokeWidth="1.2" />
            </svg>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            className="text-4xl md:text-7xl font-serif uppercase tracking-[0.3em] font-light leading-tight"
          >
            MALIA Specials <br />
            <span className="text-xl md:text-3xl tracking-[0.5em] block mt-4 opacity-80 italic normal-case">Unsere Angebote</span>
          </motion.h1>
          <div className="absolute bottom-24 flex flex-col items-center">
            <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80">scroll for specials</span>
            <div className="w-[1px] h-12 bg-white/40" />
          </div>
        </div>
      </section>

      {/* --- 2. SPECIALS GRID SECTION --- */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {specials.map((special) => (
            <motion.div
              key={special.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedSpecial(special.id)}
            >
              <div className="aspect-[4/5] overflow-hidden relative mb-8 shadow-sm">
                <img
                  src={special.img}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  alt={special.shortTitle}
                />
                <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/40 transition-colors duration-500" />

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                  <span className="text-[10px] uppercase tracking-[0.4em] mb-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    Exklusives Paket
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif uppercase tracking-widest mb-2">
                    {special.shortTitle}
                  </h3>
                  <p className="text-sm md:text-lg italic font-serif opacity-90">
                    {special.subtitle}
                  </p>

                  <button className="mt-12 px-10 py-4 border border-white/50 backdrop-blur-sm text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-stone-900 transition-all duration-500">
                    Details anzeigen
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 3. FOOTER SECTION --- */}
      <PageFooter />
    </div>
  );
}
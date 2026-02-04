"use client";
import React from 'react';
import { motion } from 'framer-motion';
// Wichtig: Diese Icons müssen importiert sein!
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Hero() {
  const suites = [
    {
      title: "Alpine Loft Suite",
      size: "85 m²",
      price: "ab € 320",
      image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80"
    },
    {
      title: "Summit Residence",
      size: "140 m²",
      price: "ab € 580",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* --- 1. HERO VIDEO/IMAGE SECTION --- */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-luxury-dark">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="MALIA Alpine Hideaway"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 font-sans font-light"
          >
            Luxury Estate & Spa
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8"
          >
            Malia <br className="md:hidden" /> Alpine Hideaway
          </motion.h1>

          <motion.button 
            className="md:hidden border border-white/40 backdrop-blur-md px-8 py-3 uppercase text-[10px] tracking-widest"
          >
            Jetzt Entdecken
          </motion.button>
        </div>
      </section>

      {/* --- 2. INTRO TEXT SECTION --- */}
      <section className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-dark mb-12 tracking-wide uppercase">
              Your Private Escape to Alpine Bliss: <br />
              <span className="italic normal-case">MALIA – Alpine Hideaway</span>
            </h2>
            <p className="text-lg md:text-2xl font-serif text-gray-800 leading-relaxed mb-12 italic">
              Ein Ort für Menschen, die das Besondere suchen – nicht im Überfluss, sondern im Wesentlichen.
            </p>
            <p className="text-sm md:text-lg font-sans font-light text-gray-600 leading-relaxed tracking-wide max-w-2xl mx-auto">
              Das MALIA Alpine Hideaway ist kein Ort für großen Luxus, sondern für echten. 
              Klare Architektur, natürliche Materialien und ein Gefühl von Zeitlosigkeit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 3. EXPERIENCE GRID --- */}
      <section className="pb-24 md:pb-40 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start border-b border-gray-100 pb-24 md:pb-40">
          {/* Wellness Block */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative aspect-[3/4] overflow-hidden mb-10">
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Wellness" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-luxury-dark mb-4 tracking-widest uppercase">Wellness Area</h3>
            <button className="px-8 py-3 border border-luxury-dark text-[10px] uppercase tracking-widest">Jetzt Urlaub buchen</button>
          </motion.div>

          {/* Angebot Block */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:mt-40">
            <div className="relative aspect-[3/4] overflow-hidden mb-10 shadow-sm">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Special" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-luxury-dark mb-4 tracking-widest uppercase">7 = 6 Special</h3>
            <button className="px-8 py-3 border border-luxury-dark text-[10px] uppercase tracking-widest">Details anzeigen</button>
          </motion.div>
        </div>
      </section>

      {/* --- 4. HOSTS SECTION --- */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-serif text-luxury-dark mb-10 uppercase tracking-widest">Wir sind eure Gastgeber</h2>
            <p className="text-gray-600 font-sans font-light leading-relaxed text-sm tracking-wide mb-8">
              Wir, <span className="italic">Madleine (23)</span> und <span className="italic">Julia (20)</span>, begrüßen euch herzlich im MALIA.
            </p>
            <button className="px-10 py-4 border border-luxury-dark text-[10px] uppercase tracking-widest">Kennenlernen</button>
          </div>
          <div className="order-1 lg:order-2">
            <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80" className="aspect-[3/4] object-cover shadow-2xl" alt="Hosts" />
          </div>
        </div>
      </section>

      {/* --- 5. VOUCHER / GUTSCHEIN SECTION --- */}
      <section className="relative h-[70vh] w-full flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Voucher" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 uppercase tracking-widest">Zeit schenken.</h2>
          <button className="px-10 py-4 border border-white text-[10px] uppercase tracking-widest">Gutscheine schenken</button>
        </div>
      </section>

{/* --- 6. LAGE & ANREISE (Kompakt-Layout) --- */}
      <section className="bg-white py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header: Jetzt dezent und weniger raumgreifend */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-[#7d3a2a] mb-4 tracking-wide uppercase">
              Lage & Anreise
            </h2>
            <p className="uppercase tracking-[0.3em] text-[10px] text-gray-400 font-sans">
              Ihre Anreise in das MALIA Alpine Hideaway
            </p>
          </motion.div>

          {/* Das kompakte Grid: Alles auf einer Ebene sichtbar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            
            {/* LINKER BLOCK: Bild (Höhe passt sich dem Text rechts an) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full min-h-[400px]"
            >
              <div className="relative h-full w-full overflow-hidden shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105" 
                  alt="Lage MALIA Alpine Hideaway" 
                />
              </div>
            </motion.div>

            {/* RECHTER BLOCK: Alle Texte kompakt zusammengefasst */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between space-y-10"
            >
              {/* 1. Region & Anfahrt Info */}
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-dark border-b border-gray-100 pb-2">
                  Der Ort & Die Anfahrt
                </h3>
                <div className="text-gray-600 font-sans font-light text-xs md:text-sm leading-relaxed tracking-wide">
                  <p>
                    Das <span className="text-luxury-dark font-normal">MALIA-Alpine-Hideaway</span> liegt in Pertisau am Achensee. 
                    Die <span className="text-luxury-dark font-normal">Bergbahn ist nur 2 Gehminuten entfernt</span> – perfekt für Ski und Wandern. 
                    Naturidylle und Nähe zum Geschehen verbinden sich hier perfekt. 
                    Wir bieten zudem genügend freie überdachte Parkplätze an.
                  </p>
                </div>
              </div>

              {/* 2. Bahn Info */}
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-dark border-b border-gray-100 pb-2">
                  Anreise mit der Bahn
                </h3>
                <p className="text-gray-600 font-sans font-light text-xs md:text-sm leading-relaxed tracking-wide">
                  Der nächstgelegene Bahnhof ist <span className="text-luxury-dark font-normal">Jenbach</span>, nur rund 15 Minuten entfernt. 
                  Genießen Sie eine stressfreie Anreise ohne Auto.
                </p>
              </div>

              {/* 3. Kontakt & Adresse */}
              <div className="space-y-4 bg-luxury-cream/30 p-6 border-l-2 border-[#7d3a2a]/20">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-dark">
                  Kontakt & Adresse
                </h3>
                <div className="text-gray-600 font-sans font-light text-xs md:text-sm leading-loose tracking-widest">
                  <p className="font-medium text-luxury-dark uppercase">MALIA - Alpine Hideaway</p>
                  <p>Madleine & Julia Rieser</p>
                  <p>Ländbergstraße 6 | A-6213 Pertisau</p>
                  <div className="mt-4 pt-4 border-t border-gray-100/50 space-y-1 text-[11px]">
                    <p>Tel: XXX</p>
                    <p className="underline underline-offset-4">info@malia-alpine-hideaway.at</p>
                  </div>
                </div>
              </div>

              <p className="italic font-serif text-[#7d3a2a] text-base md:text-lg">
                Gute und sichere Anreise!
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- 7. MAP SECTION --- */}
      <section className="relative w-full h-[500px] grayscale contrast-125">
        <iframe width="100%" height="100%" frameBorder="0" src="https://maps.google.com/maps?q=Ländbergstraße%206,%206213%20Pertisau&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
      </section>

   {/* --- 8. IN-PAGE FOOTER --- */}
      {/* Wir fügen pb-32 hinzu, damit der beige Hintergrund bis unter die Sticky-Bar geht, 
          der Inhalt aber darüber stoppt. */}
      <section className="bg-[#f8f6f3] pt-24 pb-32 px-6 mt-0">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Link-Reihe */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-gray-500 font-sans text-center">
            <span className="hover:text-black cursor-pointer">FAQ</span>
            <span className="hover:text-black cursor-pointer">Anreise</span>
            <span className="hover:text-black cursor-pointer">Inklusivleistungen</span>
            <span className="hover:text-black cursor-pointer">Club</span>
            <span className="hover:text-black cursor-pointer">Presse</span>
            <span className="hover:text-black cursor-pointer">Jobs</span>
            <span className="hover:text-black cursor-pointer">Kataloge</span>
            <span className="hover:text-black cursor-pointer">AGB</span>
            <span className="hover:text-black cursor-pointer">Impressum</span>
            <span className="hover:text-black cursor-pointer">Datenschutz</span>
          </div>

          {/* Social & Sign Up Row */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className="flex items-center gap-8 text-gray-800">
              <Instagram size={18} strokeWidth={1.5} className="cursor-pointer" />
              <Facebook size={18} strokeWidth={1.5} className="cursor-pointer" />
              <Youtube size={18} strokeWidth={1.5} className="cursor-pointer" />
              <span className="text-[10px] font-bold cursor-pointer">SPOTIFY</span>
            </div>
            <button className="px-10 py-3 border border-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all">
              Sign up for inspiration
            </button>
          </div>

          {/* Adress-Zeile */}
          <div className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans leading-loose">
            <p>MALIA Alpine Hideaway — Familie Madleine & Julia — Ländbergstraße 6 — 6213 Pertisau — Österreich</p>
            <p className="mt-2 text-gray-500 font-medium">hello@malia-hideaway.at — +43 123 456 789</p>
          </div>
        </div>
      </section>
      {/* KEIN extra Div mehr hier! */}
    </div>
  );
}
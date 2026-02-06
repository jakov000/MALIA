"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import PageFooter from './PageFooter';

export default function Hero() {
  // --- 1. BILDER-KONFIGURATION ---
  // Basierend auf deiner Ordnerstruktur in der Screenshot-Grafik
  const heroImages = [
    "/pictures/hero/hero/_DSC4122.JPG",
    "/pictures/hero/hero/Bad The Lakeside__.jpg",
    "/pictures/hero/hero/Bild Küche__.jpg",
    "/pictures/hero/hero/Haus ausblick.jpg",
    "/pictures/hero/hero/IMG_1289.jpeg",
    "/pictures/hero/hero/IMG_1402.png",
    "/pictures/hero/hero/Küche 2.JPG",
    "/pictures/hero/hero/madleine_ausblick Sommer.jpeg",
    "/pictures/hero/hero/NEU Haus Winter.png"
  ];

  const [currentImg, setCurrentImg] = useState(0);

  // Automatischer Bildwechsel alle 6 Sekunden
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // --- 2. VIOMA KONFIGURATION ---
  // (Entfernt da nun interne Seiten genutzt werden)

  return (
    <div className="flex flex-col w-full">

      {/* --- SECTION 1: HERO IMAGE SLIDER --- */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-stone-900">

        {/* Bilder mit sanftem Crossfade-Übergang */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImg]}
              className="w-full h-full object-cover opacity-70"
              alt="MALIA Alpine Hideaway Impression"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* Text-Content (bleibt fixiert) */}
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

          <a
            href="/booking"
            className="md:hidden border border-white/40 backdrop-blur-md px-8 py-3 uppercase text-[10px] tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            Jetzt Entdecken
          </a>
        </div>

        {/* Slider Indikatoren (Striche unten) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, idx) => (
            <div
              key={idx}
              className={`h-[2px] transition-all duration-1000 ${idx === currentImg ? 'w-8 bg-white' : 'w-3 bg-white/20'}`}
            />
          ))}
        </div>
      </section>

      {/* --- SECTION 2: INTRO TEXT --- */}
      <section className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-800 mb-12 tracking-wide uppercase">
              Your Private Escape to Alpine Bliss: <br />
              <span className="italic normal-case">MALIA – Alpine Hideaway</span>
            </h2>
            <p className="text-lg md:text-2xl font-serif text-gray-800 leading-relaxed mb-12 italic text-balance">
              Ein Ort für Menschen, die das Besondere suchen – nicht im Überfluss, sondern im Wesentlichen.
            </p>
            <p className="text-sm md:text-lg font-sans font-light text-gray-600 leading-relaxed tracking-wide max-w-2xl mx-auto">
              Das MALIA Alpine Hideaway ist kein Ort für großen Luxus, sondern für echten.
              Klare Architektur, natürliche Materialien und ein Gefühl von Zeitlosigkeit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: EXPERIENCE GRID --- */}
      <section className="pb-24 md:pb-40 px-6 md:px-12 bg-white text-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start border-b border-gray-100 pb-24 md:pb-40">

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative aspect-[3/4] overflow-hidden mb-10 group">
              <img src="/pictures/hero/hero2/IMG_1115.jpeg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Wellness" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl mb-4 tracking-widest uppercase">Wellness Area</h3>
            <a href="/booking" className="inline-block px-8 py-3 border border-stone-800 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-800 hover:text-white transition-all">
              Jetzt Urlaub buchen
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:mt-40">
            <div className="relative aspect-[3/4] overflow-hidden mb-10 shadow-sm group">
              <img src="/pictures/hero/hero2/füllbild.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Special" />
            </div>
            <h3 className="font-serif text-xl md:text-2xl mb-4 tracking-widest uppercase">7 = 6 Special</h3>
            <button className="px-8 py-3 border border-stone-800 text-[10px] uppercase tracking-widest font-bold transition-all hover:bg-stone-50">Details anzeigen</button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: HOSTS --- */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-serif text-stone-800 mb-10 uppercase tracking-widest">Wir sind eure Gastgeber</h2>
            <p className="text-gray-600 font-sans font-light leading-relaxed text-sm tracking-wide mb-8">
              Wir, <span className="italic">Madleine (23)</span> und <span className="italic">Julia (20)</span>, begrüßen euch herzlich im MALIA.
            </p>
            <button className="px-10 py-4 border border-stone-800 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-800 hover:text-white transition-all">Kennenlernen</button>
          </div>
          <div className="order-1 lg:order-2">
            <img src="/pictures/hero/hero3/IMG_1041.jpg" className="aspect-[3/4] w-full object-cover shadow-2xl" alt="Hosts" />
          </div>
        </div>
      </section>

      {/* --- SECTION 5: VOUCHER --- */}
      <section className="relative h-[70vh] w-full flex items-center overflow-hidden">
        <img src="/pictures/hero/hero4/Küche.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Voucher" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 uppercase tracking-widest">Zeit schenken.</h2>
          <button className="px-10 py-4 border border-white text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">Gutscheine schenken</button>
        </div>
      </section>

      {/* --- SECTION 6: LAGE & ANREISE --- */}
      <section className="bg-white py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#7d3a2a] mb-4 tracking-wide uppercase">Lage & Anreise</h2>
            <p className="uppercase tracking-[0.3em] text-[10px] text-gray-400 font-sans">Ihre Anreise in das MALIA Alpine Hideaway</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-full min-h-[400px]">
              <div className="relative h-full w-full overflow-hidden shadow-sm">
                <img src="/pictures/hero/hero5/haus sommer.png" className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105" alt="Lage" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-between space-y-10">
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-800 border-b border-gray-100 pb-2">Der Ort & Die Anfahrt</h3>
                <p className="text-gray-600 font-sans font-light text-xs md:text-sm leading-relaxed tracking-wide">
                  Das <span className="text-stone-800 font-normal">MALIA-Alpine-Hideaway</span> liegt in Pertisau am Achensee. Die Bergbahn ist nur 2 Gehminuten entfernt. Wir bieten zudem genügend freie überdachte Parkplätze an.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-800 border-b border-gray-100 pb-2">Anreise mit der Bahn</h3>
                <p className="text-gray-600 font-sans font-light text-xs md:text-sm leading-relaxed tracking-wide">
                  Der nächstgelegene Bahnhof ist <span className="text-stone-800 font-normal">Jenbach</span>, nur rund 15 Minuten entfernt.
                </p>
              </div>
              <div className="space-y-4 bg-stone-50 p-6 border-l-2 border-[#7d3a2a]/20">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-800">Kontakt & Adresse</h3>
                <div className="text-gray-600 font-sans font-light text-xs md:text-sm leading-loose tracking-widest">
                  <p className="font-medium text-stone-800 uppercase tracking-tighter">MALIA - Alpine Hideaway</p>
                  <p>Madleine & Julia Rieser</p>
                  <p>Ländbergstraße 6 | A-6213 Pertisau</p>
                  <div className="mt-4 pt-4 border-t border-gray-200/50 space-y-1 text-[11px]">
                    <p>hello@malia-hideaway.at</p>
                    <p>+43 123 456 789</p>
                  </div>
                </div>
              </div>
              <p className="italic font-serif text-[#7d3a2a] text-base md:text-lg text-center lg:text-left">Gute und sichere Anreise!</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: MAP --- */}
      <section className="relative w-full h-[500px] grayscale opacity-80 hover:opacity-100 transition-opacity duration-700">
        <iframe width="100%" height="100%" style={{ border: 0 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.47!2d11.68!3d47.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479d63!2sPertisau!5e0!3m2!1sde!2sat!4v123456789" allowFullScreen loading="lazy"></iframe>
      </section>

      {/* --- SECTION 8: IN-PAGE FOOTER --- */}
      <PageFooter />
    </div>
  );
}
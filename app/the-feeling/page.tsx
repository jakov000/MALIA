"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';

export default function TheFeelingPage() {
  // Definition der Bereiche für die Bilder-Navigation
  const areas = [
    { id: "room-1", title: "Zimmer 1", subtitle: "Private Retreat", category: "The Hideaway" },
    { id: "room-2", title: "Zimmer 2", subtitle: "Alpine Comfort", category: "The Residence" },
    { id: "room-3", title: "Zimmer 3", subtitle: "Modern Stillness", category: "The Retreat" },
    { id: "room-4", title: "Zimmer 4", subtitle: "Nature View", category: "Alpine Loft" },
    { id: "room-5", title: "Zimmer 5", subtitle: "Skyline Suite", category: "Summit Loft" },
    { id: "wellness", title: "Wellness", subtitle: "Sauna & Infrarot", category: "Relax" },
    { id: "kitchen", title: "Küche", subtitle: "Ehrliche Materialien", category: "Living" },
    { id: "living", title: "Wohnzimmer", subtitle: "Feuer & Stein", category: "Community" },
    { id: "outdoor", title: "Außenbereich", subtitle: "Karwendel-Blick", category: "Nature" },
  ];

  return (
    <div className="bg-white">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/pictures/the-feeling/IMG_1151.jpeg" 
            className="w-full h-full object-cover"
            alt="MALIA Architektur"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="mb-6">
            <svg width="60" height="80" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M50 10L85 60H70L95 90H60L85 110H15L40 90H5L30 60H15L50 10Z" stroke="white" strokeWidth="1.2" />
            </svg>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, letterSpacing: "0.2em" }} 
            animate={{ opacity: 1, letterSpacing: "0.4em" }} 
            className="text-5xl md:text-7xl font-serif uppercase tracking-[0.4em] font-light"
          >
            The Feeling
          </motion.h1>

          <div className="absolute bottom-24 flex flex-col items-center">
            <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80 italic">explore the soul of malia</span>
            <div className="w-[1px] h-12 bg-white/40" />
          </div>
        </div>
      </section>

      {/* --- 2. DISCOVERY SECTION (DIE KAPITEL) --- */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32 md:space-y-64">
            {areas.map((area, idx) => (
              <motion.div 
                key={area.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1 }}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
              >
                {/* Bild-Container */}
                <div className="w-full md:w-3/5">
                  <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-stone-100 shadow-sm">
                    <img 
                      src={`/pictures/the-feeling/${area.id}.jpg`} // HIER DEINE BILDER EINPFLEGEN (z.B. room-1.jpg)
                      className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110"
                      alt={area.title}
                      onError={(e) => {
                        // Fallback falls Bild noch nicht existiert
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80";
                      }}
                    />
                  </div>
                </div>

                {/* Text-Container */}
                <div className="w-full md:w-2/5 space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#7d3a2a] font-bold">
                    {area.category}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif text-stone-800 uppercase tracking-widest leading-tight">
                    {area.title}
                  </h2>
                  <p className="text-xl md:text-2xl font-serif text-stone-500 italic">
                    {area.subtitle}
                  </p>
                  <div className="pt-6">
                    <div className="w-12 h-[1px] bg-stone-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. FOOTER SECTION --- */}
      <footer className="bg-[#f8f6f3] pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-gray-500 font-sans text-center">
            {["FAQ", "Anreise", "Inklusivleistungen", "Impressum", "Datenschutz"].map(link => (
              <span key={link} className="hover:text-black cursor-pointer transition-colors">{link}</span>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className="flex items-center gap-8 text-gray-800">
              <Instagram size={18} strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
              <Facebook size={18} strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
              <Youtube size={18} strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold cursor-pointer">SPOTIFY</span>
            </div>
            <button className="px-10 py-3 border border-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all">
              Sign up for inspiration
            </button>
          </div>

          <div className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans leading-loose">
            <p>MALIA Alpine Hideaway — Familie Madleine & Julia — Ländbergstraße 6 — 6213 Pertisau</p>
            <p className="mt-2 text-gray-500 font-medium">hello@malia-hideaway.at</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
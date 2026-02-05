"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function MaliaSpecialsPage() {
  return (
    <div className="bg-white">
      {/* --- 1. HERO SECTION (Angebote) --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="MALIA Angebote Berge"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
          {/* Minimalistisches Tannen-Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-6"
          >
            <svg width="60" height="80" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M50 10L85 60H70L95 90H60L85 110H15L40 90H5L30 60H15L50 10Z" stroke="white" strokeWidth="1.2" />
            </svg>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-5xl md:text-7xl font-serif uppercase tracking-[0.4em] font-light"
          >
            Angebote
          </motion.h1>

          <div className="absolute bottom-24 flex flex-col items-center">
            <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80 italic">
              scroll for specials
            </span>
            <div className="w-[1px] h-12 bg-white/40" />
          </div>
        </div>
      </section>

      {/* --- 2. INTRO SECTION --- */}
      <section className="py-24 md:py-40 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-[#7d3a2a] mb-8 tracking-wide uppercase">
              Besondere Momente
            </h2>
            <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mb-8 italic">
              Exklusive Pakete für deine Auszeit im Karwendel.
            </p>
            <p className="text-sm md:text-lg font-sans font-light text-gray-600 leading-relaxed tracking-wide max-w-3xl mx-auto italic">
              Ob winterliches Ski-Abenteuer oder sommerliche Bergidylle – wir schnüren das passende Paket für dich.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 3. FOOTER SECTION --- */}
      <footer className="bg-[#f8f6f3] pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-gray-500 font-sans text-center">
            <span className="hover:text-black cursor-pointer">FAQ</span>
            <span className="hover:text-black cursor-pointer">Anreise</span>
            <span className="hover:text-black cursor-pointer">Inklusivleistungen</span>
            <span className="hover:text-black cursor-pointer">Impressum</span>
            <span className="hover:text-black cursor-pointer">Datenschutz</span>
          </div>

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

          <div className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans leading-loose">
            <p>MALIA Alpine Hideaway — Familie Madleine & Julia — Ländbergstraße 6 — 6213 Pertisau</p>
            <p className="mt-2 text-gray-500 font-medium">hello@malia-hideaway.at</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
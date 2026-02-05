"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function TheFeelingPage() {
  // Daten für die "Gefühlsmomente" Galerie
  const moments = [
    { 
      title: "Alpines Handwerk", 
      img: "https://images.unsplash.com/photo-1596237563267-84fee9928b01?auto=format&fit=crop&q=80",
      size: "md:col-span-2 aspect-[16/9]" 
    },
    { 
      title: "Stille am Berg", 
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
      size: "aspect-square" 
    },
    { 
      title: "Natürliche Texturen", 
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
      size: "aspect-[3/4]" 
    },
    { 
      title: "Wellness für die Seele", 
      img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80",
      size: "md:col-span-2 aspect-[16/9]" 
    }
  ];

  return (
    <div className="bg-white">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80" 
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
            <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80 italic">scroll for happiness</span>
            <div className="w-[1px] h-12 bg-white/40" />
          </div>
        </div>
      </section>

      {/* --- 2. INTRO SECTION --- */}
      <section className="py-24 md:py-40 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <h2 className="text-3xl md:text-5xl font-serif text-[#7d3a2a] mb-8 tracking-wide uppercase">Einfach Sein</h2>
            <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mb-8 italic">Ein Ort, an dem die Zeit langsamer schlägt.</p>
            <p className="text-sm md:text-lg font-sans font-light text-gray-600 leading-relaxed tracking-wide max-w-3xl mx-auto italic">
              Das Gefühl von warmem Holz unter den Füßen, der Duft von frischen Bergkräutern in der Luft und der endlose Blick über das Karwendelgebirge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 3. GALLERY SECTION: FEELING MOMENTS --- */}
      <section className="pb-24 md:pb-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moments.map((moment, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`relative overflow-hidden group ${moment.size}`}
              >
                <img 
                  src={moment.img} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt={moment.title} 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white uppercase tracking-[0.3em] text-xs font-serif italic">{moment.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. FOOTER SECTION --- */}
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
              <span className="text-[10px] font-bold cursor-pointer font-sans">SPOTIFY</span>
            </div>
            <button className="px-10 py-3 border border-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all font-sans">
              Sign up for inspiration
            </button>
          </div>

          <div className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans leading-loose">
            <p>MALIA Alpine Hideaway — Familie Madleine & Julia — Ländbergstraße 6 — 6213 Pertisau</p>
            <p className="mt-2 text-gray-500 font-medium font-sans">hello@malia-hideaway.at</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
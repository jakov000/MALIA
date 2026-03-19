"use client";
import React from 'react';
import PageFooter from '@/components/PageFooter';
import Button from '@/components/ui/Button';
import ImageSlideshow from '@/components/ui/ImageSlideshow';
import { motion } from 'framer-motion';

const RETREAT_ROOMS = [
  { id: 'zimmer5', category: 'Schlafzimmer', title: 'Schlafzimmer', subtitle: 'Gemütlich & Ruhig', images: [
      "/pictures/hideaways/alpine/Zimmer5/804CEFBC-C6C4-45D1-98C6-CFB0DEE667B2.JPG",
      "/pictures/hideaways/alpine/Zimmer5/IMG_1470.jpeg",
      "/pictures/hideaways/alpine/Zimmer5/IMG_1473.jpeg",
      "/pictures/hideaways/alpine/Zimmer5/IMG_1501.jpeg",
      "/pictures/hideaways/alpine/Zimmer5/IMG_1504.jpeg"
  ] },
  { id: 'aussen', category: 'Natur', title: 'Außenbereich', subtitle: 'Privater Rückzugsort', images: [
      "/pictures/hideaways/alpine/HausAußen/haus sommer.png",
      "/pictures/hideaways/alpine/HausAußen/haus winter 2.jpeg",
      "/pictures/hideaways/alpine/HausAußen/haus winter.jpeg"
  ] }
];

export default function TheRetreatPage() {
  return (
    <main className="min-h-screen bg-[#faf9f8] flex flex-col pt-32">
      {/* Intro Section */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
         
         {/* Left Column: Text & Info */}
         <div className="space-y-8 text-stone-800">
            <h1 className="text-3xl font-serif uppercase tracking-widest">THE RETREAT</h1>
            
            <div className="space-y-4 text-[15px] font-light leading-relaxed text-stone-700">
              <p>
                The Retreat ist unser offenes Studio-Apartment für zwei – hell, ruhig und bewusst reduziert.
              </p>
              <p>
                Wohnen, Schlafen und Kochen fließen hier nahtlos ineinander. Das lichtdurchflutete Milchglas-Bad mit Regendusche bringt Spa-Feeling in den Alltag.
              </p>
              <p>
                Auf der privaten Terrasse wartet frische Bergluft und das Gefühl von völliger Ruhe.
              </p>
              <p>
                Ein Hideaway für alle, die Nähe, Stille und Calm Luxury suchen.
              </p>
            </div>

            <ul className="space-y-3 font-light text-[14px] text-stone-700 list-disc pl-5 marker:text-stone-400">
              <li><strong>Offenes Studio-Apartment für 2 Personen</strong></li>
              <li><strong>Halboffener Schlafbereich</strong> mit Komfortbett</li>
              <li><strong>Gemütlicher Wohnraum</strong> mit Couch, Tisch & Smart-TV</li>
              <li><strong>Voll ausgestattete offene Küche</strong></li>
              <li><strong>Lichtdurchflutetes Milchglas-Bad</strong> mit Regendusche</li>
              <li><strong>Private Terrasse</strong></li>
              <li><strong>Fußbodenheizung</strong></li>
              <li><strong>Ski- & Abstellraum</strong> mit Skischuhtrockner</li>
              <li><strong>High-Speed Glasfaser WLAN</strong></li>
              <li><strong>Kostenlose, überdachte Parkplätze</strong> direkt am Haus</li>
              <li><strong>Naturmaterialien & Calm-Luxury-Design</strong></li>
            </ul>

            <div className="pt-6 space-y-1 text-sm tracking-[0.2em] uppercase text-stone-500">
              <p>ab € 45</p>
              <p>2 Personen</p>
              <p>40 qm</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button href="/inquiry" variant="outline" className="border-stone-400 text-stone-700 hover:bg-stone-100 px-8">Anfragen</Button>
              <Button href="/booking" variant="primary" className="px-8">Buchen</Button>
            </div>
         </div>

         {/* Right Column: Scroll Indicator */}
         <div className="relative h-full flex flex-col items-center justify-center min-h-[300px] lg:min-h-full">
            <motion.div 
               className="flex flex-col items-center gap-8 opacity-70"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 1.5 }}
            >
                <div className="w-[1px] h-32 bg-stone-300 relative overflow-hidden">
                    <motion.div 
                        className="w-full h-full bg-stone-500 absolute top-0 left-0 origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                    />
                </div>
                
                <p className="uppercase tracking-[0.4em] text-xs font-light text-stone-500 [writing-mode:vertical-rl] rotate-180">
                   Scrollen, um die Zimmer zu erleben
                </p>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                   <div className="w-[1px] h-12 bg-stone-400 relative">
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-b border-l border-stone-400 w-3 h-3 -rotate-45" />
                   </div>
                </motion.div>
            </motion.div>
         </div>
      </div>

      {/* Discovery Section (Alternating Rooms) */}
      <section className="py-24 bg-white mt-12 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-32">
                {RETREAT_ROOMS.map((room, idx) => (
                    <motion.div
                        key={room.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
                    >
                        {/* Image Slideshow per Room */}
                        <div className="w-full md:w-3/5">
                            <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-stone-100 shadow-sm border border-stone-200">
                                <ImageSlideshow images={room.images} title={room.title} />
                            </div>
                        </div>

                        {/* Text Container */}
                        <div className="w-full md:w-2/5 space-y-6">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-stone-500 font-bold">
                                {room.category}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif text-stone-800 uppercase tracking-widest leading-tight">
                                {room.title}
                            </h2>
                            <p className="text-xl md:text-2xl font-serif text-stone-500 italic">
                                {room.subtitle}
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

      <PageFooter />
    </main>
  );
}

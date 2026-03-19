"use client";
import React from 'react';
import PageFooter from '@/components/PageFooter';
import Button from '@/components/ui/Button';
import ImageSlideshow from '@/components/ui/ImageSlideshow';
import { motion } from 'framer-motion';

// TODO: Die genauen Zimmer für 'The Residence' eintragen
const RESIDENCE_ROOMS = [
  { id: 'zimmer1', category: 'Schlafzimmer', title: 'Schlafzimmer 1', subtitle: 'Doppelbett & Bergblick', images: [
      "/pictures/hideaways/alpine/Zimmer1/IMG_0889.jpeg",
      "/pictures/hideaways/alpine/Zimmer1/IMG_1151.jpeg",
      "/pictures/hideaways/alpine/Zimmer1/IMG_3141.jpeg"
  ] },
  { id: 'zimmer2', category: 'Schlafzimmer', title: 'Schlafzimmer 2', subtitle: 'Komfort & Ruhe', images: [
      "/pictures/hideaways/alpine/Zimmer2/IMG_1385 (1).jpeg",
      "/pictures/hideaways/alpine/Zimmer2/IMG_1393.jpeg",
      "/pictures/hideaways/alpine/Zimmer2/IMG_1406.jpeg",
      "/pictures/hideaways/alpine/Zimmer2/IMG_3045.jpeg",
      "/pictures/hideaways/alpine/Zimmer2/bad madleine 1.jpg",
      "/pictures/hideaways/alpine/Zimmer2/bad madleine 2.jpg",
      "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Sommer.jpeg",
      "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Winter 2.jpeg"
  ] },
  { id: 'zimmer3', category: 'Schlafzimmer', title: 'Schlafzimmer 3', subtitle: 'Alpines Design', images: [
      "/pictures/hideaways/alpine/Zimmer3/Bad Juli 1.jpeg",
      "/pictures/hideaways/alpine/Zimmer3/IMG_1344.jpeg",
      "/pictures/hideaways/alpine/Zimmer3/IMG_1366.jpeg",
      "/pictures/hideaways/alpine/Zimmer3/IMG_1374.jpeg",
      "/pictures/hideaways/alpine/Zimmer3/bad julia 2.jpg",
      "/pictures/hideaways/alpine/Zimmer3/bad julia.jpg"
  ] },
  { id: 'zimmer4', category: 'Schlafzimmer', title: 'Schlafzimmer 4', subtitle: 'Für Freunde & Familie', images: [
      "/pictures/hideaways/alpine/Zimmer4/Bad Maria 1.jpg",
      "/pictures/hideaways/alpine/Zimmer4/IMG_1429.jpeg",
      "/pictures/hideaways/alpine/Zimmer4/IMG_1434.jpeg",
      "/pictures/hideaways/alpine/Zimmer4/IMG_1445.jpeg",
      "/pictures/hideaways/alpine/Zimmer4/IMG_1447.jpeg",
      "/pictures/hideaways/alpine/Zimmer4/bad maria 3.jpg",
      "/pictures/hideaways/alpine/Zimmer4/bad maria.png",
      "/pictures/hideaways/alpine/Zimmer4/zimmer maria.jpg"
  ] },
  { id: 'wellness', category: 'SPA', title: 'Wellnessbereich', subtitle: 'Sauna, Infrarot & Badewanne', images: [
      "/pictures/hideaways/alpine/Wellness/IMG_1111.jpeg",
      "/pictures/hideaways/alpine/Wellness/IMG_1283.jpeg",
      "/pictures/hideaways/alpine/Wellness/IMG_1289.jpeg",
      "/pictures/hideaways/alpine/Wellness/IMG_1296.jpeg",
      "/pictures/hideaways/alpine/Wellness/IMG_1310.jpeg",
      "/pictures/hideaways/alpine/Wellness/IMG_1327.jpeg",
      "/pictures/hideaways/alpine/Wellness/IMG_1385.jpeg"
  ] },
  { id: 'kueche', category: 'Genuss', title: 'Küche', subtitle: 'Voll ausgestattete Designer-Küche', images: [
      "/pictures/hideaways/alpine/Küche/Esstisch.JPG",
      "/pictures/hideaways/alpine/Küche/IMG_1236 (1).jpeg",
      "/pictures/hideaways/alpine/Küche/IMG_1244.jpeg",
      "/pictures/hideaways/alpine/Küche/Küche 4.JPG",
      "/pictures/hideaways/alpine/Küche/küche 2.JPG",
      "/pictures/hideaways/alpine/Küche/küche 3.JPG"
  ] },
  { id: 'wohnzimmer', category: 'Zusammenkunft', title: 'Wohnzimmer', subtitle: 'Kamin & Raumhohe Glasfronten', images: [
      "/pictures/hideaways/alpine/Wohnzimmer/IMG_0972.jpeg",
      "/pictures/hideaways/alpine/Wohnzimmer/IMG_1022.jpeg",
      "/pictures/hideaways/alpine/Wohnzimmer/IMG_1200.jpeg",
      "/pictures/hideaways/alpine/Wohnzimmer/IMG_3169.jpeg",
      "/pictures/hideaways/alpine/Wohnzimmer/IMG_3205.jpeg",
      "/pictures/hideaways/alpine/Wohnzimmer/IMG_3209.jpeg",
      "/pictures/hideaways/alpine/Wohnzimmer/IMG_3217.jpeg"
  ] },
  { id: 'aussen', category: 'Natur', title: 'Außenbereich', subtitle: '270° Panorama-Terrasse', images: [
      "/pictures/hideaways/alpine/HausAußen/haus sommer.png",
      "/pictures/hideaways/alpine/HausAußen/haus winter 2.jpeg",
      "/pictures/hideaways/alpine/HausAußen/haus winter.jpeg"
  ] }
];

export default function TheResidencePage() {
  return (
    <main className="min-h-screen bg-[#faf9f8] flex flex-col pt-32">
      {/* Intro Section */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
         
         {/* Left Column: Text & Info */}
         <div className="space-y-8 text-stone-800">
            <h1 className="text-3xl font-serif uppercase tracking-widest">THE RESIDENCE</h1>
            
            <div className="space-y-4 text-[15px] font-light leading-relaxed text-stone-700">
              <p className="italic">Space. Silence. Connection.</p>
              <p>
                Das Herzstück des Malia – großzügig, hell und bewusst gestaltet.<br/>
                The Residence bietet Platz für bis zu 8 Personen und vereint alpinen Charme mit modernem Design.<br/>
                Naturstein, Altholz, Leinen und warmes Licht schaffen eine Atmosphäre, die entschleunigt und inspiriert.
              </p>
              <p>
                Highlight: die private Sauna mit Bergblick.<br/>
                Ein Ort, an dem du nach einem Tag am See oder auf dem Berg zur Ruhe kommst, den Tag langsam ausklingen lässt.
              </p>
            </div>

            <ul className="space-y-3 font-light text-[14px] text-stone-700 list-disc pl-5 marker:text-stone-400">
              <li><strong>Privater Wellnessbereich</strong> mit Sauna, Infrarot & freistehender Badewanne</li>
              <li><strong>Panorama-Terrasse & 3 Balkone</strong> mit Bergblick</li>
              <li><strong>Gemütlicher Kamin</strong> inkl. Holzvorrat</li>
              <li><strong>4 großzügige Schlafzimmer</strong></li>
              <li><strong>3 moderne ensuite Bäder</strong> mit eigener Dusche & WC</li>
              <li><strong>Großzügiger Wohn- & Essbereich</strong> mit raumhohen Glasfronten</li>
              <li><strong>Voll ausgestattete Design-Küche</strong> mit Dampfgarer & Weinkühlschrank</li>
              <li><strong>Couch</strong> – auch als Schlafsofa nutzbar</li>
              <li><strong>Naturmaterialien</strong> wie Altholz, Stein & Leinen – nachhaltig und hochwertig</li>
              <li><strong>Fußbodenheizung</strong> in allen Räumen</li>
              <li><strong>Ski- & Abstellraum</strong> mit Skischuhtrockner</li>
              <li><strong>High-Speed Glasfaser WLAN</strong></li>
              <li><strong>Smart-TV</strong></li>
              <li><strong>Kostenlose, überdachte Parkplätze</strong> direkt am Haus</li>
            </ul>

            <div className="pt-6 space-y-1 text-sm tracking-[0.2em] uppercase text-stone-500">
              <p>ab € 1200</p>
              <p>2-8 Personen</p>
              <p>360 qm</p>
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
                {RESIDENCE_ROOMS.map((room, idx) => (
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

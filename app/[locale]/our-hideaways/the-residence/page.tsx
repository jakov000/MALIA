"use client";
import React from 'react';
import PageFooter from '@/components/PageFooter';
import Button from '@/components/ui/Button';
import ImageSlideshow from '@/components/ui/ImageSlideshow';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

export default function TheResidencePage() {

  const t = useTranslations('Rooms.Residence');
  const tList = useTranslations('Rooms.RoomsList.Residence');
  const tBtn = useTranslations('Rooms.Buttons');
  const localActive = useLocale();

  const loc = (path: string) => `/${localActive}${path}`;

  const richOptions = {
    bold: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
    br: () => <br />
  };

  const bullets = [
    t.rich('bullets.0', richOptions),
    t.rich('bullets.1', richOptions),
    t.rich('bullets.2', richOptions),
    t.rich('bullets.3', richOptions),
    t.rich('bullets.4', richOptions),
    t.rich('bullets.5', richOptions),
    t.rich('bullets.6', richOptions),
    t.rich('bullets.7', richOptions),
    t.rich('bullets.8', richOptions),
    t.rich('bullets.9', richOptions),
    t.rich('bullets.10', richOptions),
    t.rich('bullets.11', richOptions),
    t.rich('bullets.12', richOptions),
    t.rich('bullets.13', richOptions)
  ];

  // TODO: Die genauen Zimmer für 'The Residence' eintragen
  const RESIDENCE_ROOMS = [
    { id: 'room1', category: tList('room1.category'), title: tList('room1.title'), subtitle: tList('room1.subtitle'), images: [
        "/pictures/hideaways/alpine/Zimmer1/IMG_0889.jpeg",
        "/pictures/hideaways/alpine/Zimmer1/IMG_1151.jpeg",
        "/pictures/hideaways/alpine/Zimmer1/IMG_3141.jpeg"
    ] },
    { id: 'room2', category: tList('room2.category'), title: tList('room2.title'), subtitle: tList('room2.subtitle'), images: [
        "/pictures/hideaways/alpine/Zimmer2/IMG_1385 (1).jpeg",
        "/pictures/hideaways/alpine/Zimmer2/IMG_1393.jpeg",
        "/pictures/hideaways/alpine/Zimmer2/IMG_1406.jpeg",
        "/pictures/hideaways/alpine/Zimmer2/IMG_3045.jpeg",
        "/pictures/hideaways/alpine/Zimmer2/bad madleine 1.jpg",
        "/pictures/hideaways/alpine/Zimmer2/bad madleine 2.jpg",
        "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Sommer.jpeg",
        "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Winter 2.jpeg"
    ] },
    { id: 'room3', category: tList('room3.category'), title: tList('room3.title'), subtitle: tList('room3.subtitle'), images: [
        "/pictures/hideaways/alpine/Zimmer3/Bad Juli 1.jpeg",
        "/pictures/hideaways/alpine/Zimmer3/IMG_1344.jpeg",
        "/pictures/hideaways/alpine/Zimmer3/IMG_1366.jpeg",
        "/pictures/hideaways/alpine/Zimmer3/IMG_1374.jpeg",
        "/pictures/hideaways/alpine/Zimmer3/bad julia 2.jpg",
        "/pictures/hideaways/alpine/Zimmer3/bad julia.jpg"
    ] },
    { id: 'room4', category: tList('room4.category'), title: tList('room4.title'), subtitle: tList('room4.subtitle'), images: [
        "/pictures/hideaways/alpine/Zimmer4/Bad Maria 1.jpg",
        "/pictures/hideaways/alpine/Zimmer4/IMG_1429.jpeg",
        "/pictures/hideaways/alpine/Zimmer4/IMG_1434.jpeg",
        "/pictures/hideaways/alpine/Zimmer4/IMG_1445.jpeg",
        "/pictures/hideaways/alpine/Zimmer4/IMG_1447.jpeg",
        "/pictures/hideaways/alpine/Zimmer4/bad maria 3.jpg",
        "/pictures/hideaways/alpine/Zimmer4/bad maria.png",
        "/pictures/hideaways/alpine/Zimmer4/zimmer maria.jpg"
    ] },
    { id: 'wellness', category: tList('wellness.category'), title: tList('wellness.title'), subtitle: tList('wellness.subtitle'), images: [
        "/pictures/hideaways/alpine/Wellness/IMG_1111.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1283.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1289.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1296.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1310.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1327.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1385.jpeg"
    ] },
    { id: 'kueche', category: tList('kueche.category'), title: tList('kueche.title'), subtitle: tList('kueche.subtitle'), images: [
        "/pictures/hideaways/alpine/Küche/Esstisch.JPG",
        "/pictures/hideaways/alpine/Küche/IMG_1236 (1).jpeg",
        "/pictures/hideaways/alpine/Küche/IMG_1244.jpeg",
        "/pictures/hideaways/alpine/Küche/Küche 4.JPG",
        "/pictures/hideaways/alpine/Küche/küche 2.JPG",
        "/pictures/hideaways/alpine/Küche/küche 3.JPG"
    ] },
    { id: 'wohnzimmer', category: tList('wohnzimmer.category'), title: tList('wohnzimmer.title'), subtitle: tList('wohnzimmer.subtitle'), images: [
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_0972.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_1022.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_1200.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_3169.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_3205.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_3209.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_3217.jpeg"
    ] },
    { id: 'aussen', category: tList('aussen.category'), title: tList('aussen.title'), subtitle: tList('aussen.subtitle'), images: [
        "/pictures/hideaways/alpine/HausAußen/haus sommer.png",
        "/pictures/hideaways/alpine/HausAußen/haus winter 2.jpeg",
        "/pictures/hideaways/alpine/HausAußen/haus winter.jpeg"
    ] }
  ];

  return (
    <main className="min-h-screen bg-[#faf9f8] flex flex-col pt-32">
      {/* Intro Section */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
         
         {/* Left Column: Text & Info */}
         <div className="space-y-8 text-stone-800">
             <h1 className="text-3xl font-serif uppercase tracking-widest">{t('title')}</h1>
            
            <div className="space-y-4 text-[15px] font-light leading-relaxed text-stone-700">
              <p className="italic">{t('subtitle')}</p>
              <p>{t.rich('p1', richOptions)}</p>
              <p>{t.rich('p2', richOptions)}</p>
            </div>

            <ul className="space-y-3 font-light text-[14px] text-stone-700 list-disc pl-5 marker:text-stone-400">
              {bullets.map((item, idx) => (
                  <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="pt-6 space-y-1 text-sm tracking-[0.2em] uppercase text-stone-500">
              <p>{t('price')}</p>
              <p>{t('persons')}</p>
              <p>{t('sqm')}</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button href={loc("/inquiry")} variant="outline" className="border-stone-400 text-stone-700 hover:bg-stone-100 px-8">{tBtn('inquiry')}</Button>
              <Button href={loc("/booking")} variant="primary" className="px-8">{tBtn('book')}</Button>
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
                   {t('scroll')}
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

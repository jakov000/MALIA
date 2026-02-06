"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';
import PageFooter from '@/components/PageFooter';

// Slideshow Komponente
const ImageSlideshow = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Bildwechsel alle 4 Sekunden
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-100 shadow-sm">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Bild ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Fortschrittsanzeige (optional, dezent) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-1 h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function TheFeelingPage() {
  // Definition der Bereiche für die Bilder-Navigation
  const areas = [
    {
      id: "room-1",
      title: "Zimmer 1",
      subtitle: "Private Retreat",
      category: "The Hideaway",
      images: [
        "/pictures/hideaways/alpine/Zimmer1/IMG_0889.jpeg",
        "/pictures/hideaways/alpine/Zimmer1/IMG_1151.jpeg",
        "/pictures/hideaways/alpine/Zimmer1/IMG_3141.jpeg"
      ]
    },
    {
      id: "room-2",
      title: "Zimmer 2",
      subtitle: "Alpine Comfort",
      category: "The Residence",
      images: [
        "/pictures/hideaways/alpine/Zimmer2/IMG_1385 (1).jpeg",
        "/pictures/hideaways/alpine/Zimmer2/IMG_1393.jpeg",
        "/pictures/hideaways/alpine/Zimmer2/IMG_1406.jpeg",
        "/pictures/hideaways/alpine/Zimmer2/IMG_3045.jpeg",
        "/pictures/hideaways/alpine/Zimmer2/bad madleine 1.jpg",
        "/pictures/hideaways/alpine/Zimmer2/bad madleine 2.jpg",
        "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Sommer.jpeg",
        "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Winter 2.jpeg"
      ]
    },
    {
      id: "room-3",
      title: "Zimmer 3",
      subtitle: "Modern Stillness",
      category: "The Retreat",
      images: [
        "/pictures/hideaways/alpine/Zimmer3/Bad Juli 1.jpeg",
        "/pictures/hideaways/alpine/Zimmer3/IMG_1344.jpeg",
        "/pictures/hideaways/alpine/Zimmer3/IMG_1366.jpeg",
        "/pictures/hideaways/alpine/Zimmer3/IMG_1374.jpeg",
        "/pictures/hideaways/alpine/Zimmer3/bad julia 2.jpg",
        "/pictures/hideaways/alpine/Zimmer3/bad julia.jpg"
      ]
    },
    {
      id: "room-4",
      title: "Zimmer 4",
      subtitle: "Nature View",
      category: "Alpine Loft",
      images: [
        "/pictures/hideaways/alpine/Zimmer4/Bad Maria 1.jpg",
        "/pictures/hideaways/alpine/Zimmer4/IMG_1429.jpeg",
        "/pictures/hideaways/alpine/Zimmer4/IMG_1434.jpeg",
        "/pictures/hideaways/alpine/Zimmer4/IMG_1445.jpeg",
        "/pictures/hideaways/alpine/Zimmer4/IMG_1447.jpeg",
        "/pictures/hideaways/alpine/Zimmer4/bad maria 3.jpg",
        "/pictures/hideaways/alpine/Zimmer4/bad maria.png",
        "/pictures/hideaways/alpine/Zimmer4/zimmer maria.jpg"
      ]
    },
    {
      id: "room-5",
      title: "Zimmer 5",
      subtitle: "Skyline Suite",
      category: "Summit Loft",
      images: [
        "/pictures/hideaways/alpine/Zimmer5/804CEFBC-C6C4-45D1-98C6-CFB0DEE667B2.JPG",
        "/pictures/hideaways/alpine/Zimmer5/IMG_1470.jpeg",
        "/pictures/hideaways/alpine/Zimmer5/IMG_1473.jpeg",
        "/pictures/hideaways/alpine/Zimmer5/IMG_1501.jpeg",
        "/pictures/hideaways/alpine/Zimmer5/IMG_1504.jpeg"
      ]
    },
    {
      id: "wellness",
      title: "Wellness",
      subtitle: "Sauna & Infrarot",
      category: "Relax",
      images: [
        "/pictures/hideaways/alpine/Wellness/IMG_1111.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1283.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1289.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1296.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1310.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1327.jpeg",
        "/pictures/hideaways/alpine/Wellness/IMG_1385.jpeg"
      ]
    },
    {
      id: "kitchen",
      title: "Küche",
      subtitle: "Ehrliche Materialien",
      category: "Living",
      images: [
        "/pictures/hideaways/alpine/Küche/Esstisch.JPG",
        "/pictures/hideaways/alpine/Küche/IMG_1236 (1).jpeg",
        "/pictures/hideaways/alpine/Küche/IMG_1244.jpeg",
        "/pictures/hideaways/alpine/Küche/Küche 4.JPG",
        "/pictures/hideaways/alpine/Küche/küche 2.JPG",
        "/pictures/hideaways/alpine/Küche/küche 3.JPG"
      ]
    },
    {
      id: "living",
      title: "Wohnzimmer",
      subtitle: "Feuer & Stein",
      category: "Community",
      images: [
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_0972.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_1022.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_1200.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_3169.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_3205.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_3209.jpeg",
        "/pictures/hideaways/alpine/Wohnzimmer/IMG_3217.jpeg"
      ]
    },
    {
      id: "outdoor",
      title: "Außenbereich",
      subtitle: "Karwendel-Blick",
      category: "Nature",
      images: [
        "/pictures/hideaways/alpine/HausAußen/haus sommer.png",
        "/pictures/hideaways/alpine/HausAußen/haus winter 2.jpeg",
        "/pictures/hideaways/alpine/HausAußen/haus winter.jpeg"
      ]
    },
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
                {/* Bild-Container (Slideshow) */}
                <div className="w-full md:w-3/5">
                  <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-stone-100 shadow-sm">
                    {area.images && area.images.length > 0 ? (
                      <ImageSlideshow images={area.images} title={area.title} />
                    ) : (
                      <img
                        src={`/pictures/the-feeling/${area.id}.jpg`}
                        className="w-full h-full object-cover"
                        alt={area.title}
                      />
                    )}
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
      <PageFooter />
    </div>
  );
}
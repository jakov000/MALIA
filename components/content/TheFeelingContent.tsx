"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FEELING_AREAS } from '@/lib/data';
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
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={images[currentIndex]}
                        fill
                        className="object-cover"
                        alt={`${title} - Bild ${currentIndex + 1}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
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

export default function TheFeelingContent() {
    return (
        <div className="bg-white">
            {/* --- 1. HERO SECTION --- */}
            <section className="relative h-screen w-full overflow-hidden bg-stone-900">
                <Image
                    src="/pictures/the-feeling/IMG_1151.jpeg"
                    fill
                    className="object-cover opacity-85"
                    alt="MALIA Architektur"
                    priority
                />
                <div className="absolute inset-0 bg-black/15" />

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
                        {FEELING_AREAS.map((area, idx) => (
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
                                            <Image
                                                src={`/pictures/the-feeling/${area.id}.jpg`}
                                                fill
                                                className="object-cover"
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

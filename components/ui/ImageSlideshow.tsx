"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ImageSlideshow({ images, title }: { images: string[], title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Bildwechsel alle 4 Sekunden
        return () => clearInterval(interval);
    }, [images.length]);

    if (!images || images.length === 0) {
        return (
             <div className="relative w-full h-full min-h-[600px] bg-stone-200 flex flex-col items-center justify-center border border-stone-300">
                <span className="text-stone-400 uppercase tracking-widest text-xs font-bold mb-2">Bilder Position</span>
             </div>
        );
    }

    return (
        <div className="relative w-full h-full min-h-[600px] overflow-hidden bg-stone-100 shadow-sm">
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
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={currentIndex === 0}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Fortschrittsanzeige (dezent) */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

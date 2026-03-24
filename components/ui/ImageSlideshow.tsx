"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function ImageSlideshow({ images, title }: { images: string[], title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (images.length <= 1 || lightboxOpen) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Bildwechsel alle 5 Sekunden
        return () => clearInterval(interval);
    }, [images.length, lightboxOpen]);

    if (!images || images.length === 0) {
        return (
             <div className="relative w-full h-full min-h-[600px] bg-stone-200 flex flex-col items-center justify-center border border-stone-300">
                <span className="text-stone-400 uppercase tracking-widest text-xs font-bold mb-2">Bilder Position</span>
             </div>
        );
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <div 
                className="relative w-full h-full min-h-[600px] overflow-hidden bg-stone-100 shadow-sm cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setLightboxOpen(true)}
            >
                <AnimatePresence>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            fill
                            className="object-cover transition-transform duration-[10000ms] ease-linear scale-105 group-hover:scale-110"
                            alt={`${title} - Bild ${currentIndex + 1}`}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={currentIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Manual Controls */}
                {images.length > 1 && (
                    <div className={`absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-100 md:opacity-0'}`}>
                        {/* On mobile, icons show automatically or we can keep them visible */}
                        <button onClick={handlePrev} className="p-2 bg-white/50 hover:bg-white/90 backdrop-blur-sm rounded-full text-stone-800 transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={handleNext} className="p-2 bg-white/50 hover:bg-white/90 backdrop-blur-sm rounded-full text-stone-800 transition-colors">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                {/* Progress Indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                className={`h-1.5 rounded-full transition-all duration-700 cursor-pointer ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {lightboxOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                            onClick={() => setLightboxOpen(false)}
                        >
                            <button 
                                className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/50 hover:bg-black/80 text-white rounded-full p-3 transition-colors z-[110] flex items-center justify-center backdrop-blur-sm shadow-xl"
                                aria-label="Schließen"
                                onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                            >
                                <X size={28} strokeWidth={1.5} />
                            </button>

                            <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center px-4 md:px-16" onClick={(e) => e.stopPropagation()}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`lightbox-${currentIndex}`}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={images[currentIndex]}
                                            fill
                                            className="object-contain"
                                            alt={`${title} - Lightbox Bild ${currentIndex + 1}`}
                                            sizes="100vw"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Lightbox Navigation */}
                                {images.length > 1 && (
                                    <>
                                        <button 
                                            onClick={handlePrev} 
                                            className="absolute left-4 md:left-8 p-3 md:p-4 text-white/50 hover:text-white transition-colors z-[110]"
                                        >
                                            <ChevronLeft size={48} strokeWidth={1} />
                                        </button>
                                        <button 
                                            onClick={handleNext} 
                                            className="absolute right-4 md:right-8 p-3 md:p-4 text-white/50 hover:text-white transition-colors z-[110]"
                                        >
                                            <ChevronRight size={48} strokeWidth={1} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Lightbox Counter */}
                            {images.length > 1 && (
                                <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 font-light tracking-[0.3em] text-sm z-[110]">
                                    {currentIndex + 1} / {images.length}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

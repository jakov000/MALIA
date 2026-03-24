"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import Image from 'next/image';
import { SPECIALS } from '@/lib/data';
import Button from '@/components/ui/Button';
import PageFooter from '@/components/PageFooter';
import { useTranslations, useLocale } from 'next-intl';

export default function MaliaSpecialsContent() {
    const t = useTranslations('Specials');
    const localActive = useLocale();
    const loc = (path: string) => `/${localActive}${path}`;

    const [selectedSpecial, setSelectedSpecial] = useState<number | null>(null);

    const richOptions = {
        bold: (chunks: React.ReactNode) => <strong className="font-medium text-stone-800">{chunks}</strong>,
        br: () => <br />
    };

    const currentSpecial = SPECIALS.find(s => s.id === selectedSpecial);

    return (
        <div className="bg-white min-h-screen">

            {/* --- MODAL SYSTEM --- */}
            <AnimatePresence>
                {selectedSpecial && currentSpecial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-stone-900/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedSpecial(null)} // Schließt Modal beim Klick auf Hintergrund
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Verhindert Schließen beim Klick ins Modal
                            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative rounded-sm"
                        >
                            <button
                                onClick={() => setSelectedSpecial(null)}
                                className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors z-10"
                            >
                                <X size={24} className="text-stone-800" />
                            </button>

                            {/* --- MODAL INHALT --- */}
                            <div className="p-10 md:p-16 space-y-10">
                                <div className="space-y-6 text-center">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#7d3a2a] font-bold">{t('modal.label')}</span>
                                    <h2 className="text-3xl md:text-4xl font-serif text-stone-800 uppercase tracking-wide leading-tight">
                                        {t(`offers.${selectedSpecial}.title`)}
                                    </h2>
                                    <div className="text-gray-600 font-light leading-relaxed max-w-xl mx-auto space-y-4">
                                        <p>{t.rich(`offers.${selectedSpecial}.description`, richOptions)}</p>
                                        {t(`offers.${selectedSpecial}.intro_bullets`) && (
                                            <p className="font-bold pt-2">{t(`offers.${selectedSpecial}.intro_bullets`)}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-stone-50/80 p-8 border-y border-stone-100">
                                    <p className="text-sm font-bold uppercase tracking-widest text-stone-800 mb-6 text-center">
                                        {t.rich(`offers.${selectedSpecial}.highlight`, richOptions)}
                                    </p>
                                    <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                        {Array.from({ length: 11 }).map((_, i) => (
                                            <li key={i} className="flex items-start gap-3 text-xs text-gray-600 font-light">
                                                <Check size={14} className="text-[#7d3a2a] mt-0.5 flex-shrink-0" />
                                                <span>{t.rich(`offers.${selectedSpecial}.features.${i}`, richOptions)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                                    <Button href={loc("/booking")} variant="primary" className="w-full sm:w-auto min-w-[200px]">{t('buttons.book')}</Button>
                                    <Button href={loc("/inquiry")} variant="outline" className="w-full sm:w-auto min-w-[200px]">{t('buttons.inquiry')}</Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 1. HERO SECTION --- */}
            <section className="relative h-screen w-full overflow-hidden bg-stone-900">
                <Image
                    src="/pictures/malia-specials/ausblicksommer.jpeg"
                    fill
                    className="object-cover opacity-70"
                    alt="MALIA Angebote"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6">
                        <svg width="60" height="80" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 10L85 60H70L95 90H60L85 110H15L40 90H5L30 60H15L50 10Z" stroke="white" strokeWidth="1.2" />
                        </svg>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.3em" }}
                        className="text-4xl md:text-7xl font-serif uppercase tracking-[0.3em] font-light leading-tight"
                    >
                        {t.rich('hero.title', richOptions)} <br />
                        <span className="text-xl md:text-3xl tracking-[0.5em] block mt-4 opacity-80 italic normal-case">{t('hero.subtitle')}</span>
                    </motion.h1>
                    <div className="absolute bottom-24 flex flex-col items-center">
                        <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80">{t('hero.scroll')}</span>
                        <div className="w-[1px] h-12 bg-white/40" />
                    </div>
                </div>
            </section>

            {/* --- 2. SPECIALS GRID SECTION --- */}
            <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {SPECIALS.map((special) => (
                        <motion.div
                            key={special.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedSpecial(special.id)}
                        >
                            <div className="aspect-[4/5] overflow-hidden relative mb-8 shadow-sm bg-stone-100">
                                <Image
                                    src={special.img}
                                    fill
                                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                    alt={special.shortTitle}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/40 transition-colors duration-500" />

                                {/* Center Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                                    <span className="text-[10px] uppercase tracking-[0.4em] mb-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                        {t('card.exclusive')}
                                    </span>
                                    <h3 className="text-3xl md:text-5xl font-serif uppercase tracking-widest mb-2">
                                        {t(`offers.${special.id}.shortTitle`)}
                                    </h3>
                                    <p className="text-sm md:text-lg italic font-serif opacity-90">
                                        {t(`offers.${special.id}.subtitle`)}
                                    </p>

                                    <div className="mt-12">
                                        <Button href={loc("/booking")} variant="white" className="bg-transparent border border-white/50 backdrop-blur-sm hover:bg-white hover:text-stone-900 pointer-events-auto">
                                            {t('card.book')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- 3. FOOTER SECTION --- */}
            <PageFooter />
        </div>
    );
}

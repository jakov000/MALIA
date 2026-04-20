"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FEELING_AREAS } from '@/lib/data';
import PageFooter from '@/components/PageFooter';
import { useTranslations } from 'next-intl';

import ImageSlideshow from '@/components/ui/ImageSlideshow';

export default function TheFeelingContent() {
    const t = useTranslations('TheFeeling');
    const tAreas = useTranslations('TheFeeling.areas');

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

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-light px-4"
                    >
                        {t('hero.title')}
                    </motion.h1>

                    <div className="absolute bottom-24 flex flex-col items-center">
                        <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80 italic">{t('hero.subtitle')}</span>
                        <div className="w-[1px] h-12 bg-white/40" />
                    </div>
                </div>
            </section>

            {/* --- 2. DISCOVERY SECTION (DIE KAPITEL) --- */}
            <section className="py-24 md:py-40 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="space-y-32 md:space-y-64">
                        {FEELING_AREAS.map((area, idx) => {
                            const title = tAreas(`${area.id}.title`);
                            const subtitle = tAreas(`${area.id}.subtitle`);

                            return (
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
                                        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 shadow-sm">
                                            {area.images && area.images.length > 0 ? (
                                                <ImageSlideshow images={area.images} title={title} />
                                            ) : (
                                                <Image
                                                    src={`/pictures/the-feeling/${area.id}.jpg`}
                                                    fill
                                                    className="object-cover"
                                                    alt={title}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Text-Container */}
                                    <div className="w-full md:w-2/5 space-y-6">
                                        <h2 className="text-3xl md:text-5xl font-serif text-stone-800 uppercase tracking-wider leading-tight">
                                            {title}
                                        </h2>
                                        {subtitle && (
                                            <p className="text-xl md:text-2xl font-serif text-stone-500 italic">
                                                {subtitle}
                                            </p>
                                        )}
                                        <div className="pt-6">
                                            <div className="w-12 h-[1px] bg-stone-300" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- 3. FOOTER SECTION --- */}
            <PageFooter />
        </div>
    );
}

"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Sun, Map } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import PageFooter from '@/components/PageFooter';
import { useTranslations, useLocale } from 'next-intl';

export default function TheSettingContent() {
    const t = useTranslations('TheSetting');
    const localActive = useLocale();
    const loc = (path: string) => `/${localActive}${path}`;

    const richOptions = {
        br: () => <br />
    };

    return (
        <div className="bg-white">
            {/* --- 1. HERO SECTION --- */}
            <section className="relative h-screen w-full overflow-hidden bg-stone-900">
                <Image
                    src="/pictures/the%20setting/IMG_1406.jpeg"
                    fill
                    className="object-cover opacity-80"
                    alt="MALIA Setting"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="mb-6">
                        <svg width="60" height="80" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 10L85 60H70L95 90H60L85 110H15L40 90H5L30 60H15L50 10Z" stroke="white" strokeWidth="1.2" />
                        </svg>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, letterSpacing: "0.2em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} className="text-5xl md:text-7xl font-serif uppercase tracking-[0.4em] font-light">
                        {t('hero.title')}
                    </motion.h1>
                </div>
            </section>

            {/* --- 2. WINTER AM ACHENSEE --- */}
            <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-sm uppercase tracking-[0.5em] text-gray-400 mb-6 font-bold flex justify-center items-center gap-4">
                        <Snowflake size={16} /> {t('winter.title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
                    <div className="space-y-8 text-gray-800 font-light leading-relaxed tracking-wide italic">
                        <p className="text-xl md:text-2xl font-serif">
                            {t.rich('winter.p1', richOptions)}
                        </p>
                        <p className="text-lg font-serif pt-8 border-t border-stone-100">
                            {t.rich('winter.p2', richOptions)}
                        </p>
                    </div>
                    <div className="aspect-[4/5] overflow-hidden relative shadow-sm bg-stone-100">
                        <Image
                            src="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80"
                            fill
                            className="object-cover"
                            alt="Winter"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Winter Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-sm text-gray-600 leading-relaxed tracking-wide">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <h4 className="font-bold uppercase tracking-widest text-stone-800">{t(`winter.grid.${i}.title`)}</h4>
                            <p>{t(`winter.grid.${i}.desc`)}</p>
                        </div>
                    ))}
                </div>

                {/* Der See im Winter */}
                <div className="mt-20 pt-20 border-t border-stone-100 text-center">
                    <SectionHeader
                        title={t('winter.lake.title')}
                        subtitle=""
                        description="" // Using custom description below
                        centered={true}
                    />
                    <p className="max-w-3xl mx-auto text-gray-600 font-light leading-relaxed mb-12 -mt-10">
                        {t.rich('winter.lake.desc', richOptions)}
                    </p>
                    <Button href={loc("/inquiry")} variant="primary">
                        {t('winter.lake.btn')}
                    </Button>
                </div>
            </section>

            {/* --- 3. SOMMER AM ACHENSEE --- */}
            <section className="py-24 md:py-40 px-6 bg-stone-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-sm uppercase tracking-[0.5em] text-gray-400 mb-6 font-bold flex justify-center items-center gap-4">
                            <Sun size={16} /> {t('summer.title')}
                        </h2>
                        <p className="text-xl md:text-3xl font-serif text-stone-800 italic leading-relaxed max-w-4xl mx-auto">
                            {t.rich('summer.p1', richOptions)}
                        </p>
                    </div>

                    {/* Sommer Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 text-sm text-gray-600 font-light leading-relaxed">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className={i === 6 ? "md:col-span-2 space-y-4 pt-10 border-t border-stone-200 text-center" : "space-y-6"}>
                                <h4 className={`font-bold text-stone-800 uppercase tracking-widest ${i === 6 ? "text-center" : ""}`}>{t(`summer.grid.${i}.title`)}</h4>
                                <p className={i === 6 ? "max-w-3xl mx-auto italic" : ""}>{t(`summer.grid.${i}.desc`)}</p>
                                {i < 2 && (
                                    <a href="#" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors">{t(`summer.grid.${i}.link`)}</a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. INTERAKTIVE KARTE --- */}
            <section className="py-24 md:py-40 px-6 text-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <Map className="text-stone-300 mb-8" size={40} strokeWidth={1} />
                    <SectionHeader
                        title={t('map.title')}
                        subtitle={t('map.subtitle')}
                        description={t('map.p1')}
                    />
                    <p className="text-gray-600 font-light leading-relaxed mb-10 -mt-10 max-w-3xl">
                        {t('map.p2')}
                    </p>
                    <Button
                        href="https://maps.achensee.com/v2/de/gdi_winter/2d/-1/default/11.274303742091197/47.474272478275765/11.689434077743158/-1/-1/"
                        variant="outline"
                        target="_blank"
                        className="flex items-center gap-2"
                    >
                        {t('map.btn')}
                    </Button>
                </div>
            </section>

            {/* --- 5. ATOLL ACHENSEE --- */}
            <section className="py-24 md:py-40 px-6 bg-stone-50/30">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <SectionHeader title={t('atoll.title')} />
                    <div className="text-gray-600 font-light leading-relaxed space-y-4 -mt-10">
                        <p>{t('atoll.p1')}</p>
                        <p>{t('atoll.p2')}</p>
                        <p>{t('atoll.p3')}</p>
                        <p className="italic pt-6">{t('atoll.p4')}</p>
                    </div>
                    <Button
                        href="https://www.atoll-achensee.com/"
                        variant="outline"
                        target="_blank"
                    >
                        {t('atoll.btn')}
                    </Button>
                </div>
            </section>

            {/* --- 5. FOOTER SECTION --- */}
            <PageFooter />
        </div>
    );
}

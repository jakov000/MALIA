"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Sun, Map } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import PageFooter from '@/components/PageFooter';
import { useTranslations, useLocale } from 'next-intl';
import ImageSlideshow from '@/components/ui/ImageSlideshow';

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
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="text-5xl md:text-7xl font-serif font-light px-4"
                    >
                        {t('hero.title')}
                    </motion.h1>
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="uppercase tracking-[0.4em] text-[10px] mt-6 font-light opacity-80 italic"
                    >
                        {t('hero.subtitle')}
                    </motion.span>
                </div>
            </section>

            {/* --- 2. QUICK NAVIGATION (SHORTCUTS) --- */}
            <section className="py-12 bg-white border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { id: 'tips', label: t('shortcuts.tips'), img: '/pictures/the-feeling/IMG_1151.jpeg' },
                            { id: 'winter', label: t('shortcuts.winter'), img: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80' },
                            { id: 'summer', label: t('shortcuts.summer'), img: '/pictures/malia-specials/ausblicksommer.jpeg' },
                            { id: 'map', label: t('shortcuts.map'), img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80' },
                            { id: 'atoll', label: t('shortcuts.atoll'), img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80' }
                        ].map((item) => (
                            <motion.a
                                key={item.id}
                                href={`#${item.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="relative aspect-[4/5] group overflow-hidden bg-stone-100 shadow-sm"
                            >
                                <Image
                                    src={item.img}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                    alt={item.label}
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                    <span className="text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold drop-shadow-md">
                                        {item.label}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

             {/* --- 3. WINTER AM ACHENSEE --- */}
            <section id="winter" className="py-24 md:py-40 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Big Banner Image with Overlay Title */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-20 shadow-sm bg-stone-100 group"
                    >
                        <Image
                            src="/pictures/the setting/DJI_0546.jpg"
                            fill
                            className="object-cover transition-transform duration-[5s] group-hover:scale-105"
                            alt="Achensee Winter Panorama"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white text-3xl md:text-6xl font-serif font-light tracking-widest uppercase text-center px-4 drop-shadow-lg">
                                {t('winter.title')}
                            </h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20 items-center">
                        <div className="space-y-8 text-gray-800 font-light leading-relaxed tracking-wide italic">
                            <p className="text-xl md:text-2xl font-serif">
                                {t.rich('winter.p1', richOptions)}
                            </p>
                            <p className="text-lg font-serif pt-8 border-t border-stone-100">
                                {t.rich('winter.p2', richOptions)}
                            </p>
                        </div>
                        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 shadow-sm">
                            <ImageSlideshow 
                                images={[
                                    "/pictures/the setting/slidersetting1/1.png",
                                    "/pictures/the setting/slidersetting1/2.jpg",
                                    "/pictures/the setting/slidersetting1/3.JPG",
                                    "/pictures/the setting/slidersetting1/4.jpg",
                                    "/pictures/the setting/slidersetting1/5.jpg",
                                    "/pictures/the setting/slidersetting1/6.png",
                                    "/pictures/the setting/slidersetting1/7.jpeg"
                                ]} 
                                title={t('winter.title')} 
                            />
                        </div>
                    </div>

                {/* Winter Details Alternating */}
                <div className="space-y-24 md:space-y-32 pt-10">
                    {['a.png', 'b.png', 'c.png', 'd.png'].map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
                        >
                            <div className="w-full md:w-1/2">
                                <div className="relative aspect-[16/10] overflow-hidden shadow-sm bg-stone-100">
                                    <Image
                                        src={`/pictures/the setting/${img}`}
                                        fill
                                        className="object-cover transition-transform duration-[2s] hover:scale-105"
                                        alt={t(`winter.grid.${i}.title`)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex justify-center">
                                <div className="bg-white p-6 md:p-12 max-w-lg space-y-4 shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-stone-50">
                                    <h4 className="font-bold uppercase tracking-widest text-stone-800 text-xs md:text-sm">
                                        {t(`winter.grid.${i}.title`)}
                                    </h4>
                                    <p className="text-gray-600 font-light leading-relaxed text-xs md:text-sm">
                                        {t(`winter.grid.${i}.desc`)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 pt-16 border-t border-stone-100 flex justify-center">
                    <Button href={loc("/inquiry")} variant="sage" className="uppercase tracking-widest px-8 py-4">
                        {t('winter.lake.btn')}
                    </Button>
                </div>
            </div>
            </section>

            {/* --- 4. SOMMER AM ACHENSEE --- */}
            <section id="summer" className="py-24 md:py-40 bg-stone-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Big Banner Image with Overlay Title */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-20 shadow-sm bg-stone-100 group"
                    >
                        <Image
                            src="/pictures/the setting/Sommersee.jpg"
                            fill
                            className="object-cover transition-transform duration-[5s] group-hover:scale-105"
                            alt="Achensee Sommer Panorama"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white text-3xl md:text-6xl font-serif font-light tracking-widest uppercase text-center px-4 drop-shadow-lg">
                                {t('summer.title')}
                            </h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20 items-center">
                        <div className="space-y-8 text-gray-800 font-light leading-relaxed tracking-wide italic">
                            <p className="text-xl md:text-2xl font-serif">
                                {t.rich('summer.p1', richOptions)}
                            </p>
                        </div>
                        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 shadow-sm">
                            <ImageSlideshow 
                                images={[
                                    "/pictures/the setting/slidersetting1/1.png",
                                    "/pictures/the setting/slidersetting1/2.jpg",
                                    "/pictures/the setting/slidersetting1/3.JPG",
                                    "/pictures/the setting/slidersetting1/4.jpg",
                                    "/pictures/the setting/slidersetting1/5.jpg",
                                    "/pictures/the setting/slidersetting1/6.png",
                                    "/pictures/the setting/slidersetting1/7.jpeg"
                                ]} 
                                title={t('summer.title')} 
                            />
                        </div>
                    </div>

                    {/* Sommer Details Alternating */}
                    <div className="space-y-24 md:space-y-32 pt-10">
                        {['s1.jpg', 's2.png', 's3.png', 's4.png', 's5.png', 's6.jpg', 's7.jpg', 's8.jpg'].map((img, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
                            >
                                <div className="w-full md:w-1/2">
                                    <div className="relative aspect-[16/10] overflow-hidden shadow-sm bg-stone-100">
                                        <Image
                                            src={`/pictures/the setting/${img}`}
                                            fill
                                            className="object-cover transition-transform duration-[2s] hover:scale-105"
                                            alt={t(`summer.grid.${i}.title`)}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 flex justify-center">
                                    <div className="bg-white p-6 md:p-12 max-w-lg space-y-4 shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-stone-50">
                                        <h4 className="font-bold uppercase tracking-widest text-stone-800 text-xs md:text-sm">
                                            {t(`summer.grid.${i}.title`)}
                                        </h4>
                                        <p className="text-gray-600 font-light leading-relaxed text-xs md:text-sm">
                                            {t(`summer.grid.${i}.desc`)}
                                        </p>
                                        <div className="flex flex-col gap-3 mt-4">
                                            <a 
                                                href={t(`summer.grid.${i}.url`)} 
                                                target={t(`summer.grid.${i}.url`).startsWith('http') ? "_blank" : "_self"}
                                                rel={t(`summer.grid.${i}.url`).startsWith('http') ? "noopener noreferrer" : ""}
                                                className="inline-block text-[10px] uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors border-b border-transparent hover:border-blue-700 w-fit"
                                            >
                                                {t(`summer.grid.${i}.link`)}
                                            </a>
                                            {/* Second Link only for Biken (Index 1) */}
                                            {i === 1 && (
                                                <a 
                                                    href={t(`summer.grid.${i}.url2`)} 
                                                    target={t(`summer.grid.${i}.url2`).startsWith('http') ? "_blank" : "_self"}
                                                    rel={t(`summer.grid.${i}.url2`).startsWith('http') ? "noopener noreferrer" : ""}
                                                    className="inline-block text-[10px] uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors border-b border-transparent hover:border-blue-700 w-fit"
                                                >
                                                    {t(`summer.grid.${i}.link2`)}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 pt-16 border-t border-stone-100 flex justify-center">
                        <Button href={loc("/inquiry")} variant="sage" className="uppercase tracking-widest px-8 py-4">
                            {t('summer.btn')}
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- 5. INTERAKTIVE KARTE --- */}
            <section id="map" className="py-24 md:py-40 px-6 text-center">
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

            {/* --- 6. ATOLL ACHENSEE --- */}
            <section id="atoll" className="py-24 md:py-40 px-6 bg-stone-50/30">
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

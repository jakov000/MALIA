"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // NEW
import { motion, AnimatePresence } from 'framer-motion';
import PageFooter from './PageFooter';
import Button from './ui/Button'; // NEW
import SectionHeader from './ui/SectionHeader'; // NEW
import { useTranslations, useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const loc = (path: string) => `/${locale}${path}`;
  const richOptions = {
    bold: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
    italic: (chunks: React.ReactNode) => <em>{chunks}</em>,
    br: () => <br />
  };
  // --- 1. BILDER-KONFIGURATION ---
  // Basierend auf deiner Ordnerstruktur in der Screenshot-Grafik
  const heroImages = [
    "/pictures/hero/hero/_DSC4122.JPG",
    "/pictures/hero/hero/Bad The Lakeside__.jpg",
    "/pictures/hero/hero/BildKueche_.jpg",
    "/pictures/hero/hero/Haus ausblick.jpg",
    "/pictures/hero/hero/IMG_1289.jpeg",
    "/pictures/hero/hero/IMG_1402.png",
    "/pictures/hero/hero/Küche 2.JPG",
    "/pictures/hero/hero/madleine_ausblick Sommer.jpeg",
    "/pictures/hero/hero/NEU Haus Winter.png"
  ];

  const [currentImg, setCurrentImg] = useState(0);

  // Automatischer Bildwechsel alle 6 Sekunden
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="flex flex-col w-full">

      {/* --- SECTION 1: HERO IMAGE SLIDER --- */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-stone-900">

        {/* Bilder mit sanftem Crossfade-Übergang */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImg]}
              fill
              className="object-cover opacity-70"
              alt="MALIA Alpine Hideaway Impression"
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* Text-Content (bleibt fixiert) */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-[180px] sm:max-w-[260px] md:max-w-[350px] lg:max-w-[480px] mb-8"
          >
            <Image 
              src="/pictures/MaliaMainLogo.svg" 
              alt="MALIA Alpine Hideaway" 
              width={900} 
              height={300} 
              className="w-full h-auto brightness-0 invert"
              priority
            />
          </motion.div>

          <div className="md:hidden">
            <Button
              href={loc("/booking")}
              variant="white"
              className="backdrop-blur-md bg-white/10 border-white/40 text-white hover:bg-white hover:text-black"
            >
              Jetzt Entdecken
            </Button>
          </div>
        </div>

        {/* Slider Indikatoren (Striche unten) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, idx) => (
            <div
              key={idx}
              className={`h-[2px] transition-all duration-1000 ${idx === currentImg ? 'w-8 bg-white' : 'w-3 bg-white/20'}`}
            />
          ))}
        </div>
      </section>

      {/* --- SECTION 2: INTRO TEXT --- */}
      <section className="py-24 md:py-40 px-6 bg-white">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <SectionHeader
            title={t('intro.title')}
            description={t('intro.p1')}
            uppercaseTitle={false}
          />
        </motion.div>
      </section>

      {/* --- SECTION 3: EXPERIENCE GRID --- */}
      <section className="pb-12 md:pb-20 px-6 md:px-12 bg-white text-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start border-b border-gray-100 pb-16 md:pb-24">

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative aspect-[3/4] overflow-hidden mb-10 group bg-stone-100">
              <Image
                src="/pictures/hero/hero2/IMG_1115.jpeg"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Wellness"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="font-serif text-xl md:text-2xl mb-4 tracking-widest uppercase">
              {t('wellness.title')} <span className="text-sm lowercase tracking-normal font-sans italic text-stone-500 block mt-2"></span>
            </h3>
            <div className="text-stone-600 font-sans font-light text-sm md:text-base leading-relaxed mb-8 space-y-4 pr-4">
              <p>{t.rich('wellness.p1', richOptions)}</p>
              <p>{t.rich('wellness.p2', richOptions)}</p>
              <p>{t('wellness.p3')}</p>
              <p className="italic font-serif text-[#7d3a2a]">{t('wellness.p4')}</p>
            </div>
            <Button href={loc("/booking")} variant="outline" className="border-stone-800 hover:bg-stone-800 hover:text-white">
              {t('wellness.button')}
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:mt-40">
            <div className="relative aspect-[3/4] overflow-hidden mb-10 shadow-sm group bg-stone-100">
              <Image
                src="/pictures/hero/hero2/füllbild.jpg"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Special"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="font-serif text-xl md:text-2xl mb-4 tracking-widest uppercase lining-nums">{t('special.title')}</h3>
            <div className="text-stone-600 font-sans font-light text-sm md:text-base leading-relaxed mb-8 space-y-4 pr-4">
              <p>{t.rich('special.p1', richOptions)}</p>
              <p className="italic font-serif text-[#7d3a2a]">{t('special.p2')}</p>
            </div>
            <Button href="/malia-specials" variant="outline" className="border-stone-800 hover:bg-stone-50">
              {t('special.button')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: HOSTS --- */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-serif text-stone-800 mb-10 uppercase tracking-widest">{t('hosts.title')}</h2>
            <div className="text-gray-600 font-sans font-light leading-relaxed text-sm md:text-base tracking-wide space-y-6 [&_strong]:font-medium [&_strong]:text-stone-800">
              <p>{t.rich('hosts.p1', richOptions)}</p>
              <p>{t.rich('hosts.p2', richOptions)}</p>
              <p>{t.rich('hosts.p3', richOptions)}</p>
              <p>{t.rich('hosts.p4', richOptions)}</p>
              <p>{t.rich('hosts.p5', richOptions)}</p>
              <p>{t.rich('hosts.p6', richOptions)}</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] w-full shadow-2xl bg-stone-100">
              <Image
                src="/pictures/hero/hero3/IMG_1041.jpg"
                fill
                className="object-cover"
                alt="Hosts"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-auto py-32 md:py-48 w-full flex items-center overflow-hidden" style={{ backgroundColor: '#3d3d29' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white text-center flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.4em] mb-4 font-bold text-stone-300">
            {t('voucher.subtitle')}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-10 uppercase tracking-widest leading-snug">
            {t.rich('voucher.title', richOptions)}
          </h2>
          
          <div className="font-sans font-light text-stone-200 text-sm md:text-base leading-relaxed max-w-3xl space-y-6 mb-12 [&_strong]:font-medium [&_strong]:text-white">
            <p>{t.rich('voucher.p1', richOptions)}</p>
            <p>{t.rich('voucher.p2', richOptions)}</p>
            <p>{t.rich('voucher.p3', richOptions)}</p>
          </div>

          <Button href="/vouchers" variant="outline" className="border-white text-white hover:bg-white hover:text-stone-900 hover:border-white bg-transparent tracking-widest uppercase text-xs px-8 py-4">
            {t('voucher.button')}
          </Button>
        </div>
      </section>

      {/* --- SECTION 6: LAGE & ANREISE --- */}
      <section className="bg-white py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <SectionHeader
              title={t('location.title')}
              subtitle={t('location.subtitle')}
              centered={true}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-full min-h-[400px]">
              <div className="relative h-full w-full overflow-hidden shadow-sm bg-stone-100 min-h-[400px]">
                <Image
                  src="/pictures/hero/hero5/haus sommer.png"
                  fill
                  className="object-cover transition-transform duration-[3000ms] hover:scale-105"
                  alt="Lage"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-between space-y-10">
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-800 border-b border-gray-100 pb-2">{t('location.section1_title')}</h3>
                <div className="text-gray-600 font-sans font-light text-xs md:text-sm leading-relaxed tracking-wide space-y-4 [&_strong]:font-medium [&_strong]:text-stone-800">
                  <p>{t.rich('location.p1', richOptions)}</p>
                  <p>{t.rich('location.p2', richOptions)}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-800 border-b border-gray-100 pb-2">{t('location.section2_title')}</h3>
                <div className="text-gray-600 font-sans font-light text-xs md:text-sm leading-relaxed tracking-wide space-y-4 [&_strong]:font-medium [&_strong]:text-stone-800">
                  <p>{t.rich('location.p3', richOptions)}</p>
                </div>
              </div>
              <div className="space-y-4 bg-stone-50 p-6 border-l-2 border-[#7d3a2a]/20">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-stone-800">{t('location.contact_title')}</h3>
                <div className="text-gray-600 font-sans font-light text-xs md:text-sm leading-loose tracking-widest">
                  <p className="font-medium text-stone-800 uppercase tracking-tighter">MALIA - Alpine Hideaway</p>
                  <p>Madleine & Julia Rieser</p>
                  <p>Ländbergstraße 6 | A-6213 Pertisau</p>
                  <div className="mt-4 pt-4 border-t border-gray-200/50 space-y-1 text-[11px]">
                    <p>Phone: <a href="tel:+43123456789" className="hover:text-stone-900 transition-colors">+43 123 456 789</a></p>
                    <p><a href="mailto:info@malia-alpine-hideaway.at" className="hover:text-stone-900 transition-colors">info@malia-alpine-hideaway.at</a></p>
                    <p><a href="https://www.malia-alpine-hideaway.at" className="hover:text-stone-900 transition-colors">www.malia-alpine-hideaway.at</a></p>
                  </div>
                </div>
              </div>
              <p className="italic font-serif text-[#7d3a2a] text-base md:text-lg text-center lg:text-left">{t('location.closing')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: MAP --- */}
      <section className="relative w-full h-[500px] grayscale opacity-80 hover:opacity-100 transition-opacity duration-700">
        <iframe width="100%" height="100%" style={{ border: 0 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.47!2d11.68!3d47.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479d63!2sPertisau!5e0!3m2!1sde!2sat!4v123456789" allowFullScreen loading="lazy"></iframe>
      </section>

      {/* --- SECTION 8: IN-PAGE FOOTER --- */}
      <PageFooter />
    </div>
  );
}
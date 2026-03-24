"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SUITES } from '@/lib/data';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import PageFooter from '@/components/PageFooter';
import { useTranslations, useLocale } from 'next-intl';

// --- HILFS-KOMPONENTE: ACCORDION ---
function AccordionItem({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-stone-100">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center group transition-colors hover:bg-stone-50/50 px-2 text-left"
            >
                <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-stone-700">{title}</span>
                <span className={`transform transition-transform duration-300 text-stone-400 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 px-2 pt-2 text-gray-600 font-light leading-relaxed tracking-wide">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- HAUPT-KOMPONENTE ---
export default function OurHideawaysContent() {
    const t = useTranslations('Hideaways');
    const localActive = useLocale();
    const [currentIndex, setCurrentIndex] = useState(0);

    const loc = (path: string) => `/${localActive}${path}`;

    const richOptions = {
        bold: (chunks: React.ReactNode) => <strong className="font-medium text-stone-800">{chunks}</strong>,
        italic: (chunks: React.ReactNode) => <em>{chunks}</em>,
        br: () => <br />
    };

    const nextSlide = () => currentIndex < SUITES.length - 1 && setCurrentIndex(currentIndex + 1);
    const prevSlide = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
    const handleSuiteClick = (index: number) => index !== currentIndex && setCurrentIndex(index);

    return (
        <div className="bg-white">
            {/* --- 1. HERO SECTION --- */}
            <section className="relative h-screen w-full overflow-hidden bg-stone-900">
                <Image
                    src="/pictures/hideaways/IMG-1402.png"
                    fill
                    className="object-cover opacity-90"
                    alt="Hero"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6">
                        <svg width="60" height="80" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 10L85 60H70L95 90H60L85 110H15L40 90H5L30 60H15L50 10Z" stroke="white" strokeWidth="1.2" />
                        </svg>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, letterSpacing: "0.2em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} className="text-4xl md:text-7xl font-serif uppercase tracking-[0.4em] font-light px-4">{t('hero.title')}</motion.h1>
                    <div className="absolute bottom-24 flex flex-col items-center">
                        <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80 italic">{t('hero.subtitle')}</span>
                        <div className="w-[1px] h-12 bg-white/40" />
                    </div>
                </div>
            </section>

            {/* --- 2. INTRO TEXT --- */}
            <section className="py-24 md:py-40 px-6 bg-white text-center">
                <SectionHeader
                    title={t('intro.title')}
                    description={
                        <div className="space-y-6">
                            <p>{t.rich('intro.p1', richOptions)}</p>
                            <p>{t.rich('intro.p2', richOptions)}</p>
                        </div>
                    }
                />
            </section>

            {/* --- 3. SLIDER SECTION --- */}
            <section className="py-24 bg-white overflow-hidden relative">
                <div className="max-w-[1800px] mx-auto px-6 flex relative">
                    <div className="hidden md:block w-16 relative"><span className="absolute top-0 left-0 origin-top-left -rotate-90 translate-y-40 whitespace-nowrap text-[10px] uppercase tracking-[0.6em] font-bold text-gray-400">{t('suites.label')}</span></div>
                    <div className="flex-1 relative">
                        <motion.div animate={{ x: `-${currentIndex * 55}%` }} transition={{ type: "spring", stiffness: 80, damping: 20 }} className="flex gap-12">
                            {SUITES.map((suite, index) => (
                                <div key={index} onClick={() => handleSuiteClick(index)} className={`min-w-[85%] md:min-w-[50%] transition-all duration-700 cursor-pointer ${currentIndex === index ? 'opacity-100' : 'opacity-30 hover:opacity-50'}`}>
                                    <div className="aspect-[4/3] overflow-hidden shadow-sm relative bg-stone-100">
                                        <Image
                                            src={suite.img}
                                            fill
                                            className="object-cover"
                                            alt={suite.title}
                                            sizes="(max-width: 768px) 85vw, 50vw"
                                        />
                                    </div>
                                    <div className="h-24 flex items-center justify-between">
                                        {currentIndex === index && (
                                            <div className="flex items-center gap-8" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex gap-2">
                                                    <button onClick={prevSlide} disabled={currentIndex === 0} className={`p-3 bg-white shadow-lg border border-gray-100 hover:scale-105 transition-all ${currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}>
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-180"><path d="M9 5l7 7-7 7" /></svg>
                                                    </button>
                                                    <button onClick={nextSlide} disabled={currentIndex === SUITES.length - 1} className={`p-3 bg-white shadow-lg border border-gray-100 hover:scale-105 transition-all ${currentIndex === SUITES.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}>
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
                                                    </button>
                                                </div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{currentIndex + 1} / {SUITES.length} <span className="ml-2 text-gray-300 font-normal">{t('suites.next')}</span></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="max-w-md space-y-6">
                                        <h3 className="text-2xl font-serif uppercase tracking-widest text-stone-800">{suite.title}</h3>
                                        <div className="text-xs text-gray-500 font-light space-y-1 tracking-[0.2em]"><p>{t('suites.from')} {suite.price},00</p><p>{suite.persons} {t('suites.persons')}</p><p>{suite.sqm} {t('suites.sqm')}</p></div>

                                        {/* BUTTON GROUP */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-4" onClick={(e) => e.stopPropagation()}>
                                            <Button href={loc(suite.href || "#")} variant="outline">{t('suites.btn_details')}</Button>
                                            <Button href={loc("/inquiry")} variant="outline">{t('suites.btn_inquiry')}</Button>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200 w-full text-center sm:text-left">
                                            <Button href={loc("/booking")} variant="primary" className="text-[10px] w-full sm:w-auto">{t('suites.btn_book')}</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 4. GUT ZU WISSEN SECTION --- */}
            <section className="py-24 md:py-40 px-6 bg-stone-50/30">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-7 space-y-10">
                        <h2 className="text-xl md:text-2xl font-serif uppercase tracking-[0.3em] text-stone-800 border-b border-stone-100 pb-6">{t('faq.title')}</h2>
                        <div className="space-y-1">
                            <AccordionItem title={t('faq.q_cancellation')}>
                                <p>{t('faq.a_cancellation_intro')}</p>
                                <ul className="mt-4 space-y-1 list-none">
                                    <li>{t('faq.a_cancellation_1')}</li>
                                    <li>{t('faq.a_cancellation_2')}</li>
                                    <li>{t('faq.a_cancellation_3')}</li>
                                    <li>{t('faq.a_cancellation_4')}</li>
                                </ul>
                                <p className="mt-4 italic text-xs whitespace-pre-line">{t('faq.a_cancellation_note')}</p>
                            </AccordionItem>
                            
                            <AccordionItem title={t('faq.q_location')}>
                                <p>{t.rich('faq.a_location_1', richOptions)}</p>
                                <p className="mt-4">{t('faq.a_location_2')}</p>
                                <p className="mt-6 font-bold uppercase tracking-widest text-[#7d3a2a] text-[10px]">{t('faq.a_location_train_title')}</p>
                                <p className="mt-2">{t.rich('faq.a_location_train', richOptions)}</p>
                            </AccordionItem>
                            
                            <AccordionItem title={t('faq.q_prices')}>
                                <ul className="space-y-4 list-disc pl-4">
                                    <li>{t('faq.a_prices_1')}</li>
                                    <li>{t('faq.a_prices_2')}</li>
                                    <li>{t('faq.a_prices_3')}</li>
                                </ul>
                            </AccordionItem>
                            
                            <AccordionItem title={t('faq.q_checkin_out')}>
                                <p>{t.rich('faq.a_checkin', richOptions)}</p>
                                <p className="mt-2">{t.rich('faq.a_checkout', richOptions)}</p>
                            </AccordionItem>
                            
                            <AccordionItem title={t('faq.q_deposit')}>
                                <p>{t('faq.a_deposit_text')}</p>
                                <div className="mt-4 p-4 bg-white border border-stone-100 font-mono text-[10px] md:text-xs text-stone-600">
                                    <p>{t('faq.a_deposit_account')}: Madleine Rieser Julia Rieser</p>
                                    <p>IBAN: AT23 2050 8000 0003 7341</p>
                                    <p>BIC: SPRTAT21XXX</p>
                                    <p>{t('faq.a_deposit_bank')}: Sparkasse Rattenberg</p>
                                </div>
                            </AccordionItem>
                            
                            <AccordionItem title={t('faq.q_payment')}>
                                <ul className="space-y-2 list-none">
                                    <li>{t('faq.a_payment_1')}</li>
                                    <li>{t('faq.a_payment_2')}</li>
                                    <li>{t('faq.a_payment_3')} <a href="mailto:info@malia-alpine-hideaway.at" className="hover:text-stone-900 transition-colors">info@malia-alpine-hideaway.at</a></li>
                                    <li className="text-[#7d3a2a]">{t.rich('faq.a_payment_4', richOptions)}</li>
                                    <li className="text-[#7d3a2a]">{t.rich('faq.a_payment_5', richOptions)}</li>
                                </ul>
                            </AccordionItem>
                            
                            <AccordionItem title={t('faq.q_pets')}>
                                <p>{t.rich('faq.a_pets', richOptions)}</p>
                            </AccordionItem>
                        </div>
                    </div>

                    <div className="lg:col-span-3 sticky top-32 self-start">
                        <div className="aspect-[3/4] overflow-hidden shadow-sm relative bg-stone-100">
                            <Image
                                src="/pictures/hideaways/Bild 3889.JPG"
                                fill
                                className="object-cover"
                                alt="Ambiente"
                                sizes="(max-width: 1024px) 100vw, 33vw"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-2 sticky top-32 self-start flex flex-col justify-between space-y-12">
                        <p className="text-base md:text-lg font-serif italic text-stone-600 leading-relaxed text-center lg:text-left">{t('quote')}</p>
                        <div className="aspect-square overflow-hidden shadow-sm relative bg-stone-100">
                            <Image
                                src="/pictures/hideaways/_DSC2878.JPG"
                                fill
                                className="object-cover"
                                alt="Detail"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. FOOTER --- */}
            <PageFooter />
        </div>
    );
}

"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SUITES } from '@/lib/data';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import PageFooter from '@/components/PageFooter';

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
    const [currentIndex, setCurrentIndex] = useState(0);

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
                    <motion.h1 initial={{ opacity: 0, letterSpacing: "0.2em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} className="text-4xl md:text-7xl font-serif uppercase tracking-[0.4em] font-light px-4">Inspired by Nature, Designed for YOU!</motion.h1>
                    <div className="absolute bottom-24 flex flex-col items-center">
                        <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80 italic">scroll for happiness</span>
                        <div className="w-[1px] h-12 bg-white/40" />
                    </div>
                </div>
            </section>

            {/* --- 2. INTRO TEXT --- */}
            <section className="py-24 md:py-40 px-6 bg-white text-center">
                <SectionHeader
                    title="Zimmer & Suiten"
                    description="Im MALIA treffen Naturmaterialien auf alpine luxury. Altholz, strukturierter Stein, feine Leinenstoffe und Farben, die direkt aus der Natur stammen. Die großzügigen Glasfronten holen die Berge direkt ins Haus und lassen die Grenzen zwischen Innen und Außen verschwimmen."
                />
            </section>

            {/* --- 3. SLIDER SECTION --- */}
            <section className="py-24 bg-white overflow-hidden relative">
                <div className="max-w-[1800px] mx-auto px-6 flex relative">
                    <div className="hidden md:block w-16 relative"><span className="absolute top-0 left-0 origin-top-left -rotate-90 translate-y-40 whitespace-nowrap text-[10px] uppercase tracking-[0.6em] font-bold text-gray-400">LUXUS-SUITEN</span></div>
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
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{currentIndex + 1} / {SUITES.length} <span className="ml-2 text-gray-300 font-normal">nächste Suite</span></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="max-w-md space-y-6">
                                        <h3 className="text-2xl font-serif uppercase tracking-widest text-stone-800">{suite.title}</h3>
                                        <div className="text-xs text-gray-500 font-light space-y-1 tracking-[0.2em]"><p>ab € {suite.price},00</p><p>{suite.persons} Personen</p><p>{suite.sqm} m²</p></div>

                                        {/* BUTTON GROUP */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-4" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="outline">Details</Button>
                                            <Button href="/inquiry" variant="outline">Jetzt Anfragen</Button>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200 w-full text-center sm:text-left">
                                            <Button href="/booking" variant="primary" className="text-[10px] w-full sm:w-auto">oder Direkt Buchen</Button>
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
                        <h2 className="text-xl md:text-2xl font-serif uppercase tracking-[0.3em] text-stone-800 border-b border-stone-100 pb-6">Gut zu wissen</h2>
                        <div className="space-y-1">
                            <AccordionItem title="Stornobedingungen">
                                <p>Es gelten folgende Stornokonditionen für Stornierungen / Änderungen:</p>
                                <ul className="mt-4 space-y-1 list-none">
                                    <li>• bis zu 60 Tage vor Anreise - kostenfreies Storno möglich</li>
                                    <li>• bis zu 30 Tage vor Anreise - 50% Stornokosten</li>
                                    <li>• bis zu 14 Tage vor Anreise - 70% Stornokosten</li>
                                    <li>• mit weniger als 14 Tagen oder Nichtanreise - 100% Stornokosten</li>
                                </ul>
                                <p className="mt-4 italic text-xs">Die Stornokosten werden vom Gesamtpreis berechnet.</p>
                            </AccordionItem>
                            <AccordionItem title="Lage & Anreise">
                                <p>Das MALIA-Alpine-Hideaway liegt in Pertisau am Achensee. Die Bergbahn ist nur 2 Gehminuten entfernt. Trotz der ruhigen Lage erreicht ihr den Achensee und Restaurants in wenigen Minuten zu Fuß.</p>
                                <p className="mt-4 font-bold">Anreise mit der Bahn:</p>
                                <p>Der nächstgelegene Bahnhof ist Jenbach, nur rund 15 Minuten vom Achensee entfernt.</p>
                            </AccordionItem>
                            <AccordionItem title="Preise">
                                <p>Die Preise verstehen sich pro Nacht ohne Verpflegung:</p>
                                <ul className="mt-2 space-y-1">
                                    <li>The Retreat: 45€</li>
                                    <li>The Residence: 120€</li>
                                    <li>The Hideaway: 150€</li>
                                </ul>
                                <p className="mt-4 text-[10px] uppercase tracking-widest">Kurtaxe: € 3,- pro Person/Nacht (Kinder bis 14 J. befreit).</p>
                            </AccordionItem>
                            <AccordionItem title="Check-In / Check-Out">
                                <p>Check-In: ab 15.00 Uhr</p>
                                <p>Check-Out: bis 10.00 Uhr</p>
                            </AccordionItem>
                            <AccordionItem title="Anzahlung">
                                <p>Wir bitten um eine Anzahlung von 30% der Gesamtsumme auf:</p>
                                <div className="mt-4 p-4 bg-white border border-stone-100 font-mono text-[10px] md:text-xs">
                                    <p>Inhaber: Madleine Rieser & Julia Rieser</p>
                                    <p>IBAN: AT23 2050 8000 0003 7341</p>
                                    <p>BIC: SPRTAT21XXX</p>
                                    <p>Bank: Sparkasse Rattenberg</p>
                                </div>
                            </AccordionItem>
                            <AccordionItem title="Zahlungsarten">
                                <p>• Bar (Euro) bei Ankunft</p>
                                <p>• Vorab Überweisung (muss vor Abreise verbucht sein)</p>
                                <p>• Paypal: info@malia-alpine-hideaway.at</p>
                                <p>• EC-Karte (Maestro)</p>
                                <p>• Kreditkarte (Visa/MC) +2% Zuschlag</p>
                            </AccordionItem>
                            <AccordionItem title="Haustiere">
                                <p>Hunde auf Anfrage im "The Retreat" willkommen (nur nicht haarende Rassen). Eine zusätzliche Endreinigung wird berechnet.</p>
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
                        <p className="text-base md:text-lg font-serif italic text-stone-600 leading-relaxed text-center lg:text-left">„Einfach ankommen & glücklich sein.“</p>
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

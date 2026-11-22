"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import PageFooter from '@/components/PageFooter';
import { useTranslations, useLocale } from 'next-intl';
import { DISCOUNT_SPECIALS, OFFERS, formatEuro, offerUnit, type DiscountSpecial, type Offer } from '@/lib/offers';
import type { Locale } from '@/lib/seo';

/** Bildfläche einer Kachel – mit Foto oder, solange keins da ist, mit Platzhalter. */
function TileImage({ src, alt, placeholder }: { src?: string; alt: string; placeholder: string }) {
    return (
        <div className="aspect-[4/3] relative overflow-hidden bg-[#ebe8e1]">
            {src ? (
                <Image
                    src={src}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    alt={alt}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">{placeholder}</span>
                </div>
            )}
        </div>
    );
}

function OfferTile({ offer, locale }: { offer: Offer; locale: Locale }) {
    const t = useTranslations('Specials');
    const detailHref = `/${locale}/malia-specials/${offer.slug}`;
    return (
        <article className="group flex flex-col bg-white border border-stone-200">
            <Link href={detailHref} aria-label={offer.title[locale]}>
                <TileImage src={offer.image} alt={offer.imageAlt?.[locale] ?? offer.title[locale]} placeholder={t('card.photoFollows')} />
            </Link>
            <div className="flex flex-col flex-1 p-6 md:p-7">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#3d3d29] font-bold">
                    {offerUnit(offer).name} · {t('card.nights', { count: offer.nights })} · {t('card.upTo', { count: offer.maxGuests })}
                </p>
                <h3 className="mt-3 text-2xl font-serif text-stone-800 leading-snug">
                    <Link href={detailHref} className="hover:text-[#3d3d29] transition-colors">
                        {offer.title[locale]}
                    </Link>
                </h3>
                <p className="mt-3 text-sm font-light text-gray-600 leading-relaxed">{offer.teaser[locale]}</p>

                <div className="mt-auto pt-6">
                    <p className="text-xl font-serif text-stone-800">{formatEuro(offer.price, locale)}</p>
                    <p className="text-xs font-light text-stone-500 mt-1">
                        {t('card.perPerson', { price: formatEuro(offer.pricePerPerson, locale, 0), count: offer.maxGuests })}
                    </p>
                    <p className="text-xs font-light text-stone-500">{t('card.inclusive')}</p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <Button href={detailHref} variant="outline" className="px-2! tracking-[0.15em]! whitespace-nowrap">{t('card.details')}</Button>
                        <Button href={`/${locale}/booking?angebot=${offer.slug}`} variant="sage" className="px-2! tracking-[0.15em]! whitespace-nowrap">{t('card.book')}</Button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function DiscountTile({ special, locale }: { special: DiscountSpecial; locale: Locale }) {
    const t = useTranslations('Specials');
    const detailHref = `/${locale}/malia-specials/${special.slug}`;
    const titel = t(`offers.${special.messageId}.shortTitle`);
    return (
        <article className="group flex flex-col bg-white border border-stone-200">
            <Link href={detailHref} aria-label={titel}>
                <TileImage
                    src={special.image}
                    alt={`${titel} – MALIA Alpine Hideaway in Pertisau am Achensee`}
                    placeholder={t('card.photoFollows')}
                />
            </Link>
            <div className="flex flex-col flex-1 p-6 md:p-7">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#3d3d29] font-bold">{t('card.directBooking')}</p>
                <h3 className="mt-3 text-2xl font-serif text-stone-800 leading-snug">
                    <Link href={detailHref} className="hover:text-[#3d3d29] transition-colors">{titel}</Link>
                </h3>
                <p className="mt-3 text-sm font-light text-gray-600 leading-relaxed italic font-serif">
                    {t(`offers.${special.messageId}.subtitle`)}
                </p>
                <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
                    <Button href={detailHref} variant="outline" className="px-2! tracking-[0.15em]! whitespace-nowrap">{t('card.details')}</Button>
                    <Button href={`/${locale}/booking`} variant="sage" className="px-2! tracking-[0.15em]! whitespace-nowrap">{t('card.book')}</Button>
                </div>
            </div>
        </article>
    );
}

function Rubrik({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
    return (
        <div>
            <div className="max-w-2xl mb-10 md:mb-14">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#3d3d29] font-bold">{eyebrow}</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-serif text-stone-800 tracking-wide">{title}</h2>
                <p className="mt-4 font-light text-gray-600 leading-relaxed">{intro}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{children}</div>
        </div>
    );
}

export default function MaliaSpecialsContent() {
    const t = useTranslations('Specials');
    const locale = useLocale() as Locale;

    return (
        <div className="bg-white min-h-screen">

            {/* --- 1. HERO SECTION --- */}
            <section className="relative h-screen w-full overflow-hidden bg-stone-900">
                <Image
                    src="/pictures/malia-specials/ausblicksommer.jpeg"
                    fill
                    sizes="100vw"
                    className="object-cover opacity-70"
                    alt="Saisonale Angebote im MALIA Alpine Hideaway in Pertisau am Achensee"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />

                <div className="relative z-10 h-full flex flex-col items-center justify-end text-white text-center px-6 pb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-5xl font-serif font-light tracking-widest mb-12"
                    >
                        {t('hero.title')} {t('hero.subtitle')}
                    </motion.h1>
                    <div className="flex flex-col items-center">
                        <span className="uppercase tracking-[0.4em] text-[10px] mb-4 font-light opacity-80">{t('hero.scroll')}</span>
                        <div className="w-[1px] h-12 bg-white/40" />
                    </div>
                </div>
            </section>

            {/* --- 2. ERLEBNISANGEBOTE & SPECIALS --- */}
            <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto space-y-24 md:space-y-32">
                <Rubrik eyebrow={t('packages.eyebrow')} title={t('packages.title')} intro={t('packages.intro')}>
                    {OFFERS.map((offer) => (
                        <OfferTile key={offer.slug} offer={offer} locale={locale} />
                    ))}
                </Rubrik>

                <Rubrik eyebrow={t('discounts.eyebrow')} title={t('discounts.title')} intro={t('discounts.intro')}>
                    {DISCOUNT_SPECIALS.map((special) => (
                        <DiscountTile key={special.slug} special={special} locale={locale} />
                    ))}
                </Rubrik>

                <div className="border-t border-stone-200 pt-12 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                    <p className="font-light text-gray-600 max-w-xl">{t('inquiryNote')}</p>
                    <Button href={`/${locale}/inquiry`} variant="outline" className="border-stone-800 hover:bg-stone-50 shrink-0">
                        {t('buttons.inquiry')}
                    </Button>
                </div>
            </section>

            {/* --- 3. FOOTER SECTION --- */}
            <PageFooter />
        </div>
    );
}

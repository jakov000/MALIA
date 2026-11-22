import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import PageFooter from '@/components/PageFooter';
import Button from '@/components/ui/Button';
import { breadcrumbSchema, offerSchema } from '@/lib/schema';
import { buildMetadata, isLocale, DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/seo';
import {
    DISCOUNT_SPECIALS,
    OFFERS,
    findDiscountSpecial,
    findOffer,
    formatEuro,
    monthList,
    offerRulesText,
    offerUnit,
    type DiscountSpecial,
    type Offer,
} from '@/lib/offers';

/**
 * Detailseite eines Angebots unter /malia-specials/[slug]. Zwei Arten teilen
 * sich die Route: Erlebnisangebote aus lib/offers.ts (Festpreis, direkt mit
 * Termin buchbar) und die beiden Rabatt-Specials, deren abgenommene Texte im
 * Specials-Namespace der Sprachdateien stehen.
 */

export function generateStaticParams() {
    const slugs = [...OFFERS.map((o) => o.slug), ...DISCOUNT_SPECIALS.map((s) => s.slug)];
    return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

/** Specials-Texte enthalten <bold>- und <br>-Markup; für Meta-Angaben nur der Text. */
const ohneMarkup = (s: string) => s.replace(/<br><\/br>/g, ' ').replace(/<\/?[a-z]+>/g, '').replace(/\s+/g, ' ').trim();

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale: rawLocale, slug } = await params;
    const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
    const path = `/malia-specials/${slug}`;

    const offer = findOffer(slug);
    if (offer) {
        const unit = offerUnit(offer);
        const preis = formatEuro(offer.price, locale);
        const description =
            locale === 'de'
                ? `${offer.teaser[locale]} ${offer.nights} Nächte im MALIA – ${unit.name} am Achensee für bis zu ${offer.maxGuests} Personen: ${preis} inklusive Endreinigung und Kurtaxe.`
                : `${offer.teaser[locale]} ${offer.nights} nights at MALIA – ${unit.name} on Lake Achensee for up to ${offer.maxGuests} guests: ${preis} including final cleaning and tourist tax.`;
        return buildMetadata({
            locale,
            path,
            title: `${offer.title[locale]} | MALIA Specials`,
            description,
            ...(offer.image ? { image: offer.image } : {}),
        });
    }

    const special = findDiscountSpecial(slug);
    if (special) {
        const t = await getTranslations({ locale, namespace: 'Specials' });
        return buildMetadata({
            locale,
            path,
            title: `${ohneMarkup(t.raw(`offers.${special.messageId}.title`))} | MALIA Specials`,
            description: ohneMarkup(t.raw(`offers.${special.messageId}.description`)),
            image: special.image,
        });
    }
    return {};
}

function Brotkrumen({ locale, titel }: { locale: Locale; titel: string }) {
    return (
        <nav
            aria-label={locale === 'de' ? 'Brotkrumennavigation' : 'Breadcrumb'}
            className="max-w-6xl mx-auto px-6 pt-5 text-[11px] text-stone-400"
        >
            <Link href={`/${locale}/malia-specials`} className="hover:text-stone-700">
                MALIA Specials
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-600">{titel}</span>
        </nav>
    );
}

function Hero({ image, alt, titel, unterzeile }: { image?: string; alt: string; titel: string; unterzeile: string }) {
    return (
        <section className="relative h-[55vh] min-h-[340px] w-full overflow-hidden bg-stone-800">
            {image && <Image src={image} alt={alt} fill sizes="100vw" priority className="object-cover opacity-65" />}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
                <h1 className="text-3xl md:text-5xl font-serif font-light leading-snug max-w-4xl">{titel}</h1>
                <p className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-90">{unterzeile}</p>
            </div>
        </section>
    );
}

function Leistungen({ titel, children }: { titel: string; children: ReactNode }) {
    return (
        <section>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-5">{titel}</h2>
            <ul className="space-y-3">{children}</ul>
        </section>
    );
}

function Leistung({ children }: { children: ReactNode }) {
    return (
        <li className="flex gap-3 font-light text-gray-600 text-sm leading-relaxed">
            <Check className="w-4 h-4 mt-1 shrink-0 text-[#3d3d29]" strokeWidth={2} />
            <span>{children}</span>
        </li>
    );
}

function Fakt({ label, wert }: { label: string; wert: string }) {
    return (
        <div className="flex justify-between gap-4 py-3 border-b border-stone-100 text-sm">
            <dt className="text-stone-500 font-light">{label}</dt>
            <dd className="text-stone-800 text-right">{wert}</dd>
        </div>
    );
}

function OfferDetail({ offer, locale }: { offer: Offer; locale: Locale }) {
    const de = locale === 'de';
    const unit = offerUnit(offer);
    const titel = offer.title[locale];
    const naechte = de ? `${offer.nights} Nächte` : `${offer.nights} nights`;
    const personen = de ? `bis ${offer.maxGuests} Personen` : `up to ${offer.maxGuests} guests`;
    const bookHref = `/${locale}/booking?angebot=${offer.slug}`;

    const schema = [
        offerSchema(offer, locale),
        breadcrumbSchema(locale, [
            { name: de ? 'Startseite' : 'Home', path: '' },
            { name: 'MALIA Specials', path: '/malia-specials' },
            { name: titel, path: `/malia-specials/${offer.slug}` },
        ]),
    ];

    return (
        <div className="bg-white">
            <JsonLd data={schema} />
            <Hero
                image={offer.image}
                alt={offer.imageAlt?.[locale] ?? titel}
                titel={titel}
                unterzeile={`MALIA – ${unit.name} · ${naechte} · ${personen}`}
            />
            <div className="border-b border-stone-100 pb-5">
                <Brotkrumen locale={locale} titel={titel} />
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-7 space-y-12">
                    <div className="space-y-5 font-light text-gray-600 leading-relaxed">
                        {offer.description.map((absatz, i) => (
                            <p key={i}>{absatz[locale]}</p>
                        ))}
                    </div>

                    <Leistungen titel={de ? 'Das Reiseerlebnis beinhaltet' : 'Your stay includes'}>
                        {offer.includes.map((leistung, i) => (
                            <Leistung key={i}>{leistung[locale]}</Leistung>
                        ))}
                    </Leistungen>

                    <section className="bg-stone-50 border-l-2 border-[#bcc2b2] p-6">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-3">
                            {de ? 'Nebensaison-Upgrade' : 'Off-season upgrade'}
                        </h2>
                        <p className="font-light text-gray-600 leading-relaxed">{offer.upgrade.text[locale]}</p>
                        <p className="mt-3 text-xs text-stone-500">
                            {de
                                ? `Gilt bei Anreise im ${monthList(offer.upgrade.months, locale)}.`
                                : `Applies to arrivals in ${monthList(offer.upgrade.months, locale)}.`}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-4">
                            {de ? 'Wann buchbar?' : 'When can I book?'}
                        </h2>
                        <ul className="space-y-2 font-light text-gray-600 text-sm leading-relaxed list-disc pl-5">
                            {offerRulesText(offer, locale).map((satz) => (
                                <li key={satz}>{satz}</li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm font-light text-gray-600">
                            {de
                                ? 'Im Buchungskalender sind nur passende Anreisetage wählbar.'
                                : 'Only matching arrival days can be selected in the booking calendar.'}
                        </p>
                    </section>
                </div>

                <aside className="lg:col-span-5">
                    <div className="lg:sticky lg:top-32 border border-stone-200 p-6 md:p-8">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29]">
                            {de ? 'Festpreis' : 'Fixed price'}
                        </p>
                        <p className="mt-2 text-3xl font-serif text-stone-800">{formatEuro(offer.price, locale)}</p>
                        <p className="mt-1 text-xs font-light text-stone-500">
                            {de
                                ? `${formatEuro(offer.pricePerPerson, locale, 0)} pro Person bei ${offer.maxGuests} Personen · inkl. Endreinigung und Kurtaxe`
                                : `${formatEuro(offer.pricePerPerson, locale, 0)} per person for ${offer.maxGuests} guests · incl. final cleaning and tourist tax`}
                        </p>

                        <dl className="mt-6">
                            <Fakt label={de ? 'Unterkunft' : 'Accommodation'} wert={`MALIA – ${unit.name}`} />
                            <Fakt label={de ? 'Aufenthalt' : 'Stay'} wert={naechte} />
                            <Fakt label={de ? 'Personen' : 'Guests'} wert={personen} />
                            {offer.lateCheckout && (
                                <Fakt
                                    label={de ? 'Abreise' : 'Departure'}
                                    wert={de ? `bis ${offer.lateCheckout.de} Uhr` : `until ${offer.lateCheckout.en}`}
                                />
                            )}
                        </dl>

                        <div className="mt-8 flex flex-col gap-3">
                            <Button href={bookHref} variant="sage" className="w-full">
                                {de ? 'Jetzt buchen' : 'Book now'}
                            </Button>
                            <Button href={`/${locale}/inquiry`} variant="outline" className="w-full">
                                {de ? 'Unverbindlich anfragen' : 'Send an enquiry'}
                            </Button>
                        </div>
                        <Link
                            href={`/${locale}${unit.path}`}
                            className="mt-6 inline-block text-xs text-stone-500 underline underline-offset-4 hover:text-stone-800"
                        >
                            {de ? `Mehr über ${unit.name}` : `More about ${unit.name}`}
                        </Link>
                    </div>
                </aside>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-16">
                <Link href={`/${locale}/malia-specials`} className="text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800">
                    ← {de ? 'Alle Angebote' : 'All offers'}
                </Link>
            </div>
            <PageFooter />
        </div>
    );
}

async function DiscountDetail({ special, locale }: { special: DiscountSpecial; locale: Locale }) {
    const de = locale === 'de';
    const t = await getTranslations({ locale, namespace: 'Specials' });
    const id = special.messageId;
    const rich = {
        bold: (chunks: ReactNode) => <strong className="font-medium text-stone-800">{chunks}</strong>,
        br: () => <br />,
    };
    const titel = t(`offers.${id}.title`);

    // Nur übersetzte Leistungen anzeigen – die Listen sind je Special unterschiedlich lang.
    const leistungen = Array.from({ length: 12 }, (_, i) => i).filter((i) => t.has(`offers.${id}.features.${i}`));

    const schema = breadcrumbSchema(locale, [
        { name: de ? 'Startseite' : 'Home', path: '' },
        { name: 'MALIA Specials', path: '/malia-specials' },
        { name: titel, path: `/malia-specials/${special.slug}` },
    ]);

    return (
        <div className="bg-white">
            <JsonLd data={schema} />
            <Hero
                image={special.image}
                alt={`${t(`offers.${id}.shortTitle`)} – MALIA Alpine Hideaway in Pertisau am Achensee`}
                titel={t(`offers.${id}.shortTitle`)}
                unterzeile={t(`offers.${id}.subtitle`)}
            />
            <div className="border-b border-stone-100 pb-5">
                <Brotkrumen locale={locale} titel={t(`offers.${id}.shortTitle`)} />
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-7 space-y-10">
                    <h2 className="text-2xl md:text-3xl font-serif text-stone-800 leading-tight">{titel}</h2>
                    <div className="font-light text-gray-600 leading-relaxed">{t.rich(`offers.${id}.description`, rich)}</div>
                    <p className="font-light text-stone-800 border-l-2 border-[#bcc2b2] pl-4">{t.rich(`offers.${id}.highlight`, rich)}</p>
                    <Leistungen titel={t('details.included')}>
                        {leistungen.map((i) => (
                            <Leistung key={i}>{t.rich(`offers.${id}.features.${i}`, rich)}</Leistung>
                        ))}
                    </Leistungen>
                </div>

                <aside className="lg:col-span-5">
                    <div className="lg:sticky lg:top-32 border border-stone-200 p-6 md:p-8">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29]">{t('card.directBooking')}</p>
                        <p className="mt-3 font-light text-gray-600 leading-relaxed text-sm">
                            {de
                                ? 'Der Rabatt wird bei einer Buchung über unsere Website automatisch berücksichtigt.'
                                : 'The discount is applied automatically when you book on our website.'}
                        </p>
                        <div className="mt-8 flex flex-col gap-3">
                            <Button href={`/${locale}/booking`} variant="sage" className="w-full">
                                {t('buttons.book')}
                            </Button>
                            <Button href={`/${locale}/inquiry`} variant="outline" className="w-full">
                                {t('buttons.inquiry')}
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-16">
                <Link href={`/${locale}/malia-specials`} className="text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800">
                    ← {de ? 'Alle Angebote' : 'All offers'}
                </Link>
            </div>
            <PageFooter />
        </div>
    );
}

export default async function SpecialDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: rawLocale, slug } = await params;
    setRequestLocale(rawLocale);
    const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

    const offer = findOffer(slug);
    if (offer) return <OfferDetail offer={offer} locale={locale} />;

    const special = findDiscountSpecial(slug);
    if (special) return <DiscountDetail special={special} locale={locale} />;

    notFound();
}

import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import PageFooter from '@/components/PageFooter';
import TileCarousel from '@/components/TileCarousel';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/seo';
import { TIPS_HUB, TIPS_SECTIONS, TIPS_FAQ, type TipsSection } from '@/lib/tips-content';

export const generateMetadata = pageMetadata('tips', '/our-tips');

/**
 * Our Tips — Ratgeber-Hub rund um den Achensee.
 *
 * Server-Komponente ohne Animationen: der gesamte Text steht im
 * ausgelieferten HTML. "Was kann man am Achensee machen?" ist genau die Art
 * Frage, die Antwortmaschinen gestellt bekommen — die Kurzfassung oben und
 * die FAQ unten sind darauf zugeschnitten.
 */

/**
 * Bis zu vier Beiträge stehen als Raster nebeneinander. Ab dem fünften
 * wird die Rubrik zu einer waagrechten Leiste, durch die gewischt wird —
 * sonst entstünde eine zweite Reihe mit einer einzelnen Kachel.
 */
const MAX_IM_RASTER = 4;

const ANKER: { id: string; label: Record<Locale, string> }[] = [
    { id: 'sommer', label: { de: 'Sommer-Aktivitäten', en: 'Summer activities' } },
    { id: 'winter', label: { de: 'Winter-Aktivitäten', en: 'Winter activities' } },
    { id: 'ganzjahr', label: { de: 'Kulinarik & Kultur', en: 'Food & culture' } },
    { id: 'faq', label: { de: 'Häufige Fragen', en: 'FAQ' } },
];

function Kachel({ tile, locale }: { tile: TipsSection['tiles'][number]; locale: Locale }) {
    const inhalt = (
        <>
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                    src={tile.image}
                    alt={tile.imageAlt[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="p-5">
                <h3 className="text-base font-bold text-stone-800 mb-2">{tile.title[locale]}</h3>
                <p className="text-sm font-light text-gray-600 leading-relaxed">{tile.teaser[locale]}</p>
                {tile.articleSlug && (
                    <span className="inline-block mt-4 text-xs font-bold text-[#3d3d29] group-hover:underline">
                        {locale === 'de' ? 'Artikel lesen' : 'Read the article'} &rarr;
                    </span>
                )}
            </div>
        </>
    );

    const klassen = 'group block bg-white border border-stone-200 overflow-hidden';

    return tile.articleSlug ? (
        <Link href={`/${locale}/our-tips/${tile.articleSlug}`} className={`${klassen} hover:border-stone-300 transition-colors`}>
            {inhalt}
        </Link>
    ) : (
        <article className={klassen}>{inhalt}</article>
    );
}

function Rubrik({ section, locale, hell }: { section: TipsSection; locale: Locale; hell: boolean }) {
    return (
        <section id={section.key} className={`${hell ? 'bg-white' : 'bg-stone-50/60'} py-10 md:py-28 px-6 scroll-mt-24`}>
            <div className="max-w-7xl mx-auto">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#3d3d29] block mb-4">
                    {section.eyebrow[locale]}
                </span>
                <h2 className="text-2xl md:text-4xl font-serif text-stone-800 leading-tight mb-6">
                    {section.title[locale]}
                </h2>
                <p className="font-light text-gray-600 leading-relaxed max-w-3xl mb-12">{section.intro[locale]}</p>

                {section.tiles.length > MAX_IM_RASTER ? (
                    <TileCarousel
                        label={
                            locale === 'de'
                                ? `Beiträge zum Thema ${section.eyebrow.de}`
                                : `Articles on ${section.eyebrow.en}`
                        }
                        zurueckLabel={locale === 'de' ? 'Vorherige Beiträge' : 'Previous articles'}
                        vorLabel={locale === 'de' ? 'Weitere Beiträge' : 'More articles'}
                    >
                        {section.tiles.map((tile) => (
                            <div
                                key={tile.slug}
                                className="snap-start shrink-0 basis-[80%] sm:basis-[46%] lg:basis-[calc(25%-1.125rem)]"
                            >
                                <Kachel tile={tile} locale={locale} />
                            </div>
                        ))}
                    </TileCarousel>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {section.tiles.map((tile) => (
                            <Kachel key={tile.slug} tile={tile} locale={locale} />
                        ))}
                    </div>
                )}

                {section.pills.length > 0 && (
                    <ul className="flex flex-wrap gap-3 mt-10">
                        {section.pills.map((pill) => (
                            <li
                                key={pill.slug}
                                className="px-4 py-2 border border-stone-200 rounded-full text-xs font-light text-stone-600 bg-white"
                            >
                                {pill.label[locale]}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default async function OurTipsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params;
    setRequestLocale(rawLocale);

    const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
    const de = locale === 'de';

    const breadcrumb = breadcrumbSchema(locale, [
        { name: de ? 'Startseite' : 'Home', path: '' },
        { name: de ? 'Our Tips' : 'Our Tips', path: '/our-tips' },
    ]);

    const schema: object[] = [breadcrumb];
    if (TIPS_FAQ.length > 0) {
        schema.push(
            faqPageSchema(TIPS_FAQ.map((f) => ({ question: f.question[locale], answer: f.answer[locale] })))
        );
    }

    return (
        <div className="bg-white">
            <JsonLd data={schema} />

            {/* --- HERO --- */}
            <section className="relative h-[60vh] min-h-[380px] w-full overflow-hidden bg-stone-900">
                <Image
                    src={TIPS_HUB.heroImage}
                    alt={TIPS_HUB.heroImageAlt[locale]}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
                    <h1 className="text-3xl md:text-5xl font-serif font-light leading-tight max-w-4xl">
                        {TIPS_HUB.title[locale]}
                    </h1>
                    <p className="mt-5 text-xs md:text-sm uppercase tracking-[0.25em] font-light opacity-90">
                        {TIPS_HUB.subtitle[locale]}
                    </p>
                </div>
            </section>

            {/* --- SPRUNGMARKEN --- */}
            <nav
                aria-label={de ? 'Abschnitte dieser Seite' : 'Sections on this page'}
                className="border-b border-stone-100 bg-white"
            >
                <ul className="max-w-7xl mx-auto px-6 py-4 md:py-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
                    {ANKER.map((a) => (
                        <li key={a.id}>
                            <a
                                href={`#${a.id}`}
                                className="text-[11px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors"
                            >
                                {a.label[locale]}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* --- EINLEITUNG & KURZFASSUNG --- */}
            <section className="py-8 md:py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <p className="font-light text-gray-600 leading-relaxed mb-8">{TIPS_HUB.intro[locale]}</p>

                    <aside className="bg-stone-50 border-l-2 border-[#bcc2b2] p-6">
                        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-3">
                            {de ? 'Kurz & knapp' : 'In brief'}
                        </h2>
                        <p className="text-sm font-light text-gray-600 leading-relaxed">
                            {TIPS_HUB.kurzUndKnapp[locale]}
                        </p>
                    </aside>
                </div>
            </section>

            {/* --- RUBRIKEN --- */}
            {TIPS_SECTIONS.map((section, i) => (
                <Rubrik key={section.key} section={section} locale={locale} hell={i % 2 === 0} />
            ))}

            {/* --- ZITAT & CTA --- */}
            <section className="py-12 md:py-28 px-6 bg-white text-center">
                <div className="max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl font-serif italic text-stone-600 leading-relaxed mb-10">
                        {TIPS_HUB.quote[locale]}
                    </p>
                    <Link
                        href={`/${locale}/inquiry`}
                        className="inline-block bg-[#8a6b4f] text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#7a5e45] transition-colors"
                    >
                        {TIPS_HUB.ctaLabel[locale]}
                    </Link>
                    <p className="mt-6 text-xs font-serif italic text-stone-400">{TIPS_HUB.signature[locale]}</p>
                </div>
            </section>

            {/* --- FAQ --- */}
            {TIPS_FAQ.length > 0 && (
                <section id="faq" className="pb-12 md:pb-24 px-6 bg-white scroll-mt-24">
                    <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-100 p-8">
                        <h2 className="text-xl font-serif text-stone-800 mb-6">
                            {de ? 'Häufig gestellte Fragen' : 'Frequently asked questions'}
                        </h2>
                        <div className="divide-y divide-stone-200">
                            {TIPS_FAQ.map((f) => (
                                <details key={f.question.de} className="py-4 group">
                                    <summary className="cursor-pointer list-none flex justify-between items-center gap-4 text-sm text-stone-700">
                                        <span>{f.question[locale]}</span>
                                        <span className="text-stone-400 group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="mt-3 text-sm font-light text-gray-600 leading-relaxed">
                                        {f.answer[locale]}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <PageFooter />
        </div>
    );
}

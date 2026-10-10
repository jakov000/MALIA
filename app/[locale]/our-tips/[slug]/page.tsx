import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import PageFooter from '@/components/PageFooter';
import { articleSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { buildMetadata, isLocale, DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/seo';
import {
    TIPS_ARTICLES,
    TIPS_HUB,
    articleBlocks,
    findArticle,
    tipsSection,
    type ListenGruppe,
    type TipCard,
    type TipsArticle,
    type Tour,
} from '@/lib/tips-content';

/**
 * Artikelseite unter Our Tips.
 *
 * Server-Komponente ohne Animationen — Fliesstext, Kennzahlen und Tabelle
 * stehen vollständig im ausgelieferten HTML. Genau die Zahlen (Länge,
 * Dauer, Höhenmeter) sind das, was Antwortmaschinen zitieren.
 *
 * Zwei Layouts teilen sich diese Seite: "magazin" mit alternierenden
 * Bild-Text-Blöcken und "karten" mit zwei Erlebnissen nebeneinander.
 */

export function generateStaticParams() {
    return LOCALES.flatMap((locale) => TIPS_ARTICLES.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale: rawLocale, slug } = await params;
    const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
    const article = findArticle(slug);
    if (!article) return {};

    return buildMetadata({
        locale,
        path: `/our-tips/${article.slug}`,
        title: article.title[locale],
        description: article.metaDescription[locale],
        image: article.heroImage,
    });
}

/** Tailwind braucht vollständige Klassennamen — darum die Zuordnung als Tabelle. */
const KENNZAHL_RASTER: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
};

function Kennzahl({ label, wert }: { label: string; wert: string }) {
    return (
        <div>
            <dt className="text-[9px] uppercase tracking-[0.2em] text-stone-400">{label}</dt>
            <dd className="text-sm font-bold text-stone-800 mt-1">{wert}</dd>
        </div>
    );
}

function Hinweis({ titel, text }: { titel: string; text: string }) {
    return (
        <p className="text-sm font-light text-gray-600 bg-white border border-stone-200 p-4">
            <span className="font-bold text-[#3d3d29]">{titel} </span>
            {text}
        </p>
    );
}

function CtaButton({ locale }: { locale: Locale }) {
    return (
        <div className="text-center">
            <Link
                href={`/${locale}/inquiry`}
                className="inline-block bg-[#8a6b4f] text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#7a5e45] transition-colors"
            >
                {TIPS_HUB.ctaLabel[locale]}
            </Link>
        </div>
    );
}

function TourBlock({ tour, locale, gespiegelt }: { tour: Tour; locale: Locale; gespiegelt: boolean }) {
    const de = locale === 'de';

    return (
        <article className={`${gespiegelt ? 'bg-stone-50/60' : 'bg-white'} py-8 md:py-20 px-6 scroll-mt-24`} id={tour.slug}>
            <div
                className={`max-w-6xl mx-auto flex flex-col ${gespiegelt ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-16 items-start`}
            >
                <div className="w-full md:w-1/2">
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                        <Image
                            src={tour.image}
                            alt={tour.imageAlt[locale]}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29]">
                        {tour.eyebrow[locale]}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-stone-800 mt-2 mb-4 leading-snug">
                        {tour.title[locale]}
                    </h2>
                    <p className="font-light text-gray-600 leading-relaxed mb-5">{tour.text[locale]}</p>

                    {tour.route && (
                        <p className="text-sm text-gray-600 mb-5">
                            <span className="font-bold text-stone-800">
                                {`${(tour.routeLabel ?? { de: 'Route', en: 'Route' })[locale]}: `}
                            </span>
                            {tour.route[locale]}
                        </p>
                    )}

                    <dl
                        className={`grid ${KENNZAHL_RASTER[tour.kennzahlen.length] ?? 'grid-cols-2'} gap-5 border-y border-stone-200 py-4 mb-5`}
                    >
                        {tour.kennzahlen.map((k) => (
                            <Kennzahl key={k.label.de} label={k.label[locale]} wert={k.wert[locale]} />
                        ))}
                    </dl>

                    <div className="space-y-3">
                        {tour.tipp && (
                            <Hinweis titel={de ? 'Julias Tipp:' : 'Julia’s tip:'} text={tour.tipp[locale]} />
                        )}
                        {tour.gutZuWissen && (
                            <Hinweis titel={de ? 'Gut zu wissen:' : 'Good to know:'} text={tour.gutZuWissen[locale]} />
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

function KartenBlock({ card, locale }: { card: TipCard; locale: Locale }) {
    const de = locale === 'de';

    return (
        <article id={card.slug} className="bg-white border border-stone-200 flex flex-col scroll-mt-24">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                    src={card.image}
                    alt={card.imageAlt[locale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-5">
                <div>
                    <span className="text-2xl block mb-3" aria-hidden="true">
                        {card.icon}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29]">
                        {card.eyebrow[locale]}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-stone-800 mt-2 leading-snug">
                        {card.title[locale]}
                    </h2>
                </div>

                <p className="font-light text-gray-600 leading-relaxed">{card.text[locale]}</p>

                {card.infos && (
                    <ul className="space-y-2.5 border-t border-stone-200 pt-5">
                        {card.infos.map((info) => (
                            <li key={info.text.de} className="flex gap-3 text-sm font-light text-gray-600">
                                <span className="shrink-0" aria-hidden="true">
                                    {info.icon}
                                </span>
                                <span>{info.text[locale]}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {card.warnung && (
                    <div className="border-l-2 border-[#8a6b4f] bg-stone-50 p-5">
                        <p className="text-sm font-bold text-[#8a6b4f] mb-2">
                            <span aria-hidden="true">⚠ </span>
                            {card.warnung.title[locale]}
                        </p>
                        <p className="text-sm font-light text-gray-600 leading-relaxed">
                            {card.warnung.text[locale]}
                        </p>
                    </div>
                )}

                {card.gutZuWissen && (
                    <Hinweis titel={de ? 'Gut zu wissen:' : 'Good to know:'} text={card.gutZuWissen[locale]} />
                )}
            </div>
        </article>
    );
}

/**
 * Nummerierte Adressliste eines Ortes. Das Bild bleibt beim Scrollen stehen,
 * weil die Listen unterschiedlich lang sind — in Pertisau sind es vierzehn
 * Einträge. Die Gehzeiten stehen als eigene Angabe neben dem Namen: genau
 * das ist die Information, die zitiert wird.
 */
function ListenBlock({ gruppe, locale, hell }: { gruppe: ListenGruppe; locale: Locale; hell: boolean }) {
    return (
        <section
            id={gruppe.slug}
            className={`${hell ? 'bg-white' : 'bg-stone-50/60'} py-10 md:py-20 px-6 scroll-mt-24`}
        >
            <div className="max-w-6xl mx-auto">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29] block mb-3">
                    {gruppe.eyebrow[locale]}
                </span>
                <h2 className="text-xl md:text-3xl font-serif text-stone-800 leading-tight mb-4">
                    {gruppe.title[locale]}
                </h2>
                <p className="font-light text-gray-600 leading-relaxed max-w-3xl mb-8 md:mb-12">
                    {gruppe.intro[locale]}
                </p>

                <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start">
                    <div className="w-full md:w-[38%] md:sticky md:top-24">
                        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                            <Image
                                src={gruppe.image}
                                alt={gruppe.imageAlt[locale]}
                                fill
                                sizes="(max-width: 768px) 100vw, 38vw"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <ol className="w-full md:w-[62%] space-y-7 md:space-y-9">
                        {gruppe.eintraege.map((eintrag) => (
                            <li key={eintrag.nummer} className="flex gap-4 md:gap-6">
                                <span className="text-sm font-bold text-[#bcc2b2] shrink-0 pt-0.5 tabular-nums">
                                    {eintrag.nummer}
                                </span>
                                <div>
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                                        <h3 className="text-base font-bold text-stone-800">{eintrag.name[locale]}</h3>
                                        {eintrag.entfernung && (
                                            <span className="text-[10px] uppercase tracking-[0.15em] text-stone-500 border border-stone-200 rounded-full px-2.5 py-1">
                                                {eintrag.entfernung[locale]}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        {eintrag.text[locale]}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {gruppe.ctaDanach && (
                    <div className="mt-10 md:mt-16">
                        <CtaButton locale={locale} />
                    </div>
                )}
            </div>
        </section>
    );
}

function Sprungmarken({ article, locale }: { article: TipsArticle; locale: Locale }) {
    const de = locale === 'de';
    const marken = articleBlocks(article).map((b) => ({ href: `#${b.slug}`, label: b.label[locale] }));

    if (article.packliste) {
        marken.push({ href: '#packliste', label: de ? 'Packliste' : 'Packing list' });
    }
    if (article.faq && article.faq.length > 0) {
        marken.push({ href: '#faq', label: de ? 'Häufige Fragen' : 'FAQ' });
    }

    return (
        <ul className="flex flex-wrap gap-3">
            {marken.map((m) => (
                <li key={m.href}>
                    <a
                        href={m.href}
                        className="inline-block px-4 py-2 border border-stone-200 rounded-full text-xs text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                        {m.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default async function TipsArticlePage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: rawLocale, slug } = await params;
    setRequestLocale(rawLocale);

    const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
    const de = locale === 'de';
    const article = findArticle(slug);
    if (!article) notFound();

    const rubrik = tipsSection(article.category);

    const breadcrumb = breadcrumbSchema(locale, [
        { name: de ? 'Startseite' : 'Home', path: '' },
        { name: 'Our Tips', path: '/our-tips' },
        { name: article.title[locale], path: `/our-tips/${article.slug}` },
    ]);

    const schema: object[] = [articleSchema(article, locale), breadcrumb];
    if (article.faq && article.faq.length > 0) {
        schema.push(
            faqPageSchema(article.faq.map((f) => ({ question: f.question[locale], answer: f.answer[locale] })))
        );
    }

    return (
        <div className="bg-white">
            <JsonLd data={schema} />

            {/* --- HERO --- */}
            <section className="relative h-[55vh] min-h-[340px] w-full overflow-hidden bg-stone-900">
                <Image
                    src={article.heroImage}
                    alt={article.heroImageAlt[locale]}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
                    <h1 className="text-2xl md:text-4xl font-serif font-light leading-snug max-w-4xl">
                        {article.title[locale]}
                    </h1>
                    <p className="mt-4 text-xs md:text-sm font-light opacity-90 max-w-2xl">
                        {article.subtitle[locale]}
                    </p>
                </div>
            </section>

            {/* --- BROTKRUMEN & AUTORINNEN --- */}
            <div className="border-b border-stone-100">
                <nav
                    aria-label={de ? 'Brotkrumennavigation' : 'Breadcrumb'}
                    className="max-w-4xl mx-auto px-6 pt-5 text-[11px] text-stone-400"
                >
                    <Link href={`/${locale}/our-tips`} className="hover:text-stone-700">
                        Our Tips
                    </Link>
                    <span className="mx-2">/</span>
                    <span>{rubrik.eyebrow[locale]}</span>
                    <span className="mx-2">/</span>
                    <span className="text-stone-600">
                        {rubrik.tiles.find((t) => t.articleSlug === article.slug)?.title[locale]}
                    </span>
                </nav>

                <div className="max-w-4xl mx-auto px-6 py-4 md:py-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-stone-500">
                    <span className="flex -space-x-2" aria-hidden="true">
                        {article.authors.map((a) => (
                            <span
                                key={a.name}
                                className="w-7 h-7 rounded-full bg-[#bcc2b2] text-stone-800 ring-2 ring-white flex items-center justify-center text-[11px] font-bold"
                            >
                                {a.name.charAt(0)}
                            </span>
                        ))}
                    </span>
                    <span className="font-bold text-stone-700">
                        {article.authors.map((a) => a.name).join(' & ')}
                    </span>
                    {article.authors.length === 1 && article.authors[0].role && (
                        <>
                            <span>·</span>
                            <span>{article.authors[0].role[locale]}</span>
                        </>
                    )}
                    <span>·</span>
                    <span>
                        {article.readingMinutes} {de ? 'Min Lesezeit' : 'min read'}
                    </span>
                </div>
            </div>

            {/* --- EINLEITUNG & KURZFASSUNG --- */}
            <section className="py-8 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <p className="font-light text-gray-600 leading-relaxed mb-6 md:mb-8">{article.intro[locale]}</p>

                    <aside className="bg-stone-50 border-l-2 border-[#bcc2b2] p-5 md:p-6 mb-6 md:mb-8">
                        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-3">
                            {de ? 'Kurz & knapp' : 'In brief'}
                        </h2>
                        <p className="font-light text-gray-600 leading-relaxed">{article.kurzUndKnapp[locale]}</p>
                    </aside>

                    <Sprungmarken article={article} locale={locale} />
                </div>
            </section>

            {/* --- BLÖCKE: MAGAZIN --- */}
            {article.tours?.map((tour, i) => (
                <div key={tour.slug}>
                    <TourBlock tour={tour} locale={locale} gespiegelt={i % 2 === 1} />
                    {tour.ctaDanach && (
                        <div className="px-6 pb-10 md:pb-16 bg-white">
                            <CtaButton locale={locale} />
                        </div>
                    )}
                </div>
            ))}

            {/* --- BLÖCKE: KARTEN --- */}
            {article.cards && (
                <section className="py-8 md:py-20 px-6 bg-stone-50/60">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                        {article.cards.map((card) => (
                            <KartenBlock key={card.slug} card={card} locale={locale} />
                        ))}
                    </div>
                    <div className="mt-10 md:mt-16">
                        <CtaButton locale={locale} />
                    </div>
                </section>
            )}

            {/* --- BLÖCKE: LISTE --- */}
            {article.gruppen?.map((gruppe, i) => (
                <ListenBlock key={gruppe.slug} gruppe={gruppe} locale={locale} hell={i % 2 === 0} />
            ))}

            {/* --- VERGLEICH --- */}
            {article.comparison && (
                <section className="py-10 md:py-16 px-6 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl md:text-2xl font-serif text-stone-800 text-center mb-6 md:mb-8">
                            {article.comparison.title[locale]}
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-stone-800 text-white">
                                        {article.comparison.spalten.map((spalte) => (
                                            <th key={spalte.de} scope="col" className="text-left py-3 px-4 font-bold">
                                                {spalte[locale]}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {article.comparison.zeilen.map((zeile) => (
                                        <tr key={zeile[0].de} className="border-b border-stone-100">
                                            <th scope="row" className="text-left py-3 px-4 font-bold text-stone-800">
                                                {zeile[0][locale]}
                                            </th>
                                            {zeile.slice(1).map((zelle, i) => (
                                                <td key={i} className="py-3 px-4 font-light text-gray-600">
                                                    {zelle[locale]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {article.ctaNachVergleich && (
                            <div className="mt-10 md:mt-14">
                                <CtaButton locale={locale} />
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* --- PACKLISTE --- */}
            {article.packliste && (
                <section id="packliste" className="py-10 md:py-16 px-6 bg-stone-50/60 scroll-mt-24">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl md:text-2xl font-serif text-stone-800 text-center mb-6 md:mb-8">
                            {article.packliste.title[locale]}
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                            {article.packliste.items.map((item) => (
                                <li key={item.de} className="flex items-center gap-3 text-sm font-light text-gray-600">
                                    <span className="w-3.5 h-3.5 border border-stone-300 bg-white shrink-0" aria-hidden="true" />
                                    {item[locale]}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* --- FAQ --- */}
            {article.faq && article.faq.length > 0 && (
                <section id="faq" className="py-10 md:py-16 px-6 bg-white scroll-mt-24">
                    <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-100 p-6 md:p-8">
                        <h2 className="text-xl font-serif text-stone-800 mb-6">
                            {de ? 'Häufig gestellte Fragen' : 'Frequently asked questions'}
                        </h2>
                        <div className="divide-y divide-stone-200">
                            {article.faq.map((f) => (
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

            {/* --- SCHLUSSWORT --- */}
            {article.closing && (
                <section className="py-10 md:py-20 px-6 bg-white text-center">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg md:text-xl font-serif italic text-stone-600 leading-relaxed mb-8 md:mb-10">
                            {article.closing[locale]}
                        </p>
                        <CtaButton locale={locale} />
                        <p className="mt-6 text-xs font-serif italic text-stone-400">
                            {de ? '— eure ' : '— yours, '}
                            {article.authors.map((a) => a.name).join(' & ')}
                        </p>
                    </div>
                </section>
            )}

            {/* --- WEITERLESEN --- */}
            <section className="pt-10 pb-6 md:py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-6">
                        {de ? 'Weiterlesen' : 'Read on'}
                    </h2>
                    <ul className="flex flex-wrap gap-3 justify-center">
                        {article.weiterlesen.map((w) =>
                            w.href ? (
                                <li key={w.label.de}>
                                    <Link
                                        href={`/${locale}${w.href}`}
                                        className="inline-block px-5 py-2.5 border border-[#bcc2b2] rounded-full text-xs text-stone-700 hover:bg-stone-50 transition-colors"
                                    >
                                        {w.label[locale]}
                                    </Link>
                                </li>
                            ) : (
                                <li
                                    key={w.label.de}
                                    className="inline-block px-5 py-2.5 border border-stone-200 rounded-full text-xs text-stone-400"
                                >
                                    {w.label[locale]}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </section>

            <PageFooter />
        </div>
    );
}

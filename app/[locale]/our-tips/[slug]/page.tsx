import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import PageFooter from '@/components/PageFooter';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, isLocale, DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/seo';
import { TIPS_ARTICLES, findArticle, tipsSection, type Tour } from '@/lib/tips-content';

/**
 * Artikelseite unter Our Tips.
 *
 * Server-Komponente ohne Animationen — Fliesstext, Tourdaten und Tabelle
 * stehen vollständig im ausgelieferten HTML. Genau die Zahlen (Länge,
 * Dauer, Höhenmeter) sind das, was Antwortmaschinen zitieren.
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

function Kennzahl({ label, wert }: { label: string; wert: string }) {
    return (
        <div>
            <dt className="text-[9px] uppercase tracking-[0.2em] text-stone-400">{label}</dt>
            <dd className="text-sm font-bold text-stone-800 mt-1">{wert}</dd>
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
                        {de ? `Tour ${tour.nummer}` : `Tour ${tour.nummer}`}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-stone-800 mt-2 mb-4 leading-snug">
                        {tour.title[locale]}
                    </h2>
                    <p className="font-light text-gray-600 leading-relaxed mb-5">{tour.text[locale]}</p>

                    <p className="text-sm text-gray-600 mb-5">
                        <span className="font-bold text-stone-800">{de ? 'Route: ' : 'Route: '}</span>
                        {tour.route[locale]}
                    </p>

                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-5 border-y border-stone-200 py-4 mb-5">
                        <Kennzahl label={de ? 'Länge' : 'Distance'} wert={tour.laenge[locale]} />
                        <Kennzahl label={de ? 'Dauer' : 'Duration'} wert={tour.dauer[locale]} />
                        <Kennzahl label={de ? 'Schwierigkeit' : 'Difficulty'} wert={tour.schwierigkeit[locale]} />
                        <Kennzahl label={de ? 'Höhenmeter' : 'Elevation'} wert={tour.hoehenmeter[locale]} />
                    </dl>

                    <p className="text-sm font-light text-gray-600 bg-white border border-stone-200 p-4 mb-3">
                        <span className="font-bold text-[#3d3d29]">
                            {de ? 'Julias Tipp: ' : 'Julia’s tip: '}
                        </span>
                        {tour.tipp[locale]}
                    </p>

                    {tour.gutZuWissen && (
                        <p className="text-sm font-light text-gray-600 bg-white border border-stone-200 p-4">
                            <span className="font-bold text-[#3d3d29]">
                                {de ? 'Gut zu wissen: ' : 'Good to know: '}
                            </span>
                            {tour.gutZuWissen[locale]}
                        </p>
                    )}
                </div>
            </div>
        </article>
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

    return (
        <div className="bg-white">
            <JsonLd data={[articleSchema(article, locale), breadcrumb]} />

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

            {/* --- BROTKRUMEN & AUTOR --- */}
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
                    <span className="text-stone-600">{rubrik.tiles.find((t) => t.articleSlug === article.slug)?.title[locale]}</span>
                </nav>

                <div className="max-w-4xl mx-auto px-6 py-4 md:py-5 flex items-center gap-3 text-xs text-stone-500">
                    <span className="w-7 h-7 rounded-full bg-[#bcc2b2] text-stone-800 flex items-center justify-center text-[11px] font-bold">
                        {article.author.name.charAt(0)}
                    </span>
                    <span className="font-bold text-stone-700">{article.author.name}</span>
                    <span>·</span>
                    <span>{article.author.role[locale]}</span>
                    <span>·</span>
                    <span>
                        {article.author.readingMinutes} {de ? 'Min Lesezeit' : 'min read'}
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

                    <ul className="flex flex-wrap gap-3">
                        {article.tours.map((t) => (
                            <li key={t.slug}>
                                <a
                                    href={`#${t.slug}`}
                                    className="inline-block px-4 py-2 border border-stone-200 rounded-full text-xs text-stone-600 hover:bg-stone-50 transition-colors"
                                >
                                    {t.title[locale].split(':')[0]}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="#packliste"
                                className="inline-block px-4 py-2 border border-stone-200 rounded-full text-xs text-stone-600 hover:bg-stone-50 transition-colors"
                            >
                                {de ? 'Packliste' : 'Packing list'}
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            {/* --- TOUREN --- */}
            {article.tours.map((tour, i) => (
                <TourBlock key={tour.slug} tour={tour} locale={locale} gespiegelt={i % 2 === 1} />
            ))}

            {/* --- VERGLEICH --- */}
            <section className="py-10 md:py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-2xl font-serif text-stone-800 text-center mb-6 md:mb-8">
                        {article.comparison.title[locale]}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-stone-800 text-white">
                                    <th scope="col" className="text-left py-3 px-4 font-bold">
                                        {article.comparison.spalten.tour[locale]}
                                    </th>
                                    <th scope="col" className="text-left py-3 px-4 font-bold">
                                        {article.comparison.spalten.dauer[locale]}
                                    </th>
                                    <th scope="col" className="text-left py-3 px-4 font-bold">
                                        {article.comparison.spalten.schwierigkeit[locale]}
                                    </th>
                                    <th scope="col" className="text-left py-3 px-4 font-bold">
                                        {article.comparison.spalten.fuer[locale]}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {article.comparison.zeilen.map((z) => (
                                    <tr key={z.tour.de} className="border-b border-stone-100">
                                        <th scope="row" className="text-left py-3 px-4 font-bold text-stone-800">
                                            {z.tour[locale]}
                                        </th>
                                        <td className="py-3 px-4 font-light text-gray-600">{z.dauer[locale]}</td>
                                        <td className="py-3 px-4 font-light text-gray-600">{z.schwierigkeit[locale]}</td>
                                        <td className="py-3 px-4 font-light text-gray-600">{z.fuer[locale]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* --- PACKLISTE --- */}
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

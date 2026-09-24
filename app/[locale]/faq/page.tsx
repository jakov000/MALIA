import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import PropertyFactBox from '@/components/PropertyFactBox';
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { FAQ_SECTIONS, faqItems } from '@/lib/faq-content';
import { isLocale, DEFAULT_LOCALE } from '@/lib/seo';
import PageFooter from '@/components/PageFooter';

export const generateMetadata = pageMetadata('faq', '/faq');

/**
 * FAQ-Seite (GEO 4).
 *
 * Bewusst ohne Akkordeon: alle Antworten stehen sichtbar im DOM. Ein
 * per JavaScript nachladendes Akkordeon wäre für Crawler und KI-Systeme
 * unsichtbar — genau davor warnt die Kundenvorgabe.
 *
 * Überschriftenhierarchie: h1 Seitentitel, h2 Rubriken, h3 Fragen.
 */
export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const de = locale === 'de';
  const sections = FAQ_SECTIONS[locale];

  const breadcrumb = breadcrumbSchema(locale, [
    { name: de ? 'Startseite' : 'Home', path: '' },
    { name: de ? 'Häufige Fragen' : 'Frequently asked questions', path: '/faq' },
  ]);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <JsonLd data={[faqPageSchema(faqItems(locale)), breadcrumb]} />

      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-12 md:mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold block mb-4 text-[#3d3d29]">
            {de ? 'MALIA Alpine Hideaway' : 'MALIA Alpine Hideaway'}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-widest mb-6 leading-tight text-stone-800">
            {de ? 'Häufige Fragen' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-lg font-light leading-relaxed text-gray-600 max-w-2xl mx-auto">
            {de
              ? 'Antworten zu Buchung, Ausstattung, Lage und Anreise im MALIA Alpine Hideaway in Pertisau am Achensee.'
              : 'Answers on booking, amenities, location and getting to MALIA Alpine Hideaway in Pertisau on Lake Achensee.'}
          </p>
          <p className="text-xs uppercase tracking-widest text-stone-400 mt-6">
            {de ? 'Stand: September 2026' : 'Last updated: September 2026'}
          </p>
          <div className="w-[1px] h-12 mt-8 mx-auto bg-stone-300" />
        </header>

        <PropertyFactBox locale={locale} />

        {sections.map((section) => (
          <section key={section.title} className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-8 tracking-wide">
              {section.title}
            </h2>

            <div className="space-y-8">
              {section.items.map((item) => (
                <article key={item.question}>
                  <h3 className="text-base font-bold text-stone-800 mb-2">{item.question}</h3>
                  <p className="font-light text-gray-600 leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="border-t border-stone-200 pt-10 text-center">
          <p className="font-light text-gray-600 mb-6">
            {de
              ? 'Frage nicht dabei? Wir antworten persönlich.'
              : 'Question not answered here? We reply personally.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/inquiry`}
              className="inline-block border border-stone-800 text-stone-800 px-8 py-3 uppercase tracking-widest text-xs hover:bg-stone-50 transition-colors"
            >
              {de ? 'Anfrage stellen' : 'Send an enquiry'}
            </Link>
            <Link
              href={`/${locale}/booking`}
              className="inline-block bg-[#bcc2b2] text-stone-800 px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#b0b8a5] transition-colors"
            >
              {de ? 'Direkt buchen' : 'Book direct'}
            </Link>
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

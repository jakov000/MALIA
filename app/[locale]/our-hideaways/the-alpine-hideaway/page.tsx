import { setRequestLocale } from 'next-intl/server';
import TheAlpineHideawayContent from '@/components/content/TheAlpineHideawayContent';
import { pageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import { accommodationSchema, unitBreadcrumbSchema } from '@/lib/schema';
import { UNITS } from '@/lib/property-facts';
import { isLocale, DEFAULT_LOCALE } from '@/lib/seo';

export const generateMetadata = pageMetadata('alpineHideaway', '/our-hideaways/the-alpine-hideaway');

export default async function TheAlpineHideawayPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemaLocale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const unit = UNITS.find((u) => u.key === 'hideaway')!;

  return (
    <>
      <JsonLd data={[accommodationSchema(unit, schemaLocale), unitBreadcrumbSchema(unit, schemaLocale)]} />
      <TheAlpineHideawayContent />
    </>
  );
}

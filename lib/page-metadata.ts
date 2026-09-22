import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata, isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/seo';

type PageMetadataOptions = {
  /** Abweichendes Vorschaubild, Pfad relativ zu /public. */
  image?: string;
  noIndex?: boolean;
};

/**
 * Erzeugt die generateMetadata-Funktion einer Seite.
 * Titel und Description kommen aus dem Seo-Namespace der jeweiligen Sprache,
 * Canonical und hreflang aus dem Routen-Pfad.
 *
 * Verwendung: export const generateMetadata = pageMetadata('setting', '/the-setting');
 */
export function pageMetadata(seoKey: string, path = '', options: PageMetadataOptions = {}) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale: rawLocale } = await params;
    const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
    const t = await getTranslations({ locale, namespace: `Seo.${seoKey}` });

    return buildMetadata({
      locale,
      path,
      title: t('title'),
      description: t('description'),
      ...options,
    });
  };
}

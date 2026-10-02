import type { Metadata } from 'next';

/**
 * Zentrale SEO-Konfiguration.
 * Basis für Canonicals, hreflang, Sitemap und robots.txt.
 */

// Canonical-Host: Apex-Domain. www zeigt per 301 hierher (siehe next.config.ts).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://malia-alpine-hideaway.at').replace(/\/+$/, '');

export const LOCALES = ['de', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';

export const SITE_NAME = 'MALIA Alpine Hideaway';

// Standard-Vorschaubild fürs Teilen, zugeschnitten auf das von Facebook,
// LinkedIn, WhatsApp und X erwartete Format 1200x630 (1,91:1).
export const OG_IMAGE = '/og/malia-alpine-hideaway.jpg';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export type RouteConfig = {
  /** Pfad ohne Locale-Präfix. Leerstring = Startseite. */
  path: string;
  /** Schlüssel im Seo-Namespace der Sprachdateien. */
  seoKey: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** In llms.txt aufnehmen? Rechtstexte bleiben außen vor. */
  inLlmsTxt?: boolean;
};

/** Alle indexierbaren Routen. Einzige Quelle für Sitemap, hreflang und llms.txt. */
export const PUBLIC_ROUTES: RouteConfig[] = [
  { path: '', seoKey: 'home', priority: 1.0, changeFrequency: 'weekly', inLlmsTxt: true },
  { path: '/our-hideaways', seoKey: 'hideaways', priority: 0.9, changeFrequency: 'weekly', inLlmsTxt: true },
  { path: '/our-hideaways/the-alpine-hideaway', seoKey: 'alpineHideaway', priority: 0.9, changeFrequency: 'monthly', inLlmsTxt: true },
  { path: '/our-hideaways/the-residence', seoKey: 'residence', priority: 0.9, changeFrequency: 'monthly', inLlmsTxt: true },
  { path: '/our-hideaways/the-retreat', seoKey: 'retreat', priority: 0.9, changeFrequency: 'monthly', inLlmsTxt: true },
  { path: '/faq', seoKey: 'faq', priority: 0.8, changeFrequency: 'monthly', inLlmsTxt: true },
  { path: '/malia-specials', seoKey: 'specials', priority: 0.8, changeFrequency: 'monthly', inLlmsTxt: true },
  { path: '/booking', seoKey: 'booking', priority: 0.8, changeFrequency: 'weekly', inLlmsTxt: true },
  { path: '/the-feeling', seoKey: 'feeling', priority: 0.7, changeFrequency: 'monthly', inLlmsTxt: true },
  { path: '/our-tips', seoKey: 'tips', priority: 0.8, changeFrequency: 'weekly', inLlmsTxt: true },
  { path: '/inquiry', seoKey: 'inquiry', priority: 0.7, changeFrequency: 'monthly', inLlmsTxt: true },
  { path: '/vouchers', seoKey: 'vouchers', priority: 0.6, changeFrequency: 'monthly', inLlmsTxt: true },
  { path: '/agb', seoKey: 'agb', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/datenschutz', seoKey: 'privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/impressum', seoKey: 'imprint', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/datenschutz-einstellungen', seoKey: 'privacySettings', priority: 0.1, changeFrequency: 'yearly' },
];

/** Routen, die crawlbar bleiben, aber nicht in den Index gehören. */
export const NOINDEX_PATHS = ['/success'];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Absolute URL inkl. Locale-Präfix (localePrefix: 'always' in der Middleware). */
export function absoluteUrl(locale: Locale, path = ''): string {
  const clean = path && !path.startsWith('/') ? `/${path}` : path;
  return `${SITE_URL}/${locale}${clean}`;
}

/** Selbstreferenzierendes Canonical plus vollständige hreflang-Gruppe. */
export function buildAlternates(locale: Locale, path = ''): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = absoluteUrl(l, path);
  }
  languages['x-default'] = absoluteUrl(DEFAULT_LOCALE, path);

  return {
    canonical: absoluteUrl(locale, path),
    languages,
  };
}

type BuildMetadataArgs = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  /** Pfad relativ zu /public. Fällt auf OG_IMAGE zurück. */
  image?: string;
  noIndex?: boolean;
};

/** Baut den vollständigen Metadata-Satz einer Seite: Titel, Description, Canonical, hreflang, OG, Twitter. */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  image = OG_IMAGE,
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(locale, path);
  const imageUrl = `${SITE_URL}${encodeURI(image)}`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'de' ? 'de_AT' : 'en_US',
      alternateLocale: locale === 'de' ? 'en_US' : 'de_AT',
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          // Maße nur angeben, wenn das Standardbild verwendet wird — sonst wären sie geraten.
          ...(image === OG_IMAGE ? { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT } : {}),
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

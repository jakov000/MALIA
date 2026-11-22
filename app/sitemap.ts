import type { MetadataRoute } from 'next';
import { LOCALES, DEFAULT_LOCALE, PUBLIC_ROUTES, absoluteUrl } from '@/lib/seo';
import { TIPS_ARTICLES } from '@/lib/tips-content';
import { DISCOUNT_SPECIALS, OFFERS } from '@/lib/offers';

/**
 * Sitemap über alle Locales. Jede URL trägt die vollständige hreflang-Gruppe,
 * damit Google DE- und EN-Fassung als Übersetzungen erkennt statt als Duplikate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Ratgeberartikel wachsen über die Zeit und stehen deshalb nicht in der
  // statischen Routen-Registry — sie kommen direkt aus den Inhalten.
  const artikelRouten = TIPS_ARTICLES.map((a) => ({
    path: `/our-tips/${a.slug}`,
    priority: 0.7,
    changeFrequency: 'yearly' as const,
    lastModified: new Date(a.published),
  }));

  // Detailseiten der Erlebnisangebote und Specials unter /malia-specials.
  const angebotsRouten = [...OFFERS.map((o) => o.slug), ...DISCOUNT_SPECIALS.map((s) => s.slug)].map((slug) => ({
    path: `/malia-specials/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified,
  }));

  const alleRouten = [
    ...PUBLIC_ROUTES.map((r) => ({ ...r, lastModified })),
    ...artikelRouten,
    ...angebotsRouten,
  ];

  return alleRouten.flatMap((route) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = absoluteUrl(locale, route.path);
    }
    languages['x-default'] = absoluteUrl(DEFAULT_LOCALE, route.path);

    return LOCALES.map((locale) => ({
      url: absoluteUrl(locale, route.path),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    }));
  });
}

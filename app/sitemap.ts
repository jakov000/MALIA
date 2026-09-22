import type { MetadataRoute } from 'next';
import { LOCALES, DEFAULT_LOCALE, PUBLIC_ROUTES, absoluteUrl } from '@/lib/seo';

/**
 * Sitemap über alle Locales. Jede URL trägt die vollständige hreflang-Gruppe,
 * damit Google DE- und EN-Fassung als Übersetzungen erkennt statt als Duplikate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.flatMap((route) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale] = absoluteUrl(locale, route.path);
    }
    languages['x-default'] = absoluteUrl(DEFAULT_LOCALE, route.path);

    return LOCALES.map((locale) => ({
      url: absoluteUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    }));
  });
}

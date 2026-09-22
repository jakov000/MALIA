import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Crawler, die Antwortmaschinen speisen. Ohne ausdrückliche Freigabe
 * taucht die Seite in ChatGPT, Perplexity & Co. nicht als Quelle auf.
 */
const ANSWER_ENGINE_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'CCBot',
  'Bingbot',
];

export default function robots(): MetadataRoute.Robots {
  // Admin-Oberfläche, API und die Buchungsbestätigung gehören nicht in den Index.
  const disallow = ['/admin', '/api/', '/de/success', '/en/success'];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...ANSWER_ENGINE_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

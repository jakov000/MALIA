import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // www auf die Apex-Domain zusammenführen (Canonical-Host).
      // Greift erst, sobald www im Vercel-Projekt hinterlegt ist.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.malia-alpine-hideaway.at' }],
        destination: 'https://malia-alpine-hideaway.at/:path*',
        permanent: true,
      },
      // "The Setting" wurde zu "Our Tips". Die alte Adresse steht in der
      // bisherigen Sitemap und möglicherweise in Googles Index — sie muss
      // dauerhaft weiterleiten, sonst geht die aufgebaute Relevanz verloren.
      {
        source: '/:locale(de|en)/the-setting',
        destination: '/:locale/our-tips',
        permanent: true,
      },
      {
        source: '/the-setting',
        destination: '/de/our-tips',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

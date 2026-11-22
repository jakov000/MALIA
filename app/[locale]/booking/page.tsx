import { setRequestLocale } from 'next-intl/server';
import BookingContent from '@/components/content/BookingContent';
import { pageMetadata } from '@/lib/page-metadata';
import { findOffer } from '@/lib/offers';

export const generateMetadata = pageMetadata('booking', '/booking');

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ angebot?: string | string[] }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // ?angebot=<slug> öffnet das Formular im Paketmodus (feste Einheit, Dauer und Preis).
  // Unbekannte Werte werden ignoriert, dann bleibt es die normale Buchung.
  const { angebot } = await searchParams;
  const offerSlug = typeof angebot === 'string' && findOffer(angebot) ? angebot : undefined;
  return <BookingContent offerSlug={offerSlug} />;
}

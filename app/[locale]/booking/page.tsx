import { setRequestLocale } from 'next-intl/server';
import BookingContent from '@/components/content/BookingContent';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('booking', '/booking');

export default async function BookingPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookingContent />;
}

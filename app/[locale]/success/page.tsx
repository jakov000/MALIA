import { setRequestLocale } from 'next-intl/server';
import SuccessContent from '@/components/content/SuccessContent';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('success', '/success', { noIndex: true });

export default async function SuccessPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SuccessContent />;
}

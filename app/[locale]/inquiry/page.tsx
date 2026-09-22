import { setRequestLocale } from 'next-intl/server';
import InquiryContent from '@/components/content/InquiryContent';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('inquiry', '/inquiry');

export default async function InquiryPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InquiryContent />;
}

import { setRequestLocale } from 'next-intl/server';
import VouchersContent from '@/components/content/VouchersContent';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('vouchers', '/vouchers');

export default async function VouchersPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VouchersContent />;
}

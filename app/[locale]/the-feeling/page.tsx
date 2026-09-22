import TheFeelingContent from '@/components/content/TheFeelingContent';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('feeling', '/the-feeling');

export default async function TheFeelingPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return <TheFeelingContent />;
}
import OurHideawaysContent from '@/components/content/OurHideawaysContent';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('hideaways', '/our-hideaways');

export default async function OurHideawaysPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  return <OurHideawaysContent />;
}
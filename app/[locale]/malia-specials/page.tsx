import MaliaSpecialsContent from '@/components/content/MaliaSpecialsContent';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('specials', '/malia-specials');

export default async function MaliaSpecialsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return <MaliaSpecialsContent />;
}
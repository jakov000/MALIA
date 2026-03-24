import { Metadata } from 'next';
import TheSettingContent from '@/components/content/TheSettingContent';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'The Setting | MALIA',
  description: 'Winter und Sommer am Achensee. Erleben Sie die Natur rund um das MALIA Alpine Hideaway.',
};

export default async function TheSettingPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return <TheSettingContent />;
}
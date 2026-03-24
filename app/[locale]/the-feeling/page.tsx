import { Metadata } from 'next';
import TheFeelingContent from '@/components/content/TheFeelingContent';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'The Feeling | MALIA',
  description: 'Erleben Sie die Atmosphäre des MALIA Alpine Hideaway. Architektur, Design und Natur im Einklang.',
};

export default async function TheFeelingPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return <TheFeelingContent />;
}
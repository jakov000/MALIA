import { Metadata } from 'next';
import MaliaSpecialsContent from '@/components/content/MaliaSpecialsContent';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Specials & Angebote | MALIA',
  description: 'Entdecken Sie unsere exklusiven Angebote für Ihren Traumurlaub in Tirol.',
};

export default async function MaliaSpecialsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return <MaliaSpecialsContent />;
}
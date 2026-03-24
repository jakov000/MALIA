import { Metadata } from 'next';
import OurHideawaysContent from '@/components/content/OurHideawaysContent';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Unsere Hideaways | MALIA',
  description: 'Entdecken Sie unsere luxuriösen Suiten und Chalets am Achensee. Alpine Eleganz trifft auf natürlichen Komfort.',
  openGraph: {
    title: 'Unsere Hideaways | MALIA',
    description: 'Entdecken Sie unsere luxuriösen Suiten und Chalets am Achensee.',
    images: ['/pictures/hideaways/IMG-1402.png'],
  },
};

export default async function OurHideawaysPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  return <OurHideawaysContent />;
}
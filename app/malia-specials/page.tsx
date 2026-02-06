import { Metadata } from 'next';
import MaliaSpecialsContent from '@/components/content/MaliaSpecialsContent';

export const metadata: Metadata = {
  title: 'Specials & Angebote | MALIA',
  description: 'Entdecken Sie unsere exklusiven Angebote für Ihren Traumurlaub in Tirol.',
};

export default function MaliaSpecialsPage() {
  return <MaliaSpecialsContent />;
}
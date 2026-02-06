import { Metadata } from 'next';
import TheFeelingContent from '@/components/content/TheFeelingContent';

export const metadata: Metadata = {
  title: 'The Feeling | MALIA',
  description: 'Erleben Sie die Atmosphäre des MALIA Alpine Hideaway. Architektur, Design und Natur im Einklang.',
};

export default function TheFeelingPage() {
  return <TheFeelingContent />;
}
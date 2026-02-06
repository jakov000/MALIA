import { Metadata } from 'next';
import TheSettingContent from '@/components/content/TheSettingContent';

export const metadata: Metadata = {
  title: 'The Setting | MALIA',
  description: 'Entdecken Sie die Umgebung des MALIA am Achensee. Winterstille und Sommerfreiheit im Herzen Tirols.',
};

export default function TheSettingPage() {
  return <TheSettingContent />;
}
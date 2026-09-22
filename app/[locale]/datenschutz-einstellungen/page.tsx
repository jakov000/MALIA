import { setRequestLocale } from 'next-intl/server';
import PrivacySettingsContent from '@/components/content/PrivacySettingsContent';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('privacySettings', '/datenschutz-einstellungen');

export default async function DatenschutzEinstellungenPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacySettingsContent />;
}

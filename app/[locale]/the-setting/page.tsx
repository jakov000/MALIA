import TheSettingContent from '@/components/content/TheSettingContent';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('setting', '/the-setting');

export default async function TheSettingPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return <TheSettingContent />;
}
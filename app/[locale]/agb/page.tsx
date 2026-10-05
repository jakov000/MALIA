import SectionHeader from "@/components/ui/SectionHeader";
import PageFooter from "@/components/PageFooter";

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page-metadata';

export const generateMetadata = pageMetadata('agb', '/agb');

export default async function AGB({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('AGB');

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader as="h1" title={t('title')} />
                <div className="prose prose-stone max-w-none font-light text-gray-600">
                    <p>{t('intro')}</p>
                    
                    <h2>{t('cancellation_title')}</h2>
                    <ul>
                        <li>{t('cancellation_60')}</li>
                        <li>{t('cancellation_30')}</li>
                        <li>{t('cancellation_14')}</li>
                        <li>{t('cancellation_less')}</li>
                    </ul>
                    <p className="text-sm italic">{t('cancellation_note')}</p>

                    <h2>{t('payment_title')}</h2>
                    <p>{t('payment_text')}</p>

                    <h2>{t('arrival_title')}</h2>
                    <p>{t('arrival_text')}</p>

                    <h2>{t('pets_title')}</h2>
                    <p>{t('pets_text')}</p>
                </div>
            </div>
            <PageFooter />
        </div>
    );
}

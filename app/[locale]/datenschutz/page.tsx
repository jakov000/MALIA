import SectionHeader from "@/components/ui/SectionHeader";
import PageFooter from "@/components/PageFooter";

import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Datenschutz({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Privacy');
    const richOptions = {
        bold: (chunks: React.ReactNode) => <strong>{chunks}</strong>
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader title={t('title')} />
                <div className="prose prose-stone max-w-none font-light text-gray-600 space-y-8">
                    <p>{t('intro')}</p>

                    <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-2">{t('contact_title')}</h3>
                        <p>{t('contact_text')}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-2">{t('cookies_title')}</h3>
                        <p>{t.rich('cookies_text1', richOptions)}</p>
                        <p className="mt-2">{t('cookies_text2')}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-2">{t('stripe_title')}</h3>
                        <p>{t('stripe_text')}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-2">{t('rights_title')}</h3>
                        <p>{t('rights_text')}</p>
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    );
}

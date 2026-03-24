import SectionHeader from "@/components/ui/SectionHeader";
import PageFooter from "@/components/PageFooter";

import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Impressum({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Imprint');
    const richOptions = {
        br: () => <br />,
        link: (chunks: React.ReactNode) => <a href="http://ec.europa.eu/odr" className="underline">{chunks}</a>
    };

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader title={t('title')} />
                <div className="prose prose-stone max-w-none font-light text-gray-600 space-y-6">
                    <div>
                        <h3 className="text-xl font-serif text-stone-800 mb-2">{t('company_title')}</h3>
                        <p>{t.rich('company_owner', richOptions)}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-stone-500 mb-2">{t('contact_title')}</h3>
                        <p>{t.rich('contact_info', richOptions)}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-stone-500 mb-2">{t('info_title')}</h3>
                        <p>{t.rich('info_details', richOptions)}</p>
                    </div>

                    <div className="pt-8 border-t border-stone-100">
                        <p className="text-sm">{t.rich('dispute', richOptions)}</p>
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    );
}

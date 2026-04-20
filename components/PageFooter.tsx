import React from 'react';
import SocialLinks from './ui/SocialLinks';
import { useTranslations } from 'next-intl';

export default function PageFooter() {
    const t = useTranslations('PageFooter');

    return (
        <footer className="bg-[#f8f6f3] pt-24 pb-32 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-gray-500 font-sans text-center">
                    {[
                        { name: t('agb'), href: "/agb" },
                        { name: t('imprint'), href: "/impressum" },
                        { name: t('privacy'), href: "/datenschutz" }
                    ].map((link) => (
                        <a key={link.href} href={link.href} className="hover:text-black cursor-pointer transition-colors block">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                    <div className="flex items-center gap-8 text-gray-800">
                        <SocialLinks className="text-gray-800" iconSize={18} />
                    </div>
                </div>

                <div className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans leading-loose">
                    <p>{t('address')}</p>
                    <p className="mt-2 text-gray-500 font-medium">info@malia-alpine-hideaway.at</p>
                </div>
            </div>
        </footer>
    );
}

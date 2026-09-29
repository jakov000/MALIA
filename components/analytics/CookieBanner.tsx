"use client";

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsent } from './ConsentProvider';

/**
 * Einwilligungsbanner.
 *
 * "Nur notwendige" ist genauso prominent gestaltet wie "Alle akzeptieren".
 * Der Europäische Datenschutzausschuss verlangt, dass das Ablehnen nicht
 * schwerer fällt als das Zustimmen — ein grauer, kleiner Ablehnen-Link wäre
 * angreifbar.
 *
 * Solange nicht entschieden wurde, lädt kein Tracking. Der Banner blockiert
 * die Seite bewusst nicht, das ist zulässig und weniger störend.
 */
export default function CookieBanner() {
    const t = useTranslations('Consent.banner');
    const locale = useLocale();
    const { consent, ready, decide } = useConsent();

    // Vor dem Mounten nichts rendern, sonst Hydration-Konflikt.
    const sichtbar = ready && consent === null;

    return (
        <AnimatePresence>
            {sichtbar && (
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="consent-titel"
                >
                    <div className="mx-auto max-w-4xl bg-white border border-stone-200 shadow-2xl p-6 sm:p-8">
                        <h2
                            id="consent-titel"
                            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-3"
                        >
                            {t('title')}
                        </h2>

                        <p className="text-sm font-light text-gray-600 leading-relaxed mb-6">
                            {t('text')}{' '}
                            <Link href={`/${locale}/datenschutz`} className="underline hover:text-stone-900">
                                {t('privacyLink')}
                            </Link>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => decide(true, false)}
                                className="flex-1 bg-[#bcc2b2] text-stone-800 px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#b0b8a5] transition-colors"
                            >
                                {t('acceptAll')}
                            </button>
                            <button
                                type="button"
                                onClick={() => decide(false, false)}
                                className="flex-1 border border-stone-800 text-stone-800 px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-stone-50 transition-colors"
                            >
                                {t('necessaryOnly')}
                            </button>
                            <Link
                                href={`/${locale}/datenschutz-einstellungen`}
                                className="flex-1 border border-stone-200 text-stone-500 px-6 py-3 uppercase tracking-widest text-xs text-center hover:bg-stone-50 transition-colors"
                            >
                                {t('settings')}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

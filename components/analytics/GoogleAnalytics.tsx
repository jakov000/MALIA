"use client";

import Script from 'next/script';
import { useConsent } from './ConsentProvider';

/**
 * Google Analytics 4 — wird ausschliesslich geladen, wenn
 *   1. eine Einwilligung für Analyse vorliegt und
 *   2. die Seite in der Produktionsumgebung läuft.
 *
 * Ohne Einwilligung geht kein einziger Request an Google. Das ist strenger
 * als Googles eigener Vorschlag (Consent Mode mit "denied"-Default), bei dem
 * gtag.js sofort lädt und cookielose Signale sendet — dabei wird die
 * IP-Adresse übertragen, was in Österreich bereits einwilligungspflichtig ist.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-GBTL50Y45C';

// Vercel stellt NEXT_PUBLIC_VERCEL_ENV automatisch bereit. Lokal und in
// Vorschau-Deployments wird bewusst nicht gemessen, damit die Zahlen des
// Kunden nicht durch unsere eigenen Aufrufe verfälscht werden.
const IST_PRODUKTION = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

export default function GoogleAnalytics() {
    const { analyticsAllowed, marketingAllowed, ready } = useConsent();

    if (!ready || !analyticsAllowed || !IST_PRODUKTION || !GA_ID) return null;

    return (
        <>
            <Script
                id="ga-loader"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga-init" strategy="afterInteractive">
                {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Consent Mode v2: alles verweigert vorbelegen, dann gezielt freigeben,
// was der Besucher tatsächlich erlaubt hat.
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
gtag('consent', 'update', {
  analytics_storage: 'granted',
  ad_storage: '${marketingAllowed ? 'granted' : 'denied'}',
  ad_user_data: '${marketingAllowed ? 'granted' : 'denied'}',
  ad_personalization: '${marketingAllowed ? 'granted' : 'denied'}'
});

gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
            </Script>
        </>
    );
}

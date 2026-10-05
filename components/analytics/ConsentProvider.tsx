"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    CONSENT_DENIED,
    clearAnalyticsCookies,
    createConsent,
    readConsent,
    writeConsent,
    type ConsentState,
} from '@/lib/consent';

type ConsentContextValue = {
    /** null, solange noch nicht entschieden wurde oder noch nicht gelesen. */
    consent: ConsentState | null;
    /** false bis der Client gemountet ist — verhindert Hydration-Konflikte. */
    ready: boolean;
    analyticsAllowed: boolean;
    marketingAllowed: boolean;
    /** Entscheidung speichern. Widerruf räumt die Google-Cookies ab. */
    decide: (analytics: boolean, marketing: boolean) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
    const ctx = useContext(ConsentContext);
    if (!ctx) throw new Error('useConsent muss innerhalb von ConsentProvider verwendet werden');
    return ctx;
}

export default function ConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsent] = useState<ConsentState | null>(null);
    const [ready, setReady] = useState(false);

    // localStorage steht erst im Browser zur Verfügung, deshalb wird die
    // gespeicherte Entscheidung bewusst nach dem Mounten gelesen. Würde sie
    // schon beim ersten Rendern gelesen, lieferte der Server null und der
    // Client einen Wert — das Ergebnis wäre ein Hydration-Konflikt.
    // Der Linter mahnt setState im Effect an; hier ist es der vorgesehene Weg,
    // Zustand aus einem externen System zu übernehmen.
    useEffect(() => {
        setConsent(readConsent());
        setReady(true);
    }, []);

    const decide = useCallback(
        (analytics: boolean, marketing: boolean) => {
            const warVorherErlaubt = Boolean(consent?.analytics);
            const next = createConsent(analytics, marketing);
            writeConsent(next);
            setConsent(next);

            // Widerruf: gesetzte Messcookies entfernen. Ein bereits geladenes
            // gtag.js lässt sich nicht zuverlässig entladen, deshalb zusätzlich
            // ein Neuaufbau der Seite.
            if (warVorherErlaubt && !analytics) {
                clearAnalyticsCookies();
                if (typeof window !== 'undefined') window.location.reload();
            }
        },
        [consent]
    );

    const value = useMemo<ConsentContextValue>(
        () => ({
            consent,
            ready,
            analyticsAllowed: Boolean(consent?.analytics),
            marketingAllowed: Boolean(consent?.marketing),
            decide,
        }),
        [consent, ready, decide]
    );

    return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export { CONSENT_DENIED };

"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import PageFooter from "@/components/PageFooter";
import Button from "@/components/ui/Button";
import { useConsent } from "@/components/analytics/ConsentProvider";

/**
 * Datenschutzeinstellungen.
 *
 * Zuvor war diese Seite eine Attrappe: die Schalter speicherten nichts,
 * handleSave schrieb nur in die Konsole. Mit Google Analytics im Einsatz
 * muss der Widerruf tatsächlich funktionieren und so einfach sein wie die
 * Zustimmung (Art. 7 Abs. 3 DSGVO).
 */
export default function PrivacySettingsContent() {
    const t = useTranslations("PrivacySettings");
    const locale = useLocale();
    const { consent, ready, decide } = useConsent();

    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const [gespeichert, setGespeichert] = useState(false);

    // Gespeicherte Entscheidung übernehmen, sobald sie gelesen ist.
    useEffect(() => {
        if (!ready) return;
        setAnalytics(Boolean(consent?.analytics));
        setMarketing(Boolean(consent?.marketing));
    }, [ready, consent]);

    const handleSave = () => {
        decide(analytics, marketing);
        setGespeichert(true);
        window.setTimeout(() => setGespeichert(false), 4000);
    };

    const entschiedenAm = consent?.decidedAt
        ? new Date(consent.decidedAt).toLocaleString(locale === "de" ? "de-AT" : "en-GB", {
              dateStyle: "long",
              timeStyle: "short",
          })
        : null;

    const kategorien = [
        {
            id: "necessary",
            titel: t("necessary.title"),
            text: t("necessary.text"),
            aktiv: true,
            fest: true,
            setzen: () => {},
        },
        {
            id: "analytics",
            titel: t("analytics.title"),
            text: t("analytics.text"),
            aktiv: analytics,
            fest: false,
            setzen: setAnalytics,
        },
        {
            id: "marketing",
            titel: t("marketing.title"),
            text: t("marketing.text"),
            aktiv: marketing,
            fest: false,
            setzen: setMarketing,
        },
    ];

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader as="h1" title={t("title")} />

                <div className="space-y-8 font-light text-gray-600">
                    <p>{t("intro")}</p>

                    <div className="space-y-6">
                        {kategorien.map((k) => (
                            <div
                                key={k.id}
                                className="flex items-start justify-between gap-6 p-6 bg-stone-50 border border-stone-100"
                            >
                                <div>
                                    <h2 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-2">
                                        {k.titel}
                                    </h2>
                                    <p className="text-xs leading-relaxed">{k.text}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={k.aktiv}
                                    disabled={k.fest}
                                    aria-label={k.titel}
                                    onChange={(e) => k.setzen(e.target.checked)}
                                    className="w-5 h-5 mt-1 shrink-0 accent-stone-800 disabled:opacity-60"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-6">
                        <Button onClick={handleSave} variant="primary">
                            {t("save")}
                        </Button>
                        {gespeichert && (
                            <span className="text-xs uppercase tracking-widest text-[#3d3d29] font-bold">
                                {t("saved")}
                            </span>
                        )}
                    </div>

                    <div className="border-t border-stone-100 pt-8 text-xs leading-relaxed space-y-2">
                        <p>
                            {ready && consent
                                ? t("statusDecided", { datum: entschiedenAm ?? "" })
                                : t("statusUndecided")}
                        </p>
                        <p>{t("revokeHint")}</p>
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    );
}

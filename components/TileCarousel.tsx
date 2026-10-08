"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Waagrechte Kachel-Leiste für Rubriken mit mehr als vier Beiträgen.
 *
 * Bewusst mit nativem CSS-Scroll-Snap statt einer Karussell-Bibliothek:
 *  - Auf dem Handy funktioniert Wischen von selbst, inklusive Schwung
 *  - Alle Kacheln bleiben im DOM. Ein Karussell, das nur die sichtbare
 *    Kachel rendert, würde die übrigen Beiträge vor Suchmaschinen und
 *    KI-Systemen verbergen — genau der Fehler, den wir auf anderen
 *    Seiten dieses Projekts bereits gefunden haben.
 *  - Ohne JavaScript bleibt die Leiste scrollbar; die Pfeile sind
 *    reine Zugabe für die Maus.
 *
 * Die Kacheln werden als children übergeben und damit weiterhin auf dem
 * Server gerendert.
 */
export default function TileCarousel({
    children,
    label,
    vorLabel,
    zurueckLabel,
}: {
    children: React.ReactNode;
    /** Beschreibt die Leiste für Screenreader, z. B. "Sommer-Aktivitäten". */
    label: string;
    vorLabel: string;
    zurueckLabel: string;
}) {
    const leiste = useRef<HTMLDivElement>(null);
    const [kannZurueck, setKannZurueck] = useState(false);
    const [kannVor, setKannVor] = useState(false);

    const pruefePosition = useCallback(() => {
        const el = leiste.current;
        if (!el) return;
        // 2 px Toleranz, weil Browser bei Zoomstufen runden
        setKannZurueck(el.scrollLeft > 2);
        setKannVor(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    }, []);

    useEffect(() => {
        pruefePosition();
        const el = leiste.current;
        if (!el) return;

        el.addEventListener('scroll', pruefePosition, { passive: true });
        // Bei Größenänderung kann sich ergeben, dass alles hineinpasst
        const beobachter = new ResizeObserver(pruefePosition);
        beobachter.observe(el);

        return () => {
            el.removeEventListener('scroll', pruefePosition);
            beobachter.disconnect();
        };
    }, [pruefePosition]);

    const blaettern = (richtung: 1 | -1) => {
        const el = leiste.current;
        if (!el) return;
        // Um eine knappe Sichtbreite weiterspringen, damit immer eine
        // Kachel als Anker stehen bleibt.
        el.scrollBy({ left: richtung * el.clientWidth * 0.9, behavior: 'smooth' });
    };

    return (
        <div className="relative">
            <div
                ref={leiste}
                role="region"
                aria-label={label}
                tabIndex={0}
                className="leiste-ohne-scrollbalken flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-6 px-6 md:mx-0 md:px-0"
            >
                {children}
            </div>

            {/* Pfeile nur ab Tablet: auf dem Handy wird gewischt. */}
            <button
                type="button"
                onClick={() => blaettern(-1)}
                disabled={!kannZurueck}
                aria-label={zurueckLabel}
                className="hidden md:flex absolute left-0 top-[38%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm text-stone-700 transition-opacity hover:bg-stone-50 disabled:opacity-0 disabled:pointer-events-none"
            >
                <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
                type="button"
                onClick={() => blaettern(1)}
                disabled={!kannVor}
                aria-label={vorLabel}
                className="hidden md:flex absolute right-0 top-[38%] translate-x-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm text-stone-700 transition-opacity hover:bg-stone-50 disabled:opacity-0 disabled:pointer-events-none"
            >
                <ChevronRight size={18} strokeWidth={1.5} />
            </button>
        </div>
    );
}

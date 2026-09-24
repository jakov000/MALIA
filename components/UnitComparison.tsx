import { UNITS, UNIT_AMENITIES } from '@/lib/property-facts';
import type { Locale } from '@/lib/seo';

/**
 * Vergleich der drei buchbaren Einheiten als echte HTML-Tabelle.
 *
 * Eine Tabelle mit Kopfzeile ist die Struktur, die Sprachmodelle am
 * zuverlässigsten als Vergleich erfassen. Die GEO-Baseline hat gezeigt,
 * dass Perplexity The Alpine Hideaway gar nicht kannte und den
 * Wellnessbereich der falschen Einheit zuordnete — genau das soll diese
 * Tabelle korrigieren.
 *
 * Alle Werte stammen aus lib/property-facts.ts, derselben Quelle wie
 * Schema.org und llms.txt.
 */

type Row = { label: string; werte: string[] };

function hat(unitKey: string, amenityKey: string, de: boolean): string {
  return UNIT_AMENITIES[unitKey as keyof typeof UNIT_AMENITIES].includes(amenityKey)
    ? (de ? 'ja' : 'yes')
    : (de ? 'nein' : 'no');
}

function rows(locale: Locale): Row[] {
  const de = locale === 'de';

  return [
    {
      label: de ? 'Wohnfläche' : 'Floor area',
      werte: UNITS.map((u) => `${u.sqm} m²`),
    },
    {
      label: de ? 'Personen' : 'Guests',
      werte: UNITS.map((u) => (u.minGuests === u.maxGuests ? `${u.maxGuests}` : `${u.minGuests}–${u.maxGuests}`)),
    },
    {
      label: de ? 'Schlafzimmer' : 'Bedrooms',
      werte: UNITS.map((u) => (u.isStudio ? (de ? 'offenes Studio' : 'open-plan studio') : `${u.bedrooms}`)),
    },
    {
      label: de ? 'Bäder' : 'Bathrooms',
      werte: UNITS.map((u) => `${u.bathrooms}`),
    },
    {
      label: de ? 'Preis ab' : 'Price from',
      werte: UNITS.map((u) => (de ? `${u.priceFrom} € / Nacht` : `€${u.priceFrom} / night`)),
    },
    {
      label: de ? 'Endreinigung' : 'Cleaning fee',
      werte: UNITS.map((u) => `${u.cleaningFee} €`),
    },
    {
      label: de ? 'Mindestaufenthalt' : 'Minimum stay',
      werte: UNITS.map((u) => (de ? `${u.minStayNights} Nächte` : `${u.minStayNights} nights`)),
    },
    {
      label: de ? 'Wellnessbereich mit Sauna' : 'Spa area with sauna',
      werte: UNITS.map((u) => hat(u.key, 'sauna', de)),
    },
    {
      label: de ? 'Kamin' : 'Fireplace',
      werte: UNITS.map((u) => hat(u.key, 'fireplace', de)),
    },
    {
      label: de ? 'Eigene Terrasse' : 'Private terrace',
      werte: UNITS.map((u) =>
        UNIT_AMENITIES[u.key].some((k) => k.toLowerCase().includes('terrace')) ? (de ? 'ja' : 'yes') : (de ? 'nein' : 'no')
      ),
    },
  ];
}

export default function UnitComparison({ locale }: { locale: Locale }) {
  const de = locale === 'de';

  return (
    <section aria-labelledby="vergleich" className="max-w-5xl mx-auto">
      <h2
        id="vergleich"
        className="text-xl md:text-2xl font-serif uppercase tracking-[0.3em] text-stone-800 border-b border-stone-200 pb-6 mb-8"
      >
        {de ? 'Die drei Einheiten im Vergleich' : 'The three units compared'}
      </h2>

      <p className="text-sm font-light text-gray-600 leading-relaxed mb-8">
        {de
          ? 'The Alpine Hideaway ist das gesamte Haus und umfasst The Residence und The Retreat. Alle drei Einheiten lassen sich auch einzeln buchen.'
          : 'The Alpine Hideaway is the entire house and comprises The Residence and The Retreat. All three units can also be booked individually.'}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-stone-300">
              <th scope="col" className="text-left py-4 pr-4 font-bold text-stone-800 whitespace-nowrap">
                {de ? 'Merkmal' : 'Feature'}
              </th>
              {UNITS.map((u) => (
                <th key={u.key} scope="col" className="text-left py-4 px-4 font-bold text-stone-800 whitespace-nowrap">
                  {u.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows(locale).map((row) => (
              <tr key={row.label} className="border-b border-stone-100">
                <th scope="row" className="text-left py-3 pr-4 font-medium text-stone-700 align-top">
                  {row.label}
                </th>
                {row.werte.map((wert, i) => (
                  <td key={UNITS[i].key} className="py-3 px-4 font-light text-gray-600 align-top">
                    {wert}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

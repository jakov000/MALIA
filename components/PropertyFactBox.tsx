import { PROPERTY, UNITS, priceRange } from '@/lib/property-facts';
import type { Locale } from '@/lib/seo';

/**
 * Strukturierte Faktenbox (GEO 3).
 *
 * Server-Komponente ohne Animation — der Text steht unverändert im
 * ausgelieferten HTML. Laut Kundenvorgabe ist eine solche Faktenbox
 * oberhalb der Fragen der am häufigsten von KI-Systemen zitierte
 * Teil einer FAQ-Seite.
 *
 * Bewusst als Definitionsliste ausgezeichnet: dt/dd-Paare sind die
 * Struktur, die Sprachmodelle am zuverlässigsten als Schlüssel-Wert
 * extrahieren.
 */

type Row = { label: string; value: string };

function rows(locale: Locale): Row[] {
  const de = locale === 'de';
  const whole = UNITS.find((u) => u.isWholeProperty) ?? UNITS[0];
  const addr = PROPERTY.address;

  return [
    {
      label: de ? 'Kategorie' : 'Category',
      value: de ? 'Luxus-Chalet zur Alleinnutzung' : 'Luxury chalet for exclusive use',
    },
    {
      label: de ? 'Adresse' : 'Address',
      value: `${addr.street}, ${addr.postalCode} ${addr.city}, ${de ? addr.countryName : 'Austria'}`,
    },
    {
      label: de ? 'Kapazität' : 'Capacity',
      value: de
        ? `bis ${whole.maxGuests} Personen (${whole.maxGuestsInBedrooms} in Schlafzimmern, 2 auf Zustellbett oder Schlafcouch)`
        : `up to ${whole.maxGuests} guests (${whole.maxGuestsInBedrooms} in bedrooms, 2 on extra bed or sofa bed)`,
    },
    {
      label: de ? 'Schlafzimmer & Bäder' : 'Bedrooms & bathrooms',
      value: de
        ? `${whole.bedrooms} Schlafzimmer, ${whole.bathrooms} Bäder – je Schlafzimmer ein eigenes Bad`
        : `${whole.bedrooms} bedrooms, ${whole.bathrooms} bathrooms – one per bedroom`,
    },
    {
      label: de ? 'Wohnfläche' : 'Floor area',
      value: `${whole.sqm} m²`,
    },
    {
      label: de ? 'Einheiten' : 'Units',
      value: UNITS.map((u) =>
        `${u.name} (${u.sqm} m², ${u.minGuests === u.maxGuests ? u.maxGuests : `${u.minGuests}–${u.maxGuests}`} ${de ? 'Personen' : 'guests'})`
      ).join(' · '),
    },
    {
      label: de ? 'Preis ab' : 'Price from',
      value: de ? `${priceRange()} pro Nacht` : `${priceRange()} per night`,
    },
    {
      label: de ? 'Mindestaufenthalt' : 'Minimum stay',
      value: de ? `${whole.minStayNights} Nächte` : `${whole.minStayNights} nights`,
    },
    {
      label: 'Check-in / Check-out',
      value: de
        ? `ab ${PROPERTY.checkIn} Uhr / bis ${PROPERTY.checkOut} Uhr`
        : `from ${PROPERTY.checkIn} / until ${PROPERTY.checkOut}`,
    },
    {
      label: de ? 'Kurtaxe' : 'Tourist tax',
      value: de
        ? `${PROPERTY.touristTaxPerPersonPerNight} € pro Person und Nacht, Kinder bis ${PROPERTY.touristTaxExemptUnderAge} Jahre befreit`
        : `€${PROPERTY.touristTaxPerPersonPerNight} per person per night, children under ${PROPERTY.touristTaxExemptUnderAge} exempt`,
    },
    {
      label: de ? 'Wellness' : 'Spa',
      value: de
        ? 'Private finnische Sauna, Infrarotkabine, freistehende Badewanne'
        : 'Private Finnish sauna, infrared cabin, freestanding bathtub',
    },
    {
      label: de ? 'Entfernungen' : 'Distances',
      value: de
        ? 'Skipiste 2 Gehminuten · Bergbahn 2 Gehminuten · Achensee 8 Gehminuten · Bahnhof Jenbach ca. 15 Minuten'
        : 'Ski slope 2 min on foot · Cable car 2 min on foot · Lake Achensee 8 min on foot · Jenbach station approx. 15 min',
    },
    {
      label: de ? 'Haustiere' : 'Pets',
      value: de ? 'Hunde auf Anfrage willkommen' : 'Dogs welcome on request',
    },
    {
      label: de ? 'Parken & WLAN' : 'Parking & Wi-Fi',
      value: de
        ? 'Kostenfreie Parkplätze am Haus, teils überdacht · kostenfreies Glasfaser-WLAN'
        : 'Free parking at the house, partly covered · free fibre Wi-Fi',
    },
    {
      label: de ? 'Bewertung' : 'Rating',
      value: de
        ? `${PROPERTY.rating.value.toFixed(1).replace('.', ',')} von 5 bei ${PROPERTY.rating.count} ${PROPERTY.rating.source}-Bewertungen`
        : `${PROPERTY.rating.value.toFixed(1)} out of 5 from ${PROPERTY.rating.count} ${PROPERTY.rating.source} reviews`,
    },
    {
      label: de ? 'Kontakt' : 'Contact',
      value: `${PROPERTY.phoneDisplay} · ${PROPERTY.email}`,
    },
  ];
}

export default function PropertyFactBox({ locale }: { locale: Locale }) {
  const de = locale === 'de';

  return (
    <section aria-labelledby="fakten" className="bg-stone-50 border border-stone-200 p-6 md:p-10 mb-16">
      <h2 id="fakten" className="text-xs uppercase tracking-[0.3em] font-bold text-[#3d3d29] mb-8">
        {de ? 'Die wichtigsten Fakten' : 'Key facts'}
      </h2>

      <dl className="divide-y divide-stone-200">
        {rows(locale).map((row) => (
          <div key={row.label} className="py-3 md:grid md:grid-cols-[14rem_1fr] md:gap-6">
            <dt className="text-sm font-bold text-stone-800">{row.label}</dt>
            <dd className="text-sm font-light text-gray-600 mt-1 md:mt-0">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

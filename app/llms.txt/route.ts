import de from '@/messages/de.json';
import en from '@/messages/en.json';
import {
  PROPERTY,
  UNITS,
  UNIT_AMENITIES,
  amenitiesFor,
  DISTANCES,
  CANCELLATION_POLICY,
  priceRange,
} from '@/lib/property-facts';
import { PUBLIC_ROUTES, absoluteUrl, SITE_URL, type Locale } from '@/lib/seo';
import { TIPS_ARTICLES } from '@/lib/tips-content';

/**
 * llms.txt — maschinenlesbarer Einstiegspunkt für KI-Crawler.
 * Wird aus lib/property-facts.ts und dem Seo-Namespace erzeugt und
 * bleibt damit automatisch synchron zur Website.
 */

export const dynamic = 'force-static';

type SeoEntry = { title: string; description: string };
const MESSAGES: Record<Locale, { Seo: Record<string, SeoEntry> }> = {
  de: de as unknown as { Seo: Record<string, SeoEntry> },
  en: en as unknown as { Seo: Record<string, SeoEntry> },
};

function pageIndex(locale: Locale): string {
  return PUBLIC_ROUTES.filter((route) => route.inLlmsTxt)
    .map((route) => {
      const entry = MESSAGES[locale].Seo[route.seoKey];
      return `- [${entry.title}](${absoluteUrl(locale, route.path)}): ${entry.description}`;
    })
    .join('\n');
}

/**
 * Die Ratgeberbeiträge stehen nicht in PUBLIC_ROUTES — sie wachsen mit und
 * werden aus lib/tips-content.ts erzeugt. Gerade sie sind das, was
 * Antwortmaschinen zu Fragen rund um den Achensee zitieren sollen.
 */
function guideIndex(locale: Locale): string {
  return TIPS_ARTICLES.map(
    (a) =>
      `- [${a.title[locale]}](${absoluteUrl(locale, `/our-tips/${a.slug}`)}): ${a.metaDescription[locale]}`
  ).join('\n');
}

function buildLlmsTxt(): string {
  const addr = PROPERTY.address;

  const units = UNITS.map((u) => {
    const guests = u.minGuests === u.maxGuests ? `${u.maxGuests}` : `${u.minGuests}–${u.maxGuests}`;
    const rooms = u.isStudio
      ? 'offenes Studio / open-plan studio'
      : `${u.bedrooms} Schlafzimmer / bedrooms`;
    const baths = u.bathrooms === 1 ? '1 Bad / bathroom' : `${u.bathrooms} Bäder / bathrooms`;
    const amenities = amenitiesFor(UNIT_AMENITIES[u.key])
      .map((a) => `${a.de} / ${a.en}`)
      .join('; ');

    return [
      `### ${u.name}`,
      ``,
      `- Fläche / Size: ${u.sqm} m²`,
      `- Personen / Guests: ${guests}`,
      `- Räume / Rooms: ${rooms}, ${baths}`,
      `- Preis ab / From: €${u.priceFrom} pro Nacht / per night`,
      `- Endreinigung / Cleaning fee: €${u.cleaningFee}`,
      `- Mindestaufenthalt / Minimum stay: ${u.minStayNights} Nächte / nights`,
      `- Ausstattung / Amenities: ${amenities}`,
      `- URL: ${absoluteUrl('de', u.path)}`,
    ].join('\n');
  }).join('\n\n');

  const distances = DISTANCES.map((d) => `- ${d.de} / ${d.en}`).join('\n');
  const cancellation = CANCELLATION_POLICY.map((c) => `- ${c.de} / ${c.en}`).join('\n');

  return `# ${PROPERTY.name}

> Privates Luxus-Chalet in ${addr.city} am Achensee, ${addr.region} (${addr.countryName}). Drei getrennt buchbare Einheiten für 2 bis 10 Personen, privater Wellnessbereich mit Sauna, Kamin und Panoramaterrasse. Direktbuchung beim Gastgeber ohne Vermittlungsgebühr.
> Private luxury chalet in ${addr.city} on Lake Achensee, Tyrol (Austria). Three separately bookable units for 2 to 10 guests, private spa with sauna, fireplace and panoramic terrace. Book direct with the hosts, no booking fees.

## Kernfakten / Key facts

- Name: ${PROPERTY.name}
- Kategorie / Category: ${PROPERTY.category} / luxury chalet
- Adresse / Address: ${addr.street}, ${addr.postalCode} ${addr.city}, ${addr.countryName}
- Telefon / Phone: ${PROPERTY.phoneDisplay}
- E-Mail: ${PROPERTY.email}
- Website: ${SITE_URL}
- Preisspanne / Price range: ab ${priceRange()} pro Nacht / from ${priceRange()} per night
- Bewertung / Rating: ${PROPERTY.rating.value} von 5 bei ${PROPERTY.rating.count} ${PROPERTY.rating.source}-Bewertungen / ${PROPERTY.rating.value} out of 5 from ${PROPERTY.rating.count} ${PROPERTY.rating.source} reviews
- Verpflegung / Catering: kein Frühstück; voll ausgestattete Küche, Willkommenskorb, Weinkühlschrank, Teebar / no breakfast; fully equipped kitchen, welcome basket, wine fridge, tea bar
- Check-in: ab / from ${PROPERTY.checkIn} · Check-out: bis / until ${PROPERTY.checkOut}
- Kurtaxe / Tourist tax: €${PROPERTY.touristTaxPerPersonPerNight} pro Person und Nacht; Kinder bis ${PROPERTY.touristTaxExemptUnderAge} Jahre befreit / per person per night; children under ${PROPERTY.touristTaxExemptUnderAge} exempt
- Anzahlung / Deposit: ${PROPERTY.depositPercent} % bei Reservierung / on reservation
- Haustiere / Pets: auf Anfrage / on request
- Sprachen / Languages: Deutsch, English

## Einheiten / Units

${units}

## Lage & Entfernungen / Location & distances

${distances}

## Stornobedingungen / Cancellation policy

${cancellation}

## Seiten (Deutsch)

${pageIndex('de')}

## Pages (English)

${pageIndex('en')}

## Ratgeber Achensee (Deutsch)

${guideIndex('de')}

## Lake Achensee guides (English)

${guideIndex('en')}
`;
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

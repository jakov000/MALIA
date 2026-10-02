import {
  PROPERTY,
  UNITS,
  UNIT_AMENITIES,
  PROPERTY_AMENITY_KEYS,
  amenitiesFor,
  priceRange,
  type Unit,
} from '@/lib/property-facts';
import { SITE_URL, OG_IMAGE, absoluteUrl, type Locale } from '@/lib/seo';

/**
 * Schema.org-Bausteine. Alle Werte stammen aus lib/property-facts.ts,
 * damit Website-Text, JSON-LD und llms.txt nicht auseinanderlaufen.
 */

const LODGING_ID = `${SITE_URL}/#lodging`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const IMAGES = [
  OG_IMAGE,
  '/pictures/hideaways/IMG-1402.png',
  '/pictures/hideaways/IMG_1289.jpeg',
];

const DESCRIPTIONS: Record<Locale, string> = {
  de: `Privates Luxus-Chalet in Pertisau am Achensee: bis 400 m², 2–12 Personen, privater Wellnessbereich mit Sauna, Kamin und Panoramaterrasse. Bergbahn in 2 Gehminuten, Bahnhof Jenbach in rund 15 Minuten.`,
  en: `Private luxury chalet in Pertisau on Lake Achensee, Tyrol: up to 400 m², 2–12 guests, private spa with sauna, fireplace and panoramic terrace. Cable car 2 minutes on foot, Jenbach station approx. 15 minutes.`,
};

function absolute(path: string): string {
  return `${SITE_URL}${encodeURI(path)}`;
}

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: PROPERTY.address.street,
    postalCode: PROPERTY.address.postalCode,
    addressLocality: PROPERTY.address.city,
    addressRegion: PROPERTY.address.region,
    addressCountry: PROPERTY.address.country,
  };
}

function amenityFeatures(keys: string[], locale: Locale) {
  return amenitiesFor(keys).map((a) => ({
    '@type': 'LocationFeatureSpecification',
    name: locale === 'de' ? a.de : a.en,
    value: true,
  }));
}

/** Hauptentität: das Haus als Beherbergungsbetrieb. */
export function lodgingBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': LODGING_ID,
    name: PROPERTY.name,
    alternateName: PROPERTY.alternateName,
    description: DESCRIPTIONS[locale],
    url: absoluteUrl(locale, ''),
    sameAs: PROPERTY.sameAs,
    telephone: PROPERTY.phone,
    email: PROPERTY.email,
    address: postalAddress(),
    image: IMAGES.map(absolute),
    priceRange: priceRange(),
    currenciesAccepted: PROPERTY.currency,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: PROPERTY.rating.value,
      reviewCount: PROPERTY.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    checkinTime: PROPERTY.checkIn,
    checkoutTime: PROPERTY.checkOut,
    petsAllowed: locale === 'de' ? 'Auf Anfrage' : 'On request',
    // Schlafzimmer des gesamten Hauses — nicht die Summe über alle Einheiten,
    // da The Alpine Hideaway bereits Residence + Retreat umfasst.
    numberOfRooms: (UNITS.find((u) => u.isWholeProperty) ?? UNITS[0]).bedrooms,
    amenityFeature: amenityFeatures(PROPERTY_AMENITY_KEYS, locale),
    // Nur die Teil-Einheiten; das Gesamthaus ist diese Entität selbst.
    containsPlace: UNITS.filter((u) => !u.isWholeProperty).map((unit) => ({
      '@type': unit.schemaType,
      '@id': `${absoluteUrl(locale, unit.path)}#accommodation`,
      name: unit.name,
      url: absoluteUrl(locale, unit.path),
    })),
    ...(PROPERTY.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: PROPERTY.geo.latitude, longitude: PROPERTY.geo.longitude } }
      : {}),
  };
}

/** Eine einzelne Einheit mit Kapazität, Fläche und Einstiegspreis. */
export function accommodationSchema(unit: Unit, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': unit.schemaType,
    '@id': `${absoluteUrl(locale, unit.path)}#accommodation`,
    name: unit.name,
    url: absoluteUrl(locale, unit.path),
    floorSize: { '@type': 'QuantitativeValue', value: unit.sqm, unitCode: 'MTK' },
    numberOfBedrooms: unit.bedrooms,
    numberOfBathroomsTotal: unit.bathrooms,
    occupancy: {
      '@type': 'QuantitativeValue',
      minValue: unit.minGuests,
      maxValue: unit.maxGuests,
      unitText: locale === 'de' ? 'Personen' : 'guests',
    },
    amenityFeature: amenityFeatures(UNIT_AMENITIES[unit.key], locale),
    containedInPlace: { '@id': LODGING_ID },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl(locale, '/booking'),
      },
    },
  };
}

/** Breadcrumb-Pfad für Unterseiten. */
export function breadcrumbSchema(locale: Locale, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

/** Breadcrumb für eine Hideaway-Detailseite: Start → Unsere Hideaways → Einheit. */
export function unitBreadcrumbSchema(unit: Unit, locale: Locale) {
  return breadcrumbSchema(locale, [
    { name: locale === 'de' ? 'Startseite' : 'Home', path: '' },
    { name: locale === 'de' ? 'Unsere Hideaways' : 'Our Hideaways', path: '/our-hideaways' },
    { name: unit.name, path: unit.path },
  ]);
}

/** Organisation/Website-Entität für die Markensuche. */
export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: PROPERTY.name,
    alternateName: PROPERTY.alternateName,
    legalName: PROPERTY.legalName,
    url: absoluteUrl(locale, ''),
    sameAs: PROPERTY.sameAs,
    logo: absolute('/logotabs.png'),
    telephone: PROPERTY.phone,
    email: PROPERTY.email,
    address: postalAddress(),
  };
}

/** Ratgeberartikel aus "Our Tips". */
export function articleSchema(
  article: {
    slug: string;
    title: Record<Locale, string>;
    metaDescription: Record<Locale, string>;
    heroImage: string;
    author: { name: string };
    published: string;
  },
  locale: Locale
) {
  const url = absoluteUrl(locale, `/our-tips/${article.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[locale],
    description: article.metaDescription[locale],
    image: absolute(article.heroImage),
    datePublished: article.published,
    dateModified: article.published,
    inLanguage: locale === 'de' ? 'de-AT' : 'en',
    author: { '@type': 'Person', name: article.author.name },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };
}

/** FAQ-Markup — das „Zitierfutter" für Antwortmaschinen. */
export function faqPageSchema(entries: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

/**
 * Zentrale Faktenbasis des Objekts — einzige Quelle für Schema.org,
 * llms.txt und den strukturierten Faktenblock auf der Website.
 *
 * Alle Werte sind aus den bestehenden Inhalten in messages/de.json belegt.
 * Änderungen hier wirken automatisch auf allen drei Ausgabewegen.
 */

export const PROPERTY = {
  name: 'MALIA Alpine Hideaway',
  /** Schreibweise mit Bindestrich, wie sie im Google-Profil und im Impressum steht. */
  alternateName: 'MALIA - Alpine Hideaway',
  legalName: 'MALIA Alpine Hideaway — Familie Madleine & Julia Rieser',
  category: 'Luxus-Chalet',
  /** Belegt Website und Profile als dieselbe Entität. */
  sameAs: [
    'https://www.instagram.com/malia.alpine.hideaway',
    'https://www.facebook.com/people/MALIA-Alpine-Hideaway/61582954802618/',
  ],
  address: {
    street: 'Ländbergstraße 6',
    postalCode: '6213',
    city: 'Pertisau',
    region: 'Tirol',
    country: 'AT',
    countryName: 'Österreich',
  },
  // Hauptrufnummer (Julia). Vom Kunden im Review am 26.09.2026 festgelegt
  // und Referenz für alle Plattformprofile — siehe GEO 5.
  phone: '+436765925596',
  phoneDisplay: '+43 676 5925596',
  email: 'info@malia-alpine-hideaway.at',
  // Vom Kunden bestätigt (22.09.2026). Das Infoblatt nennt 47.4373053 / 11.6942945
  // — rund 13 m Abweichung, für die Standortbestimmung ohne Bedeutung.
  geo: { latitude: 47.4374286, longitude: 11.6942730 } as { latitude: number; longitude: number } | null,
  /**
   * Google-Bewertung. MUSS dem Google-Unternehmensprofil entsprechen —
   * abweichende oder geschätzte Zahlen führen zu einer manuellen Abstrafung.
   * Stand 22.09.2026: 5,0 bei 10 Bewertungen (Infoblatt nannte im August noch 7).
   */
  rating: { value: 5.0, count: 10, source: 'Google' },
  currency: 'EUR',
  checkIn: '15:00',
  checkOut: '10:00',
  /** Kurtaxe pro Person und Nacht; Kinder bis 14 Jahre befreit. */
  touristTaxPerPersonPerNight: 3,
  touristTaxExemptUnderAge: 14,
  depositPercent: 30,
  petsAllowed: 'on request' as const,
} as const;

export type UnitKey = 'hideaway' | 'residence' | 'retreat';

export type Unit = {
  key: UnitKey;
  name: string;
  /** Pfad ohne Locale-Präfix. */
  path: string;
  sqm: number;
  maxGuests: number;
  /** Belegung ohne Zustellbetten/Schlafcouch, falls abweichend von maxGuests. */
  maxGuestsInBedrooms?: number;
  minGuests: number;
  bedrooms: number;
  bathrooms: number;
  priceFrom: number;
  cleaningFee: number;
  /** Mindestaufenthalt in Nächten. In der Nebensaison ist teils 1 Nacht möglich. */
  minStayNights: number;
  /** Schema.org-Typ: ganzes Haus vs. Apartment. */
  schemaType: 'House' | 'Apartment';
  /** Offenes Studio statt abgetrennter Schlafzimmer. */
  isStudio?: boolean;
  /**
   * Diese "Einheit" ist das gesamte Haus und setzt sich aus den übrigen
   * zusammen (Hideaway = Residence + Retreat). Verhindert Doppelzählung.
   */
  isWholeProperty?: boolean;
};

export const UNITS: Unit[] = [
  {
    key: 'hideaway',
    name: 'The Alpine Hideaway',
    path: '/our-hideaways/the-alpine-hideaway',
    sqm: 400,
    // 10 Personen in den 5 Schlafzimmern, 2 weitere auf Zustellbett oder
    // Schlafcouch. Vom Kunden bestätigt (22.09.2026).
    maxGuests: 12,
    maxGuestsInBedrooms: 10,
    minGuests: 2,
    bedrooms: 5,
    // Je Schlafzimmer ein eigenes Bad (Infoblatt und FAQ-Vorlage des Kunden).
    bathrooms: 5,
    priceFrom: 800,
    cleaningFee: 160,
    minStayNights: 2,
    schemaType: 'House',
    isWholeProperty: true,
  },
  {
    key: 'residence',
    name: 'The Residence',
    path: '/our-hideaways/the-residence',
    sqm: 360,
    maxGuests: 8,
    minGuests: 2,
    bedrooms: 4,
    bathrooms: 3,
    priceFrom: 650,
    cleaningFee: 120,
    minStayNights: 2,
    schemaType: 'Apartment',
  },
  {
    key: 'retreat',
    name: 'The Retreat',
    path: '/our-hideaways/the-retreat',
    sqm: 40,
    maxGuests: 2,
    minGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    priceFrom: 160,
    cleaningFee: 45,
    minStayNights: 2,
    schemaType: 'Apartment',
    isStudio: true,
  },
];

/**
 * Ausstattungsmerkmale, zweisprachig.
 * Welche Einheit welches Merkmal hat, steht in UNIT_AMENITIES — eine
 * pauschale Liste für alle Einheiten wäre für The Retreat schlicht falsch.
 */
export const AMENITIES: { key: string; de: string; en: string }[] = [
  { key: 'sauna', de: 'Privater Wellnessbereich mit Sauna', en: 'Private spa with sauna' },
  { key: 'infrared', de: 'Infrarotkabine', en: 'Infrared cabin' },
  { key: 'bathtub', de: 'Freistehende Badewanne', en: 'Freestanding bathtub' },
  { key: 'fireplace', de: 'Kamin inkl. Holzvorrat', en: 'Fireplace with firewood included' },
  { key: 'terrace270', de: '270°-Panoramaterrasse & 3 Balkone', en: '270° panoramic terrace and 3 balconies' },
  { key: 'terrace', de: 'Panoramaterrasse & 3 Balkone mit Bergblick', en: 'Panoramic terrace and 3 balconies with mountain views' },
  { key: 'privateTerrace', de: 'Private Terrasse', en: 'Private terrace' },
  { key: 'kitchen', de: 'Designer-Küche mit Dampfgarer & Weinkühlschrank', en: 'Designer kitchen with steam oven and wine fridge' },
  { key: 'kitchenOpen', de: 'Voll ausgestattete offene Küche', en: 'Fully equipped open kitchen' },
  { key: 'rainShower', de: 'Milchglas-Bad mit Regendusche', en: 'Frosted-glass bathroom with rain shower' },
  { key: 'wifi', de: 'High-Speed-Glasfaser-WLAN', en: 'High-speed fibre Wi-Fi' },
  { key: 'tv', de: 'Smart-TV', en: 'Smart TV' },
  { key: 'heating', de: 'Fußbodenheizung', en: 'Underfloor heating' },
  { key: 'skiroom', de: 'Ski- & Abstellraum mit Skischuhtrockner', en: 'Ski and storage room with boot dryer' },
  { key: 'parking', de: 'Kostenlose überdachte Parkplätze', en: 'Free covered parking' },
  { key: 'pets', de: 'Haustiere auf Anfrage', en: 'Pets on request' },
];

/**
 * Ausstattung je Einheit, belegt aus den Bullet-Listen in messages/de.json.
 * The Retreat hat bewusst weder Sauna noch Kamin noch Panoramaterrasse.
 */
export const UNIT_AMENITIES: Record<UnitKey, string[]> = {
  hideaway: ['sauna', 'infrared', 'bathtub', 'fireplace', 'terrace270', 'kitchen', 'wifi', 'tv', 'heating', 'skiroom', 'parking', 'pets'],
  residence: ['sauna', 'infrared', 'bathtub', 'fireplace', 'terrace', 'kitchen', 'wifi', 'tv', 'heating', 'skiroom', 'parking', 'pets'],
  retreat: ['privateTerrace', 'kitchenOpen', 'rainShower', 'wifi', 'tv', 'heating', 'skiroom', 'parking', 'pets'],
};

/** Ausstattung des Gesamtobjekts = Ausstattung der größten Einheit. */
export const PROPERTY_AMENITY_KEYS = UNIT_AMENITIES.hideaway;

export function amenitiesFor(keys: string[]) {
  return keys
    .map((key) => AMENITIES.find((a) => a.key === key))
    .filter((a): a is { key: string; de: string; en: string } => Boolean(a));
}

/** Entfernungen als konkrete Zahlen — genau das, was Antwortmaschinen zitieren. */
export const DISTANCES: { key: string; de: string; en: string }[] = [
  { key: 'skislope', de: 'Skipiste: 2 Gehminuten', en: 'Ski slope: 2 minutes on foot' },
  { key: 'cablecar', de: 'Bergbahn: 2 Gehminuten', en: 'Cable car: 2 minutes on foot' },
  { key: 'lake', de: 'Achensee: 8 Gehminuten', en: 'Lake Achensee: 8 minutes on foot' },
  { key: 'restaurants', de: 'Cafés & Restaurants: wenige Gehminuten', en: 'Cafés and restaurants: a few minutes on foot' },
  { key: 'station', de: 'Bahnhof Jenbach: ca. 15 Minuten', en: 'Jenbach railway station: approx. 15 minutes' },
  { key: 'munich', de: 'München: ca. 1,5 Stunden über Tegernsee und Achenpass', en: 'Munich: approx. 1.5 hours via Tegernsee and Achenpass' },
  { key: 'evcharging', de: 'Öffentliche E-Ladestation: ca. 200 Meter (keine eigene Wallbox)', en: 'Public EV charging point: approx. 200 metres (no on-site wallbox)' },
];

/** Stornostaffel, wie in den AGB und auf /our-hideaways ausgewiesen. */
export const CANCELLATION_POLICY = [
  { untilDaysBefore: 60, feePercent: 0, de: 'bis 60 Tage vor Anreise kostenfrei', en: 'free of charge up to 60 days before arrival' },
  { untilDaysBefore: 30, feePercent: 50, de: 'bis 30 Tage vor Anreise 50 %', en: '50% up to 30 days before arrival' },
  { untilDaysBefore: 14, feePercent: 70, de: 'bis 14 Tage vor Anreise 70 %', en: '70% up to 14 days before arrival' },
  { untilDaysBefore: 0, feePercent: 100, de: 'unter 14 Tagen oder Nichtanreise 100 %', en: '100% under 14 days or no-show' },
];

/**
 * Preisspanne auf Basis der "ab"-Preise der Website — so vom Kunden
 * entschieden (22.09.2026).
 *
 * Hinweis für später: die Buchungsmaschine rechnet mit anderen Werten.
 * Live-Stand der Datenbank am 22.09.2026, nur zukünftige Zeiträume:
 *
 *   THE ALPINE HIDEAWAY   600 – 2200 €/Nacht   (RoomConfig-Basis: 1300)
 *   THE RESIDENCE         500 – 1800 €/Nacht   (RoomConfig-Basis: 1000)
 *   THE RETREAT           150 –  270 €/Nacht   (RoomConfig-Basis:  220)
 *
 * Der tatsächliche Höchstpreis liegt also deutlich über dem hier
 * ausgewiesenen oberen Ende. Bei der nächsten Preispflege angleichen.
 */
export function priceRange(): string {
  const prices = UNITS.map((u) => u.priceFrom);
  return `€${Math.min(...prices)}–€${Math.max(...prices)}`;
}

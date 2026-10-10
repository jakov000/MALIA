import type { Locale } from '@/lib/seo';

/**
 * Inhalte für "Our Tips" — den Ratgeberbereich rund um den Achensee.
 *
 * Aufbau: eine Hub-Seite mit drei Kategorien (Sommer, Winter, das ganze Jahr
 * über). Jede Kategorie zeigt Themenkacheln; eine Kachel verlinkt auf einen
 * Artikel, sobald dieser existiert (articleSlug gesetzt). Ohne Artikel wird
 * die Kachel ohne Link gerendert.
 *
 * Die Texte stammen aus den Layout-Entwürfen des Kunden und sind als erste
 * Fassung gedacht. Sie liegen bewusst hier und nicht in messages/*.json:
 * Ratgeberinhalte wachsen, sind stark strukturiert und werden zusätzlich für
 * Schema.org ausgewertet — eine getrennte Pflege würde auseinanderlaufen.
 */

export type TipsCategory = 'sommer' | 'winter' | 'ganzjahr';

export type Localized = Record<Locale, string>;

export type TipTile = {
  slug: string;
  title: Localized;
  teaser: Localized;
  /** Pfad relativ zu /public. */
  image: string;
  imageAlt: Localized;
  /** Gesetzt, sobald ein Artikel existiert. Sonst Kachel ohne Link. */
  articleSlug?: string;
};

export type TipPill = {
  slug: string;
  label: Localized;
};

export type TipsSection = {
  key: TipsCategory;
  /** Kleine Überzeile über der Rubriküberschrift. */
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  tiles: TipTile[];
  pills: TipPill[];
};

const BILD = (p: string) => `/pictures/the setting/${p}`;
const TIPPBILD = (p: string) => `/pictures/our-tips/${p}`;

export const TIPS_SECTIONS: TipsSection[] = [
  {
    key: 'sommer',
    eyebrow: { de: 'Sommer', en: 'Summer' },
    title: {
      de: 'Sommer am Achensee: Sportlich aktiv am größten See Tirols',
      en: 'Summer on Lake Achensee: active days on the largest lake in Tyrol',
    },
    intro: {
      de: 'Unsere Insider-Tipps für den Sommer: Julia ist die Wander-Maus und entspannte Genießerin, ich (Madleine) der Adrenalin-Junkie und die Wasser-Ratte. Gemeinsam zeigen wir euch hier jeden Steig, jede Alm und unsere Geheimtipps.',
      en: 'Our insider tips for summer: Julia is the hiker and relaxed epicure, I (Madleine) am the adrenaline junkie and water rat. Together we share every trail, every mountain hut and our best-kept secrets.',
    },
    tiles: [
      {
        slug: 'wandern-bergsteigen',
        title: { de: 'Wandern & Bergsteigen', en: 'Hiking & mountaineering' },
        teaser: {
          de: 'Bärenkopf, Gaisalmsteig und die Gramai-Alm — mit Tiroler Küche als Belohnung.',
          en: 'Bärenkopf, Gaisalmsteig and the Gramai-Alm — with Tyrolean cuisine as the reward.',
        },
        image: BILD('slidersettin2/2.png'),
        imageAlt: {
          de: 'Zwei Wanderer auf einem Felsgipfel über dem Achensee nahe Pertisau',
          en: 'Two hikers on a rocky summit above Lake Achensee near Pertisau',
        },
        articleSlug: 'wandern-bergsteigen',
      },
      {
        slug: 'radfahren-mountainbiken',
        title: { de: 'Radfahren & Mountainbiken', en: 'Cycling & mountain biking' },
        teaser: {
          de: '320 km Strecken rund um den See, plus die Tour auf den Feilkopf.',
          en: '320 km of routes around the lake, plus the climb up the Feilkopf.',
        },
        image: BILD('s2.png'),
        imageAlt: {
          de: 'Mountainbiker auf der Strecke Pertisau–Achenkirch am Achensee',
          en: 'Mountain bikers on the Pertisau to Achenkirch route on Lake Achensee',
        },
      },
      {
        slug: 'wassersport',
        title: { de: 'Wassersport', en: 'Water sports' },
        teaser: {
          de: 'Segeln, Kitesurfen, SUP, Tretboot und Freediving-Tauchschein.',
          en: 'Sailing, kitesurfing, SUP, pedal boats and freediving certification.',
        },
        image: BILD('s4.png'),
        imageAlt: {
          de: 'Boote am Steg auf dem Achensee nahe dem MALIA Alpine Hideaway in Pertisau',
          en: 'Boats at the jetty on Lake Achensee near MALIA Alpine Hideaway in Pertisau',
        },
      },
      {
        slug: 'klettern-klettersteige',
        title: { de: 'Klettern & Klettersteige', en: 'Climbing & via ferratas' },
        teaser: {
          de: 'Von der Grauwand für Beginner bis zur Lamsenspitze für Profis.',
          en: 'From the Grauwand for beginners to the Lamsenspitze for experts.',
        },
        image: BILD('s5.png'),
        imageAlt: {
          de: 'Bergsteigerin am Grat im Karwendel oberhalb von Pertisau am Achensee',
          en: 'Mountaineer on a ridge in the Karwendel above Pertisau on Lake Achensee',
        },
      },
    ],
    pills: [
      { slug: 'laufen', label: { de: 'Laufen & Trailrunning', en: 'Running & trail running' } },
      { slug: 'golf', label: { de: 'Golfen (18-Loch)', en: 'Golf (18 holes)' } },
      { slug: 'padel', label: { de: 'Padel, Tennis & Squash', en: 'Padel, tennis & squash' } },
      { slug: 'reiten', label: { de: 'Reiten (Wiesenhof)', en: 'Horse riding (Wiesenhof)' } },
      { slug: 'ballon', label: { de: 'Heißluftballon & Paragleiten', en: 'Hot-air ballooning & paragliding' } },
    ],
  },
  {
    key: 'winter',
    eyebrow: { de: 'Winter', en: 'Winter' },
    title: {
      de: 'Winter am Achensee: Von Skifahren bis Pferdeschlittenfahren',
      en: 'Winter on Lake Achensee: from skiing to horse-drawn sleigh rides',
    },
    intro: {
      de: 'Unsere Insider-Tipps für den Winter: Julia ist die Snowboarderin und Skitouren-Geherin, ich (Madleine) die Skifahrerin und immer mittendrin bei den besten Events am Berg. Gemeinsam zeigen wir euch hier unsere liebsten Pisten, Touren und Geheimtipps.',
      en: 'Our insider tips for winter: Julia snowboards and goes ski touring, I (Madleine) ski and am always in the middle of the best events on the mountain. Together we share our favourite slopes, tours and secrets.',
    },
    tiles: [
      {
        slug: 'skifahren-snowboarden',
        title: { de: 'Skifahren & Snowboarden', en: 'Skiing & snowboarding' },
        teaser: {
          de: '3 Skigebiete — Zwölferkopf, Rofan und Christlum für Fortgeschrittene.',
          en: 'Three ski areas — Zwölferkopf, Rofan and Christlum for advanced skiers.',
        },
        image: BILD('a.png'),
        imageAlt: {
          de: 'Skifahrer im Pulverschnee am Zwölferkopf über Pertisau am Achensee',
          en: 'Skier in powder snow on the Zwölferkopf above Pertisau on Lake Achensee',
        },
        articleSlug: 'skifahren-snowboarden',
      },
      {
        slug: 'langlaufen',
        title: { de: 'Langlaufen', en: 'Cross-country skiing' },
        teaser: {
          de: '228 km Loipen, klassisch oder Skating.',
          en: '228 km of tracks, classic or skating.',
        },
        image: BILD('b.png'),
        imageAlt: {
          de: 'Langläufer auf der Loipe mit Bergpanorama am Achensee',
          en: 'Cross-country skiers on the track with mountain panorama on Lake Achensee',
        },
        articleSlug: 'langlaufen',
      },
      {
        slug: 'rodeln',
        title: { de: 'Rodeln', en: 'Tobogganing' },
        teaser: {
          de: 'Gleich 2 Strecken — mit Bergbahn oder zu Fuß zur Hütte.',
          en: 'Two runs — reach the hut by cable car or on foot.',
        },
        image: BILD('slidersetting1/6.png'),
        imageAlt: {
          de: 'Rodeln an der Hüttenwand am Achensee nahe Pertisau',
          en: 'Toboggans leaning against a mountain hut near Pertisau on Lake Achensee',
        },
        articleSlug: 'rodeln',
      },
      {
        slug: 'eislaufen',
        title: { de: 'Eislaufen', en: 'Ice skating' },
        teaser: {
          de: 'Auf dem zugefrorenen See (auf eigene Gefahr) oder im Atoll.',
          en: 'On the frozen lake (at your own risk) or at the Atoll.',
        },
        image: BILD('slidersetting1/4.jpg'),
        imageAlt: {
          de: 'Eisfläche am Achensee im Abendlicht nahe Pertisau',
          en: 'Ice surface on Lake Achensee in the evening light near Pertisau',
        },
        articleSlug: 'eislaufen',
      },
    ],
    pills: [
      { slug: 'skitouren', label: { de: 'Skitouren', en: 'Ski touring' } },
      { slug: 'schneeschuh', label: { de: 'Schneeschuhwandern', en: 'Snowshoe hiking' } },
      { slug: 'ballon-winter', label: { de: 'Ballonfliegen (Mountain Days)', en: 'Balloon flights (Mountain Days)' } },
      { slug: 'pferdeschlitten', label: { de: 'Pferdeschlittenfahren', en: 'Horse-drawn sleigh rides' } },
    ],
  },
  {
    key: 'ganzjahr',
    eyebrow: { de: 'Das ganze Jahr über', en: 'All year round' },
    title: {
      de: 'Kulinarik & Kultur am Achensee',
      en: 'Food & culture on Lake Achensee',
    },
    intro: {
      de: 'Eins verbindet uns beide: Julia und ich gehen wahnsinnig gern gemeinsam essen — diese Leidenschaft teilen wir, und genau deshalb kennen wir auch die besten Adressen rund um den Achensee.',
      en: 'One thing unites us: Julia and I love going out to eat together — we share that passion, which is exactly why we know the best addresses around Lake Achensee.',
    },
    tiles: [
      {
        slug: 'restaurants-tiroler-kueche',
        title: { de: 'Restaurants & Tiroler Küche', en: 'Restaurants & Tyrolean cuisine' },
        teaser: {
          de: 'Von urigen Wirtshäusern bis Gourmet-Küche direkt am Wasser.',
          en: 'From rustic inns to gourmet cuisine right by the water.',
        },
        image: '/pictures/kaiserschmarrn-tiroler-kueche.jpeg',
        imageAlt: {
          de: 'Frisch zubereiteter Kaiserschmarrn in der Pfanne auf einer Almhütte am Achensee',
          en: 'Freshly made Kaiserschmarrn in the pan at a mountain hut on Lake Achensee',
        },
        articleSlug: 'restaurants-tiroler-kueche',
      },
      {
        slug: 'museumswelt',
        title: { de: 'Achenseer Museumswelt', en: 'Achensee museum world' },
        teaser: {
          de: 'Geschichte und Tradition der Region zum Anfassen.',
          en: 'The history and traditions of the region, hands-on.',
        },
        image: '/pictures/museumswelt.jpeg',
        imageAlt: {
          de: 'Historische Traktoren und Fahrräder in der Achenseer Museumswelt in Maurach',
          en: 'Historic tractors and bicycles at the Achensee museum world in Maurach',
        },
      },
      {
        slug: 'staedtetrips',
        title: { de: 'Städtetrips ab dem Achensee', en: 'City trips from Lake Achensee' },
        teaser: {
          de: 'Innsbruck, Rattenberg oder Schwaz — schnell erreicht, lohnt sich immer.',
          en: 'Innsbruck, Rattenberg or Schwaz — quickly reached, always worth it.',
        },
        image: '/pictures/innsbruck.jpeg',
        imageAlt: {
          de: 'Die bunten Häuser am Inn in Innsbruck vor der verschneiten Nordkette',
          en: 'The colourful houses along the river Inn in Innsbruck below the snow-covered Nordkette',
        },
      },
      {
        slug: 'traditionen-braeuche',
        title: { de: 'Traditionen & Bräuche', en: 'Traditions & customs' },
        teaser: {
          de: 'Almabtrieb, Trachten und gelebtes Brauchtum am Achensee.',
          en: 'Cattle drives, traditional dress and living customs on Lake Achensee.',
        },
        image: BILD('s7.jpg'),
        imageAlt: {
          de: 'Geschmückte Kuh beim Almabtrieb am Achensee',
          en: 'Decorated cow at the traditional cattle drive on Lake Achensee',
        },
      },
    ],
    pills: [
      { slug: 'huetten', label: { de: 'Hütteneinkehr', en: 'Mountain hut stops' } },
      { slug: 'cafes', label: { de: 'Cafés & Kuchen', en: 'Cafés & cake' } },
      { slug: 'ausflugsziele', label: { de: 'Ausflugsziele rund um den See', en: 'Day trips around the lake' } },
      { slug: 'literatour', label: { de: 'Achensee.literatour (Literaturfestival)', en: 'Achensee.literatour (literature festival)' } },
    ],
  },
];

/** Kopfbereich der Hub-Seite. */
export const TIPS_HUB = {
  heroImage: BILD('Sommersee.jpg'),
  heroImageAlt: {
    de: 'Der Achensee mit dem Karwendelgebirge im Sommer, nahe dem MALIA Alpine Hideaway in Pertisau',
    en: 'Lake Achensee with the Karwendel mountains in summer, near MALIA Alpine Hideaway in Pertisau',
  } as Localized,
  title: {
    de: 'Was kann man am Achensee machen?',
    en: 'What can you do on Lake Achensee?',
  } as Localized,
  subtitle: {
    de: 'Der Guide für Sommer, Winter, Kulinarik & Kultur',
    en: 'The guide to summer, winter, food & culture',
  } as Localized,
  intro: {
    de: 'Der Achensee ist nicht nur super zum Entspannen und la dolce far niente genießen. In der Gegend gibt es einiges zu erleben.',
    en: 'Lake Achensee is not only great for relaxing and enjoying la dolce far niente. There is plenty to experience in the area.',
  } as Localized,
  /** Zusammenfassung oben auf der Seite — der Teil, den KI-Systeme am liebsten zitieren. */
  kurzUndKnapp: {
    de: 'Im Sommer: Wandern, Radfahren, Wassersport, Klettern, Golfen und mehr. Im Winter: Skifahren, Langlaufen, Rodeln, Eislaufen und Pferdeschlittenfahren. Dazu das ganze Jahr über: gute Restaurants, Museen, Ausflüge und das ein oder andere Event in der Umgebung. Alles direkt rund um Pertisau und den Achensee.',
    en: 'In summer: hiking, cycling, water sports, climbing, golf and more. In winter: skiing, cross-country skiing, tobogganing, ice skating and horse-drawn sleigh rides. All year round: good restaurants, museums, excursions and the occasional event nearby. All of it right around Pertisau and Lake Achensee.',
  } as Localized,
  quote: {
    de: '„Egal ob Sommer oder Winter, ob Adrenalin oder Ruhe — am Achensee wird’s nie langweilig. Für welches Abenteuer entscheidet ihr euch zuerst?"',
    en: '“Whether summer or winter, adrenaline or calm — Lake Achensee is never boring. Which adventure will you choose first?”',
  } as Localized,
  ctaLabel: {
    de: 'Jetzt euer Achensee-Abenteuer planen',
    en: 'Plan your Lake Achensee adventure',
  } as Localized,
  signature: {
    de: 'Wir freuen uns auf euch, XOXO Julia & Madleine',
    en: 'We look forward to meeting you, XOXO Julia & Madleine',
  } as Localized,
};

/**
 * FAQ der Hub-Seite.
 *
 * In den Layout-Entwürfen sind nur die Fragen sichtbar, die Antworten waren
 * zugeklappt. Sobald sie vorliegen, hier ergänzen — die Seite rendert den
 * Block dann automatisch samt FAQPage-Markup.
 */
export const TIPS_FAQ: { question: Localized; answer: Localized }[] = [
  {
    question: {
      de: 'Was kann man bei Regen am Achensee machen?',
      en: 'What can you do on Lake Achensee when it rains?',
    },
    answer: {
      de: 'Bei Regen bietet sich das Atoll Achensee mit Hallenbad und Sauna an, dazu die Achensee Museumswelt, die Achenseebahn und die Achenseeschifffahrt. Auch das Steinölmuseum im Vitalberg ist einen Besuch wert, oder ein Ausflug zu den Swarovski Kristallwelten in Wattens (ca. 30 Min. von Maurach). Draußen geht mit Regenjacke auch ein Spaziergang am See oder eine leichte Wanderung.',
      en: 'When it rains, the Atoll Achensee with its indoor pool and sauna is a good choice, as are the Achensee museum world, the Achensee railway and the Achensee boat service. The Vitalberg stone oil museum is worth a visit too, or a trip to the Swarovski Crystal Worlds in Wattens (about 30 minutes from Maurach). Outdoors, a walk along the lake or an easy hike still works with a rain jacket.',
    },
  },
  {
    question: {
      de: 'Was kann man am Achensee mit der Familie unternehmen?',
      en: 'What can you do on Lake Achensee with the family?',
    },
    answer: {
      de: 'Schön für die ganze Familie sind eine leichte Wanderung zur Gaisalm, eine Fahrt mit dem Nostalgiebus zur Gramai-Alm oder eine Alpaka-Wanderung. Dazu kommen SUPen und Tretboot fahren auf dem See sowie der Kletterparcours im Adventure Park Achenkirch für die Mutigeren.',
      en: 'Great options for the whole family are an easy walk to the Gaisalm, a ride on the vintage bus to the Gramai-Alm or an alpaca trek. Add to that stand-up paddling and pedal boats on the lake, plus the climbing course at the Adventure Park Achenkirch for the braver ones.',
    },
  },
  {
    question: {
      de: 'Wie viele Tage sollte man für einen Urlaub am Achensee einplanen?',
      en: 'How many days should you plan for a holiday on Lake Achensee?',
    },
    answer: {
      de: 'Mindestens 4 bis 5 Tage — sonst reicht die Zeit weder zum Erholen noch für Berge und See in Ruhe. Die ersten Tage braucht ihr zum Ankommen, dann noch Zeit für eine Bergtour oder einen Skitag und für den See selbst. Eine ganze Woche ist ideal, dann bleibt auch noch Puffer für schlechtes Wetter und einen Tag ohne Programm.',
      en: 'At least 4 to 5 days — otherwise there is time neither to unwind nor to enjoy the mountains and the lake in peace. The first days are for arriving, then you want time for a mountain tour or a ski day and for the lake itself. A full week is ideal, leaving a buffer for bad weather and one day with nothing planned.',
    },
  },
];

/** Alle Fragen aus dem Layout-Entwurf sind beantwortet. */
export const TIPS_FAQ_PENDING: Localized[] = [];

export function tipsSection(key: TipsCategory): TipsSection {
  const found = TIPS_SECTIONS.find((s) => s.key === key);
  if (!found) throw new Error(`Unbekannte Rubrik: ${key}`);
  return found;
}

/** Alle Kacheln, die bereits auf einen Artikel verlinken. */
export function tilesWithArticle(): { section: TipsSection; tile: TipTile }[] {
  return TIPS_SECTIONS.flatMap((section) =>
    section.tiles.filter((t) => t.articleSlug).map((tile) => ({ section, tile }))
  );
}

/* ------------------------------------------------------------------ *
 * Artikel
 * ------------------------------------------------------------------ */

/**
 * Drei Layouts:
 * - "magazin": alternierende Bild-Text-Blöcke, Vergleichstabelle, Packliste.
 * - "karten":  zwei Erlebnisse nebeneinander als Karten mit Infoliste.
 * - "liste":   nummerierte Adresslisten je Ort, Bild daneben.
 */
export type ArtikelFormat = 'magazin' | 'karten' | 'liste';

/** Ein Label-Wert-Paar im Kennzahlenband. Pro Block frei wählbar. */
export type Kennzahl = { label: Localized; wert: Localized };

export type Tour = {
  slug: string;
  /** Überzeile, z. B. „Skigebiet 1 · Pertisau". */
  eyebrow: Localized;
  title: Localized;
  /** Kurzform für die Sprungmarken oben. Sonst wird der Titel vor dem Doppelpunkt genommen. */
  ankerLabel?: Localized;
  text: Localized;
  /** Beschriftung der Routenzeile, z. B. „Route", „Start/Ziel" oder „Start". */
  routeLabel?: Localized;
  route?: Localized;
  kennzahlen: Kennzahl[];
  image: string;
  imageAlt: Localized;
  tipp?: Localized;
  gutZuWissen?: Localized;
  /** Buchungs-Button direkt im Anschluss an diesen Block. */
  ctaDanach?: boolean;
};

/** Ein Erlebnis als Karte — Format „karten". */
export type TipCard = {
  slug: string;
  /** Symbol über der Karte. Rein dekorativ. */
  icon: string;
  eyebrow: Localized;
  title: Localized;
  ankerLabel?: Localized;
  text: Localized;
  image: string;
  imageAlt: Localized;
  /** Stichpunkte mit vorangestelltem Symbol: Adresse, Telefon, Verleih … */
  infos?: { icon: string; text: Localized }[];
  /** Hervorgehobener Sicherheitshinweis. */
  warnung?: { title: Localized; text: Localized };
  gutZuWissen?: Localized;
};

/** Ein Eintrag einer nummerierten Adressliste — Format „liste". */
export type ListenEintrag = {
  nummer: string;
  name: Localized;
  /** Entfernung ab MALIA, z. B. „15 Gehmin." — genau die Angabe, die zitiert wird. */
  entfernung?: Localized;
  text: Localized;
};

/** Eine Ortsgruppe mit ihrer Liste — Format „liste". */
export type ListenGruppe = {
  slug: string;
  eyebrow: Localized;
  title: Localized;
  ankerLabel?: Localized;
  intro: Localized;
  image: string;
  imageAlt: Localized;
  eintraege: ListenEintrag[];
  ctaDanach?: boolean;
};

export type TipsArticle = {
  slug: string;
  format: ArtikelFormat;
  category: TipsCategory;
  title: Localized;
  subtitle: Localized;
  /** Kurzfassung für Suchergebnisse und Antwortmaschinen. */
  metaDescription: Localized;
  heroImage: string;
  heroImageAlt: Localized;
  authors: { name: string; role?: Localized }[];
  readingMinutes: number;
  intro: Localized;
  kurzUndKnapp: Localized;
  /** Format „magazin". */
  tours?: Tour[];
  /** Format „karten". */
  cards?: TipCard[];
  /** Format „liste". */
  gruppen?: ListenGruppe[];
  comparison?: {
    title: Localized;
    spalten: Localized[];
    zeilen: Localized[][];
  };
  /** Buchungs-Button unter der Vergleichstabelle. */
  ctaNachVergleich?: boolean;
  packliste?: { title: Localized; items: Localized[] };
  faq?: { question: Localized; answer: Localized }[];
  /** Schlusswort der Gastgeberinnen. */
  closing?: Localized;
  weiterlesen: { label: Localized; href?: string }[];
  /** Veröffentlichung — fliesst ins Article-Markup. */
  published: string;
};

const LAENGE: Localized = { de: 'Länge', en: 'Distance' };
const DAUER: Localized = { de: 'Dauer', en: 'Duration' };
const SCHWIERIGKEIT: Localized = { de: 'Schwierigkeit', en: 'Difficulty' };
const HOEHENMETER: Localized = { de: 'Höhenmeter', en: 'Elevation' };
const AM_BESTEN_FUER: Localized = { de: 'Am besten für', en: 'Best for' };
const PACKLISTE_TITEL: Localized = {
  de: 'Packliste: Das gehört in euren Rucksack',
  en: 'Packing list: what belongs in your backpack',
};
const CHALETS: { label: Localized; href: string } = {
  label: { de: 'MALIA Chalets mit Bergblick', en: 'MALIA chalets with mountain views' },
  href: '/our-hideaways',
};
const GUIDE_LINK: { label: Localized; href: string } = {
  label: { de: 'Was kann man am Achensee machen?', en: 'What can you do on Lake Achensee?' },
  href: '/our-tips',
};
/** Noch kein Artikel vorhanden — wird als inaktive Kachel gerendert. */
const WINTERWANDERN: { label: Localized } = {
  label: { de: 'Winterwandern rund um Pertisau', en: 'Winter walking around Pertisau' },
};
const JULIA_UND_MADLEINE = [{ name: 'Julia' }, { name: 'Madleine' }];

const WANDERN: TipsArticle = {
  slug: 'wandern-bergsteigen',
  format: 'magazin',
  category: 'sommer',
  title: {
    de: 'Wandern & Bergsteigen am Achensee: Unsere schönsten Touren rund um Pertisau',
    en: 'Hiking & mountaineering on Lake Achensee: our finest tours around Pertisau',
  },
  subtitle: {
    de: 'Vom Panoramablick am Bärenkopf bis zur Tiroler Küche auf der Gramai-Alm',
    en: 'From the panoramic view on the Bärenkopf to Tyrolean cuisine at the Gramai-Alm',
  },
  metaDescription: {
    de: 'Drei Wanderungen rund um Pertisau am Achensee: Bärenkopf (6,4 km), Gaisalmsteig (15,6 km) und Gramai-Alm (14,1 km) — mit Länge, Dauer, Schwierigkeit und Höhenmetern.',
    en: 'Three hikes around Pertisau on Lake Achensee: Bärenkopf (6.4 km), Gaisalmsteig (15.6 km) and Gramai-Alm (14.1 km) — with distance, duration, difficulty and elevation gain.',
  },
  heroImage: BILD('s1.jpg'),
  heroImageAlt: {
    de: 'Wanderweg mit Blick auf den Achensee nahe dem MALIA Alpine Hideaway in Pertisau',
    en: 'Hiking trail overlooking Lake Achensee near MALIA Alpine Hideaway in Pertisau',
  },
  authors: [
    {
      name: 'Julia',
      role: { de: 'unsere Wander-Expertin im Team', en: 'our hiking expert on the team' },
    },
  ],
  readingMinutes: 6,
  intro: {
    de: 'Wandern ist meine Welt — und der Achensee bietet dafür die perfekte Kulisse. Zwischen Bergpanorama, Wasser und urigen Almhütten findet hier jeder die passende Tour, egal ob gemütlich oder sportlich.',
    en: 'Hiking is my world — and Lake Achensee is the perfect setting for it. Between mountain panoramas, water and rustic alpine huts, everyone finds the right tour here, whether leisurely or demanding.',
  },
  kurzUndKnapp: {
    de: 'Meine drei liebsten Touren: der Bärenkopf für den besten Panoramablick, der Gaisalmsteig direkt am Wasser entlang, und die Wanderung zur Gramai-Alm, wo am Ende Tiroler Küche auf euch wartet.',
    en: 'My three favourite tours: the Bärenkopf for the best panoramic view, the Gaisalmsteig right along the water, and the walk to the Gramai-Alm, where Tyrolean cuisine awaits at the end.',
  },
  tours: [
    {
      slug: 'baerenkopf',
      eyebrow: { de: 'Tour 1', en: 'Tour 1' },
      title: {
        de: 'Bärenkopf: der beste Panoramablick über den Achensee',
        en: 'Bärenkopf: the best panoramic view over Lake Achensee',
      },
      text: {
        de: 'Der Bärenkopf ist für mich ein absolutes Muss, wenn ihr am Achensee wandern geht. Die Route führt von der Bergstation Zwölferkopf zum Bärenkopf und wieder zurück zur Bergstation. Der Aufstieg belohnt euch mit einem der schönsten Ausblicke der ganzen Region — der See liegt euch praktisch zu Füßen.',
        en: 'For me the Bärenkopf is an absolute must when you go hiking on Lake Achensee. The route runs from the Zwölferkopf mountain station to the Bärenkopf and back again. The climb rewards you with one of the finest views in the whole region — the lake lies practically at your feet.',
      },
      routeLabel: { de: 'Route', en: 'Route' },
      route: {
        de: 'Bergstation Zwölferkopf – Bärenkopf – Bergstation Zwölferkopf',
        en: 'Zwölferkopf mountain station – Bärenkopf – Zwölferkopf mountain station',
      },
      kennzahlen: [
        { label: LAENGE, wert: { de: '6,4 km', en: '6.4 km' } },
        { label: DAUER, wert: { de: '3:30 Std.', en: '3:30 hrs' } },
        { label: SCHWIERIGKEIT, wert: { de: 'Mittel', en: 'Moderate' } },
        { label: HOEHENMETER, wert: { de: '590 hm', en: '590 m' } },
      ],
      image: '/pictures/baerenkopf-panorama-achensee.jpeg',
      imageAlt: {
        de: 'Panoramablick vom Bärenkopf über den Achensee im Abendlicht',
        en: 'Panoramic view from the Bärenkopf across Lake Achensee in the evening light',
      },
      tipp: {
        de: 'Startet früh, dann habt ihr den Ausblick fast für euch allein — und das Licht ist am schönsten.',
        en: 'Set off early and you will have the view almost to yourselves — and the light is at its best.',
      },
    },
    {
      slug: 'gaisalmsteig',
      eyebrow: { de: 'Tour 2', en: 'Tour 2' },
      title: {
        de: 'Gaisalmsteig: die Tour direkt am Wasser',
        en: 'Gaisalmsteig: the tour right by the water',
      },
      text: {
        de: 'Der Gaisalmsteig führt euch ganz nah am Wasser entlang zur Gaisalm und weiter bis nach Achenkirch, bevor es zurück nach Pertisau geht — landschaftlich einer meiner Favoriten. Wichtig: Festes Schuhwerk und Schwindelfreiheit solltet ihr mitbringen, an manchen Stellen wird’s schmal.',
        en: 'The Gaisalmsteig takes you right along the water to the Gaisalm and on to Achenkirch before returning to Pertisau — scenically one of my favourites. Important: bring sturdy footwear and a head for heights, as the path narrows in places.',
      },
      routeLabel: { de: 'Route', en: 'Route' },
      route: {
        de: 'Pertisau – Gaisalm – Achenkirch – Pertisau',
        en: 'Pertisau – Gaisalm – Achenkirch – Pertisau',
      },
      kennzahlen: [
        { label: LAENGE, wert: { de: '15,6 km', en: '15.6 km' } },
        { label: DAUER, wert: { de: '6 Std.', en: '6 hrs' } },
        { label: SCHWIERIGKEIT, wert: { de: 'Mittel – Schwindelfreiheit nötig', en: 'Moderate – a head for heights required' } },
        { label: HOEHENMETER, wert: { de: '230 hm', en: '230 m' } },
      ],
      image: '/pictures/gaisalmsteig-familie-am-wasser.jpeg',
      imageAlt: {
        de: 'Familie auf dem Gaisalmsteig direkt am Ufer des Achensees',
        en: 'Family walking the Gaisalmsteig trail right along the shore of Lake Achensee',
      },
      tipp: {
        de: 'Feste Wanderschuhe mit gutem Profil sind hier Pflicht, keine Sneaker.',
        en: 'Sturdy hiking boots with good grip are essential here — no trainers.',
      },
      gutZuWissen: {
        de: 'Wem die volle Runde zu lang ist — ab der Gaisalm könnt ihr auch ganz einfach mit dem Schiff zurück nach Pertisau fahren.',
        en: 'If the full loop is too long — from the Gaisalm you can simply take the boat back to Pertisau.',
      },
    },
    {
      slug: 'gramai-alm',
      eyebrow: { de: 'Tour 3', en: 'Tour 3' },
      title: {
        de: 'Gramai-Alm: Wandern mit Belohnung am Ziel',
        en: 'Gramai-Alm: hiking with a reward at the end',
      },
      text: {
        de: 'Diese Tour ist meine Empfehlung für alle, die Wandern und gutes Essen verbinden wollen. Der Weg führt über die Falzthurnalm zur Gramai-Alm, wo erstklassige Tiroler Küche auf euch wartet — die perfekte Belohnung nach dem Aufstieg.',
        en: 'This tour is my recommendation for anyone who wants to combine hiking with good food. The path leads via the Falzthurnalm to the Gramai-Alm, where first-class Tyrolean cuisine awaits — the perfect reward after the climb.',
      },
      routeLabel: { de: 'Route', en: 'Route' },
      route: {
        de: 'Pertisau – Falzthurnalm – Gramai-Alm – Pertisau',
        en: 'Pertisau – Falzthurnalm – Gramai-Alm – Pertisau',
      },
      kennzahlen: [
        { label: LAENGE, wert: { de: '14,1 km', en: '14.1 km' } },
        { label: DAUER, wert: { de: '4:30 Std.', en: '4:30 hrs' } },
        { label: SCHWIERIGKEIT, wert: { de: 'Leicht – familientauglich', en: 'Easy – family friendly' } },
        { label: HOEHENMETER, wert: { de: '290 hm', en: '290 m' } },
      ],
      image: '/pictures/gramai-alm-wanderweg.jpeg',
      imageAlt: {
        de: 'Wanderer auf dem Weg zur Gramai-Alm im Falzthurntal bei Pertisau',
        en: 'Hiker on the path to the Gramai-Alm in the Falzthurntal valley near Pertisau',
      },
      tipp: {
        de: 'Reserviert an schönen Wochenenden vorher einen Tisch, die Alm ist beliebt.',
        en: 'Reserve a table in advance on fine weekends — the hut is popular.',
      },
    },
  ],
  comparison: {
    title: { de: 'Welche Tour passt zu euch?', en: 'Which tour suits you?' },
    spalten: [{ de: 'Tour', en: 'Tour' }, DAUER, SCHWIERIGKEIT, AM_BESTEN_FUER],
    zeilen: [
      [
        { de: 'Bärenkopf', en: 'Bärenkopf' },
        { de: '3:30 Std.', en: '3:30 hrs' },
        { de: 'Mittel', en: 'Moderate' },
        { de: 'den besten Ausblick', en: 'the best view' },
      ],
      [
        { de: 'Gaisalmsteig', en: 'Gaisalmsteig' },
        { de: '6 Std.', en: '6 hrs' },
        { de: 'Mittel', en: 'Moderate' },
        { de: 'Naturliebhaber am Wasser', en: 'nature lovers by the water' },
      ],
      [
        { de: 'Gramai-Alm', en: 'Gramai-Alm' },
        { de: '4:30 Std.', en: '4:30 hrs' },
        { de: 'Leicht', en: 'Easy' },
        { de: 'Familien & Genießer', en: 'families & epicures' },
      ],
    ],
  },
  packliste: {
    title: PACKLISTE_TITEL,
    items: [
      { de: 'Feste Wanderschuhe', en: 'Sturdy hiking boots' },
      { de: 'Genug Wasser', en: 'Enough water' },
      { de: 'Sonnenschutz', en: 'Sun protection' },
      { de: 'Regenjacke', en: 'Rain jacket' },
      { de: 'Kleiner Proviant', en: 'A small snack' },
      { de: 'Handy & Powerbank', en: 'Phone & power bank' },
    ],
  },
  weiterlesen: [
    { label: { de: 'Klettersteige am Achensee', en: 'Via ferratas on Lake Achensee' } },
    { label: { de: 'Radfahren & Mountainbiken', en: 'Cycling & mountain biking' } },
    { label: { de: 'Wassersport am Achensee', en: 'Water sports on Lake Achensee' } },
    CHALETS,
  ],
  published: '2026-10-02',
};

const SKIFAHREN: TipsArticle = {
  slug: 'skifahren-snowboarden',
  format: 'magazin',
  category: 'winter',
  title: {
    de: 'Skifahren & Snowboarden am Achensee: Unsere drei Skigebiete rund um Pertisau',
    en: 'Skiing & snowboarding on Lake Achensee: our three ski areas around Pertisau',
  },
  subtitle: {
    de: 'Vom Übungshang in Pertisau bis zur sportlichen Piste Christlum',
    en: 'From the practice slope in Pertisau to the sporty Christlum piste',
  },
  metaDescription: {
    de: 'Drei Skigebiete am Achensee im Vergleich: Zwölferkopf in Pertisau (12 km, bis 1.491 m) für Anfänger, Rofan in Maurach (11 km, bis 1.840 m) für Familien und Christlum in Achenkirch (27 km, 950–1.800 m) für Fortgeschrittene.',
    en: 'Three ski areas on Lake Achensee compared: Zwölferkopf in Pertisau (12 km, up to 1,491 m) for beginners, Rofan in Maurach (11 km, up to 1,840 m) for families and Christlum in Achenkirch (27 km, 950–1,800 m) for advanced skiers.',
  },
  heroImage: TIPPBILD('skifahren/skipiste-sonnenaufgang-achensee.jpeg'),
  heroImageAlt: {
    de: 'Skifahrer auf frisch präparierter Piste im Sonnenaufgang über dem Achensee',
    en: 'Skier on a freshly groomed piste at sunrise above Lake Achensee',
  },
  authors: JULIA_UND_MADLEINE,
  readingMinutes: 6,
  intro: {
    de: 'Rund um den Achensee gibt’s gleich drei Skigebiete — und für jeden ist etwas dabei, egal ob ihr zum ersten Mal auf Skiern steht oder schon die Pisten runterheizt.',
    en: 'There are three ski areas around Lake Achensee — and there is something for everyone, whether you are standing on skis for the first time or already racing down the slopes.',
  },
  kurzUndKnapp: {
    de: 'Der Zwölferkopf in Pertisau ist perfekt für Einsteiger, das Rofan in Maurach eignet sich super für Familien, und am Christlum in Achenkirch kommen Fortgeschrittene und Funpark-Fans voll auf ihre Kosten.',
    en: 'The Zwölferkopf in Pertisau is perfect for beginners, the Rofan in Maurach is ideal for families, and the Christlum in Achenkirch is where advanced skiers and funpark fans get their money’s worth.',
  },
  tours: [
    {
      slug: 'zwoelferkopf',
      eyebrow: { de: 'Skigebiet 1 · Pertisau', en: 'Ski area 1 · Pertisau' },
      title: { de: 'Zwölferkopf: ideal für Anfänger', en: 'Zwölferkopf: ideal for beginners' },
      ankerLabel: { de: 'Zwölferkopf', en: 'Zwölferkopf' },
      text: {
        de: 'Der Zwölferkopf startet direkt im Ort Pertisau und ist unser Tipp für alle, die ganz neu einsteigen. Mit 12 Pistenkilometern und einem herrlichen Blick auf den Achensee ist es ein kleines, feines Skigebiet, hier müsst ihr euch nie in eine lange Liftschlange stellen.',
        en: 'The Zwölferkopf starts right in the village of Pertisau and is our tip for anyone starting out. With 12 kilometres of pistes and a wonderful view of Lake Achensee it is a small, fine ski area — and you never have to queue for the lifts here.',
      },
      kennzahlen: [
        { label: { de: 'Pistenlänge', en: 'Pistes' }, wert: { de: '12 km', en: '12 km' } },
        { label: { de: 'Höhe', en: 'Altitude' }, wert: { de: 'bis 1.491 m', en: 'up to 1,491 m' } },
        { label: { de: 'Eignet sich für', en: 'Suited to' }, wert: { de: 'Anfänger', en: 'Beginners' } },
      ],
      image: TIPPBILD('skifahren/zwoelferkopf-kinderland.jpeg'),
      imageAlt: {
        de: 'Kinder im Kinderland am Zwölferkopf in Pertisau am Achensee',
        en: 'Children in the kids’ area on the Zwölferkopf in Pertisau on Lake Achensee',
      },
      gutZuWissen: {
        de: 'Keine Wartezeiten, keine Hektik — perfekt für einen entspannten ersten Skitag.',
        en: 'No queues, no rush — perfect for a relaxed first day on skis.',
      },
      ctaDanach: true,
    },
    {
      slug: 'rofan',
      eyebrow: { de: 'Skigebiet 2 · Maurach', en: 'Ski area 2 · Maurach' },
      title: { de: 'Rofan: perfekt für Familien', en: 'Rofan: perfect for families' },
      ankerLabel: { de: 'Rofan', en: 'Rofan' },
      text: {
        de: 'Mit der Rofan Seilbahn seid ihr in nur 5 Minuten ganz oben auf 1.840 Metern. Das Skigebiet ist mittelschwer und damit genau richtig für Familien: Es gibt ein eigenes Ski-Kinderland für die Kleinsten, und alle, die es etwas wilder mögen, probieren den AIRROFAN Skyglider.',
        en: 'The Rofan cable car takes you up to 1,840 metres in just 5 minutes. The ski area is of medium difficulty and therefore just right for families: there is a dedicated ski kids’ area for the youngest, and anyone who likes it a little wilder can try the AIRROFAN Skyglider.',
      },
      kennzahlen: [
        { label: { de: 'Pistenlänge', en: 'Pistes' }, wert: { de: '11 km', en: '11 km' } },
        { label: { de: 'Höhe', en: 'Altitude' }, wert: { de: 'bis 1.840 m', en: 'up to 1,840 m' } },
        { label: { de: 'Eignet sich für', en: 'Suited to' }, wert: { de: 'Familien · Stufe mittel', en: 'Families · medium level' } },
      ],
      image: TIPPBILD('skifahren/rofan-familie-skifahren.jpeg'),
      imageAlt: {
        de: 'Familie beim Skifahren auf der Piste mit Blick auf den Achensee',
        en: 'Family skiing down the piste with a view of Lake Achensee',
      },
      gutZuWissen: {
        de: 'Das Ski-Kinderland direkt am Berg macht’s leicht, wenn die ganze Familie mit will.',
        en: 'The ski kids’ area right on the mountain makes things easy when the whole family wants to join in.',
      },
    },
    {
      slug: 'christlum',
      eyebrow: { de: 'Skigebiet 3 · Achenkirch', en: 'Ski area 3 · Achenkirch' },
      title: {
        de: 'Christlum: für Fortgeschrittene & Funpark-Fans',
        en: 'Christlum: for advanced skiers & funpark fans',
      },
      ankerLabel: { de: 'Christlum', en: 'Christlum' },
      text: {
        de: 'Mit 27 Pistenkilometern zwischen 950 und 1.800 Metern zählt das Christlum zu den schneesichersten Skigebieten Österreichs. Hier warten breite Carving-Pisten genauso wie knackige Buckelpisten — und im eigenen Funpark könnt ihr euch so richtig austoben.',
        en: 'With 27 kilometres of pistes between 950 and 1,800 metres, the Christlum is one of the most snow-sure ski areas in Austria. Wide carving pistes await you alongside demanding mogul slopes — and in its own funpark you can really let loose.',
      },
      kennzahlen: [
        { label: { de: 'Pistenlänge', en: 'Pistes' }, wert: { de: '27 km', en: '27 km' } },
        { label: { de: 'Höhe', en: 'Altitude' }, wert: { de: '950–1.800 m', en: '950–1,800 m' } },
        { label: { de: 'Eignet sich für', en: 'Suited to' }, wert: { de: 'Fortgeschrittene · Funpark', en: 'Advanced · funpark' } },
      ],
      image: TIPPBILD('skifahren/snowboarder-tiefschnee.jpeg'),
      imageAlt: {
        de: 'Snowboarder vor dem verschneiten Karwendelpanorama am Achensee',
        en: 'Snowboarder in front of the snow-covered Karwendel panorama on Lake Achensee',
      },
      gutZuWissen: {
        de: 'Mit Skipass oder Saisonkarte parkt ihr hier gratis.',
        en: 'With a ski pass or season ticket you park here free of charge.',
      },
    },
  ],
  comparison: {
    title: { de: 'Welches Skigebiet passt für euch?', en: 'Which ski area suits you?' },
    spalten: [
      { de: 'Skigebiet', en: 'Ski area' },
      { de: 'Level', en: 'Level' },
      AM_BESTEN_FUER,
    ],
    zeilen: [
      [
        { de: 'Zwölferkopf (Pertisau)', en: 'Zwölferkopf (Pertisau)' },
        { de: 'Anfänger', en: 'Beginners' },
        {
          de: 'den entspannten Einstieg, ganz ohne Liftschlangen',
          en: 'a relaxed start, with no lift queues',
        },
      ],
      [
        { de: 'Rofan (Maurach)', en: 'Rofan (Maurach)' },
        { de: 'Familien', en: 'Families' },
        {
          de: 'Familien mit Kindern (eigenes Ski-Kinderland)',
          en: 'families with children (own ski kids’ area)',
        },
      ],
      [
        { de: 'Christlum (Achenkirch)', en: 'Christlum (Achenkirch)' },
        { de: 'Fortgeschrittene · Funpark', en: 'Advanced · funpark' },
        { de: 'sportliche Fahrer und Funpark-Fans', en: 'sporty skiers and funpark fans' },
      ],
    ],
  },
  ctaNachVergleich: true,
  packliste: {
    title: PACKLISTE_TITEL,
    items: [
      { de: 'Ski / Snowboard', en: 'Skis / snowboard' },
      { de: 'Skischuhe / Snowboardschuhe', en: 'Ski boots / snowboard boots' },
      { de: 'Helm', en: 'Helmet' },
      { de: 'Skistecken', en: 'Ski poles' },
      { de: 'Skibrille', en: 'Ski goggles' },
      { de: 'Sonnenbrille', en: 'Sunglasses' },
      { de: 'Skihose', en: 'Ski trousers' },
      { de: 'Skijacke', en: 'Ski jacket' },
      { de: 'Handschuhe', en: 'Gloves' },
      { de: 'Lange Unterwäsche', en: 'Thermal underwear' },
      { de: 'Halstuch', en: 'Neck warmer' },
      { de: 'Skisocken', en: 'Ski socks' },
    ],
  },
  faq: [
    {
      question: {
        de: 'Welches Skigebiet am Achensee eignet sich für Anfänger?',
        en: 'Which ski area on Lake Achensee is suitable for beginners?',
      },
      answer: {
        de: 'Der Zwölferkopf in Pertisau und das Rofan in Maurach sind ideal für Einsteiger — beide sind entspannt zu befahren, ganz ohne lange Liftschlangen.',
        en: 'The Zwölferkopf in Pertisau and the Rofan in Maurach are ideal for beginners — both are relaxed to ski, with no long lift queues.',
      },
    },
    {
      question: {
        de: 'Gibt es am Achensee auch Pisten für Fortgeschrittene?',
        en: 'Are there pistes for advanced skiers on Lake Achensee?',
      },
      answer: {
        de: 'Ja. Das Christlum in Achenkirch bietet mit 27 Pistenkilometern zwischen 950 und 1.800 Metern breite Carving-Pisten und anspruchsvollere Buckelpisten.',
        en: 'Yes. With 27 kilometres of pistes between 950 and 1,800 metres, the Christlum in Achenkirch offers wide carving pistes and more demanding mogul slopes.',
      },
    },
    {
      question: {
        de: 'Kann man am Achensee auch Snowboarden lernen?',
        en: 'Can you learn to snowboard on Lake Achensee?',
      },
      answer: {
        de: 'Auf jeden Fall — in allen drei Skigebieten gibt’s Skischulen mit Snowboardkursen für Einsteiger und Fortgeschrittene, dazu Skiverleih in Achenkirch, Pertisau und Maurach.',
        en: 'Absolutely — all three ski areas have ski schools with snowboard courses for beginners and advanced riders, plus ski rental in Achenkirch, Pertisau and Maurach.',
      },
    },
  ],
  closing: {
    de: 'Egal ob Einsteiger, Familie oder alter Hase — am Achensee findet jeder seine passende Piste. Wir sehen uns am Berg!',
    en: 'Whether beginner, family or old hand — everyone finds their piste on Lake Achensee. See you on the mountain!',
  },
  weiterlesen: [
    GUIDE_LINK,
    { label: { de: 'Langlaufen am Achensee', en: 'Cross-country skiing on Lake Achensee' }, href: '/our-tips/langlaufen' },
    WINTERWANDERN,
    CHALETS,
  ],
  published: '2026-10-10',
};

const LANGLAUFEN: TipsArticle = {
  slug: 'langlaufen',
  format: 'magazin',
  category: 'winter',
  title: {
    de: 'Langlaufen am Achensee: Unsere Loipen in Maurach & Pertisau',
    en: 'Cross-country skiing on Lake Achensee: our tracks in Maurach & Pertisau',
  },
  subtitle: {
    de: 'Von der Seeloipe in Maurach bis zur großen Tour zur Gramai Alm',
    en: 'From the lakeside track in Maurach to the big tour up to the Gramai Alm',
  },
  metaDescription: {
    de: 'Loipen am Achensee im Überblick: Loipe Buchau in Maurach (2 km), Übungs- und Hundeloipe in Pertisau und die Tour Falzthurn–Gramai Alm (14 km, 285 hm) — mit Länge, Dauer und Schwierigkeit.',
    en: 'Cross-country tracks on Lake Achensee at a glance: the Buchau track in Maurach (2 km), the practice and dog tracks in Pertisau and the Falzthurn–Gramai Alm tour (14 km, 285 m) — with distance, duration and difficulty.',
  },
  heroImage: TIPPBILD('langlaufen/langlaufgruppe-pertisau.jpeg'),
  heroImageAlt: {
    de: 'Gruppe von Langläufern auf der Loipe in Pertisau am Achensee',
    en: 'Group of cross-country skiers on the track in Pertisau on Lake Achensee',
  },
  authors: JULIA_UND_MADLEINE,
  readingMinutes: 6,
  intro: {
    de: 'Rund um den Achensee warten über 228 km Loipen auf euch. Am schönsten sind für uns die Strecken direkt am See in Maurach und die drei Loipen in Pertisau — von der Einsteigerrunde bis zur großen Tour zur Gramai Alm.',
    en: 'More than 228 km of cross-country tracks await you around Lake Achensee. Our favourites are the routes right by the lake in Maurach and the three tracks in Pertisau — from the beginners’ loop to the big tour up to the Gramai Alm.',
  },
  kurzUndKnapp: {
    de: 'Die Loipe Buchau in Maurach führt direkt am Seeufer entlang, in Pertisau gibt’s eine entspannte Übungsloipe und eine Hundeloipe für den Einstieg, und wer mehr will, läuft die große Tour durchs Falzthurntal zur Gramai Alm.',
    en: 'The Buchau track in Maurach runs right along the lakeshore, Pertisau has a relaxed practice track and a dog track for getting started, and anyone wanting more can ski the big tour through the Falzthurn valley up to the Gramai Alm.',
  },
  tours: [
    {
      slug: 'loipe-buchau',
      eyebrow: { de: 'Loipe 1 · Maurach', en: 'Track 1 · Maurach' },
      title: {
        de: 'Loipe Buchau: direkt am Seeufer entlang',
        en: 'Buchau track: right along the lakeshore',
      },
      ankerLabel: { de: 'Loipe Buchau', en: 'Buchau track' },
      text: {
        de: 'Die Loipe Buchau in Maurach führt direkt am Seeufer Richtung Norden, vorbei am Sportplatz, bis sie am Ende der Wiese wendet und zurückläuft. Perfekt zum Reinkommen oder für eine entspannte Runde mit Seeblick.',
        en: 'The Buchau track in Maurach runs north right along the lakeshore, past the sports ground, until it turns at the end of the meadow and heads back. Perfect for finding your rhythm or for a relaxed lap with a lake view.',
      },
      routeLabel: { de: 'Start/Ziel', en: 'Start/finish' },
      route: {
        de: 'Maurach, am Seeufer (Rundkurs)',
        en: 'Maurach, on the lakeshore (circuit)',
      },
      kennzahlen: [
        { label: LAENGE, wert: { de: '2 km', en: '2 km' } },
        { label: DAUER, wert: { de: '30 Min.', en: '30 min' } },
        { label: SCHWIERIGKEIT, wert: { de: 'Leicht', en: 'Easy' } },
        { label: { de: 'Technik', en: 'Technique' }, wert: { de: 'Klassisch & Skating', en: 'Classic & skating' } },
      ],
      image: TIPPBILD('langlaufen/loipe-buchau-seeufer.jpeg'),
      imageAlt: {
        de: 'Langlaufloipe am Ufer des Achensees in der Buchau bei Maurach',
        en: 'Cross-country track along the shore of Lake Achensee at the Buchau near Maurach',
      },
      gutZuWissen: {
        de: 'Auch für Schlittenlanglauf geeignet. In Pertisau findet ihr den Verleih Sport Wörndle.',
        en: 'Also suitable for sled skiing. In Pertisau you will find the Sport Wörndle rental shop.',
      },
      ctaDanach: true,
    },
    {
      slug: 'uebungs-und-hundeloipe',
      eyebrow: { de: 'Loipe 2 & 3 · Pertisau', en: 'Tracks 2 & 3 · Pertisau' },
      title: {
        de: 'Übungsloipe & Hundeloipe: entspannt starten',
        en: 'Practice track & dog track: an easy start',
      },
      ankerLabel: { de: 'Einsteiger-Loipen Pertisau', en: 'Beginner tracks in Pertisau' },
      text: {
        de: 'In Pertisau gibt’s zwei kurze, leichte Loipen direkt beim Langlaufzentrum. Die Übungsloipe liegt komplett im flachen Gelände — ideal, um die Technik zu üben. Die Hundeloipe führt als Rundkurs am Ortsrand entlang, hier darf euer Hund an der Leine mitlaufen. Beide gibt’s klassisch und im Skating-Stil.',
        en: 'Pertisau has two short, easy tracks right by the cross-country centre. The practice track is completely flat — ideal for working on your technique. The dog track runs as a circuit along the edge of the village, where your dog may come along on a lead. Both are prepared for classic and skating.',
      },
      kennzahlen: [
        { label: { de: 'Übungsloipe', en: 'Practice track' }, wert: { de: '1,5 km · 15 Min.', en: '1.5 km · 15 min' } },
        { label: { de: 'Hundeloipe', en: 'Dog track' }, wert: { de: '2 km · 30 Min.', en: '2 km · 30 min' } },
        { label: SCHWIERIGKEIT, wert: { de: 'Leicht', en: 'Easy' } },
        { label: { de: 'Technik', en: 'Technique' }, wert: { de: 'Klassisch & Skating', en: 'Classic & skating' } },
      ],
      image: TIPPBILD('langlaufen/loipe-zwei-laeufer.jpeg'),
      imageAlt: {
        de: 'Zwei Langläufer auf der flachen Übungsloipe in Pertisau am Achensee',
        en: 'Two cross-country skiers on the flat practice track in Pertisau on Lake Achensee',
      },
      gutZuWissen: {
        de: 'Hunde sind auf der Hundeloipe erlaubt — einfach an der Leine führen.',
        en: 'Dogs are allowed on the dog track — simply keep them on a lead.',
      },
    },
    {
      slug: 'falzthurn-gramai',
      eyebrow: { de: 'Loipe 4 · Pertisau', en: 'Track 4 · Pertisau' },
      title: {
        de: 'Falzthurn-Gramai: die große Tour zur Gramai Alm',
        en: 'Falzthurn–Gramai: the big tour to the Gramai Alm',
      },
      ankerLabel: { de: 'Falzthurn-Gramai', en: 'Falzthurn–Gramai' },
      text: {
        de: 'Unsere Empfehlung für geübte Langläufer: Die Tour führt durch den Wald, über eine Brücke und die Wiesen der Falzthurn Almen, dann weiter bergauf zur Gramai Alm — zurück geht’s als flotte Abfahrt. Einkehren könnt ihr unterwegs bei den Falzthurn Almen und auf der Gramai Alm selbst.',
        en: 'Our recommendation for experienced cross-country skiers: the tour leads through the forest, over a bridge and across the meadows of the Falzthurn Almen, then continues uphill to the Gramai Alm — the way back is a brisk descent. You can stop for a bite at the Falzthurn Almen along the way and at the Gramai Alm itself.',
      },
      routeLabel: { de: 'Route', en: 'Route' },
      route: {
        de: 'Pertisau – Falzthurntal – Gramai Alm – Pertisau (Rundkurs)',
        en: 'Pertisau – Falzthurn valley – Gramai Alm – Pertisau (circuit)',
      },
      kennzahlen: [
        { label: LAENGE, wert: { de: '14 km', en: '14 km' } },
        { label: DAUER, wert: { de: '2:30 Std.', en: '2:30 hrs' } },
        { label: SCHWIERIGKEIT, wert: { de: 'Mittel – für Geübte', en: 'Moderate – for the experienced' } },
        { label: HOEHENMETER, wert: { de: '285 hm', en: '285 m' } },
      ],
      image: TIPPBILD('langlaufen/falzthurntal-loipe.jpeg'),
      imageAlt: {
        de: 'Langläufer auf der Loipe im Falzthurntal vor dem Karwendel bei Pertisau',
        en: 'Cross-country skiers on the track in the Falzthurn valley below the Karwendel near Pertisau',
      },
      gutZuWissen: {
        de: 'Für Kurse empfehlen wir die Langlaufschule Achensee von Peter Schwandl, Ausrüstung gibt’s bei Sport Wöll direkt im Langlaufstüberl in Pertisau.',
        en: 'For lessons we recommend Peter Schwandl’s Achensee cross-country school; equipment is available from Sport Wöll in the Langlaufstüberl in Pertisau.',
      },
    },
  ],
  comparison: {
    title: { de: 'Welche Tour passt zu euch?', en: 'Which tour suits you?' },
    spalten: [{ de: 'Loipe', en: 'Track' }, DAUER, SCHWIERIGKEIT, AM_BESTEN_FUER],
    zeilen: [
      [
        { de: 'Loipe Buchau (Maurach)', en: 'Buchau track (Maurach)' },
        { de: '30 Min.', en: '30 min' },
        { de: 'Leicht', en: 'Easy' },
        { de: 'eine entspannte Runde am See', en: 'a relaxed lap by the lake' },
      ],
      [
        { de: 'Übungsloipe (Pertisau)', en: 'Practice track (Pertisau)' },
        { de: '15 Min.', en: '15 min' },
        { de: 'Leicht', en: 'Easy' },
        { de: 'den allerersten Einstieg', en: 'your very first attempt' },
      ],
      [
        { de: 'Hundeloipe (Pertisau)', en: 'Dog track (Pertisau)' },
        { de: '30 Min.', en: '30 min' },
        { de: 'Leicht', en: 'Easy' },
        { de: 'Langlaufen mit Hund', en: 'skiing with your dog' },
      ],
      [
        { de: 'Falzthurn-Gramai (Pertisau)', en: 'Falzthurn–Gramai (Pertisau)' },
        { de: '2:30 Std.', en: '2:30 hrs' },
        { de: 'Mittel', en: 'Moderate' },
        { de: 'geübte Langläufer mit Einkehr', en: 'experienced skiers who like a hut stop' },
      ],
    ],
  },
  ctaNachVergleich: true,
  packliste: {
    title: PACKLISTE_TITEL,
    items: [
      { de: 'Langlaufski', en: 'Cross-country skis' },
      { de: 'Langlaufhose', en: 'Cross-country trousers' },
      { de: 'Warme Socken', en: 'Warm socks' },
      { de: 'Lange Unterwäsche', en: 'Thermal underwear' },
      { de: 'Langlaufjacke', en: 'Cross-country jacket' },
      { de: 'Weste', en: 'Gilet' },
      { de: 'Stirnband', en: 'Headband' },
      { de: 'Halstuch', en: 'Neck warmer' },
      { de: 'Langlaufschuhe', en: 'Cross-country boots' },
      { de: 'Langlaufstecken', en: 'Cross-country poles' },
    ],
  },
  faq: [
    {
      question: {
        de: 'Ist Langlaufen am Achensee auch für Anfänger geeignet?',
        en: 'Is cross-country skiing on Lake Achensee suitable for beginners?',
      },
      answer: {
        de: 'Ja. Die Übungsloipe in Pertisau und die Loipe Buchau in Maurach sind beide leicht, flach und ideal für den Einstieg.',
        en: 'Yes. The practice track in Pertisau and the Buchau track in Maurach are both easy, flat and ideal for getting started.',
      },
    },
    {
      question: {
        de: 'Darf man mit Hund langlaufen am Achensee?',
        en: 'Can you go cross-country skiing with a dog on Lake Achensee?',
      },
      answer: {
        de: 'Ja, auf der Hundeloipe in Pertisau — dort darf euer Hund an der Leine mitlaufen.',
        en: 'Yes, on the dog track in Pertisau — there your dog may come along on a lead.',
      },
    },
    {
      question: {
        de: 'Was kostet die Loipennutzung am Achensee?',
        en: 'What does it cost to use the tracks on Lake Achensee?',
      },
      answer: {
        de: 'In Maurach, Achenkirch, Steinberg am Rofan und Wiesing sind die Loipen kostenlos. In Pertisau kostet die Nutzung meist etwas, mit der AchenseeCard eurer Unterkunft ist sie aber gratis.',
        en: 'In Maurach, Achenkirch, Steinberg am Rofan and Wiesing the tracks are free. In Pertisau there is usually a charge, but with the AchenseeCard from your accommodation it is free.',
      },
    },
  ],
  closing: {
    de: 'Egal ob entspannte Runde am See oder die große Tour zur Gramai Alm, Langlaufen am Achensee hat für jeden die passende Loipe.',
    en: 'Whether a relaxed lap by the lake or the big tour to the Gramai Alm — cross-country skiing on Lake Achensee has the right track for everyone.',
  },
  weiterlesen: [
    {
      label: { de: 'Skifahren & Snowboarden am Achensee', en: 'Skiing & snowboarding on Lake Achensee' },
      href: '/our-tips/skifahren-snowboarden',
    },
    GUIDE_LINK,
    WINTERWANDERN,
    CHALETS,
  ],
  published: '2026-10-10',
};

const RODELN: TipsArticle = {
  slug: 'rodeln',
  format: 'magazin',
  category: 'winter',
  title: {
    de: 'Rodeln am Achensee: Unsere zwei Rodelbahnen in Pertisau',
    en: 'Tobogganing on Lake Achensee: our two runs in Pertisau',
  },
  subtitle: {
    de: 'Von der großen Fahrt mit der Karwendelbergbahn bis zur gemütlichen Rodlhütte',
    en: 'From the big run down from the Karwendel cable car to the cosy Rodlhütte',
  },
  metaDescription: {
    de: 'Zwei Rodelbahnen in Pertisau am Achensee: die 5 km lange Naturrodelbahn am Zwölferkopf mit Auffahrt per Karwendelbergbahn und die 1,3 km kurze, beleuchtete Bahn an der Rodlhütte.',
    en: 'Two toboggan runs in Pertisau on Lake Achensee: the 5 km natural run on the Zwölferkopf reached by the Karwendel cable car, and the 1.3 km floodlit run at the Rodlhütte.',
  },
  heroImage: TIPPBILD('rodeln/rodelbahn-zwoelferkopf.jpeg'),
  heroImageAlt: {
    de: 'Zwei Rodler auf der Naturrodelbahn am Zwölferkopf bei Pertisau am Achensee',
    en: 'Two tobogganers on the natural run on the Zwölferkopf near Pertisau on Lake Achensee',
  },
  authors: JULIA_UND_MADLEINE,
  readingMinutes: 5,
  intro: {
    de: 'In Pertisau gibt’s zwei Rodelbahnen — ganz unterschiedlich in Länge und Tempo. Die eine fahrt ihr bequem mit der Karwendelbergbahn hinauf, zur anderen geht ihr zu Fuß oder lasst euch mit dem Rodelexpress hinbringen.',
    en: 'Pertisau has two toboggan runs — quite different in length and pace. For one you ride comfortably up with the Karwendel cable car; the other you reach on foot or with the Rodelexpress.',
  },
  kurzUndKnapp: {
    de: 'Die Rodelbahn Zwölferkopf ist mit 5 km die große, mittelschwere Fahrt mit der Bergbahn hinauf. Die Rodlhütte ist kürzer, leichter und beleuchtet — ideal für einen entspannten Abend.',
    en: 'At 5 km, the Zwölferkopf run is the long, moderately difficult one with a cable car ride up. The Rodlhütte run is shorter, easier and floodlit — ideal for a relaxed evening.',
  },
  tours: [
    {
      slug: 'zwoelferkopf',
      eyebrow: { de: 'Bahn 1 · Pertisau', en: 'Run 1 · Pertisau' },
      title: {
        de: 'Zwölferkopf: mit der Karwendelbergbahn hinauf',
        en: 'Zwölferkopf: up with the Karwendel cable car',
      },
      ankerLabel: { de: 'Zwölferkopf', en: 'Zwölferkopf' },
      text: {
        de: 'Mit der Gondel der Karwendelbergbahn fahrt ihr bequem zur Bergstation hinauf und rodelt von dort die lange Naturrodelbahn zurück ins Tal. Unterwegs geht’s in mehreren Kehren durch den Wald, vorbei an einem Sendemast, immer wieder mit Ausblick auf den Achensee.',
        en: 'The Karwendel cable car takes you comfortably up to the mountain station, from where you toboggan the long natural run back down into the valley. On the way it winds through the forest in several bends, past a transmitter mast, with repeated views of Lake Achensee.',
      },
      routeLabel: { de: 'Start/Ziel', en: 'Start/finish' },
      route: {
        de: 'Bergstation Karwendelbergbahn → Talstation Karwendelbahn',
        en: 'Karwendel cable car top station → valley station',
      },
      kennzahlen: [
        { label: LAENGE, wert: { de: '5 km', en: '5 km' } },
        { label: DAUER, wert: { de: 'ca. 1,5 Std.', en: 'approx. 1.5 hrs' } },
        { label: SCHWIERIGKEIT, wert: { de: 'Mittelschwierig', en: 'Moderate' } },
        { label: { de: 'Auffahrt', en: 'Ascent' }, wert: { de: 'Karwendelbergbahn', en: 'Karwendel cable car' } },
      ],
      image: TIPPBILD('rodeln/winterpanorama-karwendel.jpeg'),
      imageAlt: {
        de: 'Winterpanorama vom Zwölferkopf über das Karwendel und den Achensee',
        en: 'Winter panorama from the Zwölferkopf across the Karwendel and Lake Achensee',
      },
      gutZuWissen: {
        de: 'An der Talstation der Karwendelbergbahn gibt es gleich zwei Rodelverleihe.',
        en: 'There are two toboggan rental shops right at the valley station of the Karwendel cable car.',
      },
      ctaDanach: true,
    },
    {
      slug: 'rodlhuette',
      eyebrow: { de: 'Bahn 2 · Pertisau', en: 'Run 2 · Pertisau' },
      title: {
        de: 'Rodlhütte: zu Fuß oder mit dem Rodelexpress',
        en: 'Rodlhütte: on foot or with the Rodelexpress',
      },
      ankerLabel: { de: 'Rodlhütte', en: 'Rodlhütte' },
      text: {
        de: 'Die zweite Bahn ist kürzer und leichter. Zum Start geht ihr entweder 35 Minuten zu Fuß zur Rodlhütte hinauf, oder ihr lasst euch mit dem Rodelexpress hinbringen — ein Traktor mit Wagen, der stündlich von 10 bis 17 Uhr direkt ab Sport Wöll in Pertisau losfährt. Die Bahn ist beleuchtet, ihr könnt also auch abends noch rodeln.',
        en: 'The second run is shorter and easier. To reach the start you either walk up to the Rodlhütte in 35 minutes or take the Rodelexpress — a tractor and trailer that leaves hourly from 10 a.m. to 5 p.m. directly from Sport Wöll in Pertisau. The run is floodlit, so you can still toboggan in the evening.',
      },
      routeLabel: { de: 'Start', en: 'Start' },
      route: {
        de: 'Rodlhütte, mittlere Höhe des Zwölferkopfs',
        en: 'Rodlhütte, halfway up the Zwölferkopf',
      },
      kennzahlen: [
        { label: LAENGE, wert: { de: '1,3 km', en: '1.3 km' } },
        { label: DAUER, wert: { de: 'ca. 30 Min.', en: 'approx. 30 min' } },
        { label: SCHWIERIGKEIT, wert: { de: 'Leicht', en: 'Easy' } },
        {
          label: { de: 'Auffahrt', en: 'Ascent' },
          wert: { de: 'Zu Fuß (35 Min.) oder Rodelexpress', en: 'On foot (35 min) or Rodelexpress' },
        },
      ],
      image: TIPPBILD('rodeln/rodlhuette-pertisau.jpeg'),
      imageAlt: {
        de: 'Die Rodlhütte in Pertisau im Winter mit Rodeln an der Hüttenwand',
        en: 'The Rodlhütte in Pertisau in winter with toboggans leaning against the wall',
      },
      gutZuWissen: {
        de: 'Der Rodelexpress startet direkt bei Sport Wöll, nur eine Gehminute von eurer MALIA Unterkunft entfernt. Einen Rodel ausleihen könnt ihr dort oder direkt bei der Rodlhütte.',
        en: 'The Rodelexpress leaves from Sport Wöll, just a minute’s walk from your MALIA accommodation. You can rent a toboggan there or directly at the Rodlhütte.',
      },
    },
  ],
  comparison: {
    title: { de: 'Welche Rodelbahn passt zu euch?', en: 'Which toboggan run suits you?' },
    spalten: [{ de: 'Rodelbahn', en: 'Toboggan run' }, DAUER, SCHWIERIGKEIT, AM_BESTEN_FUER],
    zeilen: [
      [
        { de: 'Zwölferkopf', en: 'Zwölferkopf' },
        { de: 'ca. 1,5 Std.', en: 'approx. 1.5 hrs' },
        { de: 'Mittelschwierig', en: 'Moderate' },
        { de: 'die große, lange Fahrt mit Seeblick', en: 'the long run with a lake view' },
      ],
      [
        { de: 'Rodlhütte', en: 'Rodlhütte' },
        { de: 'ca. 30 Min.', en: 'approx. 30 min' },
        { de: 'Leicht', en: 'Easy' },
        { de: 'eine entspannte Runde, auch abends', en: 'a relaxed run, evenings too' },
      ],
    ],
  },
  packliste: {
    title: PACKLISTE_TITEL,
    items: [
      { de: 'Schlitten (falls nicht geliehen)', en: 'Toboggan (unless rented)' },
      { de: 'Warme Winterjacke', en: 'Warm winter jacket' },
      { de: 'Schneehose', en: 'Snow trousers' },
      { de: 'Wasserdichte Handschuhe', en: 'Waterproof gloves' },
      { de: 'Mütze', en: 'Hat' },
      { de: 'Schal oder Buff', en: 'Scarf or buff' },
      { de: 'Warme Socken', en: 'Warm socks' },
      { de: 'Feste Winterschuhe', en: 'Sturdy winter boots' },
      { de: 'Helm', en: 'Helmet' },
      { de: 'Stirnlampe für die Abendfahrt', en: 'Head torch for the evening run' },
    ],
  },
  faq: [
    {
      question: {
        de: 'Welche Rodelbahn ist leichter, Zwölferkopf oder Rodlhütte?',
        en: 'Which run is easier, Zwölferkopf or Rodlhütte?',
      },
      answer: {
        de: 'Die Rodlhütte ist deutlich leichter und kürzer — ideal für Familien und den gemütlichen Einstieg. Der Zwölferkopf ist mit 5 km und mittlerer Schwierigkeit die sportlichere Fahrt.',
        en: 'The Rodlhütte run is noticeably easier and shorter — ideal for families and a gentle start. At 5 km and moderate difficulty, the Zwölferkopf is the sportier ride.',
      },
    },
    {
      question: {
        de: 'Kann man abends am Achensee rodeln?',
        en: 'Can you toboggan in the evening on Lake Achensee?',
      },
      answer: {
        de: 'Ja, die Rodelbahn Rodlhütte ist beleuchtet — hier könnt ihr auch nach Sonnenuntergang noch eine Runde drehen.',
        en: 'Yes, the Rodlhütte run is floodlit — you can still take a run there after sunset.',
      },
    },
    {
      question: {
        de: 'Wo kann man in Pertisau einen Rodel ausleihen?',
        en: 'Where can you rent a toboggan in Pertisau?',
      },
      answer: {
        de: 'Direkt bei der Rodlhütte, bei Sport Wöll in Pertisau oder an der Talstation der Karwendelbergbahn, wo es zwei Rodelverleihe gibt.',
        en: 'Directly at the Rodlhütte, at Sport Wöll in Pertisau or at the valley station of the Karwendel cable car, where there are two rental shops.',
      },
    },
  ],
  closing: {
    de: 'Egal ob die große Fahrt vom Zwölferkopf oder die gemütliche Runde zur Rodlhütte — Rodeln am Achensee ist für die ganze Familie ein Winterspaß. Wir sehen uns auf der Bahn!',
    en: 'Whether the long run from the Zwölferkopf or the cosy lap at the Rodlhütte — tobogganing on Lake Achensee is winter fun for the whole family. See you on the run!',
  },
  weiterlesen: [
    {
      label: { de: 'Skifahren & Snowboarden am Achensee', en: 'Skiing & snowboarding on Lake Achensee' },
      href: '/our-tips/skifahren-snowboarden',
    },
    { label: { de: 'Langlaufen am Achensee', en: 'Cross-country skiing on Lake Achensee' }, href: '/our-tips/langlaufen' },
    WINTERWANDERN,
    CHALETS,
  ],
  published: '2026-10-10',
};

const EISLAUFEN: TipsArticle = {
  slug: 'eislaufen',
  format: 'karten',
  category: 'winter',
  title: {
    de: 'Eislaufen am Achensee',
    en: 'Ice skating on Lake Achensee',
  },
  subtitle: {
    de: 'Vom Eislaufplatz beim Atoll Achensee bis zum Natureis in der Buchau in Maurach',
    en: 'From the ice rink at the Atoll Achensee to the natural ice at the Buchau in Maurach',
  },
  metaDescription: {
    de: 'Zwei Möglichkeiten zum Eislaufen am Achensee: der offizielle Eislaufplatz beim Atoll Achensee in Maurach mit Schuhverleih und Eisstockschießen sowie das Natureis in der Buchau — nur in kalten Wintern und auf eigene Gefahr.',
    en: 'Two ways to skate on Lake Achensee: the official ice rink at the Atoll Achensee in Maurach with skate rental and curling, and the natural ice at the Buchau — only in cold winters and at your own risk.',
  },
  heroImage: TIPPBILD('eislaufen/achensee-zugefroren-luftbild.jpeg'),
  heroImageAlt: {
    de: 'Luftbild des teils zugefrorenen Achensees im Winter bei Pertisau',
    en: 'Aerial view of the partly frozen Lake Achensee in winter near Pertisau',
  },
  authors: JULIA_UND_MADLEINE,
  readingMinutes: 4,
  intro: {
    de: 'Für eine Runde auf dem Eis habt ihr am Achensee zwei Möglichkeiten: den Eislaufplatz beim Atoll Achensee in Maurach, oder, wenn es richtig kalt wird, das Natureis direkt auf dem See in der Buchau.',
    en: 'For a turn on the ice you have two options on Lake Achensee: the ice rink at the Atoll Achensee in Maurach or, when it gets really cold, the natural ice on the lake itself at the Buchau.',
  },
  kurzUndKnapp: {
    de: 'Der Eislaufplatz beim Atoll Achensee ist die sichere, offizielle Variante mit Verleih und Einkehr direkt daneben. Das Natureis auf der Buchau gibt’s nur in kalten Wintern und immer nur auf eigene Gefahr.',
    en: 'The ice rink at the Atoll Achensee is the safe, official option, with rental and somewhere to warm up right next door. The natural ice at the Buchau only forms in cold winters and is always at your own risk.',
  },
  cards: [
    {
      slug: 'atoll-achensee',
      icon: '⛸️',
      eyebrow: { de: 'Die offizielle Variante', en: 'The official option' },
      title: { de: 'Eislaufplatz beim Atoll Achensee', en: 'Ice rink at the Atoll Achensee' },
      ankerLabel: { de: 'Atoll Achensee', en: 'Atoll Achensee' },
      text: {
        de: 'Der Eislaufplatz liegt direkt beim Atoll Achensee in Maurach, mitten im Freien mit Blick auf die Berge. Eislaufschuhe könnt ihr euch direkt vor Ort ausleihen (Größen 26 bis 45, je nach Verfügbarkeit), einen Helm bringt ihr am besten selbst mit. Neben Eislaufen gibt’s dort auch Eisstockschießen, und die SNACK-Bar sowie das Lagoon-Restaurant warten direkt nebenan zum Aufwärmen.',
        en: 'The rink is right next to the Atoll Achensee in Maurach, out in the open with a view of the mountains. You can rent skates on site (sizes 26 to 45, subject to availability); it is best to bring your own helmet. Besides skating there is also curling, and the snack bar and the Lagoon restaurant are right next door to warm up in.',
      },
      image: TIPPBILD('eislaufen/eislaufplatz-atoll-maurach.jpeg'),
      imageAlt: {
        de: 'Mutter und Kind mit Helm am Eislaufplatz beim Atoll Achensee in Maurach',
        en: 'Mother and child wearing helmets at the ice rink by the Atoll Achensee in Maurach',
      },
      infos: [
        { icon: '📍', text: { de: 'Achenseestraße 63, Maurach', en: 'Achenseestraße 63, Maurach' } },
        {
          icon: '☎',
          text: {
            de: '+43 5243 20320 (Öffnungszeiten & Verleih)',
            en: '+43 5243 20320 (opening hours & rental)',
          },
        },
        {
          icon: '⛸',
          text: {
            de: 'Verleih Eislaufschuhe vor Ort, Gr. 26–45 (nach Verfügbarkeit)',
            en: 'Skate rental on site, sizes 26–45 (subject to availability)',
          },
        },
        { icon: '🪖', text: { de: 'Helm bitte selbst mitbringen', en: 'Please bring your own helmet' } },
        {
          icon: '👶',
          text: {
            de: 'Kostenlose Fahrhilfen für Kinder direkt am Eis (nach Verfügbarkeit)',
            en: 'Free skating aids for children at the rink (subject to availability)',
          },
        },
        {
          icon: '🥌',
          text: {
            de: 'Eisstockschießen möglich, Stöcke sind im Preis inkludiert',
            en: 'Curling available, the stocks are included in the price',
          },
        },
      ],
      gutZuWissen: {
        de: 'Auch in Achenkirch gibt’s einen eigenen Eislaufplatz.',
        en: 'Achenkirch has its own ice rink too.',
      },
    },
    {
      slug: 'natureis-buchau',
      icon: '🧊',
      eyebrow: { de: 'Nur in kalten Wintern', en: 'Only in cold winters' },
      title: { de: 'Natureis auf der Buchau, Maurach', en: 'Natural ice at the Buchau, Maurach' },
      ankerLabel: { de: 'Natureis Buchau', en: 'Natural ice Buchau' },
      text: {
        de: 'Wenn der Achensee in der flachen Buchau in Maurach komplett zufriert, könnt ihr dort in manchen Wintern auch direkt auf dem See Schlittschuh laufen, eine ganz besondere, ruhige Art des Eislaufens, mitten in der Natur.',
        en: 'When Lake Achensee freezes over completely in the shallow Buchau at Maurach, in some winters you can skate directly on the lake — a very special, quiet way to skate, surrounded by nature.',
      },
      image: TIPPBILD('eislaufen/natureis-buchau-maurach.jpeg'),
      imageAlt: {
        de: 'Luftbild der zugefrorenen Buchau am Achensee bei Maurach im Winter',
        en: 'Aerial view of the frozen Buchau bay on Lake Achensee near Maurach in winter',
      },
      warnung: {
        title: { de: 'Nur auf eigene Gefahr!', en: 'At your own risk only!' },
        text: {
          de: 'Die Eisdicke wird nirgends offiziell geprüft oder freigegeben. Macht euch unbedingt selbst vor Ort ein Bild von der Eisqualität, bevor ihr aufs Eis geht, im Zweifel lieber die Finger davon lassen.',
          en: 'The ice thickness is nowhere officially checked or cleared. Always judge the condition of the ice for yourself before stepping onto it — and if in doubt, stay off.',
        },
      },
    },
  ],
  faq: [
    {
      question: {
        de: 'Braucht man eigene Schlittschuhe für den Eislaufplatz beim Atoll?',
        en: 'Do you need your own skates for the rink at the Atoll?',
      },
      answer: {
        de: 'Nein, ihr könnt euch Eislaufschuhe direkt vor Ort ausleihen (Größen 26 bis 45, je nach Verfügbarkeit). Einen Helm solltet ihr aber selbst mitbringen.',
        en: 'No, you can rent skates on site (sizes 26 to 45, subject to availability). You should bring your own helmet, though.',
      },
    },
    {
      question: {
        de: 'Wann friert der Achensee in der Buchau zu?',
        en: 'When does Lake Achensee freeze over at the Buchau?',
      },
      answer: {
        de: 'Das hängt jeden Winter von der Kälte ab und ist nicht garantiert. Es gibt keine offizielle Freigabe — geht im Zweifel lieber zum Eislaufplatz beim Atoll Achensee.',
        en: 'That depends on how cold each winter gets and is never guaranteed. There is no official clearance — if in doubt, head for the rink at the Atoll Achensee instead.',
      },
    },
    {
      question: {
        de: 'Gibt es noch einen anderen Eislaufplatz am Achensee?',
        en: 'Is there another ice rink on Lake Achensee?',
      },
      answer: {
        de: 'Ja, auch in Achenkirch gibt es einen eigenen Eislaufplatz.',
        en: 'Yes, Achenkirch has its own ice rink as well.',
      },
    },
  ],
  closing: {
    de: 'Ob auf dem Eislaufplatz beim Atoll oder ganz still auf dem zugefrorenen See — Eislaufen am Achensee ist jedes Mal ein kleines Winterabenteuer. Bleibt vorsichtig und habt Spaß!',
    en: 'Whether on the rink at the Atoll or in complete silence on the frozen lake — skating on Lake Achensee is a little winter adventure every time. Stay safe and have fun!',
  },
  weiterlesen: [
    { label: { de: 'Rodeln am Achensee', en: 'Tobogganing on Lake Achensee' }, href: '/our-tips/rodeln' },
    { label: { de: 'Langlaufen am Achensee', en: 'Cross-country skiing on Lake Achensee' }, href: '/our-tips/langlaufen' },
    WINTERWANDERN,
    CHALETS,
  ],
  published: '2026-10-10',
};

const RESTAURANTS: TipsArticle = {
  slug: 'restaurants-tiroler-kueche',
  format: 'liste',
  category: 'ganzjahr',
  title: {
    de: 'Restaurants & Tiroler Küche am Achensee',
    en: 'Restaurants & Tyrolean cuisine on Lake Achensee',
  },
  subtitle: {
    de: 'Unsere liebsten Lokale in Pertisau, Maurach und Achenkirch',
    en: 'Our favourite places in Pertisau, Maurach and Achenkirch',
  },
  metaDescription: {
    de: '18 Restaurants am Achensee mit Gehzeiten ab Pertisau: Tiroler Wirtshäuser, Fisch- und Wildspezialitäten, Pizza, gehobene Küche und Konditoreien in Pertisau, Maurach und Achenkirch.',
    en: '18 restaurants on Lake Achensee with walking times from Pertisau: Tyrolean inns, fish and game specialities, pizza, fine dining and patisseries in Pertisau, Maurach and Achenkirch.',
  },
  heroImage: TIPPBILD('restaurants/kaiserschmarrn-blick-achensee.jpeg'),
  heroImageAlt: {
    de: 'Kaiserschmarrn mit Preiselbeeren auf einer Almterrasse mit Blick auf den Achensee',
    en: 'Kaiserschmarrn with cranberries on an alpine terrace overlooking Lake Achensee',
  },
  authors: JULIA_UND_MADLEINE,
  readingMinutes: 7,
  intro: {
    de: 'Unsere liebsten Restaurants am Achensee liegen größtenteils direkt in Pertisau, ein paar Minuten zu Fuß vom MALIA entfernt — von gemütlichen Tiroler Wirtshäusern bis zu gehobener Küche mit Seeblick. Dazu kommen ein paar echte Favoriten in Maurach und Achenkirch, die eine kurze Autofahrt wert sind.',
    en: 'Most of our favourite restaurants on Lake Achensee are right in Pertisau, a few minutes’ walk from MALIA — from cosy Tyrolean inns to fine dining with a lake view. Add to that a few real favourites in Maurach and Achenkirch that are worth the short drive.',
  },
  kurzUndKnapp: {
    de: 'Typisch Tiroler Küche findet ihr fast überall am Achensee: Kaiserschmarrn, Schnitzel, Käsespätzle, dazu oft Fisch- und Wildspezialitäten, hausgemachte Kuchen und Strudel. Die meisten unserer liebsten Lokale erreicht ihr von MALIA aus zu Fuß, ein paar Favoriten in Maurach und Achenkirch sind eine kurze Autofahrt wert.',
    en: 'You will find typical Tyrolean cooking almost everywhere on Lake Achensee: Kaiserschmarrn, schnitzel, Käsespätzle, often alongside fish and game specialities, home-made cakes and strudel. Most of our favourite places are within walking distance of MALIA; a few favourites in Maurach and Achenkirch are worth the short drive.',
  },
  gruppen: [
    {
      slug: 'pertisau',
      eyebrow: { de: 'Pertisau', en: 'Pertisau' },
      title: {
        de: 'In Pertisau — zu Fuß vom MALIA erreichbar',
        en: 'In Pertisau — within walking distance of MALIA',
      },
      ankerLabel: { de: 'Pertisau', en: 'Pertisau' },
      intro: {
        de: 'Die meisten unserer Favoriten liegen in Pertisau selbst, ihr müsst also gar nicht erst ins Auto steigen.',
        en: 'Most of our favourites are in Pertisau itself, so you don’t even need to get in the car.',
      },
      image: TIPPBILD('restaurants/brettljause-tiroler-wirtshaus.jpeg'),
      imageAlt: {
        de: 'Brettljause mit Käse, Schinken und Brot auf einem Holztisch in einem Tiroler Wirtshaus',
        en: 'Tyrolean snack platter with cheese, ham and bread on a wooden table at an inn',
      },
      ctaDanach: true,
      eintraege: [
        {
          nummer: '01',
          name: {
            de: 'Hotel Restaurant & Konditorei Christina',
            en: 'Hotel Restaurant & Konditorei Christina',
          },
          entfernung: { de: '15 Gehmin.', en: '15 min walk' },
          text: {
            de: 'Hier gibt’s leckeren Kuchen, traditionelles Tiroler Essen modern gemacht, direkt am See, super schönes Ambiente innen mit einer traumhaften Terrasse und riesigem Garten.',
            en: 'Delicious cakes and traditional Tyrolean food done the modern way, right by the lake, with a lovely interior, a wonderful terrace and a huge garden.',
          },
        },
        {
          nummer: '02',
          name: { de: 'Gasthaus Dorfwirt', en: 'Gasthaus Dorfwirt' },
          entfernung: { de: '9 Gehmin.', en: '9 min walk' },
          text: {
            de: 'Im Sommer sitzt ihr hier in einem super schönen Biergarten mit tollem Ambiente und noch besserer traditioneller Küche, im Winter sitzt ihr in einem urigen Lokal.',
            en: 'In summer you sit in a lovely beer garden with great atmosphere and even better traditional cooking; in winter you sit in a snug, rustic dining room.',
          },
        },
        {
          nummer: '03',
          name: { de: 'Langlaufstüberl', en: 'Langlaufstüberl' },
          entfernung: { de: '9 Gehmin.', en: '9 min walk' },
          text: {
            de: 'Hier gibt’s traditionelle österreichische Küche mit ausgezeichneter Qualität. Highlight: Steakabend, ein Kamin mitten im Restaurant, selbst gebrautes Bier und Live-Musik — schaut gerne auf dem Instagram-Account achenseebier wegen der Events vorbei.',
            en: 'Traditional Austrian cooking of excellent quality. Highlights: steak night, a fireplace in the middle of the restaurant, home-brewed beer and live music — have a look at the achenseebier Instagram account for events.',
          },
        },
        {
          nummer: '04',
          name: { de: 'Entners Wirtshaus am See', en: 'Entners Wirtshaus am See' },
          entfernung: { de: '15 Gehmin.', en: '15 min walk' },
          text: {
            de: 'Hier gibt’s typisch Tiroler Küche, unter anderem natürlich Kaiserschmarrn, Schnitzel und Käsespätzle.',
            en: 'Typical Tyrolean cuisine, including of course Kaiserschmarrn, schnitzel and Käsespätzle.',
          },
        },
        {
          nummer: '05',
          name: { de: 'Don Danilos Restaurant & Pizza', en: 'Don Danilos Restaurant & Pizza' },
          entfernung: { de: '4 Gehmin.', en: '4 min walk' },
          text: {
            de: 'Hier gibt’s sehr gute Pizza und Blick auf den Golfplatz und das Bergpanorama — auch zum Mitnehmen.',
            en: 'Very good pizza with a view of the golf course and the mountain panorama — takeaway available too.',
          },
        },
        {
          nummer: '06',
          name: { de: 'Restaurant-Café Erika', en: 'Restaurant-Café Erika' },
          entfernung: { de: '3 Gehmin.', en: '3 min walk' },
          text: {
            de: 'Saisonale Gerichte, internationale und vegetarische Optionen sowie Tiroler Spezialitäten — und richtig gute Desserts. Reservierung empfohlen!',
            en: 'Seasonal dishes, international and vegetarian options as well as Tyrolean specialities — and really good desserts. Booking recommended!',
          },
        },
        {
          nummer: '07',
          name: {
            de: 'Essbar Pertisau (im Genusshotel Sonnenhof)',
            en: 'Essbar Pertisau (at the Genusshotel Sonnenhof)',
          },
          entfernung: { de: '8 Gehmin.', en: '8 min walk' },
          text: {
            de: 'Für alle, die gerne etwas gehobener essen gehen: erstklassiges Essen, von Chateaubriand bis Thunfischsteak und Hummerschaumsuppe — unbedingt im Vorhinein reservieren!',
            en: 'For anyone who likes to dine a little more upmarket: first-class food, from chateaubriand to tuna steak and lobster bisque — be sure to book in advance!',
          },
        },
        {
          nummer: '08',
          name: { de: 'Hotel Kristall', en: 'Hotel Kristall' },
          entfernung: { de: '9 Gehmin.', en: '9 min walk' },
          text: {
            de: 'Tiroler Spezialitäten und internationale, kreative Gerichte. Besonders schön: das Candle-Light-Dinner im Gewölbekeller (5-Gänge-Menü) und Weinverkostungen — am besten reservieren!',
            en: 'Tyrolean specialities and creative international dishes. Particularly lovely: the candle-light dinner in the vaulted cellar (five-course menu) and wine tastings — best to book!',
          },
        },
        {
          nummer: '09',
          name: { de: 'Seehotel Einwaller', en: 'Seehotel Einwaller' },
          entfernung: { de: '11 Gehmin.', en: '11 min walk' },
          text: {
            de: 'Hier gibt’s das beste selbstgemachte Eis am Achensee, im Sommer hat der Eistruck bei schönem Wetter bis 18:00 Uhr geöffnet.',
            en: 'The best home-made ice cream on Lake Achensee; in summer the ice-cream truck is open until 6 p.m. in fine weather.',
          },
        },
        {
          nummer: '10',
          name: {
            de: 'Hotel Das Karwendel (Wilderer Gourmetstube)',
            en: 'Hotel Das Karwendel (Wilderer Gourmetstube)',
          },
          entfernung: { de: '13 Gehmin.', en: '13 min walk' },
          text: {
            de: 'Berggastronomie mit Tiroler Spezialitäten und traditionellem Essen, dazu Panorama-Blick auf die Berge. Für einen besonderen Abend lohnt sich die Gourmetstube.',
            en: 'Mountain dining with Tyrolean specialities and traditional food, plus a panoramic view of the mountains. For a special evening the Gourmetstube is worth it.',
          },
        },
        {
          nummer: '11',
          name: { de: 'Entners Strandbar', en: 'Entners Strandbar' },
          entfernung: { de: '13 Gehmin.', en: '13 min walk' },
          text: {
            de: 'Tolle Strandbar mit stolzen Preisen, dafür sitzt ihr hier direkt am Wasser und könnt es euch gut gehen lassen.',
            en: 'A great beach bar with steep prices — but you sit right by the water and can really take it easy.',
          },
        },
        {
          nummer: '12',
          name: {
            de: 'Restaurant Laurentius im Fürstenhaus',
            en: 'Restaurant Laurentius at the Fürstenhaus',
          },
          entfernung: { de: '15 Gehmin.', en: '15 min walk' },
          text: {
            de: 'Feine Küche in elegantem Ambiente, direkt mit Blick auf den See.',
            en: 'Fine cuisine in an elegant setting, right by the lake.',
          },
        },
        {
          nummer: '13',
          name: { de: 'Gasthaus Hubertus', en: 'Gasthaus Hubertus' },
          entfernung: { de: '25 Gehmin.', en: '25 min walk' },
          text: {
            de: 'Tiroler Küche mit Schwerpunkt auf Fisch- und Wildspezialitäten, in urig-traditioneller Atmosphäre.',
            en: 'Tyrolean cuisine with a focus on fish and game specialities, in a rustic, traditional atmosphere.',
          },
        },
        {
          nummer: '14',
          name: { de: 'Almgasthaus Pletzachalm', en: 'Almgasthaus Pletzachalm' },
          entfernung: { de: '50 Gehmin. / 8 Automin.', en: '50 min walk / 8 min by car' },
          text: {
            de: 'Almgasthof im Gerntal, mitten im Karwendel-Naturpark. Zu Fuß 50 Minuten, mit dem Auto 8 Minuten (Maut erforderlich).',
            en: 'Alpine inn in the Gerntal valley, in the middle of the Karwendel nature park. 50 minutes on foot, 8 minutes by car (toll road).',
          },
        },
      ],
    },
    {
      slug: 'maurach',
      eyebrow: { de: 'Maurach', en: 'Maurach' },
      title: { de: 'In Maurach — mit dem Auto', en: 'In Maurach — by car' },
      ankerLabel: { de: 'Maurach', en: 'Maurach' },
      intro: {
        de: 'Diese zwei Lokale in Maurach sind uns eine kurze Autofahrt wert.',
        en: 'These two places in Maurach are worth the short drive for us.',
      },
      image: TIPPBILD('restaurants/gedeckter-tisch-tiroler-stube.jpeg'),
      imageAlt: {
        de: 'Gedeckter Tisch mit Weingläsern und geschnitzter Herz-Stuhllehne in einer Tiroler Stube',
        en: 'Table laid with wine glasses and a carved heart-shaped chair back in a Tyrolean parlour',
      },
      eintraege: [
        {
          nummer: '01',
          name: { de: 'La Vita è Bella', en: 'La Vita è Bella' },
          entfernung: { de: 'ca. 10 Automin.', en: 'approx. 10 min by car' },
          text: {
            de: 'Sehr authentischer Italiener — die Besitzer sind vor ein paar Jahren aus Italien an den Achensee gezogen und verzaubern seitdem all unsere Herzen mit feinster italienischer Küche, von Pasta über Meeresfrüchte findet ihr hier die besten italienischen Spezialitäten. Unser Tipp: probiert unbedingt das Vitello Tonnato!',
            en: 'A thoroughly authentic Italian — the owners moved to Lake Achensee from Italy a few years ago and have been winning our hearts ever since with the finest Italian cooking. From pasta to seafood, you will find the best Italian specialities here. Our tip: do try the vitello tonnato!',
          },
        },
        {
          nummer: '02',
          name: { de: 'Felderer Stadl', en: 'Felderer Stadl' },
          entfernung: { de: 'ca. 10 Automin.', en: 'approx. 10 min by car' },
          text: {
            de: 'Tiroler Spezialitäten, traditionelle österreichische Küche sowie internationale Gerichte.',
            en: 'Tyrolean specialities, traditional Austrian cooking and international dishes.',
          },
        },
      ],
    },
    {
      slug: 'achenkirch',
      eyebrow: { de: 'Achenkirch', en: 'Achenkirch' },
      title: { de: 'In Achenkirch — mit dem Auto', en: 'In Achenkirch — by car' },
      ankerLabel: { de: 'Achenkirch', en: 'Achenkirch' },
      intro: {
        de: 'Für einen Ausflug mit gutem Essen lohnt sich die Fahrt ans andere Ende vom Achensee.',
        en: 'For an outing with good food, the drive to the far end of Lake Achensee is worth it.',
      },
      image: '/pictures/kaiserschmarrn-tiroler-kueche.jpeg',
      imageAlt: {
        de: 'Frisch zubereiteter Kaiserschmarrn in der Pfanne auf einer Almhütte am Achensee',
        en: 'Freshly made Kaiserschmarrn in the pan at a mountain hut on Lake Achensee',
      },
      eintraege: [
        {
          nummer: '01',
          name: { de: 'Scholastika', en: 'Scholastika' },
          entfernung: { de: 'ca. 20 Automin.', en: 'approx. 20 min by car' },
          text: {
            de: 'Frische Fischspezialitäten, dazu vegane und vegetarische Optionen und hausgemachter Flammkuchen. Jung, hip und mit super Aussicht — auch toll für einen Kaffee am Nachmittag.',
            en: 'Fresh fish specialities plus vegan and vegetarian options and home-made tarte flambée. Young, hip and with a great view — lovely for an afternoon coffee too.',
          },
        },
        {
          nummer: '02',
          name: { de: 'SeeEck', en: 'SeeEck' },
          entfernung: { de: 'ca. 20 Automin.', en: 'approx. 20 min by car' },
          text: {
            de: 'Tiroler Küche und internationale Klassiker, mit wechselnden Tagesmenüs und hausgemachtem Gebäck bzw. Strudel.',
            en: 'Tyrolean cuisine and international classics, with changing daily menus and home-made pastries and strudel.',
          },
        },
      ],
    },
  ],
  faq: [
    {
      question: {
        de: 'Muss man in den Restaurants am Achensee reservieren?',
        en: 'Do you need to book a table at restaurants on Lake Achensee?',
      },
      answer: {
        de: 'Bei den gehobeneren Lokalen wie der Essbar Pertisau, Hotel Kristall oder Restaurant-Café Erika empfehlen wir, vorher zu reservieren. Bei den gemütlichen Wirtshäusern ist das meist nicht nötig.',
        en: 'At the more upmarket places such as Essbar Pertisau, Hotel Kristall or Restaurant-Café Erika we recommend booking ahead. At the cosy inns it is usually not necessary.',
      },
    },
    {
      question: {
        de: 'Gibt es am Achensee auch vegetarische oder vegane Optionen?',
        en: 'Are there vegetarian or vegan options on Lake Achensee?',
      },
      answer: {
        de: 'Ja, einige Lokale wie Restaurant-Café Erika oder Scholastika bieten explizit vegetarische und vegane Gerichte an.',
        en: 'Yes, several places such as Restaurant-Café Erika and Scholastika explicitly offer vegetarian and vegan dishes.',
      },
    },
    {
      question: {
        de: 'Welche typischen Tiroler Gerichte sollte man am Achensee probieren?',
        en: 'Which typical Tyrolean dishes should you try on Lake Achensee?',
      },
      answer: {
        de: 'Kaiserschmarrn, Schnitzel und Käsespätzle gehören zu den Klassikern — die findet ihr unter anderem bei Entners Wirtshaus am See.',
        en: 'Kaiserschmarrn, schnitzel and Käsespätzle are among the classics — you will find them at Entners Wirtshaus am See, among others.',
      },
    },
  ],
  closing: {
    de: '„Die meisten unserer Lieblingsrestaurants erreicht ihr von MALIA aus zu Fuß — ihr müsst also gar nicht erst ins Auto steigen, um richtig gut zu essen."',
    en: '“Most of our favourite restaurants are within walking distance of MALIA — so you don’t even need to get in the car to eat really well.”',
  },
  weiterlesen: [
    GUIDE_LINK,
    {
      label: { de: 'Wie viele Tage sollte man einplanen?', en: 'How many days should you plan?' },
      href: '/our-tips#faq',
    },
    {
      label: {
        de: 'Was kann man bei Regen am Achensee machen?',
        en: 'What can you do on Lake Achensee when it rains?',
      },
      href: '/our-tips#faq',
    },
    CHALETS,
  ],
  published: '2026-10-10',
};

export const TIPS_ARTICLES: TipsArticle[] = [
  WANDERN,
  SKIFAHREN,
  LANGLAUFEN,
  RODELN,
  EISLAUFEN,
  RESTAURANTS,
];

export function findArticle(slug: string): TipsArticle | undefined {
  return TIPS_ARTICLES.find((a) => a.slug === slug);
}

/** Blöcke eines Artikels — unabhängig vom Format, für Sprungmarken und Gliederung. */
export function articleBlocks(article: TipsArticle): { slug: string; label: Localized }[] {
  const aus = (b: { slug: string; title: Localized; ankerLabel?: Localized }) => ({
    slug: b.slug,
    label:
      b.ankerLabel ??
      ({ de: b.title.de.split(':')[0], en: b.title.en.split(':')[0] } as Localized),
  });
  return [
    ...(article.tours ?? []).map(aus),
    ...(article.cards ?? []).map(aus),
    ...(article.gruppen ?? []).map(aus),
  ];
}

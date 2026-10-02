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
        image: BILD('s1.jpg'),
        imageAlt: {
          de: 'Wanderin mit Blick auf den Achensee nahe dem MALIA Alpine Hideaway in Pertisau',
          en: 'Hiker looking out over Lake Achensee near MALIA Alpine Hideaway in Pertisau',
        },
        // articleSlug: 'wandern-bergsteigen' — wird gesetzt, sobald der Artikel steht
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
        image: BILD('slidersetting1/5.jpg'),
        imageAlt: {
          de: 'Gedeckter Tisch mit Wein am Abend im MALIA Alpine Hideaway in Pertisau am Achensee',
          en: 'Table laid with wine in the evening at MALIA Alpine Hideaway in Pertisau on Lake Achensee',
        },
      },
      {
        slug: 'museumswelt',
        title: { de: 'Achenseer Museumswelt', en: 'Achensee museum world' },
        teaser: {
          de: 'Geschichte und Tradition der Region zum Anfassen.',
          en: 'The history and traditions of the region, hands-on.',
        },
        // TODO: kein passendes Motiv im Bestand — Foto vom Kunden nötig.
        image: BILD('slidersettin2/4.png'),
        imageAlt: {
          de: 'Blick über Pertisau und den Achensee',
          en: 'View across Pertisau and Lake Achensee',
        },
      },
      {
        slug: 'staedtetrips',
        title: { de: 'Städtetrips ab dem Achensee', en: 'City trips from Lake Achensee' },
        teaser: {
          de: 'Innsbruck, Rattenberg oder Schwaz — schnell erreicht, lohnt sich immer.',
          en: 'Innsbruck, Rattenberg or Schwaz — quickly reached, always worth it.',
        },
        // TODO: kein passendes Motiv im Bestand — Foto vom Kunden nötig.
        image: BILD('DJI_0546.jpg'),
        imageAlt: {
          de: 'Luftaufnahme von Pertisau am Achensee im Winter',
          en: 'Aerial view of Pertisau on Lake Achensee in winter',
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
    de: 'Der ultimative Guide für Sommer, Winter, Kulinarik & Kultur',
    en: 'The ultimate guide to summer, winter, food & culture',
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
export const TIPS_FAQ: { question: Localized; answer: Localized }[] = [];

export const TIPS_FAQ_PENDING: Localized[] = [
  { de: 'Was kann man bei Regen am Achensee machen?', en: 'What can you do on Lake Achensee when it rains?' },
  { de: 'Wie viele Tage sollte man am Achensee einplanen?', en: 'How many days should you plan for Lake Achensee?' },
  { de: 'Welche Aktivitäten eignen sich für Familien?', en: 'Which activities are suitable for families?' },
];

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

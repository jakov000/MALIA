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
export const TIPS_FAQ: { question: Localized; answer: Localized }[] = [
  {
    question: {
      de: 'Was kann man bei Regen am Achensee machen?',
      en: 'What can you do on Lake Achensee when it rains?',
    },
    answer: {
      de: 'Bei Regen bietet der Achensee eine Reihe überdachter Ziele: das Atoll Achensee, die Achenseer Museumswelt, eine Fahrt mit der Achenseebahn und die Achenseeschifffahrt. Etwas weiter entfernt lohnen sich die Swarovski Kristallwelten und das Steinölmuseum Vitalberg. Und mit Regenjacke bleibt auch draußen einiges möglich — ein Spaziergang am See oder eine leichte Wanderung.',
      en: 'When it rains, Lake Achensee offers a number of indoor options: the Atoll Achensee leisure centre, the Achensee museum world, a ride on the Achensee railway and the Achensee boat service. A little further afield, the Swarovski Crystal Worlds and the Vitalberg stone oil museum are worth the trip. And with a rain jacket, plenty still works outdoors — a walk along the lake or an easy hike.',
    },
  },
  {
    question: {
      de: 'Wie viele Tage sollte man am Achensee einplanen?',
      en: 'How many days should you plan for Lake Achensee?',
    },
    answer: {
      de: 'Für einen ersten Eindruck vom Achensee reichen drei bis vier Tage: eine Wanderung, ein Tag am Wasser und Zeit für Pertisau selbst. Wer mehrere Touren gehen oder Aktivitäten am Berg und am See verbinden möchte, plant besser eine Woche ein. Das MALIA Alpine Hideaway in Pertisau ist ab 2 Nächten buchbar.',
      en: 'Three to four days are enough for a first impression of Lake Achensee: one hike, a day by the water and time for Pertisau itself. If you want to walk several of the tours or combine activities on the mountain and by the lake, plan for a week. MALIA Alpine Hideaway in Pertisau can be booked from 2 nights.',
    },
  },
  {
    question: {
      de: 'Welche Aktivitäten eignen sich für Familien?',
      en: 'Which activities are suitable for families?',
    },
    answer: {
      de: 'Familienfreundlich sind rund um Pertisau am Achensee die Wanderung zur Gramai-Alm (14,1 km, leicht), eine Fahrt mit der Achenseebahn oder der Achenseeschifffahrt, das Atoll Achensee sowie im Winter Rodeln und Eislaufen. Das MALIA Alpine Hideaway stellt Babybetten und Zustellbetten bereit; Kinder bis 14 Jahre sind von der Kurtaxe befreit.',
      en: 'Family-friendly options around Pertisau on Lake Achensee include the walk to the Gramai-Alm (14.1 km, easy), a ride on the Achensee railway or the Achensee boat service, the Atoll Achensee leisure centre and, in winter, tobogganing and ice skating. MALIA Alpine Hideaway provides cots and extra beds; children under 14 are exempt from the tourist tax.',
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

export type Tour = {
  slug: string;
  nummer: number;
  title: Localized;
  text: Localized;
  route: Localized;
  laenge: Localized;
  dauer: Localized;
  schwierigkeit: Localized;
  hoehenmeter: Localized;
  image: string;
  imageAlt: Localized;
  tipp: Localized;
  gutZuWissen?: Localized;
};

export type TipsArticle = {
  slug: string;
  category: TipsCategory;
  title: Localized;
  subtitle: Localized;
  /** Kurzfassung für Suchergebnisse und Antwortmaschinen. */
  metaDescription: Localized;
  heroImage: string;
  heroImageAlt: Localized;
  author: { name: string; role: Localized; readingMinutes: number };
  intro: Localized;
  kurzUndKnapp: Localized;
  tours: Tour[];
  comparison: {
    title: Localized;
    spalten: { tour: Localized; dauer: Localized; schwierigkeit: Localized; fuer: Localized };
    zeilen: { tour: Localized; dauer: Localized; schwierigkeit: Localized; fuer: Localized }[];
  };
  packliste: { title: Localized; items: Localized[] };
  weiterlesen: { label: Localized; href?: string }[];
  /** Veröffentlichung — fliesst ins Article-Markup. */
  published: string;
};

const WANDERN: TipsArticle = {
  slug: 'wandern-bergsteigen',
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
  author: {
    name: 'Julia',
    role: { de: 'unsere Wander-Expertin im Team', en: 'our hiking expert on the team' },
    readingMinutes: 6,
  },
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
      nummer: 1,
      title: {
        de: 'Bärenkopf: der beste Panoramablick über den Achensee',
        en: 'Bärenkopf: the best panoramic view over Lake Achensee',
      },
      text: {
        de: 'Der Bärenkopf ist für mich ein absolutes Muss, wenn ihr am Achensee wandern geht. Die Route führt von der Bergstation Zwölferkopf zum Bärenkopf und wieder zurück zur Bergstation. Der Aufstieg belohnt euch mit einem der schönsten Ausblicke der ganzen Region — der See liegt euch praktisch zu Füßen.',
        en: 'For me the Bärenkopf is an absolute must when you go hiking on Lake Achensee. The route runs from the Zwölferkopf mountain station to the Bärenkopf and back again. The climb rewards you with one of the finest views in the whole region — the lake lies practically at your feet.',
      },
      route: {
        de: 'Bergstation Zwölferkopf – Bärenkopf – Bergstation Zwölferkopf',
        en: 'Zwölferkopf mountain station – Bärenkopf – Zwölferkopf mountain station',
      },
      laenge: { de: '6,4 km', en: '6.4 km' },
      dauer: { de: '3:30 Std.', en: '3:30 hrs' },
      schwierigkeit: { de: 'Mittel', en: 'Moderate' },
      hoehenmeter: { de: '590 hm', en: '590 m' },
      image: BILD('slidersettin2/5.png'),
      imageAlt: {
        de: 'Panoramablick vom Gipfel auf den Achensee bei Pertisau',
        en: 'Panoramic view from the summit over Lake Achensee near Pertisau',
      },
      tipp: {
        de: 'Startet früh, dann habt ihr den Ausblick fast für euch allein — und das Licht ist am schönsten.',
        en: 'Set off early and you will have the view almost to yourselves — and the light is at its best.',
      },
    },
    {
      slug: 'gaisalmsteig',
      nummer: 2,
      title: {
        de: 'Gaisalmsteig: die Tour direkt am Wasser',
        en: 'Gaisalmsteig: the tour right by the water',
      },
      text: {
        de: 'Der Gaisalmsteig führt euch ganz nah am Wasser entlang zur Gaisalm und weiter bis nach Achenkirch, bevor es zurück nach Pertisau geht — landschaftlich einer meiner Favoriten. Wichtig: Festes Schuhwerk und Schwindelfreiheit solltet ihr mitbringen, an manchen Stellen wird’s schmal.',
        en: 'The Gaisalmsteig takes you right along the water to the Gaisalm and on to Achenkirch before returning to Pertisau — scenically one of my favourites. Important: bring sturdy footwear and a head for heights, as the path narrows in places.',
      },
      route: {
        de: 'Pertisau – Gaisalm – Achenkirch – Pertisau',
        en: 'Pertisau – Gaisalm – Achenkirch – Pertisau',
      },
      laenge: { de: '15,6 km', en: '15.6 km' },
      dauer: { de: '6 Std.', en: '6 hrs' },
      schwierigkeit: { de: 'Mittel – Schwindelfreiheit nötig', en: 'Moderate – a head for heights required' },
      hoehenmeter: { de: '230 hm', en: '230 m' },
      image: BILD('slidersettin2/4.png'),
      imageAlt: {
        de: 'Der Achensee mit türkisem Wasser und dem Ort Pertisau',
        en: 'Lake Achensee with turquoise water and the village of Pertisau',
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
      nummer: 3,
      title: {
        de: 'Gramai-Alm: Wandern mit Belohnung am Ziel',
        en: 'Gramai-Alm: hiking with a reward at the end',
      },
      text: {
        de: 'Diese Tour ist meine Empfehlung für alle, die Wandern und gutes Essen verbinden wollen. Der Weg führt über die Falzthurnalm zur Gramai-Alm, wo erstklassige Tiroler Küche auf euch wartet — die perfekte Belohnung nach dem Aufstieg.',
        en: 'This tour is my recommendation for anyone who wants to combine hiking with good food. The path leads via the Falzthurnalm to the Gramai-Alm, where first-class Tyrolean cuisine awaits — the perfect reward after the climb.',
      },
      route: {
        de: 'Pertisau – Falzthurnalm – Gramai-Alm – Pertisau',
        en: 'Pertisau – Falzthurnalm – Gramai-Alm – Pertisau',
      },
      laenge: { de: '14,1 km', en: '14.1 km' },
      dauer: { de: '4:30 Std.', en: '4:30 hrs' },
      schwierigkeit: { de: 'Leicht – familientauglich', en: 'Easy – family friendly' },
      hoehenmeter: { de: '290 hm', en: '290 m' },
      image: BILD('slidersettin2/1.jpg'),
      imageAlt: {
        de: 'Kühe auf der Alm im Karwendel bei Pertisau am Achensee',
        en: 'Cattle on the alpine pasture in the Karwendel near Pertisau on Lake Achensee',
      },
      tipp: {
        de: 'Reserviert an schönen Wochenenden vorher einen Tisch, die Alm ist beliebt.',
        en: 'Reserve a table in advance on fine weekends — the hut is popular.',
      },
    },
  ],
  comparison: {
    title: { de: 'Welche Tour passt zu euch?', en: 'Which tour suits you?' },
    spalten: {
      tour: { de: 'Tour', en: 'Tour' },
      dauer: { de: 'Dauer', en: 'Duration' },
      schwierigkeit: { de: 'Schwierigkeit', en: 'Difficulty' },
      fuer: { de: 'Am besten für', en: 'Best for' },
    },
    zeilen: [
      {
        tour: { de: 'Bärenkopf', en: 'Bärenkopf' },
        dauer: { de: '3:30 Std.', en: '3:30 hrs' },
        schwierigkeit: { de: 'Mittel', en: 'Moderate' },
        fuer: { de: 'den besten Ausblick', en: 'the best view' },
      },
      {
        tour: { de: 'Gaisalmsteig', en: 'Gaisalmsteig' },
        dauer: { de: '6 Std.', en: '6 hrs' },
        schwierigkeit: { de: 'Mittel', en: 'Moderate' },
        fuer: { de: 'Naturliebhaber am Wasser', en: 'nature lovers by the water' },
      },
      {
        tour: { de: 'Gramai-Alm', en: 'Gramai-Alm' },
        dauer: { de: '4:30 Std.', en: '4:30 hrs' },
        schwierigkeit: { de: 'Leicht', en: 'Easy' },
        fuer: { de: 'Familien & Genießer', en: 'families & epicures' },
      },
    ],
  },
  packliste: {
    title: { de: 'Packliste: Das gehört in euren Rucksack', en: 'Packing list: what belongs in your backpack' },
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
    { label: { de: 'MALIA Chalets mit Bergblick', en: 'MALIA chalets with mountain views' }, href: '/our-hideaways' },
  ],
  published: '2026-10-02',
};

export const TIPS_ARTICLES: TipsArticle[] = [WANDERN];

export function findArticle(slug: string): TipsArticle | undefined {
  return TIPS_ARTICLES.find((a) => a.slug === slug);
}

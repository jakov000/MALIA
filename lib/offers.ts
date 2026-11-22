// Erlebnisangebote (Pakete) und die beiden Rabatt-Specials der Seite
// /malia-specials. Die Pakete sind direkt mit Termin buchbar: feste Dauer,
// Festpreis inklusive Endreinigung und Kurtaxe, nur an Terminen, die ihre
// Regeln erlauben. Kalender (BookingForm) und Checkout-Route prüfen mit
// denselben Funktionen aus dieser Datei.
//
// Quelle der Texte: "Erlebnisangebote - MALIA.docx.pdf" der Gastgeberinnen
// (Stand November 2026). Die englischen Fassungen sind übersetzt.
import { SPECIALS } from '@/lib/data';
import { unitByName, type Unit } from '@/lib/property-facts';
import type { Locale } from '@/lib/seo';

type Localized = Record<Locale, string>;

/** Zimmername, wie er in Buchungen und Sperren gespeichert ist. */
export type OfferRoom = 'THE ALPINE HIDEAWAY' | 'THE RESIDENCE' | 'THE RETREAT';

export type OfferRules = {
  /** Monate (1–12), in denen jede Nacht des Aufenthalts liegen muss. */
  months: number[];
  /** Jedes Jahr gesperrt, "MM-DD" bis "MM-DD", beide einschließlich. */
  closedEveryYear?: { from: string; to: string }[];
  /**
   * Keine Übernachtung von Freitag auf Samstag und von Samstag auf Sonntag –
   * Freitag geht nur als Abreisetag. Entweder immer oder in Zeiträumen
   * ("YYYY-MM-DD", beide einschließlich, bezogen auf die Nacht).
   */
  noFriSatNights?: 'always' | { from: string; to: string }[];
};

export type Offer = {
  slug: string;
  title: Localized;
  room: OfferRoom;
  nights: number;
  maxGuests: number;
  /** Festpreis in Euro, inklusive Endreinigung und Kurtaxe. */
  price: number;
  /** Preis pro Person bei voller Belegung, wie von den Gastgeberinnen angegeben. */
  pricePerPerson: number;
  /** Ein Satz aus dem Angebotstext für Kachel und Meta-Description. */
  teaser: Localized;
  description: Localized[];
  includes: Localized[];
  upgrade: { text: Localized; months: number[] };
  /** Spätere Abreise als die üblichen 10:00 Uhr, als Uhrzeit je Sprache. */
  lateCheckout?: Localized;
  rules: OfferRules;
  /** Foto der Gastgeberinnen. Fehlt es, zeigen Kachel und Detailseite einen Platzhalter. */
  image?: string;
  imageAlt?: Localized;
};

const KUEHLSCHRANK: Localized = {
  de: 'Ein Kühlschrank mit einer ersten Ausstattung aus der Region',
  en: 'A fridge with a first selection of regional produce',
};
const WEIN_ODER_PROSECCO: Localized = {
  de: 'Eine Flasche Wein oder Prosecco zum Anstoßen',
  en: 'A bottle of wine or prosecco to raise a glass',
};
const WILLKOMMENSKORB: Localized = {
  de: 'Liebevoller Willkommenskorb mit Nespresso-Kapseln und regionalen Produkten',
  en: 'A lovingly prepared welcome basket with Nespresso capsules and regional products',
};
const WELLNESS_PRIVAT: Localized = {
  de: 'Privater Wellnessbereich mit Sauna, Infrarotkabine und freistehender Badewanne',
  en: 'Private wellness area with sauna, infrared cabin and freestanding bathtub',
};
const OELE: Localized = {
  de: 'Ätherische Öle für den Saunaaufguss',
  en: 'Essential oils for sauna infusions',
};
const KAMIN: Localized = {
  de: 'Gemütlicher Kamin inklusive Holzvorrat',
  en: 'Cosy fireplace including a supply of firewood',
};
const SPIELE: Localized = {
  de: 'Gesellschaftsspiele für gemeinsame Abende',
  en: 'Board games for evenings together',
};
const WAESCHE: Localized = {
  de: 'Hochwertige Bettwäsche und Handtücher',
  en: 'High-quality bed linen and towels',
};
const REINIGUNG_KURTAXE: Localized = {
  de: 'Endreinigung und Kurtaxe inklusive',
  en: 'Final cleaning and tourist tax included',
};
const LATE_CHECKOUT: Localized = {
  de: 'Late Check-out am Abreisetag bis 13:00 Uhr',
  en: 'Late check-out on the day of departure until 1 p.m.',
};

const UPGRADE_FRUEHSTUECK: Localized = {
  de: 'In der Nebensaison laden euch Madleine und Julia an einem Morgen zum gemeinsamen Frühstück ins Hotel Christina ein.',
  en: 'In the off-season, Madleine and Julia invite you to breakfast together at Hotel Christina one morning.',
};

/** Erlaubte Monate der Pakete 1–5: Januar, März–Juni, September–November. */
const EINLOESEMONATE = [1, 3, 4, 5, 6, 9, 10, 11];
const NEUJAHR_GESPERRT = [{ from: '01-01', to: '01-09' }];
const NEBENSAISON = [4, 10, 11];

/** Fotos der Gastgeberinnen (November 2026), auf 2560 px verkleinert. */
const FOTO = (slug: string) => `/pictures/malia-specials/angebote/${slug}.jpeg`;

export const OFFERS: Offer[] = [
  {
    slug: 'alpenruhe-fuer-die-ganze-familie',
    image: FOTO('alpenruhe-fuer-die-ganze-familie'),
    imageAlt: { de: 'Familie mit zwei Kindern auf einem Wanderweg im Bergwald', en: 'Family with two children on a trail in the mountain forest' },
    title: { de: 'Alpenruhe für die ganze Familie', en: 'Alpine calm for the whole family' },
    room: 'THE ALPINE HIDEAWAY',
    nights: 3,
    maxGuests: 10,
    price: 2851.75,
    pricePerPerson: 286,
    teaser: {
      de: 'Gemeinsam ankommen, durchatmen und wertvolle Familienzeit genießen.',
      en: 'Arrive together, take a deep breath and enjoy precious family time.',
    },
    description: [
      {
        de: 'Gemeinsam ankommen, durchatmen und wertvolle Familienzeit genießen. Während die Kinder voller Neugier das Chalet erkunden, genießen die Großeltern ihren ersten Kaffee auf der Terrasse mit traumhaftem Blick auf die Bergwelt des Karwendels. Im MALIA – The Alpine Hideaway findet jede Generation ihren Platz und endlich bleibt Zeit für das, was im Alltag oft zu kurz kommt.',
        en: 'Arrive together, take a deep breath and enjoy precious family time. While the children curiously explore the chalet, the grandparents enjoy their first coffee on the terrace with a dreamlike view of the Karwendel mountains. At MALIA – The Alpine Hideaway every generation finds its place, and at last there is time for what so often falls short in everyday life.',
      },
      {
        de: 'Der Morgen beginnt mit einem gemütlichen Familienfrühstück und regionalen Köstlichkeiten. Danach? Vielleicht ein gemeinsamer Ausflug an den türkisblauen Achensee, ein Abenteuer in den Bergen oder ein entspannter Nachmittag im Chalet. Abends wird gemeinsam gekocht, gespielt und gelacht. Und während die Kleinen schon träumen, genießen die Großen wohltuende Wellnessmomente in der privaten Sauna oder gemütliche Stunden am knisternden Kamin.',
        en: 'The morning begins with a leisurely family breakfast and regional delicacies. And then? Perhaps a trip together to the turquoise Lake Achensee, an adventure in the mountains or a relaxed afternoon in the chalet. In the evening you cook, play and laugh together. And while the little ones are already dreaming, the grown-ups enjoy soothing wellness moments in the private sauna or cosy hours by the crackling fireplace.',
      },
      {
        de: 'Drei Nächte voller Familienglück, gemeinsamer Abenteuer und kostbarer Erinnerungen, die die Familie verbinden.',
        en: 'Three nights full of family happiness, shared adventures and precious memories that bring the family together.',
      },
    ],
    includes: [
      { de: '3 Nächte im MALIA – The Alpine Hideaway für bis zu 10 Personen', en: '3 nights at MALIA – The Alpine Hideaway for up to 10 people' },
      KUEHLSCHRANK,
      { de: 'Eine Flasche Wein zur Ankunft', en: 'A bottle of wine on arrival' },
      WILLKOMMENSKORB,
      WELLNESS_PRIVAT,
      OELE,
      KAMIN,
      SPIELE,
      WAESCHE,
      REINIGUNG_KURTAXE,
    ],
    upgrade: {
      text: {
        de: 'In der Nebensaison laden euch Madleine und Julia an einem Tag eurer Wahl zu einer gemeinsamen Familienaktivität ein. Zur Auswahl stehen eine Alpakawanderung, ein Hop-on-Hop-off-Tagesticket für die Schifffahrt, ein Familienticket für das Erlebnisbad Atoll oder eine Berg- und Talfahrt für die gesamte Familie mit der Karwendelbergbahn.',
        en: 'In the off-season, Madleine and Julia invite you to a family activity on a day of your choice: an alpaca hike, a hop-on hop-off day ticket for the Achensee boats, a family ticket for the Atoll adventure pool or a return trip for the whole family on the Karwendel cable car.',
      },
      months: NEBENSAISON,
    },
    rules: {
      months: EINLOESEMONATE,
      closedEveryYear: NEUJAHR_GESPERRT,
      noFriSatNights: [
        { from: '2027-03-05', to: '2027-03-27' },
        { from: '2027-06-04', to: '2027-06-26' },
        { from: '2027-09-03', to: '2027-09-11' },
      ],
    },
  },
  {
    slug: 'bergtage-am-achensee',
    image: FOTO('bergtage-am-achensee'),
    imageAlt: { de: 'Vier Wandernde im herbstlichen Tal vor den Gipfeln des Karwendels', en: 'Four hikers in an autumn valley below the Karwendel peaks' },
    title: { de: 'Bergtage am Achensee', en: 'Mountain days on Lake Achensee' },
    room: 'THE RESIDENCE',
    nights: 3,
    maxGuests: 8,
    price: 2215.95,
    pricePerPerson: 277,
    teaser: {
      de: 'Raus aus dem Alltag, rein ins Bergglück!',
      en: 'Leave everyday life behind and step into mountain bliss!',
    },
    description: [
      {
        de: 'Raus aus dem Alltag, rein ins Bergglück! Schon beim Ankommen im MALIA empfängt euch die beeindruckende Bergwelt des Karwendels. Frische Bergluft, gemütliche Atmosphäre und endlich wieder Zeit für die Menschen, mit denen man die schönsten Momente teilen möchte.',
        en: 'Leave everyday life behind and step into mountain bliss! The moment you arrive at MALIA, the impressive Karwendel mountains welcome you. Fresh mountain air, a cosy atmosphere and finally time again for the people you want to share the best moments with.',
      },
      {
        de: 'Der Morgen beginnt mit einem ausgiebigen Frühstück mit regionalen Köstlichkeiten und einer Tasse Kaffee mit Blick auf die Berge. Danach? Vielleicht eine Wanderung durch die traumhafte Natur, ein Ausflug an den türkisblauen Achensee oder einfach die gemeinsame Zeit genießen. Zurück im MALIA warten wohltuende Saunagänge, entspannte Stunden in der freistehenden Badewanne und gemütliche Abende voller Lachen und guter Gespräche.',
        en: 'The morning begins with a hearty breakfast of regional delicacies and a cup of coffee with a view of the mountains. And then? Perhaps a hike through the stunning countryside, a trip to the turquoise Lake Achensee or simply enjoying your time together. Back at MALIA, soothing sauna sessions, relaxing hours in the freestanding bathtub and cosy evenings full of laughter and good conversation await you.',
      },
      {
        de: 'Drei Nächte voller Bergabenteuer, Entspannung und unvergesslicher gemeinsamer Erinnerungen.',
        en: 'Three nights full of mountain adventures, relaxation and unforgettable shared memories.',
      },
    ],
    includes: [
      { de: '3 Nächte im MALIA – The Residence für bis zu 8 Personen', en: '3 nights at MALIA – The Residence for up to 8 people' },
      KUEHLSCHRANK,
      WEIN_ODER_PROSECCO,
      WILLKOMMENSKORB,
      SPIELE,
      WELLNESS_PRIVAT,
      OELE,
      WAESCHE,
      REINIGUNG_KURTAXE,
    ],
    upgrade: {
      text: {
        de: 'In der Nebensaison laden euch Madleine und Julia an einem Tag eurer Wahl zu einer gemeinsamen Aktivität ein. Ihr könnt zwischen einer Berg- und Talfahrt mit der Karwendelbergbahn, einer Berg- und Talfahrt mit der Rofanseilbahn oder einem gemeinsamen Frühstück im Hotel Christina wählen.',
        en: 'In the off-season, Madleine and Julia invite you to a shared activity on a day of your choice: a return trip on the Karwendel cable car, a return trip on the Rofan cable car or a breakfast together at Hotel Christina.',
      },
      months: NEBENSAISON,
    },
    rules: { months: EINLOESEMONATE, closedEveryYear: NEUJAHR_GESPERRT, noFriSatNights: 'always' },
  },
  {
    slug: 'zweisamkeit-am-achensee',
    image: FOTO('zweisamkeit-am-achensee'),
    imageAlt: { de: 'Paar beim Kaffee auf der Terrasse eines Gasthauses', en: 'Couple having coffee on the terrace of an inn' },
    title: { de: 'Zweisamkeit am Achensee', en: 'Time for two on Lake Achensee' },
    room: 'THE RETREAT',
    nights: 4,
    maxGuests: 2,
    price: 1018.3,
    pricePerPerson: 510,
    teaser: {
      de: 'Vier Nächte, die nur euch gehören.',
      en: 'Four nights that belong to you alone.',
    },
    description: [
      {
        de: 'Ankommen, durchatmen und den Alltag hinter sich lassen. Die Terrassentür öffnet sich, frische Bergluft strömt herein und vor euch erstreckt sich die beeindruckende Bergwelt des Karwendels. Im liebevoll gestalteten MALIA – The Retreat wartet euer ganz persönlicher Rückzugsort. Ein Ort, an dem die Zeit langsamer vergeht und endlich wieder Platz für die kleinen, besonderen Momente zu zweit ist.',
        en: 'Arrive, take a deep breath and leave everyday life behind. The terrace door opens, fresh mountain air flows in and the impressive Karwendel mountains stretch out before you. At the lovingly designed MALIA – The Retreat your very own hideaway awaits. A place where time passes more slowly and there is finally room again for the small, special moments together.',
      },
      {
        de: 'Der Morgen beginnt ohne Wecker, mit einer wohltuenden Regendusche und einer Tasse Kaffee auf der Terrasse. Während die ersten Sonnenstrahlen die Berge berühren, genießt ihr ein gemütliches Frühstück mit regionalen Köstlichkeiten, die Madleine und Julia bereits für euch vorbereitet haben.',
        en: 'The morning begins without an alarm clock, with a soothing rain shower and a cup of coffee on the terrace. As the first rays of sunshine touch the mountains, you enjoy a leisurely breakfast of regional delicacies that Madleine and Julia have already prepared for you.',
      },
      {
        de: 'Ob ein Spaziergang am türkisblauen Achensee, gemeinsame Stunden in den Bergen oder eine entspannte Auszeit im Wellnessbereich des nahegelegenen Hotel Christina – jeder Tag gehört ganz euch.',
        en: 'Whether a stroll along the turquoise Lake Achensee, hours together in the mountains or a relaxing break in the wellness area of the nearby Hotel Christina – every day belongs entirely to you.',
      },
      {
        de: 'Am Abend ein Glas Wein auf der Terrasse, die letzten Sonnenstrahlen auf den Gipfeln und der Lieblingsmensch an eurer Seite.',
        en: 'In the evening, a glass of wine on the terrace, the last rays of sunshine on the peaks and your favourite person by your side.',
      },
      {
        de: 'Vier Nächte, die nur euch gehören. Für all die Gespräche, das gemeinsame Lachen, die kleinen Augenblicke und das wunderschöne Gefühl, einander wieder einmal ganz nah zu sein.',
        en: 'Four nights that belong to you alone. For all the conversations, the shared laughter, the little moments and the wonderful feeling of being really close to each other once again.',
      },
    ],
    includes: [
      { de: '4 Nächte im MALIA – The Retreat für bis zu 2 Personen', en: '4 nights at MALIA – The Retreat for up to 2 people' },
      { de: 'Süße Überraschung für zwei', en: 'A sweet surprise for two' },
      {
        de: '4 Nachmittage im Wellnessbereich des Hotel Christina mit finnischer Sauna, Infrarotkabine und Kräuterdampfbad',
        en: '4 afternoons in the wellness area of Hotel Christina with Finnish sauna, infrared cabin and herbal steam bath',
      },
      LATE_CHECKOUT,
      KUEHLSCHRANK,
      WEIN_ODER_PROSECCO,
      WILLKOMMENSKORB,
      WAESCHE,
      REINIGUNG_KURTAXE,
    ],
    upgrade: { text: UPGRADE_FRUEHSTUECK, months: NEBENSAISON },
    lateCheckout: { de: '13:00', en: '1:00 PM' },
    rules: {
      months: EINLOESEMONATE,
      closedEveryYear: NEUJAHR_GESPERRT,
      noFriSatNights: [{ from: '2027-05-01', to: '2027-06-30' }],
    },
  },
  {
    slug: 'freundinnenzeit-am-achensee',
    image: FOTO('freundinnenzeit-am-achensee'),
    imageAlt: { de: 'Zwei Freundinnen bei einer Kaffeepause in den Bergen', en: 'Two friends taking a coffee break in the mountains' },
    title: { de: 'Freundinnenzeit am Achensee', en: "Girlfriends' getaway on Lake Achensee" },
    room: 'THE ALPINE HIDEAWAY',
    nights: 3,
    maxGuests: 10,
    price: 2851.75,
    pricePerPerson: 286,
    teaser: {
      de: 'Die Taschen stehen noch im Flur, da wird schon gelacht.',
      en: 'The bags are still in the hallway and the laughter has already begun.',
    },
    description: [
      {
        de: 'Die Taschen stehen noch im Flur, da wird schon gelacht. Die Vorfreude auf gemeinsame Tage steigt. Draußen erstrahlt die Bergwelt des Karwendels im Abendlicht, während drinnen euer ganz persönlicher Rückzugsort voller Gemütlichkeit auf euch wartet.',
        en: 'The bags are still in the hallway and the laughter has already begun. The anticipation of days together grows. Outside, the Karwendel mountains glow in the evening light, while inside your very own cosy hideaway is waiting for you.',
      },
      {
        de: 'Der Morgen beginnt mit einem ausgiebigen Frühstück mit regionalen Köstlichkeiten und Kaffee auf der Terrasse. Danach? Vielleicht ein Spaziergang zum türkisblauen Achensee, ein Ausflug in die Berge oder einfach gemeinsam die Seele baumeln lassen. Am Abend warten wohltuende Saunagänge, ein Glas Prosecco und stundenlange Gespräche am knisternden Kamin.',
        en: 'The morning begins with a hearty breakfast of regional delicacies and coffee on the terrace. And then? Perhaps a walk to the turquoise Lake Achensee, a trip into the mountains or simply unwinding together. In the evening, soothing sauna sessions, a glass of prosecco and hours of conversation by the crackling fireplace await.',
      },
      {
        de: 'Drei Nächte voller Lachen, Wellness, unvergesslicher Momente und Erinnerungen, über die ihr noch lange sprechen werdet.',
        en: 'Three nights full of laughter, wellness, unforgettable moments and memories you will be talking about for a long time.',
      },
    ],
    includes: [
      { de: '3 Nächte im MALIA – The Alpine Hideaway für bis zu 10 Personen', en: '3 nights at MALIA – The Alpine Hideaway for up to 10 people' },
      {
        de: 'Ein gefüllter Kühlschrank mit einer ersten Ausstattung aus der Region',
        en: 'A filled fridge with a first selection of regional produce',
      },
      WEIN_ODER_PROSECCO,
      WILLKOMMENSKORB,
      WELLNESS_PRIVAT,
      OELE,
      KAMIN,
      SPIELE,
      WAESCHE,
      REINIGUNG_KURTAXE,
    ],
    upgrade: { text: UPGRADE_FRUEHSTUECK, months: NEBENSAISON },
    rules: {
      months: EINLOESEMONATE,
      closedEveryYear: NEUJAHR_GESPERRT,
      noFriSatNights: [
        { from: '2027-03-05', to: '2027-03-27' },
        { from: '2027-06-04', to: '2027-06-26' },
        { from: '2027-09-01', to: '2027-09-11' },
      ],
    },
  },
  {
    slug: 'gemeinsam-durchatmen-am-achensee',
    image: FOTO('gemeinsam-durchatmen-am-achensee'),
    imageAlt: { de: 'Zwei Bergsteiger klatschen sich in der Abenddämmerung auf einem Gipfel ab', en: 'Two climbers high-fiving on a summit at dusk' },
    title: { de: 'Gemeinsam durchatmen am Achensee', en: 'Breathe out together on Lake Achensee' },
    room: 'THE RESIDENCE',
    nights: 4,
    maxGuests: 8,
    price: 2954.6,
    pricePerPerson: 370,
    teaser: {
      de: 'Ankommen, loslassen und einfach mal wieder gemeinsam durchatmen.',
      en: 'Arrive, let go and simply breathe out together again.',
    },
    description: [
      {
        de: 'Ankommen, loslassen und einfach mal wieder gemeinsam durchatmen. Im Kamin knistert das Feuer, durch die großen Fenster eröffnet sich ein traumhafter Blick auf die Bergwelt des Karwendels und plötzlich scheint der Alltag ganz weit weg.',
        en: 'Arrive, let go and simply breathe out together again. The fire crackles in the fireplace, the large windows open up a dreamlike view of the Karwendel mountains and suddenly everyday life seems very far away.',
      },
      {
        de: 'Der Morgen beginnt ganz entspannt mit einem gemütlichen Frühstück, regionalen Köstlichkeiten und einer Tasse Kaffee mit Blick auf die Berge. Danach? Vielleicht ein Spaziergang am Achensee, ein Ausflug in die Natur oder einfach ein Tag voller süßem Nichtstun. Am Nachmittag warten die wohltuende Wärme der privaten Sauna, entspannte Momente in der Infrarotkabine und ein heißes Bad in der freistehenden Badewanne. Und wenn draußen langsam die Sonne hinter den Bergen verschwindet, wird gemeinsam gekocht, gelacht und der Abend am knisternden Kamin genossen.',
        en: 'The morning begins at a relaxed pace with a leisurely breakfast, regional delicacies and a cup of coffee with a view of the mountains. And then? Perhaps a walk along Lake Achensee, an outing into nature or simply a day of sweet idleness. In the afternoon, the soothing warmth of the private sauna, relaxing moments in the infrared cabin and a hot bath in the freestanding bathtub await. And as the sun slowly disappears behind the mountains, you cook, laugh and enjoy the evening together by the crackling fireplace.',
      },
    ],
    includes: [
      { de: '4 Nächte im MALIA – The Residence für bis zu 8 Personen', en: '4 nights at MALIA – The Residence for up to 8 people' },
      KUEHLSCHRANK,
      WEIN_ODER_PROSECCO,
      WILLKOMMENSKORB,
      WELLNESS_PRIVAT,
      OELE,
      KAMIN,
      SPIELE,
      WAESCHE,
      REINIGUNG_KURTAXE,
    ],
    upgrade: { text: UPGRADE_FRUEHSTUECK, months: NEBENSAISON },
    rules: { months: EINLOESEMONATE, closedEveryYear: NEUJAHR_GESPERRT, noFriSatNights: 'always' },
  },
  {
    slug: 'golfglueck-am-achensee',
    image: FOTO('golfglueck-am-achensee'),
    imageAlt: { de: 'Golferin beim Abschlag vor Bergkulisse', en: 'Golfer teeing off in front of the mountains' },
    title: { de: 'Golfglück am Achensee', en: 'Golf bliss on Lake Achensee' },
    room: 'THE RETREAT',
    nights: 4,
    maxGuests: 2,
    price: 1103.3,
    pricePerPerson: 552,
    teaser: {
      de: 'Vier Nächte, zwei Menschen und die Berge immer im Blick.',
      en: 'Four nights, two people and the mountains always in view.',
    },
    description: [
      {
        de: 'Vier Nächte, zwei Menschen und die Berge immer im Blick. Der Tag beginnt ganz ohne Eile. Schon am Morgen beginnt euer Tag mit einer Tasse Kaffee auf der Terrasse, frischer Bergluft und einem traumhaften Blick auf die Gipfel des Karwendels. Im MALIA genießt ihr die Ruhe und die Vorfreude auf unvergessliche Stunden zu zweit.',
        en: 'Four nights, two people and the mountains always in view. The day begins without any rush: a cup of coffee on the terrace, fresh mountain air and a dreamlike view of the Karwendel peaks. At MALIA you enjoy the peace and the anticipation of unforgettable hours together.',
      },
      {
        de: 'Nur wenige Minuten entfernt erwartet euch der Golf Achensee. Umgeben von majestätischen Bergen, grünen Fairways und einer atemberaubenden Naturkulisse wird jede Golfrunde zu einem besonderen Erlebnis. Hier geht es nicht nur um den perfekten Abschlag, sondern um die Freude am Spiel und die gemeinsame Zeit.',
        en: 'Just a few minutes away, Golf Achensee awaits you. Surrounded by majestic mountains, green fairways and breathtaking scenery, every round becomes a special experience. It is not just about the perfect tee shot, but about the joy of the game and the time together.',
      },
      {
        de: 'Nach einem erlebnisreichen Tag wartet im MALIA die wohlverdiente Entspannung. Ein Glas Wein auf der Terrasse, die letzten Sonnenstrahlen auf den Berggipfeln und das schöne Gefühl, den Tag ganz nach den eigenen Wünschen verbracht zu haben.',
        en: 'After an eventful day, well-earned relaxation awaits you at MALIA. A glass of wine on the terrace, the last rays of sunshine on the peaks and the lovely feeling of having spent the day exactly as you wished.',
      },
      {
        de: 'Vier Nächte voller Golfglück, romantischer Augenblicke und gemeinsamer Erinnerungen, die bleiben.',
        en: 'Four nights full of golf bliss, romantic moments and shared memories that last.',
      },
    ],
    includes: [
      { de: '4 Nächte im MALIA – The Retreat für bis zu 2 Personen', en: '4 nights at MALIA – The Retreat for up to 2 people' },
      {
        de: 'Zwei 18-Loch-Greenfees für ein gemeinsames Golferlebnis im Golf- & Landclub Achensee in Pertisau',
        en: 'Two 18-hole green fees for a round of golf together at Golf- & Landclub Achensee in Pertisau',
      },
      {
        de: '4 Nachmittage im Wellnessbereich des Hotel Christina mit finnischer Sauna, Infrarotkabine und Dampfbad',
        en: '4 afternoons in the wellness area of Hotel Christina with Finnish sauna, infrared cabin and steam bath',
      },
      LATE_CHECKOUT,
      KUEHLSCHRANK,
      WEIN_ODER_PROSECCO,
      WILLKOMMENSKORB,
      WAESCHE,
      REINIGUNG_KURTAXE,
    ],
    upgrade: {
      text: {
        de: 'Bei Einlösung im Oktober laden euch Madleine und Julia an einem Morgen zum gemeinsamen Frühstück ins Hotel Christina ein.',
        en: 'If you stay in October, Madleine and Julia invite you to breakfast together at Hotel Christina one morning.',
      },
      months: [10],
    },
    lateCheckout: { de: '13:00', en: '1:00 PM' },
    rules: { months: [5, 6, 9, 10] },
  },
];

/**
 * Die beiden Rabatt-Specials. Ihre Texte stehen (abgenommen) im
 * Specials-Namespace der Sprachdateien; hier nur Pfad und Bild.
 */
export const DISCOUNT_SPECIALS = [
  { slug: 'midweek-20-prozent', messageId: 1 },
  { slug: '7-gleich-6', messageId: 2 },
].map((s) => ({ ...s, image: SPECIALS.find((x) => x.id === s.messageId)!.img }));

export type DiscountSpecial = (typeof DISCOUNT_SPECIALS)[number];

export const findOffer = (slug: string | null | undefined) => OFFERS.find((o) => o.slug === slug);
export const findDiscountSpecial = (slug: string) => DISCOUNT_SPECIALS.find((s) => s.slug === slug);

export function offerUnit(offer: Offer): Unit {
  const unit = unitByName(offer.room);
  if (!unit) throw new Error(`Keine Einheit zu ${offer.room}`);
  return unit;
}

// ---------------------------------------------------------------------------
// Regeln
// ---------------------------------------------------------------------------

/** Darf eine Nacht ("YYYY-MM-DD", die Nacht beginnt an diesem Tag) im Paket liegen? */
export function offerNightAllowed(offer: Offer, night: string): boolean {
  const [y, m, d] = night.split('-').map(Number);
  const { months, closedEveryYear, noFriSatNights } = offer.rules;
  if (!months.includes(m)) return false;

  const monthDay = night.slice(5);
  if (closedEveryYear?.some((r) => r.from <= monthDay && monthDay <= r.to)) return false;

  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 5 = Freitag, 6 = Samstag
  if (weekday === 5 || weekday === 6) {
    if (noFriSatNights === 'always') return false;
    if (noFriSatNights?.some((p) => p.from <= night && night <= p.to)) return false;
  }
  return true;
}

/** Passt ein Aufenthalt (Liste seiner Nächte) zu Dauer und Regeln des Pakets? */
export const offerStayAllowed = (offer: Offer, nights: string[]) =>
  nights.length === offer.nights && nights.every((n) => offerNightAllowed(offer, n));

/** Gilt das Nebensaison-Upgrade? Maßgeblich ist der Anreisemonat. */
export const offerUpgradeApplies = (offer: Offer, arrival: string) =>
  offer.upgrade.months.includes(Number(arrival.slice(5, 7)));

// ---------------------------------------------------------------------------
// Darstellung
// ---------------------------------------------------------------------------

const MONATE: Record<Locale, string[]> = {
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const und = (locale: Locale) => (locale === 'de' ? ' und ' : ' and ');

function aufzaehlung(items: string[], locale: Locale) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')}${und(locale)}${items[items.length - 1]}`;
}

/** [1,3,4,5,6,9,10,11] → "Januar, März bis Juni und September bis November". */
export function monthList(months: number[], locale: Locale) {
  const sorted = [...months].sort((a, b) => a - b);
  const runs: number[][] = [];
  for (const m of sorted) {
    const last = runs[runs.length - 1];
    if (last && last[last.length - 1] === m - 1) last.push(m);
    else runs.push([m]);
  }
  const bis = locale === 'de' ? ' bis ' : ' to ';
  const teile = runs.flatMap((r) =>
    r.length >= 3 ? [`${MONATE[locale][r[0] - 1]}${bis}${MONATE[locale][r[r.length - 1] - 1]}`] : r.map((m) => MONATE[locale][m - 1])
  );
  return aufzaehlung(teile, locale);
}

/** "2027-03-05" bis "2027-03-27" → "5. bis 27. März 2027" bzw. "5 to 27 March 2027". */
function dateRange(from: string, to: string, locale: Locale) {
  const [fy, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = to.split('-').map(Number);
  const tag = (d: number, m: number, y?: number) =>
    locale === 'de'
      ? `${d}.${m ? ` ${MONATE.de[m - 1]}` : ''}${y ? ` ${y}` : ''}`
      : `${d}${m ? ` ${MONATE.en[m - 1]}` : ''}${y ? ` ${y}` : ''}`;
  const bis = locale === 'de' ? ' bis ' : ' to ';
  if (fy === ty && fm === tm) return `${tag(fd, 0)}${bis}${tag(td, tm, ty)}`;
  if (fy === ty) return `${tag(fd, fm)}${bis}${tag(td, tm, ty)}`;
  return `${tag(fd, fm, fy)}${bis}${tag(td, tm, ty)}`;
}

/** Die Buchungsregeln als Sätze für Detailseite und llms.txt. */
export function offerRulesText(offer: Offer, locale: Locale): string[] {
  const de = locale === 'de';
  const { months, closedEveryYear, noFriSatNights } = offer.rules;
  const nurSoFr = de
    ? 'nur von Sonntag bis Freitag – keine Übernachtung von Freitag auf Samstag oder von Samstag auf Sonntag'
    : 'only from Sunday to Friday – no nights from Friday to Saturday or from Saturday to Sunday';

  const saetze = [de ? `Buchbar für Aufenthalte im ${monthList(months, locale)}.` : `Available for stays in ${monthList(months, locale)}.`];

  for (const r of closedEveryYear ?? []) {
    const [fm, fd] = r.from.split('-').map(Number);
    const [, td] = r.to.split('-').map(Number);
    saetze.push(
      de
        ? `Ausgenommen jedes Jahr vom ${fd}. bis ${td}. ${MONATE.de[fm - 1]}.`
        : `Except ${fd} to ${td} ${MONATE.en[fm - 1]} each year.`
    );
  }

  if (noFriSatNights === 'always') {
    saetze.push(de ? `Aufenthalt ${nurSoFr}.` : `Stays ${nurSoFr}.`);
  } else if (noFriSatNights?.length) {
    const zeitraeume = aufzaehlung(
      noFriSatNights.map((p) => (de ? `vom ${dateRange(p.from, p.to, locale)}` : `from ${dateRange(p.from, p.to, locale)}`)),
      locale
    );
    const anfang = `${zeitraeume[0].toUpperCase()}${zeitraeume.slice(1)}`;
    saetze.push(de ? `${anfang}: Aufenthalt ${nurSoFr}.` : `${anfang}: stays ${nurSoFr}.`);
  }
  return saetze;
}

/** 2851.75 → "2.851,75 €" bzw. "€2,851.75" – ohne Intl, damit Server und Browser gleich formatieren. */
export function formatEuro(value: number, locale: Locale, decimals = 2) {
  const [ganz, rest] = value.toFixed(decimals).split('.');
  const gruppiert = ganz.replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'de' ? '.' : ',');
  const betrag = rest ? `${gruppiert}${locale === 'de' ? ',' : '.'}${rest}` : gruppiert;
  return locale === 'de' ? `${betrag} €` : `€${betrag}`;
}

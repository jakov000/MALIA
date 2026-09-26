import type { Locale } from '@/lib/seo';

/**
 * FAQ-Inhalte — einzige Quelle für den sichtbaren Seitentext UND das
 * FAQPage-Schema. Getrennte Pflege würde unweigerlich auseinanderlaufen.
 *
 * Redaktionsregeln aus der Kundenvorgabe (Infoblatt SEO/GEO):
 *  - Jede Antwort nennt Name und Ort ausgeschrieben, nie "wir" oder "das Chalet".
 *    KI-Systeme zitieren einzelne Absätze ohne Kontext.
 *  - Die eigentliche Antwort steht im ersten Satz.
 *  - Zahlen statt Adjektive: 8 Gehminuten, 5 Bäder, 12 Personen.
 *
 * Bewusst nicht übernommen aus der FAQ-Vorlage des Kunden:
 *  - Booking-Werte "Komfort 9,7" und "Gastgeber 10/10" — laut Infoblatt
 *    des Kunden selbst "nicht belegt und werden nicht mehr verwendet".
 *  - Zitat "12 von 10 Punkten" — ohne Vorname, Plattform und Monat, die
 *    das Infoblatt für jedes Zitat verlangt.
 */

export type FaqItem = { question: string; answer: string };
export type FaqSection = { title: string; items: FaqItem[] };

const DE: FaqSection[] = [
  {
    title: 'Buchung & Aufenthalt',
    items: [
      {
        question: 'Ab wie vielen Nächten kann man das MALIA Alpine Hideaway buchen?',
        answer:
          'Das MALIA Alpine Hideaway in Pertisau am Achensee ist ab 2 Nächten buchbar. In der Nebensaison im Frühling und Herbst ist ein Aufenthalt teilweise bereits ab 1 Nacht möglich.',
      },
      {
        question: 'Für wie viele Personen ist das MALIA Alpine Hideaway geeignet?',
        answer:
          'Das MALIA Alpine Hideaway in Pertisau am Achensee bietet Platz für bis zu 12 Personen: 10 in 5 Schlafzimmern mit jeweils eigenem Bad, zwei weitere auf Zustellbett oder Schlafcouch. Für kleinere Gruppen lassen sich die Einheiten The Residence für bis zu 8 Personen und The Retreat für 2 Personen auch einzeln buchen.',
      },
      {
        question: 'Welche Einheiten gibt es im MALIA Alpine Hideaway?',
        answer:
          'Das MALIA Alpine Hideaway in Pertisau am Achensee umfasst drei buchbare Einheiten. The Alpine Hideaway ist das gesamte Haus mit 400 m², 5 Schlafzimmern und 5 Bädern für bis zu 12 Personen. The Residence umfasst 360 m² mit 4 Schlafzimmern für bis zu 8 Personen und schließt den privaten Wellnessbereich ein. The Retreat ist ein offenes Studio mit 40 m² für 2 Personen.',
      },
      {
        question: 'Wann sind Check-in und Check-out?',
        answer:
          'Check-in im MALIA Alpine Hideaway in Pertisau am Achensee ist ab 15:00 Uhr, Check-out bis 10:00 Uhr.',
      },
      {
        question: 'Ist das MALIA Alpine Hideaway für Familien mit Kindern geeignet?',
        answer:
          'Ja. Das MALIA Alpine Hideaway in Pertisau am Achensee stellt Babybetten und Zustellbetten bereit und eignet sich für Familien und Mehrgenerationen-Urlaube. Kinder bis 14 Jahre sind von der Kurtaxe befreit.',
      },
      {
        question: 'Sind Hunde im MALIA Alpine Hideaway erlaubt?',
        answer:
          'Ja, Hunde sind im MALIA Alpine Hideaway in Pertisau am Achensee auf Anfrage willkommen. Eine kurze Nachricht vorab genügt, damit alles vorbereitet werden kann.',
      },
      {
        question: 'Was kostet ein Aufenthalt im MALIA Alpine Hideaway?',
        answer:
          'Das gesamte Haus ist im MALIA Alpine Hideaway in Pertisau am Achensee ab 800 € pro Nacht buchbar, The Residence ab 650 € und The Retreat ab 160 €. Bei Vollbelegung entspricht das rund 100 € pro Person und Nacht. Hinzu kommen die Endreinigung mit 160 €, 120 € beziehungsweise 45 € sowie die Kurtaxe von 3 € pro Person und Nacht.',
      },
      {
        question: 'Wie läuft die Buchung ab und wie hoch ist die Anzahlung?',
        answer:
          'Für eine Reservierung im MALIA Alpine Hideaway in Pertisau am Achensee wird eine Anzahlung von 30 % der Gesamtsumme fällig. Gebucht wird direkt über malia-alpine-hideaway.at, ohne Vermittlungsgebühr.',
      },
      {
        question: 'Welche Stornobedingungen gelten im MALIA Alpine Hideaway?',
        answer:
          'Im MALIA Alpine Hideaway in Pertisau am Achensee ist eine Stornierung bis 60 Tage vor Anreise kostenfrei. Bis 30 Tage vor Anreise fallen 50 % an, bis 14 Tage vor Anreise 70 %, bei weniger als 14 Tagen oder Nichtanreise 100 %. Die Stornokosten berechnen sich vom Gesamtpreis.',
      },
    ],
  },
  {
    title: 'Ausstattung',
    items: [
      {
        question: 'Hat das MALIA Alpine Hideaway eine private Sauna?',
        answer:
          'Ja. Das MALIA Alpine Hideaway in Pertisau am Achensee verfügt über einen privaten Wellnessbereich mit finnischer Sauna, der ausschließlich den Gästen zur Verfügung steht. Der Wellnessbereich gehört zur Einheit The Residence und ist damit auch bei der Buchung des gesamten Hauses enthalten.',
      },
      {
        question: 'Gibt es einen Whirlpool und einen Wellnessbereich?',
        answer:
          'Der private Wellnessbereich im MALIA Alpine Hideaway in Pertisau am Achensee umfasst eine finnische Sauna, eine Infrarotkabine und eine freistehende Badewanne. Ein Whirlpool folgt im Winter 2026/27.',
      },
      {
        question: 'Ist Frühstück oder Verpflegung inklusive?',
        answer:
          'Frühstück ist im MALIA Alpine Hideaway in Pertisau am Achensee nicht inklusive. Stattdessen erwartet Gäste ein Willkommenskorb mit regionalen Produkten und Kaffeekapseln, ein Weinkühlschrank, eine Teebar sowie Grundzutaten wie Salz, Pfeffer und Öle. Die voll ausgestattete Küche mit Dampfgarer und Espressomaschine ist auf Selbstverpflegung ausgelegt.',
      },
      {
        question: 'Gibt es WLAN und Parkplätze?',
        answer:
          'Das MALIA Alpine Hideaway in Pertisau am Achensee bietet kostenfreies Glasfaser-WLAN und kostenfreie Parkplätze direkt am Haus, teilweise überdacht. Auch die Anreise mit mehreren Autos ist damit möglich.',
      },
      {
        question: 'Gibt es eine Lademöglichkeit für Elektroautos?',
        answer:
          'Das MALIA Alpine Hideaway in Pertisau am Achensee hat keine eigene Wallbox. Die nächste öffentliche Ladestation liegt rund 200 Meter entfernt.',
      },
    ],
  },
  {
    title: 'Lage & Anreise',
    items: [
      {
        question: 'Wo genau liegt das MALIA Alpine Hideaway am Achensee?',
        answer:
          'Das MALIA Alpine Hideaway liegt in der Ländbergstraße 6 in 6213 Pertisau am Achensee in Tirol. Zum Seeufer sind es 8 Gehminuten, zur nächsten Skipiste und zur Bergbahn jeweils 2 Gehminuten.',
      },
      {
        question: 'Wie komme ich von München zum MALIA Alpine Hideaway?',
        answer:
          'Von München erreicht man das MALIA Alpine Hideaway in Pertisau am Achensee in rund 1,5 Stunden. Die schnellste Route führt über den Tegernsee und den Achenpass über die Grenze.',
      },
      {
        question: 'Wie komme ich ohne Auto zum MALIA Alpine Hideaway?',
        answer:
          'Der nächstgelegene Bahnhof zum MALIA Alpine Hideaway in Pertisau am Achensee ist Jenbach, rund 15 Minuten entfernt. Von dort fahren Linienbusse nach Pertisau, alternativ stehen am Bahnhof Taxis bereit.',
      },
      {
        question: 'Was kann man in Pertisau am Achensee im Sommer unternehmen?',
        answer:
          'Rund um das MALIA Alpine Hideaway in Pertisau am Achensee bietet der Sommer Wandern, Radfahren und Mountainbiken, Windsurfen, Kitesurfen, Segeln, Schwimmen, Stand-up-Paddeln, Klettern und Tauchen im Achensee. Auch Bootfahren ist möglich, und am Seeufer laden Restaurants zum Einkehren ein.',
      },
      {
        question: 'Was kann man in Pertisau am Achensee im Winter unternehmen?',
        answer:
          'Im Winter liegen rund um das MALIA Alpine Hideaway in Pertisau am Achensee Skifahren, Schneeschuhwandern, Langlaufen in den Tälern, Eislaufen und Winterspaziergänge nahe. Die nächste Skipiste und die Bergbahn sind jeweils 2 Gehminuten entfernt.',
      },
    ],
  },
  {
    title: 'Chalet statt Hotel',
    items: [
      {
        question: 'Was unterscheidet ein Chalet von einem Hotel am Achensee?',
        answer:
          'Im MALIA Alpine Hideaway in Pertisau am Achensee bewohnen Gäste das Haus exklusiv: eigene Küche, privater Wellnessbereich mit Sauna und Infrarotkabine sowie 5 Schlafzimmer mit jeweils eigenem Bad. Anders als im Hotel gibt es keine geteilten Bereiche und keine festen Essenszeiten, gleichzeitig hat jeder Gast seinen eigenen Rückzugsort.',
      },
    ],
  },
];

const EN: FaqSection[] = [
  {
    title: 'Booking & stay',
    items: [
      {
        question: 'What is the minimum stay at MALIA Alpine Hideaway?',
        answer:
          'MALIA Alpine Hideaway in Pertisau on Lake Achensee can be booked from 2 nights. In the low season in spring and autumn, stays of 1 night are sometimes possible.',
      },
      {
        question: 'How many guests does MALIA Alpine Hideaway sleep?',
        answer:
          'MALIA Alpine Hideaway in Pertisau on Lake Achensee sleeps up to 12 guests: 10 in 5 bedrooms each with its own bathroom, plus two more on an extra bed or sofa bed. Smaller groups can book the individual units The Residence for up to 8 guests and The Retreat for 2 guests.',
      },
      {
        question: 'Which units does MALIA Alpine Hideaway offer?',
        answer:
          'MALIA Alpine Hideaway in Pertisau on Lake Achensee comprises three bookable units. The Alpine Hideaway is the entire house with 400 m², 5 bedrooms and 5 bathrooms for up to 12 guests. The Residence covers 360 m² with 4 bedrooms for up to 8 guests and includes the private spa area. The Retreat is an open-plan studio of 40 m² for 2 guests.',
      },
      {
        question: 'What are the check-in and check-out times?',
        answer:
          'Check-in at MALIA Alpine Hideaway in Pertisau on Lake Achensee is from 15:00, check-out is until 10:00.',
      },
      {
        question: 'Is MALIA Alpine Hideaway suitable for families with children?',
        answer:
          'Yes. MALIA Alpine Hideaway in Pertisau on Lake Achensee provides cots and extra beds and suits families and multi-generation holidays. Children under 14 are exempt from the tourist tax.',
      },
      {
        question: 'Are dogs allowed at MALIA Alpine Hideaway?',
        answer:
          'Yes, dogs are welcome at MALIA Alpine Hideaway in Pertisau on Lake Achensee on request. A short message in advance is enough so that everything can be prepared.',
      },
      {
        question: 'What does a stay at MALIA Alpine Hideaway cost?',
        answer:
          'The entire house at MALIA Alpine Hideaway in Pertisau on Lake Achensee is available from €800 per night, The Residence from €650 and The Retreat from €160. At full occupancy this works out at around €100 per person per night. A cleaning fee of €160, €120 or €45 applies, plus a tourist tax of €3 per person per night.',
      },
      {
        question: 'How does booking work and how large is the deposit?',
        answer:
          'A reservation at MALIA Alpine Hideaway in Pertisau on Lake Achensee requires a deposit of 30% of the total amount. Bookings are made directly at malia-alpine-hideaway.at, with no booking fees.',
      },
      {
        question: 'What is the cancellation policy at MALIA Alpine Hideaway?',
        answer:
          'Cancellation at MALIA Alpine Hideaway in Pertisau on Lake Achensee is free of charge up to 60 days before arrival. Up to 30 days before arrival 50% applies, up to 14 days before arrival 70%, and with less than 14 days or no-show 100%. Cancellation fees are calculated on the total price.',
      },
    ],
  },
  {
    title: 'Amenities',
    items: [
      {
        question: 'Does MALIA Alpine Hideaway have a private sauna?',
        answer:
          'Yes. MALIA Alpine Hideaway in Pertisau on Lake Achensee has a private spa area with a Finnish sauna reserved exclusively for guests. The spa area belongs to The Residence unit and is therefore also included when the entire house is booked.',
      },
      {
        question: 'Is there a hot tub and a spa area?',
        answer:
          'The private spa area at MALIA Alpine Hideaway in Pertisau on Lake Achensee comprises a Finnish sauna, an infrared cabin and a freestanding bathtub. A hot tub follows in winter 2026/27.',
      },
      {
        question: 'Is breakfast or catering included?',
        answer:
          'Breakfast is not included at MALIA Alpine Hideaway in Pertisau on Lake Achensee. Instead, guests find a welcome basket with regional products and coffee capsules, a wine fridge, a tea bar and basics such as salt, pepper and oils. The fully equipped kitchen with steam oven and espresso machine is designed for self-catering.',
      },
      {
        question: 'Is there Wi-Fi and parking?',
        answer:
          'MALIA Alpine Hideaway in Pertisau on Lake Achensee offers free fibre Wi-Fi and free parking directly at the house, partly covered. Arriving with several cars is therefore no problem.',
      },
      {
        question: 'Is there an electric vehicle charging point?',
        answer:
          'MALIA Alpine Hideaway in Pertisau on Lake Achensee does not have its own wallbox. The nearest public charging point is around 200 metres away.',
      },
    ],
  },
  {
    title: 'Location & getting there',
    items: [
      {
        question: 'Where exactly is MALIA Alpine Hideaway on Lake Achensee?',
        answer:
          'MALIA Alpine Hideaway is located at Ländbergstraße 6 in 6213 Pertisau on Lake Achensee, Tyrol. The lakeshore is 8 minutes on foot, the nearest ski slope and the cable car 2 minutes each.',
      },
      {
        question: 'How do I get from Munich to MALIA Alpine Hideaway?',
        answer:
          'From Munich, MALIA Alpine Hideaway in Pertisau on Lake Achensee is about 1.5 hours away. The fastest route runs via Tegernsee and the Achenpass across the border.',
      },
      {
        question: 'How do I reach MALIA Alpine Hideaway without a car?',
        answer:
          'The nearest railway station to MALIA Alpine Hideaway in Pertisau on Lake Achensee is Jenbach, around 15 minutes away. Regional buses run from there to Pertisau, and taxis are available at the station.',
      },
      {
        question: 'What can you do in Pertisau on Lake Achensee in summer?',
        answer:
          'Around MALIA Alpine Hideaway in Pertisau on Lake Achensee, summer offers hiking, cycling and mountain biking, windsurfing, kitesurfing, sailing, swimming, stand-up paddling, climbing and diving in Lake Achensee. Boating is also possible, and restaurants along the shore invite you to stop by.',
      },
      {
        question: 'What can you do in Pertisau on Lake Achensee in winter?',
        answer:
          'In winter, skiing, snowshoeing, cross-country skiing in the valleys, ice skating and winter walks are all close to MALIA Alpine Hideaway in Pertisau on Lake Achensee. The nearest ski slope and the cable car are 2 minutes on foot.',
      },
    ],
  },
  {
    title: 'Chalet instead of hotel',
    items: [
      {
        question: 'What is the difference between a chalet and a hotel on Lake Achensee?',
        answer:
          'At MALIA Alpine Hideaway in Pertisau on Lake Achensee, guests have the house to themselves: their own kitchen, a private spa area with sauna and infrared cabin, and 5 bedrooms each with its own bathroom. Unlike a hotel there are no shared areas and no fixed meal times, while every guest still has their own retreat.',
      },
    ],
  },
];

export const FAQ_SECTIONS: Record<Locale, FaqSection[]> = { de: DE, en: EN };

/** Flache Liste aller Frage-Antwort-Paare — Grundlage für das FAQPage-Schema. */
export function faqItems(locale: Locale): FaqItem[] {
  return FAQ_SECTIONS[locale].flatMap((section) => section.items);
}

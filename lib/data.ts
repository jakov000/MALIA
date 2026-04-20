import { Suite, Special, RoomArea } from '@/types';

export const SUITES: Suite[] = [
    {
        title: "THE ALPINE HIDEAWAY",
        price: "800",
        persons: "2-10",
        sqm: "400",
        img: "/pictures/hideaways/kitchen2.JPG",
        href: "/our-hideaways/the-alpine-hideaway",
        description: "Das exklusive 400qm Alpen-Chalet bietet den ultimativen Luxus für Familien und Freunde mit spektakulärem Blick auf das Karwendelgebirge.",
        features: [
            "5 luxuriöse Schlafzimmer",
            "Privater Wellnessbereich (Sauna, Infrarot, freistehende Badewanne)",
            "Voll ausgestattete Designer-Küche & großer Esstisch",
            "Wohnzimmer mit Kamin & raumhohen Glasfronten",
            "270° Panorama-Terrasse",
            "Naturmaterialien & Calm-Luxury-Design"
        ]
    },
    {
        title: "THE RESIDENCE",
        price: "650",
        persons: "2-8",
        sqm: "360",
        img: "/pictures/hideaways/IMG_1289.jpeg",
        href: "/our-hideaways/the-residence",
        description: "Ein großzügiges Refugium für bis zu 8 Personen. Der perfekte Rückzugsort, der Privatsphäre und gemeinsame Wohlfühlzeiten elegant vereint.",
        features: [
            "4 luxuriöse Schlafzimmer mit Bergblick",
            "Private Sauna und Infrarotkabine",
            "Offener, gemütlicher Wohn- und Essbereich",
            "Voll ausgestattete Küche",
            "Private Panorama-Terrasse",
            "Ski- & Abstellraum mit Skischuhtrockner"
        ]
    },
    {
        title: "THE RETREAT",
        price: "160",
        persons: "2",
        sqm: "40",
        img: "/pictures/hideaways/IMG_1504.jpeg",
        href: "/our-hideaways/the-retreat",
        description: "Unser offenes Studio-Apartment für zwei – hell, ruhig und bewusst reduziert. Ein Hideaway für alle, die Nähe, Stille und Calm Luxury suchen.",
        features: [
            "Offenes Studio-Apartment (40 qm)",
            "Halboffener Schlafbereich mit Komfortbett",
            "Voll ausgestattete offene Küche",
            "Lichtdurchflutetes Milchglas-Bad mit Regendusche",
            "Private Terrasse",
            "Kostenlose, überdachte Parkplätze am Haus"
        ]
    }
];

export const SPECIALS: Special[] = [
    {
        id: 1,
        shortTitle: "20% Rabatt",
        subtitle: "Sonntag bis Donnerstag",
        img: "/pictures/malia-specials/IMG_3045.jpeg",
        title: "Sonntag bis Donnerstag bis zu 20% Rabatt",
        description: "Genieße das MALIA von Sonntag bis Freitag – wenn die Tage stiller sind und mehr Raum für Erholung bleibt. Kein Programm. Kein Müssen. Nur Weite, Wärme, Sauna, klare Luft.",
        highlight: "Dein Aufenthalt ist bis zu 20 % vergünstigt im Vergleich zur regulären Buchung.",
        features: [
            "5 Nächte in Deinem alpinen Luxus-Chalet",
            "1 Flasche Sekt zur Begrüßung",
            "Privater Wellnessbereich (Sauna, Infrarot, freistehende Badewanne)",
            "Hochwertige Naturkosmetik (z. B. Zirbe, Latschenkiefer, Lavendel)",
            "Überdachte Parkplätze direkt am Haus",
            "Kaminholz für gemütliche Abende",
            "Welcome Selection: kleine regionale Produkte (z. B. Tee, Kräuter, Honig)",
            "1 Gratis Leih-Rodel (im Winter nach Verfügbarkeit)",
            "2 Gratis Leih-E-Bikes und Räder (nach Verfügbarkeit; im Sommer)",
            "Kostenloser Verleih von Rucksäcken und Thermoskannen",
            "Herrliches Erholen im luxuriösen MALIA-Ambiente"
        ]
    },
    {
        id: 2,
        shortTitle: "7 = 6",
        subtitle: "1 Nacht geschenkt",
        img: "/pictures/malia-specials/IMG_1393.jpeg",
        title: "7 = 6 --> 1 Nacht geschenkt",
        description: "Bleib 7 Nächte im MALIA Alpine Hideaway und zahle nur 6.\n\nMehr Zeit für Ruhe, Natur und echte Erholung. Ein exklusives Luxus-Escape mit privater Wellness Area, liebevollen Details und einem Geschenk an alle, die wissen:\n\nEchte Erholung braucht Zeit.",
        highlight: "Inklusive im 7=6 Calm Escape",
        features: [
            "7 Nächte im alpinen Luxus-Chalet (1 Nacht geschenkt)",
            "1 Flasche Sekt zur Begrüßung",
            "Privater Wellnessbereich mit Sauna, Infrarot & freistehender Badewanne",
            "Hochwertige Naturkosmetik (z. B. Zirbe, Latschenkiefer, Lavendel)",
            "Kaminholz für gemütliche Abende",
            "Welcome Selection mit kleinen regionalen Produkten (z. B. Tee, Kräuter, Honig)",
            "Überdachte Parkplätze direkt am Haus",
            "1 Gratis Leih-Rodel (Winter, nach Verfügbarkeit)",
            "2 Gratis Leih-E-Bikes oder Räder (Sommer, nach Verfügbarkeit)",
            "Kostenloser Verleih von Rucksäcken & Thermoskannen",
            "Herrliches Erholen im luxuriösen MALIA-Ambiente"
        ]
    }
];

export const FEELING_AREAS: RoomArea[] = [
    {
        id: "wellness",
        title: "Wellness",
        subtitle: "Sauna & Infrarot",
        category: "Relax",
        images: [
            "/pictures/hideaways/alpine/Wellness/IMG_1289.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1283.jpeg",
            "/pictures/hideaways/alpine/Wellness/33f.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1569.JPG",
            "/pictures/hideaways/alpine/Wellness/IMG_0392.jpg",
            "/pictures/hideaways/alpine/Wellness/IMG_1310.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1111.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1296.jpeg"
        ]
    },
    {
        id: "room-1",
        title: "Zimmer 1",
        subtitle: "Private Retreat",
        category: "The Hideaway",
        images: [
            "/pictures/hideaways/alpine/Zimmer1/IMG_1151.jpeg",
            "/pictures/hideaways/alpine/Zimmer1/raumaufteilung11.PNG",
            "/pictures/hideaways/alpine/Zimmer1/IMG_3141.jpeg",
            "/pictures/hideaways/alpine/Zimmer1/11.jpg",
            "/pictures/hideaways/alpine/Zimmer1/IMG_0889.jpeg"
        ]
    },
    {
        id: "room-2",
        title: "The Lakeside",
        subtitle: "",
        category: "The Residence",
        images: [
            "/pictures/hideaways/alpine/Zimmer2/IMG_1386.jpeg",
            "/pictures/hideaways/alpine/Zimmer2/IMG_1393.jpeg",
            "/pictures/hideaways/alpine/Zimmer2/IMG_1402.HEIC",
            "/pictures/hideaways/alpine/Zimmer2/IMG_7432.jpeg",
            "/pictures/hideaways/alpine/Zimmer2/IMG_1620.JPG",
            "/pictures/hideaways/alpine/Zimmer2/IMG_1574.JPG",
            "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Sommer.jpeg"
        ]
    },
    {
        id: "room-3",
        title: "The Sunside",
        subtitle: "",
        category: "The Retreat",
        images: [
            "/pictures/hideaways/alpine/Zimmer3/15.jpg",
            "/pictures/hideaways/alpine/Zimmer3/16.jpg",
            "/pictures/hideaways/alpine/Zimmer3/18.jpg",
            "/pictures/hideaways/alpine/Zimmer3/IMG_1658.JPG",
            "/pictures/hideaways/alpine/Zimmer3/IMG_1801.JPG"
        ]
    },
    {
        id: "room-4",
        title: "The Mountainside",
        subtitle: "",
        category: "Alpine Loft",
        images: [
            "/pictures/hideaways/alpine/Zimmer4/21.jpg",
            "/pictures/hideaways/alpine/Zimmer4/22.jpg",
            "/pictures/hideaways/alpine/Zimmer4/zimmer maria.jpg",
            "/pictures/hideaways/alpine/Zimmer4/23.jpg",
            "/pictures/hideaways/alpine/Zimmer4/IMG_1447.jpeg",
            "/pictures/hideaways/alpine/Zimmer4/bad maria.png",
            "/pictures/hideaways/alpine/Zimmer4/bad maria 3.jpg"
        ]
    },
    {
        id: "room-5",
        title: "The Retreat",
        subtitle: "",
        category: "Summit Loft",
        images: [
            "/pictures/hideaways/alpine/Zimmer5/43.jpg",
            "/pictures/hideaways/alpine/Zimmer5/44.jpg",
            "/pictures/hideaways/alpine/Zimmer5/45.jpg",
            "/pictures/hideaways/alpine/Zimmer5/48.jpg",
            "/pictures/hideaways/alpine/Zimmer5/47.jpg"
        ]
    },
    {
        id: "kitchen",
        title: "Küche",
        subtitle: "Weinkühlschrank & Dampfgarer",
        category: "Living",
        images: [
            "/pictures/hideaways/alpine/Küche/IMG_6890.jpeg",
            "/pictures/hideaways/alpine/Küche/38.jpg",
            "/pictures/hideaways/alpine/Küche/40.jpg",
            "/pictures/hideaways/alpine/Küche/39.jpg",
            "/pictures/hideaways/alpine/Küche/41.jpg"
        ]
    },
    {
        id: "living",
        title: "Wohnzimmer",
        subtitle: "Feuer & Stein",
        category: "Community",
        images: [
            "/pictures/hideaways/alpine/Wohnzimmer/IMG_0972.jpeg",
            "/pictures/hideaways/alpine/Wohnzimmer/IMG_1022.jpeg",
            "/pictures/hideaways/alpine/Wohnzimmer/IMG_1200.jpeg",
            "/pictures/hideaways/alpine/Wohnzimmer/IMG_3169.jpeg",
            "/pictures/hideaways/alpine/Wohnzimmer/IMG_3205.jpeg",
            "/pictures/hideaways/alpine/Wohnzimmer/IMG_3209.jpeg",
            "/pictures/hideaways/alpine/Wohnzimmer/IMG_3217.jpeg"
        ]
    },
    {
        id: "outdoor",
        title: "Außenbereich",
        subtitle: "270° Panorama View",
        category: "Nature",
        images: [
            "/pictures/hideaways/alpine/HausAußen/haus sommer.png",
            "/pictures/hideaways/alpine/HausAußen/haus winter.jpeg",
            "/pictures/hideaways/alpine/HausAußen/haus winter 2.jpeg",
            "/pictures/hideaways/alpine/HausAußen/33f.jpeg"
        ]
    },
];

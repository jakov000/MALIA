import { Suite, Special, RoomArea } from '@/types';

export const SUITES: Suite[] = [
    {
        title: "THE ALPINE HIDEAWAY",
        price: "150",
        persons: "2-10",
        sqm: "400",
        img: "/pictures/hideaways/kitchen2.JPG"
    },
    {
        title: "THE RESIDENCE",
        price: "120",
        persons: "2-8",
        sqm: "360",
        img: "/pictures/hideaways/IMG_1289.jpeg"
    },
    {
        title: "THE RETREAT",
        price: "45",
        persons: "2",
        sqm: "40",
        img: "/pictures/hideaways/IMG_1504.jpeg"
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
        description: "Bleib 7 Nächte im MALIA Alpine Hideaway und zahle nur 6. Ein Geschenk an alle, die wissen, dass echte Erholung Zeit braucht.",
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
        id: "room-1",
        title: "Zimmer 1",
        subtitle: "Private Retreat",
        category: "The Hideaway",
        images: [
            "/pictures/hideaways/alpine/Zimmer1/IMG_0889.jpeg",
            "/pictures/hideaways/alpine/Zimmer1/IMG_1151.jpeg",
            "/pictures/hideaways/alpine/Zimmer1/IMG_3141.jpeg"
        ]
    },
    {
        id: "room-2",
        title: "Zimmer 2",
        subtitle: "Alpine Comfort",
        category: "The Residence",
        images: [
            "/pictures/hideaways/alpine/Zimmer2/IMG_1385 (1).jpeg",
            "/pictures/hideaways/alpine/Zimmer2/IMG_1393.jpeg",
            "/pictures/hideaways/alpine/Zimmer2/IMG_1406.jpeg",
            "/pictures/hideaways/alpine/Zimmer2/IMG_3045.jpeg",
            "/pictures/hideaways/alpine/Zimmer2/bad madleine 1.jpg",
            "/pictures/hideaways/alpine/Zimmer2/bad madleine 2.jpg",
            "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Sommer.jpeg",
            "/pictures/hideaways/alpine/Zimmer2/madleine_ausblick Winter 2.jpeg"
        ]
    },
    {
        id: "room-3",
        title: "Zimmer 3",
        subtitle: "Modern Stillness",
        category: "The Retreat",
        images: [
            "/pictures/hideaways/alpine/Zimmer3/Bad Juli 1.jpeg",
            "/pictures/hideaways/alpine/Zimmer3/IMG_1344.jpeg",
            "/pictures/hideaways/alpine/Zimmer3/IMG_1366.jpeg",
            "/pictures/hideaways/alpine/Zimmer3/IMG_1374.jpeg",
            "/pictures/hideaways/alpine/Zimmer3/bad julia 2.jpg",
            "/pictures/hideaways/alpine/Zimmer3/bad julia.jpg"
        ]
    },
    {
        id: "room-4",
        title: "Zimmer 4",
        subtitle: "Nature View",
        category: "Alpine Loft",
        images: [
            "/pictures/hideaways/alpine/Zimmer4/Bad Maria 1.jpg",
            "/pictures/hideaways/alpine/Zimmer4/IMG_1429.jpeg",
            "/pictures/hideaways/alpine/Zimmer4/IMG_1434.jpeg",
            "/pictures/hideaways/alpine/Zimmer4/IMG_1445.jpeg",
            "/pictures/hideaways/alpine/Zimmer4/IMG_1447.jpeg",
            "/pictures/hideaways/alpine/Zimmer4/bad maria 3.jpg",
            "/pictures/hideaways/alpine/Zimmer4/bad maria.png",
            "/pictures/hideaways/alpine/Zimmer4/zimmer maria.jpg"
        ]
    },
    {
        id: "room-5",
        title: "Zimmer 5",
        subtitle: "Skyline Suite",
        category: "Summit Loft",
        images: [
            "/pictures/hideaways/alpine/Zimmer5/804CEFBC-C6C4-45D1-98C6-CFB0DEE667B2.JPG",
            "/pictures/hideaways/alpine/Zimmer5/IMG_1470.jpeg",
            "/pictures/hideaways/alpine/Zimmer5/IMG_1473.jpeg",
            "/pictures/hideaways/alpine/Zimmer5/IMG_1501.jpeg",
            "/pictures/hideaways/alpine/Zimmer5/IMG_1504.jpeg"
        ]
    },
    {
        id: "wellness",
        title: "Wellness",
        subtitle: "Sauna & Infrarot",
        category: "Relax",
        images: [
            "/pictures/hideaways/alpine/Wellness/IMG_1111.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1283.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1289.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1296.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1310.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1327.jpeg",
            "/pictures/hideaways/alpine/Wellness/IMG_1385.jpeg"
        ]
    },
    {
        id: "kitchen",
        title: "Küche",
        subtitle: "Ehrliche Materialien",
        category: "Living",
        images: [
            "/pictures/hideaways/alpine/Küche/Esstisch.JPG",
            "/pictures/hideaways/alpine/Küche/IMG_1236 (1).jpeg",
            "/pictures/hideaways/alpine/Küche/IMG_1244.jpeg",
            "/pictures/hideaways/alpine/Küche/Küche 4.JPG",
            "/pictures/hideaways/alpine/Küche/küche 2.JPG",
            "/pictures/hideaways/alpine/Küche/küche 3.JPG"
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
        subtitle: "Karwendel-Blick",
        category: "Nature",
        images: [
            "/pictures/hideaways/alpine/HausAußen/haus sommer.png",
            "/pictures/hideaways/alpine/HausAußen/haus winter 2.jpeg",
            "/pictures/hideaways/alpine/HausAußen/haus winter.jpeg"
        ]
    },
];

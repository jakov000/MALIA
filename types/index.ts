export interface Suite {
    title: string;
    price: string;
    persons: string;
    sqm: string;
    img: string;
}

export interface Special {
    id: number;
    shortTitle: string;
    subtitle: string;
    img: string;
    title: string;
    description: string;
    highlight: string;
    features: string[];
}

export interface RoomArea {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    images: string[];
}

export interface FAQItem {
    question: string;
    answer: React.ReactNode;
}

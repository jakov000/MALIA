"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Sun, Map } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import PageFooter from '@/components/PageFooter';

export default function TheSettingContent() {
    return (
        <div className="bg-white">
            {/* --- 1. HERO SECTION --- */}
            <section className="relative h-screen w-full overflow-hidden bg-stone-900">
                <Image
                    src="/pictures/the%20setting/IMG_1406.jpeg"
                    fill
                    className="object-cover opacity-80"
                    alt="MALIA Setting"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="mb-6">
                        <svg width="60" height="80" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 10L85 60H70L95 90H60L85 110H15L40 90H5L30 60H15L50 10Z" stroke="white" strokeWidth="1.2" />
                        </svg>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, letterSpacing: "0.2em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} className="text-5xl md:text-7xl font-serif uppercase tracking-[0.4em] font-light">
                        The Setting
                    </motion.h1>
                </div>
            </section>

            {/* --- 2. WINTER AM ACHENSEE --- */}
            <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-sm uppercase tracking-[0.5em] text-gray-400 mb-6 font-bold flex justify-center items-center gap-4">
                        <Snowflake size={16} /> Winter am Achensee
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
                    <div className="space-y-8 text-gray-800 font-light leading-relaxed tracking-wide italic">
                        <p className="text-xl md:text-2xl font-serif">
                            Im Winter wird es am Achensee ruhig.<br />
                            Nicht leer – sondern angenehm still.<br />
                            Der Schnee dämpft die Geräusche, die Berge wirken näher, die Tage klarer.<br />
                            Ob eine Skitour, ein paar Schwünge auf der Piste, Langlaufen durch die Täler<br />
                            oder einfach ein Spaziergang durch den frischen Schnee – nichts muss, alles darf. Nach einem Tag draußen kommst du zurück ins MALIA.<br />
                            Ins Warme.
                        </p>
                        <p className="text-lg font-serif pt-8 border-t border-stone-100">
                            Du ziehst die Schuhe aus, machst es dir gemütlich, gehst in die Sauna<br />
                            oder sitzt einfach da und schaust nach draußen. Der Kamin knistert, draußen wird es langsam dunkel – und der Alltag ist plötzlich ganz weit weg.
                        </p>
                    </div>
                    <div className="aspect-[4/5] overflow-hidden relative shadow-sm bg-stone-100">
                        <Image
                            src="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80"
                            fill
                            className="object-cover"
                            alt="Winter"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Winter Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-sm text-gray-600 leading-relaxed tracking-wide">
                    <div className="space-y-4">
                        <h4 className="font-bold uppercase tracking-widest text-stone-800">Skitage ganz entspannt</h4>
                        <p>Ganz in der Nähe liegen mehrere Skigebiete, die Abwechslung ohne Trubel bieten. Pertisau eignet sich ideal für entspannte Familientage, das Rofan für längere Abfahrten mit Ausblick, Christlum in Achenkirch für alle, die gerne etwas sportlicher unterwegs sind. Skifahren, wie es sein soll: unkompliziert und nah.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold uppercase tracking-widest text-stone-800">Langlaufen am Achensee</h4>
                        <p>Rund um den Achensee erwarten dich Langlaufloipen, die sich ruhig durch Wiesen, Wälder und das Karwendel ziehen. Allein rund um Pertisau und im Naturschutzgebiet Karwendel stehen dir rund 80 Kilometer gespurte Loipen zur Verfügung. In der gesamten Achensee-Region findest du über 200 Kilometer Loipen – für klassischen Langlauf und Skating. Du gleitest durch verschneite Landschaften, hörst nur deinen Atem und den Schnee unter den Skiern.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold uppercase tracking-widest text-stone-800">Rodeln, wenn es dunkel wird</h4>
                        <p>Am Achensee warten mehrere Naturrodelbahnen – kurz oder lang, ruhig oder etwas rasanter. Viele davon sind beleuchtet und laden auch abends dazu ein, noch einmal hinauszugehen. Rodeln unter dem Sternenhimmel – einfach, ehrlich und überraschend schön.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold uppercase tracking-widest text-stone-800">Höher hinaus</h4>
                        <p>Wenn du Skitouren liebst, findest du im Rofan und im Karwendel ideale Bedingungen. Verschneite Gipfel, klare Linien im Schnee und Weitblick – ob allein oder begleitet. Oben angekommen wird es still, und genau dafür lohnt sich der Weg.</p>
                    </div>
                </div>

                {/* Der See im Winter */}
                <div className="mt-20 pt-20 border-t border-stone-100 text-center">
                    <SectionHeader
                        title="Der See im Winter"
                        subtitle=""
                        description="" // Using custom description below
                        centered={true}
                    />
                    <p className="max-w-3xl mx-auto text-gray-600 font-light leading-relaxed mb-12 -mt-10">
                        Auch im Winter ist der Achensee da. Still, weit und klar.<br />
                        Winterspaziergänge am Ufer, kalte Luft, glitzernder Schnee – ein Ort zum Durchatmen und Innehalten, mitten zwischen Berg und Wasser.
                    </p>
                    <Button href="/inquiry" variant="primary">
                        Hol dir dein Angebot für ruhigen Luxus im Winter
                    </Button>
                </div>
            </section>

            {/* --- 3. SOMMER AM ACHENSEE --- */}
            <section className="py-24 md:py-40 px-6 bg-stone-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-sm uppercase tracking-[0.5em] text-gray-400 mb-6 font-bold flex justify-center items-center gap-4">
                            <Sun size={16} /> Sommer am Achensee
                        </h2>
                        <p className="text-xl md:text-3xl font-serif text-stone-800 italic leading-relaxed max-w-4xl mx-auto">
                            Im Sommer zeigt sich der Achensee weit, klar und lebendig.<br />
                            Zwischen Bergen und See findest du Raum für Bewegung, Leichtigkeit und Tage, die sich nicht voll anfühlen – sondern frei.<br />
                            Du entscheidest, wie viel draußen es sein darf. Oder wie wenig.
                        </p>
                    </div>

                    {/* Sommer Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 text-sm text-gray-600 font-light leading-relaxed">
                        <div className="space-y-6">
                            <h4 className="font-bold text-stone-800 uppercase tracking-widest">Zeit fürs Draußensein</h4>
                            <p>Rund um das MALIA beginnt der Sommer direkt vor der Tür. Im Karwendel und im Rofangebirge führen Wanderwege durch Wälder, über Almen und hinauf zu stillen Aussichtspunkten. Mit jedem Schritt wird der Kopf freier, der Rhythmus ruhiger. Du gehst los, bleibst stehen, schaust. Kühlst die Füße im Bergbach, atmest die klare Luft – und merkst, wie wenig es braucht, um ganz im Moment zu sein.</p>
                            <a href="#" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors">→ Wanderführer Achensee entdecken</a>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-bold text-stone-800 uppercase tracking-widest">Golfen mit Weitblick</h4>
                            <p>Nur wenige Schritte vom MALIA entfernt liegt der Golf- & Landclub Achensee – der älteste Golfplatz Tirols, eingebettet zwischen Karwendel und See. Der 18-Loch-Platz in Pertisau verbindet Ruhe mit spielerischer Herausforderung. Sanftes Gelände, klare Linien und ein Ausblick, der jeden Abschlag begleitet.</p>
                            <a href="#" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-stone-300 pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors">→ Golfclub Achensee entdecken</a>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-stone-800 uppercase tracking-widest">Biken zwischen Berg & See</h4>
                            <p>Der Achensee gilt als stiller Favorit für Mountainbiker und E-Biker. Über 250 Kilometer beschilderte Strecken führen durch Karwendel, Rofan und das Vorkarwendel – von entspannten Seerunden bis zu anspruchsvollen Höhenmetern. Ob sportlich oder gemütlich mit E-Bike: Du bist unterwegs in einer Landschaft, die Weite schenkt, ohne laut zu sein.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-stone-800 uppercase tracking-widest">Laufen & Gehen</h4>
                            <p>Rund um den See findest du Wege fürs Laufen, Joggen und Nordic Walking. Mal flach am Wasser, mal fordernder Richtung Berge. Du bewegst dich durch offene Landschaften, hörst das Wasser, spürst den Untergrund – und läufst nicht gegen die Zeit, sondern mit ihr.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-stone-800 uppercase tracking-widest">Am Fels</h4>
                            <p>Rofan und Karwendel gehören zu den vielseitigsten Klettergebieten Tirols. Sportklettern, Klettersteige oder alpine Routen – alles eingebettet in eine Landschaft, die Respekt verlangt und belohnt. Für Einsteiger wie Geübte gibt es Routen, Kurse und geführte Touren. Der Blick von oben: weit. Der Moment: klar.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-stone-800 uppercase tracking-widest">Begegnungen, die entschleunigen</h4>
                            <p>Wer es noch ruhiger mag, erlebt die Landschaft bei einer Alpaka-Wanderung. Langsame Schritte, sanfte Tiere, offene Wege. Du gehst durch die Natur, begleitest – oder wirst begleitet – und nimmst eine Gelassenheit mit, die bleibt.</p>
                        </div>
                        <div className="md:col-span-2 space-y-4 pt-10 border-t border-stone-200">
                            <h4 className="font-bold text-stone-800 uppercase tracking-widest text-center">Mehr als nur ruhig</h4>
                            <p className="text-center max-w-3xl mx-auto italic">Manchmal darf es auch etwas mehr sein. Rafting, Canyoning, Paragleiten oder ein Flug mit dem AirRofan bringen Bewegung in den Sommer – immer gut begleitet und abgestimmt auf dein Können. Du entscheidest, wie hoch, wie schnell, wie intensiv. Oder ob du danach einfach wieder an den See gehst.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. INTERAKTIVE KARTE --- */}
            <section className="py-24 md:py-40 px-6 text-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <Map className="text-stone-300 mb-8" size={40} strokeWidth={1} />
                    <SectionHeader
                        title="Interaktive Karte"
                        subtitle="Orientierung, ganz entspannt"
                        description="Mit der interaktiven Karte der Achensee-Region findest du dich leicht zurecht – schon vor deiner Anreise und auch unterwegs. Du entdeckst (Winter)Wanderwege, Spaziergänge am See, Routen durchs Karwendel und Touren ins Rofangebirge – von ruhig bis anspruchsvoller."
                    />
                    <p className="text-gray-600 font-light leading-relaxed mb-10 -mt-10 max-w-3xl">
                        Alle Wege sind übersichtlich dargestellt, ergänzt durch hilfreiche Infos zu Streckenverlauf, Einkehrmöglichkeiten und Sehenswertem. So planst du deine Tage nach deinem Gefühl: spontan oder vorbereitet, aktiv oder ganz entspannt.
                    </p>
                    <Button
                        href="https://maps.achensee.com/v2/de/gdi_winter/2d/-1/default/11.274303742091197/47.474272478275765/11.689434077743158/-1/-1/"
                        variant="outline"
                        target="_blank"
                        className="flex items-center gap-2"
                    >
                        → Zur interaktiven Karte der Achensee-Region
                    </Button>
                </div>
            </section>

            {/* --- 5. ATOLL ACHENSEE --- */}
            <section className="py-24 md:py-40 px-6 bg-stone-50/30">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <SectionHeader title="Atoll Achensee" />
                    <div className="text-gray-600 font-light leading-relaxed space-y-4 -mt-10">
                        <p>Nur wenige Fahr-Minuten vom MALIA entfernt liegt das Atoll Achensee in Maurach. Große Glasflächen, klare Architektur und der Blick über den See prägen das Areal. Besonders eindrucksvoll ist der Infinity-Pool auf dem Dach, von dem aus sich der Achensee in seiner ganzen Länge zeigt.</p>
                        <p>Neben der Badelandschaft mit Sport- und Erlebnisbecken lädt das Penthouse Spa zum Saunieren und Entspannen ein. Verschiedene Saunen, Dampfbad, Ruhezonen und der Außenbereich am Dach schaffen Raum für Erholung – mit Aussicht.</p>
                        <p>Wer sich bewegen möchte, findet im Lakeside Gym, in der Boulderhalle oder im Sportbereich vielfältige Möglichkeiten. Alles großzügig angelegt, alles mit Blick auf die umliegende Landschaft.</p>
                        <p className="italic pt-6">Das Atoll ist kein Muss. Aber eine schöne Ergänzung – für Tage, an denen du Wasser, Wärme oder Bewegung suchst, bevor du wieder ins MALIA zurückkehrst.</p>
                    </div>
                    <Button
                        href="https://www.atoll-achensee.com/"
                        variant="outline"
                        target="_blank"
                    >
                        Atoll Achensee entdecken
                    </Button>
                </div>
            </section>

            {/* --- 5. FOOTER SECTION --- */}
            <PageFooter />
        </div>
    );
}

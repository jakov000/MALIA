import SectionHeader from "@/components/ui/SectionHeader";
import PageFooter from "@/components/PageFooter";

export default function Impressum() {
    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader title="Impressum" />
                <div className="prose prose-stone max-w-none font-light text-gray-600 space-y-6">
                    <div>
                        <h3 className="text-xl font-serif text-stone-800 mb-2">MALIA Alpine Hideaway</h3>
                        <p>
                            Familie Madleine & Julia Rieser<br />
                            Ländbergstraße 6<br />
                            6213 Pertisau am Achensee<br />
                            Österreich
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-stone-500 mb-2">Kontakt</h3>
                        <p>
                            Telefon: +43 664 1234567<br />
                            E-Mail: info@malia-alpine-hideaway.at<br />
                            Web: www.malia-alpine-hideaway.at
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-stone-500 mb-2">Informationen</h3>
                        <p>
                            UID-Nummer: ATU12345678<br />
                            Zuständige Kammer: Wirtschaftskammer Tirol<br />
                            Gerichtsstand: Schwaz
                        </p>
                    </div>

                    <div className="pt-8 border-t border-stone-100">
                        <p className="text-sm">Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten: <a href="http://ec.europa.eu/odr" className="underline">http://ec.europa.eu/odr</a>. Sie können allfällige Beschwerde auch an die oben angegebene E-Mail-Adresse richten.</p>
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    );
}

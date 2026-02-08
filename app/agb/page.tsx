import SectionHeader from "@/components/ui/SectionHeader";
import PageFooter from "@/components/PageFooter";

export default function AGB() {
    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader title="Allgemeine Geschäftsbedingungen" />
                <div className="prose prose-stone max-w-none font-light text-gray-600">
                    <p>Es gelten die Allgemeinen Geschäftsbedingungen der Hotellerie (AGBH 2006).</p>
                    <h3>Stornobedingungen</h3>
                    <ul>
                        <li>bis 60 Tage vor Anreise: kostenfrei</li>
                        <li>bis 30 Tage vor Anreise: 50% des Gesamtpreises</li>
                        <li>bis 14 Tage vor Anreise: 70% des Gesamtpreises</li>
                        <li>bei weniger als 14 Tagen, Nichtanreise oder vorzeitiger Abreise: 100% des Gesamtpreises</li>
                    </ul>
                    {/* Weitere AGB Punkte hier einfügen */}
                </div>
            </div>
            <PageFooter />
        </div>
    );
}

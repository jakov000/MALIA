import SectionHeader from "@/components/ui/SectionHeader";
import PageFooter from "@/components/PageFooter";

export default function Datenschutz() {
    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader title="Datenschutzerklärung" />
                <div className="prose prose-stone max-w-none font-light text-gray-600 space-y-8">
                    <p>Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).</p>

                    <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-2">Kontakt mit uns</h3>
                        <p>Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-2">Cookies</h3>
                        <p>Unsere Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Wir setzen <strong>keine</strong> Analyse- oder Tracking-Tools (wie Google Analytics) und keine Werbe-Cookies ein.</p>
                        <p className="mt-2">Es werden keine persönlichen Daten an Dritte zu Werbezwecken weitergegeben. Die Nutzung unserer Website ist daher ohne einen Cookie-Consent-Banner möglich.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-2">Ihre Rechte</h3>
                        <p>Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. In Österreich ist dies die Datenschutzbehörde.</p>
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    );
}

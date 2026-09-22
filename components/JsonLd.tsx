/**
 * Rendert strukturierte Daten als JSON-LD.
 * Server-Komponente — das Markup steht im ausgelieferten HTML und ist
 * damit auch für Crawler ohne JavaScript lesbar.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          // "<" maskieren, damit der Inhalt das script-Tag nicht vorzeitig schließen kann.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}

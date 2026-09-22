> **Überholt (22.09.2026).** Dieses Dokument war die interne Vorab-Schätzung. Verbindlich sind die
> Aufwandsschätzung [AS-2026-007](AS-2026-007-1.pdf) und der daraus abgeleitete
> [SEO-/GEO-Umsetzungsplan](seo-geo-umsetzungsplan.md). Bleibt als Audit-Historie erhalten.

# Aufwandsabschätzung: GEO-Optimierung (Generative Engine Optimization)

**Ziel:** Die MALIA-Website so aufbereiten, dass Antwortmaschinen (ChatGPT/SearchGPT, Perplexity, Google AI Overviews, Claude, Copilot) die Inhalte **crawlen, verstehen und als Quelle zitieren** können — statt sie zu überspringen. Klassisches SEO (Rankings) ist dabei die Pflicht, GEO die Kür: Antwortmaschinen brauchen zusätzlich strukturierte Entitäten, faktendichte Textblöcke und saubere Zitierbarkeit.

**Gesamtaufwand:** ~9–13 PT (Personentage, 8 h) für den Vollausbau · **Kern-Minimum ~4–5 PT** (Phasen 1–3) · danach ~0,5 PT/Monat Monitoring.

---

## Ausgangslage (Audit-Ergebnis, Stand heute)

| Bereich | Status | Bewertung |
|---|---|---|
| Framework | Next.js 16 App Router, next-intl (de/en), ~13 öffentliche Seiten × 2 Sprachen ≈ **26 URLs** | gute technische Basis |
| `sitemap.xml` | **fehlt komplett** | 🔴 |
| `robots.txt` | **fehlt komplett** (keine Regeln für GPTBot, PerplexityBot, ClaudeBot, Google-Extended) | 🔴 |
| Strukturierte Daten (JSON-LD) | **0 Vorkommen** im gesamten Projekt | 🔴 wichtigster Hebel |
| Metadata | Root-Layout mit **statischem deutschem** Title/Description für *beide* Sprachen; nur 4 von 13 Seiten haben eigene Metadata, ebenfalls hart auf Deutsch | 🔴 EN-Seiten tragen deutsche Beschreibungen |
| Canonical / hreflang | **fehlt** → DE- und EN-Version gelten als Duplicate Content | 🔴 |
| OpenGraph / Twitter Cards / `metadataBase` | **fehlt** | 🟠 |
| Produktions-Origin | `NEXT_PUBLIC_APP_URL="http://localhost:3000"` | 🔴 blockiert Sitemap + Canonicals |
| Rendering | fast alle Inhaltskomponenten sind `"use client"` mit framer-motion (Startzustand `opacity: 0`) | 🟠 Text steht zwar im SSR-HTML, ist für JS-arme LLM-Crawler aber schlecht extrahierbar |
| Bilder / alt-Texte | 28 Bild-Tags, 22 `alt`-Attribute — ca. 6 ohne, vorhandene generisch (`alt="MALIA Setting"`) | 🟠 |
| Inhalt | 516 i18n-Strings (~36 k Zeichen), überwiegend Marketing-Prosa | 🟠 kaum extrahierbare Fakten (Kapazitäten, m², Preise, Distanzen, Check-in) |
| FAQ-Bereich | **existiert nicht** | 🔴 stärkster einzelner GEO-Hebel |
| `llms.txt` | fehlt | 🟢 nice-to-have |

---

## Phase 1 — Technische Auffindbarkeit (~1–1,5 PT)

Ohne diese Phase ist jede weitere Maßnahme wirkungslos, weil die Bots die Seiten gar nicht sauber erfassen.

- [ ] Produktionsdomain festlegen, `NEXT_PUBLIC_APP_URL` in Vercel setzen, `metadataBase` im Layout
- [ ] `app/sitemap.ts` — alle 26 URLs inkl. `alternates.languages` (de/en)
- [ ] `app/robots.ts` — Sitemap-Verweis, Ausschluss von `/admin`, `/api`, `/success`; **explizite Allow-Regeln für GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Bingbot** (ohne diese Freigabe kein Zitat in den Antwortmaschinen)
- [ ] Canonical-URLs + hreflang (`de`, `en`, `x-default`) zentral über eine Helper-Funktion
- [ ] OpenGraph-/Twitter-Defaults + OG-Bild pro Seitentyp

## Phase 2 — Lokalisierte Metadata pro Seite (~1–1,5 PT)

- [ ] `generateMetadata()` statt statischem `export const metadata` auf allen 13 Seiten
- [ ] Titel/Descriptions als i18n-Keys nach `messages/de.json` + `messages/en.json` (26 Paare, textlich neu formuliert — antwortorientiert statt werblich)
- [ ] Seiten mit *fehlender* Metadata nachziehen: Startseite, Hideaway-Detailseiten (3), Buchung, Anfrage, Gutscheine, Rechtstexte

## Phase 3 — Strukturierte Daten / JSON-LD (~1,5–2 PT) ← größter GEO-Hebel

- [ ] Wiederverwendbare `<JsonLd>`-Komponente + zentrale Datenquelle für Objektfakten
- [ ] `LodgingBusiness` / `VacationRental` mit Adresse, Geokoordinaten, Telefon, `amenityFeature`, Check-in/-out, `numberOfRooms`, Bildern
- [ ] Je Einheit (`the-residence`, `the-retreat`, `the-alpine-hideaway`) eine `Accommodation` mit Kapazität, Fläche, Ausstattung, Belegung
- [ ] `Offer` / `priceRange` — sinnvollerweise **an die echte Preislogik gekoppelt** (siehe Abhängigkeit zur [Beds24-Migration](beds24-migration.md))
- [ ] `FAQPage` (setzt Phase 4 voraus), `BreadcrumbList`, `Organization`/`WebSite`
- [ ] Validierung: Google Rich Results Test + schema.org Validator, DE und EN

## Phase 4 — Inhaltsschicht für Antwortmaschinen (~2–3 PT) ← größte Unsicherheit

Antwortmaschinen zitieren Passagen, die eine konkrete Frage konkret beantworten. Reine Stimmungstexte werden nicht zitiert.

- [ ] Neue FAQ-Seite (de/en) mit 20–30 realen Gastfragen: Anreise/Transfer, Entfernung Achensee & Skigebiete, Haustiere, Kinder, Belegung, Mindestaufenthalt, Check-in-Zeiten, Parken, WLAN, Sauna, Kaution, Stornobedingungen
- [ ] Faktenblock je Hideaway (Fläche, Schlafzimmer, Betten, max. Personen, Ausstattung) als semantische Tabelle/Definitionsliste — die Struktur, die LLMs zuverlässig extrahieren
- [ ] Anreise-/Umgebungssektion mit **konkreten Zahlen** (km/Minuten zu Innsbruck, Flughafen, Achensee, Liften)
- [ ] Preistransparenz-Block (Saisonspannen, Nebenkosten, Ortstaxe)
- [ ] Jeweils englische Fassung (nicht Maschinenübersetzung — Zitierqualität)

> **Aufwandstreiber:** Wenn die Faktentexte vom Kunden geliefert werden, liegt die Phase am unteren Rand (~2 PT reine Integration). Müssen Inhalte recherchiert und geschrieben werden, eher 3 PT+.

## Phase 5 — Crawlbarkeit & semantische Struktur (~1–2 PT)

- [ ] Inhaltskomponenten aufteilen: Text server-seitig rendern, nur Animation/Interaktion im Client (`components/content/*`, Hideaway-Seiten)
- [ ] Animations-Startzustände so setzen, dass Kerntext auch ohne JS sichtbar/extrahierbar ist
- [ ] Heading-Hierarchie prüfen und begradigen (aktuell 7× h1, 26× h2, 26× h3)
- [ ] Alle `alt`-Texte beschreibend nachziehen (6 fehlen, Rest generisch)
- [ ] Interne Verlinkung mit sprechenden Ankertexten (Startseite verweist derzeit nur über die Navigation weiter)
- [ ] Core Web Vitals gegenchecken (Hero-Slideshow, Bildgrößen)

## Phase 6 — Entitäts- & Off-Site-Signale (~0,5–1 PT)

- [ ] `public/llms.txt` mit Kurzprofil, Kernfakten und Seitenverzeichnis
- [ ] NAP-Konsistenz (Name/Adresse/Telefon) zwischen Website, Google Business Profile, Airbnb, Booking.com — Antwortmaschinen gleichen Entitäten quellenübergreifend ab
- [ ] Google Business Profile & Bing Places vollständig pflegen
- [ ] Eintrag in relevanten Regionalverzeichnissen (Achensee Tourismus etc.)

## Phase 7 — Messung & Monitoring (~0,5–1 PT Setup)

- [ ] Google Search Console + Bing Webmaster Tools einrichten, Sitemap einreichen
- [ ] AI-Referrer-Tracking (chatgpt.com, perplexity.ai, claude.ai) im Analytics-Setup
- [ ] Server-Log-/Middleware-Auswertung: Besuchen die AI-Crawler die Seite tatsächlich?
- [ ] Baseline-Messung: definierter Fragenkatalog ("Chalet Achensee mieten", "Luxus-Hideaway Tirol für 8 Personen" …) manuell in ChatGPT/Perplexity/AI Overviews prüfen — vorher und 4–6 Wochen nachher

## Phase 8 — QA, Deploy, Abnahme (~0,5 PT)

- [ ] Validierung aller JSON-LD-Blöcke, hreflang-Prüfung, Lighthouse-Durchlauf
- [ ] Sichtprüfung DE/EN auf allen 13 Seiten
- [ ] Deploy + Sitemap-Einreichung + Indexierungskontrolle

---

## Zusammenfassung

| Ausbaustufe | Umfang | Aufwand |
|---|---|---|
| **Basis** — technisch sichtbar & maschinenlesbar | Phasen 1–3 + QA | **~4–5 PT** |
| **Empfohlen** — inkl. zitierfähiger Inhalte | Phasen 1–5, 7, 8 | **~8–10 PT** |
| **Vollausbau** — inkl. Off-Site-Entitäten | alle Phasen | **~9–13 PT** |
| **Laufend** | Monitoring, FAQ-Pflege, Nachsteuern | ~0,5 PT/Monat |

## Annahmen & Risiken

- **Produktionsdomain muss stehen** — ohne sie sind Sitemap, Canonicals und OG-Bilder nicht final baubar (Blocker für Phase 1).
- **Faktenzulieferung durch den Kunden** (Flächen, Kapazitäten, Preise, Distanzen, Hausregeln) ist der kritische Pfad für Phase 4. Ohne diese Daten liefert GEO wenig, weil genau sie zitiert werden.
- **Abhängigkeit Beds24:** Preis-Schema (`Offer`) sinnvoll erst nach/mit der [Beds24-Migration](beds24-migration.md) verdrahten, sonst doppelte Arbeit an der Preislogik.
- **Wirkung ist nicht sofort messbar:** Indexierung und Aufnahme in AI-Antworten dauern typisch 4–8 Wochen. Die Schätzung deckt die Umsetzung ab, nicht die Wirkungsdauer.
- Nicht enthalten: Content-Marketing/Blog, Linkaufbau, bezahlte Kanäle, Rechtstext-Überarbeitung, Redesign.

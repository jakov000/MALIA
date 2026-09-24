# SEO- & GEO-Umsetzungsplan — MALIA Alpine Hideaway

**Grundlage:** Aufwandsschätzung [AS-2026-007](AS-2026-007-1.pdf) vom 07.08.2026 (SolveTrail GbR), basierend auf dem SEO- & GEO-Audit vom 06.08.2026 · Gesamtscore **38/100**
**Umsetzungsstart:** 22.09.2026
**Umfang:** 9 Arbeitspakete · 43,333 Std. · SEO 1–4 kostenfrei (900 € netto), GEO 1–5 berechnet (750 € netto)
**Canonical-Host:** `https://malia-alpine-hideaway.at` (Apex, liefert die Seite aus). `www` leitet seit 22.09.2026 per 308 dorthin weiter — zuvor war die Domain gar nicht erreichbar.

---

## Ist-Zustand (verifiziert am 22.09.2026)

| Befund | Status |
|---|---|
| `robots.txt` / `app/robots.ts` | fehlt |
| `sitemap.xml` / `app/sitemap.ts` | fehlt |
| Canonical-Tags | fehlen auf allen Seiten |
| hreflang (DE/EN/x-default) | fehlt vollständig |
| Strukturierte Daten (JSON-LD) | 0 Vorkommen im Projekt |
| Seiten-Metadata | nur 4 von 16 Seiten; alle statisch **deutsch**, auch auf den EN-Routen |
| Open Graph / Twitter Cards / `metadataBase` | fehlen |
| `www`-Domain | nicht erreichbar (DNS/Zertifikat) |
| Bilder | 118 Dateien, **382 MB**; größte Einzeldatei 13,7 MB; über 40 Dateien > 500 KB |
| `llms.txt` | fehlt |
| FAQ-Markup | fehlt (Inhalte vorhanden, aber nur als Fließtext auf `/our-hideaways`) |

**Seiteninventar:** 15 indexierbare Routen × 2 Sprachen = **30 URLs**, plus die neue FAQ-Seite aus GEO 4 → **32 URLs**. `/success` wird bewusst auf `noindex` gesetzt.

---

## SEO 1 — Technisches Fundament & Indexierung (5 Std.) · Pos. 02 — ✅ Code fertig

Ziel: Die Seite wird überhaupt erst sauber crawl- und indexierbar. Alles Weitere baut darauf auf.

- [x] Zentrales SEO-Modul `lib/seo.ts`: Canonical-Host, Routen-Registry, Canonical-/hreflang-Builder
- [x] `app/robots.ts`: Sitemap-Verweis, `/admin`, `/api`, `/success` ausschließen, explizite Freigaben für 13 KI-Crawler (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended u. a.)
- [x] `app/sitemap.ts`: **30 URLs** mit `alternates.languages` (de/en/x-default) — verifiziert im Build
- [x] `metadataBase` + selbstreferenzierende Canonicals auf allen Seiten
- [x] hreflang-Paare DE ↔ EN inkl. `x-default` → DE
- [x] `www` → Apex per 301 (`next.config.ts`-Redirect als Code-Absicherung)
- [x] Interne Redirect-Links behoben (4 Stück: `Hero.tsx` ×2, `SuccessContent.tsx`, `InquiryContent.tsx`)
- [ ] ⚠️ **Zugang nötig:** Domain `www` im Vercel-Projekt hinterlegen + DNS-Eintrag; Sitemap in der Google Search Console einreichen; Indexabdeckung prüfen

## SEO 2 — Meta-Daten, Überschriften & Snippets (4 Std.) · Pos. 03 — ✅ weitgehend fertig

- [x] Alle 16 Seiten auf `generateMetadata()` umgestellt (sprachabhängig, über `lib/page-metadata.ts`)
- [x] 8 `"use client"`-Seiten in Server-Wrapper + `components/content/*Content.tsx` aufgeteilt — Voraussetzung dafür, dass sie überhaupt Metadata tragen können
- [x] Titel + Descriptions für alle 16 Seiten in DE **und** EN als `Seo`-Namespace in `messages/*.json` (Titel ≤ 60, Descriptions ≤ 160 Zeichen)
- [x] Open-Graph- und Twitter-Tags mit Hero-Visual, absolute Bild-URLs
- [x] `/success` auf `noindex, nofollow`
- [ ] Durchgängige H1-Struktur je Seite prüfen (aktuell 7× h1 über alle Seiten — offen)

## SEO 3 — Content-Ausbau der Kernseiten (4 Std.) · Pos. 04 — ✅ fertig

- [x] `/our-hideaways`: Vergleichstabelle der drei Einheiten als echte HTML-Tabelle plus Faktenbox → **4662 Zeichen** sichtbarer Text
- [x] `/the-feeling`: hatte **keinen einzigen Fließtext**, nur Bildunterschriften. Neu: Einführung zu Materialien und Raumkonzept, Beschreibungen zu Wellness, Küche, Wohnraum und Außenbereich, Abschluss mit Verweis auf FAQ und Buchung → 841 → **2319 Zeichen**
- [x] `/malia-specials`: Angebote als regulärer Seiteninhalt → 432 → **2171 Zeichen**
- [x] Jeweils vollständig in DE und EN
- [x] Interne Verlinkung zu FAQ und Buchung aus Feeling- und Specials-Seite

### Zwei versteckte Inhalte aufgedeckt und behoben

Beide Befunde erklären Lücken aus der [GEO-Baseline](geo-baseline-2026-09.md):

1. **Das „Gut zu wissen"-Akkordeon** auf `/our-hideaways` hing an `{isOpen && ...}` und renderte seinen Inhalt erst beim Aufklappen. Storno, Kurtaxe, Check-in-Zeiten und Haustierregelung standen damit **gar nicht im DOM**. Genau deshalb meldete Perplexity „keine explizite Haustierregelung auffindbar", obwohl die Angabe auf der Seite steht. Der Inhalt wird jetzt immer gerendert und nur per Höhe ein-/ausgeblendet.
2. **Die Angebotstexte auf `/malia-specials`** lagen vollständig in einem Modal, das nur bei Klick rendert. Die Seite lieferte 432 Zeichen aus und verbarg rund 2600.

> **Offen — Angaben der Gastgeberinnen nötig:** Die fünf Schlafzimmer auf `/the-feeling` (The Meadowside, The Lakeside, The Sunside, The Mountainside, The Retreat) haben bewusst keine Beschreibung bekommen. Ausblicke und Ausstattungsdetails je Zimmer lassen sich aus den Bestandsinhalten nicht belegen — ein bis zwei Sätze je Zimmer von euch, dann ergänze ich sie.

## SEO 4 — Bildoptimierung & Basis-Schema.org (2 Std.) · Pos. 05 — ✅ fertig

- [x] Basis-Schema.org: `LodgingBusiness` + `Organization` auf der Startseite, `Accommodation` (House/Apartment) + `BreadcrumbList` auf jeder Hideaway-Seite, DE und EN
- [x] Ausstattung **je Einheit** korrekt ausgezeichnet — The Retreat trägt bewusst keine Sauna/Kamin/Panoramaterrasse
- [x] `numberOfRooms` = 5 (Schlafzimmer des Hauses), keine Doppelzählung über die Einheiten
- [x] **Geo-Daten:** exakte Hauskoordinaten vom Kunden bestätigt und im Schema hinterlegt
- [x] **Bewertung:** `aggregateRating` mit 5,0 bei 10 Google-Bewertungen (Stand 22.09.2026). ⚠️ Muss dem Google-Profil entsprechen — bei neuen Bewertungen in `PROPERTY.rating` nachziehen.
- [x] **Bilder komprimiert: 382 MB → 57 MB (−85 %)**, alle 118 Dateien auf max. 2560 px längste Kante. Größte Einzeldatei von 13,1 MB auf 1,7 MB. Bei 25 Bildern war eine EXIF-Drehung hinterlegt, die jetzt fest eingerechnet ist.
- [x] `alt`-Texte: 21 Stück auf das Muster „Motiv + MALIA Alpine Hideaway + Pertisau am Achensee" umgestellt, inklusive der dynamischen in den Raum-Slideshows
- [x] Dediziertes OG-Bild 1200×630 (`/og/malia-alpine-hideaway.jpg`, 98 KB)
- [x] `sizes` bei neun `<Image fill>` ergänzt — ohne das lieferte Next.js auch für einen 220-px-Slot die volle Viewport-Breite
- [x] Favicon von 1600×1600 / 142 KB auf 64×64 / 2,4 KB
- [ ] Sprechende Dateinamen statt `IMG_3217.jpeg`, `_DSC4122.JPG` — **bewusst zurückgestellt**, siehe unten
- [ ] Verifikation per Google Rich-Results-Test (nach Deploy)

> **Zu den Dateinamen:** Das Infoblatt fordert sprechende Namen für „die 8 Hauptbilder". Umbenennen bedeutet, über 100 Referenzen im Code nachzuziehen — bei überschaubarem Ranking-Effekt, da Next.js die Dateien ohnehin über `/_next/image?url=…` ausliefert und der Originalname nach außen kaum sichtbar wird. Vorschlag: gemeinsam festlegen, welche acht Bilder das sind, dann gezielt umbenennen statt pauschal.
>
> **Verwaiste Bilder:** 7 Dateien (ursprünglich 57 MB) werden im Code nirgends referenziert — Überbleibsel aus `hero/hero` und `hero/hero4`, seit der Hero auf `pictures/heroneu/` umgestellt wurde. Können gelöscht werden, sobald du bestätigst.

## GEO 1 — KI-Baseline-Messung (1,5 Std.) · Pos. 06 — ✅ gemessen am 22.09.2026

- [x] Fragenkatalog mit 19 Fragen in drei Blöcken: [geo-baseline-fragenkatalog.md](geo-baseline-fragenkatalog.md)
- [x] Stichproben in ChatGPT, Perplexity und Gemini durchgeführt
- [x] Ergebnis dokumentiert: [geo-baseline-2026-09.md](geo-baseline-2026-09.md) — MALIA wird in allen 8 Empfehlungsfragen genannt, aber mit 7 belegten Falschangaben
- [ ] Wiederholungsmessung 4–6 Wochen nach dem Deploy mit demselben Katalog

## GEO 2 — `llms.txt` erstellen (1,5 Std.) · Pos. 07 — ✅ fertig

- [x] `app/llms.txt/route.ts`: Kernfakten (Lage, Ausstattung, Kapazität, Preise, Check-in, Kurtaxe, Anzahlung, Storno, Buchungsweg) maschinenlesbar, zweisprachig
- [x] Je Einheit ein eigener Faktenblock mit korrekter, einheitsspezifischer Ausstattung
- [x] Kuratiertes Verzeichnis aller 11 Kernseiten in DE und EN
- [x] Wird aus `lib/property-facts.ts` erzeugt — bleibt damit automatisch synchron zu Website und Schema.org

## GEO 3 — Strukturierter Faktenblock (3 Std.) · Pos. 08 — ✅ fertig

Ziel: `malia-alpine-hideaway.at` wird die faktenreichste MALIA-Quelle im Netz — statt achensee.com und Booking.

- [x] `components/PropertyFactBox.tsx` als Definitionsliste — eingebunden auf `/faq` und `/our-hideaways`, gespeist aus derselben Quelle wie Schema.org und llms.txt
- [x] Inhalte je Einheit, zusätzlich als Vergleichstabelle (`components/UnitComparison.tsx`):

| | The Hideaway | The Residence | The Retreat |
|---|---|---|---|
| Fläche | 400 m² | 360 m² | 40 m² |
| Personen | 2–10 | 2–8 | 2 |
| Schlafzimmer | 5 | 4 | Studio (halboffen) |
| Bäder | 4 | 3 (ensuite) | 1 |
| Preis ab | 800 € | 650 € | 160 € |
| Endreinigung | 150 € | 120 € | 45 € |

- [x] Gemeinsame Fakten: Check-in ab 15:00, Check-out bis 10:00, Kurtaxe 3 €/Person/Nacht (Kinder bis 14 frei), Haustiere auf Anfrage, kostenlose überdachte Parkplätze, Glasfaser-WLAN
- [x] Entfernungen mit konkreten Zahlen: Skipiste 2, Bergbahn 2, Achensee 8 Gehminuten, Bahnhof Jenbach ca. 15 Min., München ca. 1,5 Std., E-Ladestation ca. 200 m

## GEO 4 — FAQ-Bereich mit FAQPage-Schema (5 Std.) · Pos. 09 — ✅ fertig

- [x] Eigene FAQ-Route `/faq` (DE + EN) mit **20** Frage-Antwort-Paaren. Bewusst über den Rahmen von 10–15 hinaus, weil mehrere Fragen gezielt die in der Baseline belegten Falschangaben korrigieren.
- [x] Bestandsinhalte und die FAQ-Vorlage des Kunden übernommen und ausgebaut
- [x] Ergänzt: Einheitenstruktur, Mindestaufenthalt, Kinderbetten, Wellness-Zuordnung, Selbstverpflegung, E-Auto-Laden, Anreise ohne Auto, Sommer- und Winteraktivitäten
- [x] `FAQPage`-Markup mit allen 20 Paaren im ausgelieferten HTML verifiziert
- [ ] Gegenprüfung per Google Rich-Results-Test (erst nach dem Deploy möglich)
- [x] Verlinkt aus dem Footer sowie von `/the-feeling` und `/malia-specials`

## GEO 5 — Entitäts-Bereinigung über alle Plattformen (1,5 Std.) · Pos. 10 — 🟡 Website fertig, Profile offen

- [x] **Hauptrufnummer festgelegt:** +43 676 6207866 (Madleine), bestätigt am 24.09.2026. Auf der Website durchgezogen in Schema, llms.txt, Faktenbox, Navigations-Telefonlink und Formular-Platzhalter.
- [x] **Offizieller Name festgelegt:** „MALIA Alpine Hideaway" ohne Bindestrich. Die Bindestrich-Variante liegt als `alternateName` im Schema, damit beide Schreibweisen derselben Entität zugeordnet werden.
- [x] **PLZ bestätigt:** 6213 Pertisau. Die Angabe 6216 in der Aufwandsschätzung ist ein Tippfehler.
- [ ] Kategorie „Luxus-Chalet" auf allen Profilen
- [ ] Durchsetzen auf: Google Business Profile, achensee.com, alle OTA-Profile — **Website ist fertig**
- [ ] ⚠️ Im Google-Profil steht noch die Bindestrich-Schreibweise. Die Baseline zeigt, dass Gemini und Perplexity sie von dort übernehmen — daher dort angleichen.
- [ ] Korrektur-Anstoß beim Aggregator (Falschangabe „6-Zimmer-Villa mit einem Bad")
- [ ] Abschluss-Konsistenzprüfung über alle Plattformen
- [ ] ⚠️ **Zugänge nötig:** Google Business Profile, achensee.com-Partnerzugang, OTA-Accounts

---

## Umsetzungsreihenfolge

1. **SEO 1** — Fundament, ohne das nichts anderes wirkt
2. **SEO 2** — Metadata DE/EN
3. **SEO 4 (Schema-Teil)** — Basis-Schema.org, Voraussetzung für GEO 3
4. **GEO 2 + GEO 3** — llms.txt und Faktenblock
5. **GEO 4** — FAQ mit Markup
6. **SEO 3** — Content-Ausbau
7. **SEO 4 (Bild-Teil)** — Komprimierung, umfangreichste Einzelaufgabe
8. **GEO 1 + GEO 5** — Baseline-Messung und Entitäts-Bereinigung (extern)

## Nicht im Code umsetzbar — braucht Zugänge oder Kundenentscheidung

| Aufgabe | Paket | Benötigt |
|---|---|---|
| `www`-Domain reparieren | SEO 1 | Vercel-Projekt + DNS |
| Sitemap einreichen, Indexabdeckung prüfen | SEO 1 | Google Search Console |
| KI-Baseline-Messung | GEO 1 | ChatGPT/Perplexity/Gemini-Sitzungen |
| Hauptrufnummer festlegen | GEO 5 | Kundenentscheidung |
| PLZ 6213 vs. 6216 klären | GEO 5 | Kundenentscheidung |
| Profile korrigieren | GEO 5 | Google Business Profile, achensee.com, OTA-Logins |

## Nicht Teil dieser Umsetzung

Laufendes KI-Monitoring und fortlaufende SEO/GEO-Pflege sind Bestandteil des monatlichen Pflegemoduls (125 €/Monat, Erweiterung des bestehenden Supportvertrags).

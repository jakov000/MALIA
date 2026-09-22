# GEO-Baseline — Messung vom 22.09.2026

**Arbeitspaket:** GEO 1 aus [AS-2026-007](AS-2026-007-1.pdf)
**Gemessen:** vor dem Deploy der SEO-/GEO-Maßnahmen
**Tools:** Gemini, Perplexity, ChatGPT
**Fragenkatalog:** [geo-baseline-fragenkatalog.md](geo-baseline-fragenkatalog.md)

> Vergleichsmessung 4–6 Wochen nach dem Deploy mit demselben Katalog.

---

## Gesamtbild

**MALIA ist bereits deutlich sichtbarer als erwartet.** In den Empfehlungsfragen (Block A), bei denen die Marke *nicht* genannt wird, führen Gemini und Perplexity MALIA in **allen acht Fragen** — meist an erster Stelle. Das ist eine gute Ausgangslage und widerlegt die Erwartung aus dem Fragenkatalog, MALIA werde „kaum bis gar nicht genannt".

Das Problem liegt woanders: **Die Systeme kennen MALIA, geben es aber teilweise falsch wieder — und zitieren dabei fremde Quellen statt der eigenen Website.**

| Tool | Sichtbarkeit Block A | Faktentreue |
|---|---|---|
| **Gemini** | 8/8, überwiegend Position 1 | hoch — Einheiten, Preise, Adresse korrekt |
| **Perplexity** | 8/8, aber meist neben Wettbewerbern | **niedrig** — mehrere gravierende Fehler |
| **ChatGPT** | Daten unvollständig übermittelt | Q19 korrekt und vollständig |

---

## Zitierte Quellen — der Kern des Problems

Perplexity belegt seine Aussagen mit **cozycozy, Interhome, J2Ski und Ferienhaus-Tirol.eu** — also Aggregatoren und Wettbewerbsportalen. Die eigene Website erscheint nur bei Frage 8 (Direktbuchung).

Genau das soll sich umkehren: `malia-alpine-hideaway.at` muss die faktenreichste Quelle werden, damit die Systeme von dort zitieren statt von Portalen.

---

## Konkrete Falschangaben (Stand vor dem Deploy)

| # | Falschangabe | Wo | Richtig |
|---|---|---|---|
| 1 | „bis zu 10 Personen" | alle drei Tools | **12** (10 in Schlafzimmern + 2 Zustellbett/Couch) |
| 2 | „4 Bäder" bzw. „4–5 Bäder" | Perplexity Q2/Q5, Gemini Q5 | **5** — je Schlafzimmer eines |
| 3 | „zwei Einheiten — The Residence und The Retreat" | Perplexity Q9, Q19 | **drei** — The Alpine Hideaway fehlt komplett |
| 4 | „nur Residence hat Sauna/Infrarot/Wanne" | Perplexity Q13, Q14 | The Alpine Hideaway ist das Gesamthaus und schließt den Wellnessbereich ein |
| 5 | „keine explizite Haustierregelung auffindbar" | Perplexity Q15 | Hunde auf Anfrage willkommen — Angabe war schlicht nicht auffindbar |
| 6 | „ca. £778/Nacht" | Perplexity Q11 | Preis aus einem britischen Portal, in Fremdwährung, nicht von der eigenen Seite |
| 7 | „wenige Gehminuten zum See" | Gemini Q12 | **8 Gehminuten** — konkrete Zahl fehlte |

**Bewertung:** Fehler 3, 4 und 5 sind die teuersten. Perplexity hält The Alpine Hideaway — das meistverkaufte Produkt — für nicht existent und ordnet den Wellnessbereich der falschen Einheit zu. Fehler 5 zeigt exemplarisch, was die FAQ-Seite leistet: Die Information existiert auf der Website, steht aber so vergraben, dass sie nicht gefunden wird.

---

## Namensvariante

Gemini und Perplexity schreiben beide **„MALIA – Alpine Hideaway" mit Bindestrich**. Das ist die Schreibweise aus dem Google-Unternehmensprofil, die sich offenbar durchgesetzt hat — die Website schreibt ohne Bindestrich.

Im Schema ist aktuell „MALIA Alpine Hideaway" als `name` und die Bindestrich-Variante als `alternateName` hinterlegt. **Offene Entscheidung**, welche die offizielle sein soll.

---

## Was gut funktioniert

- **Gemini** gibt Preise (160 / 650 / 800 €), Adresse, Einheitenstruktur und Gastgeberinnen korrekt wieder
- **ChatGPT** beschreibt in Q19 alle drei Einheiten mit korrekten Kapazitäten und verlinkt die offizielle Seite
- Die Direktbuchung wird von allen Tools erkannt und als Option genannt (Frage 8)
- Die Bewertung 5,0 wird angezeigt

## Genannte Wettbewerber

Zur Einordnung, gegen wen MALIA in den Antworten antritt:

- Chalets Grossmitt (Pertisau)
- Posthotel Achenkirch, Entners am See (Wellnesshotels)
- Chalet Isabella, Rauchenhof (von ChatGPT genannt)
- Portale: Interhome, cozycozy, J2Ski, Ferienhaus-Tirol.eu

---

## Lücke in dieser Messung

Von **ChatGPT** wurden nur die Antworten zu Frage 1 (leer) und Frage 19 übermittelt. Für die Vergleichsmessung sollten die übrigen Fragen dort nachgeholt werden — ChatGPT ist die reichweitenstärkste der drei Quellen.

---

## Erwartete Wirkung der Maßnahmen

| Maßnahme | Behebt |
|---|---|
| FAQ-Seite mit FAQPage-Schema | Fehler 5 (Haustiere), Fehler 7 (Entfernungen) |
| Accommodation-Schema je Einheit | Fehler 3 und 4 (Einheitenstruktur, Wellness-Zuordnung) |
| Faktenbox + llms.txt | Fehler 1, 2, 6 (Kapazität, Bäder, Preise aus eigener Quelle) |
| Entitäts-Bereinigung GEO 5 | Namensvariante, Aggregator-Falschdaten |

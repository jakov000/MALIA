# GEO 1 — KI-Baseline-Messung: Fragenkatalog

**Arbeitspaket:** GEO 1 aus [AS-2026-007](AS-2026-007-1.pdf), 1,5 Std.
**Zweck:** Dokumentierter Ist-Zustand als Vergleichsbasis für den Erfolgsnachweis.

> ⏱ **Zeitkritisch: vor dem Deploy der SEO-/GEO-Änderungen durchführen.**
> Danach ist kein sauberer Vorher-Wert mehr messbar.

## Durchführung

Jede Frage in **ChatGPT**, **Perplexity** und **Gemini** stellen — jeweils in einem **neuen Chat ohne Verlauf** (sonst verfälscht der Kontext das Ergebnis). Bei ChatGPT die Websuche aktiv lassen.

Pro Frage und Tool festhalten:

| Feld | Was eintragen |
|---|---|
| Wird MALIA genannt? | ja / nein |
| An welcher Position? | 1., 2., 3. … der genannten Häuser |
| Korrekt beschrieben? | Kapazität, Ausstattung, Lage — was stimmt, was nicht |
| Zitierte Quellen | welche URLs führt das Tool als Beleg an |
| Screenshot | Dateiname |

Falschangaben bitte **wörtlich** notieren — sie zeigen, welche Fremdquelle die KI gerade als Wahrheit behandelt (das Audit fand z. B. „6-Zimmer-Villa mit einem Bad" bei einem Aggregator).

## A — Empfehlungsfragen (Marke kommt *nicht* vor)

Die eigentliche Messung: Taucht MALIA auf, ohne dass man danach fragt?

1. Was ist das beste Luxus-Chalet am Achensee?
2. Wo kann ich in Pertisau ein Chalet für 10 Personen mieten?
3. Ich suche ein Ferienhaus in Tirol mit privater Sauna für eine Familienfeier — was empfiehlst du?
4. Welche Unterkünfte am Achensee haben einen eigenen Wellnessbereich?
5. Luxus-Chalet Tirol mit Bergblick, 5 Schlafzimmer — welche Optionen gibt es?
6. Wo übernachte ich am Achensee, wenn ich direkt bei der Bergbahn sein will?
7. Ferienwohnung für 2 Personen in Pertisau mit Terrasse — Empfehlungen?
8. Welche Chalets am Achensee kann man direkt beim Gastgeber buchen statt über Booking?

## B — Markenfragen (Marke kommt vor)

Prüft, ob die KI die Entität kennt und korrekt wiedergibt.

9. Was ist das MALIA Alpine Hideaway?
10. Wie viele Personen passen ins MALIA Alpine Hideaway?
11. Was kostet eine Nacht im MALIA Alpine Hideaway?
12. Wo genau liegt das MALIA Alpine Hideaway?
13. Welche Einheiten gibt es im MALIA Alpine Hideaway und worin unterscheiden sie sich?
14. Hat das MALIA Alpine Hideaway eine Sauna?
15. Sind Haustiere im MALIA Alpine Hideaway erlaubt?
16. Wie komme ich ohne Auto zum MALIA Alpine Hideaway?

## C — Englische Kontrollfragen

Prüft, ob die englische Fassung überhaupt wahrgenommen wird.

17. Best luxury chalet on Lake Achensee, Austria?
18. Where can I rent a private chalet with sauna in Tyrol for 8 guests?
19. What is MALIA Alpine Hideaway?

## Erwartung für den Vorher-Zustand

Die Website hatte zum Messzeitpunkt weder `robots.txt` noch Sitemap, kein `llms.txt` und keine strukturierten Daten. Realistisch ist daher:

- **Block A**: MALIA wird kaum bis gar nicht genannt; zitiert werden achensee.com, Booking.com und Airbnb
- **Block B**: die KI kennt den Namen, beschreibt ihn aber aus Fremdquellen — mit entsprechenden Fehlern
- **Block C**: schwächer als Block A/B, weil die EN-Seiten bislang deutsche Metadaten trugen

Genau diese Ausgangslage ist der Wert der Messung: Sie macht die spätere Verbesserung belegbar.

## Ablage

Ergebnisse als `docs/geo-baseline-2026-09.md` festhalten, Screenshots nach `docs/baseline-screenshots/`. Die Wiederholungsmessung erfolgt 4–6 Wochen nach dem Deploy mit **demselben** Fragenkatalog.

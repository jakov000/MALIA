# Anleitung: KI-Baseline messen & Zugänge einrichten

Schritt-für-Schritt für die Aufgaben aus [seo-geo-umsetzungsplan.md](seo-geo-umsetzungsplan.md), die nicht im Code liegen.

---

## Vorbemerkung — Korrektur zu meiner früheren Aussage

Ich hatte geschrieben „am besten mich als Nutzer hinzufügen". **Das bringt nichts.** Ich habe keinen Browser und keine Logins — ich kann mich nirgends einloggen, auch nicht wenn du mich einlädst.

Was tatsächlich geht:

| Plattform | Kann ich übernehmen? |
|---|---|
| **Vercel** | ✅ ja — wenn du einmal die CLI einloggst (siehe B, Variante 2) |
| Google Search Console | ❌ nein, nur Browser |
| Google Business Profile | ❌ nein, nur Browser |
| achensee.com | ❌ nein, nur Browser |
| Airbnb / Booking.com | ❌ nein, nur Browser |

Bei allem mit ❌ sage ich dir exakt, was wo zu klicken ist — machen musst du es.

---

## A — GEO 1: KI-Baseline messen

**Zeitaufwand:** 45–60 Minuten · **Muss vor dem Deploy passieren**

### Warum zuerst

Wir wollen später belegen, dass die Arbeit gewirkt hat. Dafür braucht es einen dokumentierten Vorher-Zustand. Sobald die Änderungen live sind und die Crawler durch sind, lässt sich der nicht mehr nachträglich erheben.

### Vorbereitung

1. Tabelle anlegen (Excel/Sheets) mit den Spalten:
   `Frage-Nr | Tool | MALIA genannt? | Position | Fehler in der Beschreibung | Zitierte Quellen | Screenshot`
2. Ordner für Screenshots anlegen.
3. **Wichtig:** Jede Frage in einem **neuen, leeren Chat** stellen.
   - ChatGPT: temporären Chat nutzen (Symbol oben rechts) — sonst beeinflusst dein Verlauf die Antwort
   - Perplexity: neuer Thread
   - Gemini: neuer Chat
   - Am saubersten: ausgeloggt oder im Inkognito-Fenster

### Durchführung

Die 19 Fragen stehen in [geo-baseline-fragenkatalog.md](geo-baseline-fragenkatalog.md). Reihenfolge: erst **ChatGPT**, dann **Perplexity**, dann **Gemini**.

Pro Frage:

1. Frage **wörtlich** kopieren und abschicken
2. Vollständige Antwort als Screenshot sichern
3. In die Tabelle eintragen:
   - **Wird MALIA genannt?** ja/nein
   - **Position** — als wievieltes Haus in der Aufzählung
   - **Fehler** — falsche Angaben *wörtlich* notieren (z. B. „6-Zimmer-Villa mit einem Bad"). Das zeigt, welcher Fremdquelle die KI gerade glaubt.
   - **Zitierte Quellen** — welche URLs führt das Tool als Beleg an? Meist achensee.com, Booking.com, Airbnb. Genau die wollen wir später ersetzen.

### Minimalvariante, falls die Zeit nicht reicht

Wenn 57 Durchläufe zu viel sind, reicht als Baseline:

- **Alle 8 Fragen aus Block A** (Empfehlungsfragen) in ChatGPT **und** Perplexity → das ist die eigentliche Messung
- **Fragen 9 und 13** aus Block B in allen drei Tools → zeigt, wie die Entität aktuell beschrieben wird
- Block C (Englisch) weglassen

Das sind 22 statt 57 Durchläufe, ca. 20 Minuten, und deckt das Wesentliche ab.

### Ablage

Ergebnisse als `docs/geo-baseline-2026-09.md`, Screenshots nach `docs/baseline-screenshots/`. Schick mir die Tabelle, ich werte sie aus.

---

## B — Vercel: www-Domain reparieren

**Problem:** `www.malia-alpine-hideaway.at` löst aktuell gar nicht auf — kein DNS, kein Zertifikat. Wer www eintippt, landet auf einer Fehlerseite. Die Apex-Domain `malia-alpine-hideaway.at` läuft normal.

### Variante 1 — du machst es im Browser (ca. 5 Min + Wartezeit)

1. [vercel.com](https://vercel.com) öffnen, einloggen
2. Das MALIA-Projekt anklicken
3. Oben **Settings** → links **Domains**
4. Ins Eingabefeld `www.malia-alpine-hideaway.at` eintragen → **Add**
5. Vercel fragt, wie die Domain behandelt werden soll → **„Redirect to malia-alpine-hideaway.at"** wählen, Statuscode **308 Permanent**
   *(Nicht „Add as primary domain" — die Apex-Domain bleibt die Hauptadresse.)*
6. Vercel zeigt jetzt einen DNS-Eintrag an, typischerweise:
   ```
   Typ: CNAME   Name: www   Wert: cname.vercel-dns.com
   ```
7. Diesen Eintrag beim **Domain-Anbieter** hinterlegen (dort, wo `malia-alpine-hideaway.at` registriert ist — z. B. world4you, GoDaddy, Namecheap)
8. Zurück in Vercel: nach ein paar Minuten steht bei der Domain ein grüner Haken und „Valid Configuration"

**Dauer bis es wirkt:** meist 10–30 Minuten, DNS-bedingt bis zu 24 Stunden.

**Fertig, wenn:** `https://www.malia-alpine-hideaway.at` im Browser auf `https://malia-alpine-hideaway.at` weiterleitet, ohne Zertifikatswarnung.

### Variante 2 — ich mache es über die CLI

Du führst einmalig im Projektordner aus:

```bash
npm i -g vercel
vercel login
vercel link
```

Danach sage mir Bescheid — den Rest (Domain hinzufügen, Redirect setzen, Status prüfen) erledige ich. Den DNS-Eintrag beim Domain-Anbieter musst du trotzdem selbst setzen, da komme ich nicht ran.

---

## C — Google Search Console

**Jetzt schon machen:** Property anlegen und verifizieren.
**Erst nach dem Deploy:** Sitemap einreichen (vorher liefert sie noch 404).

1. [search.google.com/search-console](https://search.google.com/search-console) öffnen
2. Links oben Property-Auswahl → **Property hinzufügen**
3. **Domain** wählen (nicht „URL-Präfix") und `malia-alpine-hideaway.at` eintragen
   → Die Domain-Property erfasst automatisch http, https, www und alle Subdomains. Genau das wollen wir, weil wir gerade www reparieren.
4. Google zeigt einen **TXT-Eintrag** an → beim Domain-Anbieter hinterlegen (gleiche Stelle wie der CNAME aus Schritt B)
5. In der Search Console auf **Verifizieren** klicken
6. **Nach dem Deploy:** links **Sitemaps** → `sitemap.xml` eintragen → **Senden**
7. Ein paar Tage später unter **Seiten** prüfen, wie viele der 30 URLs indexiert sind

---

## D — Google Business Profile

Für GEO 5. Ziel: Was Google über MALIA weiß, muss exakt dem entsprechen, was auf der Website steht.

1. [business.google.com](https://business.google.com) öffnen
2. Profil MALIA auswählen → **Profil bearbeiten**
3. Prüfen und angleichen:

| Feld | Sollwert |
|---|---|
| Name | **Einheitlich festlegen** — siehe offene Frage unten |
| Kategorie | Ferienunterkunft / Ferienhaus (Google-Kategorien sind vorgegeben, die nächstliegende wählen) |
| Telefon | **+43 676 5925596** — nur diese eine |
| Adresse | Ländbergstraße 6, 6213 Pertisau |
| Website | `https://malia-alpine-hideaway.at/de` |
| Ausstattung | Sauna, WLAN, Parkplätze, Haustiere auf Anfrage |

> ⚠️ **Offene Frage zum Namen:** Laut Infoblatt steht bei Google aktuell „MALIA - Alpine Hideaway" (mit Bindestrich), die Website nutzt „MALIA Alpine Hideaway" (ohne). Sag mir, welche Schreibweise die offizielle sein soll — die andere hinterlege ich im Schema als `alternateName`.

4. Außerdem: aktuelle **Bewertungsanzahl** notieren und mir durchgeben, sobald sie sich ändert. Sie steht im Schema und muss dem Google-Profil entsprechen.

---

## E — achensee.com

Hier steht laut Audit die Falschangabe „6-Zimmer-Villa mit einem Bad". Richtig sind **5 Schlafzimmer mit je eigenem Bad**.

1. Beim Gastgeber-/Partnerportal von achensee.com einloggen
   *(Falls kein Zugang vorhanden: Achensee Tourismus direkt kontaktieren und Korrektur anfordern.)*
2. Eintrag suchen und korrigieren:
   - Zimmer/Bäder: 5 Schlafzimmer, 5 Bäder
   - Kapazität: **siehe offene Frage unten**
   - Name und Telefonnummer wie oben
3. Screenshot vom korrigierten Eintrag für die Dokumentation

---

## F — Airbnb & Booking.com

1. **Booking.com**: Die Einheit wird dort laut Infoblatt als „Standard Villa" bzw. „Villa" geführt → auf **„MALIA Alpine Hideaway"** angleichen
2. **Airbnb**: Titel, Beschreibung und Ausstattung gegen die Website prüfen
3. Auf beiden Plattformen identisch halten: Name, Adresse, Telefon, Kapazität, Zimmer-/Bäderzahl

Antwortmaschinen gleichen Angaben über mehrere Quellen ab. Weichen sie voneinander ab, sinkt das Vertrauen in die Entität — und die KI empfiehlt lieber ein Haus, bei dem die Zahlen überall gleich sind.

---

## Reihenfolge

1. **A — Baseline messen** ← zeitkritisch, vor allem anderen
2. **B — www reparieren** und **C — Search Console anlegen** (parallel, DNS-Einträge in einem Rutsch)
3. Deploy der Code-Änderungen
4. **C — Sitemap einreichen**
5. **D, E, F — Profile angleichen**
6. 4–6 Wochen später: Baseline-Messung mit demselben Fragenkatalog wiederholen

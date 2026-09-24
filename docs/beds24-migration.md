# Migrationsplan: iCal → Beds24 Live-Sync

**Ziel:** Die tägliche iCal-Synchronisation (Airbnb/Booking.com) durch Echtzeit-Sync über den Channel Manager Beds24 ersetzen. Drei Sync-Richtungen werden live:

1. **Airbnb/Booking → Website:** Portal-Buchung blockt den Website-Kalender in Sekunden (Webhook statt 24h-Cron)
2. **Website → Airbnb/Booking:** Direktbuchung sperrt sofort auf beiden Portalen (API-Push statt .ics-Polling)
3. **Admin-Kalender → Airbnb/Booking:** Eigenbuchungen/Sperren aus dem Dashboard sperren sofort auf beiden Portalen

Der bestehende Buchungsflow (Stripe, Preislogik, Gutscheine, Dashboard) bleibt unverändert. Es ändern sich nur die Sync-Stellen.

**Gesamtaufwand:** ~4–5 Tage (½ Portal-Setup · ½ Kanäle · 2–3 Code · 1 Test/Cutover) + Wartezeit auf Booking.com-Freischaltung (1–2 Werktage, früh anstoßen!).

---

## Phase 1 — Beds24-Konto & Zimmer einrichten (Portal, ~½ Tag)

- [ ] **1.1 Account anlegen** auf [beds24.com](https://beds24.com) (kostenlose Testphase; Preis pro Einheit/Monat)
- [ ] **1.2 Property + Zimmerstruktur** unter (SETTINGS) → PROPERTIES → ROOMS:
  - Ein Property "Villa Tirol / MALIA" mit 3 Räumen:
    - **The Residence** — echte Einheit
    - **The Retreat** — echte Einheit
    - **The Alpine Hideaway** — **virtueller Raum** (ganzes Haus)
  - Unter ROOMS → **DEPENDENCIES** beim Hideaway:
    - *"Requires availability in"* = Residence + Retreat
    - *"Include bookings from"* aktivieren (Buchungen der Untereinheiten spiegeln/blocken das Hideaway)
  - Doku: [Divide a house into separately bookable units](https://wiki.beds24.com/index.php/Divide_a_house_into_separately_bookable_units)
  - ⚠️ Beds24 warnt: Dependencies gründlich testen, sonst Overbooking-Risiko ([Room Linking](https://wiki.beds24.com/index.php/Category:Room_Linking_and_Dependencies))
  - Damit übernimmt Beds24 die Hierarchie-Logik, die aktuell 3× im Code dupliziert ist (checkout, ical/export, BookingForm)
- [ ] **1.3 Alle zukünftigen Buchungen in Beds24 eintragen** (aus DB + Portalen), bevor Kanäle verbunden werden — sonst verkauft Beds24 belegte Termine

## Phase 2 — Kanäle verbinden (Portal, ~½ Tag + Wartezeit)

- [ ] **2.1 Airbnb** unter (SETTINGS) → CHANNEL MANAGER → AIRBNB:
  - [ ] [Airbnb-Konto verbinden](https://wiki.beds24.com/index.php/Connect_Airbnb_Account) (OAuth)
  - [ ] Bestehende Listings **importieren** (nicht neu anlegen!) und auf Beds24-Räume [mappen](https://wiki.beds24.com/index.php/Airbnb_Mapping)
  - [ ] **Sync-Typ wählen:**
    - *"Prices & Availability"* → Beds24 steuert Verfügbarkeit **und Preise** (Preise dann einmalig in Beds24 hinterlegen)
    - *"Everything"* → auch Fotos/Texte aus Beds24 — unnötig, mehr Pflegeaufwand
  - [ ] ⚠️ **Vorher alte iCal-Verbindung in Airbnb entfernen** + per iCal importierte Blöcke löschen — [Beds24 importiert alte iCal-Buchungen nicht](https://wiki.beds24.com/index.php/Using_Airbnb_and_Booking.com)
  - [ ] Option "alle kommenden Buchungen automatisch importieren" nutzen
- [ ] **2.2 Booking.com** unter CHANNEL MANAGER → BOOKING.COM:
  - [ ] Im Booking.com-Extranet Beds24 als Connectivity-Provider anfordern (**dauert 1–2 Werktage — früh anstoßen!**)
  - [ ] [Property von Booking.com importieren](https://wiki.beds24.com/index.php/Booking.com:_Import_Properties_from_Booking.com_to_Beds24), Räume mappen
  - [ ] Unter MAPPING Räume auf "Enabled" (= 2-Wege) stellen → Save → "Update" pro Raum
  - [ ] iCal-Export-URLs im Booking-Extranet entfernen
- [ ] **2.3 In beiden Portalen prüfen:** Kalender zeigt exakt den Beds24-Stand

## Phase 3 — API-Zugang & Webhooks (Portal, ~1 Stunde)

- [ ] **3.1 API-Token:** (SETTINGS) → API → Invite Code generieren (Scopes: bookings read/write, inventory read/write) → per `GET /authentication/setup` gegen **Refresh-Token** tauschen ([API V2 Doku](https://wiki.beds24.com/index.php/Category:API_V2))
  - Refresh-Token → Code holt daraus 24h-Access-Tokens
  - Rate-Limits beachten: Verfügbarkeit weiterhin gegen die eigene DB prüfen, nicht live gegen Beds24
- [ ] **3.2 Booking-Webhooks:** (SETTINGS) → PROPERTIES → ACCESS → Booking Webhooks
  - [ ] URL: `https://<domain>/api/webhooks/beds24`
  - [ ] Option "Buchungsdaten als JSON im Body" aktivieren ([Doku](https://wiki.beds24.com/index.php/Booking_Webhooks))
  - [ ] Custom-Header/Secret zur Verifizierung setzen

## Phase 4 — Code (~2–3 Tage)

Reihenfolge so gewählt, dass jeder Schritt einzeln deploybar ist.

- [ ] **4.1 `lib/beds24.ts` — API-Client** (neu)
  - Token-Handling: Refresh-Token aus Env, Access-Token holen + cachen (24h gültig), Retry bei 401
  - Wrapper: `getBookings()`, `createBooking()`, `cancelBooking()`, `setCalendar()` (Sperren/Freigaben)
  - Room-Mapping als Konstante/Env: `"THE RESIDENCE" / "THE RETREAT" / "THE ALPINE HIDEAWAY"` ↔ Beds24-roomId (IDs aus Phase 1.2)
  - Neue Env-Vars: `BEDS24_REFRESH_TOKEN`, `BEDS24_ROOM_ID_HIDEAWAY/RESIDENCE/RETREAT`, `BEDS24_WEBHOOK_SECRET`
- [ ] **4.2 `app/api/webhooks/beds24/route.ts` — eingehende Buchungen** (neu, ersetzt `app/api/ical/import`)
  - Secret prüfen, JSON parsen
  - Prisma-Schema: `beds24Id String? @unique` auf `Booking` (analog `stripeId`)
  - **Upsert** per Beds24-Booking-ID:
    - neu → `Booking` mit `source=AIRBNB/BOOKING`, `status=PAID`, inkl. Gastname/Kanal/Preis
    - geändert → Daten aktualisieren
    - storniert → `status=CANCELLED`
  - Eigene (selbst gepushte) Buchungen am `beds24Id` erkennen und ignorieren (Echo-Schleife vermeiden)
- [ ] **4.3 Ausgehend: Direktbuchungen** — `app/api/webhooks/stripe/route.ts` erweitern
  - Nach `status=PAID`: `beds24.createBooking(...)` → sperrt sofort auf Airbnb & Booking; Rückgabe-ID als `beds24Id` speichern
  - Bei Stornierung im Admin (`PATCH /api/bookings/[id]` → CANCELLED): `cancelBooking()`
  - Fehlerbehandlung: Beds24-Fehler darf die Buchung nicht kaputt machen → loggen + Admin-Mail, Retry über Abgleich-Job (4.5)
- [ ] **4.4 Ausgehend: Admin-Sperren/Eigenbuchungen** — `app/api/admin/calendar/route.ts` + `app/api/blocked-dates` erweitern
  - `CalendarRule` UNAVAILABLE/OWN_USE/CLOSED anlegen → Zeitraum via Beds24 sperren; löschen → freigeben
  - `room="ALL"` → alle drei Beds24-Räume sperren
  - Ausbaustufe (erst nach Cutover): Preis-/MinStay-Overrides zu Beds24 pushen
- [ ] **4.5 Sicherheitsnetz: täglicher Abgleich** — Cron umwidmen
  - `vercel.json`: Pfad `/api/ical/import` → neue Route `/api/sync/beds24`
  - Zieht `GET /bookings` (geändert seit letztem Lauf), gleicht mit DB ab → fängt verpasste Webhooks + fehlgeschlagene Pushes ab
  - `CRON_SECRET` in die Env aufnehmen (fehlt aktuell!)
- [ ] **4.6 Admin-Dashboard** (klein)
  - `components/admin/AdminCalendar.tsx`: "iCal Sync"-Button → "Beds24 Sync" (triggert 4.5 manuell); Label "EXTERNAL (iCal)" → Kanalname
  - `BookingsTable` zeigt Portal-Buchungen automatisch mit Gastdaten (jetzt echte `Booking`-Zeilen)
- [ ] **4.7 Aufräumen — erst nach erfolgreichem Cutover + 1 Woche Beobachtung!**
  - Löschen: `app/api/ical/import`, `app/api/ical/export`, Test-Routen (`test-cal`, `test-runner`)
  - Env-Vars raus: `AIRBNB_ICAL_*`, `BOOKING_ICAL_*`
  - Dependencies raus: `ical-generator`, `node-ical`
  - Alte iCal-`BlockedDate`-Zeilen (source AIRBNB/BOOKING) aus der DB löschen

## Phase 5 — Testen (~1 Tag)

Beds24 hat keine echte Sandbox → mit dem Live-Account und weit in der Zukunft liegenden Testdaten testen:

- [ ] 1. Testbuchung in Beds24 anlegen → Webhook kommt an, `Booking` entsteht, Tag auf Website geblockt?
- [ ] 2. Testbuchung stornieren → `CANCELLED`, Tag wieder frei?
- [ ] 3. Direktbuchung auf Website (Stripe-Testmodus) → erscheint in Beds24 + auf Portalen gesperrt?
- [ ] 4. Admin-Sperre anlegen/löschen → in Beds24 sichtbar / wieder frei?
- [ ] 5. **Hierarchie:** Residence buchen → Hideaway auf Portalen geblockt? Hideaway buchen → alles geblockt?
- [ ] 6. Abgleich-Job: Webhook absichtlich "verpassen" (Route kurz deaktivieren) → zieht der Cron es nach?

## Phase 6 — Cutover-Checkliste (buchungsarmer Tag)

- [ ] 1. Booking.com-Connectivity-Freigabe liegt vor (vorab!)
- [ ] 2. Alle zukünftigen Buchungen in Beds24 erfasst, stimmen mit Portalen + DB überein
- [ ] 3. Code aus Phase 4 deployed, Webhook-URL in Beds24 eingetragen
- [ ] 4. iCal-Verbindungen in Airbnb + Booking-Extranet **entfernen**
- [ ] 5. Kanäle in Beds24 auf 2-Wege scharfschalten, "Update" drücken, Portal-Kalender kontrollieren
- [ ] 6. Alte iCal-`BlockedDate`s löschen, Website-Kalender kontrollieren
- [ ] 7. Je eine echte Mini-Testbuchung pro Richtung durchspielen
- [ ] 8. Erste Woche: Abgleich-Job-Logs täglich prüfen; iCal-Code erst danach löschen (4.7)

---

## Referenzen

- [Beds24 API V2](https://wiki.beds24.com/index.php/Category:API_V2) · Interaktive Swagger-Doku: https://beds24.com/api/v2
- [Booking Webhooks](https://wiki.beds24.com/index.php/Booking_Webhooks)
- [Room Linking and Dependencies](https://wiki.beds24.com/index.php/Category:Room_Linking_and_Dependencies)
- [Divide a house into separately bookable units](https://wiki.beds24.com/index.php/Divide_a_house_into_separately_bookable_units)
- [Using Airbnb and Booking.com](https://wiki.beds24.com/index.php/Using_Airbnb_and_Booking.com)
- [Connect Airbnb Account](https://wiki.beds24.com/index.php/Connect_Airbnb_Account) · [Airbnb Mapping](https://wiki.beds24.com/index.php/Airbnb_Mapping)
- [Booking.com Import](https://wiki.beds24.com/index.php/Booking.com:_Import_Properties_from_Booking.com_to_Beds24)

## Notizen zum Ist-Zustand (Stand 02.07.2026)

- iCal-Import: `app/api/ical/import/route.ts` (Cron täglich 0:00 UTC via `vercel.json`), schreibt anonyme `BlockedDate`-Zeilen
- iCal-Export: `app/api/ical/export/route.ts` (.ics-Feed, ohne Auth)
- iCal-URLs nur in `.env` (`AIRBNB_ICAL_*`, `BOOKING_ICAL_*`), nicht im Admin editierbar
- Zimmer-Hierarchie (Hideaway = ganzes Haus) dupliziert in: `app/api/checkout/route.ts`, `app/api/ical/export/route.ts`, `components/BookingForm.tsx`
- Verfügbarkeit = PAID-`Booking` + `BlockedDate` + `CalendarRule` (client- und serverseitig gemergt)
- ⚠️ Nebenbefund: Live-Secrets liegen in `.env` im Projektordner → Rotation prüfen; `CRON_SECRET` wird referenziert, fehlt aber in der Env

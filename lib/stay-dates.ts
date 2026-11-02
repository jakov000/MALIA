// Aufenthalte liegen in drei Formen in der Datenbank:
//   - Direktbuchungen als UTC-Mitternacht (2026-11-20T00:00Z),
//   - ältere Direktbuchungen als Wiener Mitternacht (2026-11-19T23:00Z),
//   - iCal-Sperren von Airbnb/Booking.com als 12:00 UTC (2026-11-20T12:00Z).
// Vergleicht man diese Zeitpunkte direkt, überschneidet sich "Abreise am 20."
// (12:00) mit "Anreise am 20." (00:00) - der Abreisetag wäre nicht buchbar.
// Deshalb wird jeder Zeitpunkt auf den Kalendertag in Wien reduziert.
const VIENNA_DAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Vienna",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Kalendertag in Wien als "YYYY-MM-DD" (lexikografisch vergleichbar). */
export const viennaDay = (d: Date) => VIENNA_DAY.format(d);

type Stay = { startDate: Date; endDate: Date };

/**
 * Belegen zwei Aufenthalte mindestens eine gemeinsame Nacht? Der Abreisetag ist
 * keine Nacht: Endet der eine am 20., darf der andere am 20. anreisen.
 */
export const staysOverlap = (a: Stay, b: Stay) =>
  viennaDay(a.startDate) < viennaDay(b.endDate) && viennaDay(a.endDate) > viennaDay(b.startDate);

const ONE_DAY = 24 * 60 * 60 * 1000;

/** Die Nächte eines Aufenthalts als Wiener Kalendertage, ohne den Abreisetag. */
export function stayNights(startDate: Date, endDate: Date): string[] {
  const nights: string[] = [];
  const departure = viennaDay(endDate);
  // 12:00 UTC liegt in Wien immer am selben Kalendertag, auch über die Zeitumstellung.
  for (let d = new Date(`${viennaDay(startDate)}T12:00:00Z`); viennaDay(d) < departure; d = new Date(d.getTime() + ONE_DAY)) {
    nights.push(viennaDay(d));
  }
  return nights;
}

const BLOCKING_RULE_STATUS = ["UNAVAILABLE", "OWN_USE", "CLOSED"];

type CalendarRuleLike = { room: string; status: string; startDate: Date; endDate: Date };

/**
 * Sperrt eine eigene Regel aus dem Admin-Kalender (Eigenbelegung, Geschlossen,
 * Nicht verfügbar) diese Nacht für die Einheit? Aufgelöst wie im Buchungskalender:
 * Von und Bis sind Nächte (beide einschließlich), bei mehreren Regeln gilt die
 * zuletzt angelegte - die Liste muss nach createdAt aufsteigend sortiert sein.
 */
export function ruleBlocksNight(rules: CalendarRuleLike[], room: string, night: string) {
  let status = "AVAILABLE";
  for (const rule of rules) {
    if ((rule.room === room || rule.room === "ALL")
      && viennaDay(rule.startDate) <= night && night <= viennaDay(rule.endDate)) {
      status = rule.status;
    }
  }
  return BLOCKING_RULE_STATUS.includes(status);
}

/**
 * Einwilligungsverwaltung für Cookies und Tracking.
 *
 * Rechtlicher Rahmen: Google Analytics setzt Cookies und überträgt Daten an
 * Google. In Österreich braucht das eine aktive Einwilligung VOR dem Laden
 * (§ 165 Abs. 3 TKG 2021, Art. 6 Abs. 1 lit. a DSGVO). Deshalb wird gtag.js
 * erst eingebunden, nachdem zugestimmt wurde — nicht per Consent Mode mit
 * "denied"-Default, bei dem der Browser trotzdem Google kontaktiert.
 *
 * Der Widerruf muss so einfach sein wie die Zustimmung (Art. 7 Abs. 3 DSGVO),
 * daher räumt revoke() die von Google gesetzten Cookies aktiv ab.
 */

export const CONSENT_STORAGE_KEY = 'malia-consent';

/** Erhöhen, wenn sich Zwecke ändern — erzwingt eine neue Abfrage. */
export const CONSENT_VERSION = 1;

export type ConsentState = {
  version: number;
  /** Technisch notwendig, nicht abwählbar. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO-Zeitstempel der Entscheidung — Nachweispflicht nach Art. 7 Abs. 1 DSGVO. */
  decidedAt: string;
};

export const CONSENT_DENIED: Omit<ConsentState, 'decidedAt'> = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  marketing: false,
};

export function createConsent(analytics: boolean, marketing: boolean): ConsentState {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    marketing,
    decidedAt: new Date().toISOString(),
  };
}

/**
 * Liest die gespeicherte Entscheidung. null = noch nicht entschieden,
 * der Banner muss dann erscheinen.
 */
export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    // Bei geänderten Zwecken erneut fragen
    if (parsed.version !== CONSENT_VERSION) return null;
    return { ...parsed, necessary: true };
  } catch {
    // Privater Modus, blockierte Speicherung, kaputter Eintrag
    return null;
  }
}

export function writeConsent(consent: ConsentState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Ohne Speicher gilt die Entscheidung nur für die laufende Sitzung.
  }
}

/** Von Google Analytics gesetzte Cookies entfernen — für den Widerruf. */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;

  const namen = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((name): name is string => Boolean(name) && (name === '_ga' || name.startsWith('_ga_') || name.startsWith('_gid') || name.startsWith('_gat')));

  // Cookies werden auf der Domain und auf der übergeordneten Domain gesetzt.
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];

  for (const name of namen) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

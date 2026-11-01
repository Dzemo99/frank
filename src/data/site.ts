/**
 * ZENTRALE STAMMDATEN
 * -------------------------------------------------------------------
 * Alles, was auf mehreren Seiten vorkommt (Kontakt, Adressen, Region),
 * wird hier EINMAL gepflegt. Platzhalter in eckigen Klammern [ ... ]
 * bitte ersetzen – sie werden im Schema.org-Markup automatisch
 * ausgelassen, solange sie noch nicht befüllt sind.
 */

export const site = {
  name: 'Ideale Gebäudereinigung',
  legalName: '[FIRMIERUNG, z. B. Ideale Gebäudereinigung GmbH]',
  tagline: 'Premium Gebäudereinigung in Frankfurt & Rhein-Main',
  description:
    'Gewerbliche Gebäudereinigung für Büros, Praxen, Baustellen und Fassaden in Frankfurt am Main und dem Rhein-Main-Gebiet. Festes Personal, digitale Qualitätskontrolle, Angebot in 60 Sekunden anfragen.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://www.ideale-gebaeudereinigung.de',
  email: 'info@ideale-gebaeudereinigung.de',
  phone: {
    display: '0551 50316976',
    e164: '+4955150316976',
    href: 'tel:+4955150316976',
  },
  whatsapp: {
    display: '+49 160 95854323',
    e164: '+4916095854323',
    // Vorausgefüllte Nachricht – kann angepasst werden
    href: 'https://wa.me/4916095854323?text=' + encodeURIComponent('Guten Tag, ich interessiere mich für ein Angebot zur Gebäudereinigung.'),
  },
  openingHours: 'Mo–Fr 07:00–18:00 Uhr',
  openingHoursSchema: ['Mo-Fr 07:00-18:00'],
} as const;

export type Location = {
  id: string;
  label: string;
  role: string;
  street: string;
  zip: string;
  city: string;
  region: string;
  mapsQuery: string;
  isPrimary: boolean;
};

export const locations: Location[] = [
  {
    id: 'frankfurt',
    label: 'Niederlassung Frankfurt am Main',
    role: 'Einsatzleitung Rhein-Main · Besichtigungen · Objektbetreuung',
    street: '[FRANKFURTER ADRESSE – Straße Hausnummer]',
    zip: '[PLZ]',
    city: 'Frankfurt am Main',
    region: 'Hessen',
    mapsQuery: 'Frankfurt am Main',
    isPrimary: true,
  },
  {
    id: 'goettingen',
    label: 'Verwaltung Göttingen',
    role: 'Verwaltung · Angebote · Rechnungswesen',
    street: '[GÖTTINGER ADRESSE – Straße Hausnummer]',
    zip: '[PLZ]',
    city: 'Göttingen',
    region: 'Niedersachsen',
    mapsQuery: 'Göttingen',
    isPrimary: false,
  },
];

/** Einsatzgebiete – Reihenfolge = Gewichtung (Google-Ads-Regionen zuerst) */
export const serviceAreas = [
  'Frankfurt am Main',
  'Offenbach am Main',
  'Eschborn',
  'Bad Homburg',
  'Oberursel',
  'Neu-Isenburg',
  'Dreieich',
  'Kronberg im Taunus',
  'Hofheim am Taunus',
  'Hanau',
  'Darmstadt',
  'Wiesbaden',
  'Mainz',
  'Rüsselsheim',
  'Maintal',
  'Langen',
];

/** Frankfurter Stadtteile / Lagen für den Regional-Abschnitt */
export const frankfurtDistricts = [
  'Bankenviertel',
  'Westend',
  'Niederrad',
  'Gateway Gardens',
  'Europaviertel',
  'Sachsenhausen',
  'Ostend',
  'Bockenheim',
  'Höchst',
  'Nordend',
  'Fechenheim',
  'Kalbach-Riedberg',
];

/**
 * TRUST-BADGES (Hero)
 * Nur echte Nachweise aktivieren! Solange active=false, wird der Badge
 * nicht gerendert. Beispiele: Mitgliedschaft Innung, Zertifizierung,
 * Versicherungsnachweis, Google-Bewertung mit Link.
 */
export type TrustBadge = { label: string; sub?: string; icon: string; href?: string; active: boolean };
export const trustBadges: TrustBadge[] = [
  { label: '[Nachweis 1, z. B. Zertifizierung]', sub: '[Aussteller / Jahr]', icon: 'lucide:badge-check', active: false },
  { label: '[Nachweis 2, z. B. Innungsmitglied]', sub: '[Innung / Region]', icon: 'lucide:shield-check', active: false },
  { label: '[Nachweis 3, z. B. Google-Bewertung]', sub: '[x,x ★ · n Bewertungen]', icon: 'lucide:star', href: '#', active: false },
];

/**
 * LEISTUNGSVERSPRECHEN (Hero-Chips) – keine Zahlen, keine Zertifikate,
 * nur Dinge, die Sie organisatorisch garantieren.
 */
export const promises = [
  { icon: 'lucide:calendar-check', text: 'Kostenlose Besichtigung vor Ort' },
  { icon: 'lucide:users', text: 'Festes, geschultes Personal' },
  { icon: 'lucide:clipboard-check', text: 'Digitale Qualitätskontrolle' },
  { icon: 'lucide:map-pin', text: 'Niederlassung in Frankfurt' },
];

export const nav = [
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Qualität & Ablauf', href: '/qualitaet' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Karriere', href: '/karriere' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const ctaLabel = 'Angebot in 60 Sek. anfragen';

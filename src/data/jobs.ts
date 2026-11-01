/**
 * STELLENANGEBOTE – Karriere-Seite
 * Konditionen bitte prüfen; keine Gehaltszahlen angegeben, solange sie
 * nicht verbindlich feststehen.
 */
export type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  icon: string;
  summary: string;
  tasks: string[];
  profile: string[];
};

export const jobs: Job[] = [
  {
    id: 'reinigungskraft',
    title: 'Reinigungskraft (m/w/d)',
    type: 'Teilzeit · Vollzeit · Minijob',
    location: 'Frankfurt am Main & Rhein-Main',
    icon: 'lucide:sparkles',
    summary:
      'Unterhaltsreinigung in Büros, Praxen und Treppenhäusern – mit festen Objekten, planbaren Zeiten und modernen Arbeitsgeräten.',
    tasks: [
      'Unterhaltsreinigung in festen Objekten (Büros, Praxen, Treppenhäuser)',
      'Arbeiten nach digitaler Checkliste – klar und nachvollziehbar',
      'Sorgfältiger Umgang mit Material und Maschinen',
    ],
    profile: [
      'Zuverlässigkeit und Freude an sauberen Ergebnissen',
      'Grundkenntnisse Deutsch für die Abstimmung im Team',
      'Erfahrung ist willkommen, aber keine Voraussetzung – wir schulen Sie ein',
    ],
  },
  {
    id: 'objektleiter',
    title: 'Objektleiter (m/w/d)',
    type: 'Vollzeit',
    location: 'Frankfurt am Main (Niederlassung)',
    icon: 'lucide:clipboard-check',
    summary:
      'Sie führen Teams in mehreren Objekten, sichern die Qualität vor Ort und sind Ansprechperson für unsere Kunden in Frankfurt.',
    tasks: [
      'Einsatzplanung und Führung der Reinigungsteams',
      'Qualitätskontrollen, Einweisungen und Kundenkommunikation',
      'Material- und Maschinenmanagement, Mitwirkung bei Neuobjekten',
    ],
    profile: [
      'Erfahrung in der Gebäudereinigung, idealerweise als Vorarbeiter/in oder Objektleiter/in',
      'Organisationstalent, sicheres Auftreten, Führerschein Klasse B',
      'Gute Deutschkenntnisse in Wort und Schrift',
    ],
  },
];

export const benefits = [
  { icon: 'lucide:wallet', title: 'Faire Bezahlung', text: 'Tariforientierte Vergütung und transparente Abrechnung Ihrer Stunden.' },
  { icon: 'lucide:calendar-check', title: 'Pünktliches Gehalt', text: 'Ihr Lohn kommt zuverlässig zum vereinbarten Termin – jeden Monat.' },
  { icon: 'lucide:heart-handshake', title: 'Gutes Team', text: 'Feste Ansprechpersonen, respektvoller Umgang und kurze Wege.' },
  { icon: 'lucide:wrench', title: 'Moderne Arbeitsgeräte', text: 'Professionelle Maschinen, ergonomische Hilfsmittel und gestellte Arbeitskleidung.' },
  { icon: 'lucide:map-pin', title: 'Feste Objekte in Ihrer Nähe', text: 'Einsätze in Frankfurt und der Region – ohne weite Anfahrten.' },
  { icon: 'lucide:rocket', title: 'Entwicklung', text: 'Einarbeitung, Schulungen und Aufstiegschancen bis zur Objektleitung.' },
];

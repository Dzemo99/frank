/**
 * KUNDENSTIMMEN – PLATZHALTER
 * -------------------------------------------------------------------
 * Es werden NUR Einträge mit published=true angezeigt. In der lokalen
 * Entwicklung (npm run dev) erscheinen die Platzhalter zur Vorschau,
 * im Produktiv-Build bleiben sie unsichtbar, bis echte, freigegebene
 * Bewertungen eingetragen sind.
 *
 * Bitte nur echte Bewertungen mit Einverständnis des Kunden verwenden.
 * Quelle (z. B. Google-Rezension) und Datum dokumentieren.
 */
export type Testimonial = {
  quote: string;
  name: string;          // z. B. "M. Schneider" oder Firmenname
  role: string;          // z. B. "Office Manager, Kanzlei in Frankfurt-Westend"
  service?: string;      // z. B. "Büroreinigung"
  source?: string;       // z. B. "Google-Rezension, 03/2026"
  rating?: 1 | 2 | 3 | 4 | 5;
  published: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: '[PLATZHALTER – Originalzitat der Kundin / des Kunden]',
    name: '[Name oder Firma]',
    role: '[Funktion, Objektart, Stadtteil]',
    service: 'Büro- & Unterhaltsreinigung',
    source: '[Quelle, Datum]',
    rating: 5,
    published: false,
  },
  {
    quote: '[PLATZHALTER – Originalzitat der Kundin / des Kunden]',
    name: '[Name oder Firma]',
    role: '[Funktion, Objektart, Stadtteil]',
    service: 'Glas- & Fassadenreinigung',
    source: '[Quelle, Datum]',
    rating: 5,
    published: false,
  },
  {
    quote: '[PLATZHALTER – Originalzitat der Kundin / des Kunden]',
    name: '[Name oder Firma]',
    role: '[Funktion, Objektart, Stadtteil]',
    service: 'Praxis- & Hygienereinigung',
    source: '[Quelle, Datum]',
    rating: 5,
    published: false,
  },
];

/**
 * VORHER/NACHHER – PLATZHALTER
 * Echte Fotos nach src/assets/images/vorher-nachher/ legen und hier
 * importieren. Keine KI-Bilder! Gleiche Perspektive & Bildgröße verwenden.
 */
import vorherPlatzhalter from '../assets/images/vorher-platzhalter.svg';
import nachherPlatzhalter from '../assets/images/nachher-platzhalter.svg';

export type BeforeAfterItem = {
  title: string;
  description: string;
  before: ImageMetadata;
  after: ImageMetadata;
  published: boolean;
};

export const beforeAfter: BeforeAfterItem[] = [
  {
    title: '[Objekt, z. B. Tiefgarage Bürokomplex Niederrad]',
    description: '[Kurz: Was wurde gemacht? z. B. Grundreinigung Boden, Markierungen, Entfernung von Reifenabrieb]',
    before: vorherPlatzhalter,
    after: nachherPlatzhalter,
    published: false,
  },
];

/**
 * /js/config.js – wird beim Build STATISCH erzeugt.
 *
 * Liest die Tracking-IDs aus den Umgebungsvariablen (.env / Netlify) und
 * stellt sie dem bestehenden Cookie-Banner (public/js/consent.js) als
 * window.SITE_CONFIG bereit. Dadurch bleibt consent.js ein normales,
 * externes Skript – kein Inline-JS, strikte CSP möglich.
 *
 * Außerdem setzt es die Klasse "js" auf <html>, damit CSS weiß, dass
 * Reveal-Animationen (GSAP) aktiv sind.
 */
import type { APIRoute } from 'astro';
import { site } from '../../data/site';

export const GET: APIRoute = () => {
  const env = import.meta.env;
  const cfg = {
    gtmId: env.PUBLIC_GTM_ID || '',
    adsConversionId: env.PUBLIC_ADS_CONVERSION_ID || '',
    conversionLabels: {
      formular: env.PUBLIC_ADS_LABEL_FORMULAR || '',
      anruf: env.PUBLIC_ADS_LABEL_ANRUF || '',
      whatsapp: env.PUBLIC_ADS_LABEL_WHATSAPP || '',
    },
    ga4MeasurementId: env.PUBLIC_GA4_ID || '',
    // false = DSGVO-sicher: Google lädt erst nach Klick auf "Akzeptieren"
    tagVorEinwilligungLaden: false,
    phoneDisplay: site.phone.display,
  };

  const body =
    `/* generiert beim Build – nicht von Hand bearbeiten, Werte in .env pflegen */\n` +
    `document.documentElement.classList.add('js');\n` +
    `window.SITE_CONFIG = ${JSON.stringify(cfg, null, 2)};\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
  });
};

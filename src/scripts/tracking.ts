/**
 * CONVERSION-TRACKING
 * -------------------------------------------------------------------
 * Drei Events: form_submit, phone_click, whatsapp_click
 *
 * 1) dataLayer.push({ event: ... })  → für den Google Tag Manager.
 *    Im GTM je Event einen Trigger "Benutzerdefiniertes Ereignis" anlegen
 *    und die Google-Ads-Conversion-Tags daran hängen.
 * 2) Optional zusätzlich direkte gtag-Conversion (ohne GTM), wenn in
 *    .env Conversion-ID + Labels gepflegt sind.
 *
 * Es wird nur gefeuert, wenn der Nutzer im Cookie-Banner zugestimmt hat
 * (window.hatEinwilligung aus public/js/consent.js).
 */

type EventName = 'form_submit' | 'phone_click' | 'whatsapp_click';

const LABEL_KEY: Record<EventName, string> = {
  form_submit: 'formular',
  phone_click: 'anruf',
  whatsapp_click: 'whatsapp',
};

function hasConsent(): boolean {
  return typeof window.hatEinwilligung === 'function' && window.hatEinwilligung();
}

export function track(event: EventName, params: Record<string, string> = {}, done?: () => void) {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    done?.();
  };

  if (!hasConsent()) return finish();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  // Optional: direkte Ads-Conversion ohne GTM
  const cfg = window.SITE_CONFIG || {};
  const adsId = cfg.adsConversionId || '';
  const label = (cfg.conversionLabels || {})[LABEL_KEY[event]] || '';
  const canGtag =
    typeof window.gtag === 'function' && adsId && !adsId.startsWith('AW-X') && label && !/_LABEL$/.test(label);

  if (canGtag) {
    window.gtag!('event', 'conversion', { send_to: `${adsId}/${label}`, event_callback: finish });
    setTimeout(finish, 800);
  } else {
    finish();
  }
}

/** Klicks auf tel:- und WhatsApp-Links automatisch zählen */
export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest<HTMLAnchorElement>('a[href]');
    if (!link) return;
    const href = link.getAttribute('href')?.toLowerCase() ?? '';
    const place = link.dataset.place || 'unbekannt';
    if (href.startsWith('tel:')) track('phone_click', { place });
    else if (href.includes('wa.me') || href.includes('whatsapp.com')) track('whatsapp_click', { place });
  });
}

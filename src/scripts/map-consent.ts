/**
 * Google-Maps-Karte erst nach Klick laden (Zwei-Klick-Lösung).
 * Das iframe-src steht in data-map-src; vorher wird nichts von Google geladen.
 */
export function initMapConsent() {
  document.querySelectorAll<HTMLElement>('[data-map]').forEach((box) => {
    const button = box.querySelector<HTMLButtonElement>('[data-map-load]');
    const src = box.dataset.mapSrc;
    if (!button || !src) return;
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = box.dataset.mapTitle || 'Karte';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.className = 'absolute inset-0 h-full w-full border-0';
      iframe.setAttribute('allowfullscreen', '');
      box.replaceChildren(iframe);
    });
  });
}

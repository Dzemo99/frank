/**
 * Einstiegspunkt für alle Client-Skripte (wird von Layout.astro gebündelt).
 * Kein Framework – nur GSAP, DOM-APIs und etwas TypeScript.
 */
import { initClickTracking } from './tracking';
import { initHeader } from './header';
import { initAnimations } from './animations';
import { initMultiStepForms } from './multistep-form';
import { initSimpleForms } from './forms';
import { initBeforeAfter } from './before-after';
import { initMapConsent } from './map-consent';

function boot() {
  initClickTracking();
  initHeader();
  initMultiStepForms();
  initSimpleForms();
  initBeforeAfter();
  initMapConsent();
  // Animationen zuletzt – sie sind rein kosmetisch
  initAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

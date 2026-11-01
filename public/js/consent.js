/* ==========================================================================
   COOKIE-/EINWILLIGUNGS-BANNER  +  GOOGLE CONSENT MODE v2
   --------------------------------------------------------------------------
   Übernommen aus dem bestehenden Projekt (Ideale Haushaltshilfe). Angepasst
   wurden ausschließlich:
     - STORAGE_KEY (eigener Schlüssel für diese Website)
     - Banner-Text, Link zur Datenschutzerklärung (/datenschutz)
     - Telefonnummer kommt aus window.SITE_CONFIG.phoneDisplay
     - Abschnitt 2) lädt zusätzlich den Google Tag Manager (CFG.gtmId),
       sofern eine GTM-ID per Umgebungsvariable gesetzt ist.

   WICHTIG – Reihenfolge im <head> (siehe src/layouts/Layout.astro):
       1. /js/config.js   (wird beim Build aus den Umgebungsvariablen erzeugt)
       2. /js/consent.js  <-- diese Datei (OHNE defer!)
   Nur so ist garantiert, dass die Consent-Defaults ("denied") gesetzt sind,
   BEVOR irgendein Request an Google rausgeht.

   Verhalten:
   - Erster Besuch  -> alles auf "denied", es werden keine Marketing-Cookies
                       gesetzt und kein Google-Tag/GTM geladen. Banner erscheint.
   - "Akzeptieren"  -> consent update auf "granted", GTM bzw. Google-Tag wird geladen.
   - "Ablehnen"     -> bleibt auf "denied", Auswahl wird gemerkt.
   Die Entscheidung wird 6 Monate im localStorage gespeichert.
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'igr_consent_v1';
  var GUELTIG_TAGE = 180;

  var CFG = window.SITE_CONFIG || {};

  /* ------------------------------------------------------------------
     1) gtag-Grundgerüst + Consent-Defaults (läuft SOFORT, synchron)
     ------------------------------------------------------------------ */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  function gespeicherteEntscheidung() {
    try {
      var roh = localStorage.getItem(STORAGE_KEY);
      if (!roh) return null;
      var daten = JSON.parse(roh);
      var alterTage = (Date.now() - daten.zeitpunkt) / 86400000;
      if (alterTage > GUELTIG_TAGE) { localStorage.removeItem(STORAGE_KEY); return null; }
      return daten.status; // 'granted' | 'denied'
    } catch (e) {
      return null;
    }
  }

  var entscheidung = gespeicherteEntscheidung();

  // Default IMMER auf denied setzen – auch wenn schon zugestimmt wurde.
  // Die Zustimmung folgt gleich danach als 'update' (so schreibt es Google vor).
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted', // technisch notwendig
    security_storage: 'granted',      // technisch notwendig
    wait_for_update: 500,
  });

  // Für die EU/EWR + UK zusätzlich absichern
  gtag('consent', 'default', {
    region: ['DE', 'AT', 'CH', 'EU', 'GB'],
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });

  /* ------------------------------------------------------------------
     2) Google Tag Manager / Google-Tag nachladen – erst nach Einwilligung
     ------------------------------------------------------------------ */
  var tagGeladen = false;

  function googleTagLaden() {
    if (tagGeladen) return;

    var gtmId = CFG.gtmId || '';
    var adsId = CFG.adsConversionId || '';
    var ga4Id = CFG.ga4MeasurementId || '';
    var hauptId = adsId.indexOf('AW-X') === 0 ? '' : adsId;   // Platzhalter ignorieren

    // Variante A: Google Tag Manager (empfohlen – Conversions werden im GTM konfiguriert)
    if (gtmId && gtmId.indexOf('GTM-') === 0 && gtmId.indexOf('GTM-X') !== 0) {
      tagGeladen = true;
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var g = document.createElement('script');
      g.async = true;
      g.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtmId);
      document.head.appendChild(g);
      return;
    }

    // Variante B: direktes Google-Tag (gtag.js) ohne GTM
    if (!hauptId && !ga4Id) {
      // Noch keine echten IDs hinterlegt -> nichts laden (siehe .env.example)
      return;
    }
    tagGeladen = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(hauptId || ga4Id);
    document.head.appendChild(s);

    gtag('js', new Date());
    if (hauptId) gtag('config', hauptId);

    // Website-Anrufe (Conversion-Aktion "Anruf Website"): Google ersetzt die Nummer
    // auf der Seite für Anzeigen-Besucher durch eine Weiterleitungsnummer.
    var telLabel = (CFG.conversionLabels || {}).anrufWebsite || '';
    if (hauptId && telLabel && !/_LABEL$/.test(telLabel) && CFG.phoneDisplay) {
      gtag('config', hauptId + '/' + telLabel, { phone_conversion_number: CFG.phoneDisplay });
    }

    if (ga4Id) gtag('config', ga4Id, { anonymize_ip: true });
  }

  // Wenn früher schon zugestimmt wurde: Zustimmung sofort wiederherstellen
  if (entscheidung === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
    googleTagLaden();
  } else if (CFG.tagVorEinwilligungLaden === true) {
    // Optionale Variante: Tag lädt sofort, bleibt aber wegen der oben gesetzten
    // Defaults auf "denied" – also ohne Werbe-Cookies (Consent Mode "advanced").
    googleTagLaden();
  }

  // Von anderen Skripten abfragbar (z. B. bevor eine Conversion gefeuert wird)
  window.hatEinwilligung = function () {
    return gespeicherteEntscheidung() === 'granted';
  };

  /* ------------------------------------------------------------------
     3) Entscheidung speichern & anwenden
     ------------------------------------------------------------------ */
  function entscheidungSpeichern(status) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: status, zeitpunkt: Date.now() }));
    } catch (e) { /* z. B. privater Modus – dann gilt die Wahl nur für diese Sitzung */ }

    if (status === 'granted') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
      googleTagLaden();
    } else {
      gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
    }

    bannerSchliessen();
  }

  /* ------------------------------------------------------------------
     4) Banner-Oberfläche
     ------------------------------------------------------------------ */
  var banner = null;

  function bannerSchliessen() {
    if (!banner) return;
    banner.remove();
    banner = null;
  }

  function bannerAnzeigen() {
    banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Hinweis zu Cookies');

    banner.innerHTML =
      '<div class="consent-inner">' +
        '<div class="consent-text">' +
          '<strong>Wir respektieren Ihre Privatsphäre</strong>' +
          '<p>Wir verwenden Cookies und Google-Dienste, um zu messen, wie unsere Werbeanzeigen ' +
          'wirken. Diese Cookies setzen wir <em>nur</em> mit Ihrer Einwilligung – ohne Zustimmung ' +
          'funktioniert die Website uneingeschränkt weiter. Mehr dazu in unserer ' +
          '<a href="/datenschutz">Datenschutzerklärung</a>.</p>' +
        '</div>' +
        '<div class="consent-buttons">' +
          '<button type="button" class="btn-primary" data-consent="granted">Akzeptieren</button>' +
          '<button type="button" class="btn-secondary" data-consent="denied">Ablehnen</button>' +
        '</div>' +
      '</div>';

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (btn) entscheidungSpeichern(btn.getAttribute('data-consent'));
    });

    document.body.appendChild(banner);

    var ersterButton = banner.querySelector('button');
    if (ersterButton) ersterButton.focus({ preventScroll: true });
  }

  // Banner nur zeigen, wenn noch keine Entscheidung vorliegt
  function init() {
    if (gespeicherteEntscheidung() === null) bannerAnzeigen();

    // Link im Footer: <a href="#" data-consent-reset>Cookie-Einstellungen</a>
    document.addEventListener('click', function (e) {
      var reset = e.target.closest('[data-consent-reset]');
      if (!reset) return;
      e.preventDefault();
      try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
      if (!banner) bannerAnzeigen();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

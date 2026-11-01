# Ideale Gebäudereinigung – Website

Astro 5 · Tailwind CSS 3 · GSAP (ScrollTrigger) · Lucide-Icons (astro-icon) · Netlify (Hosting + Forms)
Zielmarkt: gewerbliche Gebäudereinigung in Frankfurt am Main & Rhein-Main. Hauptziel: B2B-Leads über Google Ads.

---

## 1. Projektstruktur

```
ideale-gebaeudereinigung/
├─ astro.config.mjs          Astro-Konfiguration (site-URL, Integrationen, Icons, Sitemap)
├─ tailwind.config.cjs       Farben (navy/accent/electric/mist), Fonts, Animationen
├─ netlify.toml              Build, Security-Header, CSP, Cache, Redirects
├─ package.json
├─ .env.example              Umgebungsvariablen (GTM-ID, Ads-IDs, Site-URL)
├─ public/
│  ├─ js/consent.js          Cookie-Banner + Google Consent Mode v2 (1:1 übernommen)
│  ├─ favicon.svg
│  └─ robots.txt
└─ src/
   ├─ assets/images/         Alle Bilder (web-taugliche Namen) → Astro <Image/> macht WebP/AVIF
   │  ├─ team-stimmung.png   Hero-/Karriere-Stimmungsbild (neutral, kein "Unser Team")
   │  ├─ buero.png           Büro- & Unterhaltsreinigung
   │  ├─ fenster.png         Glas- & Fassadenreinigung
   │  ├─ hebebuehne-fassade.jpg  Glas & Fassade (Gewerbe/Hochhaus)
   │  ├─ treppenhaus.png     Unterhaltsreinigung / Treppenhaus (+ Platzhalter-Bild Baureinigung)
   │  ├─ kita.png            Praxis- & Hygienereinigung
   │  ├─ stein.png           Sonder- & Grundreinigung
   │  ├─ laub.png / winter.png   NICHT eingebunden (nur bei Außenanlagen-/Winterdienst-Leistung)
   │  └─ vorher-/nachher-platzhalter.svg   Platzhalter für den Vorher/Nachher-Slider
   ├─ components/
   │  ├─ Header.astro        Sticky Glassmorphism-Header, Click-to-Call, CTA, Mobilmenü
   │  ├─ Footer.astro        Links, Impressum, Datenschutz, Cookie-Einstellungen, Einsatzgebiete
   │  ├─ MobileCtaBar.astro  Fixe Leiste (Anrufen / WhatsApp / Angebot) auf Smartphones
   │  ├─ CookieConsent.astro Platzhalter-Komponente – Banner kommt aus public/js/consent.js
   │  ├─ Hero.astro          Headline-Reveal, Parallax, Trust-Badges (nur aktive), Versprechen
   │  ├─ ServiceCards.astro  5 Leistungs-Karten
   │  ├─ WhyUs.astro         Qualität & Technik
   │  ├─ RegionFocus.astro   Frankfurt-Fokus + Städte-Laufband
   │  ├─ ServiceAreaMap.astro  SVG-Einsatzgebiet (kein externer Dienst)
   │  ├─ Testimonials.astro  Kundenstimmen + Vorher/Nachher (nur published: true)
   │  ├─ BeforeAfterSlider.astro  Interaktiver Slider
   │  ├─ MultiStepForm.astro Angebot in 60 Sek. (3 Schritte, Netlify Forms)
   │  ├─ ContactForm.astro / ExpressApplyForm.astro
   │  ├─ FaqAccordion.astro  FAQ (details/summary) + FAQPage-Schema
   │  ├─ ProcessTimeline.astro  Anfrage → Besichtigung → Konzept → Start
   │  ├─ CtaBanner.astro, SectionHeading.astro, Logo.astro, LocationCards.astro
   ├─ data/
   │  ├─ site.ts             Kontakt, Standorte, Einsatzgebiete, Trust-Badges, Versprechen, Navigation
   │  ├─ services.ts         5 Leistungen inkl. Meta-Title/-Description, Vorteile, Checkliste, FAQ, CTA
   │  ├─ testimonials.ts     Kundenstimmen & Vorher/Nachher (Platzhalter, published: false)
   │  └─ jobs.ts             Stellen + Benefits
   ├─ layouts/Layout.astro   <head>: SEO, OpenGraph, Schema.org (LocalBusiness ×2), Consent, GTM
   ├─ pages/
   │  ├─ index.astro         Startseite
   │  ├─ leistungen/index.astro + [slug].astro   Übersicht + 5 Landingpages
   │  ├─ qualitaet.astro, karriere.astro, ueber-uns.astro, kontakt.astro
   │  ├─ danke.astro, impressum.astro, datenschutz.astro, 404.astro
   │  └─ js/config.js.ts     erzeugt /js/config.js aus den Umgebungsvariablen (für consent.js)
   ├─ scripts/
   │  ├─ main.ts             Einstieg (von Layout gebündelt)
   │  ├─ animations.ts       GSAP: Hero-Reveal, Scroll-Reveals, Parallax, Timeline
   │  ├─ tracking.ts         form_submit / phone_click / whatsapp_click (dataLayer + optional gtag)
   │  ├─ multistep-form.ts, forms.ts, before-after.ts, header.ts, map-consent.ts
   └─ styles/global.css      Tailwind-Layer, Buttons, Karten, Formulare, Consent-Banner, Slider
```

URLs (ohne Slash am Ende, Netlify liefert `/name.html` als `/name` aus):

| Seite | URL |
| --- | --- |
| Start | `/` |
| Leistungen | `/leistungen` |
| Büro- & Unterhaltsreinigung | `/leistungen/bueroreinigung` |
| Glas- & Fassadenreinigung | `/leistungen/glas-und-fassadenreinigung` |
| Baureinigung & Bauendreinigung | `/leistungen/baureinigung` |
| Praxis- & Hygienereinigung | `/leistungen/praxisreinigung` |
| Sonder- & Grundreinigung | `/leistungen/grundreinigung` |
| Qualität & Ablauf | `/qualitaet` |
| Karriere | `/karriere` |
| Über uns / Kontakt | `/ueber-uns`, `/kontakt` |
| Danke (noindex) | `/danke` |

---

## 2. Lokal starten (VS Code)

Voraussetzung: Node.js 20 oder neuer (`node -v`), Git.

```bash
# 1. Ordner in VS Code öffnen (Datei → Ordner öffnen → ideale-gebaeudereinigung)
# 2. Terminal in VS Code öffnen (Strg + ö) und:
npm install
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
npm run dev                 # http://localhost:4321
```

Weitere Befehle:

```bash
npm run build      # Produktions-Build nach dist/
npm run preview    # Build lokal ansehen
npm run check      # Typ- und Astro-Prüfung
```

Empfohlene VS-Code-Erweiterungen: **Astro** (astro-build.astro-vscode), **Tailwind CSS IntelliSense**, **Prettier**.

---

## 3. Inhalte pflegen – Platzhalter vor dem Livegang

| Was | Wo |
| --- | --- |
| Adressen Frankfurt / Göttingen, Firmierung | `src/data/site.ts` → `locations`, `site.legalName` |
| Trust-Badges im Hero (nur echte Nachweise!) | `src/data/site.ts` → `trustBadges` (`active: true`) |
| Kundenstimmen (nur echte, freigegebene) | `src/data/testimonials.ts` (`published: true`) |
| Vorher/Nachher-Fotos (keine KI-Bilder) | Fotos nach `src/assets/images/`, in `testimonials.ts` importieren, `published: true` |
| Impressum / Datenschutz | `src/pages/impressum.astro`, `src/pages/datenschutz.astro` – alle gelb markierten `[TODO]` |
| Leistungstexte, FAQ, Meta-Daten je Anzeigengruppe | `src/data/services.ts` |
| Stellen & Benefits | `src/data/jobs.ts` |
| Logo (sobald Datei vorliegt) | `src/components/Logo.astro` |
| Domain | `.env` → `PUBLIC_SITE_URL`, zusätzlich `public/robots.txt` |

Kundenstimmen und Vorher/Nachher werden im **Produktiv-Build erst angezeigt, wenn `published: true`** gesetzt ist. Im Dev-Modus sind die Platzhalter sichtbar (mit gelbem Hinweis).

---

## 4. Tracking & Datenschutz

- **Cookie-Banner / Consent Mode v2**: `public/js/consent.js` (bestehender Banner, Schlüssel `igr_consent_v1`). Standard: alles `denied`, Google wird erst nach „Akzeptieren“ geladen.
- **Google Tag Manager**: `PUBLIC_GTM_ID` in `.env` bzw. in Netlify setzen. Ohne ID wird nichts geladen. Der Container wird von `consent.js` **nach Einwilligung** nachgeladen.
- **Conversion-Events** (`src/scripts/tracking.ts`): `form_submit`, `phone_click`, `whatsapp_click` werden in den `dataLayer` gepusht (mit `form_name` bzw. `place`). Im GTM je Event einen Trigger „Benutzerdefiniertes Ereignis“ anlegen und die Google-Ads-Conversion-Tags daran hängen.
- **Ohne GTM**: `PUBLIC_ADS_CONVERSION_ID` + Labels in `.env` → `tracking.ts` feuert `gtag('event','conversion')` direkt.
- **Formulare**: Netlify Forms (`angebot`, `kontakt`, `bewerbung`), Honeypot, Datenschutz-Checkbox, Weiterleitung auf `/danke`. In Netlify unter *Forms → Notifications* die E-Mail-Benachrichtigung an info@… einrichten.
- **Google Maps** lädt erst nach Klick (Kontaktseite). Schriften sind lokal (kein Google Fonts).
- **CSP** in `netlify.toml` erlaubt nur eigene Skripte + Google-Domains; Astro bettet keine Inline-Skripte ein (`assetsInlineLimit: 0`).

---

## 5. Auf GitHub pushen

```bash
# im Projektordner (Git ist bereits initialisiert, erster Commit vorhanden)
git status

# Neues, leeres Repository auf github.com anlegen (ohne README/.gitignore), dann:
git remote add origin https://github.com/<DEIN-ACCOUNT>/ideale-gebaeudereinigung.git
git branch -M main
git push -u origin main
```

Spätere Änderungen:

```bash
git add -A
git commit -m "Kurze Beschreibung der Änderung"
git push
```

---

## 6. Bei Netlify live schalten

1. Auf app.netlify.com anmelden → **Add new site → Import an existing project → GitHub** → Repository `ideale-gebaeudereinigung` wählen.
2. Build-Einstellungen werden aus `netlify.toml` gelesen (Build `npm run build`, Publish `dist`, Node 22). Einfach **Deploy** klicken.
3. **Umgebungsvariablen** setzen: *Site configuration → Environment variables*:
   - `PUBLIC_SITE_URL` = `https://www.ideale-gebaeudereinigung.de`
   - `PUBLIC_GTM_ID` = `GTM-XXXXXXX` (sobald vorhanden)
   - optional `PUBLIC_ADS_CONVERSION_ID` + Labels
   Danach **Trigger deploy → Clear cache and deploy site**.
4. **Formulare**: *Site configuration → Forms* → Form detection aktivieren (falls nicht automatisch). Nach dem ersten Deploy erscheinen `angebot`, `kontakt`, `bewerbung`. Unter *Forms → Form notifications* E-Mail-Benachrichtigung einrichten.
5. **Domain**: *Domain management → Add a domain* → `ideale-gebaeudereinigung.de` + `www`. DNS beim Provider auf Netlify zeigen lassen (Netlify zeigt die Einträge an). HTTPS wird automatisch ausgestellt.
6. Testen: Formular absenden (Eingang in Netlify Forms prüfen), Cookie-Banner, Click-to-Call, Lighthouse (Chrome → DevTools → Lighthouse, Mobile).

### Google Ads
- Ziel-URLs der Anzeigengruppen: die fünf Landingpages unter `/leistungen/...`.
- Jede Landingpage hat eigene Meta-Title/-Description, H1, FAQ-Schema und das vorausgewählte Anfrageformular (`?leistung=` wird ebenfalls unterstützt).
- Conversions im GTM auf die drei dataLayer-Events mappen.

---

## 7. Lighthouse-Hinweise

- Bilder werden beim Build nach WebP/AVIF konvertiert und in mehreren Breiten ausgeliefert (`<Image>`/`<Picture>` aus `astro:assets`).
- Hero-Bild `loading="eager"` + `fetchpriority="high"`, alle anderen lazy.
- Schriften als variable WOFF2 lokal (Inter, Manrope).
- Animationen respektieren `prefers-reduced-motion`.

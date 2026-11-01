// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // Öffentliche Domain – wird für Canonical, OpenGraph, Sitemap und Schema.org benötigt.
  // In .env als PUBLIC_SITE_URL überschreibbar (z. B. Netlify-Preview-URL).
  site: PUBLIC_SITE_URL || 'https://www.ideale-gebaeudereinigung.de',

  // Saubere URLs ohne Slash am Ende: /leistungen/bueroreinigung (Netlify "Pretty URLs")
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Kleine Stylesheets inline einbetten (Critical CSS), große als Datei ausliefern
    inlineStylesheets: 'auto',
  },

  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon({
      include: {
        // Nur die tatsächlich genutzten Lucide-Icons werden gebündelt
        lucide: [
          'phone', 'mail', 'message-circle', 'menu', 'x', 'arrow-right', 'arrow-up-right',
          'check', 'check-circle-2', 'chevron-down', 'chevron-right', 'chevron-left', 'map-pin', 'clock',
          'shield-check', 'sparkles', 'building-2', 'briefcase', 'layout-grid', 'hard-hat',
          'stethoscope', 'brush', 'leaf', 'users', 'clipboard-check', 'timer', 'badge-check',
          'send', 'file-text', 'eye', 'lightbulb', 'rocket', 'star', 'quote', 'wallet',
          'calendar-check', 'wrench', 'heart-handshake', 'zap', 'lock', 'external-link', 'info',
          'ruler', 'repeat', 'building', 'landmark', 'factory', 'home', 'cookie', 'smartphone',
          'calendar', 'target', 'move-horizontal', 'droplets', 'search-check', 'user-check',
        ],
      },
    }),
    sitemap({
      filter: (page) => !/\/(danke|impressum|datenschutz|js\/)/.test(page),
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE' } },
    }),
  ],

  image: {
    // Sharp erzeugt WebP/AVIF aus den PNG/JPG-Quellen in src/assets/images
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  vite: {
    build: {
      // Skripte NICHT inline einbetten → strikte Content-Security-Policy ohne 'unsafe-inline' möglich
      assetsInlineLimit: 0,
    },
  },
});

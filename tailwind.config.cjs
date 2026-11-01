/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/js/*.js'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        /* Deep Premium Navy / Slate – Seriosität & B2B-Vertrauen */
        navy: {
          50: '#f3f6fb',
          100: '#e5ebf5',
          200: '#c7d4ea',
          300: '#9ab1d8',
          400: '#6788c1',
          500: '#4467aa',
          600: '#34508e',
          700: '#2b4174',
          800: '#1f2f54',
          900: '#13203b',
          950: '#0a1226',
        },
        /* Cyan / Electric Blue – Dynamik & Frische */
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        electric: {
          DEFAULT: '#0ea5e9',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        /* Clean White & Light Gray – Lesbarkeit */
        mist: {
          50: '#fafbfd',
          100: '#f4f6fa',
          200: '#e9edf3',
          300: '#d9dfe8',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        display: ['"Manrope Variable"', '"Inter Variable"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-md': ['clamp(1.6rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,18,38,0.04), 0 8px 24px -12px rgba(10,18,38,0.18)',
        lift: '0 2px 4px rgba(10,18,38,0.05), 0 20px 40px -20px rgba(10,18,38,0.28)',
        glow: '0 0 0 1px rgba(34,211,238,0.35), 0 10px 30px -10px rgba(14,165,233,0.55)',
        glass: '0 8px 32px -12px rgba(10,18,38,0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a1226 0%, #13203b 45%, #1f2f54 100%)',
        'accent-gradient': 'linear-gradient(90deg, #22d3ee 0%, #0ea5e9 100%)',
        'grid-light':
          'linear-gradient(to right, rgba(19,32,59,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(19,32,59,0.06) 1px, transparent 1px)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        shimmer: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,211,238,0.45)' },
          '70%': { boxShadow: '0 0 0 12px rgba(34,211,238,0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .5s ease-out both',
        shimmer: 'shimmer 1.4s ease-in-out',
        'pulse-soft': 'pulse-soft 2.4s ease-out infinite',
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
};

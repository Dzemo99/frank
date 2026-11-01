/**
 * GSAP-ANIMATIONEN (dezent, performant)
 * - Hero-Text-Reveal (Wort für Wort)
 * - Scroll-Reveals für [data-reveal] und [data-reveal-group]
 * - Leichter Parallax für [data-parallax]
 * - Timeline-Linie (/qualitaet) scrubbt mit dem Scroll
 * Respektiert prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  if (reduceMotion) {
    // Alles sofort sichtbar machen
    gsap.set('[data-reveal], [data-reveal-group] > *', { clearProps: 'all', opacity: 1 });
    document.documentElement.classList.remove('js');
    return;
  }

  heroReveal();
  scrollReveals();
  parallax();
  timeline();
}

/* ---------- Hero ---------- */
function heroReveal() {
  const words = gsap.utils.toArray<HTMLElement>('.word-reveal > span');
  if (words.length) {
    gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.045, delay: 0.1 },
    );
  }
  const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero-item]');
  if (heroItems.length) {
    gsap.fromTo(
      heroItems,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.5 },
    );
  }
}

/* ---------- Scroll-Reveals ---------- */
function scrollReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const fadeOnly = el.dataset.reveal === 'fade';
    gsap.to(el, {
      opacity: 1,
      y: fadeOnly ? undefined : 0,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      clearProps: 'transform',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
}

/* ---------- Parallax ---------- */
function parallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallax || '12');
    gsap.fromTo(
      el,
      { yPercent: -strength / 2 },
      {
        yPercent: strength / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('[data-parallax-container]') ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    );
  });
}

/* ---------- Timeline (Qualität & Ablauf) ---------- */
function timeline() {
  const line = document.querySelector<HTMLElement>('.timeline-line');
  const wrap = document.querySelector<HTMLElement>('[data-timeline]');
  if (!line || !wrap) return;

  gsap.fromTo(
    line,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
    },
  );

  gsap.utils.toArray<HTMLElement>('[data-timeline-step]').forEach((step) => {
    const dot = step.querySelector<HTMLElement>('[data-timeline-dot]');
    ScrollTrigger.create({
      trigger: step,
      start: 'top 65%',
      onEnter: () => {
        step.classList.add('is-active');
        if (dot) gsap.fromTo(dot, { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' });
      },
      once: true,
    });
  });
}

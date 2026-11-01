/**
 * MULTI-STEP-FORMULAR "Angebot in 60 Sekunden"
 * Schritt 1 Leistung → Schritt 2 Objekt & Fläche → Schritt 3 Kontakt → Absenden
 * - Validierung pro Schritt
 * - Fortschrittsanzeige + Zusammenfassung
 * - Versand an Netlify Forms, Conversion-Event form_submit, Redirect /danke
 * - Ohne JS: alle Schritte sichtbar, klassischer POST (siehe global.css)
 */
import { track } from './tracking';
import { submitToNetlify, validateFields, showFieldError } from './forms';

export function initMultiStepForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-multistep]').forEach(setup);
}

function setup(form: HTMLFormElement) {
  const steps = Array.from(form.querySelectorAll<HTMLElement>('.form-step'));
  const progressItems = Array.from(form.querySelectorAll<HTMLElement>('[data-progress-step]'));
  const progressBar = form.querySelector<HTMLElement>('[data-progress-bar]');
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type=submit]');
  const submitText = submitBtn?.textContent ?? '';
  const summary = form.querySelector<HTMLElement>('[data-summary]');
  const formName = form.getAttribute('name') ?? 'angebot';
  const redirect = form.dataset.redirect || '/danke';
  let current = 0;

  // Vorauswahl über URL (?leistung=...) oder Button-Klick (data-preselect)
  const url = new URL(window.location.href);
  const pre = url.searchParams.get('leistung');
  if (pre) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="leistung"][value="${CSS.escape(pre)}"]`);
    if (radio) radio.checked = true;
  }

  const show = (index: number) => {
    current = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((s, i) => {
      s.style.display = i === current ? 'block' : 'none';
      s.setAttribute('aria-hidden', String(i !== current));
    });
    progressItems.forEach((p, i) => {
      p.classList.toggle('is-active', i === current);
      p.classList.toggle('is-done', i < current);
      p.setAttribute('aria-current', i === current ? 'step' : 'false');
    });
    if (progressBar) progressBar.style.width = `${((current + 1) / steps.length) * 100}%`;
    if (current === steps.length - 1) renderSummary();
    // Beim Schrittwechsel sanft zum Formular scrollen (nur wenn außerhalb)
    const top = form.getBoundingClientRect().top;
    if (top < 0 || top > 140) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    steps[current]?.querySelector<HTMLElement>('input, select, textarea, button')?.focus({ preventScroll: true });
  };

  const renderSummary = () => {
    if (!summary) return;
    const get = (name: string) => {
      const el = form.querySelector<HTMLInputElement | HTMLSelectElement>(
        `input[name="${name}"]:checked, select[name="${name}"], input[name="${name}"]:not([type=radio])`,
      );
      return el?.value?.trim() || '–';
    };
    const flaeche = get('flaeche_exakt') !== '–' ? `${get('flaeche_exakt')} m²` : get('flaeche');
    summary.innerHTML = `
      <dt>Leistung</dt><dd>${escapeHtml(get('leistung'))}</dd>
      <dt>Fläche</dt><dd>${escapeHtml(flaeche)}</dd>
      <dt>Intervall</dt><dd>${escapeHtml(get('intervall'))}</dd>
      <dt>Objekt-Ort</dt><dd>${escapeHtml(get('objekt_ort'))}</dd>`;
  };

  // Navigation
  form.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const next = target.closest<HTMLElement>('[data-next]');
    const prev = target.closest<HTMLElement>('[data-prev]');
    if (next) {
      e.preventDefault();
      if (validateFields(steps[current]!)) show(current + 1);
    } else if (prev) {
      e.preventDefault();
      show(current - 1);
    }
  });

  // Enter in Schritt 1/2 = weiter statt absenden
  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const t = e.target as HTMLElement;
    if (t.tagName === 'TEXTAREA' || t.tagName === 'BUTTON') return;
    if (current < steps.length - 1) {
      e.preventDefault();
      if (validateFields(steps[current]!)) show(current + 1);
    }
  });

  // Auswahl-Karte geklickt → automatisch weiter (schneller auf Mobile)
  form.querySelectorAll<HTMLInputElement>('input[type=radio][data-autoadvance]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const group = radio.closest<HTMLElement>('[data-field]');
      group?.querySelector('.field-error')?.classList.remove('is-visible');
      window.setTimeout(() => {
        if (steps[current]?.contains(radio)) show(current + 1);
      }, 220);
    });
  });

  form.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.getAttribute('aria-invalid') === 'true' && t.checkValidity()) showFieldError(t, false);
  });

  // Absenden
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateFields(steps[current]!)) return;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet …';
    }
    status?.classList.add('hidden');

    try {
      await submitToNetlify(form);
      track('form_submit', { form_name: formName }, () => {
        window.location.href = `${redirect}?f=${encodeURIComponent(formName)}`;
      });
    } catch {
      if (status) {
        status.textContent =
          'Leider konnte Ihre Anfrage gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.';
        status.classList.remove('hidden');
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitText;
      }
    }
  });

  show(0);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

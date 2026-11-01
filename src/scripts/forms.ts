/**
 * Einfache Netlify-Formulare (Kontakt, Express-Bewerbung):
 * AJAX-Versand, Validierung, Conversion-Event, Weiterleitung auf /danke.
 */
import { track } from './tracking';

export function encodeForm(form: HTMLFormElement): URLSearchParams {
  const data = new FormData(form);
  const params = new URLSearchParams();
  data.forEach((value, key) => {
    if (typeof value === 'string') params.append(key, value);
  });
  return params;
}

export async function submitToNetlify(form: HTMLFormElement): Promise<void> {
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeForm(form).toString(),
  });
  if (!res.ok) throw new Error(`Netlify Forms antwortete mit ${res.status}`);
}

export function showFieldError(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, show: boolean) {
  input.setAttribute('aria-invalid', String(show));
  const error = input.closest('[data-field]')?.querySelector<HTMLElement>('.field-error');
  error?.classList.toggle('is-visible', show);
}

/** Validiert alle Pflichtfelder innerhalb eines Containers */
export function validateFields(scope: HTMLElement): boolean {
  let valid = true;
  let first: HTMLElement | null = null;
  const fields = scope.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    'input:not([type=hidden]), select, textarea',
  );
  const radioGroups = new Set<string>();

  fields.forEach((field) => {
    if (field instanceof HTMLInputElement && field.type === 'radio') {
      if (field.required) radioGroups.add(field.name);
      return;
    }
    const ok = field.checkValidity();
    showFieldError(field, !ok);
    if (!ok) {
      valid = false;
      first ??= field;
    }
  });

  radioGroups.forEach((name) => {
    const checked = scope.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    const group = scope.querySelector<HTMLElement>(`[data-field="${name}"]`);
    const error = group?.querySelector<HTMLElement>('.field-error');
    error?.classList.toggle('is-visible', !checked);
    if (!checked) {
      valid = false;
      first ??= group ?? null;
    }
  });

  const target = first as HTMLElement | null;
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.focus({ preventScroll: true });
  }
  return valid;
}

export function initSimpleForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-netlify-ajax]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const button = form.querySelector<HTMLButtonElement>('button[type=submit]');
    const buttonText = button?.textContent ?? '';
    const formName = form.getAttribute('name') ?? 'formular';
    const redirect = form.dataset.redirect || '/danke';

    // Fehlermeldung live zurücksetzen
    form.addEventListener('input', (e) => {
      const t = e.target as HTMLInputElement;
      if (t.getAttribute('aria-invalid') === 'true' && t.checkValidity()) showFieldError(t, false);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateFields(form)) return;

      if (button) {
        button.disabled = true;
        button.textContent = 'Wird gesendet …';
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
            'Leider konnte Ihre Nachricht gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.';
          status.classList.remove('hidden');
        }
        if (button) {
          button.disabled = false;
          button.textContent = buttonText;
        }
      }
    });
  });
}

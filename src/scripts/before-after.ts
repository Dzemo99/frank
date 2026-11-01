/**
 * Vorher/Nachher-Slider – Range-Input steuert clip-path per CSS-Variable.
 * Tastatur: Pfeiltasten über den Range-Input. Maus/Touch: ziehen.
 */
export function initBeforeAfter() {
  document.querySelectorAll<HTMLElement>('[data-before-after]').forEach((root) => {
    const range = root.querySelector<HTMLInputElement>('.ba-range');
    if (!range) return;

    const set = (value: number) => {
      const v = Math.max(0, Math.min(100, value));
      root.style.setProperty('--pos', `${v}%`);
      range.value = String(v);
      range.setAttribute('aria-valuenow', String(Math.round(v)));
    };

    range.addEventListener('input', () => set(parseFloat(range.value)));

    // Direktes Ziehen auf dem Bild (Pointer Events)
    let dragging = false;
    const fromEvent = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      set(((e.clientX - rect.left) / rect.width) * 100);
    };
    root.addEventListener('pointerdown', (e) => {
      dragging = true;
      root.setPointerCapture(e.pointerId);
      fromEvent(e);
    });
    root.addEventListener('pointermove', (e) => dragging && fromEvent(e));
    const stop = () => (dragging = false);
    root.addEventListener('pointerup', stop);
    root.addEventListener('pointercancel', stop);

    set(parseFloat(range.value) || 50);
  });
}

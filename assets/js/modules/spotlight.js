/**
 * Efecto "spotlight": una luz que sigue al cursor dentro de los elementos [data-spotlight].
 * JS solo pasa la posición (--mx, --my); el dibujo lo hace CSS.
 * Se activa únicamente en dispositivos con mouse (en celular no hay "hover").
 */
export function initSpotlight(selector = '[data-spotlight]') {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
}

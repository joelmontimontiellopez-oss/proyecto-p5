/**
 * Hace aparecer elementos .reveal cuando entran en pantalla.
 * IntersectionObserver es mucho más eficiente que escuchar el evento "scroll".
 */
export function initReveal(selector = '.reveal') {
  const elementos = document.querySelectorAll(selector);
  const mostrar = (el) => el.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    elementos.forEach(mostrar); // navegador viejo: mostrar todo
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          mostrar(entrada.target);
          observer.unobserve(entrada.target); // animar solo una vez
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  elementos.forEach((el) => observer.observe(el));
}

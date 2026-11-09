/**
 * Menú móvil accesible: botón con aria-expanded, cierra con Escape y al elegir un enlace.
 */
export function initNav() {
  const boton = document.querySelector('.nav-toggle');
  const menu = document.getElementById(boton?.getAttribute('aria-controls'));
  if (!boton || !menu) return;

  const etiqueta = boton.querySelector('.visually-hidden');

  function setAbierto(abierto) {
    boton.setAttribute('aria-expanded', String(abierto));
    menu.classList.toggle('is-open', abierto);
    etiqueta.textContent = abierto ? 'Cerrar menú' : 'Abrir menú';
  }

  boton.addEventListener('click', () => {
    setAbierto(boton.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setAbierto(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') {
      setAbierto(false);
      boton.focus(); // regresar el foco al botón
    }
  });
}

/**
 * Simulador de costos: suma sillas, mesas y brincolines y, al final,
 * pregunta si cotizamos con ese número (Sí → WhatsApp con el resumen, No → ajustar).
 */
import { calcularCotizacion } from './ventas-utils.js';
import { construirEnlaceWhatsApp } from './whatsapp.js';

export function initQuote(root, config) {
  if (!root) return;
  const { precios, whatsapp, locale, moneda } = config;
  const form = root.querySelector('[data-quote-form]');
  const lines = root.querySelector('[data-quote-lines]');
  const totalEl = root.querySelector('[data-quote-total]');
  const ask = root.querySelector('[data-quote-ask]');
  const yes = root.querySelector('[data-quote-yes]');
  const no = root.querySelector('[data-quote-no]');
  const reply = root.querySelector('[data-quote-reply]');

  const formato = new Intl.NumberFormat(locale, { style: 'currency', currency: moneda, maximumFractionDigits: 0 });
  const dinero = { format: (n) => `${formato.format(n)} ${moneda}` }; // ej. $1,800 MXN

  root.querySelectorAll('[data-price]').forEach((el) => {
    el.textContent = `${dinero.format(precios[el.dataset.price])} por día`;
  });

  function leer() {
    const datos = new FormData(form);
    return Object.fromEntries(['sillas', 'mesas', 'brincolines'].map((k) => [k, datos.get(k)]));
  }

  function actualizar() {
    const { lineas, total } = calcularCotizacion(leer(), precios);
    lines.replaceChildren(...lineas.map((l) => {
      const li = document.createElement('li');
      const nombre = document.createElement('span');
      nombre.textContent = `${l.cantidad} ${l.nombre.toLowerCase()}`;
      const monto = document.createElement('span');
      monto.textContent = dinero.format(l.subtotal);
      li.append(nombre, monto);
      return li;
    }));
    totalEl.textContent = dinero.format(total);
    ask.hidden = total === 0;
    reply.hidden = true;

    const resumen = lineas.map((l) => `${l.cantidad} ${l.nombre.toLowerCase()}`).join(', ');
    const mensaje = `Hola Fiesta Montiel, me gustaría cotizar la renta de: ${resumen}. Total estimado de renta: ${dinero.format(total)}. ¿Me confirman disponibilidad?`;
    yes.href = construirEnlaceWhatsApp(whatsapp.numero, mensaje);
    yes.target = '_blank';
    yes.rel = 'noopener noreferrer';
  }

  form.addEventListener('input', actualizar);
  form.addEventListener('submit', (e) => e.preventDefault());
  yes.addEventListener('click', () => {
    reply.textContent = '¡Listo! Te abrimos WhatsApp para que nos mandes tu cotización.';
    reply.hidden = false;
  });
  no.addEventListener('click', () => {
    reply.textContent = 'Sin problema. Cambia las cantidades y vuelve a calcular, o pregúntanos lo que quieras por WhatsApp.';
    reply.hidden = false;
  });

  actualizar();
}

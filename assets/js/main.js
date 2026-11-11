/**
 * Punto de entrada. Solo importa e inicializa; la lógica vive en cada módulo.
 */
import { CONFIG } from './config.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initSalesTable } from './modules/sales-table.js';
import { initWhatsApp } from './modules/whatsapp.js';
import { initQuote } from './modules/quote.js';
import { initSpotlight } from './modules/spotlight.js';

initNav();
initSalesTable(document.querySelector('[data-sales]'));
initWhatsApp(CONFIG.whatsapp);
initQuote(document.querySelector('[data-quote]'), CONFIG);
initReveal();
initSpotlight();

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

window.__fiestaListo = true; // avisa a la red de seguridad de index.html

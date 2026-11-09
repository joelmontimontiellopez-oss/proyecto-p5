/**
 * Tabla de ventas: dibuja filas, filtra por categoría y ordena por columna.
 * Patrón: un objeto "estado" + una función render() que pinta según el estado.
 * (Es la misma idea que usan React o Vue, pero sin librería.)
 */
import { VENTAS, CATEGORIAS } from '../data/ventas.js';
import { CONFIG } from '../config.js';
import { filtrarPorCategoria, ordenar, resumir } from './ventas-utils.js';

export function initSalesTable(root) {
  if (!root) return;

  const tbody = root.querySelector('[data-tbody]');
  const filtro = root.querySelector('[data-filter]');
  const live = root.querySelector('[data-live]');
  const headers = root.querySelectorAll('th[data-col]');

  // Intl.NumberFormat formatea según el país: $1,234.00 en es-MX
  const dinero = new Intl.NumberFormat(CONFIG.locale, { style: 'currency', currency: CONFIG.moneda });
  const numero = new Intl.NumberFormat(CONFIG.locale);

  const estado = { categoria: 'todas', campo: 'unidades', direccion: 'desc' };

  // Crear celdas con textContent (NO innerHTML) evita inyección de código (XSS)
  function celda(tag, texto, clase) {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    el.textContent = texto;
    return el;
  }

  function crearFila(item, indice) {
    const tr = document.createElement('tr');
    tr.className = 'row-enter';
    tr.style.setProperty('--i', indice);

    const producto = celda('th', item.producto);
    producto.scope = 'row';

    const categoria = document.createElement('td');
    categoria.append(celda('span', CATEGORIAS[item.categoria], `badge badge--${item.categoria}`));

    tr.append(
      producto,
      categoria,
      celda('td', numero.format(item.unidades), 'num'),
      celda('td', dinero.format(item.precioUnitario), 'num'),
    );
    return tr;
  }

  function render() {
    const filas = ordenar(filtrarPorCategoria(VENTAS, estado.categoria), estado.campo, estado.direccion);

    const fragmento = document.createDocumentFragment(); // 1 sola inserción al DOM
    filas.forEach((item, i) => fragmento.append(crearFila(item, i)));
    tbody.replaceChildren(fragmento);

    const { totalVentas, totalUnidades, top } = resumir(filas);
    root.querySelector('[data-foot="unidades"]').textContent = numero.format(totalUnidades);
    root.querySelector('[data-stat="unidades"]').textContent = numero.format(totalUnidades);
    root.querySelector('[data-stat="top"]').textContent = top ? top.producto : '—';

    // aria-sort le dice al lector de pantalla qué columna está ordenada
    headers.forEach((th) => {
      if (th.dataset.col === estado.campo) {
        th.setAttribute('aria-sort', estado.direccion === 'asc' ? 'ascending' : 'descending');
      } else {
        th.removeAttribute('aria-sort');
      }
    });

    live.textContent = `Mostrando ${filas.length} productos.`;
  }

  filtro.addEventListener('change', () => {
    estado.categoria = filtro.value;
    render();
  });

  root.querySelectorAll('[data-sort]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const campo = boton.dataset.sort;
      if (estado.campo === campo) {
        estado.direccion = estado.direccion === 'asc' ? 'desc' : 'asc';
      } else {
        estado.campo = campo;
        // texto empieza A→Z; números empiezan del mayor al menor
        estado.direccion = campo === 'producto' || campo === 'categoria' ? 'asc' : 'desc';
      }
      render();
    });
  });

  render();
}

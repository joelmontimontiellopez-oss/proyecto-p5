/**
 * Funciones PURAS (sin tocar el DOM): reciben datos y devuelven datos.
 * Por eso se pueden probar fácilmente en tests/index.html.
 */
import { CATEGORIAS } from '../data/ventas.js';

export function calcularTotal(item) {
  return item.unidades * item.precioUnitario;
}

export function filtrarPorCategoria(items, categoria) {
  if (categoria === 'todas') return [...items];
  return items.filter((item) => item.categoria === categoria);
}

function valorParaOrdenar(item, campo) {
  if (campo === 'total') return calcularTotal(item);
  if (campo === 'categoria') return CATEGORIAS[item.categoria];
  return item[campo];
}

/** Devuelve una COPIA ordenada (no modifica el arreglo original). */
export function ordenar(items, campo, direccion = 'asc') {
  const factor = direccion === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const va = valorParaOrdenar(a, campo);
    const vb = valorParaOrdenar(b, campo);
    if (typeof va === 'string') return va.localeCompare(vb, 'es') * factor;
    return (va - vb) * factor;
  });
}

/** Cotización: cantidades × precios. Devuelve líneas y total. */
export function calcularCotizacion(cantidades, precios) {
  const nombres = { sillas: 'Sillas', mesas: 'Mesas', brincolines: 'Brincolines' };
  const lineas = [];
  let total = 0;
  for (const clave of Object.keys(nombres)) {
    const n = Math.max(0, Math.floor(Number(cantidades[clave]) || 0));
    if (n === 0) continue;
    const subtotal = n * precios[clave];
    lineas.push({ clave, nombre: nombres[clave], cantidad: n, subtotal });
    total += subtotal;
  }
  return { lineas, total };
}

export function resumir(items) {
  let totalVentas = 0;
  let totalUnidades = 0;
  let top = null;

  for (const item of items) {
    const total = calcularTotal(item);
    totalVentas += total;
    totalUnidades += item.unidades;
    if (!top || total > calcularTotal(top)) top = item;
  }

  return { totalVentas, totalUnidades, top };
}

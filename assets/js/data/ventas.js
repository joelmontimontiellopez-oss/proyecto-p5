/**
 * Datos de ventas (DE EJEMPLO).
 * - El "total" NO se guarda: se calcula (unidades × precio) para que nunca se contradiga.
 * - Precios en pesos MXN enteros. Si algún día usas centavos, guárdalos como enteros
 *   (ej. 38050 = $380.50) para evitar errores de decimales en JavaScript (0.1 + 0.2 ≠ 0.3).
 * - En un proyecto real estos datos vendrían de una API o base de datos.
 */
export const CATEGORIAS = Object.freeze({
  sillas: 'Sillas',
  mesas: 'Mesas',
  inflables: 'Juegos inflables',
});

export const VENTAS = Object.freeze([
  { id: 'silla-plegable', producto: 'Silla plegable de plástico', categoria: 'sillas', unidades: 120, precioUnitario: 35 },
  { id: 'silla-infantil', producto: 'Silla infantil', categoria: 'sillas', unidades: 60, precioUnitario: 25 },
  { id: 'mesa-redonda', producto: 'Mesa redonda (10 personas)', categoria: 'mesas', unidades: 18, precioUnitario: 180 },
  { id: 'mesa-tablon', producto: 'Mesa tablón rectangular', categoria: 'mesas', unidades: 25, precioUnitario: 120 },
  { id: 'mesa-infantil', producto: 'Mesa infantil', categoria: 'mesas', unidades: 30, precioUnitario: 85 },
  { id: 'inflable-castillo', producto: 'Inflable castillo', categoria: 'inflables', unidades: 4, precioUnitario: 1200 },
  { id: 'inflable-tobogan', producto: 'Inflable tobogán', categoria: 'inflables', unidades: 2, precioUnitario: 1800 },
  { id: 'inflable-mini', producto: 'Brincolín mini', categoria: 'inflables', unidades: 6, precioUnitario: 650 },
]);

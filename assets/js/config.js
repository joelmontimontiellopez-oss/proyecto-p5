/**
 * Configuración del sitio. Cambia aquí tus datos reales.
 * Tener la configuración separada evita buscar "números mágicos" por todo el código.
 */
export const CONFIG = Object.freeze({
  negocio: 'fiesta montiel',
  locale: 'es-MX',
  moneda: 'MXN',
  // Precios del simulador (pesos MXN enteros, por evento).
  precios: {
    sillas: 25,
    mesas: 80,
    brincolines: 650,
    entrega: 150, // se cobra una vez si pides algo
  },
  whatsapp: {
    // Formato internacional SIN "+", espacios ni guiones.
    // México: 52 + 10 dígitos. ⚠️ Este número es de EJEMPLO: cámbialo por el tuyo.
    numero: ' 52 2412391518',
    mensaje: 'Hola Fiesta Montiel, quiero cotizar sillas, mesas o juegos inflables para mi evento.',
  },
});

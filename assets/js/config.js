/**
 * Configuración del sitio. Cambia aquí tus datos reales.
 * Tener la configuración separada evita buscar "números mágicos" por todo el código.
 */
export const CONFIG = Object.freeze({
  negocio: 'fiesta montiel',
  locale: 'es-MX',
  moneda: 'MXN',
  // Precios del simulador (pesos mexicanos MXN enteros, por día de renta).
  precios: {
    sillas: 25,
    mesas: 80,
    brincolines: 650,
  },
  whatsapp: {
    // Formato internacional SIN "+", espacios ni guiones.
    // México: 52 + 10 dígitos. ⚠️ Este número es de EJEMPLO: cámbialo por el tuyo.
    numero: ' 52 2412391518',
    mensaje: 'Hola Fiesta Montiel, quiero cotizar la renta de sillas, mesas o juegos inflables para mi evento.',
  },
});

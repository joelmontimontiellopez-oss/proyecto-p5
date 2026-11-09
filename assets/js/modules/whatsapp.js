/**
 * WhatsApp: arma el enlace oficial "click to chat" (https://wa.me/<número>?text=<mensaje>)
 * y genera el código QR en el navegador (sin mandar el número a servicios externos).
 */

export function construirEnlaceWhatsApp(numero, mensaje = '') {
  const soloDigitos = String(numero).replace(/\D/g, ''); // quita +, espacios, guiones
  const base = `https://wa.me/${soloDigitos}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export function initWhatsApp({ numero, mensaje }) {
  const url = construirEnlaceWhatsApp(numero, mensaje);

  document.querySelectorAll('[data-whatsapp-link]').forEach((enlace) => {
    enlace.href = url;
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer'; // seguridad: la pestaña nueva no controla la nuestra
  });

  const contenedor = document.querySelector('[data-whatsapp-qr]');
  if (!contenedor) return;

  // La librería se carga en index.html como script clásico y crea window.qrcode
  if (typeof window.qrcode !== 'function') {
    contenedor.textContent = 'No se pudo generar el QR. Usa el botón "Abrir WhatsApp".';
    return;
  }

  // typeNumber 0 = tamaño automático; 'M' = corrige ~15% de daño en el código
  const qr = window.qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  // SVG: se ve nítido a cualquier tamaño (no se pixela como un PNG).
  // Es seguro usar innerHTML aquí porque el SVG lo genera la librería, no el usuario.
  contenedor.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
}

# Cómo probar el proyecto

Primero levanta el servidor: `python -m http.server 8000` y abre http://localhost:8000

## 1. Pruebas automáticas (unitarias)

Abre http://localhost:8000/tests/ y debe decir **TODAS PASARON: 9/9**.

Experimento: en `assets/js/modules/ventas-utils.js` cambia `item.unidades * item.precioUnitario`
por `item.unidades + item.precioUnitario`, recarga `/tests/` y verás pruebas en rojo ❌.
Regrésalo como estaba. **Así se comprueba que la prueba sí detecta errores.**

## 2. Verificar los datos a mano

Comprueba con calculadora que el total de la tabla sea correcto:

| Producto | Unidades × Precio | Total |
|---|---|---|
| Silla plegable | 120 × 380 | 45,600 |
| Silla Tiffany | 40 × 1,200 | 48,000 |
| Silla infantil | 60 × 250 | 15,000 |
| Mesa redonda | 18 × 2,800 | 50,400 |
| Mesa tablón | 25 × 1,900 | 47,500 |
| Mesa infantil | 30 × 850 | 25,500 |
| Inflable castillo | 4 × 18,500 | 74,000 |
| Inflable tobogán | 2 × 32,000 | 64,000 |
| Brincolín mini | 6 × 9,800 | 58,800 |
| **Total** | **305 unidades** | **$428,800** |

## 3. Responsive (Chrome o Edge)

1. `F12` → ícono de celular (*Toggle device toolbar*, o `Ctrl+Shift+M`).
2. Prueba con: iPhone SE (375px), iPhone 14 (390px), iPad (768px) y escritorio (1280px).
3. Verifica:
   - [ ] No aparece barra de scroll horizontal en la página (solo dentro de la tabla).
   - [ ] En celular aparece el botón ☰, y en escritorio el menú normal.
   - [ ] Las tarjetas pasan de 1 columna a 3.
   - [ ] El QR y el texto de contacto se apilan en celular.

## 4. Animaciones

- [ ] Pasa el mouse por botones, tarjetas, indicadores, el QR y el menú.
- [ ] Haz clic en los encabezados de la tabla: la flecha gira y las filas entran animadas.
- [ ] Cambia la categoría: las filas se animan y los indicadores se actualizan.
- [ ] Recarga y haz scroll: las secciones aparecen.
- [ ] Mueve el mouse **dentro** de una tarjeta o indicador: una luz rosa sigue al cursor (spotlight).
- [ ] Pasa el mouse por una tarjeta: el borde arcoíris se enciende y gira.
- [ ] Pasa el mouse por un botón: cruza un destello de luz.
- [ ] La cinta de colores bajo el hero se desplaza sin saltos.
- [ ] **Movimiento reducido:** `F12` → `Ctrl+Shift+P` → escribe "reduced motion" → *Emulate CSS prefers-reduced-motion: reduce*. Las animaciones se deben apagar.

## 5. WhatsApp y QR

1. **Cambia el número de ejemplo** en `assets/js/config.js` por uno real (por ejemplo, el tuyo).
2. Para abrir la página en tu celular, la computadora y el celular deben estar en el mismo WiFi:
   ```powershell
   python -m http.server 8000 --bind 0.0.0.0
   ipconfig   # busca "Dirección IPv4", ej. 192.168.1.50
   ```
   En el celular abre `http://192.168.1.50:8000` (Windows puede pedir permiso en el firewall).
3. - [ ] Escanea el QR de la pantalla de la compu con la cámara del celular → se abre WhatsApp con el mensaje escrito.
   - [ ] En el celular, toca "Abrir WhatsApp" → se abre la app.
   - [ ] Toca el botón flotante verde → se abre la app.

## 6. Accesibilidad

- [ ] **Solo teclado:** desconecta el mouse. `Tab` recorre todo y el foco siempre es visible. `Enter` ordena la tabla. `Esc` cierra el menú móvil.
- [ ] El primer `Tab` muestra "Saltar al contenido".
- [ ] **Lighthouse:** `F12` → pestaña *Lighthouse* → marca Accessibility, Best Practices, SEO y Performance → *Analyze*. Meta: 90+ en cada uno.
- [ ] **Lector de pantalla:** Windows trae *Narrador* (`Ctrl+Win+Enter`). Navega la tabla y escucha cómo anuncia columnas y filas.
- [ ] Extensión **axe DevTools** (gratis): debe mostrar 0 problemas graves.

## 7. Validación de código

- [ ] HTML: sube `index.html` en https://validator.w3.org/#validate_by_upload → 0 errores.
- [ ] CSS: https://jigsaw.w3.org/css-validator/ (puede marcar avisos por funciones modernas como `text-wrap`; son avisos, no errores).

## 8. Sin JavaScript (mejora progresiva)

`F12` → `Ctrl+Shift+P` → "Disable JavaScript" → recarga. El contenido se debe ver (sin tabla ni QR, con el aviso `<noscript>`). Vuelve a activarlo después.

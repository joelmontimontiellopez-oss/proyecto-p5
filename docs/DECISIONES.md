# Registro de decisiones

Cada decisión tiene: **qué** se eligió, **por qué**, **qué alternativa** se descartó y **dónde verificarlo**
(fuente oficial). En la industria a esto se le llama *ADR* (Architecture Decision Record).

Fuentes principales:
- **MDN Web Docs** (developer.mozilla.org): documentación de HTML/CSS/JS, mantenida por Mozilla, Google, Microsoft y otros.
- **WCAG 2.2** (w3.org/WAI): el estándar internacional de accesibilidad web.
- **web.dev** (Google): guías de rendimiento y buenas prácticas.

---

## 1. Tecnología: HTML + CSS + JavaScript "puro" (sin React, sin Vite)

- **Por qué:** es la base de todo. React, Vue y demás son JavaScript por debajo; si entiendes esto, aprendes cualquier framework. Tampoco hay que instalar nada: en tu equipo no está Node.js.
- **Alternativa descartada:** React + Vite. Es el estándar en empresas para apps grandes, pero para una landing page agrega complejidad sin beneficio real.
- **Siguiente paso cuando crezcas:** instalar Node.js y migrar a Vite. La estructura ya está pensada para eso (`assets/`, módulos ES).

## 2. Estructura de carpetas: separar por tipo y por responsabilidad

- **Por qué:** *separación de responsabilidades*. HTML = contenido, CSS = presentación, JS = comportamiento. Dentro de JS, cada módulo hace una sola cosa (principio de responsabilidad única). Si falla el QR, sabes que el problema está en `whatsapp.js`.
- **`data/` separada de la lógica:** cambiar precios no debería obligarte a tocar código.
- **`config.js`:** el número de WhatsApp está en un solo lugar, sin "números mágicos" regados por el código.
- **`vendor/`:** código de terceros aparte, para que nunca lo mezcles con el tuyo ni lo edites por accidente.

## 3. Módulos ES (`import` / `export`)

- **Por qué:** es el sistema de módulos oficial de JavaScript (ES2015) y lo soportan todos los navegadores modernos. Evita variables globales que chocan entre archivos.
- **Costo:** necesitan un servidor (no funcionan con `file://`). Por eso el README dice cómo levantar uno.
- **Fuente:** MDN → "JavaScript modules".

## 4. HTML semántico

| Etiqueta | Por qué |
|---|---|
| `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` | Los lectores de pantalla y Google entienden las partes de la página. |
| Un solo `<h1>`, luego `<h2>`, `<h3>` en orden | Jerarquía clara; los lectores de pantalla navegan por títulos. |
| `<table>` con `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `scope` | Una tabla de datos DEBE ser `<table>`, no `<div>`s. Así el lector de pantalla dice "columna Total, fila Silla Tiffany". |
| `<button>` para acciones, `<a>` para navegar | El botón funciona con teclado (Enter/Espacio) sin código extra. |
| `<dl>` para los indicadores | Son pares término → valor ("Total vendido" → "$428,800"). |
| `lang="es-MX"` | El lector de pantalla pronuncia en español; el navegador sabe cómo dividir palabras. |

- **Fuente:** MDN → "HTML elements reference"; WCAG 1.3.1 (Información y relaciones).

## 5. Accesibilidad (a11y)

- **Enlace "Saltar al contenido":** con teclado, te salta el menú. Pruébalo: carga la página y presiona `Tab`.
- **`:focus-visible`:** muestra un contorno al navegar con teclado, pero no al hacer clic con el mouse.
- **Contraste de colores (WCAG 1.4.3, mínimo 4.5:1 para texto normal).** Lo medí con la fórmula oficial de WCAG:

  | Combinación | Contraste | ¿Pasa? |
  |---|---|---|
  | Blanco sobre violeta `#6d28d9` | 7.10:1 | ✅ |
  | **Blanco sobre verde WhatsApp `#25d366`** | **1.98:1** | ❌ |
  | Verde oscuro `#052e16` sobre verde WhatsApp | 7.52:1 | ✅ (por eso el botón usa texto oscuro) |
  | Texto gris `#5b5670` sobre blanco | 6.98:1 | ✅ |
  | Amarillo `#fde68a` sobre violeta | 5.70:1 | ✅ |

  Verifícalo tú en webaim.org/resources/contrastchecker
- **`aria-expanded`** en el botón del menú: el lector de pantalla anuncia "contraído" o "expandido".
- **`aria-sort`** en las columnas: anuncia "ordenado descendente".
- **`aria-live="polite"`:** cuando filtras, el lector de pantalla dice "Mostrando 3 productos".
- **Tamaño táctil de 44 a 48px** en botones (WCAG 2.5.5 / 2.5.8): fácil de tocar con el dedo.
- **`prefers-reduced-motion`:** si alguien activó "reducir movimiento" en su sistema (las animaciones le pueden causar mareo), se apagan. WCAG 2.3.3.

## 6. CSS

- **Variables CSS (*design tokens*) en `tokens.css`:** cambias el color principal en 1 línea y cambia en todo el sitio. Así trabajan los *design systems* de empresas (Material, Shopify Polaris).
- **Mobile-first:** primero estilos para celular y luego `@media (min-width: 48em)` para pantallas grandes. Más del 60% del tráfico web es móvil, y es más fácil agregar columnas que quitarlas. Uso `em` en las media queries porque respetan el zoom del usuario.
- **`clamp()` en tamaños de texto:** el título crece suave entre celular y escritorio, sin saltos.
- **Grid con `repeat(auto-fit, minmax(...))`:** las tarjetas se acomodan solas en 1, 2 o 3 columnas, **sin media queries**.
- **Nombres BEM** (`card__title`, `btn--whatsapp`): con solo leer la clase sabes a qué pertenece. Evita choques de nombres.
- **Fuentes:** en la v1 usé fuentes del sistema (0 descargas). En el rediseño cambié a Google Fonts, porque un estilo extravagante necesita personalidad tipográfica. Ver sección 11.
- **Tabla en celular = desplazamiento horizontal dentro de su caja.** La alternativa ("convertir filas en tarjetas" con `display:block`) se ve bonita, pero en algunos navegadores borra la semántica de tabla para los lectores de pantalla. Elegí lo seguro. La caja tiene `tabindex="0"` para poder desplazarla con las flechas del teclado.

## 7. Animaciones

- **Solo se animan `transform` y `opacity`.** El navegador los puede animar en la GPU sin recalcular el layout. Animar `width`, `top` o `margin` provoca tirones. Fuente: web.dev → "How to create high-performance CSS animations".
- **Duraciones de 150 a 600ms.** Las animaciones de interfaz menores a ~300ms se sienten instantáneas; las de más de 1s se sienten lentas.
- **`IntersectionObserver`** para "aparecer al hacer scroll": el navegador avisa cuando un elemento entra en pantalla. Escuchar el evento `scroll` se dispara cientos de veces por segundo y gasta batería.
- **Mejora progresiva:** los elementos solo se ocultan si existe la clase `.js` en `<html>`. Si JavaScript falla, todo se ve igual (sin animación, pero visible).
- **El `<li>` anima la entrada y el `<article>` anima el hover:** si las dos animaciones van en el mismo elemento, sus `transition` se pisan (bug real que encontré al construirlo).

| Interacción | Animación |
|---|---|
| Pasar el mouse por un botón | Sube 2px y gana sombra; al presionar se encoge (`scale(.97)`) |
| Pasar el mouse por una tarjeta | Se eleva y el ícono gira |
| Pasar el mouse por un enlace del menú | Subrayado que crece de izquierda a derecha |
| Menú móvil | La hamburguesa se transforma en X y el menú se desliza |
| Ordenar o filtrar la tabla | Las filas entran escalonadas; la flecha gira |
| Scroll | Las secciones aparecen deslizándose |
| Botón flotante | Pulso continuo para llamar la atención |
| Hero | Globos flotando y texto que entra escalonado |

## 8. JavaScript

- **Patrón "estado + render()":** la tabla tiene un objeto `estado` (filtro, columna, dirección). Cada cambio actualiza el estado y vuelve a pintar todo. Es exactamente la idea de React, sin la librería.
- **Funciones puras en `ventas-utils.js`:** no tocan el DOM, así que se pueden probar solas (ver `tests/`).
- **El total NO se guarda en los datos, se calcula** (unidades × precio). Si lo guardaras, algún día alguien cambiaría el precio y olvidaría el total, y los datos se contradirían ("única fuente de verdad").
- **Dinero en enteros.** En JavaScript `0.1 + 0.2 = 0.30000000000000004`. Si usas centavos, guárdalos como enteros (38050 = $380.50).
- **`Intl.NumberFormat('es-MX', {currency:'MXN'})`:** formato de moneda oficial del navegador, con comas y signo de pesos correctos.
- **`textContent` en lugar de `innerHTML`** al pintar los datos: si un dato contuviera `<script>`, `innerHTML` lo ejecutaría (ataque XSS). `textContent` lo trata como texto.
- **`DocumentFragment`:** se arman todas las filas en memoria y se insertan al DOM de una sola vez (un solo repintado).
- **`defer` y `type="module"`:** el JS no bloquea que se pinte la página.

## 9. WhatsApp y QR

- **Enlace oficial `https://wa.me/<número>?text=<mensaje>`** ("Click to Chat"): funciona en celular (abre la app) y en computadora (abre WhatsApp Web). Fuente: faq.whatsapp.com → "Cómo usar la función de chat con un clic".
- **El número va en formato internacional sin `+` ni espacios** (`52` + 10 dígitos en México).
- **`encodeURIComponent(mensaje)`:** convierte espacios, acentos y signos (`¿`, `,`) a un formato válido para URL. Hay una prueba que lo verifica.
- **El QR se genera en el navegador** con la librería `qrcode-generator` (MIT, descargada en `vendor/`).
  - **Descartado:** usar APIs de QR en internet (ej. `api.qrserver.com`), porque le mandas tu número a un tercero y, si su servicio se cae, tu QR desaparece.
  - **Descartado:** cargarla desde un CDN sin fijar versión, porque si el CDN cambia el archivo, tu sitio cambia sin que te enteres.
- **Formato SVG:** el QR se ve nítido a cualquier tamaño. Un PNG se pixela al agrandarlo, y un QR borroso no se escanea.
- **Corrección de errores nivel M (~15%):** el QR se sigue leyendo aunque esté un poco dañado o con reflejos.
- **Fondo blanco con margen ("quiet zone"):** los lectores de QR necesitan contraste y un borde limpio.
- **También hay botón, no solo QR:** si estás EN el celular, no puedes escanear tu propia pantalla.
- **`rel="noopener noreferrer"`** en enlaces con `target="_blank"`: la pestaña nueva no puede manipular la tuya.

## 10. Calidad del proyecto

- **`.editorconfig`:** todos los editores usan 2 espacios y UTF-8 (si no, aparecen los acentos rotos tipo `FiestaFÃ¡cil`).
- **`.gitignore`:** evita subir basura o secretos (`.env`) a GitHub.
- **README:** lo primero que lee cualquiera que abra tu proyecto.
- **Pruebas unitarias** (`tests/`): verifican los cálculos automáticamente.

---

## 11. Rediseño v2: "Neón de fiesta" (para gustos extravagantes)

**Objetivo:** que la página se sienta como una fiesta (luces de discoteca, neón, confeti) sin romper ninguna regla de las secciones anteriores.

### Qué cambió y por qué

| Elemento | Decisión | Por qué |
|---|---|---|
| Fondo | Oscuro `#0b0320` con "luces" (`radial-gradient`) fijas | Los neones solo brillan sobre fondo oscuro, como en una discoteca. |
| Paleta | Rosa `#ff3ec9`, violeta `#a46bff`, cian `#2de2ff`, dorado `#ffd23f` | Son colores de fiesta. Todos pasan contraste sobre el fondo (tabla abajo). |
| `color-scheme: dark` | En `:root` | El `<select>` y las barras de scroll nativas se ven oscuras, no blancas. |
| Tipografía | **Unbounded** (títulos) + **Outfit** (texto), Google Fonts | Unbounded es ancha y redonda, muy "de fiesta". Outfit se lee fácil. |
| Vidrio esmerilado | `backdrop-filter: blur()` + fondo blanco al 5% | Tendencia actual ("glassmorphism"); da profundidad. |
| Texto degradado | `background-clip: text` | Títulos que brillan. Tiene un `color` de respaldo si el navegador no lo soporta. |
| Borde de luz giratorio | `@property --angle` + `conic-gradient` + `mask` | Un borde arcoíris que gira. Si el navegador no soporta `@property`, el borde queda fijo (no se rompe nada). |
| Spotlight | `spotlight.js` pasa la posición del mouse a CSS (`--mx`, `--my`) | Una luz sigue al cursor en tarjetas e indicadores. JS solo da números; CSS dibuja. Solo se activa con mouse (`hover: hover`). |
| Confeti y orbes | `<i>` y `<span>` con `aria-hidden="true"` | Pura decoración: los lectores de pantalla la ignoran. Solo usan `transform` (rápido). |
| Cinta en movimiento | Contenido duplicado + `translateX(-50%)` | Al llegar a la mitad, se ve idéntico al inicio: bucle infinito sin salto. |
| Brillo en botones | Pseudo-elemento `::after` que cruza el botón | Efecto "destello" al pasar el mouse. |

### Fuentes externas: costo y cómo lo mitigué
- **Costo:** dos peticiones extra a Google y algo de peso. Si no hay internet, se usa `system-ui` (la página sigue funcionando).
- **`preconnect`:** abre la conexión a Google antes de pedir la fuente.
- **`display=swap`:** el texto se muestra de inmediato con la fuente del sistema y cambia cuando llega la nueva (no hay texto invisible). Fuente: web.dev → "Best practices for fonts".
- **Solo los pesos usados** (400, 600, 700 y 600, 800): cada peso es un archivo más.

### Contraste del tema oscuro (medido con la fórmula WCAG, mínimo 4.5:1)

| Combinación | Contraste |
|---|---|
| Texto `#f7f1ff` / fondo | 18.11:1 ✅ |
| Texto gris `#c3b6e4` / vidrio | 9.72:1 ✅ |
| Dorado / fondo (encabezados de tabla, total) | 13.87:1 ✅ |
| Insignia rosa / su fondo | 6.28:1 ✅ |
| Insignia cian / su fondo | 8.86:1 ✅ |
| Insignia dorada / su fondo | 9.40:1 ✅ |
| Violeta / fondo (parte más oscura del degradado) | 5.84:1 ✅ |
| Texto oscuro sobre la cinta (parte violeta) | 5.84:1 ✅ |
| Pie del QR `#3b3355` / blanco | 11.73:1 ✅ |
| Tinta verde / botón WhatsApp | 7.52:1 ✅ |

### Errores que encontré al probar el rediseño (y cómo los arreglé)
1. **Scroll horizontal en celular (399px en una pantalla de 390px).** La cinta está girada y agrandada (`rotate(-2deg) scale(1.04)`), así que sobresalía. Lo arreglé envolviéndola en `.marquee-wrap { overflow: hidden }`. Lo medí con `document.documentElement.scrollWidth`: ahora da 390.
2. **"Reducir movimiento" no quitaba los retrasos.** Las tarjetas tenían `transition-delay` escalonado y la regla de accesibilidad solo acortaba la duración. Agregué `transition-delay: 0s !important`.

### Lo que NO cambió (a propósito)
- **El QR sigue sobre fondo blanco.** Un QR blanco sobre negro, o con colores, falla en muchos lectores.
- **El botón de WhatsApp sigue verde oficial con texto oscuro.** Es reconocible y pasa contraste.
- Toda la lógica de JS, las pruebas, la semántica HTML y la accesibilidad.

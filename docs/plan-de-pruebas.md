# Plan de pruebas – Rutas de recolección Dosquebradas

**Objetivo:** Validar que la demo cumple los requisitos definidos en [requerimientos.md](requerimientos.md).  
**Responsable de ejecución:** Santiago. **Aceptación:** Juanita Trejos.

---

## Cómo ejecutar la aplicación (para correr las pruebas)

1. **Instalar dependencias:**  
   `npm install`  
   (Si falla con `ENOTEMPTY`, ejecutar: `rm -rf node_modules && npm install`.)

2. **Generar datos y levantar el servidor de desarrollo:**  
   `npm run dev`

3. **Abrir en el navegador:**  
   http://localhost:4321

4. **Build para producción / Netlify:**  
   `npm run build`  
   La salida queda en la carpeta `dist/`. En Netlify, usar comando `npm run build` y directorio de publicación `dist`.

---

## 1. Búsqueda por barrio o dirección

| ID | Caso | Pasos | Resultado esperado |
|----|------|--------|---------------------|
| B01 | Búsqueda por barrio con resultados | Ir a Inicio → escribir "Buenos Aires" → Buscar | Se muestran rutas que incluyen Buenos Aires (ej. SEA Eje Cafetero). Lista con nombre, día, hora, empresa. Mapa centrado en la zona. |
| B02 | Búsqueda por otro barrio | Buscar "La Pradera" | Aparecen rutas de La Pradera (Entorno Limpio, Vitapланet, SEA, etc. según datos). Mapa centrado. |
| B03 | Búsqueda por dirección o texto similar | Buscar "Calle 42" o "Guadalupe" | Si hay rutas asociadas, se listan; si no, mensaje de "no hay ruta registrada" y sugerencia de contactar. |
| B04 | Sin resultados | Buscar "Barrio Inexistente XYZ" o texto que no coincida con ningún dato | Mensaje claro: no hay ruta registrada para ese barrio/dirección + contacto secretaría. No errores ni pantalla en blanco. |
| B05 | Búsqueda vacía | Pulsar Buscar sin escribir o con solo espacios | No se rompe la página; se muestra mensaje o se pide ingresar barrio/dirección. |
| B06 | Acentos y mayúsculas | Buscar "buenos aires", "BUENOS AIRES", "Santa Isabel" | Los resultados son coherentes con los datos (normalización de texto si aplica). |

---

## 2. Navegación y estructura

| ID | Caso | Pasos | Resultado esperado |
|----|------|--------|---------------------|
| N01 | Menú Inicio | Clic en "Inicio" | Se muestra la página de inicio con el buscador y la frase principal. |
| N02 | Menú Rutas | Clic en "Rutas" | Se muestra el listado completo de rutas por empresa y quién las opera. |
| N03 | Menú Contactos | Clic en "Contactos" | Se muestra sede (Desarrollo agropecuario y gestión ambiental), dirección, teléfono, extensión 195 y datos de empresas si existen. |
| N04 | Logo | Revisar cabecera | Logo de la Alcaldía Dosquebradas visible (cuando el archivo esté en el proyecto). |
| N05 | Enlace desde resultado "contactar" | Si en "sin resultados" hay enlace a contacto | Lleva a la página Contactos o a la sección de contacto. |

---

## 3. Contenido de páginas

| ID | Caso | Resultado esperado |
|----|------|---------------------|
| C01 | Inicio – textos de reciclaje | Hay contenido sobre importancia del reciclaje y/o cómo separar residuos (según lo definido). |
| C02 | Rutas – empresas | Aparecen las 4 fuentes: Entorno Limpio, Vitapланet, Punto Verde, SEA Eje Cafetero. |
| C03 | Rutas – detalle | Cada ruta (o grupo) muestra información útil: nombre, barrios/zonas, días, horarios, operador/empresa. |
| C04 | Contactos – sede | Dirección Calle 42 N° 10B-26, teléfono (57) 606 3515333, extensión 195. |
| C05 | Contactos – empresas | Datos de contacto de empresas si están definidos; si no, placeholder o "consultar secretaría". |
| C06 | Idioma y formato | Textos en español; fechas y horas en formato local (Colombia). |

---

## 4. Mapa

| ID | Caso | Resultado esperado |
|----|------|---------------------|
| M01 | Mapa tras búsqueda con resultados | El mapa se centra en la zona/barrio buscado (o en Dosquebradas si no hay geocoding específico). |
| M02 | Mapa sin errores | No aparecen errores de consola por API o tiles; se usan Leaflet + OpenStreetMap. |
| M03 | Ruta dibujada (cuando existan datos) | Cuando se incorporen shape/KML/GeoJSON, en las pruebas se validará que la ruta se dibuja correctamente sobre el mapa. |

---

## 5. Datos y actualización

| ID | Caso | Resultado esperado |
|----|------|---------------------|
| D01 | Rutas Entorno Limpio | Los barrios y horarios mostrados coinciden con `Tabla de atributos_ENTORNO.csv`. |
| D02 | Rutas Vitapланet | Coinciden con `Tabla de atributos Rutas VITAPLANET.csv` (barrios, días, horarios). |
| D03 | Rutas Punto Verde | Coinciden con `RUTAS_PUNTOVERDE.csv`. |
| D04 | Rutas SEA Eje Cafetero | Coinciden con `Rutas SEA EJECAFETERO.csv` (barrios, días, horarios). |
| D05 | Sin filas vacías | Las filas vacías de los CSV (ej. Punto Verde) no generan rutas duplicadas o líneas en blanco en la UI. |

---

## 6. Diseño y usabilidad básica

| ID | Caso | Resultado esperado |
|----|------|---------------------|
| U01 | Estilo verde/medio ambiente | La página usa una paleta verde/ambiental coherente con el tema. |
| U02 | Responsive | La página es usable en móvil y escritorio (buscador, lista, mapa, menú). |
| U03 | Accesibilidad básica | Contraste razonable, botones y enlaces utilizables por teclado. |

---

## 7. Checklist previo a entrega al cliente

- [ ] Búsqueda por barrio/dirección devuelve resultados correctos (B01–B03).
- [ ] Sin resultados muestra mensaje y contacto (B04, B05).
- [ ] Navegación Inicio / Rutas / Contactos funciona (N01–N05).
- [ ] Contenido de Rutas completo por las 4 empresas (C02, C03).
- [ ] Contactos con sede y datos de empresas (C04, C05).
- [ ] Mapa carga y centra en zona (M01, M02).
- [ ] Datos alineados con los 4 CSV (D01–D05).
- [ ] Estilo verde y responsive (U01, U02).

Cuando estas pruebas estén pasando, se comparte la demo con Juanita para su validación y confirmación.

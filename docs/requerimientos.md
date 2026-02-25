# Requisitos del proyecto – Rutas de recolección de residuos aprovechables (Dosquebradas)

**Cliente:** Juanita Trejos  
**Tipo:** Propuesta / demo de producto (no sitio oficial).  
**Stack:** Astro + Netlify. Leaflet + OpenStreetMap (herramientas gratuitas).  
**Idioma:** Español (Colombia). Fechas y horas en formato local.

---

## 1. Objetivo y alcance

| Requisito | Detalle |
|-----------|--------|
| **Perfiles de usuario** | (1) **Ciudadano:** consultar rutas por barrio/dirección. (2) **Administrador:** en el futuro podría modificar datos; por ahora no se implementa, pero la estructura de datos debe permitirlo. |
| **Fase** | Todo lo definido aquí corresponde a la **primera fase** (entregable completo). |
| **Integración** | Es una demo/propuesta; puede ser sitio alternativo. No hay restricción de dominio oficial. |

---

## 2. Fuentes de datos

- **Únicas fuentes de verdad:** los 4 conjuntos de datos actuales.
- **Archivos en el proyecto:** están en la carpeta **`recursos/datos/`**:
  - `Tabla de atributos_ENTORNO.csv` – Entorno Limpio (nombre ruta, comuna, frecuencia, horario, reciclador).
  - `Tabla de atributos Rutas VITAPLANET.csv` – Vitapланet (n° ruta, recorrido, comuna, barrio/zona, día, horario).
  - `RUTAS_PUNTOVERDE.csv` – Punto Verde (macro ruta, barrio, sector, comuna, frecuencia, hora, reciclador).
  - `Rutas SEA EJECAFETERO.csv` – SEA Eje Cafetero (empresa, barrio/zona, comuna, día, hora, medio de recolección).
- **Geometría (shape/KML):** No disponible en esta fase. Las rutas están "definidas" y no cambian con frecuencia, pero el sistema debe **soportar actualización** de datos (por ejemplo reemplazar CSV o, en el futuro, cargar shape/KML) para que la ciudadanía vea información actualizada si en algún momento cambia.
- **Formato:** Los CSV usan `;` como separador. Codificación a considerar: UTF-8.

---

## 3. Búsqueda "por mi casa o barrio"

| Requisito | Detalle |
|-----------|--------|
| **Criterios de búsqueda** | Por **barrio** y/o por **dirección** (texto libre o calle/carrera). Con los datos actuales la búsqueda se apoyará sobre todo en barrios y zonas presentes en los CSV. |
| **Resultado esperado** | Para cada ruta que coincida: **nombre de la ruta**, **día(s) de recolección**, **horario**, **empresa/operador**. Además: **mapa** centrado en la zona/barrio, y cuando existan datos geométricos (shape/KML/GeoJSON), **trazado de la ruta** sobre el mapa y **ruta completa** (descripción o secuencia de puntos). |
| **Sin resultados** | Mostrar mensaje claro tipo: "No hay ruta de reciclaje registrada para ese barrio o dirección" y sugerir contactar a la secretaría (incluir datos de contacto del proyecto). |
| **Nota técnica** | En esta fase, sin shape/KML, el mapa se centrará en el barrio/zona (geocoding o coordenadas fijas por barrio si se definen). El dibujo de la "ruta completa" sobre el mapa se implementará cuando se disponga de geometría (shape/KML/GeoJSON). |

---

## 4. Estructura del sitio y contenido

### 4.1 Navegación (según boceto)

- **Cabecera:** Logo Alcaldía Dosquebradas (`alcaldiaDosquebradas` – colocar en el proyecto cuando se disponga del archivo).
- **Pestañas / menú:** Inicio | Rutas | Contactos.

### 4.2 Página **Inicio**

- Frase principal tipo: "Explora qué ruta de recolección pasa por tu casa o barrio".
- **Buscador:** campo de búsqueda (barrio o dirección) + botón "Buscar".
- Contenido adicional que se considere pertinente: importancia del reciclaje, cómo separar residuos, qué depositar en la ruta de aprovechamiento, etc. (textos editables por el desarrollador; más adelante se documentará el proyecto para que otro pueda mantenerlos).

### 4.3 Página **Rutas**

- Información **completa** de todas las rutas y **quién las opera**:
  - Listado por empresa/programa: Entorno Limpio, Vitapланet, Punto Verde, SEA Eje Cafetero.
  - Por cada ruta (o agrupación lógica): nombre, barrios/zonas, comuna(s), días, horarios, operador/reciclador o empresa, y cualquier dato relevante de los CSV (p. ej. medio de recolección, recorrido textual).
- Objetivo: que un ciudadano pueda ver todas las rutas y operadores sin depender solo del buscador.

### 4.4 Página **Contactos**

- **Sede principal (Secretaría / Desarrollo agropecuario y gestión ambiental):**
  - Nombre: Desarrollo agropecuario y gestión ambiental.
  - Dirección: Calle 42 N° 10B-26, Playa Rica Bosque, Dosquebradas.
  - Teléfono: (57) 606 3515333 – Extensión 195.
- Incluir **datos de contacto** de las empresas/operadores cuando existan (teléfono, correo, etc.); si no hay datos oficiales, dejar placeholders o "por definir" y algún texto tipo "Consulte con la secretaría".
- Se pueden añadir **custom** (enlaces, horarios de atención, etc.) según disponibilidad.

---

## 5. Diseño y marca

| Aspecto | Requisito |
|---------|-----------|
| **Logo** | Alcaldía de Dosquebradas. Archivo de referencia: `alcaldiaDosquebradas` (agregar al proyecto en la ruta prevista para assets/logos). |
| **Estilo** | Tono **verde** y afín al reciclaje y medio ambiente; sobrio y accesible. |
| **Idioma** | Español. Fechas y horas en formato español/Colombia. |

---

## 6. Aspectos técnicos

| Aspecto | Decisión |
|---------|----------|
| **Dominio / hosting** | Demo en Netlify (ej. `*.netlify.app`). No hay requisito de dominio oficial. |
| **Edición de contenido** | Solo el desarrollador edita código y datos en esta fase. El proyecto se documentará para que otra persona pueda mantenerlo y actualizar contenidos. |
| **Mapa** | Leaflet + OpenStreetMap (sin API key, sin costo). |
| **Actualización de datos** | Diseñar para que se puedan reemplazar o añadir CSV (y en el futuro shape/KML/GeoJSON) sin cambiar la lógica core, de modo que "si en algún momento cambia, las personas lo puedan ver actualizado". |

---

## 7. Validación y aceptación

- **Pruebas:** A cargo del responsable del proyecto (Santiago); se seguirá el **plan de pruebas** definido en [plan-de-pruebas.md](plan-de-pruebas.md).
- **Aceptación:** El cliente (Juanita) confirmará si el resultado es correcto tras las pruebas.

---

## Resumen de prioridades para desarrollo

1. **Crítico:** Buscador por barrio/dirección → lista de rutas (nombre, día, hora, empresa) + mapa centrado en la zona.
2. **Crítico:** Páginas Inicio (buscador + textos de reciclaje), Rutas (listado completo y operadores), Contactos (sede + empresas).
3. **Importante:** Estilo verde, logo alcaldía, español, formato fecha/hora.
4. **Cuando haya datos:** Trazado de la ruta en el mapa y "ruta completa" visual sobre el mapa (shape/KML/GeoJSON).
5. **Futuro:** Perfil administrador y/o flujo de actualización de datos por no desarrolladores (documentación primero).

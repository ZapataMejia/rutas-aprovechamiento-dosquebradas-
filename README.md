# Rutas de recolección de residuos aprovechables – Dosquebradas

Demo de sitio web para consultar rutas de recolección de residuos reciclables por barrio en Dosquebradas.  
**Stack:** Astro (estático) + Netlify. **Mapa:** Leaflet + OpenStreetMap.

## Documentación

Toda la documentación del proyecto está en la carpeta **[docs/](docs/)**:

- **Requisitos y pruebas:** [docs/requerimientos.md](docs/requerimientos.md), [docs/plan-de-pruebas.md](docs/plan-de-pruebas.md)
- **Despliegue Netlify:** [docs/deploy-netlify.md](docs/deploy-netlify.md)
- **Agregar zonas y rutas al mapa:** [docs/agregar-nuevas-zonas.md](docs/agregar-nuevas-zonas.md), [docs/agregar-ruta-al-mapa.md](docs/agregar-ruta-al-mapa.md), [docs/que-necesitamos-zona-nueva.md](docs/que-necesitamos-zona-nueva.md)

Índice completo: **[docs/README.md](docs/README.md)**

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir http://localhost:4321

## Build y deploy (Netlify)

```bash
npm run build
```

Publicar la carpeta `dist/`. El archivo `netlify.toml` ya está configurado (comando `npm run build`, publish `dist`). Detalles en [docs/deploy-netlify.md](docs/deploy-netlify.md).

## Datos

Los datos se generan desde los CSV que están en **`recursos/datos/`**:

- `Tabla de atributos_ENTORNO.csv` (Entorno Limpio)
- `Tabla de atributos Rutas VITAPLANET.csv` (Vitapланet)
- `RUTAS_PUNTOVERDE.csv` (Punto Verde)
- `Rutas SEA EJECAFETERO.csv` (SEA Eje Cafetero)

Al ejecutar `npm run dev` o `npm run build` se ejecuta `node scripts/build-rutas.js`, que lee esos CSV y genera `public/data/rutas.json`. El archivo **RUTAS EMPRESAS RECICLADORAS.kmz** también está en `recursos/datos/`; con él se genera `public/data/recorridos.geojson` para el mapa.

## Estructura

- `src/layouts/Layout.astro` – Cabecera (logo Alcaldía), menú (Inicio, Rutas, Contactos), pie.
- `src/pages/index.astro` – Inicio: buscador por barrio/dirección, resultados, mapa, textos de reciclaje.
- `src/pages/rutas.astro` – Listado completo de rutas por empresa.
- `src/pages/contactos.astro` – Sede y datos de contacto.
- **`recursos/datos/`** – CSV, XLSX, KMZ y ZIP de rutas (los scripts leen desde aquí).
- **`recursos/imagenes/`** – Imágenes de referencia (mapas por empresa, etc.). El logo para la web está en `public/alcadiaDosquebradas.jpeg`.
- `public/alcadiaDosquebradas.jpeg` – Logo de la Alcaldía (servido por el sitio).
- `public/data/rutas.json` – Generado por `scripts/build-rutas.js`.
- `public/data/recorridos.geojson` – Generado por `scripts/kmz-to-geojson.js` a partir del KMZ en `recursos/datos/`. El mapa dibuja el recorrido del camión en verde cuando el usuario busca un barrio.

## Recorrido del camión en el mapa

El archivo **RUTAS EMPRESAS RECICLADORAS.kmz** está en **`recursos/datos/`** (junto con la carpeta **RUTAS EMPRESAS RECICLADORAS DOSQUEBRADAS** si la usas). Al ejecutar `npm run data` o `npm run build` se ejecuta `kmz-to-geojson.js`, que extrae el KML del KMZ y genera `public/data/recorridos.geojson`. La app lee ese GeoJSON y pinta las rutas en verde en el mapa al buscar por barrio. La primera vez el script puede extraer el KMZ en `recursos/datos/.kmz_extracted/` (automático).

## Cómo agregar nuevas zonas (ej. La Capilla)

Si al buscar un barrio el sitio dice que no hay ruta, hay que agregarlo a los datos. Guía: **[docs/agregar-nuevas-zonas.md](docs/agregar-nuevas-zonas.md)**.

---

Cliente: Juanita Trejos. Propuesta/demo para la secretaría de Desarrollo agropecuario y gestión ambiental.

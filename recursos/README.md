# Recursos del proyecto

En esta carpeta están organizados los **datos** y las **imágenes** de referencia del proyecto.

## `datos/`

Fuentes de datos que usan los scripts del build:

- **CSV** (rutas por empresa):  
  `Tabla de atributos_ENTORNO.csv`, `Tabla de atributos Rutas VITAPLANET.csv`, `RUTAS_PUNTOVERDE.csv`, `Rutas SEA EJECAFETERO.csv`
- **KMZ**: `RUTAS EMPRESAS RECICLADORAS.kmz` — se convierte a `public/data/recorridos.geojson` con `npm run data`
- **XLSX** y **ZIP**: otros archivos de rutas (referencia o uso futuro)

Los scripts `scripts/build-rutas.js` y `scripts/kmz-to-geojson.js` leen desde aquí. No muevas estos archivos a otra ruta sin actualizar los scripts.

La carpeta `.kmz_extracted/` (generada al extraer el KMZ) se crea aquí y está en `.gitignore`.

## `imagenes/`

Imágenes de referencia: mapas por empresa (PNG), logo, capturas, etc.

- El **logo** que usa la web está copiado en **`public/alcadiaDosquebradas.jpeg`** para que el sitio lo sirva. Si actualizas el logo, sustituye el de `public/` o copia el de `recursos/imagenes/alcadiaDosquebradas.jpeg` a `public/`.

# Desplegar en Netlify

El proyecto está listo para Netlify: `netlify.toml` usa `npm run build` y publica la carpeta `dist`.

---

## Carpeta a publicar: `dist/`

La carpeta **`dist`** (en la raíz del proyecto) se genera con `npm run build`. Contiene:

- `index.html` — Inicio (buscador por barrio)
- `rutas/index.html` — Listado de rutas
- `contactos/index.html` — Contactos
- `blog/` — Artículos del blog
- `data/rutas.json` — Datos de rutas
- `data/recorridos.geojson` — Recorridos para el mapa
- `_astro/` — CSS y assets compilados
- `alcadiaDosquebradas.jpeg` — Logo
- `_headers` y `_redirects` — Cabeceras y redirecciones (generados desde `public/`)

---

## Opción A: Conectar un repositorio Git (recomendado)

1. Sube el proyecto a **GitHub**, **GitLab** o **Bitbucket** (si aún no está).
2. Entra en [app.netlify.com](https://app.netlify.com) e inicia sesión.
3. **Add new site** → **Import an existing project**.
4. Conecta el proveedor (GitHub, etc.) y elige el repositorio de este proyecto.
5. Netlify detectará el `netlify.toml`. Comprueba:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. **Deploy site**. Tras el build, la URL quedará activa (ej. `random-name-123.netlify.app`).
7. Opcional: en **Site settings** → **Domain management** puedes cambiar el nombre o añadir un dominio propio.

Cada vez que hagas **push** a la rama principal, Netlify volverá a desplegar.

---

## Opción B: Deploy manual (sin Git)

1. En tu máquina, en la carpeta del proyecto:
   ```bash
   npm run build
   ```
2. Entra en [app.netlify.com](https://app.netlify.com) → **Add new site** → **Deploy manually**.
3. Arrastra la carpeta **`dist`** (está en la raíz del proyecto) a la zona de drop.
4. Netlify publicará el sitio y te dará una URL.

Para actualizar el sitio tendrás que volver a ejecutar `npm run build` y repetir el arrastre de `dist`.

---

## Archivos opcionales: `_headers` y `_redirects`

- Están en **`public/_headers`** y **`public/_redirects`**; Astro los copia a `dist/` en cada build.
- **`_headers`**: cabeceras HTTP (caché para `/data/*` y `/_astro/*`).
- **`_redirects`**: plantilla para redirecciones; puedes añadir reglas según necesites.

Plantillas y más detalle en [netlify/LEEME.md](netlify/LEEME.md).

---

## Importante antes del primer deploy

- La carpeta **`recursos/datos/`** debe contener el archivo **RUTAS EMPRESAS RECICLADORAS.kmz** para que `npm run build` genere `public/data/recorridos.geojson`. Si despliegas con Git, incluye esa carpeta (con los CSV y el KMZ) en el repo.
- Si usas **Opción A**, en el repositorio deben estar **`recursos/datos/`** con todos los CSV y el KMZ para que el build en Netlify funcione igual que en local.

---

## Regenerar `dist` antes de subir

```bash
npm run build
```

Así se vuelven a generar `public/data/rutas.json` y `public/data/recorridos.geojson` y se reconstruye todo en `dist/`.

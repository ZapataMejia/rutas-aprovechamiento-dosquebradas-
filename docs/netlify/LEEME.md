# Recursos para desplegar en Netlify

## Carpeta lista para subir: `dist/`

La carpeta **`dist`** (en la raíz del proyecto) ya está generada con `npm run build` y es la que Netlify debe publicar.

### Contenido de `dist/`

- `index.html` — Inicio (buscador por barrio)
- `rutas/index.html` — Listado de rutas
- `contactos/index.html` — Contactos
- `blog/` — Artículos del blog
- `data/rutas.json` — Datos de rutas (44 rutas)
- `data/recorridos.geojson` — Recorridos para el mapa (52 rutas)
- `_astro/` — CSS y assets compilados
- `alcadiaDosquebradas.jpeg` — Logo

---

## Cómo desplegar

Ver la guía principal: [deploy-netlify.md](../deploy-netlify.md).

---

## Archivos de configuración Netlify (plantillas)

En esta carpeta `docs/netlify/` tienes las plantillas:

- **`_redirects`** — Redirecciones. La versión en uso está en **`public/_redirects`**; Astro la copia a `dist/` en cada build.
- **`_headers`** — Cabeceras HTTP (caché para `/data/*` y `/_astro/*`) en **`public/_headers`**; también se copian a `dist/` en cada build.

Si despliegas con Git, no hace falta copiar nada: `public/` ya incluye estos archivos y el build de Netlify los publicará.

---

## Regenerar `dist` antes de subir

```bash
npm run build
```

Así se vuelven a generar `public/data/rutas.json` y `public/data/recorridos.geojson` y se reconstruye todo en `dist/`.

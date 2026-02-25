# Documentación del proyecto

Toda la información del proyecto está organizada aquí.

## Proyecto y requisitos

| Documento | Descripción |
|-----------|-------------|
| [Requerimientos](requerimientos.md) | Objetivo, alcance, fuentes de datos, estructura del sitio y criterios de aceptación. |
| [Plan de pruebas](plan-de-pruebas.md) | Casos de prueba para validar búsqueda, navegación, mapa y datos antes de entregar al cliente. |

## Despliegue (Netlify)

| Documento | Descripción |
|-----------|-------------|
| [Deploy en Netlify](deploy-netlify.md) | Cómo publicar el sitio: conectar Git o deploy manual. Incluye qué contiene `dist/` y archivos opcionales (`_headers`, `_redirects`). |
| [Recursos Netlify](netlify/LEEME.md) | Plantillas de `_headers` y `_redirects`; las versiones en uso están en `public/` y se copian a `dist/` en cada build. |

## Mantenimiento de datos y mapa

| Documento | Descripción |
|-----------|-------------|
| [Agregar nuevas zonas](agregar-nuevas-zonas.md) | Si un barrio no aparece al buscar: editar el CSV correcto y opcionalmente el KMZ. Paso a paso (ej. La Capilla). |
| [Qué necesitamos para una zona nueva](que-necesitamos-zona-nueva.md) | Resumen para el cliente: datos de la ruta (días, horario) y recorrido en el mapa (KMZ u otro formato). |
| [Agregar la ruta al mapa](agregar-ruta-al-mapa.md) | Por qué a veces solo se ve un punto en el mapa y cómo generar/colocar el GeoJSON para que se dibuje la línea del camión. |

---

**Resumen rápido**

- **Desarrollar en local:** `npm install` → `npm run dev` → http://localhost:4321  
- **Generar datos:** `npm run data` (o se ejecuta con `npm run dev` / `npm run build`)  
- **Publicar:** `npm run build` → carpeta `dist/` lista para Netlify (ver [deploy-netlify.md](deploy-netlify.md))

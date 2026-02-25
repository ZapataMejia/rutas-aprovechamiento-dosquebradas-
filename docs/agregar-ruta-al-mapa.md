# Por qué solo se ve un punto en el mapa y cómo mostrar la ruta del camión

## Estado actual (con el KMZ de Juanita)

El proyecto **ya incluye** el archivo `RUTAS EMPRESAS RECICLADORAS.kmz` en **`recursos/datos/`**. Con el script `scripts/kmz-to-geojson.js` se genera automáticamente `public/data/recorridos.geojson` al ejecutar `npm run data` o `npm run build`. **En cuanto ese GeoJSON existe, el mapa dibuja la ruta del camión en verde** cuando buscas un barrio. Ya no hace falta convertir a mano.

## Por qué solo salía un "puntito" (antes)

En el mapa aparecen **dos cosas**:

1. **Un marcador (el "puntito")**  
   Indica **tu barrio** o la zona que buscaste (geocoding).

2. **La ruta que recorre el camión**  
   Es una **línea** (el trazado por calles). Para dibujarla hace falta un archivo con la **geometría** (coordenadas). Ese archivo se genera desde el KMZ; si no se ha ejecutado `npm run data` o el KMZ no estaba, solo se veía el punto.

---

## Qué hace falta para que se vea la ruta del camión

Hace falta **un archivo con el recorrido en formato GeoJSON**.

Juanita comentó que ya tiene las rutas en **shape** o **KML**. Esos formatos se pueden convertir a GeoJSON. Cuando ese archivo exista y esté en el lugar correcto, la página **dibujará sola** la ruta en verde en el mapa.

### Pasos

1. **Tener las rutas en shape o KML** (Juanita ya las tiene).
2. **Convertir a GeoJSON**  
   - Con **QGIS**: abrir el shape/KML → Capa → Exportar → Guardar como → Formato "GeoJSON".  
   - O con herramientas en línea (buscar "convert shape to geojson" / "convert KML to geojson").
3. **Poner el archivo en el proyecto**  
   - Nombre del archivo: `recorridos.geojson`  
   - Carpeta: `public/data/`  
   - Ruta completa: `public/data/recorridos.geojson`

### Formato que debe tener el GeoJSON

Tiene que ser una **FeatureCollection** donde cada **Feature** sea una ruta (una línea) y lleve:

- **`properties`**: un campo que identifique el barrio (o barrios) por los que pasa esa ruta, por ejemplo:
  - `barrios`: lista de nombres, ej. `["La Sultana", "Guadalupe"]`
  - o `barrio`: un solo nombre
- **`geometry`**: de tipo **LineString**, con las coordenadas del recorrido:
  - `coordinates`: array de `[longitud, latitud]`, por ejemplo `[[-75.69, 4.83], [-75.68, 4.84], ...]`

Ejemplo mínimo:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "barrios": ["La Sultana", "Santa Monica"] },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-75.691, 4.832],
          [-75.690, 4.834],
          [-75.689, 4.835]
        ]
      }
    }
  ]
}
```

Cuando `public/data/recorridos.geojson` exista y tenga este tipo de estructura, al buscar un barrio (por ejemplo "La Sultana") se mostrará:

- el **punto** (tu barrio) y  
- la **línea verde** (recorrido del camión) para las rutas que tengan ese barrio en `properties.barrios` (o `barrio`).

---

## Resumen

| Qué se ve ahora | Motivo |
|------------------|--------|
| Un "puntito" en el mapa | Es el marcador de **tu barrio** (geocoding). |
| No se ve la ruta del camión | Falta el archivo con el **trazado** (shape/KML → GeoJSON). |
| Qué hay que hacer | Convertir las rutas a GeoJSON y guardar como `public/data/recorridos.geojson`. |

Si quieres, en el siguiente paso podemos bajar al detalle de cómo convertir tu shape/KML concreto a este GeoJSON (por ejemplo con QGIS o con una herramienta por línea de comandos).

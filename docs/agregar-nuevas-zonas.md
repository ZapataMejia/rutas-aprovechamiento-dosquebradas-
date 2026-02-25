# Cómo agregar nuevas zonas (ej. La Capilla)

Si al buscar **La Capilla** (u otra zona) el sitio dice que no hay ruta, hay que agregarla a los datos.

---

## 1. Que la búsqueda encuentre la zona (obligatorio)

Se agrega la zona en el **CSV** de la empresa que recoge ahí (archivos en **`recursos/datos/`**). Luego ejecutar: `npm run data`.

| Empresa | Archivo CSV (en `recursos/datos/`) | Columna donde poner el barrio |
|---------|-------------------------------------|-------------------------------|
| Entorno Limpio | `Tabla de atributos_ENTORNO.csv` | **Nombre de Ruta** (un barrio por fila) |
| Vitapланet | `Tabla de atributos Rutas VITAPLANET.csv` | **Barrio/Zona** (varios separados por coma) |
| Punto Verde | `RUTAS_PUNTOVERDE.csv` | **Barrio** (varios separados por coma o punto y coma) |
| SEA Eje Cafetero | `Rutas SEA EJECAFETERO.csv` | **Barrio / Zona** (un barrio por fila) |

- Separador entre columnas: **punto y coma** `;`
- Guardar en **UTF-8**

Ejemplo: en Vitapланet, en la celda **Barrio/Zona** de la ruta que pasa por La Capilla, añadir "La Capilla" a la lista (ej. `La macarena, Limonar, La Capilla`). Guardar y ejecutar `npm run data`.

---

## 2. Que se vea la línea en el mapa (opcional)

La línea verde sale del archivo **RUTAS EMPRESAS RECICLADORAS.kmz** (en **`recursos/datos/`**). Hay que abrirlo en Google Earth o QGIS, localizar la ruta que pasa por La Capilla y en los atributos de esa ruta incluir **La Capilla** en el campo de barrios (BARRIOS, Barrio/Zona o Barrio, según la empresa). Guardar el KMZ, reemplazarlo en `recursos/datos/` y ejecutar otra vez `npm run data`.

Si no tienes KMZ pero sí el recorrido en otro formato, ver [agregar-ruta-al-mapa.md](agregar-ruta-al-mapa.md).

---

**Resumen:** Para que aparezca la ruta al buscar → editar el CSV correcto y ejecutar `npm run data`. Para que se dibuje la línea en el mapa → editar el KMZ (campo barrios) y volver a ejecutar `npm run data`.

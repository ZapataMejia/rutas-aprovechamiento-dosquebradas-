# Qué necesitamos para una zona nueva (que se vea igual en la web y en el mapa)

Para que una **zona nueva** (ej. La Capilla) funcione igual que las demás —es decir, que aparezca en la búsqueda y que se vea la **línea verde del recorrido** en el mapa— necesitamos **dos cosas** de Juanita (o de quien tenga los datos):

---

## 1. Datos de la ruta (días, horario, empresa)

Para que al buscar el barrio salga la información y no diga "no hay ruta":

- **Nombre del barrio o zona** (ej. La Capilla).
- **Empresa** que recoge ahí (Entorno Limpio, Vitapланet, Punto Verde o SEA Eje Cafetero).
- **Días** de recolección (ej. Lunes y Jueves).
- **Horario** (ej. 8:00 am a 12:00 pm).
- **Comuna** (si aplica).
- Cualquier otro dato que ya lleven los CSV (reciclador, nombre de ruta, etc.).

Con eso se agrega una fila (o se actualiza una existente) en el CSV correspondiente y la zona aparece en la búsqueda igual que las demás.

---

## 2. El recorrido en el mapa (para que se vea la línea verde)

Para que la **línea del camión** se dibuje en el mapa como en el resto de rutas:

- **El mismo archivo KMZ** que ya usamos (**RUTAS EMPRESAS RECICLADORAS.kmz**) pero **actualizado**: que incluya la ruta de esa zona nueva como **línea** (recorrido por calles) y que en los **atributos** de esa línea aparezca el **nombre del barrio/zona** (ej. La Capilla) en el campo que corresponda según la empresa:
  - Entorno Limpio: campo **BARRIOS**
  - Vitapланet: **Barrio/Zona**
  - Punto Verde: **Barrio**
  - SEA: el **nombre** del placemark (o el campo de barrio si lo tienen)

**O bien**, si tienen el recorrido en **otro formato** (shape, KML, Excel con puntos, etc.), nos lo pasan y se convierte al mismo formato que usa el mapa (GeoJSON con línea y nombre del barrio).

---

## Resumen para Juanita

| Para que… | Necesitamos… |
|-----------|--------------|
| Aparezca la ruta al buscar el barrio | Nombre del barrio, empresa, días, horario (y lo agregamos al CSV). |
| Se vea la línea en el mapa como las demás | KMZ actualizado con la ruta dibujada como línea y el nombre del barrio en los atributos, **o** el recorrido en otro formato para convertirlo. |

Si solo entregan lo del punto 1, la zona nueva se podrá buscar y se verán días y horario, pero en el mapa no saldrá la línea hasta tener el recorrido (punto 2).

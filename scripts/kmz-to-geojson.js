/**
 * Convierte el KML (doc.kml extraído del KMZ) a public/data/recorridos.geojson
 * para que el mapa dibuje las rutas del camión.
 * Requiere que exista .kmz_extracted/doc.kml (ejecutar: unzip -o "RUTAS EMPRESAS RECICLADORAS.kmz" -d .kmz_extracted)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const datosDir = join(root, 'recursos', 'datos');
const kmzPath = join(datosDir, 'RUTAS EMPRESAS RECICLADORAS.kmz');
const extractedPath = join(datosDir, '.kmz_extracted', 'doc.kml');
const outPath = join(root, 'public', 'data', 'recorridos.geojson');

function ensureKml() {
  try {
    return readFileSync(extractedPath, 'utf-8');
  } catch (_) {
    try {
      mkdirSync(dirname(extractedPath), { recursive: true });
      execSync(`unzip -o -q "${kmzPath}" -d "${join(datosDir, '.kmz_extracted')}"`, { stdio: 'pipe', cwd: root });
      return readFileSync(extractedPath, 'utf-8');
    } catch (e) {
      throw new Error('No se pudo extraer el KMZ. Ejecuta: unzip -o "RUTAS EMPRESAS RECICLADORAS.kmz" -d recursos/datos/.kmz_extracted');
    }
  }
}

function parseCoordString(text) {
  const out = [];
  const tokens = text.trim().split(/\s+/);
  for (const t of tokens) {
    const parts = t.split(',');
    const lon = parseFloat(parts[0]);
    const lat = parseFloat(parts[1]);
    if (!isNaN(lon) && !isNaN(lat)) out.push([lon, lat]);
  }
  return out;
}

function getSimpleData(xml, name) {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`<SimpleData name="${esc}">([^<]*)</SimpleData>`, 'i');
  const m = xml.match(re);
  return m ? m[1].trim() : '';
}

function getPlacemarkName(placemarkXml) {
  const m = placemarkXml.match(/<name>([^<]*)<\/name>/);
  return m ? m[1].trim() : '';
}

function getBarriosFromPlacemark(placemarkXml, docName) {
  if (docName.includes('ENTORNO')) return [getSimpleData(placemarkXml, 'BARRIOS')].filter(Boolean);
  if (docName.includes('VITAPLANET')) {
    const z = getSimpleData(placemarkXml, 'Barrio/Zona');
    return z ? z.split(/[,.]/).map((b) => b.trim()).filter(Boolean) : [];
  }
  if (docName.includes('PUNTOVERDE') || docName.includes('PUNTO VERDE')) {
    const barrio = getSimpleData(placemarkXml, 'Barrio');
    const name = getPlacemarkName(placemarkXml);
    const list = barrio ? barrio.split(/[,;]/).map((b) => b.trim()).filter(Boolean) : [];
    if (name && !list.includes(name)) list.unshift(name);
    return list;
  }
  if (docName.includes('SEA')) return [getPlacemarkName(placemarkXml)].filter(Boolean);
  if (docName.includes('ASORPER') || docName.includes('FUNDAMBIENTA')) {
    const barrio = getSimpleData(placemarkXml, 'Barrio');
    const name = getPlacemarkName(placemarkXml);
    const list = barrio ? barrio.split(/[,.]/).map((b) => b.trim()).filter(Boolean) : [];
    if (name && !list.some((b) => b.toUpperCase() === name.toUpperCase())) list.unshift(name);
    return list;
  }
  return [getPlacemarkName(placemarkXml)].filter(Boolean);
}

function getCoordinatesFromPlacemark(placemarkXml) {
  const allCoords = [];
  const multiMatch = placemarkXml.match(/<MultiGeometry>([\s\S]*?)<\/MultiGeometry>/);
  const block = multiMatch ? multiMatch[1] : placemarkXml;
  const lineStringRegex = /<LineString>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>[\s\S]*?<\/LineString>/g;
  let m;
  while ((m = lineStringRegex.exec(block)) !== null) {
    allCoords.push(...parseCoordString(m[1]));
  }
  const singleLine = placemarkXml.match(/<LineString>\s*<coordinates>([\s\S]*?)<\/coordinates>/);
  if (singleLine && allCoords.length === 0) allCoords.push(...parseCoordString(singleLine[1]));
  return allCoords;
}

function run() {
  const kml = ensureKml();
  const features = [];
  const docBlocks = kml.split(/<Document[^>]*>/);
  for (let i = 1; i < docBlocks.length; i++) {
    const block = docBlocks[i];
    const nameMatch = block.match(/<name>([^<]+)<\/name>/);
    const docName = nameMatch ? nameMatch[1] : '';
    const placemarkRegex = /<Placemark>([\s\S]*?)<\/Placemark>/g;
    let pmMatch;
    while ((pmMatch = placemarkRegex.exec(block)) !== null) {
      const barrios = getBarriosFromPlacemark(pmMatch[1], docName);
      const coords = getCoordinatesFromPlacemark(pmMatch[1]);
      if (coords.length >= 2 && barrios.length > 0) {
        features.push({
          type: 'Feature',
          properties: { barrios },
          geometry: { type: 'LineString', coordinates: coords },
        });
      }
    }
  }

  const geojson = { type: 'FeatureCollection', features };
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(geojson), 'utf-8');
  console.log('Generado', outPath, 'con', features.length, 'rutas.');
}

run();

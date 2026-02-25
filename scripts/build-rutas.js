/**
 * Genera src/data/rutas.json a partir de los 4 CSV.
 * Ejecutar antes de astro build (o en dev leer desde public).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const datosDir = join(root, 'recursos', 'datos');

/** Lee un archivo probando UTF-8 y luego Latin-1 para que las tildes (miércoles, sábado) se vean bien. */
function readFileSafe(filePath) {
  let raw = readFileSync(filePath, 'utf-8');
  if (raw.includes('\uFFFD') || (raw.includes('mircoles') && !raw.includes('miércoles'))) {
    try { raw = readFileSync(filePath, 'latin1'); } catch (_) {}
  }
  return raw;
}

function parseCSV(content, sep = ';') {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(sep).map((h) => h.trim());
  const rows = [];
  let i = 1;
  while (i < lines.length) {
    let line = lines[i];
    // Unir líneas que son continuación de un campo entre comillas
    while ((line.match(/"/g) || []).length % 2 !== 0 && i + 1 < lines.length) {
      i++;
      line += '\n' + lines[i];
    }
    const values = [];
    let cur = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if ((c === sep || c === '\n') && !inQuotes) {
        values.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    values.push(cur.trim());
    if (values.some((v) => v)) {
      const row = {};
      headers.forEach((h, idx) => (row[h] = values[idx] ?? ''));
      rows.push(row);
    }
    i++;
  }
  return rows;
}

function normalizeBarrio(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

const rutas = [];

// Entorno Limpio
try {
  const raw = readFileSafe(join(datosDir, 'Tabla de atributos_ENTORNO.csv'));
  const rows = parseCSV(raw);
  for (const r of rows) {
    const nombre = (r['Nombre de Ruta'] || '').trim();
    if (!nombre) continue;
    rutas.push({
      empresa: 'Entorno Limpio',
      nombreRuta: nombre,
      barrios: [nombre],
      comuna: (r['Comuna'] || '').trim(),
      dias: (r['Frecuencia'] || '').trim(),
      horario: `${(r['Hora Inicio'] || '').trim()} - ${(r['Hora Final'] || '').trim()}`.replace(/^ - $/, ''),
      operador: (r['Reciclador'] || '').trim(),
      barriosNormalizados: [normalizeBarrio(nombre)],
    });
  }
} catch (e) {
  console.warn('Entorno CSV:', e.message);
}

// Vitapланet
try {
  const raw = readFileSafe(join(datosDir, 'Tabla de atributos Rutas VITAPLANET.csv'));
  const rows = parseCSV(raw);
  for (const r of rows) {
    const barrioZona = (r['Barrio/Zona'] || '').trim();
    if (!barrioZona) continue;
    const barrios = barrioZona.split(/[,.]/).map((b) => b.trim()).filter(Boolean);
    rutas.push({
      empresa: 'Vitapланet',
      nombreRuta: (r['N°ruta'] || '').trim() || 'Vitapланet',
      barrios,
      comuna: (r['Comuna'] || '').trim(),
      dias: (r['Dia de recolección '] || r['Dia de recolección'] || '').trim(),
      horario: (r['Horario'] || '').trim(),
      operador: 'Vitapланet',
      recorrido: (r['Recorrido '] || r['Recorrido'] || '').trim(),
      barriosNormalizados: barrios.map(normalizeBarrio),
    });
  }
} catch (e) {
  console.warn('Vitapланet CSV:', e.message);
}

// Punto Verde
try {
  const raw = readFileSafe(join(datosDir, 'RUTAS_PUNTOVERDE.csv'));
  const rows = parseCSV(raw);
  for (const r of rows) {
    const barrio = (r['Barrio'] || '').trim();
    const macro = (r['Macro Ruta'] || '').trim();
    if (!barrio && !macro) continue;
    const barrios = barrio ? barrio.split(/[,;]/).map((b) => b.trim()).filter(Boolean) : [macro];
    rutas.push({
      empresa: 'Punto Verde',
      nombreRuta: macro || 'Punto Verde',
      barrios,
      comuna: (r['Comuna'] || '').trim(),
      dias: (r['FRECUENCIA'] || '').trim(),
      horario: (r['HORA'] || '').trim(),
      operador: (r['RECICLADOR'] || '').trim(),
      sector: (r['Ruta- sector'] || '').trim(),
      barriosNormalizados: barrios.map(normalizeBarrio),
    });
  }
} catch (e) {
  console.warn('Punto Verde CSV:', e.message);
}

// SEA Eje Cafetero
try {
  const raw = readFileSafe(join(datosDir, 'Rutas SEA EJECAFETERO.csv'));
  const rows = parseCSV(raw);
  for (const r of rows) {
    const barrio = (r['Barrio / Zona'] || r['Barrio/Zona'] || '').trim();
    if (!barrio) continue;
    const dias = (r['Día de Recolección'] || r['Día de Recolección '] || '').trim();
    rutas.push({
      empresa: 'SEA Eje Cafetero',
      nombreRuta: (r['Empresa '] || r['Empresa'] || 'SEA Eje Cafetero').trim(),
      barrios: [barrio],
      comuna: (r['Comuna'] || '').trim(),
      dias: dias,
      horario: (r['Hora Estimada'] || '').trim(),
      operador: 'SEA EJE CAFETERO S.A.S E.S.P',
      medio: (r['Medio de recolección '] || r['Medio de recolección'] || '').replace(/\s+/g, ' ').trim(),
      barriosNormalizados: [normalizeBarrio(barrio)],
    });
  }
} catch (e) {
  console.warn('SEA CSV:', e.message);
}

// Expandir barrios en Entorno (cada fila es una ruta con un nombre que puede ser barrio)
// Ya están por nombre de ruta; para búsqueda por barrio estamos cubiertos con barrios/barriosNormalizados.

const outDir = join(root, 'public', 'data');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'rutas.json'), JSON.stringify(rutas, null, 0), 'utf-8');
console.log('Generado public/data/rutas.json con', rutas.length, 'rutas.');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string;
}

export const posts: Post[] = [
  {
    slug: 'separacion-en-la-fuente',
    title: 'Separación en la fuente: el primer paso',
    date: '2025-02-15',
    excerpt: 'Separar los residuos aprovechables en casa permite que las rutas de recolección los lleven a procesos de aprovechamiento y reducir lo que llega al relleno sanitario.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    imageAlt: 'Ambiente natural, separación y cuidado del entorno',
    body: `
      <p>Separar los residuos aprovechables en casa es el primer paso para que el reciclaje funcione. Cuando sacamos los materiales limpios y organizados, las rutas de recolección pueden llevarlos a procesos de aprovechamiento y así reducimos lo que llega al relleno sanitario.</p>
      <h3>¿Por qué es importante?</h3>
      <p>La separación en la fuente mejora la calidad del material que se recupera, facilita el trabajo de los recicladores y ayuda a que Dosquebradas avance en sus metas ambientales.</p>
      <p>Consulta los días y horarios de la ruta que pasa por tu barrio en esta misma web para sacar los residuos en el momento indicado.</p>
    `,
  },
  {
    slug: 'que-depositar-en-la-ruta',
    title: '¿Qué depositar en la ruta de reciclaje?',
    date: '2025-02-12',
    excerpt: 'Plásticos limpios, papel, cartón, vidrio y metales: una guía rápida de lo que sí va en la ruta verde.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    imageAlt: 'Materiales y entorno para el reciclaje',
    body: `
      <p>En la ruta de recolección de residuos aprovechables puedes depositar los siguientes materiales, siempre limpios y secos:</p>
      <ul>
        <li><strong>Plásticos:</strong> botellas, envases, tapas (sin restos de alimento).</li>
        <li><strong>Papel y cartón:</strong> secos, sin grasa ni restos de comida.</li>
        <li><strong>Vidrio:</strong> botellas y frascos (evita que se rompan).</li>
        <li><strong>Metales:</strong> latas, tapas y envases metálicos.</li>
      </ul>
      <p>No incluyas residuos orgánicos, pañales, ni materiales que no sean reciclables en esta ruta. Si tienes dudas, consulta con la secretaría de Desarrollo agropecuario y gestión ambiental.</p>
    `,
  },
  {
    slug: 'horarios-y-empresas',
    title: 'Horarios y empresas que operan las rutas',
    date: '2025-02-10',
    excerpt: 'Varias empresas y recicladores recorren Dosquebradas. Aquí te contamos cómo están organizadas las rutas.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    imageAlt: 'Rutas y recorridos en el municipio',
    body: `
      <p>Las rutas de recolección de residuos aprovechables en Dosquebradas son operadas por diferentes empresas y recicladores: Entorno Limpio, Vitapланet, Punto Verde y SEA Eje Cafetero.</p>
      <p>Cada empresa tiene asignados barrios y días específicos. En la pestaña <strong>Rutas</strong> de esta web puedes ver el listado completo por empresa, con días, horarios y barrios. En <strong>Inicio</strong> puedes buscar por tu barrio para ver qué ruta te corresponde.</p>
      <p>Si tu barrio no aparece o necesitas confirmar el horario, contacta a la secretaría (ver pestaña Contactos).</p>
    `,
  },
  {
    slug: 'consejos-para-sacar-el-reciclaje',
    title: 'Consejos para sacar el reciclaje a tiempo',
    date: '2025-02-08',
    excerpt: 'Saca los residuos aprovechables en el día y la hora indicados para tu barrio y evita dejarlos en la vía.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    imageAlt: 'Preparar y sacar el reciclaje a tiempo',
    body: `
      <p>Para que el camión recoja tus residuos aprovechables sin inconvenientes:</p>
      <ul>
        <li>Revisa en esta web el día y la hora de la ruta que pasa por tu barrio.</li>
        <li>Saca las bolsas o canecas solo en ese horario; evita dejarlas toda la noche en la vía.</li>
        <li>Usa bolsas identificables (verdes o con un letrero) para que el reciclador las reconozca.</li>
        <li>Mantén los materiales secos y relativamente limpios para facilitar el aprovechamiento.</li>
      </ul>
      <p>Con estos pequeños hábitos contribuyes a que la ruta sea más eficiente y el material llegue en buen estado a los centros de aprovechamiento.</p>
    `,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getSortedPosts(): Post[] {
  return [...posts].sort((a, b) => (b.date > a.date ? 1 : -1));
}

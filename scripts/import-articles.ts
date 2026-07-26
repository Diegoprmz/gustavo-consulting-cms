/**
 * Migración de los artículos de Gustavo hacia Sanity.
 *
 *   npm run import:articles -- --extract    PDFs/PPTX -> ready/*.txt + manifest.json
 *   (revisión humana del manifest y los textos)
 *   npm run import:articles -- --publish    ready/ + manifest -> documentos en Sanity
 *
 * La extracción no adivina por longitud de línea: lee las coordenadas del PDF.
 * En estos documentos el interlineado dentro de un párrafo es ~15pt y el salto
 * entre párrafos ~25pt, así que el corte real se deduce de la distancia vertical.
 */
import AdmZip from 'adm-zip';
import { createClient } from '@sanity/client';
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const ROOT = process.cwd();
const BATCH = process.env.BATCH ?? 'batch-1';
const BASE = path.join(ROOT, 'content-raw', BATCH);

const DIRS = {
  pdfs: path.join(BASE, 'pdfs'),
  pptx: path.join(BASE, 'pptx'),
  images: path.join(BASE, 'extracted-images'),
  ready: path.join(BASE, 'ready'),
};

const MANIFEST = path.join(BASE, 'manifest.json');

type ManifestEntry = {
  file: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
};

// ─── Lectura posicional del PDF ───────────────────────────────────────

type Line = { text: string; size: number; font: string; gap: number; pageStart: boolean };

async function readPdfLines(file: string): Promise<Line[]> {
  const task = pdfjs.getDocument({ data: new Uint8Array(await readFile(file)), verbosity: 0 });
  const doc = await task.promise;
  const lines: Line[] = [];

  try {
    for (let p = 1; p <= doc.numPages; p++) {
      const content = await (await doc.getPage(p)).getTextContent();

      // Los items llegan sueltos: se agrupan por coordenada vertical para formar líneas.
      type TextItem = { str: string; transform: number[]; width: number; fontName: string };
      const byY = new Map<number, TextItem[]>();
      for (const raw of content.items) {
        if (!('str' in raw) || !raw.str.trim()) continue;
        const item = raw as TextItem;
        const y = Math.round(item.transform[5] * 10) / 10;
        if (!byY.has(y)) byY.set(y, []);
        byY.get(y)!.push(item);
      }

      const ordered = [...byY.entries()].sort((a, b) => b[0] - a[0]);
      let prevY: number | null = null;

      for (const [y, group] of ordered) {
        const items = [...group].sort((a, b) => a.transform[4] - b.transform[4]);
        const first = items[0];
        const size = Math.abs(first.transform[0]);

        // El PDF parte la línea en fragmentos por kerning. Sin mirar el hueco
        // horizontal las palabras quedarían pegadas ("algonoterminade...").
        let text = '';
        let prevEnd: number | null = null;
        for (const item of items) {
          const x = item.transform[4];
          const separated = prevEnd !== null && x - prevEnd > size * 0.14;
          if (separated && !/\s$/.test(text) && !/^\s/.test(item.str)) text += ' ';
          text += item.str;
          prevEnd = x + (item.width ?? 0);
        }

        lines.push({
          text: text.replace(/\s+/g, ' ').trim(),
          size: Math.round(size * 10) / 10,
          font: first.fontName,
          gap: prevY === null ? Infinity : Math.round((prevY - y) * 10) / 10,
          pageStart: prevY === null,
        });
        prevY = y;
      }
    }
  } finally {
    await task.destroy();
  }

  return lines.filter((l) => l.text);
}

// ─── PDF -> bloques marcados ──────────────────────────────────────────

const AUTHOR_LINE = 'Gustavo Martínez Pellón';
const BIO_PREFIXES = ['Catedrático', 'Profesor titular'];
const MESES: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
    .replace(/-+$/, '');
}

/** Devuelve el valor más frecuente, redondeado, de una lista de números. */
function mostCommon(values: number[], fallback: number) {
  const freq = new Map<number, number>();
  for (const v of values) {
    const k = Math.round(v);
    freq.set(k, (freq.get(k) ?? 0) + 1);
  }
  let best = fallback;
  let bestCount = 0;
  for (const [k, count] of freq) {
    if (count > bestCount) {
      bestCount = count;
      best = k;
    }
  }
  return best;
}

type Parsed = { title: string; publishedAt: string | null; blocks: string[] };

function parsePdf(lines: Line[]): Parsed {
  // El título ocupa todo lo que precede a la firma del autor: puede abarcar
  // varias líneas y, si es largo, el documento lo encoge, así que el tamaño
  // tipográfico no sirve como criterio.
  const authorIdx = lines.findIndex((l) => l.text === AUTHOR_LINE);
  const maxSize = Math.max(...lines.map((l) => l.size));
  const titleLines = authorIdx > 0 ? lines.slice(0, authorIdx) : lines.filter((l) => l.size === maxSize);
  const title = titleLines.map((l) => l.text).join(' ').replace(/\s+/g, ' ').trim();

  let cursor = authorIdx >= 0 ? authorIdx + 1 : titleLines.length;
  while (cursor < lines.length && BIO_PREFIXES.some((p) => lines[cursor].text.startsWith(p))) cursor++;

  let publishedAt: string | null = null;
  const date = lines[cursor]?.text.match(/^(\d{1,2})\s+de\s+([a-záéíóú]+)\s+del?\s+(\d{4})$/i);
  if (date && MESES[date[2].toLowerCase()] !== undefined) {
    publishedAt = new Date(Date.UTC(+date[3], MESES[date[2].toLowerCase()], +date[1], 12)).toISOString();
    cursor++;
  }

  const body = lines.slice(cursor);
  const lineGap = mostCommon(body.map((l) => l.gap).filter((g) => Number.isFinite(g) && g > 0), 15);
  const bodyFont = mostCommon(
    body.map((l) => Number(l.font.replace(/\D/g, ''))).filter((n) => !Number.isNaN(n)),
    1
  );

  // Un salto claramente mayor al interlineado abre un párrafo nuevo. En el
  // cambio de página no hay distancia que medir, así que ahí la señal es si la
  // frase anterior quedó sin cerrar: en ese caso el párrafo continúa.
  const groups: Line[][] = [];
  for (const line of body) {
    const isBullet = /^[•·]/.test(line.text) || /^\d+\.\s/.test(line.text);
    const previous = groups[groups.length - 1];
    const continuesSentence =
      line.pageStart && previous && !/[.?!:;…]["”']?$/.test(previous[previous.length - 1].text);

    if (!groups.length || isBullet || (!continuesSentence && line.gap > lineGap * 1.35)) groups.push([line]);
    else previous.push(line);
  }

  const blocks = groups.map((group) => {
    const text = group.map((l) => l.text).join(' ').replace(/\s+/g, ' ').trim();
    const head = group[0];

    const bullet = text.match(/^[•·]\s*(.*)$/);
    if (bullet) return `- ${bullet[1]}`;
    if (/^\d+\.\s/.test(text)) return text;

    // Subtítulo de sección: una sola línea, corta, en fuente distinta a la del
    // cuerpo o formulada como pregunta. Se excluyen las que introducen una lista.
    const distinctFont = Number(head.font.replace(/\D/g, '')) !== bodyFont;
    if (group.length === 1 && text.length < 90 && !text.endsWith(':') && (distinctFont || text.endsWith('?'))) {
      return `# ${text}`;
    }

    return text;
  });

  // El epígrafe inicial y la frase de cierre vienen entrecomillados: son citas.
  return {
    title,
    publishedAt,
    blocks: blocks.map((b, i) => {
      const isEdge = i === 0 || i === blocks.length - 1;
      return isEdge && /^["“][\s\S]*["”]\.?$/.test(b)
        ? `> ${b.replace(/^["“]\s*/, '').replace(/\s*["”]\.?$/, '')}`
        : b;
    }),
  };
}

// ─── Paso 1: extracción ───────────────────────────────────────────────

async function extract() {
  await mkdir(DIRS.ready, { recursive: true });
  await mkdir(DIRS.images, { recursive: true });

  // Imágenes: cada PPTX coloca 4 por diapositiva en rejilla 2×2, en orden de
  // lectura, y la numeración de media/ sigue ese mismo orden (image8+n -> artículo n).
  if (existsSync(DIRS.pptx)) {
    for (const file of (await readdir(DIRS.pptx)).filter((f) => f.toLowerCase().endsWith('.pptx'))) {
      const outDir = path.join(DIRS.images, path.parse(file).name);
      await mkdir(outDir, { recursive: true });
      const zip = new AdmZip(path.join(DIRS.pptx, file));
      const media = zip.getEntries().filter((e) => e.entryName.startsWith('ppt/media/') && !e.isDirectory);
      for (const entry of media) await writeFile(path.join(outDir, path.basename(entry.entryName)), entry.getData());
      console.log(`  imágenes  ${file} -> ${media.length}`);
    }
  }

  const pdfs = existsSync(DIRS.pdfs)
    ? (await readdir(DIRS.pdfs)).filter((f) => f.toLowerCase().endsWith('.pdf')).sort()
    : [];

  const manifest: ManifestEntry[] = [];

  for (const file of pdfs) {
    const parsed = parsePdf(await readPdfLines(path.join(DIRS.pdfs, file)));

    const serie = /Patient/i.test(file) ? 'PT' : 'CC';
    const num = Number(file.match(/(\d+)\s*\.pdf$/i)?.[1] ?? 0);
    const deck = serie === 'PT' ? 'Imágenes PT para artículos' : 'Imágenes artículos CC';
    const readyName = `${serie.toLowerCase()}-${String(num).padStart(2, '0')}.txt`;

    await writeFile(path.join(DIRS.ready, readyName), parsed.blocks.join('\n'), 'utf8');

    const lead = parsed.blocks.find((b) => !b.startsWith('#') && !b.startsWith('>') && !b.startsWith('-')) ?? '';

    manifest.push({
      file: readyName,
      title: parsed.title,
      slug: slugify(parsed.title),
      excerpt: lead.length > 200 ? `${lead.slice(0, 197).trimEnd()}…` : lead,
      category: serie === 'PT' ? 'Patient Centricity' : 'Customer Centricity',
      publishedAt: parsed.publishedAt ?? new Date().toISOString(),
      image: num > 0 ? `${deck}/image${8 + num}.png` : undefined,
      imageAlt: parsed.title,
    });

    console.log(`  texto     ${file} -> ${readyName} (${parsed.blocks.length} bloques)`);
  }

  manifest.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt) || a.file.localeCompare(b.file));
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`\n${manifest.length} artículo(s) listos. Revisa ${path.relative(ROOT, MANIFEST)} antes de publicar.`);
}

// ─── Texto marcado -> Portable Text ───────────────────────────────────

type Span = { _type: 'span'; _key: string; text: string; marks: string[] };
type Block = {
  _type: 'block';
  _key: string;
  style: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  markDefs: [];
  children: Span[];
};

function toBlock(style: string, text: string, listItem?: 'bullet' | 'number'): Block {
  return {
    _type: 'block',
    _key: randomUUID().slice(0, 12),
    style,
    ...(listItem ? { listItem, level: 1 } : {}),
    markDefs: [],
    children: [{ _type: 'span', _key: randomUUID().slice(0, 12), text, marks: [] }],
  };
}

/** Un bloque por línea: `# ` subtítulo, `> ` cita, `- ` viñeta, `1. ` numerada. */
function parseToPortableText(raw: string): Block[] {
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith('## ')) return toBlock('h3', line.slice(3).trim());
      if (line.startsWith('# ')) return toBlock('h2', line.slice(2).trim());
      if (line.startsWith('> ')) return toBlock('blockquote', line.slice(2).trim());
      if (line.startsWith('- ')) return toBlock('normal', line.slice(2).trim(), 'bullet');
      const numbered = line.match(/^\d+\.\s+(.*)$/);
      if (numbered) return toBlock('normal', numbered[1].trim(), 'number');
      return toBlock('normal', line);
    });
}

// ─── Paso 2: publicación ──────────────────────────────────────────────

/** Carga .env.local: a diferencia de Next, este script no lo lee por su cuenta. */
async function loadEnv() {
  const file = path.join(ROOT, '.env.local');
  if (!existsSync(file)) return;
  for (const line of (await readFile(file, 'utf8')).split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

async function publish() {
  await loadEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !dataset || !token) {
    throw new Error('Faltan NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET o SANITY_API_TOKEN en .env.local');
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01',
    useCdn: false,
  });

  const manifest: ManifestEntry[] = JSON.parse(await readFile(MANIFEST, 'utf8'));
  const only = process.argv.slice(2).find((a) => a.startsWith('--only='))?.split('=')[1];
  const pending = only ? manifest.filter((e) => e.file === only || e.slug === only) : manifest;

  if (!pending.length) throw new Error(`Sin coincidencias para --only=${only}`);

  for (const entry of pending) {
    const body = parseToPortableText(await readFile(path.join(DIRS.ready, entry.file), 'utf8'));

    let mainImage;
    if (entry.image) {
      const buffer = await readFile(path.join(DIRS.images, entry.image));
      const asset = await client.assets.upload('image', buffer, { filename: path.basename(entry.image) });
      mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: entry.imageAlt ?? entry.title,
      };
    }

    // _id determinista a partir del slug: reejecutar actualiza, nunca duplica.
    await client.createOrReplace({
      _id: `post-${entry.slug}`,
      _type: 'post',
      title: entry.title,
      slug: { _type: 'slug', current: entry.slug },
      excerpt: entry.excerpt,
      category: entry.category,
      publishedAt: new Date(entry.publishedAt).toISOString(),
      body,
      videoMode: entry.videoUrl ? 'embed' : 'none',
      ...(entry.videoUrl ? { videoUrl: entry.videoUrl } : {}),
      ...(mainImage ? { mainImage } : {}),
    });

    console.log(`  publicado  ${entry.slug}`);
  }

  console.log(`\n${pending.length} artículo(s) sincronizados con Sanity.`);
}

// ─── CLI ──────────────────────────────────────────────────────────────

const MODES = {
  '--extract': { label: 'Extrayendo', run: extract },
  '--publish': { label: 'Publicando', run: publish },
} as const;

const mode = process.argv.slice(2).find((a): a is keyof typeof MODES => a in MODES);

if (!mode) {
  console.error('Uso: npm run import:articles -- --extract | --publish [--only=<archivo|slug>]');
  process.exit(1);
}

const { label, run } = MODES[mode];
console.log(`\n${label} — lote "${BATCH}"\n`);

run().catch((err) => {
  console.error(`\nError: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});

'use client';

import { useMemo, useState } from 'react';

import PostCard from '@/components/blog/PostCard';
import type { PostPreview } from '@/sanity/lib/types';

type Sort = 'reciente' | 'antiguo';

const CATEGORIES = ['Customer Centricity', 'Patient Centricity'] as const;

/** Sin acentos y en minúsculas, para que "clinica" encuentre "clínica". */
function normalize(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export default function BlogBrowser({ posts }: { posts: PostPreview[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>('reciente');

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);

    return posts
      .filter((post) => {
        if (category && post.category !== category) return false;
        if (!terms.length) return true;
        const haystack = normalize(`${post.title} ${post.excerpt} ${post.category}`);
        return terms.every((term) => haystack.includes(term));
      })
      .sort((a, b) =>
        sort === 'reciente'
          ? b.publishedAt.localeCompare(a.publishedAt)
          : a.publishedAt.localeCompare(b.publishedAt)
      );
  }, [posts, query, category, sort]);

  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <label htmlFor="blog-buscar" className="sr-only">
          Buscar artículos
        </label>
        <input
          id="blog-buscar"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por palabra clave…"
          className="input-styled"
          style={{ maxWidth: '460px', borderRadius: '8px' }}
        />

        <div className="flex flex-wrap items-center gap-3 mt-5">
          <div className="flex flex-wrap gap-2">
            <Chip label="Todos" active={category === null} onClick={() => setCategory(null)} />
            {CATEGORIES.map((c) => (
              <Chip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
            ))}
          </div>

          <div className="flex gap-2 sm:ml-auto">
            <Chip label="Más reciente" active={sort === 'reciente'} onClick={() => setSort('reciente')} />
            <Chip label="Más antiguo" active={sort === 'antiguo'} onClick={() => setSort('antiguo')} />
          </div>
        </div>

        <p className="font-sans" style={{ fontSize: '13px', color: '#6B7280', marginTop: '18px' }} aria-live="polite">
          {results.length === posts.length
            ? `${posts.length} artículos`
            : `${results.length} de ${posts.length} artículos`}
        </p>
      </div>

      {results.length === 0 ? (
        <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280' }}>
          No encontramos artículos que coincidan. Prueba con otra palabra o quita los filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {results.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="font-sans font-semibold"
      style={{
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '8px 16px',
        borderRadius: '100px',
        border: `1px solid ${active ? '#243A4D' : 'rgba(36,58,77,0.2)'}`,
        backgroundColor: active ? '#243A4D' : 'transparent',
        color: active ? '#ffffff' : '#243A4D',
        transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
      }}
    >
      {label}
    </button>
  );
}

import Image from 'next/image';
import Link from 'next/link';

import { formatLongDate } from '@/lib/date';
import { urlFor } from '@/sanity/lib/image';
import type { PostPreview } from '@/sanity/lib/types';

/** Cada serie tiene su propio acento: verde profundo para paciente, dorado para cliente. */
const CATEGORY_STYLES: Record<string, { text: string; tint: string; solid: string }> = {
  'Patient Centricity': { text: '#3D5C4A', tint: 'rgba(61,92,74,0.12)', solid: '#3D5C4A' },
  'Customer Centricity': { text: '#8A6D1F', tint: 'rgba(201,168,76,0.18)', solid: '#C9A84C' },
};

const FALLBACK = { text: '#3D5C4A', tint: 'rgba(106,143,123,0.12)', solid: '#6A8F7B' };

export default function PostCard({ post }: { post: PostPreview }) {
  const style = CATEGORY_STYLES[post.category] ?? FALLBACK;
  const image = post.mainImage
    ? urlFor(post.mainImage).width(800).height(500).fit('crop').auto('format').url()
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline h-full">
      <article
        className="card-hover bg-white h-full flex flex-row sm:flex-col overflow-hidden rounded-lg"
        style={{ boxShadow: '0 2px 16px rgba(36,58,77,0.07)', borderTop: `2px solid ${style.solid}` }}
      >
        {image && (
          <div className="relative shrink-0 self-start w-28 sm:w-full aspect-square sm:aspect-[16/10]">
            <Image
              src={image}
              alt={post.mainImage?.alt ?? post.title}
              fill
              sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, 360px"
              style={{ objectFit: 'cover' }}
            />
            {/* En móvil la etiqueta se monta sobre la miniatura; en desktop vive en el cuerpo. */}
            <span
              className="sm:hidden absolute top-0 left-0 font-sans font-bold"
              style={{
                fontSize: '8px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#ffffff',
                backgroundColor: style.solid,
                padding: '4px 7px',
                borderBottomRightRadius: '4px',
              }}
            >
              {post.category}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0 flex flex-col p-4 sm:p-7">
          <div className="flex items-center gap-3 flex-wrap mb-2 sm:mb-4">
            <span
              className="hidden sm:inline-flex font-sans font-bold"
              style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: style.text,
                backgroundColor: style.tint,
                padding: '5px 11px',
                borderRadius: '4px',
              }}
            >
              {post.category}
            </span>
            <time
              dateTime={post.publishedAt}
              className="font-sans"
              style={{ fontSize: '13px', color: '#6B7280' }}
            >
              {formatLongDate(post.publishedAt)}
            </time>
          </div>

          <h3
            className="font-serif"
            style={{
              fontSize: 'clamp(17px, 1.7vw, 22px)',
              color: '#243A4D',
              fontWeight: 700,
              lineHeight: 1.28,
              marginBottom: '10px',
            }}
          >
            {post.title}
          </h3>

          {/* El recorte va por clase, no en style: un `display` inline ganaría
              sobre `hidden` y el resumen seguiría visible en móvil. */}
          <p
            className="font-sans hidden sm:line-clamp-3 flex-1"
            style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.65, marginBottom: '20px' }}
          >
            {post.excerpt}
          </p>

          <span
            className="font-sans font-semibold hidden sm:inline-block"
            style={{ fontSize: '13px', color: style.text, letterSpacing: '0.04em' }}
          >
            Leer más →
          </span>
        </div>
      </article>
    </Link>
  );
}

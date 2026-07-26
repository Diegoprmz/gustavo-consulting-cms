import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';

import { urlFor } from '@/sanity/lib/image';
import type { SanityImage } from '@/sanity/lib/types';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-sans" style={{ fontSize: '17px', lineHeight: 1.85, color: '#4A5568', marginBottom: '28px' }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="font-serif"
        style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', color: '#243A4D', fontWeight: 700, lineHeight: 1.3, marginTop: '56px', marginBottom: '20px' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-serif"
        style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: '#243A4D', fontWeight: 700, lineHeight: 1.35, marginTop: '40px', marginBottom: '16px' }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ margin: '48px 0', padding: '28px 32px', borderLeft: '3px solid #C9A84C', backgroundColor: '#F9F7F2' }}>
        <p className="font-serif" style={{ fontSize: '22px', fontStyle: 'italic', color: '#243A4D', lineHeight: 1.5 }}>
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="font-sans" style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '28px', color: '#4A5568' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="font-sans" style={{ listStyle: 'decimal', paddingLeft: '24px', marginBottom: '28px', color: '#4A5568' }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ fontSize: '17px', lineHeight: 1.85, marginBottom: '10px' }}>{children}</li>,
    number: ({ children }) => <li style={{ fontSize: '17px', lineHeight: 1.85, marginBottom: '10px' }}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 700, color: '#243A4D' }}>{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? '#';
      const isExternal = /^https?:\/\//.test(href) && !href.includes('gustavo.consulting');
      return (
        <a
          href={href}
          className="editorial-link"
          style={{ color: '#6A8F7B', fontWeight: 600 }}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null;
      return (
        <figure style={{ margin: '48px 0' }}>
          <Image
            src={urlFor(value).width(1400).fit('max').auto('format').url()}
            alt={value.alt ?? ''}
            width={760}
            height={0}
            sizes="(max-width: 768px) 100vw, 760px"
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
          {value.caption && (
            <figcaption
              className="font-sans"
              style={{ fontSize: '13px', color: '#6B7280', marginTop: '12px', textAlign: 'center', fontStyle: 'italic' }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}

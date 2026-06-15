import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Gustavo Martínez Business Consulting',
  description: 'Artículos sobre estrategia empresarial, customer centricity y liderazgo ejecutivo en LATAM.',
  openGraph: {
    title: 'Blog | Gustavo Martínez Business Consulting',
    description: 'Artículos sobre estrategia empresarial, customer centricity y liderazgo ejecutivo en LATAM.',
    url: 'https://gustavo.consulting/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

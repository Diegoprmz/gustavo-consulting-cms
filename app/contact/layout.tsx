import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Gustavo Martínez Business Consulting',
  description: 'Escríbele a Gustavo Martínez para consultoría estratégica, conferencias o educación ejecutiva.',
  openGraph: {
    title: 'Contacto | Gustavo Martínez Business Consulting',
    description: 'Escríbele a Gustavo Martínez para consultoría estratégica, conferencias o educación ejecutiva.',
    url: 'https://gustavo.consulting/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

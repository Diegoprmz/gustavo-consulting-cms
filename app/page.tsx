import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gustavo Martínez — Estrategia centrada en las personas',
  description: 'Consejero, consultor y formador en educación ejecutiva con más de 30 años de experiencia en México y LATAM. Estrategia centrada en las personas para empresas en crecimiento.',
  openGraph: {
    title: 'Gustavo Martínez — Estrategia centrada en las personas',
    description: 'Consejero, consultor y formador en educación ejecutiva con más de 30 años de experiencia en México y LATAM.',
    url: 'https://gustavo.consulting',
    type: 'profile',
  },
};

import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Experiencia from '@/components/sections/Experiencia';
import Trayectoria from '@/components/sections/Trayectoria';
import Clientes from '@/components/sections/Clientes';
import Libro from '@/components/sections/Libro';
import Colaboracion from '@/components/sections/Colaboracion';
import Concepto from '@/components/sections/Concepto';
import ElProblema from '@/components/sections/ElProblema';
import Articulos from '@/components/sections/Articulos';
import Conversemos from '@/components/sections/Conversemos';
import Footer from '@/components/sections/Footer';
import LoadingScreen from '@/components/ui/LoadingScreen';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import BackToTop from '@/components/ui/BackToTop';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Clientes />
        <Trayectoria />
        <div aria-hidden="true" style={{ backgroundColor: '#ffffff', padding: '0 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', height: '3px', background: 'linear-gradient(to right, transparent, #C9A84C55, #C9A84C, #C9A84C55, transparent)' }} />
        </div>
        <Experiencia />
        <Colaboracion />
        <Libro />
        <Concepto />
        <ElProblema />
        <Articulos />
        <Conversemos />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}

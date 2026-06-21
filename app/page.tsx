import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gustavo Martínez — Consultoría Estratégica Internacional',
  description: 'Consejero corporativo y profesor ejecutivo con más de 30 años de experiencia en México y LATAM. Estrategia centrada en el cliente para empresas en crecimiento.',
  openGraph: {
    title: 'Gustavo Martínez — Consultoría Estratégica Internacional',
    description: 'Consejero corporativo y profesor ejecutivo con más de 30 años de experiencia en México y LATAM.',
    url: 'https://gustavo.consulting',
    type: 'profile',
  },
};

import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Experiencia from '@/components/sections/Experiencia';
import Trayectoria from '@/components/sections/Trayectoria';
import Universidades from '@/components/sections/Universidades';
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
        <Experiencia />
        <Colaboracion />
        <Trayectoria />
        <Universidades />
        <Clientes />
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

import Hero from '@/components/sections/Hero';
import Experiencia from '@/components/sections/Experiencia';
import Trayectoria from '@/components/sections/Trayectoria';
import Clientes from '@/components/sections/Clientes';
import Libro from '@/components/sections/Libro';
import Colaboracion from '@/components/sections/Colaboracion';
import Concepto from '@/components/sections/Concepto';
import ElProblema from '@/components/sections/ElProblema';
import ElEnfoque from '@/components/sections/ElEnfoque';
import Articulos from '@/components/sections/Articulos';
import Conversemos from '@/components/sections/Conversemos';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Experiencia />
      <Trayectoria />
      <Clientes />
      <Libro />
      <Colaboracion />
      <Concepto />
      <ElProblema />
      <ElEnfoque />
      <Articulos />
      <Conversemos />
      <Footer />
    </main>
  );
}

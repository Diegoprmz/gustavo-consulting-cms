import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Experiencia from '@/components/sections/Experiencia';
import Trayectoria from '@/components/sections/Trayectoria';
import Universidades from '@/components/sections/Universidades';
import Clientes from '@/components/sections/Clientes';
import Libro from '@/components/sections/Libro';
import GradientTransition from '@/components/sections/GradientTransition';
import Colaboracion from '@/components/sections/Colaboracion';
import Concepto from '@/components/sections/Concepto';
import ElProblema from '@/components/sections/ElProblema';
import Articulos from '@/components/sections/Articulos';
import Conversemos from '@/components/sections/Conversemos';
import Footer from '@/components/sections/Footer';
import LoadingScreen from '@/components/ui/LoadingScreen';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Experiencia />
        <Trayectoria />
        <Universidades />
        <Clientes />
        <Libro />
        <GradientTransition />
        <Colaboracion />
        <Concepto />
        <ElProblema />
        <Articulos />
        <Conversemos />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

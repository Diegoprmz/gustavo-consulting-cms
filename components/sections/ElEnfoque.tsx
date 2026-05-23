'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const dimensiones = [
  { num: '01', titulo: 'Estrategia',   descripcion: 'Definición del rumbo con el cliente al centro.', color: '#C9A84C' },
  { num: '02', titulo: 'Cultura',      descripcion: 'Organización alineada en torno al valor entregado.', color: '#6A8F7B' },
  { num: '03', titulo: 'Operación',    descripcion: 'Procesos diseñados desde la experiencia, no desde la inercia.', color: '#C9A84C' },
  { num: '04', titulo: 'Experiencia',  descripcion: 'Coherencia en cada punto de contacto.', color: '#6A8F7B' },
  { num: '05', titulo: 'Métricas',     descripcion: 'Indicadores que conectan cliente y rentabilidad.', color: '#C9A84C' },
];

export default function ElEnfoque() {
  return (
    <section
      style={{ backgroundColor: '#243A4D', paddingTop: '72px', paddingBottom: '110px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)', marginBottom: '72px' }} />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0">
          {dimensiones.map((d, i) => (
            <AnimatedSection key={d.num} delay={i * 0.1}>
              <motion.div
                className="relative"
                style={{ paddingRight: '16px', cursor: 'default' }}
                whileHover={{
                  backgroundColor: '#ffffff',
                  y: -8,
                  borderRadius: '4px',
                }}
                transition={{ duration: 0.25 }}
              >
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-0 h-full"
                    style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(106,143,123,0.2), transparent)' }}
                  />
                )}
                <motion.div
                  className="md:px-5"
                  style={{ padding: '20px 16px', borderBottom: '2px solid transparent', transition: 'border-color 0.25s ease' }}
                  whileHover={{ borderColor: '#C9A84C' }}
                >
                  <motion.p
                    className="font-serif font-bold"
                    style={{ fontSize: '30px', lineHeight: 1, marginBottom: '14px' }}
                    whileHover={{ color: '#243A4D' }}
                    initial={{ color: d.color }}
                  >
                    {d.num}
                  </motion.p>
                  <motion.p
                    className="font-sans font-semibold"
                    style={{ fontSize: '15px', marginBottom: '10px', letterSpacing: '0.01em' }}
                    whileHover={{ color: '#243A4D' }}
                    initial={{ color: '#ffffff' }}
                  >
                    {d.titulo}
                  </motion.p>
                  <motion.p
                    className="font-sans"
                    style={{ fontSize: '13px', lineHeight: 1.7 }}
                    whileHover={{ color: '#4A5568', opacity: 1 }}
                    initial={{ color: '#ffffff', opacity: 0.72 }}
                  >
                    {d.descripcion}
                  </motion.p>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-0">
          {dimensiones.map((d, i) => (
            <AnimatedSection key={d.num} delay={i * 0.1}>
              <motion.div
                className="relative"
                style={{ paddingRight: '24px', cursor: 'default' }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}
                transition={{ duration: 0.25 }}
              >
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-0 h-full"
                    style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(106,143,123,0.2), transparent)' }}
                  />
                )}
                <div className="md:px-5">
                  <p className="font-serif font-bold" style={{ fontSize: '32px', color: d.color, marginBottom: '14px', lineHeight: 1 }}>
                    {d.num}
                  </p>
                  <p className="font-sans font-semibold text-white" style={{ fontSize: '16px', marginBottom: '10px', letterSpacing: '0.01em' }}>
                    {d.titulo}
                  </p>
                  <p className="font-sans text-white" style={{ fontSize: '13px', lineHeight: 1.7, opacity: 0.72 }}>
                    {d.descripcion}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

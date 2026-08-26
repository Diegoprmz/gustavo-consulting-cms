export type Tag = 'Grado académico' | 'Diplomado' | 'Seminario internacional' | 'Certificación' | 'Coaching' | 'Consejería';
export type Doc = { src: string; title: string; tag: Tag };

const D = (src: string, title: string, tag: Tag): Doc => ({ src, title, tag });

/** Formación académica formal — ITAM. */
export const ACADEMICO: Doc[] = [
  D('licenciatura-itam', 'Licenciatura en Administración de Empresas', 'Grado académico'),
  D('maestria-itam', 'Maestría en Administración', 'Grado académico'),
];

/** Diplomados y workshops de extensión universitaria. */
export const DIPLOMADOS: Doc[] = [
  D('diplomado-mercadotecnia', 'Diplomado en Mercadotecnia', 'Diplomado'),
  D('diplomado-calidad', 'Diplomado en Calidad Gerencial', 'Diplomado'),
  D('anahuac-marketing-roi', 'Workshop Marketing ROI — Anáhuac Querétaro', 'Diplomado'),
  D('ama-neuromarketing', 'Neuromarketing — AMA Global', 'Diplomado'),
];

/** Seminarium — seminarios internacionales en México. */
export const SEMINARIUM: Doc[] = [
  D('seminarium-marketing', 'Seminarium on Marketing', 'Seminario internacional'),
  D('seminarium-customer-centricity', 'Customer Centricity', 'Seminario internacional'),
  D('seminarium-strategic-thinking', 'Strategic Thinking — Create Value', 'Seminario internacional'),
  D('seminarium-competitive-strategy', 'Competitive Strategy — Three-Circle Model', 'Seminario internacional'),
  D('seminarium-innovation', 'Innovation — Strategy & Management', 'Seminario internacional'),
  D('seminarium-talent', 'Strategic Talent Management', 'Seminario internacional'),
  D('seminarium-grow', 'Grow by Focusing on What Matters', 'Seminario internacional'),
  D('seminarium-digital-mindset', 'Digital Mindset', 'Seminario internacional'),
  D('seminarium-cracked-it', 'Cracked It', 'Seminario internacional'),
  D('seminarium-innovacion', 'Innovación y Estrategia', 'Seminario internacional'),
];

/** WOBI — masterclasses digitales y WOBI Education. */
export const WOBI: Doc[] = [
  D('wobi-customer-centricity', 'WOBI on Customer Centricity', 'Seminario internacional'),
  D('wobi-innovation', 'WOBI on Innovation', 'Seminario internacional'),
  D('wobi-creativity', 'WOBI on Marketing & Creativity', 'Seminario internacional'),
  D('wobi-leadership', 'WOBI on Leadership', 'Seminario internacional'),
  D('wobi-strategy-innovation', 'WOBI on Strategy and Innovation', 'Seminario internacional'),
  D('wobi-digital-future', 'WOBI on Digital Future', 'Seminario internacional'),
  D('wobi-cx-strategy', 'WOBI on Customer Experience Strategy', 'Seminario internacional'),
  D('wobi-inclusive-leadership', 'WOBI on Inclusive Leadership', 'Seminario internacional'),
  D('wobi-strategy-management', 'WOBI on Strategy & Management', 'Seminario internacional'),
  D('wobi-creative-leadership', 'WOBI on Creative Leadership', 'Seminario internacional'),
  D('wobi-self-management', 'WOBI on Self-Management', 'Seminario internacional'),
  D('wobi-innovation-growth', 'WOBI on Innovation for Growth', 'Seminario internacional'),
  D('wobi-leading-change', 'WOBI on Leading Change', 'Seminario internacional'),
  D('wobi-emotional-intelligence', 'WOBI on Emotional Intelligence', 'Seminario internacional'),
  D('wobi-edu-innovacion-estrategia', 'WOBI Education — Gestión de la Innovación y Estrategia', 'Seminario internacional'),
  D('wobi-edu-innovacion-modelos', 'WOBI Education — Innovación de Modelos de Negocio', 'Seminario internacional'),
];

/** Otras escuelas de negocio internacionales. */
export const OTROS: Doc[] = [
  D('stanford-design-thinking', 'Design Thinking Workshop — Stanford', 'Seminario internacional'),
  D('kellogg-business-innovation', 'Business Innovation — Kellogg', 'Seminario internacional'),
  D('notredame-senior-pm', 'Senior Project Management — Notre Dame', 'Seminario internacional'),
  D('notredame-advanced-pm', 'Advanced Project Management — Notre Dame', 'Seminario internacional'),
  D('notredame-negociacion', 'Negociación Avanzada — Notre Dame', 'Seminario internacional'),
  D('georgetown-supply-chain', 'Supply Chain Management — Georgetown', 'Seminario internacional'),
];

/** Certificaciones profesionales — Service Quality Institute y reconocimientos. */
export const CERT_PROF: Doc[] = [
  D('ccst-service-quality', 'Certified Customer Service Trainer (CCST)', 'Certificación'),
  D('ccsl-service-quality', 'Certified Customer Service Leader (CCSL)', 'Certificación'),
  D('speaker-latam', 'Professional Speaker — Latam Speakers Association', 'Certificación'),
  D('sentimientos-sqi', 'Programa Sentimientos — Service Quality Institute', 'Certificación'),
];

export const COACHING: Doc[] = [
  D('coaching-lideres', 'Habilidades de coaching para líderes y gerentes', 'Coaching'),
  D('coaching-personal', 'Cómo hacer coaching a tu personal para obtener resultados', 'Coaching'),
];

export const CONSEJERIA: Doc[] = [D('consejeria-cncpie', 'Consejero Profesional Independiente', 'Consejería')];

/** Todos los seminarios internacionales combinados (Seminarium + WOBI + otras escuelas), para el ring principal. */
export const SEMINARIOS: Doc[] = [...SEMINARIUM, ...WOBI, ...OTROS];

/** Lista plana de TODOS los documentos, para el lightbox. */
export const ALL: Doc[] = [...ACADEMICO, ...DIPLOMADOS, ...SEMINARIOS, ...CERT_PROF, ...COACHING, ...CONSEJERIA];

export const TAG_STYLE: Record<Tag, { text: string; tint: string; dot: string }> = {
  'Grado académico': { text: '#243A4D', tint: 'rgba(36,58,77,0.10)', dot: '#243A4D' },
  Diplomado: { text: '#3D5C4A', tint: 'rgba(106,143,123,0.18)', dot: '#6A8F7B' },
  'Seminario internacional': { text: '#8A6D1F', tint: 'rgba(201,168,76,0.20)', dot: '#C9A84C' },
  Certificación: { text: '#3D5C4A', tint: 'rgba(61,92,74,0.14)', dot: '#3D5C4A' },
  Coaching: { text: '#8A6438', tint: 'rgba(176,132,66,0.16)', dot: '#B08442' },
  Consejería: { text: '#3E5871', tint: 'rgba(91,123,154,0.16)', dot: '#5B7B9A' },
};

const V = '4';
export const certUrl = (src: string) => `/assets/certificados/${src}.jpg?v=${V}`;

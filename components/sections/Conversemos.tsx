'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface FormData {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  mensaje: string;
}

/* ── Input styles ─────────────────────────────────────── */
const inputBase: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  padding: '14px 16px',
  fontFamily: 'var(--font-source-sans), Arial, sans-serif',
  fontSize: '15px',
  color: '#ffffff',
  outline: 'none',
  transition: 'border-color 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease',
  boxSizing: 'border-box',
};

const inputFocus: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.11)',
  borderColor: '#C9A84C',
  boxShadow: '0 0 0 3px rgba(201,168,76,0.18)',
};

const inputError: React.CSSProperties = {
  borderColor: '#FC8181',
  boxShadow: '0 0 0 3px rgba(252,129,129,0.15)',
};

/* ── StyledInput ──────────────────────────────────────── */
function StyledInput({
  hasError,
  onFocusChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  onFocusChange?: (focused: boolean) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => { setFocused(true); onFocusChange?.(true); props.onFocus?.(e); }}
      onBlur={(e)  => { setFocused(false); onFocusChange?.(false); props.onBlur?.(e); }}
      style={{
        ...inputBase,
        ...(focused   ? inputFocus : {}),
        ...(hasError  ? inputError : {}),
      }}
    />
  );
}

/* ── StyledTextarea ───────────────────────────────────── */
function StyledTextarea({
  hasError,
  onFocusChange,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
  onFocusChange?: (focused: boolean) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={(e) => { setFocused(true); onFocusChange?.(true); props.onFocus?.(e); }}
      onBlur={(e)  => { setFocused(false); onFocusChange?.(false); props.onBlur?.(e); }}
      style={{
        ...inputBase,
        ...(focused  ? inputFocus : {}),
        ...(hasError ? inputError : {}),
        resize: 'vertical',
        minHeight: '110px',
      }}
    />
  );
}

/* ── FormField ────────────────────────────────────────── */
function FormField({
  label, error, children, delay,
}: {
  label: string; error?: string; children: React.ReactNode; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      className="flex flex-col gap-1"
    >
      <label
        className="font-sans font-semibold"
        style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-sans"
            style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px' }}
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────── */
export default function Conversemos() {
  const [status, setStatus]       = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formActive, setFormActive] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="conversemos"
      style={{ backgroundColor: '#1E293B', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <AnimatedSection delay={0.1}>
            <h2
              className="font-serif mx-auto mb-4"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                color: '#ffffff',
                lineHeight: 1.3,
                fontWeight: 700,
                maxWidth: '720px',
              }}
            >
              Si este enfoque resuena con los retos actuales de tu organización,{' '}
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>podemos conversar.</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.18}>
            <p
              className="font-sans"
              style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}
            >
              Contéstame algunas preguntas breves y nos conectamos.
            </p>
          </AnimatedSection>
        </div>

        {/* Form container — animates when user is active */}
        <motion.div
          className="max-w-[620px] mx-auto"
          animate={{
            boxShadow: formActive
              ? '0 0 0 2px rgba(201,168,76,0.5), 0 24px 60px rgba(0,0,0,0.4)'
              : '0 4px 24px rgba(0,0,0,0.25)',
            borderColor: formActive
              ? 'rgba(201,168,76,0.35)'
              : 'rgba(255,255,255,0.08)',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            backgroundColor: '#243A4D',
            borderRadius: '16px',
            padding: '48px 40px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <FormField label="Nombre" error={errors.nombre?.message} delay={0.05}>
                <StyledInput
                  type="text"
                  placeholder="Tu nombre"
                  hasError={!!errors.nombre}
                  onFocusChange={(f) => { if (f) setFormActive(true); }}
                  {...register('nombre', {
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                  })}
                />
              </FormField>

              <FormField label="Correo electrónico" error={errors.email?.message} delay={0.1}>
                <StyledInput
                  type="email"
                  placeholder="tu@email.com"
                  hasError={!!errors.email}
                  onFocusChange={(f) => { if (f) setFormActive(true); }}
                  {...register('email', {
                    required: 'Este campo es requerido',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Correo inválido',
                    },
                  })}
                />
              </FormField>

              <FormField label="Empresa" error={errors.empresa?.message} delay={0.15}>
                <StyledInput
                  type="text"
                  placeholder="Nombre de tu empresa"
                  hasError={!!errors.empresa}
                  onFocusChange={(f) => { if (f) setFormActive(true); }}
                  {...register('empresa')}
                />
              </FormField>

              <FormField label="Teléfono" error={errors.telefono?.message} delay={0.2}>
                <StyledInput
                  type="tel"
                  placeholder="+52 (opcional)"
                  hasError={!!errors.telefono}
                  onFocusChange={(f) => { if (f) setFormActive(true); }}
                  {...register('telefono')}
                />
              </FormField>
            </div>

            <div className="mb-6">
              <FormField label="Tu mensaje" error={errors.mensaje?.message} delay={0.25}>
                <StyledTextarea
                  placeholder="Cuéntame brevemente tu reto"
                  rows={4}
                  hasError={!!errors.mensaje}
                  onFocusChange={(f) => { if (f) setFormActive(true); }}
                  {...register('mensaje', {
                    required: 'Este campo es requerido',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                  })}
                />
              </FormField>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={status === 'idle' ? { backgroundColor: '#C9A84C', color: '#1E293B', scale: 1.02 } : {}}
              whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              transition={{ duration: 0.25 }}
              className="w-full font-sans font-semibold cursor-pointer"
              style={{
                backgroundColor: status === 'sending' ? '#4B5563' : '#243A4D',
                color: '#ffffff',
                border: '1.5px solid rgba(201,168,76,0.4)',
                padding: '16px 32px',
                fontSize: '14px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '8px',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {status === 'sending' ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Enviando...
                </>
              ) : (
                'Agendar conversación →'
              )}
            </motion.button>

            {/* Feedback messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center mt-4 font-sans font-semibold"
                  style={{ fontSize: '15px', color: '#6A8F7B' }}
                >
                  ✓ ¡Gracias! Nos contactaremos pronto.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center mt-4 font-sans"
                  style={{ fontSize: '14px', color: '#FC8181' }}
                >
                  Ocurrió un error. Por favor intenta de nuevo.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

      </div>
    </section>
  );
}

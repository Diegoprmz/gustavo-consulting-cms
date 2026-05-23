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

function FormField({
  label,
  error,
  children,
  delay,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  delay: number;
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
        className="font-sans font-bold"
        style={{ fontSize: '12px', color: '#243A4D', marginBottom: '6px' }}
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
            className="font-sans flex items-center gap-1"
            style={{ fontSize: '12px', color: '#E53E3E', marginTop: '4px' }}
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const inputStyle = {
  width: '100%',
  backgroundColor: '#ffffff',
  border: '1px solid rgba(36,58,77,0.35)',
  borderRadius: '0',
  padding: '14px 16px',
  fontFamily: 'var(--font-source-sans), Arial, sans-serif',
  fontSize: '15px',
  color: '#333333',
  outline: 'none',
  transition: 'border-color 0.22s ease, box-shadow 0.22s ease',
};

const inputFocusStyle = {
  borderColor: '#6A8F7B',
  boxShadow: '0 0 0 3px rgba(106,143,123,0.15)',
};

function StyledInput({
  hasError,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
        ...(hasError ? { borderColor: '#E53E3E' } : {}),
      }}
    />
  );
}

function StyledTextarea({
  hasError,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
        ...(hasError ? { borderColor: '#E53E3E' } : {}),
        resize: 'vertical',
        minHeight: '100px',
      }}
    />
  );
}

export default function Conversemos() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

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
      style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          {/* Label */}
          <AnimatedSection>
            <p
              className="font-sans font-semibold mb-4"
              style={{
                fontSize: '12px',
                color: '#6A8F7B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              CONVERSEMOS
            </p>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection delay={0.1}>
            <h2
              className="font-serif text-navy mx-auto mb-4"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                color: '#243A4D',
                lineHeight: 1.3,
                fontWeight: 700,
                maxWidth: '720px',
              }}
            >
              Si este enfoque resuena con los retos actuales de tu organización,
              podemos conversar.
            </h2>
          </AnimatedSection>

          {/* Subtitle */}
          <AnimatedSection delay={0.18}>
            <p
              className="font-sans"
              style={{ fontSize: '16px', color: '#333333', marginBottom: '40px' }}
            >
              Contéstame algunas preguntas breves y nos conectamos.
            </p>
          </AnimatedSection>
        </div>

        {/* Form */}
        <div className="max-w-[600px] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Desktop: 2-col grid for first 4 fields, full-width for textarea */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <FormField label="Nombre" error={errors.nombre?.message} delay={0.05}>
                <StyledInput
                  type="text"
                  placeholder="Tu nombre"
                  hasError={!!errors.nombre}
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
                  {...register('empresa')}
                />
              </FormField>

              <FormField label="Teléfono" error={errors.telefono?.message} delay={0.2}>
                <StyledInput
                  type="tel"
                  placeholder="+52 (opcional)"
                  hasError={!!errors.telefono}
                  {...register('telefono')}
                />
              </FormField>
            </div>

            {/* Textarea — full width */}
            <div className="mb-6">
              <FormField label="Tu mensaje" error={errors.mensaje?.message} delay={0.25}>
                <StyledTextarea
                  placeholder="Cuéntame brevemente tu reto"
                  rows={4}
                  hasError={!!errors.mensaje}
                  {...register('mensaje', {
                    required: 'Este campo es requerido',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                  })}
                />
              </FormField>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={
                status === 'idle'
                  ? { backgroundColor: '#6A8F7B', scale: 1.05, boxShadow: '0 8px 20px rgba(106,143,123,0.3)' }
                  : {}
              }
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full font-sans font-semibold text-white cursor-pointer"
              style={{
                backgroundColor: status === 'sending' ? '#6B7280' : '#243A4D',
                padding: '16px 32px',
                fontSize: '14px',
                letterSpacing: '0.04em',
                border: 'none',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {status === 'sending' ? (
                <>
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Enviando...
                </>
              ) : (
                'AGENDAR CONVERSACIÓN →'
              )}
            </motion.button>

            {/* Success message */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4 }}
                  className="text-center mt-4 font-sans font-semibold flex items-center justify-center gap-2"
                  style={{ fontSize: '15px', color: '#6A8F7B' }}
                >
                  ✓ ¡Gracias! Nos contactaremos pronto.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4 }}
                  className="text-center mt-4 font-sans"
                  style={{ fontSize: '14px', color: '#E53E3E' }}
                >
                  Ocurrió un error. Por favor intenta de nuevo.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

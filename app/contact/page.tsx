'use client';

import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { useState } from 'react';

const serviceOptions = [
  { value: '', label: 'Selecciona un tipo de servicio' },
  { value: 'consultoria', label: 'Consultoría Estratégica' },
  { value: 'conferencia', label: 'Conferencia / Keynote' },
  { value: 'educacion', label: 'Educación Ejecutiva' },
  { value: 'advisory', label: 'Advisory Board' },
  { value: 'otro', label: 'Otro' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Ingresa tu nombre (mínimo 2 caracteres)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Ingresa un correo válido';
    if (form.message.trim().length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', company: '', email: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '14px 16px',
    border: `1px solid ${hasError ? '#E53E3E' : '#243A4D'}`,
    borderRadius: '6px',
    fontSize: '15px',
    color: '#333333',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box' as const,
  });

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#243A4D',
    letterSpacing: '0.04em',
    marginBottom: '6px',
    fontFamily: 'inherit',
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: '#F5F5F5', paddingTop: '160px', paddingBottom: '80px' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left: Info */}
              <div>
                <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
                  Conversemos
                </span>
                <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(36px, 4.5vw, 58px)', color: '#243A4D', lineHeight: 1.1, marginBottom: '24px' }}>
                  Conversemos.
                </h1>
                <p className="font-sans" style={{ fontSize: '17px', color: '#333333', lineHeight: 1.8, marginBottom: '40px' }}>
                  Si buscas claridad estratégica, formación ejecutiva o una conferencia para tu organización, escríbeme y lo platicamos.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <p className="font-sans font-semibold" style={{ fontSize: '11px', color: '#6A8F7B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Email
                    </p>
                    <a
                      href="mailto:contacto@gustavo.consulting"
                      className="font-sans"
                      style={{ fontSize: '16px', color: '#243A4D', textDecoration: 'none' }}
                    >
                      contacto@gustavo.consulting
                    </a>
                  </div>
                  <div>
                    <p className="font-sans font-semibold" style={{ fontSize: '11px', color: '#6A8F7B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                      LinkedIn
                    </p>
                    <a
                      href="https://www.linkedin.com/in/gustavo-mart%C3%ADnez-pell%C3%B3n-19a44238/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans"
                      style={{ fontSize: '16px', color: '#243A4D', textDecoration: 'none' }}
                    >
                      Gustavo Martínez Pellón
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '40px', boxShadow: '0 4px 24px rgba(36,58,77,0.08)' }}>
                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(106,143,123,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6A8F7B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-serif font-bold" style={{ fontSize: '24px', color: '#243A4D', marginBottom: '12px' }}>
                      ¡Mensaje enviado!
                    </h3>
                    <p className="font-sans" style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7 }}>
                      Gracias por escribir. Me pondré en contacto contigo pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label htmlFor="name" style={labelStyle}>Nombre *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={handleChange}
                        style={inputStyle(!!errors.name)}
                      />
                      {errors.name && <p style={{ fontSize: '13px', color: '#E53E3E', marginTop: '6px' }}>{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="company" style={labelStyle}>Empresa / Institución</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Nombre de tu empresa (opcional)"
                        value={form.company}
                        onChange={handleChange}
                        style={inputStyle(false)}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" style={labelStyle}>Correo electrónico *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle(!!errors.email)}
                      />
                      {errors.email && <p style={{ fontSize: '13px', color: '#E53E3E', marginTop: '6px' }}>{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="service" style={labelStyle}>Tipo de servicio</label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        style={{ ...inputStyle(false), cursor: 'pointer' }}
                      >
                        {serviceOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" style={labelStyle}>Mensaje *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Cuéntame brevemente tu reto o lo que tienes en mente"
                        value={form.message}
                        onChange={handleChange}
                        style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: '100px' }}
                      />
                      {errors.message && <p style={{ fontSize: '13px', color: '#E53E3E', marginTop: '6px' }}>{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="font-sans font-semibold text-white"
                      style={{
                        backgroundColor: status === 'loading' ? '#6A8F7B' : '#243A4D',
                        border: 'none',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.25s',
                        width: '100%',
                      }}
                    >
                      {status === 'loading' ? 'Enviando...' : 'Enviar solicitud →'}
                    </button>

                    {status === 'error' && (
                      <p style={{ fontSize: '14px', color: '#E53E3E', textAlign: 'center' }}>
                        Ocurrió un error al enviar. Intenta de nuevo o escribe a contacto@gustavo.consulting
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

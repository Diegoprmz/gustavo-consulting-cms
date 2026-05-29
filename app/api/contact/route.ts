export const dynamic = 'force-dynamic';

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  service?: string;
  message?: string;
}

const SERVICE_LABELS: Record<string, string> = {
  consultoria: 'Consultoría Estratégica',
  conferencia: 'Conferencia / Keynote',
  educacion: 'Educación Ejecutiva',
  advisory: 'Advisory Board',
  otro: 'Otro',
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    let body: ContactPayload = {};

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Body inválido' }, { status: 400 });
    }

    console.log('[contact] body recibido:', body);

    const { name, company, email, service, message } = body;

    if (!name || name.trim().length < 2) {
      return Response.json({ error: 'Nombre inválido' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Email inválido' }, { status: 400 });
    }
    if (!message || message.trim().length < 10) {
      return Response.json({ error: 'Mensaje muy corto' }, { status: 400 });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeCompany = company ? escapeHtml(company.trim()) : '';
    const safeService = service ? escapeHtml(SERVICE_LABELS[service] ?? service) : '';
    const safeMessage = escapeHtml(message.trim());

    const resendApiKey = process.env.RESEND_API_KEY;
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction && resendApiKey) {
      const emailPayload = {
        from: 'Formulario Web <noreply@gustavo.consulting>',
        to: ['contacto@gustavo.consulting'],
        subject: `Nuevo mensaje de ${safeName} — gustavo.consulting`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f5f5f5;">
            <div style="background: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
              <h2 style="color: #243A4D; font-size: 22px; margin-bottom: 24px;">Nuevo mensaje de contacto</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 13px; width: 140px;">Nombre</td>
                  <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Email</td>
                  <td style="padding: 8px 0; color: #243A4D; font-size: 14px;">${safeEmail}</td>
                </tr>
                ${safeCompany ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Empresa</td><td style="padding: 8px 0; color: #333333; font-size: 14px;">${safeCompany}</td></tr>` : ''}
                ${safeService ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Tipo de servicio</td><td style="padding: 8px 0; color: #333333; font-size: 14px;">${safeService}</td></tr>` : ''}
              </table>
              <hr style="border: none; border-top: 1px solid #f0f0f0; margin: 20px 0;" />
              <p style="color: #6B7280; font-size: 13px; margin-bottom: 8px;">Mensaje</p>
              <p style="color: #333333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
                <a href="mailto:${safeEmail}" style="background: #243A4D; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
                  Responder a ${safeName}
                </a>
              </div>
            </div>
          </div>
        `,
      };

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      if (!resendRes.ok) {
        const resendError = await resendRes.text();
        console.error('[contact] Resend error:', resendError);
        return Response.json({ error: 'Error al enviar email' }, { status: 500 });
      }
    } else {
      console.log('[contact] Modo desarrollo — datos recibidos:');
      console.log({ name, company, email, service, message });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[contact] Error inesperado:', err);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  nombre: string;
  email: string;
  empresa?: string;
  telefono?: string;
  mensaje: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    const { nombre, email, empresa, telefono, mensaje } = body;

    if (!nombre || nombre.length < 2) {
      return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }
    if (!mensaje || mensaje.length < 10) {
      return NextResponse.json({ error: 'Mensaje muy corto' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailPayload = {
        from: 'Formulario Web <noreply@gustavo.consulting>',
        to: ['contacto@gustavo.consulting'],
        subject: `Nuevo mensaje de ${nombre} — gustavo.consulting`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f5f5f5;">
            <div style="background: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
              <h2 style="color: #243A4D; font-size: 22px; margin-bottom: 24px;">Nuevo mensaje de contacto</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 13px; width: 120px;">Nombre</td>
                  <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Email</td>
                  <td style="padding: 8px 0; color: #243A4D; font-size: 14px;">${email}</td>
                </tr>
                ${empresa ? `<tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Empresa</td>
                  <td style="padding: 8px 0; color: #333333; font-size: 14px;">${empresa}</td>
                </tr>` : ''}
                ${telefono ? `<tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Teléfono</td>
                  <td style="padding: 8px 0; color: #333333; font-size: 14px;">${telefono}</td>
                </tr>` : ''}
              </table>

              <hr style="border: none; border-top: 1px solid #f0f0f0; margin: 20px 0;" />

              <p style="color: #6B7280; font-size: 13px; margin-bottom: 8px;">Mensaje</p>
              <p style="color: #333333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>

              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
                <a href="mailto:${email}" style="background: #243A4D; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
                  Responder a ${nombre}
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
        console.error('Resend error:', resendError);
        return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 });
      }
    } else {
      console.log('--- Nuevo mensaje de contacto (sin Resend) ---');
      console.log({ nombre, email, empresa, telefono, mensaje });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

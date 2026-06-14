const WA_API_URL = 'https://graph.facebook.com/v19.0';

interface SendMessageParams {
  to: string;
  type: 'text' | 'template';
  text?: string;
  templateName?: string;
  templateParams?: string[];
  language?: string;
}

export async function sendWhatsAppMessage(params: SendMessageParams): Promise<void> {
  const phoneId = process.env.META_WHATSAPP_PHONE_ID;
  const token = process.env.META_WHATSAPP_TOKEN;
  if (!phoneId || !token) throw new Error('WhatsApp env vars not configured');

  const body = params.type === 'text'
    ? {
        messaging_product: 'whatsapp',
        to: params.to,
        type: 'text',
        text: { body: params.text },
      }
    : {
        messaging_product: 'whatsapp',
        to: params.to,
        type: 'template',
        template: {
          name: params.templateName,
          language: { code: params.language ?? 'en' },
          components: params.templateParams?.length
            ? [{ type: 'body', parameters: params.templateParams.map(v => ({ type: 'text', text: v })) }]
            : [],
        },
      };

  const res = await fetch(`${WA_API_URL}/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WhatsApp API error: ${err}`);
  }
}

export async function sendBookingConfirmationWA(phone: string, data: {
  patientName: string;
  scanType: string;
  clinicName: string;
  appointmentDate: string;
  appointmentTime: string;
  reference: string;
  locale?: string;
}): Promise<void> {
  await sendWhatsAppMessage({
    to: phone,
    type: 'template',
    templateName: 'booking_confirmation_en',
    language: data.locale ?? 'en',
    templateParams: [
      data.patientName,
      data.scanType,
      data.clinicName,
      `${data.appointmentDate} at ${data.appointmentTime}`,
      data.reference,
    ],
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { detectIntent } from '@/lib/whatsapp/intent';
import { sendWhatsAppMessage } from '@/lib/whatsapp/client';
import db from '@/lib/db';

// Meta webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.META_WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// Incoming message handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (value?.messages?.[0]) {
      const msg = value.messages[0];
      const phone = msg.from;
      const text = msg.text?.body ?? '';
      const waPhoneId = value.metadata?.phone_number_id;

      // Log to DB
      await db`
        INSERT INTO whatsapp_conversations (wa_phone_id, patient_phone, last_message_at)
        VALUES (${waPhoneId}, ${phone}, now())
        ON CONFLICT (patient_phone) DO UPDATE SET last_message_at = now()
      `.catch(() => null);

      // Detect intent
      const intent = await detectIntent(text);

      // Route intent to reply
      let reply = intent.suggestedReply;

      if (intent.intent === 'book_scan') {
        reply += '\n\nBook now: https://thediagnostic.co.uk/book';
      } else if (intent.intent === 'ask_price') {
        reply += '\n\nView prices: https://thediagnostic.co.uk/scan';
      } else if (intent.intent === 'need_concierge') {
        reply += '\n\nConcierge: https://thediagnostic.co.uk/book/concierge';
      } else if (intent.intent === 'human_needed') {
        reply = intent.locale === 'tr'
          ? 'Sizi hemen bir uzmanımıza bağlıyoruz. Lütfen bekleyin.'
          : intent.locale === 'ar'
          ? 'سنقوم بتحويلك إلى أحد متخصصينا. يرجى الانتظار.'
          : "We're connecting you with a specialist right away. Please hold.";
      }

      // Send reply
      await sendWhatsAppMessage({ to: phone, type: 'text', text: reply });

      // Log message
      await db`
        INSERT INTO whatsapp_messages (conversation_id, direction, content, wa_message_id, sent_at)
        SELECT id, 'inbound', ${text}, ${msg.id}, now()
        FROM whatsapp_conversations WHERE patient_phone = ${phone}
        LIMIT 1
      `.catch(() => null);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('WhatsApp webhook error:', err);
    return NextResponse.json({ status: 'ok' }); // Always 200 to Meta
  }
}

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export type WhatsAppIntent =
  | 'book_scan'
  | 'check_status'
  | 'ask_price'
  | 'need_concierge'
  | 'report_query'
  | 'medical_question'
  | 'general'
  | 'human_needed';

export interface IntentResult {
  intent: WhatsAppIntent;
  locale: 'en' | 'tr' | 'ar';
  confidence: number;
  extractedData: {
    scanType?: string;
    bookingRef?: string;
    phone?: string;
  };
  suggestedReply: string;
}

export async function detectIntent(message: string): Promise<IntentResult> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are a WhatsApp chatbot for thediagnostic — a medical imaging booking platform.
Analyse this incoming WhatsApp message and determine the intent.

Message: "${message}"

Intents:
- book_scan: wants to book a scan
- check_status: asking about existing booking status
- ask_price: asking about scan prices
- need_concierge: asking about travel/hotel/transfer
- report_query: asking about scan results/report
- medical_question: clinical question (needs triage)
- general: general enquiry
- human_needed: angry, complex, emergency

Detect language (en/tr/ar).
Generate a helpful short reply in the detected language.

Respond with JSON:
{
  "intent": "one of the intents above",
  "locale": "en|tr|ar",
  "confidence": 0.0-1.0,
  "extractedData": { "scanType": "optional", "bookingRef": "optional" },
  "suggestedReply": "reply in detected language, max 3 sentences"
}`,
      }
    ]
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Intent detection failed');
  return JSON.parse(jsonMatch[0]) as IntentResult;
}

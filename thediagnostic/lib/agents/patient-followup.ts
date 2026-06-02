import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

export interface FollowUpData {
  patientName: string;
  patientEmail: string;
  scanType: string;
  clinicName: string;
  appointmentDate: string;
  bookingReference: string;
  reportReady?: boolean;
  reportUrl?: string;
  locale?: 'en' | 'tr' | 'ar';
}

export type FollowUpDay = 'pre_7d' | 'pre_1d' | 'post_1d' | 'post_7d' | 'post_30d';

const EMAIL_SUBJECTS: Record<FollowUpDay, Record<string, string>> = {
  pre_7d: {
    en: 'Your scan appointment is in 7 days — preparation guide',
    tr: 'Tarama randevunuz 7 gun sonra — hazirlik rehberi',
    ar: 'موعد الفحص بعد 7 أيام — دليل التحضير',
  },
  pre_1d: {
    en: 'Reminder: Your scan is tomorrow at [CLINIC]',
    tr: 'Hatirlatma: Yarin randevunuz var — [CLINIC]',
    ar: 'تذكير: موعد الفحص غداً في [CLINIC]',
  },
  post_1d: {
    en: 'How did your scan go? Your report will be ready soon',
    tr: 'Taramaniz nasil gecti? Raporunuz yakinida hazir olacak',
    ar: 'كيف كان فحصك؟ تقريرك سيكون جاهزاً قريباً',
  },
  post_7d: {
    en: 'Your thediagnostic report is ready — view now',
    tr: 'thediagnostic raporunuz hazir — hemen goruntuleyin',
    ar: 'تقريرك من thediagnostic جاهز — اعرضه الآن',
  },
  post_30d: {
    en: '30-day follow-up: How are you feeling after your scan?',
    tr: '30 gun sonrasi: Taramanizdan sonra kendinizi nasil hissediyorsunuz?',
    ar: 'المتابعة بعد 30 يوماً: كيف تشعر بعد الفحص؟',
  },
};

export async function sendFollowUpEmail(day: FollowUpDay, data: FollowUpData): Promise<void> {
  const locale = data.locale ?? 'en';

  const prompt = `Generate a warm, professional follow-up email for a medical imaging patient.

Day: ${day}
Patient: ${data.patientName}
Scan: ${data.scanType}
Clinic: ${data.clinicName}
Appointment: ${data.appointmentDate}
Reference: ${data.bookingReference}
Report ready: ${data.reportReady ?? false}
Report URL: ${data.reportUrl ?? 'not yet available'}
Language: ${locale === 'tr' ? 'Turkish' : locale === 'ar' ? 'Arabic' : 'English'}

Write a ${locale === 'ar' ? 'right-to-left Arabic' : locale === 'tr' ? 'Turkish' : 'English'} HTML email body (just the body content, no full HTML document).
Keep it warm, concise and medically appropriate. Include:
- Personalised greeting
- Context appropriate to the day (${day})
- thediagnostic contact: care@thediagnostic.co.uk
- WhatsApp: https://wa.me/447700000000
- If post_7d and report ready, include the report URL
Format: valid HTML with inline styles, mobile-friendly`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  });

  const emailHtml = response.content[0].type === 'text' ? response.content[0].text : '';
  const subjectTemplate = EMAIL_SUBJECTS[day][locale] ?? EMAIL_SUBJECTS[day]['en'];
  const subject = subjectTemplate.replace('[CLINIC]', data.clinicName);

  await resend.emails.send({
    from: 'thediagnostic Care <care@thediagnostic.co.uk>',
    to: data.patientEmail,
    subject,
    html: `<!DOCTYPE html><html><body style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:20px">${emailHtml}</body></html>`,
  });
}

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface TriageResult {
  urgency: 'routine' | 'soon' | 'urgent';
  urgencyLabel: string;
  recommendedScans: {
    code: string;
    name: string;
    reason: string;
    priceFrom: number;
  }[];
  clinicalSummary: string;
  nhsWaitEstimate: string;
  thediagnosticWait: string;
  estimatedSavingPct: number;
  shouldSeeGPFirst: boolean;
  gpNote?: string;
  locale: 'en' | 'tr' | 'ar';
}

const SYSTEM_PROMPT = `You are a clinical triage assistant for thediagnostic, a medical imaging platform.
Your role is to help patients understand what type of advanced diagnostic scan they might need based on their symptoms.

IMPORTANT: You are NOT providing a medical diagnosis. You are recommending scan types for the patient to discuss with their doctor.

Available scan types at thediagnostic:
- pet_ct: PET-CT Scan (from £1,200) — cancer detection, metastasis, cardiac, neurological
- mri_3t: MRI 3T (from £320) — brain, spine, MSK, abdominal
- gamma_knife: GammaKnife (from £6,500) — brain tumours (needs prior confirmed diagnosis)
- spect_ct: SPECT-CT (from £650) — bone scans, thyroid, cardiac perfusion
- pet_mri: PET-MRI (from £1,850) — advanced oncology staging
- mri_whole_body: Whole Body MRI (from £950) — full screening, cancer staging
- ct_angio: CT Angiography (from £280) — vascular, coronary

Urgency levels:
- urgent: Symptoms suggesting possible cancer, stroke, acute cardiac — advise immediate GP/A&E first
- soon: Significant symptoms needing investigation within weeks — recommend booking scan soon
- routine: Health screening, monitoring, non-urgent investigation

Always respond in JSON format. Detect the language of the input and respond accordingly (en/tr/ar).`;

export async function runTriage(symptoms: string, locale = 'en'): Promise<TriageResult> {
  const localeInstruction = locale === 'tr'
    ? 'Respond entirely in Turkish.'
    : locale === 'ar'
    ? 'Respond entirely in Arabic.'
    : 'Respond in English.';

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Patient symptoms/query: "${symptoms}"\n\n${localeInstruction}\n\nRespond with a JSON object matching this exact schema:\n{\n  "urgency": "routine|soon|urgent",\n  "urgencyLabel": "string (localised label)",\n  "recommendedScans": [{ "code": "string", "name": "string", "reason": "string", "priceFrom": number }],\n  "clinicalSummary": "string (2-3 sentences, patient-friendly)",\n  "nhsWaitEstimate": "string e.g. 3-6 months",\n  "thediagnosticWait": "string e.g. 3-7 days",\n  "estimatedSavingPct": number,\n  "shouldSeeGPFirst": boolean,\n  "gpNote": "string (optional, if GP visit recommended)",\n  "locale": "en|tr|ar"\n}`,
      }
    ]
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Invalid triage response format');
  return JSON.parse(jsonMatch[0]) as TriageResult;
}

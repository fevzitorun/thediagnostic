import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface ReportSummaryResult {
  patientSummary: string;
  keyFindings: { finding: string; severity: 'normal' | 'mild' | 'moderate' | 'significant' }[];
  followUpNeeded: boolean;
  followUpUrgency: 'routine' | 'soon' | 'urgent';
  gpLetterDraft: string;
  technicalTermsExplained: { term: string; explanation: string }[];
}

const SYSTEM_PROMPT = `You are a medical report summarisation assistant for thediagnostic.
Your role is to:
1. Summarise radiology reports in plain, patient-friendly language
2. Extract key findings and their clinical significance
3. Draft a GP referral letter summarising the findings
4. Explain technical terms in simple language

IMPORTANT: Always include a disclaimer that findings should be discussed with a qualified physician.
Do not provide diagnoses — only summarise what the radiologist reported.`;

export async function summariseReport(reportText: string, scanType: string, patientName: string): Promise<ReportSummaryResult> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Scan type: ${scanType}\nPatient: ${patientName}\n\nRadiology report:\n${reportText}\n\nRespond with JSON matching:\n{\n  "patientSummary": "string",\n  "keyFindings": [{"finding": "string", "severity": "normal|mild|moderate|significant"}],\n  "followUpNeeded": boolean,\n  "followUpUrgency": "routine|soon|urgent",\n  "gpLetterDraft": "string",\n  "technicalTermsExplained": [{"term": "string", "explanation": "string"}]\n}`,
      }
    ]
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Invalid report summary format');
  return JSON.parse(jsonMatch[0]) as ReportSummaryResult;
}

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function summariseReport(
  reportText: string,
  scanType: string,
  patientName: string
): Promise<{ summary: string; keyFindings: string[]; recommendedActions: string[] }> {
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a medical report summarisation assistant. Summarise the following ${scanType} report for patient ${patientName} in plain English for the patient portal. Return JSON with keys: summary (string), keyFindings (string[]), recommendedActions (string[]).\n\nReport:\n${reportText}`,
      },
    ],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
  } catch {}

  return { summary: text, keyFindings: [], recommendedActions: [] }
}

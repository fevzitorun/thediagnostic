// POST /api/agents/triage
// Accepts patient symptoms and returns a recommended scan type via Claude.
// Public endpoint — used by the website chatbot / triage widget.

import { NextResponse } from 'next/server'
import { triageSymptoms } from '@/lib/agents/triage'
import type { TriageResult } from '@/lib/agents/types'

export const runtime = 'nodejs'

export async function POST(req: Request): Promise<NextResponse<TriageResult | { error: string }>> {
  let symptoms: string
  try {
    const body = await req.json()
    symptoms = String(body.symptoms ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!symptoms || symptoms.length < 10) {
    return NextResponse.json({ error: 'Please describe your symptoms in more detail.' }, { status: 400 })
  }

  if (symptoms.length > 2000) {
    return NextResponse.json({ error: 'Description too long. Please summarise in 2000 characters or fewer.' }, { status: 400 })
  }

  try {
    const result = await triageSymptoms(symptoms)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[Triage] Claude API error:', err)
    return NextResponse.json({ error: 'Triage service temporarily unavailable.' }, { status: 503 })
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { runTriage } from '@/lib/agents/triage';

export async function POST(req: NextRequest) {
  try {
    const { symptoms, locale } = await req.json();
    if (!symptoms || typeof symptoms !== 'string' || symptoms.length < 10) {
      return NextResponse.json({ error: 'Please describe your symptoms in more detail.' }, { status: 400 });
    }
    if (symptoms.length > 2000) {
      return NextResponse.json({ error: 'Description too long.' }, { status: 400 });
    }
    const result = await runTriage(symptoms, locale ?? 'en');
    return NextResponse.json(result);
  } catch (err) {
    console.error('Triage error:', err);
    return NextResponse.json({ error: 'Triage service temporarily unavailable.' }, { status: 500 });
  }
}

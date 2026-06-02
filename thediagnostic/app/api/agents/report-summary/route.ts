import { NextRequest, NextResponse } from 'next/server';
import { summariseReport } from '@/lib/agents/report-summary';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('x-agent-secret');
  if (authHeader !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { reportText, scanType, patientName } = await req.json();
    if (!reportText || !scanType || !patientName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const result = await summariseReport(reportText, scanType, patientName);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Report summary error:', err);
    return NextResponse.json({ error: 'Summary service unavailable' }, { status: 500 });
  }
}

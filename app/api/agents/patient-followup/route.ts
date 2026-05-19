// POST /api/agents/patient-followup
// Queries Supabase for bookings that need follow-up emails and dispatches them.
// Should be called by a cron job (e.g. Vercel Cron, daily at 9am).

import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { sendPatientFollowUp } from '@/lib/agents/patient-followup'
import type { PatientFollowUp, AgentRunResult } from '@/lib/agents/types'
import type { FollowUpStage } from '@/lib/agents/patient-followup'

export const runtime = 'nodejs'
export const maxDuration = 120

const STAGES: { stage: FollowUpStage; daysPostScan: number }[] = [
  { stage: 'day3',  daysPostScan: 3 },
  { stage: 'day7',  daysPostScan: 7 },
  { stage: 'day14', daysPostScan: 14 },
  { stage: 'day30', daysPostScan: 30 },
]

export async function POST(req: Request): Promise<NextResponse<AgentRunResult>> {
  if (!authorised(req)) {
    return NextResponse.json(
      { success: false, agentId: 'patient-followup', runId: '', processedCount: 0, errorCount: 0 },
      { status: 401 }
    )
  }

  const runId = `followup-${Date.now()}`
  let processedCount = 0
  let errorCount = 0


  for (const { stage, daysPostScan } of STAGES) {
    // Find bookings where appointment_date was exactly N days ago and
    // this follow-up stage hasn't been sent yet.
    const targetDate = daysAgo(daysPostScan)

    let bookings
    try {
      bookings = await sql`
        SELECT booking_ref, patient_email, patient_name, package_name, appointment_date, clinic_name
        FROM bookings
        WHERE status = 'confirmed'
          AND appointment_date = ${targetDate}
          AND patient_email IS NOT NULL
      `
    } catch (err) {
      console.error(`[PatientFollowUp] DB error stage=${stage}:`, err)
      errorCount++
      continue
    }

    for (const booking of bookings) {
      const followUp: PatientFollowUp = {
        bookingRef: booking.booking_ref,
        patientEmail: booking.patient_email,
        patientName: booking.patient_name ?? 'Patient',
        scanName: booking.package_name ?? 'scan',
        scanDate: booking.appointment_date,
        clinicName: booking.clinic_name ?? 'the clinic',
        daysPostScan,
      }

      const result = await sendPatientFollowUp(followUp, stage)
      if (result.success) {
        processedCount++
      } else {
        errorCount++
      }

      await delay(300)
    }
  }

  return NextResponse.json({
    success: true,
    agentId: 'patient-followup',
    runId,
    processedCount,
    errorCount,
  })
}

function authorised(req: Request): boolean {
  const secret = req.headers.get('x-agent-secret')
  return secret === process.env.AGENT_SECRET
}

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

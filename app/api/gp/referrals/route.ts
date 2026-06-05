// POST /api/gp/referrals
// GP: create a referral booking.

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'gp') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const {
    gpId, referralCode, patient_name, patient_email, patient_phone,
    patient_dob, nhs_number, scan_type, preferred_clinic_id,
    urgency, clinical_notes,
  } = body as Record<string, string>

  if (!patient_name || !patient_email) {
    return NextResponse.json({ error: 'Patient name and email are required' }, { status: 400 })
  }

  const bookingRef = 'GP-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  const gpNotes = `Urgency: ${urgency ?? 'Routine'}. ${clinical_notes ?? ''}`.trim()

  await sql`
    INSERT INTO bookings
      (booking_ref, gp_id, referral_code, patient_name, patient_email,
       patient_phone, patient_dob, nhs_number, package_name, clinic_id,
       status, gp_notes)
    VALUES
      (${bookingRef}, ${gpId}, ${referralCode ?? null}, ${patient_name},
       ${patient_email}, ${patient_phone ?? null}, ${patient_dob ?? null},
       ${nhs_number ?? null}, ${scan_type ?? null},
       ${preferred_clinic_id || null}, 'callback_requested', ${gpNotes})
  `

  return NextResponse.json({ success: true, bookingRef })
}

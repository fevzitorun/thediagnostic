// PATCH /api/clinic/reports
// Clinic: attach a report URL to a booking and mark it completed.

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'clinic') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const clinicId = session.user.clinicId
  const body = await req.json()
  const { bookingId, reportUrl } = body as { bookingId: string; reportUrl: string }

  if (!bookingId || !reportUrl) {
    return NextResponse.json({ error: 'bookingId and reportUrl are required' }, { status: 400 })
  }

  await sql`
    UPDATE bookings SET
      report_url = ${reportUrl},
      report_uploaded_at = NOW(),
      status = 'completed'
    WHERE id = ${bookingId} AND clinic_id = ${clinicId}
  `

  return NextResponse.json({ success: true })
}

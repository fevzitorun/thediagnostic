import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  const user = session?.user
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await sql`
    SELECT id, booking_ref, status, clinic_name, package_name, body_part,
           appointment_date, amount_paid, report_url, created_at
    FROM bookings
    WHERE patient_id = ${user.id}
    ORDER BY created_at DESC
    LIMIT 50
  `

  return NextResponse.json(rows)
}

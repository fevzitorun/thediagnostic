// POST /api/clinic/packages
// Clinic: add a new package.

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'clinic') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const clinicId = session.user.clinicId
  if (!clinicId) {
    return NextResponse.json({ error: 'No clinic associated' }, { status: 403 })
  }

  const body = await req.json()
  const { name, scan_type, price, duration_minutes, description, is_active } =
    body as Record<string, unknown>

  if (!name || !price) {
    return NextResponse.json({ error: 'Name and price are required' }, { status: 400 })
  }

  await sql`
    INSERT INTO packages (clinic_id, name, scan_type, price, duration_minutes, description, is_active)
    VALUES (
      ${clinicId}, ${name}, ${scan_type ?? 'MRI'},
      ${Number(price)}, ${duration_minutes ? Number(duration_minutes) : null},
      ${description || null}, ${is_active ?? true}
    )
  `

  return NextResponse.json({ success: true })
}

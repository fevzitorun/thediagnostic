// PATCH /api/clinic/packages/[id]  — update
// DELETE /api/clinic/packages/[id] — remove
// Both scoped to the logged-in clinic's own packages.

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'clinic') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const clinicId = session.user.clinicId
  const body = await req.json()
  const { name, scan_type, price, duration_minutes, description, is_active } =
    body as Record<string, unknown>

  await sql`
    UPDATE packages SET
      name = ${name},
      scan_type = ${scan_type ?? 'MRI'},
      price = ${Number(price)},
      duration_minutes = ${duration_minutes ? Number(duration_minutes) : null},
      description = ${description || null},
      is_active = ${is_active ?? true}
    WHERE id = ${id} AND clinic_id = ${clinicId}
  `

  return NextResponse.json({ success: true })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'clinic') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const clinicId = session.user.clinicId

  await sql`DELETE FROM packages WHERE id = ${id} AND clinic_id = ${clinicId}`

  return NextResponse.json({ success: true })
}

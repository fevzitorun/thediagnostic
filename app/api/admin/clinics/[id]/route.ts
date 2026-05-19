// PATCH /api/admin/clinics/[id]
// Admin: update clinic status and/or commission rate.

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const body = await req.json()
  const { status, commission_rate } = body as { status?: string; commission_rate?: number }

  const updates: string[] = []
  const values: unknown[] = []

  if (status !== undefined) {
    values.push(status)
    updates.push(`status = $${values.length}`)
  }
  if (commission_rate !== undefined) {
    values.push(commission_rate)
    updates.push(`commission_rate = $${values.length}`)
  }
  if (updates.length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
  }

  values.push(id)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (sql as any).unsafe(
    `UPDATE clinics SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${values.length}`,
    values
  )

  return NextResponse.json({ success: true })
}


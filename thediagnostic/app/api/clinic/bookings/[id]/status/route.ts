import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const allowedRoles = ['clinic_admin', 'clinic_staff', 'super_admin', 'admin']
  if (!allowedRoles.includes(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { status } = await request.json()
  const validStatuses = ['confirmed', 'completed', 'cancelled']
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  try {
    const clinicId = session.user.clinicId
    if (clinicId) {
      await sql`UPDATE bookings SET status = ${status}, updated_at = NOW() WHERE id = ${id} AND clinic_id = ${clinicId}`
    } else {
      await sql`UPDATE bookings SET status = ${status}, updated_at = NOW() WHERE id = ${id}`
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

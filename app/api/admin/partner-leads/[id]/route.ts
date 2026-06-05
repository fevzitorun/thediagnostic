import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await params
  const { status, internal_notes, next_follow_up } = await req.json()

  try {
    await sql`
      UPDATE partner_leads SET
        last_contact_at  = NOW(),
        status           = COALESCE(${status ?? null}, status),
        internal_notes   = COALESCE(${internal_notes ?? null}, internal_notes),
        next_follow_up   = COALESCE(${next_follow_up ?? null}::date, next_follow_up)
      WHERE id = ${id}
    `
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  const user = session?.user
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await sql`
    SELECT first_name, last_name, phone, nationality, passport_number, passport_expiry,
           preferred_currency, emergency_contact_name, emergency_contact_phone, medical_notes
    FROM profiles
    WHERE id = ${user.id}
    LIMIT 1
  `

  return NextResponse.json(rows[0] ?? {})
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  const user = session?.user
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json() as {
    first_name?: string; last_name?: string; phone?: string; nationality?: string;
    passport_number?: string; passport_expiry?: string; preferred_currency?: string;
    emergency_contact_name?: string; emergency_contact_phone?: string; medical_notes?: string;
  }

  await sql`
    UPDATE profiles SET
      first_name               = ${body.first_name ?? null},
      last_name                = ${body.last_name ?? null},
      phone                    = ${body.phone ?? null},
      nationality              = ${body.nationality ?? null},
      passport_number          = ${body.passport_number ?? null},
      passport_expiry          = ${body.passport_expiry || null},
      preferred_currency       = ${body.preferred_currency ?? 'GBP'},
      emergency_contact_name   = ${body.emergency_contact_name ?? null},
      emergency_contact_phone  = ${body.emergency_contact_phone ?? null},
      medical_notes            = ${body.medical_notes ?? null},
      updated_at               = NOW()
    WHERE id = ${user.id}
  `

  return NextResponse.json({ ok: true })
}

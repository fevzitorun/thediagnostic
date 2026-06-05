// PATCH /api/gp/settings
// GP: update own profile details.

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'gp') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { gpId, name, practice_name, practice_address, gmc_number, phone, email } =
    body as Record<string, string>

  if (!gpId) {
    return NextResponse.json({ error: 'gpId required' }, { status: 400 })
  }

  await sql`
    UPDATE gps SET
      name = ${name ?? null},
      practice_name = ${practice_name ?? null},
      practice_address = ${practice_address || null},
      gmc_number = ${gmc_number || null},
      phone = ${phone || null},
      email = ${email || null},
      updated_at = NOW()
    WHERE id = ${gpId}
  `

  return NextResponse.json({ success: true })
}

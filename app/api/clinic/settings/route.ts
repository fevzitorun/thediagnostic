// PATCH /api/clinic/settings
// Clinic: update own clinic details. clinicId from JWT token.

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'clinic') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const clinicId = session.user.clinicId ?? null
  if (!clinicId) {
    return NextResponse.json({ error: 'No clinic associated with this account' }, { status: 403 })
  }

  const body = await req.json()
  const { name, address, city, postcode, phone, email, website, description, capabilities } =
    body  as unknown as { name?: string; address?: string; city?: string; postcode?: string; phone?: string; email?: string; website?: string; description?: string; capabilities?: string[] }

  await sql`
    UPDATE clinics SET
      name = ${name ?? null},
      address = ${address ?? null},
      city = ${city ?? null},
      postcode = ${postcode ?? null},
      phone = ${phone || null},
      email = ${email || null},
      website = ${website || null},
      description = ${description || null},
      capabilities = ${JSON.stringify(capabilities ?? [])},
      updated_at = NOW()
    WHERE id = ${clinicId}
  `

  return NextResponse.json({ success: true })
}

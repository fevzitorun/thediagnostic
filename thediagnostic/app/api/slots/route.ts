// GET /api/slots?clinic=<slug>&scan=<code>&from=YYYY-MM-DD&to=YYYY-MM-DD
// Public endpoint — returns available slots for a clinic + scan type combo.
// Used by the booking page to show real availability.

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const clinic = searchParams.get('clinic');
  const scan   = searchParams.get('scan');
  const from   = searchParams.get('from') ?? new Date().toISOString().split('T')[0];
  const to     = searchParams.get('to')   ?? new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0];

  if (!clinic || !scan) {
    return NextResponse.json({ error: 'clinic and scan params required' }, { status: 400 });
  }

  const rows = await sql`
    SELECT s.id, s.slot_date, s.slot_time, s.duration_minutes,
           COALESCE(s.price_gbp, cst.price_gbp) AS price_gbp,
           COALESCE(s.price_eur, cst.price_eur) AS price_eur
    FROM scan_slots s
    JOIN clinics c ON c.id = s.clinic_id
    LEFT JOIN clinic_scan_types cst ON cst.clinic_id = s.clinic_id AND cst.scan_type_code = s.scan_type_code
    WHERE c.slug = ${clinic}
      AND s.scan_type_code = ${scan}
      AND s.slot_date BETWEEN ${from} AND ${to}
      AND s.status = 'available'
    ORDER BY s.slot_date, s.slot_time
    LIMIT 200
  `;

  return NextResponse.json(rows);
}

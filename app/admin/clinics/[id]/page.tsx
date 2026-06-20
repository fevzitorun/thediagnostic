import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'TR Clinic — Admin' }
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
  cancelled: { bg: '#fef2f2', color: '#991b1b' },
}

export default async function AdminClinicDetailPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const clinicRows = await sql`
    SELECT id, slug, name, short_name, city, address, phone, email, website,
           hospital_group, jci_accredited, iso_certified, commission_pct,
           is_active, is_featured, rating, review_count, partner_since
    FROM tr_clinics
    WHERE id = ${id}
    LIMIT 1
  `
  if (!clinicRows[0]) notFound()
  const clinic = clinicRows[0] as {
    id: string; slug: string; name: string; short_name: string | null; city: string;
    address: string | null; phone: string | null; email: string | null; website: string | null;
    hospital_group: string | null; jci_accredited: boolean; iso_certified: boolean;
    commission_pct: number; is_active: boolean; is_featured: boolean;
    rating: number | null; review_count: number; partner_since: string | null;
  }

  const commissionRate = Number(clinic.commission_pct ?? 15) / 100

  const [statsRows, recentRows, staffRows, scansRows] = await Promise.all([
    sql`
      SELECT
        COUNT(*) AS total_bookings,
        COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
        COALESCE(SUM(amount_paid) FILTER (WHERE status IN ('confirmed','completed')), 0) AS total_revenue
      FROM bookings WHERE tr_clinic_id = ${id}
    `,
    sql`
      SELECT id, booking_ref, patient_name, package_name, appointment_date, status, amount_paid
      FROM bookings WHERE tr_clinic_id = ${id}
      ORDER BY created_at DESC LIMIT 8
    `,
    sql`
      SELECT p.id, p.first_name, p.last_name, p.role, u.email
      FROM clinic_admins ca
      JOIN profiles p ON p.id = ca.user_id
      JOIN users u ON u.id = ca.user_id
      WHERE ca.clinic_id = ${id}
    `,
    sql`
      SELECT cst.scan_type_code, cst.price_gbp, cst.is_available, tst.name_en
      FROM clinic_scan_types cst
      JOIN tr_scan_types tst ON tst.code = cst.scan_type_code
      WHERE cst.clinic_id = ${id}
      ORDER BY tst.name_en
    `,
  ])

  const stats = statsRows[0] as { total_bookings: string; pending_count: string; total_revenue: string }
  const revenue = Number(stats.total_revenue)
  const platformEarnings = revenue * commissionRate
  const clinicEarnings = revenue * (1 - commissionRate)

  const recent = recentRows as { id: string; booking_ref: string; patient_name: string | null; package_name: string | null; appointment_date: string | null; status: string; amount_paid: number | null }[]
  const staff  = staffRows as { id: string; first_name: string | null; last_name: string | null; role: string | null; email: string }[]
  const scans  = scansRows as { scan_type_code: string; price_gbp: number | null; is_available: boolean; name_en: string }[]

  return (
    <>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/admin/clinics" style={{ fontSize: 13, color: '#aaa', textDecoration: 'none' }}>← Clinics</Link>
        <span style={{ color: '#ddd' }}>/</span>
        <span style={{ fontSize: 13, color: '#666' }}>{clinic.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header card */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{clinic.name}</div>
                <div style={{ fontSize: 14, color: '#888' }}>{clinic.city}{clinic.hospital_group ? ` · ${clinic.hospital_group}` : ''}</div>
                {clinic.address && <div style={{ fontSize: 13, color: '#aaa', marginTop: 2 }}>{clinic.address}</div>}
                {clinic.website && (
                  <a href={clinic.website} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#3AABDB', textDecoration: 'none', display: 'block', marginTop: 6 }}>
                    {clinic.website}
                  </a>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <span style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: clinic.is_active ? '#dcfce7' : '#fef2f2', color: clinic.is_active ? '#166534' : '#991b1b' }}>
                  {clinic.is_active ? 'Active' : 'Inactive'}
                </span>
                {clinic.jci_accredited && <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: '#eff6ff', color: '#1e40af' }}>JCI</span>}
                {clinic.iso_certified && <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: '#f0fdf4', color: '#15803d' }}>ISO</span>}
              </div>
            </div>
          </div>

          {/* Revenue cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Total revenue',  value: `£${Math.round(revenue).toLocaleString()}`,         color: '#17A589' },
              { label: 'Platform cut',   value: `£${Math.round(platformEarnings).toLocaleString()}`, color: '#3AABDB' },
              { label: 'Clinic earns',   value: `£${Math.round(clinicEarnings).toLocaleString()}`,   color: '#8b5cf6' },
            ].map((kpi, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{kpi.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>{kpi.value}</div>
                <div style={{ height: 3, background: kpi.color, borderRadius: 2, marginTop: 10 }} />
              </div>
            ))}
          </div>

          {/* Recent bookings */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>Recent bookings ({stats.total_bookings})</div>
              <Link href="/admin/bookings" style={{ fontSize: 12, color: '#3AABDB', textDecoration: 'none' }}>View all →</Link>
            </div>
            {recent.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No bookings</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#fafafa' }}>
                    {['Ref', 'Patient', 'Scan', 'Date', 'Amount', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recent.map((b, i) => {
                    const s = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending
                    return (
                      <tr key={b.id} style={{ borderBottom: i < recent.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                        <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
                          <Link href={`/admin/bookings/${b.id}`} style={{ color: '#3AABDB', textDecoration: 'none' }}>{b.booking_ref}</Link>
                        </td>
                        <td style={{ padding: '10px 14px', fontWeight: 500, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</td>
                        <td style={{ padding: '10px 14px', color: '#555', fontSize: 12 }}>{b.package_name ?? '—'}</td>
                        <td style={{ padding: '10px 14px', color: '#888', fontSize: 12 }}>{b.appointment_date ?? '—'}</td>
                        <td style={{ padding: '10px 14px', fontWeight: 600 }}>{b.amount_paid ? `£${Number(b.amount_paid).toLocaleString()}` : '—'}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Scan types */}
          {scans.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>Scan types ({scans.length})</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {scans.map(s => (
                  <div key={s.scan_type_code} style={{ padding: '6px 12px', background: s.is_available ? '#f0fdf4' : '#f5f5f5', borderRadius: 8, fontSize: 12 }}>
                    <span style={{ fontWeight: 600, color: s.is_available ? '#15803d' : '#aaa' }}>{s.name_en}</span>
                    {s.price_gbp && <span style={{ color: '#888', marginLeft: 6 }}>£{Number(s.price_gbp).toLocaleString()}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Staff / clinic admins */}
          {staff.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>Portal accounts</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {staff.map(s => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0f2fe', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: '#0369a1', flexShrink: 0 }}>
                      {(s.first_name ?? s.email ?? '?')[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--primary)' }}>{s.first_name} {s.last_name}</div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>{s.email} · {s.role ?? 'clinic_admin'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Details */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Clinic details</div>
            {[
              { label: 'Commission', value: `${clinic.commission_pct}%` },
              { label: 'Bookings', value: stats.total_bookings },
              { label: 'Pending', value: stats.pending_count },
              { label: 'Phone', value: clinic.phone },
              { label: 'Email', value: clinic.email },
              { label: 'Partner since', value: clinic.partner_since },
              { label: 'Rating', value: clinic.rating ? `★ ${Number(clinic.rating).toFixed(1)} (${clinic.review_count} reviews)` : null },
            ].filter(r => r.value).map((r, i, arr) => (
              <div key={r.label} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none', fontSize: 12 }}>
                <span style={{ color: '#aaa', width: 100, flexShrink: 0 }}>{r.label}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{r.value}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href={`/clinics/${clinic.slug}`} target="_blank"
                style={{ display: 'block', padding: '10px', border: '1.5px solid var(--line)', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'var(--primary)', textDecoration: 'none', textAlign: 'center' }}>
                View public page →
              </Link>
              <Link href={`/admin/bookings?clinic=${id}`}
                style={{ display: 'block', padding: '10px', border: '1.5px solid var(--line)', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'var(--primary)', textDecoration: 'none', textAlign: 'center' }}>
                Filter bookings for this clinic
              </Link>
              {clinic.email && (
                <a href={`mailto:${clinic.email}`}
                  style={{ display: 'block', padding: '10px', background: '#3AABDB', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                  Email clinic
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

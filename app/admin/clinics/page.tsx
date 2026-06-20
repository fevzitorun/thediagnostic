import Link from 'next/link'
import { sql } from '@/lib/db'

export const metadata = { title: 'TR Clinics — Admin' }
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ search?: string; group?: string }>
}

export default async function AdminClinicsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params.search ?? ''
  const groupFilter = params.group ?? ''
  const searchWild = `%${search}%`

  const [clinicRows, groupRows] = await Promise.all([
    sql`
      SELECT
        tc.id, tc.slug, tc.name, tc.short_name, tc.city, tc.hospital_group,
        tc.jci_accredited, tc.iso_certified, tc.is_active, tc.commission_pct,
        tc.rating, tc.beds, tc.created_at,
        COUNT(b.id)::int AS booking_count
      FROM tr_clinics tc
      LEFT JOIN bookings b ON b.tr_clinic_id = tc.id AND b.status IN ('confirmed','completed')
      WHERE 1=1
        ${search ? sql`AND (tc.name ILIKE ${searchWild} OR tc.hospital_group ILIKE ${searchWild} OR tc.city ILIKE ${searchWild})` : sql``}
        ${groupFilter ? sql`AND tc.hospital_group = ${groupFilter}` : sql``}
      GROUP BY tc.id
      ORDER BY tc.is_featured DESC, tc.name ASC
    `,
    sql`SELECT DISTINCT hospital_group FROM tr_clinics WHERE hospital_group IS NOT NULL ORDER BY hospital_group`,
  ])

  const clinics = clinicRows as unknown as { id: string; slug: string; name: string; short_name: string | null; city: string; hospital_group: string | null; jci_accredited: boolean; iso_certified: boolean; is_active: boolean; commission_pct: number; rating: number | null; beds: number | null; created_at: string; booking_count: number }[]
  const groups = groupRows.map(r => (r as unknown as { hospital_group: string }).hospital_group)

  return (
    <>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>TR Partner Clinics</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{clinics.length} Istanbul hospitals</p>
        </div>
        <Link href="/destinations/turkey/istanbul" target="_blank" style={{ padding: '9px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          View public page ↗
        </Link>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 18px', marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href="/admin/clinics" style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, textDecoration: 'none', background: !groupFilter ? 'var(--primary)' : '#f4f4f4', color: !groupFilter ? '#fff' : '#555' }}>
          All groups
        </Link>
        {groups.map(g => (
          <Link key={g} href={`/admin/clinics?group=${g}`} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, textDecoration: 'none', background: groupFilter === g ? 'var(--primary)' : '#f4f4f4', color: groupFilter === g ? '#fff' : '#555' }}>
            {g}
          </Link>
        ))}
        <form method="get" action="/admin/clinics" style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {groupFilter && <input type="hidden" name="group" value={groupFilter} />}
          <input name="search" defaultValue={search} placeholder="Search clinic or group…"
            style={{ padding: '7px 13px', border: '1.5px solid var(--line)', borderRadius: 8, fontSize: 13, outline: 'none', width: 220, fontFamily: 'inherit' }} />
          <button type="submit" style={{ padding: '7px 16px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
        </form>
      </div>

      {/* Clinic list */}
      {clinics.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>No clinics found</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {clinics.map(c => (
            <div key={c.id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 18 }}>
              {/* Avatar */}
              <div style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(135deg, #082A4A, #0B3565)', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>🏥</div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>{c.name}</span>
                  {c.jci_accredited && <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: '#EBF4FA', color: '#3AABDB' }}>JCI</span>}
                  {c.iso_certified && <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: '#D1F2EB', color: '#0E6655' }}>ISO</span>}
                  <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: c.is_active ? '#dcfce7' : '#f3f4f6', color: c.is_active ? '#166534' : '#6b7280' }}>
                    {c.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {c.hospital_group ? `${c.hospital_group} · ` : ''}{c.city}{c.beds ? ` · ${c.beds} beds` : ''}{c.rating ? ` · ★ ${c.rating}` : ''}
                </div>
              </div>
              {/* Stats */}
              <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>{c.booking_count}</div>
                  <div style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.8 }}>Bookings</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>{c.commission_pct ?? 15}%</div>
                  <div style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.8 }}>Commission</div>
                </div>
              </div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <Link href={`/clinics/${c.slug}`} target="_blank" style={{ padding: '7px 12px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12, color: '#555', textDecoration: 'none' }}>View page</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

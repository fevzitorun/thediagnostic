import Link from 'next/link'
import { sql } from '@/lib/db'

export const metadata = { title: 'Patients — Admin' }
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>
}

export default async function AdminPatientsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params.search ?? ''
  const page = Math.max(1, parseInt(params.page ?? '1'))
  const perPage = 25
  const offset = (page - 1) * perPage
  const searchWild = `%${search}%`

  const rows = await sql`
    SELECT
      p.id, p.first_name, p.last_name, p.phone, p.nationality, p.created_at,
      u.email,
      COUNT(b.id)::int AS booking_count,
      COUNT(*) OVER() AS total_count
    FROM profiles p
    JOIN users u ON u.id = p.id
    LEFT JOIN bookings b ON b.patient_id = p.id
    WHERE p.role = 'patient'
      ${search ? sql`AND (p.first_name ILIKE ${searchWild} OR p.last_name ILIKE ${searchWild} OR u.email ILIKE ${searchWild})` : sql``}
    GROUP BY p.id, u.email
    ORDER BY p.created_at DESC
    LIMIT ${perPage} OFFSET ${offset}
  `

  const patients = rows as unknown as { id: string; first_name: string | null; last_name: string | null; phone: string | null; nationality: string | null; created_at: string; email: string; booking_count: number; total_count: string }[]
  const total = Number(patients[0]?.total_count ?? 0)
  const totalPages = Math.ceil(total / perPage)

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Patients</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{total} registered</p>
        </div>
        <form method="get" action="/admin/patients" style={{ display: 'flex', gap: 8 }}>
          <input name="search" defaultValue={search} placeholder="Search name or email…"
            style={{ padding: '8px 14px', border: '1.5px solid var(--line)', borderRadius: 8, fontSize: 13, outline: 'none', width: 240, fontFamily: 'inherit' }} />
          <button type="submit" style={{ padding: '8px 16px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
        </form>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
        {patients.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>No patients found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Patient', 'Email', 'Phone', 'Nationality', 'Bookings', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < patients.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EBF4FA', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: '#3AABDB', flexShrink: 0 }}>
                        {((p.first_name ?? p.email ?? '?')[0]).toUpperCase()}
                      </div>
                      <div style={{ fontWeight: 500, color: 'var(--primary)' }}>{p.first_name} {p.last_name}</div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#555', fontSize: 12 }}>{p.email}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: 12 }}>{p.phone ?? '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: 12 }}>{p.nationality ?? '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', background: '#EBF4FA', color: '#3AABDB', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                      {p.booking_count ?? 0}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#aaa', fontSize: 12 }}>
                    {p.created_at ? new Date(p.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link href={`/admin/bookings?search=${p.email}`} style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, border: '1px solid var(--line)', borderRadius: 6, color: '#444', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      View bookings
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link key={p} href={`/admin/patients?page=${p}${search ? `&search=${search}` : ''}`}
              style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: p === page ? 'var(--primary)' : '#fff', color: p === page ? '#fff' : '#555', border: '1px solid var(--line)' }}>
              {p}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

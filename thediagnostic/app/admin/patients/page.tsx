// @ts-nocheck
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Patients — Admin' }

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>
}

export default async function AdminPatientsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params.search ?? ''
  const page = parseInt(params.page ?? '1')
  const perPage = 25
  const from = (page - 1) * perPage
  const to = from + perPage - 1

  const supabase = await createClient()

  let query = supabase
    .from('profiles')
    .select('id, first_name, last_name, email, phone, created_at', { count: 'exact' })
    .eq('role', 'patient')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search) query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`)

  const { data: patients, count } = await query
  const totalPages = Math.ceil((count ?? 0) / perPage)

  // Booking counts per patient
  const { data: bookingData } = await supabase
    .from('bookings')
    .select('patient_id')

  const bookingMap: Record<string, number> = {}
  for (const b of bookingData ?? []) {
    if (b.patient_id) bookingMap[b.patient_id] = (bookingMap[b.patient_id] ?? 0) + 1
  }

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Patients</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{count ?? 0} registered</p>
        </div>
        <form method="get" action="/admin/patients" style={{ display: 'flex', gap: 8 }}>
          <input
            name="search"
            defaultValue={search}
            placeholder="Search name or email…"
            style={{ padding: '8px 14px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 13, outline: 'none', width: 240, fontFamily: 'inherit' }}
          />
          <button type="submit" style={{ padding: '8px 16px', background: '#111', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
        </form>
      </div>

      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
        {!patients || patients.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>No patients found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Patient', 'Email', 'Phone', 'Bookings', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < patients.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0f2fe', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: '#0369a1', flexShrink: 0 }}>
                        {(p.first_name ?? p.email ?? '?')[0].toUpperCase()}
                      </div>
                      <div style={{ fontWeight: 500, color: '#111' }}>
                        {p.first_name} {p.last_name}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#555', fontSize: 12 }}>{p.email}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: 12 }}>{p.phone ?? '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', background: '#f0f9ff', color: '#0369a1', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                      {bookingMap[p.id] ?? 0}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#aaa', fontSize: 12 }}>
                    {p.created_at ? new Date(p.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link
                      href={`/admin/bookings?patient=${p.id}`}
                      style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, border: '1px solid #e8e8e8', borderRadius: 6, color: '#444', textDecoration: 'none', whiteSpace: 'nowrap' }}
                    >
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
            <Link
              key={p}
              href={`/admin/patients?page=${p}${search ? `&search=${search}` : ''}`}
              style={{
                width: 34, height: 34, display: 'grid', placeItems: 'center',
                borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none',
                background: p === page ? '#111' : '#fff',
                color: p === page ? '#fff' : '#555',
                border: '1px solid #ebebeb',
              }}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

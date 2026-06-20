import Link from 'next/link'
import { sql } from '@/lib/db'

export const metadata = { title: 'Bookings — Admin' }
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>
}

const STATUS_OPTIONS = [
  { value: '', label: 'All bookings' },
  { value: 'pending',   label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
  cancelled: { bg: '#fef2f2', color: '#991b1b' },
}

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const statusFilter = params.status ?? ''
  const search = params.search ?? ''
  const page = Math.max(1, parseInt(params.page ?? '1'))
  const perPage = 20
  const offset = (page - 1) * perPage

  const searchWild = `%${search}%`

  const rows = await sql`
    SELECT
      b.id, b.booking_ref, b.patient_name, u.email AS patient_email, b.clinic_name,
      b.package_name, b.body_part, b.appointment_date, b.status, b.amount_paid, b.created_at,
      COUNT(*) OVER() AS total_count
    FROM bookings b
    LEFT JOIN users u ON u.id = b.patient_id
    WHERE 1=1
      ${statusFilter ? sql`AND b.status = ${statusFilter}` : sql``}
      ${search ? sql`AND (b.patient_name ILIKE ${searchWild} OR b.booking_ref ILIKE ${searchWild} OR b.clinic_name ILIKE ${searchWild} OR u.email ILIKE ${searchWild})` : sql``}
    ORDER BY b.created_at DESC
    LIMIT ${perPage} OFFSET ${offset}
  `

  const bookings = rows as (typeof rows[0] & { total_count: string })[]
  const total = Number(bookings[0]?.total_count ?? 0)
  const totalPages = Math.ceil(total / perPage)

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Bookings</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{total} total{statusFilter ? ` · ${statusFilter}` : ''}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 18px', marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {STATUS_OPTIONS.map(opt => (
          <Link key={opt.value} href={`/admin/bookings${opt.value ? `?status=${opt.value}` : ''}`} style={{
            padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, textDecoration: 'none',
            background: statusFilter === opt.value ? 'var(--primary)' : '#f4f4f4',
            color: statusFilter === opt.value ? '#fff' : '#555',
          }}>
            {opt.label}
          </Link>
        ))}
        <form style={{ marginLeft: 'auto', display: 'flex', gap: 8 }} method="get" action="/admin/bookings">
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <input name="search" defaultValue={search} placeholder="Search patient, ref, clinic…"
            style={{ padding: '7px 13px', border: '1.5px solid var(--line)', borderRadius: 8, fontSize: 13, outline: 'none', width: 240, fontFamily: 'inherit' }} />
          <button type="submit" style={{ padding: '7px 16px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
        </form>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
        {bookings.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>No bookings found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Ref', 'Patient', 'Clinic', 'Scan', 'Date', 'Amount', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => {
                const s = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending
                return (
                  <tr key={b.id} style={{ borderBottom: i < bookings.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 11, color: '#888' }}>{b.booking_ref}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 500, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</div>
                      {b.patient_email && <div style={{ fontSize: 11, color: '#bbb', marginTop: 1 }}>{b.patient_email}</div>}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#555', fontSize: 12 }}>{b.clinic_name ?? '—'}</td>
                    <td style={{ padding: '12px 14px', color: '#555', fontSize: 12 }}>
                      <div>{b.package_name ?? '—'}</div>
                      {b.body_part && <div style={{ fontSize: 11, color: '#bbb' }}>{b.body_part}</div>}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#888', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {b.appointment_date ?? (b.created_at ? new Date(b.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '—')}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--primary)' }}>{b.amount_paid ? `£${Number(b.amount_paid).toLocaleString()}` : '—'}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <Link href={`/admin/bookings/${b.id}`} style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, border: '1px solid var(--line)', borderRadius: 6, color: '#444', textDecoration: 'none' }}>
                        View
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link key={p}
              href={`/admin/bookings?page=${p}${statusFilter ? `&status=${statusFilter}` : ''}${search ? `&search=${search}` : ''}`}
              style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: p === page ? 'var(--primary)' : '#fff', color: p === page ? '#fff' : '#555', border: '1px solid var(--line)' }}>
              {p}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

// @ts-nocheck
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Bookings — Admin' }

interface PageProps {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>
}

const STATUS_OPTIONS = [
  { value: '', label: 'All bookings' },
  { value: 'pending', label: 'Pending review' },
  { value: 'callback_requested', label: 'Callback requested' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:            { bg: '#fef9c3', color: '#854d0e' },
  confirmed:          { bg: '#dcfce7', color: '#166534' },
  completed:          { bg: '#e0f2fe', color: '#0369a1' },
  cancelled:          { bg: '#fef2f2', color: '#991b1b' },
  callback_requested: { bg: '#f3e8ff', color: '#6b21a8' },
}

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const statusFilter = params.status ?? ''
  const search = params.search ?? ''
  const page = parseInt(params.page ?? '1')
  const perPage = 20
  const from = (page - 1) * perPage
  const to = from + perPage - 1

  const supabase = await createClient()

  let query = supabase
    .from('bookings')
    .select('id, booking_ref, patient_name, patient_email, patient_phone, clinic_name, package_name, body_part, appointment_date, status, amount_paid, created_at, add_consultation', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (statusFilter) query = query.eq('status', statusFilter)
  if (search) query = query.or(`patient_name.ilike.%${search}%,booking_ref.ilike.%${search}%,clinic_name.ilike.%${search}%`)

  const { data: bookings, count } = await query
  const totalPages = Math.ceil((count ?? 0) / perPage)

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Bookings</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{count ?? 0} total{statusFilter ? ` · filtered by ${statusFilter.replace('_', ' ')}` : ''}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '16px 18px', marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {STATUS_OPTIONS.map(opt => (
          <Link
            key={opt.value}
            href={`/admin/bookings${opt.value ? `?status=${opt.value}` : ''}`}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              textDecoration: 'none',
              background: statusFilter === opt.value ? '#111' : '#f4f4f4',
              color: statusFilter === opt.value ? '#fff' : '#555',
              transition: 'all .15s',
            }}
          >
            {opt.label}
          </Link>
        ))}

        <form style={{ marginLeft: 'auto', display: 'flex', gap: 8 }} method="get" action="/admin/bookings">
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <input
            name="search"
            defaultValue={search}
            placeholder="Search patient, ref, clinic…"
            style={{ padding: '7px 13px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 13, outline: 'none', width: 240, fontFamily: 'inherit' }}
          />
          <button type="submit" style={{ padding: '7px 16px', background: '#111', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
        </form>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
        {!bookings || bookings.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>No bookings found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Ref', 'Patient', 'Clinic', 'Scan', 'Date', 'Amount', 'Status', 'Actions'].map(h => (
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
                      <div style={{ fontWeight: 500, color: '#111' }}>{b.patient_name ?? '—'}</div>
                      <div style={{ fontSize: 11, color: '#bbb', marginTop: 1 }}>{b.patient_email}</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#555', fontSize: 12 }}>{b.clinic_name ?? '—'}</td>
                    <td style={{ padding: '12px 14px', color: '#555', fontSize: 12 }}>
                      <div>{b.package_name ?? '—'}</div>
                      {b.body_part && <div style={{ fontSize: 11, color: '#bbb' }}>{b.body_part}</div>}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#888', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {b.appointment_date ?? (b.created_at ? new Date(b.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '—')}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: '#111' }}>{b.amount_paid ? `£${b.amount_paid}` : '—'}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
                        {b.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, border: '1px solid #e8e8e8', borderRadius: 6, color: '#444', textDecoration: 'none', whiteSpace: 'nowrap' }}
                        >
                          View
                        </Link>
                        {b.status === 'callback_requested' && (
                          <a
                            href={`tel:${b.patient_phone}`}
                            style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: '#7c3aed', color: '#fff', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap' }}
                          >
                            📞 Call
                          </a>
                        )}
                        {b.status === 'pending' && (
                          <Link
                            href={`/admin/bookings/${b.id}?action=review`}
                            style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: '#854d0e', color: '#fff', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap' }}
                          >
                            Review
                          </Link>
                        )}
                      </div>
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
            <Link
              key={p}
              href={`/admin/bookings?page=${p}${statusFilter ? `&status=${statusFilter}` : ''}${search ? `&search=${search}` : ''}`}
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

// @ts-nocheck
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Clinics — Admin' }

interface PageProps {
  searchParams: Promise<{ search?: string; status?: string }>
}

export default async function AdminClinicsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params.search ?? ''
  const statusFilter = params.status ?? ''

  const supabase = await createClient()

  let query = supabase
    .from('clinics')
    .select('id, name, city, address, postcode, status, commission_rate, stripe_account_id, created_at, cqc_rating')
    .order('created_at', { ascending: false })

  if (search) query = query.ilike('name', `%${search}%`)
  if (statusFilter) query = query.eq('status', statusFilter)

  const { data: clinics } = await query

  // Booking counts per clinic
  const { data: bookingCounts } = await supabase
    .from('bookings')
    .select('clinic_slug')
    .in('status', ['confirmed', 'completed'])

  const countMap: Record<string, number> = {}
  for (const b of bookingCounts ?? []) {
    if (b.clinic_slug) countMap[b.clinic_slug] = (countMap[b.clinic_slug] ?? 0) + 1
  }

  const statusStyle: Record<string, { bg: string; color: string }> = {
    active:   { bg: '#dcfce7', color: '#166534' },
    pending:  { bg: '#fef9c3', color: '#854d0e' },
    inactive: { bg: '#f3f4f6', color: '#6b7280' },
    suspended:{ bg: '#fef2f2', color: '#991b1b' },
  }

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Clinics</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{clinics?.length ?? 0} on platform</p>
        </div>
        <Link
          href="/admin/clinics/new"
          style={{ padding: '10px 20px', background: '#111', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
        >
          + Add clinic
        </Link>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {['', 'active', 'pending', 'inactive', 'suspended'].map(s => (
          <Link
            key={s}
            href={`/admin/clinics${s ? `?status=${s}` : ''}`}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              textDecoration: 'none',
              background: statusFilter === s ? '#111' : '#f4f4f4',
              color: statusFilter === s ? '#fff' : '#555',
            }}
          >
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
          </Link>
        ))}

        <form method="get" action="/admin/clinics" style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <input
            name="search"
            defaultValue={search}
            placeholder="Search clinic name…"
            style={{ padding: '7px 13px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 13, outline: 'none', width: 220, fontFamily: 'inherit' }}
          />
          <button type="submit" style={{ padding: '7px 16px', background: '#111', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
        </form>
      </div>

      {/* Clinic cards */}
      {!clinics || clinics.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed #ddd', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          No clinics found
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {clinics.map(clinic => {
            const s = statusStyle[clinic.status ?? 'pending'] ?? statusStyle.pending
            const bookings = countMap[clinic.id] ?? 0
            const hasStripe = !!clinic.stripe_account_id

            return (
              <div key={clinic.id} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Clinic avatar */}
                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(135deg, #0F4C81, #082A4A)', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>
                  🏥
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{clinic.name}</span>
                    <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color }}>
                      {clinic.status ?? 'pending'}
                    </span>
                    {!hasStripe && (
                      <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: '#fef9c3', color: '#854d0e' }}>
                        No Stripe
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>{clinic.address}, {clinic.city} {clinic.postcode}</div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 28, flexShrink: 0 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>{bookings}</div>
                    <div style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.8 }}>Bookings</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>{clinic.commission_rate ? `${Math.round(clinic.commission_rate * 100)}%` : '12%'}</div>
                    <div style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.8 }}>Commission</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <Link
                    href={`/clinics/${clinic.id}`}
                    style={{ padding: '7px 12px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 12, color: '#555', textDecoration: 'none' }}
                  >
                    View page
                  </Link>
                  <Link
                    href={`/admin/clinics/${clinic.id}`}
                    style={{ padding: '7px 14px', background: '#111', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
                  >
                    Manage
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

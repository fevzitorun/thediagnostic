// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = { title: 'Referrals — GP Portal' }

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:            { bg: '#fef9c3', color: '#854d0e' },
  confirmed:          { bg: '#dcfce7', color: '#166534' },
  completed:          { bg: '#e0f2fe', color: '#0369a1' },
  cancelled:          { bg: '#fef2f2', color: '#991b1b' },
  callback_requested: { bg: '#f3e8ff', color: '#6b21a8' },
}

export default async function GPReferralsPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: gp } = await supabase
    .from('gps')
    .select('id, commission_rate')
    .eq('user_id', user.id)
    .single()

  if (!gp) redirect('/gp/dashboard')

  const params = await searchParams
  const statusFilter = params.status ?? ''

  let query = supabase
    .from('bookings')
    .select('id, booking_ref, patient_name, clinic_name, package_name, appointment_date, status, amount_paid, created_at')
    .eq('gp_id', gp.id)
    .order('created_at', { ascending: false })

  if (statusFilter) query = query.eq('status', statusFilter)

  const { data: bookings } = await query

  const STATUS_OPTIONS = [
    { value: '', label: 'All' },
    { value: 'callback_requested', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const totalCommission = (bookings ?? [])
    .filter(b => b.status === 'completed')
    .reduce((s, b) => s + (b.amount_paid ?? 0) * (gp.commission_rate ?? 0.05), 0)

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Referrals</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{bookings?.length ?? 0} referrals · £{totalCommission.toFixed(2)} earned</p>
        </div>
        <Link
          href="/gp/refer"
          style={{ padding: '10px 20px', background: '#1a3a2a', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
        >
          + New referral
        </Link>
      </div>

      {/* Status tabs */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {STATUS_OPTIONS.map(opt => (
          <Link
            key={opt.value}
            href={opt.value ? `/gp/referrals?status=${opt.value}` : '/gp/referrals'}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              textDecoration: 'none',
              background: statusFilter === opt.value ? '#1a3a2a' : '#f4f4f4',
              color: statusFilter === opt.value ? '#fff' : '#555',
            }}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {!bookings || bookings.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed #ddd', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          No referrals yet
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Patient', 'Clinic', 'Scan', 'Date', 'Amount', 'Commission', 'Status'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => {
                const s = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending
                const commission = b.status === 'completed'
                  ? `£${((b.amount_paid ?? 0) * (gp.commission_rate ?? 0.05)).toFixed(2)}`
                  : '—'
                return (
                  <tr key={b.id} style={{ borderBottom: i < bookings.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#111' }}>{b.patient_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555', fontSize: 12 }}>{b.clinic_name ?? 'TBC'}</td>
                    <td style={{ padding: '12px 16px', color: '#555', fontSize: 12 }}>{b.package_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#888', fontSize: 12 }}>{b.appointment_date ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{b.amount_paid ? `£${b.amount_paid}` : '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: b.status === 'completed' ? '#166534' : '#aaa' }}>
                      {commission}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {b.status?.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Referrals — GP Portal' }
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ status?: string }>
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
  cancelled: { bg: '#fef2f2', color: '#991b1b' },
}

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pending',   label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default async function GPReferralsPage({ searchParams }: PageProps) {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  type GPRow = { id: string; commission_rate: number | null }
  let gp: GPRow | null = null
  try {
    const rows = await sql`SELECT id, commission_rate FROM gps WHERE user_id = ${user.id} LIMIT 1`
    gp = (rows[0] as GPRow) ?? null
  } catch { /* table may not exist */ }
  if (!gp) redirect('/gp/dashboard')

  const commissionRate = gp.commission_rate ?? 0.05
  const params = await searchParams
  const statusFilter = params.status ?? ''

  type BookingRow = { id: string; booking_ref: string; patient_name: string | null; clinic_name: string | null; package_name: string | null; appointment_date: string | null; status: string; amount_paid: number | null; created_at: string }
  let bookings: BookingRow[] = []
  try {
    bookings = await sql`
      SELECT id, booking_ref, patient_name, clinic_name, package_name, appointment_date, status, amount_paid, created_at
      FROM bookings
      WHERE gp_id = ${gp.id}
        ${statusFilter ? sql`AND status = ${statusFilter}` : sql``}
      ORDER BY created_at DESC
    ` as BookingRow[]
  } catch { /* gp_id column may not exist */ }

  const totalCommission = bookings
    .filter(b => b.status === 'completed')
    .reduce((s, b) => s + (Number(b.amount_paid ?? 0)) * commissionRate, 0)

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Referrals</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{bookings.length} referrals · £{totalCommission.toFixed(2)} earned</p>
        </div>
        <Link href="/gp/refer" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          + New referral
        </Link>
      </div>

      {/* Status tabs */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {STATUS_OPTIONS.map(opt => (
          <Link key={opt.value} href={opt.value ? `/gp/referrals?status=${opt.value}` : '/gp/referrals'}
            style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, textDecoration: 'none', background: statusFilter === opt.value ? 'var(--primary)' : '#f4f4f4', color: statusFilter === opt.value ? '#fff' : '#555' }}>
            {opt.label}
          </Link>
        ))}
      </div>

      {bookings.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          No referrals yet — <Link href="/gp/refer" style={{ color: '#3AABDB', textDecoration: 'none' }}>send your first referral →</Link>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
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
                const commission = b.status === 'completed' ? `£${(Number(b.amount_paid ?? 0) * commissionRate).toFixed(2)}` : '—'
                return (
                  <tr key={b.id} style={{ borderBottom: i < bookings.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555', fontSize: 12 }}>{b.clinic_name ?? 'Istanbul TR'}</td>
                    <td style={{ padding: '12px 16px', color: '#555', fontSize: 12 }}>{b.package_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#888', fontSize: 12 }}>{b.appointment_date ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--primary)' }}>{b.amount_paid ? `£${Number(b.amount_paid).toLocaleString()}` : '—'}</td>
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

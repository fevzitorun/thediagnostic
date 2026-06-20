import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Dashboard — Clinic Portal' }
export const dynamic = 'force-dynamic'

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
  cancelled: { bg: '#fef2f2', color: '#991b1b' },
}

export default async function ClinicDashboardPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  // Find which TR clinic this user manages
  const clinicRows = await sql`
    SELECT tc.id, tc.name, tc.short_name, tc.city, tc.commission_pct, tc.is_active,
           p.first_name
    FROM clinic_admins ca
    JOIN tr_clinics tc ON tc.id = ca.clinic_id
    LEFT JOIN profiles p ON p.id = ${user.id}
    WHERE ca.user_id = ${user.id}
    LIMIT 1
  `

  if (!clinicRows[0]) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 32px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🏥</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--primary)', marginBottom: 8 }}>No clinic linked</div>
        <div style={{ fontSize: 14 }}>Your account is not linked to a TR clinic. Contact thediagnostic support.</div>
      </div>
    )
  }

  const clinic = clinicRows[0] as { id: string; name: string; short_name: string | null; city: string; commission_pct: number; is_active: boolean; first_name: string | null }
  const todayStr = new Date().toISOString().split('T')[0]

  const [statsRows, recentRows] = await Promise.all([
    sql`
      SELECT
        COUNT(*) FILTER (WHERE status = 'pending')                                        AS pending_count,
        COUNT(*) FILTER (WHERE appointment_date = ${todayStr})                            AS today_count,
        COUNT(*) FILTER (WHERE status IN ('confirmed','completed'))                       AS confirmed_count,
        COALESCE(SUM(amount_paid * ${1 - (clinic.commission_pct ?? 15) / 100}) FILTER (WHERE status IN ('confirmed','completed')),0) AS clinic_earnings
      FROM bookings
      WHERE tr_clinic_id = ${clinic.id}
    `,
    sql`
      SELECT id, booking_ref, patient_name, package_name, body_part, appointment_date, status, amount_paid
      FROM bookings
      WHERE tr_clinic_id = ${clinic.id}
      ORDER BY created_at DESC
      LIMIT 8
    `,
  ])

  const stats = statsRows[0] as { pending_count: string; today_count: string; confirmed_count: string; clinic_earnings: string }
  const pendingCount  = Number(stats.pending_count)
  const todayCount    = Number(stats.today_count)
  const clinicEarnings = Number(stats.clinic_earnings)

  const recent = recentRows as { id: string; booking_ref: string; patient_name: string | null; package_name: string | null; body_part: string | null; appointment_date: string | null; status: string; amount_paid: number | null }[]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>
          {greeting}, {clinic.first_name ?? 'there'}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{clinic.name} · {clinic.city}</p>
      </div>

      {!clinic.is_active && (
        <div style={{ padding: '14px 18px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 12, marginBottom: 24, fontSize: 13, color: '#92400e', fontWeight: 500 }}>
          ⚠ Your clinic is currently inactive. Contact thediagnostic to go live.
        </div>
      )}

      {pendingCount > 0 && (
        <Link href="/clinic/appointments?status=pending" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 18px', background: '#fffbeb', border: '1px solid #fde68a',
          borderRadius: 12, textDecoration: 'none', marginBottom: 24,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e' }}>⏳ {pendingCount} booking{pendingCount !== 1 ? 's' : ''} awaiting review</div>
            <div style={{ fontSize: 12, color: '#a16207', marginTop: 2 }}>Confirm appointment times for incoming patients</div>
          </div>
          <span style={{ color: '#92400e', fontSize: 18 }}>→</span>
        </Link>
      )}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Your earnings',  value: `£${Math.round(clinicEarnings).toLocaleString('en-GB')}`, sub: `After ${clinic.commission_pct ?? 15}% platform fee`, accent: '#17A589' },
          { label: 'Today',          value: String(todayCount),    sub: 'Appointments today',  accent: '#3AABDB' },
          { label: 'Confirmed',      value: String(stats.confirmed_count), sub: 'Total confirmed', accent: '#8b5cf6' },
          { label: 'Pending review', value: String(pendingCount),  sub: 'Need confirmation',   accent: '#f59e0b' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Appointments', href: '/clinic/appointments', icon: '📅', color: '#3AABDB' },
          { label: 'Reports',      href: '/clinic/reports',      icon: '📄', color: '#17A589' },
          { label: 'Packages',     href: '/clinic/packages',     icon: '🔬', color: '#8b5cf6' },
          { label: 'Messages',     href: '/clinic/messages',     icon: '✉',  color: '#f59e0b' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ padding: '16px 18px', background: '#fff', border: '1px solid var(--line)', borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}18`, display: 'grid', placeItems: 'center', fontSize: 18 }}>{item.icon}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>Recent bookings</div>
          <Link href="/clinic/appointments" style={{ fontSize: 12, color: '#3AABDB', textDecoration: 'none' }}>View all →</Link>
        </div>
        {recent.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No bookings yet</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Ref', 'Patient', 'Scan', 'Date', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((b, i) => {
                const s = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending
                return (
                  <tr key={b.id} style={{ borderBottom: i < recent.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 11, color: '#888' }}>{b.booking_ref}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{b.package_name ?? '—'}{b.body_part ? ` · ${b.body_part}` : ''}</td>
                    <td style={{ padding: '12px 16px', color: '#888', fontSize: 12 }}>{b.appointment_date ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--primary)' }}>{b.amount_paid ? `£${Number(b.amount_paid).toLocaleString()}` : '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color }}>
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
    </>
  )
}

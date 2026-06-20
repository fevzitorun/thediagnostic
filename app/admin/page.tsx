import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Admin Dashboard — thediagnostic' }
export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
  cancelled: { bg: '#fef2f2', color: '#991b1b' },
}

export default async function AdminDashboard() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const [statsRows, recentRows] = await Promise.all([
    sql`
      SELECT
        COUNT(*)                                                                        AS total_bookings,
        COUNT(*) FILTER (WHERE status = 'pending')                                     AS pending_count,
        COALESCE(SUM(amount_paid) FILTER (WHERE status IN ('confirmed','completed')),0) AS total_revenue,
        (SELECT COUNT(*) FROM profiles WHERE role = 'patient')                         AS total_patients,
        (SELECT COUNT(*) FROM tr_clinics WHERE is_active = true)                       AS total_tr_clinics
      FROM bookings
    `,
    sql`
      SELECT id, booking_ref, patient_name, clinic_name, package_name, status, amount_paid, created_at
      FROM bookings
      ORDER BY created_at DESC
      LIMIT 10
    `,
  ])

  const stats = statsRows[0] as {
    total_bookings: string; pending_count: string; total_revenue: string;
    total_patients: string; total_tr_clinics: string;
  }
  const totalRevenue   = Number(stats.total_revenue) ?? 0
  const totalBookings  = Number(stats.total_bookings) ?? 0
  const pendingCount   = Number(stats.pending_count) ?? 0
  const totalPatients  = Number(stats.total_patients) ?? 0
  const totalTrClinics = Number(stats.total_tr_clinics) ?? 0

  const recentBookings = recentRows as { id: string; booking_ref: string; patient_name: string | null; clinic_name: string | null; package_name: string | null; status: string; amount_paid: number | null; created_at: string }[]

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Platform Overview</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>thediagnostic.co.uk — live data</p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue',    value: `£${totalRevenue.toLocaleString('en-GB')}`, sub: 'Confirmed + completed', accent: '#17A589' },
          { label: 'Total Bookings',   value: String(totalBookings),  sub: `${pendingCount} pending review`, accent: '#3AABDB' },
          { label: 'Patients',         value: String(totalPatients),  sub: 'Registered accounts', accent: '#8b5cf6' },
          { label: 'TR Partner Clinics', value: String(totalTrClinics), sub: 'Active in Istanbul', accent: '#f59e0b' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Pending alert */}
      {pendingCount > 0 && (
        <Link href="/admin/bookings?status=pending" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 18px', background: '#fffbeb', border: '1px solid #fde68a',
          borderRadius: 12, textDecoration: 'none', marginBottom: 24,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e' }}>⏳ {pendingCount} booking{pendingCount !== 1 ? 's' : ''} awaiting review</div>
            <div style={{ fontSize: 12, color: '#a16207', marginTop: 2 }}>Review and confirm or contact patient</div>
          </div>
          <span style={{ fontSize: 18, color: '#92400e' }}>→</span>
        </Link>
      )}

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'All Bookings',   href: '/admin/bookings',  icon: '📋', color: '#3AABDB' },
          { label: 'TR Clinics',     href: '/admin/clinics',   icon: '🏥', color: '#17A589' },
          { label: 'Patient CRM',    href: '/admin/patients',  icon: '👥', color: '#8b5cf6' },
          { label: 'Finance',        href: '/admin/finance',   icon: '£',  color: '#f59e0b' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            padding: '16px 18px', background: '#fff', border: '1px solid var(--line)',
            borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}18`, display: 'grid', placeItems: 'center', fontSize: 18 }}>{item.icon}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>Recent Bookings</div>
          <Link href="/admin/bookings" style={{ fontSize: 12, color: '#3AABDB', textDecoration: 'none' }}>View all →</Link>
        </div>
        {recentBookings.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No bookings yet</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Ref', 'Patient', 'Clinic', 'Scan', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b, i) => {
                const s = STATUS_COLORS[b.status] ?? STATUS_COLORS.pending
                return (
                  <tr key={b.id} style={{ borderBottom: i < recentBookings.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 11, color: '#888' }}>{b.booking_ref}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{b.clinic_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{b.package_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--primary)' }}>{b.amount_paid ? `£${Number(b.amount_paid).toLocaleString()}` : '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color }}>{b.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#888', fontSize: 12 }}>
                      {b.created_at ? new Date(b.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—'}
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

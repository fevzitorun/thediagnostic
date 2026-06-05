// @ts-nocheck
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Admin — ScanBook' }

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Parallel data fetch
  const [bookingsRes, clinicsRes, patientsRes, revenueRes, pendingRes, callbackRes] = await Promise.all([
    supabase.from('bookings').select('id, status, created_at', { count: 'exact' }).limit(0),
    supabase.from('clinics').select('id', { count: 'exact' }).limit(0),
    supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'patient').limit(0),
    supabase.from('bookings').select('amount_paid').in('status', ['confirmed', 'completed']),
    supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'pending').limit(0),
    supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'callback_requested').limit(0),
  ])

  const totalBookings  = bookingsRes.count ?? 0
  const totalClinics   = clinicsRes.count ?? 0
  const totalPatients  = patientsRes.count ?? 0
  const totalRevenue   = (revenueRes.data ?? []).reduce((s, b) => s + (b.amount_paid ?? 0), 0)
  const pendingCount   = pendingRes.count ?? 0
  const callbackCount  = callbackRes.count ?? 0

  // Recent bookings
  const { data: recentBookings } = await supabase
    .from('bookings')
    .select('id, booking_ref, patient_name, clinic_name, package_name, status, amount_paid, created_at')
    .order('created_at', { ascending: false })
    .limit(8)

  const statusColors: Record<string, { bg: string; color: string }> = {
    pending:            { bg: '#fef9c3', color: '#854d0e' },
    confirmed:          { bg: '#dcfce7', color: '#166534' },
    completed:          { bg: '#e0f2fe', color: '#0369a1' },
    cancelled:          { bg: '#fef2f2', color: '#991b1b' },
    callback_requested: { bg: '#f3e8ff', color: '#6b21a8' },
  }

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 4 }}>Platform Overview</h1>
        <p style={{ fontSize: 14, color: '#888' }}>ScanBook admin dashboard — real-time platform data</p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total revenue',   value: `£${totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, sub: 'Confirmed + completed', accent: '#00C9A7' },
          { label: 'Total bookings',  value: String(totalBookings),  sub: `${pendingCount} pending review`, accent: '#3b82f6' },
          { label: 'Patients',        value: String(totalPatients),  sub: 'Registered accounts', accent: '#8b5cf6' },
          { label: 'Active clinics',  value: String(totalClinics),   sub: 'On platform', accent: '#f59e0b' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Action needed banners */}
      {(pendingCount > 0 || callbackCount > 0) && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          {pendingCount > 0 && (
            <Link href="/admin/bookings?status=pending" style={{
              flex: 1, padding: '14px 18px',
              background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12,
              textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e' }}>⏳ {pendingCount} booking{pendingCount !== 1 ? 's' : ''} awaiting safety review</div>
                <div style={{ fontSize: 12, color: '#a16207', marginTop: 2 }}>Review and approve or contact patient</div>
              </div>
              <span style={{ fontSize: 18, color: '#92400e' }}>→</span>
            </Link>
          )}
          {callbackCount > 0 && (
            <Link href="/admin/bookings?status=callback_requested" style={{
              flex: 1, padding: '14px 18px',
              background: '#f3e8ff', border: '1px solid #d8b4fe', borderRadius: 12,
              textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#6b21a8' }}>📞 {callbackCount} callback{callbackCount !== 1 ? 's' : ''} requested</div>
                <div style={{ fontSize: 12, color: '#7c3aed', marginTop: 2 }}>Call within 1 hour (Mon–Fri 9–5)</div>
              </div>
              <span style={{ fontSize: 18, color: '#6b21a8' }}>→</span>
            </Link>
          )}
        </div>
      )}

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'All bookings',   href: '/admin/bookings',  icon: '📋', color: '#3b82f6' },
          { label: 'Manage clinics', href: '/admin/clinics',   icon: '🏥', color: '#10b981' },
          { label: 'Patient CRM',    href: '/admin/patients',  icon: '👥', color: '#8b5cf6' },
          { label: 'Finance',        href: '/admin/finance',   icon: '£',  color: '#f59e0b' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            padding: '16px 18px', background: '#fff', border: '1px solid #ebebeb',
            borderRadius: 12, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 12,
            transition: 'border-color .15s',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}18`, display: 'grid', placeItems: 'center', fontSize: 18 }}>{item.icon}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent bookings table */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Recent bookings</div>
          <Link href="/admin/bookings" style={{ fontSize: 12, color: '#00a888', textDecoration: 'none' }}>View all →</Link>
        </div>

        {!recentBookings || recentBookings.length === 0 ? (
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
              {(recentBookings ?? []).map((b, i) => {
                const s = statusColors[b.status] ?? statusColors.pending
                return (
                  <tr key={b.id} style={{ borderBottom: i < (recentBookings?.length ?? 0) - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{b.booking_ref}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#111' }}>{b.patient_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{b.clinic_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{b.package_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111' }}>{b.amount_paid ? `£${b.amount_paid}` : '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color }}>
                        {b.status?.replace('_', ' ')}
                      </span>
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

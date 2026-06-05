// @ts-nocheck
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Dashboard — Clinic' }

export default async function ClinicDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('clinic_id, first_name')
    .eq('id', user.id)
    .single()

  const clinicId = profile?.clinic_id
  if (!clinicId) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 32px', color: '#888' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🏥</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 8 }}>No clinic linked</div>
        <div style={{ fontSize: 14 }}>Your account is not linked to a clinic yet. Contact ScanBook support.</div>
      </div>
    )
  }

  const { data: clinic } = await supabase
    .from('clinics')
    .select('id, name, city, status, commission_rate, stripe_account_id')
    .eq('id', clinicId)
    .single()

  // Today's date range
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().split('T')[0]

  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - today.getDay())
  const weekStartStr = weekStart.toISOString().split('T')[0]

  const [allBookingsRes, todayRes, weekRes, pendingRes, recentRes] = await Promise.all([
    supabase.from('bookings').select('id, amount_paid, status', { count: 'exact' })
      .eq('clinic_id', clinicId)
      .in('status', ['confirmed', 'completed']),
    supabase.from('bookings').select('id', { count: 'exact' })
      .eq('clinic_id', clinicId)
      .eq('appointment_date', todayStr),
    supabase.from('bookings').select('id', { count: 'exact' })
      .eq('clinic_id', clinicId)
      .gte('appointment_date', weekStartStr)
      .in('status', ['confirmed', 'completed']),
    supabase.from('bookings').select('id', { count: 'exact' })
      .eq('clinic_id', clinicId)
      .eq('status', 'pending'),
    supabase.from('bookings')
      .select('id, booking_ref, patient_name, package_name, appointment_date, status, amount_paid')
      .eq('clinic_id', clinicId)
      .order('created_at', { ascending: false })
      .limit(6),
  ])

  const totalRevenue = (allBookingsRes.data ?? []).reduce((s, b) => s + (b.amount_paid ?? 0), 0)
  const commissionRate = clinic?.commission_rate ?? 0.12
  const clinicEarnings = totalRevenue * (1 - commissionRate)

  const statusStyle: Record<string, { bg: string; color: string }> = {
    pending:            { bg: '#fef9c3', color: '#854d0e' },
    confirmed:          { bg: '#dcfce7', color: '#166534' },
    completed:          { bg: '#e0f2fe', color: '#0369a1' },
    cancelled:          { bg: '#fef2f2', color: '#991b1b' },
    callback_requested: { bg: '#f3e8ff', color: '#6b21a8' },
  }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {profile?.first_name ?? 'there'} 👋
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>{clinic?.name} · {clinic?.city}</p>
      </div>

      {/* Status warning */}
      {clinic?.status !== 'active' && (
        <div style={{ padding: '14px 18px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 12, marginBottom: 24, fontSize: 13, color: '#92400e', fontWeight: 500 }}>
          ⚠️ Your clinic status is <strong>{clinic?.status}</strong>. Patients cannot book until your account is active.
        </div>
      )}

      {/* Pending review banner */}
      {(pendingRes.count ?? 0) > 0 && (
        <Link href="/clinic/appointments?status=pending" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 18px', background: '#fffbeb', border: '1px solid #fde68a',
          borderRadius: 12, textDecoration: 'none', marginBottom: 24,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e' }}>⏳ {pendingRes.count} booking{pendingRes.count !== 1 ? 's' : ''} awaiting your review</div>
            <div style={{ fontSize: 12, color: '#a16207', marginTop: 2 }}>Review and confirm appointment times</div>
          </div>
          <span style={{ color: '#92400e', fontSize: 18 }}>→</span>
        </Link>
      )}

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Your earnings',    value: `£${clinicEarnings.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, sub: `After ${Math.round(commissionRate * 100)}% platform fee`, accent: '#00C9A7' },
          { label: 'Today',            value: String(todayRes.count ?? 0),           sub: 'Appointments today',   accent: '#3b82f6' },
          { label: 'This week',        value: String(weekRes.count ?? 0),            sub: 'Confirmed this week',  accent: '#8b5cf6' },
          { label: 'Pending review',   value: String(pendingRes.count ?? 0),         sub: 'Need confirmation',    accent: '#f59e0b' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Appointments', href: '/clinic/appointments', icon: '📅', color: '#3b82f6' },
          { label: 'Upload report', href: '/clinic/reports',     icon: '📄', color: '#10b981' },
          { label: 'My packages',  href: '/clinic/packages',     icon: '🔬', color: '#8b5cf6' },
          { label: 'Messages',     href: '/clinic/messages',     icon: '✉',  color: '#f59e0b' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            padding: '16px 18px', background: '#fff', border: '1px solid #ebebeb',
            borderRadius: 12, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}18`, display: 'grid', placeItems: 'center', fontSize: 18 }}>{item.icon}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Recent bookings</div>
          <Link href="/clinic/appointments" style={{ fontSize: 12, color: '#00a888', textDecoration: 'none' }}>View all →</Link>
        </div>

        {!recentRes.data || recentRes.data.length === 0 ? (
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
              {recentRes.data.map((b, i) => {
                const s = statusStyle[b.status] ?? statusStyle.pending
                return (
                  <tr key={b.id} style={{ borderBottom: i < recentRes.data!.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{b.booking_ref}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#111' }}>{b.patient_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{b.package_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#888', fontSize: 12 }}>{b.appointment_date ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111' }}>{b.amount_paid ? `£${b.amount_paid}` : '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color }}>
                        {b.status?.replace('_', ' ')}
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

// @ts-nocheck
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Dashboard — GP Portal' }

export default async function GPDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: gp } = await supabase
    .from('gps')
    .select('id, name, practice_name, referral_code, commission_rate, status, total_earned, pending_payout')
    .eq('user_id', user.id)
    .single()

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name')
    .eq('id', user.id)
    .single()

  if (!gp) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 32px', color: '#888' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🩺</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 8 }}>GP account not set up</div>
        <div style={{ fontSize: 14 }}>Your account needs to be linked to a GP profile. Contact ScanBook support.</div>
      </div>
    )
  }

  // Referral stats
  const [referralsRes, thisMonthRes, recentRes] = await Promise.all([
    supabase.from('bookings').select('id', { count: 'exact' }).eq('gp_id', gp.id),
    supabase.from('bookings').select('id, amount_paid', { count: 'exact' })
      .eq('gp_id', gp.id)
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
      .in('status', ['confirmed', 'completed']),
    supabase.from('bookings')
      .select('id, booking_ref, patient_name, package_name, clinic_name, status, amount_paid, created_at')
      .eq('gp_id', gp.id)
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const totalReferrals = referralsRes.count ?? 0
  const thisMonthRevenue = (thisMonthRes.data ?? []).reduce((s, b) => s + (b.amount_paid ?? 0), 0)
  const thisMonthCommission = thisMonthRevenue * (gp.commission_rate ?? 0.05)
  const commissionRate = Math.round((gp.commission_rate ?? 0.05) * 100)

  const statusStyle: Record<string, { bg: string; color: string }> = {
    pending:   { bg: '#fef9c3', color: '#854d0e' },
    confirmed: { bg: '#dcfce7', color: '#166534' },
    completed: { bg: '#e0f2fe', color: '#0369a1' },
    cancelled: { bg: '#fef2f2', color: '#991b1b' },
    callback_requested: { bg: '#f3e8ff', color: '#6b21a8' },
  }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>
          Welcome back, Dr {profile?.first_name ?? gp.name} 👋
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>{gp.practice_name}</p>
      </div>

      {/* Referral code highlight */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a2a, #0f2b1c)', borderRadius: 16, padding: '24px 28px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Your referral code</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#00C9A7', letterSpacing: 4, fontFamily: 'monospace' }}>{gp.referral_code}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginTop: 6 }}>
            You earn <strong style={{ color: '#00C9A7' }}>{commissionRate}%</strong> commission on every completed scan
          </div>
        </div>
        <Link
          href="/gp/refer"
          style={{ padding: '12px 24px', background: '#00C9A7', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
        >
          Send referral →
        </Link>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total earned',      value: `£${(gp.total_earned ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, sub: 'All time commission', accent: '#00C9A7' },
          { label: 'Pending payout',    value: `£${(gp.pending_payout ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, sub: 'Next monthly payment', accent: '#8b5cf6' },
          { label: 'Total referrals',   value: String(totalReferrals), sub: 'Patients referred',   accent: '#3b82f6' },
          { label: 'This month',        value: `£${thisMonthCommission.toFixed(0)}`, sub: `${thisMonthRes.count ?? 0} bookings`, accent: '#f59e0b' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Recent referrals */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Recent referrals</div>
          <Link href="/gp/referrals" style={{ fontSize: 12, color: '#00a888', textDecoration: 'none' }}>View all →</Link>
        </div>
        {!recentRes.data || recentRes.data.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>
            No referrals yet — share your code to get started
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Patient', 'Clinic', 'Scan', 'Status', 'Commission', 'Date'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRes.data.map((b, i) => {
                const s = statusStyle[b.status] ?? statusStyle.pending
                const commission = b.status === 'completed' ? (b.amount_paid ?? 0) * (gp.commission_rate ?? 0.05) : null
                return (
                  <tr key={b.id} style={{ borderBottom: i < recentRes.data!.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#111' }}>{b.patient_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{b.clinic_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{b.package_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {b.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: commission ? '#166534' : '#aaa' }}>
                      {commission ? `£${commission.toFixed(2)}` : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#aaa', fontSize: 12 }}>
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

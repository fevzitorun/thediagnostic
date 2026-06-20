import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Dashboard — GP Portal' }
export const dynamic = 'force-dynamic'

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
  cancelled: { bg: '#fef2f2', color: '#991b1b' },
}

export default async function GPDashboardPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  // GP profile from gps table (may not exist in all deployments)
  type GPRow = { id: string; name: string | null; practice_name: string | null; referral_code: string | null; commission_rate: number | null; total_earned: number | null; pending_payout: number | null }
  let gp: GPRow | null = null
  try {
    const gpRows = await sql`SELECT id, name, practice_name, referral_code, commission_rate, total_earned, pending_payout FROM gps WHERE user_id = ${user.id} LIMIT 1`
    gp = (gpRows[0] as GPRow) ?? null
  } catch { /* table may not exist */ }

  const profileRows = await sql`SELECT first_name, last_name FROM profiles WHERE id = ${user.id} LIMIT 1`
  const profile = profileRows[0] as { first_name: string | null; last_name: string | null } | undefined

  if (!gp) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 32px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🩺</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--primary)', marginBottom: 8 }}>GP account not linked</div>
        <div style={{ fontSize: 14 }}>Contact thediagnostic to set up your GP referral account.</div>
        <a href="mailto:gp@thediagnostic.co.uk" style={{ display: 'inline-block', marginTop: 20, padding: '10px 22px', background: 'var(--primary)', color: '#fff', borderRadius: 9, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
          Contact us
        </a>
      </div>
    )
  }

  const commissionRate = gp.commission_rate ?? 0.05
  const commissionPct  = Math.round(commissionRate * 100)
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()

  type BookingRow = { id: string; booking_ref: string; patient_name: string | null; clinic_name: string | null; package_name: string | null; status: string; amount_paid: number | null; created_at: string }

  let totalReferrals = 0
  let thisMonthCount = 0
  let thisMonthCommission = 0
  let recent: BookingRow[] = []

  try {
    const [totalRows, monthRows, recentRows] = await Promise.all([
      sql`SELECT COUNT(*) AS cnt FROM bookings WHERE gp_id = ${gp.id}`,
      sql`SELECT COALESCE(SUM(amount_paid),0) AS revenue, COUNT(*) AS cnt FROM bookings WHERE gp_id = ${gp.id} AND status IN ('confirmed','completed') AND created_at >= ${monthStart}`,
      sql`SELECT id, booking_ref, patient_name, clinic_name, package_name, status, amount_paid, created_at FROM bookings WHERE gp_id = ${gp.id} ORDER BY created_at DESC LIMIT 5`,
    ])
    totalReferrals = Number((totalRows[0] as { cnt: string }).cnt)
    thisMonthCount = Number((monthRows[0] as { cnt: string }).cnt)
    thisMonthCommission = Number((monthRows[0] as { revenue: string }).revenue) * commissionRate
    recent = recentRows as BookingRow[]
  } catch { /* gp_id column may not exist */ }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const displayName = profile?.first_name ?? gp.name ?? 'Doctor'

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>
          {greeting}, Dr {displayName}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{gp.practice_name}</p>
      </div>

      {/* Referral code card */}
      <div style={{ background: 'linear-gradient(135deg, #082A4A, #0d3b63)', borderRadius: 16, padding: '24px 28px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>Your referral code</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#3AABDB', letterSpacing: 4, fontFamily: 'monospace' }}>{gp.referral_code ?? '—'}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', marginTop: 6 }}>
            You earn <strong style={{ color: '#3AABDB' }}>{commissionPct}%</strong> commission on every completed scan
          </div>
        </div>
        <Link href="/gp/refer" style={{ padding: '12px 24px', background: '#3AABDB', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
          Send referral →
        </Link>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total earned',    value: `£${Math.round(gp.total_earned ?? 0).toLocaleString('en-GB')}`, sub: 'All time commission', accent: '#17A589' },
          { label: 'Pending payout',  value: `£${Math.round(gp.pending_payout ?? 0).toLocaleString('en-GB')}`, sub: 'Next monthly payment', accent: '#8b5cf6' },
          { label: 'Total referrals', value: String(totalReferrals), sub: 'Patients referred',   accent: '#3AABDB' },
          { label: 'This month',      value: `£${thisMonthCommission.toFixed(0)}`, sub: `${thisMonthCount} bookings`, accent: '#f59e0b' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Recent referrals */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>Recent referrals</div>
          <Link href="/gp/referrals" style={{ fontSize: 12, color: '#3AABDB', textDecoration: 'none' }}>View all →</Link>
        </div>
        {recent.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No referrals yet — share your code to get started</div>
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
              {recent.map((b, i) => {
                const s = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending
                const commission = b.status === 'completed' ? (b.amount_paid ?? 0) * commissionRate : null
                return (
                  <tr key={b.id} style={{ borderBottom: i < recent.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#555', fontSize: 12 }}>{b.clinic_name ?? 'Istanbul TR'}</td>
                    <td style={{ padding: '12px 16px', color: '#555', fontSize: 12 }}>{b.package_name ?? '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {b.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: commission ? '#166534' : '#aaa' }}>
                      {commission ? `£${commission.toFixed(2)}` : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#aaa', fontSize: 12 }}>
                      {new Date(b.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
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

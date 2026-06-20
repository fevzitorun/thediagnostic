import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Earnings — GP Portal' }
export const dynamic = 'force-dynamic'

export default async function GPEarningsPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  type GPRow = { id: string; commission_rate: number | null; total_earned: number | null; pending_payout: number | null; bank_account_last4: string | null }
  let gp: GPRow | null = null
  try {
    const rows = await sql`SELECT id, commission_rate, total_earned, pending_payout, bank_account_last4 FROM gps WHERE user_id = ${user.id} LIMIT 1`
    gp = (rows[0] as unknown as GPRow) ?? null
  } catch { /* table may not exist */ }
  if (!gp) redirect('/gp/dashboard')

  const commissionRate = gp.commission_rate ?? 0.05

  type CompletedRow = { id: string; amount_paid: number | null; created_at: string }
  let completedBookings: CompletedRow[] = []
  try {
    const rows = await sql`
      SELECT id, amount_paid, created_at FROM bookings
      WHERE gp_id = ${gp.id} AND status = 'completed'
      ORDER BY created_at DESC
    `
    completedBookings = rows as unknown as CompletedRow[]
  } catch { /* gp_id col may not exist */ }

  type PayoutRow = { id: string; amount: number; period_start: string; period_end: string; status: string; paid_at: string | null; booking_count: number | null }
  let payouts: PayoutRow[] = []
  try {
    const rows = await sql`SELECT id, amount, period_start, period_end, status, paid_at, booking_count FROM gp_earnings WHERE gp_id = ${gp.id} ORDER BY period_start DESC`
    payouts = rows as unknown as PayoutRow[]
  } catch { /* table may not exist */ }

  // Monthly breakdown
  const monthly: Record<string, { revenue: number; commission: number; count: number }> = {}
  for (const b of completedBookings) {
    const month = b.created_at?.substring(0, 7) ?? 'unknown'
    if (!monthly[month]) monthly[month] = { revenue: 0, commission: 0, count: 0 }
    monthly[month].revenue += Number(b.amount_paid ?? 0)
    monthly[month].commission += Number(b.amount_paid ?? 0) * commissionRate
    monthly[month].count++
  }
  const sortedMonths = Object.keys(monthly).sort().reverse().slice(0, 6)

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Earnings</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Commission from referrals · {Math.round(commissionRate * 100)}% rate</p>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total earned',   value: `£${(gp.total_earned ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, sub: 'All time', accent: '#17A589' },
          { label: 'Pending payout', value: `£${(gp.pending_payout ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, sub: 'Next payment — 1st of month', accent: '#8b5cf6' },
          { label: 'Referrals done', value: String(completedBookings.length), sub: 'Completed scans', accent: '#3AABDB' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Bank account */}
      <div style={{ background: gp.bank_account_last4 ? '#f0fdf4' : '#fffbeb', border: `1px solid ${gp.bank_account_last4 ? '#bbf7d0' : '#fde68a'}`, borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: gp.bank_account_last4 ? '#166534' : '#92400e' }}>
          {gp.bank_account_last4 ? `✓ Bank account ending ****${gp.bank_account_last4}` : '⚠ No bank account set up'}
        </div>
        <div style={{ fontSize: 12, color: gp.bank_account_last4 ? '#4ade80' : '#a16207', marginTop: 2 }}>
          {gp.bank_account_last4 ? 'Payouts arrive on the 1st of each month via BACS' : 'Contact us at gp@thediagnostic.co.uk to add bank details'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Monthly breakdown */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>Monthly commissions</div>
          {sortedMonths.length === 0 ? (
            <div style={{ color: '#bbb', fontSize: 13 }}>No completed referrals yet</div>
          ) : (
            sortedMonths.map((month, i) => {
              const data = monthly[month]
              return (
                <div key={month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < sortedMonths.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--primary)' }}>
                      {new Date(month + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>{data.count} referrals</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#166534' }}>£{data.commission.toFixed(2)}</div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>£{data.revenue.toFixed(0)} GMV</div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Payout history */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>Payout history</div>
          {payouts.length === 0 ? (
            <div style={{ color: '#bbb', fontSize: 13 }}>No payouts yet</div>
          ) : (
            payouts.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < payouts.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--primary)' }}>
                    {new Date(p.period_start).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </div>
                  {p.booking_count && <div style={{ fontSize: 11, color: '#aaa' }}>{p.booking_count} scans</div>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: p.status === 'paid' ? '#166534' : '#854d0e' }}>
                    £{Number(p.amount).toFixed(2)}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase' as const, background: p.status === 'paid' ? '#dcfce7' : '#fef9c3', color: p.status === 'paid' ? '#166534' : '#854d0e' }}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

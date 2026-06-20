import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Settings — GP Portal' }
export const dynamic = 'force-dynamic'

export default async function GPSettingsPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  type GPRow = { id: string; name: string | null; practice_name: string | null; practice_address: string | null; gmc_number: string | null; phone: string | null; email: string | null; referral_code: string | null; commission_rate: number | null; bank_account_last4: string | null }
  let gp: GPRow | null = null
  try {
    const rows = await sql`SELECT id, name, practice_name, practice_address, gmc_number, phone, email, referral_code, commission_rate, bank_account_last4 FROM gps WHERE user_id = ${user.id} LIMIT 1`
    gp = (rows[0] as unknown as GPRow) ?? null
  } catch { /* table may not exist */ }
  if (!gp) redirect('/gp/dashboard')

  const profileRows = await sql`
    SELECT p.first_name, p.last_name, u.email AS user_email
    FROM profiles p LEFT JOIN users u ON u.id = p.id
    WHERE p.id = ${user.id} LIMIT 1
  `
  const profile = profileRows[0]  as unknown as { first_name: string | null; last_name: string | null; user_email: string | null } | undefined

  const infoRows = [
    { label: 'Full name',      value: gp.name },
    { label: 'Practice name',  value: gp.practice_name },
    { label: 'Practice address', value: gp.practice_address },
    { label: 'GMC number',     value: gp.gmc_number },
    { label: 'Phone',          value: gp.phone },
    { label: 'Contact email',  value: gp.email ?? profile?.user_email },
    { label: 'Referral code',  value: gp.referral_code },
    { label: 'Commission rate', value: gp.commission_rate ? `${Math.round(Number(gp.commission_rate) * 100)}%` : '5%' },
  ]

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Your GP profile and payout details</p>
      </div>

      <div style={{ padding: '14px 18px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, marginBottom: 24, fontSize: 13, color: '#92400e' }}>
        To update your GP details or bank account, email <strong>gp@thediagnostic.co.uk</strong> — changes are applied within one business day.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, alignItems: 'start' }}>
        {/* GP info */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>GP profile</div>
          {infoRows.filter(r => r.value).map((r, i, arr) => (
            <div key={r.label} style={{ display: 'flex', gap: 14, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none', fontSize: 13 }}>
              <span style={{ color: 'var(--text-muted)', width: 140, flexShrink: 0 }}>{r.label}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 500, wordBreak: 'break-word', fontFamily: r.label === 'Referral code' ? 'monospace' : 'inherit' }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Payout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: gp.bank_account_last4 ? '#f0fdf4' : '#fffbeb', border: `1px solid ${gp.bank_account_last4 ? '#bbf7d0' : '#fde68a'}`, borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Payout account</div>
            {gp.bank_account_last4 ? (
              <>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#166534', marginBottom: 4 }}>****{gp.bank_account_last4}</div>
                <div style={{ fontSize: 12, color: '#4ade80' }}>BACS — paid on the 1st of each month</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#92400e', marginBottom: 6 }}>No bank account linked</div>
                <div style={{ fontSize: 12, color: '#a16207', lineHeight: 1.5 }}>Contact us to add your bank details and start receiving payouts.</div>
                <a href="mailto:gp@thediagnostic.co.uk?subject=Bank account setup"
                  style={{ display: 'block', marginTop: 14, padding: '10px', background: 'var(--primary)', color: '#fff', borderRadius: 8, textAlign: 'center', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                  Set up payout
                </a>
              </>
            )}
          </div>

          {/* Account info */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Login account</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 4 }}>
              {profile?.first_name} {profile?.last_name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{profile?.user_email}</div>
          </div>

          {/* Support */}
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', marginBottom: 4 }}>GP support team</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 8 }}>Clinical queries, commission enquiries, or referral tracking.</div>
            <a href="mailto:gp@thediagnostic.co.uk" style={{ fontSize: 12, color: '#3AABDB', textDecoration: 'none', fontWeight: 600 }}>gp@thediagnostic.co.uk</a>
          </div>
        </div>
      </div>
    </>
  )
}

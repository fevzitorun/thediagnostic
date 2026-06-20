import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'
import { getFeaturedClinics } from '@/lib/tr-clinics.data'

export const metadata = { title: 'Refer a Patient — GP Portal' }
export const dynamic = 'force-dynamic'

export default async function GPReferPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  type GPRow = { id: string; name: string | null; referral_code: string | null; commission_rate: number | null }
  let gp: GPRow | null = null
  try {
    const rows = await sql`SELECT id, name, referral_code, commission_rate FROM gps WHERE user_id = ${user.id} LIMIT 1`
    gp = (rows[0] as GPRow) ?? null
  } catch { /* table may not exist */ }
  if (!gp) redirect('/gp/dashboard')

  const clinics = getFeaturedClinics().slice(0, 6)
  const commissionPct = Math.round((gp.commission_rate ?? 0.05) * 100)
  const bookingLink = `https://thediagnostic.co.uk/book?ref=${gp.referral_code ?? ''}`

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Refer a patient</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Share your referral link or guide a patient to book via thediagnostic.co.uk</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Main: partner clinics + referral info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Referral link copy box */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>Your referral link</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12, fontFamily: 'monospace', color: '#555', wordBreak: 'break-all' }}>
                {bookingLink}
              </div>
              <a href={`mailto:?subject=Book a scan in Istanbul - thediagnostic.co.uk&body=I recommend booking your scan via thediagnostic.co.uk. Use my referral link: ${bookingLink}`}
                style={{ padding: '10px 16px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Share via email
              </a>
            </div>
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 8 }}>Any booking made via this link is credited to your account automatically</div>
          </div>

          {/* How referrals work */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>How referrals work</div>
            {[
              { step: '1', text: 'Share your referral link with a patient by email, WhatsApp, or print' },
              { step: '2', text: 'Patient books online and pays securely — Istanbul clinics are JCI accredited' },
              { step: '3', text: 'Patient travels, scans are performed, radiology report delivered in English' },
              { step: `4`, text: `You earn ${commissionPct}% commission on every completed scan — paid monthly by BACS` },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', color: '#3AABDB', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: 13, color: '#555', paddingTop: 4, lineHeight: 1.5 }}>{item.text}</div>
              </div>
            ))}
          </div>

          {/* Partner clinics */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Partner clinics — Istanbul</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>All JCI accredited — patients get full English support</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {clinics.map(clinic => (
                <div key={clinic.slug} style={{ padding: '12px 14px', background: 'var(--bg-2)', borderRadius: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', marginBottom: 2 }}>{clinic.name}</div>
                  <div style={{ fontSize: 11, color: '#aaa' }}>{clinic.city}</div>
                  {clinic.jciAccredited && <span style={{ fontSize: 9, fontWeight: 700, color: '#1e40af', letterSpacing: 0.5 }}>JCI</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Your code */}
          <div style={{ background: 'linear-gradient(135deg, #082A4A, #0d3b63)', borderRadius: 14, padding: '22px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Your code</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: '#3AABDB', letterSpacing: 3, fontFamily: 'monospace' }}>{gp.referral_code ?? '—'}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 6 }}>
              {commissionPct}% commission per completed scan
            </div>
          </div>

          {/* Scan types we offer */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Scans we offer</div>
            {[
              { name: 'PET-CT', price: 'from £1,200' },
              { name: 'MRI 3T', price: 'from £280' },
              { name: 'Whole-Body MRI', price: 'from £680' },
              { name: 'CT scan', price: 'from £180' },
              { name: 'PET-MRI', price: 'from £1,600' },
              { name: 'Gamma Knife', price: 'POA' },
            ].map(s => (
              <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5', fontSize: 13 }}>
                <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{s.name}</span>
                <span style={{ color: '#17A589', fontWeight: 600 }}>{s.price}</span>
              </div>
            ))}
            <div style={{ fontSize: 11, color: '#bbb', marginTop: 10 }}>All-in prices including clinic fee, report, and patient support</div>
          </div>

          {/* Contact */}
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', marginBottom: 4 }}>GP support</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>Clinical queries or urgent referrals? Our medical team responds within 2 hours.</div>
            <a href="mailto:gp@thediagnostic.co.uk" style={{ fontSize: 12, color: '#3AABDB', textDecoration: 'none', fontWeight: 600 }}>gp@thediagnostic.co.uk</a>
          </div>
        </div>
      </div>
    </>
  )
}

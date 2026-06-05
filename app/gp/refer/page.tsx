// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ReferralForm from './ReferralForm'

export const metadata = { title: 'Refer Patient — GP Portal' }

export default async function GPReferPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: gp } = await supabase
    .from('gps')
    .select('id, name, referral_code, commission_rate')
    .eq('user_id', user.id)
    .single()

  if (!gp) redirect('/gp/dashboard')

  // Available clinics and scan types for referral
  const { data: clinics } = await supabase
    .from('clinics')
    .select('id, name, city, capabilities')
    .eq('status', 'active')
    .order('name')

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Refer a patient</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Create a referral or share your booking link with a patient</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <ReferralForm gpId={gp.id} referralCode={gp.referral_code} clinics={clinics ?? []} />

        {/* Info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>How referrals work</div>
            {[
              { step: '1', text: 'Fill in patient details and preferred scan' },
              { step: '2', text: 'Patient receives a booking link by email' },
              { step: '3', text: 'Patient books and pays online' },
              { step: '4', text: 'You earn commission when scan completes' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1a3a2a', color: '#00C9A7', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: 13, color: '#555', paddingTop: 3 }}>{item.text}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#166534', marginBottom: 8 }}>Your referral link</div>
            <div style={{ fontSize: 12, color: '#166534', wordBreak: 'break-all', fontFamily: 'monospace', background: '#dcfce7', padding: '8px 12px', borderRadius: 8 }}>
              scanbook.co.uk/book?ref={gp.referral_code}
            </div>
            <div style={{ fontSize: 11, color: '#4ade80', marginTop: 8 }}>
              Share this link directly — any booking via this URL is credited to you
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

type Profile = {
  first_name: string; last_name: string; phone: string; nationality: string;
  passport_number: string; passport_expiry: string; preferred_currency: string;
  emergency_contact_name: string; emergency_contact_phone: string; medical_notes: string;
}

const CURRENCIES = ['GBP', 'EUR', 'USD', 'TRY', 'AED']

const field: React.CSSProperties = {
  width: '100%', padding: '9px 13px', border: '1.5px solid var(--line)',
  borderRadius: 8, fontSize: 14, color: 'var(--text)', background: '#fafafa',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
}
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5,
}

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [form, setForm] = useState<Profile>({
    first_name: '', last_name: '', phone: '', nationality: '',
    passport_number: '', passport_expiry: '', preferred_currency: 'GBP',
    emergency_contact_name: '', emergency_contact_phone: '', medical_notes: '',
  })

  useEffect(() => {
    fetch('/api/patient/profile')
      .then(r => r.json())
      .then((d: Partial<Profile>) => { setForm(f => ({ ...f, ...d })); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true); setMsg(null)
    try {
      const res = await fetch('/api/patient/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? 'Could not save.')
      setMsg({ type: 'success', text: 'Profile saved.' })
      router.refresh()
    } catch (err) {
      setMsg({ type: 'error', text: err instanceof Error ? err.message : 'Error saving profile.' })
    } finally {
      setSaving(false)
    }
  }

  const set = (k: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  if (loading) return <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading profile…</div>

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#3AABDB', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Patient Portal</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary)', marginBottom: 4 }}>My Profile</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Keep your details up to date. Required for international travel and clinic pre-registration.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 680 }}>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px', marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 20 }}>Personal Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={lbl}>First name</label><input style={field} value={form.first_name} onChange={set('first_name')} required /></div>
            <div><label style={lbl}>Last name</label><input style={field} value={form.last_name} onChange={set('last_name')} /></div>
            <div><label style={lbl}>Phone</label><input style={field} type="tel" value={form.phone} onChange={set('phone')} /></div>
            <div>
              <label style={lbl}>Preferred currency</label>
              <select style={{ ...field }} value={form.preferred_currency} onChange={set('preferred_currency')}>
                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px', marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Travel &amp; Passport</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Required for international clinic pre-registration. Data encrypted and GDPR-compliant.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={lbl}>Nationality</label><input style={field} placeholder="e.g. GB" maxLength={5} value={form.nationality} onChange={set('nationality')} /></div>
            <div></div>
            <div><label style={lbl}>Passport number</label><input style={field} value={form.passport_number} onChange={set('passport_number')} /></div>
            <div><label style={lbl}>Passport expiry</label><input style={field} type="date" value={form.passport_expiry} onChange={set('passport_expiry')} /></div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px', marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Emergency Contact</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Required by the clinic before your procedure.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={lbl}>Full name</label><input style={field} value={form.emergency_contact_name} onChange={set('emergency_contact_name')} /></div>
            <div><label style={lbl}>Phone number</label><input style={field} type="tel" value={form.emergency_contact_phone} onChange={set('emergency_contact_phone')} /></div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Medical Notes</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Allergies, current medications, or anything the clinic should know. Optional.</p>
          <textarea style={{ ...field, minHeight: 100, resize: 'vertical' }} value={form.medical_notes} onChange={set('medical_notes')} />
        </div>

        {msg && (
          <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 16, background: msg.type === 'success' ? '#D1F2EB' : '#fee2e2', color: msg.type === 'success' ? '#0E6655' : '#991b1b', fontSize: 14, fontWeight: 500 }}>
            {msg.text}
          </div>
        )}

        <button type="submit" disabled={saving} style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : 'Save Profile'}
        </button>
      </form>
    </>
  )
}

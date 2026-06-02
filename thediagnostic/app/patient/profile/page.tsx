// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ProfilePage() {
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    marketingConsent: false,
  })

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [email, setEmail] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setEmail(user.email ?? '')

      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, phone, date_of_birth, marketing_consent')
        .eq('id', user.id)
        .single()

      if (profile) {
        setForm({
          firstName: profile.first_name ?? '',
          lastName: profile.last_name ?? '',
          phone: profile.phone ?? '',
          dob: profile.date_of_birth ?? '',
          marketingConsent: profile.marketing_consent ?? false,
        })
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        date_of_birth: form.dob || null,
        marketing_consent: form.marketingConsent,
      })
      .eq('id', user.id)

    setMessage(error
      ? { type: 'error', text: error.message }
      : { type: 'success', text: 'Profile updated successfully.' }
    )
    setSaving(false)
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match.' })
      return
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters.' })
      return
    }
    setPasswordSaving(true)
    setPasswordMessage(null)

    const { error } = await supabase.auth.updateUser({ password: passwordForm.newPassword })
    setPasswordMessage(error
      ? { type: 'error', text: error.message }
      : { type: 'success', text: 'Password changed successfully.' }
    )
    if (!error) setPasswordForm({ newPassword: '', confirmPassword: '' })
    setPasswordSaving(false)
  }

  if (loading) return <div style={{ color: '#bbb', fontSize: 14 }}>Loading…</div>

  const input = {
    width: '100%', padding: '11px 13px',
    border: '1.5px solid #e8e8e8', borderRadius: 9,
    fontSize: 14, fontFamily: 'inherit', color: '#111',
    outline: 'none', background: '#fff', transition: 'border-color .15s',
  }

  const label = {
    display: 'block' as const,
    fontSize: 11, fontWeight: 600 as const,
    color: '#666', letterSpacing: 0.8,
    textTransform: 'uppercase' as const, marginBottom: 6,
  }

  return (
    <>
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#0F4C81', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          Patient Portal
        </p>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: '#111', letterSpacing: -0.5, marginBottom: 6 }}>
          My profile
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>Update your personal details and preferences.</p>
      </div>

      <div style={{ display: 'grid', gap: 24, maxWidth: 640 }}>

        {/* Personal details */}
        <form onSubmit={handleSave} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '28px 28px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 20 }}>Personal details</div>

          {message && (
            <div style={{
              background: message.type === 'success' ? '#dcfce7' : '#fef2f2',
              border: `1px solid ${message.type === 'success' ? '#86efac' : '#fca5a5'}`,
              borderRadius: 8, padding: '10px 14px', marginBottom: 18,
              fontSize: 13, color: message.type === 'success' ? '#166534' : '#dc2626',
            }}>
              {message.text}
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style={label}>Email address</label>
            <input value={email} disabled style={{ ...input, background: '#f8f8f8', color: '#999', cursor: 'not-allowed' }} />
            <p style={{ fontSize: 11, color: '#bbb', marginTop: 5 }}>Email cannot be changed here. Contact support if needed.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={label}>First name</label>
              <input
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                style={input}
                onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
              />
            </div>
            <div>
              <label style={label}>Last name</label>
              <input
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                style={input}
                onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={label}>Phone number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="07700 900000"
                style={input}
                onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
              />
            </div>
            <div>
              <label style={label}>Date of birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                style={input}
                onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24 }}>
            <input
              type="checkbox"
              id="marketing"
              checked={form.marketingConsent}
              onChange={e => setForm(f => ({ ...f, marketingConsent: e.target.checked }))}
              style={{ marginTop: 2, flexShrink: 0, accentColor: '#0F4C81', width: 16, height: 16, cursor: 'pointer' }}
            />
            <label htmlFor="marketing" style={{ fontSize: 13, color: '#666', lineHeight: 1.6, cursor: 'pointer' }}>
              I&apos;d like to receive health tips and offers from ScanBook. You can unsubscribe at any time.
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '11px 24px', background: saving ? '#e8e8e8' : '#082A4A',
              color: saving ? '#bbb' : '#fff', border: 'none', borderRadius: 9,
              fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'background .15s',
            }}
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </form>

        {/* Change password */}
        <form onSubmit={handlePasswordChange} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '28px 28px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 20 }}>Change password</div>

          {passwordMessage && (
            <div style={{
              background: passwordMessage.type === 'success' ? '#dcfce7' : '#fef2f2',
              border: `1px solid ${passwordMessage.type === 'success' ? '#86efac' : '#fca5a5'}`,
              borderRadius: 8, padding: '10px 14px', marginBottom: 18,
              fontSize: 13, color: passwordMessage.type === 'success' ? '#166534' : '#dc2626',
            }}>
              {passwordMessage.text}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={label}>New password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm(f => ({ ...f, newPassword: e.target.value }))}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                style={input}
                onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
              />
            </div>
            <div>
              <label style={label}>Confirm new password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm(f => ({ ...f, confirmPassword: e.target.value }))}
                placeholder="Repeat new password"
                autoComplete="new-password"
                style={input}
                onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={passwordSaving || !passwordForm.newPassword}
            style={{
              padding: '11px 24px',
              background: passwordSaving || !passwordForm.newPassword ? '#e8e8e8' : '#111',
              color: passwordSaving || !passwordForm.newPassword ? '#bbb' : '#fff',
              border: 'none', borderRadius: 9, fontSize: 14, fontWeight: 600,
              cursor: passwordSaving || !passwordForm.newPassword ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'background .15s',
            }}
          >
            {passwordSaving ? 'Changing…' : 'Change password'}
          </button>
        </form>

      </div>
    </>
  )
}

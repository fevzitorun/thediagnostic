'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  gdprConsent: boolean
  marketingConsent: boolean
}

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gdprConsent: false,
    marketingConsent: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)


  function update(field: Partial<FormData>) {
    setForm(f => ({ ...f, ...field }))
  }

  function validate(): string | null {
    if (!form.firstName.trim() || !form.lastName.trim()) return 'Please enter your full name.'
    if (!form.email.includes('@')) return 'Please enter a valid email address.'
    if (form.password.length < 8) return 'Password must be at least 8 characters.'
    if (form.password !== form.confirmPassword) return 'Passwords do not match.'
    if (!form.gdprConsent) return 'You must agree to our Terms & Privacy Policy to continue.'
    return null
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) { setError(validationError); return }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        marketingConsent: form.marketingConsent,
      }),
    })

    const result = await res.json()

    if (!res.ok) {
      setError(result.error ?? 'Registration failed. Please try again.')
      setLoading(false)
      return
    }

    // Auto sign-in after registration
    const signInResult = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (signInResult?.error) {
      setSuccess(true) // Account created, but auto-login failed — ask them to log in
      setLoading(false)
      return
    }

    router.push('/patient/dashboard')
    router.refresh()
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 12 }}>
          Check your email
        </h2>
        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 20 }}>
          We sent a verification link to <strong>{form.email}</strong>.
          Click the link to activate your account.
        </p>
        <p style={{ fontSize: 12, color: '#bbb' }}>
          Didn&apos;t receive it? Check your spam folder or{' '}
          <Link href="/login" style={{ color: '#0F4C81' }}>try signing in</Link>.
        </p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%', padding: '11px 13px',
    border: '1.5px solid #e8e8e8', borderRadius: 9,
    fontSize: 14, fontFamily: 'inherit', outline: 'none',
    transition: 'border-color .15s', background: '#fff',
  }

  const labelStyle = {
    display: 'block' as const,
    fontSize: 11, fontWeight: 600 as const,
    color: '#666', letterSpacing: 0.8 as const,
    textTransform: 'uppercase' as const, marginBottom: 6,
  }

  const canSubmit = form.firstName && form.lastName && form.email && form.password && form.confirmPassword && form.gdprConsent

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6 }}>
          Create your account
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#0F4C81', textDecoration: 'none', fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 9, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleRegister}>

        {/* Name */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>First name *</label>
            <input
              type="text" value={form.firstName} required autoComplete="given-name"
              onChange={e => update({ firstName: e.target.value })}
              placeholder="Jane"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
              onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
            />
          </div>
          <div>
            <label style={labelStyle}>Last name *</label>
            <input
              type="text" value={form.lastName} required autoComplete="family-name"
              onChange={e => update({ lastName: e.target.value })}
              placeholder="Smith"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
              onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Email address *</label>
          <input
            type="email" value={form.email} required autoComplete="email"
            onChange={e => update({ email: e.target.value })}
            placeholder="jane@example.com"
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
            onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Phone number</label>
          <input
            type="tel" value={form.phone} autoComplete="tel"
            onChange={e => update({ phone: e.target.value })}
            placeholder="07700 900000"
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
            onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Password *</label>
          <input
            type="password" value={form.password} required autoComplete="new-password"
            onChange={e => update({ password: e.target.value })}
            placeholder="Minimum 8 characters"
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
            onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
          />
          {form.password && form.password.length < 8 && (
            <p style={{ fontSize: 11, color: '#ef4444', marginTop: 5 }}>At least 8 characters required</p>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Confirm password *</label>
          <input
            type="password" value={form.confirmPassword} required autoComplete="new-password"
            onChange={e => update({ confirmPassword: e.target.value })}
            placeholder="Repeat your password"
            style={{
              ...inputStyle,
              borderColor: form.confirmPassword && form.password !== form.confirmPassword ? '#ef4444' : '#e8e8e8',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
            onBlur={e => (e.currentTarget.style.borderColor = form.password !== form.confirmPassword ? '#ef4444' : '#e8e8e8')}
          />
          {form.confirmPassword && form.password !== form.confirmPassword && (
            <p style={{ fontSize: 11, color: '#ef4444', marginTop: 5 }}>Passwords do not match</p>
          )}
        </div>

        <div style={{ height: 1, background: '#f0f0f0', marginBottom: 18 }} />

        {/* GDPR consent — required */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <input
            type="checkbox" id="gdpr" required
            checked={form.gdprConsent}
            onChange={e => update({ gdprConsent: e.target.checked })}
            style={{ marginTop: 2, flexShrink: 0, accentColor: '#0F4C81', width: 16, height: 16, cursor: 'pointer' }}
          />
          <label htmlFor="gdpr" style={{ fontSize: 13, color: '#555', lineHeight: 1.6, cursor: 'pointer' }}>
            I agree to ScanBook&apos;s{' '}
            <Link href="/terms-and-conditions" style={{ color: '#0F4C81' }}>Terms & Conditions</Link>
            {' '}and{' '}
            <Link href="/privacy-policy" style={{ color: '#0F4C81' }}>Privacy Policy</Link>.
            I understand my health data will be shared with the imaging centre I book with. <span style={{ color: '#ef4444' }}>*</span>
          </label>
        </div>

        {/* Marketing consent — optional */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24 }}>
          <input
            type="checkbox" id="marketing"
            checked={form.marketingConsent}
            onChange={e => update({ marketingConsent: e.target.checked })}
            style={{ marginTop: 2, flexShrink: 0, accentColor: '#0F4C81', width: 16, height: 16, cursor: 'pointer' }}
          />
          <label htmlFor="marketing" style={{ fontSize: 13, color: '#888', lineHeight: 1.6, cursor: 'pointer' }}>
            I&apos;d like to receive health tips and offers from ScanBook. You can unsubscribe at any time.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !canSubmit}
          style={{
            width: '100%', padding: '13px',
            background: loading || !canSubmit ? '#e8e8e8' : '#0F4C81',
            color: loading || !canSubmit ? '#bbb' : '#fff',
            border: 'none', borderRadius: 10,
            fontSize: 15, fontWeight: 600,
            cursor: loading || !canSubmit ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', transition: 'background .15s',
          }}
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </>
  )
}

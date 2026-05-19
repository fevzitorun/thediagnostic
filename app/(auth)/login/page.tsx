'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') ?? '/patient/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  async function handleGoogleLogin() {
    setLoading(true)
    await signIn('google', { callbackUrl: redirectTo })
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6 }}>
          Sign in to ScanBook
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{ color: '#0F4C81', textDecoration: 'none', fontWeight: 500 }}>
            Create one free
          </Link>
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        style={{
          width: '100%', padding: '11px', marginBottom: 20,
          border: '1.5px solid #e8e8e8', borderRadius: 10,
          background: '#fff', fontSize: 14, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit', color: '#333',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: '#ebebeb' }} />
        <span style={{ fontSize: 12, color: '#bbb' }}>or</span>
        <div style={{ flex: 1, height: 1, background: '#ebebeb' }} />
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 9, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Email address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="your@email.com"
            style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #e8e8e8', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Your password"
            style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #e8e8e8', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" disabled={loading || !email || !password}
          style={{ width: '100%', padding: '13px', background: loading || !email || !password ? '#e8e8e8' : '#0F4C81', color: loading || !email || !password ? '#bbb' : '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loading || !email || !password ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
        By signing in you agree to our{' '}
        <Link href="/terms-and-conditions" style={{ color: '#bbb' }}>Terms</Link>{' '}and{' '}
        <Link href="/privacy-policy" style={{ color: '#bbb' }}>Privacy Policy</Link>.
      </p>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}

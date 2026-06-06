'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('sb_cookie_consent')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('sb_cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('sb_cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: '#082A4A', color: '#fff',
      padding: '16px 24px',
      display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      boxShadow: '0 -4px 24px rgba(0,0,0,.25)',
    }}>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, flex: 1, minWidth: 240 }}>
        We use cookies to improve your experience and analyse site usage.
        Read our{' '}
        <a href="/privacy" style={{ color: '#93c5fd', textDecoration: 'underline' }}>Privacy Policy</a>
        {' '}and{' '}
        <a href="/cookies" style={{ color: '#93c5fd', textDecoration: 'underline' }}>Cookie Policy</a>.
      </p>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '9px 20px', background: 'transparent', color: '#cbd5e1',
            border: '1.5px solid #334155', borderRadius: 8, fontSize: 13,
            fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: '9px 20px', background: '#0F4C81', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 13,
            fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Accept all cookies
        </button>
      </div>
    </div>
  )
}

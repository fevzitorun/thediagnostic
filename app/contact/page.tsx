'use client'

import { useState, FormEvent } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const field: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1.5px solid #CDDDE9', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fff', boxSizing: 'border-box' }

  return (
    <main style={{ minHeight: '100vh', background: '#F6F9FC' }}>
      {/* Hero */}
      <div style={{ background: '#082A4A', padding: '72px 24px 56px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#3AABDB', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>Get in Touch</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 44, color: '#fff', marginBottom: 16, letterSpacing: -0.5 }}>Contact thediagnostic</h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', maxWidth: 580, margin: '0 auto' }}>
          Questions about a scan? Pricing? Our team responds within 2 hours during UK business hours.
        </p>
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '56px 24px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 40, alignItems: 'start' }}>

        {/* Contact info */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--primary)', marginBottom: 24 }}>How we can help</h2>

          {[
            { icon: '💬', title: 'WhatsApp (Fastest)', detail: '+44 7700 000000', sub: 'Mon–Fri 8am–8pm UK time', href: 'https://wa.me/447700000000' },
            { icon: '📧', title: 'Email',              detail: 'info@thediagnostic.co.uk', sub: 'Reply within 2 hours', href: 'mailto:info@thediagnostic.co.uk' },
            { icon: '📞', title: 'Phone',              detail: '+44 20 0000 0000', sub: 'Mon–Fri 9am–5pm UK time', href: 'tel:+442000000000' },
          ].map(item => (
            <a key={item.title} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 22, textDecoration: 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EBF4FA', display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#3AABDB', marginTop: 1 }}>{item.detail}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{item.sub}</div>
              </div>
            </a>
          ))}

          <div style={{ marginTop: 32, background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>Office & Registration</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              thediagnostic.co.uk<br />
              A trading name of Connective Hub Limited<br />
              Registered in England & Wales
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: '32px' }}>
          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h2 style={{ fontSize: 22, color: 'var(--primary)', marginBottom: 8 }}>Message received</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>We&apos;ll get back to you within 2 hours.</p>
              <button type="button" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }} style={{ marginTop: 20, padding: '10px 22px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--primary)', marginBottom: 24 }}>Send a message</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div><label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Name *</label><input required style={field} value={form.name} onChange={set('name')} /></div>
                <div><label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Email *</label><input required type="email" style={field} value={form.email} onChange={set('email')} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div><label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Phone</label><input type="tel" style={field} value={form.phone} onChange={set('phone')} /></div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Topic</label>
                  <select style={field} value={form.subject} onChange={set('subject')}>
                    <option value="">Select a topic…</option>
                    <option>Booking enquiry</option>
                    <option>Pricing question</option>
                    <option>Medical query</option>
                    <option>GP referral</option>
                    <option>Travel & logistics</option>
                    <option>Partnership / clinic</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Message *</label>
                <textarea required rows={5} style={{ ...field, resize: 'vertical' }} value={form.message} onChange={set('message')} />
              </div>
              {status === 'error' && <div style={{ marginBottom: 14, padding: '10px 14px', background: '#fee2e2', borderRadius: 8, fontSize: 13, color: '#991b1b' }}>Something went wrong. Please try WhatsApp instead.</div>}
              <button type="submit" disabled={status === 'sending'} style={{ width: '100%', padding: '13px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>Your data is processed in accordance with our Privacy Policy and GDPR.</p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

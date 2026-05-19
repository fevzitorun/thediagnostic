'use client'

import { useState } from 'react'

interface GP {
  id: string
  name: string | null
  practice_name: string | null
  practice_address: string | null
  gmc_number: string | null
  phone: string | null
  email: string | null
}

export default function GPSettingsForm({ gp }: { gp: GP }) {
  const [form, setForm] = useState({
    name: gp.name ?? '',
    practice_name: gp.practice_name ?? '',
    practice_address: gp.practice_address ?? '',
    gmc_number: gp.gmc_number ?? '',
    phone: gp.phone ?? '',
    email: gp.email ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function field(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }))
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    setError('')

    const res = await fetch('/api/gp/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gpId: gp.id, ...form }),
    })

    setSaving(false)
    if (!res.ok) {
      setError('Failed to save. Please try again.')
    } else {
      setSaved(true)
    }
  }

  return (
    <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 20 }}>GP profile</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Full name
            <input value={form.name} onChange={e => field('name', e.target.value)} style={inp} placeholder="Dr First Last" />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            GMC number
            <input value={form.gmc_number} onChange={e => field('gmc_number', e.target.value)} style={inp} placeholder="1234567" />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Phone
            <input value={form.phone} onChange={e => field('phone', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Practice name
            <input value={form.practice_name} onChange={e => field('practice_name', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Practice address
            <input value={form.practice_address} onChange={e => field('practice_address', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Contact email
            <input type="email" value={form.email} onChange={e => field('email', e.target.value)} style={inp} />
          </label>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 8 }}>Payout details</div>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>
          Commission payments are sent monthly via bank transfer. Contact ScanBook to add or update your bank details.
        </div>
        <a
          href="mailto:finance@scanbook.co.uk?subject=GP Payout Bank Details"
          style={{ display: 'inline-block', padding: '10px 18px', background: '#1a3a2a', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
        >
          Contact finance team
        </a>
      </div>

      {error && <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>{error}</div>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={save}
          disabled={saving}
          style={{ padding: '12px 28px', background: saving ? '#e5e7eb' : '#1a3a2a', color: saving ? '#9ca3af' : '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        {saved && <span style={{ fontSize: 13, color: '#166534' }}>✓ Saved</span>}
      </div>
    </div>
  )
}

const inp: React.CSSProperties = {
  display: 'block', width: '100%', marginTop: 4,
  padding: '9px 12px', border: '1.5px solid #e8e8e8',
  borderRadius: 8, fontSize: 13, fontFamily: 'inherit',
  boxSizing: 'border-box', outline: 'none',
}

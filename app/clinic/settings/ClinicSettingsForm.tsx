'use client'

import { useState } from 'react'

const CAPABILITIES = ['MRI', 'CT', 'Ultrasound', 'X-Ray', 'Baby Scan', 'Pregnancy Scan']

interface ClinicData {
  id: string
  name: string | null
  address: string | null
  city: string | null
  postcode: string | null
  phone: string | null
  email: string | null
  website: string | null
  description: string | null
  capabilities: string[] | null
}

export default function ClinicSettingsForm({ clinic }: { clinic: ClinicData }) {
  const [form, setForm] = useState({
    name: clinic.name ?? '',
    address: clinic.address ?? '',
    city: clinic.city ?? '',
    postcode: clinic.postcode ?? '',
    phone: clinic.phone ?? '',
    email: clinic.email ?? '',
    website: clinic.website ?? '',
    description: clinic.description ?? '',
    capabilities: (clinic.capabilities ?? []) as string[],
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function field(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }))
    setSaved(false)
  }

  function toggleCapability(cap: string) {
    setForm(f => ({
      ...f,
      capabilities: f.capabilities.includes(cap)
        ? f.capabilities.filter(c => c !== cap)
        : [...f.capabilities, cap],
    }))
    setSaved(false)
  }

  async function save() {
    setSaving(true)
    setError('')

    const res = await fetch('/api/clinic/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setSaving(false)
    if (!res.ok) {
      setError('Failed to save. Please try again.')
    } else {
      setSaved(true)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 20 }}>Basic information</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Clinic name
            <input value={form.name} onChange={e => field('name', e.target.value)} style={inputStyle} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Address
            <input value={form.address} onChange={e => field('address', e.target.value)} style={inputStyle} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            City
            <input value={form.city} onChange={e => field('city', e.target.value)} style={inputStyle} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Postcode
            <input value={form.postcode} onChange={e => field('postcode', e.target.value)} style={inputStyle} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Phone
            <input value={form.phone} onChange={e => field('phone', e.target.value)} placeholder="01234 567890" style={inputStyle} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Email
            <input value={form.email} onChange={e => field('email', e.target.value)} placeholder="info@clinic.co.uk" style={inputStyle} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Website
            <input value={form.website} onChange={e => field('website', e.target.value)} placeholder="https://yourclinic.co.uk" style={inputStyle} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Description (shown to patients)
            <textarea value={form.description} onChange={e => field('description', e.target.value)}
              rows={4} placeholder="Describe your clinic, equipment, and specialties…"
              style={{ ...inputStyle, resize: 'vertical' }} />
          </label>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 6 }}>Scan capabilities</div>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Select the types of scans your clinic offers.</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {CAPABILITIES.map(cap => {
            const active = form.capabilities.includes(cap)
            return (
              <button
                key={cap}
                onClick={() => toggleCapability(cap)}
                style={{
                  padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                  border: active ? '2px solid #082A4A' : '1.5px solid #e8e8e8',
                  background: active ? '#082A4A' : '#fff',
                  color: active ? '#fff' : '#555',
                  cursor: 'pointer',
                }}
              >
                {cap}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={save}
          disabled={saving}
          style={{ padding: '12px 28px', background: saving ? '#e5e7eb' : '#082A4A', color: saving ? '#9ca3af' : '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        {saved && <span style={{ fontSize: 13, color: '#166534' }}>✓ Saved</span>}
        {error && <span style={{ fontSize: 13, color: '#dc2626' }}>{error}</span>}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%', marginTop: 4,
  padding: '9px 12px', border: '1.5px solid #e8e8e8',
  borderRadius: 8, fontSize: 13, fontFamily: 'inherit',
  boxSizing: 'border-box', outline: 'none',
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CAPABILITIES = ['MRI', 'CT', 'Ultrasound', 'X-Ray', 'Baby Scan', 'Pregnancy Scan']

export default function NewClinicForm() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '', address: '', city: '', postcode: '',
    phone: '', email: '', website: '', description: '',
    commission_rate: '12',
    capabilities: [] as string[],
    status: 'pending',
  })

  function field(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function toggleCap(cap: string) {
    setForm(f => ({
      ...f,
      capabilities: f.capabilities.includes(cap)
        ? f.capabilities.filter(c => c !== cap)
        : [...f.capabilities, cap],
    }))
  }

  async function submit() {
    if (!form.name || !form.city || !form.postcode) {
      setError('Name, city, and postcode are required')
      return
    }
    setSaving(true)
    setError('')

    const res = await fetch('/api/admin/clinics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        commission_rate: parseFloat(form.commission_rate) / 100,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Failed to create clinic')
      setSaving(false)
      return
    }

    router.push(`/admin/clinics/${data.id}`)
  }

  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 20 }}>Clinic information</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Clinic name *
            <input value={form.name} onChange={e => field('name', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Address
            <input value={form.address} onChange={e => field('address', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            City *
            <input value={form.city} onChange={e => field('city', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Postcode *
            <input value={form.postcode} onChange={e => field('postcode', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Phone
            <input value={form.phone} onChange={e => field('phone', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Email
            <input value={form.email} onChange={e => field('email', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Website
            <input value={form.website} onChange={e => field('website', e.target.value)} placeholder="https://" style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Description
            <textarea value={form.description} onChange={e => field('description', e.target.value)} rows={3} style={{ ...inp, resize: 'vertical' }} />
          </label>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 20 }}>Platform settings</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Status
            <select value={form.status} onChange={e => field('status', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
              {['pending', 'active', 'inactive', 'suspended'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Commission rate (%)
            <input type="number" value={form.commission_rate} onChange={e => field('commission_rate', e.target.value)} style={inp} />
          </label>
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 10 }}>Capabilities</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CAPABILITIES.map(cap => {
            const active = form.capabilities.includes(cap)
            return (
              <button
                key={cap}
                type="button"
                onClick={() => toggleCap(cap)}
                style={{
                  padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: active ? '2px solid #111' : '1.5px solid #e8e8e8',
                  background: active ? '#111' : '#fff',
                  color: active ? '#fff' : '#555',
                }}
              >
                {cap}
              </button>
            )
          })}
        </div>
      </div>

      {error && <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>{error}</div>}

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => router.back()}
          style={{ padding: '12px 24px', border: '1.5px solid #e8e8e8', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#fff', color: '#555' }}
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={saving}
          style={{ flex: 1, padding: '12px 24px', background: saving ? '#e5e7eb' : '#111', color: saving ? '#9ca3af' : '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saving ? 'Creating…' : 'Create clinic'}
        </button>
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

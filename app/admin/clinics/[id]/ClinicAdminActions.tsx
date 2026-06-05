'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STATUS_OPTIONS = ['active', 'pending', 'inactive', 'suspended']

export default function ClinicAdminActions({
  clinicId,
  currentStatus,
}: {
  clinicId: string
  currentStatus: string
}) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [commission, setCommission] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  async function save() {
    setSaving(true)
    setError('')
    const body: Record<string, unknown> = { status }
    if (commission) body.commission_rate = parseFloat(commission) / 100

    const res = await fetch(`/api/admin/clinics/${clinicId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSaving(false)
    if (!res.ok) {
      setError('Failed to save. Please try again.')
      return
    }
    setSaved(true)
    router.refresh()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
        Status
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setSaved(false) }}
          style={{ display: 'block', width: '100%', marginTop: 4, padding: '9px 12px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 13, fontFamily: 'inherit' }}
        >
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
        Commission rate (%)
        <input
          type="number"
          value={commission}
          onChange={e => { setCommission(e.target.value); setSaved(false) }}
          placeholder="12"
          style={{ display: 'block', width: '100%', marginTop: 4, padding: '9px 12px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}
        />
      </label>

      <button
        onClick={save}
        disabled={saving}
        style={{ padding: '10px 16px', background: saving ? '#e5e7eb' : '#111', color: saving ? '#9ca3af' : '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}
      >
        {saving ? 'Saving…' : 'Save changes'}
      </button>

      {saved && <div style={{ fontSize: 12, color: '#166534' }}>✓ Saved</div>}
      {error && <div style={{ fontSize: 12, color: '#dc2626' }}>{error}</div>}

      <div style={{ height: 1, background: '#f0f0f0', margin: '4px 0' }} />

      <a
        href={`/clinics/${clinicId}`}
        target="_blank"
        rel="noreferrer"
        style={{ display: 'block', padding: '9px 16px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 12, color: '#555', textDecoration: 'none', textAlign: 'center' }}
      >
        View public page ↗
      </a>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Pkg {
  id: string
  name: string | null
  scan_type: string | null
  price: number | null
  duration_minutes: number | null
  description: string | null
  is_active: boolean | null
}

const SCAN_TYPES = ['MRI', 'CT', 'Ultrasound', 'X-Ray', 'Baby Scan', 'Pregnancy Scan']

export default function PackageManager({
  clinicId,
  mode,
  pkg,
}: {
  clinicId: string
  mode: 'add' | 'edit'
  pkg?: Pkg
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: pkg?.name ?? '',
    scan_type: pkg?.scan_type ?? 'MRI',
    price: pkg?.price?.toString() ?? '',
    duration_minutes: pkg?.duration_minutes?.toString() ?? '30',
    description: pkg?.description ?? '',
    is_active: pkg?.is_active ?? true,
  })

  function field(key: keyof typeof form, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function save() {
    if (!form.name || !form.price) return
    setSaving(true)

    const payload = {
      name: form.name,
      scan_type: form.scan_type,
      price: parseFloat(form.price),
      duration_minutes: parseInt(form.duration_minutes) || null,
      description: form.description || null,
      is_active: form.is_active,
    }

    if (mode === 'add') {
      await fetch('/api/clinic/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, clinicId }),
      })
    } else if (pkg) {
      await fetch(`/api/clinic/packages/${pkg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    setSaving(false)
    setOpen(false)
    router.refresh()
  }

  async function remove() {
    if (!pkg) return
    if (!confirm('Remove this package?')) return
    await fetch(`/api/clinic/packages/${pkg.id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <>
      {mode === 'add' ? (
        <button
          onClick={() => setOpen(true)}
          style={{ padding: '10px 20px', background: '#082A4A', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          + Add package
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setOpen(true)}
            style={{ padding: '4px 10px', fontSize: 11, border: '1px solid #e8e8e8', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#555' }}
          >
            Edit
          </button>
          <button
            onClick={remove}
            style={{ padding: '4px 10px', fontSize: 11, border: '1px solid #fecaca', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#991b1b' }}
          >
            Remove
          </button>
        </div>
      )}

      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '32px', width: '100%', maxWidth: 460, boxShadow: '0 20px 60px rgba(0,0,0,.2)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 24 }}>
              {mode === 'add' ? 'Add package' : 'Edit package'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
                Package name *
                <input value={form.name} onChange={e => field('name', e.target.value)} placeholder="e.g. Full Body MRI" style={inp} />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
                  Scan type
                  <select value={form.scan_type} onChange={e => field('scan_type', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
                    {SCAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
                  Price (£) *
                  <input type="number" value={form.price} onChange={e => field('price', e.target.value)} placeholder="199" style={inp} />
                </label>
              </div>

              <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
                Duration (minutes)
                <input type="number" value={form.duration_minutes} onChange={e => field('duration_minutes', e.target.value)} placeholder="30" style={inp} />
              </label>

              <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
                Description
                <textarea value={form.description} onChange={e => field('description', e.target.value)} rows={3} placeholder="Brief description shown to patients…" style={{ ...inp, resize: 'vertical' }} />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#333' }}>
                <input type="checkbox" checked={form.is_active} onChange={e => field('is_active', e.target.checked)} style={{ width: 16, height: 16 }} />
                Active (visible to patients)
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={() => setOpen(false)} style={{ flex: 1, padding: '11px', border: '1.5px solid #e8e8e8', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#fff', color: '#555' }}>
                Cancel
              </button>
              <button onClick={save} disabled={saving || !form.name || !form.price} style={{ flex: 2, padding: '11px', background: saving ? '#e5e7eb' : '#082A4A', color: saving ? '#9ca3af' : '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving…' : mode === 'add' ? 'Add package' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const inp: React.CSSProperties = {
  display: 'block', width: '100%', marginTop: 4,
  padding: '9px 12px', border: '1.5px solid #e8e8e8',
  borderRadius: 8, fontSize: 13, fontFamily: 'inherit',
  boxSizing: 'border-box', outline: 'none',
}

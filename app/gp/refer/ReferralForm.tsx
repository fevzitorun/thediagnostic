'use client'

import { useState } from 'react'

interface Clinic {
  id: string
  name: string | null
  city: string | null
  capabilities: string[] | null
}

const SCAN_TYPES = ['MRI', 'CT', 'Ultrasound', 'X-Ray', 'Baby Scan', 'Pregnancy Scan']
const URGENCY = ['Routine', 'Soon (within 2 weeks)', 'Urgent (within 48 hours)']

export default function ReferralForm({
  gpId,
  referralCode,
  clinics,
}: {
  gpId: string
  referralCode: string
  clinics: Clinic[]
}) {
  const [form, setForm] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    patient_dob: '',
    nhs_number: '',
    scan_type: 'MRI',
    preferred_clinic_id: '',
    urgency: 'Routine',
    clinical_notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function field(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function submit() {
    if (!form.patient_name || !form.patient_email) {
      setError('Patient name and email are required')
      return
    }
    setSubmitting(true)
    setError('')

    const res = await fetch('/api/gp/referrals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gpId, referralCode, ...form }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Failed to submit referral')
      setSubmitting(false)
      return
    }

    setSuccess(true)
    setSubmitting(false)
  }

  if (success) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '48px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 8 }}>Referral created</div>
        <div style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>
          {form.patient_name} will receive a booking link at {form.patient_email}.<br />
          Our team will be in touch to confirm the appointment.
        </div>
        <button
          onClick={() => { setSuccess(false); setForm(f => ({ ...f, patient_name: '', patient_email: '', patient_phone: '', patient_dob: '', nhs_number: '', clinical_notes: '' })) }}
          style={{ padding: '11px 24px', background: '#1a3a2a', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Refer another patient
        </button>
      </div>
    )
  }

  const filteredClinics = form.scan_type
    ? clinics.filter(c => !c.capabilities || c.capabilities.length === 0 || c.capabilities.includes(form.scan_type))
    : clinics

  return (
    <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '28px' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 20 }}>Patient details</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Full name *
            <input value={form.patient_name} onChange={e => field('patient_name', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Date of birth
            <input type="date" value={form.patient_dob} onChange={e => field('patient_dob', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Email *
            <input type="email" value={form.patient_email} onChange={e => field('patient_email', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Phone
            <input value={form.patient_phone} onChange={e => field('patient_phone', e.target.value)} style={inp} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            NHS number
            <input value={form.nhs_number} onChange={e => field('nhs_number', e.target.value)} placeholder="000 000 0000" style={inp} />
          </label>
        </div>

        <div style={{ height: 1, background: '#f0f0f0', margin: '4px 0' }} />
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Referral details</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Scan type *
            <select value={form.scan_type} onChange={e => field('scan_type', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
              {SCAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
            Urgency
            <select value={form.urgency} onChange={e => field('urgency', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
              {URGENCY.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Preferred clinic (optional)
            <select value={form.preferred_clinic_id} onChange={e => field('preferred_clinic_id', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
              <option value="">No preference — ScanBook will match</option>
              {filteredClinics.map(c => (
                <option key={c.id} value={c.id}>{c.name} — {c.city}</option>
              ))}
            </select>
          </label>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#555', gridColumn: '1 / -1' }}>
            Clinical notes
            <textarea
              value={form.clinical_notes}
              onChange={e => field('clinical_notes', e.target.value)}
              rows={3}
              placeholder="Reason for referral, relevant history, contraindications…"
              style={{ ...inp, resize: 'vertical' }}
            />
          </label>
        </div>

        {error && <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>{error}</div>}

        <button
          onClick={submit}
          disabled={submitting}
          style={{ padding: '13px 20px', background: submitting ? '#e5e7eb' : '#1a3a2a', color: submitting ? '#9ca3af' : '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer' }}
        >
          {submitting ? 'Submitting…' : 'Submit referral'}
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

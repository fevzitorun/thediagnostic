'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReportUploader({ bookingId }: { bookingId: string }) {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function attach() {
    if (!url.startsWith('http')) {
      setError('Please enter a valid URL (https://...)')
      return
    }
    setSaving(true)
    setError('')

    const res = await fetch('/api/clinic/reports', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, reportUrl: url }),
    })

    setSaving(false)
    if (!res.ok) {
      setError('Failed to attach report. Please try again.')
      return
    }
    setUrl('')
    router.refresh()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          value={url}
          onChange={e => { setUrl(e.target.value); setError('') }}
          placeholder="Report URL (Google Drive, Dropbox…)"
          style={{
            flex: 1, padding: '7px 10px', border: '1.5px solid #e8e8e8',
            borderRadius: 8, fontSize: 12, fontFamily: 'inherit', outline: 'none',
          }}
        />
        <button
          onClick={attach}
          disabled={saving || !url}
          style={{
            padding: '7px 14px', background: saving || !url ? '#e5e7eb' : '#082A4A',
            color: saving || !url ? '#9ca3af' : '#fff',
            border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600,
            cursor: saving || !url ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
          }}
        >
          {saving ? 'Saving…' : 'Attach report'}
        </button>
      </div>
      {error && <div style={{ fontSize: 11, color: '#dc2626' }}>{error}</div>}
    </div>
  )
}

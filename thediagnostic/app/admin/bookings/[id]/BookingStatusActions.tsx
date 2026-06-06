'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TRANSITIONS: Record<string, string[]> = {
  pending:            ['confirmed', 'cancelled'],
  callback_requested: ['confirmed', 'cancelled'],
  confirmed:          ['completed', 'cancelled'],
  completed:          [],
  cancelled:          [],
}

const STATUS_LABELS: Record<string, string> = {
  confirmed: '✓ Confirm',
  completed: '✓ Mark completed',
  cancelled: 'Cancel booking',
}

export default function BookingStatusActions({
  bookingId,
  currentStatus,
  phone,
}: {
  bookingId: string
  currentStatus: string
  phone: string | null
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState('')

  const nextStatuses = TRANSITIONS[currentStatus] ?? []

  async function updateStatus(status: string) {
    if (status === 'cancelled' && !confirm('Cancel this booking?')) return
    setLoading(true)
    await fetch(`/api/admin/bookings/${bookingId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {phone && currentStatus === 'callback_requested' && (
        <a
          href={`tel:${phone}`}
          style={{ display: 'block', padding: '11px 16px', background: '#7c3aed', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}
        >
          📞 Call {phone}
        </a>
      )}

      {nextStatuses.length > 0 && (
        <>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Optional note for this action…"
            rows={2}
            style={{ padding: '8px 12px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', resize: 'none', outline: 'none' }}
          />
          {nextStatuses.map(status => (
            <button
              key={status}
              onClick={() => updateStatus(status)}
              disabled={loading}
              style={{
                padding: '11px 16px', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                background: status === 'cancelled' ? '#fef2f2' : '#111',
                color: status === 'cancelled' ? '#991b1b' : '#fff',
              }}
            >
              {STATUS_LABELS[status] ?? status}
            </button>
          ))}
        </>
      )}

      {nextStatuses.length === 0 && (
        <div style={{ fontSize: 13, color: '#aaa', textAlign: 'center', padding: '8px 0' }}>No actions available</div>
      )}
    </div>
  )
}

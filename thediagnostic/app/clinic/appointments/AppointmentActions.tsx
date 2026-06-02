'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AppointmentActions({
  bookingId,
  status,
  phone,
}: {
  bookingId: string
  status: string
  phone: string | null
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(newStatus: string) {
    setLoading(true)
    await fetch(`/api/clinic/bookings/${bookingId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
      {status === 'pending' && (
        <>
          <button
            onClick={() => updateStatus('confirmed')}
            disabled={loading}
            style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: '#166534', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            ✓ Confirm
          </button>
          <button
            onClick={() => updateStatus('cancelled')}
            disabled={loading}
            style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer' }}
          >
            Cancel
          </button>
        </>
      )}
      {status === 'confirmed' && (
        <button
          onClick={() => updateStatus('completed')}
          disabled={loading}
          style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: '#0369a1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Mark done
        </button>
      )}
      {status === 'callback_requested' && phone && (
        <a
          href={`tel:${phone}`}
          style={{ padding: '5px 10px', fontSize: 11, fontWeight: 600, background: '#7c3aed', color: '#fff', borderRadius: 6, textDecoration: 'none' }}
        >
          📞 Call
        </a>
      )}
    </div>
  )
}

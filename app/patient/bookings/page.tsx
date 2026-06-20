'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatBookingRef } from '@/lib/format'

// This page is client-rendered; data is fetched from the API
// Real data comes from /api/patient/bookings which reads the session
import { useEffect } from 'react'

type Booking = {
  id: string
  booking_ref: string
  status: string
  clinic_name: string | null
  package_name: string | null
  body_part: string | null
  appointment_date: string | null
  amount_paid: number | null
  report_url: string | null
  created_at: string
}

const STATUS: Record<string, { bg: string; color: string; dot: string; label: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e', dot: '#f59e0b', label: 'Pending' },
  confirmed: { bg: '#dcfce7', color: '#166534', dot: '#22c55e', label: 'Confirmed' },
  completed: { bg: '#dbeafe', color: '#1e40af', dot: '#3b82f6', label: 'Completed' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444', label: 'Cancelled' },
}

type FilterTab = 'all' | 'upcoming' | 'completed' | 'cancelled'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<FilterTab>('all')
  const [selected, setSelected] = useState<Booking | null>(null)

  useEffect(() => {
    fetch('/api/patient/bookings')
      .then(r => r.json())
      .then((data: Booking[]) => { setBookings(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = bookings.filter(b => {
    if (tab === 'upcoming')  return b.status === 'confirmed' || b.status === 'pending'
    if (tab === 'completed') return b.status === 'completed'
    if (tab === 'cancelled') return b.status === 'cancelled'
    return true
  })

  const TABS: { id: FilterTab; label: string }[] = [
    { id: 'all',       label: `All (${bookings.length})` },
    { id: 'upcoming',  label: `Upcoming (${bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length})` },
    { id: 'completed', label: `Completed (${bookings.filter(b => b.status === 'completed').length})` },
    { id: 'cancelled', label: `Cancelled (${bookings.filter(b => b.status === 'cancelled').length})` },
  ]

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#3AABDB', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Patient Portal</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary)', marginBottom: 4 }}>My Bookings</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>All your scan bookings with thediagnostic.</p>
      </div>

      {/* Tab filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, borderBottom: '1px solid var(--line)', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{ padding: '9px 16px', fontSize: 13, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? 'var(--primary)' : 'var(--text-muted)', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer', marginBottom: -1 }}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading bookings…</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '56px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)', marginBottom: 6 }}>No bookings found</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Ready to book your first scan in Istanbul?</div>
          <Link href="/book" style={{ display: 'inline-block', padding: '10px 22px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Browse Scan Types</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(b => {
            const s = STATUS[b.status] ?? STATUS.pending
            const ref = b.booking_ref || formatBookingRef(b.id)
            return (
              <div key={b.id} onClick={() => setSelected(b)} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '18px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>{b.package_name ?? 'Scan'}{b.body_part ? ` — ${b.body_part}` : ''}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100, background: s.bg, color: s.color }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />{s.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{b.clinic_name ?? 'Clinic'}{b.appointment_date ? ` · ${b.appointment_date}` : ''}</div>
                  <div style={{ fontSize: 11, color: '#bbb', marginTop: 2, fontFamily: 'monospace' }}>{ref}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  {b.amount_paid && <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>£{Number(b.amount_paid).toLocaleString()}</span>}
                  {b.report_url && (
                    <a href={b.report_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ padding: '7px 12px', background: '#D1F2EB', color: '#0E6655', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>↓ Report</a>
                  )}
                  <span style={{ fontSize: 18, color: 'var(--text-muted)' }}>›</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <>
          <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 420, maxWidth: '100vw', background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)', zIndex: 1001, overflowY: 'auto' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Booking detail</div>
                <div style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 600, color: 'var(--primary)', marginTop: 3 }}>{selected.booking_ref || formatBookingRef(selected.id)}</div>
              </div>
              <button type="button" onClick={() => setSelected(null)} style={{ fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Status */}
              <div style={{ background: 'var(--bg-2)', borderRadius: 10, padding: '14px 16px' }}>
                {(() => { const s = STATUS[selected.status] ?? STATUS.pending; return (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, padding: '4px 12px', borderRadius: 100, background: s.bg, color: s.color }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot }} />{s.label}
                  </span>
                )})()}
              </div>
              {/* Scan */}
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Scan</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)' }}>{selected.package_name ?? 'Scan'}</div>
                {selected.body_part && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{selected.body_part}</div>}
              </div>
              {/* Clinic */}
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Clinic</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>{selected.clinic_name ?? '—'}</div>
                {selected.appointment_date && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>📅 {selected.appointment_date}</div>}
              </div>
              {/* Payment */}
              {selected.amount_paid && (
                <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Payment</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{Number(selected.amount_paid).toLocaleString()}</div>
                </div>
              )}
              {/* Report */}
              {selected.report_url ? (
                <a href={selected.report_url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#D1F2EB', color: '#0E6655', borderRadius: 10, padding: '14px 16px', textAlign: 'center', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
                  ↓ Download Radiology Report (PDF)
                </a>
              ) : (
                <div style={{ background: 'var(--bg-2)', borderRadius: 10, padding: '14px 16px', textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                  Report will appear here within 24h of your scan
                </div>
              )}
              {/* Help */}
              <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#25D366', color: '#fff', borderRadius: 10, padding: '12px 16px', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                Need help? Chat on WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}

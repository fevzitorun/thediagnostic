'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TriageResult {
  recommendedScan: string
  scanSlug: string
  urgency: 'routine' | 'soon' | 'urgent'
  reasoning: string
  alternativeScans?: string[]
  bookingHref: string
}

const URGENCY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  routine: { bg: '#F0FDF4', text: '#15803D', label: 'Routine — book within a few weeks' },
  soon:    { bg: '#FFFBEB', text: '#D97706', label: 'Soon — book within 1–2 weeks' },
  urgent:  { bg: '#FEF2F2', text: '#DC2626', label: 'Urgent — book as soon as possible' },
}

export default function TriageWidget() {
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState<TriageResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (symptoms.trim().length < 10) {
      setError('Please describe your symptoms in a little more detail.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/agents/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setResult(data as TriageResult)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const urgencyStyle = result ? URGENCY_STYLES[result.urgency] : null

  return (
    <div style={{ background: '#fff', border: '1.5px solid #E5E1D8', borderRadius: 16, padding: '32px 32px 28px', maxWidth: 560 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 10 }}>
        AI Scan Finder
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#082A4A', margin: '0 0 6px', lineHeight: 1.3 }}>
        Not sure which scan you need?
      </h3>
      <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 20px', lineHeight: 1.6 }}>
        Describe your symptoms and our AI assistant will recommend the most appropriate scan.
      </p>

      {!result && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            placeholder="e.g. I have pain in my lower back that radiates down my left leg. It started 3 weeks ago after lifting something heavy..."
            rows={4}
            style={{
              width: '100%', border: '1.5px solid #E5E1D8', borderRadius: 10, padding: '12px 14px',
              fontSize: 13, color: '#111', resize: 'vertical', fontFamily: 'inherit',
              outline: 'none', boxSizing: 'border-box', lineHeight: 1.6,
            }}
          />
          {error && (
            <p style={{ fontSize: 12, color: '#DC2626', margin: '8px 0 0' }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 12, width: '100%', padding: '13px 20px',
              background: loading ? '#9CA3AF' : '#0F4C81', color: '#fff',
              border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'background .15s',
            }}
          >
            {loading ? 'Analysing symptoms…' : 'Find my scan →'}
          </button>
          <p style={{ fontSize: 11, color: '#9CA3AF', margin: '10px 0 0', textAlign: 'center', lineHeight: 1.5 }}>
            This tool provides general guidance only. It is not a diagnosis or medical advice.
            Always consult a clinician if you are concerned.
          </p>
        </form>
      )}

      {result && urgencyStyle && (
        <div>
          {/* Urgency badge */}
          <div style={{
            display: 'inline-block', padding: '4px 10px', borderRadius: 20,
            background: urgencyStyle.bg, color: urgencyStyle.text,
            fontSize: 11, fontWeight: 700, marginBottom: 16,
          }}>
            {urgencyStyle.label}
          </div>

          {/* Recommended scan */}
          <div style={{ background: '#F8F9FB', borderRadius: 12, padding: '20px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
              Recommended scan
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#082A4A', marginBottom: 10 }}>
              {result.recommendedScan}
            </div>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>
              {result.reasoning}
            </p>
          </div>

          {result.alternativeScans && result.alternativeScans.length > 0 && (
            <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 16px' }}>
              <strong>Also worth considering:</strong> {result.alternativeScans.join(', ')}
            </p>
          )}

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href={result.bookingHref}
              style={{
                flex: 1, display: 'block', textAlign: 'center',
                padding: '12px 20px', background: '#082A4A', color: '#fff',
                borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}
            >
              Book {result.recommendedScan} →
            </Link>
            <button
              onClick={() => { setResult(null); setSymptoms('') }}
              style={{
                padding: '12px 18px', background: 'transparent', border: '1.5px solid #E5E1D8',
                borderRadius: 10, fontSize: 13, color: '#6B7280', cursor: 'pointer',
              }}
            >
              Start over
            </button>
          </div>

          <p style={{ fontSize: 11, color: '#9CA3AF', margin: '12px 0 0', textAlign: 'center', lineHeight: 1.5 }}>
            This is AI-generated guidance, not medical advice. Please speak to a clinician if you are unwell.
          </p>
        </div>
      )}
    </div>
  )
}

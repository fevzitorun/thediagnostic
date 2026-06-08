'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TriageResult {
  urgency: 'routine' | 'soon' | 'urgent';
  urgencyLabel: string;
  recommendedScans: { code: string; name: string; reason: string; priceFrom: number }[];
  clinicalSummary: string;
  nhsWaitEstimate: string;
  thediagnosticWait: string;
  estimatedSavingPct: number;
  shouldSeeGPFirst: boolean;
  gpNote?: string;
}

const URGENCY_CONFIG = {
  routine: { color: '#17A589', bg: '#D1F2EB', label: 'Routine', icon: '🟢' },
  soon: { color: '#E67E22', bg: '#FEF9F0', label: 'Soon', icon: '🟡' },
  urgent: { color: '#C0392B', bg: '#FDEDEC', label: 'Urgent', icon: '🔴' },
};

export default function TriageWidget() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (symptoms.trim().length < 10) {
      setError('Please describe your symptoms in at least 10 characters.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/agents/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });
      if (!res.ok) throw new Error('Service unavailable');
      const data = await res.json();
      setResult(data);
    } catch {
      setError('Our AI advisor is temporarily unavailable. Please WhatsApp us for immediate help.');
    } finally {
      setLoading(false);
    }
  }

  const urgencyConf = result ? URGENCY_CONFIG[result.urgency] : null;

  return (
    <div style={{
      background: '#fff', border: '1.5px solid var(--line)',
      borderRadius: 'var(--radius-xl)', padding: 32, maxWidth: 640,
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ fontSize: 32, flexShrink: 0 }}>🤖</div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--primary)', marginBottom: 4 }}>
            AI Scan Advisor
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Describe your symptoms or the scan your doctor recommended &mdash; our AI will suggest the most appropriate diagnostic scan.
          </p>
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={symptoms}
            onChange={e => { setSymptoms(e.target.value); setError(''); }}
            placeholder="e.g. 'I've had unexplained weight loss and fatigue for 3 months. My GP wants a scan to check for lymphoma.'"
            rows={4}
            style={{
              width: '100%', padding: '14px 16px',
              border: `1.5px solid ${error ? '#C0392B' : 'var(--line)'}`,
              borderRadius: 10, fontSize: 14, resize: 'vertical',
              background: '#fff', color: 'var(--text)',
              boxSizing: 'border-box', lineHeight: 1.6,
            }}
          />
          {error && <p style={{ color: '#C0392B', fontSize: 13, marginTop: 6 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 10, marginTop: 12, alignItems: 'center' }}>
            <button type="submit" disabled={loading} style={{
              background: loading ? 'var(--line)' : 'var(--accent)',
              color: loading ? 'var(--text-muted)' : '#fff',
              border: 'none', borderRadius: 9, padding: '11px 22px',
              fontSize: 15, fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {loading ? 'Analysing...' : 'Get Scan Recommendation →'}
            </button>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Powered by Claude AI &middot; Not a medical diagnosis</span>
          </div>
        </form>
      ) : (
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: urgencyConf!.bg, borderRadius: 100,
            padding: '6px 16px', marginBottom: 16,
          }}>
            <span>{urgencyConf!.icon}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: urgencyConf!.color }}>
              {result.urgencyLabel}
            </span>
          </div>

          {result.shouldSeeGPFirst && (
            <div style={{ background: '#FEF9F0', border: '1.5px solid var(--warm)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#7D5A00' }}>
              {result.gpNote ?? 'We recommend seeing your GP before booking this scan.'}
            </div>
          )}

          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 20 }}>
            {result.clinicalSummary}
          </p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Recommended Scans
            </div>
            {result.recommendedScans.map(scan => (
              <div key={scan.code} style={{
                background: 'var(--bg-2)', borderRadius: 10, padding: '12px 16px',
                marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 14 }}>{scan.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{scan.reason}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>from £{scan.priceFrom.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            <div style={{ background: '#FDEDEC', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#922B21', marginBottom: 2 }}>NHS Wait</div>
              <div style={{ fontWeight: 700, color: '#922B21' }}>{result.nhsWaitEstimate}</div>
            </div>
            <div style={{ background: 'var(--accent-light)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--accent-2)', marginBottom: 2 }}>thediagnostic</div>
              <div style={{ fontWeight: 700, color: 'var(--accent-2)' }}>{result.thediagnosticWait}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href={`/book?scan=${result.recommendedScans[0]?.code ?? ''}`} style={{
              background: 'var(--accent)', color: '#fff',
              borderRadius: 9, padding: '11px 20px',
              fontSize: 14, fontWeight: 600, display: 'inline-block',
            }}>
              Book {result.recommendedScans[0]?.name ?? 'Scan'} →
            </Link>
            <button onClick={() => { setResult(null); setSymptoms(''); }} style={{
              background: '#fff', border: '1.5px solid var(--line)', color: 'var(--text-muted)',
              borderRadius: 9, padding: '11px 18px', fontSize: 14, cursor: 'pointer',
            }}>
              Try Again
            </button>
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.5 }}>
            This is an AI recommendation tool, not a medical diagnosis. Always consult a qualified physician before making healthcare decisions.
          </p>
        </div>
      )}
    </div>
  );
}

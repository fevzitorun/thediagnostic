'use client';

import { useState } from 'react';

const SCANS = [
  { id: 'pet-ct',         label: 'PET-CT Scan',        uk: 4000,  ours: 1200, href: '/scan/pet-ct' },
  { id: 'mri-3t',         label: 'MRI 3T',             uk: 1200,  ours: 320,  href: '/scan/mri-3t' },
  { id: 'gammaknife',     label: 'GammaKnife',         uk: 20000, ours: 6500, href: '/scan/gamma-knife' },
  { id: 'spect-ct',       label: 'SPECT-CT',           uk: 2200,  ours: 650,  href: '/scan/spect-ct' },
  { id: 'pet-mri',        label: 'PET-MRI',            uk: 5500,  ours: 1850, href: '/scan/pet-mri' },
  { id: 'whole-body-mri', label: 'Whole Body MRI',     uk: 3200,  ours: 950,  href: '/scan/whole-body-mri' },
];

export default function SavingsCalculator() {
  const [selected, setSelected] = useState(SCANS[0]);

  const saving = selected.uk - selected.ours;
  const pct = Math.round((saving / selected.uk) * 100);
  const barWidth = Math.round((selected.ours / selected.uk) * 100);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      maxWidth: 640,
      margin: '0 auto',
      boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #1a6e94 100%)',
        padding: '28px 32px',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#5DEDE0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          PRICE COMPARISON
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: '#fff', marginBottom: 4 }}>
          Savings Calculator
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
          See how much you save compared to UK private hospitals
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '28px 32px' }}>
        {/* Scan selector */}
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--primary)', marginBottom: 8 }}>
          Select scan type
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {SCANS.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              style={{
                padding: '7px 14px', borderRadius: 100, fontSize: 13,
                fontWeight: selected.id === s.id ? 600 : 400,
                background: selected.id === s.id ? 'var(--accent)' : 'var(--bg-2)',
                color: selected.id === s.id ? '#fff' : 'var(--text)',
                border: '1.5px solid',
                borderColor: selected.id === s.id ? 'var(--accent)' : 'var(--line)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Visual bar comparison */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>thediagnostic</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>£{selected.ours.toLocaleString()}</span>
          </div>
          <div style={{ height: 10, background: 'var(--bg-2)', borderRadius: 100, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{
              height: '100%', width: `${barWidth}%`,
              background: 'linear-gradient(90deg, #17A589, #5DEDE0)',
              borderRadius: 100, transition: 'width 0.4s ease',
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>UK private hospital (avg)</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#c0392b', textDecoration: 'line-through' }}>£{selected.uk.toLocaleString()}</span>
          </div>
          <div style={{ height: 10, background: 'var(--bg-2)', borderRadius: 100, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: '100%',
              background: '#e8c4c4',
              borderRadius: 100,
            }} />
          </div>
        </div>

        {/* Saving callout */}
        <div style={{
          background: '#D1F2EB', border: '1px solid #A2D9CE',
          borderRadius: 12, padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 20,
        }}>
          <div>
            <div style={{ fontSize: 12, color: '#0E6655', fontWeight: 600, marginBottom: 4 }}>YOU SAVE</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: '#0E6655', lineHeight: 1 }}>
              £{saving.toLocaleString()}
            </div>
          </div>
          <div style={{
            background: '#17A589', color: '#fff',
            borderRadius: '50%', width: 72, height: 72,
            display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{pct}%</span>
            <span style={{ fontSize: 10, opacity: 0.8 }}>less</span>
          </div>
        </div>

        <a href={selected.href} style={{
          display: 'block', textAlign: 'center',
          background: 'var(--accent)', color: '#fff',
          borderRadius: 10, padding: '13px 24px',
          fontSize: 15, fontWeight: 600, textDecoration: 'none',
        }}>
          Book {selected.label} →
        </a>
      </div>
    </div>
  );
}

'use client'

import { useState } from 'react'

interface Faq { q: string; a: string }

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1.5px solid #E5E1D8' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', background: 'none', border: 'none',
              padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer', textAlign: 'left', gap: 16, fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: '#082A4A', lineHeight: 1.4 }}>{faq.q}</span>
            <span style={{ fontSize: 20, color: '#0F4C81', flexShrink: 0, transition: 'transform .2s', display: 'inline-block', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
          </button>
          {open === i && (
            <div style={{ paddingBottom: 20, fontSize: 14, color: '#6B6B6B', lineHeight: 1.75 }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

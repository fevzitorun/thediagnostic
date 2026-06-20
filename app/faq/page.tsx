'use client'

import { useState } from 'react'
import Link from 'next/link'

const FAQS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: 'Getting Started',
    items: [
      { q: 'How does thediagnostic work?', a: 'We connect UK patients to leading JCI-accredited hospitals in Istanbul, Turkey. You choose a scan type, we match you to the best clinic, handle pre-registration, and coordinate your travel. Your radiology report is delivered in English within 24 hours of your scan.' },
      { q: 'Is it safe to have a scan abroad?', a: 'Yes. Every partner clinic is JCI-accredited (the international gold standard) and ISO certified. The radiologists are board-certified with international training. Thousands of patients from the UK, EU, and Middle East travel to Istanbul for medical imaging annually.' },
      { q: 'Do I need a GP referral?', a: 'No. Unlike the NHS, you can self-refer for any diagnostic scan. However, if your GP has written a referral letter, please bring it — it gives the radiologist valuable clinical context.' },
    ],
  },
  {
    category: 'Pricing & Payment',
    items: [
      { q: 'How much cheaper is Turkey vs the UK?', a: 'Typically 50–70% cheaper. A PET-CT scan costs around £3,500–5,000 privately in the UK. Our Istanbul partner clinics offer the same technology from £850–1,400. MRI 3T: UK £600–1,500 vs Istanbul from £250. GammaKnife: UK £10,000+ vs Istanbul from £2,500.' },
      { q: 'What is included in the price?', a: 'The scan price includes the procedure, radiologist fee, and your English-language report. Travel, accommodation, and transfer are separate. We offer optional concierge packages that bundle flights, hotel, and airport transfer.' },
      { q: 'How do I pay?', a: 'You pay a deposit online to confirm your booking (Stripe, card, or bank transfer). The remainder is paid directly at the clinic in GBP, EUR, USD, or TRY.' },
    ],
  },
  {
    category: 'Your Scan',
    items: [
      { q: 'How long is the process from booking to scan?', a: 'Typically 3–7 days. After booking, we send your details to the clinic within 24 hours. Most clinics can schedule within 2–4 days. You can often be scanned within a week of enquiring.' },
      { q: 'How do I receive my report?', a: 'Your English-language radiology report is uploaded to your patient portal within 24 hours of your scan. You can download a PDF and share it directly with your GP or specialist.' },
      { q: 'What if I need a follow-up?', a: 'If your report indicates a follow-up is needed, our clinical team flags it as urgent or routine and can help arrange your next steps — whether that\'s a further test in Turkey, or guiding you back to your NHS GP or private specialist in the UK.' },
    ],
  },
  {
    category: 'Travel & Logistics',
    items: [
      { q: 'Do I need a visa to travel to Turkey?', a: 'UK passport holders can enter Turkey visa-free for up to 90 days. No visa application is needed — just your passport (valid at least 6 months beyond your travel date).' },
      { q: 'How long do I need to stay in Istanbul?', a: 'Most patients travel for 2–3 days: arrive, scan next morning, results same evening, fly home. For GammaKnife or complex procedures, 3–5 days is recommended.' },
      { q: 'Can you arrange flights and hotels?', a: 'Yes. Our optional concierge service handles flights (from any UK airport), hotel near the clinic, airport–clinic–hotel transfers, and an English-speaking patient coordinator on the ground.' },
    ],
  },
  {
    category: 'PET-CT Specific',
    items: [
      { q: 'What preparation is needed for a PET-CT?', a: 'Fast for 4–6 hours before your scan (water is fine). Avoid strenuous exercise 24 hours before. Diabetic patients should contact us for special preparation instructions. Wear comfortable, metal-free clothing.' },
      { q: 'Is the PET-CT scan painful?', a: 'No. You receive a small intravenous injection of the radiotracer, then rest for 60 minutes while it distributes through your body. The scan itself takes 20–30 minutes lying still in the scanner. There is no pain.' },
      { q: 'How much radiation does a PET-CT involve?', a: 'Effective dose is approximately 14–25 mSv — roughly equivalent to 5–7 years of natural background radiation. This is a diagnostic study and the clinical benefit for detecting cancer or neurological conditions far outweighs the risk.' },
    ],
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)
  const toggle = (key: string) => setOpen(prev => prev === key ? null : key)

  return (
    <main style={{ minHeight: '100vh', background: '#F6F9FC' }}>
      {/* Hero */}
      <div style={{ background: '#082A4A', padding: '72px 24px 56px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#3AABDB', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>Help Centre</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 44, color: '#fff', marginBottom: 16, letterSpacing: -0.5 }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', maxWidth: 600, margin: '0 auto' }}>
          Everything you need to know about booking a diagnostic scan in Istanbul with thediagnostic.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px' }}>

        {FAQS.map(section => (
          <section key={section.category} style={{ marginBottom: 44 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)', marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #3AABDB', display: 'inline-block' }}>{section.category}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {section.items.map((item, idx) => {
                const key = `${section.category}-${idx}`
                const isOpen = open === key
                return (
                  <div key={key} style={{ background: '#fff', border: `1px solid ${isOpen ? '#3AABDB' : 'var(--line)'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color .15s' }}>
                    <button type="button" onClick={() => toggle(key)} style={{ width: '100%', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)', lineHeight: 1.4 }}>{item.q}</span>
                      <span style={{ fontSize: 20, color: '#3AABDB', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .2s', lineHeight: 1 }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 20px 18px', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>{item.a}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div style={{ background: 'var(--primary)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: '#fff', marginBottom: 10 }}>Still have questions?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', marginBottom: 24 }}>Our patient coordinators answer in under 2 hours.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ padding: '12px 24px', background: '#3AABDB', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Send a message</Link>
            <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', background: '#25D366', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>WhatsApp us</a>
          </div>
        </div>

      </div>
    </main>
  )
}

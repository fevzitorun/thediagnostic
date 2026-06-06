import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PET-CT Scan: UK vs Turkey — Full Comparison 2026 | thediagnostic',
  description:
    'Compare PET-CT scan costs, waiting times, technology, and quality: UK private vs NHS vs Turkey. Full breakdown for 2026. Is it safe? How does it work?',
  keywords: [
    'pet ct uk vs turkey', 'PET CT Turkey cost', 'PET scan abroad vs UK',
    'PET CT Istanbul price comparison', 'NHS PET CT waiting time', 'private PET scan UK cost 2026',
    'medical tourism PET CT', 'is PET CT safe in Turkey', 'PET CT Turkey vs UK NHS',
    'pet ct scan comparison', 'pet scan cost Turkey', 'pet ct medical tourism',
  ],
  openGraph: {
    title: 'PET-CT Scan: UK vs Turkey — Full Comparison 2026 | thediagnostic',
    description: 'Compare PET-CT scan prices, waiting times, and quality between UK (private & NHS) and Turkey. Save up to 73% with same-day availability.',
  },
};

// ─── Data ───────────────────────────────────────────────────

const FULL_COMPARISON = [
  { aspect: 'Price',              ukPrivate: '£3,500–£5,000',     nhs: 'Free (referral needed)', turkey: 'From £1,200' },
  { aspect: 'Waiting time',       ukPrivate: '2–8 weeks',          nhs: '12–18 months',           turkey: '3–7 days' },
  { aspect: 'Referral needed',    ukPrivate: 'Usually required',   nhs: 'Yes, mandatory',         turkey: 'Not required' },
  { aspect: 'Technology',         ukPrivate: 'Mixed (varies)',      nhs: 'Mixed (varies)',         turkey: 'Siemens / GE latest gen' },
  { aspect: 'Accreditation',      ukPrivate: 'CQC regulated',      nhs: 'CQC regulated',          turkey: 'JCI + ISO (top centres)' },
  { aspect: 'Report turnaround',  ukPrivate: '3–5 working days',   nhs: '2–4 weeks (via GP)',     turkey: '24 hours (English)' },
  { aspect: 'Report language',    ukPrivate: 'English',             nhs: 'English',                turkey: 'English (subspecialist)' },
  { aspect: 'Concierge service',  ukPrivate: 'None',                nhs: 'None',                   turkey: 'Available (transfer, hotel)' },
  { aspect: 'Same-day results',   ukPrivate: 'Rare',                nhs: 'No',                     turkey: 'Verbal same-day, written 24h' },
  { aspect: 'International patients', ukPrivate: 'Not organised',  nhs: 'Not applicable',         turkey: 'Dedicated pathway' },
];

const SAFETY_POINTS = [
  {
    icon: '🏥',
    title: 'JCI Accreditation',
    desc: 'Joint Commission International (JCI) is the gold standard for global hospital accreditation — the same body that accredits leading US hospitals. Acıbadem Maslak is JCI-accredited and has held accreditation since 2012.',
  },
  {
    icon: '🔬',
    title: 'Latest-Generation Technology',
    desc: 'Our Istanbul partner clinics use Siemens Biograph mCT Flow and GE Discovery MI PET/CT — the same scanners found in leading UK teaching hospitals. Equipment age and calibration are verified annually.',
  },
  {
    icon: '👨‍⚕️',
    title: 'Subspecialist Radiologists',
    desc: 'Nuclear medicine physicians and radiologists at our partner clinics hold specialist fellowships, many trained in Europe or the US. Reports are reviewed by at least one subspecialist before issue.',
  },
  {
    icon: '🌍',
    title: 'Turkey\'s Medical Tourism Track Record',
    desc: 'Turkey receives over 1.2 million medical tourists per year, with the majority from EU and UK. The Ministry of Health operates a dedicated medical tourism accreditation scheme. Istanbul is consistently ranked in the top 5 global medical tourism destinations.',
  },
  {
    icon: '📋',
    title: 'ISO Certification',
    desc: 'ISO 9001 quality management certification is standard across our partner facilities. Internal audit cycles, incident reporting, and continuous quality improvement programmes are in place.',
  },
  {
    icon: '🤝',
    title: 'UK-Compatible Reports',
    desc: 'All reports follow international reporting standards (RECIST, Deauville, PERCIST where applicable) and are accepted by UK oncologists, haematologists, and GPs. We provide DICOM images and can arrange UK radiologist second opinion.',
  },
];

const COST_BREAKDOWN = [
  { item: 'PET-CT scan (thediagnostic)',  cost: '£1,200', note: 'All-in scan price' },
  { item: 'Return flights London–Istanbul', cost: '£80–£200', note: 'easyJet, Pegasus, TK — 2h10 flight' },
  { item: 'Airport transfer (return)',    cost: '£40–£60',   note: 'Private or shuttle' },
  { item: 'Hotel (1 night, central)',     cost: '£60–£120',  note: 'Optional — many fly same-day' },
  { item: 'TOTAL',                         cost: '£1,380–£1,580', note: 'vs UK private £3,500–£5,000' },
];

const UK_PRIVATE_TOTAL = { min: 3500, max: 5000 };

const JOURNEY_STEPS = [
  { icon: '💻', step: '1', title: 'Book online in minutes', desc: 'Select your scan, preferred clinic, and dates via thediagnostic. No GP referral needed. Confirmation within 4 hours.' },
  { icon: '✈️', step: '2', title: 'Fly London → Istanbul', desc: '2 hours 10 minutes. Multiple daily flights from Gatwick, Stansted, Heathrow. Prices from £40 one-way with Pegasus or easyJet.' },
  { icon: '🏥', step: '3', title: 'Scan at JCI clinic', desc: 'Our concierge meets you at the airport. Transfer to clinic. PET-CT takes approximately 2 hours including uptake time. Same-day verbal result.' },
  { icon: '📄', step: '4', title: 'Report in 24 hours', desc: 'Full English subspecialist report delivered to your portal before you land back in the UK. Share directly with your oncologist or GP.' },
  { icon: '🏠', step: '5', title: 'Home the same day', desc: 'Most patients fly back the same evening. The FDG radiotracer is eliminated within hours. You can fly without restriction. We provide a medical travel certificate.' },
];

const FAQS = [
  {
    q: 'Is it risky to have a PET-CT scan in Turkey instead of the UK?',
    a: 'No — the clinical risk is equivalent to having a PET-CT scan in a UK private hospital, provided you choose a properly accredited centre. Both Acıbadem Maslak (JCI) and HSM Radyoloji (ISO) meet international standards. The radiopharmaceuticals, scanner calibration, and reporting methodology are identical to UK practice.',
  },
  {
    q: 'Will my health insurance cover a PET-CT scan in Turkey?',
    a: 'Most UK private health insurance policies (Bupa, AXA, Aviva) do not cover planned overseas treatment. However, if you are self-funding, the total cost including flights and hotel is typically 60–70% less than a UK private PET-CT scan alone. Some international health policies (Cigna Global, ALC Health) do cover treatment in Turkey — check your policy.',
  },
  {
    q: 'Will my UK oncologist or GP accept a report from a Turkish clinic?',
    a: 'Yes. Subspecialist nuclear medicine reports in standard English with DICOM images are accepted by UK oncologists, haematologists, and GPs. The reports follow international staging criteria (RECIST 1.1, Deauville 5-point scale for lymphoma) and are clinically equivalent to UK private reports. If your specialist requires a UK second opinion, we can arrange this for an additional fee.',
  },
  {
    q: 'Can I go back to the NHS after a private PET-CT in Turkey?',
    a: 'Yes, absolutely. Having a private scan abroad does not affect your NHS entitlement. Many patients use thediagnostic to get a faster diagnosis and then return to NHS care for treatment. Your UK oncologist can use the Turkish report and DICOM images to fast-track your NHS pathway.',
  },
  {
    q: 'How do I prepare for a PET-CT scan — does it matter that I\'m abroad?',
    a: 'Preparation is identical regardless of where you have the scan: fast for 6 hours, no strenuous exercise for 24 hours, take regular medications with water, bring a list of all medications. We send a full preparation guide in English at the time of booking. Diabetic patients should contact us in advance for special preparation advice.',
  },
];

// ─── Page ────────────────────────────────────────────────────

export default function PetCtUkVsTurkeyPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0E2F48 0%, #1B4F72 60%, #17A589 100%)',
          padding: '80px 24px 64px',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link>
              {' / '}
              <Link href="/compare" style={{ color: 'rgba(255,255,255,0.5)' }}>Compare</Link>
              {' / '}
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>PET-CT: UK vs Turkey</span>
            </div>

            <div style={{ maxWidth: 800 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(23,165,137,0.2)', border: '1px solid rgba(23,165,137,0.35)',
                borderRadius: 100, padding: '5px 14px', marginBottom: 20,
              }}>
                <span style={{ fontSize: 16 }}>📊</span>
                <span style={{ color: '#5DEDE0', fontSize: 13, fontWeight: 500 }}>Full Comparison · Updated 2026</span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(30px, 4.5vw, 56px)',
                color: '#fff', lineHeight: 1.1, marginBottom: 16,
              }}>
                PET-CT Scan: UK vs Turkey<br />
                <span style={{ color: '#5DEDE0' }}>Full Comparison 2026</span>
              </h1>

              <p style={{
                fontSize: 18, color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.7, maxWidth: 620, marginBottom: 32,
              }}>
                UK private PET-CT starts at £3,500 with a 2–8 week wait. NHS PET-CT means 12–18 months.
                Istanbul PET-CT through thediagnostic costs from £1,200 and is available within 3–7 days.
                Here is the full comparison.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/book?scan=pet_ct" style={{
                  background: 'var(--accent)', color: '#fff',
                  padding: '13px 26px', borderRadius: 9,
                  fontSize: 16, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  Book PET-CT in Istanbul →
                </Link>
                <Link href="/scan/pet-ct" style={{
                  background: 'rgba(255,255,255,0.1)', color: '#fff',
                  padding: '13px 26px', borderRadius: 9,
                  fontSize: 16, fontWeight: 500, border: '1px solid rgba(255,255,255,0.2)',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  PET-CT Scan Details
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL COMPARISON TABLE ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                DETAILED COMPARISON
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--primary)', marginBottom: 8 }}>
                UK Private vs NHS vs Turkey — Side by Side
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                All figures based on 2026 market data. Turkey prices reflect thediagnostic partner clinics.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '14px 16px', background: 'var(--bg-2)', color: 'var(--text-muted)', fontWeight: 600, minWidth: 160 }}>Aspect</th>
                    <th style={{ textAlign: 'left', padding: '14px 16px', background: 'var(--bg-2)', color: 'var(--text)', fontWeight: 600, minWidth: 160 }}>🇬🇧 UK Private</th>
                    <th style={{ textAlign: 'left', padding: '14px 16px', background: 'var(--bg-2)', color: 'var(--text)', fontWeight: 600, minWidth: 160 }}>🇬🇧 NHS</th>
                    <th style={{ textAlign: 'left', padding: '14px 16px', background: 'var(--accent-light)', color: 'var(--accent-2)', fontWeight: 700, minWidth: 200 }}>🇹🇷 thediagnostic</th>
                  </tr>
                </thead>
                <tbody>
                  {FULL_COMPARISON.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '13px 16px', fontWeight: 600, color: 'var(--text)', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>{row.aspect}</td>
                      <td style={{ padding: '13px 16px', color: 'var(--text-muted)', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>{row.ukPrivate}</td>
                      <td style={{ padding: '13px 16px', color: row.nhs.includes('month') ? '#C0392B' : 'var(--text-muted)', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>{row.nhs}</td>
                      <td style={{ padding: '13px 16px', color: 'var(--accent-2)', fontWeight: 500, background: i % 2 === 0 ? '#f0fdf9' : '#e8f8f4' }}>✓ {row.turkey}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── IS TURKISH HEALTHCARE SAFE ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                SAFETY & QUALITY
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)', marginBottom: 10 }}>
                Is Turkish Healthcare Safe?
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
                The short answer is: yes, at accredited centres. Here is why our UK patients are confident choosing Istanbul.
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20,
            }}>
              {SAFETY_POINTS.map(item => (
                <div key={item.title} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 12, padding: 24,
                  display: 'flex', gap: 16,
                }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--primary)', marginBottom: 6 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TYPICAL PATIENT JOURNEY ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                PATIENT JOURNEY
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)' }}>
                How It Works — London to Istanbul and Back
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {JOURNEY_STEPS.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  padding: '20px 0',
                  borderBottom: i < JOURNEY_STEPS.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #1B4F72, #17A589)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                      Step {item.step}
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 16, marginBottom: 6 }}>
                      {item.title}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COST BREAKDOWN ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                COST BREAKDOWN
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)', marginBottom: 8 }}>
                Total Trip Cost vs UK Private
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                Even when you add flights and hotel, a PET-CT trip to Istanbul costs less than the UK scan alone.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {COST_BREAKDOWN.map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  gap: 16, alignItems: 'center',
                  padding: '16px 20px',
                  background: i === COST_BREAKDOWN.length - 1
                    ? 'linear-gradient(90deg, var(--accent-light), #fff)'
                    : i % 2 === 0 ? '#fff' : 'var(--bg)',
                  border: i === COST_BREAKDOWN.length - 1 ? '2px solid var(--accent)' : '1px solid var(--line)',
                  borderRadius: i === 0 ? '12px 12px 0 0' : i === COST_BREAKDOWN.length - 1 ? '0 0 12px 12px' : '0',
                  marginTop: i === 0 ? 0 : -1,
                }}>
                  <div>
                    <div style={{
                      fontWeight: i === COST_BREAKDOWN.length - 1 ? 700 : 500,
                      color: i === COST_BREAKDOWN.length - 1 ? 'var(--accent-2)' : 'var(--text)',
                      fontSize: 15,
                    }}>
                      {row.item}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{row.note}</div>
                  </div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: i === COST_BREAKDOWN.length - 1 ? 20 : 16,
                    color: i === COST_BREAKDOWN.length - 1 ? 'var(--accent-2)' : 'var(--primary)',
                    textAlign: 'right',
                  }}>
                    {row.cost}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 24, background: '#fff', border: '1px solid var(--line)',
              borderRadius: 12, padding: 20,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                  🇬🇧 UK Private PET-CT (scan only, no travel)
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>No flights, no hotel. Just the scan.</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: 14 }}>
                  £{UK_PRIVATE_TOTAL.min.toLocaleString()}–£{UK_PRIVATE_TOTAL.max.toLocaleString()}
                </div>
                <div style={{ fontSize: 13, color: '#C0392B', fontWeight: 600, marginTop: 2 }}>+ 2–8 week wait</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                FAQ
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)' }}>
                PET-CT UK vs Turkey — Questions Answered
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 12, padding: 24,
                }}>
                  <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 15, marginBottom: 10 }}>
                    Q: {faq.q}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg-2)' }}>
          <div style={{
            maxWidth: 700, margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-2) 100%)',
            borderRadius: 20, padding: '52px 40px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3.5vw, 38px)', color: '#fff', marginBottom: 12 }}>
              Book Your PET-CT in Istanbul
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
              Available within 3–7 days. English subspecialist report in 24 hours.
              From £1,200 all-in — save up to 70% vs UK private. No referral needed.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/book?scan=pet_ct" style={{
                background: '#fff', color: 'var(--primary)',
                borderRadius: 9, padding: '13px 26px',
                fontSize: 16, fontWeight: 700, display: 'inline-block',
              }}>
                Book PET-CT in Istanbul →
              </Link>
              <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer"
                style={{
                  background: '#25D366', color: '#fff',
                  borderRadius: 9, padding: '13px 26px',
                  fontSize: 16, fontWeight: 600, display: 'inline-block',
                }}>
                WhatsApp Us
              </a>
            </div>

            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <Link href="/scan/pet-ct" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                Read the full PET-CT scan guide →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

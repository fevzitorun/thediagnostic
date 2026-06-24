import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getClinicsByScan } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'Whole Body MRI in Turkey — From £950 | thediagnostic',
  description: 'Book a whole-body MRI scan in Istanbul. Complete head-to-toe screening with no radiation. JCI-accredited clinics, 3T Siemens/Philips scanners, GMC radiologist report in English within 24h.',
  keywords: 'whole body MRI Turkey, full body MRI Istanbul, total body MRI UK alternative, whole body MRI cost Turkey',
  openGraph: {
    title: 'Whole Body MRI Turkey — From £950 (UK avg £3,500+)',
    description: 'Head-to-toe cancer screening with no radiation. JCI-accredited Istanbul clinics. English report 24h.',
    url: 'https://thediagnostic.co.uk/scan/whole-body-mri',
  },
};

const CLINICS = getClinicsByScan('mri_whole_body').slice(0, 6).map(c => {
  const scan = c.featuredScans.find(s => s.code === 'mri_whole_body') || c.featuredScans.find(s => s.code === 'mri_3t')!;
  return { slug: c.slug, name: c.name, city: c.city, group: c.group, jci: c.jciAccredited, iso: c.isoAccredited, device: scan.deviceName, priceGbp: scan.code === 'mri_3t' ? 950 : scan.priceGbp, ukPriceGbp: 3500 };
});

const PROTOCOL_AREAS = [
  { area: 'Brain & Head', what: 'Intracranial tumours, vascular anomalies, white matter lesions, pituitary adenoma' },
  { area: 'Neck', what: 'Lymph nodes, thyroid, salivary glands, cervical spine' },
  { area: 'Chest', what: 'Mediastinal masses, pleural disease, breast screening (if indicated), cardiac (limited)' },
  { area: 'Abdomen', what: 'Liver lesions, pancreatic pathology, adrenal masses, renal tumours, spleen' },
  { area: 'Pelvis', what: 'Prostate, bladder, uterus, ovaries, rectal pathology, lymph nodes' },
  { area: 'Musculoskeletal', what: 'Bone marrow infiltration, skeletal metastases, major joint pathology' },
];

const UK_VS_TR = [
  { label: 'Price', uk: '£2,500 – £4,500', tr: 'From £950', winner: 'tr' },
  { label: 'Wait time', uk: '2 – 8 weeks (private)', tr: '3 – 7 days', winner: 'tr' },
  { label: 'Radiation', uk: 'None (MRI)', tr: 'None (MRI)', winner: 'equal' },
  { label: 'Scanner', uk: '1.5T or 3T', tr: '3T — Siemens MAGNETOM / Philips Ingenia', winner: 'tr' },
  { label: 'Report turnaround', uk: '3 – 7 days', tr: '24 – 48 hours', winner: 'tr' },
  { label: 'JCI accreditation', uk: 'Rare', tr: 'Standard at our partners', winner: 'tr' },
];

export default function WholeBodyMriPage() {
  const cheapest = CLINICS.length > 0 ? Math.min(...CLINICS.map(c => c.priceGbp)) : 950;
  const avgUk = 3500;
  const saving = Math.round(((avgUk - cheapest) / avgUk) * 100);

  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: 'linear-gradient(135deg, #061E32 0%, #082A4A 55%, #0B3565 100%)', padding: '72px 24px 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              <Link href="/" style={{ color: 'inherit' }}>Home</Link><span>/</span>
              <Link href="/scan" style={{ color: 'inherit' }}>Scan Types</Link><span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Whole Body MRI</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(58,171,219,0.15)', border: '1px solid rgba(58,171,219,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3AABDB', display: 'inline-block' }} />
                  <span style={{ color: '#3AABDB', fontSize: 13, fontWeight: 500 }}>Complete Screening · No Radiation</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>Whole Body MRI in Turkey</h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
                  Complete head-to-toe health screening with 3 Tesla MRI — no radiation, no contrast required. JCI-accredited clinics in Istanbul. GMC-registered radiologist report in English. Up to {saving}% cheaper than UK private.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link href="/book?scan=mri_whole_body" style={{ background: '#17A589', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Find Available Slots →</Link>
                  <a href="https://wa.me/447700000000?text=Whole%20body%20MRI%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15 }}>Ask on WhatsApp</a>
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[{ value: `From £${cheapest}`, label: 'thediagnostic price' }, { value: `Save ${saving}%`, label: 'vs UK private avg' }, { value: '3–7 days', label: 'appointment wait' }, { value: 'No radiation', label: 'safe for all ages' }].map(s => (
                    <div key={s.label} style={{ borderLeft: '2px solid rgba(58,171,219,0.35)', paddingLeft: 14 }}>
                      <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#3AABDB', fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '28px 24px', minWidth: 220, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>From</div>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#3AABDB', lineHeight: 1, marginBottom: 4 }}>£{cheapest}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>UK avg: <span style={{ textDecoration: 'line-through' }}>£{avgUk.toLocaleString()}</span></div>
                {['Head to toe in 1 session', '3T scanner — no radiation', 'Subspecialist report', 'English report, 24–48h', 'GP letter included'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                    <span style={{ color: '#17A589', fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
                <Link href="/book?scan=mri_whole_body" style={{ display: 'block', background: '#17A589', color: '#fff', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, textAlign: 'center', marginTop: 20 }}>Book Now</Link>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>WHAT IS COVERED</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Areas Imaged — Head to Toe</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 540, margin: '0 auto' }}>Standard whole-body MRI protocol covers all major organ systems in a single 90–120 minute session.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {PROTOCOL_AREAS.map((a, i) => (
                <div key={a.area} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '20px 20px 20px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'var(--brand-blue)' }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-blue)', letterSpacing: '0.1em', marginBottom: 6 }}>0{i+1}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 6 }}>{a.area}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{a.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRICE COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>UK Private vs Turkey — Whole Body MRI</h2>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', borderRadius: '10px 0 0 0', fontWeight: 600 }}>Criteria</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 600 }}>🇬🇧 UK Private</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', borderRadius: '0 10px 0 0', fontWeight: 600 }}>🇹🇷 thediagnostic</th>
                </tr>
              </thead>
              <tbody>
                {UK_VS_TR.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 500 }}>{row.label}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', color: row.winner === 'tr' ? 'var(--text-muted)' : 'var(--text)' }}>{row.uk}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <span style={{ color: row.winner === 'tr' ? '#17A589' : 'var(--text)', fontWeight: row.winner === 'tr' ? 700 : 400 }}>{row.winner === 'tr' && '✓ '}{row.tr}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '52px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 4vw, 38px)', color: '#fff', marginBottom: 14 }}>Ready to Book Your Whole Body MRI?</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>Appointments within 3–7 days. No referral needed. Complete report within 48 hours.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=mri_whole_body" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>Find Available Slots →</Link>
                <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>Ask on WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

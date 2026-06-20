import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getClinicsWithScan } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'PET-MRI Scan in Turkey — From £1,850 | thediagnostic',
  description: 'Book simultaneous PET-MRI at JCI-accredited hospitals in Istanbul. Siemens Biograph mMR — the world\'s most advanced hybrid scanner. Up to 66% cheaper than UK. Report in English 24h.',
  keywords: 'PET MRI Turkey, PET-MRI Istanbul, simultaneous PET MRI scan, Siemens Biograph mMR Turkey, PET MRI cost UK alternative',
  openGraph: {
    title: 'PET-MRI Scan Turkey — From £1,850 (UK avg £5,500+)',
    description: 'Siemens Biograph mMR simultaneous PET-MRI at JCI-accredited Istanbul hospitals. Report in English 24h.',
    url: 'https://thediagnostic.co.uk/scan/pet-mri',
  },
};

const PETMRI_CLINICS = getClinicsWithScan('pet_mri').flatMap(c => {
  const scan = c.featuredScans.find(s => s.code === 'pet_mri');
  if (!scan) return [];
  return [{ slug: c.slug, name: c.name, city: c.city, group: c.group, jci: c.jciAccredited, iso: c.isoAccredited, device: scan.deviceName, priceGbp: scan.priceGbp, ukPriceGbp: scan.ukPriceGbp, rating: c.rating }];
});

const UK_VS_TR = [
  { label: 'Price', uk: '£4,500 – £7,000', tr: 'From £1,850', winner: 'tr' },
  { label: 'Wait time', uk: '4 – 20 weeks (private)', tr: '5 – 10 days', winner: 'tr' },
  { label: 'Scanner', uk: 'Varies (sequential scan)', tr: 'Siemens Biograph mMR (simultaneous)', winner: 'tr' },
  { label: 'Radiation dose', uk: 'Standard PET + CT', tr: 'Lower — CT replaced by MRI', winner: 'tr' },
  { label: 'Soft tissue detail', uk: 'CT (limited)', tr: 'Full 3T MRI quality', winner: 'tr' },
  { label: 'JCI accreditation', uk: 'Rare', tr: 'Standard at our partners', winner: 'tr' },
  { label: 'Concierge service', uk: 'None', tr: 'Flight + hotel + transfer', winner: 'tr' },
];

const FAQ = [
  { q: 'What is PET-MRI and how is it different from PET-CT?', a: 'PET-MRI combines metabolic imaging (PET) with the superior soft-tissue contrast of 3T MRI — simultaneously, in one scan session. PET-CT pairs PET with X-ray CT (good for anatomy, lower radiation). PET-MRI is preferred when superior soft tissue detail is critical: brain tumours, prostate cancer, head & neck, paediatric oncology, and liver staging. It also delivers a lower radiation dose since CT is replaced by MRI.' },
  { q: 'Is PET-MRI better than PET-CT?', a: 'For certain indications, yes. PET-MRI outperforms PET-CT in: brain and spinal lesions, head & neck cancer, prostate cancer staging, liver and pelvic metastases, paediatric tumours (lower radiation). PET-CT remains preferred for lung and chest disease due to MRI motion artefacts. Our clinical team will advise which is most appropriate for your case.' },
  { q: 'Who is PET-MRI indicated for?', a: 'PET-MRI is particularly valuable for: known or suspected prostate cancer, brain and CNS tumours, head and neck cancer staging, paediatric oncology (minimising radiation), complex liver staging, and research protocols. Contraindications are the same as standard MRI (metallic implants, pacemakers).' },
  { q: 'Will my UK oncologist accept the report?', a: 'Yes. Reports are produced by subspecialist radiologists and nuclear medicine physicians in English, using DICOM-compatible formats. We liaise directly with your UK consultant on request.' },
  { q: 'How long does a PET-MRI take?', a: 'Longer than PET-CT — typically 60–90 minutes in the scanner, plus 60 minutes tracer uptake. Total clinic time is approximately 3 hours. The scan itself is silent and painless.' },
  { q: 'What is included in the price?', a: 'Tracer injection (F-18 FDG), full scan session, subspecialist radiology report in English, DICOM images, and GP letter template. Specific MRI sequences (e.g. DWI, DCE-MRI) may be quoted additionally depending on clinical protocol.' },
];

export default function PetMriPage() {
  const cheapest = PETMRI_CLINICS.length > 0 ? Math.min(...PETMRI_CLINICS.map(c => c.priceGbp)) : 1850;
  const avgUk = 5500;
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
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>PET-MRI</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(27,79,114,0.4)', border: '1px solid rgba(27,79,114,0.6)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#85C1E9', display: 'inline-block' }} />
                  <span style={{ color: '#85C1E9', fontSize: 13, fontWeight: 500 }}>Premium · Simultaneous PET + 3T MRI</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>PET-MRI Scan in Turkey</h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
                  The world&apos;s most advanced hybrid scanner — simultaneous metabolic PET imaging combined with full 3T MRI soft-tissue resolution. At JCI-accredited hospitals in Istanbul. Up to {saving}% cheaper than UK private hospitals.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link href="/book?scan=pet_mri" style={{ background: '#17A589', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Find Available Slots →</Link>
                  <a href="https://wa.me/447700000000?text=PET-MRI%20scan%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 500 }}>Ask on WhatsApp</a>
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[{ value: `From £${cheapest.toLocaleString()}`, label: 'thediagnostic price' }, { value: `Save ${saving}%`, label: 'vs UK private avg' }, { value: '5–10 days', label: 'appointment wait' }, { value: 'Lower dose', label: 'vs PET-CT' }].map(s => (
                    <div key={s.label} style={{ borderLeft: '2px solid rgba(133,193,233,0.4)', paddingLeft: 14 }}>
                      <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#85C1E9', fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '28px 24px', minWidth: 220, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>From</div>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#85C1E9', lineHeight: 1, marginBottom: 4 }}>£{cheapest.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>UK private avg: <span style={{ textDecoration: 'line-through' }}>£{avgUk.toLocaleString()}</span></div>
                {['Tracer + simultaneous scan', 'GMC radiologist report', 'English report, 24h', 'GP letter template', 'DICOM images'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                    <span style={{ color: '#17A589', fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
                <Link href="/book?scan=pet_mri" style={{ display: 'block', background: '#17A589', color: '#fff', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, textAlign: 'center', marginTop: 20 }}>Book PET-MRI Now</Link>
              </div>
            </div>
          </div>
        </section>

        <div style={{ background: '#0B3565', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['✓ JCI-Accredited Hospitals', '✓ Siemens Biograph mMR', '✓ Simultaneous PET + 3T MRI', '✓ Lower Radiation vs PET-CT', '✓ English Report · 24h'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{t}</span>
            ))}
          </div>
        </div>

        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRICE COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>UK Private vs Turkey — PET-MRI</h2>
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

        {PETMRI_CLINICS.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER HOSPITALS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Where to Get Your PET-MRI</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {PETMRI_CLINICS.map(clinic => {
                  const savedPct = Math.round(((clinic.ukPriceGbp - clinic.priceGbp) / clinic.ukPriceGbp) * 100);
                  return (
                    <div key={clinic.slug} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                      <div style={{ background: 'var(--primary)', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{clinic.name}</h3>
                          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{clinic.city}, Turkey · {clinic.group}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {clinic.jci && <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>JCI</span>}
                          {clinic.iso && <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>ISO</span>}
                        </div>
                      </div>
                      <div style={{ padding: 20 }}>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Scanner</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 16 }}>{clinic.device}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-2)', borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
                          <div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>PET-MRI from</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{clinic.priceGbp.toLocaleString()}</div></div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>UK £{clinic.ukPriceGbp.toLocaleString()}</div>
                            <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginTop: 2 }}>Save {savedPct}%</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link href={`/clinics/${clinic.slug}`} style={{ flex: 1, background: 'var(--primary)', color: '#fff', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>View Hospital</Link>
                          <Link href={`/book?scan=pet_mri&clinic=${clinic.slug}`} style={{ flex: 1, border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>Book Slot</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Common Questions About PET-MRI</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQ.map(item => (
                <div key={item.q} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>{item.q}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: 14 }}>Ready to Book Your PET-MRI?</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>Appointments within 5–10 days. No referral needed. UK-standard report within 24 hours.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=pet_mri" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>Find Available Slots →</Link>
                <a href="https://wa.me/447700000000?text=PET-MRI%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>Ask on WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

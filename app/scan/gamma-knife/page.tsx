import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getClinicsWithScan } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'GammaKnife Radiosurgery in Turkey — From £6,500 | thediagnostic',
  description: 'Book Leksell GammaKnife radiosurgery in Istanbul. Non-invasive brain tumour treatment at JCI-accredited hospitals. Up to 70% cheaper than UK. Day procedure, no incision.',
  keywords: 'GammaKnife Turkey, stereotactic radiosurgery Istanbul, brain tumour treatment Turkey, Leksell Gamma Knife Esprit Turkey',
  openGraph: {
    title: 'GammaKnife Radiosurgery Turkey — From £6,500 (UK avg £20,000+)',
    description: 'Leksell Gamma Knife Esprit at JCI-accredited Istanbul hospitals. No incision. Day procedure.',
    url: 'https://thediagnostic.co.uk/scan/gamma-knife',
  },
};

const GK_CLINICS = getClinicsWithScan('gamma_knife').flatMap(c => {
  const scan = c.featuredScans.find(s => s.code === 'gamma_knife');
  if (!scan) return [];
  return [{ slug: c.slug, name: c.name, city: c.city, group: c.group, jci: c.jciAccredited, iso: c.isoAccredited, device: scan.deviceName, priceGbp: scan.priceGbp, ukPriceGbp: scan.ukPriceGbp, rating: c.rating }];
});

const UK_VS_TR = [
  { label: 'Price', uk: '£18,000 – £25,000', tr: 'From £6,500', winner: 'tr' },
  { label: 'Wait time', uk: '3 – 12 months (NHS)', tr: '5 – 14 days', winner: 'tr' },
  { label: 'System', uk: 'Varies', tr: 'Leksell Gamma Knife Esprit / Perfexion', winner: 'tr' },
  { label: 'Incision required', uk: 'No', tr: 'No', winner: 'equal' },
  { label: 'Hospital stay', uk: '1 day', tr: 'Day procedure', winner: 'equal' },
  { label: 'JCI accreditation', uk: 'Rare', tr: 'Standard at our partners', winner: 'tr' },
  { label: 'Concierge service', uk: 'None', tr: 'Flight + hotel + transfer', winner: 'tr' },
];

const FAQ = [
  { q: 'What is GammaKnife radiosurgery?', a: 'Leksell GammaKnife delivers precise gamma radiation beams to a brain lesion — without any incision. It treats tumours, metastases, AVMs, trigeminal neuralgia, and acoustic neuromas. No scalpel, no anaesthesia, no hospital admission.' },
  { q: 'Who is a candidate?', a: 'GammaKnife is indicated for lesions up to ~3.5 cm. Conditions include brain metastases (1–3 lesions), AVMs, acoustic neuromas, pituitary adenomas, meningiomas, and trigeminal neuralgia. Our neurosurgeon reviews your MRI and confirms candidacy within 24 hours.' },
  { q: 'Will my UK oncologist accept the records?', a: 'Yes. All treatment planning documents and dose reports are produced in English to DICOM-compatible standards. Our neurosurgeons liaise directly with your UK consultant.' },
  { q: 'Is GammaKnife painful?', a: 'The procedure is painless. A lightweight stereotactic frame is fitted under local anaesthetic — mild discomfort only. The radiation delivery (30–90 minutes) is silent and pain-free.' },
  { q: 'How many sessions are needed?', a: 'Standard: single fraction (one day). Larger lesions or multiple metastases may require 3–5 fraction hypofractionated radiosurgery. Your team will advise during treatment planning.' },
  { q: 'What is the success rate?', a: 'Local tumour control for brain metastases: 85–95% at 1 year (RTOG 9005). AVM obliteration: 70–85% at 3 years. Acoustic neuroma growth control: >95%. Results match leading UK centres using the same Leksell platform.' },
  { q: 'What happens after treatment?', a: 'Monitored 2–4 hours, discharged same day. Follow-up MRI at 3 months. Our team coordinates with your UK GP or neurologist for ongoing management.' },
  { q: 'How do I prepare?', a: 'Avoid blood-thinning medications 5 days prior. Bring all brain MRI DICOM files. No fasting required. Arrange an adult companion. Our concierge coordinates travel, accommodation, and appointments.' },
];

const STEPS = [
  { step: '01', title: 'Send your MRI', desc: 'Upload existing brain MRI DICOM files. Our neurosurgeon reviews suitability within 24 hours — no commitment.' },
  { step: '02', title: 'Treatment planning', desc: 'Arrive 1 day early. CT + MRI fusion for precise 3D dose planning. Usually 2–3 hours.' },
  { step: '03', title: 'Frame fitting', desc: 'Lightweight stereotactic frame under local anaesthetic. Mildly uncomfortable, not painful.' },
  { step: '04', title: 'GammaKnife treatment', desc: 'Radiation delivery: 30–90 minutes. Completely painless. Staff monitor you throughout.' },
  { step: '05', title: 'Recovery + discharge', desc: 'Monitored 2–4 hours. Mild fatigue normal. Most patients fly home next day.' },
  { step: '06', title: 'Follow-up MRI', desc: 'Scheduled at 3 months. We coordinate reporting with your UK oncologist or neurologist.' },
];

export default function GammaKnifePage() {
  const cheapest = GK_CLINICS.length > 0 ? Math.min(...GK_CLINICS.map(c => c.priceGbp)) : 6500;
  const avgUk = 20000;
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
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>GammaKnife</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(230,126,34,0.15)', border: '1px solid rgba(230,126,34,0.35)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E67E22', display: 'inline-block' }} />
                  <span style={{ color: '#E67E22', fontSize: 13, fontWeight: 500 }}>Advanced Treatment · Radiosurgery</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>GammaKnife Radiosurgery<br />in Turkey</h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
                  Non-invasive brain tumour treatment at JCI-accredited hospitals in Istanbul. Leksell Gamma Knife Esprit. No incision, no general anaesthesia. Day procedure. Up to {saving}% cheaper than UK private hospitals.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link href="/book?scan=gamma_knife" style={{ background: '#17A589', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Request Assessment →</Link>
                  <a href="https://wa.me/447700000000?text=GammaKnife%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 500 }}>Ask on WhatsApp</a>
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[{ value: `From £${cheapest.toLocaleString()}`, label: 'thediagnostic price' }, { value: `Save ${saving}%`, label: 'vs UK private avg' }, { value: '5–14 days', label: 'to appointment' }, { value: 'Day procedure', label: 'no hospital stay' }].map(s => (
                    <div key={s.label} style={{ borderLeft: '2px solid rgba(230,126,34,0.4)', paddingLeft: 14 }}>
                      <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#E67E22', fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '28px 24px', minWidth: 220, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>From</div>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#E67E22', lineHeight: 1, marginBottom: 4 }}>£{cheapest.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>UK private avg: <span style={{ textDecoration: 'line-through' }}>£{avgUk.toLocaleString()}</span></div>
                {['Full planning + treatment', 'Neurosurgeon consultation', 'English treatment report', 'DICOM files included', 'UK oncologist liaison'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                    <span style={{ color: '#17A589', fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
                <Link href="/book?scan=gamma_knife" style={{ display: 'block', background: '#17A589', color: '#fff', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, textAlign: 'center', marginTop: 20 }}>Request Assessment</Link>
              </div>
            </div>
          </div>
        </section>

        <div style={{ background: '#0B3565', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['✓ JCI-Accredited Hospitals', '✓ Leksell Gamma Knife Esprit', '✓ No Incision · No Anaesthesia', '✓ Day Procedure', '✓ English Report Included'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{t}</span>
            ))}
          </div>
        </div>

        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRICE COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>UK Private vs Turkey — GammaKnife</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Same Leksell platform. Same clinical outcomes. Dramatically different cost.</p>
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

        {GK_CLINICS.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER HOSPITALS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Where to Get GammaKnife Treatment</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {GK_CLINICS.map(clinic => {
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
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>System</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 16 }}>{clinic.device}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-2)', borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
                          <div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Treatment from</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{clinic.priceGbp.toLocaleString()}</div></div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>UK £{clinic.ukPriceGbp.toLocaleString()}</div>
                            <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginTop: 2 }}>Save {savedPct}%</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link href={`/clinics/${clinic.slug}`} style={{ flex: 1, background: 'var(--primary)', color: '#fff', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>View Hospital</Link>
                          <Link href={`/book?scan=gamma_knife&clinic=${clinic.slug}`} style={{ flex: 1, border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>Book Slot</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>THE PROCESS</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>From Enquiry to Treatment in 6 Steps</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {STEPS.map(step => (
                <div key={step.step} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 24px 24px 28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: '#E67E22' }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#E67E22', letterSpacing: '0.1em', marginBottom: 8 }}>STEP {step.step}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Common Questions About GammaKnife</h2>
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
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: 14 }}>Ready to Explore GammaKnife?</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>Send us your MRI. Our neurosurgeon confirms candidacy within 24 hours — no commitment required.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=gamma_knife" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>Request Free Assessment →</Link>
                <a href="https://wa.me/447700000000?text=GammaKnife%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>Ask on WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

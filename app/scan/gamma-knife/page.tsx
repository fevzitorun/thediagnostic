import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedClinics } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'GammaKnife Radiosurgery in Turkey — From £6,500 | thediagnostic',
  description:
    'Book GammaKnife stereotactic radiosurgery in Istanbul. No incision, no anaesthesia, day procedure. Up to 68% cheaper than UK private. Leksell GammaKnife Esprit/Perfexion. Report in English within 24h.',
  keywords: 'GammaKnife Turkey, GammaKnife Istanbul, stereotactic radiosurgery cost UK, brain tumour radiosurgery Turkey, Leksell GammaKnife cheap',
  openGraph: {
    title: 'GammaKnife Radiosurgery Turkey — From £6,500 (UK avg £20,000+)',
    description: 'Non-invasive brain tumour treatment at JCI-accredited clinics in Istanbul. No surgery. No overnight stay. Results within days.',
    url: 'https://thediagnostic.co.uk/scan/gamma-knife',
  },
};

// ─── Data ──────────────────────────────────────────────────────

const GK_CLINICS = getFeaturedClinics()
  .filter(c => c.featuredScans.some(s => s.code === 'gamma_knife'))
  .slice(0, 6)
  .map(c => {
    const scan = c.featuredScans.find(s => s.code === 'gamma_knife')!;
    return {
      slug: c.slug,
      name: c.name,
      city: c.city,
      group: c.group,
      jci: c.jciAccredited,
      iso: c.isoAccredited,
      device: scan.deviceName,
      priceGbp: scan.priceGbp,
      ukPriceGbp: scan.ukPriceGbp,
      rating: c.rating,
      badge: c.highlightBadge,
    };
  });

const UK_VS_TR = [
  { label: 'Price',               uk: '£18,000 – £25,000',         tr: 'From £6,500',                winner: 'tr' },
  { label: 'Wait time',           uk: '3 – 9 months',              tr: '3 – 10 days',                winner: 'tr' },
  { label: 'Device',              uk: 'Varies',                    tr: 'Leksell GammaKnife Esprit / Perfexion', winner: 'tr' },
  { label: 'Hospital stay',       uk: '0 – 1 night',               tr: 'Day procedure (0 nights)',   winner: 'equal' },
  { label: 'Anaesthesia',         uk: 'Local / sedation',          tr: 'Local only (no GA)',          winner: 'equal' },
  { label: 'Report language',     uk: 'English',                   tr: 'English (GMC-reg specialist)',winner: 'equal' },
  { label: 'Report turnaround',   uk: '5 – 10 days',              tr: '24 – 48 hours',              winner: 'tr' },
  { label: 'JCI accreditation',   uk: 'Rare',                      tr: 'Standard at our partners',   winner: 'tr' },
  { label: 'Concierge service',   uk: 'None',                      tr: 'Flight + hotel + transfer',  winner: 'tr' },
];

const GK_VS_SURGERY = [
  { aspect: 'Incision required',    surgery: 'Yes — open craniotomy',   gamma: 'None' },
  { aspect: 'General anaesthesia',  surgery: 'Yes',                      gamma: 'Local only' },
  { aspect: 'Hospital stay',        surgery: '5 – 10 days',              gamma: 'Day procedure' },
  { aspect: 'Recovery time',        surgery: '4 – 8 weeks',              gamma: '24 – 48 hours' },
  { aspect: 'Infection risk',       surgery: 'Yes',                      gamma: 'None' },
  { aspect: 'Treatment precision',  surgery: '±2 – 3 mm',               gamma: '±0.5 mm (submillimetre)' },
  { aspect: 'Repeat treatment',     surgery: 'Very high risk',           gamma: 'Possible if needed' },
];

const FAQ = [
  {
    q: 'What conditions is GammaKnife used for?',
    a: 'GammaKnife is used primarily for brain tumours (benign and malignant), brain metastases, acoustic neuromas, meningiomas, arteriovenous malformations (AVMs), trigeminal neuralgia, and certain cases of Parkinson\'s disease and epilepsy. It is ideal when a lesion is small (typically under 3–4 cm), deep, or in a surgically risky location.',
  },
  {
    q: 'Is GammaKnife actually surgery?',
    a: 'No. Despite the name, GammaKnife does not involve any incision or blade. It delivers precisely focused beams of gamma radiation from 192 sources that converge on a single target point. Each individual beam is harmless; the damage occurs only at the intersection. The procedure is performed under local anaesthetic, with no general anaesthesia and no overnight stay required.',
  },
  {
    q: 'How does GammaKnife differ from CyberKnife and conventional radiotherapy?',
    a: 'GammaKnife is designed exclusively for intracranial (brain and skull base) lesions and uses a fixed cobalt-60 source array for extreme precision (±0.5 mm). CyberKnife uses a robotic arm and can treat body lesions. Conventional radiotherapy is less precise and typically delivers treatment over many sessions. For brain targets, GammaKnife is considered the gold standard.',
  },
  {
    q: 'How many treatment sessions are needed?',
    a: 'Most patients require a single session of 1–4 hours. Some conditions (such as large AVMs or recurrent tumours) may require a fractionated approach over 2–5 sessions. Your neurosurgeon will determine the protocol based on your imaging and diagnosis.',
  },
  {
    q: 'Will my UK GP or NHS specialist accept the Turkish treatment report?',
    a: 'Yes. Our partner clinics issue full treatment documentation including dose planning records, target volume mapping, and post-treatment MRI, written in English. These are directly usable by UK neurosurgeons and oncologists for follow-up care.',
  },
  {
    q: 'Do I need a referral?',
    a: 'No GP referral is required to enquire. However, GammaKnife requires a neurosurgery or neuro-oncology opinion and recent MRI/CT imaging (usually within 3 months). Our clinical team will review your imaging before confirming a booking.',
  },
  {
    q: 'What happens on the day of treatment?',
    a: 'You arrive at the clinic in the morning. A lightweight stereotactic frame is fitted under local anaesthetic. MRI or CT imaging is performed for treatment planning. The neurosurgery team prepares the dose plan. Treatment itself takes 1–4 hours in the GammaKnife unit. You are discharged the same afternoon with mild analgesics if needed.',
  },
  {
    q: 'Are there side effects?',
    a: 'Most patients experience minimal side effects. A small percentage develop radiation oedema (swelling) around the treated area 3–6 months after treatment, which is managed with steroids if needed. Fatigue is common for a few days. Hair loss (temporary) may occur at the treated site. Serious complications are rare at experienced centres.',
  },
];

const PREPARATION = [
  { step: '01', title: 'Share recent imaging', desc: 'MRI or CT from within the last 3 months required. Send via our secure portal — we review before confirming the booking.' },
  { step: '02', title: 'Pre-treatment consultation', desc: 'A neurosurgeon at the partner clinic reviews your case remotely. A treatment plan is prepared before you travel.' },
  { step: '03', title: 'Arrive the day before', desc: 'Plan to arrive in Istanbul the evening before. We arrange hotel near the clinic. No fasting required unless otherwise advised.' },
  { step: '04', title: 'Frame fitting (morning)', desc: 'A lightweight stereotactic head frame is fitted under local anaesthetic. Mild discomfort only — no pain during fitting.' },
  { step: '05', title: 'Treatment (1–4 hours)', desc: 'You lie in the GammaKnife unit. The machine is quiet and open. You can communicate with the clinical team throughout.' },
  { step: '06', title: 'Discharge same day', desc: 'Most patients are discharged by early afternoon. Full treatment record and follow-up protocol delivered in English within 24h.' },
];

// ─── Page ──────────────────────────────────────────────────────

export default function GammaKnifePage() {
  const cheapestPrice = GK_CLINICS.length > 0 ? Math.min(...GK_CLINICS.map(c => c.priceGbp)) : 6500;
  const avgUkPrice = 21000;
  const saving = Math.round(((avgUkPrice - cheapestPrice) / avgUkPrice) * 100);

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1452 50%, #3d1a6e 100%)',
          padding: '72px 24px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              <Link href="/" style={{ color: 'inherit' }}>Home</Link>
              <span>/</span>
              <Link href="/scan" style={{ color: 'inherit' }}>Scan Types</Link>
              <span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>GammaKnife Radiosurgery</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(230,126,34,0.15)', border: '1px solid rgba(230,126,34,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E67E22', display: 'inline-block' }} />
                  <span style={{ color: '#E67E22', fontSize: 13, fontWeight: 500 }}>Advanced · Stereotactic Radiosurgery</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
                  GammaKnife in Turkey
                </h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
                  Non-invasive brain tumour treatment at JCI-accredited clinics in Istanbul.
                  No incision. No anaesthesia. Day procedure — home the same evening.
                  Up to {saving}% cheaper than UK private hospitals.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link href="/book?scan=gamma_knife" style={{ background: '#E67E22', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>
                    Find Available Slots →
                  </Link>
                  <a href="https://wa.me/447700000000?text=GammaKnife%20enquiry%20Istanbul" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 500 }}>
                    Ask on WhatsApp
                  </a>
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[
                    { value: `From £${cheapestPrice.toLocaleString()}`, label: 'thediagnostic price' },
                    { value: `Save ${saving}%`, label: 'vs UK private avg' },
                    { value: '3–10 days', label: 'appointment wait' },
                    { value: 'Day case', label: 'no overnight stay' },
                  ].map(s => (
                    <div key={s.label} style={{ borderLeft: '2px solid rgba(230,126,34,0.4)', paddingLeft: 14 }}>
                      <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#E67E22', fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price card */}
              <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 16, padding: '28px 24px', minWidth: 220, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>From</div>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#E67E22', lineHeight: 1, marginBottom: 4 }}>£{cheapestPrice.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
                  UK private avg: <span style={{ textDecoration: 'line-through' }}>£{avgUkPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {['No incision or surgery', 'Local anaesthetic only', 'Day procedure', 'English treatment report', 'GP follow-up letter'].map(f => (
                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                      <span style={{ color: '#17A589', fontWeight: 700 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <Link href="/book?scan=gamma_knife" style={{ display: 'block', background: '#E67E22', color: '#fff', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, textAlign: 'center' }}>
                  Book GammaKnife Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────── */}
        <div style={{ background: '#2d1452', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['✓ JCI-Accredited Neurosurgery Centres', '✓ Leksell GammaKnife Esprit / Perfexion', '✓ GMC-Registered Neurosurgeon Report', '✓ Day Procedure — No Overnight Stay', '✓ No Referral Required'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── GammaKnife vs SURGERY ─────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--warm)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>TREATMENT COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>GammaKnife vs Open Brain Surgery</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>For eligible patients, GammaKnife offers the same or superior tumour control — with none of the surgical risks.</p>
            </div>
            <div style={{ overflowX: 'auto', marginBottom: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', borderRadius: '10px 0 0 0', fontWeight: 600 }}>Aspect</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 600 }}>🔪 Open Surgery</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center', borderRadius: '0 10px 0 0', fontWeight: 600, background: '#E67E22' }}>⚡ GammaKnife</th>
                  </tr>
                </thead>
                <tbody>
                  {GK_VS_SURGERY.map((row, i) => (
                    <tr key={row.aspect} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text)' }}>{row.aspect}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>{row.surgery}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: '#17A589', fontWeight: 600 }}>✓ {row.gamma}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── UK vs TURKEY COMPARISON ───────────────────────── */}
        <section style={{ padding: '0 24px 80px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRICE COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary-3)', marginBottom: 12 }}>UK Private vs Turkey — GammaKnife</h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
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
                      <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text)' }}>{row.label}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: row.winner === 'tr' ? 'var(--text-muted)' : 'var(--text)' }}>{row.uk}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <span style={{ color: row.winner === 'tr' ? '#17A589' : 'var(--text)', fontWeight: row.winner === 'tr' ? 700 : 400 }}>
                          {row.winner === 'tr' && '✓ '}{row.tr}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PARTNER CLINICS ───────────────────────────────── */}
        {GK_CLINICS.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER CLINICS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Where to Get GammaKnife Treatment</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560 }}>All neurosurgery centres personally verified — device model, neurosurgeon credentials, and English-language reporting.</p>
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
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Device</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 16 }}>{clinic.device}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-2)', borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
                          <div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>GammaKnife from</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{clinic.priceGbp.toLocaleString()}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>UK £{clinic.ukPriceGbp.toLocaleString()}</div>
                            <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginTop: 2 }}>Save {savedPct}%</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link href={`/clinics/${clinic.slug}`} style={{ flex: 1, background: 'var(--primary)', color: '#fff', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>View Clinic</Link>
                          <Link href={`/book?scan=gamma_knife&clinic=${clinic.slug}`} style={{ flex: 1, border: '1.5px solid var(--warm)', color: 'var(--warm)', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>Book Slot</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── PREPARATION GUIDE ─────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--warm)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>WHAT TO EXPECT</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Your GammaKnife Day — Step by Step</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>From imaging review to discharge — typically under 12 hours.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {PREPARATION.map(step => (
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

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--warm)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</div>
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

        {/* ── BOTTOM CTA ────────────────────────────────────── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #2d1452 0%, #3d1a6e 100%)', borderRadius: 'var(--radius-xl)', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: 14 }}>
                Ready to Book Your GammaKnife?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
                Send us your MRI and we&apos;ll have a neurosurgery review within 24 hours. Appointments available within 3–10 days.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=gamma_knife" style={{ background: '#E67E22', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>
                  Find Available Slots →
                </Link>
                <a href="https://wa.me/447700000000?text=GammaKnife%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

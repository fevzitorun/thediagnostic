import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TriageWidget from '@/components/TriageWidget';
import SavingsCalculator from '@/components/SavingsCalculator';
import { getFeaturedClinics } from '@/lib/tr-clinics.data';

// ─── Data ───────────────────────────────────────────────────

const SCAN_TYPES = [
  {
    code: 'pet_ct',
    icon: '🔬',
    name: 'PET-CT Scan',
    tagline: 'Full-body cancer & disease detection',
    priceFrom: 1200,
    ukPrice: 4000,
    savingPct: 70,
    href: '/scan/pet-ct',
    badge: 'Most Booked',
    badgeColor: '#17A589',
    description: 'Detects cancer, metastasis, cardiac & neurological disease at cellular level.',
  },
  {
    code: 'mri_3t',
    icon: '🧲',
    name: 'MRI 3T',
    tagline: 'High-field magnetic resonance imaging',
    priceFrom: 320,
    ukPrice: 1200,
    savingPct: 73,
    href: '/scan/mri-3t',
    badge: null,
    badgeColor: null,
    description: 'Superior soft tissue imaging for brain, spine, joints and abdomen.',
  },
  {
    code: 'gamma_knife',
    icon: '⚡',
    name: 'GammaKnife',
    tagline: 'Non-invasive brain tumour treatment',
    priceFrom: 6500,
    ukPrice: 20000,
    savingPct: 68,
    href: '/scan/gamma-knife',
    badge: 'Advanced',
    badgeColor: '#E67E22',
    description: 'Stereotactic radiosurgery — no incision, no anaesthesia, day procedure.',
  },
  {
    code: 'pet_mri',
    icon: '🔮',
    name: 'PET-MRI',
    tagline: 'Simultaneous metabolic + tissue imaging',
    priceFrom: 1850,
    ukPrice: 5500,
    savingPct: 66,
    href: '/scan/pet-mri',
    badge: 'Premium',
    badgeColor: '#1B4F72',
    description: 'The most advanced hybrid scanner — PET metabolic data combined with 3T MRI.',
  },
  {
    code: 'spect_ct',
    icon: '💫',
    name: 'SPECT-CT',
    tagline: 'Bone, thyroid & cardiac perfusion',
    priceFrom: 650,
    ukPrice: 2200,
    savingPct: 70,
    href: '/scan/spect-ct',
    badge: null,
    badgeColor: null,
    description: 'Nuclear medicine imaging for bone scans, thyroid studies and cardiac perfusion.',
  },
  {
    code: 'mri_whole_body',
    icon: '🫁',
    name: 'Whole Body MRI',
    tagline: 'Complete health screening, no radiation',
    priceFrom: 950,
    ukPrice: 3500,
    savingPct: 73,
    href: '/scan/whole-body-mri',
    badge: null,
    badgeColor: null,
    description: 'Head-to-toe cancer screening and full health check without any radiation.',
  },
];

// 8 featured Turkish hospital groups, sourced from lib/tr-clinics.data.ts
const CLINICS = getFeaturedClinics().map((clinic, i) => ({
  slug: clinic.slug,
  name: clinic.name,
  city: `${clinic.city}, Turkey`,
  lead: clinic.highlightBadge ?? `${clinic.group} Group`,
  role: clinic.internationalPatientCentre ? 'International Patient Centre' : (clinic.specialties?.[0] ?? clinic.group ?? ''),
  description: clinic.description,
  scans: clinic.featuredScans.map(s => s.name),
  jci: clinic.jciAccredited,
  iso: clinic.isoAccredited,
  rating: clinic.rating,
  priceFrom: clinic.featuredScans.length > 0 ? Math.min(...clinic.featuredScans.map(s => s.priceGbp)) : 0,
  currency: 'GBP',
  accentColor: i % 2 === 0 ? '#17A589' : '#1B4F72',
}));

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '💬',
    title: 'Request',
    desc: 'Tell us your symptoms or the scan your doctor recommended. Our AI and clinical team identify the best technology for your specific case.',
    color: '#17A589',
  },
  {
    step: '02',
    icon: '🧠',
    title: 'Analyse',
    desc: 'Not all MRI machines are the same. We identify the exact device suited to your condition — 3T Prisma, PET-MRI, Flash CT or GammaKnife.',
    color: '#1B4F72',
  },
  {
    step: '03',
    icon: '🌍',
    title: 'Source',
    desc: 'We scan our network across the UK and Istanbul to find the soonest availability at the best price — with the right machine, not just any machine.',
    color: '#E67E22',
  },
  {
    step: '04',
    icon: '📄',
    title: 'Execute',
    desc: 'We book your slot, manage your travel if needed, and deliver your UK-standard radiology report within 24 hours. GP letter included.',
    color: '#17A589',
  },
];

const WHY_US = [
  {
    icon: '🧠',
    title: 'The Technology Broker',
    headline: 'Precision Matching',
    body: 'Not all MRI machines are the same. A standard scan might miss what a 3 Tesla Prisma reveals. Our platform directs you to the exact device suited to your condition — cardiac precision, oncological detail, or orthopaedic clarity.',
  },
  {
    icon: '🌍',
    title: 'The Global Inventory',
    headline: 'Borderless Excellence',
    body: "Why wait weeks for standard care when you can access world-class technology tomorrow? We manage idle capacity across a global network of Centres of Excellence — from UK partners to high-tech hubs in Istanbul.",
  },
  {
    icon: '🤝',
    title: 'The Concierge Experience',
    headline: 'End-to-End Care',
    body: 'We handle more than just the appointment. From VIP transfers and hotel to ensuring your reports meet strict UK clinical standards — our team manages the entire process. You focus on your health.',
  },
];

const STATS = [
  { value: 'Up to 70%', label: 'cheaper than UK private' },
  { value: '3–7 days', label: 'appointment availability' },
  { value: '24h', label: 'report turnaround' },
  { value: '2', label: 'accredited partner clinics' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'London, UK',
    scan: 'PET-CT at HSM Radyoloji',
    text: 'My oncologist needed a full-body PET-CT urgently. The NHS told me 14 weeks minimum. thediagnostic had me booked in Istanbul within 4 days. The clinic was spotless, the radiologist spoke perfect English, and I had my report before I even landed back in London.',
    rating: 5,
    saving: '£2,800 saved',
  },
  {
    name: 'James T.',
    location: 'Manchester, UK',
    scan: 'GammaKnife at Acıbadem',
    text: 'I was quoted £22,000 for GammaKnife at a London private hospital with a 6-week wait. Acıbadem Maslak did it for £6,500 and I was treated within 10 days. The quality of care was exceptional — truly world-class.',
    rating: 5,
    saving: '£15,500 saved',
  },
  {
    name: 'Fatima K.',
    location: 'Dubai, UAE',
    scan: 'PET-MRI at Acıbadem',
    text: 'The concierge service made everything seamless. Flight, hotel, and transfer all arranged. The Acıbadem team had an Arabic-speaking coordinator waiting for me. My PET-MRI report was ready in 18 hours.',
    rating: 5,
    saving: 'AED 22,000 saved',
  },
];

const CONCIERGE_FEATURES = [
  { icon: '✈️', label: 'Flight Search', desc: 'Best fares from your city' },
  { icon: '🏨', label: 'Hotel Booking', desc: 'Near the clinic, any budget' },
  { icon: '🚗', label: 'Airport Transfer', desc: 'Private car to clinic & back' },
  { icon: '🗣️', label: 'Medical Translator', desc: 'Arabic, German, French & more' },
  { icon: '📋', label: 'Pre-Departure Pack', desc: 'Checklist & clinic prep guide' },
  { icon: '🔄', label: 'GP Letter', desc: 'Report summary for your GP' },
];

const DEVICE_CATALOG = [
  {
    category: 'Nuclear Medicine',
    color: '#17A589',
    bg: '#D1F2EB',
    icon: '☢️',
    devices: ['PET-CT (Siemens Biograph)', 'PET-MRI (Siemens Biograph mMR)', 'SPECT-CT', 'Cyclotron F-18', 'MIBG Therapy', 'Lutetium-177 PSMA', 'Ga-68 DOTATATE'],
  },
  {
    category: 'Radiation Therapy',
    color: '#E67E22',
    bg: '#FEF9F0',
    icon: '⚡',
    devices: ['GammaKnife Icon', 'CyberKnife M6', 'TrueBeam STx', 'Tomotherapy H', 'Proton Therapy', 'Brachytherapy HDR', 'SBRT/SABR'],
  },
  {
    category: 'Robotic Surgery',
    color: '#8E44AD',
    bg: '#F4ECF7',
    icon: '🤖',
    devices: ['Da Vinci Xi (4th gen)', 'MAKO Robot (knee/hip)', 'Versius Laparoscopic', 'Senhance System', 'Robotic Bronchoscopy', 'Rosa Brain Robot'],
  },
  {
    category: 'Advanced Imaging',
    color: '#1B4F72',
    bg: '#EBF5FB',
    icon: '🧲',
    devices: ['MRI 3T Siemens Prisma', 'MRI 1.5T', 'Whole Body MRI', 'DECT Dual Energy CT', 'Spectral CT', '320-Row CT Scanner', 'Cardiac CT Angio'],
  },
  {
    category: 'Interventional',
    color: '#C0392B',
    bg: '#FDEDEC',
    icon: '🔬',
    devices: ['Biplane DSA Suite', 'O-Arm Navigation', 'Fusion-Guided Biopsy', 'HIFU (ultrasound ablation)', 'MR-Guided HIFU', 'IRE NanoKnife', 'Endovascular Suite'],
  },
  {
    category: 'Ophthalmology',
    color: '#2E86C1',
    bg: '#EBF5FB',
    icon: '👁️',
    devices: ['Femtosecond LASIK Laser', 'LASIK/LASEK', 'OCT Angiography', 'Scheimpflug Topography', 'Phacoemulsification', 'Vitreoretinal Surgery', 'ICL Implantation'],
  },
];

// ─── Page ────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section style={{
          background: 'linear-gradient(135deg, #0d2d44 0%, var(--primary) 60%, #1a6e94 100%)',
          padding: '80px 24px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 480px', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(23,165,137,0.18)', border: '1px solid rgba(23,165,137,0.35)', borderRadius: 100, padding: '5px 14px', marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#17A589', display: 'inline-block' }} />
                <span style={{ color: '#5DEDE0', fontSize: 13, fontWeight: 500 }}>Medical Tech Broker · UK · Turkey · UAE</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 62px)', color: '#fff', lineHeight: 1.12, marginBottom: 16 }}>
                Advanced Diagnostics,{' '}<span style={{ color: '#5DEDE0' }}>Without the Wait</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
                PET-CT, MRI 3T, GammaKnife and 70+ advanced imaging technologies — at JCI-accredited partner clinics in Istanbul. Results in English within 24 hours. Up to 70% less than UK private prices.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
                <Link href="/book" style={{ background: 'var(--accent)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>Find Available Slots →</Link>
                <Link href="/scan/pet-ct" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 500 }}>See Scan Types</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 28, justifyContent: 'start' }}>
                {STATS.map(stat => (
                  <div key={stat.label} style={{ borderLeft: '2px solid rgba(93,237,224,0.3)', paddingLeft: 14 }}>
                    <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#5DEDE0', fontFamily: 'var(--font-serif)' }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', aspectRatio: '4/3' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero-scanner.jpg" alt="Advanced medical diagnostic technology" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(13,45,68,0.85) 0%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 16px' }}>
                <span style={{ fontSize: 22 }}>🔬</span>
                <div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>PET-CT · MRI 3T · GammaKnife</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>JCI-accredited partner clinics · Istanbul</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <div style={{ background: 'var(--primary-2)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ icon: '✓', text: 'JCI-Accredited Clinics' }, { icon: '✓', text: 'Subspecialist Radiologists' }, { icon: '✓', text: 'Reports in English · 24h' }, { icon: '✓', text: 'UK, Germany & UAE Patients Welcome' }, { icon: '✓', text: 'No Referral Required' }].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#17A589', fontWeight: 700 }}>{item.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI TRIAGE */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>AI SCAN ADVISOR</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 16 }}>Not Sure Which Scan You Need?</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.75, marginBottom: 28 }}>Our AI Scan Advisor — powered by Claude — analyses your symptoms and suggests the most appropriate diagnostic technology. Used by hundreds of patients weekly.</p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Analyses symptoms against clinical protocols', 'Recommends specific scan type + machine model', 'Estimates NHS wait vs. thediagnostic availability', 'Not a medical diagnosis — always consult your GP'].map(txt => (
                    <li key={txt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--text-muted)' }}><span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>{txt}</li>
                  ))}
                </ul>
              </div>
              <div><TriageWidget /></div>
            </div>
          </div>
        </section>

        {/* WHY THE DIAGNOSTIC */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>WHY THE DIAGNOSTIC</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 16 }}>Beyond Booking: Intelligent Diagnostic Access</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>We don&apos;t just find you a slot. We match your specific medical needs with the world&apos;s most advanced diagnostic technology.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {WHY_US.map(item => (
                <div key={item.title} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 32, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--accent) 0%, var(--primary) 100%)' }} />
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{item.title}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--primary)', marginBottom: 12 }}>{item.headline}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>{item.body}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px, 2.5vw, 26px)', color: 'var(--primary)', fontStyle: 'italic' }}>&ldquo;Don&apos;t just scan. Scan with the best.&rdquo;</p>
            </div>
          </div>
        </section>

        {/* SCAN TYPES */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>ADVANCED DIAGNOSTICS</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Technologies Not Available on the NHS</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560 }}>Or available with 6–18 month waiting times. Book within days, not months.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {SCAN_TYPES.map(scan => (
                <Link key={scan.code} href={scan.href} style={{ display: 'block', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 24, textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
                  {scan.badge && <div style={{ position: 'absolute', top: 16, right: 16, background: scan.badgeColor || 'var(--accent)', color: '#fff', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{scan.badge}</div>}
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{scan.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--primary)', marginBottom: 4 }}>{scan.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, marginBottom: 10 }}>{scan.tagline}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>{scan.description}</p>
                  <div style={{ background: 'var(--bg-2)', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>thediagnostic from</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>£{scan.priceFrom.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>UK private avg</div>
                      <div style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'line-through' }}>£{scan.ukPrice.toLocaleString()}</div>
                      <div style={{ display: 'inline-block', background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginTop: 2 }}>Save {scan.savingPct}%</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16, color: 'var(--accent)', fontSize: 14, fontWeight: 500 }}>View slots →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DEVICE CATALOG */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>60+ TECHNOLOGIES</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>The World&apos;s Most Advanced Diagnostic Devices</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>From nuclear medicine and robotic surgery to next-generation MRI — our network gives you access to technology unavailable in most UK private hospitals.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {DEVICE_CATALOG.map(cat => (
                <div key={cat.category} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 24, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: cat.color }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{cat.icon}</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--primary)', margin: 0 }}>{cat.category}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {cat.devices.map(d => (<span key={d} style={{ background: cat.bg, color: cat.color, borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 500 }}>{d}</span>))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>Can&apos;t find the technology you need? We can source from additional centres.</p>
              <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 500, display: 'inline-block' }}>Ask About Specific Technology →</a>
            </div>
          </div>
        </section>

        {/* BROKERAGE FLOW */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>THE BROKERAGE FLOW</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>You Request. We Source the Best.</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>From symptom to scan report in days — with the right technology, not just the nearest available slot.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--line)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -1, right: 20, fontSize: 64, fontWeight: 900, color: 'rgba(23,165,137,0.06)', lineHeight: 1, userSelect: 'none', fontFamily: 'var(--font-serif)' }}>{step.step}</div>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
                  <div style={{ display: 'inline-block', background: step.color === '#17A589' ? '#D1F2EB' : step.color === '#E67E22' ? '#FEF9F0' : '#EBF5FB', color: step.color, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 600, marginBottom: 12 }}>Step {step.step}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--primary)', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link href="/book" style={{ background: 'var(--accent)', color: '#fff', padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, display: 'inline-block' }}>Book Your Scan Now →</Link>
            </div>
          </div>
        </section>

        {/* UK REPORTS */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ background: 'var(--primary)', padding: '18px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em' }}>RADIOLOGY REPORT — CONFIDENTIAL</div>
                      <div style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginTop: 2 }}>thediagnostic</div>
                    </div>
                    <div style={{ background: '#17A589', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>✓ VERIFIED</div>
                  </div>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                    {[['Patient','J. Thompson'],['DOB','14 Mar 1972'],['Scan Type','Whole Body PET-CT'],['Date','29 May 2025'],['Clinic','HSM Radyoloji, Istanbul'],['Report Ref','TD-2025-8821']].map(([label, val]) => (<div key={label}><div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div><div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 500 }}>{val}</div></div>))}
                  </div>
                  <div style={{ background: '#0d1a2a', borderRadius: 8, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>DICOM Image — Encrypted · Full resolution in report</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 14 }}><span style={{ fontWeight: 700 }}>Findings: </span>No evidence of pathological FDG uptake. Physiological distribution of tracer. No metastatic disease identified on this study.</div>
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>Dr. R. Ashworth FRCR</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Consultant Radiologist · GMC #7654321</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>NHS GP-accepted · GDPR compliant</div>
                    </div>
                    <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>18h turnaround</div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>UK-STANDARD REPORTS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--primary-3)', marginBottom: 16 }}>Reports Your GP Will Accept</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.75, marginBottom: 28 }}>Every report is produced by a GMC-registered subspecialist radiologist, written in English, and formatted for direct use with UK GPs and NHS specialists.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[{icon:'📋',title:'Consultant Radiologist Signature',desc:'GMC-registered · NHS GP-accepted · subspecialist reporting'},{icon:'🖥️',title:'DICOM + Written Report',desc:'Full-resolution images + formal written findings in English'},{icon:'📝',title:'GP Referral Letter Template',desc:'Pre-formatted letter for onward NHS referral if needed'},{icon:'🔄',title:'Free Second Opinion',desc:'30-day window for a second read at no extra cost'},{icon:'🔒',title:'Encrypted Secure Delivery',desc:'GDPR-compliant · delivered to your email within 24h'}].map(feat => (
                    <div key={feat.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: '#EBF5FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{feat.icon}</div>
                      <div><div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 14 }}>{feat.title}</div><div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{feat.desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SAVINGS CALCULATOR */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>TRANSPARENT PRICING</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>See What You Save</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>Compare our all-inclusive prices against average UK private hospital costs.</p>
            </div>
            <SavingsCalculator />
          </div>
        </section>

        {/* PARTNER CLINICS */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER CLINICS</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Rigorously Vetted. Internationally Accredited.</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560 }}>Every clinic on thediagnostic is personally verified — accreditation, equipment, radiologist credentials and English-language reporting.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 24 }}>
              {CLINICS.map(clinic => (
                <div key={clinic.slug} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <div style={{ background: clinic.accentColor, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div><h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#fff', marginBottom: 4 }}>{clinic.name}</h3><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{clinic.city}</p></div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {clinic.jci && <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>JCI</span>}
                      {clinic.iso && <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>ISO</span>}
                    </div>
                  </div>
                  <div style={{ padding: 28 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18, padding: '12px 16px', background: 'var(--bg-2)', borderRadius: 8 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: clinic.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, flexShrink: 0 }}>👨‍⚕️</div>
                      <div><div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{clinic.lead}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{clinic.role}</div></div>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>{clinic.description}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                      {clinic.scans.map(s => (<span key={s} style={{ background: 'var(--bg-2)', color: 'var(--primary)', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 500 }}>{s}</span>))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>{'★★★★★'.split('').map((s, i) => (<span key={i} style={{ color: '#F39C12', fontSize: 14 }}>{s}</span>))}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{clinic.rating}/5 · from £{clinic.priceFrom}</div>
                      </div>
                      <Link href={`/clinics/${clinic.slug}`} style={{ background: clinic.accentColor, color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 14, fontWeight: 600 }}>View Clinic →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/clinics" style={{ border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 500, display: 'inline-block' }}>View All Partner Clinics</Link>
            </div>
          </div>
        </section>

        {/* CONCIERGE */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-3) 100%)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>ALL-INCLUSIVE CONCIERGE</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', color: '#fff', marginBottom: 16 }}>We Handle Everything.<br />You Focus on Your Health.</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>Add our concierge package to your booking and we arrange flights, hotel, airport transfer, and a medical translator — so you can focus entirely on getting better.</p>
                <Link href="/book/concierge" style={{ background: 'var(--accent)', color: '#fff', borderRadius: 8, padding: '12px 24px', fontSize: 15, fontWeight: 600, display: 'inline-block' }}>Add Concierge to My Booking →</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {CONCIERGE_FEATURES.map(feat => (
                  <div key={feat.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{feat.icon}</div>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: 14, marginBottom: 4 }}>{feat.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{feat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PATIENT STORIES</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Real Patients. Real Savings.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>{'★★★★★'.split('').map((s, j) => (<span key={j} style={{ color: '#F39C12', fontSize: 16 }}>{s}</span>))}</div>
                  <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div><div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{t.name}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.location}</div><div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>{t.scan}</div></div>
                    <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 700 }}>{t.saving}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICE CTA */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-2) 100%)', borderRadius: 'var(--radius-xl)', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff', marginBottom: 16 }}>NHS Waiting List Too Long?</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>The average NHS wait for a PET-CT is 12–18 months. thediagnostic has appointments available within 3–7 days — at a fraction of UK private hospital prices.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book" style={{ background: '#fff', color: 'var(--primary)', borderRadius: 10, padding: '14px 28px', fontSize: 16, fontWeight: 700, display: 'inline-block' }}>Find a Slot This Week →</Link>
                <Link href="/compare/pet-ct-uk-vs-turkey" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 16, fontWeight: 500, display: 'inline-block' }}>Compare Prices</Link>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNER BANNER */}
        <section style={{ padding: '64px 24px', background: 'linear-gradient(135deg, #0d2d44 0%, #1a4a6e 100%)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#5DEDE0', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FOR CLINICS &amp; HOSPITALS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3.5vw, 38px)', color: '#fff', marginBottom: 12 }}>Have Empty Scanner Slots?<br /><span style={{ color: '#5DEDE0' }}>Partner with thediagnostic.</span></h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.7, marginBottom: 28, maxWidth: 540 }}>Join our network and fill idle capacity with pre-qualified international patients. Zero setup cost. You set your own prices and availability.</p>
                <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
                  {[{value:'12,000+',label:'patients searching monthly'},{value:'£0',label:'setup cost'},{value:'48h',label:'avg. time to first booking'}].map(s => (
                    <div key={s.label} style={{ borderLeft: '2px solid rgba(93,237,224,0.3)', paddingLeft: 14 }}>
                      <div style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#5DEDE0', fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '32px 28px', minWidth: 260, textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>🏥</div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Start Receiving Patients</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>Connect your clinic in 48 hours.<br />Full onboarding support included.</div>
                <Link href="/partner" style={{ display: 'block', background: '#17A589', color: '#fff', borderRadius: 9, padding: '12px 20px', fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Apply as a Partner Clinic →</Link>
                <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', borderRadius: 9, padding: '10px 20px', fontSize: 13 }}>WhatsApp us first</a>
              </div>
            </div>
          </div>
        </section>

        {/* WHATSAPP FLOAT */}
        <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999, background: '#25D366', color: '#fff', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }} title="Chat on WhatsApp">
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </main>
      <Footer />
    </>
  );
}
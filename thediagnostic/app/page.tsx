import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const CLINICS = [
  {
    slug: 'hsm-radyoloji-istanbul',
    name: 'HSM Radyoloji',
    city: 'Istanbul, Turkey',
    lead: 'Prof. Dr. Mustafa ÖZATEŞ',
    role: 'Consultant Radiologist',
    description: 'Two state-of-the-art clinics in central Istanbul led by one of Turkey\'s foremost radiologists. Expert subspecialist reporting — results in English within 24 hours.',
    scans: ['PET-CT', 'MRI 3T', 'SPECT-CT', 'CT Angio'],
    jci: false,
    iso: true,
    rating: 4.9,
    priceFrom: 320,
    currency: 'GBP',
    accentColor: '#17A589',
  },
  {
    slug: 'acibadem-maslak-istanbul',
    name: 'Acıbadem Maslak Hospital',
    city: 'Istanbul, Turkey',
    lead: 'International Patient Centre',
    role: 'JCI Accredited · HIMSS Stage 6',
    description: 'Turkey\'s first JCI-accredited hospital. The most advanced nuclear medicine suite in the region — GammaKnife, PET-MRI, PET-CT and robotic 3T MRI under one roof.',
    scans: ['PET-CT', 'PET-MRI', 'GammaKnife', 'MRI 3T', 'SPECT-CT'],
    jci: true,
    iso: true,
    rating: 4.8,
    priceFrom: 380,
    currency: 'GBP',
    accentColor: '#1B4F72',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '💬',
    title: 'Describe Your Needs',
    desc: 'Tell us your symptoms or the scan your doctor recommended. Our AI advisor instantly matches you with the right scan type and accredited clinic.',
    color: '#17A589',
  },
  {
    step: '02',
    icon: '📅',
    title: 'Choose & Book',
    desc: 'Browse real-time available slots. Compare prices, read clinic reviews, and book instantly — no referral letter required.',
    color: '#1B4F72',
  },
  {
    step: '03',
    icon: '✈️',
    title: 'Travel & Scan',
    desc: 'Fly to Istanbul. Our concierge team can arrange airport transfer, hotel and medical translator. Your scan is with subspecialist radiologists.',
    color: '#E67E22',
  },
  {
    step: '04',
    icon: '📄',
    title: 'Receive Your Report',
    desc: 'Get your full radiology report in English within 24 hours. AI-powered plain-language summary included. GP letter template available.',
    color: '#17A589',
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

// ─── Page ────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section style={{
          background: 'linear-gradient(135deg, var(--primary-3) 0%, var(--primary) 50%, #1a6e94 100%)',
          padding: '96px 24px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(23,165,137,0.2)', border: '1px solid rgba(23,165,137,0.4)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 28,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#17A589', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#5DEDE0', fontSize: 13, fontWeight: 500 }}>
                UK patients save up to 70% on advanced diagnostics
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(38px, 6vw, 72px)',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 12,
              maxWidth: 800,
            }}>
              World-Class Medical Imaging,{' '}
              <span style={{ color: '#5DEDE0' }}>Without the Wait</span>
            </h1>

            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: 600,
              lineHeight: 1.7,
              marginBottom: 40,
            }}>
              PET-CT, MRI 3T, GammaKnife and more — at JCI-accredited clinics in Istanbul.
              Fast appointments, expert radiologists, results in English within 24 hours.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link href="/book" style={{
                background: 'var(--accent)', color: '#fff',
                padding: '14px 28px', borderRadius: 10,
                fontSize: 16, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Find Available Slots →
              </Link>
              <Link href="/scan/pet-ct" style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', padding: '14px 28px', borderRadius: 10,
                fontSize: 16, fontWeight: 500,
              }}>
                See Scan Types
              </Link>
            </div>

            {/* Stats Strip */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24, maxWidth: 700,
            }}>
              {STATS.map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#5DEDE0', fontFamily: 'var(--font-serif)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            TRUST BAR
        ══════════════════════════════════════════════ */}
        <div style={{
          background: 'var(--primary-2)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 24px',
        }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {[
              { icon: '✓', text: 'JCI-Accredited Clinics' },
              { icon: '✓', text: 'Subspecialist Radiologists' },
              { icon: '✓', text: 'Reports in English · 24h' },
              { icon: '✓', text: 'UK, Germany & UAE Patients Welcome' },
              { icon: '✓', text: 'No Referral Required' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#17A589', fontWeight: 700 }}>{item.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            SCAN TYPES
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                ADVANCED DIAGNOSTICS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>
                Technologies Not Available on the NHS
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560 }}>
                Or available with 6–18 month waiting times. Book within days, not months.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20,
            }}>
              {SCAN_TYPES.map(scan => (
                <Link
                  key={scan.code}
                  href={scan.href}
                  style={{
                    display: 'block',
                    background: '#fff',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 24,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Badge */}
                  {scan.badge && (
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      background: scan.badgeColor || 'var(--accent)',
                      color: '#fff', borderRadius: 100,
                      padding: '3px 10px', fontSize: 11, fontWeight: 600,
                    }}>
                      {scan.badge}
                    </div>
                  )}

                  <div style={{ fontSize: 36, marginBottom: 14 }}>{scan.icon}</div>

                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22, color: 'var(--primary)',
                    marginBottom: 4,
                  }}>
                    {scan.name}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, marginBottom: 10 }}>
                    {scan.tagline}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
                    {scan.description}
                  </p>

                  {/* Price comparison */}
                  <div style={{
                    background: 'var(--bg-2)',
                    borderRadius: 8, padding: '12px 16px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>thediagnostic from</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>
                        £{scan.priceFrom.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>UK private avg</div>
                      <div style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        £{scan.ukPrice.toLocaleString()}
                      </div>
                      <div style={{
                        display: 'inline-block', background: '#D1F2EB',
                        color: '#0E6655', borderRadius: 100,
                        padding: '2px 8px', fontSize: 11, fontWeight: 700, marginTop: 2,
                      }}>
                        Save {scan.savingPct}%
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 16, color: 'var(--accent)', fontSize: 14, fontWeight: 500 }}>
                    View slots →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                HOW IT WORKS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>
                From Symptom to Scan Report in Days
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
                We handle everything — booking, travel, translation and report delivery.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 28,
            }}>
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  padding: 28,
                  border: '1px solid var(--line)',
                  position: 'relative',
                }}>
                  {/* Step number */}
                  <div style={{
                    position: 'absolute', top: -1, right: 20,
                    fontSize: 64, fontWeight: 900,
                    color: 'rgba(23,165,137,0.06)',
                    lineHeight: 1, userSelect: 'none',
                    fontFamily: 'var(--font-serif)',
                  }}>
                    {step.step}
                  </div>

                  <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
                  <div style={{
                    display: 'inline-block',
                    background: step.color === '#17A589' ? '#D1F2EB' : step.color === '#E67E22' ? '#FEF9F0' : '#EBF5FB',
                    color: step.color,
                    borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 600, marginBottom: 12,
                  }}>
                    Step {step.step}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--primary)', marginBottom: 10 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link href="/book" style={{
                background: 'var(--accent)', color: '#fff',
                padding: '14px 32px', borderRadius: 10,
                fontSize: 16, fontWeight: 600,
                display: 'inline-block',
              }}>
                Book Your Scan Now →
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PARTNER CLINICS
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                PARTNER CLINICS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>
                Rigorously Vetted. Internationally Accredited.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560 }}>
                Every clinic on thediagnostic is personally verified — accreditation, equipment, radiologist credentials and English-language reporting.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 24 }}>
              {CLINICS.map(clinic => (
                <div key={clinic.slug} style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                }}>
                  {/* Header band */}
                  <div style={{
                    background: clinic.accentColor,
                    padding: '24px 28px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: '#fff', marginBottom: 4 }}>
                        {clinic.name}
                      </h3>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{clinic.city}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {clinic.jci && (
                        <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>
                          JCI
                        </span>
                      )}
                      {clinic.iso && (
                        <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>
                          ISO
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: 28 }}>
                    {/* Lead radiologist */}
                    <div style={{
                      display: 'flex', gap: 12, alignItems: 'center',
                      marginBottom: 18, padding: '12px 16px',
                      background: 'var(--bg-2)', borderRadius: 8,
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: clinic.accentColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 18, flexShrink: 0,
                      }}>
                        👨‍⚕️
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{clinic.lead}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{clinic.role}</div>
                      </div>
                    </div>

                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                      {clinic.description}
                    </p>

                    {/* Scan type chips */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                      {clinic.scans.map(s => (
                        <span key={s} style={{
                          background: 'var(--bg-2)', color: 'var(--primary)',
                          borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 500,
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Rating + Price + CTA */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                          {'★★★★★'.split('').map((s, i) => (
                            <span key={i} style={{ color: '#F39C12', fontSize: 14 }}>{s}</span>
                          ))}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          {clinic.rating}/5 · from £{clinic.priceFrom}
                        </div>
                      </div>
                      <Link href={`/clinics/${clinic.slug}`} style={{
                        background: clinic.accentColor, color: '#fff',
                        borderRadius: 8, padding: '9px 18px',
                        fontSize: 14, fontWeight: 600,
                      }}>
                        View Clinic →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/clinics" style={{
                border: '1.5px solid var(--accent)', color: 'var(--accent)',
                borderRadius: 8, padding: '10px 24px',
                fontSize: 14, fontWeight: 500, display: 'inline-block',
              }}>
                View All Partner Clinics
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CONCIERGE
        ══════════════════════════════════════════════ */}
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-3) 100%)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center',
            }}>
              {/* Left: Text */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                  ALL-INCLUSIVE CONCIERGE
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 40px)', color: '#fff', marginBottom: 16 }}>
                  We Handle Everything.<br />You Focus on Your Health.
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                  Add our concierge package to your booking and we arrange flights, hotel, airport transfer, and a medical translator — so you can focus entirely on getting better.
                </p>
                <Link href="/book/concierge" style={{
                  background: 'var(--accent)', color: '#fff',
                  borderRadius: 8, padding: '12px 24px',
                  fontSize: 15, fontWeight: 600, display: 'inline-block',
                }}>
                  Add Concierge to My Booking →
                </Link>
              </div>

              {/* Right: Feature grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
              }}>
                {CONCIERGE_FEATURES.map(feat => (
                  <div key={feat.label} style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, padding: 20,
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{feat.icon}</div>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: 14, marginBottom: 4 }}>{feat.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{feat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                PATIENT STORIES
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>
                Real Patients. Real Savings.
              </h2>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24,
            }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-lg)', padding: 28,
                }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                    {'★★★★★'.split('').map((s, j) => (
                      <span key={j} style={{ color: '#F39C12', fontSize: 16 }}>{s}</span>
                    ))}
                  </div>

                  <p style={{
                    fontSize: 14, color: 'var(--text)', lineHeight: 1.8,
                    marginBottom: 20, fontStyle: 'italic',
                  }}>
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.location}</div>
                      <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>{t.scan}</div>
                    </div>
                    <div style={{
                      background: '#D1F2EB', color: '#0E6655',
                      borderRadius: 8, padding: '6px 12px',
                      fontSize: 13, fontWeight: 700,
                    }}>
                      {t.saving}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PRICE COMPARISON CTA
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{
            maxWidth: 900, margin: '0 auto',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-2) 100%)',
            borderRadius: 'var(--radius-xl)', padding: '56px 48px',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05,
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff', marginBottom: 16,
              }}>
                NHS Waiting List Too Long?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
                The average NHS wait for a PET-CT is 12–18 months.
                thediagnostic has appointments available within 3–7 days —
                at a fraction of UK private hospital prices.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book" style={{
                  background: '#fff', color: 'var(--primary)',
                  borderRadius: 10, padding: '14px 28px',
                  fontSize: 16, fontWeight: 700, display: 'inline-block',
                }}>
                  Find a Slot This Week →
                </Link>
                <Link href="/compare/pet-ct-uk-vs-turkey" style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff', borderRadius: 10, padding: '14px 28px',
                  fontSize: 16, fontWeight: 500, display: 'inline-block',
                }}>
                  Compare Prices
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            WHATSAPP FLOAT
        ══════════════════════════════════════════════ */}
        <a
          href="https://wa.me/447700000000?text=Hi%2C%20I%27d%20like%20to%20book%20a%20scan%20abroad"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 999,
            background: '#25D366', color: '#fff',
            width: 60, height: 60, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
            transition: 'transform 0.2s',
          }}
          title="Chat on WhatsApp"
        >
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </main>
      <Footer />
    </>
  );
}

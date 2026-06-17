import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Advanced Medical Imaging Abroad | Scan Types | thediagnostic',
  description: 'PET-CT, MRI 3T, GammaKnife, SPECT-CT, PET-MRI — book advanced diagnostics at accredited clinics in Turkey. Save up to 70% vs UK private prices.',
};

const SCANS = [
  { code: 'pet_ct', icon: '🔬', name: 'PET-CT Scan', href: '/scan/pet-ct', from: 1200, category: 'Nuclear Medicine', tagline: 'Full-body cancer & disease detection at cellular level', saving: 70 },
  { code: 'mri_3t', icon: '🧲', name: 'MRI 3T', href: '/scan/mri-3t', from: 320, category: 'Magnetic Resonance', tagline: 'High-field soft tissue imaging for brain, spine & joints', saving: 73 },
  { code: 'gamma_knife', icon: '⚡', name: 'GammaKnife', href: '/scan/gamma-knife', from: 6500, category: 'Radiosurgery', tagline: 'Non-invasive brain tumour treatment — no incision', saving: 68 },
  { code: 'spect_ct', icon: '💫', name: 'SPECT-CT', href: '/scan/spect-ct', from: 650, category: 'Nuclear Medicine', tagline: 'Bone, thyroid, cardiac & renal perfusion studies', saving: 70 },
  { code: 'pet_mri', icon: '🔮', name: 'PET-MRI', href: '/scan/pet-mri', from: 1850, category: 'Hybrid Imaging', tagline: 'Simultaneous metabolic + tissue imaging — most advanced', saving: 66 },
  { code: 'mri_whole_body', icon: '🫁', name: 'Whole Body MRI', href: '/scan/whole-body-mri', from: 950, category: 'Magnetic Resonance', tagline: 'Complete screening — head to toe, no radiation', saving: 73 },
  { code: 'ct_angio', icon: '🫀', name: 'CT Angiography', href: '/scan/ct-angio', from: 280, category: 'CT Imaging', tagline: 'Non-invasive coronary, pulmonary & carotid artery imaging', saving: 69 },
];

export default function ScanIndexPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: 'var(--grad-hero)', padding: '72px 24px 56px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', marginBottom: 16 }}>Advanced Medical Imaging</h1>
            <p style={{ color: 'var(--text-on-navy-muted)', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>Technologies not available on the NHS — or with 12–18 month waiting lists. Book within days.</p>
          </div>
        </section>
        <section style={{ padding: '64px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {SCANS.map(scan => (
                <Link key={scan.code} href={scan.href} style={{ display: 'block', background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textDecoration: 'none' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{scan.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{scan.category}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--navy)', marginBottom: 8 }}>{scan.name}</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 18 }}>{scan.tagline}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>From </span>
                      <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>£{scan.from.toLocaleString()}</span>
                    </div>
                    <span style={{ background: 'var(--blue-light)', color: 'var(--blue-dark)', borderRadius: 100, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>Save {scan.saving}%</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

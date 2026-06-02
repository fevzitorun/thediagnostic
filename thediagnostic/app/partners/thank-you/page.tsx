import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Application received — ScanBook Partners',
}

export default function PartnerThankYouPage() {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAF7', padding: '80px 24px' }}>
        <div style={{ maxWidth: 540, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>🎉</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 40, color: '#082A4A', letterSpacing: -1.2, marginBottom: 16 }}>
            Application received
          </h1>
          <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
            Thank you for applying to partner with ScanBook. We'll review your application and be in touch within <strong>one working day</strong>.
          </p>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 40 }}>
            Look out for a confirmation email. Questions? Contact us at{' '}
            <a href="mailto:partnerships@scanbook.co.uk" style={{ color: '#0F4C81', textDecoration: 'none', fontWeight: 600 }}>
              partnerships@scanbook.co.uk
            </a>
          </p>
          <Link
            href="/"
            style={{ display: 'inline-block', padding: '13px 28px', background: '#082A4A', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
          >
            ← Back to ScanBook
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}

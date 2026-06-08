import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Booking Confirmed! | thediagnostic',
  description: 'Your appointment has been confirmed. Check your email for details.',
};

export default function BookSuccessPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', padding: '80px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--accent-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', fontSize: 36,
          }}>
            ✅
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--primary-3)', marginBottom: 12 }}>
            Booking Confirmed!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Your appointment is confirmed. A confirmation email with all details,
            clinic address, and preparation instructions has been sent to your inbox.
          </p>

          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: 28, textAlign: 'left', marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--primary)', marginBottom: 20 }}>
              What Happens Next
            </h2>
            {[
              { icon: '📧', title: 'Confirmation Email', desc: 'Check your inbox — full booking details, clinic address, and preparation guide.' },
              { icon: '📱', title: 'WhatsApp Reminder', desc: 'We\'ll send a reminder 24 hours before your appointment via WhatsApp.' },
              { icon: '🛫', title: 'Travel to Istanbul', desc: 'Arrive at the clinic 15 minutes early. Bring your booking reference and ID.' },
              { icon: '📄', title: 'Report in 24 Hours', desc: 'Your English-language report will be available in your patient portal within 24 hours of your scan.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i < 3 ? 18 : 0 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/patient/dashboard" style={{
              background: 'var(--primary)', color: '#fff',
              borderRadius: 9, padding: '12px 24px',
              fontSize: 15, fontWeight: 600,
            }}>
              Go to My Dashboard
            </Link>
            <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer"
              style={{
                background: '#25D366', color: '#fff',
                borderRadius: 9, padding: '12px 24px',
                fontSize: 15, fontWeight: 600,
              }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

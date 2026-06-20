import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'
import { formatBookingRef } from '@/lib/format'

export const metadata = { title: 'My Dashboard — thediagnostic' }
export const dynamic = 'force-dynamic'

const STATUS: Record<string, { bg: string; color: string; label: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e', label: 'Pending' },
  confirmed: { bg: '#dcfce7', color: '#166534', label: 'Confirmed' },
  completed: { bg: '#e0f2fe', color: '#0369a1', label: 'Completed' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' },
}

export default async function PatientDashboard() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const [profileRows, bookingRows] = await Promise.all([
    sql`SELECT first_name, last_name, nationality, preferred_currency FROM profiles WHERE id = ${user.id} LIMIT 1`,
    sql`SELECT id, booking_ref, status, clinic_name, package_name, body_part, appointment_date, amount_paid, report_url, created_at
        FROM bookings WHERE patient_id = ${user.id} ORDER BY created_at DESC LIMIT 12`,
  ])

  const profile = profileRows[0] ?? {}
  const firstName = (profile.first_name as string | null) || user.email?.split('@')[0] || 'there'
  const bookings = bookingRows  as unknown as {
    id: string; booking_ref: string; status: string; clinic_name: string | null;
    package_name: string | null; body_part: string | null; appointment_date: string | null;
    amount_paid: number | null; report_url: string | null; created_at: string;
  }[]

  const upcoming = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending')
  const past     = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled')

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#3AABDB', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Patient Portal</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 34, color: 'var(--primary)', letterSpacing: -0.5, marginBottom: 6 }}>
          Welcome back, {firstName}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Manage your scans, view reports, and track your bookings.</p>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
        {[
          { icon: '🔬', title: 'Book a Scan', desc: 'PET-CT, MRI 3T, GammaKnife and 60+ technologies in Istanbul', href: '/book', cta: 'Browse scans' },
          { icon: '📄', title: 'My Reports',  desc: 'Download your radiologist reports and DICOM images', href: '/patient/reports', cta: 'View reports' },
          { icon: '👤', title: 'My Profile',  desc: 'Update your details, passport, emergency contact', href: '/patient/profile', cta: 'Edit profile' },
        ].map(card => (
          <div key={card.href} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--brand-blue) 0%, var(--accent) 100%)' }} />
            <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)', marginBottom: 4 }}>{card.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>{card.desc}</div>
            <Link href={card.href} style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-blue)', textDecoration: 'none' }}>{card.cta} →</Link>
          </div>
        ))}
      </div>

      {/* Upcoming bookings */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>Upcoming appointments</h2>
          <Link href="/patient/bookings" style={{ fontSize: 13, color: 'var(--brand-blue)', textDecoration: 'none' }}>View all →</Link>
        </div>
        {upcoming.length === 0 ? (
          <EmptyCard icon="📅" title="No upcoming appointments" desc="When you book a scan, your appointments will appear here." cta="Book a scan" href="/book" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcoming.map(b => <BookingRow key={b.id} booking={b} />)}
          </div>
        )}
      </section>

      {/* Past scans */}
      {past.length > 0 && (
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)', marginBottom: 18 }}>Past scans</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {past.map(b => <BookingRow key={b.id} booking={b} dim />)}
          </div>
        </section>
      )}
    </>
  )
}

function BookingRow({ booking: b, dim }: { booking: { id: string; booking_ref: string; status: string; clinic_name: string | null; package_name: string | null; body_part: string | null; appointment_date: string | null; amount_paid: number | null; report_url: string | null }; dim?: boolean }) {
  const s = STATUS[b.status] ?? STATUS.pending
  const ref = b.booking_ref || formatBookingRef(b.id)
  return (
    <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, opacity: dim ? 0.75 : 1 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>{b.package_name ?? 'Scan'}{b.body_part ? ` — ${b.body_part}` : ''}</span>
          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{b.clinic_name ?? 'Clinic'}{b.appointment_date ? ` · ${b.appointment_date}` : ''}</div>
        <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>Ref: {ref}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {b.amount_paid && <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>£{Number(b.amount_paid).toLocaleString()}</span>}
        {b.report_url && (
          <a href={b.report_url} target="_blank" rel="noopener noreferrer" style={{ padding: '7px 14px', background: '#D1F2EB', color: '#0E6655', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>↓ Report</a>
        )}
        <Link href={`/patient/bookings`} style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', padding: '7px 14px', border: '1px solid var(--line)', borderRadius: 8 }}>Details</Link>
      </div>
    </div>
  )
}

function EmptyCard({ icon, title, desc, cta, href }: { icon: string; title: string; desc: string; cta: string; href: string }) {
  return (
    <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>{desc}</div>
      <Link href={href} style={{ display: 'inline-block', padding: '10px 22px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>{cta}</Link>
    </div>
  )
}

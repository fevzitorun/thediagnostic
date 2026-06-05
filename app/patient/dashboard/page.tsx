// @ts-nocheck
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'My Dashboard' }

export default async function PatientDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, phone')
    .eq('id', user.id)
    .single()

  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      id, booking_ref, status, created_at,
      amount_paid, currency,
      clinics ( name, address_city ),
      scan_types ( name, category )
    `)
    .eq('patient_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const firstName = profile?.first_name || user.email?.split('@')[0] || 'there'

  const upcoming = (bookings ?? []).filter(b => b.status === 'confirmed' || b.status === 'pending')
  const past = (bookings ?? []).filter(b => b.status === 'completed' || b.status === 'cancelled')

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#0F4C81', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          Patient Portal
        </p>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, color: '#111', letterSpacing: -0.5, marginBottom: 6 }}>
          Welcome back, {firstName}
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>
          Manage your scans, view reports, and track your bookings.
        </p>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
        {[
          { icon: '🔍', title: 'Book a scan', desc: 'Find and book a private scan near you', href: '/search', cta: 'Search clinics' },
          { icon: '📄', title: 'My reports', desc: 'Download your radiologist reports', href: '/patient/reports', cta: 'View reports' },
          { icon: '👤', title: 'My profile', desc: 'Update your details and preferences', href: '/patient/profile', cta: 'Edit profile' },
        ].map(card => (
          <div
            key={card.href}
            style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '22px 20px' }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 4 }}>{card.title}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 16, lineHeight: 1.5 }}>{card.desc}</div>
            <Link
              href={card.href}
              style={{ fontSize: 13, fontWeight: 600, color: '#0F4C81', textDecoration: 'none' }}
            >
              {card.cta} →
            </Link>
          </div>
        ))}
      </div>

      {/* Upcoming bookings */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>Upcoming appointments</h2>
          <Link href="/patient/bookings" style={{ fontSize: 13, color: '#0F4C81', textDecoration: 'none' }}>
            View all →
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <EmptyState
            icon="📅"
            title="No upcoming appointments"
            desc="When you book a scan, your appointments will appear here."
            cta="Book your first scan"
            ctaHref="/search"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcoming.map(b => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        )}
      </section>

      {/* Past bookings */}
      {past.length > 0 && (
        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 18 }}>Past scans</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {past.map(b => (
              <BookingCard key={b.id} booking={b} past />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

// ─── BOOKING CARD ──────────────────────────────────────────────────────────────

function BookingCard({ booking, past }: { booking: any; past?: boolean }) {
  const statusColors: Record<string, { bg: string; color: string; label: string }> = {
    pending:   { bg: '#fef9c3', color: '#854d0e', label: 'Pending' },
    confirmed: { bg: '#dcfce7', color: '#166534', label: 'Confirmed' },
    completed: { bg: '#f0f9ff', color: '#0369a1', label: 'Completed' },
    cancelled: { bg: '#fef2f2', color: '#991b1b', label: 'Cancelled' },
  }
  const s = statusColors[booking.status] ?? statusColors.pending

  return (
    <div style={{
      background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '16px 20px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
      opacity: past ? 0.8 : 1,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>
            {(booking.scan_types as any)?.name ?? 'Scan'}
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {s.label}
          </span>
        </div>
        <div style={{ fontSize: 13, color: '#666' }}>
          {(booking.clinics as any)?.name ?? 'Clinic'} · {(booking.clinics as any)?.address_city ?? ''}
        </div>
        <div style={{ fontSize: 12, color: '#bbb', marginTop: 3 }}>
          Ref: {booking.booking_ref}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        {booking.amount_paid && (
          <span style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>
            £{booking.amount_paid}
          </span>
        )}
        <Link
          href={`/patient/bookings/${booking.id}`}
          style={{ fontSize: 12, fontWeight: 600, color: '#0F4C81', textDecoration: 'none', padding: '7px 14px', border: '1px solid #E5E1D8', borderRadius: 8, background: '#E8F0F8' }}
        >
          View details
        </Link>
      </div>
    </div>
  )
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────

function EmptyState({ icon, title, desc, cta, ctaHref }: {
  icon: string; title: string; desc: string; cta: string; ctaHref: string
}) {
  return (
    <div style={{
      background: '#fff', border: '1px dashed #ddd', borderRadius: 14,
      padding: '40px 24px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>{desc}</div>
      <Link
        href={ctaHref}
        style={{ display: 'inline-block', padding: '10px 22px', background: '#082A4A', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
      >
        {cta}
      </Link>
    </div>
  )
}

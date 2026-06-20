import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'
import { formatBookingRef } from '@/lib/format'

export const metadata = { title: 'My Reports — thediagnostic' }
export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const rows = await sql`
    SELECT id, booking_ref, package_name, body_part, clinic_name, appointment_date, report_url, status, created_at
    FROM bookings
    WHERE patient_id = ${user.id}
      AND status IN ('completed', 'confirmed')
    ORDER BY appointment_date DESC NULLS LAST
  `

  const bookings = rows as { id: string; booking_ref: string; package_name: string | null; body_part: string | null; clinic_name: string | null; appointment_date: string | null; report_url: string | null; status: string; created_at: string }[]
  const withReport = bookings.filter(b => b.report_url)
  const pending    = bookings.filter(b => !b.report_url && b.status === 'completed')
  const upcoming   = bookings.filter(b => b.status === 'confirmed')

  return (
    <>
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#3AABDB', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Patient Portal</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary)', letterSpacing: -0.5, marginBottom: 6 }}>My Reports</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Download your radiology reports and DICOM images. Typically available within 24 hours of your scan.</p>
      </div>

      {/* Available reports */}
      {withReport.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>Available ({withReport.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {withReport.map(b => {
              const ref = b.booking_ref || formatBookingRef(b.id)
              return (
                <div key={b.id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 3 }}>{b.package_name ?? 'Scan'}{b.body_part ? ` — ${b.body_part}` : ''}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{b.clinic_name}{b.appointment_date ? ` · ${b.appointment_date}` : ''}</div>
                    <div style={{ fontSize: 11, color: '#bbb', marginTop: 2, fontFamily: 'monospace' }}>{ref}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                    <Link href="/patient/bookings" style={{ padding: '8px 14px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>View booking</Link>
                    <a href={b.report_url!} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>↓ Download PDF</a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Reports being prepared */}
      {pending.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>Being Prepared ({pending.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pending.map(b => (
              <div key={b.id} style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 3 }}>{b.package_name ?? 'Scan'}{b.body_part ? ` — ${b.body_part}` : ''}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{b.clinic_name}{b.appointment_date ? ` · ${b.appointment_date}` : ''}</div>
                </div>
                <div style={{ fontSize: 12, color: '#92400e', fontWeight: 600 }}>⏳ Report in progress</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>Upcoming Scans ({upcoming.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcoming.map(b => (
              <div key={b.id} style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 3 }}>{b.package_name ?? 'Scan'}{b.body_part ? ` — ${b.body_part}` : ''}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{b.clinic_name}{b.appointment_date ? ` · ${b.appointment_date}` : ''}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Report available after your scan</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {withReport.length === 0 && pending.length === 0 && upcoming.length === 0 && (
        <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 16, padding: '56px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>📄</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)', marginBottom: 6 }}>No reports yet</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 22, lineHeight: 1.6 }}>Reports appear here after your radiologist completes their analysis.</div>
          <Link href="/book" style={{ display: 'inline-block', padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Book a Scan</Link>
        </div>
      )}
    </>
  )
}

// @ts-nocheck
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'My Reports' }

export default async function ReportsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Completed bookings that may have reports
  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, booking_ref, package_name, body_part, clinic_name, appointment_date, report_url, status, created_at')
    .eq('patient_id', user.id)
    .in('status', ['completed', 'confirmed'])
    .order('appointment_date', { ascending: false })

  const withReport = (bookings ?? []).filter(b => b.report_url)
  const pending = (bookings ?? []).filter(b => !b.report_url && b.status === 'completed')
  const upcoming = (bookings ?? []).filter(b => b.status === 'confirmed')

  return (
    <>
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#0F4C81', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          Patient Portal
        </p>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: '#111', letterSpacing: -0.5, marginBottom: 6 }}>
          My reports
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>
          Download your radiology reports. Reports are typically available within 24 hours of your scan.
        </p>
      </div>

      {/* Reports available */}
      {withReport.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 14 }}>
            Available reports ({withReport.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {withReport.map(b => (
              <div key={b.id} style={{
                background: '#fff', border: '1px solid #ebebeb', borderRadius: 12,
                padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 3 }}>
                    {b.package_name}{b.body_part ? ` — ${b.body_part}` : ''}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>
                    {b.clinic_name} · {b.appointment_date}
                  </div>
                  <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>Ref: {b.booking_ref}</div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                  <Link
                    href={`/patient/bookings/${b.id}`}
                    style={{ padding: '8px 14px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 12, color: '#666', textDecoration: 'none' }}
                  >
                    View booking
                  </Link>
                  <a
                    href={b.report_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '8px 16px', background: '#082A4A', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    ↓ Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reports being prepared */}
      {pending.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 14 }}>
            Being prepared
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pending.map(b => (
              <div key={b.id} style={{
                background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12,
                padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 3 }}>
                    {b.package_name}{b.body_part ? ` — ${b.body_part}` : ''}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>
                    {b.clinic_name} · {b.appointment_date}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#92400e', fontWeight: 500 }}>
                  ⏳ Report in progress
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming scans */}
      {upcoming.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 14 }}>
            Upcoming scans
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcoming.map(b => (
              <div key={b.id} style={{
                background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 12,
                padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 3 }}>
                    {b.package_name}{b.body_part ? ` — ${b.body_part}` : ''}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>
                    {b.clinic_name} · {b.appointment_date}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#888' }}>Report available after your scan</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {withReport.length === 0 && pending.length === 0 && upcoming.length === 0 && (
        <div style={{
          background: '#fff', border: '1px dashed #ddd', borderRadius: 16,
          padding: '56px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>📄</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 6 }}>No reports yet</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 22, lineHeight: 1.6 }}>
            Reports appear here after your scan is completed by the radiologist.
          </div>
          <Link
            href="/search"
            style={{ display: 'inline-block', padding: '10px 24px', background: '#082A4A', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
          >
            Book a scan
          </Link>
        </div>
      )}
    </>
  )
}

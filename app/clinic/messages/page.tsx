import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Messages — Clinic Portal' }
export const dynamic = 'force-dynamic'

export default async function ClinicMessagesPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const clinicRows = await sql`
    SELECT tc.id FROM clinic_admins ca JOIN tr_clinics tc ON tc.id = ca.clinic_id
    WHERE ca.user_id = ${user.id} LIMIT 1
  `
  if (!clinicRows[0]) redirect('/clinic/dashboard')
  const clinicId = (clinicRows[0] as { id: string }).id

  // WhatsApp conversations linked to this clinic's bookings
  let conversations: { id: string; patient_name: string | null; patient_phone: string; last_message_at: string | null; status: string; locale: string | null; booking_id: string | null }[] = []
  try {
    const rows = await sql`
      SELECT wc.id, wc.patient_name, wc.patient_phone, wc.last_message_at, wc.status, wc.locale, wc.booking_id
      FROM whatsapp_conversations wc
      WHERE wc.booking_id IN (SELECT id FROM bookings WHERE tr_clinic_id = ${clinicId})
      ORDER BY wc.last_message_at DESC NULLS LAST
      LIMIT 50
    `
    conversations = rows as typeof conversations
  } catch {
    // table may not exist yet
  }

  // Recent bookings with patient contact info as fallback messaging surface
  const bookingRows = await sql`
    SELECT id, booking_ref, patient_name, patient_email, patient_phone, status, created_at
    FROM bookings
    WHERE tr_clinic_id = ${clinicId}
    ORDER BY created_at DESC
    LIMIT 20
  `
  const bookings = bookingRows as { id: string; booking_ref: string; patient_name: string | null; patient_email: string | null; patient_phone: string | null; status: string; created_at: string }[]

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Messages</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>WhatsApp conversations and patient contact details</p>
      </div>

      {conversations.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>WhatsApp conversations</div>
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
            {conversations.map((conv, i) => (
              <div key={conv.id} style={{ padding: '15px 20px', borderBottom: i < conversations.length - 1 ? '1px solid #f5f5f5' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#25D36620', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>💬</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary)', marginBottom: 2 }}>{conv.patient_name ?? conv.patient_phone}</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>{conv.patient_phone} · {conv.locale?.toUpperCase() ?? 'EN'}</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <span style={{ padding: '3px 9px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: conv.status === 'active' ? '#dcfce7' : '#f3f4f6', color: conv.status === 'active' ? '#166534' : '#888' }}>
                    {conv.status}
                  </span>
                  {conv.last_message_at && (
                    <div style={{ fontSize: 10, color: '#bbb', marginTop: 4 }}>
                      {new Date(conv.last_message_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Patient contact directory */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Patient contacts ({bookings.length})</div>
        {bookings.length === 0 ? (
          <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✉</div>
            No patients yet
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
            {bookings.map((b, i) => (
              <div key={b.id} style={{ padding: '14px 20px', borderBottom: i < bookings.length - 1 ? '1px solid #f5f5f5' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</div>
                  <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>
                    {b.patient_email && <span>{b.patient_email}</span>}
                    {b.patient_phone && <span style={{ marginLeft: 10 }}>{b.patient_phone}</span>}
                  </div>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#bbb' }}>{b.booking_ref}</span>
                  {b.patient_phone && (
                    <a href={`https://wa.me/${b.patient_phone.replace(/\D/g, '')}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ padding: '5px 10px', background: '#25D366', color: '#fff', borderRadius: 6, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>
                      WhatsApp
                    </a>
                  )}
                  {b.patient_email && (
                    <a href={`mailto:${b.patient_email}`}
                      style={{ padding: '5px 10px', background: '#f3f4f6', color: '#555', borderRadius: 6, fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>
                      Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, padding: '14px 18px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 10, fontSize: 12, color: 'var(--text-muted)' }}>
        💬 For platform support or to report an issue, contact <strong>info@thediagnostic.co.uk</strong>
      </div>
    </>
  )
}

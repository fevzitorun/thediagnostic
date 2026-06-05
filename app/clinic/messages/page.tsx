// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Messages — Clinic' }

export default async function ClinicMessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('clinic_id')
    .eq('id', user.id)
    .single()

  if (!profile?.clinic_id) redirect('/clinic/dashboard')

  // Fetch messages for this clinic
  const { data: messages } = await supabase
    .from('messages')
    .select('id, subject, body, from_name, from_email, created_at, read_at, booking_ref')
    .eq('clinic_id', profile.clinic_id)
    .order('created_at', { ascending: false })
    .limit(50)

  const unreadCount = messages?.filter(m => !m.read_at).length ?? 0

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>
          Messages {unreadCount > 0 && (
            <span style={{ marginLeft: 8, padding: '2px 8px', background: '#dc2626', color: '#fff', borderRadius: 10, fontSize: 13 }}>{unreadCount}</span>
          )}
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>Enquiries and notifications from patients and ScanBook</p>
      </div>

      {!messages || messages.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed #ddd', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✉</div>
          <div>No messages yet</div>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              style={{
                padding: '16px 22px',
                borderBottom: i < messages.length - 1 ? '1px solid #f5f5f5' : 'none',
                background: msg.read_at ? '#fff' : '#f0f9ff',
                display: 'flex', alignItems: 'center', gap: 16,
              }}
            >
              {!msg.read_at && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: msg.read_at ? 500 : 700, fontSize: 14, color: '#111', marginBottom: 2 }}>
                  {msg.subject ?? '(No subject)'}
                </div>
                <div style={{ fontSize: 12, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg.from_name ? `${msg.from_name} · ` : ''}{msg.body ?? ''}
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#aaa' }}>
                  {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </div>
                {msg.booking_ref && (
                  <div style={{ fontSize: 10, color: '#bbb', fontFamily: 'monospace', marginTop: 2 }}>{msg.booking_ref}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 24, padding: '16px 20px', background: '#f9fafb', border: '1px solid #ebebeb', borderRadius: 12, fontSize: 13, color: '#888' }}>
        💬 To reply to a patient, contact them directly via the email or phone number shown in their appointment.
        For platform support, email <strong>support@scanbook.co.uk</strong>
      </div>
    </>
  )
}

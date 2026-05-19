// @ts-nocheck
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Messages — Admin' }

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  const { data: messages } = await supabase
    .from('messages')
    .select('id, subject, body, from_name, from_email, clinic_name, created_at, read_at, booking_ref')
    .order('created_at', { ascending: false })
    .limit(50)

  const unreadCount = messages?.filter(m => !m.read_at).length ?? 0

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>
          Messages
          {unreadCount > 0 && (
            <span style={{ marginLeft: 10, padding: '2px 10px', background: '#dc2626', color: '#fff', borderRadius: 12, fontSize: 14 }}>{unreadCount}</span>
          )}
        </h1>
        <p style={{ fontSize: 14, color: '#888' }}>All platform messages</p>
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
                padding: '16px 22px', borderBottom: i < messages.length - 1 ? '1px solid #f5f5f5' : 'none',
                background: msg.read_at ? '#fff' : '#f0f9ff',
                display: 'flex', alignItems: 'center', gap: 16,
              }}
            >
              {!msg.read_at && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: msg.read_at ? 500 : 700, fontSize: 14, color: '#111', marginBottom: 2 }}>
                  {msg.subject ?? '(No subject)'}
                </div>
                <div style={{ fontSize: 12, color: '#888' }}>
                  {msg.from_name ?? msg.from_email ?? 'Unknown'}
                  {msg.clinic_name ? ` · ${msg.clinic_name}` : ''}
                </div>
                <div style={{ fontSize: 12, color: '#aaa', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg.body}
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#aaa' }}>
                  {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </div>
                {msg.booking_ref && (
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#bbb', marginTop: 2 }}>{msg.booking_ref}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

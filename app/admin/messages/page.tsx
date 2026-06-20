import { sql } from '@/lib/db'

export const metadata = { title: 'Messages — Admin' }
export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  let messages: { id: string; name: string | null; email: string | null; phone: string | null; subject: string | null; message: string; created_at: string }[] = []
  try {
    const rows = await sql`
      SELECT id, name, email, phone, subject, message, created_at
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT 50
    `
    messages = rows as typeof messages
  } catch {
    // contact_messages table not yet created — show empty state
  }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Messages</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Contact form submissions from thediagnostic.co.uk/contact</p>
      </div>

      {messages.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✉</div>
          <div style={{ marginBottom: 8 }}>No messages yet</div>
          <div style={{ fontSize: 12 }}>Messages submitted via /contact will appear here</div>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
          {messages.map((msg, i) => (
            <div key={msg.id} style={{ padding: '16px 22px', borderBottom: i < messages.length - 1 ? '1px solid #f5f5f5' : 'none', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EBF4FA', display: 'grid', placeItems: 'center', fontSize: 15, flexShrink: 0 }}>✉</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary)', marginBottom: 2 }}>
                  {msg.subject ?? '(No subject)'}
                </div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>
                  {msg.name ?? 'Unknown'} · {msg.email}{msg.phone ? ` · ${msg.phone}` : ''}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {msg.message}
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#aaa' }}>
                  {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                </div>
                {msg.email && (
                  <a href={`mailto:${msg.email}`} style={{ fontSize: 11, color: '#3AABDB', textDecoration: 'none', marginTop: 4, display: 'block' }}>Reply →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

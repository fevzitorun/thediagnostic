'use client'

import { useState } from 'react'

interface Lead {
  id: string
  created_at: string
  first_name?: string
  last_name?: string
  job_title?: string
  centre_name: string
  email: string
  phone?: string
  website?: string
  cqc_id?: string
  region?: string
  weekly_slots?: string
  notes?: string
  status: string
  source?: string
  internal_notes?: string
  next_follow_up?: string
}

interface Stats {
  total: number
  new: number
  contacted: number
  meetings: number
  converted: number
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new:             { bg: '#EFF6FF', text: '#1D4ED8' },
  contacted:       { bg: '#FFF7ED', text: '#C2410C' },
  meeting_booked:  { bg: '#F0FDF4', text: '#15803D' },
  contract_sent:   { bg: '#FDF4FF', text: '#7E22CE' },
  converted:       { bg: '#ECFDF5', text: '#065F46' },
  rejected:        { bg: '#F9FAFB', text: '#6B7280' },
  opted_out:       { bg: '#F9FAFB', text: '#9CA3AF' },
}

const STATUS_LABELS: Record<string, string> = {
  new: 'New', contacted: 'Contacted', meeting_booked: 'Meeting booked',
  contract_sent: 'Contract sent', converted: 'Converted',
  rejected: 'Rejected', opted_out: 'Opted out',
}

export default function OutreachCRMClient({ leads, stats }: { leads: Lead[]; stats: Stats }) {
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)

  const filtered = leads.filter(l => {
    const matchesStatus = filter === 'all' || l.status === filter
    const matchesSearch = !search || [l.centre_name, l.email, l.region, l.cqc_id]
      .some(v => v?.toLowerCase().includes(search.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#082A4A', margin: '0 0 4px' }}>Clinic Outreach CRM</h1>
        <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
          Track partnership applications and outreach responses.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'Total leads', value: stats.total, color: '#082A4A' },
          { label: 'New', value: stats.new, color: '#1D4ED8' },
          { label: 'Contacted', value: stats.contacted, color: '#C2410C' },
          { label: 'Meetings', value: stats.meetings, color: '#15803D' },
          { label: 'Converted', value: stats.converted, color: '#065F46' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1.5px solid #E5E1D8', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, region…"
          style={{ padding: '8px 12px', border: '1.5px solid #E5E1D8', borderRadius: 8, fontSize: 13, width: 240 }}
        />
        {['all', 'new', 'contacted', 'meeting_booked', 'converted'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
              border: filter === s ? '1.5px solid #082A4A' : '1.5px solid #E5E1D8',
              background: filter === s ? '#082A4A' : '#fff',
              color: filter === s ? '#fff' : '#6B7280',
              cursor: 'pointer',
            }}
          >
            {s === 'all' ? 'All' : STATUS_LABELS[s]}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: '#9CA3AF' }}>
          {filtered.length} record{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1.5px solid #E5E1D8', borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F9FAFB' }}>
              {['Centre', 'Contact', 'Region', 'CQC ID', 'Source', 'Status', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, borderBottom: '1.5px solid #E5E1D8' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: '40px', textAlign: 'center', fontSize: 14, color: '#9CA3AF' }}>
                  No leads match your filters.
                </td>
              </tr>
            )}
            {filtered.map((lead, i) => {
              const sc = STATUS_COLORS[lead.status] ?? STATUS_COLORS.new
              return (
                <tr
                  key={lead.id}
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none', cursor: 'pointer' }}
                  onClick={() => setSelected(lead)}
                >
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{lead.centre_name}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{lead.email}</div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#374151' }}>
                    {[lead.first_name, lead.last_name].filter(Boolean).join(' ') || '—'}
                    {lead.job_title && <div style={{ fontSize: 11, color: '#9CA3AF' }}>{lead.job_title}</div>}
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#374151' }}>{lead.region || '—'}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#6B7280', fontFamily: 'monospace' }}>{lead.cqc_id || '—'}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#6B7280' }}>
                    {lead.source === 'outreach_agent' ? 'Outreach' : lead.source === 'website_form' ? 'Web form' : lead.source || '—'}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 20, background: sc.bg, color: sc.text, fontSize: 11, fontWeight: 700 }}>
                      {STATUS_LABELS[lead.status] ?? lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#9CA3AF' }}>
                    {new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <button
                      onClick={e => { e.stopPropagation(); setSelected(lead) }}
                      style={{ fontSize: 12, color: '#0F4C81', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                    >
                      View →
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Detail drawer */}
      {selected && (
        <LeadDrawer lead={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const [status, setStatus] = useState(lead.status)
  const [notes, setNotes] = useState(lead.internal_notes ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function save() {
    setSaving(true)
    const res = await fetch(`/api/admin/partner-leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, internal_notes: notes }),
    })
    setSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  const sc = STATUS_COLORS[status] ?? STATUS_COLORS.new

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.3)', zIndex: 40 }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 440,
        background: '#fff', zIndex: 50, overflowY: 'auto',
        borderLeft: '1.5px solid #E5E1D8', padding: 32,
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#082A4A' }}>{lead.centre_name}</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{lead.email}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#9CA3AF' }}>✕</button>
        </div>

        {/* Status */}
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            style={{ padding: '8px 12px', border: `1.5px solid ${sc.text}`, borderRadius: 8, fontSize: 13, background: sc.bg, color: sc.text, fontWeight: 600 }}
          >
            {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        {/* Details */}
        <div style={{ background: '#F9FAFB', borderRadius: 12, padding: '16px 20px' }}>
          {[
            ['Contact', [lead.first_name, lead.last_name].filter(Boolean).join(' ') || '—'],
            ['Job title', lead.job_title || '—'],
            ['Phone', lead.phone || '—'],
            ['Website', lead.website || '—'],
            ['CQC ID', lead.cqc_id || '—'],
            ['Region', lead.region || '—'],
            ['Weekly slots', lead.weekly_slots || '—'],
            ['Source', lead.source || '—'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #E5E1D8' }}>
              <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 13, color: '#111', textAlign: 'right', maxWidth: '60%' }}>{v}</span>
            </div>
          ))}
        </div>

        {lead.notes && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Applicant notes</div>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, background: '#F9FAFB', padding: '12px 16px', borderRadius: 10 }}>{lead.notes}</p>
          </div>
        )}

        {/* Internal notes */}
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Internal notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={5}
            placeholder="Add internal notes about this lead…"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #E5E1D8', borderRadius: 8, fontSize: 13, resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={save}
            disabled={saving}
            style={{ flex: 1, padding: '11px', background: '#082A4A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save changes'}
          </button>
          <a
            href={`mailto:${lead.email}?subject=ScanBook partnership — ${lead.centre_name}`}
            style={{ padding: '11px 16px', border: '1.5px solid #E5E1D8', borderRadius: 8, fontSize: 13, color: '#374151', textDecoration: 'none', textAlign: 'center' }}
          >
            ✉ Email
          </a>
        </div>
      </div>
    </>
  )
}

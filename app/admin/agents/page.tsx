'use client'

import { useState } from 'react'

interface AgentCard {
  id: string
  name: string
  description: string
  endpoint: string
  icon: string
  defaultBody: Record<string, unknown>
  danger?: boolean
}

const AGENTS: AgentCard[] = [
  {
    id: 'triage',
    name: 'AI Triage',
    icon: '🧠',
    description: 'Symptom-to-scan recommendation. Used by the public-facing triage widget. Test it here.',
    endpoint: '/api/agents/triage',
    defaultBody: { symptoms: 'I have persistent lower back pain that radiates down my left leg, worse for 3 weeks' },
  },
  {
    id: 'patient-followup',
    name: 'Patient Follow-Up',
    icon: '📧',
    description: 'Dispatches post-scan follow-up emails (day 3, 7, 14, 30). Runs daily via cron.',
    endpoint: '/api/agents/patient-followup',
    defaultBody: {},
  },
  {
    id: 'clinic-outreach',
    name: 'Clinic Outreach',
    icon: '🏥',
    description: 'Fetches CQC-registered diagnostic imaging providers and sends partnership emails. Set dryRun: true to preview without sending.',
    endpoint: '/api/agents/clinic-outreach',
    defaultBody: { maxPages: 1, dryRun: true, region: 'London' },
    danger: true,
  },
]

export default function AgentsPage() {
  return (
    <div style={{ padding: '32px 40px', maxWidth: 1000 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#082A4A', margin: '0 0 6px' }}>Agent System</h1>
      <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 32px' }}>
        Manage and trigger AI agents. All agents require the <code style={{ background: '#F3F4F6', padding: '1px 5px', borderRadius: 4 }}>AGENT_SECRET</code> header.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {AGENTS.map(agent => <AgentPanel key={agent.id} agent={agent} />)}
      </div>
    </div>
  )
}

function AgentPanel({ agent }: { agent: AgentCard }) {
  const [body, setBody] = useState(JSON.stringify(agent.defaultBody, null, 2))
  const [secret, setSecret] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function run() {
    setError('')
    setResult(null)
    setLoading(true)

    try {
      const parsed = JSON.parse(body)
      const res = await fetch(agent.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-agent-secret': secret,
        },
        body: JSON.stringify(parsed),
      })
      const data = await res.json()
      setResult(JSON.stringify(data, null, 2))
      if (!res.ok) setError(`HTTP ${res.status}`)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: '#fff', border: `1.5px solid ${agent.danger ? '#FCA5A5' : '#E5E1D8'}`,
      borderRadius: 14, padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 28 }}>{agent.icon}</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{agent.name}</div>
          <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5, marginTop: 2 }}>{agent.description}</div>
        </div>
      </div>

      {agent.danger && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '8px 12px', marginBottom: 12, fontSize: 12, color: '#DC2626' }}>
          ⚠️ This agent sends real emails. Use <code>dryRun: true</code> for testing.
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: 4 }}>
          AGENT_SECRET
        </label>
        <input
          type="password"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          placeholder="From .env.local"
          style={{
            width: '100%', padding: '8px 10px', border: '1px solid #E5E1D8',
            borderRadius: 8, fontSize: 12, boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: 4 }}>
          Request body (JSON)
        </label>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={5}
          style={{
            width: '100%', padding: '8px 10px', border: '1px solid #E5E1D8',
            borderRadius: 8, fontSize: 11, fontFamily: 'monospace', boxSizing: 'border-box',
            resize: 'vertical',
          }}
        />
      </div>

      <button
        onClick={run}
        disabled={loading}
        style={{
          width: '100%', padding: '10px', background: loading ? '#9CA3AF' : '#082A4A',
          color: '#fff', border: 'none', borderRadius: 8, fontSize: 13,
          fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Running…' : `Run ${agent.name}`}
      </button>

      {error && (
        <div style={{ marginTop: 10, fontSize: 12, color: '#DC2626' }}>{error}</div>
      )}

      {result && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#15803D', marginBottom: 4 }}>Response</div>
          <pre style={{
            background: '#F9FAFB', borderRadius: 8, padding: '10px 12px',
            fontSize: 11, fontFamily: 'monospace', overflowX: 'auto',
            border: '1px solid #E5E1D8', margin: 0, whiteSpace: 'pre-wrap',
          }}>{result}</pre>
        </div>
      )}
    </div>
  )
}

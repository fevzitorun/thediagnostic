'use client';

import { useState, useEffect, useCallback } from 'react';

const SCAN_TYPES = [
  { code: 'pet_ct',        label: 'PET-CT Scan',       color: '#2698D3' },
  { code: 'mri_3t',        label: 'MRI 3T',            color: '#0B1D3A' },
  { code: 'mri_whole_body',label: 'Whole Body MRI',    color: '#0B1D3A' },
  { code: 'gamma_knife',   label: 'GammaKnife',        color: '#E67E22' },
  { code: 'pet_mri',       label: 'PET-MRI',           color: '#8E44AD' },
  { code: 'spect_ct',      label: 'SPECT-CT',          color: '#2980B9' },
  { code: 'ct_angio',      label: 'CT Angiography',    color: '#C0392B' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  available:  { bg: '#D1F2EB', color: '#0E6655', label: 'Available' },
  reserved:   { bg: '#FEF9C3', color: '#92400E', label: 'Reserved' },
  confirmed:  { bg: '#DBEAFE', color: '#1E40AF', label: 'Booked' },
  blocked:    { bg: '#F3F4F6', color: '#6B7280', label: 'Blocked' },
  cancelled:  { bg: '#FEE2E2', color: '#991B1B', label: 'Cancelled' },
};

interface Slot {
  id: string;
  scan_type_code: string;
  slot_date: string;
  slot_time: string;
  duration_minutes: number;
  status: string;
  price_gbp?: number;
  booking_ref?: string;
  patient_first_name?: string;
  patient_last_name?: string;
  patient_email?: string;
}

function fmt(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

export default function ClinicSlotsPage() {
  const today = new Date().toISOString().split('T')[0];
  const twoWeeks = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];

  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(twoWeeks);
  const [scanFilter, setScanFilter] = useState('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [addScan, setAddScan] = useState('mri_3t');
  const [addDate, setAddDate] = useState(today);
  const [addTime, setAddTime] = useState('09:00');
  const [addDuration, setAddDuration] = useState('60');
  const [addBulk, setAddBulk] = useState(false);
  const [addBulkDays, setAddBulkDays] = useState('14');

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ from, to });
    if (scanFilter) params.set('scan', scanFilter);
    const res = await fetch(`/api/clinic/slots?${params}`);
    if (res.ok) setSlots(await res.json() as Slot[]);
    setLoading(false);
  }, [from, to, scanFilter]);

  useEffect(() => { void load(); }, [load]);

  async function updateStatus(id: string, status: string) {
    setSaving(id);
    await fetch('/api/clinic/slots', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    await load();
    setSaving(null);
  }

  async function addSlots() {
    setSaving('add');
    if (addBulk) {
      const slotsToAdd = [];
      const times = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'];
      const days = parseInt(addBulkDays);
      for (let i = 3; i <= days + 2; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        if (d.getDay() === 0) continue;
        const date = d.toISOString().split('T')[0];
        for (const t of times) {
          slotsToAdd.push({ scan_type_code: addScan, slot_date: date, slot_time: t, duration_minutes: parseInt(addDuration) });
        }
      }
      await fetch('/api/clinic/slots', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slots: slotsToAdd }) });
    } else {
      await fetch('/api/clinic/slots', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ scan_type_code: addScan, slot_date: addDate, slot_time: addTime, duration_minutes: parseInt(addDuration) }) });
    }
    setShowAdd(false);
    await load();
    setSaving(null);
  }

  const grouped: Record<string, Slot[]> = {};
  for (const slot of slots) {
    if (!grouped[slot.slot_date]) grouped[slot.slot_date] = [];
    grouped[slot.slot_date].push(slot);
  }

  const available = slots.filter(s => s.status === 'available').length;
  const booked    = slots.filter(s => s.status === 'confirmed' || s.status === 'reserved').length;
  const blocked   = slots.filter(s => s.status === 'blocked').length;

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Slot Management</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Manage your availability and view bookings.</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ Add Slots</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Available', value: available, bg: '#D1F2EB', color: '#0E6655' },
          { label: 'Booked',    value: booked,    bg: '#DBEAFE', color: '#1E40AF' },
          { label: 'Blocked',   value: blocked,   bg: '#F3F4F6', color: '#6B7280' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.label} slots</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>From</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={{ border: '1px solid var(--border)', borderRadius: 7, padding: '6px 10px', fontSize: 14 }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>To</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} style={{ border: '1px solid var(--border)', borderRadius: 7, padding: '6px 10px', fontSize: 14 }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Scan Type</label>
          <select value={scanFilter} onChange={e => setScanFilter(e.target.value)} style={{ border: '1px solid var(--border)', borderRadius: 7, padding: '6px 10px', fontSize: 14 }}>
            <option value="">All scans</option>
            {SCAN_TYPES.map(s => <option key={s.code} value={s.code}>{s.label}</option>)}
          </select>
        </div>
        <button onClick={load} style={{ background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 18px', fontSize: 14, cursor: 'pointer', alignSelf: 'flex-end' }}>Refresh</button>
      </div>
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 440, maxWidth: '95vw' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>Add Availability Slots</h2>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-body)', display: 'block', marginBottom: 6 }}>Scan Type</label>
            <select value={addScan} onChange={e => setAddScan(e.target.value)} style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 12px', fontSize: 14, marginBottom: 16 }}>
              {SCAN_TYPES.map(s => <option key={s.code} value={s.code}>{s.label}</option>)}
            </select>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-body)', display: 'block', marginBottom: 6 }}>Duration (minutes)</label>
            <select value={addDuration} onChange={e => setAddDuration(e.target.value)} style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 12px', fontSize: 14, marginBottom: 16 }}>
              {['30','45','60','90','120','180','240'].map(d => <option key={d} value={d}>{d} min</option>)}
            </select>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <button onClick={() => setAddBulk(false)} style={{ flex: 1, padding: '9px', borderRadius: 8, border: `2px solid ${!addBulk ? 'var(--blue)' : 'var(--border)'}`, background: !addBulk ? 'var(--blue-light)' : '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Single Slot</button>
              <button onClick={() => setAddBulk(true)} style={{ flex: 1, padding: '9px', borderRadius: 8, border: `2px solid ${addBulk ? 'var(--blue)' : 'var(--border)'}`, background: addBulk ? 'var(--blue-light)' : '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Bulk (next N days)</button>
            </div>
            {!addBulk ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-body)', display: 'block', marginBottom: 4 }}>Date</label>
                  <input type="date" value={addDate} min={today} onChange={e => setAddDate(e.target.value)} style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 12px', fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-body)', display: 'block', marginBottom: 4 }}>Time</label>
                  <input type="time" value={addTime} step={1800} onChange={e => setAddTime(e.target.value)} style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 12px', fontSize: 14 }} />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-body)', display: 'block', marginBottom: 4 }}>Working days ahead</label>
                <select value={addBulkDays} onChange={e => setAddBulkDays(e.target.value)} style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 12px', fontSize: 14 }}>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="21">21 days</option>
                  <option value="30">30 days</option>
                </select>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>Slots added: Mon–Sat, 08:00–16:00, every 90 min (skips Sundays).</p>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowAdd(false)} style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '11px', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
              <button onClick={addSlots} disabled={saving === 'add'} style={{ flex: 2, background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                {saving === 'add' ? 'Saving…' : addBulk ? 'Add Bulk Slots' : 'Add Slot'}
              </button>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading slots…</div>
      ) : Object.keys(grouped).length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, background: '#fff', border: '1px solid var(--border)', borderRadius: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
          <div style={{ fontWeight: 600, color: 'var(--text-body)', marginBottom: 6 }}>No slots found</div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Use &ldquo;Add Slots&rdquo; to create availability for your clinic.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {Object.keys(grouped).sort().map(date => (
            <div key={date} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{fmt(date)}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{grouped[date].length} slots</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Time', 'Scan', 'Duration', 'Status', 'Patient', 'Ref', 'Action'].map(h => (
                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grouped[date].map(slot => {
                      const st = STATUS_STYLE[slot.status] ?? STATUS_STYLE.available;
                      const scan = SCAN_TYPES.find(s => s.code === slot.scan_type_code);
                      const isBooked = slot.status === 'confirmed' || slot.status === 'reserved';
                      return (
                        <tr key={slot.id} style={{ borderBottom: '1px solid var(--bg-subtle)' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--navy)' }}>{slot.slot_time?.slice(0,5)}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{ background: scan?.color + '22', color: scan?.color ?? 'var(--text-body)', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>{scan?.label ?? slot.scan_type_code}</span>
                          </td>
                          <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{slot.duration_minutes}m</td>
                          <td style={{ padding: '10px 12px' }}><span style={{ background: st.bg, color: st.color, borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{st.label}</span></td>
                          <td style={{ padding: '10px 12px', color: 'var(--text-body)' }}>{isBooked && slot.patient_first_name ? `${slot.patient_first_name} ${slot.patient_last_name}` : '—'}</td>
                          <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{slot.booking_ref ?? '—'}</td>
                          <td style={{ padding: '10px 12px' }}>
                            {slot.status === 'available' && <button onClick={() => void updateStatus(slot.id, 'blocked')} disabled={saving === slot.id} style={{ background: 'var(--danger-bg)', color: 'var(--danger)', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{saving === slot.id ? '…' : 'Block'}</button>}
                            {slot.status === 'blocked' && <button onClick={() => void updateStatus(slot.id, 'available')} disabled={saving === slot.id} style={{ background: 'var(--success-bg)', color: 'var(--success)', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{saving === slot.id ? '…' : 'Unblock'}</button>}
                            {isBooked && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Locked</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

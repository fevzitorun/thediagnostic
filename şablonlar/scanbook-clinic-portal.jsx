import { useState } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const TODAY_APPOINTMENTS = [
  { id: 1, time: "08:30", patient: "Sarah Mitchell", scan: "MRI Knee", duration: 45, status: "confirmed", paid: 299, notes: "Claustrophobic — open MRI tercih edilsin" },
  { id: 2, time: "09:30", patient: "James O'Brien", scan: "CT Chest", duration: 30, status: "confirmed", paid: 349, notes: "" },
  { id: 3, time: "10:30", patient: "Priya Sharma", scan: "Ultrasound Abdomen", duration: 20, status: "arrived", paid: 149, notes: "Fasting required — confirmed" },
  { id: 4, time: "11:00", patient: "David Chen", scan: "MRI Brain", duration: 60, status: "in-progress", paid: 399, notes: "Metal implant screening done" },
  { id: 5, time: "12:30", patient: "Emma Williams", scan: "X-Ray Chest", duration: 15, status: "confirmed", paid: 89, notes: "" },
  { id: 6, time: "14:00", patient: "—", scan: "—", duration: 30, status: "empty", paid: 0, notes: "" },
  { id: 7, time: "14:30", patient: "Robert Taylor", scan: "MRI Spine", duration: 45, status: "confirmed", paid: 319, notes: "" },
  { id: 8, time: "15:30", patient: "Lisa Anderson", scan: "CT Abdomen", duration: 30, status: "confirmed", paid: 279, notes: "Contrast required" },
  { id: 9, time: "16:30", patient: "Mohammed Al-Rashid", scan: "Ultrasound Thyroid", duration: 20, status: "confirmed", paid: 129, notes: "" },
];

const REVENUE_DAYS = [
  { day: "Mon", total: 1840, commission: 276 },
  { day: "Tue", total: 2210, commission: 332 },
  { day: "Wed", total: 1650, commission: 248 },
  { day: "Thu", total: 2890, commission: 434 },
  { day: "Fri", total: 3120, commission: 468 },
  { day: "Sat", total: 1980, commission: 297 },
  { day: "Sun", total: 0, commission: 0 },
];

const WEEK_SLOTS = {
  "Mon 10": { "08:00": "booked", "09:00": "booked", "10:00": "open", "11:00": "open", "12:00": "blocked", "13:00": "open", "14:00": "booked", "15:00": "booked", "16:00": "open" },
  "Tue 11": { "08:00": "open", "09:00": "booked", "10:00": "booked", "11:00": "open", "12:00": "blocked", "13:00": "booked", "14:00": "open", "15:00": "open", "16:00": "booked" },
  "Wed 12": { "08:00": "open", "09:00": "open", "10:00": "open", "11:00": "open", "12:00": "blocked", "13:00": "open", "14:00": "open", "15:00": "open", "16:00": "open" },
  "Thu 13": { "08:00": "booked", "09:00": "booked", "10:00": "booked", "11:00": "booked", "12:00": "blocked", "13:00": "booked", "14:00": "booked", "15:00": "open", "16:00": "open" },
  "Fri 14": { "08:00": "open", "09:00": "booked", "10:00": "open", "11:00": "booked", "12:00": "blocked", "13:00": "open", "14:00": "booked", "15:00": "booked", "16:00": "open" },
};

const MESSAGES = [
  { id: 1, patient: "Sarah Mitchell", time: "08:12", msg: "Randevuma 10 dk geç kalabilirim, uygun mu?", unread: true, avatar: "SM" },
  { id: 2, patient: "ScanBook Ops", time: "Dün", msg: "Bu haftaki doluluk oranınız %78 — harika!", unread: true, avatar: "SB", system: true },
  { id: 3, patient: "Robert Taylor", time: "Dün", msg: "Randevudan önce bir şey yemeli miyim?", unread: false, avatar: "RT" },
  { id: 4, patient: "Emma Williams", time: "2 gün", msg: "Sonuçlar ne zaman gelir?", unread: false, avatar: "EW" },
  { id: 5, patient: "ScanBook Ops", time: "3 gün", msg: "Yeni fiyat güncellemesi için onay gerekiyor.", unread: false, avatar: "SB", system: true },
];

const STAT_COLORS = { booked: "#00b894", open: "#0984e3", blocked: "#636e72", empty: "#2d3436" };

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const statusConfig = {
  confirmed: { label: "Onaylı", color: "#0984e3", bg: "#0984e322" },
  arrived:   { label: "Geldi", color: "#00b894", bg: "#00b89422" },
  "in-progress": { label: "İşlemde", color: "#fdcb6e", bg: "#fdcb6e22" },
  empty:     { label: "Boş", color: "#636e72", bg: "#636e7222" },
  completed: { label: "Tamamlandı", color: "#a29bfe", bg: "#a29bfe22" },
};

const maxRevenue = Math.max(...REVENUE_DAYS.map(d => d.total));

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ClinicPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [slots, setSlots] = useState(WEEK_SLOTS);
  const [activeMsg, setActiveMsg] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const accent = "#00b894";
  const bg = "#0a0f1e";
  const surface = "#111827";
  const surface2 = "#1a2234";
  const border = "rgba(255,255,255,0.07)";
  const muted = "rgba(255,255,255,0.38)";

  const todayRevenue = TODAY_APPOINTMENTS.filter(a => a.status !== "empty").reduce((s, a) => s + a.paid, 0);
  const todayCommission = Math.round(todayRevenue * 0.15);
  const todayCount = TODAY_APPOINTMENTS.filter(a => a.status !== "empty").length;
  const unreadCount = MESSAGES.filter(m => m.unread).length;

  const toggleSlot = (day, time) => {
    setSlots(prev => {
      const current = prev[day][time];
      if (current === "booked") return prev;
      const next = current === "open" ? "blocked" : "open";
      return { ...prev, [day]: { ...prev[day], [time]: next } };
    });
  };

  // ── NAV ITEMS
  const NAV = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "calendar", icon: "◷", label: "Takvim", badge: todayCount },
    { id: "slots", icon: "▦", label: "Slot Yönetimi" },
    { id: "revenue", icon: "◈", label: "Gelir" },
    { id: "messages", icon: "◉", label: "Mesajlar", badge: unreadCount },
  ];

  const Sidebar = () => (
    <div style={{ width: 220, background: surface, borderRight: `1px solid ${border}`, display: "flex", flexDirection: "column", height: "100%", flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${accent}, #00cec9)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#000" }}>S</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Scan<span style={{ color: accent }}>Book</span></div>
            <div style={{ fontSize: 10, color: muted }}>Partner Portal</div>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: "8px 10px", background: surface2, borderRadius: 8, fontSize: 12 }}>
          <div style={{ color: "#fff", fontWeight: 600 }}>Harley St. Diagnostics</div>
          <div style={{ color: muted, fontSize: 11, marginTop: 2 }}>🟢 Aktif · Bugün {todayCount} randevu</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 10px", flex: 1 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => { setActiveTab(n.id); setMobileSidebarOpen(false); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", background: activeTab === n.id ? `${accent}18` : "transparent", color: activeTab === n.id ? accent : "#9ca3af", cursor: "pointer", marginBottom: 2, textAlign: "left", transition: "all 0.15s" }}>
            <span style={{ fontSize: 16 }}>{n.icon}</span>
            <span style={{ fontSize: 14, flex: 1 }}>{n.label}</span>
            {n.badge > 0 && <span style={{ fontSize: 10, background: accent, color: "#000", borderRadius: 10, padding: "1px 6px", fontWeight: 700 }}>{n.badge}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px 10px", borderTop: `1px solid ${border}` }}>
        <div style={{ padding: "10px 12px", borderRadius: 10, background: surface2, fontSize: 12 }}>
          <div style={{ color: muted, marginBottom: 4 }}>Bu ay net kazanç</div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>£{(18340).toLocaleString()}</div>
          <div style={{ color: accent, fontSize: 11, marginTop: 2 }}>↑ %12 geçen aya göre</div>
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD TAB
  const DashboardView = () => (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Günaydın, Harley Street 👋</h2>
        <p style={{ color: muted, fontSize: 14, margin: "4px 0 0" }}>Bugün {todayCount} randevu · {new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" })}</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Bugün randevu", val: todayCount, sub: "8 onaylı, 1 işlemde", color: "#0984e3" },
          { label: "Bugün gelir", val: `£${todayRevenue.toLocaleString()}`, sub: `£${todayCommission} komisyon`, color: accent },
          { label: "Doluluk oranı", val: "%78", sub: "Bu hafta", color: "#fdcb6e" },
          { label: "Okunmamış", val: unreadCount, sub: "mesaj", color: "#a29bfe" },
        ].map((s, i) => (
          <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 11, color: muted, marginBottom: 8 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Today's appointments quick view */}
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Bugünkü Randevular</h3>
          <button onClick={() => setActiveTab("calendar")} style={{ background: "none", border: "none", color: accent, cursor: "pointer", fontSize: 13 }}>Tümünü gör →</button>
        </div>
        {TODAY_APPOINTMENTS.slice(0, 5).map(a => {
          const sc = statusConfig[a.status];
          return (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: `1px solid ${border}` }}>
              <div style={{ width: 44, textAlign: "center", fontSize: 13, fontWeight: 600, color: muted, flexShrink: 0 }}>{a.time}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.patient === "—" ? <span style={{ color: muted }}>Boş slot</span> : a.patient}</div>
                <div style={{ fontSize: 12, color: muted }}>{a.scan}</div>
              </div>
              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: sc.bg, color: sc.color, whiteSpace: "nowrap", flexShrink: 0 }}>{sc.label}</span>
              {a.paid > 0 && <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", flexShrink: 0 }}>£{a.paid}</span>}
            </div>
          );
        })}
      </div>

      {/* Revenue mini chart */}
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 20 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Bu Hafta Gelir</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
          {REVENUE_DAYS.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", background: d.total > 0 ? accent : border, borderRadius: 4, height: `${Math.max(4, (d.total / maxRevenue) * 70)}px`, transition: "height 0.3s" }} />
              <span style={{ fontSize: 10, color: muted }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12, color: muted }}>
          <span>Haftalık toplam: <strong style={{ color: "#fff" }}>£{REVENUE_DAYS.reduce((s, d) => s + d.total, 0).toLocaleString()}</strong></span>
          <span>Komisyon: <strong style={{ color: "#e17055" }}>-£{REVENUE_DAYS.reduce((s, d) => s + d.commission, 0).toLocaleString()}</strong></span>
          <span>Net: <strong style={{ color: accent }}>£{REVENUE_DAYS.reduce((s, d) => s + d.total - d.commission, 0).toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );

  // ── CALENDAR TAB
  const CalendarView = () => (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Bugünkü Takvim</h2>
      <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Randevuya tıkla → detay & durum güncelle</p>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          {TODAY_APPOINTMENTS.map(a => {
            const sc = statusConfig[a.status];
            const isSelected = selectedAppt?.id === a.id;
            return (
              <div key={a.id} onClick={() => setSelectedAppt(isSelected ? null : a)}
                style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 12, marginBottom: 8, border: `1px solid ${isSelected ? accent : border}`, background: isSelected ? `${accent}0d` : surface, cursor: a.status !== "empty" ? "pointer" : "default", transition: "all 0.15s" }}>
                <div style={{ width: 48, flexShrink: 0, textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: a.status === "empty" ? muted : "#fff" }}>{a.time}</div>
                  <div style={{ fontSize: 10, color: muted }}>{a.duration}dk</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {a.status === "empty" ? (
                    <div style={{ color: muted, fontSize: 13 }}>Boş slot — {a.time}</div>
                  ) : (
                    <>
                      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{a.patient}</div>
                      <div style={{ fontSize: 13, color: muted }}>{a.scan}</div>
                      {a.notes && <div style={{ fontSize: 11, color: "#fdcb6e", marginTop: 4 }}>⚠ {a.notes}</div>}
                    </>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                  {a.status !== "empty" && <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: sc.bg, color: sc.color }}>{sc.label}</span>}
                  {a.paid > 0 && <span style={{ fontSize: 13, fontWeight: 700 }}>£{a.paid}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selectedAppt && (
          <div style={{ width: 280, flexShrink: 0 }}>
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 20, position: "sticky", top: 0 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16 }}>{selectedAppt.patient}</h3>
              {[
                ["Tarama", selectedAppt.scan],
                ["Saat", selectedAppt.time],
                ["Süre", `${selectedAppt.duration} dk`],
                ["Ödeme", `£${selectedAppt.paid}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${border}`, fontSize: 13 }}>
                  <span style={{ color: muted }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
              {selectedAppt.notes && (
                <div style={{ marginTop: 14, padding: 12, background: "#fdcb6e11", border: "1px solid #fdcb6e33", borderRadius: 8, fontSize: 12, color: "#fdcb6e" }}>
                  ⚠ {selectedAppt.notes}
                </div>
              )}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, color: muted, marginBottom: 8 }}>Durumu Güncelle</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {Object.entries(statusConfig).filter(([k]) => k !== "empty").map(([key, cfg]) => (
                    <button key={key} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${cfg.color}44`, background: selectedAppt.status === key ? cfg.bg : "transparent", color: cfg.color, cursor: "pointer", fontSize: 12 }}>
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── SLOTS TAB
  const SlotsView = () => {
    const times = Object.keys(Object.values(slots)[0]);
    return (
      <div style={{ padding: 24, overflowX: "auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Slot Yönetimi</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 6 }}>Açık slota tıkla → Kapat · Kapalı slota tıkla → Aç</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          {[{ s: "open", label: "Müsait" }, { s: "booked", label: "Rezerveli" }, { s: "blocked", label: "Kapalı" }].map(({ s, label }) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: muted }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: STAT_COLORS[s] }} /> {label}
            </div>
          ))}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", minWidth: 500 }}>
            <thead>
              <tr>
                <th style={{ padding: "8px 12px", fontSize: 12, color: muted, textAlign: "left", width: 60 }}>Saat</th>
                {Object.keys(slots).map(day => (
                  <th key={day} style={{ padding: "8px 10px", fontSize: 12, color: muted, textAlign: "center", whiteSpace: "nowrap" }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map(time => (
                <tr key={time}>
                  <td style={{ padding: "5px 12px", fontSize: 13, color: muted, fontWeight: 600 }}>{time}</td>
                  {Object.entries(slots).map(([day, daySlots]) => {
                    const status = daySlots[time];
                    const isClickable = status !== "booked";
                    return (
                      <td key={day} style={{ padding: "5px 8px", textAlign: "center" }}>
                        <div onClick={() => isClickable && toggleSlot(day, time)}
                          title={status === "booked" ? "Rezerveli — değiştirilemez" : status === "open" ? "Tıkla: Kapat" : "Tıkla: Aç"}
                          style={{ width: 36, height: 28, borderRadius: 6, background: STAT_COLORS[status], margin: "0 auto", cursor: isClickable ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: status === "open" ? "#00b894" : "rgba(255,255,255,0.3)", transition: "opacity 0.15s", opacity: status === "blocked" ? 0.4 : 1 }}>
                          {status === "booked" ? "●" : status === "blocked" ? "✕" : ""}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${accent}`, background: `${accent}18`, color: accent, cursor: "pointer", fontSize: 13 }}>
            + Toplu Slot Ekle
          </button>
          <button style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${border}`, background: "transparent", color: muted, cursor: "pointer", fontSize: 13 }}>
            Tatil / Kapalı Gün Ekle
          </button>
        </div>
      </div>
    );
  };

  // ── REVENUE TAB
  const RevenueView = () => (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Gelir & Komisyon</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Bu ay brüt", val: "£22,840", trend: "+12%", up: true },
          { label: "Komisyon (%15)", val: "-£3,426", trend: "ScanBook payı", up: false },
          { label: "Net kazanç", val: "£19,414", trend: "Hesabınıza", up: true },
          { label: "Bekleyen ödeme", val: "£2,180", trend: "14 gün içinde", up: null },
        ].map((s, i) => (
          <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 11, color: muted, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.up === true ? accent : s.up === false ? "#e17055" : "#fdcb6e" }}>{s.val}</div>
            <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 15 }}>Bu Hafta Günlük Breakdown</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120 }}>
          {REVENUE_DAYS.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 10, color: muted }}>£{(d.total / 1000).toFixed(1)}k</div>
              <div style={{ width: "100%", position: "relative", height: `${Math.max(4, (d.total / maxRevenue) * 90)}px` }}>
                <div style={{ width: "100%", height: "100%", background: `${accent}33`, borderRadius: "4px 4px 0 0" }} />
                <div style={{ position: "absolute", bottom: 0, width: "100%", height: `${(d.commission / d.total) * 100 || 0}%`, background: "#e1705544", borderRadius: "0" }} />
              </div>
              <span style={{ fontSize: 11, color: muted }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 16, fontSize: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, background: `${accent}33`, borderRadius: 2 }} /> Brüt gelir</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, background: "#e1705544", borderRadius: 2 }} /> Komisyon</span>
        </div>
      </div>

      {/* Recent transactions */}
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 20 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15 }}>Son İşlemler</h3>
        {TODAY_APPOINTMENTS.filter(a => a.paid > 0).map(a => (
          <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${border}`, fontSize: 13 }}>
            <div>
              <div style={{ fontWeight: 500 }}>{a.patient}</div>
              <div style={{ color: muted, fontSize: 12 }}>{a.scan} · {a.time}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: accent, fontWeight: 600 }}>+£{a.paid}</div>
              <div style={{ color: "#e17055", fontSize: 11 }}>-£{Math.round(a.paid * 0.15)} kom.</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── MESSAGES TAB
  const MessagesView = () => (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* List */}
      <div style={{ width: 280, borderRight: `1px solid ${border}`, overflowY: "auto", flexShrink: 0 }}>
        <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${border}` }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Mesajlar</h2>
        </div>
        {MESSAGES.map(m => (
          <div key={m.id} onClick={() => setActiveMsg(m)}
            style={{ padding: "14px 16px", borderBottom: `1px solid ${border}`, cursor: "pointer", background: activeMsg?.id === m.id ? `${accent}0d` : "transparent", borderLeft: m.unread ? `3px solid ${accent}` : "3px solid transparent", transition: "all 0.15s" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.system ? `${accent}33` : "#4a5568", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: m.system ? accent : "#fff", flexShrink: 0 }}>{m.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: m.unread ? 700 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.patient}</span>
                  <span style={{ fontSize: 10, color: muted, flexShrink: 0, marginLeft: 6 }}>{m.time}</span>
                </div>
                <div style={{ fontSize: 12, color: muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.msg}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {activeMsg ? (
          <>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#4a5568", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{activeMsg.avatar}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{activeMsg.patient}</div>
                <div style={{ fontSize: 11, color: muted }}>Hasta</div>
              </div>
            </div>
            <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 20 }}>
                <div style={{ maxWidth: "75%", background: surface2, borderRadius: "12px 12px 12px 4px", padding: "12px 16px", fontSize: 14, lineHeight: 1.6 }}>
                  {activeMsg.msg}
                </div>
              </div>
              {replyText && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ maxWidth: "75%", background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: "12px 12px 4px 12px", padding: "12px 16px", fontSize: 14, color: accent, lineHeight: 1.6 }}>
                    {replyText}
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${border}`, display: "flex", gap: 10 }}>
              <input value={replyText} onChange={e => setReplyText(e.target.value)}
                placeholder="Yanıtla..."
                style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${border}`, background: surface2, color: "#fff", fontSize: 14, outline: "none" }} />
              <button style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: accent, color: "#000", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Gönder</button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: muted, fontSize: 14 }}>
            ← Bir mesaj seç
          </div>
        )}
      </div>
    </div>
  );

  const VIEWS = { dashboard: <DashboardView />, calendar: <CalendarView />, slots: <SlotsView />, revenue: <RevenueView />, messages: <MessagesView /> };

  return (
    <div style={{ background: bg, height: "100vh", display: "flex", flexDirection: "column", color: "#e8e6f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", overflow: "hidden" }}>

      {/* Mobile top bar */}
      <div style={{ display: "flex", background: surface, borderBottom: `1px solid ${border}`, padding: "0 16px", height: 52, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setMobileSidebarOpen(o => !o)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", padding: "0 4px" }}>☰</button>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Scan<span style={{ color: accent }}>Book</span> <span style={{ color: muted, fontWeight: 400 }}>Partner</span></span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {unreadCount > 0 && <div style={{ width: 22, height: 22, borderRadius: "50%", background: accent, color: "#000", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{unreadCount}</div>}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {/* Sidebar overlay for mobile */}
        {mobileSidebarOpen && (
          <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex" }}>
            <div style={{ flex: "0 0 220px" }}><Sidebar /></div>
            <div style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileSidebarOpen(false)} />
          </div>
        )}

        {/* Desktop sidebar */}
        <div style={{ display: "none", "@media(minWidth:768px)": { display: "flex" } }}>
          {/* always show on larger breakpoints — simplified here */}
        </div>
        <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <Sidebar />
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {VIEWS[activeTab]}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div style={{ background: surface, borderTop: `1px solid ${border}`, display: "flex", padding: "6px 0 2px" }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setActiveTab(n.id)}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 4px", border: "none", background: "transparent", color: activeTab === n.id ? accent : muted, cursor: "pointer", position: "relative" }}>
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span style={{ fontSize: 9 }}>{n.label}</span>
            {n.badge > 0 && <div style={{ position: "absolute", top: 2, right: "50%", transform: "translateX(8px)", width: 14, height: 14, borderRadius: "50%", background: accent, color: "#000", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{n.badge}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

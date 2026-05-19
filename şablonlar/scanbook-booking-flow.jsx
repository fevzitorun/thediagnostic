import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const SCAN_TYPES = [
  { id: "mri", label: "MRI", icon: "🧲", from: 199, desc: "Magnetic resonance imaging" },
  { id: "ct", label: "CT Scan", icon: "🔬", from: 249, desc: "Computed tomography" },
  { id: "ultrasound", label: "Ultrasound", icon: "〰️", from: 120, desc: "Soft tissue & organs" },
  { id: "xray", label: "X-Ray", icon: "⚡", from: 75, desc: "Bone & chest imaging" },
  { id: "petct", label: "PET-CT", icon: "🎯", from: 850, desc: "Cancer detection" },
];

const BODY_PARTS = {
  mri: ["Brain & Head", "Spine & Neck", "Knee", "Shoulder", "Hip", "Abdomen", "Pelvis", "Ankle & Foot", "Wrist & Hand"],
  ct: ["Head & Brain", "Chest & Lungs", "Abdomen & Pelvis", "Spine", "Coronary (Heart)", "Full Body"],
  ultrasound: ["Abdomen", "Pelvis", "Thyroid & Neck", "Breast", "Testes", "Pregnancy (dating)", "Baby 4D"],
  xray: ["Chest", "Hand & Wrist", "Foot & Ankle", "Knee", "Hip", "Spine"],
  petct: ["Full Body", "Head & Neck", "Chest", "Abdomen & Pelvis"],
};

const CENTRES = [
  { id: 1, name: "Harley Street Diagnostics", area: "Central London W1", distance: "0.4 mi", rating: 4.9, reviews: 312, price: 299, slots: ["09:00", "10:30", "14:00", "15:30"], accredited: true, wait: "Today", img: "🏥" },
  { id: 2, name: "The London Clinic Imaging", area: "Marylebone, London", distance: "0.8 mi", rating: 4.8, reviews: 218, price: 349, slots: ["08:30", "11:00", "13:30"], accredited: true, wait: "Today", img: "🏨" },
  { id: 3, name: "Kings Oak Imaging Centre", area: "North London N14", distance: "4.2 mi", rating: 4.7, reviews: 94, price: 219, slots: ["10:00", "12:00", "16:00", "17:00"], accredited: false, wait: "Tomorrow", img: "🏪" },
];

const DATES = ["Mon 10 Mar", "Tue 11 Mar", "Wed 12 Mar", "Thu 13 Mar", "Fri 14 Mar"];

const STEPS = [
  { id: 1, label: "Scan Type", icon: "🩻" },
  { id: 2, label: "Body Part", icon: "🫀" },
  { id: 3, label: "Location", icon: "📍" },
  { id: 4, label: "Choose Centre", icon: "🏥" },
  { id: 5, label: "Pick Slot", icon: "📅" },
  { id: 6, label: "Your Details", icon: "👤" },
  { id: 7, label: "Payment", icon: "💳" },
  { id: 8, label: "Confirmed", icon: "✅" },
];

const CODE_SNIPPETS = {
  1: `// pages/book/index.tsx
export default function BookPage() {
  const [scanType, setScanType] = useState(null);
  
  return (
    <ScanTypeGrid
      types={SCAN_TYPES}
      onSelect={(type) => {
        setScanType(type);
        router.push(\`/book/\${type.id}\`);
      }}
    />
  );
}`,
  2: `// Seçilen scan'e göre body parts
// DB'den çek: SELECT body_parts 
// WHERE scan_type_id = $scanId

const bodyParts = await db.query(
  'SELECT * FROM scan_body_parts WHERE scan_type_id = $1',
  [scanTypeId]
);`,
  3: `// PostGIS ile yakın klinik arama
SELECT c.*, 
  ST_Distance(c.location, ST_MakePoint($lng, $lat)) 
  AS distance_meters
FROM centres c
JOIN centre_services cs ON cs.centre_id = c.id
WHERE cs.scan_type_id = $scanTypeId
ORDER BY distance_meters ASC
LIMIT 20;`,
  4: `// Klinik listesi + gerçek zamanlı slot sayısı
SELECT c.*, 
  COUNT(s.id) as available_slots
FROM centres c
LEFT JOIN slots s ON s.centre_id = c.id
  AND s.date = CURRENT_DATE
  AND s.is_available = true
  AND s.scan_type_id = $scanTypeId
GROUP BY c.id
ORDER BY c.rating DESC;`,
  5: `// Slot rezervasyonu — race condition önlemi
// Optimistic locking ile slot kilitleme
BEGIN;
  SELECT * FROM slots 
  WHERE id = $slotId 
  FOR UPDATE; -- row lock

  UPDATE slots 
  SET is_available = false,
      held_until = NOW() + INTERVAL '15 min',
      held_by_session = $sessionId
  WHERE id = $slotId 
  AND is_available = true;
COMMIT;`,
  6: `// Hasta formu — sadece gerekli bilgiler
// GDPR: minimum data collection

interface PatientDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;    // scan için şart
  email: string;          // confirmation için
  phone: string;          // reminder için
  gp_name?: string;       // opsiyonel
  notes?: string;         // klinike not
}`,
  7: `// Stripe Payment Intent
// Server-side — API key asla client'a gitme!

const paymentIntent = await stripe.paymentIntents.create({
  amount: price * 100,  // pennies
  currency: 'gbp',
  application_fee_amount: Math.round(price * 0.15 * 100),
  transfer_data: {
    destination: clinic.stripe_account_id, // Connect
  },
  metadata: { bookingId, slotId, patientId }
});`,
  8: `// Booking tamamlandı — event zinciri
async function onBookingComplete(bookingId) {
  await Promise.all([
    sendConfirmationEmail(patient),    // Hastaya
    sendClinicNotification(clinic),    // Klinik staff'a
    scheduleReminders(booking),        // 24h + 1h önce SMS
    createCalendarEvent(booking),      // .ics file
    updateSlotStatus(slotId, 'booked') // DB güncelle
  ]);
}`,
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [showCode, setShowCode] = useState(false);
  const [selections, setSelections] = useState({
    scanType: null, bodyPart: null, location: "London",
    centre: null, date: null, slot: null,
    name: "Alex Johnson", email: "alex@email.com",
    phone: "07700 900000", dob: "15/06/1985",
  });

  const sel = (key, val) => setSelections(s => ({ ...s, [key]: val }));
  const canNext = () => {
    if (step === 1) return selections.scanType;
    if (step === 2) return selections.bodyPart;
    if (step === 3) return selections.location;
    if (step === 4) return selections.centre;
    if (step === 5) return selections.slot;
    if (step === 6) return true;
    return true;
  };

  const accentColor = "#00b894";
  const bg = "#0a0e1a";
  const surface = "#111827";
  const border = "rgba(255,255,255,0.07)";
  const muted = "rgba(255,255,255,0.4)";

  return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#e8e6f0" }}>

      {/* TOP BAR */}
      <div style={{ background: surface, borderBottom: `1px solid ${border}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, #00b894, #00cec9)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>S</div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Scan<span style={{ color: accentColor }}>Book</span></span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: muted }}>Hasta Akışı Simülasyonu</span>
          <button onClick={() => setShowCode(!showCode)} style={{
            padding: "5px 14px", border: `1px solid ${showCode ? accentColor : border}`,
            borderRadius: 20, background: showCode ? `${accentColor}22` : "transparent",
            color: showCode ? accentColor : muted, cursor: "pointer", fontSize: 12
          }}>{"</>"} Kod Göster</button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ background: surface, padding: "0 32px", borderBottom: `1px solid ${border}`, overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 0, minWidth: "fit-content" }}>
          {STEPS.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} onClick={() => done && setStep(s.id)}
                style={{ display: "flex", alignItems: "center", gap: 0, cursor: done ? "pointer" : "default" }}>
                <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: active ? `2px solid ${accentColor}` : "2px solid transparent", transition: "all 0.2s" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
                    background: done ? accentColor : active ? `${accentColor}33` : "rgba(255,255,255,0.05)",
                    color: done ? "#000" : active ? accentColor : muted,
                  }}>{done ? "✓" : s.id}</div>
                  <span style={{ fontSize: 12, color: active ? "#fff" : done ? accentColor : muted, whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: border, flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* MAIN PANEL */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* STEP 1 — Scan Type */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Hangi taramayı yaptırmak istiyorsunuz?</h2>
              <p style={{ fontSize: 14, color: muted, marginBottom: 24 }}>Emin değilseniz danışman hekiminizle görüşün veya bize sorun.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
                {SCAN_TYPES.map(t => (
                  <div key={t.id} onClick={() => sel("scanType", t.id)}
                    style={{ padding: 20, borderRadius: 14, border: `1px solid ${selections.scanType === t.id ? accentColor : border}`, background: selections.scanType === t.id ? `${accentColor}11` : surface, cursor: "pointer", transition: "all 0.15s" }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: muted, marginBottom: 10 }}>{t.desc}</div>
                    <div style={{ fontSize: 13, color: accentColor, fontWeight: 600 }}>£{t.from}+</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Body Part */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Hangi bölge taranacak?</h2>
              <p style={{ fontSize: 14, color: muted, marginBottom: 24 }}>
                {SCAN_TYPES.find(t => t.id === selections.scanType)?.icon} {SCAN_TYPES.find(t => t.id === selections.scanType)?.label} seçildi
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {(BODY_PARTS[selections.scanType] || []).map(bp => (
                  <button key={bp} onClick={() => sel("bodyPart", bp)}
                    style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${selections.bodyPart === bp ? accentColor : border}`, background: selections.bodyPart === bp ? `${accentColor}22` : surface, color: selections.bodyPart === bp ? accentColor : "#ccc", cursor: "pointer", fontSize: 14, fontWeight: selections.bodyPart === bp ? 600 : 400 }}>
                    {bp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 — Location */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Nerede arıyorsunuz?</h2>
              <p style={{ fontSize: 14, color: muted, marginBottom: 24 }}>Şehir, posta kodu veya hastane adı girin</p>
              <div style={{ position: "relative", maxWidth: 480, marginBottom: 20 }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>📍</span>
                <input value={selections.location} onChange={e => sel("location", e.target.value)}
                  placeholder="Örn: London, Manchester, SW1A..."
                  style={{ width: "100%", padding: "14px 14px 14px 46px", borderRadius: 12, border: `1px solid ${border}`, background: surface, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["London", "Manchester", "Birmingham", "Leeds", "Edinburgh"].map(city => (
                  <button key={city} onClick={() => sel("location", city)}
                    style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${selections.location === city ? accentColor : border}`, background: selections.location === city ? `${accentColor}22` : "transparent", color: selections.location === city ? accentColor : muted, cursor: "pointer", fontSize: 13 }}>
                    {city}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 24, padding: 16, background: surface, borderRadius: 12, border: `1px solid ${border}`, fontSize: 13, color: muted }}>
                📡 PostGIS ile <span style={{ color: accentColor }}>km bazlı arama</span> yapılır — posta kodu → koordinata çevrilir → yakın klinikler sıralanır
              </div>
            </div>
          )}

          {/* STEP 4 — Choose Centre */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Merkez seçin</h2>
              <p style={{ fontSize: 14, color: muted, marginBottom: 20 }}>📍 {selections.location} · {selections.scanType?.toUpperCase()} · {selections.bodyPart}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {CENTRES.map(c => (
                  <div key={c.id} onClick={() => sel("centre", c.id)}
                    style={{ padding: 20, borderRadius: 14, border: `1px solid ${selections.centre === c.id ? accentColor : border}`, background: selections.centre === c.id ? `${accentColor}08` : surface, cursor: "pointer", transition: "all 0.15s", display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ fontSize: 32, width: 52, textAlign: "center", flexShrink: 0 }}>{c.img}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: 16 }}>{c.name}</span>
                        {c.accredited && <span style={{ fontSize: 10, background: `${accentColor}22`, color: accentColor, padding: "2px 7px", borderRadius: 20 }}>✓ CQC</span>}
                      </div>
                      <div style={{ fontSize: 13, color: muted, marginBottom: 8 }}>📍 {c.area} · {c.distance}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {c.slots.slice(0, 3).map(s => (
                          <span key={s} style={{ fontSize: 11, padding: "3px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 6 }}>{s}</span>
                        ))}
                        <span style={{ fontSize: 11, color: muted }}>+{Math.max(0, c.slots.length - 3)} more</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>£{c.price}</div>
                      <div style={{ fontSize: 12, color: muted }}>★ {c.rating} ({c.reviews})</div>
                      <div style={{ fontSize: 12, color: accentColor, marginTop: 4 }}>⚡ {c.wait}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 — Pick Slot */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Tarih & saat seçin</h2>
              <p style={{ fontSize: 14, color: muted, marginBottom: 20 }}>
                {CENTRES.find(c => c.id === selections.centre)?.name}
              </p>
              <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                {DATES.map(d => (
                  <button key={d} onClick={() => sel("date", d)}
                    style={{ padding: "10px 16px", borderRadius: 10, border: `1px solid ${selections.date === d ? accentColor : border}`, background: selections.date === d ? `${accentColor}22` : surface, color: selections.date === d ? accentColor : "#ccc", cursor: "pointer", fontSize: 13, fontWeight: selections.date === d ? 600 : 400 }}>
                    {d}
                  </button>
                ))}
              </div>
              {selections.date && (
                <div>
                  <p style={{ fontSize: 13, color: muted, marginBottom: 14 }}>Müsait saatler</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {CENTRES.find(c => c.id === selections.centre)?.slots.map(slot => (
                      <button key={slot} onClick={() => sel("slot", slot)}
                        style={{ padding: "12px 22px", borderRadius: 10, border: `1px solid ${selections.slot === slot ? accentColor : border}`, background: selections.slot === slot ? `${accentColor}22` : surface, color: selections.slot === slot ? accentColor : "#ccc", cursor: "pointer", fontSize: 15, fontWeight: 600 }}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {selections.slot && (
                <div style={{ marginTop: 20, padding: 14, background: `${accentColor}11`, borderRadius: 10, border: `1px solid ${accentColor}33`, fontSize: 13, color: accentColor }}>
                  ⏱ Slot 15 dakika rezerve edildi. Ödemeyi tamamlamazsanız otomatik serbest bırakılır.
                </div>
              )}
            </div>
          )}

          {/* STEP 6 — Details */}
          {step === 6 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Hasta bilgileri</h2>
              <p style={{ fontSize: 14, color: muted, marginBottom: 24 }}>Bilgileriniz yalnızca randevu için kullanılır.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 560 }}>
                {[
                  { label: "Ad", key: "name", half: false },
                  { label: "Doğum Tarihi", key: "dob" },
                  { label: "E-posta", key: "email" },
                  { label: "Telefon", key: "phone" },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.half === false ? "1 / -1" : "auto" }}>
                    <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input value={selections[f.key] || ""} onChange={e => sel(f.key, e.target.value)}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${border}`, background: surface, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: 14, background: surface, borderRadius: 10, border: `1px solid ${border}`, fontSize: 12, color: muted }}>
                🔒 GDPR uyumlu — verileriniz 3. taraflarla paylaşılmaz. ICO kayıtlı platform.
              </div>
            </div>
          )}

          {/* STEP 7 — Payment */}
          {step === 7 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Ödeme</h2>
              <p style={{ fontSize: 14, color: muted, marginBottom: 24 }}>Stripe ile güvenli ödeme · SSL şifreli</p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 6 }}>Kart Numarası</label>
                    <input value="4242 4242 4242 4242" readOnly
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${border}`, background: surface, color: "#888", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 6 }}>Son Kullanma</label>
                      <input value="12/27" readOnly style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${border}`, background: surface, color: "#888", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: muted, display: "block", marginBottom: 6 }}>CVC</label>
                      <input value="•••" readOnly style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${border}`, background: surface, color: "#888", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                </div>
                <div style={{ width: 220, background: surface, borderRadius: 14, border: `1px solid ${border}`, padding: 20, height: "fit-content" }}>
                  <div style={{ fontSize: 12, color: muted, marginBottom: 14 }}>ÖZET</div>
                  {[
                    { label: `${selections.scanType?.toUpperCase()} — ${selections.bodyPart}`, val: `£${CENTRES.find(c => c.id === selections.centre)?.price || 299}` },
                    { label: "Radyoloji raporu", val: "Dahil" },
                    { label: "Platform ücreti", val: "£0" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
                      <span style={{ color: muted }}>{r.label}</span>
                      <span style={{ color: "#fff" }}>{r.val}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${border}`, paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700 }}>Toplam</span>
                    <span style={{ fontWeight: 700, color: accentColor, fontSize: 18 }}>£{CENTRES.find(c => c.id === selections.centre)?.price || 299}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8 — Confirmed */}
          {step === 8 && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
              <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 10 }}>Randevunuz onaylandı!</h2>
              <p style={{ fontSize: 15, color: muted, marginBottom: 32, lineHeight: 1.7 }}>
                {CENTRES.find(c => c.id === selections.centre)?.name}<br />
                {selections.date} · {selections.slot}<br />
                {selections.scanType?.toUpperCase()} — {selections.bodyPart}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {["📧 Onay e-postası gönderildi", "📅 .ics takvim dosyası", "📱 SMS hatırlatma ayarlandı"].map((item, i) => (
                  <div key={i} style={{ padding: "10px 18px", background: surface, borderRadius: 10, border: `1px solid ${border}`, fontSize: 13 }}>{item}</div>
                ))}
              </div>
              <div style={{ marginTop: 32, padding: 20, background: `${accentColor}11`, border: `1px solid ${accentColor}33`, borderRadius: 14, maxWidth: 400, margin: "32px auto 0" }}>
                <div style={{ fontSize: 13, color: accentColor, marginBottom: 8, fontWeight: 600 }}>Sonraki adımlar</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
                  📋 Randevu öncesi hazırlık talimatları e-postanızda<br />
                  📄 Sonuçlar 48 saat içinde portala yüklenir<br />
                  💬 Sorularınız için canlı destek hattı: 0800 XXX XXXX
                </div>
              </div>
            </div>
          )}

          {/* NAV BUTTONS */}
          {step < 8 && (
            <div style={{ display: "flex", gap: 12, marginTop: 32, justifyContent: "flex-end" }}>
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} style={{ padding: "12px 24px", borderRadius: 10, border: `1px solid ${border}`, background: "transparent", color: "#ccc", cursor: "pointer", fontSize: 14 }}>
                  ← Geri
                </button>
              )}
              <button onClick={() => canNext() && setStep(s => s + 1)}
                style={{ padding: "12px 32px", borderRadius: 10, border: "none", background: canNext() ? accentColor : "rgba(255,255,255,0.08)", color: canNext() ? "#000" : "#555", cursor: canNext() ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 700, transition: "all 0.15s" }}>
                {step === 7 ? "Ödemeyi Tamamla →" : "Devam Et →"}
              </button>
            </div>
          )}
        </div>

        {/* CODE PANEL */}
        {showCode && (
          <div style={{ width: 360, marginLeft: 24, flexShrink: 0 }}>
            <div style={{ position: "sticky", top: 20 }}>
              <div style={{ background: "#0d1117", border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ background: "#161b22", padding: "12px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                      <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: muted, fontFamily: "monospace" }}>
                    adım_{step}.ts — nasıl kodlanır?
                  </span>
                </div>
                <pre style={{ margin: 0, padding: "20px 18px", fontSize: 11, lineHeight: 1.7, color: "#a8e6cb", fontFamily: "'Fira Code', monospace", overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {CODE_SNIPPETS[step] || "// Bu adım için kod örneği yok"}
                </pre>
              </div>
              <div style={{ marginTop: 14, padding: 14, background: surface, borderRadius: 12, border: `1px solid ${border}`, fontSize: 12, color: muted, lineHeight: 1.7 }}>
                💡 <strong style={{ color: "#ccc" }}>Bu adımın kritik noktası:</strong><br />
                {step === 1 && "Scan tipi seçimi URL'e yansısın: /book/mri — SEO için şart"}
                {step === 2 && "Body parts scan_type'a bağlı FK — ayrı tablo yap"}
                {step === 3 && "PostGIS kurmadan lokasyon bazlı arama yavaş kalır"}
                {step === 4 && "Her klinike gerçek zamanlı slot sayısı göster — cache'le"}
                {step === 5 && "Slot seçiminde row-level lock kullan — iki kişi aynı slotu alamasın"}
                {step === 6 && "Minimum veri topla. GDPR ihlali ciddi ceza demek"}
                {step === 7 && "API key asla frontend'e gitme! Server-side Stripe çağrısı"}
                {step === 8 && "Tüm post-booking işlemleri paralel çalıştır (Promise.all)"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

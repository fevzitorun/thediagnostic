import { useState } from "react";

const STAGES = [
  {
    id: "discovery",
    num: "01",
    title: "Keşif & Hedefleme",
    subtitle: "Hangi kliniklere yaklaşacaksın?",
    color: "#1a3a5c",
    icon: "🎯",
    content: {
      desc: "UK'daki ~1,200 özel görüntüleme merkezini segmentlere ayır. Önce doluluk oranı düşük, boş slotu fazla olan klinikleri hedefle — onlar için sen müşteri demeksin.",
      actions: [
        { label: "CQC Register", note: "cqc.org.uk — tüm kayıtlı UK klinikleri ücretsiz listeleniyor" },
        { label: "Companies House", note: "sahiplik bilgisi & finansal durum araştırması" },
        { label: "Google Maps Scraping", note: "lokasyon, rating, boşluk tespiti" },
        { label: "LinkedIn Outreach", note: "klinik direktörü / iş geliştirme kişilerine doğrudan" },
      ],
      priority: [
        "Küçük-orta ölçekli bağımsız klinikler (zincirler değil — önce)",
        "Şehir merkezinden 10-20 dk uzakta, park yeri olan",
        "MRI + CT + Ultrasound üçlüsüne sahip",
        "Google'da yorumu olan ama online booking'i olmayan",
      ],
      warning: "Büyük zincirlerle (Alliance Medical, InHealth) direkt başlama — müzakere uzun sürer. İlk 50 klinik bağımsız olsun."
    }
  },
  {
    id: "pitch",
    num: "02",
    title: "İlk Temas & Pitch",
    subtitle: "Ne sunacaksın, nasıl ikna edeceksin?",
    color: "#1a5c3a",
    icon: "🤝",
    content: {
      desc: "Kliniğin sorunu: boş scanner zamanı = para kaybı. Senin çözümün: o boş slotları doldurmak. Hiç risk yok, komisyon sadece rezervasyon gerçekleşince.",
      pitch_points: [
        { title: "Sıfır peşin maliyet", desc: "Yazılım ücreti yok, entegrasyon ücreti yok" },
        { title: "Pay per booking", desc: "Yalnızca tamamlanan rezervasyondan %12-18 komisyon" },
        { title: "Yeni hasta kanalı", desc: "NHS referans bekleyenler + yabancı hastalar + self-pay" },
        { title: "Admin yükü yok", desc: "Hasta iletişimi, ödeme, hatırlatma — hepsi bizde" },
      ],
      objections: [
        { q: "\"Zaten doluyuz\"", a: "O zaman fiyatını yükselt — pazar fiyatını biz gösteriyoruz" },
        { q: "\"Var olan software ile çalışmaz\"", a: "3 entegrasyon tipi var — manuel portal bile yeterli" },
        { q: "\"Komisyon fazla\"", a: "Boş slotun geliri sıfır. %85'i almak sıfırdan iyidir" },
        { q: "\"Hasta kalitesi?\"", a: "Ödeme önceden alınır, no-show sigortası sunulur" },
      ]
    }
  },
  {
    id: "agreement",
    num: "03",
    title: "Sözleşme & Şartlar",
    subtitle: "Ticari anlaşmanın anatomisi",
    color: "#5c1a3a",
    icon: "📋",
    content: {
      commercial: [
        { item: "Komisyon oranı", val: "Rezervasyon başı %12–18 (scan tipine göre kademeli)" },
        { item: "Ödeme devri", val: "14 gün net (hasta ödedikten sonra kliniğe aktarım)" },
        { item: "No-show politikası", val: "Hasta 24h öncesine kadar iptal → tam iade. Sonrası → %50 klinik tazminatı" },
        { item: "Minimum taahhüt", val: "Yok — istediği zaman çıkabilir (30 gün ihbar)" },
        { item: "Fiyat kontrolü", val: "Klinik kendi fiyatını belirler, platform minimum belirleyemez" },
        { item: "Exclusivity", val: "Yok — aynı anda rakip platformlarda da listelenir" },
      ],
      legal_checklist: [
        "GDPR & ICO kayıt zorunluluğu — hasta verisi işleme sözleşmesi (DPA)",
        "CQC uyumluluk beyanı — platforma yüklenen lisans belgesi",
        "Radyoloji raporu sorumluluğu — klinike ait, ScanBook'a değil",
        "PII data aktarımı — sadece rezervasyon bilgisi, tıbbi kayıt değil",
        "Stripe Connect — her klinik kendi sub-account'u ile ödeme alır",
      ]
    }
  },
  {
    id: "integration",
    num: "04",
    title: "Teknik Entegrasyon",
    subtitle: "3 katmanlı bağlantı sistemi",
    color: "#3a1a5c",
    icon: "⚙️",
    content: {
      tiers: [
        {
          tier: "Tier 1 — API",
          badge: "Premium",
          badgeColor: "#1a6b5c",
          who: "Büyük merkezler, zincirler",
          how: "RIS/PACS sistemiyle REST API veya HL7 FHIR entegrasyonu",
          effort: "2–4 hafta",
          realtime: true,
          systems: ["Carestream", "Sectra", "Synapse", "Nexus", "Intelerad"],
          steps: [
            "Klinik IT ekibiyle API credential paylaşımı",
            "Webhook kurulumu — slot değişince ScanBook'a anlık bildirim",
            "Test ortamında booking döngüsü doğrulama",
            "Prod geçiş & monitoring kurulumu",
          ]
        },
        {
          tier: "Tier 2 — Manuel Portal",
          badge: "Standard",
          badgeColor: "#c47a1a",
          who: "Küçük-orta bağımsız klinikler",
          how: "ScanBook Partner Portal'a giriş yaparak slot yönetimi",
          effort: "1 gün",
          realtime: false,
          systems: [],
          steps: [
            "Klinike Partner Portal hesabı açılır",
            "Haftalık/aylık müsaitlik blokları girişi (drag & drop)",
            "Rezervasyon bildirimi SMS + email ile klinik staff'a",
            "Onay workflow — klinik 2 saat içinde confirm/reject",
          ]
        },
        {
          tier: "Tier 3 — Telefon/Email",
          badge: "Starter",
          badgeColor: "#888",
          who: "Pilot dönem, küçük klinikler",
          how: "ScanBook ops ekibi aracılığıyla manuel koordinasyon",
          effort: "Anında",
          realtime: false,
          systems: [],
          steps: [
            "Hasta talepte bulunur, platform klinikle contact eder",
            "Klinik slot onayı email/WhatsApp ile iletir",
            "Ödeme alınır, booking confirm edilir",
            "Ölçeklendikçe Tier 2'ye taşıma hedeflenir",
          ]
        }
      ]
    }
  },
  {
    id: "golive",
    num: "05",
    title: "Go-Live Checklist",
    subtitle: "Listeye eklemeden önce doğrulama",
    color: "#1a4a1a",
    icon: "🚀",
    content: {
      checklist: [
        { cat: "Profil", items: ["Klinik adı, adres, tel, web sitesi ✓", "Fotoğraflar (dış, bekleme, scanner odası) min 5 adet", "Yönetici/radyolog biyografisi", "Ulaşım & otopark bilgisi", "Engelli erişim durumu"] },
        { cat: "Hizmetler", items: ["Scan tipleri ve vücut bölgesi matrisi dolduruldu", "Her scan için fiyat girildi", "Kontrast/sedation seçenekleri işaretlendi", "Raporlama süresi belirtildi (24h / 48h / acil)"] },
        { cat: "Entegrasyon", items: ["Slot sistemi test edildi (1 test booking yapıldı)", "Bildirim emaili doğru adrese geliyor", "Ödeme akışı test edildi", "İptal/iade prosedürü tanımlandı"] },
        { cat: "Uyumluluk", items: ["CQC belgeleri yüklendi", "DPA imzalandı", "Stripe Connect hesabı aktif", "Insurance/indemnity beyanı alındı"] },
      ]
    }
  }
];

const TIMELINE = [
  { week: "Hf 1-2", action: "CQC ve Google'dan hedef klinik listesi (~200 klinik)", done: true },
  { week: "Hf 3-4", action: "İlk outreach dalgası — 200 kliniğe email + LinkedIn", done: true },
  { week: "Hf 4-6", action: "İlk 20 klinik toplantısı & demo", done: false },
  { week: "Hf 6-8", action: "İlk 10 klinik sözleşme imzası", done: false },
  { week: "Hf 8-10", action: "Tier 2 portal ile ilk 10 klinik canlıya geçiş", done: false },
  { week: "Hf 10-12", action: "İlk 100 rezervasyon hedefi & feedback döngüsü", done: false },
  { week: "Ay 4-6", action: "50 klinik, Tier 1 API entegrasyonları başlar", done: false },
  { week: "Ay 6+", action: "100+ klinik, zincir müzakereleri, Phase 2 hazırlığı", done: false },
];

export default function OnboardingBlueprint() {
  const [activeStage, setActiveStage] = useState("discovery");
  const [activeTier, setActiveTier] = useState(0);
  const stage = STAGES.find(s => s.id === activeStage);

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#0d1117",
      minHeight: "100vh",
      color: "#e6e1d8"
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "24px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div>
          <div style={{ fontSize: 11, color: "#a8e6da", letterSpacing: 3, fontFamily: "monospace", marginBottom: 6 }}>
            SCANBOOK.UK — PARTNER BLUEPRINT
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 400, margin: 0, color: "#fff" }}>
            Klinik Onboarding <em style={{ color: "#a8e6da" }}>Operasyonu</em>
          </h1>
        </div>
        <div style={{
          background: "rgba(168,230,218,0.1)",
          border: "1px solid rgba(168,230,218,0.2)",
          borderRadius: 10, padding: "10px 20px", textAlign: "center"
        }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#a8e6da" }}>Hedef</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>İlk 6 ayda 100 klinik</div>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 81px)" }}>
        {/* Sidebar */}
        <div style={{
          width: 240, flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 0"
        }}>
          {STAGES.map(s => (
            <button key={s.id}
              onClick={() => setActiveStage(s.id)}
              style={{
                width: "100%", textAlign: "left",
                padding: "14px 24px",
                background: activeStage === s.id ? "rgba(168,230,218,0.08)" : "transparent",
                border: "none",
                borderLeft: activeStage === s.id ? "3px solid #a8e6da" : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s"
              }}>
              <div style={{ fontSize: 10, color: "#555", fontFamily: "monospace", marginBottom: 2 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: activeStage === s.id ? "#a8e6da" : "#888", fontWeight: activeStage === s.id ? 600 : 400, fontFamily: "sans-serif" }}>
                {s.icon} {s.title}
              </div>
            </button>
          ))}

          <div style={{ margin: "20px 24px 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace", marginBottom: 12 }}>ZAMAN ÇİZELGESİ</div>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0, marginTop: 4,
                  background: t.done ? "#a8e6da" : "rgba(255,255,255,0.15)"
                }} />
                <div>
                  <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace" }}>{t.week}</div>
                  <div style={{ fontSize: 10, color: t.done ? "#a8e6da" : "#666", fontFamily: "sans-serif", lineHeight: 1.4 }}>{t.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "36px 48px", overflow: "auto" }}>

          {/* Stage Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: stage.color, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 22
              }}>{stage.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>AŞAMA {stage.num}</div>
                <h2 style={{ fontSize: 24, margin: 0, color: "#fff", fontWeight: 500 }}>{stage.title}</h2>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#888", fontFamily: "sans-serif", lineHeight: 1.7, maxWidth: 680 }}>
              {stage.content.desc}
            </p>
          </div>

          {/* Discovery Stage */}
          {stage.id === "discovery" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
                <h3 style={{ fontSize: 13, color: "#a8e6da", fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>VERİ KAYNAKLARI</h3>
                {stage.content.actions.map((a, i) => (
                  <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < stage.content.actions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginBottom: 4 }}>{a.label}</div>
                    <div style={{ fontSize: 12, color: "#666", fontFamily: "sans-serif" }}>{a.note}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
                  <h3 style={{ fontSize: 13, color: "#a8e6da", fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>HEDEF KLİNİK PROFİLİ</h3>
                  {stage.content.priority.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#a8e6da", fontSize: 14, flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: 13, color: "#ccc", fontFamily: "sans-serif", lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(255,160,0,0.08)", border: "1px solid rgba(255,160,0,0.2)", borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 11, color: "#ffa000", fontFamily: "monospace", marginBottom: 8 }}>⚠ TAKTİK NOT</div>
                  <p style={{ fontSize: 12, color: "#ccc", fontFamily: "sans-serif", lineHeight: 1.7, margin: 0 }}>{stage.content.warning}</p>
                </div>
              </div>
            </div>
          )}

          {/* Pitch Stage */}
          {stage.id === "pitch" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
                <h3 style={{ fontSize: 13, color: "#a8e6da", fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>PITCH ARGÜMANLARI</h3>
                {stage.content.pitch_points.map((p, i) => (
                  <div key={i} style={{ marginBottom: 16, padding: 16, background: "rgba(168,230,218,0.05)", borderRadius: 10 }}>
                    <div style={{ fontSize: 14, color: "#a8e6da", fontWeight: 600, marginBottom: 6 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", lineHeight: 1.5 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
                <h3 style={{ fontSize: 13, color: "#ffa0a0", fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>OBJECTION HANDLING</h3>
                {stage.content.objections.map((o, i) => (
                  <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < stage.content.objections.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div style={{ fontSize: 13, color: "#ffa0a0", fontWeight: 600, fontFamily: "sans-serif", marginBottom: 6 }}>{o.q}</div>
                    <div style={{ fontSize: 12, color: "#999", fontFamily: "sans-serif", lineHeight: 1.6 }}>💬 {o.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agreement Stage */}
          {stage.id === "agreement" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
                <h3 style={{ fontSize: 13, color: "#a8e6da", fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>TİCARİ ŞARTLAR</h3>
                {stage.content.commercial.map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < stage.content.commercial.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12, color: "#666", fontFamily: "sans-serif", flexShrink: 0 }}>{c.item}</span>
                    <span style={{ fontSize: 12, color: "#ccc", fontFamily: "sans-serif", textAlign: "right" }}>{c.val}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
                <h3 style={{ fontSize: 13, color: "#ffd0a0", fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>HUKUKİ KONTROL LİSTESİ</h3>
                {stage.content.legal_checklist.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 18, height: 18, border: "1px solid rgba(255,208,160,0.4)", borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 8, height: 8, background: "rgba(255,208,160,0.3)", borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#999", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integration Stage */}
          {stage.id === "integration" && (
            <div>
              {/* Tier Selector */}
              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                {stage.content.tiers.map((t, i) => (
                  <button key={i} onClick={() => setActiveTier(i)}
                    style={{
                      flex: 1, padding: "16px",
                      background: activeTier === i ? "rgba(168,230,218,0.1)" : "rgba(255,255,255,0.02)",
                      border: activeTier === i ? "1px solid rgba(168,230,218,0.4)" : "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 12, cursor: "pointer", textAlign: "left"
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: activeTier === i ? "#a8e6da" : "#666", fontFamily: "monospace" }}>{t.tier}</span>
                      <span style={{
                        fontSize: 9, padding: "2px 6px", borderRadius: 4, fontFamily: "monospace",
                        background: t.badgeColor + "22", color: t.badgeColor
                      }}>{t.badge}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "sans-serif" }}>{t.who}</div>
                    <div style={{ fontSize: 11, color: t.realtime ? "#a8e6da" : "#666", marginTop: 4, fontFamily: "sans-serif" }}>
                      {t.realtime ? "⚡ Gerçek zamanlı" : "⏱ Manuel onay"} · {t.effort}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Tier Detail */}
              {(() => {
                const t = stage.content.tiers[activeTier];
                return (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
                      <h3 style={{ fontSize: 13, color: "#a8e6da", fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>ENTEGRASYON ADIMLARI</h3>
                      {t.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: "50%",
                            background: "rgba(168,230,218,0.15)", color: "#a8e6da",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontFamily: "monospace", flexShrink: 0, fontWeight: 700
                          }}>{i + 1}</div>
                          <span style={{ fontSize: 13, color: "#ccc", fontFamily: "sans-serif", lineHeight: 1.6, paddingTop: 2 }}>{step}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
                        <h3 style={{ fontSize: 13, color: "#a8e6da", fontFamily: "monospace", marginBottom: 14, letterSpacing: 1 }}>NASIL ÇALIŞIR?</h3>
                        <p style={{ fontSize: 13, color: "#888", fontFamily: "sans-serif", lineHeight: 1.7 }}>{t.how}</p>
                      </div>
                      {t.systems.length > 0 && (
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
                          <h3 style={{ fontSize: 13, color: "#a8e6da", fontFamily: "monospace", marginBottom: 14, letterSpacing: 1 }}>DESTEKLENEN SİSTEMLER</h3>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {t.systems.map((sys, i) => (
                              <span key={i} style={{
                                padding: "6px 12px", background: "rgba(168,230,218,0.06)",
                                border: "1px solid rgba(168,230,218,0.15)",
                                borderRadius: 6, fontSize: 12, color: "#a8e6da", fontFamily: "monospace"
                              }}>{sys}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {t.systems.length === 0 && (
                        <div style={{ background: "rgba(255,160,0,0.06)", border: "1px solid rgba(255,160,0,0.15)", borderRadius: 14, padding: 24 }}>
                          <div style={{ fontSize: 11, color: "#ffa000", fontFamily: "monospace", marginBottom: 8 }}>💡 TAKTİK NOT</div>
                          <p style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", lineHeight: 1.7, margin: 0 }}>
                            {activeTier === 1
                              ? "MVP'de bu tier ile başla. 10 klinik el ile yönetmek mümkün. Ölçek büyüyünce Tier 1'e taşı."
                              : "Sadece ilk partnership'ler için geçici. Hedef: tüm klinikleri 90 gün içinde Tier 2'ye taşımak."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Go-Live Stage */}
          {stage.id === "golive" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {stage.content.checklist.map((cat, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
                  <h3 style={{ fontSize: 13, color: "#a8e6da", fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>{cat.cat.toUpperCase()}</h3>
                  {cat.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                      <div style={{
                        width: 16, height: 16, border: "1px solid rgba(168,230,218,0.3)",
                        borderRadius: 4, flexShrink: 0, marginTop: 2,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <div style={{ width: 8, height: 8, background: "rgba(168,230,218,0.2)", borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1", background: "linear-gradient(135deg, rgba(26,107,92,0.15), rgba(26,107,92,0.05))", border: "1px solid rgba(26,107,92,0.3)", borderRadius: 14, padding: 24 }}>
                <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
                  {[
                    { num: "< 2 gün", label: "Tier 2 ile go-live süresi" },
                    { num: "£0", label: "Klinik maliyeti" },
                    { num: "48 saat", label: "Hata bildirimi & destek SLA" },
                    { num: "14 gün", label: "İlk ödeme devresi" },
                  ].map((m, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "#a8e6da" }}>{m.num}</div>
                      <div style={{ fontSize: 11, color: "#555", fontFamily: "sans-serif", marginTop: 4 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

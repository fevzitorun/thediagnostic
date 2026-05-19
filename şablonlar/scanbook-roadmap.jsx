import { useState } from "react";

const PHASES = [
  {
    id: "setup",
    phase: "Faz 1",
    title: "Kurulum & Altyapı",
    duration: "Hafta 1–2",
    effort: "Sen: 4 saat · Ben: tam destek",
    color: "#0984e3",
    tasks: [
      { who: "sen", task: "scanbook.uk domain al (Namecheap ~£10/yıl)" },
      { who: "sen", task: "GitHub, Vercel, Railway hesabı aç — hepsi ücretsiz" },
      { who: "sen", task: "Stripe UK hesabı aç (şirket bilgileriyle)" },
      { who: "ben", task: "Next.js projesi kur, GitHub'a push et" },
      { who: "ben", task: "PostgreSQL şeması yaz (7 tablo)" },
      { who: "ben", task: "Vercel'e deploy et — scanbook.uk canlı" },
      { who: "ikisi", task: "Domain DNS ayarları bağlanır" },
    ],
    deliverable: "🌐 scanbook.uk açılır, boş ama canlı",
  },
  {
    id: "mvp",
    phase: "Faz 2",
    title: "MVP Geliştirme",
    duration: "Hafta 3–8",
    effort: "Sen: 8 saat · Ben: günlük kod",
    color: "#00b894",
    tasks: [
      { who: "ben", task: "Ana sayfa + arama widget (scan tipi + lokasyon)" },
      { who: "ben", task: "Klinik profil sayfaları (dinamik, SEO optimize)" },
      { who: "ben", task: "Hasta booking akışı (8 adım — zaten tasarlandı)" },
      { who: "ben", task: "Stripe ödeme entegrasyonu" },
      { who: "ben", task: "Klinik partner portal (zaten tasarlandı)" },
      { who: "ben", task: "Email bildirimleri (Resend.com ile)" },
      { who: "sen", task: "İlk 5 klinikle anlaşma imzala" },
      { who: "sen", task: "Klinik profillerini platforma gir" },
    ],
    deliverable: "✅ Gerçek rezervasyon alınabilir hale gelir",
  },
  {
    id: "launch",
    phase: "Faz 3",
    title: "Soft Launch",
    duration: "Hafta 9–12",
    effort: "Sen: yoğun · Ben: bug fix & iyileştirme",
    color: "#fdcb6e",
    tasks: [
      { who: "ben", task: "Admin paneli (rezervasyon yönetimi)" },
      { who: "ben", task: "SEO sayfaları: 'MRI Scan London', 'CT Scan Manchester'" },
      { who: "ben", task: "SMS hatırlatma (Twilio)" },
      { who: "ben", task: "Review & rating sistemi" },
      { who: "sen", task: "10 klinik canlıya al" },
      { who: "sen", task: "Google Ads: branded + lokasyon kampanyaları" },
      { who: "sen", task: "İlk 100 rezervasyon hedefi" },
      { who: "ikisi", task: "Kullanıcı geri bildirimleri → iterasyon" },
    ],
    deliverable: "🚀 İlk gerçek gelir, ilk kullanıcı yorumları",
  },
  {
    id: "scale",
    phase: "Faz 4",
    title: "Ölçeklendirme",
    duration: "Ay 4–6",
    effort: "Momentum kazanılıyor",
    color: "#a29bfe",
    tasks: [
      { who: "ben", task: "API entegrasyonları (klinik yazılımları — Tier 1)" },
      { who: "ben", task: "Mobil uygulama (React Native — aynı kod tabanı)" },
      { who: "ben", task: "AI scan recommender ('hangi testi yaptırmalıyım?')" },
      { who: "sen", task: "50 klinik hedefi" },
      { who: "sen", task: "Büyük zincirlerle müzakere (Alliance Medical, InHealth)" },
      { who: "sen", task: "PR & media outreach" },
      { who: "ikisi", task: "Türkiye modeli planlaması başlar" },
    ],
    deliverable: "📈 Sürdürülebilir büyüme, Türkiye hazırlığı",
  },
];

const STACK = [
  { cat: "Frontend", items: ["Next.js 14", "Tailwind CSS", "TypeScript"], color: "#0984e3" },
  { cat: "Backend", items: ["Next.js API Routes", "PostgreSQL", "PostGIS"], color: "#00b894" },
  { cat: "Servisler", items: ["Stripe Connect", "Resend (email)", "Twilio (SMS)"], color: "#fdcb6e" },
  { cat: "DevOps", items: ["Vercel (frontend)", "Railway (DB)", "GitHub"], color: "#a29bfe" },
];

const COSTS = [
  { item: "scanbook.uk domain", cost: "£10", period: "yıllık", who: "sen" },
  { item: "Vercel hosting", cost: "£0", period: "başlangıç", who: "sen" },
  { item: "Railway (DB)", cost: "£15", period: "aylık", who: "sen" },
  { item: "Resend (email)", cost: "£0", period: "100/gün ücretsiz", who: "sen" },
  { item: "Twilio (SMS)", cost: "~£20", period: "aylık (kullanıma göre)", who: "sen" },
  { item: "Stripe", cost: "1.4% + 20p", period: "işlem başına", who: "otomatik" },
  { item: "Şirket kurulumu (UK Ltd)", cost: "£50", period: "tek seferlik", who: "sen" },
];

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState("setup");
  const phase = PHASES.find(p => p.id === activePhase);

  const bg = "#080d1a";
  const surface = "#0f1624";
  const surface2 = "#161f30";
  const border = "rgba(255,255,255,0.07)";
  const muted = "rgba(255,255,255,0.4)";

  return (
    <div style={{ background: bg, minHeight: "100vh", color: "#e8e6f0", fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: 0 }}>

      {/* Header */}
      <div style={{ background: surface, borderBottom: `1px solid ${border}`, padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "#a8e6da", letterSpacing: 3, fontFamily: "monospace", marginBottom: 4 }}>SCANBOOK.UK — STARTUP YOLYARITASI</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>0'dan Canlıya: <span style={{ color: "#00b894" }}>12 Hafta</span></h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[{ val: "12 hf", label: "MVP'ye" }, { val: "£55/ay", label: "Başlangıç maliyeti" }, { val: "%15", label: "Komisyon" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "10px 16px", background: surface2, borderRadius: 10, border: `1px solid ${border}` }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#00b894" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>

        {/* Phase selector timeline */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32, overflowX: "auto" }}>
          {PHASES.map((p, i) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 160 }}>
              <div onClick={() => setActivePhase(p.id)}
                style={{ flex: 1, padding: "14px 16px", borderRadius: 12, border: `1px solid ${activePhase === p.id ? p.color : border}`, background: activePhase === p.id ? `${p.color}18` : surface, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontSize: 10, color: muted, fontFamily: "monospace", marginBottom: 4 }}>{p.duration}</div>
                <div style={{ fontSize: 11, color: p.color, fontWeight: 700, marginBottom: 2 }}>{p.phase}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: activePhase === p.id ? "#fff" : "#888" }}>{p.title}</div>
              </div>
              {i < PHASES.length - 1 && <div style={{ width: 20, height: 2, background: border, flexShrink: 0 }} />}
            </div>
          ))}
        </div>

        {/* Phase detail */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, marginBottom: 32 }}>
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>{phase.title}</h2>
                <div style={{ fontSize: 13, color: muted }}>{phase.effort}</div>
              </div>
              <div style={{ padding: "6px 14px", background: `${phase.color}22`, border: `1px solid ${phase.color}44`, borderRadius: 20, fontSize: 12, color: phase.color }}>
                {phase.duration}
              </div>
            </div>

            {phase.tasks.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "11px 0", borderBottom: i < phase.tasks.length - 1 ? `1px solid ${border}` : "none", alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0, width: 44, padding: "3px 0", textAlign: "center",
                  fontSize: 10, fontWeight: 700, borderRadius: 6,
                  background: t.who === "sen" ? "#0984e322" : t.who === "ben" ? "#00b89422" : "#a29bfe22",
                  color: t.who === "sen" ? "#0984e3" : t.who === "ben" ? "#00b894" : "#a29bfe",
                }}>
                  {t.who === "sen" ? "SEN" : t.who === "ben" ? "BEN" : "İKİSİ"}
                </div>
                <span style={{ fontSize: 14, color: "#ddd", lineHeight: 1.5 }}>{t.task}</span>
              </div>
            ))}

            <div style={{ marginTop: 20, padding: 14, background: `${phase.color}11`, border: `1px solid ${phase.color}33`, borderRadius: 10, fontSize: 13, color: phase.color }}>
              🎯 <strong>Çıktı:</strong> {phase.deliverable}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Legend */}
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 12, color: muted, marginBottom: 12 }}>KİM NE YAPIYOR?</div>
              {[
                { who: "SEN", color: "#0984e3", desc: "Hesap aç, domain al, kliniklerle görüş, içerik gir" },
                { who: "BEN", color: "#00b894", desc: "Tüm kodu yaz, deploy et, hata çöz, sana adım adım söyle" },
                { who: "İKİSİ", color: "#a29bfe", desc: "Test et, karar ver, iterasyon" },
              ].map((l, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: `${l.color}22`, color: l.color, flexShrink: 0 }}>{l.who}</span>
                  <span style={{ fontSize: 12, color: muted, lineHeight: 1.5 }}>{l.desc}</span>
                </div>
              ))}
            </div>

            {/* CQC note */}
            <div style={{ background: surface, border: `1px solid #fdcb6e44`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 11, color: "#fdcb6e", fontFamily: "monospace", marginBottom: 10 }}>⚖ CQC DURUMU</div>
              <p style={{ fontSize: 12, color: muted, lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#fff" }}>Platform olarak CQC'ye başvurman gerekmiyor.</strong><br /><br />
                Mevcut UK şirketinle başlayabilirsin. Sadece kliniklerin CQC kayıtlı olduğunu doğrulaman yeterli.<br /><br />
                Sözleşmene ekle: "Yalnızca aktif CQC kaydı olan klinikleri listeleriz."
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🛠 Tech Stack — Şablon Kullanacak mıyız?</h3>
          <div style={{ padding: 14, background: "#00b89411", border: "1px solid #00b89433", borderRadius: 10, marginBottom: 16, fontSize: 13, color: "#00b894" }}>
            <strong>Şablon değil, starter kit.</strong> <span style={{ color: muted }}>Sıfırdan yazmak yerine Next.js'in resmi template'iyle başlarız — ama her satır proje için özelleştirilmiş olacak. WordPress gibi hazır tema değil.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            {STACK.map((s, i) => (
              <div key={i} style={{ background: surface2, borderRadius: 12, padding: 16, border: `1px solid ${border}` }}>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>{s.cat.toUpperCase()}</div>
                {s.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 13, color: "#ccc", padding: "4px 0", borderBottom: j < s.items.length - 1 ? `1px solid ${border}` : "none" }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Cost table */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>💰 Başlangıç Maliyetleri</h3>
          <div style={{ overflowX: "auto" }}>
            {COSTS.map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < COSTS.length - 1 ? `1px solid ${border}` : "none", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, color: "#ccc" }}>{c.item}</span>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: muted }}>{c.period}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: c.cost === "£0" ? "#00b894" : "#fff", minWidth: 80, textAlign: "right" }}>{c.cost}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: 14, background: surface2, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: muted }}>İlk ay toplam (domain dahil)</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#00b894" }}>~£75</span>
          </div>
        </div>

        {/* Turkey note */}
        <div style={{ background: "linear-gradient(135deg, #0f1624, #1a2234)", border: `1px solid #a29bfe44`, borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 11, color: "#a29bfe", fontFamily: "monospace", marginBottom: 12, letterSpacing: 2 }}>PHASE 2 — TÜRKİYE MODELİ</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 10px" }}>UK başarısını Türkiye'ye taşıma</h3>
          <p style={{ fontSize: 13, color: muted, lineHeight: 1.8, margin: "0 0 16px" }}>
            UK'da kanıtlanmış model + referans klinikler + gelir verisi → Türkiye yatırımcılarına pitch deck. Türkiye için ayrı entity, SGK entegrasyonu ve KVKK uyumu gerekecek — ama kod tabanının %80'i yeniden kullanılabilir.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["MR görüntüleme.tr", "Özel klinik ağı", "SGK + özel sigorta", "KVKK uyumu", "Türkçe SEO"].map((tag, i) => (
              <span key={i} style={{ padding: "5px 12px", background: "#a29bfe18", border: "1px solid #a29bfe33", borderRadius: 20, fontSize: 12, color: "#a29bfe" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

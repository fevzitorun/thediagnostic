import { useState } from "react";

const accent = "#00c896";
const bg = "#07090f";
const surface = "#0f1420";
const surface2 = "#161d2e";
const border = "rgba(255,255,255,0.07)";
const muted = "rgba(255,255,255,0.42)";

const Card = ({ children, style = {} }) => (
  <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 22, ...style }}>
    {children}
  </div>
);

const Tag = ({ children, color = accent }) => (
  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${color}20`, color, border: `1px solid ${color}33`, display: "inline-block", whiteSpace: "nowrap" }}>{children}</span>
);

const SECTIONS = [
  { id: "brand", label: "🏢 Marka Yapısı" },
  { id: "planb", label: "💡 PlanB Kararı" },
  { id: "april", label: "🚀 15 Nisan Planı" },
  { id: "outreach", label: "📨 Klinik İletişim" },
  { id: "financial", label: "💰 6 Ay Finansal" },
  { id: "investor", label: "📈 Yatırımcı" },
  { id: "contracts", label: "📋 Sözleşmeler" },
];

// Finansal model verisi
const MONTHLY = [
  {
    month: "Nisan", clinics: 5, dailyBookings: 8, avgTicket: 220, commissionPct: 0.14,
    costs: { hosting: 30, marketing: 500, tools: 150, legal: 200, misc: 100 },
    note: "Soft launch — test fazı"
  },
  {
    month: "Mayıs", clinics: 10, dailyBookings: 18, avgTicket: 235, commissionPct: 0.14,
    costs: { hosting: 30, marketing: 800, tools: 150, legal: 100, misc: 150 },
    note: "10 şehir hedefi"
  },
  {
    month: "Haziran", clinics: 18, dailyBookings: 32, avgTicket: 240, commissionPct: 0.15,
    costs: { hosting: 50, marketing: 1200, tools: 200, legal: 100, misc: 200 },
    note: "GP ortaklıkları başlar"
  },
  {
    month: "Temmuz", clinics: 28, dailyBookings: 52, avgTicket: 245, commissionPct: 0.15,
    costs: { hosting: 80, marketing: 1500, tools: 250, legal: 150, misc: 250 },
    note: "Baby scan pazarlaması"
  },
  {
    month: "Ağustos", clinics: 40, dailyBookings: 75, avgTicket: 250, commissionPct: 0.15,
    costs: { hosting: 100, marketing: 2000, tools: 300, legal: 150, misc: 300 },
    note: "Lab testleri eklenir"
  },
  {
    month: "Eylül", clinics: 55, dailyBookings: 105, avgTicket: 255, commissionPct: 0.15,
    costs: { hosting: 150, marketing: 2500, tools: 350, legal: 200, misc: 350 },
    note: "Yatırımcı pitch hazırlığı"
  },
];

const calcMonth = (m) => {
  const monthlyBookings = m.dailyBookings * 30;
  const grossVolume = monthlyBookings * m.avgTicket;
  const revenue = Math.round(grossVolume * m.commissionPct);
  const totalCosts = Object.values(m.costs).reduce((a, b) => a + b, 0);
  const profit = revenue - totalCosts;
  return { monthlyBookings, grossVolume, revenue, totalCosts, profit };
};

export default function MasterPlan() {
  const [active, setActive] = useState("brand");

  const sections = {

    brand: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Marka Yapısı — Benim Önerim</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>The Connective + PlanB + ScanBook nasıl bir arada durur?</p>

        {/* Org chart */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {/* Holding */}
          <div style={{ display: "inline-block", padding: "14px 32px", background: "linear-gradient(135deg, #1a3a5c, #0f2040)", border: `1px solid #74b9ff44`, borderRadius: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>HOLDING / PARENT</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#74b9ff" }}>The Connective UK Ltd</div>
            <div style={{ fontSize: 12, color: muted }}>theconnective.uk · Legal entity · Yatırımcı ilişkileri</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 8 }}>
            <div style={{ width: 2, height: 30, background: border, margin: "0 auto" }} />
          </div>

          {/* Middle tier */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 8, flexWrap: "wrap" }}>
            {[
              { name: "PlanB Health Technology", color: "#a29bfe", sub: "Technology & Platform arm", note: "Kliniklere, GP'lere, kurumsal müşterilere satış" },
              { name: "ScanBook", color: accent, sub: "Consumer brand", note: "Hastalara görünen yüz · scanbook.uk" },
            ].map((b, i) => (
              <div key={i} style={{ padding: "12px 24px", background: surface2, border: `1px solid ${b.color}44`, borderRadius: 12, textAlign: "center", minWidth: 220 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: b.color, marginBottom: 4 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>{b.sub}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{b.note}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: muted, marginTop: 8, padding: "10px 16px", background: surface2, borderRadius: 8, display: "inline-block" }}>
            Kliniklere → <strong style={{ color: "#a29bfe" }}>PlanB Health Technology</strong> olarak gidiyorsun · Hastalara → <strong style={{ color: accent }}>ScanBook</strong> görünüyor
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <Card style={{ border: `1px solid #74b9ff44` }}>
            <div style={{ fontSize: 12, color: "#74b9ff", marginBottom: 12 }}>THE CONNECTIVE UK</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
              Hukuki çatı. Tüm sözleşmeler buradan imzalanır. Yatırımcı görüşmeleri burada olur. Çalışanlar buraya bağlı.
            </div>
          </Card>
          <Card style={{ border: `1px solid #a29bfe44` }}>
            <div style={{ fontSize: 12, color: "#a29bfe", marginBottom: 12 }}>PLANB HEALTH TECHNOLOGY</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
              Klinik direktörleri, GP'ler, hastane yöneticileriyle görüşürken kullanılan marka. 1000+ LinkedIn takipçi = anında güvenilirlik.
            </div>
          </Card>
          <Card style={{ border: `1px solid ${accent}44` }}>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>SCANBOOK</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
              Hastanın gördüğü marka. scanbook.uk. Booking.com gibi — temiz, hızlı, güvenilir. B2C yüzü.
            </div>
          </Card>
        </div>
      </div>
    ),

    planb: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>PlanB Kararı — Kesinlikle Kullan</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>1000+ LinkedIn takipçi sıfır maliyet ile güvenilirlik demek</p>

        <Card style={{ border: `1px solid ${accent}33`, marginBottom: 16, background: "linear-gradient(135deg, #0a1628, #0f2040)" }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 14 }}>NEDEN PLANB'Yİ KULLANMAK DOĞRU?</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { title: "Sosyal kanıt hazır", desc: "1000+ takipçi = klinik direktörü LinkedIn'de sizi aratır, bulur, gerçek görür. Sıfırdan marka kurmak aylar alır." },
              { title: "Sağlık teknolojisi çerçevesi", desc: "'Health Technology Services' ifadesi kliniklere güven verir. Startup değil, çözüm ortağı olarak konumlanırsın." },
              { title: "B2B için mükemmel", desc: "Klinik yöneticileri, GP'ler, hastane direktörleri — hepsi kurumsal yapıya güvenir. Consumer marka olan ScanBook'tan daha iyi." },
              { title: "Yatırımcıya güçlü hikaye", desc: "'PlanB Health Technology tarafından sunulan ScanBook platformu' — çok daha olgun görünür." },
            ].map((p, i) => (
              <div key={i} style={{ padding: 14, background: "rgba(0,200,150,0.06)", borderRadius: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: accent, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 14 }}>KLİNİK OUTREACH EMAIL İMZASI</div>
            <div style={{ padding: 14, background: surface2, borderRadius: 10, fontFamily: "monospace", fontSize: 12, lineHeight: 2, color: "#ddd" }}>
              <div style={{ color: muted }}>---</div>
              <div><strong>[Adın Soyadın]</strong></div>
              <div style={{ color: accent }}>Business Development Director</div>
              <div style={{ color: "#a29bfe" }}>PlanB Health Technology Services</div>
              <div style={{ color: muted }}>Powered by The Connective UK Ltd</div>
              <div>📧 name@planb.health</div>
              <div>🌐 scanbook.uk · planb.health</div>
              <div>💼 linkedin.com/company/planb-health</div>
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 14 }}>PLANB LİNKEDIN'İ GÜÇLENDIR</div>
            {[
              "Banner: 'Powering ScanBook — UK's Private Scan Marketplace'",
              "About: NHS bekleme krizini çözdüğünüzü anlat",
              "Haftalık post: UK private healthcare stats",
              "Follow: CQC, NHS England, BMJ, Pulse Magazine",
              "Connect: Klinik direktörleri, radyologlar, GP'ler",
              "Article: 'Why private imaging needs a Booking.com moment'",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>→ {t}</div>
            ))}
          </Card>
        </div>
      </div>
    ),

    april: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>15 Nisan Launch Planı</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Bugünden 15 Nisan'a — gün gün görev takvimi</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 20 }}>
          {[
            {
              period: "HEMEN — Bu Hafta", color: "#e17055",
              tasks: [
                { who: "SEN", task: "scanbook.uk + scanbook.co.uk domain al (namecheap.com)" },
                { who: "SEN", task: "Google Workspace aç — hello@scanbook.uk ve name@planb.health" },
                { who: "SEN", task: "GitHub org aç: scanbook-uk" },
                { who: "SEN", task: "Vercel + Railway hesabı aç" },
                { who: "SEN", task: "PlanB LinkedIn'i ScanBook ile güncelle" },
                { who: "BEN", task: "Next.js projesi kur, temel yapı GitHub'a push" },
              ]
            },
            {
              period: "Hafta 2–3 (Mart ortası)", color: "#fdcb6e",
              tasks: [
                { who: "BEN", task: "Ana sayfa + arama widget tamamlanır" },
                { who: "BEN", task: "Klinik profil sayfası şablonu hazır" },
                { who: "BEN", task: "Booking flow (8 adım) entegre edilir" },
                { who: "SEN", task: "Elindeki 3-4 klinikle demo toplantısı — ilk sözleşme imzaları" },
                { who: "SEN", task: "Klinik onboarding formu hazırla (Google Form ile başla)" },
              ]
            },
            {
              period: "Hafta 4–5 (Mart sonu)", color: "#74b9ff",
              tasks: [
                { who: "BEN", task: "Stripe ödeme entegrasyonu tamamlanır" },
                { who: "BEN", task: "Klinik partner portal canlı" },
                { who: "BEN", task: "Email/SMS bildirim sistemi (Resend + Twilio)" },
                { who: "SEN", task: "İlk 5 klinik sisteme girişi yapılır" },
                { who: "SEN", task: "Test rezervasyonları yapılır — her akış test edilir" },
              ]
            },
            {
              period: "Hafta 6 (Nisan başı)", color: accent,
              tasks: [
                { who: "BEN", task: "SEO sayfaları: London, Manchester, Birmingham için" },
                { who: "BEN", task: "Google Analytics + Search Console kurulumu" },
                { who: "SEN", task: "scanbook.uk soft launch — sosyal medyada duyuru" },
                { who: "SEN", task: "İlk Google Ads kampanyası başlar (£20/gün)" },
                { who: "SEN", task: "PlanB LinkedIn'de 'ScanBook launch' duyurusu" },
              ]
            },
            {
              period: "15 NİSAN — LAUNCH DAY 🚀", color: "#fd79a8",
              tasks: [
                { who: "HEDEF", task: "5+ klinik canlı, gerçek slot müsait" },
                { who: "HEDEF", task: "London, Manchester, Birmingham covered" },
                { who: "HEDEF", task: "İlk organik rezervasyon alınır" },
                { who: "HEDEF", task: "PR: 1-2 sağlık medyasına press release" },
                { who: "HEDEF", task: "Social: launch announcement posts hazır" },
              ]
            },
            {
              period: "15–30 Nisan (Sprint)", color: "#a29bfe",
              tasks: [
                { who: "SEN", task: "10 şehir × 1 klinik = 10 klinik anlaşması hedefi" },
                { who: "SEN", task: "GP outreach başlar — private GP listesi" },
                { who: "BEN", task: "Klinik başvuru formu & self-onboarding sistemi" },
                { who: "BEN", task: "Review sistemi açılır" },
                { who: "HEDEF", task: "30 Nisan: 10 şehir, 10 merkez, ilk £5,000 gelir" },
              ]
            },
          ].map((phase, i) => (
            <div key={i}>
              <div style={{ padding: "8px 16px", background: `${phase.color}22`, borderTop: `2px solid ${phase.color}`, marginTop: i > 0 ? 12 : 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: phase.color }}>{phase.period}</span>
              </div>
              {phase.tasks.map((t, j) => (
                <div key={j} style={{ display: "flex", gap: 12, padding: "10px 16px", background: surface, borderBottom: `1px solid ${border}`, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 7px", borderRadius: 4, flexShrink: 0, marginTop: 1,
                    background: t.who === "SEN" ? "#0984e322" : t.who === "BEN" ? `${accent}22` : "#a29bfe22",
                    color: t.who === "SEN" ? "#0984e3" : t.who === "BEN" ? accent : "#a29bfe"
                  }}>{t.who}</span>
                  <span style={{ fontSize: 13, color: "#ddd" }}>{t.task}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),

    outreach: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Klinik Outreach Sistemi</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>UK'daki tüm özel görüntüleme merkezlerine ulaşma planı</p>

        <Card style={{ border: `1px solid ${accent}33`, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: accent, marginBottom: 14 }}>HEDEF LİSTE — NEREDEN BULACAKSIN?</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { source: "CQC Register", url: "cqc.org.uk/search", count: "~1,200 imaging centre", effort: "Ücretsiz, Excel export" },
              { source: "Google Maps Scraping", url: "maps.google.com", count: "Her şehir için ayrı arama", effort: "Manuel veya tool ile" },
              { source: "Companies House", url: "find-and-update.company-information.service.gov.uk", count: "Sahiplik + financial data", effort: "Ücretsiz" },
              { source: "LinkedIn Sales Navigator", url: "linkedin.com/sales", count: "Klinik direktörü isimleri", effort: "£80/ay — değer" },
              { source: "Yell.com / ThreebestRated", url: "yell.com", count: "Küçük klinikler için", effort: "Ücretsiz" },
              { source: "NHS Choices (private)", url: "nhs.uk", count: "NHS ile çalışan private", effort: "Ücretsiz" },
            ].map((s, i) => (
              <div key={i} style={{ padding: 12, background: surface2, borderRadius: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.source}</div>
                <div style={{ fontSize: 11, color: accent, marginBottom: 2 }}>~{s.count}</div>
                <div style={{ fontSize: 11, color: muted }}>{s.effort}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 12 }}>EMAIL ŞABLONU — İLK TEMAS</div>
            <div style={{ padding: 14, background: surface2, borderRadius: 10, fontSize: 12, lineHeight: 1.9, color: "#ddd" }}>
              <div style={{ color: muted, marginBottom: 8 }}>Subject: Partnership Opportunity — Fill Empty Scan Slots</div>
              <div>Dear [Name],</div>
              <br />
              <div>I'm reaching out from <strong style={{ color: "#a29bfe" }}>PlanB Health Technology</strong>, the team behind <strong style={{ color: accent }}>ScanBook</strong> — UK's new private diagnostic imaging marketplace.</div>
              <br />
              <div>We connect patients facing NHS waiting lists (6–18 weeks) with private centres like yours — <strong>no upfront costs, commission only on completed bookings.</strong></div>
              <br />
              <div>Could we schedule a 20-minute call this week?</div>
              <br />
              <div>[İmza]</div>
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>10 ŞEHİR STRATEJİSİ — 30 NİSAN</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { city: "London", priority: "1. öncelik", clinics: "2 klinik hedef", why: "Hacim + prestij" },
                { city: "Manchester", priority: "2. öncelik", clinics: "1 klinik", why: "Büyük nüfus" },
                { city: "Birmingham", priority: "3. öncelik", clinics: "1 klinik", why: "UK 2. büyük" },
                { city: "Leeds", priority: "4.", clinics: "1 klinik", why: "Kuzey hub" },
                { city: "Bristol", priority: "5.", clinics: "1 klinik", why: "Güçlü private market" },
                { city: "Edinburgh", priority: "6.", clinics: "1 klinik", why: "İskoçya kapısı" },
                { city: "Glasgow", priority: "7.", clinics: "1 klinik", why: "" },
                { city: "Liverpool", priority: "8.", clinics: "1 klinik", why: "" },
                { city: "Nottingham", priority: "9.", clinics: "1 klinik", why: "" },
                { city: "Sheffield", priority: "10.", clinics: "1 klinik", why: "" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${border}`, fontSize: 13 }}>
                  <span style={{ color: i < 3 ? accent : "#ddd" }}>{c.city}</span>
                  <span style={{ color: muted, fontSize: 12 }}>{c.clinics}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    ),

    financial: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>6 Aylık Finansal Model</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Nisan–Eylül 2025 · Gerçekçi projeksiyon</p>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {(() => {
            const totals = MONTHLY.reduce((acc, m) => {
              const c = calcMonth(m);
              return {
                bookings: acc.bookings + c.monthlyBookings,
                volume: acc.volume + c.grossVolume,
                revenue: acc.revenue + c.revenue,
                costs: acc.costs + c.totalCosts,
              };
            }, { bookings: 0, volume: 0, revenue: 0, costs: 0 });
            return [
              { label: "Toplam Rezervasyon", val: totals.bookings.toLocaleString(), color: "#74b9ff" },
              { label: "Toplam Hacim", val: `£${(totals.volume / 1000).toFixed(0)}k`, color: "#fdcb6e" },
              { label: "Platform Geliri", val: `£${(totals.revenue / 1000).toFixed(0)}k`, color: accent },
              { label: "Net Kar/Zarar", val: `£${((totals.revenue - totals.costs) / 1000).toFixed(0)}k`, color: totals.revenue > totals.costs ? accent : "#e17055" },
            ].map((s, i) => (
              <Card key={i}>
                <div style={{ fontSize: 11, color: muted, marginBottom: 6 }}>6 AY TOPLAM</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 12, color: muted, marginTop: 4 }}>{s.label}</div>
              </Card>
            ));
          })()}
        </div>

        {/* Monthly breakdown */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: accent, marginBottom: 16 }}>AYLIK DETAY</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${border}` }}>
                  {["Ay", "Klinik", "Günlük Rez.", "Aylık Rez.", "Hacim", "Gelir (%kom.)", "Gider", "Net"].map((h, i) => (
                    <th key={i} style={{ padding: "8px 12px", textAlign: i === 0 ? "left" : "right", color: muted, fontWeight: 600, fontSize: 11, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MONTHLY.map((m, i) => {
                  const c = calcMonth(m);
                  const isProfit = c.profit > 0;
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${border}` }}>
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: "#ddd", whiteSpace: "nowrap" }}>
                        {m.month}
                        <div style={{ fontSize: 10, color: muted, fontWeight: 400 }}>{m.note}</div>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: muted }}>{m.clinics}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: muted }}>{m.dailyBookings}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right" }}>{c.monthlyBookings}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: "#fdcb6e" }}>£{(c.grossVolume / 1000).toFixed(0)}k</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: accent, fontWeight: 600 }}>£{c.revenue.toLocaleString()}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: "#e17055" }}>-£{c.totalCosts.toLocaleString()}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, color: isProfit ? accent : "#e17055" }}>
                        {isProfit ? "+" : ""}£{c.profit.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Cost breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: "#e17055", marginBottom: 12 }}>AYLIK GİDERLER (OLGUN DÖNEM)</div>
            {[
              { item: "Hosting (Vercel + Railway)", cost: "£150" },
              { item: "Google Ads", cost: "£2,500" },
              { item: "Email (Resend)", cost: "£50" },
              { item: "SMS (Twilio)", cost: "£200" },
              { item: "Hukuki / muhasebe", cost: "£200" },
              { item: "Tools & subscriptions", cost: "£350" },
              { item: "Misc / contingency", cost: "£350" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${border}`, fontSize: 13 }}>
                <span style={{ color: muted }}>{r.item}</span>
                <span style={{ color: "#e17055" }}>{r.cost}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 14, fontWeight: 700 }}>
              <span>Toplam</span>
              <span style={{ color: "#e17055" }}>~£3,800/ay</span>
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>BAŞA BAŞA NOKTA (BREAK-EVEN)</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8, marginBottom: 16 }}>
              Aylık gider ~£3,800<br />
              Ortalama komisyon: £35/rezervasyon<br />
              <strong style={{ color: "#ddd" }}>Break-even: ~109 rezervasyon/ay</strong><br />
              = Günde 4 rezervasyon<br />
              = 5 klinik × 1 rezervasyon/gün<br /><br />
              <strong style={{ color: accent }}>Bu Nisan ayında ulaşılabilir bir hedef.</strong>
            </div>
            <div style={{ padding: 12, background: `${accent}11`, borderRadius: 8, fontSize: 13, color: accent }}>
              Haziran'dan itibaren karlı bölge — 6. ayda aylık £10k+ net hedef
            </div>
          </Card>
        </div>
      </div>
    ),

    investor: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Yatırımcı Stratejisi</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Ne zaman, kimden, nasıl?</p>

        <Card style={{ border: `1px solid ${accent}33`, marginBottom: 16, background: "linear-gradient(135deg, #0a1628, #0f2040)" }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 12 }}>ALTIN KURAL: ÖNCE KANIT, SONRA YATIRIMCI</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
            İlk 6 ayda yatırımcı alma. Neden? Çünkü <strong style={{ color: "#ddd" }}>hiç gelirin yokken</strong> değerleme düşük, dilüsyon yüksek. £10k aylık gelirle gitsen çok daha güçlü konumdasın. Hedef: <strong style={{ color: accent }}>Eylül 2025'te Seed round</strong>.
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 14 }}>SEED ROUND HAZIRLIĞI (EYLÜL)</div>
            {[
              { metric: "Aylık rezervasyon", target: "500+" },
              { metric: "Klinik sayısı", target: "40+" },
              { metric: "Aylık platform geliri", target: "£12,000+" },
              { metric: "Büyüme oranı", target: "MoM %30+" },
              { metric: "NPS skoru", target: "50+" },
              { metric: "Şehir sayısı", target: "10+" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${border}`, fontSize: 13 }}>
                <span style={{ color: muted }}>{m.metric}</span>
                <span style={{ color: accent, fontWeight: 600 }}>{m.target}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#74b9ff", marginBottom: 14 }}>KİMDEN YATIRIM ALACAKSIN?</div>
            {[
              { type: "Angel Investors", note: "Sağlık sektörü deneyimi olan bireyler — LinkedIn'de ara", amount: "£25k–100k" },
              { type: "UK Health Tech VC'ler", note: "Balderton, Octopus Ventures, Backed VC", amount: "£250k–1M" },
              { type: "Innovate UK Grant", note: "Hibe — geri ödeme yok! healthtech için açık çağrılar var", amount: "£25k–250k" },
              { type: "NHS Innovation Accelerator", note: "Para + NHS erişimi + mentorluk", amount: "£30k + ağ" },
            ].map((v, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v.type}</span>
                  <Tag color="#74b9ff">{v.amount}</Tag>
                </div>
                <div style={{ fontSize: 12, color: muted }}>{v.note}</div>
              </div>
            ))}
          </Card>
        </div>

        <Card>
          <div style={{ fontSize: 12, color: "#a29bfe", marginBottom: 14 }}>PİTCH HİKAYESİ — 1 PARAGRAF</div>
          <div style={{ padding: 16, background: surface2, borderRadius: 10, fontSize: 14, lineHeight: 1.9, color: "#ddd", fontStyle: "italic" }}>
            "6.7 million people are waiting for NHS treatment in the UK. For diagnostic imaging alone, waits average 14 weeks. <strong style={{ color: accent, fontStyle: "normal" }}>ScanBook</strong> is the Booking.com for private medical scans — connecting patients with 400+ accredited imaging centres for instant, affordable access to MRI, CT, ultrasound and more. We take 15% commission on completed bookings. In our first 6 months we've processed [X] bookings across [Y] cities. We're raising [£X] to scale to 200 centres and launch our GP referral network."
          </div>
        </Card>
      </div>
    ),

    contracts: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Sözleşmeler & Hukuki Yapı</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Her klinik için ihtiyacın olan belgeler</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              title: "1. Partner Agreement (Klinik Sözleşmesi)",
              color: accent,
              urgent: true,
              items: [
                "Taraflar: The Connective UK Ltd t/a ScanBook & [Klinik Adı]",
                "Komisyon oranı ve hesaplama yöntemi",
                "Ödeme devri: 14 gün net",
                "Slot yönetimi ve güncelleme yükümlülükleri",
                "No-show ve iptal politikası",
                "CQC akreditasyon beyanı",
                "30 gün fesih bildirimi",
                "Sorumluluk sınırlaması",
              ],
              tip: "Bir UK healthcare hukuk bürosundan £500-800'e hazırlat. Tüm kliniklere aynı şablonu kullan."
            },
            {
              title: "2. Data Processing Agreement (DPA)",
              color: "#fdcb6e",
              urgent: true,
              items: [
                "GDPR Article 28 uyumlu — zorunlu",
                "Hangi hasta verisi işleniyor (minimum: isim, email, telefon)",
                "Veri saklama süreleri",
                "Veri ihlali bildirimi prosedürü",
                "Alt işlemciler (Stripe, Twilio, Resend)",
              ],
              tip: "ICO.org.uk'ta ücretsiz şablon var. Özelleştir."
            },
            {
              title: "3. GP Referral Agreement",
              color: "#74b9ff",
              urgent: false,
              items: [
                "Private GP için — NHS GP'lere farklı model",
                "Komisyon: £15-25 / tamamlanan rezervasyon",
                "Ödeme: aylık otomatik",
                "Hasta gizliliği hükümleri",
                "GMC uyumluluk beyanı",
              ],
              tip: "MVP sonrası — önce klinik sözleşmesini otur"
            },
            {
              title: "4. Terms & Conditions (Hasta)",
              color: "#a29bfe",
              urgent: true,
              items: [
                "ScanBook bir aracı platform — tıbbi hizmet vermiyor",
                "İptal ve iade politikası",
                "Ödeme koşulları",
                "Tıbbi sorumluluk reddi",
                "Dispute resolution",
              ],
              tip: "termly.io veya GetTerms.io ile hızlıca oluştur — £0-30"
            },
          ].map((c, i) => (
            <Card key={i} style={{ borderLeft: `3px solid ${c.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{c.title}</span>
                {c.urgent && <Tag color="#e17055">Önce Yap</Tag>}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {c.items.map((item, j) => (
                  <span key={j} style={{ fontSize: 11, padding: "3px 10px", background: surface2, borderRadius: 6, color: "#ccc" }}>· {item}</span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: c.color }}>💡 {c.tip}</div>
            </Card>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", flexDirection: "column", color: "#e8e6f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <div style={{ background: surface, borderBottom: `1px solid ${border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 16 }}>Scan<span style={{ color: accent }}>Book</span> <span style={{ color: muted, fontWeight: 400, fontSize: 13 }}>Master Plan · 15 Nisan Launch</span></span>
        <Tag color="#e17055">35 gün kaldı</Tag>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ width: 210, background: surface, borderRight: `1px solid ${border}`, flexShrink: 0, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 8px" }}>
            <div style={{ fontSize: 10, color: muted, letterSpacing: 2 }}>7 BÖLÜM</div>
          </div>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{ width: "100%", textAlign: "left", padding: "11px 16px", border: "none", borderLeft: active === s.id ? `3px solid ${accent}` : "3px solid transparent", background: active === s.id ? `${accent}12` : "transparent", color: active === s.id ? accent : muted, cursor: "pointer", fontSize: 13, transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
          {sections[active]}
        </div>
      </div>

      <div style={{ background: surface, borderTop: `1px solid ${border}`, display: "flex", overflowX: "auto" }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ flexShrink: 0, padding: "8px 12px", border: "none", background: "transparent", color: active === s.id ? accent : muted, cursor: "pointer", fontSize: 11, borderTop: active === s.id ? `2px solid ${accent}` : "2px solid transparent" }}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

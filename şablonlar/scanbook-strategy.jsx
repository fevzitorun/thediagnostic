import { useState } from "react";

const SECTIONS = [
  { id: "competitors", label: "🎯 Rakipler", icon: "🎯" },
  { id: "design", label: "🎨 Tasarım", icon: "🎨" },
  { id: "differentiation", label: "⚡ Fark Yarat", icon: "⚡" },
  { id: "commission", label: "💰 Komisyon", icon: "💰" },
  { id: "slots", label: "📅 Slot Yönetimi", icon: "📅" },
  { id: "gp", label: "🩺 GP Ortaklığı", icon: "🩺" },
  { id: "niche", label: "👶 Niş Fırsatlar", icon: "👶" },
  { id: "insurance", label: "🛡 Sigorta", icon: "🛡" },
  { id: "payments", label: "💳 Ödeme Akışı", icon: "💳" },
  { id: "international", label: "🌍 Uluslararası", icon: "🌍" },
];

const bg = "#07090f";
const surface = "#0f1420";
const surface2 = "#161d2e";
const border = "rgba(255,255,255,0.07)";
const muted = "rgba(255,255,255,0.42)";
const accent = "#00c896";

const Card = ({ children, style = {} }) => (
  <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 22, ...style }}>
    {children}
  </div>
);

const Tag = ({ children, color = accent }) => (
  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${color}20`, color, border: `1px solid ${color}33`, display: "inline-block" }}>
    {children}
  </span>
);

const Row = ({ label, value, highlight }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${border}`, gap: 12 }}>
    <span style={{ fontSize: 13, color: muted }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: highlight ? 700 : 500, color: highlight ? accent : "#ddd" }}>{value}</span>
  </div>
);

export default function Strategy() {
  const [active, setActive] = useState("competitors");

  const CONTENT = {
    competitors: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>UK'daki Gerçek Rakip Haritası</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Bildiklerin + bilmediğin rakipler</p>

        <div style={{ display: "grid", gap: 14 }}>
          {[
            {
              name: "uk.scan.com",
              type: "Doğrudan Rakip",
              typeColor: "#e17055",
              strengths: ["Güçlü marka", "Geniş klinik ağı", "SEO dominance"],
              weaknesses: ["Sadece MRI/CT odaklı", "Kullanıcı deneyimi kötü", "GP entegrasyonu yok", "Bebek ultrason yok"],
              threat: "Yüksek",
            },
            {
              name: "Vista Health",
              type: "Doğrudan Rakip",
              typeColor: "#e17055",
              strengths: ["Büyük zincir", "NHS ortaklıkları", "Tanınan marka"],
              weaknesses: ["Kendi klinikleri sadece", "Fiyatlar yüksek", "Online booking zayıf", "Marketplace değil"],
              threat: "Orta",
            },
            {
              name: "GetScanned.me",
              type: "Doğrudan Rakip",
              typeColor: "#e17055",
              strengths: ["Modern UI", "Hızlı booking", "Fiyat şeffaflığı"],
              weaknesses: ["Küçük ağ", "GP entegrasyonu yok", "Sigorta yok", "Niş taramalar yok"],
              threat: "Orta",
            },
            {
              name: "Nuffield Health",
              type: "Dolaylı Rakip",
              typeColor: "#fdcb6e",
              strengths: ["Dev marka", "NHS güveni", "Tüm UK"],
              weaknesses: ["Pahalı", "Yavaş booking", "Marketplace değil"],
              threat: "Düşük",
            },
            {
              name: "Doctolib (Avrupa)",
              type: "Potansiyel Tehdit",
              typeColor: "#a29bfe",
              strengths: ["€2.5B değerleme", "Güçlü teknoloji", "GP entegrasyonu var"],
              weaknesses: ["Henüz UK'da değil", "Imaging odaklı değil"],
              threat: "Gelecekte Yüksek",
            },
            {
              name: "Medefer / Infermedica",
              type: "AI Triage Rakibi",
              typeColor: "#74b9ff",
              strengths: ["AI symptom checker", "NHS ortaklıkları"],
              weaknesses: ["Booking platformu değil", "Klinik ağı yok"],
              threat: "Düşük",
            },
          ].map((r, i) => (
            <Card key={i} style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{r.name}</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: `${r.typeColor}20`, color: r.typeColor }}>{r.type}</span>
                </div>
                <div style={{ fontSize: 11, color: muted }}>Tehdit: <strong style={{ color: r.typeColor }}>{r.threat}</strong></div>
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontSize: 11, color: "#00b894", marginBottom: 6 }}>✓ Güçlü yönler</div>
                {r.strengths.map((s, j) => <div key={j} style={{ fontSize: 12, color: muted, marginBottom: 3 }}>· {s}</div>)}
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontSize: 11, color: "#e17055", marginBottom: 6 }}>✗ Zayıf yönler = Senin fırsatın</div>
                {r.weaknesses.map((w, j) => <div key={j} style={{ fontSize: 12, color: accent, marginBottom: 3 }}>→ {w}</div>)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),

    design: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Ben Senin Yerinde Olsam</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Rakiplerden farklı, güven veren, dönüşüm odaklı tasarım</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <Card>
            <div style={{ fontSize: 12, color: "#e17055", marginBottom: 12 }}>✗ Rakiplerin Yaptığı Hatalar</div>
            {["Soğuk, klinik görünüm — hasta gergin hissediyor", "Fiyat gizli — güven sorunu", "Çok fazla seçenek — karar felci", "Mobil deneyim berbat", "Sosyal kanıt yok (yorum, rating)"].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>✗ {t}</div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>✓ ScanBook Böyle Yapacak</div>
            {["Sıcak, güven veren — beyaz + teal renk paleti", "Fiyat her zaman görünür, kıyaslanabilir", "3 adımda scan bul: Tip → Yer → Tarih", "Mobile-first tasarım (resepsiyonist tablet kullanır)", "Her klinikte yıldız + yorum + hasta yorumu"].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: "#ddd", padding: "7px 0", borderBottom: `1px solid ${border}` }}>✓ {t}</div>
            ))}
          </Card>
        </div>

        <Card style={{ background: `linear-gradient(135deg, #0a1628, #0f2040)`, border: `1px solid ${accent}33` }}>
          <div style={{ fontSize: 12, color: accent, marginBottom: 16, letterSpacing: 2 }}>🎨 ÖNERDİĞİM TASARIM PALETİ</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              { color: "#ffffff", label: "Ana zemin", note: "Temiz, profesyonel" },
              { color: "#00c896", label: "Ana aksan", note: "Taze, sağlıklı" },
              { color: "#1a3a5c", label: "Koyu vurgu", note: "Güven, ciddiyet" },
              { color: "#f8fffe", label: "Kart zemini", note: "Hafif, nefes alır" },
              { color: "#e8f9f4", label: "Highlight", note: "Seçili durumlar" },
            ].map((c, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: c.color, border: `1px solid ${border}`, margin: "0 auto 6px" }} />
                <div style={{ fontSize: 11, color: "#ddd" }}>{c.label}</div>
                <div style={{ fontSize: 10, color: muted }}>{c.note}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
            <strong style={{ color: "#ddd" }}>Font:</strong> Instrument Serif (başlıklar) + DM Sans (body) — güven veren ama modern<br />
            <strong style={{ color: "#ddd" }}>His:</strong> Booking.com'un netliği + Airbnb'nin sıcaklığı + medikal güven = ScanBook
          </div>
        </Card>
      </div>
    ),

    differentiation: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Rakiplerin Önüne Geçme Stratejisi</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Startup olarak büyüğü geçmenin tek yolu: onların görmediği açıları bul</p>

        <div style={{ display: "grid", gap: 14 }}>
          {[
            { priority: "KRİTİK", color: "#e17055", title: "Fiyat Şeffaflığı", desc: "Rakiplerin hepsi 'fiyat için arayın' diyor. Sen her scan'in fiyatını, her klinik için açıkça göster. Hastalar bu yüzden seni seçer." },
            { priority: "KRİTİK", color: "#e17055", title: "Niş Taramalar", desc: "Bebek 4D ultrason, anne gebelik paketi, spor yaralanmaları paketi, kanser tarama paketi. Bunları hiçbir rakip öne çıkarmıyor. Sen landing page yap." },
            { priority: "YÜKSEK", color: "#fdcb6e", title: "GP Referral Network", desc: "GP'lere özel portal: hasta yönlendirince £15–25 komisyon. Ağızdan ağıza pazarlama + güvenilirlik + hacim. Rakiplerin hiçbirinde yok." },
            { priority: "YÜKSEK", color: "#fdcb6e", title: "Aynı Gün / Acil Booking", desc: "'Bugün scan istiyorum' için premium fiyatlı acil slot. Rakipler sadece standart booking yapıyor. Sen £50 fazla al, klinik de memnun." },
            { priority: "ORTA", color: "#00b894", title: "Sonuç Takip Portalı", desc: "Hasta sonucunu portala giriyor, radyoloji raporu direkt gelsin. Kliniklerin çoğu sonucu email ile gönderiyor. Sen merkezi bir portal sun." },
            { priority: "ORTA", color: "#00b894", title: "Paket Tarama", desc: "'Executive Health Check' — MRI + CT + Kan testi + Kardiyoloji paketi. Kurumsal müşteriler, özel sigorta. Yüksek bilet." },
          ].map((d, i) => (
            <Card key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 6, background: `${d.color}20`, color: d.color, flexShrink: 0, marginTop: 2 }}>{d.priority}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{d.title}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>{d.desc}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),

    commission: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Komisyon Modeli</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Ne alırsak klinikler kaçar, ne almazsak biz batarız — denge şöyle:</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 14 }}>PLATFORM KOMİSYONU</div>
            {[
              { tier: "Standart (MRI, CT)", rate: "%12–15", note: "Ana gelir kanalı" },
              { tier: "Düşük bilet (X-Ray)", rate: "%18–20", note: "Düşük fiyat, yüksek hacim" },
              { tier: "Yüksek bilet (PET-CT)", rate: "%8–10", note: "Klinik pazarlık gücü fazla" },
              { tier: "Acil / Aynı gün", rate: "%20 + £30 acil ücreti", note: "Premium, ek gelir" },
              { tier: "GP Yönlendirme", rate: "%10 (GP'ye %5 ver)", note: "Büyüme motoru" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13 }}>{r.tier}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: accent }}>{r.rate}</span>
                </div>
                <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>{r.note}</div>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 14 }}>ÖRNEK GELİR HESABI</div>
            <div style={{ fontSize: 11, color: muted, marginBottom: 12 }}>10 klinik · günde ortalama 5 rezervasyon/klinik · £250 ortalama bilet</div>
            {[
              { label: "Günlük rezervasyon", val: "50" },
              { label: "Günlük brüt hacim", val: "£12,500" },
              { label: "Platform geliri (%13)", val: "£1,625/gün", highlight: true },
              { label: "Aylık platform geliri", val: "~£48,000", highlight: true },
              { label: "Yıllık projeksiyon (büyüme ile)", val: "£600k+", highlight: true },
            ].map((r, i) => (
              <Row key={i} label={r.label} value={r.val} highlight={r.highlight} />
            ))}
            <div style={{ marginTop: 14, padding: 12, background: `${accent}11`, borderRadius: 8, fontSize: 12, color: accent }}>
              50 klinikte bu rakam x5 = £240k/ay platform geliri
            </div>
          </Card>
        </div>
      </div>
    ),

    slots: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Slot Çakışması Nasıl Önlenir?</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Klinik hem kendi sistemiyle hem ScanBook'la çalışacak — bunu çözmezsen felaket olur</p>

        <div style={{ display: "grid", gap: 14 }}>
          <Card style={{ border: `1px solid ${accent}33` }}>
            <div style={{ fontSize: 13, color: accent, marginBottom: 14 }}>🔒 Çözüm: Slot Kilitleme Sistemi</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[
                { step: "1", title: "Hasta Slot Seçer", desc: "Seçilen slot veritabanında 15 dakika kilitlenir. Başka kimse göremez." },
                { step: "2", title: "Ödeme Tamamlanır", desc: "Ödeme başarılı → slot 'booked' olur → klinik anında bildirim alır." },
                { step: "3", title: "15 dk Geçerse", desc: "Ödeme yapılmazsa slot otomatik serbest bırakılır. Hiç manuel işlem yok." },
              ].map((s, i) => (
                <div key={i} style={{ padding: 14, background: surface2, borderRadius: 10 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: `${accent}44`, marginBottom: 8 }}>{s.step}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card>
              <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 12 }}>KLİNİK KENDİ SİSTEMİNDE RANDEVU ALIRSA?</div>
              <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
                Klinik partner portal'dan o slotu "kapalı" işaretler → ScanBook'tan o slot kaybolur.<br /><br />
                API entegrasyonu olan kliniklerde bu <strong style={{ color: "#ddd" }}>otomatik ve anlık.</strong><br /><br />
                Manuel portaldaki kliniklerde klinik güncelleme yapar — 2h SLA tanımlı.
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 12, color: "#e17055", marginBottom: 12 }}>ÇİFT REZERVASYON OLURSA?</div>
              <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
                Nadirdir ama olabilir. Politika:<br /><br />
                → Hastaya üzgünüz mesajı + <strong style={{ color: "#ddd" }}>alternatif slot öner</strong><br />
                → Tam iade garantisi<br />
                → Klinik ceza puanı alır (3. ihlalde listeden çıkar)<br />
                → No-show sigortası: £50 tazminat
              </div>
            </Card>
          </div>
        </div>
      </div>
    ),

    gp: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>GP Ortaklık Modeli</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Rakiplerin hiçbirinin sahip olmadığı büyüme kanalı — bu gerçek bir "moat"</p>

        <Card style={{ marginBottom: 16, border: `1px solid ${accent}33`, background: `linear-gradient(135deg, #0a1628, #0f2040)` }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 12 }}>💡 NE KADAR BÜYÜK BİR FIRSAT?</div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { val: "~7,000", label: "UK'da GP surgery sayısı" },
              { val: "£20/referral", label: "GP'ye ödeyeceğin" },
              { val: "£280 avg", label: "Ortalama scan değeri" },
              { val: "£46", label: "Platform karı / referral" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>{s.val}</div>
                <div style={{ fontSize: 11, color: muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 14 }}>GP PORTAL — NE OLACAK?</div>
            {[
              "GP, hastasını platforma yönlendirir (özel link)",
              "Hasta scan'i tamamlar, ödeme yapılır",
              "GP otomatik £15–25 komisyon alır",
              "GP, hasta sonucunu portalde görebilir (izinle)",
              "Aylık komisyon raporu + otomatik ödeme",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${border}`, alignItems: "flex-start" }}>
                <span style={{ color: accent, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 13, color: muted }}>{t}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 14 }}>⚖ HUKUKİ UYARI</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8, marginBottom: 14 }}>
              NHS GP'lere doğrudan komisyon ödemek <strong style={{ color: "#e17055" }}>yasak</strong> olabilir (NHS bribery policy).<br /><br />
              Çözüm: Private GP'lerle başla. Onlar serbest piyasada çalışır, komisyon alabilir.<br /><br />
              NHS GP'ler için: komisyon yerine <strong style={{ color: "#ddd" }}>eğitim bütçesi / CME sponsor</strong> olarak yeniden yapılandır — hukuk danışmanına sor.
            </div>
            <Tag color="#fdcb6e">Private GP: ~2,500 UK'da</Tag>
          </Card>
        </div>
      </div>
    ),

    niche: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Niş Fırsatlar — Rakiplerin Görmediği</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Bunlar hem yüksek marjlı hem rekabetsiz alanlar</p>

        <div style={{ display: "grid", gap: 14 }}>
          {[
            {
              title: "👶 Bebek & Gebelik Ultrason Paketi",
              priority: "ACİL — Hemen Yap",
              color: "#fd79a8",
              why: "Hiçbir rakip bunu öne çıkarmıyor. Anneler fiyata çok duyarlı değil, güvene duyarlı. Google'da 'private baby scan London' çok aranıyor.",
              items: ["4D/3D bebek ultrason", "Gender scan (16 hafta)", "Well-being scan", "Anomaly scan", "Anne karnı fotoğraf paketi"],
              revenue: "£120–350 / randevu · Yüksek tekrar oranı (aynı anneye 3-4 scan)",
            },
            {
              title: "🦷 Klinik Öncesi Tarama Paketi",
              priority: "MVP Sonrası",
              color: "#74b9ff",
              why: "Diş hekimleri, estetik cerrahlar hastalarına CBCT veya özel görüntüleme istiyor. B2B kanal — toplu hacim.",
              items: ["CBCT (dental)", "Yüz anatomisi MRI", "Pre-op görüntüleme"],
              revenue: "Klinik başına aylık £500–2000 hacim",
            },
            {
              title: "💼 Kurumsal / Executive Health Paketi",
              priority: "Ay 3–4",
              color: "#55efc4",
              why: "Şirketler çalışanlarına sağlık paketi alıyor. Tek fatura, toplu indirim. Yüksek bilet, düzenli gelir.",
              items: ["Full body MRI", "CT Coronary", "Kan tahlili + görüntüleme", "Kardiyoloji", "Yıllık paket"],
              revenue: "£800–1,500 / kişi · Şirket sözleşmesi = öngörülebilir gelir",
            },
            {
              title: "🎯 Spor & Yaralanma Paketi",
              priority: "Ay 2–3",
              color: "#fdcb6e",
              why: "Sporcu nüfusu büyük. Spor kulüpleriyle ortaklık. Hız önemli — 'hızlı MRI' arıyorlar.",
              items: ["Diz MRI", "Omuz MRI", "Kas/tendon ultrason", "Return-to-sport protokolü"],
              revenue: "Kulüp ortaklığı: aylık sabit + per-scan komisyon",
            },
          ].map((n, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{n.title}</h3>
                <Tag color={n.color}>{n.priority}</Tag>
              </div>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.7, marginBottom: 14 }}>{n.why}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                {n.items.map((item, j) => (
                  <span key={j} style={{ fontSize: 11, padding: "3px 10px", background: surface2, borderRadius: 6, color: "#ccc" }}>{item}</span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: n.color, fontWeight: 600 }}>💰 {n.revenue}</div>
            </Card>
          ))}
        </div>
      </div>
    ),

    insurance: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Sigorta Anlaşmaları</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Büyük fırsat ama dikkatli ilerlenmesi gereken alan</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Card style={{ border: `1px solid ${accent}33` }}>
            <div style={{ fontSize: 12, color: accent, marginBottom: 14 }}>🎯 YAPILACAK — MVP SONRASI</div>
            {[
              { company: "Bupa", type: "Büyük özel sigorta", approach: "Tercihli ağ anlaşması" },
              { company: "AXA Health", type: "Büyük özel sigorta", approach: "Tercihli ağ" },
              { company: "Vitality", type: "Aktif sağlık sigortası", approach: "Wellness entegrasyonu" },
              { company: "WPA", type: "Orta ölçek", approach: "Daha kolay müzakere" },
              { company: "Cigna (expat)", type: "Uluslararası", approach: "Expat hasta havuzu" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "9px 0", borderBottom: `1px solid ${border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{s.company}</span>
                  <span style={{ fontSize: 11, color: muted }}>{s.type}</span>
                </div>
                <div style={{ fontSize: 11, color: accent, marginTop: 2 }}>→ {s.approach}</div>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 14 }}>⚠ GERÇEK UYARI</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
              Sigorta anlaşmaları <strong style={{ color: "#ddd" }}>6–18 ay</strong> sürebilir. Legal, compliance, network provider süreci çok ağır.<br /><br />
              <strong style={{ color: "#ddd" }}>MVP'de yapma.</strong> Önce self-pay ile kanıtla.<br /><br />
              Ancak hastaya şunu söyle:<br />
              <strong style={{ color: accent }}>"Sigortanı kullanmak istiyorsan kliniğe doğrudan sor — faturayı sigortana ibraz edebilirsin."</strong><br /><br />
              Bu seni hukuki sorumluluktan korur ve hastayı engellemiş olmaz.
            </div>
          </Card>
        </div>
      </div>
    ),

    payments: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Ödeme Akışı — Kim Neyi Alır?</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Evet, ödemeyi sen alırsın. Kliniğe sen ödersin. İşte neden ve nasıl:</p>

        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: accent, marginBottom: 16 }}>💳 STRIPE CONNECT AKIŞI</div>
          <div style={{ display: "flex", gap: 0, alignItems: "center", overflowX: "auto", paddingBottom: 8 }}>
            {[
              { icon: "👤", label: "Hasta", desc: "£299 öder" },
              { icon: "→", label: "", desc: "" },
              { icon: "🏦", label: "Stripe", desc: "Ödemeyi alır" },
              { icon: "→", label: "", desc: "" },
              { icon: "📊", label: "ScanBook", desc: "£45 komisyon (%15) anında keser" },
              { icon: "→", label: "", desc: "" },
              { icon: "🏥", label: "Klinik", desc: "£254 alır (14 gün içinde)" },
            ].map((s, i) => (
              s.icon === "→"
                ? <div key={i} style={{ fontSize: 20, color: border, margin: "0 4px", flexShrink: 0 }}>→</div>
                : <div key={i} style={{ textAlign: "center", padding: "12px 16px", background: surface2, borderRadius: 10, flexShrink: 0, minWidth: 90 }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: accent }}>{s.desc}</div>
                </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>✓ AVANTAJLARI</div>
            {["Komisyon otomatik — manuel takip yok", "Her klinik kendi sub-account'una para alır", "İade işlemleri merkezi — hasta seni arar", "Para akışını kontrol edersin", "Klinik iflas etse bile hasta korumalı"].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>✓ {t}</div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 12 }}>⚖ HUKUKİ GEREKLILIK</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
              Stripe üzerinden ödeme toplayınca "payment facilitator" olursun → <strong style={{ color: "#ddd" }}>FCA (Financial Conduct Authority)</strong> kaydı gerekebilir.<br /><br />
              Alternatif: Stripe, seni kendi lisansı altında cover eder — danışman hukuk görüşü al.<br /><br />
              <strong style={{ color: accent }}>Hızlı çözüm:</strong> T&C'ye "ScanBook bir ödeme aracısıdır" yaz, FCA danışman sürecini başlat.
            </div>
          </Card>
        </div>
      </div>
    ),

    international: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Uluslararası & İleri Tanı Klinikleri</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 24 }}>Kanser tarama, PET-CT, nükleer tıp — ne zaman ekleyelim?</p>

        <Card style={{ marginBottom: 16, border: "1px solid #e1705533" }}>
          <div style={{ fontSize: 13, color: "#e17055", marginBottom: 12 }}>🚨 ÖNERİ: MVP'DE EKLEME — SONRAYA BIRAK</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
            PET-CT ve nükleer tıp <strong style={{ color: "#ddd" }}>çok sıkı regüle</strong> — ARSAC lisansı, radyasyon koruması, özel onaylı merkezler. Hukuki risk yüksek, hasta kritik. MVP'yi kirletir.<br /><br />
            <strong style={{ color: accent" }}>Kural:</strong> Önce MRI + CT + Ultrasound + X-Ray ile kanıtla. Ay 6–9'da uluslararası ve ileri tanı ekle, ayrı "ScanBook Advanced" sekmesiyle.
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>FAZ 2 — ULUSLARARASI</div>
            {[
              { country: "🇩🇪 Almanya", note: "PET-CT, proton terapi — NHS hastaları gidiyor" },
              { country: "🇹🇷 Türkiye", note: "Fiyat avantajı, kaliteli klinikler" },
              { country: "🇮🇳 Hindistan", note: "Medikal turizm merkezi" },
              { country: "🇵🇱 Polonya", note: "EU, ucuz, erişilebilir" },
              { country: "🇦🇪 Dubai", note: "Expat UK vatandaşları için" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "9px 0", borderBottom: `1px solid ${border}` }}>
                <div style={{ fontSize: 14 }}>{c.country}</div>
                <div style={{ fontSize: 11, color: muted }}>{c.note}</div>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#a29bfe", marginBottom: 12 }}>AYRI SEKME STRATEJİSİ</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8, marginBottom: 14 }}>
              Ana platformda karmaşıklık yaratma. Şöyle yap:<br /><br />
              <strong style={{ color: "#ddd" }}>scanbook.uk</strong> → Standart UK taramaları<br />
              <strong style={{ color: "#ddd" }}>scanbook.uk/advanced</strong> → PET-CT, nükleer<br />
              <strong style={{ color: "#ddd" }}>scanbook.uk/global</strong> → Uluslararası klinikler<br /><br />
              Her bölüm ayrı compliance, ayrı iş süreci.
            </div>
          </Card>
        </div>
      </div>
    ),
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", color: "#e8e6f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 200, background: surface, borderRight: `1px solid ${border}`, padding: "20px 0", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ padding: "0 16px 16px", borderBottom: `1px solid ${border}`, marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: muted, letterSpacing: 2, marginBottom: 4 }}>STRATEJI REHBERI</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Scan<span style={{ color: accent }}>Book</span></div>
        </div>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ width: "100%", textAlign: "left", padding: "10px 16px", border: "none", borderLeft: active === s.id ? `3px solid ${accent}` : "3px solid transparent", background: active === s.id ? `${accent}10` : "transparent", color: active === s.id ? accent : muted, cursor: "pointer", fontSize: 13, transition: "all 0.15s" }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "32px 28px", overflowY: "auto" }}>
        {CONTENT[active]}
      </div>
    </div>
  );
}

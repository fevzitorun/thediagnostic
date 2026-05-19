import { useState } from "react";

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

const Tag = ({ children, color }) => (
  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${color}20`, color: color, border: `1px solid ${color}33`, display: "inline-block", whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const SECTIONS = [
  { id: "competitors", label: "🎯 Rakipler" },
  { id: "design", label: "🎨 Tasarım" },
  { id: "differentiation", label: "⚡ Fark Yarat" },
  { id: "commission", label: "💰 Komisyon" },
  { id: "slots", label: "📅 Slot Yönetimi" },
  { id: "gp", label: "🩺 GP Ortaklığı" },
  { id: "niche", label: "👶 Niş Fırsatlar" },
  { id: "insurance", label: "🛡 Sigorta" },
  { id: "payments", label: "💳 Ödeme Akışı" },
  { id: "international", label: "🌍 Uluslararası" },
];

export default function Strategy() {
  const [active, setActive] = useState("competitors");
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = {

    competitors: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>UK Rakip Haritası</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Bildiklerin + bilmediğin rakipler — zayıf noktaları senin fırsatın</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "uk.scan.com", type: "Ana Rakip", tc: "#e17055", strengths: ["Güçlü marka", "Geniş ağ", "SEO gücü"], weaknesses: ["Bebek ultrason yok", "GP entegrasyonu yok", "UX kötü", "Fiyat şeffaflığı az"] },
            { name: "Vista Health", type: "Ana Rakip", tc: "#e17055", strengths: ["Büyük zincir", "NHS ortaklığı", "Tanınan marka"], weaknesses: ["Sadece kendi klinikleri", "Fiyat yüksek", "Marketplace değil"] },
            { name: "GetScanned.me", type: "Ana Rakip", tc: "#e17055", strengths: ["Modern UI", "Hızlı booking", "Fiyat şeffaf"], weaknesses: ["Küçük ağ", "GP yok", "Niş tarama yok"] },
            { name: "Nuffield Health", type: "Dolaylı", tc: "#fdcb6e", strengths: ["Dev marka", "Tüm UK"], weaknesses: ["Pahalı", "Yavaş", "Marketplace değil"] },
            { name: "Doctolib (EU)", type: "Gelecek Tehdit", tc: "#a29bfe", strengths: ["2.5B EUR değer", "GP entegrasyonu"], weaknesses: ["Henüz UK'da değil", "Imaging odaklı değil"] },
          ].map((r, i) => (
            <Card key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</span>
                  <Tag color={r.tc}>{r.type}</Tag>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#00b894", marginBottom: 6 }}>✓ Güçlü</div>
                {r.strengths.map((s, j) => <div key={j} style={{ fontSize: 12, color: muted, marginBottom: 3 }}>· {s}</div>)}
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#e17055", marginBottom: 6 }}>✗ Zayıf = Senin fırsatın</div>
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
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Rakiplerden farklı, güven veren tasarım yönü</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: "#e17055", marginBottom: 12 }}>✗ Rakiplerin Hataları</div>
            {["Soğuk klinik görünüm — hasta gergin hissediyor", "Fiyat gizli — güvensizlik yaratıyor", "Mobil deneyim berbat", "Sosyal kanıt (yorum) yok", "Niş hizmetler öne çıkarılmıyor"].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>✗ {t}</div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>✓ ScanBook Böyle Yapacak</div>
            {["Sıcak, güven veren — beyaz + teal renk", "Fiyat her yerde görünür, kıyaslanabilir", "Mobile-first (resepsiyonist tablet kullanır)", "Her klinikte yıldız + yorum", "Bebek ultrason, spor, executive paketler öne"].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: "#ddd", padding: "7px 0", borderBottom: `1px solid ${border}` }}>✓ {t}</div>
            ))}
          </Card>
        </div>
        <Card style={{ background: "linear-gradient(135deg, #0a1628, #0f2040)", border: `1px solid ${accent}33` }}>
          <div style={{ fontSize: 12, color: accent, marginBottom: 16 }}>🎨 ÖNERİLEN RENK PALETİ</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              { color: "#ffffff", label: "Ana zemin" },
              { color: "#00c896", label: "Ana aksan" },
              { color: "#1a3a5c", label: "Koyu vurgu" },
              { color: "#f8fffe", label: "Kart zemini" },
              { color: "#e8f9f4", label: "Seçili durum" },
            ].map((c, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: c.color, border: `1px solid ${border}`, margin: "0 auto 6px" }} />
                <div style={{ fontSize: 11, color: "#ddd" }}>{c.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: muted }}>
            <strong style={{ color: "#ddd" }}>Font:</strong> Instrument Serif (başlık) + DM Sans (body)<br />
            <strong style={{ color: "#ddd" }}>His:</strong> Booking.com netliği + Airbnb sıcaklığı + medikal güven
          </div>
        </Card>
      </div>
    ),

    differentiation: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Rakiplerin Önüne Geçme Stratejisi</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Büyüğü geçmenin tek yolu: onların görmediği açıları bul</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { p: "KRİTİK", pc: "#e17055", title: "Fiyat Şeffaflığı", desc: "Rakiplerin hepsi 'fiyat için arayın' diyor. Sen her scan'in fiyatını açıkça göster. Hastalar bu yüzden seni seçer." },
            { p: "KRİTİK", pc: "#e17055", title: "Bebek & Gebelik Ultrason", desc: "Hiçbir rakip bunu öne çıkarmıyor. 'Private baby scan London' çok aranıyor. Ayrı landing page, ayrı marka hissi." },
            { p: "YÜKSEK", pc: "#fdcb6e", title: "GP Referral Network", desc: "GP yönlendirince £15-25 komisyon. Ağızdan ağıza büyüme + güvenilirlik. Rakiplerin hiçbirinde yok." },
            { p: "YÜKSEK", pc: "#fdcb6e", title: "Aynı Gün / Acil Booking", desc: "'Bugün scan istiyorum' için premium fiyatlı acil slot. £50 fazla al, klinik de memnun, hasta da." },
            { p: "ORTA", pc: "#00b894", title: "Executive Sağlık Paketi", desc: "Şirketler çalışanlarına paket alıyor. Full body MRI + CT + kan tahlili. Yüksek bilet, öngörülebilir gelir." },
            { p: "ORTA", pc: "#00b894", title: "Sonuç Portalı", desc: "Hasta sonucunu merkezi portalde görsün. Klinikler hâlâ email gönderiyor — bu fark yaratır." },
          ].map((d, i) => (
            <Card key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}><Tag color={d.pc}>{d.p}</Tag></div>
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
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Ne alırsak klinik kaçar — ne almazsak biz batarız</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 14 }}>ORANLAR</div>
            {[
              { tier: "MRI / CT (standart)", rate: "%12–15" },
              { tier: "X-Ray / Ultrason (düşük bilet)", rate: "%18–20" },
              { tier: "PET-CT (yüksek bilet)", rate: "%8–10" },
              { tier: "Acil / Aynı gün", rate: "%20 + £30" },
              { tier: "GP yönlendirme", rate: "%10 (GP'ye %5)" },
              { tier: "Kurumsal paket", rate: "%8 sabit + hacim bonusu" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                <span style={{ fontSize: 13, color: muted }}>{r.tier}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: accent }}>{r.rate}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 14 }}>ÖRNEK GELİR — 10 KLİNİK</div>
            {[
              { label: "Günlük rezervasyon", val: "50" },
              { label: "Ortalama bilet", val: "£250" },
              { label: "Günlük brüt hacim", val: "£12,500" },
              { label: "Platform geliri (%13)", val: "£1,625/gün", hi: true },
              { label: "Aylık platform geliri", val: "~£48,000", hi: true },
              { label: "50 klinikte projeksiyon", val: "£240k/ay", hi: true },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                <span style={{ fontSize: 13, color: muted }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: r.hi ? 700 : 500, color: r.hi ? accent : "#ddd" }}>{r.val}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    ),

    slots: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Slot Çakışması Nasıl Önlenir?</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Klinik hem kendi sistemi hem ScanBook'la çalışıyor — bunu çözmezsen felaket</p>
        <Card style={{ border: `1px solid ${accent}33`, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 16 }}>🔒 Çözüm: 3 Katmanlı Slot Kilitleme</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { n: "1", title: "Hasta Seçer", desc: "Slot 15 dk kilitlenir. Başka kimse göremez veya seçemez." },
              { n: "2", title: "Ödeme Yapılır", desc: "Başarılı → slot 'booked' olur → klinik anında SMS+email alır." },
              { n: "3", title: "15dk Geçerse", desc: "Ödeme yoksa slot otomatik serbest bırakılır. Sıfır manuel işlem." },
            ].map((s, i) => (
              <div key={i} style={{ padding: 16, background: surface2, borderRadius: 10 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: `${accent}33`, marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: muted, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 10 }}>KLİNİK KENDI SİSTEMİNDE RANDEVU ALIRSA?</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>Partner portal'dan slotu kapatır → ScanBook'tan kaybolur.<br /><br />API'li kliniklerde <strong style={{ color: "#ddd" }}>otomatik ve anlık.</strong><br />Manuel kliniklerde 2 saatlik güncelleme SLA'ı vardır.</div>
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#e17055", marginBottom: 10 }}>ÇİFT REZERVASYON OLURSA?</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>Nadirdir ama olur. Politika:<br /><br />→ Hastaya alternatif slot öner + tam iade<br />→ Klinik uyarı puanı alır<br />→ 3. ihlalde listeden çıkar</div>
          </Card>
        </div>
      </div>
    ),

    gp: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>GP Ortaklık Modeli</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Rakiplerin hiçbirinin sahip olmadığı büyüme kanalı</p>
        <Card style={{ marginBottom: 16, border: `1px solid ${accent}33`, background: "linear-gradient(135deg, #0a1628, #0f2040)" }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 12 }}>FIRSAT BÜYÜKLÜĞÜ</div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { val: "~7,000", label: "UK GP Surgery sayısı" },
              { val: "£20", label: "GP'ye ödeyeceğin / referral" },
              { val: "£280", label: "Ortalama scan değeri" },
              { val: "£46", label: "Platform karı / referral" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 24, fontWeight: 700, color: accent }}>{s.val}</div>
                <div style={{ fontSize: 11, color: muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>GP PORTAL — NE OLACAK?</div>
            {[
              "GP hastasını özel link ile yönlendirir",
              "Hasta scan tamamlar, ödeme yapılır",
              "GP otomatik £15–25 komisyon alır",
              "GP, hasta sonucunu portalde görebilir",
              "Aylık komisyon raporu + otomatik ödeme",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: `1px solid ${border}` }}>
                <span style={{ color: accent }}>→</span>
                <span style={{ fontSize: 13, color: muted }}>{t}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 10 }}>⚠ HUKUKİ UYARI</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
              NHS GP'lere komisyon ödemek yasak olabilir (NHS bribery policy).<br /><br />
              <strong style={{ color: accent }}>Çözüm:</strong> Private GP'lerle başla — ~2,500 UK'da var, serbest piyasada çalışırlar.<br /><br />
              NHS GP için: komisyon yerine "eğitim bütçesi / CME sponsor" olarak yapılandır.
            </div>
          </Card>
        </div>
      </div>
    ),

    niche: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Niş Fırsatlar — Rakiplerin Görmediği</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Yüksek marjlı, rekabetsiz alanlar</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "👶 Bebek & Gebelik Ultrason", priority: "ACİL — Hemen Yap", pc: "#fd79a8", why: "Hiçbir rakip öne çıkarmıyor. Anneler güvene baktığı için marjın yüksek. 'Private baby scan London' çok aranıyor.", items: ["4D/3D bebek ultrason", "Gender scan (16 hafta)", "Anomaly scan", "Anne karnı fotoğraf paketi"], rev: "£120–350 / randevu · Aynı anneye 3-4 scan" },
            { title: "💼 Executive Health Paketi", priority: "Ay 3–4", pc: "#55efc4", why: "Şirketler çalışanlarına sağlık paketi alıyor. Tek fatura, toplu indirim. Öngörülebilir gelir.", items: ["Full body MRI", "CT Coronary", "Kan + görüntüleme", "Yıllık paket"], rev: "£800–1,500 / kişi · Şirket sözleşmesi" },
            { title: "🎯 Spor & Yaralanma Paketi", priority: "Ay 2–3", pc: "#fdcb6e", why: "Sporcu nüfusu büyük. 'Hızlı MRI' arıyorlar. Spor kulüpleriyle ortaklık kurulabilir.", items: ["Diz MRI", "Omuz MRI", "Kas/tendon ultrason"], rev: "Kulüp ortaklığı: aylık sabit + per-scan" },
            { title: "🦷 Pre-op / Klinik Öncesi", priority: "MVP Sonrası", pc: "#74b9ff", why: "Diş hekimleri, estetik cerrahlar özel görüntüleme istiyor. B2B kanal — toplu hacim.", items: ["CBCT dental", "Yüz anatomisi MRI", "Pre-op görüntüleme"], rev: "Klinik başına £500–2,000/ay hacim" },
          ].map((n, i) => (
            <Card key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{n.title}</h3>
                <Tag color={n.pc}>{n.priority}</Tag>
              </div>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.7, marginBottom: 12 }}>{n.why}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                {n.items.map((item, j) => (
                  <span key={j} style={{ fontSize: 11, padding: "3px 10px", background: surface2, borderRadius: 6, color: "#ccc" }}>{item}</span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: n.pc, fontWeight: 600 }}>💰 {n.rev}</div>
            </Card>
          ))}
        </div>
      </div>
    ),

    insurance: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Sigorta Anlaşmaları</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Büyük fırsat ama dikkatli ilerlenmesi gereken alan</p>
        <Card style={{ border: "1px solid #e1705544", marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "#e17055", marginBottom: 8 }}>🚨 MVP'DE UĞRAŞMA — SONRAYA BIRAK</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>Sigorta anlaşmaları <strong style={{ color: "#ddd" }}>6–18 ay</strong> sürer. Legal, compliance, network provider süreci çok ağır. Önce self-pay ile kanıtla.<br /><br />Hastaya şunu söyle: <strong style={{ color: accent }}>"Sigortanı kullanmak istiyorsan faturayı sigortana ibraz edebilirsin"</strong> — seni korur, hastayı engellemez.</div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 14 }}>FAZ 2 HEDEF SİGORTALAR</div>
            {[
              { name: "Bupa", note: "En büyük özel sigorta — prestij" },
              { name: "AXA Health", note: "Geniş müşteri tabanı" },
              { name: "Vitality", note: "Aktif sağlık — wellness entegrasyonu" },
              { name: "WPA", note: "Orta ölçek — müzakere kolay" },
              { name: "Cigna (expat)", note: "Uluslararası hasta havuzu" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${border}` }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontSize: 11, color: muted }}>{s.note}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 12 }}>SÜREÇ GERÇEKLİĞİ</div>
            {[
              "Başvuru → 2–4 ay inceleme",
              "Network provider sözleşmesi",
              "Audit & site inspection",
              "Fiyat müzakeresi (uzun!)",
              "Pilot → tam anlaşma",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>· {t}</div>
            ))}
          </Card>
        </div>
      </div>
    ),

    payments: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Ödeme Akışı</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Evet, ödemeyi sen alırsın — kliniğe sen ödersin</p>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: accent, marginBottom: 16 }}>STRIPE CONNECT AKIŞI</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {[
              { icon: "👤", label: "Hasta", val: "£299 öder" },
              null,
              { icon: "🏦", label: "Stripe", val: "Tahsilat yapar" },
              null,
              { icon: "📊", label: "ScanBook", val: "£45 komisyon keser" },
              null,
              { icon: "🏥", label: "Klinik", val: "£254 alır (14 gün)" },
            ].map((s, i) =>
              s === null
                ? <div key={i} style={{ color: muted, fontSize: 18 }}>→</div>
                : <div key={i} style={{ padding: "12px 16px", background: surface2, borderRadius: 10, textAlign: "center", flex: 1, minWidth: 80 }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: accent, marginTop: 2 }}>{s.val}</div>
                </div>
            )}
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>AVANTAJLAR</div>
            {["Komisyon otomatik kesilir — manuel yok", "Her klinik kendi sub-account'una alır", "İade işlemleri merkezden yönetilir", "Para akışını kontrol edersin", "Klinik batsa bile hasta korumalı"].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>✓ {t}</div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 12 }}>⚖ HUKUKİ GEREKLILIK</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
              Ödeme toplayınca "payment facilitator" olursun → <strong style={{ color: "#ddd" }}>FCA kaydı</strong> gerekebilir.<br /><br />
              Stripe kendi lisansı altında seni cover edebilir. Hukuk danışmanına sor.<br /><br />
              <strong style={{ color: accent }}>Hızlı çözüm:</strong> T&C'ye "ScanBook bir ödeme aracısıdır" yaz, FCA sürecini paralelde başlat.
            </div>
          </Card>
        </div>
      </div>
    ),

    international: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Uluslararası & İleri Tanı</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>PET-CT, nükleer tıp, yurt dışı klinikler — ne zaman?</p>
        <Card style={{ border: "1px solid #e1705544", marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "#e17055", marginBottom: 8 }}>🚨 MVP'YE EKLEME — AY 6-9'A BIRAK</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>PET-CT ve nükleer tıp çok sıkı regüle: ARSAC lisansı, radyasyon koruması, özel onaylı merkezler. Hukuki risk yüksek. MVP'yi karmaşıklaştırır.<br /><br /><strong style={{ color: accent }}>Strateji:</strong> Önce MRI + CT + Ultrason + X-Ray ile kanıtla. Sonra genişle.</div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>FAZ 2 ÜLKELER</div>
            {[
              { flag: "🇩🇪", country: "Almanya", note: "PET-CT, proton terapi — NHS hastaları gidiyor" },
              { flag: "🇹🇷", country: "Türkiye", note: "Fiyat avantajı, kaliteli klinikler — Faz 3 modeli" },
              { flag: "🇮🇳", country: "Hindistan", note: "Medikal turizm merkezi" },
              { flag: "🇵🇱", country: "Polonya", note: "EU, erişilebilir, ucuz" },
              { flag: "🇦🇪", country: "Dubai", note: "Expat UK vatandaşları için" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: `1px solid ${border}` }}>
                <span style={{ fontSize: 18 }}>{c.flag}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.country}</div>
                  <div style={{ fontSize: 11, color: muted }}>{c.note}</div>
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#a29bfe", marginBottom: 12 }}>URL STRATEJİSİ</div>
            {[
              { url: "scanbook.uk", desc: "Standart UK taramaları (MVP)" },
              { url: "scanbook.uk/advanced", desc: "PET-CT, nükleer (Ay 6-9)" },
              { url: "scanbook.uk/global", desc: "Uluslararası klinikler (Faz 2)" },
              { url: "scanbook.uk/corporate", desc: "Kurumsal paketler (Ay 3-4)" },
            ].map((u, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                <div style={{ fontSize: 13, color: "#a29bfe", fontFamily: "monospace" }}>{u.url}</div>
                <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>{u.desc}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    ),
  };

  const activeSection = SECTIONS.find(s => s.id === active);

  return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", flexDirection: "column", color: "#e8e6f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: surface, borderBottom: `1px solid ${border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", color: muted, fontSize: 20, cursor: "pointer", padding: 0 }}>☰</button>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Scan<span style={{ color: accent }}>Book</span> <span style={{ color: muted, fontWeight: 400, fontSize: 13 }}>Strateji Rehberi</span></span>
        </div>
        <span style={{ fontSize: 13, color: accent }}>{activeSection?.label}</span>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

        {/* Sidebar */}
        <div style={{ width: 210, background: surface, borderRight: `1px solid ${border}`, flexShrink: 0, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 16px 8px" }}>
            <div style={{ fontSize: 10, color: muted, letterSpacing: 2 }}>10 BÖLÜM</div>
          </div>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{ width: "100%", textAlign: "left", padding: "11px 16px", border: "none", borderLeft: active === s.id ? `3px solid ${accent}` : "3px solid transparent", background: active === s.id ? `${accent}12` : "transparent", color: active === s.id ? accent : muted, cursor: "pointer", fontSize: 13, transition: "all 0.15s", lineHeight: 1.4 }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px" }}>
          {sections[active]}
        </div>

      </div>

      {/* Mobile bottom nav */}
      <div style={{ background: surface, borderTop: `1px solid ${border}`, display: "flex", overflowX: "auto", padding: "4px 0" }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ flexShrink: 0, padding: "8px 14px", border: "none", background: "transparent", color: active === s.id ? accent : muted, cursor: "pointer", fontSize: 11, borderTop: active === s.id ? `2px solid ${accent}` : "2px solid transparent" }}>
            {s.label}
          </button>
        ))}
      </div>

    </div>
  );
}

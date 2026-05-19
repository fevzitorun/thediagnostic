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
  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${color}20`, color, border: `1px solid ${color}33`, display: "inline-block" }}>{children}</span>
);

const SECTIONS = [
  { id: "expansion", label: "🧬 Platform Genişleme" },
  { id: "radiology", label: "👨‍⚕️ Radyolog Modeli" },
  { id: "naming", label: "💡 İsim & Marka" },
  { id: "accounts", label: "📧 Hesaplar & Kurulum" },
  { id: "github", label: "🐙 GitHub Stratejisi" },
  { id: "chat", label: "💬 Chat Stratejisi" },
  { id: "marketing", label: "📣 Pazarlama" },
  { id: "landing", label: "🖥 Landing Page Taslak" },
];

export default function SetupGuide() {
  const [active, setActive] = useState("expansion");

  const sections = {

    expansion: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Platform Genişleme Haritası</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Görüntülemeden tam sağlık marketplace'ine</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              phase: "MVP — Hemen",
              pc: accent,
              title: "Görüntüleme Platformu",
              items: ["MRI", "CT Scan", "Ultrasound (bebek dahil)", "X-Ray", "DEXA"],
              why: "Kanıtlanmış talep, net regülasyon, elinde klinikler var. Buradan başla.",
              revenue: "£120–850 / randevu · %12–18 komisyon",
            },
            {
              phase: "Ay 3–4",
              pc: "#74b9ff",
              title: "Diş & Yüz 3D Tarama",
              items: ["CBCT dental tarama", "Yüz anatomisi 3D", "TMJ görüntüleme", "Pre-op planlama"],
              why: "Diş hekimi ağı büyük, B2B kanal güçlü. Görüntüleme kategorisinde kalıyor — regülasyon basit.",
              revenue: "Diş kliniği başına £500–2,000/ay sabit + per-scan",
            },
            {
              phase: "Ay 4–6",
              pc: "#fdcb6e",
              title: "Laboratuvar Testleri",
              items: ["Kan tahlili panelleri", "Hormonal testler", "Tiroit & metabolizma", "Kanser belirteçleri (PSA, CA-125)", "Cinsel sağlık testi"],
              why: "Medichecks & Thriva modeli. Eve kit gönderilebilir — klinik ziyareti şart değil. Çok yüksek marj.",
              revenue: "£30–300 / test · Tekrar satın alma oranı yüksek",
            },
            {
              phase: "Ay 6–9",
              pc: "#fd79a8",
              title: "Genetik & DNA Testleri",
              items: ["Kanser genetik risk taraması (BRCA)", "Beslenme & metabolizma DNA", "Kalıtsal hastalık taraması", "Farmakogenomik (ilaç uyumu)", "Spor & performans DNA"],
              why: "23andMe modeli ama medikal odaklı. UK'da büyüyen pazar. Yüksek bilet, düşük tekrar — ama viral pazarlama potansiyeli çok yüksek.",
              revenue: "£99–499 / test · Yüksek marj",
            },
            {
              phase: "Ay 9–12",
              pc: "#a29bfe",
              title: "İleri Tanı & Uluslararası",
              items: ["PET-CT (kanser)", "Nükleer tıp", "Yurt dışı klinik yönlendirme", "Medikal turizm paketi"],
              why: "Regülasyon ağır ama talep büyük. Kanser hastaları için hayati. Ayrı sekme ve ayrı compliance süreciyle ekle.",
              revenue: "£850–3,000+ / randevu · Düşük hacim, yüksek değer",
            },
          ].map((p, i) => (
            <Card key={i} style={{ borderLeft: `3px solid ${p.pc}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Tag color={p.pc}>{p.phase}</Tag>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{p.title}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                {p.items.map((item, j) => (
                  <span key={j} style={{ fontSize: 11, padding: "3px 10px", background: surface2, borderRadius: 6, color: "#ccc" }}>{item}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.7, marginBottom: 8 }}>{p.why}</p>
              <div style={{ fontSize: 12, color: p.pc, fontWeight: 600 }}>💰 {p.revenue}</div>
            </Card>
          ))}
        </div>
      </div>
    ),

    radiology: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Radyolog Ortaklık Modeli</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>İşe alma değil — teleradyoloji ortaklığı</p>

        <Card style={{ border: `1px solid #e1705544`, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "#e17055", marginBottom: 8 }}>🚫 YAPMA: Kendi radyologunu işe alma</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
            NHS consultant radyolog: <strong style={{ color: "#ddd" }}>£120,000–180,000/yıl</strong> + medikolegal risk + GMC uyumu + malpractice sigortası. Startup için imkansız yük.
          </div>
        </Card>

        <Card style={{ border: `1px solid ${accent}33`, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 14 }}>✅ YAP: Teleradyoloji Ortaklığı</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { name: "Medica Reporting", note: "UK'ın en büyüğü, NHS & private, 24/7", url: "medicareporting.com" },
              { name: "Telemedicine Clinic", note: "Hızlı turnaround, uygun fiyat", url: "telemedicineclinic.com" },
              { name: "4ways Healthcare", note: "UK lisanslı radyologlar", url: "4wayshealthcare.com" },
              { name: "TeleDiagnostics", note: "Startup dostu, esnek model", url: "" },
            ].map((r, i) => (
              <div key={i} style={{ padding: 14, background: surface2, borderRadius: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: muted }}>{r.note}</div>
                {r.url && <div style={{ fontSize: 11, color: accent, marginTop: 4 }}>{r.url}</div>}
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>NASIL ÇALIŞIR?</div>
            {[
              "Klinik scan yapar → görüntü PACS sistemine yüklenir",
              "ScanBook üzerinden teleradyoloji şirketine iletilir",
              "24–48 saat içinde rapor gelir",
              "Hasta portale bakır, PDF indirir",
              "Klinik + teleradyoloji şirketi sorumlu — sen değil",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>→ {t}</div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 12 }}>GELİR FIRSATI</div>
            <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
              Kliniklerin bir kısmının radyoloji hizmeti yok. Onlara hem <strong style={{ color: "#ddd" }}>booking</strong> hem <strong style={{ color: "#ddd" }}>rapor</strong> sun.<br /><br />
              Teleradyoloji maliyeti: ~£30–50 / rapor<br />
              Hastaya sat: £50–80 / rapor<br />
              <strong style={{ color: accent }}>Marj: £20–30 / rapor ek gelir</strong>
            </div>
          </Card>
        </div>
      </div>
    ),

    naming: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>İsim & Marka Alternatifleri</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>ScanBook iyi ama büyürken isim stratejisi önemli</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Card style={{ border: `1px solid ${accent}33` }}>
            <div style={{ fontSize: 12, color: accent, marginBottom: 14 }}>NEDEN SCANBOOK İYİ?</div>
            {[
              "Booking.com çağrışımı — insanlar anlıyor",
              "Scan + Book = ne yaptığını söylüyor",
              ".uk domain müsait",
              "Kısa, telaffuz kolay",
              "Uluslararasına taşınabilir",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>✓ {t}</div>
            ))}
          </Card>
          <Card style={{ border: "1px solid #e1705544" }}>
            <div style={{ fontSize: 12, color: "#e17055", marginBottom: 14 }}>SCANBOOK'UN ZAYIF YANLARI</div>
            {[
              "Lab & genetik ekleyince dar kalabilir",
              "'Book' kelimesi medikal hissettirmiyor",
              ".com alınmış",
              "Türkiye'de 'Scan' anlaşılmıyor olabilir",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>✗ {t}</div>
            ))}
          </Card>
        </div>

        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 16 }}>ALTERNATİF İSİMLER — UK ODAKLI</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { name: "ScanBook", verdict: "Koru ✓", vc: accent, note: "Net, akılda kalıcı, booking çağrışımı" },
              { name: "Claro Health", verdict: "Güçlü", vc: "#74b9ff", note: "İspanyolca 'net/açık' — Avrupa'da işler" },
              { name: "ClearScan", verdict: "İyi", vc: "#74b9ff", note: "Temiz his, medikal güven" },
              { name: "Diagnostica", verdict: "Premium", vc: "#a29bfe", note: "Lab+scan+genetik hepsini kapsar" },
              { name: "MediRoute", verdict: "Yönlendirici", vc: "#fdcb6e", note: "Navigasyon hissi verir" },
              { name: "ViewNow", verdict: "Aksiyon", vc: "#fdcb6e", note: "Hız hissi, modern" },
              { name: "InstaScan", verdict: "Hız odaklı", vc: "#fd79a8", note: "Anında booking mesajı" },
              { name: "ScanPass", verdict: "Niche", vc: "#fd79a8", note: "Erişim / geçiş metaforu" },
            ].map((n, i) => (
              <div key={i} style={{ padding: 14, background: surface2, borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{n.name}</span>
                  <Tag color={n.vc}>{n.verdict}</Tag>
                </div>
                <div style={{ fontSize: 12, color: muted }}>{n.note}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ background: "linear-gradient(135deg, #0a1628, #0f2040)", border: `1px solid ${accent}33` }}>
          <div style={{ fontSize: 12, color: accent, marginBottom: 10 }}>💡 ÖNERİM: İKİ KATMANLI MARKA STRATEJİSİ</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
            <strong style={{ color: "#fff" }}>ScanBook.uk</strong> → UK görüntüleme platformu (şimdi)<br />
            <strong style={{ color: "#fff" }}>Diagnostica / Claro Health</strong> → Ana holding markası (büyüyünce)<br />
            <strong style={{ color: "#fff" }}>ScanBook TR</strong> → Türkiye kolu (Faz 3)<br /><br />
            Booking.com, Kayak, Rentalcars hepsi aynı şirketin ürünü. Sen de aynı yapıyı kur.
          </div>
        </Card>
      </div>
    ),

    accounts: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Hesaplar & İlk Kurulum</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Bu hafta açman gereken her hesap — sırayla</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              step: "1",
              title: "Gmail & Google Workspace",
              color: "#e17055",
              urgent: true,
              items: [
                { label: "Gmail: hello@scanbook.uk formatı için", action: "Google Workspace — £5.20/ay — workspace.google.com" },
                { label: "Tüm hesaplar bu email ile açılacak", action: "info@, hello@, partners@, noreply@ adresleri yarat" },
              ],
              tip: "Kişisel Gmail değil — scanbook.uk uzantılı email kurumsal güven verir"
            },
            {
              step: "2",
              title: "Domain",
              color: "#fdcb6e",
              urgent: true,
              items: [
                { label: "scanbook.uk", action: "namecheap.com — ~£5/yıl" },
                { label: "scanbook.co.uk", action: "namecheap.com — ~£8/yıl" },
                { label: "scanbook.com değil", action: "Alınmış — alma" },
              ],
              tip: "İkisini de al — biri diğerine yönlendir. Toplam £13/yıl."
            },
            {
              step: "3",
              title: "GitHub",
              color: "#74b9ff",
              urgent: true,
              items: [
                { label: "Hesap: github.com/scanbook", action: "Ücretsiz başla" },
                { label: "Organization aç: ScanBook-UK", action: "Tüm projeler burada toplanır" },
              ],
              tip: "Tek GitHub org, birden fazla repo. Ayrıntılar GitHub bölümünde."
            },
            {
              step: "4",
              title: "Vercel & Railway",
              color: accent,
              urgent: true,
              items: [
                { label: "vercel.com", action: "hello@scanbook.uk ile kayıt — ücretsiz" },
                { label: "railway.app", action: "hello@scanbook.uk ile kayıt — ücretsiz başlar" },
              ],
              tip: "Bu ikisi kodun yaşadığı yer. GitHub'a bağlanır, otomatik deploy eder."
            },
            {
              step: "5",
              title: "Stripe",
              color: "#a29bfe",
              urgent: false,
              items: [
                { label: "dashboard.stripe.com", action: "UK şirket bilgileriyle kayıt" },
                { label: "Stripe Connect aktif et", action: "Klinik sub-account'ları için şart" },
              ],
              tip: "Şirket kaydı lazım — önce Companies House'u tamamla"
            },
            {
              step: "6",
              title: "Sosyal Medya",
              color: "#fd79a8",
              urgent: false,
              items: [
                { label: "@scanbook_uk (X/Twitter)", action: "Sağlık profesyonelleri aktif" },
                { label: "ScanBook UK (LinkedIn)", action: "B2B — klinikler + GP'ler için şart" },
                { label: "scanbook.uk (Instagram)", action: "Hasta pazarlaması, bebek ultrason içeriği" },
                { label: "ScanBook UK (Facebook)", action: "Yerel topluluklar, NHS bekleyenler" },
              ],
              tip: "Hepsinde aynı kullanıcı adı. Önce LinkedIn ve Instagram — en yüksek ROI."
            },
            {
              step: "7",
              title: "Google Business Profile",
              color: "#00b894",
              urgent: false,
              items: [
                { label: "business.google.com", action: "scanbook.uk adresini gir" },
                { label: "Kategori: 'Health & Medical' veya 'Medical Center'", action: "" },
              ],
              tip: "Klinik değil platform olduğun için adres olarak iş adresini kullan"
            },
          ].map((s, i) => (
            <Card key={i} style={{ borderLeft: `3px solid ${s.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${s.color}22`, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</span>
                {s.urgent && <Tag color="#e17055">Bu Hafta</Tag>}
              </div>
              {s.items.map((item, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${border}`, gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: "#ddd" }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: muted, fontFamily: "monospace" }}>{item.action}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 12, color: s.color }}>💡 {s.tip}</div>
            </Card>
          ))}
        </div>
      </div>
    ),

    github: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>GitHub Stratejisi</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>3 proje için tek hesap, farklı repo'lar — işte neden</p>

        <Card style={{ border: `1px solid ${accent}33`, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 14 }}>✅ ÖNERİ: TEK HESAP, BİRDEN FAZLA REPO</div>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: "#ddd", lineHeight: 2 }}>
            <div style={{ color: muted }}>github.com/<span style={{ color: accent }}>scanbook-uk</span>  ← Organization</div>
            <div style={{ paddingLeft: 20 }}>├── <span style={{ color: "#74b9ff" }}>scanbook-web</span>  <span style={{ color: muted }}>← Ana UK platform (Next.js)</span></div>
            <div style={{ paddingLeft: 20 }}>├── <span style={{ color: "#74b9ff" }}>scanbook-clinic-portal</span>  <span style={{ color: muted }}>← Partner portal</span></div>
            <div style={{ paddingLeft: 20 }}>├── <span style={{ color: "#fd79a8" }}>scanbook-tr</span>  <span style={{ color: muted }}>← Türkiye kolu (Faz 3)</span></div>
            <div style={{ paddingLeft: 20 }}>└── <span style={{ color: "#fdcb6e" }}>scanbook-shared</span>  <span style={{ color: muted }}>← Ortak bileşenler, API</span></div>
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Card>
            <div style={{ fontSize: 12, color: "#e17055", marginBottom: 12 }}>✗ AYRI HESAP AÇMA — NEDEN?</div>
            {[
              "Bileşenleri paylaşmak zorlaşır",
              "Kodu kopyala-yapıştır kabusu",
              "Farklı deployment pipeline'ları",
              "Developer eklersen her hesaba ayrı davet",
              "Gereksiz karmaşıklık",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>✗ {t}</div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>✓ TEK ORG'UN AVANTAJI</div>
            {[
              "Ortak UI bileşenleri paylaşılır",
              "Tek yerden deployment yönetimi",
              "Gelecekte developer eklemek kolay",
              "İnvestör due diligence'ta temiz görünür",
              "Vercel tek org'la tüm projeleri deploy eder",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: muted, padding: "7px 0", borderBottom: `1px solid ${border}` }}>✓ {t}</div>
            ))}
          </Card>
        </div>

        <Card>
          <div style={{ fontSize: 12, color: "#fdcb6e", marginBottom: 14 }}>CHAT STRATEJİSİ — AYRI MI, BİRLİKTE Mİ?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { project: "ScanBook UK", rec: "Bu chat devam etsin", color: accent, reason: "Tüm context burada — sıfırdan başlamak vakit kaybı" },
              { project: "ScanBook TR", rec: "Yeni chat aç (zamanı gelince)", color: "#74b9ff", reason: "Farklı regülasyon, farklı klinik ağı, Türkçe içerik" },
              { project: "Lab & Genetik Genişleme", rec: "Bu chat'te devam et", color: "#fdcb6e", reason: "Aynı platform'un uzantısı — context kaybolmasın" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: 14, background: surface2, borderRadius: 10 }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}><Tag color={p.color}>{p.rec}</Tag></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.project}</div>
                  <div style={{ fontSize: 12, color: muted }}>{p.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    ),

    chat: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Benimle Nasıl Çalışalım?</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Verimliliği maksimize etmek için</p>

        <Card style={{ border: `1px solid ${accent}33`, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: accent, marginBottom: 14 }}>ALTIN KURAL: Context = Hız</div>
          <div style={{ fontSize: 13, color: muted, lineHeight: 1.8 }}>
            Her yeni chat'te baştan anlatmak zaman kaybı. <strong style={{ color: "#ddd" }}>Bu chat'i korumaya devam et</strong> — tüm kararlarımız, tüm prototiplerimiz, tüm tartışmalarımız burada. Ben her mesajda bağlamı görüyorum.
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "Kod yazarken", color: "#74b9ff", items: ["Sayfanın adını söyle: 'Klinik profil sayfasını yaz'", "Hangi verilerle çalışacağını belirt", "Renk/stil tercihini söyle", "Ben yazarım, sen terminale yapıştırırsın"] },
            { title: "Strateji tartışırken", color: "#fdcb6e", items: ["Soruyu net sor: 'X mi Y mi daha mantıklı?'", "Bağlamı ver: 'Şu anda 10 klinik var, 3. ayda...'", "Kararı sen verirsin, ben seçenekleri sunarım"] },
            { title: "Hata çözerken", color: "#e17055", items: ["Hata mesajını kopyala-yapıştır", "Hangi dosyada olduğunu söyle", "Ne yapmaya çalıştığını anlat", "Terminal çıktısının tamamını paylaş"] },
            { title: "Türkiye projesi başlayınca", color: "#a29bfe", items: ["Yeni chat aç: 'ScanBook TR — başlangıç'", "UK'ta öğrenilen dersleri özetle", "TR'ye özgü regülasyon araştırması yap", "Kod tabanı %80 aynı — sadece içerik değişir"] },
          ].map((s, i) => (
            <Card key={i} style={{ borderLeft: `3px solid ${s.color}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: s.color, marginBottom: 12 }}>{s.title}</div>
              {s.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, color: muted, padding: "6px 0", borderBottom: `1px solid ${border}` }}>→ {item}</div>
              ))}
            </Card>
          ))}
        </div>
      </div>
    ),

    marketing: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Pazarlama Stratejisi</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Startup bütçesiyle maksimum etki</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              channel: "SEO — Ücretsiz Uzun Vadeli",
              color: accent,
              priority: "BAŞTAN YAP",
              items: [
                "'MRI Scan London private' — 2,400 aylık arama",
                "'Private CT scan Manchester' — 880 aylık",
                "'Baby scan near me' — 8,100 aylık",
                "'Private scan no referral' — yüksek intent",
                "Her şehir + scan tipi için ayrı landing page",
              ],
              tip: "100 şehir × 5 scan tipi = 500 SEO sayfası = ücretsiz trafik makinası"
            },
            {
              channel: "Google Ads — Hızlı Büyüme",
              color: "#fdcb6e",
              priority: "AY 1'DEN",
              items: [
                "Başlangıç bütçesi: £20–30/gün",
                "Hedef: 'private MRI [şehir]' aramalar",
                "Landing page: doğrudan booking sayfası",
                "CPC ortalama £3–8 (medikal — pahalı ama değer)",
                "İlk ay: £600 harcama, ~80 tıklama/gün hedefi",
              ],
              tip: "£600 harcama → 10 rezervasyon → £2,800 gelir. ROAS = 4.6x"
            },
            {
              channel: "LinkedIn — B2B Klinik Büyümesi",
              color: "#74b9ff",
              priority: "HEMEN",
              items: [
                "Klinik direktörlerine doğrudan mesaj",
                "'NHS bekleme listesi' içerikleri paylaş",
                "Haftalık 'UK private healthcare' insight",
                "GP'lere ulaşım için güçlü kanal",
                "Ücretsiz — sadece zaman lazım",
              ],
              tip: "İlk 50 klinik partneri büyük ihtimalle LinkedIn'den gelecek"
            },
            {
              channel: "Instagram — Hasta Pazarlaması",
              color: "#fd79a8",
              priority: "AY 1",
              items: [
                "Bebek ultrason içerikleri — viral potansiyel",
                "'NHS'i bekleme' karşılaştırma grafikleri",
                "Hasta hikayeleri (izinle)",
                "Klinik turları — güven inşası",
                "Influencer: anne blogger'lar — bebek scan için mükemmel",
              ],
              tip: "'Baby scan' nişi Instagram'da çok aktif — buradan başla"
            },
            {
              channel: "PR & Medya",
              color: "#a29bfe",
              priority: "AY 2–3",
              items: [
                "The Guardian, Daily Mail, Telegraph — NHS krizi haberleri",
                "'Startup NHS bekleme krizini çözüyor' — harika story",
                "BBC Radio 4 Today Programme — sağlık haberleri",
                "Patient.co.uk, Netdoctor — sağlık portalları",
                "Press release: ilk 10 klinik anlaşması haberi",
              ],
              tip: "NHS bekleme listesi politikaya girdi — sen tam zamanında geliyorsun"
            },
          ].map((m, i) => (
            <Card key={i} style={{ borderLeft: `3px solid ${m.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{m.channel}</span>
                <Tag color={m.color}>{m.priority}</Tag>
              </div>
              {m.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, color: muted, padding: "6px 0", borderBottom: `1px solid ${border}` }}>· {item}</div>
              ))}
              <div style={{ marginTop: 10, fontSize: 12, color: m.color }}>💡 {m.tip}</div>
            </Card>
          ))}
        </div>
      </div>
    ),

    landing: (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Landing Page Tasarım Taslağı</h2>
        <p style={{ color: muted, fontSize: 13, marginBottom: 20 }}>Gerçek sitenin bölüm bölüm planı</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {[
            { section: "1 — NAVBAR", color: "#636e72", items: ["Logo sol", "Scan Types | Find Centre | How it Works | For Clinics", "Sign In + Book a Scan (CTA buton) sağda", "Sticky — scroll'da beyaz arka plan"] },
            { section: "2 — HERO", color: accent, items: ["Başlık: 'Private Scans, Booked in Minutes'", "Alt başlık: NHS wait 6-18 weeks vs ScanBook 48 hours", "Arama widget: Scan tipi → Lokasyon → Tarih → Ara", "Arka plan: subtle gradient + sağda scan görüntüsü"] },
            { section: "3 — TRUST BAR", color: "#fdcb6e", items: ["600+ Partner Centres | From £75 | Same Day Available | CQC Verified", "Koyu arka plan, tek satır, dikkat çekici"] },
            { section: "4 — SCAN TİPLERİ", color: "#74b9ff", items: ["6 kart: MRI / CT / Ultrasound / X-Ray / Baby Scan / Executive", "Her kart: ikon + isim + 'from £XX' + Ara butonu", "Baby Scan kartı öne çıkarılmış — büyük, renkli"] },
            { section: "5 — NASIL ÇALIŞIR", color: "#a29bfe", items: ["4 adım: Seç → Karşılaştır → Öde → Sonuç Al", "Minimal, büyük numaralar, tek satır açıklama"] },
            { section: "6 — FEATURED KLİNİKLER", color: accent, items: ["3 kart: klinik adı, lokasyon, rating, fiyat, müsaitlik", "Harita görünümü toggle'ı", "'See All Centres Near You' CTA"] },
            { section: "7 — NEDEN SCANBOOK", color: "#fdcb6e", items: ["No Referral Needed | Instant Confirmation | Results in 48h | CQC Only", "Rakiplerden fark — şeffaf fiyat vurgusu"] },
            { section: "8 — HASTALAR NE DİYOR", color: "#fd79a8", items: ["5 yorum kartı — isim, scan tipi, yıldız", "Trustpilot entegrasyonu (ilerleyen süreçte)", "Video testimonial alanı (opsiyonel)"] },
            { section: "9 — KLİNİKLER İÇİN", color: "#74b9ff", items: ["'Join 600+ partner centres'", "Ücretsiz katıl + komisyon modeli özeti", "Partner Ol CTA butonu"] },
            { section: "10 — FOOTER", color: "#636e72", items: ["Scan Types | Cities | About | Blog | For Clinics | Contact", "CQC logo | Stripe logo | SSL badge", "© 2025 ScanBook Ltd · Privacy · Terms"] },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 0, overflow: "hidden", borderRadius: i === 0 ? "10px 10px 0 0" : i === 9 ? "0 0 10px 10px" : 0, border: `1px solid ${border}`, borderBottom: i < 9 ? "none" : `1px solid ${border}` }}>
              <div style={{ width: 36, background: s.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(0,0,0,0.6)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{i + 1}</span>
              </div>
              <div style={{ flex: 1, padding: "12px 16px", background: surface }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 6 }}>{s.section}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {s.items.map((item, j) => (
                    <span key={j} style={{ fontSize: 11, color: muted, padding: "2px 8px", background: surface2, borderRadius: 4 }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", flexDirection: "column", color: "#e8e6f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <div style={{ background: surface, borderBottom: `1px solid ${border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 16 }}>Scan<span style={{ color: accent }}>Book</span> <span style={{ color: muted, fontWeight: 400, fontSize: 13 }}>Kurulum & Genişleme Rehberi</span></span>
        <span style={{ fontSize: 13, color: accent }}>{SECTIONS.find(s => s.id === active)?.label}</span>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ width: 210, background: surface, borderRight: `1px solid ${border}`, flexShrink: 0, overflowY: "auto" }}>
          <div style={{ padding: "16px 16px 8px" }}>
            <div style={{ fontSize: 10, color: muted, letterSpacing: 2 }}>8 BÖLÜM</div>
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

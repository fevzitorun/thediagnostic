# thediagnostic — Master Plan & Durum Raporu
**Versiyon: 7.0 · Güncelleme: 15 Haziran 2026**
**Repo: github.com/fevzitorun/thediagnostic · Branch: `main`**

> Detaylı modül-modül plan ve ilerleme için bkz. [MODULES.md](MODULES.md)
> (37 modül, 8 faz). Bu doküman genel durumu özetler.

---

## ÖZET — Genel Durum

Bu repo iki farklı projenin (ScanBook UK ve thediagnostic TR) kodlarının üst
üste binmesiyle oluştu. **FAZ 0 (Temizlik) ve FAZ 1 (Türkiye Klinik Verisi &
Veritabanı) artık tamamlandı** — main branch'inde gerçek TR klinik verisi,
görseller ve TR'ye özel DB şeması var. Kalan iş FAZ 2-7: SEO sayfaları,
marka/tasarım, çoklu para birimi, AI agent güncellemeleri, portal/dashboard
ve deploy/QA.

`claude/thediagnostic-phase-2-LK1dc` branch'i hâlâ `thediagnostic/` adlı
yanlış alt klasör yapısında duruyor ve PR #1 olduğu gibi merge edilemez
(Modül 5, hâlâ ⬜). Bu sefer içerik branch'ten **tek tek çıkarılıp** doğru
konuma main'e işlendi — PR #1'in kendisi henüz düzleştirilmedi/kapatılmadı.

---

## ✅ TAMAMLANAN İŞ (FAZ 0 + FAZ 1, Modül 1-11)

| # | Modül | Sonuç |
|---|---|---|
| 1 | Görsel Varlıkları Kurtarma | `public/images/*` (6 dosya: hero-scanner, logo-mark, logo-horizontal-dark/light, logo-stacked*) + `public/logo.svg` eklendi → logo/hero artık kırık değil |
| 2 | Çöp Dosya Temizliği | Kök dizindeki 1 byte'lık boş `images` dosyası silindi |
| 3 | README.md Yeniden Yazımı | create-next-app boilerplate kaldırıldı, thediagnostic kurulum dökümanı yazıldı |
| 4 | LINKEDIN_PAGE_COPY.md Yeniden Yazımı | ScanBook içeriği → thediagnostic LinkedIn şirket sayfası metni |
| 5 | PR #1 Düzleştirme | ⬜ **Henüz yapılmadı** — aşağıda "Kalan İş"te |
| 6 | Klinik Veri Taşıma | `lib/tr-clinics.data.ts` (13 TR kliniği, 9 grup: HSM, Acıbadem×2, Medicana×2, Koç, Florence Nightingale, Memorial×2, Liv, Medical Park×2, Anadolu) — homepage `CLINICS` artık `getFeaturedClinics()` ile 8 grup gösteriyor |
| 7 | Cihaz Kataloğu Taşıma | `lib/scanTypes.config.ts` UK-only olarak bırakıldı; TR kataloğu `tr-clinics.data.ts` içindeki `SCAN_TYPES` (18 kod, EN/TR/AR) ile geldi |
| 8 | DB Şema Birleştirme | `lib/schema-tr-migrations.sql` — `tr_clinics`/`tr_scan_types` (paralel TR tabloları) + 13 destek tablosu (scan_slots, clinic_scan_types, concierge_requests, scan_reports, whatsapp_*, vb.) + `profiles`/`bookings` additive ALTER |
| 9 | Seed Verisi | `lib/seed-tr.sql` — 13 TR klinik + 18 cihaz kodu + fiyatlandırma + İngilizce açıklamalar |
| 10 | Klinik Slot Yönetimi | `app/clinic/slots/page.tsx` + `app/api/clinic/slots/route.ts`, sidebar'a "Slots" linki |
| 11 | Public Slots API | `app/api/slots/route.ts` → `tr_clinics` JOIN'i düzeltildi |

**Önemli not:** Tüm bu değişiklikler şu an **local/uncommitted** — henüz
GitHub'a push edilmedi (push bu oturumda yapılıyor).

---

## ⚠️ KALAN İŞ — KRİTİK / YÜKSEK ÖNCELİK

| # | İş | Detay |
|---|---|---|
| 1 | **PR #1 Düzleştirme (Modül 5)** | `claude/thediagnostic-phase-2-LK1dc` branch'indeki `thediagnostic/` alt klasör yapısı hâlâ düzeltilmedi. main artık kendi yoluyla TR verisini aldığı için bu PR'ın **artık gerekli olup olmadığı gözden geçirilmeli** — büyük olasılıkla kapatılıp arşivlenebilir, çünkü değerli içerik (görseller, klinik verisi, şema, slot sayfası) zaten manuel olarak main'e taşındı. Geriye kalan tek potansiyel değer: `lib/whatsapp/*`, `lib/agents/cqc-client.ts`, `outreach-email.ts` (Modül 29 kapsamında ayrıca değerlendirilecek) |
| 2 | **DB migration'larının Railway'e uygulanması** | `lib/schema-tr-migrations.sql` ve `lib/seed-tr.sql` sadece dosya olarak hazır — production/staging DB'sine henüz **çalıştırılmadı**. Sıra: `schema-vercel.sql` → `schema-migrations.sql` → `schema-tr-migrations.sql` → `seed.sql` → `seed-tr.sql` |
| 3 | **`/book` sayfası hâlâ UK akışında** | `app/book/page.tsx` ve `app/clinics/[slug]/page.tsx` hâlâ `lib/clinics.data.ts` (UK `ClinicData`/`ScanPackage`) kullanıyor. TR klinikleri için booking UI entegrasyonu Modül 18 (TR klinik detay sayfaları) kapsamında yapılacak |
| 4 | **node_modules durumu** | Geliştirme ortamında `node_modules` eksik/bozuk paketler içeriyordu (`npx tsc` başarısız oldu — "Cannot find type definition file"). Bir sonraki oturumda `npm install` çalıştırılması önerilir |

---

## 📋 SIRADAKİ MODÜLLER (FAZ 2-7, Modül 12-37)

Detaylar [MODULES.md](MODULES.md)'de. Özet:

| Faz | Kapsam | Modül # |
|---|---|---|
| FAZ 2 | TR SEO sayfaları (`/scan/pet-ct`, `/scan/gamma-knife`, `/scan/mri-3t`, `/scan/pet-mri`, `/compare/...`, `/destinations/turkey/istanbul`, TR klinik detay sayfaları, UK sayfa arşivleme, sitemap) | 12-20 |
| FAZ 3 | Navbar/Footer güncelleme, logo finalizasyonu, tasarım tutarlılığı | 21-24 |
| FAZ 4 | Çoklu para birimi, İyzico, geo-targeting | 25-27 |
| FAZ 5 | AI triage güncelleme, WhatsApp Business API, rapor özeti agent'ı, hasta takip agent'ı, concierge planner | 28-32 |
| FAZ 6 | Patient dashboard, klinik portalı genişletme, admin TR klinik yönetimi | 33-35 |
| FAZ 7 | Vercel deploy & domain, uçtan uca test | 36-37 |

**Sıradaki:** Modül 12 — `/scan/pet-ct` SEO landing sayfası.

---

## 🚀 DEPLOY İÇİN GEREKLİ ENV VARIABLES

```
DATABASE_URL=postgresql://...        (Railway)
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://thediagnostic.co.uk
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
ANTHROPIC_API_KEY=sk-ant-...
META_WHATSAPP_TOKEN=...
META_WHATSAPP_PHONE_ID=...
AGENT_SECRET=...
NEXT_PUBLIC_SITE_URL=https://thediagnostic.co.uk
```

---

## TECH STACK

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Dil | TypeScript 5 |
| Stil | Tailwind 4 + inline CSS variables |
| i18n | next-intl (en/tr/ar) |
| Database | PostgreSQL (Railway) — `postgres` npm paketi |
| Auth | NextAuth v5 (beta) |
| Ödeme | Stripe Checkout (İyzico planlanıyor — Modül 26) |
| Email | Resend |
| AI | Anthropic Claude API (triage, report summary, follow-up, concierge) |
| Deploy | Vercel |

### Renk sistemi (`app/globals.css`)
```css
--primary:    #1B4F72   /* lacivert */
--primary-2:  #154360
--primary-3:  #0E2F48
--accent:     #17A589   /* teal */
--accent-2:   #0E6655
--warm:       #E67E22
--bg:         #F8FFFE
--line:       #D5E8E4
```

---

*Bu rapor, `thediagnostic-main` lokal klonu (main branch) üzerinde
Modül 1-11'in tamamlanmasından sonra hazırlandı. v6.0'daki kritik sorunların
(kırık görseller, yanlış MASTER-PLAN/LINKEDIN içeriği, UK klinik verisi, eksik
DB şeması) tamamı çözüldü; kalan tek kritik konu PR #1'in durumu ve
migration'ların production DB'sine uygulanmasıdır.*

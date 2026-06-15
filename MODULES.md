# thediagnostic — Modül Planı
**Versiyon: 1.0 · 14 Haziran 2026**

Bu doküman, [MASTER-PLAN.md](MASTER-PLAN.md)'de tespit edilen sorunları ve kalan işleri
**37 bağımsız modüle** böler. Her modül tek başına teslim edilebilir (tek commit/PR),
sırayla işlenecek. Durum sütunu ilerledikçe güncellenecek.

| Durum | Anlamı |
|---|---|
| ⬜ | Başlanmadı |
| 🔄 | Devam ediyor |
| ✅ | Tamamlandı |

---

## FAZ 0 — Temizlik & Altyapı Onarımı (Kritik, hızlı)

| # | Modül | Açıklama | Durum |
|---|---|---|---|
| 1 | **Görsel Varlıkları Kurtarma** | `public/images/` klasörünü phase-2 branch'inden çıkar → logo + hero görseli kırıklığını düzelt | ✅ |
| 2 | **Çöp Dosya Temizliği** | Kök dizindeki boş `images` dosyası, `.DS_Store` vb. kaldır | ✅ |
| 3 | **README.md Yeniden Yazımı** | create-next-app boilerplate'i thediagnostic'e özel kurulum/çalıştırma dökümanıyla değiştir | ✅ |
| 4 | **LINKEDIN_PAGE_COPY.md Yeniden Yazımı** | ScanBook içeriğini thediagnostic LinkedIn şirket sayfası metniyle değiştir | ✅ |
| 5 | **PR #1 Düzleştirme** | `thediagnostic/` alt klasör yapısını kaldır, main ile uyumlu yeni temiz PR aç | ⬜ |

---

## FAZ 1 — Türkiye Klinik Verisi & Veritabanı

| # | Modül | Açıklama | Durum |
|---|---|---|---|
| 6 | **Klinik Veri Taşıma** | Yeni `lib/tr-clinics.data.ts` oluşturuldu — 11 TR klinik (HSM, 2× Acıbadem, 2× Medicana, Koç, Florence Nightingale, 2× Memorial, Liv, 2× Medical Park, Anadolu). Homepage `CLINICS` artık `getFeaturedClinics()` ile 8 grup gösteriyor (önceden hardcoded 2). UK `lib/clinics.data.ts` (booking/search akışı) dokunulmadı — farklı tip şeması (`ClinicData` vs `ClinicBasic`) nedeniyle ayrı dosya tercih edildi | ✅ |
| 7 | **Cihaz Kataloğu Taşıma** | `lib/scanTypes.config.ts` main↔phase-2 arasında **birebir aynı** (UK ScanBook config) — TR cihaz/fiyat kataloğu zaten `lib/tr-clinics.data.ts` içindeki `SCAN_TYPES` (18 TR kod, EN/TR/AR) + her klinik `featuredScans`'ında — Modül 6 ile taşındı | ✅ |
| 8 | **DB Şema Birleştirme** | Yeni `lib/schema-tr-migrations.sql` — TR klinik kataloğu için `tr_clinics`/`tr_scan_types` (main'in UK-odaklı `clinics`/`scan_types` ile yapısal uyumsuzluğu nedeniyle paralel tablo), + 13 TR tablosu (clinic_scan_types, scan_slots, concierge_requests, scan_reports, clinic_images, clinic_translations, clinic_admins, blog_posts, exchange_rates, geo_pricing, audit_log, whatsapp_conversations/messages), + `profiles`/`bookings`'e additive `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` (nationality, preferred_locale/currency, concierge alanları vb.) | ✅ |
| 9 | **Seed Verisi Yükleme** | Yeni `lib/seed-tr.sql` — `lib/tr-clinics.data.ts`'teki 13 klinik (9 grup) + 18 TR cihaz kodu + `featuredScans` fiyatlandırması `tr_clinics`/`tr_scan_types`/`clinic_scan_types`/`clinic_translations` tablolarına aktarıldı. Railway'e yükleme manuel adım (psql) | ✅ |
| 10 | **Klinik Slot Yönetimi Sayfası** | `app/clinic/slots/page.tsx` + `app/api/clinic/slots/route.ts` main'e taşındı, sidebar'a "Slots" linki eklendi, `clinics`→`tr_clinics` JOIN düzeltmesi ve main'in `bookings` şemasıyla (`patient_name`, `booking_ref`) uyumlu hale getirildi | ✅ |
| 11 | **Public Slots API** | `app/api/slots/route.ts` artık `tr_clinics`'e JOIN ediyor (Modül 8/10 ile uyumlu); `clinic_scan_types`/`scan_slots` üzerinden TR klinik+cihaz kombinasyonu için gerçek müsaitlik döner | ✅ |

---

## FAZ 2 — Türkiye SEO Sayfaları

| # | Modül | Açıklama | Durum |
|---|---|---|---|
| 12 | **`/scan/pet-ct`** | PET-CT landing sayfası — fiyat karşılaştırma + FAQ + hazırlık rehberi | ⬜ |
| 13 | **`/scan/gamma-knife`** | GammaKnife landing — vs cerrahi karşılaştırma | ⬜ |
| 14 | **`/scan/mri-3t`** | MRI 3T landing — 3T vs 1.5T karşılaştırma | ⬜ |
| 15 | **`/scan/pet-mri`** | PET-MRI landing sayfası | ⬜ |
| 16 | **`/compare/pet-ct-uk-vs-turkey`** | Yüksek-intent SEO karşılaştırma sayfası | ⬜ |
| 17 | **`/destinations/turkey/istanbul`** | İstanbul medikal turizm destinasyon sayfası | ⬜ |
| 18 | **`/clinics/[slug]` TR Detay Sayfaları** | HSM Radyoloji, Acıbadem Maslak/Altunizade vb. için klinik detay + canlı slot sidebar | ⬜ |
| 19 | **ScanBook UK Sayfa Arşivleme** | `/mri-scan`, `/ct-scan`, `/ultrasound`, `/x-ray`, `/baby-scan`, `/pregnancy-scan`, `/for-gps`, `/gp/*` — thediagnostic kapsamı dışında, kaldır veya `/uk-legacy` altına arşivle | ⬜ |
| 20 | **sitemap.xml + robots.txt Güncelleme** | TR sayfalarını ekle, UK sayfalarını çıkar | ⬜ |

---

## FAZ 3 — Navigasyon, Marka & Tasarım

| # | Modül | Açıklama | Durum |
|---|---|---|---|
| 21 | **Navbar Güncelleme** | Gerçek logo, dil seçici (EN/TR/AR), para birimi seçici, WhatsApp butonu — UK menü linklerini kaldır | ⬜ |
| 22 | **Footer Güncelleme** | TR odaklı linkler (Scans / Destinations / Price Compare / Company) | ⬜ |
| 23 | **Logo Finalizasyonu** | `the diagnostic logo.ai` kaynağından gerçek SVG/PNG export, `public/logo.svg` + `public/images/logo-*` güncelle | ⬜ |
| 24 | **Tasarım Tutarlılık Geçişi** | Renk sistemi (`--primary`/`--accent`) ve tipografinin tüm sayfalarda tutarlı kullanımını doğrula | ⬜ |

---

## FAZ 4 — Ödeme & Çoklu Para Birimi

| # | Modül | Açıklama | Durum |
|---|---|---|---|
| 25 | **Multi-Currency Modülü** | GBP/EUR/USD/TRY/AED seçici + `exchange_rates` tablosu ile otomatik fiyat dönüşümü | ⬜ |
| 26 | **İyzico Entegrasyonu** | TRY ödemeleri için İyzico checkout (BDDK uyumu) | ⬜ |
| 27 | **Geo-Targeting Modülü** | IP → dil + para birimi otomatik seçimi (middleware) | ⬜ |

---

## FAZ 5 — AI Agentlar & İletişim

| # | Modül | Açıklama | Durum |
|---|---|---|---|
| 28 | **AI Triage Agent Güncelleme** | `lib/agents/triage.ts`'i 60+ TR cihaz kataloğu + yeni klinik listesiyle güncelle | ⬜ |
| 29 | **WhatsApp Business API** | Meta Cloud API + intent algılama (TR/EN/AR) — `lib/whatsapp/*` main'e taşı | ⬜ |
| 30 | **Report Summary Agent** | Cloudflare R2 + DeepL çeviri + Claude özeti ile rapor işleme | ⬜ |
| 31 | **Patient Follow-up Agent** | Gün 3/7/14/30 hasta takip emaili (TR/EN/AR) | ⬜ |
| 32 | **Concierge Planner Agent** | Uçuş + otel + transfer + tercüman planlama AI'sı | ⬜ |

---

## FAZ 6 — Portal & Dashboard

| # | Modül | Açıklama | Durum |
|---|---|---|---|
| 33 | **Patient Dashboard** | Booking listesi, rapor görüntüleme, profil — TR klinik verisiyle | ⬜ |
| 34 | **Klinik Portalı Genişletme** | TR klinikleri için appointments/reports/packages/settings | ⬜ |
| 35 | **Admin Portal TR Klinik Yönetimi** | Yeni klinik ekleme, fiyat/slot/komisyon yönetimi | ⬜ |

---

## FAZ 7 — Deploy & QA

| # | Modül | Açıklama | Durum |
|---|---|---|---|
| 36 | **Vercel Deploy & Domain** | `thediagnostic.co.uk` domain bağlama, env variables, production deploy doğrulama | ⬜ |
| 37 | **Uçtan Uca Test** | Booking flow (TR klinik seçimi → slot → ödeme → onay emaili) tam test, mobile responsive kontrolü | ⬜ |

---

## Sıradaki Adım

✅ **Modül 1 tamamlandı** — `claude/thediagnostic-phase-2-LK1dc` branch'indeki
`thediagnostic/public/images/*` (6 dosya: hero-scanner.jpg, logo-mark.png,
logo-horizontal-dark/light.png, logo-stacked.png, logo-stacked-alt.jpg) ve
`thediagnostic/public/logo.svg` dosyaları main'in `public/images/` ve
`public/logo.svg` konumlarına taşındı. Kök dizindeki boş `images` dosyası
silindi (Modül 2). Navbar (`/images/logo-mark.png`) ve homepage hero
(`/images/hero-scanner.jpg`) referansları artık çözülüyor.

✅ **Modül 8 tamamlandı** — `lib/schema-tr-migrations.sql` oluşturuldu. main'in
mevcut `clinics`/`scan_types` tabloları UK ScanBook modeline göre (platform,
clinic_status enum, per-clinic scan_types) kurulu olduğundan ve TR klinik
modeliyle (JCI/ISO, hospital_group, çok dilli/çok para birimli fiyatlandırma)
yapısal olarak uyuştuğundan, mevcut tablolar değiştirilmeden `tr_clinics` ve
`tr_scan_types` adında paralel tablolar eklendi (lib/tr-clinics.data.ts ile
birebir eşleşir). Ayrıca 13 TR-özel destek tablosu (clinic_scan_types,
scan_slots, concierge_requests, scan_reports, clinic_images,
clinic_translations, clinic_admins, blog_posts, exchange_rates, geo_pricing,
audit_log, whatsapp_conversations, whatsapp_messages) ve `users`/`bookings`
üzerinde additive `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` ile TR/hasta
alanları eklendi. Migration main'in `schema-vercel.sql` +
`schema-migrations.sql`'inden SONRA çalıştırılmalı.

✅ **Modül 9 tamamlandı** — `lib/seed-tr.sql` oluşturuldu: 13 TR kliniği
(HSM, 2× Acıbadem, 2× Medicana, Koç, Florence Nightingale, 2× Memorial, Liv,
2× Medical Park, Anadolu), 18 TR cihaz/tarama kodu (`tr_scan_types`) ve her
klinik için `featuredScans` fiyatlandırması (`clinic_scan_types`, GBP +
UK karşılaştırma fiyatı) ile İngilizce açıklamalar (`clinic_translations`).
CLEAN UP bloğu mevcut kayıtları silip yeniden ekler (idempotent).
Çalıştırma sırası: `schema-vercel.sql` → `schema-migrations.sql` →
`schema-tr-migrations.sql` → `seed.sql` → `seed-tr.sql`.

✅ **Modül 10 tamamlandı** — `app/clinic/slots/page.tsx` (klinik personeli için
slot/randevu tablosu, filtreler, tekli/bulk slot ekleme modalı, blok/unblock
aksiyonları) ve `app/api/clinic/slots/route.ts` (GET/POST/PATCH, auth + rol
kontrolü) phase-2 branch'inden taşındı. `app/clinic/layout.tsx` sidebar'ına
"Slots" linki eklendi. Admin-all-clinics sorgusu `clinics` yerine `tr_clinics`
tablosuna JOIN edecek şekilde düzeltildi (Modül 8 şemasıyla uyum), ve
`bookings` join'i main'in gerçek kolon adlarına (`patient_name`,
`booking_ref`) göre güncellendi.

✅ **Modül 11 tamamlandı** — `app/api/slots/route.ts` içindeki `JOIN clinics c`
→ `JOIN tr_clinics c` olarak düzeltildi. Bu, FAZ 1'i tamamlıyor: TR klinik
kataloğu (Modül 6), cihaz kataloğu (Modül 7), DB şeması (Modül 8), seed
verisi (Modül 9), klinik slot yönetimi (Modül 10) ve public slot API (Modül 11)
artık tutarlı bir şekilde `tr_clinics`/`tr_scan_types`/`clinic_scan_types`/
`scan_slots` tabloları üzerinden çalışıyor. Not: `/book` sayfası henüz UK
`lib/clinics.data.ts` akışını kullanıyor — TR klinikleri için booking UI
entegrasyonu Modül 18 (TR klinik detay sayfaları) kapsamında ele alınacak.

**Sıradaki:** FAZ 1 tamamlandı. Modül 12 — `/scan/pet-ct` SEO landing
sayfası (fiyat karşılaştırma + FAQ + hazırlık rehberi).

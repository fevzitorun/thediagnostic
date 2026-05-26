# thediagnostic — Master Plan & Geliştirici Yol Haritası
**Versiyon: 1.0 · Tarih: 26 Mayıs 2026**
**Connective Hub Dijital Teknolojiler A.Ş. (İstanbul) · Connective Hub Limited (UK) · Gizli**

---

## 🎯 ÜRÜN VİZYONU

**thediagnostic**, İngiltere ve Avrupa/MENA'daki hastalara Türkiye başta olmak üzere yurt dışındaki ileri teknoloji tanı merkezlerinde (PET-CT, MRI, GammaKnife, SPECT-CT, PET-MRI) **hızlı, güvenilir ve uygun fiyatlı randevu** imkânı sunan tıbbi turizm + tanı rezervasyon platformudur.

**scanbook.co.uk'ten farkı:**
| | scanbook.co.uk | thediagnostic |
|---|---|---|
| Pazar | UK (iç) | UK/Avrupa/MENA → Türkiye/yurt dışı |
| Cihazlar | MRI, CT, Ultrasound, X-Ray | PET-CT, GammaKnife, PET-MRI, SPECT-CT, Robotic MRI |
| Dil | İngilizce | TR + EN + AR |
| Para birimi | GBP | GBP + EUR + USD + TRY + AED |
| Hizmet | Sadece randevu | Randevu + Seyahat + Transfer + Konkierge |
| Klinikler | UK kliniKleri | Türkiye (HSM Radyoloji, Acıbadem) → Avrupa, MENA |

---

## 🏗️ MİMARİ KARAR

### Seçilen Yaklaşım: **Ayrı Repository + Ortak Paket**

```
GitHub/
├── fevzitorun/scanbook.co-uk      ← Faz 1 (mevcut, canlı)
└── fevzitorun/thediagnostic       ← Faz 2 (yeni repo, yeni domain)
    ├── apps/web                   ← thediagnostic Next.js app
    └── packages/
        └── ui                    ← scanbook ile paylaşılabilir UI bileşenleri (ileride)
```

**Neden ayrı repo?**
- Farklı domain: `thediagnostic.co.uk`
- Farklı marka, renk sistemi, dil dosyaları
- Farklı Vercel projesi, farklı env değişkenleri
- scanbook.co.uk'u bozmadan paralel geliştirme

**Neden scanbook'u klonlayarak başlıyoruz?**
- Aynı tech stack (Next.js App Router, TypeScript, Railway PostgreSQL, NextAuth v5, Stripe, Resend, Claude API)
- Aynı booking flow mantığı (adaptasyon daha hızlı)
- Test edilmiş auth, ödeme, email altyapısı

---

## 🗂️ KLASÖR YAPISI

```
thediagnostic/
├── app/
│   ├── layout.tsx                     ← TR/EN/AR i18n wrapper
│   ├── page.tsx                       ← Homepage (hero, nasıl çalışır, cihazlar, klinikler, testimonials)
│   ├── [locale]/                      ← i18n: tr | en | ar
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── scan/                          ← Tarama türü landing sayfaları
│   │   ├── pet-ct/page.tsx
│   │   ├── pet-mri/page.tsx
│   │   ├── gamma-knife/page.tsx
│   │   ├── spect-ct/page.tsx
│   │   ├── mri-3t/page.tsx
│   │   └── [scanType]/page.tsx
│   │
│   ├── clinics/
│   │   ├── page.tsx                   ← Klinik listesi (harita + kart grid)
│   │   ├── [slug]/page.tsx            ← Klinik detay + randevu sidebar
│   │   └── [slug]/[scanType]/page.tsx ← Klinik × tarama tipi detay
│   │
│   ├── book/
│   │   ├── page.tsx                   ← 7-adım booking wizard
│   │   ├── concierge/page.tsx         ← Konkierge paketi
│   │   └── success/page.tsx
│   │
│   ├── destinations/                  ← Şehir/ülke SEO sayfaları
│   │   ├── turkey/
│   │   │   ├── istanbul/page.tsx
│   │   │   ├── ankara/page.tsx
│   │   │   └── izmir/page.tsx
│   │   ├── germany/
│   │   ├── uae/
│   │   └── [country]/[city]/page.tsx
│   │
│   ├── patient/
│   │   ├── dashboard/page.tsx
│   │   ├── bookings/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── reports/page.tsx           ← Rapor görüntüleme + çeviri
│   │   ├── travel/page.tsx            ← Seyahat bilgileri, transfer
│   │   └── profile/page.tsx
│   │
│   ├── clinic/                        ← Klinik portalı (HSM, Acıbadem vb.)
│   │   ├── dashboard/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── slots/page.tsx             ← Boş slot yönetimi (YENİ)
│   │   ├── reports/page.tsx
│   │   ├── packages/page.tsx
│   │   └── settings/page.tsx
│   │
│   ├── admin/
│   │   ├── dashboard/page.tsx
│   │   ├── bookings/page.tsx
│   │   ├── clinics/page.tsx
│   │   ├── patients/page.tsx
│   │   ├── finance/page.tsx
│   │   ├── concierge/page.tsx         ← YENİ: Konkierge takip
│   │   ├── slots/page.tsx             ← YENİ: Global slot takvimi
│   │   ├── agents/page.tsx
│   │   ├── outreach/page.tsx          ← Klinik partner CRM
│   │   ├── translations/page.tsx      ← YENİ: Rapor çeviri yönetimi
│   │   └── settings/page.tsx
│   │
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── auth/register/route.ts
│   │   │
│   │   ├── bookings/
│   │   │   ├── draft/route.ts
│   │   │   ├── confirm/route.ts
│   │   │   └── [id]/status/route.ts
│   │   │
│   │   ├── slots/                     ← YENİ: Boş slot API'si
│   │   │   ├── available/route.ts     ← GET: tarih+klinik+cihaz filtresi
│   │   │   ├── reserve/route.ts       ← POST: geçici rezervasyon (15 dk kilit)
│   │   │   └── release/route.ts       ← POST: timeout → slot serbest bırak
│   │   │
│   │   ├── clinics/
│   │   │   ├── [id]/slots/route.ts    ← Klinik kendi slotlarını yönetir
│   │   │   └── [id]/packages/route.ts
│   │   │
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts
│   │   │   └── webhook/route.ts
│   │   │
│   │   ├── iyzico/                    ← YENİ: TRY ödemeleri
│   │   │   ├── checkout/route.ts
│   │   │   └── webhook/route.ts
│   │   │
│   │   ├── agents/
│   │   │   ├── triage/route.ts        ← Semptom → tarama önerisi
│   │   │   ├── scan-advisor/route.ts  ← YENİ: Hangi tarama, hangi klinik?
│   │   │   ├── concierge/route.ts     ← YENİ: Seyahat + konaklama AI
│   │   │   ├── patient-followup/route.ts
│   │   │   └── report-summary/route.ts ← YENİ: Rapor özetleme (Claude)
│   │   │
│   │   ├── whatsapp/
│   │   │   ├── webhook/route.ts       ← Meta WhatsApp Cloud API webhook
│   │   │   └── send/route.ts
│   │   │
│   │   ├── reports/
│   │   │   ├── upload/route.ts        ← Klinik rapor yükle (S3/R2)
│   │   │   └── translate/route.ts     ← YENİ: DeepL API rapor çevirisi
│   │   │
│   │   └── geo/route.ts               ← YENİ: IP → ülke → dil/para birimi
│   │
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   │
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
│
├── components/
│   ├── Navbar.tsx                     ← Dil seçici + para birimi + WhatsApp butonu
│   ├── Footer.tsx
│   ├── BookingWizard/
│   │   ├── Step1ScanType.tsx
│   │   ├── Step2Destination.tsx       ← Ülke/şehir seçimi
│   │   ├── Step3Clinic.tsx            ← Harita + kart + fiyat karşılaştırma
│   │   ├── Step4DateTime.tsx          ← Canlı slot takvimi
│   │   ├── Step5MedicalInfo.tsx       ← Tıbbi geçmiş, kontrendikasyonlar
│   │   ├── Step6Concierge.tsx         ← Transfer, konaklama, tercüman
│   │   └── Step7Payment.tsx           ← Multi-currency ödeme
│   ├── ScanTypeCard.tsx
│   ├── ClinicCard.tsx
│   ├── SlotCalendar.tsx               ← Canlı müsaitlik takvimi
│   ├── PriceComparison.tsx            ← UK fiyatı vs thediagnostic fiyatı
│   ├── TriageWidget.tsx               ← AI semptom → tarama önerisi
│   ├── WhatsAppButton.tsx             ← Sabit sağ alt köşe
│   ├── CurrencySelector.tsx
│   ├── LanguageSwitcher.tsx
│   ├── TrustBadges.tsx                ← JCI, ISO, akreditasyon rozetleri
│   └── ConciergeCard.tsx
│
├── lib/
│   ├── db.ts                          ← Railway PostgreSQL (postgres pkg)
│   ├── auth.ts                        ← NextAuth v5
│   ├── i18n/
│   │   ├── tr.json                    ← Türkçe çeviriler
│   │   ├── en.json                    ← İngilizce çeviriler
│   │   └── ar.json                    ← Arapça çeviriler
│   ├── agents/
│   │   ├── triage.ts                  ← Claude: semptom → tarama tipi
│   │   ├── scan-advisor.ts            ← Claude: tarama + klinik önerisi
│   │   ├── concierge.ts               ← Claude: seyahat planlayıcı
│   │   ├── report-summary.ts          ← Claude: rapor özetleme
│   │   └── patient-followup.ts        ← Gün 1/3/7/30 takip
│   ├── whatsapp/
│   │   ├── client.ts                  ← Meta WhatsApp Cloud API
│   │   └── templates.ts               ← Onay, hatırlatma mesajları
│   ├── email/
│   │   ├── booking-confirmation.ts
│   │   ├── pre-departure.ts           ← Seyahat öncesi checklist
│   │   ├── report-ready.ts
│   │   └── templates/
│   │       ├── tr/                    ← Türkçe email şablonları
│   │       ├── en/                    ← İngilizce email şablonları
│   │       └── ar/                    ← Arapça email şablonları
│   ├── payment/
│   │   ├── stripe.ts                  ← GBP/EUR/USD
│   │   └── iyzico.ts                  ← TRY (Türkiye)
│   ├── geo.ts                         ← IP geolocation → dil/para birimi
│   ├── slots.ts                       ← Slot müsaitlik mantığı
│   ├── clinics.data.ts                ← HSM Radyoloji + Acıbadem test verisi
│   ├── scan-types.config.ts           ← PET-CT, GammaKnife, MRI 3T, vb.
│   ├── destinations.config.ts         ← Ülke/şehir SEO içerikleri
│   ├── schema.sql                     ← Tüm tablo tanımlamaları
│   └── seed.sql                       ← Test verisi (HSM + Acıbadem)
│
├── messages/                          ← next-intl çeviri dosyaları
│   ├── tr.json
│   ├── en.json
│   └── ar.json
│
├── public/
│   ├── clinics/
│   │   ├── hsm-radyoloji/
│   │   └── acibadem/
│   ├── scans/                         ← Cihaz görselleri
│   └── destinations/
│
├── MASTER-PLAN.md                     ← Bu dosya
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🔬 SCAN TİPLERİ & FİYATLANDIRMA

| Cihaz | UK Fiyatı | thediagnostic (TR) | Tasarruf |
|---|---|---|---|
| PET-CT (tüm vücut) | £3,500–£5,000 | £1,200–£1,800 | ~65% |
| MRI 3T (tek bölge) | £900–£1,500 | £280–£450 | ~68% |
| MRI 3T (tüm vücut) | £2,500–£4,000 | £800–£1,200 | ~70% |
| GammaKnife | £15,000–£25,000 | £5,000–£8,000 | ~67% |
| SPECT-CT | £1,500–£2,500 | £600–£900 | ~64% |
| PET-MRI | £4,000–£6,500 | £1,500–£2,200 | ~65% |

*Fiyat karşılaştırması → homepage'de dinamik hesaplama widget'ı*

---

## 🏥 KLİNİK ORTAKLAR

### Faz 1 (Başlangıç)

#### 1. HSM Radyoloji — Prof. Dr. Mustafa ÖZATEŞ
- **Konum:** İstanbul (2 klinik)
- **Cihazlar:** MRI 3T, PET-CT, BT, Ultrason, Mamografi
- **Hedef:** Test klinik — tam entegrasyon, slot yönetimi, özel sayfa
- **Onboarding:** Manuel slot girişi → API entegrasyonu
- **Profil URL:** `/clinics/hsm-radyoloji-istanbul`

#### 2. Acıbadem Grubu
- **Konum:** İstanbul + diğer şehirler
- **Cihazlar:** PET-CT, PET-MRI, GammaKnife, Robotik MRI, SPECT-CT
- **Hedef:** Premium ortaklık — birden fazla hastane
- **Onboarding:** Acıbadem API entegrasyonu (HBYS bağlantısı)
- **Profil URL:** `/clinics/acibadem-istanbul`

### Faz 2 (3-6 ay)
- Almanya: Ludwig-Maximilians-Universität Klinikum (Münih)
- BAE: Cleveland Clinic Abu Dhabi
- Polonya: MedPolonia (Poznan) — Avrupa'nın en büyük PET merkezi

---

## 🗄️ VERİTABANI ŞEMASI

```sql
-- Scanbook'tan devralınan tablolar (adaptasyon):
-- users, profiles, bookings, clinics, packages

-- YENİ TABLOLAR:

-- Boş Slot Yönetimi
CREATE TABLE scan_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id),
  scan_type VARCHAR(50) NOT NULL,          -- 'pet_ct', 'mri_3t', 'gamma_knife', vb.
  device_name VARCHAR(100),                -- 'Siemens Biograph Vision PET-CT'
  slot_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  duration_minutes INT DEFAULT 60,
  status VARCHAR(20) DEFAULT 'available',  -- available | reserved | confirmed | cancelled
  reserved_until TIMESTAMPTZ,             -- 15 dk kilit (checkout sırasında)
  price_gbp DECIMAL(10,2),
  price_eur DECIMAL(10,2),
  price_usd DECIMAL(10,2),
  price_try DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Konkierge Hizmetleri
CREATE TABLE concierge_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  patient_id UUID REFERENCES users(id),
  flight_needed BOOLEAN DEFAULT false,
  accommodation_needed BOOLEAN DEFAULT false,
  transfer_needed BOOLEAN DEFAULT false,
  translator_needed BOOLEAN DEFAULT false,
  translator_language VARCHAR(10),         -- 'ar', 'de', 'fr', vb.
  departure_city VARCHAR(100),
  arrival_date DATE,
  return_date DATE,
  special_requirements TEXT,
  status VARCHAR(20) DEFAULT 'pending',   -- pending | arranged | completed
  concierge_notes TEXT,
  total_cost_gbp DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Rapor Yönetimi
CREATE TABLE scan_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  patient_id UUID REFERENCES users(id),
  clinic_id UUID REFERENCES clinics(id),
  report_url TEXT,                         -- Cloudflare R2 URL
  dicom_url TEXT,                          -- DICOM viewer URL
  original_language VARCHAR(10),           -- 'tr', 'en'
  translation_status VARCHAR(20) DEFAULT 'pending',  -- pending | processing | completed
  translated_url TEXT,
  ai_summary TEXT,                         -- Claude rapor özeti
  radiologist_name VARCHAR(200),
  report_date DATE,
  is_urgent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Çoklu Dil Klinik İçerikleri
CREATE TABLE clinic_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id),
  locale VARCHAR(10) NOT NULL,            -- 'tr', 'en', 'ar'
  name VARCHAR(200),
  description TEXT,
  short_description TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(clinic_id, locale)
);

-- WhatsApp Konuşmaları
CREATE TABLE whatsapp_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wa_phone_id VARCHAR(50),
  patient_phone VARCHAR(20),
  patient_name VARCHAR(200),
  booking_id UUID REFERENCES bookings(id),
  status VARCHAR(20) DEFAULT 'active',    -- active | resolved | escalated
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES whatsapp_conversations(id),
  direction VARCHAR(10) NOT NULL,         -- 'inbound' | 'outbound'
  message_type VARCHAR(20),              -- 'text' | 'template' | 'document'
  content TEXT,
  wa_message_id VARCHAR(100),
  sent_at TIMESTAMPTZ DEFAULT now()
);

-- Coğrafi Fiyatlandırma
CREATE TABLE geo_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_type VARCHAR(50),
  country_code VARCHAR(5),               -- 'GB', 'DE', 'AE', 'TR'
  currency VARCHAR(5),                   -- 'GBP', 'EUR', 'AED', 'TRY'
  base_price DECIMAL(10,2),
  discount_percentage INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);
```

---

## 🤖 AI AGENTS (Claude API)

### 1. Triage Agent (`/api/agents/triage`)
```
Girdi: Semptom metni (kullanıcı dili: TR/EN/AR)
Çıktı: {
  urgency: 'routine' | 'soon' | 'urgent',
  recommended_scans: ['pet_ct', 'mri_3t'],
  reason: string,
  uk_nhs_wait_estimate: '6-18 months',
  thediagnostic_wait: '3-7 days',
  estimated_saving_pct: 65
}
```

### 2. Scan Advisor Agent (`/api/agents/scan-advisor`)
```
Girdi: Scan tipi + hasta profili + bütçe + tercih edilen ülke
Çıktı: {
  top_clinics: [{ clinic_id, match_score, reasons }],
  best_slot: { date, time, price },
  alternative_dates: [...],
  travel_recommendation: string
}
```

### 3. Concierge Agent (`/api/agents/concierge`)
```
Girdi: Booking + kalkış şehri + tarihler + gereksinimler
Çıktı: {
  flight_options: [...],      // Skyscanner API / amadeus
  hotel_options: [...],       // Booking.com Partner API
  transfer_info: string,
  pre_departure_checklist: [...],
  estimated_total_trip_cost_gbp: number
}
```

### 4. Report Summary Agent (`/api/agents/report-summary`)
```
Girdi: Radyoloji raporu (PDF metin veya OCR)
Çıktı: {
  patient_summary: string,    // Hasta için basit dil (layman)
  key_findings: [...],
  follow_up_needed: boolean,
  follow_up_urgency: 'routine' | 'soon' | 'urgent',
  gp_letter_draft: string    // GP'ye gönderilebilir özet mektup taslağı
}
```

### 5. Patient Follow-up Agent (`/api/agents/patient-followup`)
```
Gün 1:  Booking onay + seyahat hazırlık rehberi (WhatsApp + Email)
Gün -7: Randevu hatırlatma + pre-departure checklist
Gün -1: Yarın randevu var hatırlatma + transfer bilgisi
Gün +1: Nasıldı? Rapor hazır mı? 
Gün +7: Rapor özeti paylaşımı + GP mektup taslağı
Gün +30: Sonraki tarama önerisi
```

### 6. WhatsApp Chatbot (`/api/whatsapp/webhook`)
```
Intent sınıflandırması:
- 'book_scan'        → Booking wizard linki gönder
- 'check_status'     → Booking durumu sorgula
- 'ask_price'        → Fiyat bilgisi + karşılaştırma
- 'need_concierge'   → Konkierge talep formu
- 'report_query'     → Rapor durumu
- 'general'          → Claude ile sohbet
Dil: Otomatik algılama (TR/EN/AR)
```

---

## 💳 ÖDEME SİSTEMLERİ

### Stripe (Uluslararası — GBP/EUR/USD)
- Mevcut scanbook altyapısı → doğrudan kullanım
- Checkout Session + Webhook (`checkout.session.completed`)
- Multi-currency: `currency` parametresi dinamik

### İyzico (Türkiye — TRY)
- Türkiye'deki ödemeler için zorunlu (BDDK düzenlemeleri)
- `iyzipay` npm paketi
- 3D Secure zorunlu
- Webhook: `payment.success` → booking confirm

### Ödeme Akışı
```
1. Kullanıcı lokasyonu → geo.ts → para birimi belirleme
2. Checkout sayfasında fiyat dönüşümü (live exchange rate)
3. GBP/EUR/USD → Stripe
4. TRY → İyzico
5. Webhook → booking confirmed → email + WhatsApp gönder
6. Konkierge ücreti → ayrı Stripe line item
```

---

## 📧 EMAIL ALTYAPISI (Resend)

### Email Adresleri
```
care@thediagnostic.co.uk          ← Hasta iletişimi
clinics@thediagnostic.co.uk       ← Klinik iletişimi  
concierge@thediagnostic.co.uk     ← Konkierge servisi
noreply@thediagnostic.co.uk       ← Otomatik bildirimler
partnerships@thediagnostic.co.uk  ← Yeni klinik ortaklıkları
```

### Email Sekansları

#### A. Hasta Booking Confirmation (3 dil)
```
Konu: Your [PET-CT] appointment at [HSM Radyoloji] is confirmed ✓
- Randevu detayları
- Klinik adresi + Google Maps
- Hazırlık talimatları (scan tipine göre özel)
- Konkierge hizmetleri linki
- Transfer bilgisi
- UK GP'sine bildirim taslağı
```

#### B. Pre-Departure Checklist (D-7)
```
- Pasaport/kimlik hatırlatması
- Sigorta bilgisi
- Önceki scan raporlarını getir
- Klinik iletişim bilgileri
- Transfer/otel bilgisi
- WhatsApp destek numarası
```

#### C. Report Ready Notification
```
- Rapor hazır → güvenli link
- AI özet (hasta dostu dil)
- Raporu GP'nize göndermek ister misiniz?
- Sonraki adımlar
```

#### D. Klinik Partner Outreach (yeni klinik kazanımı)
```
- Prof. Dr. / Hastane yöneticisine
- thediagnostic değer önerisi
- Onboarding adımları
- Demo randevu teklifi
```

---

## 🌍 SEO & GEO STRATEJİSİ

### Hedef Pazarlar & Anahtar Kelimeler

#### İngiltere (EN)
```
- "PET scan abroad affordable" — 1,900/mo
- "MRI scan Turkey price" — 2,400/mo
- "private PET CT scan UK cost" — 3,600/mo
- "medical tourism Turkey radiology" — 880/mo
- "GammaKnife treatment Turkey" — 590/mo
- "full body MRI scan abroad" — 1,200/mo
- "NHS waiting list alternative abroad" — 720/mo
```

#### Türkiye (TR — inbound)
```
- "PET CT randevu İstanbul" — 2,100/mo
- "Acıbadem PET CT fiyat" — 1,800/mo
- "özel MRI randevu" — 4,400/mo
- "yurt dışından hasta kabul" — 390/mo
```

#### BAE/MENA (EN + AR)
```
- "PET scan Dubai cost" — 720/mo
- "medical imaging Turkey Dubai patients" — 210/mo
- "مسح PET CT تركيا" — 590/mo (Arapça)
```

### Statik SEO Sayfaları (SSG — ~300 sayfa)

```
/scan/pet-ct                           ← PET-CT ana sayfası
/scan/pet-ct/turkey                    ← PET-CT Türkiye
/scan/pet-ct/istanbul                  ← PET-CT İstanbul
/scan/mri-3t/[city]                   ← MRI 3T şehir sayfaları
/scan/gamma-knife/[clinic]            ← GammaKnife klinik sayfaları
/destinations/turkey/istanbul          ← İstanbul medikal turizm
/destinations/turkey/ankara
/destinations/germany/munich
/compare/pet-ct-uk-vs-turkey          ← Fiyat karşılaştırma sayfaları (çok güçlü SEO)
/compare/mri-uk-vs-turkey
/compare/gamma-knife-uk-vs-germany
/blog/[slug]                           ← İçerik pazarlaması
/faq/pet-ct-preparation                ← FAQ sayfaları
/faq/medical-tourism-turkey-guide
```

### Geo-Targeting
```typescript
// app/api/geo/route.ts
// Cloudflare Workers → cf-ipcountry header
// Alternatif: ipapi.co (ücretsiz 1000/gün)

const geoDefaults = {
  'GB': { locale: 'en', currency: 'GBP', whatsapp: '+44...' },
  'DE': { locale: 'en', currency: 'EUR', whatsapp: '+49...' },
  'TR': { locale: 'tr', currency: 'TRY', whatsapp: '+90...' },
  'AE': { locale: 'ar', currency: 'AED', whatsapp: '+971...' },
  'SA': { locale: 'ar', currency: 'SAR', whatsapp: '+966...' },
  default: { locale: 'en', currency: 'EUR', whatsapp: '+44...' }
}
```

---

## 📱 WHATSAPP ENTEGRASYONu

### Meta WhatsApp Business Cloud API

```
WhatsApp Business Account
├── +44 XXXX XXXXXX (UK hattı)           ← İngilizce/Arapça
└── +90 XXXX XXXXXX (TR hattı)           ← Türkçe

Onaylı Şablonlar:
- booking_confirmation_en
- booking_confirmation_tr
- booking_confirmation_ar
- pre_departure_reminder_{{3}}
- report_ready_{{clinic}}
- slot_reminder_24h
```

### WhatsApp Bot Akışı
```
Gelen mesaj → /api/whatsapp/webhook
→ Intent algılama (Claude)
→ Dil algılama
→ Intent routing:
   book_scan → "Book now: https://thediagnostic.co.uk/book"
   price_check → Dinamik fiyat hesaplama
   status_check → DB sorgusu → booking durumu
   human_needed → Admin'e eskalasyon bildirimi
→ Yanıt gönder (Türkçe/İngilizce/Arapça)
```

---

## 🗓️ YOL HARİTASI

### Sprint 0 — Hazırlık (1 Hafta)
```
□ Yeni GitHub repo: fevzitorun/thediagnostic
□ scanbook'u temel olarak klonla
□ Yeni Vercel projesi → preview.thediagnostic.co.uk
□ Railway PostgreSQL (yeni DB instance)
□ Resend domain: thediagnostic.co.uk
□ Stripe: yeni product set
□ Meta WhatsApp Business hesabı açılışı
□ Domain: thediagnostic.co.uk (Namecheap/Cloudflare)
□ Marka renk sistemi belirleme (scanbook'tan farklı)
□ HSM Radyoloji ile teknik bağlantı görüşmesi
```

### Faz 1 — Core Platform (4 Hafta)
```
Hafta 1-2: Temel Yapı
□ Next.js App Router kurulumu (scanbook clone + temizlik)
□ next-intl entegrasyonu (TR/EN/AR)
□ Yeni renk sistemi + tipografi
□ Homepage (hero + cihazlar + klinikler + fiyat karşılaştırma)
□ Navbar (dil seçici + WhatsApp butonu)
□ Footer (3 dil)
□ Auth (login/register — scanbook'tan adapt)

Hafta 2-3: Booking Akışı
□ Schema.sql oluştur (yeni tablolar dahil)
□ Seed.sql (HSM Radyoloji + Acıbadem test verisi)
□ Slot sistemi (scan_slots tablosu + API)
□ 7-adım booking wizard
□ Stripe checkout (multi-currency)
□ Webhook → booking confirm → email gönder
□ /book/success sayfası

Hafta 3-4: Klinik Sayfaları + SEO
□ /clinics/page.tsx (harita + liste)
□ /clinics/[slug]/page.tsx (HSM Radyoloji detay)
□ /scan/[scanType]/page.tsx (PET-CT, GammaKnife, vb.)
□ /destinations/turkey/istanbul sayfası
□ Sitemap.xml (300 sayfa)
□ robots.txt
□ OG meta tags (çok dilli)
```

### Faz 2 — Klinik Portalı + AI (3 Hafta)
```
Hafta 5-6: Klinik Portalı
□ Klinik dashboard
□ Slot yönetimi UI (takvim görünümü)
□ Randevu listesi + durum güncelleme
□ Rapor yükleme (Cloudflare R2)
□ HSM Radyoloji onboarding (canlı testler)

Hafta 6-7: AI Agents
□ Triage agent (semptom → tarama önerisi)
□ Scan advisor agent (klinik öneri)
□ Report summary agent (Claude rapor özeti)
□ Patient follow-up sekansları
□ Admin agent paneli
```

### Faz 3 — WhatsApp + Konkierge (2 Hafta)
```
Hafta 8: WhatsApp
□ Meta API entegrasyonu
□ Webhook handler
□ Chatbot akışı (TR/EN/AR)
□ Booking confirmation WhatsApp mesajı
□ Slot hatırlatma şablonları

Hafta 9: Konkierge Modülü
□ Booking wizard Step 6: Konkierge seçimi
□ Concierge agent (Claude seyahat planlayıcı)
□ Admin konkierge takip paneli
□ Pre-departure email sekansı
□ İyzico entegrasyonu (TRY ödemeleri)
```

### Faz 4 — Acıbadem Entegrasyonu + Ölçekleme (4 Hafta)
```
Hafta 10-11: Acıbadem
□ Acıbadem IT ekibi ile API görüşmeleri
□ Slot senkronizasyonu (HBYS entegrasyonu)
□ Acıbadem klinik profil sayfaları
□ Multi-hastane booking akışı

Hafta 12-13: Büyüme
□ Blog (5 temel yazı: PET-CT rehberi, Türkiye'de tıbbi turizm, NHS alternatifleri)
□ Google Ads kampanyaları (UK + BAE hedef)
□ GA4 + Vercel Analytics
□ GDPR / KVKK cookie banner
□ Mobile responsive (kritik!)
□ Hız optimizasyonu (Core Web Vitals)
```

---

## 🔌 TEKNİK ENTEGRASYONLAR

| Servis | Amaç | Paket/API |
|---|---|---|
| **next-intl** | TR/EN/AR çoklu dil | `next-intl` |
| **Meta WhatsApp API** | WhatsApp chatbot | REST API |
| **İyzico** | TRY ödemeleri | `iyzipay` |
| **Cloudflare R2** | Rapor depolama | `@aws-sdk/client-s3` |
| **DeepL API** | Rapor çevirisi | `deepl` |
| **ipapi.co** | IP geolocation | REST API (ücretsiz) |
| **Leaflet/MapLibre** | Klinik haritası | `react-leaflet` |
| **date-fns** | Takvim/slot yönetimi | `date-fns` |
| **Amadeus API** | Uçuş önerileri (konkierge) | `amadeus` |
| **Vercel OG** | Dinamik OG görselleri | `@vercel/og` |

---

## 🎨 MARKA & TASARIM SİSTEMİ

### Renk Paleti (scanbook'tan ayrışan, medikal güven + global)
```css
/* thediagnostic renk sistemi */
--primary:    #1B4F72   /* Derin lacivert — ana renk */
--primary-2:  #154360
--accent:     #17A589   /* Teal/yeşil — teknoloji + sağlık */
--accent-2:   #0E6655
--warm:       #F39C12   /* Amber — öne çıkan CTA */
--bg:         #F8FFFE   /* Hafif teal tint beyaz */
--bg-2:       #EEF9F7
--line:       #D5EEE9
--text:       #1C2833
--text-muted: #5D6D7E
--success:    #27AE60
--warning:    #E67E22
--danger:     #C0392B
```

### Tipografi
```
Başlıklar: Instrument Serif (aynı scanbook — marka tutarlılığı)
Gövde: Inter (DM Sans yerine — daha geniş unicode desteği → Arapça için)
Arapça: Noto Sans Arabic (fallback)
```

---

## 🔐 GÜVENLİK & UYUMLULUK

| Gereksinim | Çözüm |
|---|---|
| **UK GDPR** | Cookie banner + rıza yönetimi |
| **KVKK (Türkiye)** | Veri işleme sözleşmesi + aydınlatma metni |
| **Sağlık Verisi** | Rapor URL'leri sadece JWT ile erişilebilir |
| **DICOM Güvenliği** | R2 pre-signed URL (24 saat TTL) |
| **Ödeme PCI** | Stripe/İyzico — kart verisi asla bizde saklanmaz |
| **SSL** | Vercel → otomatik Let's Encrypt |
| **Rate Limiting** | Vercel Edge Middleware |

---

## 📊 ANALYTICS & KPI'lar

### Teknik (Vercel Analytics + GA4)
- Core Web Vitals (LCP, FID, CLS)
- Conversion funnel (scan seç → book → ödeme)
- Geo breakdown (ziyaretçi ülkesi)
- Dil tercihleri

### İş KPI'ları
| Metrik | Hedef (3 ay) | Hedef (12 ay) |
|---|---|---|
| Aylık benzersiz ziyaretçi | 2,000 | 20,000 |
| Booking conversion rate | %2 | %4 |
| Aylık booking sayısı | 40 | 800 |
| Ortalama booking değeri | £1,200 | £1,500 |
| WhatsApp konuşma/gün | 10 | 100 |
| Organik SEO trafiği | %30 | %60 |

---

## 🚀 DEPLOYMENT

```
preview.thediagnostic.co.uk  ← Vercel (geliştirme)
thediagnostic.co.uk          ← Vercel (production)
                              ← Cloudflare DNS (WAF + CDN + DDoS)

Railway:
├── PostgreSQL (primary)
└── Redis (slot kilidi için — 15 dk reservation TTL)

Cloudflare R2:
└── scan-reports bucket (DICOM + PDF raporlar)
```

### Ortam Değişkenleri
```
DATABASE_URL=postgresql://...railway.app.../railway
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://thediagnostic.co.uk
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
IYZICO_API_KEY=...
IYZICO_SECRET_KEY=...
RESEND_API_KEY=re_...
ANTHROPIC_API_KEY=sk-ant-...
META_WHATSAPP_TOKEN=...
META_WHATSAPP_PHONE_ID=...
META_WHATSAPP_VERIFY_TOKEN=...
CLOUDFLARE_R2_ACCESS_KEY=...
CLOUDFLARE_R2_SECRET_KEY=...
CLOUDFLARE_R2_BUCKET=scan-reports
CLOUDFLARE_R2_ENDPOINT=https://...r2.cloudflarestorage.com
DEEPL_API_KEY=...
AGENT_SECRET=...
NEXT_PUBLIC_PLATFORM=thediagnostic
NEXT_PUBLIC_SITE_URL=https://thediagnostic.co.uk
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

---

## 📋 HEMEN YAPILACAKLAR (Sprint 0 Checklist)

### Teknik
- [ ] `git clone https://github.com/fevzitorun/scanbook.co-uk thediagnostic` → yeni repo olarak push
- [ ] `package.json` güncelle (name: "thediagnostic")  
- [ ] `next-intl` ekle → `npm install next-intl`
- [ ] `iyzipay` ekle → `npm install iyzipay`
- [ ] Renk sistemi güncelle (CSS değişkenleri)
- [ ] `THEDIAGNOSTIC` prefix'li env değişkenleri ayarla

### İş Geliştirme
- [ ] HSM Radyoloji ile kick-off toplantısı → hangi cihazlar, kaç slot/gün, fiyatlar
- [ ] Acıbadem dijital sağlık birimi ile ilk görüşme
- [ ] thediagnostic.co.uk domain tescili (+ .com, .de, .ae)
- [ ] Meta WhatsApp Business hesabı (doğrulama 2-4 hafta sürer — HEMEN başlatın!)
- [ ] İyzico başvurusu (Türkiye ödemeleri için)
- [ ] Cloudflare R2 bucket oluştur

### İçerik
- [ ] Türkçe/İngilizce/Arapça ana sayfa metinleri
- [ ] HSM Radyoloji klinik profil yazısı (3 dil)
- [ ] PET-CT/GammaKnife/MRI hasta rehberleri
- [ ] İlk 3 blog yazısı

---

## 🔗 scanbook.co.uk ile İLİŞKİ

```
scanbook.co.uk (Faz 1)          thediagnostic (Faz 2)
       │                                │
       └──────── Connective Hub ────────┘
                  Ortak altyapı:
                  - Railway PostgreSQL (ayrı DB)
                  - Resend (ayrı domain)
                  - Claude API (aynı key kullanılabilir)
                  - Stripe (ayrı Stripe hesabı önerilir)
                  
       Cross-referral fırsatı:
       scanbook hasta → NHS bekleme uzunsa → thediagnostic'e yönlendir
       thediagnostic hasta → UK'ye döndüğünde → scanbook ile takip
```

---

*thediagnostic Master Plan v1.0 — 26 Mayıs 2026*
*Connective Hub Dijital Teknolojiler A.Ş. & Connective Hub Limited — Gizli*

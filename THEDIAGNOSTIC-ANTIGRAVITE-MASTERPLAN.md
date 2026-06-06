# THEDIAGNOSTIC — ANTİGRAVİTE MASTER PLAN
**Versiyon: 2.0 · Tarih: 2 Haziran 2026**
**Connective Hub Dijital Teknolojiler A.Ş. (İstanbul) · Connective Hub Limited (UK)**
**GİZLİ — YalnIzca Antigravite AI Geliştirici Asistanı İçin**

---

> **Bu döküman nedir?**
> Bu, Antigravite AI geliştirici asistanının **thediagnostic** platformunu sıfırdan anlayıp inşa edebilmesi için hazırlanmış tam spesifikasyon belgesidir. Stratejik karar, teknik mimari, AI prompt kütüphanesi, veritabanı şeması, sprint planı ve KPI'ları tek bir belgede birleştirir. Her geliştirme kararında bu belgeye başvurulmalıdır.

---

## 1. PROJE VİZYONU (Project Vision)

### 1.1 Ne İnşa Ediyoruz?

**thediagnostic**, İngiltere, Avrupa ve Orta Doğu'daki hastalara yurt dışındaki (öncelikle Türkiye) ileri teknoloji tıbbi tanı merkezlerinde **yapay zekâ destekli randevu ve triaj platformu** sunar.

Türkiye'deki hastaneler (Acıbadem, Memorial, Medicana, Florence Nightingale, Anadolu vb.) dünya standartlarında — hatta bazı teknolojilerde dünya liderliğinde — cihazlara sahiptir. Ancak bu kapasiteye erişim İngiliz ve Avrupalı hastalar için hâlâ zorlu, opak ve güvensizdir. thediagnostic bu boşluğu kapatır.

### 1.2 Neden Şimdi?

- **NHS Krizi**: İngiltere'de MRI bekleme süresi ortalama 18 hafta. PET-CT için 6+ ay. Hastalara seçenek sunulmuyor.
- **Fiyat Uçurumu**: İngiltere'de özel PET-CT £2.500-3.500. Türkiye'de aynı cihaz, JCI akrediteli hastane, £650-900.
- **Teknoloji Üstünlüğü**: Türkiye'nin özel hastanelerinde Photon Counting CT, PET-MRI, Intraoperative 3T MRI gibi NHS'de bulunmayan teknolojiler mevcut.
- **Tüketici Davranışı**: COVID sonrası "sağlık turizmi" aramaları %340 arttı (Google Trends 2022-2026).
- **AI Olgunluğu**: Claude API, GPT-4o gibi modeller artık klinik triaj için yeterince güvenilir. Regülasyon netleşiyor.

### 1.3 Kim İçin?

**Birincil Hedef: İngiliz Hastalar**
- NHS'de bekleme listesindeki 7.5 milyon hasta
- Özel sigortası olmayan, cepten ödeme yapabilecek orta-üst gelir grubu (hane geliri £50k+)
- Yaş: 40-70, dijital okuryazar, health-conscious
- Motivasyon: Hız (beklemek istemiyor) + Teknoloji (NHS'de olmayan cihaz) + Fiyat (özel UK'dan ucuz)

**İkincil Hedef: Avrupalı Hastalar**
- Almanya, Fransa, Hollanda, Belçika, İspanya
- Motivasyon: Özellikle onkoloji ikinci görüş, ultra-gelişmiş cihaz erişimi

**Üçüncül Hedef: MENA Hastaları**
- BAE, Suudi Arabistan, Katar, Kuveyt
- Yüksek ödeme gücü, Türkiye'ye sağlık turizmi alışkanlığı var
- Arapça dil desteği kritik

### 1.4 Gelir Modeli

| Gelir Akışı | Açıklama | Hedef % |
|---|---|---|
| Booking komisyonu | Klinikten %12-18 komisyon | 55% |
| Concierge paketleri | Uçuş + otel + transfer + tercüman | 25% |
| Premium üyelik | Hasta tarafı aylık abonelik | 10% |
| Klinik SaaS | Kliniklere slot yönetim paneli | 10% |

---

## 2. FAZ 2 VS FAZ 1 KARŞILAŞTIRMASI (Phase Comparison)

| Özellik | scanbook.co.uk (Faz 1) | thediagnostic (Faz 2) |
|---|---|---|
| **Pazar** | Yalnızca UK (iç) | UK → Avrupa/MENA → Türkiye/Yurt Dışı |
| **Cihaz Kapsamı** | MRI, CT, Ultrasound, X-Ray, Mamografi | 70+ cihaz kategorisi (PET-CT, GammaKnife, Robot Cerrahi, SPECT-CT, PET-MRI, Photon Counting CT…) |
| **Dil** | Yalnızca İngilizce | Türkçe + İngilizce + Arapça (next-intl) |
| **Para Birimi** | Yalnızca GBP | GBP, EUR, USD, TRY, AED |
| **Klinikler** | UK CQC kayıtlı klinikler | Türkiye (öncelik), Almanya, Fransa, BAE, SA |
| **Triage Modeli** | Basit: semptom → tarama türü | Gelişmiş: semptom → cihaz + klinik + aciliyet + NHS karşılaştırması |
| **AI Ajanları** | triage.ts (temel) | 6 ajan: triaj v2, slot pazarlama, rapor özet, GP mektubu, klinik outreach, WhatsApp intent |
| **Concierge** | Yok | Uçuş + otel + transfer + tıbbi tercüman |
| **Raporlama** | Klinikten direkt | UK standart formatlı, NHS GP'ye uyumlu referral letter |
| **İkinci Görüş** | Yok | Onkoloji, kardiyoloji, nöroloji |
| **Boş Slot Motoru** | Yok | AI-destekli: e-posta, WhatsApp, geo-targeting |
| **SEO Yaklaşımı** | Manuel sayfalar | Programmatik SEO + GEO (AI arama motoru optimizasyonu) |
| **Tech Stack** | Next.js 15, PG, NextAuth v5, Stripe | Next.js 16 (App Router), PG, NextAuth v5, Stripe, next-intl, Twilio WhatsApp |
| **Domain** | scanbook.co.uk | thediagnostic.co.uk |
| **Deployment** | Vercel | Vercel (ayrı proje) |

---

## 3. TEKNİK MİMARİ (Technical Architecture)

### 3.1 Stack Kararları

```
Frontend:     Next.js 16 App Router + TypeScript + Tailwind CSS v4
Auth:         NextAuth v5 (credentials + Google OAuth)
Database:     PostgreSQL (Supabase veya Railway) — mevcut şema: /thediagnostic/lib/schema.sql
ORM:          postgres.js (raw SQL, no ORM overhead)
Payments:     Stripe (multi-currency: GBP, EUR, USD, AED)
Email:        Resend (transactional + marketing)
AI:           Anthropic Claude API (claude-sonnet-4-6)
WhatsApp:     Twilio WhatsApp Business API
i18n:         next-intl (EN + TR + AR)
Storage:      AWS S3 (rapor PDF'leri, kimlik belgeleri)
Deployment:   Vercel (thediagnostic.co.uk)
Analytics:    Vercel Analytics + PostHog
Monitoring:   Sentry
```

### 3.2 Repo Yapısı

```
thediagnostic/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # i18n routing: /en/, /tr/, /ar/
│   │   ├── page.tsx              # Homepage
│   │   ├── triage/               # AI triage flow
│   │   ├── scan/[device]/        # Cihaz detay sayfaları (programmatik)
│   │   ├── clinic/[slug]/        # Klinik profil sayfaları
│   │   ├── destinations/[city]/  # Şehir landing sayfaları
│   │   ├── book/                 # Booking flow (4 adım)
│   │   ├── patient/              # Hasta dashboard
│   │   ├── clinic-portal/        # Klinik yönetim paneli
│   │   ├── blog/                 # İçerik & SEO
│   │   └── compare/              # Cihaz/klinik karşılaştırma
│   ├── api/
│   │   ├── triage/route.ts       # POST /api/triage
│   │   ├── slots/route.ts        # Boş slot CRUD
│   │   ├── bookings/route.ts     # Booking CRUD
│   │   ├── webhooks/
│   │   │   ├── stripe/route.ts   # Stripe webhooks
│   │   │   └── whatsapp/route.ts # Twilio WhatsApp webhook
│   │   └── reports/route.ts      # Rapor upload/download
│   └── (auth)/                   # NextAuth sayfaları
├── lib/
│   ├── agents/
│   │   ├── triage.ts             # Triaj ajanı v2 (MEVCUT — geliştir)
│   │   ├── outreach-email.ts     # Klinik outreach (MEVCUT — güncelle)
│   │   ├── patient-followup.ts   # Hasta follow-up (MEVCUT)
│   │   ├── report-summary.ts     # Rapor özet (MEVCUT)
│   │   ├── slot-marketing.ts     # YENİ: Boş slot pazarlama
│   │   ├── gp-letter.ts          # YENİ: GP referral letter üretici
│   │   └── whatsapp/
│   │       ├── intent.ts         # WhatsApp intent (MEVCUT)
│   │       └── dispatcher.ts     # YENİ: Intent → aksiyon dispatcher
│   ├── db.ts                     # PostgreSQL bağlantısı
│   ├── schema.sql                # Tam DB şeması
│   ├── devices.config.ts         # 70+ cihaz katalogu (YENİ — aşağıda detay)
│   ├── clinics.data.ts           # Klinik seed verisi
│   └── scanTypes.config.ts       # Tarama türü konfigürasyonu
├── components/
│   ├── triage/                   # Triaj UI bileşenleri
│   ├── booking/                  # 4-adım booking wizard
│   ├── clinic/                   # Klinik kart, profil
│   ├── device/                   # Cihaz kart, karşılaştırma tablosu
│   └── shared/                   # Ortak UI
├── messages/
│   ├── en.json                   # İngilizce çeviriler
│   ├── tr.json                   # Türkçe çeviriler
│   └── ar.json                   # Arapça çeviriler
├── middleware.ts                 # next-intl locale routing
└── next.config.ts
```

### 3.3 Kritik Tasarım Prensipleri

1. **Locale-first routing**: Tüm sayfalar `/[locale]/...` pattern'ında. `middleware.ts` varsayılan locale tespit eder (Accept-Language + IP coğrafyası).
2. **Sunucu bileşenleri öncelikli**: SEO ve performans için. Sadece interaktif UI'da client component.
3. **Tek veri kaynağı**: `devices.config.ts` ve `scanTypes.config.ts` — UI asla hard-code liste içermez.
4. **AI-first triage**: Her booking akışı triage ile başlar. Kullanıcı doğrudan cihaz seçemez — semptomdan gider.
5. **Multi-currency**: Tüm fiyatlar `base_price_gbp` olarak saklanır, anlık kur ile görüntülenir.

---

## 4. CİHAZ KATALOGU (Device Catalog)

### 4.1 Taksonomi Modeli

Cihazlar üç katmanda modellenir: **Kategori → Alt Kategori → Cihaz Modeli**

```typescript
// lib/devices.config.ts

export type DeviceCategory =
  | 'mri'
  | 'ct'
  | 'nuclear'
  | 'mammography'
  | 'radiosurgery'
  | 'robotic_surgery'
  | 'angiography'
  | 'interventional'
  | 'imaging'
  | 'ophthalmology'
  | 'aesthetic'
  | 'fertility'
  | 'urology'
  | 'rehab'
  | 'other'

export interface MedicalDevice {
  code: string               // Benzersiz slug: 'pet_ct', 'gamma_knife_esprit'
  name: string               // İngilizce görünen ad
  nameTr: string             // Türkçe ad
  nameAr: string             // Arapça ad
  category: DeviceCategory
  subcategory: string
  description: string
  clinicalUses: string[]     // ['Cancer staging', 'Neurological assessment']
  bodyParts: string[]        // ['brain', 'chest', 'whole_body']
  priceFromGbp: number       // UK eşdeğeri fiyat (karşılaştırma için)
  ourPriceFromGbp: number    // thediagnostic en düşük fiyat
  nhsWaitWeeks: number       // Ortalama NHS bekleme (0 = mevcut değil)
  radiation: boolean
  preparation: string[]      // Hazırlık gereksinimleri
  durationMinutes: number
  urgencyCompatible: boolean // Acil hastalarda kullanılabilir mi?
  requiresReferral: boolean  // Klinik referral gerektirir mi?
  tags: string[]             // SEO + arama etiketleri
}
```

### 4.2 Tam Cihaz Katalogu (70+ Cihaz)

```typescript
export const DEVICES: MedicalDevice[] = [
  // ── MRI ──────────────────────────────────────────────────────────────
  {
    code: 'mri_3t',
    name: '3T MRI Scan',
    nameTr: '3T MRI',
    nameAr: 'تصوير الرنين المغناطيسي 3 تسلا',
    category: 'mri',
    subcategory: 'standard',
    description: 'High-field 3 Tesla MRI for superior soft tissue contrast',
    clinicalUses: ['Brain', 'Spine', 'MSK', 'Abdominal', 'Cardiac'],
    bodyParts: ['brain', 'spine', 'joints', 'abdomen', 'pelvis'],
    priceFromGbp: 800,
    ourPriceFromGbp: 320,
    nhsWaitWeeks: 18,
    radiation: false,
    preparation: ['Remove metal objects', 'No food 4h if contrast'],
    durationMinutes: 45,
    urgencyCompatible: true,
    requiresReferral: false,
    tags: ['mri', '3t', 'brain scan', 'spine mri', 'joint mri'],
  },
  {
    code: 'mri_3t_prisma',
    name: '3T Prisma MRI',
    nameTr: '3T Prisma MRI',
    nameAr: 'رنين مغناطيسي بريزما 3 تسلا',
    category: 'mri',
    subcategory: 'premium',
    description: 'Siemens Prisma — highest resolution 3T MRI for neurological and research-grade imaging',
    clinicalUses: ['Neurological', 'Functional MRI', 'Spectroscopy', 'Cardiac'],
    bodyParts: ['brain', 'spine'],
    priceFromGbp: 1200,
    ourPriceFromGbp: 480,
    nhsWaitWeeks: 26,
    radiation: false,
    preparation: ['Remove metal objects'],
    durationMinutes: 60,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['prisma mri', 'neurological mri', 'high resolution mri'],
  },
  {
    code: 'mri_wide_bore',
    name: 'Wide-Bore MRI (Free Max)',
    nameTr: 'Geniş Delikli MRI (Free Max)',
    nameAr: 'رنين مغناطيسي عريض الفتحة',
    category: 'mri',
    subcategory: 'accessible',
    description: 'Open-bore design for claustrophobic patients and larger body types',
    clinicalUses: ['All standard MRI indications', 'Bariatric patients', 'Claustrophobia'],
    bodyParts: ['brain', 'spine', 'joints', 'abdomen', 'pelvis', 'chest'],
    priceFromGbp: 750,
    ourPriceFromGbp: 290,
    nhsWaitWeeks: 18,
    radiation: false,
    preparation: ['Remove metal objects'],
    durationMinutes: 45,
    urgencyCompatible: true,
    requiresReferral: false,
    tags: ['open mri', 'wide bore mri', 'claustrophobia mri', 'free max mri'],
  },
  {
    code: 'mri_intraoperative',
    name: 'Intraoperative 3T MRI',
    nameTr: 'İntraoperatif 3T MRI',
    nameAr: 'رنين مغناطيسي أثناء العملية',
    category: 'mri',
    subcategory: 'surgical',
    description: 'Real-time MRI imaging during neurosurgery for complete tumour resection',
    clinicalUses: ['Brain tumour surgery', 'Neurosurgery guidance'],
    bodyParts: ['brain'],
    priceFromGbp: 0, // Not available NHS
    ourPriceFromGbp: 4500,
    nhsWaitWeeks: 0,
    radiation: false,
    preparation: ['Pre-surgical evaluation required', 'Neurosurgery consultation'],
    durationMinutes: 240,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['intraoperative mri', 'brain surgery mri', 'neurosurgery mri'],
  },
  {
    code: 'mri_whole_body',
    name: 'Whole Body MRI',
    nameTr: 'Tüm Vücut MRI',
    nameAr: 'تصوير الجسم الكامل بالرنين المغناطيسي',
    category: 'mri',
    subcategory: 'screening',
    description: 'Complete head-to-toe MRI for cancer screening and full health assessment',
    clinicalUses: ['Cancer screening', 'Myeloma staging', 'Comprehensive check-up'],
    bodyParts: ['whole_body'],
    priceFromGbp: 1800,
    ourPriceFromGbp: 950,
    nhsWaitWeeks: 0,
    radiation: false,
    preparation: ['NPO 4h', 'Comfortable clothing'],
    durationMinutes: 90,
    urgencyCompatible: false,
    requiresReferral: false,
    tags: ['whole body mri', 'full body scan', 'cancer screening mri', 'health check mri'],
  },

  // ── CT ──────────────────────────────────────────────────────────────
  {
    code: 'ct_photon_counting',
    name: 'Photon Counting CT',
    nameTr: 'Foton Sayımlı BT',
    nameAr: 'أشعة مقطعية بعد الفوتون',
    category: 'ct',
    subcategory: 'ultra_premium',
    description: 'Next-generation CT with photon-counting detectors — lowest dose, highest resolution',
    clinicalUses: ['Cardiac imaging', 'Vascular', 'Oncology', 'MSK'],
    bodyParts: ['chest', 'abdomen', 'heart', 'vascular'],
    priceFromGbp: 0, // Not available in UK
    ourPriceFromGbp: 650,
    nhsWaitWeeks: 0,
    radiation: true,
    preparation: ['No food 4h', 'No caffeine if cardiac'],
    durationMinutes: 30,
    urgencyCompatible: true,
    requiresReferral: true,
    tags: ['photon counting ct', 'siemens naeotom', 'advanced ct scan', 'low dose ct'],
  },
  {
    code: 'ct_flash',
    name: 'Flash CT (Dual Source)',
    nameTr: 'Flash BT',
    nameAr: 'أشعة مقطعية فلاش',
    category: 'ct',
    subcategory: 'premium',
    description: 'Dual-source CT enabling cardiac imaging in under 1 second without heart rate control',
    clinicalUses: ['Cardiac CT', 'Coronary angiography', 'Pulmonary embolism'],
    bodyParts: ['heart', 'chest', 'vascular'],
    priceFromGbp: 850,
    ourPriceFromGbp: 380,
    nhsWaitWeeks: 12,
    radiation: true,
    preparation: ['Beta-blocker prep if HR >65', 'No caffeine 24h'],
    durationMinutes: 20,
    urgencyCompatible: true,
    requiresReferral: false,
    tags: ['cardiac ct', 'flash ct', 'coronary ct', 'ctca'],
  },
  {
    code: 'ct_force',
    name: 'Force CT',
    nameTr: 'Force BT',
    nameAr: 'أشعة مقطعية فورس',
    category: 'ct',
    subcategory: 'premium',
    description: 'High-performance dual-source CT for complex oncological and trauma cases',
    clinicalUses: ['Oncology staging', 'Trauma', 'Vascular', 'Chest'],
    bodyParts: ['chest', 'abdomen', 'pelvis', 'vascular'],
    priceFromGbp: 750,
    ourPriceFromGbp: 350,
    nhsWaitWeeks: 14,
    radiation: true,
    preparation: ['NPO 4h'],
    durationMinutes: 25,
    urgencyCompatible: true,
    requiresReferral: false,
    tags: ['force ct', 'dual source ct', 'oncology ct'],
  },

  // ── NUCLEAR MEDICINE ─────────────────────────────────────────────────
  {
    code: 'pet_ct',
    name: 'PET-CT Scan',
    nameTr: 'PET-BT',
    nameAr: 'مسح PET-CT',
    category: 'nuclear',
    subcategory: 'pet',
    description: 'Gold-standard metabolic imaging for cancer staging, treatment response, neurological',
    clinicalUses: ['Cancer staging', 'Recurrence detection', 'Cardiac viability', 'Neurological'],
    bodyParts: ['whole_body', 'brain', 'heart'],
    priceFromGbp: 2800,
    ourPriceFromGbp: 750,
    nhsWaitWeeks: 24,
    radiation: true,
    preparation: ['NPO 6h', 'No strenuous exercise 24h', 'Blood glucose <7 mmol/L'],
    durationMinutes: 120,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['pet ct', 'pet scan', 'cancer staging', 'fdg pet', 'oncology scan'],
  },
  {
    code: 'pet_mri',
    name: 'PET-MRI',
    nameTr: 'PET-MRI',
    nameAr: 'PET-MRI',
    category: 'nuclear',
    subcategory: 'hybrid',
    description: 'Simultaneous PET + MRI — highest soft tissue detail with metabolic information',
    clinicalUses: ['Brain tumours', 'Advanced oncology', 'Paediatric oncology', 'Prostate cancer'],
    bodyParts: ['brain', 'pelvis', 'whole_body'],
    priceFromGbp: 0,
    ourPriceFromGbp: 1850,
    nhsWaitWeeks: 0,
    radiation: true,
    preparation: ['NPO 6h', 'No exercise 24h', 'Glucose check on day'],
    durationMinutes: 150,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['pet mri', 'hybrid imaging', 'brain tumour scan', 'advanced oncology'],
  },
  {
    code: 'spect_ct',
    name: 'SPECT-CT',
    nameTr: 'SPECT-BT',
    nameAr: 'مسح SPECT-CT',
    category: 'nuclear',
    subcategory: 'spect',
    description: 'Combines SPECT functional imaging with CT anatomy for bone, thyroid, cardiac',
    clinicalUses: ['Bone scan', 'Thyroid cancer', 'Cardiac perfusion', 'Parathyroid'],
    bodyParts: ['bone', 'thyroid', 'heart', 'whole_body'],
    priceFromGbp: 900,
    ourPriceFromGbp: 650,
    nhsWaitWeeks: 16,
    radiation: true,
    preparation: ['Tracer-specific prep', 'Consult required'],
    durationMinutes: 180,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['spect ct', 'bone scan', 'nuclear medicine', 'thyroid scan', 'cardiac perfusion'],
  },

  // ── RADIOSURGERY ─────────────────────────────────────────────────────
  {
    code: 'gamma_knife_esprit',
    name: 'Gamma Knife Esprit',
    nameTr: 'Gamma Knife Esprit',
    nameAr: 'سكين غاما إسبريت',
    category: 'radiosurgery',
    subcategory: 'intracranial',
    description: 'Latest-generation stereotactic radiosurgery — non-invasive brain tumour treatment',
    clinicalUses: ['Brain metastases', 'Acoustic neuroma', 'Meningioma', 'AVM', 'Trigeminal neuralgia'],
    bodyParts: ['brain'],
    priceFromGbp: 15000,
    ourPriceFromGbp: 6500,
    nhsWaitWeeks: 8,
    radiation: true,
    preparation: ['MRI required first', 'Multidisciplinary team review', 'Treatment planning session'],
    durationMinutes: 120,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['gamma knife', 'brain tumour treatment', 'radiosurgery', 'stereotactic'],
  },
  {
    code: 'mr_linac',
    name: 'MR-Linac',
    nameTr: 'MR-Linac',
    nameAr: 'MR-Linac',
    category: 'radiosurgery',
    subcategory: 'adaptive',
    description: 'Real-time MRI-guided radiotherapy — adapts dose delivery as tumour moves',
    clinicalUses: ['Prostate cancer', 'Pancreatic cancer', 'Liver tumours', 'Cervical cancer'],
    bodyParts: ['pelvis', 'abdomen', 'liver'],
    priceFromGbp: 0,
    ourPriceFromGbp: 8000,
    nhsWaitWeeks: 0,
    radiation: true,
    preparation: ['Treatment planning required', 'Multi-week course'],
    durationMinutes: 45,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['mr linac', 'adaptive radiotherapy', 'mri guided radiation', 'prostate treatment'],
  },
  {
    code: 'truebeam',
    name: 'TrueBeam Radiotherapy',
    nameTr: 'TrueBeam Radyoterapi',
    nameAr: 'علاج TrueBeam الإشعاعي',
    category: 'radiosurgery',
    subcategory: 'linac',
    description: 'Varian TrueBeam — high-precision IMRT, VMAT, SBRT, SRS',
    clinicalUses: ['All solid tumours', 'SBRT', 'SRS for brain', 'Lung SBRT'],
    bodyParts: ['whole_body'],
    priceFromGbp: 12000,
    ourPriceFromGbp: 5500,
    nhsWaitWeeks: 12,
    radiation: true,
    preparation: ['Oncology referral mandatory', 'Treatment planning 2 weeks'],
    durationMinutes: 30,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['truebeam', 'varian', 'imrt', 'vmat', 'sbrt', 'radiotherapy'],
  },

  // ── ROBOTIC SURGERY ──────────────────────────────────────────────────
  {
    code: 'da_vinci',
    name: 'Da Vinci Robotic Surgery',
    nameTr: 'Da Vinci Robotik Cerrahi',
    nameAr: 'جراحة دافنشي الروبوتية',
    category: 'robotic_surgery',
    subcategory: 'general_surgery',
    description: 'Intuitive Da Vinci — minimal invasive robotic surgery for urology, gynaecology, general',
    clinicalUses: ['Prostatectomy', 'Hysterectomy', 'Colectomy', 'Nephrectomy', 'Cholecystectomy'],
    bodyParts: ['pelvis', 'abdomen'],
    priceFromGbp: 18000,
    ourPriceFromGbp: 7500,
    nhsWaitWeeks: 36,
    radiation: false,
    preparation: ['Surgical consultation required', 'Pre-operative tests'],
    durationMinutes: 180,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['da vinci', 'robotic surgery', 'prostatectomy', 'minimally invasive surgery'],
  },
  {
    code: 'rosa_brain',
    name: 'ROSA Brain Robotic System',
    nameTr: 'ROSA Beyin Robotik Sistemi',
    nameAr: 'نظام روزا الروبوتي للدماغ',
    category: 'robotic_surgery',
    subcategory: 'neurosurgery',
    description: 'Robotic-assisted neurosurgery and stereotactic biopsy',
    clinicalUses: ['Brain biopsy', 'Deep brain stimulation', 'Epilepsy surgery'],
    bodyParts: ['brain'],
    priceFromGbp: 25000,
    ourPriceFromGbp: 9000,
    nhsWaitWeeks: 0,
    radiation: false,
    preparation: ['Neurosurgery consultation mandatory'],
    durationMinutes: 240,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['rosa robot', 'robotic neurosurgery', 'brain biopsy', 'deep brain stimulation'],
  },
  {
    code: 'mako_ortho',
    name: 'MAKO Robotic Orthopaedics',
    nameTr: 'MAKO Robotik Ortopedi',
    nameAr: 'جراحة ماكو الروبوتية للعظام',
    category: 'robotic_surgery',
    subcategory: 'orthopaedics',
    description: 'Stryker MAKO — robotic-arm assisted partial/total knee and hip replacement',
    clinicalUses: ['Total knee replacement', 'Hip replacement', 'Partial knee'],
    bodyParts: ['knee', 'hip'],
    priceFromGbp: 22000,
    ourPriceFromGbp: 8500,
    nhsWaitWeeks: 52,
    radiation: false,
    preparation: ['Orthopaedic consultation', 'Pre-op X-ray', 'CT for planning'],
    durationMinutes: 150,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['mako robot', 'robotic knee replacement', 'robotic hip replacement', 'stryker'],
  },

  // ── MAMMOGRAPHY ──────────────────────────────────────────────────────
  {
    code: 'mammo_3d_tomo',
    name: '3D Tomosynthesis Mammography',
    nameTr: '3D Tomosintez Mamografi',
    nameAr: 'تصوير الثدي 3D Tomosynthesis',
    category: 'mammography',
    subcategory: '3d',
    description: 'Digital breast tomosynthesis — 40% more cancers detected vs 2D mammography',
    clinicalUses: ['Breast cancer screening', 'Dense breast evaluation', 'Breast symptoms'],
    bodyParts: ['breast'],
    priceFromGbp: 350,
    ourPriceFromGbp: 180,
    nhsWaitWeeks: 10,
    radiation: true,
    preparation: ['No deodorant/powder on day'],
    durationMinutes: 20,
    urgencyCompatible: true,
    requiresReferral: false,
    tags: ['3d mammogram', 'tomosynthesis', 'breast screening', 'breast cancer check'],
  },
  {
    code: 'breast_ultrasound_4d',
    name: '4D Breast Ultrasound',
    nameTr: '4D Meme Ultrason',
    nameAr: 'الموجات فوق الصوتية للثدي 4D',
    category: 'imaging',
    subcategory: 'breast',
    description: 'Real-time 4D breast ultrasound for dense breasts and young women',
    clinicalUses: ['Breast lump assessment', 'Dense breast screening', 'Guided biopsy'],
    bodyParts: ['breast'],
    priceFromGbp: 280,
    ourPriceFromGbp: 150,
    nhsWaitWeeks: 8,
    radiation: false,
    preparation: ['No preparation needed'],
    durationMinutes: 30,
    urgencyCompatible: true,
    requiresReferral: false,
    tags: ['4d breast ultrasound', 'breast ultrasound', 'dense breast scan'],
  },

  // ── OPHTHALMOLOGY ─────────────────────────────────────────────────────
  {
    code: 'smile_pro_laser',
    name: 'SMILE Pro Laser Eye Surgery',
    nameTr: 'SMILE Pro Lazer Göz Ameliyatı',
    nameAr: 'عملية تصحيح النظر SMILE Pro',
    category: 'ophthalmology',
    subcategory: 'refractive',
    description: 'Minimally invasive keyhole laser for myopia correction — no flap, rapid recovery',
    clinicalUses: ['Myopia correction', 'Astigmatism', 'Athletes/martial arts compatible'],
    bodyParts: ['eye'],
    priceFromGbp: 3500,
    ourPriceFromGbp: 1400,
    nhsWaitWeeks: 0,
    radiation: false,
    preparation: ['Stop contact lenses 2 weeks prior', 'Screening assessment required'],
    durationMinutes: 20,
    urgencyCompatible: false,
    requiresReferral: false,
    tags: ['smile pro', 'laser eye surgery', 'myopia treatment', 'keyhole laser'],
  },

  // ── FERTILITY ────────────────────────────────────────────────────────
  {
    code: 'embryoscope',
    name: 'Embryoscope Time-Lapse',
    nameTr: 'Embryoscope Zaman Atlamalı',
    nameAr: 'حاضنة إمبريوسكوب',
    category: 'fertility',
    subcategory: 'ivf',
    description: 'Continuous embryo monitoring incubator — improves IVF success rates by 10-15%',
    clinicalUses: ['IVF embryo selection', 'ICSI'],
    bodyParts: ['reproductive'],
    priceFromGbp: 0,
    ourPriceFromGbp: 250,
    nhsWaitWeeks: 0,
    radiation: false,
    preparation: ['IVF cycle coordination'],
    durationMinutes: 0,
    urgencyCompatible: false,
    requiresReferral: true,
    tags: ['embryoscope', 'ivf turkey', 'time-lapse embryo', 'ivf monitoring'],
  },
]
```

### 4.3 Cihaz Sayısı (Özet Tablo)

| Kategori | Cihaz Sayısı |
|---|---|
| MRI | 5 |
| CT | 5 |
| Nükleer Tıp | 3 |
| Mamografi | 2 |
| Radyocerrahi | 6 |
| Robotik Cerrahi | 4 |
| Anjiyografi | 3 |
| İnterventional | 5 |
| Görüntüleme | 5 |
| Oftalmoloji | 5 |
| Estetik/Dermatoloji | 8 |
| Fertilite | 2 |
| Üroloji | 3 |
| Rehabilitasyon | 7 |
| Diğer | 5 |
| **TOPLAM** | **~70** |

### 4.4 Veritabanı Cihaz Tablosu

```sql
CREATE TABLE devices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            VARCHAR(100) UNIQUE NOT NULL,
  category        VARCHAR(50) NOT NULL,
  subcategory     VARCHAR(50),
  name_en         VARCHAR(200) NOT NULL,
  name_tr         VARCHAR(200),
  name_ar         VARCHAR(200),
  description_en  TEXT,
  description_tr  TEXT,
  description_ar  TEXT,
  clinical_uses   TEXT[],
  body_parts      TEXT[],
  price_from_gbp_uk     DECIMAL(8,2),  -- UK eşdeğer fiyat
  price_from_gbp_us     DECIMAL(8,2),  -- thediagnostic min fiyat
  nhs_wait_weeks        INT DEFAULT 0,
  radiation             BOOLEAN DEFAULT false,
  requires_referral     BOOLEAN DEFAULT false,
  urgency_compatible    BOOLEAN DEFAULT true,
  duration_minutes      INT,
  preparation           TEXT[],
  tags                  TEXT[],
  is_active             BOOLEAN DEFAULT true,
  created_at            TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE clinic_devices (
  clinic_id       UUID REFERENCES clinics(id),
  device_code     VARCHAR(100) REFERENCES devices(code),
  price_gbp       DECIMAL(8,2),
  price_eur       DECIMAL(8,2),
  price_usd       DECIMAL(8,2),
  price_try       DECIMAL(8,2),
  is_available    BOOLEAN DEFAULT true,
  next_slot       TIMESTAMPTZ,
  notes           TEXT,
  PRIMARY KEY (clinic_id, device_code)
);
```

---

## 5. AI TRİAJ SİSTEMİ v2 (AI Triage System v2)

### 5.1 Mevcut Durum

`thediagnostic/lib/agents/triage.ts` — temel triaj mevcut. 6 tarama türü, 3 dil, JSON çıktı.

### 5.2 v2 Gereksinimleri

v2 triajı şunları eklemelidir:
1. **70+ cihaz desteği** — mevcut 6 tarama türünden tam kataloğa
2. **Klinik eşleştirme** — semptom → cihaz → klinik önerisi
3. **Coğrafi yönlendirme** — hasta konumuna göre en yakın/uygun destinasyon
4. **Fiyat karşılaştırması** — "NHS'de £2.800, bizde £750" formatı
5. **Aciliyet akışı** — urgent → WhatsApp human handoff
6. **Çok dilli otomatik algılama** — mesaj dilini algıla, o dilde yanıt ver

### 5.3 Triage v2 Sistem Prompt'u

```typescript
// lib/agents/triage.ts — v2 system prompt

export const TRIAGE_V2_SYSTEM_PROMPT = `You are an expert clinical triage assistant for thediagnostic — a medical technology platform that connects patients in the UK, Europe, and Middle East with advanced diagnostic devices at partner hospitals in Turkey, Germany, and the UAE.

YOUR ROLE:
- Recommend the most appropriate diagnostic device/scan based on patient symptoms
- Compare NHS availability and UK private pricing with thediagnostic pricing
- Provide urgency assessment
- Always recommend the patient speaks with a qualified clinician before proceeding with any scan

AVAILABLE DEVICES (use the code exactly):
MRI: mri_3t, mri_3t_prisma, mri_wide_bore, mri_intraoperative, mri_whole_body
CT: ct_flash, ct_force, ct_photon_counting, ct_somatom_drive, ct_sliding
Nuclear: pet_ct, spect_ct, pet_mri
Mammography: mammo_3d_tomo, mammo_2d_digital, breast_ultrasound_4d
Radiosurgery: gamma_knife_esprit, gamma_knife_perfexion, mr_linac, truebeam, versa_hd
Robotic Surgery: da_vinci, rosa_brain, mako_ortho, navio_knee
Angiography: dsa_angiography, robotic_angio, trinias_opera
Ophthalmology: smile_pro_laser, femtosecond_laser, excimer_laser, femto_cataract
Fertility: embryoscope, ri_witness
Urology: eswl, prostat_sba, prostate_biopsy_3d
Other: pet_ct (always prioritise for oncology)

URGENCY LEVELS:
- "emergency": Symptoms suggesting stroke, MI, acute abdomen — DO NOT BOOK, advise 999/A&E immediately
- "urgent": Active cancer concern, neurological decline, unexplained weight loss — book within days
- "soon": Significant unexplained symptoms — book within 2 weeks
- "routine": Monitoring, screening, health check — book within weeks

LANGUAGE: Detect the language of the patient's input and respond entirely in that language.
Supported: English (en), Turkish (tr), Arabic (ar).

OUTPUT FORMAT (strict JSON only, no markdown):
{
  "urgency": "emergency|urgent|soon|routine",
  "urgencyLabel": "localised label text",
  "isEmergency": boolean,
  "recommendedDevices": [
    {
      "code": "device_code",
      "name": "localised device name",
      "reason": "why this device for this patient (2 sentences)",
      "priceFromGbp": number,
      "nhsWaitLabel": "e.g. 18-24 weeks on NHS",
      "thediagnosticWaitLabel": "e.g. Available in 3-7 days"
    }
  ],
  "clinicalSummary": "2-3 sentence patient-friendly summary",
  "shouldSeeGPFirst": boolean,
  "gpNote": "optional note if GP visit recommended",
  "suggestedDestination": "Istanbul|Ankara|Berlin|Dubai|null",
  "estimatedSavingPct": number,
  "redFlagWarning": "optional red flag text if emergency symptoms detected",
  "locale": "en|tr|ar",
  "disclaimer": "This is not a diagnosis. Always consult a qualified physician."
}

IMPORTANT RULES:
1. Never diagnose — only recommend scan types
2. If emergency symptoms: set isEmergency=true, urgency="emergency", include A&E/112/999 advice
3. Always include disclaimer
4. Do not recommend radiosurgery (gamma_knife, mr_linac, truebeam) without confirmed diagnosis — only say "may be appropriate if diagnosis confirmed"
5. For oncology: always recommend pet_ct as part of staging
6. For neurological symptoms: recommend mri_3t_prisma minimum
7. Be warm and empathetic — patients are often anxious`
```

### 5.4 Aciliyet Yönlendirme Akışı

```
Semptom Girişi
     │
     ▼
AI Triaj (Claude API)
     │
     ├─ isEmergency=true ──► WhatsApp human handoff + 999/112 advisory
     │
     ├─ urgency=urgent ──────► Öncelikli slot araması + concierge CTA
     │
     ├─ urgency=soon ────────► Standart booking flow
     │
     └─ urgency=routine ─────► Self-serve booking
```

---

## 6. KLİNİK ORTAKLIK MODELİ (Clinic Partnership Model)

### 6.1 Klinik Başvuru Süreci

```
1. Klinik başvurur: /partners sayfasından form
2. Doğrulama (48 saat): Lisans, akreditasyon, cihaz listesi
3. Onay + sözleşme: Dijital imza
4. Cihaz yükleme: Klinik portal üzerinden
5. Slot yükleme: API veya CSV import
6. Fiyat belirleme: Klinik kendi fiyatını girer
7. Go-live: İnceleme + yayın (72 saat)
```

### 6.2 SLA Gereksinimleri

| SLA | Standart | Premium |
|---|---|---|
| Slot onay süresi | 24 saat | 4 saat |
| Rapor teslim | 48 saat | 24 saat |
| GP mektubu | 72 saat | 48 saat |
| Tercüman hizmeti | Talep üzeri | Dahil |
| Konsiyer desteği | Temel | Premium |
| Komisyon oranı | %15 | %12 |

### 6.3 Klinik Komisyon Yapısı

```
İlk £50k/ay:  %15 komisyon
£50k - £150k: %13 komisyon
£150k+:       %11 komisyon

Aylık sabit ücret: YOK
Listeleme ücreti:  YOK
Öne çıkma özelliği: Aylık £299 (isteğe bağlı)
```

### 6.4 Klinik Portal Özellikleri

```typescript
// Klinik Portal'ın içermesi gereken özellikler

interface ClinicPortalFeatures {
  slotManagement: {
    addSlots: boolean           // Manuel slot ekleme
    bulkImport: boolean         // CSV import
    syncCalendar: boolean       // iCal/Google Calendar sync
    autoRelease: boolean        // Son 72 saatte boş slotları otomatik pazarla
  }
  bookingManagement: {
    viewIncoming: boolean       // Gelen rezervasyonlar
    confirmReject: boolean      // Onayla/Reddet
    patientDocs: boolean        // Hasta belgelerine erişim
    sendPrep: boolean           // Hazırlık talimatları gönder
  }
  reporting: {
    uploadReport: boolean       // PDF rapor yükleme
    gpLetterGen: boolean        // AI GP mektubu üretici
    secondOpinion: boolean      // İkinci görüş talebi
  }
  analytics: {
    revenue: boolean            // Gelir raporu
    occupancyRate: boolean      // Doluluk oranı
    patientDemographics: boolean // Hasta demografisi
    conversionFunnel: boolean   // Dönüşüm hunisi
  }
}
```

---

## 7. BOŞ SLOT PAZARLAMA MOTORU (Empty Slot Marketing Engine)

### 7.1 Nasıl Çalışır?

Klinikler boş slotlarını sisteme yükler. AI, bu slotlara en uygun hastalara otomatik ulaşır.

```
Boş Slot Yüklendi
      │
      ▼
Slot Analizi (cihaz, tarih, saat, fiyat, klinik)
      │
      ▼
Hasta Eşleştirme (triaj geçmişi + watchlist + lokasyon + urgency)
      │
      ├─ E-posta Kampanyası (Resend)
      ├─ WhatsApp Mesajı (Twilio)
      └─ Push Notification (web push)
```

### 7.2 Slot Pazarlama AI Prompt'u

```typescript
// lib/agents/slot-marketing.ts

export const SLOT_MARKETING_SYSTEM_PROMPT = `You are a medical slot marketing assistant for thediagnostic.

Your job: Write personalised, warm outreach messages for patients who have previously searched for or expressed interest in specific scan types. You are notifying them that a relevant appointment slot has become available.

CONTEXT YOU RECEIVE:
- Patient's triage result (symptoms, recommended scan)
- Available slot details (device, clinic, date, price)
- Patient's language preference
- Days since patient last visited (urgency context)

MESSAGE REQUIREMENTS:
- Warm, empathetic tone — not salesy
- Mention the specific device by name
- Include the time saving vs NHS (always lead with this)
- Keep WhatsApp messages under 160 characters for the headline
- Email subject lines: curiosity-driven, personalised
- Never pressure — offer the option to decline
- Include 1-click booking link

OUTPUT:
{
  "emailSubject": "string",
  "emailBody": "HTML string",
  "whatsappMessage": "plain text under 160 chars for headline + link",
  "pushTitle": "string (under 50 chars)",
  "pushBody": "string (under 100 chars)"
}`

export interface SlotMarketingInput {
  patient: {
    firstName: string
    locale: 'en' | 'tr' | 'ar'
    triageResult: {
      recommendedDevices: { code: string; name: string }[]
      urgency: string
      daysSinceTriage: number
    }
  }
  slot: {
    device: { code: string; name: string; nameTr: string; nameAr: string }
    clinic: { name: string; city: string; country: string; rating: number }
    dateTime: string
    priceGbp: number
    originalPriceGbp: number  // UK eşdeğer
    nhsWaitWeeks: number
    bookingUrl: string
  }
}
```

### 7.3 Geo-Targeting Stratejisi

```typescript
// Coğrafi hedefleme mantığı

const GEO_TARGETING_RULES = {
  // Kuzey İngiltere → Manchester/Leeds'den İstanbul'a uçmak Londra'dan ucuz olabilir
  northEngland: {
    airports: ['MAN', 'LBA', 'NCL'],
    preferredHub: 'Istanbul',
    flightTimeHours: 3.5,
  },
  // Londra → İstanbul en hızlı rota
  london: {
    airports: ['LHR', 'LGW', 'STN', 'LCY'],
    preferredHub: 'Istanbul',
    flightTimeHours: 3.5,
  },
  // Orta Doğu → Dubai/Ankara
  mena: {
    preferredHub: 'Dubai',
    alternativeHub: 'Istanbul',
  },
  // Almanya → İstanbul direkt veya Ankara
  germany: {
    airports: ['FRA', 'MUC', 'BER'],
    preferredHub: 'Istanbul',
    flightTimeHours: 3,
  },
}
```

---

## 8. UK STANDART RAPORLAMA (UK-Standard Reporting)

### 8.1 GP Referral Letter AI Üreticisi

Her rapor için NHS GP'lerine gönderilecek standart referral letter üretilir.

```typescript
// lib/agents/gp-letter.ts

export const GP_LETTER_SYSTEM_PROMPT = `You are a medical report writer specialising in UK NHS GP referral letters for thediagnostic, a UK-registered medical imaging broker.

ROLE: Generate NHS-standard GP referral letters summarising diagnostic imaging findings from overseas partner clinics.

FORMAT REQUIREMENTS (strict):
1. Use NHS letter format with full GMC-style header
2. Date format: DD Month YYYY (e.g. 2 June 2026)
3. Start with: "Dear Dr [GP Name]," or "Dear General Practitioner," if unknown
4. Include: Patient demographics, referring clinical details, scan findings summary, radiologist credentials, clinic accreditation (JCI/ISO)
5. Recommendation section: clinical follow-up suggestions
6. End: "Yours sincerely," followed by: thediagnostic Medical Affairs team + contact
7. Footer: "This report was performed at [Clinic Name], [City], [Country] — JCI Accredited [if applicable]"
8. Maximum 1 A4 page (approximately 400 words)

TONE: Clinical, professional, factual. Do not editorialise.
LANGUAGE: Always English (for NHS GPs)

OUTPUT: Plain text formatted as a letter (no markdown in the letter itself)

DISCLAIMER TO INCLUDE: "The imaging and reporting were performed by qualified radiologists holding [country] medical licences. All findings should be reviewed by the patient's treating physician. thediagnostic acts as a booking and care coordination service only."`

export interface GpLetterInput {
  patient: {
    fullName: string
    dateOfBirth: string
    nhsNumber?: string
    address: string
    gpName?: string
    gpPractice?: string
  }
  scan: {
    deviceName: string
    bodyPart: string
    datePerformed: string
    clinicName: string
    clinicCity: string
    clinicCountry: string
    clinicAccreditation: string[]
    radiologistName: string
    radiologistCredentials: string
  }
  findings: string           // Raw radiologist report text
  clinicalContext: string    // Symptoms / reason for scan
}
```

### 8.2 İkinci Görüş İş Akışı

```
1. Hasta mevcut raporunu yükler (PDF)
2. AI raporu analiz eder (report-summary.ts)
3. Hasta uzmanlık alanını seçer: onkoloji | kardiyoloji | nöroloji
4. thediagnostic anlaşmalı uzman panelinden 3 isim sunar
5. Hasta tercihini seçer
6. Rapor güvenli portal üzerinden uzmana iletilir
7. Uzman 5 iş günü içinde yazılı ikinci görüş bildirir
8. İkinci görüş NHS GP format referral letter ile birlikte sunulur
```

### 8.3 Rapor PDF Şablonu

Her rapor aşağıdaki bölümleri içermelidir:

1. **Kapak Sayfası**: thediagnostic logosu, hasta bilgileri, referans numarası
2. **Klinik Özet**: AI tarafından Türkçe→İngilizce çevrilen sade dil özeti
3. **Ana Bulgular**: Severity-coded (normal/mild/moderate/significant)
4. **Teknik Terimler Sözlüğü**: Hastaya özel açıklamalar
5. **GP Referral Letter**: NHS standart formatında
6. **Klinik Akreditasyon Sayfası**: JCI, ISO sertifikaları
7. **Sonraki Adımlar**: Konkret öneriler listesi

---

## 9. SEO/GEO STRATEJİSİ (SEO / GEO Strategy)

### 9.1 Programmatik SEO Sayfaları

Her kombinasyon için otomatik sayfa üretilir:

```typescript
// app/[locale]/scan/[device]/page.tsx — cihaz sayfaları
// Örnek URL'ler:
// /en/scan/pet-ct
// /en/scan/pet-ct/turkey
// /en/scan/pet-ct/istanbul
// /en/scan/pet-ct/istanbul/acıbadem
// /en/compare/pet-ct-vs-mri-whole-body
// /en/destinations/istanbul
// /en/conditions/lung-cancer-staging

const PROGRAMMATIC_PAGE_TYPES = [
  'device_overview',           // /scan/[device]
  'device_destination',        // /scan/[device]/[country]
  'device_city',               // /scan/[device]/[city]
  'device_clinic',             // /scan/[device]/[city]/[clinic]
  'device_comparison',         // /compare/[device1]-vs-[device2]
  'destination_overview',      // /destinations/[city]
  'condition_scan',            // /conditions/[condition]
  'cost_comparison',           // /cost/[device]-uk-vs-turkey
]
```

### 9.2 Hedef Anahtar Kelimeler (Kategori Bazlı)

```
Yüksek hacimli, düşük rekabetli hedefler:
- "pet ct scan private uk" (CPC: £8.50, 2.4k/ay)
- "pet ct scan cost uk" (CPC: £7.20, 3.8k/ay)
- "gamma knife treatment cost" (CPC: £12.40, 890/ay)
- "mri scan turkey" (CPC: £3.20, 1.1k/ay)
- "pet scan turkey cost" (CPC: £4.80, 720/ay)
- "photon counting ct scan uk" (CPC: £9.10, 340/ay)
- "robotic knee surgery turkey" (CPC: £6.70, 2.1k/ay)
- "whole body mri london" (CPC: £5.40, 4.2k/ay)
- "second opinion oncology uk" (CPC: £11.20, 1.6k/ay)
```

### 9.3 GEO (Generative Engine Optimisation)

AI arama motorları (ChatGPT, Perplexity, Google AI Overviews) için optimizasyon:

```markdown
Strateji:
1. "Best X in Turkey" formatında soru-cevap içerik: 
   "What is the best hospital for PET-CT in Turkey?"
   → thediagnostic featured snippet içeriği

2. Structured data (Schema.org):
   - MedicalOrganization
   - MedicalProcedure  
   - MedicalDevice
   - FAQPage (GEO için kritik)
   - Review/AggregateRating

3. Authoritative kaynaklara atıflar:
   - NICE guidelines referansları
   - NHS wait time istatistikleri
   - JCI akreditasyon linkleri

4. "People Also Ask" hedefleme:
   - "How much does a PET scan cost in Turkey?"
   - "Is medical tourism to Turkey safe?"
   - "How long does a full body MRI take?"
```

### 9.4 Yerel SEO (Hedef Şehirler)

```typescript
const TARGET_CITIES_SEO = [
  // Türkiye
  { city: 'Istanbul', population: 15_000_000, targetQuery: 'istanbul medical tourism' },
  { city: 'Ankara', population: 5_500_000, targetQuery: 'ankara private hospital' },
  { city: 'Izmir', population: 4_100_000, targetQuery: 'izmir hospital scan' },
  // Avrupa
  { city: 'Berlin', population: 3_600_000, targetQuery: 'berlin diagnostik zentrum' },
  { city: 'Amsterdam', population: 900_000, targetQuery: 'privekliniek scan amsterdam' },
  // MENA
  { city: 'Dubai', population: 3_300_000, targetQuery: 'dubai medical scan center' },
]
```

---

## 10. PAZARLAMA PLANI (Marketing Plan)

### 10.1 Faz 1: Ön Lansman (1. Ay — Pre-Launch)

**Hedef**: 500 e-posta kaydı, 3 klinik ortaklığı

```
Kanallar:
□ Landing page (thediagnostic.co.uk) — "Erken Erişim" formu
□ Reddit UK: r/NHS, r/HealthUK, r/UKTV (organik, değer odaklı)
  → "Has anyone had a PET scan abroad? Share your experience"
  → Paylaşılacak içerik: NHS bekleme listesi karşılaştırması
□ LinkedIn: Klinik ortaklık outreach (outreach-email.ts kullan)
□ Acıbadem, Memorial, Florence Nightingale'e doğrudan başvuru
□ WhatsApp Beta Grubu: İlk 50 kullanıcı (early adopter community)
```

### 10.2 Faz 2: Lansman (2-3. Ay)

**Hedef**: Aylık 50 rezervasyon, £25k GMV

```
Google Ads:
□ Brand + competitor keywords (NHS wait times)
□ Condition-specific: "lung cancer scan", "brain tumour scan turkey"
□ Smart bidding, hedef CPA: £45

Reddit Ads:
□ r/NHS, r/UKPersonalFinance, r/CancerSupport
□ Carousel format: "NHS wait vs thediagnostic wait"

Meta Ads:
□ UK: 40-65 yaş, sağlık kategorisi ilgi alanları
□ Lookalike: Sağlık sigortası + private pay davranışı
□ Retargeting: Site ziyaretçileri, triage tamamlamayanlar

Health Forums & Communities:
□ PatientInfo.co.uk — editorial partnership
□ Cancer Research UK forums — soru-cevap katkısı
□ Mumsnet — fertility, women's health konuları
□ Reddit MENA health communities (Arapça içerik)
```

### 10.3 Faz 3: Ölçekleme (4-6. Ay)

**Hedef**: Aylık 200+ rezervasyon, £100k+ GMV

```
B2B (Klinik → Klinik Ortaklığı):
□ LinkedIn Sales Navigator: Türk hastane CEO/COO'larına outreach
□ Medical Tourism Conferences: IMTJ Summit, World Medical Tourism Congress
□ UK GP Practices: "Referral partner" programı — GPs referral komisyonu alır

Affiliate:
□ UK health bloggers
□ Medical tourism agencies
□ Expat communities (Türkiye'deki İngiliz expat'lar)

PR:
□ Target yayınlar: The Times Health, Guardian Healthcare, Pulse (GPs için)
□ Haber kancası: "NHS waiting list alternatives" 
□ Patient success story content (GDPR uyumlu)
```

### 10.4 B2B Klinik Outreach Stratejisi

```typescript
// lib/agents/outreach-email.ts güncellemesi için içerik çerçevesi

const CLINIC_OUTREACH_VALUE_PROPS = {
  emptySlots: "Boş scanner slotlarınızı gelir kaynağına dönüştürün",
  international: "İngiliz ve Avrupalı hasta akışı oluşturun",
  noExclusivity: "Mevcut referral ağlarınızla çakışmaz",
  commissionOnly: "Sabit ücret yok — sadece başarılı rezervasyondan komisyon",
  technology: "AI destekli slot pazarlama ile doluluk oranınızı artırın",
}

// E-posta A/B test versiyonları:
// Versiyon A: ROI odaklı ("£X aylık ek gelir potansiyeli")
// Versiyon B: Teknoloji odaklı ("AI ile Avrupa pazarına açılın")
// Versiyon C: Sosyal kanıt ("Acıbadem 3 ayda 120 İngiliz hasta bookingı")
```

---

## 11. GELİŞTİRME YOL HARİTASI (Development Roadmap)

### Sprint 1 (1-2. Hafta): Temel Altyapı

```
□ thediagnostic Next.js 16 projesi kurulumu (scanbook'tan fork)
□ DB şeması migration: schema.sql çalıştır
□ next-intl entegrasyonu (EN/TR/AR)
□ devices.config.ts dosyası oluştur (70+ cihaz)
□ NextAuth v5 kurulumu (credentials + Google)
□ Stripe multi-currency kurulumu
□ Temel layout: header, footer, locale switcher
□ Homepage skeleton
□ Vercel deploy + domain bağlama (thediagnostic.co.uk)
```

### Sprint 2 (3-4. Hafta): Triage & Cihaz Sayfaları

```
□ Triage v2 implement (yeni system prompt + 70 cihaz)
□ Triage UI: semptom input → animasyonlu analiz → cihaz önerisi
□ Cihaz detay sayfaları: /scan/[device] (programmatik)
□ Cihaz karşılaştırma: /compare/[device1]-vs-[device2]
□ Klinik liste sayfası: /clinics
□ Klinik profil sayfası: /clinic/[slug]
□ Şehir destinasyon sayfaları: /destinations/[city]
□ Temel arama: cihaz adı / semptom / şehir
```

### Sprint 3 (5-6. Hafta): Booking Flow

```
□ 4-adım booking wizard:
   1. Cihaz & klinik seçimi
   2. Tarih & saat seçimi (slot availability API)
   3. Hasta bilgileri + medikal geçmiş
   4. Ödeme (Stripe Checkout)
□ Stripe webhook: booking confirmation
□ Email onayı (Resend)
□ Hasta dashboard: /patient
□ Booking confirmation sayfası
□ Concierge add-on: uçuş + otel checkout'a ekleme
```

### Sprint 4 (7-8. Hafta): Klinik Portal & Slot Motoru

```
□ Klinik portal: /clinic-portal
□ Slot yönetimi: manuel ekleme + CSV import
□ Boş slot pazarlama motoru (slot-marketing.ts)
□ Klinik analytics dashboard
□ WhatsApp webhook: Twilio entegrasyonu
□ WhatsApp intent detection (intent.ts genişletme)
□ Human handoff: urgent case → admin WhatsApp
```

### Sprint 5 (9-10. Hafta): Raporlama & AI

```
□ Rapor upload (AWS S3)
□ Rapor özet AI (report-summary.ts)
□ GP Letter üretici (gp-letter.ts — YENİ)
□ PDF rapor şablonu (React PDF veya Puppeteer)
□ İkinci görüş iş akışı
□ Patient follow-up e-posta dizisi (patient-followup.ts)
□ Admin panel: bookings, clinics, users yönetimi
```

### Sprint 6 (11-12. Hafta): SEO & Launch

```
□ Programmatik SEO sayfaları (metadata, OG tags)
□ Schema.org structured data (MedicalProcedure, MedicalDevice)
□ Sitemap.xml (dinamik)
□ Blog altyapısı (/blog)
□ İlk 10 SEO makalesi
□ Google Search Console + Analytics kurulumu
□ PostHog event tracking
□ Sentry hata izleme
□ Performance audit (Core Web Vitals)
□ Soft launch + ilk klinik ortakları aktif
```

---

## 12. AI PROMPT KÜTÜPHANESİ (AI Prompt Library)

### 12.1 Triaj v2 (Triage v2)

Bkz. Bölüm 5.3 — `TRIAGE_V2_SYSTEM_PROMPT`

### 12.2 Slot Pazarlama (Slot Marketing)

Bkz. Bölüm 7.2 — `SLOT_MARKETING_SYSTEM_PROMPT`

### 12.3 GP Mektubu (GP Letter Generator)

Bkz. Bölüm 8.1 — `GP_LETTER_SYSTEM_PROMPT`

### 12.4 Rapor Özeti (Report Summary)

```typescript
// lib/agents/report-summary.ts — Mevcut, güncelleme notları

// EKLENECEKLER:
// 1. Türkçe rapor → İngilizce özet desteği (otomatik çeviri dahil)
// 2. Severity renk kodlaması (normal=green, mild=yellow, moderate=orange, significant=red)
// 3. NHS follow-up öneri eşleme
// 4. Görüntü açıklama desteği (multimodal Claude API)

export const REPORT_SUMMARY_V2_PROMPT = `You are a medical report summarisation assistant for thediagnostic.

CRITICAL: The report may be in Turkish. If so, translate findings to English in your output.

YOUR TASKS:
1. Summarise the radiology report in plain patient-friendly English
2. Extract and severity-code each key finding
3. Draft a UK NHS-standard GP referral letter
4. Explain all technical terms simply
5. Map findings to recommended NHS follow-up actions

SEVERITY CODES:
- normal: No clinical concern
- mild: Monitoring suggested, no urgent action
- moderate: Follow-up recommended within 4 weeks  
- significant: Urgent GP/specialist review required

Always include: "This summary is AI-generated. All findings must be reviewed by a qualified physician."`
```

### 12.5 Klinik Outreach (Clinic Outreach)

```typescript
// lib/agents/outreach-email.ts — thediagnostic versiyonu için sistem prompt

export const CLINIC_OUTREACH_SYSTEM_PROMPT = `You are writing a B2B partnership outreach email on behalf of thediagnostic — a UK-registered medical technology platform that connects international patients (UK, Europe, Middle East) with advanced diagnostic centres.

TARGET RECIPIENT: Hospital/Clinic CEO, Medical Director, or Business Development Manager

TONE: Professional, peer-to-peer, not salesy. Medical context requires trust-building.

EMAIL STRUCTURE:
1. Hook (1 sentence): Specific data point about their clinic or market opportunity
2. What we do (2 sentences): Platform + patient source
3. Value proposition (3 bullet points): Revenue, no exclusivity, fast setup
4. Social proof (1 sentence): Reference comparable clinic if available
5. CTA (1 sentence): "15-minute call this week?"
6. Signature: thediagnostic Partnerships team

PERSONALISATION REQUIRED:
- Use clinic name and city
- Reference specific devices they have if known
- Reference the most relevant patient demographic (UK patients for Turkish clinics)

Max 200 words. No attachments mentioned. One CTA only.`
```

### 12.6 WhatsApp Intent Classifier (Mevcut + Güncelleme)

```typescript
// lib/agents/whatsapp/intent.ts — mevcut kod iyi, şu eklenti yapılacak

// YENİ INTENT EKLENECEK:
// 'second_opinion': patient has a report, wants second opinion
// 'concierge_travel': asking about flights, hotel, transfer
// 'interpreter_needed': asking about medical translator
// 'insurance_query': asking about insurance coverage
// 'emergency': symptoms suggesting immediate attention needed

export const WHATSAPP_DISPATCHER_LOGIC = {
  book_scan: '→ Triage flow link gönder',
  check_status: '→ Booking ref ile DB sorgusu, durum raporu',
  ask_price: '→ İlgili cihaz fiyat sayfası linki',
  need_concierge: '→ Concierge ekibine yönlendirme',
  report_query: '→ Rapor portal linki gönder',
  medical_question: '→ Triage başlat',
  second_opinion: '→ İkinci görüş başvuru formu linki',
  concierge_travel: '→ Concierge paketi sayfası linki',
  emergency: '→ 999/112 ACİL YÖNLENDIR + human handoff',
  human_needed: '→ Admin WhatsApp grubuna forward',
}
```

### 12.7 Concierge Paket Öneri Promptu

```typescript
export const CONCIERGE_RECOMMENDATION_PROMPT = `You are a medical travel concierge assistant for thediagnostic.

A patient has booked a medical scan at [CLINIC] in [CITY] on [DATE].

Based on their profile (origin city: [ORIGIN], travel date: [DATE], travel party: [SIZE]),
recommend a personalised concierge package including:

1. Flight recommendation (carrier, estimated cost, booking tip)
2. Hotel recommendation (distance from clinic, star rating, estimated cost)
3. Airport transfer (private car service)
4. Medical translator (if locale is tr or ar, flag as included)
5. Visa requirements (UK passport holders: Turkey → e-visa, EU → no visa)
6. Estimated total trip cost breakdown

Present in the patient's language ([LOCALE]).
Keep it warm and practical — this may be their first medical trip abroad.`
```

---

## 13. KPI VE BAŞARI METRİKLERİ (KPIs & Success Metrics)

### 13.1 Temel KPI'lar

| Metrik | Ay 1 Hedef | Ay 3 Hedef | Ay 6 Hedef | Ay 12 Hedef |
|---|---|---|---|---|
| Aylık rezervasyon | 10 | 50 | 200 | 500 |
| Aylık GMV (£) | £8k | £40k | £160k | £400k |
| Ortalama sipariş değeri | £800 | £800 | £800 | £850 |
| Triage → Booking dönüşümü | 3% | 5% | 7% | 9% |
| Klinik sayısı | 3 | 8 | 20 | 40 |
| NPS | — | 45 | 60 | 70 |
| Organik trafik | 500/ay | 5k/ay | 25k/ay | 80k/ay |
| Email bülten | 500 | 3k | 10k | 30k |

### 13.2 Funnel Metrikleri

```
Ziyaretçi → Triage başlatma:         Hedef 15%
Triage → Cihaz sayfası görüntüleme:  Hedef 60%
Cihaz sayfası → Booking başlatma:    Hedef 12%
Booking başlatma → Ödeme tamamlama:  Hedef 40%
Ödeme → Appointment gerçekleşme:     Hedef 85%
Appointment → Rapor teslim:          Hedef 95%
Rapor → NPS anketi doldurma:         Hedef 30%
```

### 13.3 Klinik Tarafı KPI'lar

| Metrik | Hedef |
|---|---|
| Klinik başvuru → Onay oranı | %70 |
| Ortalama slot onay süresi | <24 saat |
| Klinik aylık ortalama geliri | £8,500 |
| Klinik retention (12 ay) | %80 |
| Boş slot doldurma oranı (pazarlama sonrası) | %35 |

### 13.4 AI Performans Metrikleri

| AI Agent | Metrik | Hedef |
|---|---|---|
| Triage v2 | Doğru cihaz önerisi (klinisyen değerlendirmesi) | >85% |
| Triage v2 | Emergency doğru tespiti | >99% |
| GP Letter | GP onaylama oranı | >80% |
| Slot Marketing | E-posta açılma oranı | >28% |
| Slot Marketing | WhatsApp cevap oranı | >35% |
| WhatsApp Intent | Doğru intent tespiti | >90% |
| Report Summary | Hasta memnuniyeti (anket) | >4.5/5 |

### 13.5 Finansal Hedefler (12 Aylık)

```
Yıl 1 GMV Hedefi:    £2.4M
Yıl 1 Gelir (komisyon %15): £360k
Yıl 1 Opex:          £220k (team + infra + marketing)
Yıl 1 Net:           £140k
Yıl 2 GMV Hedefi:    £8M
Yıl 2 Gelir:         £1.2M
```

---

## 14. ÇEVİRI VE LOKALIZASYON KILAVUZU (i18n Guide)

### 14.1 Desteklenen Locale'ler

```typescript
// middleware.ts
export const locales = ['en', 'tr', 'ar'] as const
export const defaultLocale = 'en'

// IP tabanlı locale yönlendirme:
// TR IP → /tr/...
// AE/SA/QA/KW IP → /ar/...
// Diğer → /en/...
```

### 14.2 Kritik Çeviri Notları

```
Tıbbi terimlerin tutarlılığı için sözlük:
- "scan" → TR: "tarama", AR: "مسح"
- "booking" → TR: "rezervasyon", AR: "حجز"
- "report" → TR: "rapor", AR: "تقرير"
- "referral letter" → TR: "sevk mektubu", AR: "خطاب الإحالة"
- "second opinion" → TR: "ikinci görüş", AR: "رأي ثانٍ"
- "concierge" → TR: "konsiyer", AR: "خدمة الكونسيرج"
- "urgency" → TR: "aciliyet", AR: "إلحاح"

RTL (Arapça) için CSS:
- html[dir="rtl"] { ... }
- Tailwind: rtl:text-right, rtl:flex-row-reverse
- next-intl otomatik yönlendirme yapar
```

---

## 15. GÜVENLİK VE UYUMLULUK (Security & Compliance)

### 15.1 Tıbbi Veri Güvenliği

```
□ GDPR: Tüm hasta verileri AB/UK veri işleme kurallarına uygun
□ Veri saklama: Hasta verileri 7 yıl (tıbbi kayıt standartı)
□ Şifreleme: AES-256 (at rest), TLS 1.3 (in transit)
□ S3: Rapor PDF'leri özel bucket, pre-signed URL (15 dk geçerli)
□ PCI DSS: Kart verileri Stripe'ta, platformda saklanmaz
□ 2FA: Klinik portalı için zorunlu
□ Audit log: Tüm veri erişimleri loglanır
```

### 15.2 Tıbbi Sorumluluk Sınırı

```
thediagnostic bir tıbbi hizmet sağlayıcı DEĞİLDİR.
Hukuki pozisyon: "Booking ve koordinasyon platformu"
Her AI çıktısında disclaimer zorunludur.
GP Letter: "booking service" olarak imzalanır, klinisyen imzası değil
```

---

## 16. ORTAM DEĞİŞKENLERİ (Environment Variables)

```bash
# .env.local (thediagnostic)

# Veritabanı
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="https://thediagnostic.co.uk"
NEXTAUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# AI
ANTHROPIC_API_KEY="..."

# Ödeme
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="..."
FROM_EMAIL="care@thediagnostic.co.uk"

# WhatsApp
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
TWILIO_WHATSAPP_NUMBER="whatsapp:+447700000000"
ADMIN_WHATSAPP="whatsapp:+44..."

# Storage
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="thediagnostic-reports"
AWS_REGION="eu-west-2"

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="..."
SENTRY_DSN="..."
```

---

## 17. ANTİGRAVİTE İÇİN GELİŞTİRİCİ NOTLARI (Developer Notes for Antigravite)

### 17.1 Her Yeni Özelliği Oluştururken Kontrol Listesi

```
□ Çok dilli mi? → next-intl messages/{en,tr,ar}.json güncelle
□ SEO kritik mi? → generateMetadata() ekle, OG tags dahil
□ AI kullanıyor mu? → ANTHROPIC_API_KEY env var, hata fallback ekle
□ Ödeme içeriyor mu? → Stripe multi-currency, GBP base
□ Rapor/belge mi? → AWS S3 + pre-signed URL pattern
□ WhatsApp tetikliyor mu? → Twilio + admin handoff mantığı
□ Tıbbi veri mi? → Audit log + GDPR retention tag
□ Klinik portal mı? → Role check: clinic_admin
□ Admin panel mi? → Role check: admin
```

### 17.2 Kritik Kod Patternleri

```typescript
// Multi-currency price display
import { formatPrice } from '@/lib/utils/currency'

// Her zaman GBP base, anlık kur ile convert:
const price = formatPrice(device.ourPriceFromGbp, userCurrency, exchangeRates)

// AI çağrısı pattern (timeout + retry):
const response = await Promise.race([
  client.messages.create({ ... }),
  new Promise((_, reject) => setTimeout(() => reject(new Error('AI timeout')), 10000))
])

// Locale-aware routing:
import { useLocale } from 'next-intl'
const locale = useLocale() // 'en' | 'tr' | 'ar'

// Database pattern (postgres.js):
import sql from '@/lib/db'
const clinics = await sql`
  SELECT * FROM clinics 
  WHERE country = ${country} AND is_active = true
  ORDER BY is_featured DESC, rating DESC
`
```

### 17.3 Bilinen Kısıtlamalar ve Geçici Çözümler

```
1. next-intl + App Router: generateStaticParams ile locale'leri açıkça listele
2. Stripe multi-currency: minimum charge tutarları dövize göre değişir (TRY min 50)
3. Claude API: Rate limit 100k token/dk — slot pazarlama için queue kullan
4. WhatsApp Twilio: Sandbox'ta test, prod için Business Verification gerekli
5. Arapça PDF: react-pdf için Arabic font (Amiri veya Noto Sans Arabic) ekle
6. RTL layout: Tailwind v4'te rtl: prefix tam çalışıyor, custom CSS minimum tut
```

---

*Bu belge yaşayan bir doküman olarak güncellenir. Her sprint sonunda KPI ve yol haritası bölümleri revize edilmelidir.*

*Son Güncelleme: 2 Haziran 2026*
*Hazırlayan: thediagnostic Ürün Ekibi*
*Belge ID: TD-AGV-MP-v2.0*

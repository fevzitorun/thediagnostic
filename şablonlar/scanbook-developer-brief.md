# ScanBook — Developer Brief
**The Connective UK Ltd** · Confidential · March 2025

---

## Projeyi tek cümleyle anlat

ScanBook, NHS bekleme listelerinde bekleyen UK hastalarını özel tanı görüntüleme merkezlerine (MRI, CT, Ultrasound, vb.) bağlayan bir **booking marketplace**. Booking.com'un sağlık versiyonu.

---

## Ne inşa ediyoruz?

### Faz 1 — MVP (Hedef: 15 Nisan 2025)
Üç temel ekran:

1. **Patient Side** → scanbook.uk
   - Scan tipi + şehir + vücut bölgesi seçimi
   - Klinik listeleme (fiyat, mesafe, müsaitlik)
   - Online booking + Stripe ödeme
   - Onay emaili (Resend)

2. **Clinic Partner Portal** → scanbook.co.uk/partners
   - Klinik kayıt formu
   - Slot yönetimi (manuel başlangıç)
   - Rezervasyon görüntüleme + onay
   - Ödeme takibi

3. **Admin Panel** → internal
   - Klinik onaylama
   - Booking takibi
   - Manuel müdahale

---

## Tech Stack (karar verildi, değişmez)

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js |
| Payments | Stripe Connect |
| Email | Resend.com |
| SMS | Twilio |
| Hosting | Vercel (frontend) + Railway (DB) |
| Repo | GitHub — `fevzitorun/scanbook-uk` (Private) |

**Tahmini aylık hosting maliyeti: ~£75**

---

## Dizin yapısı (hedef)

```
scanbook-uk/
├── app/
│   ├── page.tsx              ← Ana sayfa (hasta landing)
│   ├── search/               ← Arama + klinik listeleme
│   ├── clinic/[id]/          ← Klinik profil sayfası
│   ├── book/                 ← Booking akışı
│   ├── partners/             ← Klinik partner girişi
│   └── admin/                ← Admin panel
├── components/
├── lib/
│   ├── db.ts                 ← Prisma client
│   └── stripe.ts             ← Stripe helpers
└── prisma/
    └── schema.prisma         ← DB modeli
```

---

## Database — Temel modeller

```prisma
model Clinic {
  id          String   @id @default(cuid())
  name        String
  city        String
  address     String
  cqcNumber   String   @unique
  isVerified  Boolean  @default(false)
  slots       Slot[]
  bookings    Booking[]
}

model Slot {
  id        String   @id @default(cuid())
  clinicId  String
  scanType  String
  date      DateTime
  price     Float
  isBooked  Boolean  @default(false)
  clinic    Clinic   @relation(fields: [clinicId], references: [id])
}

model Booking {
  id          String   @id @default(cuid())
  slotId      String   @unique
  patientName String
  patientEmail String
  status      String   @default("pending")
  stripeId    String?
  createdAt   DateTime @default(now())
  clinic      Clinic   @relation(fields: [clinicId], references: [id])
}
```

---

## İlk Sprint — Bu Hafta (yaklaşık 5 gün)

| Gün | Görev |
|-----|-------|
| 1 | GitHub repo clone, Next.js çalışıyor, Vercel deploy |
| 2 | PostgreSQL + Prisma kurulum, Railway DB |
| 3 | Ana sayfa + arama widget (UI hazır — HTML'den taşı) |
| 4 | Klinik listeleme sayfası + dummy data |
| 5 | Stripe test entegrasyonu + booking akışı başlangıcı |

---

## UI Tasarımları

Tüm sayfaların HTML prototipleri **Claude ile hazırlandı** ve sana iletilecek. Bunları Next.js/Tailwind componentlerine taşıyacaksın. Tasarım kararları verildi — yeniden tasarım yapman gerekmiyor.

Ana renkler:
- `#00c896` — ana teal (brand)
- `#0a0a0a` — siyah
- `#f9fafb` — açık gri background
- `#e84393` — pembe (baby scans bölümü)

Font: `Instrument Serif` (başlıklar) + `DM Sans` (body)

---

## Mevcut domain'ler

- `scanbook.uk` ✓ (hasta tarafı)
- `scanbook.co.uk` ✓ (klinik partner tarafı)
- `planbhts.co.uk` ✓ (beklemede)
- `thediagnostic.co.uk` ✓ (beklemede — Faz 2)

Şu an sadece `scanbook.uk` → Vercel'e bağlanacak.

---

## Komisyon modeli (bilgi amaçlı)

- Hasta → Stripe üzerinden **tam ödeme** yapar
- ScanBook → **%12–15 komisyon** keser
- Klinik → kalan tutarı **14 gün** içinde alır
- Stripe Connect kullanılıyor (ayrı klinik hesapları)

---

## Sorular & İletişim

Her şeyi birlikte yapacağız. Bir şey takıldığında Claude'a sorabilirsin, birlikte çözeceğiz. GitHub, Vercel, Railway kurulumları ilk günde birlikte yapılacak.

**Hedef: 15 Nisan 2025'te scanbook.uk'ta ilk gerçek booking.**

---

*Bu brief Claude (Anthropic) ile hazırlanmıştır. Versiyon: 1.0 — 13 Mart 2025*

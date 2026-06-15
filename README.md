# thediagnostic

Medical tech brokerage platform — UK hastalarını Türkiye'deki (HSM Radyoloji,
Acıbadem ve diğer ortak hastane grupları) ileri görüntüleme ve tedavi
merkezlerine yönlendiren, AI destekli triage, çoklu dil (EN/TR/AR) ve
booking + ödeme altyapısına sahip bir Next.js uygulaması.

Genel yol haritası ve modül listesi için [MASTER-PLAN.md](MASTER-PLAN.md) ve
[MODULES.md](MODULES.md)'e bakın.

## Kurulum

```bash
npm install
```

## Ortam Değişkenleri

Proje kökünde bir `.env.local` dosyası oluşturup aşağıdaki değişkenleri girin:

```bash
# Veritabanı (Railway PostgreSQL)
DATABASE_URL=postgresql://postgres:PASSWORD@HOST.railway.app:PORT/railway

# NextAuth
NEXTAUTH_SECRET=          # openssl rand -base64 32
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (email)
RESEND_API_KEY=re_...

# Anthropic (AI agents — triage, report summary, follow-up)
ANTHROPIC_API_KEY=sk-ant-...

# Meta WhatsApp Business API
META_WHATSAPP_TOKEN=
META_WHATSAPP_PHONE_ID=

# Genel
AGENT_SECRET=             # openssl rand -hex 32
NEXT_PUBLIC_SITE_URL=https://thediagnostic.co.uk
```

## Veritabanı Kurulumu

Railway/Postgres üzerinde sırasıyla çalıştırın:

```bash
psql "$DATABASE_URL" -f lib/schema-vercel.sql
psql "$DATABASE_URL" -f lib/schema-migrations.sql
psql "$DATABASE_URL" -f lib/seed.sql
```

## Geliştirme

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinde açılır. `/en`, `/tr`,
`/ar` locale'leri `next-intl` ile yönetilir (varsayılan: `en`).

## Build

```bash
npm run build
npm run start
```

## Proje Yapısı

```
app/
  page.tsx          → Ana sayfa (hero, triage widget, device catalog, ...)
  scan/              → Tarama türü landing sayfaları (PET-CT, GammaKnife, ...)
  clinics/[slug]/    → Klinik detay sayfaları
  book/              → 7 adımlı booking akışı
  clinic/            → Klinik partner portalı
  admin/             → Admin paneli
  api/               → API route'ları (Stripe, slots, AI agents, WhatsApp)
lib/
  agents/            → AI agent'lar (triage, report-summary, follow-up)
  clinics.data.ts    → Klinik verisi
  scanTypes.config.ts → Cihaz/tarama tipi kataloğu
  schema-vercel.sql / schema-migrations.sql / seed.sql → Veritabanı şeması ve örnek veri
i18n/                → next-intl yapılandırması
messages/            → en/tr/ar çeviri dosyaları
```

## Stack

Next.js (App Router) · TypeScript · Tailwind · next-intl · PostgreSQL ·
NextAuth v5 · Stripe · Resend · Anthropic Claude API · Vercel

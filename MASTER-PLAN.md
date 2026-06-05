# ScanBook — Master Plan & Developer Roadmap
**Versiyon: 5.0 · Güncelleme: 19 Mayıs 2026**
**The Connective UK Ltd · Confidential**

---

## MEVCUT DURUM — Tam Tablo

> Site **canlı** → [preview.scanbook.co.uk](https://preview.scanbook.co.uk)
> GitHub aktif · Railway aktif · Vercel aktif · Stripe aktif · Resend aktif

---

### ✅ Altyapı — Tamamlandı

| Bileşen | Durum | Not |
|---|---|---|
| **Vercel** | ✅ Canlı | preview.scanbook.co.uk üzerinde deploy edildi |
| **GitHub** | ✅ Aktif | Geliştirici 1 aydır çalışıyor |
| **Railway PostgreSQL** | ✅ Aktif | `DATABASE_URL` Vercel'e tanımlı |
| **Stripe** | ✅ Aktif | Checkout + webhook çalışıyor |
| **Resend** | ✅ Aktif | Booking confirmation + partner emailler gidiyor |
| **NextAuth v5** | ✅ Aktif | JWT strateji, Credentials + Google OAuth |

---

### ✅ Tamamlandı — Sayfalar ve Rotalar

#### Core & Auth
| Dosya | Açıklama |
|---|---|
| `app/layout.tsx` | DM Sans + Instrument Serif, CSS değişkenleri |
| `app/page.tsx` | Homepage — 11 bölüm, ink/paper renk sistemi |
| `components/Navbar.tsx` | SVG logo, sticky, oturum durumuna göre değişen butonlar |
| `components/Footer.tsx` | Dark navy, 5 kolon |
| `proxy.ts` | /patient, /clinic, /admin, /gp rota koruması (NextAuth) |
| `app/(auth)/login/page.tsx` | Email + Google OAuth |
| `app/(auth)/register/page.tsx` | GDPR onay + doğrulama |
| `app/auth/signout/route.ts` | GET + POST |

#### Arama & Booking
| Dosya | Açıklama |
|---|---|
| `app/search/page.tsx` | Gerçek klinik verisi, filtre paneli |
| `app/clinics/[slug]/page.tsx` | Klinik detay + booking sidebar |
| `app/book/page.tsx` | 5-adım flow, MRI güvenliği, gerçek API çağrıları |
| `app/book/success/page.tsx` | Stripe sonrası onay sayfası |

#### API Rotaları
| Route | Açıklama |
|---|---|
| `api/stripe/checkout` | Stripe Checkout Session oluşturur |
| `api/stripe/webhook` | checkout.session.completed → DB yaz + email gönder |
| `api/bookings/draft` | Callback request booking |
| `api/bookings/confirm` | Session ID ile status → confirmed |
| `api/admin/bookings/[id]/status` | Admin status güncelleme |
| `api/admin/partner-leads/[id]` | Partner lead status/notlar güncelleme |
| `api/clinic/bookings/[id]/status` | Klinik status güncelleme (clinicId ile kısıtlı) |
| `api/partners/apply` | Partner başvurusu → DB + email bildirimi |
| `api/agents/triage` | AI triage (Claude API) |
| `api/agents/clinic-outreach` | CQC API → partner email kampanyası |
| `api/agents/patient-followup` | Gün 3/7/14/30 hasta takip emailleri |
| `api/auth/register` | bcrypt hash + users + profiles tablosu |
| `api/auth/[...nextauth]` | NextAuth handler |

#### Portaller
| Portal | Sayfalar |
|---|---|
| **Patient** | dashboard, bookings/[id], profile, reports |
| **Admin** | dashboard, bookings, bookings/[id], clinics, clinics/[id], clinics/new, patients, finance, marketing, messages, settings, outreach (CRM), agents |
| **Clinic** | redirect, dashboard, appointments, reports, packages, messages, settings |
| **GP** | redirect, dashboard, refer, referrals, earnings, settings |

#### SEO Sayfaları (SSG — 190 statik sayfa)
| Tip | URL Pattern |
|---|---|
| Services hub | `/services` |
| Service detail | `/services/[slug]` × 10 |
| MRI body parts | `/mri-scan/[part]` × 9 |
| CT body parts | `/ct-scan/[part]` × 2 |
| Ultrasound variants | `/ultrasound/[variant]` × 20 |
| X-Ray body parts + cities | `/x-ray/[part]` × 21 |
| City pages | `/mri-scan`, `/ct-scan`, `/ultrasound`, `/pregnancy-scan`, `/baby-scan` × şehir |
| Pregnancy & Baby | `/pregnancy-scan`, `/baby-scan` hub + city |
| For GPs landing | `/for-gps` |
| Partners landing | `/partners` + `/partners/thank-you` |
| Blog scaffold | `/blog`, `/blog/[slug]` |

#### AI Agents & CRM
| Dosya | Açıklama |
|---|---|
| `lib/agents/triage.ts` | Claude sonnet-4-6 triage → urgency: routine/soon/urgent |
| `lib/agents/patient-followup.ts` | Gün 3/7/14/30 post-scan email akışı |
| `lib/agents/cqc-client.ts` | CQC public API → imaging provider verisi |
| `lib/agents/outreach-email.ts` | Zengin HTML partner email (Resend) |
| `components/TriageWidget.tsx` | Semptom girişi → urgency badge + booking CTA |
| `app/admin/agents/page.tsx` | Admin agent paneli — manuel tetikleme + JSON yanıt |
| `app/admin/outreach/page.tsx` | Partner CRM — durum filtresi, arama, lead detay drawer |

#### Veritabanı & Email
| Dosya | Açıklama |
|---|---|
| `lib/db.ts` | Railway bağlantısı (lazy proxy) + QueryBuilder compat shim |
| `lib/auth.ts` | NextAuth v5 config — JWT, Credentials, Google |
| `lib/supabase/server.ts` | Compat shim (eski server component import'larını karşılar) |
| `lib/clinics.data.ts` | 4 test klinik |
| `lib/scanTypes.config.ts` | 9 scan tipi |
| `lib/services-content.ts` | 10 servis + women's health |
| `lib/body-parts-content.ts` | MRI/CT/X-Ray body part SEO içerikleri |
| `lib/cities-content.ts` | 15+ şehir, 6 scan tipi config |
| `lib/email/booking-confirmation.ts` | Resend email template |
| `lib/schema-migrations.sql` | partner_leads tablosu dahil tüm migration'lar |
| `lib/seed.sql` | Test verisi |

---

### ⚠️ Açık Teknik Borçlar

| Öncelik | Sorun | Detay |
|---|---|---|
| 🟠 | **Client mutations** | `ClinicAdminActions`, `ReferralForm`, `GPSettingsForm`, `NewClinicForm`, `ClinicSettingsForm`, `PackageManager`, `ReportUploader` — Supabase import'ları kaldırıldı ama henüz API route'a bağlanmadı. Runtime'da hata verir. |
| 🟠 | **`@ts-nocheck`** | 34 data display sayfasında geçici — `postgres` paketi `unknown` döndürüyor, tipleme yapılacak |
| 🟡 | **Eski paketler** | `@supabase/ssr` ve `@supabase/supabase-js` hâlâ `package.json`'da — migration tamamlanınca kaldırılabilir |
| 🟡 | **`stripe_payment_intent` duplikasyonu** | `schema.sql`'de `stripe_payment_intent_id`, migration'da `stripe_payment_intent` — ikisi ayrı kolon; eski olanı silinmeli |

---

### 📋 Kalan İşler (Sonraki Sprint)

| Öncelik | İş | Not |
|---|---|---|
| 🔴 | **Client mutations API route'a bağla** | 7 component, yukarıdaki listeye bak |
| 🔴 | **Railway schema çalıştır** | Enes, `lib/schema-migrations.sql` + `lib/seed.sql` Railway'de çalıştırmalı |
| 🟠 | **`sitemap.xml` + `robots.txt`** | SEO için kritik — 190 statik sayfa var ama Google görmüyor |
| 🟠 | **Mobile responsive** | Hiç dokunulmadı — öncelikli |
| 🟠 | **GDPR cookie banner** | UK GDPR / ICO zorunluluğu |
| 🟡 | **Blog içeriği (ilk 5 yazı)** | NHS bekleme süreleri, MRI rehberi, özel scan avantajları vb. |
| 🟡 | **Analytics** | Vercel Analytics + GA4 |
| 🟡 | **`@ts-nocheck` temizliği** | `sql<Row[]>` generic tipler ile 34 sayfayı tip-güvenli yap |
| 🟡 | **Eski Supabase paketleri kaldır** | `npm uninstall @supabase/ssr @supabase/supabase-js` |
| 🟡 | **TriageWidget entegrasyonu** | Şimdilik Phase 2 — önce 5+ klinik onboarded olsun |
| 🟡 | **WhatsApp chatbot** | Phase 2 |

---

## Enes İçin Kurulum — Yalnızca Railway

> Supabase yok. Tüm veri Railway PostgreSQL'de.

### 1. Ortam Değişkenleri (`.env.local`)

```
DATABASE_URL=postgresql://postgres:SIFRE@HOST.railway.app:PORT/railway
NEXTAUTH_SECRET=openssl rand -base64 32 ile üret
NEXTAUTH_URL=https://preview.scanbook.co.uk
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
ANTHROPIC_API_KEY=sk-ant-...
AGENT_SECRET=openssl rand -hex 32 ile üret
NEXT_PUBLIC_PLATFORM=scanbook
NEXT_PUBLIC_SITE_URL=https://preview.scanbook.co.uk
```

### 2. Railway DB Schema

Railway dashboard → PostgreSQL → Query sırayla çalıştır:
1. `lib/schema-migrations.sql` — tüm tablolar (bookings, clinics, profiles, partner_leads, vb.)
2. `lib/seed.sql` — test verisi

### 3. Stripe Webhook

Stripe dashboard → Webhooks → Add endpoint:
- URL: `https://preview.scanbook.co.uk/api/stripe/webhook`
- Event: `checkout.session.completed`
- Signing secret → `STRIPE_WEBHOOK_SECRET`'e yaz

### 4. Google OAuth

Google Cloud Console → OAuth 2.0 Client ID:
- Authorized redirect URI: `https://preview.scanbook.co.uk/api/auth/callback/google`

### 5. Vercel

Settings → Environment Variables → yukarıdaki tüm değerleri ekle → Redeploy

---

## TECH STACK (Güncel)

| Katman | Teknoloji | Versiyon |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| Dil | TypeScript | 5.x |
| Stil | Inline styles | CSS değişkenleri |
| Database | Railway PostgreSQL | `postgres` npm paketi |
| Auth | NextAuth v5 (Auth.js beta) | JWT strateji |
| Ödeme | Stripe Checkout | Live mod |
| Email | Resend | `partnerships@scanbook.co.uk`, `care@scanbook.co.uk` |
| AI Agents | Anthropic Claude API | claude-sonnet-4-6 |
| Deploy | Vercel | preview.scanbook.co.uk |
| Repo | GitHub | Private |

---

## RENK SİSTEMİ

```css
--ink:    #0F4C81  /* ana navy */
--ink-2:  #0A3A66
--ink-3:  #082A4A  /* koyu navy — CTA, footer */
--ink-05: #E8F0F8  /* açık navy — hover */
--accent: #EF4444  /* kırmızı — sadece pulse dot */
--paper:  #FAFAF7  /* warm white bg */
--paper-2:#F2F1EC  /* ikincil bg */
--line:   #E5E1D8  /* border */
```

---

## FAZLAR

| Faz | Kapsam | Durum |
|---|---|---|
| **Faz 1** | Core platform, booking flow, portaller, SEO sayfaları, partner CRM | ✅ Canlı |
| **Faz 2** | AI triage widget, WhatsApp chatbot, 5+ klinik onboarding | ⏳ Planlandı |
| **Faz 3** | Mobile app, GP network genişleme, analytics dashboard | 🔮 İleride |

---

*Güncelleme: 19 Mayıs 2026 — Versiyon 5.0*

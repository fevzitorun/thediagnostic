# thediagnostic — Development Roadmap

**Last updated:** June 2025  
**Stack:** Next.js 15, TypeScript, PostgreSQL, Stripe, Resend, NextAuth v5, Vercel

---

## Phase 0 — Foundation (DONE ✓)

| Item | Status |
|------|--------|
| Next.js 15 App Router project structure | ✓ Done |
| Tailwind / CSS variables design system | ✓ Done |
| Google Fonts (Playfair Display + Inter) | ✓ Done |
| Database schema (18 tables) | ✓ Done |
| Seed data — HSM Radyoloji + Acıbadem Maslak | ✓ Done |
| Navbar with real logo | ✓ Done |
| Footer component | ✓ Done |
| Navbar + multi-page routing | ✓ Done |
| i18n middleware (en/tr/ar/de) | ✓ Done |
| NextAuth v5 (email + credentials) | ✓ Done |
| Stripe Checkout + Webhook handler | ✓ Done |
| Resend booking confirmation email | ✓ Done |
| Referral form PDF/HTML generator | ✓ Done |

---

## Phase 1 — Patient-Facing MVP (DONE ✓)

| Item | Status |
|------|--------|
| Homepage — hero, scan types, clinics | ✓ Done |
| "Why The Diagnostic" / brokerage positioning | ✓ Done |
| AI Triage Widget (Claude-powered) | ✓ Done |
| Device Catalog (60+ technologies, 6 categories) | ✓ Done |
| UK Reports section with report mockup | ✓ Done |
| Savings Calculator | ✓ Done |
| Partner Banner (clinic recruitment) | ✓ Done |
| Booking flow — 7-step form | ✓ Done |
| Stripe Pay button wired to checkout | ✓ Done |
| Public availability API (`/api/slots`) | ✓ Done |
| Clinic detail pages (`/clinics/[slug]`) | ✓ Done |
| Concierge section | ✓ Done |
| Testimonials | ✓ Done |
| WhatsApp float button | ✓ Done |

---

## Phase 2 — Clinic Partner Panel MVP (IN PROGRESS 🔄)

| Item | Status |
|------|--------|
| Clinic dashboard layout | ✓ Done |
| Appointments view | ✓ Done |
| Slot management — view/block/unblock | ✓ Done |
| Bulk slot creation (working days, 08:00–16:00) | ✓ Done |
| Reports section (placeholder) | ⬜ TODO |
| Packages management | ⬜ TODO |
| Messages / patient communication | ⬜ TODO |
| Clinic settings (profile, pricing, images) | ⬜ TODO |
| Clinic staff user management | ⬜ TODO |
| Clinic analytics dashboard | ⬜ TODO |

**Target completion:** July 2025

---

## Phase 3 — Operations & AI (NEXT UP 🚀)

### 3.1 Booking Operations

- [ ] Booking confirmation → clinic notification email
- [ ] Patient reminder emails (48h before appointment)
- [ ] Booking cancellation + refund flow (Stripe)
- [ ] Waiting list / auto-fill when slot cancelled
- [ ] WhatsApp booking confirmation (Twilio API)
- [ ] iCal / Google Calendar integration for patients

### 3.2 Concierge Module

- [ ] Concierge request form → admin dashboard
- [ ] Flight search integration (Skyscanner / Amadeus API)
- [ ] Hotel search (Booking.com affiliate API)
- [ ] Transfer booking (local Istanbul provider)
- [ ] Concierge pricing (flat fee or % of booking)
- [ ] Concierge confirmation email with logistics pack

### 3.3 AI Agent Suite

- [ ] **Triage Agent** — Claude 3.5 Sonnet, symptom → scan recommendation (route exists, needs testing)
- [ ] **Report Summary Agent** — plain-English summary of DICOM reports for patients
- [ ] **Patient Follow-up Agent** — post-scan automated check-in
- [ ] **Clinic Outreach Agent** — auto-qualify new clinic partner leads
- [ ] **Price Intelligence** — automated UK price benchmarking (scraper + weekly cron)

**Target completion:** August 2025

---

## Phase 4 — Growth & SEO (Q3 2025)

### 4.1 SEO Content

- [ ] Blog / News section (`/blog`)
- [ ] Condition-specific landing pages (e.g. `/conditions/lymphoma`)
- [ ] Scan comparison pages (e.g. `/compare/pet-ct-vs-mri`)
- [ ] City pages — Istanbul, London, Dubai, Frankfurt
- [ ] UK price transparency pages (NHS wait + private cost data)
- [ ] Schema.org structured data (MedicalProcedure, Hospital, Review)

### 4.2 Second Opinion Service

- [ ] Second opinion request form
- [ ] DICOM upload via secure portal
- [ ] GMC radiologist assignment queue
- [ ] Report delivery workflow (24–48h)
- [ ] Pricing (flat fee: £150–£300)

### 4.3 Affiliate & Referral

- [ ] GP / specialist referral portal (separate login)
- [ ] Referral tracking + commission dashboard
- [ ] Referral form PDF generator (already built — needs UI)
- [ ] Partner GP directory

**Target completion:** September 2025

---

## Phase 5 — Scale & Internationalisation (Q4 2025)

### 5.1 Multi-Clinic Network

- [ ] Clinic onboarding wizard (self-serve application)
- [ ] Partner clinic vetting checklist + approval workflow
- [ ] New clinic cities: Ankara, Izmir, Dubai, Abu Dhabi
- [ ] Clinic performance dashboard (bookings, revenue, ratings)
- [ ] Revenue share / commission calculation (automated invoicing)

### 5.2 Multi-Currency & Multi-Language

- [ ] Dynamic currency conversion (GBP, EUR, USD, AED, TRY)
- [ ] Full Arabic translation (RTL layout support)
- [ ] German translation (DE market — major source market)
- [ ] Turkish patient portal (domestic bookings)

### 5.3 Patient Portal

- [ ] `/my-account` — booking history, reports, communications
- [ ] DICOM viewer (embedded in patient portal)
- [ ] Health record upload (GP letter, referral, prior scans)
- [ ] Appointment rescheduling self-service

---

## Phase 6 — Enterprise (2026)

- [ ] B2B API for health insurers and corporates
- [ ] Stripe Connect for multi-clinic direct payouts
- [ ] ISO 27001 / Cyber Essentials certification
- [ ] CQC registration (if providing UK-facing clinical services)
- [ ] NHS digital integration (FHIR / HL7 for referral data)
- [ ] Mobile app (React Native — iOS + Android)

---

## Infrastructure Checklist

| Service | Status | Notes |
|---------|--------|-------|
| Vercel (hosting) | ⬜ Deploy pending | Set env vars: STRIPE_*, DATABASE_URL, NEXTAUTH_SECRET, RESEND_API_KEY, ANTHROPIC_API_KEY |
| Supabase / Railway PostgreSQL | ⬜ Pending | Run `lib/schema.sql` then `lib/seed.sql` |
| Stripe | ⬜ Test mode | STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET needed |
| Resend | ⬜ Pending | RESEND_API_KEY + verify sending domain |
| Anthropic API | ⬜ Pending | ANTHROPIC_API_KEY for AI Triage agent |
| Custom domain | ⬜ Pending | thediagnostic.co.uk → Vercel |
| Google Analytics 4 | ⬜ Not started | |
| Hotjar / PostHog | ⬜ Not started | |

---

## Environment Variables Required

```
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://thediagnostic.co.uk

DATABASE_URL=postgresql://...

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@thediagnostic.co.uk

ANTHROPIC_API_KEY=sk-ant-...

NEXT_PUBLIC_SITE_URL=https://thediagnostic.co.uk
```

---

## Immediate Next Actions (This Week)

1. **Deploy to Vercel** — set environment variables, trigger first deploy
2. **Provision PostgreSQL** — Railway or Supabase, run schema + seed
3. **Test Stripe webhook** — use `stripe listen --forward-to localhost:3000/api/stripe/webhook`
4. **Test AI Triage** — connect ANTHROPIC_API_KEY, verify `/api/agents/triage` returns valid JSON
5. **Clinic login** — create first clinic_admin user via SQL, test `/clinic/slots`
6. **Mobile responsiveness audit** — homepage and booking flow on mobile
7. **Real photos** — push remaining photos from Mac to GitHub (blue light wave, optical device)

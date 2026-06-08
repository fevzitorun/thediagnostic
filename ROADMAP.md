# thediagnostic — Development Roadmap

**Last updated:** June 2025  
**Stack:** Next.js 15, TypeScript, PostgreSQL, Stripe, Resend, NextAuth v5, Vercel

---

## Phase 0 — Foundation (DONE ✓)

| Item | Status |
|------|--------|
| Next.js 15 App Router project structure | ✓ Done |
| Tailwind / CSS variables design system | ✓ Done |
| Google Fonts (Instrument Serif + Inter) | ✓ Done |
| Database schema (18 tables) | ✓ Done |
| Seed data — HSM Radyoloji + Acıbadem Maslak | ✓ Done |
| Navbar with real logo | ✓ Done |
| Footer component | ✓ Done |
| Navbar + multi-page routing | ✓ Done |
| i18n middleware (en/tr/ar) | ✓ Done |
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

- [ ] **Triage Agent** — Claude Sonnet, symptom → scan recommendation (route exists, needs testing)
- [ ] **Report Summary Agent** — plain-English summary of DICOM reports for patients
- [ ] **Patient Follow-up Agent** — post-scan automated check-in
- [ ] **Clinic Outreach Agent** — auto-qualify new clinic partner leads
- [ ] **Price Intelligence** — automated UK price benchmarking (scraper + weekly cron)

**Target completion:** August 2025

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

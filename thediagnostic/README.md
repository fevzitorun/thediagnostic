# thediagnostic

Advanced medical imaging & diagnostics booking platform.

**Book PET-CT, MRI 3T, GammaKnife and more at world-class clinics in Turkey — save up to 70% vs UK private prices.**

Built by [Connective Hub](https://connectivehub.co.uk) · UK & Turkey

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **i18n**: next-intl (EN / TR / AR)
- **Database**: Railway PostgreSQL (`postgres` npm)
- **Auth**: NextAuth v5 (JWT + Google OAuth)
- **Payments**: Stripe (GBP/EUR/USD) + İyzico (TRY)
- **Email**: Resend
- **AI Agents**: Claude API (claude-sonnet-4-6)
- **WhatsApp**: Meta Business Cloud API
- **Storage**: Cloudflare R2 (scan reports)
- **Deploy**: Vercel

## Quick Start

```bash
cp .env.example .env.local
# Fill in all env vars
npm install
npm run dev
```

## Partners

- **HSM Radyoloji** — Prof. Dr. Mustafa ÖZATEŞ (Istanbul, 2 clinics)
- **Acıbadem Group** — PET-CT, GammaKnife, Robotic MRI

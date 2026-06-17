# The Diagnostic — Design System Phase 2 Update Report

**Branch:** `claude/thediagnostic-phase-2-LK1dc`  
**Date:** 2026-06-17  
**Commits:** `bbe9a5f4`, `4798f9d8`, `f9b99d93`

---

## Summary

Full integration of **The Diagnostic Design System v1** into the Next.js app. This phase covers global CSS token replacement, a new TypeScript component library (`components/ds/`), and migration of all existing pages to the new tokens — with complete backward-compatibility so no unupdated component breaks.

---

## 1. Global CSS (`app/globals.css`)

### Font change

| Before | After |
|---|---|
| Instrument Serif | **Playfair Display** (wt 500–900, italic 700–800) |
| System sans-serif | **Inter** (wt 300–800) |

### Color system overhaul

New canonical tokens:

```
--navy        #0B1D3A   (brand navy, sampled from logo)
--blue        #2698D3   (brand blue, sampled from logo)
--amber       #E67E22   (accent warm)
```

Full palette added:

| Token | Value | Role |
|---|---|---|
| `--navy` | `#0B1D3A` | Primary brand |
| `--navy-900` | `#08152B` | Darkest hero bg |
| `--navy-mid` | `#132744` | Mid navy |
| `--navy-700` | `#0D2347` | Gradient stop |
| `--navy-600` | `#0F2A55` | Gradient stop |
| `--navy-light` | `#1E3A5F` | Lighter navy |
| `--navy-050` | `#E8EEF6` | Tinted bg |
| `--blue` | `#2698D3` | Brand blue / CTA |
| `--blue-dark` | `#1C7CB0` | Hover state |
| `--blue-bright` | `#46B5EC` | Highlights, on-dark links |
| `--blue-light` | `#E2F1FA` | Tinted bg |
| `--blue-050` | `#F2F9FD` | Subtle bg |
| `--amber` | `#E67E22` | Warm accent |
| `--amber-dark` | `#C9661A` | Hover |
| `--amber-light` | `#FEF3E7` | Tinted bg |
| `--border` | `#D8E4F0` | Dividers |
| `--text-dark` | `#1A2332` | Headings |
| `--text-body` | `#374151` | Body copy |
| `--text-muted` | `#6B7A8D` | Secondary text |

### Gradients

```css
--grad-blue: linear-gradient(135deg, var(--blue) 0%, var(--blue-bright) 100%);
--grad-hero: linear-gradient(150deg, var(--navy) 0%, var(--navy-700) 50%, var(--navy-600) 100%);
```

### Backward-compatibility aliases (zero breakage)

All legacy variable names still work — they now point to the new tokens:

```css
--primary      → var(--navy)
--primary-2    → var(--navy-light)
--primary-3    → var(--navy-900)
--accent       → var(--blue)
--accent-2     → var(--blue-dark)
--accent-light → var(--blue-light)
--teal         → var(--blue)
--teal-dark    → var(--blue-dark)
--warm         → var(--amber)
--bg           → var(--bg-light)
--line         → var(--border)
--text         → var(--text-dark)
--font-serif   → var(--font-display)
--font-heading → var(--font-display)
```

### Additional tokens added

- **Typography scale:** `--text-xs` (11px) → `--text-4xl` (48px)
- **Spacing:** `--space-1` (4px) → `--space-20` (80px)
- **Radii:** `--radius-sm` → `--radius-2xl`
- **Shadows:** `--shadow-sm` → `--shadow-2xl` + `--shadow-blue`, `--shadow-navy`
- **Motion:** `--duration-fast` (120ms), `--duration-normal` (200ms), `--duration-slow` (350ms)
- **Semantic:** `--success`, `--warning`, `--danger`, `--info`, `--star`
- **Focus ring:** `--focus-ring: rgba(38,152,211,0.40)`
- **Utility classes:** `.td-eyebrow`, `.td-display`, `.td-title`

---

## 2. New Component Library (`components/ds/`)

All components are TypeScript, `'use client'`, zero external deps beyond React.

### `Button.tsx`

Variants: `primary` | `ink` | `outline` | `ghost`  
Sizes: `sm` | `md` | `lg`  
Props: `onDark`, `iconRight`, `iconLeft`, `disabled`, `full`, `as` (polymorphic)

Hover: lift −1 px + colored box-shadow. Disabled: 40% opacity, no pointer events.

### `Card.tsx`

Interactive hover: lift −4 px + blue accent top-bar gradient appears. Configurable `padding`, `radius`, `bordered`, `hoverable`.

### `Badge.tsx`

7 tones: `neutral` | `blue` | `success` | `warning` | `danger` | `info` | `amber`  
Variants: `soft` (default) | `solid`  
Optional dot prefix.

### `Tag.tsx`

Filter chip. Selected state fills `--navy`, unselected uses `--bg-light`. Hover shows `--blue-light` bg.

### `Field.tsx`

`input` / `textarea` / `select`. Focus ring: `0 0 0 3px var(--focus-ring)`. Blue border on focus. Error state in `--danger`.

### `Logo.tsx`

SVG mark from `/images/logo-mark.png`. `onDark` prop for white variant. Configurable `size`.

### `TrustBadge.tsx`

Accreditation chip (JCI / ISO / etc.). `onDark` uses `rgba(255,255,255,0.12)` border and `var(--text-on-navy)` text.

### `Stat.tsx`

Large numeric display in Playfair Display. Coloured `suffix` in `var(--blue)`. `label` below in muted text.

### `SectionLabel.tsx`

Uppercase eyebrow label. `onDark` uses `var(--blue-bright)` colour.

### `index.ts`

Barrel export for all 9 components:

```ts
export { Button, Card, Badge, Tag, Field, Logo, TrustBadge, Stat, SectionLabel } from '@/components/ds';
```

---

## 3. Page Migrations

### `app/book/page.tsx`

7-step booking wizard fully migrated:

| Old token | New token |
|---|---|
| `#082A4A` (hero bg) | `var(--navy)` |
| `#17A589` (clinic card) | `var(--blue)` |
| `#1B4F72` (clinic card) | `var(--navy)` |
| `--primary` | `--navy` |
| `--accent` | `--blue` |
| `--line` | `--border` |
| `--bg` | `--bg-light` |

### `app/clinic/layout.tsx`

| Before | After |
|---|---|
| Sidebar `#082A4A` | `var(--navy-900)` |
| Logo accent `#00C9A7` | `var(--blue)` |
| Fallback text `'ScanBook'` | `'The Diagnostic'` |

### `app/clinic/slots/page.tsx`

SCAN_TYPES color entries: `#17A589` → `#2698D3`, `#1B4F72` → `#0B1D3A`. All inline color props replaced with design tokens.

### `app/clinics/page.tsx`

| Before | After |
|---|---|
| `linear-gradient(135deg, ...)` hero | `var(--grad-hero)` |
| `var(--primary-3) 0%, var(--primary) 100%` | `var(--navy)` |
| `var(--font-serif)` | `var(--font-display)` |
| Card header hardcoded `headerBg` | `var(--navy)` |

### `app/scan/page.tsx`

| Before | After |
|---|---|
| `linear-gradient(135deg, ...)` hero | `var(--grad-hero)` |
| Savings badge `#17A589` bg | `var(--blue-light)` |
| Savings badge teal text | `var(--blue-dark)` |

### `components/SavingsCalculator.tsx`

| Before | After |
|---|---|
| Header `linear-gradient(135deg, var(--primary) ...)` | `var(--grad-hero)` |
| Bar `linear-gradient(90deg, #17A589, #5DEDE0)` | `var(--grad-blue)` |
| Savings callout hardcoded green | `var(--success-bg)` / `var(--success)` |
| `var(--primary)` | `var(--navy)` |

### `components/CookieBanner.tsx`

| Before | After |
|---|---|
| Background `#082A4A` | `var(--navy)` |
| Accept button `#0F4C81` | `var(--blue)` |
| Link color `#93c5fd` | `var(--blue-bright)` |

---

## 4. Data & Utility Libraries

### `lib/clinics.data.ts` (535 lines)

13 partner clinics covering Istanbul + Kocaeli:

| Clinic | Group | JCI | Featured |
|---|---|---|---|
| HSM Radyoloji | HSM | — | Yes |
| Acıbadem Maslak | Acıbadem | Yes | Yes |
| Acıbadem Altunizade | Acıbadem | Yes | — |
| Medicana International Şişli | Medicana | Yes | Yes |
| Medicana Beylikdüzü | Medicana | — | — |
| Koç University Hospital | Koç | Yes | Yes |
| Florence Nightingale Şişli | Florence N. | Yes | Yes |
| Memorial Şişli | Memorial | Yes | Yes |
| Memorial Ataşehir | Memorial | Yes | — |
| Liv Hospital Ulus | Liv | Yes | Yes |
| Medical Park Florya | Medical Park | — | — |
| Medical Park Göztepe | Medical Park | — | — |
| Anadolu Medical Center | Anadolu | Yes | Yes |

18 scan type codes with EN/TR/AR names, icons, durations, categories.

Helper exports: `getClinicsByGroup`, `getFeaturedClinics`, `getClinicBySlug`, `getClinicsWithScan`, `toClinicCard`, `CLINIC_GROUPS`, `SCAN_TYPES`.

### `lib/referral-form.ts` (301 lines)

NHS-standard HTML referral form generator:

- `generateReferralFormHtml(data: ReferralFormData): string` — returns print-ready HTML
- `bookingToReferralData(booking, bookingRef): ReferralFormData` — maps booking object to form shape
- Sections: Patient, GP, Referring Clinician (optional), Examination, MRI Metal Safety checklist, General Health, Contrast, Female patients
- Print CSS included, branded with The Diagnostic SVG logo

---

## 5. Pending Tasks

### Image assets (manual upload required)

Binary files cannot be pushed via the GitHub text API. Upload these manually via **GitHub Web UI → Add file → Upload files** to `public/images/`:

| File | Source |
|---|---|
| `mark.png` | `/tmp/design-system/assets/mark.png` |
| `mark-white.png` | `/tmp/design-system/assets/mark-white.png` |
| `lockup-stacked.png` | `/tmp/design-system/assets/lockup-stacked.png` |
| `scanner-room.jpg` | `/tmp/design-system/assets/scanner-room.jpg` |

The `Logo.tsx` component currently references `/images/logo-mark.png` — this path will 404 until the asset is uploaded.

### Environment variables (Vercel)

Set these in the Vercel project dashboard before deploying:

```
DATABASE_URL
NEXTAUTH_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
RESEND_API_KEY
ANTHROPIC_API_KEY
NEXT_PUBLIC_SITE_URL
AGENT_SECRET
META_WHATSAPP_PHONE_ID
META_WHATSAPP_TOKEN
META_WHATSAPP_VERIFY_TOKEN
```

### Pages not yet migrated to new tokens

These pages were not touched in this phase — they will still render correctly via legacy aliases, but should be updated in Phase 3:

- `app/page.tsx` (homepage)
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/scan/[slug]/page.tsx` (individual scan pages)
- `app/clinics/[slug]/page.tsx` (individual clinic pages)
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/Hero.tsx` (if present)

### ds/ components: adopt in existing pages

The new `Button`, `Card`, `Badge`, `Stat`, `TrustBadge` components in `components/ds/` are ready but not yet used in existing pages — all pages still use inline `style` objects. Phase 3 should progressively replace inline styles with ds/ components.

---

## 6. Commit Log

| SHA | Description |
|---|---|
| `bbe9a5f4` | feat: design system v1 — globals.css tokens + components/ds/ (Button, Card, Badge, Tag, Field, Logo, TrustBadge, Stat, SectionLabel) |
| `4798f9d8` | feat: migrate pages to design system tokens (book, clinic layout, slots, clinics, scan, SavingsCalculator, CookieBanner) |
| `f9b99d93` | feat: push lib files — clinics.data.ts (13 clinics, 18 scan types) + referral-form.ts (NHS HTML generator) |

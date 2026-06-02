'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TEST_CLINICS, toClinicCard, type ClinicCard, type CqcRating } from '@/lib/clinics.data'

// ─── COMING SOON PLACEHOLDER CLINICS ─────────────────────────────────────────

interface ComingSoonClinic {
  id: string
  name: string
  subtitle: string
  city: string
  postcode: string
  capabilities: string[]
  comingSoon: true
}

const COMING_SOON: ComingSoonClinic[] = [
  {
    id: 'cs-london-harley',
    name: 'Harley Street Imaging',
    subtitle: 'Diagnostic Imaging Centre · Central London',
    city: 'London W1',
    postcode: 'W1G 9QD',
    capabilities: ['mri', 'ct', 'ultrasound', 'xray'],
    comingSoon: true,
  },
  {
    id: 'cs-manchester-city',
    name: 'Manchester Scan Centre',
    subtitle: 'Private Radiology · Manchester City Centre',
    city: 'Manchester',
    postcode: 'M2 3HZ',
    capabilities: ['mri', 'ct', 'ultrasound'],
    comingSoon: true,
  },
  {
    id: 'cs-birmingham',
    name: 'Midlands Imaging',
    subtitle: 'Diagnostic & Interventional Radiology · Birmingham',
    city: 'Birmingham',
    postcode: 'B3 2TA',
    capabilities: ['mri', 'ct', 'ultrasound', 'xray'],
    comingSoon: true,
  },
  {
    id: 'cs-leeds',
    name: 'Yorkshire Scan Clinic',
    subtitle: 'Private Diagnostic Imaging · Leeds',
    city: 'Leeds',
    postcode: 'LS1 4AP',
    capabilities: ['mri', 'ct', 'ultrasound'],
    comingSoon: true,
  },
  {
    id: 'cs-edinburgh',
    name: 'Edinburgh Imaging Centre',
    subtitle: 'Private Scanning Clinic · Edinburgh',
    city: 'Edinburgh',
    postcode: 'EH2 2AS',
    capabilities: ['mri', 'ct', 'ultrasound', 'baby_scan'],
    comingSoon: true,
  },
  {
    id: 'cs-bristol',
    name: 'Bristol Radiology',
    subtitle: 'Diagnostic Imaging · Bristol City Centre',
    city: 'Bristol',
    postcode: 'BS1 5TR',
    capabilities: ['mri', 'ultrasound', 'baby_scan'],
    comingSoon: true,
  },
]

// ─── CITY / SCAN TYPE FILTER DATA ─────────────────────────────────────────────

const CITY_FILTERS = ['All', 'London', 'Manchester', 'Birmingham', 'Leeds', 'Edinburgh', 'Glasgow', 'Winchester', 'Bristol']
const SCAN_FILTERS = ['MRI', 'CT', 'Ultrasound', 'Baby Scan', 'Mammogram']

const CAPABILITY_LABELS: Record<string, string> = {
  mri: 'MRI',
  ct: 'CT',
  ultrasound: 'Ultrasound',
  xray: 'X-Ray',
  baby_scan: 'Baby Scan',
  pregnancy_scan: 'Pregnancy Scan',
}

const SCAN_TO_CAPABILITY: Record<string, string> = {
  'MRI': 'mri',
  'CT': 'ct',
  'Ultrasound': 'ultrasound',
  'Baby Scan': 'baby_scan',
  'Mammogram': 'mammogram',
}

// ─── SOCIAL PROOF DATA ────────────────────────────────────────────────────────

const SOCIAL_PROOF: Record<string, string> = {
  'medicana-winchester': 'Last booked 2 hours ago',
  'motherscan-wimbledon': 'Last booked 45 minutes ago',
  'motherscan-islington': 'Last booked 1 hour ago',
  'unirad-glasgow': 'Last booked 3 hours ago',
}

// ─── CQC BADGE ────────────────────────────────────────────────────────────────

function CqcBadge({ rating, regulatedBy }: { rating: CqcRating; regulatedBy: string }) {
  const config: Record<CqcRating, { bg: string; text: string; dot: string }> = {
    Outstanding: { bg: '#0B4A2D', text: '#D1FAE5', dot: '#6EE7B7' },
    Good:        { bg: '#065F46', text: '#D1FAE5', dot: '#34D399' },
    'Requires Improvement': { bg: '#92400E', text: '#FEF3C7', dot: '#FCD34D' },
    Pending:     { bg: '#1E3A5F', text: '#DBEAFE', dot: '#93C5FD' },
  }
  const c = config[rating]
  const label = rating === 'Pending' ? regulatedBy : rating

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, color: c.text,
      padding: '3px 8px', borderRadius: 4,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
      {rating === 'Pending' ? `${regulatedBy} registered` : `CQC ${label}`}
    </span>
  )
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ display: 'inline-flex', gap: 1 }}>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < full
          const isHalf = !filled && i === full && half
          return (
            <svg key={i} width="13" height="13" viewBox="0 0 24 24">
              {isHalf ? (
                <>
                  <defs>
                    <linearGradient id={`h${i}`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#D1D5DB" />
                    </linearGradient>
                  </defs>
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={`url(#h${i})`} />
                </>
              ) : (
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={filled ? '#F59E0B' : '#D1D5DB'} />
              )}
            </svg>
          )
        })}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{rating.toFixed(1)}</span>
      <span style={{ fontSize: 12, color: '#6B7280' }}>({count.toLocaleString()})</span>
    </span>
  )
}

// ─── CAPABILITY CHIP ─────────────────────────────────────────────────────────

function CapChip({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 9px',
      background: '#EFF6FF',
      color: '#1D4ED8',
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: 0.2,
    }}>
      {label}
    </span>
  )
}

// ─── LIVE CLINIC CARD ─────────────────────────────────────────────────────────

function ClinicCardLive({ card, socialProof }: { card: ClinicCard; socialProof?: string }) {
  const capLabels = card.capabilities
    .filter(c => CAPABILITY_LABELS[c])
    .map(c => CAPABILITY_LABELS[c])
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 5)

  const scannerLabel = card.scannerType?.includes('T') ? `${card.scannerType} Scanner` : null

  return (
    <article style={{
      background: '#FFFFFF',
      border: '1px solid #E5E1D8',
      borderRadius: 12,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      transition: 'box-shadow .18s, transform .18s',
      position: 'relative',
      overflow: 'hidden',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 8px 30px rgba(15,76,129,.12)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Top strip: social proof */}
      {socialProof && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: '#F0FDF4', borderBottom: '1px solid #BBF7D0',
          padding: '6px 24px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: '#15803D', fontWeight: 500 }}>{socialProof}</span>
        </div>
      )}

      {/* Card body */}
      <div style={{ paddingTop: socialProof ? 28 : 0 }}>

        {/* Header row */}
        <div style={{ marginBottom: 12 }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 19,
            fontWeight: 400,
            color: '#082A4A',
            lineHeight: 1.25,
            marginBottom: 3,
          }}>
            {card.name}
          </h2>
          <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
            {card.city}{scannerLabel ? ` · ${scannerLabel}` : ''}
          </p>

          {/* Badges row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: '#F3F4F6', color: '#374151',
              padding: '3px 8px', borderRadius: 4,
              fontSize: 11, fontWeight: 500,
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              {card.city}
            </span>
            <CqcBadge rating={card.cqcRating} regulatedBy={card.regulatedBy} />
            {card.locationsCount > 1 && (
              <span style={{
                display: 'inline-block',
                background: '#EFF6FF', color: '#1D4ED8',
                padding: '3px 8px', borderRadius: 4,
                fontSize: 11, fontWeight: 500,
              }}>
                {card.locationsCount} locations
              </span>
            )}
          </div>
        </div>

        {/* Price + rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              From
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#082A4A', lineHeight: 1 }}>
              £{card.priceFrom}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <StarRating rating={card.rating} count={card.reviewCount} />
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>
              {card.reportHours > 0
                ? `Reports in ${card.reportHours}h`
                : 'Instant results'}
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {capLabels.map(l => <CapChip key={l} label={l} />)}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#F3F4F6', marginBottom: 16 }} />

        {/* Meta row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B7280' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            Next slot: <strong style={{ color: '#111827' }}>&nbsp;{card.nextSlot}</strong>
          </div>
          {card.insurers.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B7280' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Insurance accepted
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/clinics/${card.slug}`}
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '11px 20px',
            background: '#082A4A',
            color: '#FFFFFF',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
            letterSpacing: 0.1,
            transition: 'background .15s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#0A3A66')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#082A4A')}
        >
          View Centre
        </Link>
      </div>
    </article>
  )
}

// ─── COMING SOON CARD ─────────────────────────────────────────────────────────

function ComingSoonCard({ clinic }: { clinic: ComingSoonClinic }) {
  const capLabels = clinic.capabilities
    .filter(c => CAPABILITY_LABELS[c])
    .map(c => CAPABILITY_LABELS[c])
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 4)

  return (
    <article style={{
      background: '#FAFAFA',
      border: '1px dashed #D1D5DB',
      borderRadius: 12,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      opacity: 0.75,
      position: 'relative',
    }}>
      {/* Coming soon label */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        marginBottom: 12, alignSelf: 'flex-start',
        background: '#F3F4F6', padding: '4px 10px', borderRadius: 4,
      }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: 0.5, textTransform: 'uppercase' }}>
          Coming Soon
        </span>
      </div>

      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 19,
        fontWeight: 400,
        color: '#6B7280',
        lineHeight: 1.25,
        marginBottom: 3,
      }}>
        {clinic.name}
      </h2>
      <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>
        {clinic.city} · {clinic.postcode}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
        {capLabels.map(l => (
          <span key={l} style={{
            display: 'inline-block',
            padding: '3px 9px',
            background: '#F3F4F6',
            color: '#9CA3AF',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 500,
          }}>
            {l}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ height: 1, background: '#E5E7EB', marginBottom: 16 }} />
        <button disabled style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          padding: '11px 20px',
          background: '#F3F4F6',
          color: '#9CA3AF',
          border: '1px solid #E5E7EB',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'not-allowed',
        }}>
          Notify me when live
        </button>
      </div>
    </article>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function CentresPage() {
  const [cityFilter, setCityFilter] = useState('All')
  const [scanFilter, setScanFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchScanType, setSearchScanType] = useState('')

  const allCards = useMemo(() => TEST_CLINICS.map(toClinicCard), [])

  const filteredCards = useMemo(() => {
    let cards = allCards

    // Apply city chip filter
    if (cityFilter !== 'All') {
      cards = cards.filter(c => c.city.toLowerCase().includes(cityFilter.toLowerCase()))
    }

    // Apply scan type chip filter
    if (scanFilter) {
      const cap = SCAN_TO_CAPABILITY[scanFilter]
      if (cap) cards = cards.filter(c => c.capabilities.includes(cap))
    }

    // Apply inline search bar
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      cards = cards.filter(c =>
        c.city.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
      )
    }
    if (searchScanType) {
      const cap = SCAN_TO_CAPABILITY[searchScanType]
      if (cap) cards = cards.filter(c => c.capabilities.includes(cap))
    }

    return cards
  }, [allCards, cityFilter, scanFilter, searchQuery, searchScanType])

  // Should we show coming soon cards? Only when not actively filtering
  const showComingSoon = cityFilter === 'All' && !scanFilter && !searchQuery && !searchScanType

  // City chips — merge scan chips below
  const activeCityInScan = SCAN_FILTERS.includes(scanFilter ?? '')
  const activeCityChip = SCAN_FILTERS.includes(cityFilter) ? 'All' : cityFilter

  function handleChipClick(chip: string) {
    if (CITY_FILTERS.includes(chip)) {
      setCityFilter(chip)
      if (activeCityInScan) setScanFilter(null)
    }
    if (SCAN_FILTERS.includes(chip)) {
      setScanFilter(prev => prev === chip ? null : chip)
    }
  }

  return (
    <>
      <style>{`
        :root {
          --ink:    #0F4C81;
          --ink-2:  #0A3A66;
          --ink-3:  #082A4A;
          --accent: #EF4444;
          --paper:  #FAFAF7;
          --serif:  'Instrument Serif', Georgia, serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--paper); -webkit-font-smoothing: antialiased; }

        @media (max-width: 1024px) {
          .centres-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-search-row { flex-direction: column !important; gap: 10px !important; }
          .hero-search-row input,
          .hero-search-row select { width: 100% !important; }
        }
        @media (max-width: 640px) {
          .centres-grid { grid-template-columns: 1fr !important; }
          .centres-hero { padding: 40px 20px 32px !important; }
          .centres-hero h1 { font-size: 38px !important; letter-spacing: -1.4px !important; }
          .filter-bar { flex-wrap: wrap !important; padding: 14px 20px !important; }
          .page-inner { padding: 0 20px !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar />

      {/* ─── HERO ─── */}
      <section className="centres-hero" style={{
        background: 'linear-gradient(160deg, #082A4A 0%, #0F4C81 100%)',
        padding: '64px 48px 56px',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#22C55E', flexShrink: 0,
              boxShadow: '0 0 0 3px rgba(34,197,94,.25)',
            }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.75)', letterSpacing: 0.3 }}>
              New centres added monthly
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 52,
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-1.8px',
            color: '#fff',
            marginBottom: 14,
          }}>
            Find an Imaging Centre
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.72)', lineHeight: 1.6, marginBottom: 36, maxWidth: 520 }}>
            200+ CQC-registered centres across the UK. No GP referral needed — book directly online.
          </p>

          {/* Inline search bar */}
          <div className="hero-search-row" style={{
            display: 'flex',
            gap: 8,
            background: 'rgba(255,255,255,.08)',
            border: '1px solid rgba(255,255,255,.18)',
            borderRadius: 12,
            padding: '8px',
          }}>
            <input
              type="text"
              placeholder="City or postcode"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                flex: '1 1 220px',
                padding: '12px 16px',
                background: 'rgba(255,255,255,.12)',
                border: '1.5px solid rgba(255,255,255,.2)',
                borderRadius: 8,
                fontSize: 14,
                color: '#fff',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <select
              value={searchScanType}
              onChange={e => setSearchScanType(e.target.value)}
              style={{
                flex: '0 0 180px',
                padding: '12px 16px',
                background: 'rgba(255,255,255,.12)',
                border: '1.5px solid rgba(255,255,255,.2)',
                borderRadius: 8,
                fontSize: 14,
                color: searchScanType ? '#fff' : 'rgba(255,255,255,.65)',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <option value="">All scan types</option>
              {SCAN_FILTERS.map(s => (
                <option key={s} value={s} style={{ color: '#000', background: '#fff' }}>{s}</option>
              ))}
            </select>
            <button
              onClick={() => {/* filtering is live — no action needed */}}
              style={{
                padding: '12px 28px',
                background: '#EF4444',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: 0.2,
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                transition: 'background .15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#DC2626')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#EF4444')}
            >
              Search
            </button>
          </div>

        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div className="filter-bar" style={{
        borderBottom: '1px solid #E5E1D8',
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '14px 48px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        flexWrap: 'nowrap',
      }}>
        {/* City chips */}
        {CITY_FILTERS.map(chip => (
          <button
            key={chip}
            onClick={() => {
              setCityFilter(chip)
              if (chip !== 'All') setScanFilter(null)
            }}
            style={{
              padding: '7px 16px',
              border: '1.5px solid',
              borderColor: cityFilter === chip && !scanFilter ? '#082A4A' : '#E5E1D8',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: cityFilter === chip && !scanFilter ? 600 : 400,
              color: cityFilter === chip && !scanFilter ? '#082A4A' : '#4B5563',
              background: cityFilter === chip && !scanFilter ? '#EFF6FF' : '#fff',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all .12s',
              fontFamily: 'inherit',
              flexShrink: 0,
            }}
          >
            {chip}
          </button>
        ))}

        {/* Separator */}
        <div style={{ width: 1, height: 22, background: '#E5E1D8', flexShrink: 0, margin: '0 4px' }} />

        {/* Scan type chips */}
        {SCAN_FILTERS.map(chip => (
          <button
            key={chip}
            onClick={() => setScanFilter(prev => prev === chip ? null : chip)}
            style={{
              padding: '7px 16px',
              border: '1.5px solid',
              borderColor: scanFilter === chip ? '#0F4C81' : '#E5E1D8',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: scanFilter === chip ? 600 : 400,
              color: scanFilter === chip ? '#0F4C81' : '#4B5563',
              background: scanFilter === chip ? '#EFF6FF' : '#fff',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all .12s',
              fontFamily: 'inherit',
              flexShrink: 0,
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main>
        <div className="page-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 48px 80px' }}>

          {/* Results header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: 28, flexWrap: 'wrap', gap: 8,
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 24, fontWeight: 400, color: '#082A4A',
              }}>
                {filteredCards.length === 0
                  ? 'No centres found'
                  : filteredCards.length === 1
                    ? '1 centre found'
                    : `${filteredCards.length} centres found`}
              </h2>
              {(cityFilter !== 'All' || scanFilter) && (
                <p style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
                  {[
                    cityFilter !== 'All' ? cityFilter : null,
                    scanFilter ?? null,
                  ].filter(Boolean).join(' · ')}
                  <button
                    onClick={() => { setCityFilter('All'); setScanFilter(null) }}
                    style={{
                      marginLeft: 8, fontSize: 12, color: '#0F4C81',
                      background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit',
                    }}
                  >
                    Clear filters
                  </button>
                </p>
              )}
            </div>
            <p style={{ fontSize: 13, color: '#9CA3AF' }}>
              Sorted by: Relevance
            </p>
          </div>

          {/* Grid */}
          <div className="centres-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {filteredCards.map(card => (
              <ClinicCardLive
                key={card.id}
                card={card}
                socialProof={SOCIAL_PROOF[card.id]}
              />
            ))}

            {showComingSoon && COMING_SOON.map(cs => (
              <ComingSoonCard key={cs.id} clinic={cs} />
            ))}
          </div>

          {/* Empty state */}
          {filteredCards.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '64px 20px',
              border: '1px solid #E5E1D8',
              borderRadius: 12,
              background: '#FAFAF7',
            }}>
              <div style={{ fontSize: 32, marginBottom: 16, color: '#D1D5DB' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto', display: 'block' }}>
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: '#374151', marginBottom: 8 }}>
                No centres match your search
              </h3>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20, lineHeight: 1.6 }}>
                We are adding new centres regularly. Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => { setCityFilter('All'); setScanFilter(null); setSearchQuery(''); setSearchScanType('') }}
                style={{
                  padding: '10px 24px',
                  background: '#082A4A', color: '#fff',
                  border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                View all centres
              </button>
            </div>
          )}

        </div>
      </main>

      {/* ─── WHY CHOOSE SCANBOOK ─── */}
      <section style={{
        background: '#FFFFFF',
        borderTop: '1px solid #E5E1D8',
        padding: '72px 48px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, color: '#0F4C81',
              letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 12,
            }}>
              Why ScanBook
            </p>
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 38, fontWeight: 400, color: '#082A4A',
              letterSpacing: '-0.8px', lineHeight: 1.15,
            }}>
              Private imaging you can trust
            </h2>
          </div>

          <div className="why-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}>

            {/* Column 1 */}
            <div style={{
              padding: '32px',
              border: '1px solid #E5E1D8',
              borderRadius: 12,
              background: '#FAFAF7',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F4C81" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 20, fontWeight: 400, color: '#082A4A', marginBottom: 10,
              }}>
                CQC Registered
              </h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>
                Every centre listed on ScanBook is registered with the Care Quality Commission (CQC) or the relevant national regulator. We only partner with facilities that meet the highest standards of clinical safety and patient care.
              </p>
              <div style={{ marginTop: 16 }}>
                <a
                  href="https://www.cqc.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: '#0F4C81', textDecoration: 'underline', textDecorationColor: 'rgba(15,76,129,.3)' }}
                >
                  About CQC registration
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div style={{
              padding: '32px',
              border: '1px solid #E5E1D8',
              borderRadius: 12,
              background: '#FAFAF7',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 20, fontWeight: 400, color: '#082A4A', marginBottom: 10,
              }}>
                No GP Referral Needed
              </h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>
                You can book directly without seeing your GP first. All scans are reviewed by UK-registered consultant radiologists, and your detailed report is sent directly to you — and to your GP if you choose.
              </p>
              <div style={{ marginTop: 16 }}>
                <Link
                  href="/how-it-works"
                  style={{ fontSize: 13, color: '#0F4C81', textDecoration: 'underline', textDecorationColor: 'rgba(15,76,129,.3)' }}
                >
                  How the booking works
                </Link>
              </div>
            </div>

            {/* Column 3 */}
            <div style={{
              padding: '32px',
              border: '1px solid #E5E1D8',
              borderRadius: 12,
              background: '#FAFAF7',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 20, fontWeight: 400, color: '#082A4A', marginBottom: 10,
              }}>
                Reports in 24 Hours
              </h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>
                Most radiologist reports are delivered within 24 hours of your scan. You receive a clear, plain-English summary alongside the full clinical report — so you understand your results without needing a follow-up appointment.
              </p>
              <div style={{ marginTop: 16 }}>
                <Link
                  href="/services"
                  style={{ fontSize: 13, color: '#0F4C81', textDecoration: 'underline', textDecorationColor: 'rgba(15,76,129,.3)' }}
                >
                  View scan types and turnaround
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom trust strip */}
          <div style={{
            marginTop: 48,
            padding: '24px 32px',
            background: '#082A4A',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}>
            <div>
              <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: '#fff', marginBottom: 4 }}>
                Ready to book your scan?
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>
                Most patients are seen within 48 hours of booking.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link
                href="/search"
                style={{
                  padding: '12px 28px',
                  background: '#EF4444', color: '#fff',
                  borderRadius: 8, fontSize: 14, fontWeight: 600,
                  textDecoration: 'none', letterSpacing: 0.2,
                  transition: 'background .15s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#DC2626')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#EF4444')}
              >
                Find my scan
              </Link>
              <Link
                href="/how-it-works"
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,.1)',
                  border: '1px solid rgba(255,255,255,.2)',
                  color: '#fff',
                  borderRadius: 8, fontSize: 14, fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                How it works
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}

'use client'

import { useState, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TEST_CLINICS, toClinicCard } from '@/lib/clinics.data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── TYPES ────────────────────────────────────────────────────────────────────

type ScanType = 'mri' | 'ct' | 'ultrasound' | 'xray' | 'baby' | 'fullbody'
type SortBy = 'recommended' | 'price_asc' | 'rating'
type ReportSpeed = 'any' | '24h' | '48h' | '72h'
type ScannerQuality = 'any' | '1.5t' | '2t' | '3t'

interface SearchState {
  scanType: ScanType | null
  bodyPart: string
  location: string
  dateRange: string
  sortBy: SortBy
  priceMax: number
  scannerQuality: ScannerQuality
  reportSpeed: ReportSpeed
  insurers: string[]
  days: string[]
}

interface Clinic {
  id: string
  slug: string
  name: string
  address: string
  city: string
  rating: number
  reviewCount: number
  scannerType: string
  reportHours: number
  priceFrom: number
  nextSlot: string
  nextSlotDays: string[]
  insurers: string[]
  cqcRating: 'Outstanding' | 'Good' | 'Requires Improvement'
  capabilities: string[]
  featured: boolean
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const SCAN_TYPES: { id: ScanType; label: string; icon: string }[] = [
  { id: 'mri',       label: 'MRI',        icon: '🧠' },
  { id: 'ct',        label: 'CT Scan',    icon: '🔬' },
  { id: 'ultrasound',label: 'Ultrasound', icon: '🔊' },
  { id: 'xray',      label: 'X-Ray',      icon: '🦴' },
  { id: 'baby',      label: 'Baby Scan',  icon: '🤰' },
  { id: 'fullbody',  label: 'Full Body',  icon: '🫁' },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const INSURERS = ['Bupa', 'AXA', 'Aviva', 'Vitality', 'WPA', 'Cigna']

// Capability map: scanType → which capabilities to match
const SCAN_CAP_MAP: Record<ScanType, string[]> = {
  mri:       ['mri'],
  ct:        ['ct'],
  ultrasound:['ultrasound'],
  xray:      ['xray'],
  baby:      ['baby_scan', 'pregnancy_scan'],
  fullbody:  ['mri', 'ct'],
}

// ─── REAL CLINIC DATA ─────────────────────────────────────────────────────────

const ALL_CLINICS: Clinic[] = TEST_CLINICS.map(c => {
  const card = toClinicCard(c)
  return {
    id: card.id,
    slug: card.slug,
    name: card.name,
    address: card.address,
    city: card.city,
    rating: card.rating,
    reviewCount: card.reviewCount,
    scannerType: card.scannerType,
    reportHours: card.reportHours,
    priceFrom: card.priceFrom,
    nextSlot: card.nextSlot,
    nextSlotDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    insurers: card.insurers,
    cqcRating: (card.cqcRating === 'Pending' ? 'Good' : card.cqcRating) as Clinic['cqcRating'],
    capabilities: card.capabilities,
    featured: card.featured,
  }
})

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#F59E0B', fontSize: 12, letterSpacing: 1 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  )
}

function Chip({
  label,
  selected,
  onClick,
  small,
}: {
  label: string
  selected: boolean
  onClick: () => void
  small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: small ? 11 : 12,
        padding: small ? '3px 9px' : '5px 12px',
        borderRadius: 20,
        border: selected ? '1px solid #082A4A' : '1px solid #E5E1D8',
        background: selected ? '#082A4A' : 'white',
        color: selected ? 'white' : '#6B7280',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
        {title}
      </div>
      {children}
    </div>
  )
}

// ─── CLINIC CARD ──────────────────────────────────────────────────────────────

function ClinicCard({ clinic }: { clinic: Clinic }) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/clinics/${clinic.slug}`)}
      style={{
        background: 'white',
        border: clinic.featured ? '1.5px solid #0F4C81' : '1px solid #E5E1D8',
        borderRadius: 14,
        padding: '16px 18px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 16,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        if (!clinic.featured) (e.currentTarget as HTMLDivElement).style.borderColor = '#CBD5E1'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
      }}
      onMouseLeave={e => {
        if (!clinic.featured) (e.currentTarget as HTMLDivElement).style.borderColor = '#E5E1D8'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      <div>
        {/* Name + badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#082A4A' }}>{clinic.name}</span>
          {clinic.featured && (
            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 10, background: '#E8F0F8', color: '#0F4C81', fontWeight: 600 }}>
              Top rated
            </span>
          )}
          {clinic.reportHours === 24 && (
            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 10, background: '#DCFCE7', color: '#166534', fontWeight: 600 }}>
              24h report
            </span>
          )}
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 8, flexWrap: 'wrap' }}>
          {[
            clinic.city,
            clinic.scannerType !== 'Ultrasound' && clinic.scannerType !== 'MRI' ? `${clinic.scannerType} scanner` : null,
            `Next: ${clinic.nextSlot}`,
            `CQC ${clinic.cqcRating}`,
          ].filter(Boolean).map((item, i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#CBD5E1', display: 'inline-block', margin: '0 8px' }} />}
              <span style={{ fontSize: 12, color: '#6B7280' }}>{item}</span>
            </span>
          ))}
        </div>

        {/* Capabilities */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {clinic.capabilities.slice(0, 4).map(cap => (
            <span
              key={cap}
              style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#FAFAF7', color: '#6B7280', border: '1px solid #E5E1D8', textTransform: 'uppercase', letterSpacing: 0.3 }}
            >
              {cap.replace('_', ' ')}
            </span>
          ))}
          {clinic.insurers.slice(0, 2).map(ins => (
            <span
              key={ins}
              style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#FAFAF7', color: '#6B7280', border: '1px solid #E5E1D8' }}
            >
              {ins}
            </span>
          ))}
          {clinic.insurers.length > 2 && (
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#FAFAF7', color: '#94A3B8', border: '1px solid #E5E1D8' }}>
              +{clinic.insurers.length - 2} insurers
            </span>
          )}
        </div>
      </div>

      {/* Right: rating + price + button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: 120 }}>
        <div style={{ textAlign: 'right' }}>
          <StarRating rating={clinic.rating} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#082A4A' }}>{clinic.rating}</span>
            <span style={{ fontSize: 11, color: '#94A3B8' }}>({clinic.reviewCount})</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#082A4A', letterSpacing: '-0.5px' }}>
            £{clinic.priceFrom}
          </div>
          <div style={{ fontSize: 11, color: '#94A3B8' }}>incl. report</div>
        </div>
        <button
          onClick={e => {
            e.stopPropagation()
            router.push(`/book?clinic=${clinic.slug}`)
          }}
          style={{
            background: '#082A4A',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Book →
        </button>
      </div>
    </div>
  )
}

// ─── STEP PILLS ───────────────────────────────────────────────────────────────

function StepPills({ state }: { state: SearchState }) {
  const steps = [
    { label: '1 · Scan type', done: !!state.scanType },
    { label: '2 · Location', done: !!state.location },
    { label: '3 · Choose clinic', done: false, active: true },
  ]

  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            fontSize: 11,
            padding: '4px 12px',
            borderRadius: 20,
            border: step.active ? '1px solid #082A4A' : step.done ? '1px solid #CBD5E1' : '1px solid #E5E1D8',
            background: step.active ? '#082A4A' : 'white',
            color: step.active ? 'white' : step.done ? '#475569' : '#CBD5E1',
            fontWeight: 500,
          }}
        >
          {step.done && !step.active ? '✓ ' : ''}{step.label}
        </div>
      ))}
    </div>
  )
}

// ─── MAIN SEARCH CONTENT ──────────────────────────────────────────────────────

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const [search, setSearch] = useState<SearchState>({
    scanType: (searchParams.get('type') as ScanType) ?? null,
    bodyPart: searchParams.get('part') ?? '',
    location: searchParams.get('location') ?? '',
    dateRange: '',
    sortBy: 'recommended',
    priceMax: 800,
    scannerQuality: 'any',
    reportSpeed: 'any',
    insurers: [],
    days: [],
  })

  const updateSearch = useCallback((partial: Partial<SearchState>) => {
    setSearch(prev => ({ ...prev, ...partial }))
  }, [])

  const toggleArrayItem = useCallback((key: 'insurers' | 'days', value: string) => {
    setSearch(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }))
  }, [])

  const filteredClinics = ALL_CLINICS
    .filter(c => {
      // Scan type filter — only show clinics with matching capability
      if (search.scanType) {
        const requiredCaps = SCAN_CAP_MAP[search.scanType] ?? []
        if (requiredCaps.length > 0 && !requiredCaps.some(cap => c.capabilities.includes(cap))) return false
      }
      // Price filter
      if (search.priceMax < 800 && c.priceFrom > search.priceMax) return false
      // Scanner quality filter
      if (search.scannerQuality !== 'any') {
        const qMap: Record<string, number> = { '1.5t': 1.5, '2t': 2, '3t': 3 }
        const clinicT = parseFloat(c.scannerType.replace('T', ''))
        if (!isNaN(clinicT) && clinicT < qMap[search.scannerQuality]) return false
      }
      // Report speed filter
      if (search.reportSpeed !== 'any') {
        const hMap: Record<string, number> = { '24h': 24, '48h': 48, '72h': 72 }
        if (c.reportHours > 0 && c.reportHours > hMap[search.reportSpeed]) return false
      }
      // Insurance filter
      if (search.insurers.length > 0 && !search.insurers.some(ins => c.insurers.includes(ins))) return false
      // Days filter
      if (search.days.length > 0 && !search.days.some(d => c.nextSlotDays.includes(d))) return false
      return true
    })
    .sort((a, b) => {
      if (search.sortBy === 'price_asc') return a.priceFrom - b.priceFrom
      if (search.sortBy === 'rating') return b.rating - a.rating
      // recommended: featured first, then rating
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.rating - a.rating
    })

  const scanLabel = search.scanType
    ? SCAN_TYPES.find(s => s.id === search.scanType)?.label
    : null

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: "var(--font-dm-sans, 'DM Sans', system-ui, sans-serif)" }}>
      <style>{`
        @media (max-width: 768px) {
          .search-layout { grid-template-columns: 1fr !important; }
          .search-filter-panel { display: ${showFilters ? 'block' : 'none'} !important; position: static !important; }
          .search-hero-bar { flex-direction: column !important; border-radius: 10px !important; }
          .search-hero-bar > div { border-right: none !important; border-bottom: 1px solid #E5E1D8 !important; }
          .search-hero-bar > div:last-child { border-bottom: none !important; }
        }
      `}</style>

      <Navbar />

      {/* ─── SEARCH HERO ─── */}
      <div style={{ background: 'white', padding: '20px 24px 16px', borderBottom: '1px solid #E5E1D8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="search-hero-bar" style={{
            display: 'flex',
            border: '1.5px solid #082A4A',
            borderRadius: 12,
            overflow: 'hidden',
            background: 'white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}>
            {/* Scan type */}
            <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid #E5E1D8' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>Scan type</div>
              <select
                value={search.scanType ?? ''}
                onChange={e => updateSearch({ scanType: (e.target.value as ScanType) || null })}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: search.scanType ? '#082A4A' : '#CBD5E1', background: 'transparent', fontFamily: 'inherit', cursor: 'pointer' }}
              >
                <option value="">All scans</option>
                {SCAN_TYPES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            {/* Location */}
            <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid #E5E1D8' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>Location</div>
              <input
                value={search.location}
                onChange={e => updateSearch({ location: e.target.value })}
                placeholder="City or postcode"
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#082A4A', background: 'transparent', fontFamily: 'inherit' }}
              />
            </div>
            <button
              style={{
                background: '#082A4A',
                color: 'white',
                border: 'none',
                padding: '0 24px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      {/* Mobile filter toggle */}
      <div style={{ display: 'none' }} className="mobile-filter-toggle">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 20px' }}>
          <button
            onClick={() => setShowFilters(f => !f)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', background: showFilters ? '#082A4A' : 'white', color: showFilters ? 'white' : '#082A4A', border: '1.5px solid #082A4A', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
        </div>
        <style>{`.mobile-filter-toggle { display: block !important; } @media (min-width: 769px) { .mobile-filter-toggle { display: none !important; } }`}</style>
      </div>

      <div className="search-layout" style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>

        {/* ─── FILTERS ─── */}
        <div className="search-filter-panel" style={{ position: 'sticky', top: 20, alignSelf: 'start' }}>
          <div style={{ background: 'white', border: '1px solid #E5E1D8', borderRadius: 14, padding: 18 }}>

            <StepPills state={search} />

            {/* Scan type */}
            <FilterSection title="Scan type">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {SCAN_TYPES.map(s => (
                  <Chip
                    key={s.id}
                    label={s.label}
                    selected={search.scanType === s.id}
                    onClick={() => updateSearch({ scanType: search.scanType === s.id ? null : s.id })}
                    small
                  />
                ))}
              </div>
            </FilterSection>

            <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />

            {/* Sort */}
            <FilterSection title="Sort by">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {[
                  { id: 'recommended', label: 'Best match' },
                  { id: 'price_asc',   label: 'Cheapest' },
                  { id: 'rating',      label: 'Top rated' },
                ].map(s => (
                  <Chip
                    key={s.id}
                    label={s.label}
                    selected={search.sortBy === s.id as SortBy}
                    onClick={() => updateSearch({ sortBy: s.id as SortBy })}
                    small
                  />
                ))}
              </div>
            </FilterSection>

            <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />

            {/* Price */}
            <FilterSection title="Max price">
              <input
                type="range"
                min={100}
                max={800}
                step={10}
                value={search.priceMax}
                onChange={e => updateSearch({ priceMax: parseInt(e.target.value) })}
                style={{ width: '100%', accentColor: '#082A4A' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                <span>£100</span>
                <span style={{ color: '#082A4A', fontWeight: 600 }}>
                  {search.priceMax >= 800 ? 'Any price' : `Up to £${search.priceMax}`}
                </span>
              </div>
            </FilterSection>

            <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />

            {/* Scanner quality */}
            <FilterSection title="Scanner quality">
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {([['any', 'Any'], ['1.5t', '1.5T'], ['2t', '≥ 2T'], ['3t', '3T+']] as const).map(([val, label]) => (
                  <Chip
                    key={val}
                    label={label}
                    selected={search.scannerQuality === val}
                    onClick={() => updateSearch({ scannerQuality: val })}
                    small
                  />
                ))}
              </div>
            </FilterSection>

            <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />

            {/* Report speed */}
            <FilterSection title="Report delivery">
              <div style={{ display: 'flex', gap: 5 }}>
                {([['any', 'Any'], ['24h', '24h'], ['48h', '48h'], ['72h', '72h']] as const).map(([val, label]) => (
                  <Chip
                    key={val}
                    label={label}
                    selected={search.reportSpeed === val}
                    onClick={() => updateSearch({ reportSpeed: val })}
                    small
                  />
                ))}
              </div>
            </FilterSection>

            <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />

            {/* Days */}
            <FilterSection title="Available days">
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {DAYS.map(d => (
                  <Chip
                    key={d}
                    label={d}
                    selected={search.days.includes(d)}
                    onClick={() => toggleArrayItem('days', d)}
                    small
                  />
                ))}
              </div>
            </FilterSection>

            <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />

            {/* Insurers */}
            <FilterSection title="Insurance">
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {INSURERS.map(ins => (
                  <Chip
                    key={ins}
                    label={ins}
                    selected={search.insurers.includes(ins)}
                    onClick={() => toggleArrayItem('insurers', ins)}
                    small
                  />
                ))}
              </div>
            </FilterSection>

            {(search.insurers.length > 0 || search.days.length > 0 || search.scannerQuality !== 'any' || search.reportSpeed !== 'any' || search.priceMax < 800) && (
              <button
                onClick={() => updateSearch({ insurers: [], days: [], scannerQuality: 'any', reportSpeed: 'any', priceMax: 800 })}
                style={{ width: '100%', marginTop: 8, padding: '8px', background: 'none', border: '1px solid #E5E1D8', borderRadius: 8, fontSize: 12, color: '#6B7280', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* ─── RESULTS ─── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#6B7280' }}>
              <strong style={{ color: '#082A4A' }}>{filteredClinics.length} clinic{filteredClinics.length !== 1 ? 's' : ''}</strong>
              {search.location && <> in <strong style={{ color: '#082A4A' }}>{search.location}</strong></>}
              {scanLabel && <> · {scanLabel}</>}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>
              Prices include radiologist report
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredClinics.length > 0 ? (
              filteredClinics.map(clinic => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 24px', background: 'white', borderRadius: 14, border: '1px solid #E5E1D8' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#082A4A', marginBottom: 6 }}>No clinics match your filters</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
                  Try a different scan type or adjust your filters
                </div>
                <button
                  onClick={() => updateSearch({ scanType: null, scannerQuality: 'any', reportSpeed: 'any', priceMax: 800, insurers: [], days: [] })}
                  style={{ background: '#082A4A', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAFAF7' }} />}>
      <SearchPageContent />
    </Suspense>
  )
}

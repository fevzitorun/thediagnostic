'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// ─── TYPES ────────────────────────────────────────────────────────────────────

type ScanType = 'mri' | 'ct' | 'ultrasound' | 'xray' | 'baby' | 'fullbody'
type SortBy = 'recommended' | 'price_asc' | 'distance' | 'rating'
type ReportSpeed = 'any' | '24h' | '48h' | '72h'
type ScannerQuality = 'any' | '1.5t' | '2t' | '3t'
type Distance = '5' | '10' | '20' | 'any'

interface SearchState {
  scanType: ScanType | null
  bodyPart: string
  location: string
  dateRange: string
  sortBy: SortBy
  priceMax: number
  distance: Distance
  scannerQuality: ScannerQuality
  reportSpeed: ReportSpeed
  insurers: string[]
  days: string[]
}

interface Clinic {
  id: string
  name: string
  address: string
  city: string
  distanceMiles: number
  rating: number
  reviewCount: number
  scannerType: string
  reportHours: number
  priceFrom: number
  nextSlot: string
  nextSlotDays: string[]
  insurers: string[]
  cqcRating: 'Outstanding' | 'Good' | 'Requires Improvement'
  tags: string[]
  featured: boolean
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const SCAN_TYPES: { id: ScanType; label: string; icon: string }[] = [
  { id: 'mri',      label: 'MRI',        icon: '🧠' },
  { id: 'ct',       label: 'CT Scan',    icon: '🔬' },
  { id: 'ultrasound', label: 'Ultrasound', icon: '🔊' },
  { id: 'xray',     label: 'X-Ray',      icon: '🦴' },
  { id: 'baby',     label: 'Baby Scan',  icon: '🤰' },
  { id: 'fullbody', label: 'Full Body',  icon: '🫁' },
]

const BODY_PARTS: Record<ScanType, string[]> = {
  mri:       ['Head & Brain', 'Spine & Back', 'Knee', 'Shoulder', 'Hip', 'Abdomen', 'Pelvis', 'Heart', 'Whole Body'],
  ct:        ['Chest', 'Abdomen', 'Pelvis', 'Head', 'Spine', 'Coronary', 'Pulmonary'],
  ultrasound:['Abdomen', 'Pelvis', 'Thyroid', 'Breast', 'Vascular', 'Liver', 'Kidneys'],
  xray:      ['Chest', 'Hand & Wrist', 'Foot & Ankle', 'Knee', 'Spine', 'Hip', 'Shoulder'],
  baby:      ['8-11 weeks (early reassurance)', '12 weeks (dating)', '16-20 weeks (gender)', '20+ weeks (anomaly)', '26-32 weeks (3D/4D)', 'Growth scan'],
  fullbody:  ['Full Body MRI', 'Full Body CT', 'Executive Package'],
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const INSURERS = ['Bupa', 'AXA', 'Aviva', 'Vitality', 'WPA', 'Cigna']

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'Harley Street Imaging',
    address: '22 Harley Street',
    city: 'London W1G',
    distanceMiles: 0.8,
    rating: 4.9,
    reviewCount: 312,
    scannerType: '3T',
    reportHours: 24,
    priceFrom: 299,
    nextSlot: 'Tomorrow',
    nextSlotDays: ['Tue', 'Thu'],
    insurers: ['Bupa', 'AXA', 'Aviva'],
    cqcRating: 'Outstanding',
    tags: ['Free cancellation', 'Same day available'],
    featured: true,
  },
  {
    id: '2',
    name: 'London Scan Centre',
    address: '4 Cavendish Square',
    city: 'London W1G',
    distanceMiles: 1.4,
    rating: 4.7,
    reviewCount: 184,
    scannerType: '2.5T',
    reportHours: 48,
    priceFrom: 249,
    nextSlot: 'Mon 19 May',
    nextSlotDays: ['Mon', 'Wed', 'Fri'],
    insurers: ['AXA', 'Vitality'],
    cqcRating: 'Good',
    tags: ['Walk-in available'],
    featured: false,
  },
  {
    id: '3',
    name: 'City Diagnostic Centre',
    address: '8 Moorgate',
    city: 'London EC2',
    distanceMiles: 2.1,
    rating: 4.3,
    reviewCount: 97,
    scannerType: '1.5T',
    reportHours: 72,
    priceFrom: 195,
    nextSlot: 'Mon 19 May',
    nextSlotDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    insurers: ['Bupa'],
    cqcRating: 'Good',
    tags: ['Lowest price'],
    featured: false,
  },
  {
    id: '4',
    name: 'Canary Wharf Imaging',
    address: '1 Canada Square',
    city: 'London E14',
    distanceMiles: 3.8,
    rating: 4.8,
    reviewCount: 56,
    scannerType: '3T',
    reportHours: 24,
    priceFrom: 349,
    nextSlot: 'Thu 22 May',
    nextSlotDays: ['Thu', 'Fri'],
    insurers: ['Bupa', 'AXA', 'Aviva', 'Vitality', 'WPA'],
    cqcRating: 'Good',
    tags: ['Free parking', 'All insurers'],
    featured: false,
  },
]

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
        border: selected ? '1px solid #0F172A' : '1px solid #E2E8F0',
        background: selected ? '#0F172A' : 'white',
        color: selected ? 'white' : '#64748B',
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

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
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

function ClinicCard({ clinic, scanType }: { clinic: Clinic; scanType: ScanType | null }) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/clinic/${clinic.id}`)}
      style={{
        background: 'white',
        border: clinic.featured ? '1.5px solid #1A56FF' : '1px solid #E2E8F0',
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
        if (!clinic.featured) (e.currentTarget as HTMLDivElement).style.borderColor = '#E2E8F0'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      <div>
        {/* Name + badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{clinic.name}</span>
          {clinic.featured && (
            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 10, background: '#EEF2FF', color: '#4338CA', fontWeight: 600 }}>
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
            `${clinic.distanceMiles} mi · ${clinic.city}`,
            `${clinic.scannerType} scanner`,
            `Next: ${clinic.nextSlot}`,
            `CQC ${clinic.cqcRating}`,
          ].map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#CBD5E1', display: 'inline-block', margin: '0 8px' }} />}
              <span style={{ fontSize: 12, color: '#64748B' }}>{item}</span>
            </span>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {clinic.tags.map(tag => (
            <span
              key={tag}
              style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}
            >
              {tag}
            </span>
          ))}
          {clinic.insurers.slice(0, 2).map(ins => (
            <span
              key={ins}
              style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}
            >
              {ins}
            </span>
          ))}
          {clinic.insurers.length > 2 && (
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#F8FAFC', color: '#94A3B8', border: '1px solid #E2E8F0' }}>
              +{clinic.insurers.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Right: rating + price + button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: 120 }}>
        <div style={{ textAlign: 'right' }}>
          <StarRating rating={clinic.rating} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{clinic.rating}</span>
            <span style={{ fontSize: 11, color: '#94A3B8' }}>({clinic.reviewCount})</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px' }}>
            £{clinic.priceFrom}
          </div>
          <div style={{ fontSize: 11, color: '#94A3B8' }}>incl. report</div>
        </div>
        <button
          onClick={e => {
            e.stopPropagation()
            router.push(`/book/${clinic.id}`)
          }}
          style={{
            background: '#0F172A',
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

// ─── SEARCH BAR ───────────────────────────────────────────────────────────────

function SearchBar({
  state,
  onChange,
  onSearch,
}: {
  state: SearchState
  onChange: (partial: Partial<SearchState>) => void
  onSearch: () => void
}) {
  const fields = [
    {
      label: 'Scan type',
      value: state.scanType
        ? SCAN_TYPES.find(s => s.id === state.scanType)?.label
        : 'Select scan',
      placeholder: true,
    },
    {
      label: 'Body part',
      value: state.bodyPart || 'e.g. Chest',
      placeholder: !state.bodyPart,
    },
    {
      label: 'Location',
      value: state.location || 'City or postcode',
      placeholder: !state.location,
    },
    {
      label: 'When',
      value: state.dateRange || 'Any time',
      placeholder: !state.dateRange,
    },
  ]

  return (
    <div
      style={{
        display: 'flex',
        border: '1.5px solid #0F172A',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'white',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}
    >
      {fields.map((field, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRight: i < fields.length - 1 ? '1px solid #E2E8F0' : 'none',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
          onMouseLeave={e => (e.currentTarget.style.background = 'white')}
        >
          <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>
            {field.label}
          </div>
          <div style={{ fontSize: 13, fontWeight: field.placeholder ? 400 : 600, color: field.placeholder ? '#CBD5E1' : '#0F172A' }}>
            {field.value}
          </div>
        </div>
      ))}
      <button
        onClick={onSearch}
        style={{
          background: '#0F172A',
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
          transition: 'opacity 0.15s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        Search
      </button>
    </div>
  )
}

// ─── STEP PILLS ───────────────────────────────────────────────────────────────

function StepPills({ state }: { state: SearchState }) {
  const steps = [
    { label: '1 · Scan type', done: !!state.scanType },
    { label: '2 · Body part', done: !!state.bodyPart },
    { label: '3 · Location', done: !!state.location },
    { label: '4 · Date', done: !!state.dateRange },
    { label: '5 · Choose clinic', done: false, active: true },
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
            border: step.active
              ? '1px solid #0F172A'
              : step.done
              ? '1px solid #CBD5E1'
              : '1px solid #E2E8F0',
            background: step.active ? '#0F172A' : 'white',
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SearchPage() {
  const router = useRouter()

  const [search, setSearch] = useState<SearchState>({
    scanType: 'ct',
    bodyPart: 'Chest',
    location: 'London',
    dateRange: 'Mon – Fri, next week',
    sortBy: 'recommended',
    priceMax: 500,
    distance: '10',
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

  // Filter clinics based on state
  const filteredClinics = MOCK_CLINICS
    .filter(c => {
      if (search.priceMax < 500 && c.priceFrom > search.priceMax) return false
      if (search.distance !== 'any' && c.distanceMiles > parseInt(search.distance)) return false
      if (search.scannerQuality !== 'any') {
        const qMap: Record<string, number> = { '1.5t': 1.5, '2t': 2, '3t': 3 }
        const clinicT = parseFloat(c.scannerType.replace('T', ''))
        if (clinicT < qMap[search.scannerQuality]) return false
      }
      if (search.reportSpeed !== 'any') {
        const hMap: Record<string, number> = { '24h': 24, '48h': 48, '72h': 72 }
        if (c.reportHours > hMap[search.reportSpeed]) return false
      }
      if (search.insurers.length > 0 && !search.insurers.some(ins => c.insurers.includes(ins))) return false
      if (search.days.length > 0 && !search.days.some(d => c.nextSlotDays.includes(d))) return false
      return true
    })
    .sort((a, b) => {
      if (search.sortBy === 'price_asc') return a.priceFrom - b.priceFrom
      if (search.sortBy === 'distance') return a.distanceMiles - b.distanceMiles
      if (search.sortBy === 'rating') return b.rating - a.rating
      // recommended: featured first, then rating
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.rating - a.rating
    })

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ─── TOP BAR ─── */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px' }}>
          Scan<span style={{ color: '#1A56FF' }}>Book</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>Home</a>
          <a href="/how-it-works" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>How it works</a>
          <a href="/account" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>My Account</a>
          <button style={{ background: '#0F172A', color: 'white', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Book a scan
          </button>
        </div>
      </div>

      {/* ─── SEARCH HERO ─── */}
      <div style={{ background: 'white', padding: '24px 24px 20px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SearchBar state={search} onChange={updateSearch} onSearch={() => {}} />
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>

        {/* ─── FILTERS ─── */}
        <div style={{ position: 'sticky', top: 20, alignSelf: 'start' }}>
          <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, padding: 18 }}>

            {/* Step pills */}
            <StepPills state={search} />

            {/* Scan type */}
            <FilterSection title="Scan type">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {SCAN_TYPES.map(s => (
                  <Chip
                    key={s.id}
                    label={s.label}
                    selected={search.scanType === s.id}
                    onClick={() => updateSearch({ scanType: s.id, bodyPart: '' })}
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
                  { id: 'distance',    label: 'Nearest' },
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
                style={{ width: '100%', accentColor: '#0F172A' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                <span>£100</span>
                <span style={{ color: '#0F172A', fontWeight: 600 }}>
                  {search.priceMax >= 800 ? 'Any price' : `Up to £${search.priceMax}`}
                </span>
              </div>
            </FilterSection>

            <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />

            {/* Distance */}
            <FilterSection title="Distance">
              <div style={{ display: 'flex', gap: 5 }}>
                {([['5', '5 mi'], ['10', '10 mi'], ['20', '20 mi'], ['any', 'Any']] as const).map(([val, label]) => (
                  <Chip
                    key={val}
                    label={label}
                    selected={search.distance === val}
                    onClick={() => updateSearch({ distance: val })}
                    small
                  />
                ))}
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

            {/* Clear filters */}
            {(search.insurers.length > 0 || search.days.length > 0 || search.scannerQuality !== 'any' || search.reportSpeed !== 'any') && (
              <button
                onClick={() => updateSearch({ insurers: [], days: [], scannerQuality: 'any', reportSpeed: 'any', priceMax: 500, distance: 'any' })}
                style={{ width: '100%', marginTop: 8, padding: '8px', background: 'none', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12, color: '#64748B', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* ─── RESULTS ─── */}
        <div>
          {/* Result count + sort */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#64748B' }}>
              <strong style={{ color: '#0F172A' }}>{filteredClinics.length} clinics</strong> in London · CT Chest
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>
              Prices include radiologist report
            </div>
          </div>

          {/* Clinic cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredClinics.length > 0 ? (
              filteredClinics.map(clinic => (
                <ClinicCard key={clinic.id} clinic={clinic} scanType={search.scanType} />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 24px', background: 'white', borderRadius: 14, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 6 }}>No clinics match your filters</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>Try adjusting your scanner quality or price range</div>
                <button
                  onClick={() => updateSearch({ scannerQuality: 'any', reportSpeed: 'any', priceMax: 800, distance: 'any', insurers: [], days: [] })}
                  style={{ background: '#0F172A', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

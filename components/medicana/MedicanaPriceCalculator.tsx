'use client'

// Medicana Winchester — Price Calculator Widget
//
// Usage:
//   <MedicanaPriceCalculator bookingBaseUrl="https://medicana.co.uk/appointment" />
//
// Drop this into any Medicana clinic page on ScanBook.
// Colors use Medicana brand vars — override via props if needed.

import { useState, useEffect, useRef } from 'react'

// ─── TYPES ────────────────────────────────────────────────────────────────────

type ScanTypeId = 'mri_std' | 'mri_cont' | 'ct_std' | 'ct_cont' | 'us' | 'xray'

interface ScanTypeConfig {
  label: string
  urlPath: string
  tiers: [number, number, number, number, number] // [0, price_1, price_2, price_3, price_4plus]
  specials: string[]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

// Fixed-price specialist items (from Medicana price list)
const SPECIAL_ITEMS: Record<string, number> = {
  'Whole Body': 1330,
  'Prostate (Multiparametric)': 1080,
  'Liver': 1080,
  'Arthrogram (Joint)': 1030,
  'Leg Length (X-Ray)': 270,
}

const STANDARD_PARTS = [
  'Abdomen', 'Ankle', 'Brain/Head', 'Cervical Spine', 'Chest', 'Coccyx',
  'Elbow', 'Face', 'Foot', 'Hand', 'Hip', 'IAMs', 'Knee', 'Lumbar Spine',
  'Neck', 'Pelvis', 'Pituitary Fossa', 'Sacrum', 'Shoulder', 'Sinuses',
  'Thoracic Spine', 'Upper Arm', 'Forearm', 'Thigh', 'Calf', 'Wrist',
].sort()

const PRICING_CONFIG: Record<ScanTypeId, ScanTypeConfig> = {
  mri_std: {
    label: 'MRI Scan',
    urlPath: '3t-mri',
    tiers: [0, 455, 702, 975, 1190],
    specials: ['Whole Body', 'Prostate (Multiparametric)', 'Liver', 'Arthrogram (Joint)'],
  },
  mri_cont: {
    label: 'MRI with Contrast',
    urlPath: '3t-mri',
    tiers: [0, 565, 810, 1080, 1300],
    specials: ['Prostate (Multiparametric)', 'Liver'],
  },
  ct_std: {
    label: 'CT Scan',
    urlPath: 'ct-scan',
    tiers: [0, 525, 740, 920, 1080],
    specials: [],
  },
  ct_cont: {
    label: 'CT with Contrast',
    urlPath: 'ct-scan',
    tiers: [0, 635, 850, 1030, 1190],
    specials: [],
  },
  us: {
    label: 'Ultrasound',
    urlPath: 'radiology',
    tiers: [0, 380, 535, 705, 865],
    specials: [],
  },
  xray: {
    label: 'X-Ray',
    urlPath: 'radiology',
    tiers: [0, 107, 130, 163, 195],
    specials: ['Leg Length (X-Ray)'],
  },
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

interface Props {
  bookingBaseUrl?: string
  className?: string
}

export default function MedicanaPriceCalculator({
  bookingBaseUrl = 'https://medicana.co.uk/appointment',
  className = '',
}: Props) {
  const [scanType, setScanType] = useState<ScanTypeId>('mri_std')
  const [selected, setSelected] = useState<string[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [result, setResult] = useState<{ total: number; summary: string[]; url: string } | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const config = PRICING_CONFIG[scanType]

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Reset selection when scan type changes
  function handleScanTypeChange(id: ScanTypeId) {
    setScanType(id)
    setSelected([])
    setResult(null)
  }

  function toggleItem(item: string) {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
    setResult(null)
  }

  function calculate() {
    if (selected.length === 0) return

    let total = 0
    let standardCount = 0
    const summary: string[] = []

    selected.forEach(item => {
      if (SPECIAL_ITEMS[item] !== undefined) {
        total += SPECIAL_ITEMS[item]
        summary.push(`${item} (£${SPECIAL_ITEMS[item]})`)
      } else {
        standardCount++
        summary.push(item)
      }
    })

    if (standardCount > 0) {
      const idx = Math.min(standardCount, config.tiers.length - 1)
      total += config.tiers[idx]
    }

    const params = selected.map(p => `part=${encodeURIComponent(p)}`).join('&')
    const url = `${bookingBaseUrl}/${config.urlPath}/?scanType=${scanType}&${params}`

    setResult({ total, summary, url })
    setDropdownOpen(false)
  }

  const displayLabel =
    selected.length === 0
      ? 'Select body part(s)...'
      : `${selected.length} item${selected.length > 1 ? 's' : ''} selected`

  return (
    <div className={`font-sans max-w-4xl mx-auto my-10 ${className}`}>
      {/* ── Search Bar ─────────────────────────────────────────────────────── */}
      <div
        style={{ border: '1px solid #e1e4e8', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
        className="flex items-center bg-white h-[70px] relative"
      >
        {/* Scan type selector */}
        <div
          style={{ borderRight: '1px solid #f0f0f0' }}
          className="relative flex-none w-[220px] h-full sm:w-[200px]"
        >
          <select
            value={scanType}
            onChange={e => handleScanTypeChange(e.target.value as ScanTypeId)}
            className="w-full h-full border-none px-5 text-[15px] font-semibold cursor-pointer bg-transparent outline-none appearance-none pr-8"
            style={{ color: '#0f2b5b' }}
          >
            <option value="mri_std">MRI (Standard)</option>
            <option value="mri_cont">MRI with Contrast</option>
            <option value="ct_std">CT Scan</option>
            <option value="ct_cont">CT with Contrast</option>
            <option value="us">Ultrasound</option>
            <option value="xray">X-Ray</option>
          </select>
          <ChevronIcon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Body part selector */}
        <div ref={dropdownRef} className="relative flex-1 h-full cursor-pointer">
          <div
            onClick={() => setDropdownOpen(o => !o)}
            className="w-full h-full flex items-center px-5 text-[15px] select-none"
            style={{ color: selected.length > 0 ? '#0f2b5b' : '#777', fontWeight: selected.length > 0 ? 700 : 400 }}
          >
            {displayLabel}
          </div>
          <ChevronIcon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              style={{
                border: '1px solid #e1e4e8',
                borderRadius: 8,
                boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                top: 75,
              }}
              className="absolute left-0 right-0 bg-white max-h-[380px] overflow-y-auto z-50 pb-2"
            >
              {/* Specialized packages */}
              {config.specials.length > 0 && (
                <>
                  <GroupHeader label="Specialized Packages" />
                  {config.specials.map(item => (
                    <DropdownItem
                      key={item}
                      label={item}
                      checked={selected.includes(item)}
                      price={SPECIAL_ITEMS[item]}
                      onChange={() => toggleItem(item)}
                    />
                  ))}
                </>
              )}

              {/* Standard body parts */}
              <GroupHeader label="Body Parts" />
              {STANDARD_PARTS.map(part => (
                <DropdownItem
                  key={part}
                  label={part}
                  checked={selected.includes(part)}
                  onChange={() => toggleItem(part)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Check price button */}
        <div className="flex-none w-[160px] h-full p-2 sm:w-[140px]">
          <button
            onClick={calculate}
            disabled={selected.length === 0}
            className="w-full h-full rounded-md font-bold text-[13px] uppercase tracking-wide text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#0f2b5b' }}
            onMouseEnter={e => { if (selected.length > 0) (e.target as HTMLElement).style.backgroundColor = '#1e3a8a' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = '#0f2b5b' }}
          >
            Check Price
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-[13px] text-center mt-3 italic" style={{ color: '#888' }}>
        Building a multi-part scan? Select the specific areas you need above to see your combined total instantly.
      </p>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {result && (
        <div
          style={{ border: '1px solid #eef2f6', borderRadius: 8, animation: 'fadeIn 0.25s ease' }}
          className="mt-5 p-6 bg-[#fcfcfc] flex items-center justify-between gap-6 sm:flex-col sm:text-center"
        >
          <div>
            <div className="text-base font-bold mb-1" style={{ color: '#0f2b5b' }}>
              {config.label}
            </div>
            <div className="text-[13px] leading-relaxed max-w-md" style={{ color: '#666' }}>
              Includes: {result.summary.join(', ')}
            </div>
          </div>
          <div className="text-right sm:text-center flex-none">
            <span className="block text-[32px] font-extrabold" style={{ color: '#0f2b5b' }}>
              £{result.total}
            </span>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 px-8 py-3 rounded-md font-bold text-[13px] uppercase tracking-wide text-white no-underline transition-colors"
              style={{ backgroundColor: '#6bc1c6' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = '#0f2b5b' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = '#6bc1c6' }}
            >
              Book Now
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  )
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0f2b5b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function GroupHeader({ label }: { label: string }) {
  return (
    <div
      className="px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.8px] sticky top-0"
      style={{ background: '#f8fafc', color: '#64748b', borderBottom: '1px solid #eee' }}
    >
      {label}
    </div>
  )
}

function DropdownItem({
  label,
  checked,
  price,
  onChange,
}: {
  label: string
  checked: boolean
  price?: number
  onChange: () => void
}) {
  return (
    <div
      onClick={onChange}
      className="flex items-center justify-between px-5 py-3 cursor-pointer text-[14px] transition-colors hover:bg-[#f0f9ff]"
      style={{ color: '#333', borderBottom: '1px solid #f9f9f9' }}
    >
      <label className="flex items-center gap-3 cursor-pointer" onClick={e => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="scale-[1.2]"
          style={{ accentColor: '#6bc1c6' }}
        />
        {label}
      </label>
      {price !== undefined && (
        <span
          className="text-[12px] font-bold px-2 py-1 rounded"
          style={{ background: '#e0f2f1', color: '#00695c' }}
        >
          £{price}
        </span>
      )}
    </div>
  )
}

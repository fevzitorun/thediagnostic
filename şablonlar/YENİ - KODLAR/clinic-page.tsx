'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface ScanPackage {
  id: string
  name: string
  price: number
  duration: string
  bodyParts?: string[]
  tag?: 'popular' | 'fast' | '3t'
  reportHours: number
}

interface ClinicData {
  id: string
  slug: string
  name: string
  subtitle: string
  city: string
  address: string
  postcode: string
  phone: string
  email: string
  rating: number
  reviewCount: number
  googleRating: number
  googleReviewCount: number
  doctifyRating: number
  doctifyReviewCount: number
  scannerTesla: '1.5T' | '2T' | '3T'
  cqcRating: 'Outstanding' | 'Good' | 'Requires Improvement'
  cqcUrl: string
  reportHours: number
  priceFrom: number
  openNow: boolean
  hours: { day: string; time: string; isToday?: boolean }[]
  facilities: string[]
  transport: { icon: string; text: string }[]
  insurers: string[]
  packages: {
    mri: ScanPackage[]
    ct: ScanPackage[]
    ultrasound: ScanPackage[]
    xray: ScanPackage[]
    baby: ScanPackage[]
  }
  reviews: {
    author: string
    date: string
    rating: number
    text: string
    source: 'google' | 'doctify' | 'trustpilot'
    scanType?: string
  }[]
}

// ─── MEDICANA DATA ─────────────────────────────────────────────────────────────
// TODO Enes: Bu objeyi DB'den getir — /api/clinics/[slug] endpoint'i döndürecek

const MEDICANA: ClinicData = {
  id: 'medicana-winchester',
  slug: 'medicana-winchester',
  name: 'Medicana Winchester',
  subtitle: 'Private Diagnostic Imaging Centre',
  city: 'Winchester',
  address: 'Medicana Winchester Clinic, Hampshire',
  postcode: 'SO23 9LQ',
  phone: '01962 123 456',
  email: 'hello@medicana-winchester.co.uk',
  rating: 4.9,
  reviewCount: 312,
  googleRating: 4.8,
  googleReviewCount: 214,
  doctifyRating: 4.9,
  doctifyReviewCount: 98,
  scannerTesla: '3T',
  cqcRating: 'Outstanding',
  cqcUrl: 'https://www.cqc.org.uk',
  reportHours: 24,
  priceFrom: 75,
  openNow: true,
  hours: [
    { day: 'Monday', time: '8am – 7pm' },
    { day: 'Tuesday', time: '8am – 7pm' },
    { day: 'Wednesday', time: '8am – 7pm', isToday: true },
    { day: 'Thursday', time: '8am – 7pm' },
    { day: 'Friday', time: '8am – 6pm' },
    { day: 'Saturday', time: '9am – 4pm' },
    { day: 'Sunday', time: 'Closed' },
  ],
  facilities: [
    '3T MRI Scanner',
    'CT and Ultrasound Suite',
    'Private Baby Scan Room',
    'Wheelchair accessible',
    'Free parking on-site',
    '5 min from Winchester station',
  ],
  transport: [
    { icon: '🚉', text: '5 minute walk from Winchester station' },
    { icon: '🚗', text: 'Free on-site parking' },
    { icon: '🚌', text: 'Bus routes 1, 2 and X64 stop nearby' },
    { icon: '♿', text: 'Fully wheelchair accessible' },
  ],
  insurers: ['Bupa', 'AXA', 'Aviva', 'Vitality', 'WPA'],
  packages: {
    mri: [
      { id: 'mri-1', name: 'MRI — 1 Body Part', price: 275, duration: '45 min', tag: 'popular', reportHours: 24, bodyParts: ['Brain & Head', 'Lumbar Spine', 'Cervical Spine', 'Knee', 'Shoulder', 'Hip', 'Abdomen', 'Pelvis', 'Wrist', 'Ankle', 'Foot', 'Elbow'] },
      { id: 'mri-2', name: 'MRI — 2 Body Parts', price: 445, duration: '75 min', reportHours: 24, bodyParts: ['Brain & Head', 'Lumbar Spine', 'Cervical Spine', 'Knee', 'Shoulder', 'Hip'] },
      { id: 'mri-3', name: 'MRI — 3 Body Parts', price: 575, duration: '90 min', reportHours: 48, bodyParts: ['Brain & Head', 'Lumbar Spine', 'Cervical Spine', 'Knee', 'Shoulder', 'Hip'] },
      { id: 'mri-full', name: 'Full Body MRI', price: 1450, duration: '3 hrs', tag: '3t', reportHours: 48, bodyParts: [] },
    ],
    ct: [
      { id: 'ct-chest', name: 'CT Chest', price: 199, duration: '30 min', tag: 'fast', reportHours: 24 },
      { id: 'ct-abd', name: 'CT Abdomen & Pelvis', price: 249, duration: '30 min', reportHours: 24 },
      { id: 'ct-head', name: 'CT Head', price: 185, duration: '20 min', tag: 'fast', reportHours: 24 },
      { id: 'ct-coronary', name: 'CT Coronary Angiogram', price: 595, duration: '60 min', reportHours: 48 },
    ],
    ultrasound: [
      { id: 'us-abd', name: 'Abdominal Ultrasound', price: 99, duration: '30 min', tag: 'popular', reportHours: 24 },
      { id: 'us-pelvis', name: 'Pelvic Ultrasound', price: 99, duration: '30 min', reportHours: 24 },
      { id: 'us-thyroid', name: 'Thyroid Ultrasound', price: 115, duration: '30 min', reportHours: 24 },
      { id: 'us-breast', name: 'Breast Ultrasound', price: 125, duration: '30 min', reportHours: 24 },
    ],
    xray: [
      { id: 'xray-std', name: 'X-Ray (single view)', price: 75, duration: '15 min', tag: 'fast', reportHours: 24 },
      { id: 'xray-chest', name: 'Chest X-Ray', price: 75, duration: '15 min', reportHours: 24 },
      { id: 'xray-joint', name: 'Joint X-Ray', price: 85, duration: '15 min', reportHours: 24 },
    ],
    baby: [
      { id: 'baby-early', name: 'Early Reassurance Scan', price: 89, duration: '30 min', reportHours: 0 },
      { id: 'baby-dating', name: 'Dating Scan (12 weeks)', price: 99, duration: '30 min', reportHours: 0 },
      { id: 'baby-gender', name: 'Gender Reveal Scan', price: 119, duration: '30 min', reportHours: 0 },
      { id: 'baby-4d', name: '3D/4D Baby Scan', price: 149, duration: '45 min', tag: 'popular', reportHours: 0 },
    ],
  },
  reviews: [
    { author: 'Sarah M.', date: '2 weeks ago', rating: 5, text: 'Incredibly professional from start to finish. The radiographer explained everything clearly and I had my report within 24 hours. Would highly recommend to anyone needing a private scan.', source: 'google', scanType: 'MRI Knee' },
    { author: 'James P.', date: '1 month ago', rating: 5, text: 'Booked online in minutes, seen on time, and the 3T scanner produced crystal-clear images. My consultant was impressed with the quality of the report.', source: 'doctify', scanType: 'MRI Brain' },
    { author: 'Emma R.', date: '3 weeks ago', rating: 5, text: 'The baby scan team were so warm and reassuring. We got beautiful 4D images and they took their time to show us everything. Perfect experience.', source: 'google', scanType: '4D Baby Scan' },
    { author: 'David K.', date: '2 months ago', rating: 4, text: 'Very well-organised clinic with friendly staff. Only slight quibble was a 10-minute wait but the scan itself was excellent value for the quality.', source: 'google', scanType: 'CT Chest' },
  ],
}

// ─── SCAN TYPE CONFIG ─────────────────────────────────────────────────────────

const SCAN_TABS = [
  { id: 'mri', label: 'MRI' },
  { id: 'ct', label: 'CT Scan' },
  { id: 'ultrasound', label: 'Ultrasound' },
  { id: 'xray', label: 'X-Ray' },
  { id: 'baby', label: 'Baby Scan' },
] as const

type ScanTab = typeof SCAN_TABS[number]['id']

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ color: '#f59e0b', fontSize: size, letterSpacing: 1 }}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

function TagBadge({ tag }: { tag: ScanPackage['tag'] }) {
  if (!tag) return null
  const config = {
    popular: { label: 'Most popular', bg: '#fff8e6', color: '#b07800' },
    fast: { label: 'Fast report', bg: '#e6faf7', color: '#00a888' },
    '3t': { label: '3T scanner', bg: '#f3e8ff', color: '#7c3aed' },
  }[tag]
  return (
    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: config.bg, color: config.color, letterSpacing: 0.3, textTransform: 'uppercase' }}>
      {config.label}
    </span>
  )
}

// ─── BOOKING SIDEBAR ─────────────────────────────────────────────────────────

function BookingSidebar({ clinic }: { clinic: ClinicData }) {
  const today = new Date()
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return {
      label: i === 0 ? 'Today' : d.toLocaleDateString('en-GB', { weekday: 'short' }),
      num: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    }
  })

  const [selectedScan, setSelectedScan] = useState('mri-1')
  const [selectedBodyPart, setSelectedBodyPart] = useState('')
  const [selectedDate, setSelectedDate] = useState(0)

  const allPackages = Object.values(clinic.packages).flat()
  const currentPackage = allPackages.find(p => p.id === selectedScan)
  const currentBodyParts = currentPackage?.bodyParts ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* BOOKING CARD */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '24px 20px' }}>
        <div style={{ fontSize: 11, color: '#999', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Scans from</div>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, color: '#111' }}>£{clinic.priceFrom}</span>
          <span style={{ fontSize: 13, color: '#999', marginLeft: 6 }}>per scan</span>
        </div>

        {/* Scan type select */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Scan type
          </label>
          <select
            value={selectedScan}
            onChange={e => { setSelectedScan(e.target.value); setSelectedBodyPart('') }}
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ebebeb', borderRadius: 9, fontSize: 13, fontFamily: 'inherit', color: '#222', background: '#fff', cursor: 'pointer', outline: 'none' }}
          >
            <optgroup label="MRI">
              {clinic.packages.mri.map(p => <option key={p.id} value={p.id}>{p.name} (£{p.price})</option>)}
            </optgroup>
            <optgroup label="CT Scan">
              {clinic.packages.ct.map(p => <option key={p.id} value={p.id}>{p.name} (£{p.price})</option>)}
            </optgroup>
            <optgroup label="Ultrasound">
              {clinic.packages.ultrasound.map(p => <option key={p.id} value={p.id}>{p.name} (£{p.price})</option>)}
            </optgroup>
            <optgroup label="X-Ray">
              {clinic.packages.xray.map(p => <option key={p.id} value={p.id}>{p.name} (£{p.price})</option>)}
            </optgroup>
            <optgroup label="Baby Scan">
              {clinic.packages.baby.map(p => <option key={p.id} value={p.id}>{p.name} (£{p.price})</option>)}
            </optgroup>
          </select>
        </div>

        {/* Body part — only for MRI */}
        {currentBodyParts.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              Body part
            </label>
            <select
              value={selectedBodyPart}
              onChange={e => setSelectedBodyPart(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ebebeb', borderRadius: 9, fontSize: 13, fontFamily: 'inherit', color: selectedBodyPart ? '#222' : '#bbb', background: '#fff', cursor: 'pointer', outline: 'none' }}
            >
              <option value="">Choose a body part…</option>
              {currentBodyParts.map(bp => <option key={bp} value={bp}>{bp}</option>)}
            </select>
          </div>
        )}

        {/* Date picker */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Preferred date
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(i)}
                style={{
                  padding: '8px 4px', border: `1.5px solid ${selectedDate === i ? '#00C9A7' : '#ebebeb'}`,
                  borderRadius: 9, background: selectedDate === i ? '#e6faf7' : '#fff',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
                }}
              >
                <span style={{ fontSize: 10, color: selectedDate === i ? '#00a888' : '#999', fontWeight: 600 }}>{d.label}</span>
                <span style={{ fontSize: 11, color: selectedDate === i ? '#00a888' : '#333', fontWeight: selectedDate === i ? 600 : 400 }}>{d.num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          style={{ width: '100%', padding: '13px 0', background: '#00C9A7', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.15s', letterSpacing: -0.2 }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Check Availability →
        </button>

        {/* Trust notes */}
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { icon: '✓', text: 'Free cancellation up to 24 hours before' },
            { icon: '✓', text: 'CQC registered centre' },
            { icon: '✓', text: 'Secure payment via Stripe' },
          ].map((n, i) => (
            <div key={i} style={{ display: 'flex', gap: 7, fontSize: 12, color: '#999', alignItems: 'flex-start' }}>
              <span style={{ color: '#00C9A7', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{n.icon}</span>
              {n.text}
            </div>
          ))}
        </div>
      </div>

      {/* PRICE SUMMARY */}
      {currentPackage && (
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 14 }}>Price summary</div>
          {[
            { label: currentPackage.name, value: `£${currentPackage.price}` },
            { label: "Radiologist's report", value: 'Included' },
            { label: 'Digital images (CD/download)', value: 'Included' },
            { label: 'ScanBook fee', value: '£0' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none', fontSize: i === 3 ? 14 : 13, fontWeight: i === 3 ? 600 : 400, color: '#222' }}>
              <span style={{ color: i < 3 ? '#666' : '#111' }}>{row.label}</span>
              <span style={{ color: i === 3 ? '#111' : '#444' }}>{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* OPENING HOURS */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '18px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 14 }}>Opening hours</div>
        {clinic.hours.map((h, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < clinic.hours.length - 1 ? '1px solid #f5f5f5' : 'none', fontSize: 12 }}>
            <span style={{ color: h.isToday ? '#111' : '#666', fontWeight: h.isToday ? 600 : 400 }}>{h.day}{h.isToday ? ' (today)' : ''}</span>
            <span style={{ color: h.time === 'Closed' ? '#f87171' : h.isToday ? '#00a888' : '#444', fontWeight: h.isToday ? 600 : 400, display: 'flex', alignItems: 'center', gap: 5 }}>
              {h.time}
              {h.isToday && h.time !== 'Closed' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C9A7', display: 'inline-block' }} />}
            </span>
          </div>
        ))}
      </div>

      {/* FACILITIES */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '18px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 12 }}>Facilities</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {clinic.facilities.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#444' }}>
              <span style={{ color: '#00C9A7', fontWeight: 700, flexShrink: 0 }}>✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

// ─── SCAN PACKAGES SECTION ────────────────────────────────────────────────────

function ScanPackages({ packages }: { packages: ClinicData['packages'] }) {
  const [activeTab, setActiveTab] = useState<ScanTab>('mri')
  const [expandedMRI, setExpandedMRI] = useState(false)

  const currentPackages = packages[activeTab]

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
        {SCAN_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '7px 14px', border: `1.5px solid ${activeTab === tab.id ? '#111' : '#ebebeb'}`,
              borderRadius: 8, fontSize: 13, cursor: 'pointer', background: activeTab === tab.id ? '#111' : '#fff',
              color: activeTab === tab.id ? '#fff' : '#666', fontFamily: 'inherit', fontWeight: 400, transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Package rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {currentPackages.map(pkg => (
          <div
            key={pkg.id}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '15px 17px', background: '#fff', borderRadius: 11, border: '1px solid #ebebeb',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#00C9A7'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 3px 14px rgba(0,201,167,.07)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#ebebeb'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>{pkg.name}</span>
                <TagBadge tag={pkg.tag} />
              </div>
              <div style={{ display: 'flex', gap: 10, fontSize: 12, color: '#bbb' }}>
                <span>{pkg.duration}</span>
                {pkg.reportHours > 0 && <span>· Report in {pkg.reportHours}h</span>}
                {pkg.reportHours === 0 && <span>· Same-day results</span>}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 21, color: '#111' }}>£{pkg.price}</span>
              <button
                style={{ padding: '8px 16px', border: '1.5px solid #00C9A7', borderRadius: 8, background: '#fff', color: '#00a888', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#00C9A7'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#00a888' }}
              >
                Book →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MRI body parts grid */}
      {activeTab === 'mri' && (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: '#666', marginBottom: 11 }}>
            <span style={{ width: 3, height: 13, background: '#00C9A7', borderRadius: 2, flexShrink: 0, display: 'block' }} />
            Available body parts
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {(packages.mri[0].bodyParts ?? []).slice(0, expandedMRI ? 99 : 8).map(bp => (
              <div
                key={bp}
                style={{ padding: '9px 11px', border: '1px solid #ebebeb', borderRadius: 8, fontSize: 12, color: '#222', cursor: 'pointer', transition: 'all 0.15s', background: '#fff', lineHeight: 1.3 }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#00C9A7'; (e.currentTarget as HTMLDivElement).style.background = '#e6faf7'; (e.currentTarget as HTMLDivElement).style.color = '#00a888' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#ebebeb'; (e.currentTarget as HTMLDivElement).style.background = '#fff'; (e.currentTarget as HTMLDivElement).style.color = '#222' }}
              >
                {bp}
              </div>
            ))}
            {!expandedMRI && (packages.mri[0].bodyParts ?? []).length > 8 && (
              <div
                onClick={() => setExpandedMRI(true)}
                style={{ padding: '9px 11px', border: '1px dashed #ebebeb', borderRadius: 8, fontSize: 12, color: '#bbb', cursor: 'pointer', background: '#f8f8f8', lineHeight: 1.3 }}
              >
                +{(packages.mri[0].bodyParts ?? []).length - 8} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

function Reviews({ clinic }: { clinic: ClinicData }) {
  return (
    <div>
      {/* Source boxes */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { name: 'Google', rating: clinic.googleRating, count: clinic.googleReviewCount, color: '#4285f4' },
          { name: 'Doctify', rating: clinic.doctifyRating, count: clinic.doctifyReviewCount, color: '#00c896' },
        ].map(s => (
          <div key={s.name} style={{ border: '1px solid #ebebeb', borderRadius: 12, padding: '16px 20px', background: '#fff', display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, color: s.color }}>{s.name}</div>
            <div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#111', lineHeight: 1 }}>{s.rating}</div>
              <Stars rating={s.rating} />
              <div style={{ fontSize: 11, color: '#bbb', marginTop: 1 }}>{s.count} reviews</div>
            </div>
          </div>
        ))}
      </div>

      {/* Review cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {clinic.reviews.map((r, i) => (
          <div key={i} style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 11, padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>{r.author}</div>
                {r.scanType && <div style={{ fontSize: 11, color: '#00a888', fontWeight: 500 }}>{r.scanType}</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <Stars rating={r.rating} />
                <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>{r.date}</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0 }}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ClinicPage() {
  // TODO Enes: replace MEDICANA with fetched data
  // const clinic = await fetchClinic(params.slug)
  const clinic = MEDICANA

  return (
    <>
      <style>{`
        :root {
          --teal: #00C9A7;
          --teal-dark: #00a888;
          --teal-light: #e6faf7;
          --black: #111;
          --text: #222;
          --muted: #666;
          --subtle: #999;
          --border: #ebebeb;
          --bg: #f8f8f8;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #fff; color: var(--text); -webkit-font-smoothing: antialiased; }
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      {/* NAV */}
      <nav style={{ height: 60, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ebebeb', position: 'sticky', top: 0, background: '#fff', zIndex: 200 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 20, fontWeight: 700, color: '#111' }}>Scan</span>
          <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 20, fontWeight: 700, color: '#00C9A7' }}>Book</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {['Services', 'How it works', 'Find a Centre', 'For Clinics', 'Blog'].map(l => (
            <a key={l} href="#" style={{ padding: '7px 12px', fontSize: 13, color: '#666', textDecoration: 'none', borderRadius: 7, transition: 'all .15s' }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ padding: '7px 16px', border: '1.5px solid #ebebeb', borderRadius: 7, background: '#fff', fontSize: 13, cursor: 'pointer', color: '#222', fontFamily: 'inherit' }}>Sign In</button>
          <button style={{ padding: '8px 18px', border: 'none', borderRadius: 7, background: '#00C9A7', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>For Business</button>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div style={{ padding: '10px 48px', fontSize: 12, color: '#bbb', borderBottom: '1px solid #f5f5f5' }}>
        <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
        {' / '}
        <Link href="/centres" style={{ color: '#999', textDecoration: 'none' }}>Imaging Centres</Link>
        {' / '}
        <Link href="/centres/winchester" style={{ color: '#999', textDecoration: 'none' }}>Winchester</Link>
        {' / '}
        <span style={{ color: '#444' }}>{clinic.name}</span>
      </div>

      {/* GALLERY */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 48px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '200px 200px', gap: 8, borderRadius: 16, overflow: 'hidden' }}>
          {[
            { label: '🏥', cls: 'main', span: true, bg: '#eef5f2' },
            { label: '🧲', bg: '#f0eef5' },
            { label: '🛋️', bg: '#f5f2ee' },
            { label: '🅿️', bg: '#eef0f5' },
            { label: '⚕️', bg: '#f2f5ee' },
          ].map((cell, i) => (
            <div
              key={i}
              style={{
                background: cell.bg, display: 'grid', placeItems: 'center', fontSize: cell.span ? 56 : 32, color: '#ddd', cursor: 'pointer', gridRow: cell.span ? 'span 2' : undefined, border: '1px solid #ebebeb',
              }}
            >
              {cell.label}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'right', marginTop: 10 }}>
          <button style={{ fontSize: 12, color: '#666', border: '1.5px solid #ebebeb', borderRadius: 7, padding: '6px 14px', background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
            Show all photos
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 48px 60px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>

        {/* LEFT COLUMN */}
        <div>

          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
              <div>
                <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, letterSpacing: -0.8, color: '#111', lineHeight: 1.15, marginBottom: 4 }}>
                  {clinic.name}
                </h1>
                <div style={{ fontSize: 14, color: '#666' }}>{clinic.subtitle}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginTop: 6 }}>
                <button style={{ padding: '8px 14px', border: '1.5px solid #ebebeb', borderRadius: 8, fontSize: 13, color: '#666', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
                  ♡ Save
                </button>
                <button style={{ padding: '8px 14px', border: '1.5px solid #ebebeb', borderRadius: 8, fontSize: 13, color: '#666', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
                  ↑ Share
                </button>
              </div>
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 13, color: '#666', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#111' }}>
                <Stars rating={clinic.rating} size={13} />
                <span>{clinic.rating}</span>
                <span style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>({clinic.reviewCount} reviews)</span>
              </div>
              <span>·</span>
              <span>{clinic.city}, {clinic.address.split(',')[1]?.trim()}</span>
              <span>·</span>
              <span style={{ color: clinic.openNow ? '#00a888' : '#f87171', fontWeight: 500 }}>
                {clinic.openNow ? '● Open now' : '● Closed'}
              </span>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {[
                { label: `CQC ${clinic.cqcRating}`, bg: '#e6faf7', color: '#00a888', border: '#b2edd8' },
                { label: `${clinic.scannerTesla} MRI Scanner`, bg: '#f3e8ff', color: '#7c3aed', border: '#ddd6fe' },
                { label: `Report in ${clinic.reportHours}h`, bg: '#f8f8f8', color: '#666', border: '#ebebeb' },
                { label: 'Free cancellation', bg: '#f8f8f8', color: '#666', border: '#ebebeb' },
              ].map(b => (
                <span key={b.label} style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 5, letterSpacing: 0.5, background: b.bg, color: b.color, border: `1px solid ${b.border}`, textTransform: 'uppercase' }}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Overview pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {[
              `${clinic.scannerTesla} MRI Scanner`,
              `From £${clinic.priceFrom}`,
              `${clinic.reportHours}h report`,
              'Free parking',
              'Baby scan suite',
            ].map((pill, i) => (
              <div key={i} style={{ padding: '8px 14px', border: '1.5px solid #ebebeb', borderRadius: 9, fontSize: 13, color: '#222', background: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#00C9A7' }}>✓</span>
                {pill}
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: '#ebebeb', margin: '20px 0' }} />

          {/* Scans section */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: '#bbb', fontWeight: 500, marginBottom: 14, textTransform: 'uppercase' }}>Available scans</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, letterSpacing: -0.4, color: '#111', marginBottom: 16 }}>Book a scan at {clinic.name}</h2>
            <ScanPackages packages={clinic.packages} />
          </div>

          <div style={{ height: 1, background: '#ebebeb', margin: '20px 0' }} />

          {/* Reviews */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: '#bbb', fontWeight: 500, marginBottom: 14, textTransform: 'uppercase' }}>Patient reviews</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, letterSpacing: -0.4, color: '#111', marginBottom: 16 }}>What patients say</h2>
            <Reviews clinic={clinic} />
          </div>

          <div style={{ height: 1, background: '#ebebeb', margin: '20px 0' }} />

          {/* About */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: '#bbb', fontWeight: 500, marginBottom: 14, textTransform: 'uppercase' }}>About</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, letterSpacing: -0.4, color: '#111', marginBottom: 16 }}>About {clinic.name}</h2>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, marginBottom: 12 }}>
              {clinic.name} is a CQC-registered private diagnostic imaging centre offering a full range of MRI, CT, ultrasound, X-Ray and pregnancy scans. Located in the heart of Winchester with free parking and excellent transport links, the clinic is designed around patient comfort and speed.
            </p>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>
              The centre operates a {clinic.scannerTesla} MRI scanner — the highest field strength available in the region — producing exceptional image quality for complex neurological, musculoskeletal, and oncological cases. Radiologist reports are delivered within {clinic.reportHours} hours via a secure patient portal.
            </p>

            {/* Insurers */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 10 }}>Insurance accepted</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {clinic.insurers.map(ins => (
                  <span key={ins} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 7, border: '1px solid #ebebeb', color: '#444', background: '#f8f8f8' }}>{ins}</span>
                ))}
                <span style={{ fontSize: 12, padding: '5px 12px', borderRadius: 7, border: '1px solid #ebebeb', color: '#bbb', background: '#f8f8f8' }}>Self-pay welcome</span>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: '#ebebeb', margin: '20px 0' }} />

          {/* Location */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: '#bbb', fontWeight: 500, marginBottom: 14, textTransform: 'uppercase' }}>Location</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, letterSpacing: -0.4, color: '#111', marginBottom: 16 }}>Getting here</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Map placeholder */}
              <div style={{ background: '#f0f0f0', borderRadius: 14, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#ccc', border: '1px solid #ebebeb' }}>
                🗺️
                {/* TODO Enes: embed Google Maps iframe or Mapbox */}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 4 }}>{clinic.name}</div>
                <div style={{ fontSize: 13, color: '#666', marginBottom: 18 }}>{clinic.address}<br />{clinic.postcode}</div>
                {clinic.transport.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#444', marginBottom: 10 }}>
                    <span style={{ width: 28, height: 28, background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{t.icon}</span>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN — BOOKING SIDEBAR */}
        <div style={{ position: 'sticky', top: 76 }}>
          <BookingSidebar clinic={clinic} />
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #ebebeb', padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#bbb' }}>
        <span>
          <span style={{ fontWeight: 700, color: '#111' }}>Scan</span>
          <span style={{ fontWeight: 700, color: '#00C9A7' }}>Book</span>
        </span>
        <span>© 2025 The Connective UK Ltd · CQC Partner Network · Registered in England and Wales</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Cookies'].map(l => (
            <a key={l} href="#" style={{ color: '#bbb', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>
    </>
  )
}

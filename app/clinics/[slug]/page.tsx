'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClinicBySlug, type ClinicData, type ScanPackage } from '@/lib/clinics.data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span style={{ fontSize: size, letterSpacing: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#FBBF24' : '#E5E7EB' }}>★</span>
      ))}
    </span>
  )
}

function TagBadge({ tag }: { tag?: string }) {
  if (!tag) return null
  const map: Record<string, { label: string; bg: string; color: string }> = {
    popular: { label: 'Most Popular', bg: '#DBEAFE', color: '#1D4ED8' },
    fast:    { label: 'Fast Results', bg: '#D1FAE5', color: '#065F46' },
    '3t':    { label: '3T Scanner',   bg: '#F3E8FF', color: '#6D28D9' },
    hd:      { label: 'HD 4D',        bg: '#FDE68A', color: '#92400E' },
  }
  const style = map[tag]
  if (!style) return null
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: style.bg, color: style.color }}>
      {style.label}
    </span>
  )
}

// ─── BOOKING SIDEBAR ─────────────────────────────────────────────────────────

type ScanTab = 'mri' | 'ct' | 'ultrasound' | 'xray' | 'baby' | 'pregnancy'

const TAB_LABELS: Record<ScanTab, string> = {
  mri: 'MRI', ct: 'CT', ultrasound: 'Ultrasound', xray: 'X-Ray', baby: 'Baby', pregnancy: 'Pregnancy',
}

function BookingSidebar({ clinic }: { clinic: ClinicData }) {
  const availableTabs = (Object.keys(clinic.packages) as ScanTab[]).filter(
    k => (clinic.packages[k]?.length ?? 0) > 0
  )
  const [activeTab, setActiveTab] = useState<ScanTab>(availableTabs[0] ?? 'mri')
  const [selectedPkg, setSelectedPkg] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState(0)

  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return {
      label: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      num: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    }
  })

  const currentPackages: ScanPackage[] = clinic.packages[activeTab] ?? []
  const currentPackage = currentPackages.find(p => p.id === selectedPkg) ?? currentPackages[0]
  const bodyParts: string[] = currentPackage?.bodyParts ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Price + book panel */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: '#111' }}>
            £{currentPackage?.price ?? clinic.priceFrom}
          </span>
          <span style={{ fontSize: 13, color: '#999' }}>incl. radiologist report</span>
        </div>
        <div style={{ fontSize: 12, color: '#0F4C81', fontWeight: 500, marginBottom: 16 }}>
          ● {clinic.reportHours === 0 ? 'Same-day results' : `Report in ${clinic.reportHours}h`}
        </div>

        {/* Scan type tabs */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {availableTabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedPkg('') }}
              style={{
                padding: '5px 11px', border: `1.5px solid ${activeTab === tab ? '#111' : '#ebebeb'}`,
                borderRadius: 7, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
                background: activeTab === tab ? '#111' : '#fff', color: activeTab === tab ? '#fff' : '#666',
                transition: 'all 0.15s',
              }}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Package list */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Package
          </label>
          <select
            value={selectedPkg || currentPackage?.id}
            onChange={e => setSelectedPkg(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ebebeb', borderRadius: 9, fontSize: 13, fontFamily: 'inherit', color: '#222', background: '#fff', cursor: 'pointer', outline: 'none' }}
          >
            {currentPackages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} — £{pkg.price}
              </option>
            ))}
          </select>
        </div>

        {/* Body part (only if packages have bodyParts) */}
        {bodyParts.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              Body part
            </label>
            <select
              style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ebebeb', borderRadius: 9, fontSize: 13, fontFamily: 'inherit', color: '#bbb', background: '#fff', cursor: 'pointer', outline: 'none' }}
            >
              <option value="">Choose a body part…</option>
              {bodyParts.map(bp => <option key={bp} value={bp}>{bp}</option>)}
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
                  padding: '8px 4px', border: `1.5px solid ${selectedDate === i ? '#0F4C81' : '#ebebeb'}`,
                  borderRadius: 9, background: selectedDate === i ? '#E8F0F8' : '#fff',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: 10, color: selectedDate === i ? '#0F4C81' : '#999', fontWeight: 600 }}>{d.label}</span>
                <span style={{ fontSize: 11, color: selectedDate === i ? '#0F4C81' : '#333', fontWeight: selectedDate === i ? 600 : 400 }}>{d.num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/book?clinic=${clinic.slug}&package=${currentPackage?.id ?? ''}`}
          style={{ display: 'block', width: '100%', padding: '13px 0', background: '#0F4C81', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', textAlign: 'center', letterSpacing: -0.2 }}
        >
          Check Availability →
        </Link>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            'Free cancellation up to 24 hours before',
            'CQC registered centre',
            'Secure payment via Stripe',
          ].map((n, i) => (
            <div key={i} style={{ display: 'flex', gap: 7, fontSize: 12, color: '#999', alignItems: 'flex-start' }}>
              <span style={{ color: '#0F4C81', fontWeight: 700, flexShrink: 0 }}>✓</span>
              {n}
            </div>
          ))}
        </div>
      </div>

      {/* Price summary */}
      {currentPackage && (
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 14 }}>Price summary</div>
          {[
            { label: currentPackage.name, value: `£${currentPackage.price}` },
            { label: "Radiologist's report", value: 'Included' },
            { label: 'Digital images', value: 'Included' },
            { label: 'ScanBook fee', value: '£0' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none', fontSize: i === 3 ? 14 : 13, fontWeight: i === 3 ? 600 : 400 }}>
              <span style={{ color: i < 3 ? '#666' : '#111' }}>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Opening hours */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '18px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 14 }}>Opening hours</div>
        {clinic.hours.map((h, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < clinic.hours.length - 1 ? '1px solid #f5f5f5' : 'none', fontSize: 12 }}>
            <span style={{ color: h.isToday ? '#111' : '#666', fontWeight: h.isToday ? 600 : 400 }}>{h.day}{h.isToday ? ' (today)' : ''}</span>
            <span style={{ color: h.time === 'Closed' ? '#f87171' : h.isToday ? '#0F4C81' : '#444', fontWeight: h.isToday ? 600 : 400 }}>
              {h.time}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}

// ─── SCAN PACKAGES TAB SECTION ────────────────────────────────────────────────

function ScanPackagesSection({ packages }: { packages: ClinicData['packages'] }) {
  const availableTabs = (Object.keys(packages) as ScanTab[]).filter(
    k => (packages[k]?.length ?? 0) > 0
  )
  const [activeTab, setActiveTab] = useState<ScanTab>(availableTabs[0] ?? 'mri')

  const currentPackages: ScanPackage[] = packages[activeTab] ?? []

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
        {availableTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '7px 14px', border: `1.5px solid ${activeTab === tab ? '#111' : '#ebebeb'}`,
              borderRadius: 8, fontSize: 13, cursor: 'pointer', background: activeTab === tab ? '#111' : '#fff',
              color: activeTab === tab ? '#fff' : '#666', fontFamily: 'inherit', fontWeight: 400, transition: 'all 0.15s',
            }}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {currentPackages.map(pkg => (
          <div
            key={pkg.id}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '15px 17px', background: '#fff', borderRadius: 11, border: '1px solid #ebebeb',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#0F4C81' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#ebebeb' }}
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
              <Link
                href={`/book?clinic=medicana-winchester&package=${pkg.id}`}
                style={{ padding: '8px 16px', border: '1.5px solid #0F4C81', borderRadius: 8, background: '#fff', color: '#0F4C81', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                Book →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ClinicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const clinic = getClinicBySlug(slug)

  if (!clinic) notFound()

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-dm-sans, 'DM Sans', system-ui, sans-serif); background: #fff; color: #222; -webkit-font-smoothing: antialiased; }
      `}</style>

      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ padding: '10px 48px', fontSize: 12, color: '#bbb', borderBottom: '1px solid #f5f5f5' }}>
        <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
        {' / '}
        <Link href="/search" style={{ color: '#999', textDecoration: 'none' }}>Imaging Centres</Link>
        {' / '}
        <span style={{ color: '#444' }}>{clinic.name}</span>
      </div>

      {/* GALLERY PLACEHOLDER */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 48px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '200px 200px', gap: 8, borderRadius: 16, overflow: 'hidden' }}>
          {['🏥', '🧲', '🛋️', '🅿️', '⚕️'].map((icon, i) => (
            <div key={i} style={{ background: ['#eef5f2','#f0eef5','#f5f2ee','#eef0f5','#f2f5ee'][i], display: 'grid', placeItems: 'center', fontSize: i === 0 ? 56 : 32, color: '#ddd', border: '1px solid #ebebeb', gridRow: i === 0 ? 'span 2' : undefined }}>
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 48px 60px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>

        {/* LEFT */}
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
                <button style={{ padding: '8px 14px', border: '1.5px solid #ebebeb', borderRadius: 8, fontSize: 13, color: '#666', background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>♡ Save</button>
                <button style={{ padding: '8px 14px', border: '1.5px solid #ebebeb', borderRadius: 8, fontSize: 13, color: '#666', background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>↑ Share</button>
              </div>
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 13, color: '#666', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#111' }}>
                <Stars rating={clinic.rating} size={13} />
                <span>{clinic.rating}</span>
                <span style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>({clinic.reviewCount} reviews)</span>
              </div>
              <span>·</span>
              <span>{clinic.address}, {clinic.city}</span>
              <span>·</span>
              <span style={{ color: clinic.openNow ? '#0F4C81' : '#f87171', fontWeight: 500 }}>
                {clinic.openNow ? '● Open now' : '● Closed'}
              </span>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {[
                clinic.cqcRating !== 'Pending' && { label: `CQC ${clinic.cqcRating}`, bg: '#E8F0F8', color: '#0F4C81', border: '#E5E1D8' },
                clinic.scannerTesla && { label: `${clinic.scannerTesla} Scanner`, bg: '#F3E8FF', color: '#7c3aed', border: '#ddd6fe' },
                { label: clinic.reportHours === 0 ? 'Same-day results' : `Report in ${clinic.reportHours}h`, bg: '#f8f8f8', color: '#666', border: '#ebebeb' },
                { label: 'No GP referral needed', bg: '#f8f8f8', color: '#666', border: '#ebebeb' },
              ].filter(Boolean).map((b: any) => (
                <span key={b.label} style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 5, letterSpacing: 0.5, background: b.bg, color: b.color, border: `1px solid ${b.border}`, textTransform: 'uppercase' }}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: '#ebebeb', margin: '20px 0' }} />

          {/* Scans */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: '#bbb', fontWeight: 500, marginBottom: 14, textTransform: 'uppercase' }}>Available scans</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, letterSpacing: -0.4, color: '#111', marginBottom: 16 }}>Book a scan at {clinic.name}</h2>
            <ScanPackagesSection packages={clinic.packages} />
          </div>

          <div style={{ height: 1, background: '#ebebeb', margin: '20px 0' }} />

          {/* Reviews */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: '#bbb', fontWeight: 500, marginBottom: 14, textTransform: 'uppercase' }}>Patient reviews</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, letterSpacing: -0.4, color: '#111', marginBottom: 16 }}>What patients say</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {clinic.reviews.map((r, i) => (
                <div key={i} style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 11, padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>{r.author}</div>
                      {r.scanType && <div style={{ fontSize: 11, color: '#0F4C81', fontWeight: 500 }}>{r.scanType}</div>}
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

          <div style={{ height: 1, background: '#ebebeb', margin: '20px 0' }} />

          {/* Facilities */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: '#bbb', fontWeight: 500, marginBottom: 14, textTransform: 'uppercase' }}>Facilities & access</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 12 }}>Clinic facilities</h3>
                {clinic.facilities.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#444', marginBottom: 8 }}>
                    <span style={{ color: '#0F4C81', fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 12 }}>Getting here</h3>
                {clinic.transport.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#444', marginBottom: 8 }}>
                    <span>{t.icon}</span> {t.text}
                  </div>
                ))}
                <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
                  <strong style={{ color: '#111' }}>{clinic.address}</strong><br />
                  {clinic.city} · {clinic.postcode}
                </div>
              </div>
            </div>
          </div>

          {/* Insurance */}
          {clinic.insurers.length > 0 && (
            <>
              <div style={{ height: 1, background: '#ebebeb', margin: '20px 0' }} />
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 10 }}>Insurance accepted</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {clinic.insurers.map(ins => (
                    <span key={ins} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 7, border: '1px solid #ebebeb', color: '#444', background: '#f8f8f8' }}>{ins}</span>
                  ))}
                  <span style={{ fontSize: 12, padding: '5px 12px', borderRadius: 7, border: '1px solid #ebebeb', color: '#bbb', background: '#f8f8f8' }}>Self-pay welcome</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT — sticky sidebar */}
        <div style={{ position: 'sticky', top: 88 }}>
          <BookingSidebar clinic={clinic} />
        </div>
      </div>

      <Footer />
    </>
  )
}

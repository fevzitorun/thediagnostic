'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/scan', label: 'Scan Types' },
  { href: '/clinics', label: 'Clinics' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/blog', label: 'Blog' },
];

const CURRENCIES = ['GBP', 'EUR', 'USD', 'TRY', 'AED'];
const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
  { code: 'ar', label: 'AR', flag: '🇸🇦' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('GBP');
  const [lang, setLang] = useState('EN');

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(27, 79, 114, 0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <nav style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 32,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, textDecoration: 'none' }}>
          {/* Circuit-pin logo mark */}
          <svg width="38" height="42" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M148 38 C132 18, 108 8, 82 8 C46 8, 16 38, 16 74 C16 100, 30 122, 52 137 L82 162 L112 137 C134 122, 148 100, 148 74 C148 66, 146 59, 143 52"
              stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M152 32 C158 24, 162 14, 158 6" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <circle cx="90" cy="44" r="7" fill="white"/>
            <line x1="90" y1="51" x2="90" y2="72" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <path d="M90 72 Q104 76, 108 90" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <circle cx="108" cy="96" r="10" fill="white"/>
            <line x1="78" y1="80" x2="50" y2="116" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="50" cy="116" r="6" stroke="white" strokeWidth="4" fill="none"/>
            <circle cx="78" cy="80" r="6" fill="white"/>
          </svg>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>The</div>
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', fontFamily: 'var(--font-body)' }}>Diagnostic</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', gap: 4, flex: 1 }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 14,
                padding: '6px 12px',
                borderRadius: 6,
                transition: 'all 0.15s',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.color = '#fff';
                (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
                (e.target as HTMLElement).style.background = 'transparent';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Currency Selector */}
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            {CURRENCIES.map(c => <option key={c} value={c} style={{ color: '#000' }}>{c}</option>)}
          </select>

          {/* Language Selector */}
          <select
            value={lang}
            onChange={e => setLang(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            {LANGUAGES.map(l => <option key={l.code} value={l.label} style={{ color: '#000' }}>{l.flag} {l.label}</option>)}
          </select>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/447700000000?text=Hi,%20I%27d%20like%20to%20book%20a%20scan"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#25D366',
              color: '#fff',
              borderRadius: 7,
              padding: '6px 12px',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          {/* Book CTA */}
          <Link
            href="/book"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: 7,
              padding: '7px 16px',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
            }}
          >
            Book Now
          </Link>
        </div>
      </nav>
    </header>
  );
}

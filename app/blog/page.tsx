import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ARTICLES, ALL_CATEGORIES } from '@/lib/blog-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health Guide & Scan Advice | ScanBook Blog',
  description: 'Expert advice on private MRI, CT, ultrasound and more. Written by UK consultant radiologists and radiographers.',
  alternates: { canonical: 'https://scanbook.co.uk/blog' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const featured = ARTICLES[0]
  const rest = ARTICLES.slice(1)

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #0F4C81; --ink-2: #0A3A66; --ink-3: #082A4A;
          --ink-05: #E8F0F8; --accent: #EF4444;
          --paper: #FAFAF7; --paper-2: #F2F1EC;
          --line: #E5E1D8; --t: #1A1A1A; --m: #6B6B6B; --s: #9CA3AF;
          --serif: 'Instrument Serif', Georgia, serif;
        }
        body { font-family: 'DM Sans', system-ui, sans-serif; background: var(--paper); color: var(--t); -webkit-font-smoothing: antialiased; }
        .card:hover .card-title { color: var(--ink) !important; }
        .card { transition: border-color .15s; }
        .card:hover { border-color: var(--ink) !important; }
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .articles-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .articles-grid { grid-template-columns: 1fr !important; }
          .page-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .hero-h1 { font-size: 30px !important; }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, var(--ink-3) 0%, var(--ink-2) 60%, var(--ink) 100%)', padding: '56px 48px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
            Health Guide
          </p>
          <h1 className="hero-h1" style={{ fontFamily: 'var(--serif)', fontSize: 44, color: '#fff', letterSpacing: -1, lineHeight: 1.15, marginBottom: 14, maxWidth: 600 }}>
            Scan advice from UK consultant radiologists
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.7)', maxWidth: 520, lineHeight: 1.7 }}>
            Plain-English guides on MRI, CT, ultrasound, and private scanning in the UK. Written and reviewed by registered specialists.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <div style={{ background: 'var(--paper-2)', borderBottom: '1.5px solid var(--line)', padding: '14px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--s)', marginRight: 4 }}>Topics:</span>
          {ALL_CATEGORIES.map(cat => (
            <span key={cat} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: 'var(--ink-05)', color: 'var(--ink-2)', fontWeight: 500 }}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 48px' }} className="page-pad">

        {/* FEATURED ARTICLE */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Featured</p>
          <Link
            href={`/blog/${featured.slug}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div
              className="card featured-grid"
              style={{
                display: 'grid', gridTemplateColumns: '1fr 380px', gap: 0,
                border: '1.5px solid var(--line)', borderRadius: 20, overflow: 'hidden',
                background: '#fff', cursor: 'pointer',
              }}
            >
              {/* Text */}
              <div style={{ padding: '40px 44px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', background: 'var(--ink-05)', color: 'var(--ink)', borderRadius: 20 }}>
                    {featured.category}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--s)' }}>{featured.readTime} min read</span>
                </div>
                <h2 className="card-title" style={{ fontFamily: 'var(--serif)', fontSize: 30, color: 'var(--ink-3)', letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 14, transition: 'color .15s' }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 15, color: 'var(--m)', lineHeight: 1.75, marginBottom: 24 }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink-05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                    👩‍⚕️
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)' }}>{featured.author}</div>
                    <div style={{ fontSize: 11, color: 'var(--s)' }}>{featured.authorRole} · {formatDate(featured.publishedAt)}</div>
                  </div>
                </div>
              </div>
              {/* Accent panel */}
              <div style={{ background: 'var(--ink-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, padding: 40 }}>
                <div style={{ fontSize: 72 }}>{featured.heroEmoji}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textAlign: 'center', lineHeight: 1.5 }}>
                  Read the full guide →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* REST OF ARTICLES */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>All articles</p>
          <div className="articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {rest.map(article => (
              <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  className="card"
                  style={{
                    background: '#fff', border: '1.5px solid var(--line)', borderRadius: 16,
                    padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{article.heroEmoji}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', background: 'var(--ink-05)', color: 'var(--ink)', borderRadius: 12 }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--s)' }}>{article.readTime} min</span>
                  </div>
                  <h3 className="card-title" style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--ink-3)', letterSpacing: -0.3, lineHeight: 1.3, marginBottom: 10, transition: 'color .15s', flex: 1 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6, marginBottom: 20 }}>
                    {article.excerpt.slice(0, 110)}…
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 11, color: 'var(--s)' }}>{formatDate(article.publishedAt)}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Read →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, background: 'var(--ink-3)', borderRadius: 20, padding: '44px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, color: '#fff', letterSpacing: -0.5, marginBottom: 8 }}>
              Ready to book your scan?
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)' }}>
              No GP referral needed. Results within 48 hours.
            </p>
          </div>
          <Link
            href="/search"
            style={{ padding: '13px 28px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            Find a centre →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

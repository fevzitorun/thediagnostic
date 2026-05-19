import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqAccordion from '@/app/services/[slug]/FaqAccordion'
import { getArticle, getAllArticleSlugs, getRelatedArticles } from '@/lib/blog-content'
import type { Metadata } from 'next'
import type { ArticleSection } from '@/lib/blog-content'

interface PageProps { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllArticleSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDesc,
    alternates: { canonical: `https://scanbook.co.uk/blog/${slug}` },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderSection(section: ArticleSection, index: number) {
  switch (section.type) {
    case 'intro':
      return (
        <p key={index} style={{ fontSize: 17, color: '#2A2A2A', lineHeight: 1.85, marginBottom: 28, fontWeight: 400 }}>
          {section.body}
        </p>
      )
    case 'h2':
      return (
        <div key={index} style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--ink-3)', letterSpacing: -0.4, marginBottom: 12, lineHeight: 1.3 }}>
            {section.heading}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--m)', lineHeight: 1.85 }}>{section.body}</p>
        </div>
      )
    case 'list':
      return (
        <div key={index} style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {section.heading}
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {section.items.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, color: 'var(--m)', lineHeight: 1.7 }}>
                <span style={{ color: 'var(--ink)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'callout':
      return (
        <div key={index} style={{ background: 'var(--ink-05)', borderLeft: '3px solid var(--ink)', borderRadius: '0 10px 10px 0', padding: '18px 22px', marginBottom: 28 }}>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.75, fontWeight: 500 }}>{section.body}</p>
        </div>
      )
    case 'faq':
      return (
        <div key={index} style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--ink-3)', letterSpacing: -0.4, marginBottom: 20 }}>
            Frequently asked questions
          </h2>
          <FaqAccordion faqs={section.items} />
        </div>
      )
    default:
      return null
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = getRelatedArticles(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDesc,
    author: { '@type': 'Person', name: article.author, jobTitle: article.authorRole },
    publisher: { '@type': 'Organization', name: 'ScanBook', url: 'https://scanbook.co.uk' },
    datePublished: article.publishedAt,
    url: `https://scanbook.co.uk/blog/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
        .related-card:hover { border-color: var(--ink) !important; }
        .related-card { transition: border-color .15s; }
        @media (max-width: 900px) {
          .article-layout { grid-template-columns: 1fr !important; }
          .sidebar { display: none !important; }
          .related-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .related-grid { grid-template-columns: 1fr !important; }
          .page-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .hero-title { font-size: 28px !important; }
        }
      `}</style>

      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--line)', padding: '12px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 6, fontSize: 12, color: 'var(--s)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--s)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/blog" style={{ color: 'var(--s)', textDecoration: 'none' }}>Blog</Link>
          <span>›</span>
          <span style={{ color: 'var(--ink)' }}>{article.category}</span>
        </div>
      </div>

      {/* ARTICLE HERO */}
      <section style={{ background: 'linear-gradient(160deg, var(--ink-3) 0%, var(--ink-2) 60%, var(--ink) 100%)', padding: '56px 48px' }} className="page-pad">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', background: 'rgba(255,255,255,.15)', color: '#fff', borderRadius: 20 }}>
              {article.category}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{article.readTime} min read</span>
          </div>
          <h1 className="hero-title" style={{ fontFamily: 'var(--serif)', fontSize: 38, color: '#fff', letterSpacing: -0.8, lineHeight: 1.15, marginBottom: 20 }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              👩‍⚕️
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{article.author}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)' }}>{article.authorRole} · Published {formatDate(article.publishedAt)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 48px' }} className="page-pad">
        <div className="article-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 64, alignItems: 'start' }}>

          {/* Main content */}
          <article>
            {article.sections.map((section, i) => renderSection(section, i))}

            {/* Article CTA */}
            {article.cta && (
              <div style={{ marginTop: 40, background: 'var(--ink-3)', borderRadius: 16, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{article.cta.label}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>No GP referral needed · Results within 48 hours</p>
                </div>
                <Link
                  href={article.cta.href}
                  style={{ padding: '11px 24px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  {article.cta.label} →
                </Link>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="sidebar" style={{ position: 'sticky', top: 90 }}>
            {/* At a glance */}
            <div style={{ background: 'var(--paper-2)', border: '1.5px solid var(--line)', borderRadius: 16, padding: '22px' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--s)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>At a glance</p>
              {[
                { label: 'Category', value: article.category },
                { label: 'Read time', value: `${article.readTime} minutes` },
                { label: 'Author', value: article.author },
                { label: 'Published', value: formatDate(article.publishedAt) },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid var(--line)', fontSize: 12 }}>
                  <span style={{ color: 'var(--s)' }}>{row.label}</span>
                  <span style={{ color: 'var(--ink-3)', fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Scan CTA */}
            <div style={{ background: 'var(--ink-3)', borderRadius: 16, padding: '22px', marginTop: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{article.heroEmoji}</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.4 }}>
                Ready to book your scan?
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 16 }}>
                No referral · From £99
              </p>
              <Link
                href={article.cta?.href ?? '/search'}
                style={{ display: 'block', padding: '11px 16px', background: '#fff', color: 'var(--ink-3)', borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
              >
                Find a centre →
              </Link>
            </div>
          </aside>
        </div>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <div style={{ marginTop: 64, paddingTop: 48, borderTop: '1.5px solid var(--line)' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--ink-3)', letterSpacing: -0.4, marginBottom: 24 }}>
              Related guides
            </h2>
            <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {related.map(rel => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    className="related-card"
                    style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 14, padding: '22px 20px', height: '100%' }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{rel.heroEmoji}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{rel.category}</div>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--ink-3)', lineHeight: 1.3, marginBottom: 8 }}>{rel.title}</h3>
                    <div style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 600 }}>Read → {rel.readTime} min</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

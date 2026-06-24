import { MetadataRoute } from 'next'
import { CLINICS } from '@/lib/tr-clinics.data'

const BASE = 'https://thediagnostic.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/scan`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/scan/pet-ct`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/scan/mri-3t`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/scan/gamma-knife`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/scan/pet-mri`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/scan/spect-ct`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/scan/whole-body-mri`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/scan/ct-angio`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/compare/pet-ct-uk-vs-turkey`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/book`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/destinations/turkey/istanbul`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/register`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const clinicRoutes: MetadataRoute.Sitemap = CLINICS.map(c => ({
    url: `${BASE}/clinics/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...clinicRoutes]
}

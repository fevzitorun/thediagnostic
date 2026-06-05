import { MetadataRoute } from 'next'
import { getAllMriSlugs } from '@/lib/body-parts-content'
import { getAllCitySlugs } from '@/lib/cities-content'
import { getAllServiceSlugs } from '@/lib/services-content'

const BASE = 'https://scanbook.co.uk'

const SCAN_CITY_ROUTES = ['mri-scan', 'ct-scan', 'ultrasound', 'pregnancy-scan', 'baby-scan', 'x-ray']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/search`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/mri-scan`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/ct-scan`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/ultrasound`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/x-ray`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/pregnancy-scan`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/baby-scan`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/for-gps`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/register`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // /services/[slug]
  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map(slug => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // /mri-scan/[part]
  const mriPartRoutes: MetadataRoute.Sitemap = getAllMriSlugs().map(slug => ({
    url: `${BASE}/mri-scan/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // /[scan-type]/[city] — all combinations
  const cities = getAllCitySlugs()
  const cityRoutes: MetadataRoute.Sitemap = SCAN_CITY_ROUTES.flatMap(scanType =>
    cities.map(city => ({
      url: `${BASE}/${scanType}/${city}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...staticRoutes, ...serviceRoutes, ...mriPartRoutes, ...cityRoutes]
}

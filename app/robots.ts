import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/patient/', '/clinic/', '/gp/', '/api/', '/book/'],
      },
    ],
    sitemap: 'https://thediagnostic.co.uk/sitemap.xml',
  }
}

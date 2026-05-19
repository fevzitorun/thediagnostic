import { notFound } from 'next/navigation'
import CityPageTemplate from '@/components/CityPage'
import { getCity, getCityScanConfig, getAllCitySlugs } from '@/lib/cities-content'
import type { Metadata } from 'next'

interface PageProps { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return getAllCitySlugs().map(city => ({ city }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCity(citySlug)
  const config = getCityScanConfig('baby-scan')
  if (!city || !config) return {}
  return {
    title: `Private Baby Scan in ${city.name} | From £${config.priceFrom} | ScanBook`,
    description: `Book a private baby scan in ${city.name} from £${config.priceFrom}. No GP referral needed. ${city.clinicCount} accredited imaging centres. Same-day results.`,
    alternates: { canonical: `https://scanbook.co.uk/baby-scan/${citySlug}` },
  }
}

export default async function BabyScanCityPage({ params }: PageProps) {
  const { city: citySlug } = await params
  const city = getCity(citySlug)
  const config = getCityScanConfig('baby-scan')
  if (!city || !config) notFound()
  return <CityPageTemplate city={city} config={config} scanRouteKey="baby-scan" />
}

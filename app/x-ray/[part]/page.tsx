import { notFound } from 'next/navigation'
import BodyPartPageTemplate from '@/components/BodyPartPage'
import CityPageTemplate from '@/components/CityPage'
import { getXrayPart, getAllXraySlugs } from '@/lib/body-parts-content'
import { getCity, getCityScanConfig, getAllCitySlugs, ALL_CITY_SLUGS } from '@/lib/cities-content'
import type { Metadata } from 'next'

interface PageProps { params: Promise<{ part: string }> }

export async function generateStaticParams() {
  return [
    ...getAllXraySlugs().map(part => ({ part })),
    ...getAllCitySlugs().map(city => ({ part: city })),
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { part } = await params

  if (ALL_CITY_SLUGS.has(part)) {
    const city = getCity(part)!
    const config = getCityScanConfig('x-ray')!
    return {
      title: `Private X-Ray in ${city.name} | From £${config.priceFrom} | No Referral | ScanBook`,
      description: `Book a private X-ray in ${city.name} from £${config.priceFrom}. No GP referral needed. ${city.clinicCount} accredited imaging centres. Same-day results.`,
      alternates: { canonical: `https://scanbook.co.uk/x-ray/${part}` },
    }
  }

  const page = getXrayPart(part)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://scanbook.co.uk/x-ray/${part}` },
  }
}

export default async function XrayPartPage({ params }: PageProps) {
  const { part } = await params

  if (ALL_CITY_SLUGS.has(part)) {
    const city = getCity(part)!
    const config = getCityScanConfig('x-ray')
    if (!city || !config) notFound()
    return <CityPageTemplate city={city} config={config} scanRouteKey="x-ray" />
  }

  const page = getXrayPart(part)
  if (!page) notFound()
  return <BodyPartPageTemplate page={page} />
}

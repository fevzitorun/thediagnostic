import { notFound } from 'next/navigation'
import BodyPartPageTemplate from '@/components/BodyPartPage'
import CityPageTemplate from '@/components/CityPage'
import { getMriPart, getAllMriSlugs } from '@/lib/body-parts-content'
import { getCity, getCityScanConfig, getAllCitySlugs, ALL_CITY_SLUGS } from '@/lib/cities-content'
import type { Metadata } from 'next'

interface PageProps { params: Promise<{ part: string }> }

export async function generateStaticParams() {
  return [
    ...getAllMriSlugs().map(part => ({ part })),
    ...getAllCitySlugs().map(city => ({ part: city })),
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { part } = await params

  if (ALL_CITY_SLUGS.has(part)) {
    const city = getCity(part)!
    const config = getCityScanConfig('mri-scan')!
    return {
      title: `Private MRI Scan in ${city.name} | From £${config.priceFrom} | No Referral | ScanBook`,
      description: `Book a private MRI scan in ${city.name} from £${config.priceFrom}. No GP referral needed. ${city.clinicCount} accredited imaging centres. Results within ${config.reportTime}.`,
      alternates: { canonical: `https://scanbook.co.uk/mri-scan/${part}` },
    }
  }

  const page = getMriPart(part)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://scanbook.co.uk/mri-scan/${part}` },
  }
}

export default async function MriPartPage({ params }: PageProps) {
  const { part } = await params

  if (ALL_CITY_SLUGS.has(part)) {
    const city = getCity(part)!
    const config = getCityScanConfig('mri-scan')!
    return <CityPageTemplate city={city} config={config} scanRouteKey="mri-scan" />
  }

  const page = getMriPart(part)
  if (!page) notFound()
  return <BodyPartPageTemplate page={page} />
}

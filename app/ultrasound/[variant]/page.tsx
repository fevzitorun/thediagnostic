import { notFound } from 'next/navigation'
import BodyPartPageTemplate from '@/components/BodyPartPage'
import CityPageTemplate from '@/components/CityPage'
import { getUltrasoundVariant, getAllUltrasoundSlugs } from '@/lib/body-parts-content'
import { getCity, getCityScanConfig, getAllCitySlugs, ALL_CITY_SLUGS } from '@/lib/cities-content'
import type { Metadata } from 'next'

interface PageProps { params: Promise<{ variant: string }> }

export async function generateStaticParams() {
  return [
    ...getAllUltrasoundSlugs().map(variant => ({ variant })),
    ...getAllCitySlugs().map(city => ({ variant: city })),
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { variant } = await params

  if (ALL_CITY_SLUGS.has(variant)) {
    const city = getCity(variant)!
    const config = getCityScanConfig('ultrasound')!
    return {
      title: `Private Ultrasound Scan in ${city.name} | From £${config.priceFrom} | No Referral | ScanBook`,
      description: `Book a private ultrasound scan in ${city.name} from £${config.priceFrom}. No GP referral needed. ${city.clinicCount} accredited imaging centres. Results within ${config.reportTime}.`,
      alternates: { canonical: `https://scanbook.co.uk/ultrasound/${variant}` },
    }
  }

  const page = getUltrasoundVariant(variant)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://scanbook.co.uk/ultrasound/${variant}` },
  }
}

export default async function UltrasoundVariantPage({ params }: PageProps) {
  const { variant } = await params

  if (ALL_CITY_SLUGS.has(variant)) {
    const city = getCity(variant)!
    const config = getCityScanConfig('ultrasound')!
    return <CityPageTemplate city={city} config={config} scanRouteKey="ultrasound" />
  }

  const page = getUltrasoundVariant(variant)
  if (!page) notFound()
  return <BodyPartPageTemplate page={page} />
}

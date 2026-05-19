import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'ScanBook — Private Medical Scans, Booked Online',
    template: '%s | ScanBook',
  },
  description:
    'Book private MRI, CT, ultrasound and baby scans at CQC-registered centres across the UK. No GP referral needed. Radiologist reports in 24–72 hours.',
  keywords: ['private MRI scan', 'private CT scan', 'baby scan', 'private ultrasound', 'UK imaging centres'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${dmSans.variable} antialiased`} style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'thediagnostic — Advanced Medical Imaging Abroad',
    template: '%s | thediagnostic',
  },
  description:
    'Book PET-CT, MRI 3T, GammaKnife and advanced diagnostics at world-class clinics in Turkey. Save up to 70% vs UK private prices. Fast appointments, expert radiologists.',
  keywords: [
    'PET CT scan Turkey',
    'MRI scan abroad',
    'medical imaging Turkey',
    'GammaKnife Turkey',
    'medical tourism Turkey',
    'private scan abroad affordable',
    'NHS waiting list alternative',
  ],
  openGraph: {
    siteName: 'thediagnostic',
    locale: 'en_GB',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}

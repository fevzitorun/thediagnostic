import type { Metadata } from 'next';
import './globals.css';
// Fonts loaded via globals.css Google Fonts link for CDN resilience

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
      <body>
        {children}
      </body>
    </html>
  );
}

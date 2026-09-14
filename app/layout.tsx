import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Nav } from '@/components/ui/nav'
import { siteConfig } from '@/data/site'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const title = `${siteConfig.name} — ${siteConfig.role}`
const description = siteConfig.metadata.description

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9FC' },
    { media: '(prefers-color-scheme: dark)', color: '#09080E' },
  ],
}

// Person schema — lets Google associate the site, name, and social profiles
// with one entity (knowledge panel, searches).
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.location,
  },
  sameAs: siteConfig.socials.map((s) => s.href),
}

// Runs before first paint: apply the stored theme, or fall back to the
// visitor's system preference. Keeps light-vs-dark from flashing on load.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <div className="fixed inset-0 -z-50 bg-background" />
        <div className="dot-grid pointer-events-none fixed inset-0 -z-40 opacity-[0.04] dark:opacity-[0.08]" />
        <div className="spotlight pointer-events-none fixed inset-x-0 top-0 -z-40 h-[70vh]" />
        <div className="grain pointer-events-none fixed inset-0 -z-30 opacity-[0.04] mix-blend-soft-light dark:opacity-[0.05]" />
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Shaik Mohammed Suhaib | Product Engineer & AI Systems',
  description: 'Personal portfolio of Shaik Mohammed Suhaib - Product Engineer focused on Agentic AI, recommendation systems, and building intelligent products.',
  generator: 'v0.app',
  metadataBase: new URL('https://shaiksuhaib.com'), // Replace with actual domain if known
  openGraph: {
    title: 'Shaik Mohammed Suhaib | Product Engineer & AI Systems',
    description: 'Personal portfolio of Shaik Mohammed Suhaib - Product Engineer focused on Agentic AI, recommendation systems, and building intelligent products.',
    url: 'https://shaiksuhaib.com',
    siteName: 'Shaik Mohammed Suhaib Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaik Mohammed Suhaib | Product Engineer & AI Systems',
    description: 'Personal portfolio of Shaik Mohammed Suhaib - Product Engineer focused on Agentic AI, recommendation systems, and building intelligent products.',
    images: ['/og-image.png'],
    creator: '@suhaibX0',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { InitialLoader } from '@/components/ui/initial-loader'
import { NavBar } from '@/components/ui/tubelight-navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <InitialLoader />
          <NavBar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

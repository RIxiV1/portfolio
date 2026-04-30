import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

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
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaik Mohammed Suhaib | Product Engineer & AI Systems',
    description: 'Personal portfolio of Shaik Mohammed Suhaib - Product Engineer focused on Agentic AI, recommendation systems, and building intelligent products.',
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

import { Nav } from '@/components/ui/nav'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="fixed inset-0 -z-50 bg-background" />
        <div className="pointer-events-none fixed inset-0 -z-40 grid-bg" />
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

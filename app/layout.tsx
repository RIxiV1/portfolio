import type { Metadata, Viewport } from "next";
// v1.0.1 - Terminology update to Developer
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/layout/Loader";
import MotionProvider from "@/components/layout/MotionProvider";
import ClickEffect from "@/components/ui/ClickEffect";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

import { siteConfig } from "@/data/site";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: siteConfig.metadata.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.ogDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.metadata.twitterHandle,
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.ogDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-black text-white`}
      >
        <a href="#main" className="skip-link">Skip to content</a>
        <MotionProvider>
          <ClickEffect />
          <Loader />
          <ScrollProgress />
          <Navbar />
          {children}
        </MotionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

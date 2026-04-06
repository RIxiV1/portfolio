import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/layout/Loader";
import ClickEffect from "@/components/ui/ClickEffect";
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
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: siteConfig.metadata.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.ogDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.metadata.twitterHandle,
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
        <ClickEffect />
        <Loader />
        <Navbar />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { absoluteUrl, siteConfig } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.creator, url: siteConfig.githubOrgUrl }],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImagePath),
        width: 1200,
        height: 630,
        alt: "Genesis Conductor Engine landing page preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImagePath)]
  },
  robots: {
    index: true,
    follow: true
  },
  category: "technology",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${monoFont.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

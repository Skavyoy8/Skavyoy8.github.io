import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { Ambient } from '@/components/layout/Ambient'
import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { Providers } from '@/components/layout/Providers'
import { RevealObserver } from '@/components/layout/RevealObserver'
import { Terminal } from '@/components/ui/Terminal'
import { Toaster } from '@/components/ui/Toaster'
import { navCopy } from '@/content/nav'
import { site } from '@/content/site'
import { basePath } from '@/lib/asset'
import { bootScript } from '@/lib/calm'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(`${site.url}${basePath}/`),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.github.url }],
  creator: site.name,
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: './',
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: 'og.png', width: 1200, height: 630, alt: `${site.name} — portfolio` }],
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['og.png'] },
  robots: { index: true, follow: true },
  formatDetection: { email: false, telephone: false, address: false },
}

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <Script id="boot" strategy="beforeInteractive">
          {bootScript}
        </Script>
        <a
          href="#contenu"
          data-native
          className="label fixed top-3 left-3 z-[110] -translate-y-24 rounded-md bg-accent px-4 py-3 text-ink focus:translate-y-0"
        >
          {navCopy.skip}
        </a>
        <Ambient />
        <div className="progress" aria-hidden="true" />
        <Providers>
          <Nav />
          {children}
          <Footer />
          <Terminal />
          <Toaster />
          <RevealObserver />
        </Providers>
      </body>
    </html>
  )
}

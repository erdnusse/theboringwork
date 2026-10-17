import type React from "react"
import "./globals.css"
import { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, DM_Sans } from "next/font/google"
import { Toaster } from "sonner"
import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import { LanguageProvider } from '@/context/LanguageProvider'
import Script from "next/script";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" })

export const viewport: Viewport = {
  themeColor: "#5e3cf0",
}

export const metadata: Metadata = {
  title: {
    default: 'The Boring Work - Consultoria Empresarial',
    template: '%s | The Boring Work - Consultoria Empresarial',
  },
  description: 'The Boring Work is a consulting firm specializing in providing expert advice and solutions to businesses and individuals.',
  keywords: ['The Boring Work', 'Consulting', 'Solutions', 'Expert Advice'],
  openGraph: {
    title: 'The Boring Work - Consultoria Empresarial',
    description: 'The Boring Work is a consulting firm specializing in providing expert advice and solutions to businesses and individuals.',
    url: 'https://www.theboringwork.pt/',
    siteName: 'The Boring Work',
    images: [
      {
        url: 'https://www.theboringwork.pt/banner.png',
        width: 1200,
        height: 630,
        alt: 'The Boring Work Banner',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Boring Work - Consultoria Empresarial',
    description: 'The Boring Work is a consulting firm specializing in providing expert advice and solutions to businesses and individuals.',
    images: ['https://www.theboringwork.pt/banner.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://www.theboringwork.pt/',
  },
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { lang: string } }) {
  const awaitedParams = await params;
  return (
    <html lang={awaitedParams.lang === 'en' ? 'en' : 'pt-PT'} className={`${dmSans.variable} ${bricolage.variable}`}>
      <head>
         {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SFHQRXLQLJ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SFHQRXLQLJ');
          `}
        </Script>
      </head>
      <body>
        <LanguageProvider initialLang={awaitedParams.lang as 'pt' | 'en'}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

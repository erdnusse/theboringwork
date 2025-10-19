import type React from "react"
import "./globals.css"
import { Metadata } from 'next'
import { Toaster } from "sonner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from '@/context/LanguageProvider'
import Script from "next/script";

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
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { lang: string } }) {
  const awaitedParams = await params;
  return (
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

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
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

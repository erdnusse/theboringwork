import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: 'Rita Barrela Consulting',
    template: '%s | Rita Barrela Consultoria Empresarial',
  },
  description: 'Rita Barrela Consulting is a consulting firm specializing in providing expert advice and solutions to businesses and individuals.',
  keywords: ['Rita Barrela', 'Consulting', 'Solutions', 'Expert Advice'],
  openGraph: {
    title: 'Rita Barrela Consultoria Empresarial',
    description: 'Rita Barrela Consulting is a consulting firm specializing in providing expert advice and solutions to businesses and individuals.',
    url: 'https://www.ritabarrela.com/',
    siteName: 'Rita Barrela Consulting',
    images: [
      {
        url: 'https://www.ritabarrela.com/banner.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rita Barrela Consultoria Empresarial',
    description: 'Rita Barrela Consulting is a consulting firm specializing in providing expert advice and solutions to businesses and individuals.',
    images: ['https://www.ritabarrela.com/banner.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SiteHeader />
            {children}
          </ThemeProvider>
        </body>
      </html>

  )
}

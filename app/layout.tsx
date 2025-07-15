import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from 'next'
import { Toaster } from "sonner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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
        <head>
              <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        </head>
        <body>

          <Navbar/>  

            {children}
             <Toaster richColors position="top-center" />
<Footer/>
        </body>
        
      </html>

  )
}

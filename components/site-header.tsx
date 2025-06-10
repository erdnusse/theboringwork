"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40 w-full">
      <div className="max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary-500"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary bg-clip-text text-transparent">
            StrategyPro
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
            Home
          </Link>
       
  
         
          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">       
    
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-primary-200 text-primary-600 hover:bg-primary-50"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              
                
                <Link
                  href="/contact"
                  className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
               
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

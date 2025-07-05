"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <>
      <div
        className={`fixed top-0 z-40 w-full transition-all duration-500 ease-in-out backdrop-blur-sm ${
          scrolled ? "backdrop-blur-xl" : "bg-[--background-primary-color]"
        }`}
      >
        <div
          className={`max-w-screen-xl mx-auto flex transition-all duration-500 ease-in-out ${
            scrolled ? "h-14" : "h-24"
          } items-center justify-between px-4 md:px-6`}
        >
          <nav className="w-full flex items-center justify-between">
            {/* Left: Logo (hide on mobile) */}
            {!isMobile && (
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    src="/Logótipo Rita Barrela-03.png"
                    alt="Rita Barrela Logo"
                    width={80}
                    height={80}
                    className={`${scrolled ? "h-14" : "h-24"} w-auto object-contain`}
                    priority
                  />
                </Link>
              </div>
            )}

            {/* Center: Logo on mobile */}
            {isMobile && (
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    src="/Logótipo Rita Barrela-03.png"
                    alt="Rita Barrela Logo"
                    width={60}
                    height={60}
                    className={`${scrolled ? "h-10" : "h-16"} w-auto object-contain`}
                    priority
                  />
                </Link>
              </div>
            )}

            {/* Right: Navigation Links or Burger */}
            {isMobile ? (
              <div className="flex items-center">
                <button
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  className="text-[--primary-color] focus:outline-none z-50 relative"
                >
                  {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-8">
                <Link
                  href="/"
                  className={`text-[--primary-color] hover:text-primary ${
                    scrolled ? "font-medium " : "font-medium text-lg"
                  }  transition-colors`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`text-[--primary-color] hover:text-primary ${
                    scrolled ? "font-medium " : "font-medium text-lg"
                  }  transition-colors`}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className={`text-[--primary-color] hover:text-primary ${
                    scrolled ? "font-medium " : "font-medium text-lg"
                  }  transition-colors`}
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className={`text-[--primary-color] hover:text-primary ${
                    scrolled ? "font-medium " : "font-medium text-lg"
                  }  transition-colors`}
                >
                  Contact
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay - Moved outside main navbar */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <Image
                    src="/Logótipo Rita Barrela-03.png"
                    alt="Rita Barrela Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain"
                    priority
                  />
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8">
                <div className="flex flex-col space-y-6">
                  <Link
                    href="/"
                    className="text-[--primary-color] text-lg font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-[--primary-color] text-lg font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/services"
                    className="text-[--primary-color] text-lg font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[--primary-color] text-lg font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Backdrop - Click to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  )
}

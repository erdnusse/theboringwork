"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed  top-0 z-40 w-full transition-all duration-500 ease-in-out backdrop-blur-sm ${scrolled ? "backdrop-blur-xl" :"bg-[--background-primary-color]" }`}>
      <div className={`max-w-screen-xl mx-auto flex transition-all duration-500 ease-in-out ${scrolled ? "h-14" :"h-24" } items-center justify-between px-4 md:px-6`}>
        <nav className="w-full flex items-center justify-between ">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/Logótipo Rita Barrela-03.png"
                alt="Rita Barrela Logo"
                width={80}
                height={80}
                className={`${scrolled ? "h-14" :"h-24" } w-auto object-contain`}
                priority
              />
            </Link>
          </div>
          {/* Right: Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-[--primary-color] hover:text-primary ${scrolled ? "font-medium " :"font-medium text-lg" }  transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/about"
             className={`text-[--primary-color] hover:text-primary ${scrolled ? "font-medium " :"font-medium text-lg" }  transition-colors`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`text-[--primary-color] hover:text-primary ${scrolled ? "font-medium " :"font-medium text-lg" }  transition-colors`}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className={`text-[--primary-color] hover:text-primary ${scrolled ? "font-medium " :"font-medium text-lg" }  transition-colors`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

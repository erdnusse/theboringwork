"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/context/LanguageProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { t } = useTranslation();
  const { lang, setLang } = useLanguage();
  const navItems = [
    { label: t("home_title"), href: `/${lang}` },
    { label: t("services"), href: `/${lang}/services` },
    { label: t("contact"), href: `/${lang}/contact` },
    { label: t("about"), href: `/${lang}/about` },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#f6ede4] backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-xl text-foreground w-52 h-20 flex items-center"
          >
            <Link href="/" passHref>
              <Image
                src="/logo-boring-work.png"
                alt="Logo boring work"
                width={600}
                height={600}
                className="object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[#f3864d] text-lg font-medium transition-colors hover:text-primary relative group`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            {/* Language Selector - Flags */}
            <div className="ml-6 flex items-center space-x-2">
              <button
                onClick={() => setLang('pt')}
                aria-label="Portuguese"
                className={`p-0 border-none bg-transparent focus:outline-none ${lang === 'pt' ? 'opacity-100' : 'opacity-60'}`}
              >
                <img
                  src="https://flagcdn.com/24x18/pt.png"
                  alt="Portuguese flag"
                  width={24}
                  height={18}
                  style={{ borderRadius: '2px' }}
                />
              </button>
              <button
                onClick={() => setLang('en')}
                aria-label="English"
                className={`p-0 border-none bg-transparent focus:outline-none ${lang === 'en' ? 'opacity-100' : 'opacity-60'}`}
              >
                <img
                  src="https://flagcdn.com/24x18/gb.png"
                  alt="English flag"
                  width={24}
                  height={18}
                  style={{ borderRadius: '2px' }}
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block w-full text-[var(--primary-color)] text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Language Selector Mobile - Flags */}
              <div className="px-4 pt-2 flex items-center space-x-2">
                <button
                  onClick={() => setLang('pt')}
                  aria-label="Portuguese"
                  className={`p-0 border-none bg-transparent focus:outline-none ${lang === 'pt' ? 'opacity-100' : 'opacity-60'}`}
                >
                  <img
                    src="https://flagcdn.com/24x18/pt.png"
                    alt="Portuguese flag"
                    width={24}
                    height={18}
                    style={{ borderRadius: '2px' }}
                  />
                </button>
                <button
                  onClick={() => setLang('en')}
                  aria-label="English"
                  className={`p-0 border-none bg-transparent focus:outline-none ${lang === 'en' ? 'opacity-100' : 'opacity-60'}`}
                >
                  <img
                    src="https://flagcdn.com/24x18/gb.png"
                    alt="English flag"
                    width={24}
                    height={18}
                    style={{ borderRadius: '2px' }}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
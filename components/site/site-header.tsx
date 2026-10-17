"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageProvider"
import { useTranslation } from "@/hooks/use-translation"

export default function SiteHeader() {
  const { t, lang } = useTranslation()
  const { setLang } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: `/${lang}`, label: t("nav_home") },
    { href: `/${lang}/services`, label: t("nav_services") },
    { href: `/${lang}/contact`, label: t("nav_contact") },
  ]

  const isActive = (href: string) => pathname === href

  const languageSwitch = (
    <div className="flex items-center gap-1 text-xs font-semibold" role="group" aria-label={t("nav_language")}>
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        className={lang === "pt" ? "" : "text-cream-soft"}
      >
        PT
      </button>
      <span className="text-cream-soft" aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={lang === "en" ? "" : "text-cream-soft"}
      >
        EN
      </button>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-cream-faint bg-brand text-cream">
      <div className="mx-auto flex min-h-20 max-w-site items-center justify-between gap-5 px-page">
        <Link href={`/${lang}`} aria-label={t("nav_home_label")} className="shrink-0">
          <Image
            src="/images/logo-boring-work-white.png"
            alt="the BOR!NG WORK"
            width={2208}
            height={933}
            priority
            className="h-12 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label={t("nav_main")}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`nav-link ${isActive(item.href) ? "underline decoration-lime decoration-2 underline-offset-8" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-cream-faint" aria-hidden="true" />
          {languageSwitch}
        </nav>

        <Button
          type="button"
          variant="navIcon"
          size="icon"
          className="md:hidden"
          aria-label={open ? t("nav_close_menu") : t("nav_open_menu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-cream-faint px-page py-6 md:hidden" aria-label={t("nav_mobile")}>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="text-2xl font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">{languageSwitch}</div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}

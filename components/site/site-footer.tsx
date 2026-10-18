"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { CONTACT_EMAIL, SOCIAL } from "@/lib/site"
import { openCookieSettings } from "@/lib/cookie-consent"

const socialLink =
  "flex size-8 items-center justify-center text-cream transition-colors hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"

const columnLabel = "text-sm text-cream-soft/70"
const columnLink = "inline-block py-1.5 text-[0.95rem] text-cream transition-opacity hover:opacity-75"

export default function SiteFooter() {
  const { t, lang } = useTranslation()

  return (
    <footer className="bg-brand text-cream">
      <div className="mx-auto max-w-site">
        <div className="grid gap-10 px-page pb-10 pt-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Image
              src="/images/logo-boring-work-white.png"
              alt="the BOR!NG WORK"
              width={2208}
              height={933}
              className="h-10 w-auto self-start"
            />
            <p className="max-w-sm text-cream-soft">{t("footer_tagline")}</p>
            <nav className="-ml-1 flex items-center gap-2" aria-label={t("footer_social_nav")}>
              <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className={socialLink} aria-label="Instagram">
                <Instagram className="size-5" aria-hidden="true" />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" className={socialLink} aria-label="LinkedIn">
                <Linkedin className="size-5" aria-hidden="true" />
              </a>
              <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" className={socialLink} aria-label="Facebook">
                <Facebook className="size-5" aria-hidden="true" />
              </a>
            </nav>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className={columnLabel}>{t("footer_explore")}</p>
              <ul className="mt-3">
                <li><Link href={`/${lang}`} className={columnLink}>{t("nav_home")}</Link></li>
                <li><Link href={`/${lang}/services`} className={columnLink}>{t("nav_services")}</Link></li>
                <li><Link href={`/${lang}/contact`} className={columnLink}>{t("nav_contact")}</Link></li>
              </ul>
            </div>
            <div>
              <p className={columnLabel}>{t("footer_contact")}</p>
              <ul className="mt-3">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={`${columnLink} break-all`}>{CONTACT_EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/20 px-page py-5 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-cream-soft">
            © {new Date().getFullYear()} The Boring Work · {t("footer_city")}, Portugal
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label={t("footer_legal_nav")}>
            <Link href={`/${lang}/privacy`} className="py-1 transition-opacity hover:opacity-75">{t("footer_privacy")}</Link>
            <Link href={`/${lang}/cookies`} className="py-1 transition-opacity hover:opacity-75">Cookies</Link>
            <button type="button" onClick={openCookieSettings} className="py-1 transition-opacity hover:opacity-75">
              {t("cookie_settings")}
            </button>
            <Link href={`/${lang}/terms`} className="py-1 transition-opacity hover:opacity-75">{t("footer_terms")}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

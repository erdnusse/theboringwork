"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { CONTACT_EMAIL, SOCIAL } from "@/lib/site"

function ContactCol({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      <div className="text-cream-soft [&_a]:inline-flex [&_a]:items-center [&_a]:gap-[0.35rem] [&_svg]:w-[0.95rem]">{children}</div>
    </div>
  )
}

export default function SiteFooter() {
  const { t, lang } = useTranslation()

  return (
    <footer className="bg-brand text-cream">
      <section className="border-t border-cream-faint py-14">
        <div className="mx-auto grid max-w-site gap-8 px-page sm:grid-cols-2 lg:grid-cols-4">
          <ContactCol label={t("footer_contact")}>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </ContactCol>
          <ContactCol label={t("footer_social")}>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={SOCIAL.facebook} target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </ContactCol>
          <ContactCol label={t("footer_talk")}>
            <Link href={`/${lang}/contact`}>
              {t("cta_talk_to_us")} <ArrowUpRight aria-hidden="true" />
            </Link>
          </ContactCol>
          <ContactCol label={t("footer_explore")}>
            <Link href={`/${lang}/services`}>
              {t("nav_services")} <ArrowUpRight aria-hidden="true" />
            </Link>
          </ContactCol>
        </div>
      </section>

      <div className="border-t border-cream-faint py-10">
        <div className="mx-auto flex max-w-site flex-col justify-between gap-8 px-page sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <Image
              src="/images/logo-boring-work-white.png"
              alt="the BOR!NG WORK"
              width={2208}
              height={933}
              className="h-12 w-auto self-start"
            />
            <p className="font-display text-xl tracking-[-0.02em]">{t("footer_tagline")}</p>
            <p className="text-sm text-cream-soft">© {new Date().getFullYear()} The Boring Work · {t("footer_city")}, Portugal</p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:items-end">
            <nav className="flex items-center gap-4" aria-label={t("footer_social_nav")}>
              <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="footer-link" aria-label="Instagram">
                <Instagram className="size-5" aria-hidden="true" />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" className="footer-link" aria-label="LinkedIn">
                <Linkedin className="size-5" aria-hidden="true" />
              </a>
              <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" className="footer-link" aria-label="Facebook">
                <Facebook className="size-5" aria-hidden="true" />
              </a>
            </nav>
            <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label={t("footer_legal_nav")}>
              <Link href={`/${lang}/privacy`} className="footer-link">{t("footer_privacy")}</Link>
              <Link href={`/${lang}/cookies`} className="footer-link">Cookies</Link>
              <Link href={`/${lang}/terms`} className="footer-link">{t("footer_terms")}</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

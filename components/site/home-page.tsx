"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HandUnderline } from "@/components/site/page-intro"
import { OFFERS } from "@/components/site/services-page"
import { useTranslation } from "@/hooks/use-translation"

export default function HomePage() {
  const { t, lang } = useTranslation()

  return (
    <main>
      <section className="section-dark pb-24 pt-24 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-site px-page">
          <h1 className="max-w-5xl text-hero">
            {t("home_lv_hero_pre")}
            <span className="relative inline-block">
              {t("home_lv_hero_word")}
              <HandUnderline />
            </span>
            {t("home_lv_hero_post")}
          </h1>
          <p className="mt-10 max-w-2xl text-lead">{t("home_lv_hero_lead")}</p>
          <Button asChild variant="lime" size="lg" className="mt-10">
            <Link href={`/${lang}/contact`}>
              {t("cta_talk_to_us")} <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="section-light page-section">
        <div className="mx-auto max-w-site px-page">
          <p className="eyebrow eyebrow-dark mb-10">{t("home_lv_where_eyebrow")}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {OFFERS.map((offer, index) => (
              <article key={offer.id} className="surface-card p-8 md:p-10">
                <p className="font-display text-lg font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-6 text-card-title">{t(`services_lv_${offer.id}_title`)}</h2>
                <p className="mt-4 text-ink-soft">{t(`services_lv_${offer.id}_summary`)}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Link href={`/${lang}/services`} className="text-link text-primary">
              {t("home_lv_see_services")} <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-dark page-section">
        <div className="mx-auto grid max-w-site gap-10 px-page md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow">{t("home_lv_about_eyebrow")}</p>
            <h2 className="mt-6 text-display-sm">{t("home_lv_about_title")}</h2>
          </div>
          <div className="md:pt-12">
            <p className="text-body-lg">{t("home_lv_about_p1")}</p>
            <p className="mt-5 text-body-lg">{t("home_lv_about_p2")}</p>
            <p className="mt-8 border-t border-cream-faint pt-6 font-display text-xl font-bold tracking-[-0.02em] text-lime">
              {t("home_lv_about_tagline")}
            </p>
          </div>
        </div>
      </section>

      <section className="section-light page-section">
        <div className="mx-auto grid max-w-site items-center gap-12 px-page md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <p className="eyebrow eyebrow-dark">{t("home_lv_founder_eyebrow")}</p>
            <blockquote className="mt-6 text-quote">{t("home_lv_founder_quote")}</blockquote>
            <div className="mt-10 border-t border-line pt-6">
              <p className="font-display text-xl font-bold tracking-[-0.02em]">Rita Barrela</p>
              <p className="text-ink-soft">{t("home_lv_founder_role")}</p>
              <Button asChild size="lg" className="mt-8">
                <Link href={`/${lang}/contact`}>
                  {t("cta_talk_to_us")} <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src="/images/rita-barrela.jpg"
            alt={t("home_lv_founder_alt")}
            width={800}
            height={1067}
            className="photo aspect-[3/4] w-full"
          />
        </div>
      </section>
    </main>
  )
}

"use client"

import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/site/page-intro"
import { Reveal } from "@/components/site/reveal"
import { useTranslation } from "@/hooks/use-translation"

export const OFFERS = [
  { id: "offer1", includes: 6 },
  { id: "offer2", includes: 5 },
] as const

export default function ServicesPage() {
  const { t, lang } = useTranslation()

  return (
    <main>
      <PageIntro eyebrow={t("services_lv_eyebrow")} title={t("services_lv_title")}>
        {t("services_lv_intro")}
      </PageIntro>

      <section className="section-light page-section">
        <div className="mx-auto grid max-w-site gap-6 px-page md:grid-cols-2">
          {OFFERS.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 80}>
            <article className="surface-card h-full p-8 md:p-10">
              <p className="font-display text-lg font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-6 text-card-title">{t(`services_lv_${offer.id}_title`)}</h2>
              <p className="eyebrow eyebrow-dark mt-8">{t("services_lv_who_label")}</p>
              <p className="mt-3 text-ink-soft">{t(`services_lv_${offer.id}_who`)}</p>
              <p className="eyebrow eyebrow-dark mt-8">{t("services_lv_includes_label")}</p>
              <ul className="mt-3">
                {Array.from({ length: offer.includes }, (_, i) => (
                  <li key={i} className="flex gap-3 border-b border-line py-3 last:border-b-0">
                    <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{t(`services_lv_${offer.id}_inc${i + 1}`)}</span>
                  </li>
                ))}
              </ul>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-dark page-section">
        <div className="mx-auto flex max-w-site flex-col items-start justify-between gap-8 px-page md:flex-row md:items-center">
          <div>
            <p className="eyebrow">{t("services_lv_cta_eyebrow")}</p>
            <h2 className="mt-5 max-w-3xl text-statement">{t("services_lv_cta_title")}</h2>
          </div>
          <Button asChild variant="lime" size="lg" className="shrink-0">
            <Link href={`/${lang}/contact`}>
              {t("services_lv_cta_button")}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

"use client"

import { Facebook, Instagram, Linkedin } from "lucide-react"
import ContactForm from "@/components/contact-form"
import { PageIntro } from "@/components/site/page-intro"
import { useTranslation } from "@/hooks/use-translation"
import { CONTACT_EMAIL, SOCIAL } from "@/lib/site"

const SOCIAL_LINKS = [
  { label: "Instagram", href: SOCIAL.instagram, Icon: Instagram },
  { label: "LinkedIn", href: SOCIAL.linkedin, Icon: Linkedin },
  { label: "Facebook", href: SOCIAL.facebook, Icon: Facebook },
]

export default function ContactPage() {
  const { t } = useTranslation()
  const phone = t("contact_page_phone_value")

  return (
    <main>
      <PageIntro eyebrow={t("nav_contact")} title={t("contact_page_title")}>
        {t("contact_page_description")}
      </PageIntro>

      <section className="section-light page-section">
        <div className="mx-auto grid max-w-site gap-12 px-page lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <aside className="space-y-10">
            <div>
              <p className="eyebrow eyebrow-dark">{t("contact_page_email_label")}</p>
              <a className="mt-3 inline-block" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="eyebrow eyebrow-dark">{t("contact_page_phone_label")}</p>
              <a className="mt-3 inline-block" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                {phone}
              </a>
            </div>
            <div>
              <p className="eyebrow eyebrow-dark">{t("contact_page_office_label")}</p>
              <p className="mt-3">{t("contact_page_office_value")}, Portugal</p>
            </div>
            <div>
              <p className="eyebrow eyebrow-dark">{t("contact_page_follow_us")}</p>
              <div className="mt-4 flex flex-col items-start gap-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="surface-card p-6 md:p-10">
            <h2 className="text-statement">{t("contact_page_form_title")}</h2>
            <p className="mb-8 mt-3 text-ink-soft">{t("contact_page_form_description")}</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}

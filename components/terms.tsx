"use client"
import { useTranslation } from "@/hooks/use-translation"
import { LegalLayout, LegalList, LegalSection, legalLink } from "@/components/site/legal-layout"

export default function TermsComponent() {
  const { t } = useTranslation()
  return (
    <LegalLayout
      eyebrow={t("footer_legal")}
      title={t("terms_page_title")}
      updated={t("terms_page_last_update")}
      intro={t("terms_page_intro")}
    >
      <LegalSection title={t("terms_page_section1_title")}>
        <p>{t("terms_page_section1_text")}</p>
      </LegalSection>

      <LegalSection title={t("terms_page_section2_title")}>
        <LegalList>
          <li>{t("terms_page_section2_list1")}</li>
          <li>{t("terms_page_section2_list2")}</li>
        </LegalList>
      </LegalSection>

      {[3, 4, 5, 6, 7, 8, 9].map((n) => (
        <LegalSection key={n} title={t(`terms_page_section${n}_title`)}>
          <p>{t(`terms_page_section${n}_text`)}</p>
        </LegalSection>
      ))}

      <LegalSection title={t("terms_page_section10_title")}>
        <p>
          {t("terms_page_section10_text1")}{" "}
          <a href="mailto:info@theboringwork.pt" className={legalLink}>
            info@theboringwork.pt
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

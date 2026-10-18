"use client"
import { useTranslation } from "@/hooks/use-translation"
import { LegalLayout, LegalList, LegalSection, legalLink } from "@/components/site/legal-layout"

export default function PrivacyComponent() {
  const { t, lang } = useTranslation()
  return (
    <LegalLayout
      eyebrow={t("footer_legal")}
      title={t("privacy_page_title")}
      updated={t("privacy_page_last_update")}
      intro={t("privacy_page_intro")}
    >
      <LegalSection title={t("privacy_page_section1_title")}>
        <p>{t("privacy_page_section1_text")}</p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section2_title")}>
        <p>{t("privacy_page_section2_text")}</p>
        <LegalList>
          <li>{t("privacy_page_section2_list1")}</li>
          <li>{t("privacy_page_section2_list2")}</li>
          <li>{t("privacy_page_section2_list3")}</li>
        </LegalList>
      </LegalSection>

      <LegalSection title={t("privacy_page_section3_title")}>
        <LegalList>
          <li>{t("privacy_page_section3_list1")}</li>
          <li>{t("privacy_page_section3_list2")}</li>
          <li>{t("privacy_page_section3_list3")}</li>
        </LegalList>
      </LegalSection>

      <LegalSection title={t("privacy_page_section4_title")}>
        <p>{t("privacy_page_section4_text")}</p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section5_title")}>
        <p>
          {t("privacy_page_section5_text")}
          <a href={`/${lang}/cookies`} className={legalLink}>
            {t("privacy_page_section5_link")}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section6_title")}>
        <LegalList>
          <li>{t("privacy_page_section6_list1")}</li>
          <li>{t("privacy_page_section6_list2")}</li>
        </LegalList>
      </LegalSection>

      <LegalSection title={t("privacy_page_section7_title")}>
        <p>{t("privacy_page_section7_text")}</p>
        <p>
          {t("privacy_page_section7_link_text")}
          <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className={legalLink}>
            www.cnpd.pt
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section8_title")}>
        <p>{t("privacy_page_section8_text")}</p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section9_title")}>
        <p>{t("privacy_page_section9_text")}</p>
      </LegalSection>

    </LegalLayout>
  )
}

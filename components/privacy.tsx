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
          <li>{t("privacy_page_section2_list4")}</li>
        </LegalList>
        <p>{t("privacy_page_section2_note")}</p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section3_title")}>
        <LegalList>
          <li>{t("privacy_page_section3_list1")}</li>
          <li>{t("privacy_page_section3_list2")}</li>
          <li>{t("privacy_page_section3_list3")}</li>
        </LegalList>
      </LegalSection>

      <LegalSection title={t("privacy_page_section4_title")}>
        <LegalList>
          <li>{t("privacy_page_section4_list1")}</li>
          <li>{t("privacy_page_section4_list2")}</li>
        </LegalList>
      </LegalSection>

      <LegalSection title={t("privacy_page_section5_title")}>
        <p>
          {t("privacy_page_section5_text1")}
          <br />
          <strong>{t("privacy_page_section5_service")}</strong>
          <br />
          {t("privacy_page_section5_text2")}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={legalLink}>
            https://policies.google.com/privacy
          </a>
        </p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section6_title")}>
        <p>{t("privacy_page_section6_text")}</p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section7_title")}>
        <p>{t("privacy_page_section7_text")}</p>
        <LegalList>
          <li>{t("privacy_page_section7_list1")}</li>
          <li>{t("privacy_page_section7_list2")}</li>
          <li>{t("privacy_page_section7_list3")}</li>
          <li>{t("privacy_page_section7_list4")}</li>
          <li>
            {t("privacy_page_section7_list5")}
            <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className={legalLink}>
              www.cnpd.pt
            </a>
          </li>
        </LegalList>
        <p>{t("privacy_page_section7_note")}</p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section8_title")}>
        <p>{t("privacy_page_section8_text")}</p>
        <LegalList>
          <li>{t("privacy_page_section8_list1")}</li>
          <li>{t("privacy_page_section8_list2")}</li>
          <li>
            {t("privacy_page_section8_list3a")}
            <a href={`/${lang}/cookies`} className={legalLink}>
              {t("privacy_page_section8_list3b")}
            </a>
            .
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title={t("privacy_page_section9_title")}>
        <p>{t("privacy_page_section9_text")}</p>
      </LegalSection>

      <LegalSection title={t("privacy_page_section10_title")}>
        <p>{t("privacy_page_section10_text")}</p>
      </LegalSection>
    </LegalLayout>
  )
}

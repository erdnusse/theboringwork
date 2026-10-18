"use client"
import { useTranslation } from "@/hooks/use-translation"
import { openCookieSettings } from "@/lib/cookie-consent"
import { LegalLayout, LegalSection, legalLink } from "@/components/site/legal-layout"

const COOKIES = ["ga", "ga_x", "gid", "gat"] as const
const COLUMNS = ["name", "purpose", "duration", "type", "origin"] as const

export default function CookiesComponent() {
  const { t, lang } = useTranslation()
  const cell = (cookie: (typeof COOKIES)[number], column: (typeof COLUMNS)[number]) => {
    if (column === "name") return t(`cookies_page_table_${cookie}`)
    const suffix = column === "purpose" ? "desc" : column
    return t(`cookies_page_table_${cookie}_${suffix}`)
  }

  return (
    <LegalLayout
      eyebrow={t("footer_legal")}
      title={t("cookies_page_title")}
      updated={t("cookies_page_last_update")}
      intro={t("cookies_page_intro")}
    >
      <LegalSection title={t("cookies_page_section1_title")}>
        <p>{t("cookies_page_section1_text")}</p>
      </LegalSection>

      <LegalSection title={t("cookies_page_section2_title")}>
        <p className="font-bold text-ink">{t("cookies_page_section2_a_title")}</p>
        <p>{t("cookies_page_section2_a_text")}</p>
        <p className="font-bold text-ink">{t("cookies_page_section2_b_title")}</p>
        <p>{t("cookies_page_section2_b_text")}</p>
      </LegalSection>

      <LegalSection title={t("cookies_page_section3_title")}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink text-ink">
                {COLUMNS.map((column) => (
                  <th key={column} className="px-3 py-3 font-bold">
                    {t(`cookies_page_table_${column}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((cookie) => (
                <tr key={cookie} className="border-b border-line">
                  {COLUMNS.map((column) => (
                    <td key={column} className="px-3 py-3 align-top">
                      {cell(cookie, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs">{t("cookies_page_section3_note")}</p>
      </LegalSection>

      <LegalSection title={t("cookies_page_section4_title")}>
        <p>{t("cookies_page_section4_text")}</p>
        <button type="button" onClick={openCookieSettings} className={legalLink}>
          {t("cookie_settings")}
        </button>
      </LegalSection>

      <LegalSection title={t("cookies_page_section5_title")}>
        <p>
          {t("cookies_page_section5_text")}
          <a href={`/${lang}/privacy`} className={legalLink}>
            {t("cookies_page_section5_privacy_link")}
          </a>
          .
        </p>
        <p>
          {t("cookies_page_section5_cookies_info")}{" "}
          <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className={legalLink}>
            {t("cookies_page_section5_cookies_url")}
          </a>
        </p>
      </LegalSection>

      <LegalSection title={t("cookies_page_section6_title")}>
        <p>
          {t("cookies_page_section6_text")}
          <br />
          <a href="mailto:info@theboringwork.pt" className={legalLink}>
            {t("cookies_page_section6_email")}
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

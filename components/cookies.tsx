'use client';
import { useTranslation } from "@/hooks/use-translation";

export default function CookiesComponent() {
  const { t, lang } = useTranslation();
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 bg-white rounded-xl shadow-lg mt-8 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-[#f3864d]">
        {t("cookies_page_title")} – The Boring Work
      </h1>
      <p className="mb-2 text-gray-700">{t("cookies_page_last_update")}</p>
      <p className="mb-4 text-gray-700">{t("cookies_page_intro")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("cookies_page_section1_title")}</h2>
      <p className="mb-4 text-gray-700">{t("cookies_page_section1_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("cookies_page_section2_title")}</h2>
      <p className="mb-2 text-gray-700 font-semibold">{t("cookies_page_section2_a_title")}</p>
      <p className="mb-4 text-gray-700">
        {t("cookies_page_section2_a_text")}
      </p>
      <p className="mb-2 text-gray-700 font-semibold">{t("cookies_page_section2_b_title")}</p>
      <p className="mb-4 text-gray-700">
        {t("cookies_page_section2_b_text")}
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("cookies_page_section3_title")}</h2>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead>
            <tr className="bg-[#f6ede6]">
              <th className="py-2 px-3 border-b">{t("cookies_page_table_name")}</th>
              <th className="py-2 px-3 border-b">{t("cookies_page_table_purpose")}</th>
              <th className="py-2 px-3 border-b">{t("cookies_page_table_duration")}</th>
              <th className="py-2 px-3 border-b">{t("cookies_page_table_type")}</th>
              <th className="py-2 px-3 border-b">{t("cookies_page_table_origin")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_desc")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_duration")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_type")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_origin")}</td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_x")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_x_desc")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_x_duration")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_x_type")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_ga_x_origin")}</td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gid")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gid_desc")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gid_duration")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gid_type")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gid_origin")}</td>
            </tr>
            <tr>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gat")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gat_desc")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gat_duration")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gat_type")}</td>
              <td className="py-2 px-3 border-b">{t("cookies_page_table_gat_origin")}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2">{t("cookies_page_section3_note")}</p>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("cookies_page_section4_title")}</h2>
      <p className="mb-4 text-gray-700">{t("cookies_page_section4_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("cookies_page_section5_title")}</h2>
      <p className="mb-4 text-gray-700">
        {t("cookies_page_section5_text")}
        <a href={`/${lang}/privacy`} className="text-[#f3864d] underline">{t("cookies_page_section5_privacy_link")}</a>.
      </p>
      <p className="mb-4 text-gray-700">
        {t("cookies_page_section5_cookies_info")}{" "}
        <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#f3864d] underline">
          {t("cookies_page_section5_cookies_url")}
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("cookies_page_section6_title")}</h2>
      <p className="mb-4 text-gray-700">
        {t("cookies_page_section6_text")}<br />
        📧 <a href="mailto:info@theboringwork.pt" className="text-[#f3864d] underline">{t("cookies_page_section6_email")}</a>
      </p>
    </section>
  );
}
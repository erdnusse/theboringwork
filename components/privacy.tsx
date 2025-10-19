'use client'
import { useTranslation } from "@/hooks/use-translation";

export default function PrivacyComponent() {
  const { t, lang } = useTranslation();
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 bg-white rounded-xl shadow-lg mt-8 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-[#f3864d]">{t("privacy_page_title")} – The Boring Work</h1>
      <p className="mb-2 text-gray-700">{t("privacy_page_last_update")}</p>
      <p className="mb-4 text-gray-700">{t("privacy_page_intro")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section1_title")}</h2>
      <p className="mb-4 text-gray-700">{t("privacy_page_section1_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section2_title")}</h2>
      <p className="mb-2 text-gray-700">{t("privacy_page_section2_text")}</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>{t("privacy_page_section2_list1")}</li>
        <li>{t("privacy_page_section2_list2")}</li>
        <li>{t("privacy_page_section2_list3")}</li>
        <li>{t("privacy_page_section2_list4")}</li>
      </ul>
      <p className="mb-4 text-gray-700">{t("privacy_page_section2_note")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section3_title")}</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>{t("privacy_page_section3_list1")}</li>
        <li>{t("privacy_page_section3_list2")}</li>
        <li>{t("privacy_page_section3_list3")}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section4_title")}</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>{t("privacy_page_section4_list1")}</li>
        <li>{t("privacy_page_section4_list2")}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section5_title")}</h2>
      <p className="mb-4 text-gray-700">
        {t("privacy_page_section5_text1")}<br />
        <strong>{t("privacy_page_section5_service")}</strong><br />
        {t("privacy_page_section5_text2")}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#f3864d] underline">
          https://policies.google.com/privacy
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section6_title")}</h2>
      <p className="mb-4 text-gray-700">{t("privacy_page_section6_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section7_title")}</h2>
      <p className="mb-2 text-gray-700">{t("privacy_page_section7_text")}</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>{t("privacy_page_section7_list1")}</li>
        <li>{t("privacy_page_section7_list2")}</li>
        <li>{t("privacy_page_section7_list3")}</li>
        <li>{t("privacy_page_section7_list4")}</li>
        <li>
          {t("privacy_page_section7_list5")}
          <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-[#f3864d] underline">www.cnpd.pt</a>
        </li>
      </ul>
      <p className="mb-4 text-gray-700">{t("privacy_page_section7_note")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section8_title")}</h2>
      <p className="mb-4 text-gray-700">{t("privacy_page_section8_text")}</p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>{t("privacy_page_section8_list1")}</li>
        <li>{t("privacy_page_section8_list2")}</li>
        <li>
          {t("privacy_page_section8_list3a")}
          <a href={`/${lang}/cookies`} className="text-[#f3864d] underline">{t("privacy_page_section8_list3b")}</a>.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section9_title")}</h2>
      <p className="mb-4 text-gray-700">{t("privacy_page_section9_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("privacy_page_section10_title")}</h2>
      <p className="mb-4 text-gray-700">{t("privacy_page_section10_text")}</p>
    </section>
  );
}
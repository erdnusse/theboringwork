'use client';
import { useTranslation } from "../hooks/use-translation";

export default function TermsComponent() {
  const { t } = useTranslation();
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 bg-white rounded-xl shadow-lg mt-14 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-[#f3864d]">{t("terms_page_title")}</h1>
      <p className="mb-2 text-gray-700">{t("terms_page_last_update")}</p>
      <p className="mb-4 text-gray-700">{t("terms_page_intro")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section1_title")}</h2>
      <p className="mb-4 text-gray-700">{t("terms_page_section1_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section2_title")}</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>{t("terms_page_section2_list1")}</li>
        <li>{t("terms_page_section2_list2")}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section3_title")}</h2>
      <p className="mb-4 text-gray-700">{t("terms_page_section3_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section4_title")}</h2>
      <p className="mb-4 text-gray-700">{t("terms_page_section4_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section5_title")}</h2>
      <p className="mb-4 text-gray-700">{t("terms_page_section5_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section6_title")}</h2>
      <p className="mb-4 text-gray-700">{t("terms_page_section6_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section7_title")}</h2>
      <p className="mb-4 text-gray-700">{t("terms_page_section7_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section8_title")}</h2>
      <p className="mb-4 text-gray-700">{t("terms_page_section8_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section9_title")}</h2>
      <p className="mb-4 text-gray-700">{t("terms_page_section9_text")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-[#f3864d]">{t("terms_page_section10_title")}</h2>
      <p className="mb-4 text-gray-700">
        {t("terms_page_section10_text1")} <a href="mailto:info@theboringwork.pt" className="text-[#f3864d] underline">info@theboringwork.pt</a>
      </p>
    </section>
  );
}
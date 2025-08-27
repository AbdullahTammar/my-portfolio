import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: true,
    ns: ["header"],          // 👈 لازم يكون فيه namespace
    defaultNS: "header",     // 👈 عشان لما تكتب t("codeCard.role") يعرف يبحث فيه
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // 👈 يتأكد إنه يقرأ header.json
    },
  });

export default i18n;

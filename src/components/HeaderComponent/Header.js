import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TerminalCard from "../components/TerminalCard/TerminalCard";

function Home() {
  const { t, i18n } = useTranslation("header");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleLanguage = () => {
    const nl = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(nl);
    document.documentElement.dir = nl === "ar" ? "rtl" : "ltr";
  };

  const nav = ["projects", "contact"];

  return (
    <section className="flex flex-wrap items-start justify-between gap-10 px-[5%] py-16 relative z-10">
      {/* Left */}
      <div className="flex-1 min-w-[300px] flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white font-extrabold text-[clamp(32px,5vw,56px)]"
        >
          {t("name")}
        </motion.h1>

        <span className="block h-[3px] w-[40%] my-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-300"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap gap-3 justify-center"
        >
          {nav.map((k) => (
            <a
              key={k}
              href={`#${k}`}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold shadow-md hover:scale-105 transition"
            >
              {t(k)}
            </a>
          ))}

          <button
            onClick={toggleLanguage}
            className="px-5 py-2 rounded-full border border-slate-400 text-slate-200 hover:bg-slate-700 transition"
          >
            {i18n.language === "en" ? "AR" : "EN"}
          </button>
        </motion.div>
      </div>


      <div className="flex-1 min-w-[350px] flex justify-center">
        <TerminalCard key={i18n.language} />
      </div>
    </section>
  );
}

export default Home;

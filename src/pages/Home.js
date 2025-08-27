import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import TerminalCard from "../components/TerminalCard/TerminalCard";

function Home() {
  const { t, i18n } = useTranslation("header");
  const [isDark, setIsDark] = useState(true);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
    setOffset({ x: moveX, y: moveY });
  };

  return (
    <section className="relative flex flex-wrap items-center justify-between gap-10 lg:gap-20 px-[5%] py-12 sm:py-16 z-10">
      {/* Left side */}
      <div className="flex-1 min-w-[280px] flex flex-col items-center text-center -mt-10 sm:-mt-32 relative">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-4 text-white font-extrabold text-[clamp(28px,6vw,56px)] leading-snug whitespace-nowrap"
        >
          <span>
            {i18n.language === "en" ? (
              <>
                <span className="text-[clamp(40px,8vw,80px)] leading-none">
                  {t("firstName").charAt(0)}
                </span>
                {t("firstName").slice(1)}
              </>
            ) : (
              t("firstName")
            )}
          </span>
          <span>
            {i18n.language === "en" ? (
              <>
                <span className="text-[clamp(40px,8vw,80px)] leading-none">
                  {t("lastName").charAt(0)}
                </span>
                {t("lastName").slice(1)}
              </>
            ) : (
              t("lastName")
            )}
          </span>
        </motion.h1>

        <span className="block h-[3px] w-[50%] sm:w-[35%] my-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-[gradient_8s_linear_infinite]" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-4"
        >
          <a
            href="https://github.com/AbdullahTammar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 text-2xl transition-colors hover:text-black"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/abdullah-tammar-53634321a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 text-2xl transition-colors hover:text-[#0A66C2]"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/Uxiiiic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 text-2xl transition-colors hover:text-black"
          >
            <FaXTwitter />
          </a>
          <a
            href="mailto:Abdullah.Tamar7@gmail.com"
            className="text-slate-300 text-2xl transition-colors hover:text-[#EA4335]"
          >
            <MdEmail />
          </a>
          <a
            href="https://www.snapchat.com/add/Uxiiic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 text-2xl transition-colors hover:text-[#FFFC00]"
          >
            <FaSnapchatGhost />
          </a>
        </motion.div>
        <motion.div
          dir="ltr"
          onMouseMove={handleMouseMove}
          animate={{ x: offset.x, y: offset.y }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
          className="font-english text-gray-400 font-extrabold text-[clamp(100px,18vw,200px)] select-none hover:text-cyan-400 hover:opacity-90 transition-colors duration-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]"
        >
          &lt;/&gt;
        </motion.div>
      </div>

      {/* Right side */}
      <div className="flex-[1.5] min-w-[300px] sm:min-w-[360px] flex justify-center -mt-6 sm:-mt-20 relative">
        <TerminalCard />
      </div>
    </section>
  );
}

export default Home;

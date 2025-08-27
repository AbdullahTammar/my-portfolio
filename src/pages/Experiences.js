import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaBriefcase, FaLaptopCode, FaAward, FaMobileAlt } from "react-icons/fa";
import { SiReact, SiOracle, SiAngular } from "react-icons/si";

function Experiences() {
  const { t } = useTranslation("experiences");

  const kamel = t("kamel", { returnObjects: true }) || null;
  let professional = t("items.professional", { returnObjects: true }) || [];

  professional = professional.sort((a, b) => {
    const getEndYear = (date) => {
      if (!date) return 0;
      if (date.toLowerCase().includes("present") || date.includes("الحالي") || date.includes("حتى الآن"))
        return 9999;
      const parts = date.split("-");
      return parseInt(parts[1]) || parseInt(parts[0]) || 0;
    };
    return getEndYear(b.date) - getEndYear(a.date);
  });

  return (
    <div className="w-full h-full px-4 sm:px-6 flex flex-col justify-start">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center mt-0 pt-0"
      >
        {t("title")}
        <div className="h-[3px] w-24 mx-auto mt-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

      </motion.h2>
      

      {kamel && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="w-full max-w-5xl mx-auto mb-8 bg-slate-900/70 p-6 rounded-xl shadow-lg relative border border-cyan-500/30 cursor-pointer"
        >
          <div className="absolute -top-5 -left-5 bg-slate-800 p-4 rounded-full shadow-md">
            <FaMobileAlt className="text-cyan-400 text-2xl" />
          </div>

          <h4 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-1">
            {kamel.title}
          </h4>
          <p className="text-slate-300 text-sm">{kamel.company}</p>
          <p className="text-slate-400 text-xs mb-3">{kamel.date}</p>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {kamel.shortDescription}
          </p>

          <div className="mt-3 flex items-center gap-2 text-yellow-400 text-sm font-semibold">
            <FaAward /> {t("ipCertified")}
          </div>
        </motion.div>
      )}

      <div className="relative flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
        {professional.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="flex-1 min-w-[200px] sm:min-w-[220px] max-w-[250px] bg-slate-900/70 p-5 rounded-xl shadow-md cursor-pointer transition relative"
            style={{ marginTop: `${i * 35}px` }}
          >
<div className="absolute -top-4 -left-4 bg-slate-800 p-3 rounded-full shadow-md">
  {item.company.includes("K&A") ? (
    <SiReact className="text-cyan-400 text-lg sm:text-xl" />
  ) : item.company.includes("ناغي") || item.company.toLowerCase().includes("naghi") ? (
    <SiOracle className="text-red-500 text-lg sm:text-xl" />
  ) : item.company.includes("جمل") || item.company.toLowerCase().includes("jammel") ? (
    <SiAngular className="text-red-600 text-lg sm:text-xl" />
  ) : item.title.toLowerCase().includes("developer") ? (
    <FaLaptopCode className="text-cyan-400 text-lg sm:text-xl" />
  ) : (
    <FaBriefcase className="text-blue-400 text-lg sm:text-xl" />
  )}
</div>


            <h4 className="text-base sm:text-lg font-semibold text-cyan-400 flex items-center gap-2">
              {item.title}
              {item.date.toLowerCase().includes("present") ||
              item.date.includes("الحالي") ||
              item.date.includes("حتى الآن") ? (
                <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded">
                  {t("current")}
                </span>
              ) : null}
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm">{item.company}</p>
            <p className="text-slate-400 text-xs mb-2">{item.date}</p>
            <p className="text-slate-300 text-xs sm:text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Experiences;

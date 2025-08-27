import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaReact, FaNodeJs, FaDatabase, FaGitAlt,
} from "react-icons/fa";
import {
  SiTypescript, SiAngular, SiFlutter, SiKotlin, SiPostman,
  SiMysql, SiDocker, SiNginx, SiMongodb, SiDotnet, SiOracle, SiFigma,
} from "react-icons/si";

function Pill({ children }) {
  return (
    <span className="px-2 py-1 rounded-full text-xs bg-slate-800/60 border border-slate-700 text-slate-200 font-english">
      {children}
    </span>
  );
}

function Card({ icon, title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="relative p-5 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/60 shadow-lg hover:shadow-cyan-500/10 hover:border-slate-600 transition"
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <Pill key={i}>{it}</Pill>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t, i18n } = useTranslation("header");

  const groups = [
    {
      title: t("frontend"),
      icon: <FaReact className="text-cyan-400 text-3xl" />,
      dot: "bg-cyan-400",
      items: [
        "HTML5", "CSS3", "TailwindCSS",
        "JavaScript (ES6+)", "TypeScript",
        "React.js", "Angular", "Flutter", "Modern UI/UX",
      ],
    },
    {
      title: t("backend"),
      icon: <FaNodeJs className="text-green-500 text-3xl" />,
      dot: "bg-green-500",
      items: [
        "Node.js", "Express.js",
        "ASP.NET Core", "Java", "Kotlin",
        "Oracle Integration Cloud (OIC)",
      ],
    },
    {
      title: t("databases"),
      icon: <FaDatabase className="text-purple-400 text-3xl" />,
      dot: "bg-purple-400",
      items: [
        "Oracle EBS", "Oracle APEX",
        "MySQL", "SQL / PL/SQL", "NoSQL (MongoDB)",
      ],
    },
    {
      title: t("tools"),
      icon: <FaGitAlt className="text-orange-400 text-3xl" />,
      dot: "bg-orange-400",
      items: [
        "Git / GitHub", "Postman", "Nginx",
        "Docker", "VS Code", "IntelliJ",
      ],
    },
    {
      title: t("design"),
      icon: <SiFigma className="text-pink-400 text-3xl" />,
      dot: "bg-pink-400",
      items: ["UI/UX Design", "Responsive Design", "Prototyping"],
    },
  ];

  return (
    <section id="skills" className="px-[5%] py-20 text-white relative z-10">
      {/* العنوان */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold">{t("skills")}</h2>
        <div className="h-[3px] w-24 mx-auto mt-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
      </div>

      {/* جذر الشجرة */}
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto w-full sm:w-[420px]"
        >
          <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-700/60 shadow-lg text-center">
            <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
              <SiDotnet className="text-sky-300 text-2xl" />
              <FaNodeJs className="text-green-500 text-2xl" />
              <SiOracle className="text-red-400 text-2xl" />
              <FaReact className="text-cyan-400 text-2xl" />
            </div>
            <h3 className="text-xl font-bold">{t("coreStack")}</h3>
            <p className="text-slate-300 text-sm mt-1 font-english">
              {t("coreStackDesc")}
            </p>
          </div>

          {/* خط أفقي + الدواير */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-[100%] h-10 w-[80%]">
            <div className="absolute top-4 left-0 right-0 h-px bg-slate-600/60" />
            {groups.map((g, idx) => (
              <div
                key={idx}
                className={`absolute top-[14px] w-2 h-2 rounded-full ${g.dot}`}
                style={
                  i18n.language === "ar"
                    ? { right: `${10 + idx * 20}%` }
                    : { left: `${10 + idx * 20}%` }
                }
              />
            ))}
          </div>
        </motion.div>

        {/* صف الفروع (ديسكتوب + تابلت) */}
        <div className="mt-10 lg:mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {groups.map((g) => (
            <div key={g.title} className="relative">
              <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-600/60" />
              <Card icon={g.icon} title={g.title} items={g.items} />
            </div>
          ))}
        </div>

        {/* نمط الشجرة للجوال */}
        <div className="lg:hidden relative mt-8 max-h-[70vh] overflow-y-auto pr-4 custom-scroll">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-600/50" />
          <div className="space-y-6 pl-8">
            {groups.map((g, i) => (
              <div key={i} className="relative">
                <div
                  className={`absolute -left-8 top-6 w-2 h-2 rounded-full ${g.dot}`}
                />
                {/* ✅ الكارت يظهر هنا في الجوال */}
                <Card icon={g.icon} title={g.title} items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

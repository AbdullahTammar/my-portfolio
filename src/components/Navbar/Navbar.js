import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation("header");
  const [isDark, setIsDark] = useState(true);

  // load saved theme
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

  const toggleDark = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const nav = ["about", "skills", "projects", "contact"];

  return (
    <nav className="nav-glass">
      <div className="brand-circle">AT</div>

      <div className="nav-links">
        {nav.map((k) => (
          <a key={k} href={`#${k}`} className="chip-link">
            {t(k)}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <button onClick={toggleLanguage} className="chip-ghost">
          {i18n.language === "en" ? "AR" : "EN"}
        </button>
        <button onClick={toggleDark} className="chip-ghost">
          {isDark ? "Light" : "Dark"}
        </button>
        <a href="#contact" className="btn-shine">
          {t("hireMe")}
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

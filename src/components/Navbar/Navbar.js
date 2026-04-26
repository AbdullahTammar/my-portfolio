import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { MdTranslate } from "react-icons/md";
import "./Navbar.css";

function Navbar() {
  const { i18n } = useTranslation("header");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleLanguage = () => {
    const nl = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(nl);
    document.documentElement.dir = nl === "ar" ? "rtl" : "ltr";
  };

  return (
    <nav className="nav-glass">
      {/* Brand Bitmoji */}
      <div className="brand-avatar" aria-label="brand avatar">
        <img
          src="/assets/TammarEmoji.png"
          alt="Tammar Emoji"
          className="brand-img"
        />
      </div>

      {/* Actions */}
      <div className="nav-actions">
        <button
          onClick={toggleLanguage}
          className="icon-btn"
          aria-label="toggle language"
        >
          <MdTranslate size={20} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

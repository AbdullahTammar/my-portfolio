import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation("iphone");

  return (
    <footer className="contact-footer">
      <span>{t("footer.message")}</span>
      <div className="contact-footer__links">
        <a
          href="https://t.me/Uxiiic"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-footer__link contact-footer__link--tg"
        >
          <FaTelegramPlane /> {t("footer.telegram")}
        </a>
        <a
          href="https://wa.me/966567387950"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-footer__link contact-footer__link--wa"
        >
          <FaWhatsapp /> {t("footer.whatsapp")}
        </a>
      </div>
    </footer>
  );
}

export default Footer;

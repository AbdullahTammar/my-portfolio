import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./TerminalCard.css";

function TerminalCard() {
  const { t, i18n } = useTranslation("header");
  const isRTL = i18n.language === "ar";

  const intro = useMemo(
    () => t("intro", { returnObjects: true }) || [],
    [t, i18n.language]
  );

  const [typedText, setTypedText] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!intro.length) return;
    if (lineIndex >= intro.length) return;

    intervalRef.current = setInterval(() => {
      const current = intro[lineIndex];
      if (charIndex < current.length) {
        setTypedText((prev) => {
          const copy = [...prev];
          if (!copy[lineIndex]) copy[lineIndex] = "";
          copy[lineIndex] += current[charIndex];
          return copy;
        });
        setCharIndex((c) => c + 1);
      } else {
        clearInterval(intervalRef.current);
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }
    }, 40);

    return () => clearInterval(intervalRef.current);
  }, [intro, lineIndex, charIndex]);

  useEffect(() => {
    setTypedText([]);
    setLineIndex(0);
    setCharIndex(0);
  }, [intro]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2 }}
      className={`terminal-card ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="terminal-header">
        <div className="dot dot-red"></div>
        <div className="dot dot-yellow"></div>
        <div className="dot dot-green"></div>
      </div>

      <div className="terminal-body">

        <div className="line command-line">
          <span className="prompt">{t("commandPrompt")}</span>
          <span className="command">&nbsp;{t("commandLine")};</span>
        </div>

        {/* Ghost */}
        <pre className="terminal-text terminal-ghost" aria-hidden="true">
          {intro.map((line, i) => (
            <div key={`g-${i}`} className="line">
              <span className="prompt">❯</span> <bdi>{line}</bdi>
            </div>
          ))}
        </pre>

        {/* Overlay */}
        <pre className="terminal-text terminal-overlay">
          {typedText.map((line, i) => {
            const isCurrent = i === lineIndex;
            return (
              <div key={`t-${i}`} className="line">
                <span className="prompt">❯</span>
                <bdi>{line}</bdi>
                {isCurrent && <span className="cursor">▋</span>}
              </div>
            );
          })}
        </pre>
      </div>

      <div className="terminal-footer">
        <span className="footer-left">#portfolio • v1.0</span>
        <span className="footer-divider">•</span>
        <span className="footer-right">Made in Saudi Arabia 🇸🇦</span>
      </div>
    </motion.div>
  );
}

export default TerminalCard;

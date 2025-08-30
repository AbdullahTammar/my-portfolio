import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import HeroBackground from "../components/HeroBackground/HeroBackground";
import Navbar from "../components/Navbar/Navbar";
import IphoneMockup from "../components/IphoneMockup/IphoneMockup";
import Contact from "../pages/Contact";

import Home from "../pages/Home";
import Skills from "../pages/Skills";
import Projects from "../pages/Projects";
import Experiences from "../pages/Experiences";

import "./Layout.css";

function Layout() {
  const { i18n } = useTranslation();

  const [progress, setProgress] = useState({});
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const sectionsEls = document.querySelectorAll(".section");
    const rootEl = document.querySelector(".scroll-container");

    if (!sectionsEls.length || !rootEl) return;

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver(
      (entries) => {
        setProgress((prev) => {
          const next = { ...prev };
          let topId = null;
          let topCoverage = -1;

          entries.forEach((entry) => {
            const rootH =
              (entry.rootBounds && entry.rootBounds.height) || rootEl.clientHeight || window.innerHeight;
            const coverage = Math.max(
              0,
              Math.min(1, entry.intersectionRect.height / rootH)
            );

            const id = entry.target.id;
            next[id] = coverage;

            if (coverage > topCoverage) {
              topCoverage = coverage;
              topId = id;
            }
          });

          if (topId) setActive(topId);

          return next;
        });
      },
      {
        root: rootEl,                 
        threshold: thresholds,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    sectionsEls.forEach((sec) => observer.observe(sec));
    return () => sectionsEls.forEach((sec) => observer.unobserve(sec));
  }, []);

  const sections = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "experiences", label: "Experiences" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <div className="layout-container">
      <HeroBackground />
      <Navbar />

      {/* Nav dots as progress indicators */}
      <div className={`nav-dots ${i18n.language === "ar" ? "left" : "right"}`}>
        {sections.map((sec) => {
          const p = Math.round((progress[sec.id] || 0) * 100); 
          const scale = 1 + (p / 100) * 0.3; 
          return (
            <div
              key={sec.id}
              className={`nav-dot ${active === sec.id ? "active" : ""}`}
              title={sec.label}
              style={{
                "--p": `${p}%`,
                transform: `scale(${scale})`,
              }}
            />
          );
        })}
      </div>

      <div className="scroll-container">
        <section className="section" id="home">
          <Home />
        </section>
        <section className="section" id="skills">
          <Skills />
        </section>
        <section className="section" id="experiences">
          <Experiences />
        </section>
        <section className="section" id="projects">
        <IphoneMockup />
        </section>
        <section className="section" id="contact">
        <Contact />
        </section>
      </div>
    </div>
  );
}

export default Layout;

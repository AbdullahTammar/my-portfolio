import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import HeroBackground from "../components/HeroBackground/HeroBackground";
import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home";
import Skills from "../pages/Skills";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import Experiences from "../pages/Experiences";

import "./Layout.css";

function Layout() {
  const { i18n } = useTranslation();
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const sections = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "experiences", label: "Experiences" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleDotClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="layout-container">
      <HeroBackground />
      <Navbar />

      {/* Nav dots hidden on mobile */}
      <div className={`nav-dots ${i18n.language === "ar" ? "left" : "right"}`}>
        {sections.map((sec) => (
          <div
            key={sec.id}
            className={`nav-dot ${active === sec.id ? "active" : ""}`}
            title={sec.label}
            onClick={() => handleDotClick(sec.id)}
          />
        ))}
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
          <Projects />
        </section>
        <section className="section" id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default Layout;

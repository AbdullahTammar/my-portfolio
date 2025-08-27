import { useEffect } from "react";
import "./HeroBackground.css";

function HeroBackground() {
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="hero-bg-container">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
    </div>
  );
}

export default HeroBackground;

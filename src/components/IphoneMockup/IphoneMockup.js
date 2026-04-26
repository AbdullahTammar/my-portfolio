import React, { useState, useRef, useCallback, useEffect } from "react";
import "./IphoneMockup.css";
import Kamel from "../../pages/Kamel";
import DoctorAppointments from "../../pages/DoctorAppointments";
import Monexa from "../../pages/Monexa";
import Stoxly from "../../pages/Stoxly";
import TicTacToe from "../../pages/TicTacToe";
import { FaChartLine, FaGamepad, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

/* Icons */
import { FaPhoneAlt, FaSafari, FaMusic } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
import { FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function IphoneMockup() {
  const { t, i18n } = useTranslation("iphone");
  const [activeApp, setActiveApp] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [shakeApp, setShakeApp] = useState(null); // icon shake

  const appScreenRef = useRef(null);
  const appBodyRef = useRef(null);

  const dragState = useRef({
    dragging: false,
    startY: 0,
    startX: 0,
    startScrollTop: 0,
    fromGestureZone: false,
    shouldClose: false,
  });

  // Clock + date (Riyadh, respects ar/en)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Riyadh" };
      setCurrentTime(new Intl.DateTimeFormat(i18n.language === "ar" ? "ar-SA" : "en-GB", timeOptions).format(now));

      const dateOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Riyadh" };
      setTodayDate(new Intl.DateTimeFormat(i18n.language === "ar" ? "ar-SA" : "en-US", dateOptions).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [i18n.language]);

  const onPointerDown = useCallback((e) => {
    if (!appBodyRef.current || !appScreenRef.current) return;
    const body = appBodyRef.current;
    const rect = appScreenRef.current.getBoundingClientRect();
    body.setPointerCapture?.(e.pointerId);
    dragState.current = {
      dragging: true,
      startY: e.clientY,
      startX: e.clientX,
      startScrollTop: body.scrollTop,
      fromGestureZone: e.clientY >= rect.bottom - 28,
      shouldClose: false,
    };
    body.classList.add("dragging");
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragState.current.dragging || !appBodyRef.current) return;
    const body = appBodyRef.current;
    const dy = dragState.current.startY - e.clientY;
    body.scrollTop = dragState.current.startScrollTop + dy;
    if (dragState.current.fromGestureZone) {
      const absX = Math.abs(e.clientX - dragState.current.startX);
      const progress = Math.min(Math.max(dy / 150, 0), 1);
      setDragProgress(progress);
      dragState.current.shouldClose = dy > 90 && absX < 60;
    }
  }, []);

  const onPointerUp = useCallback((e) => {
    if (!appBodyRef.current) return;
    const body = appBodyRef.current;
    body.releasePointerCapture?.(e.pointerId);
    body.classList.remove("dragging");
    dragState.current.dragging = false;

    if (dragState.current.shouldClose && !isClosing) {
      setIsClosing(true);
      setDragProgress(0);
      setTimeout(() => {
        setActiveApp(null);
        setIsClosing(false);
        body.scrollTop = 0;
      }, 280);
    } else {
      setDragProgress(0);
    }
    dragState.current.shouldClose = false;
  }, [isClosing]);

  const apps = [
    {
      name: t("apps.kamel"),
      key: "Kamel",
      className: "icon--kamel",
      theme: "light",
      component: <Kamel />,
      icon: <img src="/assets/kamelAppSmallLogo.png" alt="Kamel" style={{ width:"100%", height:"100%", borderRadius:18, objectFit:"cover" }} />,
    },
    {
      name: t("apps.cura"),
      key: "Cura",
      className: "icon--cura",
      theme: "light",
      component: <DoctorAppointments />,
      icon: <img src="/assets/DoctorAppLogo.png" alt="Cura" style={{ width:"100%", height:"100%", borderRadius:18, objectFit:"cover" }} />,
    },
    {
      name: t("apps.monexa"),
      key: "Monexa",
      className: "icon--monexa",
      theme: "dark",
      component: <Monexa />,
      icon: <img src="/assets/monexaAppLogo.png" alt="Monexa" style={{ width:"100%", height:"100%", borderRadius:18, objectFit:"cover" }} />,
    },
    {
      name: t("apps.stoxly"),
      key: "Stoxly",
      theme: "dark",
      className: "icon--stoxly",
      component: <Stoxly />,
      icon: (
        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:18, background:"linear-gradient(135deg,#2c3e50,#000)" }}>
          <FaChartLine size={28} color="#4fc3f7" />
        </div>
      ),
    },
    {
      name: t("apps.tictactoe"),
      key: "TicTacToe",
      theme: "dark",
      className: "icon--game",
      component: <TicTacToe />,
      icon: (
        <div style={{ width:"100%", height:"100%", borderRadius:18, background:"linear-gradient(160deg,#0f172a,#1e293b)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <FaGamepad size={26} color="#4fc3f7" />
        </div>
      ),
    },
  ];

  const dock = [
    { name: t("dock.phone"), className: "icon--phone", icon: <FaPhoneAlt /> },
    { name: t("dock.messages"), className: "icon--messages", icon: <MdMessage /> },
    { name: t("dock.safari"), className: "icon--safari", icon: <FaSafari /> },
    { name: t("dock.music"), className: "icon--music", icon: <FaMusic /> },
  ];

  const activeAppData = apps.find((a) => a.key === activeApp);

  return (
    <div className="iphone16-root w-full">
      <div className="iphone16-page">
        {/* Title always above cards (not above the phone) */}
        <div className="cards-title w-full text-center mb-2">
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            {t("title")}
          </motion.h2>
          <div className="h-[3px] w-24 mx-auto mt-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </div>

        {/* iPhone (starts on row 2 next to the cards) */}
        <div className="iphone16-wrapper">
          <div className="iphone16-device">
            {/* Buttons */}
            <div className="sidebtn right power" aria-hidden="true" />
            <div className="sidebtn right camera" aria-label="Camera Control" />
            <div className="sidebtn left volup" aria-hidden="true" />
            <div className="sidebtn left voldown" aria-hidden="true" />

            {/* Screen */}
            <div
              className={`iphone16-screen ${activeAppData ? activeAppData.theme : "dark"}`}
              style={{ background: "url('/assets/iphoneScreenBg.jpg') center/cover no-repeat" }}
            >
              <div className="statusbar">
                <div className="status-left">{currentTime}</div>
                <div className="status-right">
                  <div className="signal-bars"><span className="bar bar1" /><span className="bar bar2" /><span className="bar bar3" /></div>
                  <span>5G</span>
                  <span className="battery" />
                </div>
              </div>

              {/* Widgets only on home */}
              {!activeApp && (
                <div className="widgets">
                  <div className="widget"><span className="widget-icon"><WiDaySunny /></span>28°C Sunny</div>
                  <div className="widget"><span className="widget-icon"><FaCalendarAlt /></span>{todayDate}</div>
                </div>
              )}

              {/* Home */}
              {!activeApp && (
                <div className="home-layer">
                  <div className="icons-grid">
                    {apps.map((a) => (
                      <div key={a.key} className={`icon-wrap ${shakeApp === a.key ? "shake" : ""}`} onClick={() => setActiveApp(a.key)}>
                        <div className={`icon ${a.className}`}>{a.icon}</div>
                        <div className="icon-label">{a.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="dock">
                    {dock.map((a) => (
                      <div key={a.name} className={`icon ${a.className}`}>{a.icon}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active App */}
              {activeAppData && (
                <div
                  ref={appScreenRef}
                  className={`app-screen ${activeAppData.theme} ${isClosing ? "closing" : "open"}`}
                  style={{ transform: `translateY(${dragProgress * -40}px)`, opacity: 1 - dragProgress * 0.4 }}
                >
                  <div
                    ref={appBodyRef}
                    className="app-body scrollable"
                    onPointerDown={(e) => {
                      if (e.target.closest(".tic-tac-toe-cell") || e.target.closest(".tic-tac-toe-button")) return;
                      onPointerDown(e);
                    }}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                  >
                    {activeAppData.component}
                  </div>
                  <div className="gesture-hitbox" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
                    <div className="gesture-bar" />
                  </div>
                </div>
              )}
            </div>

            {/* Notch / Camera / Island */}
            <div className="notch-elements">
              <div className="earpiece" />
              <div className="cam-dot small" />
            </div>
            <div className="dynamic-island" />
          </div>
        </div>

        {/* Cards column */}
        <div className="apps-cards">
          {[
            { key: "Kamel", iconType: "verified" },
            { key: "Cura",  iconType: "pending"  },
            { key: "Monexa", iconType: "verified" },
            { key: "Stoxly", iconType: "pending" },
            { key: "TicTacToe", iconType: "verified" },
          ].map((info) => {
            const app = apps.find(a => a.key === info.key);
            return (
              <div key={app.key} className="app-card" onClick={() => setShakeApp(app.key)}>
                <div className="card-badge">
                  {info.iconType === "verified"
                    ? <FaCheckCircle className="badge-icon verified" />
                    : <FaHourglassHalf className="badge-icon" />}
                </div>
                <div className="app-card-icon">{app.icon}</div>
                <div className="app-card-name">{app.name}</div>
                <div className="app-card-desc">{t(`appsDesc.${app.key.toLowerCase()}`)}</div>
                {app.key === "Kamel" && (
                  <a href="https://kamel-system.com/" target="_blank" rel="noopener noreferrer" className="app-card-button">
                    {t("visit")}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default IphoneMockup;

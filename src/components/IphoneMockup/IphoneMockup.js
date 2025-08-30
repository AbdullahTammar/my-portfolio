import React, { useState, useRef, useCallback, useEffect } from "react";
import "./IphoneMockup.css";
import Kamel from "../../pages/Kamel";
import DoctorAppointments from "../../pages/DoctorAppointments";
import Monexa from "../../pages/Monexa";
import Stoxly from "../../pages/Stoxly";
import TicTacToe from "../../pages/TicTacToe";
import { FaChartLine, FaGamepad , FaHourglassHalf, FaCheckCircle} from "react-icons/fa";
import { motion } from "framer-motion";

/* Icons */
import { FaPhoneAlt, FaSafari, FaMusic } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
import { FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function IphoneMockup() {
  const { t } = useTranslation("iphone");
  const [activeApp, setActiveApp] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [shakeApp, setShakeApp] = useState(null); // ✅ اهتزاز الأيقونة

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

  // ✅ الساعة والتاريخ بتوقيت الرياض
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Riyadh",
      };
      setCurrentTime(new Intl.DateTimeFormat("en-GB", timeOptions).format(now));

      const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Riyadh",
      };
      setTodayDate(new Intl.DateTimeFormat("en-US", dateOptions).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const onPointerDown = useCallback((e) => {
    if (!appBodyRef.current || !appScreenRef.current) return;
    const body = appBodyRef.current;
    const screenRect = appScreenRef.current.getBoundingClientRect();

    body.setPointerCapture?.(e.pointerId);
    const fromGestureZone = e.clientY >= screenRect.bottom - 28;

    dragState.current = {
      dragging: true,
      startY: e.clientY,
      startX: e.clientX,
      startScrollTop: body.scrollTop,
      fromGestureZone,
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

      if (dy > 90 && absX < 60) {
        dragState.current.shouldClose = true;
      } else {
        dragState.current.shouldClose = false;
      }
    }
  }, []);

  const onPointerUp = useCallback(
    (e) => {
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
    },
    [isClosing]
  );

  const apps = [
    {
      name: t("apps.kamel"),
      key: "Kamel",
      className: "icon--kamel",
      theme: "light",
      component: <Kamel />,
      icon: (
        <img
          src="/assets/kamelAppSmallLogo.png"
          alt="Kamel"
          style={{ width: "100%", height: "100%", borderRadius: "18px", objectFit: "cover" }}
        />
      ),
    },
    {
      name: t("apps.cura"),
      key: "Cura",
      className: "icon--cura",
      theme: "light",
      component: <DoctorAppointments />,
      icon: (
        <img
          src="/assets/DoctorAppLogo.png"
          alt="Cura"
          style={{ width: "100%", height: "100%", borderRadius: "18px", objectFit: "cover" }}
        />
      ),
    },
    {
      name: t("apps.monexa"),
      key: "Monexa",
      className: "icon--monexa",
      theme: "dark",
      component: <Monexa />,
      icon: (
        <img
          src="/assets/monexaAppLogo.png"
          alt="Monexa"
          style={{ width: "100%", height: "100%", borderRadius: "18px", objectFit: "cover" }}
        />
      ),
    },
    {
      name: t("apps.stoxly"),
      key: "Stoxly",
      className: "icon--stoxly",
      theme: "dark",
      component: <Stoxly />,
      icon: (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "18px",
            background: "linear-gradient(135deg,#2c3e50,#000)",
          }}
        >
          <FaChartLine size={28} color="#4fc3f7" />
        </div>
      ),
    },
    {
      name: t("apps.tictactoe"),
      key: "TicTacToe",
      className: "icon--game",
      theme: "dark",
      component: <TicTacToe />,
      icon: (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "18px",
            background: "linear-gradient(160deg,#0f172a,#1e293b)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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

  // ✅ تفعيل الاهتزاز عند اختيار كرت
  const triggerShake = (key) => {
    setShakeApp(key);
    setTimeout(() => setShakeApp(null), 800);
  };
  return (
    <div className="w-full">
      {/* ✅ الصفحة: الايفون + الكروت */}
      <div className="iphone16-page">
        {/* ✅ الايفون */}
        <div className="iphone16-wrapper">
          <div className="iphone16-device">
            {/* أزرار */}
            <div className="sidebtn right power" aria-hidden="true" />
            <div className="sidebtn right camera" aria-label="Camera Control" />
            <div className="sidebtn left volup" aria-hidden="true" />
            <div className="sidebtn left voldown" aria-hidden="true" />
  
            {/* الشاشة */}
            <div
              className={`iphone16-screen ${activeAppData ? activeAppData.theme : "home"}`}
              style={{ background: "url('/assets/iphoneScreenBg.jpg') center/cover no-repeat" }}
            >
              <div className="statusbar">
                <div className="status-left">{currentTime}</div>
                <div className="status-right">
                  <div className="signal-bars">
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar3"></span>
                  </div>
                  <span className="battery" />
                </div>
              </div>
  
              {/* Widgets */}
              {!activeApp && (
                <div className="widgets">
                  <div className="widget">
                    <span className="widget-icon"><WiDaySunny /></span>
                    28°C Sunny
                  </div>
                  <div className="widget">
                    <span className="widget-icon"><FaCalendarAlt /></span>
                    {todayDate}
                  </div>
                </div>
              )}
  
              {/* Home */}
              {!activeApp && (
                <div className="home-layer">
                  <div className="icons-grid">
                    {apps.map((a, i) => (
                      <div
                        key={i}
                        className={`icon-wrap ${shakeApp === a.key ? "shake" : ""}`}
                        onClick={() => setActiveApp(a.key)}
                      >
                        <div className={`icon ${a.className}`}>{a.icon}</div>
                        <div className="icon-label">{a.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="dock">
                    {dock.map((a, i) => (
                      <div key={i} className={`icon ${a.className}`}>
                        {a.icon}
                      </div>
                    ))}
                  </div>
                </div>
              )}
  
              {/* Active App */}
              {activeAppData && (
                <div
                  ref={appScreenRef}
                  className={`app-screen ${activeAppData.theme} ${isClosing ? "closing" : "open"}`}
                  style={{
                    transform: `translateY(${dragProgress * -40}px)`,
                    opacity: 1 - dragProgress * 0.4,
                  }}
                >
                  <div
                    ref={appBodyRef}
                    className="app-body scrollable"
                    onPointerDown={(e) => {
                      if (
                        e.target.closest(".tic-tac-toe-cell") ||
                        e.target.closest(".tic-tac-toe-button")
                      ) {
                        return;
                      }
                      onPointerDown(e);
                    }}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                  >
                    {activeAppData.component}
                  </div>
  
                  <div
                    className="gesture-hitbox"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                  >
                    <div className="gesture-bar" />
                  </div>
                </div>
              )}
            </div>
  
            {/* سماعة + كاميرا + Dynamic Island */}
            <div className="notch-elements">
              <div className="earpiece" />
              <div className="cam-dot small" />
            </div>
            <div className="dynamic-island" />
          </div>
        </div>
  
        {/* ✅ العنوان فوق الكروت */}
        <div className="w-full">
          <div className="w-full text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-extrabold text-white"
            >
              {t("title")}
            </motion.h2>
            <div className="h-[3px] w-24 mx-auto mt-3 rounded-full 
                            bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 
                            shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
  
          {/* ✅ الكروت */}
          <div className="apps-cards">
  {apps.map((app, i) => (
    <div
      key={i}
      className="app-card"
      onClick={() => triggerShake(app.key)}
    >
      {/* ✅ الأيقونة في الزاوية */}
      <div className="card-badge">
  {["Kamel", "Monexa", "TicTacToe"].includes(app.key) ? (
    <FaCheckCircle className="badge-icon verified" />
  ) : (
    <FaHourglassHalf className="badge-icon" />
  )}
</div>


      <div className="app-card-icon">{app.icon}</div>
      <div className="app-card-name">{app.name}</div>
      <div className="app-card-desc">{t(`appsDesc.${app.key.toLowerCase()}`)}</div>

      {/* زر "زيارة المنصة" لكامل فقط */}
      {app.key === "Kamel" && (
        <a
          href="https://oracleapex.com/ords/r/helptest/kamel/home?"
          target="_blank"
          rel="noopener noreferrer"
          className="app-card-button"
        >
          {t("visit")}
        </a>
      )}
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
  
  
}

export default IphoneMockup;

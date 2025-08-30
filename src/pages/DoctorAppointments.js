import React from "react";
import { useTranslation } from "react-i18next";
import {
  FiUser,
  FiMapPin,
  FiHeart,
  FiEye,
  FiSmile,
  FiActivity,
  FiAlertTriangle,
} from "react-icons/fi";

function DoctorAppointments() {
  const { t, i18n } = useTranslation("cura");
  const isArabic = i18n.language === "ar";

  const specialties = [
    {
      label: t("cardiology"),
      icon: <FiHeart />,
      color: "linear-gradient(135deg,#ff6b6b,#f6416c)", // أحمر
    },
    {
      label: t("ophthalmology"),
      icon: <FiEye />,
      color: "linear-gradient(135deg,#25bbe0,#26cccd)", // سماوي
    },
    {
      label: t("pediatrics"),
      icon: <FiSmile />,
      color: "linear-gradient(135deg,#fdd819,#e80505)", // أصفر → أحمر
    },
    {
      label: t("general"),
      icon: <FiActivity />,
      color: "linear-gradient(135deg,#38f9d7,#43e97b)", // أخضر سماوي
    },
  ];

  const nearby = t("nearby", { returnObjects: true }) || [];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f5f7fa",
        fontFamily: "system-ui, sans-serif",
        minHeight: "100%",
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      {/* Header */}
{/* Header */}
{/* Header */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 15px",
    background: "#fff",
    borderBottom: "1px solid #eee",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  }}
>
  {/* اللوقو */}
  <img
    src="/assets/doctorAppLogo.png"
    alt="Doctor Logo"
    style={{
      height: 50,
      maxHeight: "50px",
      objectFit: "contain",
    }}
  />

  {/* اسم التطبيق */}
  <div
    style={{
      flex: 1,
      textAlign: "center",
      fontSize: 20,
      fontWeight: 800,
      background: "linear-gradient(90deg,#25bbe0,#26cccd,#2f9cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "black",
      letterSpacing: "1px",
      textShadow: "0 2px 6px rgba(18, 27, 94, 0.1)",
    }}
  >
    Cura
  </div>

  {/* أيقونة المستخدم */}
  <FiUser
    size={28}
    color="#25bbe0"
    style={{
      marginLeft: 10,
      flexShrink: 0,
    }}
  />
</div>



      {/* Content */}
      <div style={{ padding: "20px" }}>
        {/* Specialties */}
        <h4
          style={{
            fontSize: 15,
            marginBottom: 12,
            color: "#333",
            fontWeight: 600,
          }}
        >
          {t("chooseSpecialty")}
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 22,
          }}
        >
          {specialties.map((s, i) => (
            <div
              key={i}
              style={{
                borderRadius: 18,
                padding: "20px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: s.color,
                color: "#fff",
                fontWeight: 600,
                boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                transition: "transform 0.2s ease",
                cursor: "pointer",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>

{/* Nearby */}
<h4
  style={{
    fontSize: 15,
    marginBottom: 12,
    color: "#333",
    fontWeight: 600,
  }}
>
  {t("nearbyPlaces")}
</h4>
<div
  style={{
    background: "#fff",
    borderRadius: 16,
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: 20,
  }}
>
  {nearby.map((n, i) => (
    <div
      key={i}
      style={{
        padding: "14px 0",
        borderBottom: i < nearby.length - 1 ? "1px solid #eee" : "none",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* أيقونة داخل دائرة */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(37,187,224,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FiMapPin size={18} color="#25bbe0" />
      </div>

      {/* النصوص */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#111" }}>
          {n.name}
        </span>
        <span style={{ fontSize: 13, color: "#555" }}>{n.type}</span>
      </div>
    </div>
  ))}
</div>


        {/* Emergency */}
        <button
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: 14,
            background: "linear-gradient(135deg,#ff6b6b,#f6416c)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <FiAlertTriangle size={18} />
          {t("emergency")}
        </button>
      </div>
    </div>
  );
}

export default DoctorAppointments;

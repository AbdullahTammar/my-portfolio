import React from "react";
import { useTranslation } from "react-i18next";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

function Stoxly() {
  const { i18n } = useTranslation("stoxly");
  const isArabic = i18n.language === "ar";

  const colorUp = "#28cf66";
  const colorDown = "#ff5b6e";

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0f1117",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #222",
          fontSize: 18,
          fontWeight: 800,
          color: "#4fc3f7",
        }}
      >
        {isArabic ? "ستوكلي" : "Stoxly"}
      </div>

      {/* Widgets */}
      <div style={{ padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <Widget title={isArabic ? "قيمة المحفظة" : "Market Value"} value="SAR 78,420" />
        <Widget title={isArabic ? "ربح اليوم" : "Day P/L"} value="+ SAR 1,240" color={colorUp} />
        <Widget title={isArabic ? "عدد الصفقات" : "Trades"} value="29,220" />
      </div>

      {/* Holdings */}
      <Section title={isArabic ? "ممتلكاتك" : "Your Holdings"}>
        <Holding
          symbol="2222.SR"
          name={isArabic ? "أرامكو" : "Aramco"}
          price="SAR 31.20"
          change="+1.8%"
          dir="up"
          colorUp={colorUp}
          colorDown={colorDown}
        />
        <Holding
          symbol="1120.SR"
          name={isArabic ? "الراجحي" : "Al Rajhi"}
          price="SAR 84.70"
          change="-0.9%"
          dir="down"
          colorUp={colorUp}
          colorDown={colorDown}
        />
      </Section>

      {/* Suggestions */}
      <Section title={isArabic ? "اقتراحات لك" : "Suggestions"}>
        <div style={{ display: "flex", gap: 8 }}>
          <InteractiveCard label={isArabic ? "الطاقة" : "Energy"} value="+2.3%" dir="up" />
          <InteractiveCard label={isArabic ? "البنوك" : "Banks"} value="-1.1%" dir="down" />
        </div>
      </Section>

      {/* ✅ New Section: Market Highlights */}
      <Section title={isArabic ? "مؤشرات السوق" : "Market Highlights"}>
        <div style={{ display: "flex", gap: 8 }}>
          <InteractiveCard label={isArabic ? "تاسي" : "TASI"} value="+0.7%" dir="up" />
          <InteractiveCard label={isArabic ? "نمو" : "Nomu"} value="+1.2%" dir="up" />
        </div>
      </Section>
    </div>
  );
}

/* Components */
const Widget = ({ title, value, color }) => (
  <div
    style={{
      background: "#1c1f2e",
      borderRadius: 12,
      padding: 10,
      textAlign: "center",
      transition: "transform 0.2s",
    }}
  >
    <div style={{ fontSize: 11, opacity: 0.8 }}>{title}</div>
    <div style={{ fontSize: 14, fontWeight: 800, color: color || "#fff" }}>{value}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ padding: "0 14px 10px" }}>
    <div style={{ fontSize: 13, marginBottom: 6, opacity: 0.9 }}>{title}</div>
    {children}
  </div>
);

const Holding = ({ symbol, name, price, change, dir, colorUp, colorDown }) => (
  <div
    style={{
      background: "#1c1f2e",
      borderRadius: 12,
      padding: 10,
      marginBottom: 8,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <div style={{ fontWeight: 800, fontSize: 12 }}>{symbol}</div>
      <div style={{ fontSize: 11, opacity: 0.8 }}>{name}</div>
    </div>
    <div style={{ textAlign: "end" }}>
      <div style={{ fontSize: 12, fontWeight: 700 }}>{price}</div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginTop: 2,
          fontSize: 11,
          color: dir === "up" ? colorUp : colorDown,
        }}
      >
        {dir === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
        <span>{change}</span>
      </div>
    </div>
  </div>
);

const InteractiveCard = ({ label, value, dir }) => (
  <div
    style={{
      flex: 1,
      background: "#1c1f2e",
      borderRadius: 12,
      padding: 14,
      textAlign: "center",
      color: dir === "up" ? "#28cf66" : "#ff5b6e",
      fontWeight: 700,
      fontSize: 13,
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
    }}
    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6, color: "#fff" }}>{label}</div>
    {value}
  </div>
);

export default Stoxly;

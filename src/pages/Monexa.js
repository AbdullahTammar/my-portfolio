import React from "react";
import { useTranslation } from "react-i18next";
import {
  FiCreditCard,
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiShoppingBag,
  FiTruck,
  FiCoffee,
  FiZap,
  FiUser,
} from "react-icons/fi";

function Monexa() {
  const { t } = useTranslation("monexa");

  const summary = [
    {
      label: t("balance"),
      value: "12,500",
      currency: "SAR",
      icon: <FiCreditCard />,
      color: "linear-gradient(135deg,#0bb36d,#008e52)",
    },
    {
      label: t("income"),
      value: "8,000",
      currency: "SAR",
      icon: <FiArrowDownCircle />,
      color: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    },
    {
      label: t("expenses"),
      value: "5,500",
      currency: "SAR",
      icon: <FiArrowUpCircle />,
      color: "linear-gradient(135deg,#ef4444,#b91c1c)",
    },
  ];

  const categories = [
    {
      label: t("food"),
      icon: <FiCoffee />,
      color: "linear-gradient(135deg,#f093fb,#f5576c)",
    },
    {
      label: t("transport"),
      icon: <FiTruck />,
      color: "linear-gradient(135deg,#26cccd,#0bb36d)",
    },
    {
      label: t("shopping"),
      icon: <FiShoppingBag />,
      color: "linear-gradient(135deg,#25bbe0,#2563eb)",
    },
    {
      label: t("bills"),
      icon: <FiZap />,
      color: "linear-gradient(135deg,#ff9a9e,#f6416c)",
    },
  ];

  const transactions = [
    { title: "Starbucks", date: "2025-08-25", amount: "- 25 SAR" },
    { title: "Salary", date: "2025-08-24", amount: "+ 8000 SAR" },
    { title: "Electricity Bill", date: "2025-08-20", amount: "- 350 SAR" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#0f1117", // ✅ خلفية دارك
        minHeight: "100%",
        fontFamily: "system-ui, sans-serif",
        color: "#fff",
      }}
    >
{/* Header */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 22px",
    background: "#1c1f2e",
    borderBottom: "1px solid #2a2d3a",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  }}
>
  {/* ✅ اللوقو بشكل مودرن */}
  <div
    style={{
      width: 46,
      height: 46,
      borderRadius: 14, // 🔥 زوايا ناعمة بدل مربع
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg,#2563eb,#1d4ed8)", // خلفية مودرن لو اللوقو شفاف
    }}
  >
    <img
      src="/assets/monexaAppLogo.png"
      alt="Monexa Logo"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </div>

  {/* اسم التطبيق في النص */}
  <div
    style={{
      flex: 1,
      textAlign: "center",
      fontSize: 20,
      fontWeight: 800,
      background: "linear-gradient(90deg,#25bbe0,#26cccd,#2f9cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "1px",
      textShadow: "0 2px 6px rgba(0,0,0,0.15)",
    }}
  >
    Monexa
  </div>

  {/* أيقونة المستخدم */}
  <div
    style={{
      background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
      borderRadius: "50%",
      width: 38,
      height: 38,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    }}
  >
    <FiUser size={20} color="#fff" />
  </div>
</div>


      {/* Content */}
      <div style={{ padding: "20px" }}>
        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {summary.map((s, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                padding: "18px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 8,
                background: s.color,
                color: "#fff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                minHeight: 100,
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {s.icon}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  opacity: 0.9,
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h4
          style={{
            fontSize: 16,
            marginBottom: 12,
            fontWeight: 600,
            color: "#e5e7eb",
          }}
        >
          {t("categories")}
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {categories.map((c, i) => (
            <div
              key={i}
              style={{
                borderRadius: 14,
                padding: "18px 14px",
                background: c.color,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ fontSize: 24 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div
          style={{
            background: "#1c1f2e",
            borderRadius: 16,
            padding: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <h4
            style={{
              fontSize: 16,
              marginBottom: 12,
              fontWeight: 600,
              color: "#e5e7eb",
            }}
          >
            {t("transactions")}
          </h4>
          {transactions.map((tx, i) => (
            <div
              key={i}
              style={{
                padding: "12px 0",
                borderBottom:
                  i < transactions.length - 1 ? "1px solid #2a2d3a" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#fff",
                  }}
                >
                  {tx.title}
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{tx.date}</div>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: tx.amount.startsWith("+") ? "#22c55e" : "#ef4444",
                }}
              >
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Monexa;

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  FaUsers,
  FaPlaneArrival,
  FaPlaneDeparture,
} from "react-icons/fa";
import {
  MdToday,
  MdOutlineEventAvailable,
  MdLocalHospital,
  MdOutlineDangerous,
  MdLocationOn,
  MdDirectionsBus,
  MdVolunteerActivism,
} from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

function Kamel() {
  const summary = [
    { label: "Total Pilgrims", value: 2000000, icon: <FaUsers />, color: "linear-gradient(135deg,#4facfe,#00f2fe)" },
    { label: "Arrived", value: 1500000, icon: <FaPlaneArrival />, color: "linear-gradient(135deg,#43e97b,#38f9d7)" },
    { label: "Departed", value: 400000, icon: <FaPlaneDeparture />, color: "linear-gradient(135deg,#fa709a,#fee140)" },
    { label: "Arrived Today", value: 20000, icon: <MdToday />, color: "linear-gradient(135deg,#30cfd0,#330867)" },
    { label: "Expected Today", value: 25000, icon: <MdOutlineEventAvailable />, color: "linear-gradient(135deg,#667eea,#764ba2)" },
    { label: "Patients", value: 1200, icon: <MdLocalHospital />, color: "linear-gradient(135deg,#f093fb,#f5576c)" },
    { label: "Deaths", value: 15, icon: <MdOutlineDangerous />, color: "linear-gradient(135deg,#ff6a00,#ee0979)" },
    { label: "Centers", value: 4, icon: <MdLocationOn />, color: "linear-gradient(135deg,#00c6ff,#0072ff)" },
  ];

  const serviceData = [
    { name: "Center 1", pilgrims: 500000, color: "#25bbe0" },
    { name: "Center 2", pilgrims: 400000, color: "#26cccd" },
    { name: "Center 3", pilgrims: 300000, color: "#2af39e" },
    { name: "Center 4", pilgrims: 300000, color: "#43e97b" },
  ];

  const extraStats = [
    { label: "Flights Today", value: 120, icon: <FaPlaneArrival />, color: "#25bbe0" },
    { label: "Buses Active", value: 450, icon: <MdDirectionsBus />, color: "#26cccd" },
    { label: "Volunteers", value: 3200, icon: <MdVolunteerActivism />, color: "#2af39e" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f5f7fa",
        fontFamily: "system-ui, sans-serif",
        minHeight: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          background: "#fff",
          borderBottom: "1px solid #eee",
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
        }}
      >
        <img
          src="/assets/kamelAppLogo.png"
          alt="Kamel Logo"
          style={{ height: 46, objectFit: "contain" }}
        />
        <FiExternalLink
          size={24}
          color="#25bbe0"
          style={{
            cursor: "pointer",
            padding: 6,
            borderRadius: "50%",
            background: "rgba(37,187,224,0.1)",
          }}
        />
      </div>

      {/* ✅ Summary Cards (صغار + بالنص) */}
      <div
        style={{
          width: "100%",
          maxWidth: 540,
          margin: "20px auto",
          padding: "0 16px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 14,
        }}
      >
        {summary.map((s, i) => (
          <div
            key={i}
            style={{
              borderRadius: 12,
              padding: "10px",
              background: s.color,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.25)",
                borderRadius: "50%",
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              {s.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>
                {s.value.toLocaleString()}
              </div>
              <div style={{ fontSize: 11, opacity: 0.9 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "16px 14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          margin: "20px auto",
          maxWidth: 620,
          width: "100%",
        }}
      >
        <h4
          style={{
            fontSize: 14,
            marginBottom: 12,
            color: "#333",
            fontWeight: 600,
          }}
        >
          Service Centers
        </h4>
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Bar dataKey="pilgrims" radius={[6, 6, 0, 0]} barSize={18}>
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Extra Stats (زي ماكان) */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "16px 14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          margin: "20px auto",
          maxWidth: 620,
          width: "100%",
        }}
      >
        <h4
          style={{
            fontSize: 14,
            marginBottom: 12,
            color: "#333",
            fontWeight: 600,
          }}
        >
          Daily Operations
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {extraStats.map((s, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: s.color,
                color: "#fff",
                fontWeight: 600,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 16 }}>{s.value}</div>
              <div style={{ fontSize: 11, opacity: 0.9 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}

export default Kamel;

import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const STATES = {
  NORMAL: "normal",
  MINIMIZED: "minimized",
  MAXIMIZED: "maximized",
  COLLAPSED: "collapsed",
};

/** توزيع مرتب + عشوائية خفيفة */
function getBasePosition(index) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const baseTop = 12 + row * 26;
  const baseLeft = 10 + col * 28;

  return {
    top: baseTop + (Math.random() * 2 - 1), // ±1%
    left: baseLeft + (Math.random() * 2 - 1), // ±1%
    rotate: (Math.random() - 0.5) * 1, // ±1°
  };
}

function WindowCard({
  title,
  description,
  index,
  state,
  onAction,
  style,
  isFocused,
  setFocus,
  dragConstraints,
  setDragging,
}) {
  const baseClasses =
    "absolute bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg shadow-lg overflow-hidden";

  let sizeClasses = "w-[300px] md:w-[340px] h-auto"; // NORMAL
  if (state === STATES.MAXIMIZED) sizeClasses = "w-auto max-w-2xl h-auto";
  if (state === STATES.MINIMIZED) sizeClasses = "w-[220px] h-[110px] cursor-pointer";
  if (state === STATES.COLLAPSED) sizeClasses = "w-[240px] h-[45px]";

  const zClass = isFocused ? "z-50" : "z-20";
  const dimmed = !isFocused ? "opacity-50" : "opacity-100";

  return (
    <motion.div
      drag={state === STATES.NORMAL}
      dragConstraints={dragConstraints}
      dragElastic={0.25}
      dragMomentum={true} // ✅ يخليها تكمل حركة خفيفة
      whileDrag={{ scale: 1.01, boxShadow: "0 6px 18px rgba(0,0,0,0.2)" }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }} // ✅ أسرع + أنعم
      className={`${baseClasses} ${sizeClasses} ${zClass} ${dimmed}`}
      style={style}
      onClick={() => {
        setFocus(index);
        if (state === STATES.MINIMIZED) onAction(index, STATES.NORMAL);
      }}
    >
      {/* شريط علوي */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border-b border-slate-700 cursor-move"
        onMouseDown={() => setFocus(index)}
      >
        {/* 🔴 Collapse */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAction(index, STATES.COLLAPSED);
          }}
          disabled={state === STATES.COLLAPSED}
          className="w-3.5 h-3.5 flex items-center justify-center text-black rounded-full 
                     bg-red-500 hover:bg-red-600 disabled:opacity-60"
        >
          <FiX size={10} />
        </button>

        {/* 🟡 Minimize */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (state !== STATES.MINIMIZED) onAction(index, STATES.MINIMIZED);
          }}
          disabled={state === STATES.MINIMIZED}
          className="w-3.5 h-3.5 flex items-center justify-center text-black rounded-full 
                     bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60"
        >
          <FiMinimize2 size={10} />
        </button>

        {/* 🟢 Maximize */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (state !== STATES.MAXIMIZED) onAction(index, STATES.MAXIMIZED);
          }}
          disabled={state === STATES.MAXIMIZED}
          className="w-3.5 h-3.5 flex items-center justify-center rounded-full 
                     bg-green-500 hover:bg-green-600 text-black disabled:opacity-60"
        >
          <FiMaximize2 className="w-2.5 h-2.5" />
        </button>

        {/* العنوان */}
        {state === STATES.COLLAPSED ? (
          <div
            className="ml-4 text-sm text-slate-200 font-bold truncate cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onAction(index, STATES.NORMAL);
            }}
          >
            {title}
          </div>
        ) : (
          <div className="ml-4 text-xs text-slate-300 truncate">{title}</div>
        )}
      </div>

      {/* المحتوى */}
      {state === STATES.COLLAPSED ? null : state === STATES.MINIMIZED ? (
        <div className="p-3">
          <h3 className="text-sm font-bold text-white truncate">{title}</h3>
          <p className="text-slate-400 text-xs mt-1 truncate">
            {description.slice(0, 48)}…
          </p>
        </div>
      ) : (
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-300 text-sm">{description}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation("projects");
  const projects = t("list", { returnObjects: true }) || [];

  const containerRef = useRef(null);

  const [windowStates, setWindowStates] = useState(
    projects.map(() => STATES.NORMAL)
  );
  const [focus, setFocus] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleAction = (i, newState) => {
    setWindowStates((prev) =>
      prev.map((s, idx) => (idx === i ? newState : s))
    );
    setFocus(i);
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full h-[calc(100vh-100px)] overflow-hidden"
    >
      {/* ✨ حدود تظهر فقط عند السحب */}
      {dragging && (
        <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/70 shadow-[0_0_25px_rgba(34,211,238,0.6)] pointer-events-none" />
      )}

      <h2 className="text-3xl font-extrabold text-center mb-10 relative z-50">
        {t("title")}
      </h2>

      {projects.map((p, i) => {
        const { top, left, rotate } = getBasePosition(i);
        return (
          <WindowCard
            key={i}
            index={i}
            title={p.title}
            description={p.description}
            state={windowStates[i]}
            onAction={handleAction}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              transform: `rotate(${rotate}deg)`,
            }}
            isFocused={focus === i}
            setFocus={setFocus}
            dragConstraints={containerRef}
            setDragging={setDragging}
          />
        );
      })}
    </section>
  );
}

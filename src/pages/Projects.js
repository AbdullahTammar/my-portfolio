import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMaximize2, FiMinimize2, FiX } from "react-icons/fi";

const STATES = {
  NORMAL: "normal",
  MINIMIZED: "minimized",
  MAXIMIZED: "maximized",
  COLLAPSED: "collapsed",
};

function getBasePosition(index) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const baseTop = 20 + row * 26;
  const baseLeft = 10 + col * 28;
  return {
    top: baseTop + (Math.random() * 2 - 1),
    left: baseLeft + (Math.random() * 2 - 1),
    rotate: (Math.random() - 0.5) * 1,
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
  isMobile,
}) {
  const baseClasses =
    "bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg shadow-lg overflow-hidden";

  let sizeClasses = "w-[300px] md:w-[340px] h-auto";
  if (state === STATES.MAXIMIZED)
    sizeClasses = isMobile ? "w-full h-auto" : "w-auto max-w-2xl h-auto";
  if (state === STATES.MINIMIZED) sizeClasses = "w-[220px] h-[110px] cursor-pointer";
  if (state === STATES.COLLAPSED) sizeClasses = "w-[240px] h-[45px]";

  const zClass = isFocused ? "z-50" : "z-20";
  const dimmed = !isFocused && !isMobile ? "opacity-50" : "opacity-100";

  return (
    <motion.div
      drag={!isMobile && state === STATES.NORMAL}
      dragConstraints={dragConstraints}
      dragElastic={0.25}
      dragMomentum={true}
      whileDrag={{ scale: 1.01, boxShadow: "0 6px 18px rgba(0,0,0,0.2)" }}
      onDragStart={() => !isMobile && setDragging(true)}
      onDragEnd={() => !isMobile && setDragging(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`${baseClasses} ${sizeClasses} ${
        isMobile ? "relative mx-auto mb-6" : "absolute"
      } ${zClass} ${dimmed}`}
      style={style}
      onClick={() => {
        setFocus(index);
        if (!isMobile && state === STATES.MINIMIZED) onAction(index, STATES.NORMAL);
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border-b border-slate-700 cursor-move"
        onMouseDown={() => setFocus(index)}
      >
        {/* Red button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isMobile) {
              onAction(index, "backToList");
            } else {
              onAction(index, STATES.COLLAPSED);
            }
          }}
          className="w-3.5 h-3.5 flex items-center justify-center text-black rounded-full bg-red-500 hover:bg-red-600"
        >
          <FiX size={10} />
        </button>

        {/* Yellow minimize (desktop only) */}
        {!isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (state !== STATES.MINIMIZED) onAction(index, STATES.MINIMIZED);
            }}
            disabled={state === STATES.MINIMIZED}
            className="w-3.5 h-3.5 flex items-center justify-center text-black rounded-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60"
          >
            <FiMinimize2 size={10} />
          </button>
        )}

        {/* Green maximize */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (state !== STATES.MAXIMIZED) onAction(index, STATES.MAXIMIZED, isMobile);
          }}
          disabled={state === STATES.MAXIMIZED}
          className="w-3.5 h-3.5 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-black disabled:opacity-60"
        >
          <FiMaximize2 className="w-2.5 h-2.5" />
        </button>

        <div className="ml-4 text-xs text-slate-300 truncate">{title}</div>
      </div>

      {state !== STATES.COLLAPSED && (
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
  const windowsRef = useRef(null);

  const [windowStates, setWindowStates] = useState(
    projects.map(() => STATES.NORMAL)
  );
  const [focus, setFocus] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleAction = (i, newState) => {
    if (isMobile) {
      if (newState === "backToList") {
        setSelectedProject(null);
        return;
      }
      if (newState === STATES.MAXIMIZED) {
        setSelectedProject(i);
        return;
      }
    } else {
      setWindowStates((prev) =>
        prev.map((s, idx) => (idx === i ? newState : s))
      );
      setFocus(i);
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-100px)] overflow-hidden px-4"
    >
      <h2 className="text-3xl font-extrabold text-center mb-4 relative z-50">
        {t("title")}
      </h2>
      <div className="h-[3px] w-24 mx-auto mb-10 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow" />

      {/* Desktop */}
      <div className="hidden lg:block relative w-full h-[calc(100vh-180px)]">
        {dragging && (
          <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/70 shadow pointer-events-none" />
        )}
        <div ref={windowsRef} className="absolute inset-x-0 top-[60px] bottom-0">
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
                dragConstraints={windowsRef}
                setDragging={setDragging}
                isMobile={false}
              />
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="block lg:hidden">
        {selectedProject === null ? (
          <div className="space-y-4">
            {projects.map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-700 shadow cursor-pointer"
                onClick={() => handleAction(i, STATES.MAXIMIZED)}
              >
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-slate-400 text-sm truncate">{p.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <WindowCard
            index={selectedProject}
            title={projects[selectedProject].title}
            description={projects[selectedProject].description}
            state={STATES.MAXIMIZED}
            onAction={handleAction}
            style={{}}
            isFocused={true}
            setFocus={setFocus}
            dragConstraints={containerRef}
            setDragging={setDragging}
            isMobile={true}
          />
        )}
      </div>
    </section>
  );
}

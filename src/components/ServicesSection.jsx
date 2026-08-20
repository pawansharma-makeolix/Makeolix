import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import LinkRenderer from "./LinkRenderer";

// ─── CSS Variables ────────────────────────────────────────────────────────────
const STYLE = `
  :root {
    --bg-main: #020d14;
    --bg-soft: #071825;
    --blue-1: #003863;
    --blue-2: #00509d;
    --blue-3: #118ab2;
    --accent-pink: #ff8fab;
    --text-muted: #8ba4b8;
  }
  /* navbar height offset — change this value to match your navbar height */
  .services-section {
    padding-top: env(safe-area-inset-top, 0px);
  }
`;

// ─── Network Visual ───────────────────────────────────────────────────────────


// ─── Progress Dots ────────────────────────────────────────────────────────────
function ProgressDots({ total, active, onGo }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onGo(i)}
          className="rounded-full"
          style={{
            width: 3,
            background: i === active ? "var(--blue-3)" : "rgba(255,255,255,0.12)",
            cursor: "pointer",
            border: "none",
            padding: 0,
          }}
          animate={{ height: i === active ? 28 : 8, opacity: i === active ? 1 : 0.4 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

// ─── Slide ────────────────────────────────────────────────────────────────────
function Slide({ service, direction }) {
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, filter: "blur(10px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir) => ({ x: dir > 0 ? "-70%" : "70%", opacity: 0, filter: "blur(8px)", scale: 0.95 }),
  };
  const rightVariants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0, rotateY: dir > 0 ? 20 : -20 }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (dir) => ({ x: dir > 0 ? -70 : 70, opacity: 0, rotateY: dir > 0 ? -12 : 12 }),
  };

  return (
    <div
      className="absolute inset-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
      style={{ padding: "0 clamp(28px, 5vw, 80px)" }}
    >
      {/* Left: text */}
      <motion.div
        className="flex-1 min-w-0 z-10"
        style={{ paddingTop: 8, paddingBottom: 8 }}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="inline-block mb-4 text-xs font-semibold uppercase px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(17,138,178,0.1)",
            color: "var(--blue-3)",
            border: "1px solid rgba(17,138,178,0.28)",
            letterSpacing: "0.15em",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          ✦ <LinkRenderer text={service.tag} />
        </motion.span>

        <motion.h3
          className="leading-tight mb-4"
          style={{
            color: "white",
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
  <LinkRenderer text={service.title} />
        </motion.h3>

        <motion.p
          className="text-sm sm:text-base leading-relaxed mb-8"
          style={{ color: "var(--text-muted)", maxWidth: 460 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
           <LinkRenderer text={service.description} />
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button href={"/contact-us"}>Get Started</Button>
        </motion.div>
      </motion.div>

      {/* Right: visual */}
      <motion.div
        className="relative shrink-0"
        style={{
          width: "clamp(200px, 32vw, 350px)",
          height: "clamp(200px, 32vw, 350px)",
          perspective: 700,
        }}
        custom={direction}
        variants={rightVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
      
        <motion.div
          className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{
            background: "rgba(4,20,32,0.88)",
            border: "1px solid rgba(17,138,178,0.22)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
          }}
          
        >
        <motion.div
          className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{
            background: "rgba(4,20,32,0.88)",
            border: "1px solid rgba(17,138,178,0.22)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
          }}
         
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServicesSection({
  services = [],
  heading = "Our Amazing Services",
  subheading,
  className = "",
  // ✅ FIX 1: navbarHeight prop — apni navbar ki height yahan pass karo (default 72px)
  navbarHeight = 72,
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [locked, setLocked] = useState(false);
  const sectionRef = useRef(null);

  const activeRef = useRef(0);
  const lockedRef = useRef(false);
  const canSlideRef = useRef(true);
  const accDelta = useRef(0);
  const totalRef = useRef(services.length);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { lockedRef.current = locked; }, [locked]);
  useEffect(() => { totalRef.current = services.length; }, [services.length]);

  const goTo = (next) => {
    if (!canSlideRef.current) return;
    canSlideRef.current = false;
    const dir = next > activeRef.current ? 1 : -1;
    setDirection(dir);
    setActive(next);
    activeRef.current = next;
    accDelta.current = 0;
    setTimeout(() => { canSlideRef.current = true; }, 750);
  };

  const releaseLock = () => {
    lockedRef.current = false;
    setLocked(false);
    accDelta.current = 0;
  };

  useEffect(() => {
    const onWheel = (e) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 80);
      accDelta.current += delta;
      if (accDelta.current >= 90) {
        accDelta.current = 0;
        const cur = activeRef.current;
        if (cur < totalRef.current - 1) goTo(cur + 1);
        else releaseLock();
      } else if (accDelta.current <= -90) {
        accDelta.current = 0;
        const cur = activeRef.current;
        if (cur > 0) goTo(cur - 1);
        else releaseLock();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
          accDelta.current = 0;
          lockedRef.current = true;
          setLocked(true);
        } else if (!entry.isIntersecting) {
          lockedRef.current = false;
          setLocked(false);
        }
      },
      { threshold: [0, 0.8] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    if (!lockedRef.current) return;
    const dy = Math.abs(touchStartY.current - e.touches[0].clientY);
    const dx = Math.abs(touchStartX.current - e.touches[0].clientX);
    if (dy > dx) e.preventDefault();
  };
  const onTouchEnd = (e) => {
    if (!lockedRef.current) return;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = Math.abs(touchStartX.current - e.changedTouches[0].clientX);
    if (Math.abs(diffY) < 45 || diffX > Math.abs(diffY)) return;
    const cur = activeRef.current;
    if (diffY > 0 && cur < totalRef.current - 1) goTo(cur + 1);
    else if (diffY < 0 && cur > 0) goTo(cur - 1);
    else releaseLock();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!lockedRef.current) return;
      const cur = activeRef.current;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (cur < totalRef.current - 1) goTo(cur + 1);
        else releaseLock();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (cur > 0) goTo(cur - 1);
        else releaseLock();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      <section
        ref={sectionRef}
        className={`services-section relative ${className}`}
        style={{
          background: "var(--bg-main)",
          // ✅ FIX 2: 100vh - navbar height = actual visible height (no more clipping)
          height: `calc(100vh - -40px)`,
          minHeight: `calc(100vh - 10px)`,
          display: "flex",
          flexDirection: "column",
          // ✅ FIX 3: overflow visible on section itself, clip only on slide area
          overflow: "hidden",
          touchAction: locked ? "none" : "pan-y",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Ambient BG */}
        

        {/* ✅ FIX 4: Header — padding-top reduced, left padding ensured so "S" never clips */}
        <div
          className="relative z-10 shrink-0"
          style={{
            padding: "clamp(20px, 3.5vw, 48px) clamp(48px, 6vw, 96px) 16px",
          }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(17,138,178,0.1)",
                color: "var(--blue-3)",
                border: "1px solid rgba(17,138,178,0.25)",
                letterSpacing: "0.14em",
              }}
            >
              ✦ Our Services
            </span>
          </motion.div>

          <motion.h2
            className="font-black leading-tight max-w-3xl"
            style={{
             
              color: "white",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {heading.split(" ").map((w, i, arr) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.2em]"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={
                  i >= arr.length - 2
                    ? {
                        background: "linear-gradient(135deg,var(--blue-3),var(--accent-pink))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : {}
                }
              >
                {w}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="mt-2 text-sm sm:text-base max-w-2xl"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
<LinkRenderer text={subheading} />
          </motion.p>

          <motion.div
            className="mt-4 h-px max-w-5xl"
            style={{
              background: "linear-gradient(to right,rgba(17,138,178,0.4),rgba(255,143,171,0.2),transparent)",
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* ✅ FIX 5: Slides area — removed pb-32 which was stealing vertical space */}
        <div className="relative flex-1 min-h-0 flex items-center overflow-hidden">
          {/* Progress sidebar */}
          <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
            <ProgressDots total={services.length} active={active} onGo={goTo} />
          </div>

          {/* Counter */}
          <div className="absolute right-5 sm:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-end gap-1">
            <motion.span
              className="font-black"
              style={{
                fontSize: "clamp(32px,4vw,52px)",
                lineHeight: 1,
                color: "rgba(17,138,178,0.1)",
                letterSpacing: "-0.04em",
              }}
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
            <span className="text-xs" style={{ color: "rgba(160,174,192,0.3)" }}>
              / {String(services.length).padStart(2, "0")}
            </span>
          </div>

          {/* Mobile dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden z-20">
            {services.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full"
                style={{
                  height: 4,
                  background: i === active ? "var(--blue-3)" : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                animate={{ width: i === active ? 24 : 8 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence custom={direction} mode="popLayout">
              <Slide key={services[active].id} service={services[active]} direction={direction} />
            </AnimatePresence>
          </div>
        </div>

        {/* Nav arrows */}
        <div className="absolute right-4 sm:right-6 bottom-6 flex gap-3 z-20">
          {[
            { label: "↑", target: active - 1, enabled: active > 0 },
            { label: "↓", target: active + 1, enabled: active < services.length - 1 },
          ].map(({ label, target, enabled }) => (
            <motion.button
              key={label}
              className="rounded-full flex items-center justify-center"
              style={{
                width: 38, height: 38, fontSize: 14,
                background: enabled ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(17,138,178,0.25)",
                color: enabled ? "var(--blue-3)" : "rgba(255,255,255,0.2)",
                cursor: enabled ? "pointer" : "default",
              }}
              onClick={() => enabled && goTo(target)}
              whileHover={enabled ? { scale: 1.1 } : {}}
              whileTap={enabled ? { scale: 0.95 } : {}}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </section>
    </>
  );
}
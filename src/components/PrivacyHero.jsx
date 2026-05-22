"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";

/* ─── Floating Paper ──────────────────────────────────────────────── */
function Paper({ style, lines, stamp, tag, delay, rotateDir = 1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: style.rotate - 6 * rotateDir }}
      animate={{
        opacity: 1,
        y: [0, -12 * rotateDir, 2, 0],
        rotate: [style.rotate, style.rotate + 2 * rotateDir, style.rotate - 0.5, style.rotate],
      }}
      transition={{
        opacity: { duration: 1, delay },
        y: { duration: 6 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 7 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      style={{
        position: "absolute", ...style,
        borderRadius: "4px",
        background: "linear-gradient(160deg, #0c2d3d 0%, #051923 60%, #040f15 100%)",
        border: "1px solid rgba(0,80,157,0.28)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(17,138,178,0.12)",
        padding: "16px 18px 18px",
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <div style={{ width: "3px", height: "28px", borderRadius: "2px", background: "linear-gradient(to bottom, #118ab2, rgba(17,138,178,0.2))", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: "5px", borderRadius: "3px", background: "rgba(17,138,178,0.55)", width: "70%", marginBottom: "5px" }} />
          <div style={{ height: "4px", borderRadius: "3px", background: "rgba(160,174,192,0.15)", width: "45%" }} />
        </div>
        <div style={{ width: "18px", height: "22px", borderRadius: "2px", border: "1px solid rgba(17,138,178,0.25)", background: "rgba(0,56,99,0.3)", flexShrink: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "6px", height: "6px", borderLeft: "1px solid rgba(17,138,178,0.3)", borderBottom: "1px solid rgba(17,138,178,0.3)", background: "#051923" }} />
        </div>
      </div>
      <div style={{ height: "0.5px", background: "rgba(0,80,157,0.2)", marginBottom: "10px" }} />
      {lines.map((w, i) => (
        <div key={i} style={{ marginBottom: "6px", display: "flex", gap: "5px" }}>
          <div style={{ height: "4px", borderRadius: "2px", background: i % 3 === 0 ? "rgba(17,138,178,0.35)" : i % 3 === 1 ? "rgba(160,174,192,0.18)" : "rgba(160,174,192,0.1)", width: `${w}%` }} />
        </div>
      ))}
      {tag && (
        <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 8px", background: "rgba(0,56,99,0.5)", border: "1px solid rgba(17,138,178,0.25)", borderRadius: "100px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#118ab2" }} />
          <span style={{ fontSize: "9px", color: "rgba(17,138,178,0.8)", letterSpacing: "0.08em", fontWeight: 500 }}>{tag}</span>
        </div>
      )}
      {stamp && (
        <div style={{ position: "absolute", bottom: "12px", right: "14px", width: "32px", height: "32px", borderRadius: "50%", border: "1.5px solid rgba(255,143,171,0.35)", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-15deg)" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255,143,171,0.08)", border: "1px solid rgba(255,143,171,0.25)" }} />
        </div>
      )}
    </motion.div>
  );
}

/* ─── Shield ──────────────────────────────────────────────────────── */
function Shield() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}
    >
      {[140, 100, 70].map((size, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.1 + i * 0.05, 1], opacity: [0.15 - i * 0.04, 0.03, 0.15 - i * 0.04] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, rgba(17,138,178,${0.4 - i * 0.1}) 0%, transparent 70%)` }}
        />
      ))}
      <svg width="72" height="82" viewBox="0 0 72 82" fill="none">
        <path d="M36 4L7 16V38C7 56.4 19.8 73.2 36 77C52.2 73.2 65 56.4 65 38V16L36 4Z" fill="rgba(0,56,99,0.45)" stroke="rgba(17,138,178,0.75)" strokeWidth="1.5" />
        <path d="M36 16L18 25V38C18 49.2 26.1 59.4 36 62.2C45.9 59.4 54 49.2 54 38V25L36 16Z" fill="rgba(0,80,157,0.25)" stroke="rgba(17,138,178,0.4)" strokeWidth="1" />
        <motion.path d="M28 40L33.5 45.5L44 34" stroke="#118ab2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }} />
        <circle cx="36" cy="38" r="14" fill="none" stroke="rgba(17,138,178,0.12)" strokeWidth="1" strokeDasharray="3 4" />
      </svg>
    </motion.div>
  );
}

/* ─── Background ──────────────────────────────────────────────────── */
function Background() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="finegrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,80,157,0.07)" strokeWidth="0.5" />
          </pattern>
          <pattern id="coarsegrid" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(0,80,157,0.12)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#finegrid)" />
        <rect width="100%" height="100%" fill="url(#coarsegrid)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(0,56,99,0.3) 0%, rgba(0,23,31,0.0) 70%)" }} />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], x: ["-5%", "5%", "-5%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "38%", left: "-10%", right: "-10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(17,138,178,0.2), rgba(17,138,178,0.08), transparent)" }}
      />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "240px", background: "linear-gradient(to top, var(--bg-main), transparent)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to bottom, var(--bg-main), transparent)" }} />
    </div>
  );
}

/* ─── Particles ──────────────────────────────────────────────────── */
function Particles() {
  const dots = [
    { cx: "15%", cy: "20%", r: 1.5, delay: 0 }, { cx: "82%", cy: "15%", r: 1, delay: 1 },
    { cx: "90%", cy: "60%", r: 1.5, delay: 2 }, { cx: "8%", cy: "72%", r: 1, delay: 0.5 },
    { cx: "50%", cy: "92%", r: 1, delay: 1.5 }, { cx: "68%", cy: "88%", r: 1.5, delay: 0.8 },
    { cx: "25%", cy: "85%", r: 1, delay: 2.2 },
  ];
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {dots.map((d, i) => (
        <motion.circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="rgba(17,138,178,0.6)"
          animate={{ opacity: [0.2, 0.8, 0.2], r: [d.r, d.r * 1.6, d.r] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </svg>
  );
}

/* ─── Corners ────────────────────────────────────────────────────── */
function Corners() {
  const corners = [
    { style: { top: 24, left: 24 } }, { style: { top: 24, right: 24, transform: "scaleX(-1)" } },
    { style: { bottom: 24, left: 24, transform: "scaleY(-1)" } }, { style: { bottom: 24, right: 24, transform: "scale(-1)" } },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <motion.svg key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 + i * 0.08, duration: 0.5 }}
          style={{ position: "absolute", pointerEvents: "none", ...c.style }} width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M2 22 L2 2 L22 2" stroke="rgba(17,138,178,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      ))}
    </>
  );
}



/* ─── MetaItem ───────────────────────────────────────────────────── */
function MetaItem({ label, value, i }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
      <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(160,174,192,0.4)", textTransform: "uppercase", fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(17,138,178,0.85)", letterSpacing: "0.02em" }}>{value}</span>
    </motion.div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────────── */
/**
 * PrivacyHero — Reusable Hero Section
 *
 * Props:
 * @param {string}  badge          - Top pill text          (default: "PRIVACY & DATA PROTECTION")
 * @param {string}  heading        - Main h1 text           (default: "Our Privacy Policy")
 * @param {string}  subtext        - Paragraph below h1     (default: predefined text)
 * @param {Array}   metaItems      - [{label, value}, ...]  (default: 3 items)
 * @param {string}  primaryLabel   - Primary button label   (default: "Read Full Policy")
 * @param {string}  primaryHref    - Primary button href    (default: "#policy")
 * @param {string}  secondaryLabel - Secondary button label (default: "Download PDF")
 * @param {string}  pdfUrl         - PDF file URL for download (default: null)
 * @param {string}  navbarHeight   - CSS value for top padding to clear navbar (default: "80px")
 */
export default function PrivacyHero({
  badge = "PRIVACY & DATA PROTECTION",
  heading = "Our Privacy Policy",
  
 
  primaryLabel = "Read Full Policy",
  primaryHref = "#policy",
  secondaryLabel = "Download PDF",
  pdfUrl = null,
  navbarHeight = "80px",
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const paperScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  // Split heading: first word plain, middle word outlined, rest plain
  const words = heading.split(" ");
  const first = words[0];
  const middle = words.slice(1, -1).join(" ");
  const last = words[words.length - 1];

  const papers = [
    { style: { width: "clamp(150px, 18vw, 210px)", top: "6%", left: "1.5%", rotate: -9 }, lines: [70, 90, 55, 80, 40, 65, 85], tag: null, stamp: false, delay: 0.25, rotateDir: 1 },
    { style: { width: "clamp(120px, 14vw, 165px)", top: "45%", left: "0.5%", rotate: 6 }, lines: [85, 50, 75, 90, 35, 60], tag: null, stamp: true, delay: 0.45, rotateDir: -1 },
    { style: { width: "clamp(100px, 12vw, 145px)", top: "70%", left: "5%", rotate: -4 }, lines: [55, 80, 45, 70, 90], tag: null, stamp: false, delay: 0.65, rotateDir: 1 },
    { style: { width: "clamp(150px, 18vw, 215px)", top: "4%", right: "1.5%", rotate: 8 }, lines: [80, 55, 90, 65, 45, 80], tag: null, stamp: true, delay: 0.35, rotateDir: -1 },
    { style: { width: "clamp(120px, 15vw, 175px)", top: "42%", right: "0.5%", rotate: -7 }, lines: [65, 90, 35, 80, 50, 70, 45], tag: null, stamp: false, delay: 0.55, rotateDir: 1 },
    { style: { width: "clamp(105px, 13vw, 155px)", top: "68%", right: "4%", rotate: 5 }, lines: [90, 60, 75, 40, 85], tag: null, stamp: false, delay: 0.75, rotateDir: -1 },
  ];

  const tv = {
    hidden: { opacity: 0, y: 28 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.7 + i * 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] } }),
  };

  // PDF download handler
  const handlePdfDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = pdfUrl.split("/").pop() || "document.pdf";
    a.click();
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "var(--bg-main)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        // top padding = navbarHeight + extra breathing room, bottom = generous
        paddingTop: `calc(${navbarHeight} + clamp(60px, 8vw, 100px))`,
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "clamp(20px, 6vw, 48px)",
        paddingRight: "clamp(20px, 6vw, 48px)",
      }}
    >
      <Background />
      <Particles />
      <Corners />

      <motion.div style={{ scale: paperScale, position: "absolute", inset: 0, pointerEvents: "none" }}>
        {papers.map((p, i) => <Paper key={i} {...p} />)}
      </motion.div>

      <motion.div style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 10, textAlign: "center", width: "100%", maxWidth: "680px" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 16px 5px 10px", background: "rgba(0,56,99,0.4)", border: "1px solid rgba(17,138,178,0.3)", borderRadius: "100px", marginBottom: "32px", backdropFilter: "blur(8px)" }}
        >
          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#118ab2", boxShadow: "0 0 10px rgba(17,138,178,0.9)", display: "inline-block" }} />
          <span style={{ fontSize: "11px", color: "rgba(17,138,178,0.85)", letterSpacing: "0.1em", fontWeight: 500 }}>{badge}</span>
        </motion.div>

        <Shield />

        {/* Heading */}
        <motion.h1 custom={0} variants={tv} initial="hidden" animate="show" style={{ color: "#ffffff", lineHeight: 1.08, marginBottom: 0 }}>
          {first}{" "}
          {middle && (
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ WebkitTextStroke: "1.5px rgba(17,138,178,0.65)", color: "transparent" }}>{middle}</span>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", bottom: "-4px", left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(17,138,178,0.5), transparent)", transformOrigin: "left", display: "block" }} />
            </span>
          )}{" "}
          {words.length > 1 ? last : ""}
        </motion.h1>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "1px", width: "clamp(50px, 8vw, 80px)", background: "linear-gradient(90deg, transparent, rgba(17,138,178,0.6), transparent)", margin: "22px auto 26px", transformOrigin: "center" }} />

       

       

        {/* Buttons */}
        <motion.div custom={4} variants={tv} initial="hidden" animate="show"
          style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "40px" }}>
          <Button href={primaryHref} variant="primary" icon={true}>{primaryLabel}</Button>
          {pdfUrl ? (
            <Button onClick={handlePdfDownload} variant="outline" icon={true}>{secondaryLabel}</Button>
          ) : (
            <Button href="#download" variant="outline" icon={true}>{secondaryLabel}</Button>
          )}
        </motion.div>

      </motion.div>
    </section>
  );
}
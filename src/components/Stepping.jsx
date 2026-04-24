import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button"; // apna Button component import karo

// ── Animation Variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

// ── Floating Orb Component ───────────────────────────────────────────────────
function Orb({ style, delay = 0, size = 320, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(90px)",
        ...style,
      }}
      animate={{
        y: [0, -24, 0],
        scale: [1, 1.06, 1],
        opacity: [0.45, 0.65, 0.45],
      }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ── Grid Lines ───────────────────────────────────────────────────────────────
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,80,157,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,80,157,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

// ── Animated Badge ───────────────────────────────────────────────────────────
function Badge() {
  return (
    <motion.div variants={fadeIn} className="flex justify-center mb-6">
      <div
        className="relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase overflow-hidden"
        style={{
          border: "1px solid rgba(17,138,178,0.35)",
          background: "rgba(0,56,99,0.25)",
          color: "var(--blue-3)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Pulse dot */}
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: "var(--blue-3)" }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: "var(--blue-3)" }}
          />
        </span>
        Premium Digital Services
        {/* Shine sweep */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// ── Decorative Line ──────────────────────────────────────────────────────────
function DecorLine() {
  return (
    <motion.div
      variants={fadeIn}
      className="flex items-center justify-center gap-3 mt-10"
    >
      <motion.div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--blue-3))" }}
        initial={{ width: 0 }}
        animate={{ width: 60 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--accent-pink)" }}
      />
      <motion.div
        className="h-px"
        style={{ background: "linear-gradient(90deg, var(--blue-3), transparent)" }}
        initial={{ width: 0 }}
        animate={{ width: 60 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ServiceHero() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: content dheere upar jata hai scroll pe
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-main)" }}
    >
      {/* ── Background Layer ── */}
      <GridOverlay />

      {/* Orbs */}
      <Orb
        color="radial-gradient(circle, rgba(0,80,157,0.7), transparent 70%)"
        style={{ top: "-5%", left: "-8%" }}
        size={500}
        delay={0}
      />
      <Orb
        color="radial-gradient(circle, rgba(17,138,178,0.5), transparent 70%)"
        style={{ bottom: "5%", right: "-10%" }}
        size={420}
        delay={2}
      />
      <Orb
        color="radial-gradient(circle, rgba(255,143,171,0.2), transparent 70%)"
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        size={300}
        delay={1.5}
      />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.6,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg-main))",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <Badge />

          {/* H1 Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight mb-6"
            style={{ color: "#e2eaf4" }}
          >
            We Build{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, var(--blue-3) 0%, var(--accent-pink) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Digital
              {/* Underline swoosh */}
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              >
                <motion.path
                  d="M2 8 Q75 2 150 6 Q225 10 298 4"
                  stroke="url(#sw)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="sw" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#118ab2" />
                    <stop offset="100%" stopColor="#ff8fab" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>{" "}
            Experiences
            <br className="hidden sm:block" />
            <span style={{ color: "#e2eaf4" }}> That Matter</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            From concept to launch — we craft scalable, high-performance web
            solutions tailored to your vision. Strategy, design, and engineering
            united under one roof.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/services" variant="primary">
              Explore Services
            </Button>
            <Button href="/contact" variant="outline">
              Let's Talk
            </Button>
          </motion.div>

          {/* Decorative line */}
          <DecorLine />

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-8 mt-12"
          >
            {[
              { value: "200+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "5★", label: "Avg. Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-black"
                  style={{
                    background:
                      "linear-gradient(135deg, #e2eaf4, var(--blue-3))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs tracking-widest uppercase mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-8 rounded-full"
          style={{ background: "var(--blue-3)" }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
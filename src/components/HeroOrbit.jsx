import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const orbitConfig = [
  {
    id: 1,
    radius: 160,
    duration: 14,
    icons: [
      { id: "i1", src: "/icons/seo.png" },
      { id: "i2", src: "/icons/app-development.png" },
      { id: "i3", src: "/icons/seo.png" },
      { id: "i4", src: "/icons/seo.png" },
    ],
  },
  {
    id: 2,
    radius: 260,
    duration: 22,
    icons: [
      { id: "i5",  src: "/icons/seo.png" },
      { id: "i6",  src: "/icons/seo.png" },
      { id: "i7",  src: "/icons/seo.png" },
      { id: "i8",  src: "/icons/seo.png" },
      { id: "i9",  src: "/icons/seo.png" },
      { id: "i10", src: "/icons/seo.png" },
    ],
  },
  {
    id: 3,
    radius: 370,
    duration: 32,
    icons: [
      { id: "i11", src: "/icons/seo.png" },
      { id: "i12", src: "/icons/seo.png" },
      { id: "i13", src: "/icons/seo.png" },
      { id: "i14", src: "/icons/seo.png" },
      { id: "i15", src: "/icons/seo.png" },
      { id: "i16", src: "/icons/seo.png" },
      { id: "i17", src: "/icons/seo.png" },
    ],
  },
];

function OrbitRing({ radius, duration, icons, delay = 0 }) {
  const angleStep = (2 * Math.PI) / icons.length;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width:      radius * 2,
        height:     radius * 2,
        border:     "1px dashed rgba(0,80,157,0.35)",
        top:        "50%",
        left:       "50%",
        marginTop:  -radius,
        marginLeft: -radius,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale:   1,
        rotate:  360,
        transition: {
          opacity: { duration: 0.8, delay },
          scale:   { duration: 0.8, delay },
          rotate:  { duration, repeat: Infinity, ease: "linear", delay: 0 },
        },
      }}
    >
      {icons.map((icon, idx) => {
        const angle = angleStep * idx;
        const x = radius + radius * Math.cos(angle) - 20;
        const y = radius + radius * Math.sin(angle) - 20;

        return (
          <motion.div
            key={icon.id}
            className="absolute flex items-center justify-center"
            style={{ width: 40, height: 40, left: x, top: y }}
            animate={{ rotate: -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold select-none"
              style={{
                background:     "rgba(0,56,99,0.55)",
                border:         "1px solid rgba(0,80,157,0.5)",
                color:          "#a0aec0",
                backdropFilter: "blur(6px)",
                boxShadow:      "0 0 12px rgba(0,80,157,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {<img src={icon.src} alt="" className="w-6 h-6 object-contain" />}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function CenterPulse() {
  return (
    <div
      className="absolute"
      style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
    >
      <motion.div
        className="rounded-full absolute"
        style={{
          width: 80, height: 80,
          top: "50%", left: "50%",
          marginTop: -40, marginLeft: -40,
          border: "1px solid rgba(17,138,178,0.4)",
        }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="rounded-full absolute"
        style={{
          width: 48, height: 48,
          top: "50%", left: "50%",
          marginTop: -24, marginLeft: -24,
          background: "radial-gradient(circle, rgba(17,138,178,0.6) 0%, rgba(0,80,157,0.3) 60%, transparent 100%)",
          boxShadow: "0 0 30px rgba(17,138,178,0.5)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="rounded-full absolute"
        style={{
          width: 16, height: 16,
          top: "50%", left: "50%",
          marginTop: -8, marginLeft: -8,
          background: "#118ab2",
          boxShadow:  "0 0 16px #118ab2, 0 0 40px rgba(17,138,178,0.4)",
        }}
      />
    </div>
  );
}

export default function HeroOrbit() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden:  { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-40  w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-main, #00171f)" }}
    >
      {/* grid + radial overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,80,157,0.12) 0%, transparent 70%),
            linear-gradient(rgba(0,56,99,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,56,99,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* ORBITS */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {orbitConfig.map((orbit, i) => (
          <OrbitRing
            key={orbit.id}
            radius={orbit.radius}
            duration={orbit.duration}
            icons={orbit.icons}
            delay={0.4 + i * 0.15}
          />
        ))}
        <CenterPulse />
      </div>

      {/* CONTENT */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={fadeUp}>
          <span
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(0,80,157,0.18)",
              border:     "1px solid rgba(0,80,157,0.4)",
              color:      "#118ab2",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#118ab2" }}
            />
            Your Tagline Here
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6"
          style={{ color: "#e2eaf4" }}
        >
          Your{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #118ab2 0%, #00509d 50%, #ff8fab 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Headline
          </span>{" "}
          Goes Here
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          style={{ color: "var(--text-muted, #a0aec0)" }}
        >
          Apna description yahan daal do — chhota aur impactful rakho. Ek do
          line kaafi hoti hai hero section ke liye.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <motion.button
            className="relative px-8 py-3.5 rounded-full text-sm font-semibold overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #003863 0%, #00509d 100%)",
              color:      "#e2eaf4",
              border:     "1px solid rgba(17,138,178,0.4)",
              boxShadow:  "0 0 24px rgba(0,80,157,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            whileHover={{
              scale:     1.04,
              boxShadow: "0 0 36px rgba(17,138,178,0.55), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            />
            <span className="relative z-10">Get Started →</span>
          </motion.button>

          <motion.button
            className="px-8 py-3.5 rounded-full text-sm font-semibold cursor-pointer"
            style={{
              background: "transparent",
              color:      "#a0aec0",
              border:     "1px solid rgba(0,80,157,0.3)",
            }}
            whileHover={{
              color:      "#e2eaf4",
              borderColor:"rgba(17,138,178,0.6)",
              background: "rgba(0,56,99,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* bottom vignette */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-30"
        style={{
          background: "linear-gradient(to top, var(--bg-main, #00171f) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
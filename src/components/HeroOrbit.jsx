import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Button from "../components/Button";

const orbitConfig = [
  {
    id: 1,
    radius: 160,
    duration: 14,
    icons: [
      { id: "i1", src: "/icons/seo.png" },
      { id: "i2", src: "/icons/app-development.png" },
      { id: "i3", src: "/icons/connectivity.png" },
      { id: "i4", src: "/icons/facebook.png" },
    ],
  },
  {
    id: 2,
    radius: 260,
    duration: 22,
    icons: [
      { id: "i5", src: "/icons/file.png" },
      { id: "i6", src: "/icons/google.png" },
      { id: "i7", src: "/icons/html.png" },
      { id: "i8", src: "/icons/java-script.png" },
      { id: "i9", src: "/icons/linkedin.png" },
      { id: "i10", src: "/icons/meta.png" },
    ],
  },
  {
    id: 3,
    radius: 370,
    duration: 32,
    icons: [
      { id: "i11", src: "/icons/physics.png" },
      { id: "i12", src: "/icons/shopify.png" },
      { id: "i13", src: "/icons/shopping.png" },
      { id: "i14", src: "/icons/social-media (1).png" },
      { id: "i15", src: "/icons/wordpress.png" },
      { id: "i16", src: "/icons/instagram.png" },
      { id: "i17", src: "/icons/graphic.png" },
    ],
  },
];

/* ============================================================
   PERFORMANCE HELPERS
   ============================================================ */

// CSS animation ko sirf tab run karne dena jab page visible ho.
function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(
    typeof document !== "undefined"
      ? document.visibilityState === "visible"
      : true
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return isVisible;
}

// User/device reduced motion prefer karta hai ya nahi.
function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return reducedMotion;
}

/* ============================================================
   ORBIT RING
   ============================================================ */

function OrbitRing({
  radius,
  duration,
  icons,
  delay = 0,
  animationEnabled = true,
}) {
  /*
    IMPORTANT:
    Orbit positions once calculate kar rahe hain.
    Har render par dobara calculation nahi hogi.
  */
  const positionedIcons = useMemo(() => {
    const angleStep = (2 * Math.PI) / icons.length;

    return icons.map((icon, idx) => {
      const angle = angleStep * idx;

      return {
        ...icon,
        left: radius + radius * Math.cos(angle) - 20,
        top: radius + radius * Math.sin(angle) - 20,
      };
    });
  }, [radius, icons]);

  return (
    <motion.div
      className={`absolute rounded-full orbit-ring ${
        animationEnabled ? "orbit-ring-active" : ""
      }`}
      style={{
        width: radius * 2,
        height: radius * 2,
        border: "1px dashed rgba(0,80,157,0.35)",
        top: "50%",
        left: "50%",
        marginTop: -radius,
        marginLeft: -radius,

        /*
          CSS custom properties.
          Browser directly animation handle karega.
        */
        "--orbit-duration": `${duration}s`,
        "--orbit-delay": `${delay}s`,

        /*
          GPU-friendly rendering hint.
        */
        willChange: animationEnabled ? "transform" : "auto",
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
      }}
    >
      {positionedIcons.map((icon) => (
        <div
          key={icon.id}
          className={`absolute flex items-center justify-center orbit-icon ${
            animationEnabled ? "orbit-icon-active" : ""
          }`}
          style={{
            width: 40,
            height: 40,
            left: icon.left,
            top: icon.top,

            /*
              Counter rotation CSS se hogi.
            */
            "--orbit-duration": `${duration}s`,
          }}
        >
          <div
            className="w-20 h-10 rounded-full flex items-center justify-center text-xs font-semibold select-none"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(0,80,157,0.5)",
              color: "#a0aec0",
              backdropFilter: "blur(10px)",
              boxShadow:
                "0 0 12px rgba(0,80,157,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",

              /*
                Browser ko indicate karta hai ki ye element
                transform animation karega.
              */
              willChange: animationEnabled ? "transform" : "auto",
            }}
          >
            <img
              src={icon.src}
              alt=""
              className="w-6 h-6 object-contain"
              draggable="false"
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ============================================================
   CENTER PULSE
   ============================================================ */

function CenterPulse({ animationEnabled }) {
  return (
    <div
      className="absolute"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <motion.div
        className="rounded-full absolute"
        style={{
          width: 80,
          height: 80,
          top: "50%",
          left: "50%",
          marginTop: -40,
          marginLeft: -40,
          border: "1px solid rgba(17,138,178,0.4)",
          willChange: animationEnabled ? "transform, opacity" : "auto",
        }}
        animate={
          animationEnabled
            ? {
                scale: [1, 1.8, 1],
                opacity: [0.6, 0, 0.6],
              }
            : {
                scale: 1,
                opacity: 0.6,
              }
        }
        transition={
          animationEnabled
            ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0,
              }
        }
      />

      <motion.div
        className="rounded-full absolute"
        style={{
          width: 48,
          height: 48,
          top: "50%",
          left: "50%",
          marginTop: -24,
          marginLeft: -24,
          background:
            "radial-gradient(circle, rgba(17,138,178,0.6) 0%, rgba(0,80,157,0.3) 60%, transparent 100%)",
          boxShadow: "0 0 30px rgba(17,138,178,0.5)",
          willChange: animationEnabled ? "transform" : "auto",
        }}
        animate={
          animationEnabled
            ? {
                scale: [1, 1.12, 1],
              }
            : {
                scale: 1,
              }
        }
        transition={
          animationEnabled
            ? {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0,
              }
        }
      />

      <div
        className="rounded-full absolute"
        style={{
          width: 16,
          height: 16,
          top: "50%",
          left: "50%",
          marginTop: -8,
          marginLeft: -8,
          background: "#118ab2",
          boxShadow:
            "0 0 16px #118ab2, 0 0 40px rgba(17,138,178,0.4)",
        }}
      />
    </div>
  );
}

/* ============================================================
   MAIN HERO
   ============================================================ */

export default function HeroOrbit({
  title,
  description,
  primaryBtnText,
  secondaryBtnText,
  primaryLink,
  secondaryLink,
  showButtons = true,
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const controls = useAnimation();

  const pageVisible = usePageVisibility();
  const reducedMotion = useReducedMotionPreference();

  /*
    Infinite animation tab hidden hone par stop.
    Reduced motion enabled hone par bhi stop.
  */
  const animationEnabled = pageVisible && !reducedMotion;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 32,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-50 w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "var(--bg-main, #00171f)",
      }}
    >
      {/* ======================================================
          GRID + RADIAL OVERLAY
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 70% 50% at 50% 50%,
              rgba(0,80,157,0.12) 0%,
              transparent 70%
            ),
            linear-gradient(
              rgba(0,56,99,0.06) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,56,99,0.06) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* ======================================================
          ORBITS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-10">
        {orbitConfig.map((orbit, i) => (
          <OrbitRing
            key={orbit.id}
            radius={orbit.radius}
            duration={orbit.duration}
            icons={orbit.icons}
            delay={0.4 + i * 0.15}
            animationEnabled={animationEnabled}
          />
        ))}

        <CenterPulse
          animationEnabled={animationEnabled}
        />
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-6xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate={controls}
      >
        <motion.h1
          variants={fadeUp}
          className="leading-[1.08] mb-6"
          style={{
            color: "#e2eaf4",
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          style={{
            color: "#fff",
          }}
        >
          {description}
        </motion.p>

        {showButtons &&
          (primaryLink || secondaryLink) && (
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 flex-wrap justify-center"
            >
              {primaryLink && primaryBtnText && (
                <Button href={primaryLink}>
                  {primaryBtnText}
                </Button>
              )}

              {secondaryLink && secondaryBtnText && (
                <Button
                  variant="outline"
                  href={secondaryLink}
                >
                  {secondaryBtnText}
                </Button>
              )}
            </motion.div>
          )}
      </motion.div>

      {/* ======================================================
          BOTTOM VIGNETTE
      ====================================================== */}

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-30"
        style={{
          background:
            "linear-gradient(to top, var(--bg-main, #00171f) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
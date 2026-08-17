import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import Button from "./Button";

/* ============================================================
   GEOMETRIC GRID PATTERN
   ============================================================ */

function GeometricPaths({ isActive }) {
  const gridSize = 40;

  const paths = useMemo(() => {
    const generatedPaths = [];

    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 12; y++) {
        if (Math.random() > 0.7) {
          generatedPaths.push({
            id: `grid-${x}-${y}`,
            d: `
              M${x * gridSize},${y * gridSize}
              L${(x + 1) * gridSize},${y * gridSize}
              L${(x + 1) * gridSize},${(y + 1) * gridSize}
              L${x * gridSize},${(y + 1) * gridSize}
              Z
            `,
            delay: Math.random() * 1.5,
          });
        }
      }
    }

    return generatedPaths;
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 800 480"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={
            isActive
              ? {
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  scale: [1, 1.05, 1],
                }
              : {
                  pathLength: 0,
                  opacity: 0,
                  scale: 1,
                }
          }
          transition={{
            duration: 8,
            delay: path.delay,
            repeat: 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ============================================================
   SPIRAL PATTERN
   ============================================================ */

function SpiralPaths({ isActive }) {
  const spirals = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const centerX = 400 + ((i % 4) - 1.5) * 200;
      const centerY =
        300 + Math.floor(i / 4 - 0.5) * 200;

      const radius = 80 + i * 15;
      const turns = 3 + i * 0.5;

      let path = `M${centerX + radius},${centerY}`;

      for (
        let angle = 0;
        angle <= turns * 360;
        angle += 5
      ) {
        const radian = (angle * Math.PI) / 180;

        const currentRadius =
          radius *
          (1 - angle / (turns * 360));

        path += ` L${
          centerX +
          currentRadius * Math.cos(radian)
        },${
          centerY +
          currentRadius * Math.sin(radian)
        }`;
      }

      return {
        id: `spiral-${i}`,
        d: path,
        delay: i * 0.5,
      };
    });
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-25"
      viewBox="0 0 800 600"
    >
      {spirals.map((spiral) => (
        <motion.path
          key={spiral.id}
          d={spiral.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={
            isActive
              ? {
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360],
                }
              : {
                  pathLength: 0,
                  opacity: 0,
                  rotate: 0,
                }
          }
          transition={{
            pathLength: {
              duration: 12,
              repeat: 0,
              ease: "easeInOut",
              delay: spiral.delay,
            },
            opacity: {
              duration: 12,
              repeat: 0,
              ease: "easeInOut",
              delay: spiral.delay,
            },
            rotate: {
              duration: 20,
              repeat: 0,
              ease: "linear",
              delay: spiral.delay,
            },
          }}
        />
      ))}
    </svg>
  );
}

/* ============================================================
   MAIN SERVICE HERO
   ============================================================ */

export default function ServiceHero({
  title,
  subtitle,
  primaryCTA = {
    text: "About Us",
    link: "/about",
  },
  secondaryCTA = {
    text: "Contact Us",
    link: "/contact-us",
  },
  pattern = "auto",
  height = "min-h-[85vh] md:min-h-screen",
}) {
  const heroRef = useRef(null);

  /*
    IMPORTANT:
    once:false rakha hai taaki component ko pata rahe
    ki Hero viewport mein hai ya nahi.
  */
  const isInView = useInView(heroRef, {
    once: false,
    amount: 0.25,
  });

  const controls = useAnimation();

  /*
    Hero ke andar aate hi entrance animation start.
    Bahar jaate hi active animations stop.
  */
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  /*
    Auto pattern switching intentionally remove kiya gaya hai.
    
    Isse:
    - setInterval nahi chalega
    - har 8 sec re-render nahi hoga
    - SVG unnecessarily destroy/recreate nahi hoga

    Visual initial pattern same rahega.
  */
  const currentPattern =
    pattern === "geometric"
      ? 1
      : 0;

  const renderPattern = () => {
    switch (currentPattern) {
      case 0:
        return (
          <SpiralPaths
            isActive={isInView}
          />
        );

      case 1:
        return (
          <GeometricPaths
            isActive={isInView}
          />
        );

      default:
        return (
          <SpiralPaths
            isActive={isInView}
          />
        );
    }
  };

  return (
    <div
      ref={heroRef}
      className={`relative ${height} w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-[#00171f] via-[#051923] to-[#002a3a]`}
    >
      {/* ======================================================
          ANIMATED BACKGROUND PATTERN
      ====================================================== */}

      <div
        className="absolute inset-0"
        style={{
          color: "var(--blue-3)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isInView ? 1 : 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          {renderPattern()}
        </motion.div>
      </div>

      {/* ======================================================
          DARK GRADIENT OVERLAY
      ====================================================== */}

      <div className="absolute inset-0 bg-linear-to-t from-[#00171f]/75 via-transparent to-[#00171f]/75" />

      {/* ======================================================
          GLOWING ORB 1
      ====================================================== */}

      <motion.div
        className="absolute w-105 h-105 top-[10%] -left-[8%] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,80,157,0.22) 0%, transparent 70%)",
        }}
        initial={{
          scale: 1,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.9, 0.5],
              }
            : {
                scale: 1,
                opacity: 0,
              }
        }
        transition={{
          duration: 9,
          repeat: 0,
          ease: "easeInOut",
        }}
      />

      {/* ======================================================
          GLOWING ORB 2
      ====================================================== */}

      <motion.div
        className="absolute w-[320px] h-80 bottom-[5%] -right-[5%] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(17,138,178,0.18) 0%, transparent 70%)",
        }}
        initial={{
          scale: 1,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4],
              }
            : {
                scale: 1,
                opacity: 0,
              }
        }
        transition={{
          duration: 11,
          repeat: 0,
          ease: "easeInOut",
        }}
      />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        >
          {/* ==================================================
              H1
          ================================================== */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.97,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    y: 30,
                    scale: 0.97,
                  }
            }
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-black mb-4 mt-8 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[rgba(17,138,178,0.65)]"
          >
            {title}
          </motion.h1>

          {/* ==================================================
              DIVIDER
          ================================================== */}

          <motion.div
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    scaleX: 1,
                    opacity: 1,
                  }
                : {
                    scaleX: 0,
                    opacity: 0,
                  }
            }
            transition={{
              delay: 0.9,
              duration: 1,
              ease: "easeOut",
            }}
            className="mx-auto mb-6 h-px w-2/5"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--blue-3), transparent)",
            }}
          />

          {/* ==================================================
              SUBTITLE
          ================================================== */}

          <motion.p
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 16,
                  }
            }
            transition={{
              delay: 1,
              duration: 0.9,
            }}
            className="text-base md:text-xl font-light tracking-wide leading-relaxed max-w-5xl mx-auto mb-10 text-white"
          >
            {subtitle}
          </motion.p>

          {/* ==================================================
              BUTTONS
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            transition={{
              delay: 1.4,
              duration: 0.8,
              type: "spring",
              stiffness: 80,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              href={primaryCTA.link}
              variant="primary"
            >
              {primaryCTA.text}
            </Button>

            <Button
              href={secondaryCTA.link}
              variant="outline"
            >
              {secondaryCTA.text}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ======================================================
          FLOATING ACCENT DOT 1
      ====================================================== */}

      <motion.div
        className="absolute w-3.5 h-3.5 top-[28%] left-[22%] rounded-full blur-sm pointer-events-none bg-[rgba(17,138,178,0.35)]"
        initial={{
          y: 0,
          x: 0,
          scale: 1,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                y: [0, -18, 0],
                x: [0, 10, 0],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }
            : {
                y: 0,
                x: 0,
                scale: 1,
                opacity: 0,
              }
        }
        transition={{
          duration: 6,
          repeat: 0,
          ease: "easeInOut",
        }}
      />

      {/* ======================================================
          FLOATING ACCENT DOT 2
      ====================================================== */}

      <motion.div
        className="absolute w-5 h-5 top-[72%] right-[30%] rounded-full blur-sm pointer-events-none bg-[rgba(255,143,171,0.2)]"
        initial={{
          y: 0,
          x: 0,
          scale: 1,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                y: [0, 14, 0],
                x: [0, -12, 0],
                scale: [1, 0.8, 1],
                opacity: [0.4, 0.7, 0.4],
              }
            : {
                y: 0,
                x: 0,
                scale: 1,
                opacity: 0,
              }
        }
        transition={{
          duration: 8,
          repeat: 0,
          ease: "easeInOut",
        }}
      />

      {/* ======================================================
          FLOATING ACCENT DOT 3
      ====================================================== */}

      <motion.div
        className="absolute w-2.5 h-2.5 top-[55%] left-[8%] rounded-full blur-sm pointer-events-none bg-[rgba(0,80,157,0.5)]"
        initial={{
          y: 0,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                y: [0, -10, 0],
                opacity: [0.3, 0.9, 0.3],
              }
            : {
                y: 0,
                opacity: 0,
              }
        }
        transition={{
          duration: 5,
          repeat: 0,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
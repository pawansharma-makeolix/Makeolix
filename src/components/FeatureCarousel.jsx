import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Replace IconPlaceholder with your HugeiconsIcon usage ──────────────────
const IconPlaceholder = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

// ─── Change Here ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: "Fast",
    label: "Fast Store Launch",
    icon: IconPlaceholder,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200",
    description: "Launch your dropshipping business quickly with a ready-to-scale ecommerce store.",
  },
  {
    id: "Conversion",
    label: "Conversion-Focused Design",
    icon: IconPlaceholder,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    description: "Turn more visitors into customers with strategic store layouts.",
  },
  
  {
    id: "Mobile",
    label: "Mobile-Optimized Experience",
    icon: IconPlaceholder,
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=1200",
    description: "Deliver a seamless shopping experience across all devices.",
  },
  {
    id: "Shopify",
    label: "Shopify",
    icon: IconPlaceholder,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    description: "Build on trusted platforms designed for ecommerce growth.",
  },
  {
    id: "SEO",
    label: "SEO-Ready ",
    icon: IconPlaceholder,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    description: "Improve visibility with search-friendly store architecture.",
  },
  {
    id: "Marketing",
    label: "Marketing Integration",
    icon: IconPlaceholder,
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
    description: "Connect analytics, ads, and email tools from day one.",
  },
  {
    id: "security",
    label: "Enterprise Security",
    icon: IconPlaceholder,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    description: "Bank-grade security protocols for your data.",
  },
  {
    id: "Scalable",
    label: "Scalable Growth",
    icon: IconPlaceholder,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
    description: "Expand products, traffic, and sales without rebuilding your store.",
  },
  
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full  ">
      <div
        className="relative overflow-hidden  flex flex-col lg:flex-row min-h-[600px] lg:aspect-video"
        style={{
          backgroundColor: "var(--bg-soft)",
          border: "1px solid rgba(17, 138, 178, 0.15)",
        }}
      >
        {/* ─── Left Panel: dark with subtle blue glow strip ───────────────── */}
        <div
          className="w-full lg:w-[42%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-14 lg:px-14"
          style={{ backgroundColor: "var(--bg-main)" }}
        >
          {/* subtle blue left border accent */}
          <div
            className="absolute left-0 top-[20%] bottom-[20%] w-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--blue-3), transparent)",
            }}
          />

          {/* top fade */}
          <div
            className="absolute inset-x-0 top-0 h-16 md:h-20 z-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, var(--bg-main), transparent)",
            }}
          />
          {/* bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 md:h-20 z-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, var(--bg-main), transparent)",
            }}
          />

          {/* Scrolling chips */}
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.28,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="relative flex items-center gap-3 px-5 md:px-7 py-3 rounded-full transition-all duration-500 text-left"
                    style={
                      isActive
                        ? {
                            backgroundColor: "rgba(17, 138, 178, 0.12)",
                            color: "var(--blue-3)",
                            border: "1px solid rgba(17, 138, 178, 0.5)",
                            boxShadow: "0 0 20px rgba(17, 138, 178, 0.1)",
                          }
                        : {
                            backgroundColor: "transparent",
                            color: "rgba(160, 174, 192, 0.6)",
                            border: "1px solid rgba(17, 138, 178, 0.1)",
                          }
                    }
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0 transition-colors duration-500"
                      style={{
                        color: isActive
                          ? "var(--blue-3)"
                          : "rgba(160,174,192,0.35)",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span
                      className="text-sm tracking-widest whitespace-nowrap uppercase"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Divider line (lg only) ──────────────────────────────────────── */}
        <div
          className="hidden lg:block w-px self-stretch my-12"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(17,138,178,0.25) 30%, rgba(17,138,178,0.25) 70%, transparent)",
          }}
        />

        {/* ─── Right Panel ────────────────────────────────────────────────── */}
        <div
          className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative flex items-center justify-center py-16 md:py-24 lg:py-12 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0"
          style={{
            backgroundColor: "var(--bg-soft)",
            borderColor: "rgba(17, 138, 178, 0.1)",
          }}
        >
          {/* subtle radial glow behind card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,56,99,0.25) 0%, transparent 70%)",
            }}
          />

          <div className="relative w-full max-w-[380px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden origin-center"
                  style={{
                    border: "3px solid rgba(17, 138, 178, 0.2)",
                    backgroundColor: "var(--bg-main)",
                    boxShadow: isActive
                      ? "0 0 40px rgba(0, 56, 99, 0.5), 0 20px 60px rgba(0,0,0,0.5)"
                      : "none",
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={
                      isActive
                        ? { filter: "grayscale(0) blur(0px) brightness(0.85)" }
                        : { filter: "grayscale(1) blur(2px) brightness(0.5)" }
                    }
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-8 pt-28 flex flex-col justify-end pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,23,31,0.97) 0%, rgba(0,23,31,0.65) 50%, transparent 100%)",
                        }}
                      >
                        <div
                          className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] w-fit mb-3"
                          style={{
                            backgroundColor: "rgba(17,138,178,0.15)",
                            color: "var(--blue-3)",
                            border: "1px solid rgba(17,138,178,0.35)",
                          }}
                        >
                          {index + 1} • {feature.label}
                        </div>
                        <p
                          className="text-lg md:text-xl leading-snug tracking-tight"
                          style={{ color: "rgba(255,255,255,0.92)" }}
                        >
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
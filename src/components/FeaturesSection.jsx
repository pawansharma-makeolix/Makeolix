import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Check } from "lucide-react";
import LinkRenderer from "./LinkRenderer";

// ─── Feature Icon List ────────────────────────────────────────────────────────

function FeatureIconList({ title, items = [] }) {
  const listRef = useRef(null);
  const isInView = useInView(listRef, { once: true, margin: "-60px" });

  if (!items.length) return null;

  return (
    <div
      ref={listRef}
      className="rounded-2xl p-5 md:p-6 border border-[rgba(17,138,178,0.16)] bg-[linear-gradient(135deg,rgba(0,23,31,0.94)_0%,rgba(0,56,99,0.5)_100%)]"
    >
      {title && (
        <h4 className="text-white  text-base mb-4 tracking-[-0.02em]">
          <LinkRenderer text={title} />
        </h4>
      )}

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.06,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.span
              animate={isInView ? { scale: [1, 1.18, 1] } : {}}
              transition={{
                duration: 2,
                repeat: 2,
                delay: i * 0.12,
              }}
              className="mt-[2px] text-[var(--blue-3)] shrink-0"
            >
              <Check size={16} strokeWidth={3} />
            </motion.span>

            <span className="text-sm leading-relaxed text-[var(--text-muted,#a0aec0)]">
              <LinkRenderer text={item} />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Magnetic Feature Card ────────────────────────────────────────────────────
function FeatureCard({ card, index, side }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / 12);
    mouseY.set((e.clientY - cy) / 12);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const enterX = side === "left" ? -60 : 60;
  const delay = index * 0.13;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springY, rotateY: springX, perspective: 800 }}
      initial={{ opacity: 0, x: enterX }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025 }}
      className="feature-card relative group cursor-default lg:h-full"
    >
      {/* Glow border on hover */}
      <motion.div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(135deg,rgba(17,138,178,0.5),rgba(255,143,171,0.2),transparent)]" />

      {/* Card body */}
      <div className="relative rounded-2xl p-6 md:p-7 overflow-hidden bg-[linear-gradient(135deg,rgba(0,23,31,0.97)_0%,rgba(0,56,99,0.55)_100%)] border border-[rgba(17,138,178,0.18)] lg:h-full">

        {/* Shimmer sweep — CSS-only, runs only on hover, zero cost while idle */}
        <div className="feature-shimmer absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-[linear-gradient(110deg,transparent_30%,rgba(17,138,178,0.07)_50%,transparent_70%)]" />

        {/* Top row: number + icon */}
        <div className="flex items-start justify-between mb-4">
          <motion.span
            className="font-black tracking-tighter leading-none select-none text-[clamp(2rem,3vw,2.8rem)] text-white"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.2 } : {}}
            transition={{ delay: delay + 0.3, duration: 0.6 }}
          >
            {card.number}
          </motion.span>

          <motion.span
            className="text-xl select-none text-[var(--blue-3)]"
            animate={
              isInView
                ? { rotate: [0, 10, -6, 0], scale: [1, 1.18, 0.95, 1] }
                : {}
            }
            transition={{
              duration: 5 + index * 0.7,
              repeat: 1,
              delay: delay + 0.6,
              ease: "easeInOut",
            }}
          >
            {card.icon}
          </motion.span>
        </div>

        {/* Title */}
        <motion.h3
          className="leading-tight mb-3 text-white  tracking-[-0.02em]"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: delay + 0.2,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
         <LinkRenderer text={card.title} />
        </motion.h3>

        {/* Body */}
        <motion.p
          className="text-sm leading-relaxed text-[var(--text-muted,#a0aec0)]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay + 0.32, duration: 0.55 }}
        >
          <LinkRenderer text={card.body} />
        </motion.p>

        {/* Card icon lists */}
        {card.iconLists?.map((group, i) => (
          <div key={i} className="mt-5">
            <FeatureIconList title={group.title} items={group.items} />
          </div>
        ))}

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[linear-gradient(90deg,var(--blue-3),rgba(255,143,171,0.5),transparent)]"
          initial={{ width: 0 }}
          animate={isInView ? { width: "60%" } : {}}
          transition={{
            delay: delay + 0.5,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      <style>{`
        .feature-shimmer {
          transform: translateX(-120%);
        }
        .feature-card:hover .feature-shimmer {
          animation: feature-shimmer-sweep 1.1s ease-in-out;
        }
        @keyframes feature-shimmer-sweep {
          from { transform: translateX(-120%); }
          to { transform: translateX(200%); }
        }
      `}</style>
    </motion.div>
  );
}

// ─── Animated Heading ─────────────────────────────────────────────────────────
function AnimatedHeading({ text, highlight = [], className = "", style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={className} style={style}>
      {words.map((word, i) => {
        const isHighlight = highlight.includes(i);
        return (
          <motion.span
            key={i}
            className={
              isHighlight
                ? "inline-block mr-[0.22em] bg-[linear-gradient(135deg,var(--blue-3)_0%,var(--accent-pink,#ff8fab)_100%)] bg-clip-text text-transparent"
                : "inline-block mr-[0.22em] text-white"
            }
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.07,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </h2>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FeaturesSection({
  leftCards = [],
  rightCards = [],

  heading = "Everything You Need To Dominate",
  highlight = [5, 6],
  subtext,
  bgcolor,
}) {
  const finalLeft = leftCards.length ? leftCards : LEFT_CARDS;
  const finalRight = rightCards.length ? rightCards : RIGHT_CARDS;

  const containerRef = useRef(null);
  const isSectionInView = useInView(containerRef, { once: false, margin: "-100px" });

  const subtextRef = useRef(null);
  const subtextInView = useInView(subtextRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-14 md:py-20  bg-[linear-gradient(180deg,var(--bg-main,#00171f)_0%,var(--bg-soft,#051923)_50%,var(--bg-main,#00171f)_100%)]"
    >
      {/* ── Ambient Background Glows — CSS-driven, paused via class when out of view ── */}
      <div
        className={`ambient-glows absolute inset-0 pointer-events-none overflow-hidden ${
          isSectionInView ? "is-active" : ""
        }`}
      >
        <div className="glow glow-left absolute rounded-full w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] -left-[15%] top-[10%] bg-[radial-gradient(circle,rgba(0,56,99,0.35)_0%,rgba(0,56,99,0.12)_35%,transparent_70%)]" />
        <div className="glow glow-right absolute rounded-full w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] -right-[10%] bottom-[5%] bg-[radial-gradient(circle,rgba(17,138,178,0.2)_0%,rgba(17,138,178,0.08)_35%,transparent_70%)]" />
        <div className="glow glow-pink absolute rounded-full w-[300px] h-[300px] top-0 left-1/2 -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,143,171,0.1)_0%,rgba(255,143,171,0.04)_35%,transparent_70%)]" />
      </div>

      {/* ── Section Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Header Block ── */}
        <div className="text-center mb-16 md:mb-24">
          {/* Main heading */}
          <AnimatedHeading
            text={heading}
            highlight={highlight}
            className="font-regular tracking-tighter leading-[1.05] mb-6 mx-auto text-[clamp(2rem,3.5vw,3.5rem)] max-w-[800px]"
          />

          {/* Animated underline */}
          <motion.div
            className="mx-auto mb-8 h-[2px] max-w-[120px]"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full h-full rounded-[2px] bg-[linear-gradient(90deg,var(--blue-3),var(--accent-pink,#ff8fab))]" />
          </motion.div>

          {/* Subtext paragraph */}
          {subtext && (
            <motion.p
              ref={subtextRef}
              className="text-base md:text-lg leading-relaxed mx-auto text-white max-w-[1020px]"
              initial={{ opacity: 0, y: 20 }}
              animate={subtextInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
             <LinkRenderer text={subtext} />
            </motion.p>
          )}
        </div>

        {/* ── Two Column Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            {/* Column label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-1"
            >
              <motion.div
                className="h-px flex-1 bg-[linear-gradient(90deg,var(--blue-3),transparent)]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {finalLeft.map((card, i) => (
              <div key={card.id} className="lg:flex-1">
                <FeatureCard card={card} index={i} side="left" />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {/* Column label */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-1"
            >
              <motion.div
                className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--blue-3))]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>

            {finalRight.map((card, i) => (
              <div key={card.id} className="lg:flex-1">
                <FeatureCard card={card} index={i} side="right" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ambient-glows .glow {
          opacity: 0.6;
          animation-play-state: paused;
          will-change: transform, opacity;
        }
        .ambient-glows.is-active .glow {
          animation-play-state: running;
        }
        .glow-left {
          animation: glow-left-pulse 12s ease-in-out infinite;
        }
        .glow-right {
          animation: glow-right-pulse 14s ease-in-out infinite;
          animation-delay: 3s;
        }
        .glow-pink {
          animation: glow-pink-pulse 8s ease-in-out infinite;
        }
        @keyframes glow-left-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes glow-right-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes glow-pink-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ambient-glows .glow { animation: none; }
        }
      `}</style>
    </section>
  );
}
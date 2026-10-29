import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import LinkRenderer from "./LinkRenderer";

/* =========================
   THEMES (index.css variables)
========================= */
const THEMES = {
  light: {
    section: "bg-white",
    heading: "text-[var(--blue-1)]",
    para: "text-[var(--text-main)]/75",
    card: "bg-white border-[var(--blue-3)]/20 shadow-sm hover:shadow-xl hover:border-[var(--blue-3)]/50",
    title: "text-[var(--blue-1)]",
    desc: "text-[var(--text-main)]/75",
    metric: "text-[var(--blue-2)]",
    metricLabel: "text-[var(--text-main)]/60",
    chip: "bg-[var(--blue-3)]/10 text-[var(--blue-2)]",
    pillIdle:
      "border-[var(--blue-1)]/20 text-[var(--blue-1)] hover:border-[var(--blue-2)] hover:text-[var(--blue-2)]",
    divider: "border-[var(--blue-1)]/10",
  },
  dark: {
    section: "bg-[var(--bg-main)]",
    heading: "text-white",
    para: "text-[var(--text-muted)]",
    card: "bg-[var(--bg-soft)] border-white/10 hover:border-[var(--blue-3)]/60 hover:shadow-[0_10px_40px_-10px_rgba(17,138,178,0.35)]",
    title: "text-white",
    desc: "text-[var(--text-muted)]",
    metric: "text-[var(--blue-3)]",
    metricLabel: "text-[var(--text-muted)]",
    chip: "bg-white/10 text-white",
    pillIdle:
      "border-white/15 text-[var(--text-muted)] hover:border-[var(--blue-3)] hover:text-white",
    divider: "border-white/10",
  },
};

const PILL_ACTIVE =
  "bg-[var(--blue-2)] border-[var(--blue-2)] text-white shadow-md";

/* =========================
   COUNT UP (numbers animate once, when visible)
========================= */
const CountUp = ({ value, prefix = "", suffix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  const final = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} aria-label={final}>
      <span aria-hidden="true">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
};

const Metric = ({ metric, theme }) => (
  <div className="min-w-0">
    <div className={`text-2xl font-extrabold leading-none ${theme.metric}`}>
      {typeof metric.value === "number" ? (
        <CountUp
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          decimals={metric.decimals}
        />
      ) : (
        metric.value
      )}
    </div>
    <div className={`mt-1 text-xs leading-snug ${theme.metricLabel}`}>
      {metric.label}
    </div>
  </div>
);

/* =========================
   LIGHTBOX (portal, tabhi mount hota hai jab open ho)
========================= */
const Lightbox = ({ item, index, total, onClose, onNav }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  return createPortal(
    <m.div
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-main)]/90 p-3 backdrop-blur-sm md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <m.div
        className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[var(--bg-soft)] shadow-2xl"
        initial={{ scale: 0.96, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition hover:bg-[var(--blue-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={20} />
        </button>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/30">
          <img
            src={item.imageLarge || item.image}
            alt={item.alt || item.title}
            decoding="async"
            className="max-h-[68vh] w-auto max-w-full object-contain"
          />
        </div>

        <div className="border-t border-white/10 p-4 md:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-white md:text-xl">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  <LinkRenderer text={item.description} />
                </p>
              )}
            </div>
            <span className="shrink-0 pt-1 text-xs text-[var(--text-muted)]">
              {index + 1} / {total}
            </span>
          </div>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNav(-1)}
              aria-label="Previous result"
              className="absolute left-3 top-1/3 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition hover:bg-[var(--blue-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => onNav(1)}
              aria-label="Next result"
              className="absolute right-3 top-1/3 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white transition hover:bg-[var(--blue-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </m.div>
    </m.div>,
    document.body
  );
};

/* =========================
   MAIN COMPONENT
========================= */
const ResultsShowcase = ({
  variant = "light",
  heading,
  paragraph,
  results = [],
  allLabel = "All",
}) => {
  const theme = THEMES[variant] || THEMES.light;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(allLabel);
  const [openIndex, setOpenIndex] = useState(null);
  const triggerRef = useRef(null);

  const categories = useMemo(() => {
    const set = new Set(results.map((r) => r.category).filter(Boolean));
    return set.size > 1 ? [allLabel, ...set] : [];
  }, [results, allLabel]);

  const filtered = useMemo(
    () =>
      active === allLabel ? results : results.filter((r) => r.category === active),
    [active, results, allLabel]
  );

  const openLightbox = (e, i) => {
    triggerRef.current = e.currentTarget;
    setOpenIndex(i);
  };

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus?.();
  }, []);

  const navLightbox = useCallback(
    (dir) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  if (!results.length) return null;

  const count = filtered.length;
  const gridCols =
    count === 1
      ? "grid-cols-1 max-w-3xl mx-auto"
      : count === 2 || count === 4
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        className={`relative ${theme.section} px-4 py-16 md:px-8 md:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_900px]`}
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading + paragraph */}
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className={`text-3xl font-bold leading-tight md:text-4xl ${theme.heading}`}
            >
              <LinkRenderer text={heading} />
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-4 block h-1 w-14 rounded-full bg-[var(--accent-pink)]"
            />
            {paragraph && (
              <p className={`mt-5 text-base leading-relaxed md:text-lg ${theme.para}`}>
                <LinkRenderer text={paragraph} />
              </p>
            )}
          </div>

          {/* Filter pills (sirf tab jab 2+ categories hon) */}
          {categories.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active === cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-3)] ${
                    active === cat ? PILL_ACTIVE : theme.pillIdle
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Results grid */}
          <div key={active} className={`mt-10 grid gap-6 md:mt-12 md:gap-8 ${gridCols}`}>
            {filtered.map((item, i) => (
              <m.article
                key={item.id ?? item.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.08, ease: "easeOut" }}
                className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${theme.card}`}
              >
                {item.image && (
                  <button
                    type="button"
                    onClick={(e) => openLightbox(e, i)}
                    aria-label={`View larger: ${item.title}`}
                    className="relative block w-full overflow-hidden bg-[var(--bg-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--blue-3)]"
                  >
                    <img
                      src={item.image}
                      alt={item.alt || item.title}
                      width={item.width || 1200}
                      height={item.height || 750}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--bg-main)]/0 opacity-0 transition-all duration-300 group-hover:bg-[var(--bg-main)]/40 group-hover:opacity-100 group-focus-within:opacity-100">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 text-[var(--blue-2)] shadow-lg">
                        <ZoomIn size={22} />
                      </span>
                    </span>
                  </button>
                )}

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  {item.category && (
                    <span
                      className={`mb-3 w-fit rounded-full px-3 py-1 text-xs font-semibold ${theme.chip}`}
                    >
                      {item.category}
                    </span>
                  )}

                  <h3 className={`text-lg font-bold leading-snug md:text-xl ${theme.title}`}>
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className={`mt-2 text-sm leading-relaxed ${theme.desc}`}>
                      <LinkRenderer text={item.description} />
                    </p>
                  )}

                  {item.metrics?.length > 0 && (
                    <div
                      className={`mt-auto grid grid-cols-2 gap-4 border-t pt-4 ${theme.divider} ${
                        item.metrics.length > 2 ? "sm:grid-cols-3" : ""
                      } mt-5`}
                    >
                      {item.metrics.map((metric, mi) => (
                        <Metric key={mi} metric={metric} theme={theme} />
                      ))}
                    </div>
                  )}
                </div>
              </m.article>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {openIndex !== null && filtered[openIndex] && (
            <Lightbox
              item={filtered[openIndex]}
              index={openIndex}
              total={filtered.length}
              onClose={closeLightbox}
              onNav={navLightbox}
            />
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
};

export default ResultsShowcase;
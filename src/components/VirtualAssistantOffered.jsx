import React, { useState, useRef } from "react";
import {
  motion,
  MotionConfig,
  AnimatePresence,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  Briefcase,
  Palette,
  HeartHandshake,
  Cpu,
  Scale,
  CalendarClock,
  Kanban,
  TrendingUp,
  Users,
  Headphones,
  CheckCircle2,
  ArrowUpRight,
  LayoutGrid,
  Layers,
  Sparkles,
  Focus,
} from "lucide-react";

const SERVICES_DATA = [
  {
    id: "admin",
    category: "Administrative Support",
    shortName: "Admin Support",
    tagline: "Streamline daily operations and reclaim your executive hours.",
    icon: Briefcase,
    badge: "Core Operations",
    services: [
      "Email and Calendar Management",
      "Data Entry and Document Preparation",
      "Customer Support",
      "File and Record Management",
    ],
  },
  {
    id: "creative",
    category: "Creative Support",
    shortName: "Creative",
    tagline: "Consistent, high-converting brand assets delivered on schedule.",
    icon: Palette,
    badge: "Brand & Content",
    services: [
      "Graphic Design Assistance",
      "Blog & Website Content",
      "Visual Asset Preparation",
      "Video Content Editing",
      "Marketing Collateral Development",
    ],
  },
  {
    id: "cx",
    category: "Customer Experience",
    shortName: "Customer Exp.",
    tagline: "Turn first-time buyers into lifelong brand advocates.",
    icon: HeartHandshake,
    badge: "Retention",
    services: [
      "Customer Query Management",
      "Client Onboarding",
      "Customer Feedback Collection",
      "Service Request Tracking",
      "Client Relationship Support",
    ],
  },
  {
    id: "tech",
    category: "Technical Assistance",
    shortName: "Tech & CRM",
    tagline: "Keep your digital infrastructure, data, and storefronts running smoothly.",
    icon: Cpu,
    badge: "Digital Ops",
    services: [
      "Website Management",
      "IT Support",
      "CRM Management",
      "Data Analysis",
      "E-commerce Support",
    ],
  },
  {
    id: "specialized",
    category: "Specialized Services",
    shortName: "Specialized",
    tagline: "Domain-trained virtual specialists for high-compliance industries.",
    icon: Scale,
    badge: "Industry Specific",
    services: [
      "Legal Administrative Assistance",
      "Real Estate Support",
      "Medical Transcription",
      "Bookkeeping and Accounting",
      "Market Research",
    ],
  },
  {
    id: "personal",
    category: "Personal Assistance",
    shortName: "Personal",
    tagline: "White-glove lifestyle and executive coordination behind the scenes.",
    icon: CalendarClock,
    badge: "Executive Care",
    services: [
      "Travel and Event Planning",
      "Personal Scheduling",
      "Task Management",
      "Gift and Holiday Planning",
    ],
  },
  {
    id: "project",
    category: "Project Management",
    shortName: "Projects",
    tagline: "Keep deliverables on track, teams aligned, and deadlines met.",
    icon: Kanban,
    badge: "Execution",
    services: [
      "Project Timeline Tracking",
      "Task Coordination",
      "Team Communication",
      "Progress Monitoring",
      "Project Documentation",
    ],
  },
  {
    id: "sales",
    category: "Sales & Business Development",
    shortName: "Sales & Growth",
    tagline: "Fill your pipeline and keep your CRM spotless while you close deals.",
    icon: TrendingUp,
    badge: "Revenue Engine",
    services: [
      "Prospect Research",
      "Lead Database Management",
      "Sales Pipeline Updates",
      "Proposal Preparation",
      "Sales Activity Reporting",
    ],
  },
  {
    id: "hr",
    category: "Human Resources Support",
    shortName: "HR Support",
    tagline: "Frictionless hiring, onboarding, and people operations.",
    icon: Users,
    badge: "People Ops",
    services: [
      "Recruitment Assistance",
      "Employee Onboarding",
      "Employee Records Management",
      "HR Policy Documentation",
    ],
  },
  {
    id: "receptionist",
    category: "Virtual Receptionist Services",
    shortName: "Receptionist",
    tagline: "Never miss a high-value lead with responsive front-desk coverage.",
    icon: Headphones,
    badge: "Front Desk",
    services: ["Incoming Call Handling", "Appointment Setting", "Live Chat Support"],
  },
];

const pad = (n) => String(n).padStart(2, "0");

/* CSS-only keyframes (transform/translate only => GPU friendly) */
const CSS = `
@keyframes va-drift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(44px,30px,0)}}
@keyframes va-float{0%,100%{translate:0 0}50%{translate:0 -8px}}
@keyframes va-shine{0%,55%{transform:translateX(-140%) skewX(-14deg)}100%{transform:translateX(260%) skewX(-14deg)}}
@keyframes va-dot{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(10px,-16px,0) scale(1.3)}}
`;

/* ─── Bouncy entrance variants ─── */
const headerParent = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const popWord = {
  hidden: { opacity: 0, y: 54, rotate: 7, scale: 0.7 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 11 },
  },
};
const popIn = {
  hidden: { opacity: 0, scale: 0.4, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 14 },
  },
};
const slideFade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const toggleIn = {
  hidden: { opacity: 0, x: 40, scale: 0.8 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 14 },
  },
};

/* Explorer variants */
const railParent = { hidden: {}, show: { transition: { staggerChildren: 0.055 } } };
const railItem = {
  hidden: { opacity: 0, y: 26, scale: 0.88 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 15 },
  },
};
const stageVariants = {
  enter: (d) => ({ opacity: 0, x: d * 44 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.32, ease: "easeOut" } },
  exit: (d) => ({ opacity: 0, x: d * -44, transition: { duration: 0.18 } }),
};
const fadeUp = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0, transition: { delay: 0.1 } },
};
const listVariants = {
  enter: {},
  center: { transition: { staggerChildren: 0.07, delayChildren: 0.16 } },
};
const serviceItem = {
  enter: { opacity: 0, y: 18, scale: 0.94 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 330, damping: 17 },
  },
};

/* Light card wrapper with cursor spotlight */
function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(17,138,178,0.14), transparent 80%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden bg-[#f3f8fb] text-[var(--text-main)] ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* ─── View-All card: 3D tilt + cursor "Focus view" chip + click => explorer ─── */
function AllCard({ cat, index, onOpen, reduce }) {
  const Icon = cat.icon;
  const wide = index === SERVICES_DATA.length - 1;

  const rx = useSpring(0, { stiffness: 220, damping: 20 });
  const ry = useSpring(0, { stiffness: 220, damping: 20 });
  const cx = useSpring(0, { stiffness: 420, damping: 32 });
  const cy = useSpring(0, { stiffness: 420, damping: 32 });

  const place = (e, jump) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const chipX = Math.max(8, Math.min(x + 16, r.width - 132));
    const chipY = Math.max(8, Math.min(y + 16, r.height - 46));
    if (jump) {
      cx.jump(chipX);
      cy.jump(chipY);
    } else {
      cx.set(chipX);
      cy.set(chipY);
    }
    return { px: x / r.width, py: y / r.height };
  };

  const onEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    place(e, true);
  };
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const { px, py } = place(e, false);
    if (reduce) return;
    ry.set((px - 0.5) * 9);
    rx.set(-(py - 0.5) * 9);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: index % 2 ? 4 : -4, scale: 0.86 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: "spring",
        stiffness: 230,
        damping: 13,
        mass: 0.9,
        delay: (index % 3) * 0.1,
      }}
      className={`h-full ${wide ? "lg:col-span-3" : ""}`}
    >
      <motion.div
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={() => onOpen(index)}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        className="group/card relative h-full cursor-pointer"
      >
        {/* Cursor-follow chip (sirf mouse devices par) */}
        <motion.span
          aria-hidden="true"
          style={{ x: cx, y: cy }}
          className="pointer-events-none absolute top-0 left-0 z-30 hidden scale-50 items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg shadow-[#00509d]/40 transition-[opacity,scale] duration-300 group-hover/card:scale-100 group-hover/card:opacity-100 [@media(hover:hover)]:flex"
        >
          <Focus className="h-3.5 w-3.5" />
          Focus view
        </motion.span>

        <SpotlightCard className="h-full rounded-2xl border border-white/70 p-6 shadow-lg shadow-black/20 transition-shadow duration-300 group-hover/card:shadow-2xl group-hover/card:shadow-[#118ab2]/25 sm:p-7">
          {/* Watermark icon */}
          <Icon
            aria-hidden="true"
            strokeWidth={1.2}
            className="pointer-events-none absolute -top-5 -right-5 h-36 w-36 text-[color:var(--blue-3)]/10 transition-transform duration-700 ease-out group-hover/card:-translate-x-3 group-hover/card:translate-y-2 group-hover/card:rotate-12 group-hover/card:scale-110 motion-reduce:transition-none"
          />

          {/* Shine sweep */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-y-4 -left-1/3 w-1/4 -skew-x-12 -translate-x-full bg-linear-to-r from-transparent via-[#118ab2]/15 to-transparent transition-transform duration-1000 ease-out group-hover/card:translate-x-[520%] motion-reduce:hidden"
          />

          <div className="relative flex h-full flex-col">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--blue-1)] to-[var(--blue-3)] text-white shadow-md shadow-[#00509d]/30 transition-transform duration-500 group-hover/card:-rotate-6 group-hover/card:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-[#118ab2]/30 bg-white px-3 py-1 text-xs font-semibold text-[var(--blue-2)]">
                {pad(index + 1)}
              </span>
            </div>

            <h3 className="heading-h4 text-[var(--blue-1)]">{cat.category}</h3>
            <span className="mt-3 mb-5 block h-0.5 w-10 rounded-full bg-gradient-to-r from-[var(--blue-2)] to-[var(--blue-3)] transition-all duration-500 group-hover/card:w-24" />

            <ul
              className={
                wide ? "mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3" : "mb-6 space-y-2.5"
              }
            >
              {cat.services.map((srv, i) => (
                <li
                  key={srv}
                  style={{ transitionDelay: `${i * 45}ms` }}
                  className="flex items-start gap-2.5 text-sm transition-transform duration-300 group-hover/card:translate-x-1"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue-2)]" />
                  <span className="font-medium text-[var(--text-main)]">{srv}</span>
                </li>
              ))}
            </ul>

            {/* Footer: Focus view button (touch + keyboard ke liye bhi) */}
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--blue-1)]/10 pt-4">
              <span className="text-xs font-medium text-[color:var(--text-main)]/60">
                {cat.services.length} services
              </span>
              <button
                type="button"
                aria-label={`Focus view: ${cat.category}`}
                className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[var(--blue-2)]/30 px-4 py-2 text-xs font-semibold text-[var(--blue-2)] transition-colors duration-300 group-hover/card:border-transparent group-hover/card:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue-3)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[var(--blue-2)] to-[var(--blue-3)] transition-transform duration-500 ease-out group-hover/card:scale-x-100"
                />
                <Focus className="relative h-3.5 w-3.5" />
                <span className="relative">Focus view</span>
                <ArrowUpRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
              </button>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}

export default function VirtualAssistantOffered({ onSelectService }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [viewMode, setViewMode] = useState("all"); // 'all' (default) | 'interactive'
  const sectionRef = useRef(null);
  const tabsRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.1 });
  const reduce = useReducedMotion();

  const activeCategory = SERVICES_DATA[activeIndex];
  const ActiveIcon = activeCategory.icon;
  const paused = inView ? "" : "[animation-play-state:paused]";

  // Mobile chips ko horizontally center karo (page vertical scroll nahi hota)
  const centerTab = (idx) => {
    const box = tabsRef.current;
    const el = box?.children[idx];
    if (box && el && box.scrollWidth > box.clientWidth) {
      box.scrollTo({
        left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  const goTo = (idx) => {
    setDirection(idx >= activeIndex ? 1 : -1);
    setActiveIndex(idx);
    centerTab(idx);
  };

  // View-All card click => us category ko Focus view (explorer) me kholo
  const openFocus = (idx) => {
    setDirection(1);
    setActiveIndex(idx);
    setViewMode("interactive");
    requestAnimationFrame(() =>
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const onRailKey = (e) => {
    const n = SERVICES_DATA.length;
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (activeIndex + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (activeIndex - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    goTo(next);
    tabsRef.current?.children[next]?.focus({ preventScroll: true });
  };

  const toggleBtn = (mode, label, IconCmp) => (
    <button
      type="button"
      onClick={() => setViewMode(mode)}
      aria-pressed={viewMode === mode}
      className={`relative flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
        viewMode === mode ? "text-white" : "text-[var(--text-muted)] hover:text-white"
      }`}
    >
      {viewMode === mode && (
        <motion.span
          layoutId="viewModePill"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] shadow-md"
        />
      )}
      <IconCmp className="relative z-10 h-4 w-4 text-[#118ab2]" />
      <span className="relative z-10">{label}</span>
    </button>
  );

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="va-services"
        ref={sectionRef}
        className="relative scroll-mt-4 overflow-hidden bg-[var(--bg-main)] py-20 text-[var(--white)] selection:bg-[#118ab2] selection:text-white md:py-28"
      >
        <style>{CSS}</style>

        {/* Ambient glows: pop-in once, phir CSS drift */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/4"
          initial={{ scale: 0.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <div
            className={`h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,80,157,0.35),transparent_65%)] animate-[va-drift_18s_ease-in-out_infinite] motion-reduce:animate-none ${paused}`}
          />
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 right-1/4"
          initial={{ scale: 0.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
        >
          <div
            className={`h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(17,138,178,0.25),transparent_65%)] animate-[va-drift_22s_ease-in-out_infinite_reverse] motion-reduce:animate-none ${paused}`}
          />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ─── Header: bouncy word-by-word entrance ─── */}
          <motion.div
            variants={headerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
          >
            <div className="max-w-2xl">
              

              <h2 className="heading-h2 tracking-tight text-[var(--white)]">
                {["Virtual", "Assistant", "Services"].map((w) => (
                  <React.Fragment key={w}>
                    <motion.span variants={popWord} className="inline-block origin-bottom">
                      {w}
                    </motion.span>{" "}
                  </React.Fragment>
                ))}
                {["We", "Offer"].map((w, i) => (
                  <React.Fragment key={w}>
                    <motion.span
                      variants={popWord}
                      className="inline-block origin-bottom bg-gradient-to-r from-[#118ab2] via-[#4cc9f0] to-[#118ab2] bg-clip-text text-transparent"
                    >
                      {w}
                    </motion.span>
                    {i === 0 ? " " : null}
                  </React.Fragment>
                ))}
              </h2>

              <motion.p
                variants={slideFade}
                className="mt-4 text-base text-[var(--text-muted)] sm:text-lg"
              >
                Support across the functions that keep your business running.
              </motion.p>
            </div>

            <motion.div
              variants={toggleIn}
              className="inline-flex self-start rounded-xl border border-[#118ab2]/25 bg-[var(--bg-soft)] p-1 md:self-auto"
              role="group"
              aria-label="Service layout mode"
            >
              {toggleBtn("all", "View All (10)", LayoutGrid)}
              {toggleBtn("interactive", "Interactive Explorer", Layers)}
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            {viewMode === "all" ? (
              /* ─── MODE 1 (default): VIEW ALL ─── */
              <motion.div
                key="all"
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
                className="grid grid-cols-1 gap-6 pb-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {SERVICES_DATA.map((cat, index) => (
                  <AllCard
                    key={cat.id}
                    cat={cat}
                    index={index}
                    onOpen={openFocus}
                    reduce={reduce}
                  />
                ))}
              </motion.div>
            ) : (
              /* ─── MODE 2: INTERACTIVE EXPLORER (Focus view) ─── */
              <motion.div
                key="interactive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                onAnimationStart={() => centerTab(activeIndex)}
                className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10"
              >
                {/* Navigation rail */}
                <div className="lg:col-span-5">
                  <motion.div
                    ref={tabsRef}
                    variants={railParent}
                    initial="hidden"
                    animate="show"
                    role="tablist"
                    aria-label="Service Categories"
                    onKeyDown={onRailKey}
                    className="no-scrollbar relative flex snap-x gap-2.5 overflow-x-auto p-1 pb-3 lg:flex-col lg:overflow-visible lg:pb-1"
                  >
                    {SERVICES_DATA.map((item, idx) => {
                      const Icon = item.icon;
                      const isActive = idx === activeIndex;

                      return (
                        <motion.button
                          key={item.id}
                          variants={railItem}
                          role="tab"
                          aria-selected={isActive}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => goTo(idx)}
                          className={`group relative flex shrink-0 cursor-pointer snap-center items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors duration-200 ${
                            isActive
                              ? "border-transparent text-white"
                              : "border-white/70 bg-[#f3f8fb] text-[var(--text-main)] hover:border-[#118ab2]"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="railActive"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] shadow-[0_10px_30px_rgba(0,80,157,0.4)]"
                            />
                          )}

                          <div className="relative z-10 flex items-center gap-3.5">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                isActive
                                  ? "bg-white/15 text-white"
                                  : "bg-[var(--blue-2)]/10 text-[var(--blue-2)] group-hover:bg-[var(--blue-2)] group-hover:text-white"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            <div>
                              <span className="block text-sm leading-snug font-semibold sm:text-[15px]">
                                <span className="lg:hidden">{item.shortName}</span>
                                <span className="hidden lg:inline">{item.category}</span>
                              </span>
                              <span
                                className={`mt-0.5 hidden text-xs lg:block ${
                                  isActive ? "text-white/70" : "text-[color:var(--text-main)]/60"
                                }`}
                              >
                                {item.services.length} specialized capabilities
                              </span>
                            </div>
                          </div>

                          <span
                            className={`relative z-10 hidden h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-semibold transition-colors lg:inline-flex ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-[var(--blue-2)]/10 text-[var(--blue-2)]"
                            }`}
                          >
                            {pad(item.services.length)}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Detail stage */}
                <div className="lg:sticky lg:top-24 lg:col-span-7">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="relative overflow-hidden rounded-3xl p-px shadow-2xl shadow-black/30"
                  >
                    {/* Rotating gradient border */}
                    <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                      <span
                        className={`aspect-square w-[200%] shrink-0 animate-spin bg-[conic-gradient(from_0deg,transparent_0_70%,var(--blue-3)_86%,var(--accent-pink)_94%,transparent_100%)] [animation-duration:7s] motion-reduce:animate-none ${paused}`}
                      />
                    </div>

                    <SpotlightCard className="relative rounded-[calc(1.5rem-1px)] p-6 sm:p-8 lg:p-10">
                      {/* Floating dots */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-[14%] right-[10%] h-3 w-3 rounded-full bg-[var(--blue-3)]/25 animate-[va-dot_6s_ease-in-out_infinite] motion-reduce:animate-none ${paused}`}
                      />
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-[46%] right-[4%] h-2 w-2 rounded-full bg-[var(--blue-2)]/30 animate-[va-dot_7s_ease-in-out_infinite] [animation-delay:-2s] motion-reduce:animate-none ${paused}`}
                      />
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute bottom-[22%] left-[46%] h-2.5 w-2.5 rounded-full bg-[var(--blue-3)]/20 animate-[va-dot_8s_ease-in-out_infinite] [animation-delay:-4s] motion-reduce:animate-none ${paused}`}
                      />

                      {/* Category progress */}
                      <div className="mb-7 h-1 overflow-hidden rounded-full bg-[var(--blue-1)]/10">
                        <motion.div
                          className="h-full origin-left rounded-full bg-gradient-to-r from-[var(--blue-2)] to-[var(--blue-3)]"
                          initial={false}
                          animate={{ scaleX: (activeIndex + 1) / SERVICES_DATA.length }}
                          transition={{ type: "spring", stiffness: 140, damping: 20 }}
                        />
                      </div>

                      <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                          key={activeCategory.id}
                          custom={direction}
                          variants={stageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="relative"
                        >
                          {/* Giant watermark icon */}
                          <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-8 -bottom-16 text-[color:var(--blue-3)]/10"
                            initial={{ rotate: -25, scale: 0.7, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          >
                            <ActiveIcon className="h-60 w-60" strokeWidth={1} />
                          </motion.div>

                          {/* Top meta row */}
                          <div className="relative flex items-center gap-4 border-b border-[var(--blue-1)]/10 pb-6">
                            <div className="animate-[va-float_4s_ease-in-out_infinite] motion-reduce:animate-none">
                              <motion.div
                                variants={{
                                  enter: { scale: 0.4, rotate: -25, opacity: 0 },
                                  center: {
                                    scale: 1,
                                    rotate: 0,
                                    opacity: 1,
                                    transition: { type: "spring", stiffness: 260, damping: 12 },
                                  },
                                }}
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--blue-1)] via-[var(--blue-2)] to-[var(--blue-3)] text-white shadow-lg shadow-[#00509d]/30"
                              >
                                <ActiveIcon className="h-7 w-7" />
                              </motion.div>
                            </div>
                            <div className="min-w-0">
                              <span className="inline-block text-xs font-semibold tracking-widest text-[var(--blue-2)] uppercase">
                                {activeCategory.badge} • {pad(activeIndex + 1)} / {SERVICES_DATA.length}
                              </span>
                              <h3 className="heading-h3 mt-1 overflow-hidden text-[var(--blue-1)]">
                                <motion.span
                                  className="block"
                                  variants={{
                                    enter: { y: "110%" },
                                    center: {
                                      y: 0,
                                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                    },
                                  }}
                                >
                                  {activeCategory.category}
                                </motion.span>
                              </h3>
                            </div>
                          </div>

                          <motion.p
                            variants={fadeUp}
                            className="relative mt-5 text-sm text-[color:var(--text-main)]/75 sm:text-base"
                          >
                            {activeCategory.tagline}
                          </motion.p>

                          {/* Staggered services */}
                          <motion.div
                            variants={listVariants}
                            className="relative mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2"
                          >
                            {activeCategory.services.map((service) => (
                              <motion.div
                                key={service}
                                variants={serviceItem}
                                whileHover={{ y: -3 }}
                                className="group/item flex items-start gap-3 rounded-xl border border-[#118ab2]/20 bg-white p-4 shadow-sm shadow-[#00509d]/5 transition-[box-shadow,border-color] duration-200 hover:border-[#118ab2] hover:shadow-lg hover:shadow-[#00509d]/15"
                              >
                                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--blue-2)] transition-transform duration-200 group-hover/item:scale-110">
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-3 w-3"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <motion.path
                                      d="M5 12.5l4.5 4.5L19 7.5"
                                      variants={{
                                        enter: { pathLength: 0 },
                                        center: {
                                          pathLength: 1,
                                          transition: { duration: 0.3, delay: 0.25 },
                                        },
                                      }}
                                    />
                                  </svg>
                                </span>
                                <span className="text-sm leading-snug font-medium text-[var(--text-main)] sm:text-[15px]">
                                  {service}
                                </span>
                              </motion.div>
                            ))}
                          </motion.div>

                          {/* Footer */}
                          <div className="relative mt-8 flex flex-col justify-between gap-4 border-t border-[var(--blue-1)]/10 pt-6 sm:flex-row sm:items-center">
                            <button
                              type="button"
                              onClick={() =>
                                onSelectService
                                  ? onSelectService(activeCategory.category)
                                  : document
                                      .getElementById("contact")
                                      ?.scrollIntoView({ behavior: "smooth" })
                              }
                              className="group/btn relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[var(--blue-2)] to-[var(--blue-3)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#00509d]/30 transition-all hover:brightness-110"
                            >
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/30 to-transparent animate-[va-shine_3.2s_ease-in-out_infinite] motion-reduce:hidden"
                              />
                              <Sparkles className="relative h-4 w-4 text-[var(--accent-pink)]" />
                              <span className="relative">Delegate {activeCategory.shortName}</span>
                              <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                            </button>

                            <div className="flex items-center justify-center gap-1.5">
                              {SERVICES_DATA.map((_, dotIdx) => (
                                <button
                                  key={dotIdx}
                                  type="button"
                                  aria-label={`Go to category ${dotIdx + 1}`}
                                  onClick={() => goTo(dotIdx)}
                                  className={`h-2 cursor-pointer rounded-full transition-all ${
                                    dotIdx === activeIndex
                                      ? "w-6 bg-[var(--blue-2)]"
                                      : "w-2 bg-[var(--blue-1)]/20 hover:bg-[var(--blue-1)]/40"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </SpotlightCard>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Animation helpers ───────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.55, delay, ease: [0.25, 1, 0.35, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

// ── Small reusable atoms ────────────────────────────────────
const Divider = () => (
  <div className="w-full h-px my-16" style={{ background: "rgba(17,138,178,0.18)" }} />
);

const SectionLabel = ({ children }) => (
  <p
    className="text-xs font-bold tracking-widest uppercase mb-3"
    style={{ color: "var(--blue-3)" }}
  >
    {children}
  </p>
);

const CheckRow = ({ children, delay = 0 }) => (
  <motion.div
    {...fadeUp(delay)}
    className="flex items-start gap-3 py-2.5 border-b"
    style={{ borderColor: "rgba(17,138,178,0.12)" }}
  >
    <span
      className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
      style={{
        background: "rgba(17,138,178,0.12)",
        border: "1px solid rgba(17,138,178,0.35)",
      }}
    >
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#118ab2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
      {children}
    </span>
  </motion.div>
);

// ── Numbered Section Block (timeline style) ─────────────────
const NumberedSection = ({ num, icon, title, description, items, delay = 0 }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div {...fadeUp(delay)} className="relative pl-10 mb-0">
      {/* vertical connector */}
      <div
        className="absolute left-3.5 top-10 bottom-0 w-px"
        style={{ background: "rgba(17,138,178,0.2)" }}
      />

      {/* number circle */}
      <div
        className="absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          background: "var(--bg-soft)",
          border: "1.5px solid var(--blue-3)",
          color: "var(--blue-3)",
        }}
      >
        {String(num).padStart(2, "0")}
      </div>

      {/* card */}
      <div
        className="rounded-2xl mb-4 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(17,138,178,0.15)",
        }}
      >
        {/* header — clickable to expand */}
        <button
          className="w-full text-left px-6 py-5 flex items-center gap-4"
          onClick={() => setOpen(!open)}
        >
          <span className="text-xl shrink-0">{icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-white leading-tight">{title}</h3>
            {description && (
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                {description}
              </p>
            )}
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 text-lg font-light"
            style={{ color: "var(--blue-3)" }}
          >
            +
          </motion.span>
        </button>

        {/* expandable items */}
        <AnimatePresence initial={false}>
          {open && items && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.35, 1] }}
              className="overflow-hidden"
            >
              <div
                className="px-6 pb-5 pt-1"
                style={{ borderTop: "1px solid rgba(17,138,178,0.12)" }}
              >
                {items.map((item, i) => (
                  <CheckRow key={i} delay={i * 0.05}>{item}</CheckRow>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ── Deliverable chip ────────────────────────────────────────
const Chip = ({ children, delay }) => (
  <motion.div
    {...fadeUp(delay)}
    whileHover={{ y: -3, borderColor: "rgba(17,138,178,0.6)" }}
    className="flex items-center gap-3 px-5 py-4 rounded-xl text-sm transition-all duration-200"
    style={{
      border: "1px solid rgba(17,138,178,0.22)",
      background: "rgba(17,138,178,0.05)",
      color: "rgba(255,255,255,0.8)",
    }}
  >
    <span style={{ color: "var(--blue-3)", fontSize: 10 }}>◆</span>
    {children}
  </motion.div>
);

// ── Benefit row ─────────────────────────────────────────────
const BenefitRow = ({ text, i, delay }) => (
  <motion.div
    {...fadeUp(delay)}
    className="flex items-start gap-5 py-5 border-b"
    style={{ borderColor: "rgba(17,138,178,0.12)" }}
  >
    <span
      className="shrink-0 text-3xl font-bold"
      style={{ color: "rgba(17,138,178,0.2)", lineHeight: 1 }}
    >
      {String(i + 1).padStart(2, "0")}
    </span>
    <p className="text-sm leading-relaxed pt-1" style={{ color: "rgba(255,255,255,0.68)" }}>
      {text}
    </p>
  </motion.div>
);

// ════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════
const ServiceDetailPage = ({ data }) => {
  const {
    badge,
    heroTitle,
    heroSubtitle,
    price,
    originalPrice,
    currency = "USD",
    period,
    introTitle,
    introText,
    companyBlurb,
    overviewTitle,
    overviewText,
    inclusions,
    sections,
    deliverables,
    benefits,
    conclusionTitle,
    conclusionText,
    ctaLabel = "Get Started",
    onCta,
  } = data;

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "var(--bg-main)", color: "#fff" }}
    >
      {/* ── Top accent bar ── */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 z-50"
        style={{ background: "linear-gradient(90deg, var(--blue-2), var(--blue-3))" }}
      />

      {/* ── Subtle grid bg ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,138,178,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(17,138,178,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Soft glow blobs ── */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,80,157,0.14) 0%, transparent 70%)",
          top: -200,
          left: -200,
        }}
      />
      <div
        className="fixed pointer-events-none z-0"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(17,138,178,0.1) 0%, transparent 70%)",
          bottom: 0,
          right: -150,
        }}
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 pt-20 pb-28">

        {/* ════ HERO ════ */}
        <section className="mb-20">
          {/* badge */}
          <motion.span
            {...fadeIn(0)}
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6"
            style={{
              background: "rgba(17,138,178,0.12)",
              border: "1px solid rgba(17,138,178,0.3)",
              color: "var(--blue-3)",
            }}
          >
            {badge}
          </motion.span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex-1">
              <motion.h1
                {...fadeUp(0.06)}
                className="font-black leading-none mb-4"
                style={{
                  fontSize: "clamp(40px, 7vw, 72px)",
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                {heroTitle}
              </motion.h1>
              {heroSubtitle && (
                <motion.p
                  {...fadeUp(0.12)}
                  className="text-sm tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {heroSubtitle}
                </motion.p>
              )}
            </div>

            {/* Price block */}
            <motion.div
              {...fadeUp(0.16)}
              className="shrink-0 rounded-2xl px-7 py-5 text-right"
              style={{
                background: "var(--bg-soft)",
                border: "1px solid rgba(17,138,178,0.3)",
              }}
            >
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                Starting at
              </p>
              <div className="flex items-baseline gap-2 justify-end">
                <span
                  className="font-black"
                  style={{ fontSize: 44, color: "var(--accent-pink)", lineHeight: 1 }}
                >
                  {price}
                </span>
                {originalPrice && (
                  <span className="text-lg line-through" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {originalPrice}
                  </span>
                )}
              </div>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                {currency}{period ? ` / ${period}` : ""}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ════ INTRO ════ */}
        {(introTitle || introText) && (
          <section className="mb-20">
            {introTitle && (
              <motion.h2
                {...fadeUp(0)}
                className="font-bold mb-4"
                style={{
                  fontSize: "clamp(20px, 3.5vw, 28px)",
                  color: "var(--blue-3)",
                  letterSpacing: "-0.01em",
                }}
              >
                {introTitle}
              </motion.h2>
            )}
            {introText && (
              <motion.p
                {...fadeUp(0.08)}
                className="text-sm leading-7"
                style={{ color: "rgba(255,255,255,0.58)" }}
              >
                {introText}
              </motion.p>
            )}
            {companyBlurb && (
              <motion.blockquote
                {...fadeUp(0.14)}
                className="mt-6 pl-5 text-sm leading-7"
                style={{
                  borderLeft: "2px solid var(--blue-3)",
                  color: "rgba(255,255,255,0.45)",
                  fontStyle: "italic",
                }}
              >
                {companyBlurb}
              </motion.blockquote>
            )}
          </section>
        )}

        {/* ════ OVERVIEW + INCLUSIONS (2-col) ════ */}
        {(overviewText || (inclusions && inclusions.length > 0)) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {overviewText && (
                <motion.div
                  {...fadeUp(0)}
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--bg-soft)",
                    border: "1px solid rgba(17,138,178,0.15)",
                  }}
                >
                  <SectionLabel>Overview</SectionLabel>
                  {overviewTitle && (
                    <h3 className="font-semibold text-white text-base mb-2">{overviewTitle}</h3>
                  )}
                  <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {overviewText}
                  </p>
                </motion.div>
              )}

              {inclusions && inclusions.length > 0 && (
                <motion.div
                  {...fadeUp(0.08)}
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{
                    background: "var(--bg-soft)",
                    border: "1px solid rgba(17,138,178,0.28)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: "linear-gradient(90deg, var(--blue-2), var(--blue-3))" }}
                  />
                  <SectionLabel>Inclusions</SectionLabel>
                  <div className="space-y-0">
                    {inclusions.map((item, i) => (
                      <CheckRow key={i} delay={i * 0.06}>{item}</CheckRow>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            <Divider />
          </>
        )}

        {/* ════ CTA BUTTON ════ */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-16">
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(17,138,178,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={onCta}
            className="relative overflow-hidden text-white font-semibold text-sm tracking-widest uppercase px-12 py-4 rounded-xl"
            style={{
              background: "linear-gradient(135deg, var(--blue-1), var(--blue-3))",
              border: "1px solid rgba(17,138,178,0.5)",
            }}
          >
            <span className="relative z-10">{ctaLabel}</span>
            {/* shine sweep */}
            <motion.span
              animate={{ x: ["−100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              className="absolute inset-y-0 w-1/3 z-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              }}
            />
          </motion.button>
        </motion.div>

        {/* ════ SECTIONS — numbered accordion ════ */}
        {sections && sections.length > 0 && (
          <section className="mb-6">
            <motion.div {...fadeUp(0)} className="mb-8">
              <SectionLabel>What's Included</SectionLabel>
              <h2
                className="font-bold"
                style={{
                  fontSize: "clamp(18px, 3vw, 26px)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Every deliverable, detailed
              </h2>
            </motion.div>

            {sections.map((sec, i) => (
              <NumberedSection
                key={i}
                num={i + 1}
                icon={sec.icon}
                title={sec.title}
                description={sec.description}
                items={sec.items}
                delay={i * 0.07}
              />
            ))}
          </section>
        )}

        <Divider />

        {/* ════ DELIVERABLES ════ */}
        {deliverables && deliverables.items && deliverables.items.length > 0 && (
          <section className="mb-16">
            <motion.div {...fadeUp(0)} className="mb-6">
              <SectionLabel>Deliverables</SectionLabel>
              <h2
                className="font-bold mb-2"
                style={{
                  fontSize: "clamp(18px, 3vw, 26px)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                What you walk away with
              </h2>
              {deliverables.description && (
                <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {deliverables.description}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {deliverables.items.map((item, i) => (
                <Chip key={i} delay={i * 0.08}>{item}</Chip>
              ))}
            </div>
          </section>
        )}

        {/* ════ KEY BENEFITS ════ */}
        {benefits && benefits.items && benefits.items.length > 0 && (
          <section className="mb-16">
            <motion.div {...fadeUp(0)} className="mb-4">
              <SectionLabel>Key Benefits</SectionLabel>
              <h2
                className="font-bold mb-2"
                style={{
                  fontSize: "clamp(18px, 3vw, 26px)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Why this works
              </h2>
              {benefits.intro && (
                <p className="text-xs leading-6" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {benefits.intro}
                </p>
              )}
            </motion.div>

            <div className="mt-2">
              {benefits.items.map((b, i) => (
                <BenefitRow key={i} text={b} i={i} delay={i * 0.09} />
              ))}
            </div>
          </section>
        )}

        {/* ════ CONCLUSION ════ */}
        {(conclusionTitle || conclusionText) && (
          <motion.section
            {...fadeUp(0)}
            className="relative rounded-2xl px-8 py-8 overflow-hidden"
            style={{
              background: "var(--bg-soft)",
              border: "1px solid rgba(17,138,178,0.25)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg, var(--blue-1), var(--blue-3))" }}
            />

            {/* large decorative quote mark */}
            <span
              className="absolute right-6 top-2 text-8xl font-black pointer-events-none select-none"
              style={{ color: "rgba(17,138,178,0.08)", lineHeight: 1 }}
            >
              "
            </span>

            {conclusionTitle && (
              <SectionLabel>{conclusionTitle}</SectionLabel>
            )}
            {conclusionText && (
              <p className="text-sm leading-7 relative z-10" style={{ color: "rgba(255,255,255,0.6)" }}>
                {conclusionText}
              </p>
            )}
          </motion.section>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// DEMO DATA
// ════════════════════════════════════════════════════════════
const DEMO_DATA = {
  badge: "Matrix Maximizer · $79",
  heroTitle: "Matrix Maximizer",
  heroSubtitle: "A Kick Start to Your Digital Journey",
  price: "$79",
  currency: "USD",

  introTitle: "We Drive Success, You Reap Rewards",
  introText:
    "In the vast landscape of the digital realm, MakeOlix stands out as a beacon of innovation and expertise. As a leading Digital Marketing Company, we redefine how brands connect with their audiences, always going beyond the lead.",
  companyBlurb:
    "MakeOlix Consulting Inc drives business transformation with innovative solutions in strategy, operations, and digital marketing. Their expert team ensures tailored, customer-focused approaches for growth, efficiency, and sustainable success.",

  overviewTitle: "Service Overview",
  overviewText:
    "Our $79 SEO service is designed to optimize 5 pages of your website by addressing key technical, content, and user experience issues. This service lays the foundation for improved search engine rankings and user satisfaction.",

  inclusions: [
    "Onsite Optimization",
    "Content Optimization",
    "UI/UX Optimization",
    "Audit Report",
    "Strategy Report",
  ],

  sections: [
    {
      icon: "⚙️",
      title: "Onsite Optimization",
      description:
        "Enhancing the technical elements of your website to improve search engine visibility, performance, user experience, and overall site functionality.",
      items: [
        "Schema Code Implementation",
        "ALT Tag Optimization",
        "404 Error Pages",
        "Canonical Tag Issues",
      ],
    },
    {
      icon: "✍️",
      title: "Content Optimization",
      description:
        "Enhancing the quality, relevance, and value of your website content by aligning it with user intent and adhering to SEO best practices.",
      items: ["Content Relevance & Clarity", "Duplicate Content Check"],
    },
    {
      icon: "🎨",
      title: "UI/UX Optimization",
      description:
        "Optimize your website's design and functionality to boost user experience, engagement, and satisfaction.",
      items: ["Header Optimization", "Footer Optimization"],
    },
    {
      icon: "📊",
      title: "Audit Report",
      description:
        "Conduct a thorough analysis of your website's technical and performance aspects to deliver a seamless user experience.",
      items: ["Technical SEO Errors", "Schema Markup Review"],
    },
    {
      icon: "🗺️",
      title: "Strategy Report",
      description:
        "Develop a strategic roadmap for continuous optimization and sustainable growth.",
      items: [
        "Keyword Strategy",
        "Content Recommendations",
        "Backlink Opportunities",
        "Actionable Roadmap",
      ],
    },
  ],

  deliverables: {
    description:
      "Comprehensive website analysis, design enhancements, performance optimization, and regular reports to track progress.",
    items: [
      "Optimized 5 Pages",
      "Comprehensive Audit Report",
      "Customized Strategy Plan",
    ],
  },

  benefits: {
    intro:
      "For just $79, our service provides expert website optimization, boosting performance and user experience. Expect faster load times, smoother navigation, and improved functionality.",
    items: [
      "Affordable yet comprehensive service targeting critical SEO elements",
      "Immediate improvements in technical, content, and user experience aspects",
      "A solid foundation for long-term search engine performance and user engagement",
    ],
  },

  conclusionTitle: "Conclusion & Recommendations",
  conclusionText:
    "This comprehensive tool empowers your sales team to clearly articulate the scope, deliverables, and value of the service. It helps set accurate client expectations, ensuring transparency and alignment. By using this tool, your team can confidently communicate the benefits, fostering trust and enhancing the client relationship throughout the process.",

  ctaLabel: "Get Started",
  onCta: () => alert("Contact us!"),
};

export default function App() {
  return <ServiceDetailPage data={DEMO_DATA} />;
}
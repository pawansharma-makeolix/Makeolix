import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DEFAULT_HEADING = "How Does a Dropshipping Website Work?";
const DEFAULT_SUBHEADING =
  "";
const DEFAULT_STEPS = [
  {
    number: "01",
    title: "Inventory-Free Ecommerce",
    description:
      "A dropshipping website allows you to sell products online without holding inventory. When a customer places an order, the supplier handles storage, packing, and shipping, while you focus on running the store, marketing products, and managing customer experience.",
    icon: "/icons/inventory-management.png",
  },
  {
    number: "02",
    title: "Flexible Platform Options",
    description:
      "Whether you're setting up a Shopify dropshipping website or exploring best dropshipping websites for Shopify through third-party apps, the operational model remains the same.",
    icon: "/icons/platform.png",
  },
  {
    number: "03",
    title: "Lower Startup Costs",
    description:
      "Dropshipping requires no upfront inventory investment, reduces operational overhead, and allows businesses to launch quickly while testing products and markets.",
    icon: "/icons/start-up.png",
  },
  {
    number: "04",
    title: "Scalable Business Growth",
    description:
      "From startups to established brands, dropshipping provides a flexible and data-driven way to grow an ecommerce business with lower financial risk.",
    icon: "/icons/success.png",
  },
];

function StepCard({ step, index, total }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="relative">
      {/* Dotted connector — desktop only */}
      {!isLast && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.5, ease: "easeInOut" }}
          className="hidden lg:block 
absolute 
top-1/2 
-translate-y-1/2
left-[calc(50%+100px)]
w-[calc(100%-200px)]
origin-left 
pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <svg width="100%" height="20" viewBox="0 0 200 20" preserveAspectRatio="none" overflow="visible">
            <defs>
              <marker id={`arr-${index}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="var(--blue-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>
            <line x1="0" y1="10" x2="196" y2="10" stroke="var(--blue-3)" strokeWidth="1.2" strokeDasharray="5 5" strokeOpacity="0.4" markerEnd={`url(#arr-${index})`} />
          </svg>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ zIndex: 1, position: "relative" }}
      >
        {/* ── Desktop: flip card ── */}
        <div className="hidden sm:block w-full" style={{ perspective: "1000px", height: "260px" }}>
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transformStyle: "preserve-3d" }}
            onMouseEnter={e => e.currentTarget.style.transform = "rotateY(180deg)"}
            onMouseLeave={e => e.currentTarget.style.transform = "rotateY(0deg)"}
          >
            {/* Front — icon center top, heading center middle */}
            <div
              className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 p-6 overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                backgroundColor: "var(--bg-soft)",
                border: "1px solid rgba(17, 138, 178, 0.18)",
              }}
            >
              <div
                className="absolute top-4 right-5 text-5xl font-bold select-none pointer-events-none leading-none"
                style={{ color: "rgba(17, 138, 178, 0.07)" }}
              >
                {step.number}
              </div>

              {/* Icon — center, above heading */}
<div
  className="
    w-16 h-16 
    rounded-2xl
    flex items-center justify-center
    mb-4
  "
  style={{
    backgroundColor:"rgba(17,138,178,0.12)",
    border:"1px solid rgba(17,138,178,0.25)"
  }}
>
  <img
    src={step.icon}
    alt={step.title}
    className="w-8 h-8 object-contain"
  />
</div>
              {/* Heading — center */}
              <h3 className="text-center m-0" style={{ color: "#ffffff" }}>
                {step.title}
              </h3>

            
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl flex flex-col justify-center p-6 overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                backgroundColor: "var(--blue-1)",
                border: "1px solid rgba(17, 138, 178, 0.4)",
              }}
            >
              <div
                className="absolute bottom-3 right-5 text-6xl font-bold select-none pointer-events-none leading-none"
                style={{ color: "rgba(17, 138, 178, 0.1)" }}
              >
                {step.number}
              </div>

              <h4 className="mb-3 m-0" style={{ color: "var(--blue-3)" }}>
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed m-0" style={{ color: "rgba(255,255,255,0.85)" }}>
                {step.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── Mobile: static card, always shows everything ── */}
        <div
          className="sm:hidden rounded-2xl p-5 flex flex-col gap-3"
          style={{
            backgroundColor: "var(--bg-soft)",
            border: "1px solid rgba(17, 138, 178, 0.18)",
          }}
        >
          <div className="flex items-center gap-3">
<div
  className="
    w-16 h-16 
    rounded-2xl
    flex items-center justify-center
    mb-4
  "
  style={{
    backgroundColor:"rgba(17,138,178,0.12)",
    border:"1px solid rgba(17,138,178,0.25)"
  }}
>
  <img
    src={step.icon}
    alt={step.title}
    className="w-8 h-8 object-contain"
  />
</div>            <h4 className="m-0" style={{ color: "#ffffff" }}>
              {step.title}
            </h4>
          </div>
          <p className="text-sm leading-relaxed m-0" style={{ color: "var(--text-muted)" }}>
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Mobile vertical connector */}
      {!isLast && (
        <div
          className="sm:hidden mx-auto my-1 w-px h-6"
          style={{ background: "linear-gradient(to bottom, var(--blue-3), transparent)", opacity: 0.35 }}
        />
      )}
    </div>
  );
}

export function ConnectedStepSection({
  heading = DEFAULT_HEADING,
  subheading = DEFAULT_SUBHEADING,
  steps = DEFAULT_STEPS,
}) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section className="w-full py-20 md:py-28 px-4" style={{ backgroundColor: "var(--bg-main)" }}>
      <div className="max-w-7xl mx-auto">

        <div ref={headingRef} className="text-center mb-16 md:mb-20">
         
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            style={{ color: "#ffffff" }}
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-4 max-w-4xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {subheading}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-2 h-px w-24 origin-center"
            style={{ background: "linear-gradient(to right, transparent, var(--blue-3), transparent)" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} total={steps.length} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ConnectedStepSection;
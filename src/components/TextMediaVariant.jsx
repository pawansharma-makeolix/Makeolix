"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LinkRenderer from "./LinkRenderer";



const floatAnim = (delay = 0) => ({
  animate: { y: [0, -10, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
});

export default function TextMediaVariant(
{
   heading,
  description,
  services = [],
  images = [],
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-20"
      style={{ background: "var(--bg-main)" }}
    >
      {/* Orbs */}
      <div className="pointer-events-none absolute -left-20 -top-14 h-96 w-96 rounded-full opacity-15"
        style={{ background: "var(--blue-3)", filter: "blur(100px)" }} />
      <div className="pointer-events-none absolute -bottom-10 -right-14 h-64 w-64 rounded-full opacity-15"
        style={{ background: "var(--blue-2)", filter: "blur(100px)" }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">

          {/* ── LEFT ── */}
          <div>
          

            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl"
              style={{ color: "#fff" }}
            >
<LinkRenderer text={heading} />
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }} animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mb-5 h-0.5 w-9 origin-left rounded-full"
              style={{ background: "var(--blue-3)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mb-8 text-sm leading-relaxed"
              style={{ color: "#fff" }}
            >
<LinkRenderer text={description} />            </motion.p>

            {/* Service cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
  {services.map((s, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.28 + i * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ x: 4 }}
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl p-5 transition-all duration-300"
      style={{
        background: "var(--bg-soft)",
        border: "1px solid rgba(17,138,178,0.13)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor =
          "rgba(17,138,178,0.4)";
        e.currentTarget.style.boxShadow =
          "0 0 28px rgba(17,138,178,0.09)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor =
          "rgba(17,138,178,0.13)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        className="absolute right-4 top-3 text-xs font-bold tracking-wide"
        style={{ color: "rgba(17,138,178,0.25)" }}
      >
        {s.number}
      </span>

      <div>
        <h3
         className="mb-1 font-semibold"
  style={{ fontSize: "18px", color: "#fff" }}
        >
<LinkRenderer text={s.title} />
        </h3>

        <p
          className="text-xs leading-relaxed"
          style={{ color: "#fff" }}
        >
<LinkRenderer text={s.desc} />    
    </p>
      </div>
    </motion.div>
  ))}
</div>
          </div>

          {/* ── RIGHT: floating images ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative h-[460px] w-full"
          >
            <motion.div {...floatAnim(0)}
              className="absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 rounded-[20px] border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm">
              <img src={images[0]} alt="" className="h-full w-full rounded-[15px] object-cover" />
            </motion.div>
            <motion.div {...floatAnim(0.4)}
              className="absolute right-0 top-[34%] h-44 w-44 rounded-[20px] border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm">
              <img src={images[1]} alt="" className="h-full w-full rounded-[15px] object-cover" />
            </motion.div>
            <motion.div {...floatAnim(0.8)}
              className="absolute bottom-0 left-0 h-40 w-40 rounded-[20px] border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm">
              <img src={images[2]} alt="" className="h-full w-full rounded-[15px] object-cover" />
            </motion.div>
            <motion.div {...floatAnim(0.2)}
              className="absolute bottom-[14%] left-[24%] h-28 w-28 rounded-[18px] border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-sm">
              <img src={images[3]} alt="" className="h-full w-full rounded-[15px] object-cover" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
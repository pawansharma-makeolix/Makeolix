"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function ParallaxHero({
  bgImage,
  title,
  description,
  features = [],
  subtext,
  lastpara,
  rightSubtext,
  align,
  rightTitle,
  rightFeatures = [],
  rightDescription,
  rightlastpara, // left | right | both
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const isRight = align === "right";
  const isBoth = align === "both";

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden min-h-135"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center  scale-[1.15]"
        style={{
          backgroundImage: `url('${bgImage}')`,
          y: bgY,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,10,18,0.3)_0%,rgba(0,15,28,0.5)_42%,rgba(0,20,38,0.4)_70%,rgba(0,10,18,0.10)_100%)]" />

      {/* Grid */}

      {/* Content Wrapper */}
      <div
        ref={contentRef}
        className={`relative z-10 grid gap-10 px-6 md:px-16 items-stretch
        ${isBoth ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}
        ${isRight ? "justify-items-end" : "justify-items-start"}`}
      >
        {!isRight && (
          <motion.div
            initial={{ opacity: 0, x: -650 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group max-w-2xl w-full p-8 md:p-10 rounded-2xl 
          bg-white/5 backdrop-blur-md 
          border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.4)]
          hover:bg-white/10 hover:border-[#118ab2]/40
          transition-all duration-500"
          >
            {/* TITLE */}
            <h2 className="mt-5 text-white text-2xl font-semibold mb-4 leading-[1.12]  group-hover:text-[#e6f7ff] transition">
              {title}
            </h2>

            {/* LINE */}
            <div className="h-0.5 w-full max-w-120 bg-linear-to-r from-[#00509d] via-[#ffffff] to-transparent my-6" />

            {/* DESC */}
            <p className="text-white/80 leading-[1.8]">{description}</p>

            {/* SUB TEXT */}
            {subtext && (
              <p
                className="mt-6 text-sm font-semibold tracking-wide uppercase 
bg-linear-to-r from-[#ffffff] via-[#118ab2] to-[#ffffff] 
bg-clip-text text-transparent"
              >
                {subtext}
              </p>
            )}

            {/* FEATURES */}
            <ul className="mt-5 space-y-3">
              {features.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#ff8fab] shadow-[0_0_8px_rgba(255,143,171,0.6)]" />
                  <span className="text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* FINAL */}
            <div className="mt-8 border-l-[3px] border-[#ff8fab] pl-4">
              <p className="text-white font-medium">{lastpara}</p>
            </div>
          </motion.div>
        )}

        {/* RIGHT SIDE (for future BOTH layout) */}
        {(isBoth || isRight) && (
          <motion.div
            initial={{ opacity: 0, x: 650 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group max-w-2xl w-full p-8 md:p-10 rounded-2xl 
          bg-white/5 backdrop-blur-md 
          border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.4)]
          hover:bg-white/10 hover:border-[#118ab2]/40
          transition-all duration-500"
          >
            <h2 className="text-white text-2xl font-semibold mb-4">
              {rightTitle}
            </h2>
            <div className="h-0.5 w-full max-w-120 bg-linear-to-r from-[#00509d] via-[#ffffff] to-transparent my-6" />
            <p className="text-white/80 mb-4">{rightDescription}</p>
            {rightSubtext && (
              <p
                className="mt-6 text-sm font-semibold tracking-wide uppercase 
bg-linear-to-r from-[#ffffff] via-[#118ab2] to-[#ffffff] 
bg-clip-text text-transparent"
              >
                {rightSubtext}
              </p>
            )}

            <ul className="mt-5 space-y-3">
              {rightFeatures?.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#ff8fab] shadow-[0_0_8px_rgba(255,143,171,0.6)]" />
                  <span className="text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 border-l-[3px] border-[#ff8fab] pl-4">
              <p className="text-white font-medium">{rightlastpara}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

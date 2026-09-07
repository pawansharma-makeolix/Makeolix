
"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";

export default function PortfolioHero({
  eyebrow = "OUR PORTFOLIO",
  title = "Creative Websites Built to Perform",
  description = "Explore our latest Shopify and WordPress projects crafted to deliver better experiences, stronger branding, and real business results.",
  buttonText = "View Our Work",
  buttonHref = "#portfolio",
  className = "",
}) {
  return (
    <section
      className={`relative overflow-hidden bg-[var(--bg-main)] px-6 py-32 text-center sm:py-36 lg:py-40 ${className}`}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--blue-3) 0%, var(--blue-2) 35%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--blue-3)]"
        >
          {eyebrow}
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-balance text-4xl font-bold leading-tight tracking-tight text-[var(--white)] sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-muted)] sm:text-lg"
        >
          {description}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="mt-8 flex justify-center"
        >
          <Button href={buttonHref}>{buttonText}</Button>
        </motion.div>
      </div>
    </section>
  );
}


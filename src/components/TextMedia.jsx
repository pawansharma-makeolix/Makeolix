"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "../components/Button";
export default function TextMedia({
  title,
  subtitle,
  description,
  image,
  list,
  paragraph2,
  ctaText,
  reverse = false, // 🔥 layout switch
  bgClass = "bg-(--bg-main)", // 🎨 custom background
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImg = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const words = title.split(" ");
  return (
    <section ref={ref} className={`relative py-20 overflow-hidden ${bgClass}`}>
      {/* 🌌 ambient glow */}
      <motion.div
        className="absolute w-150 h-150 bg-(--blue-2) opacity-20 blur-[160px] -top-32 -left-32"
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* 🎯 spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,138,178,0.15),transparent_70%)]" />

      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* TEXT */}
        <div className="flex flex-col gap-4">
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="uppercase tracking-[0.25em] text-(--accent-pink) text-xs"
            >
              {subtitle}
            </motion.p>
          )}

          {/* TITLE */}
          <h2
            className="text-white leading-tight flex flex-wrap"
            style={{
              fontSize: "clamp(2.5rem, 3.5vw, 3.5rem)",
              fontFamily: "Merriweather, serif",
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                }}
                className="mr-2 whitespace-nowrap" // 🔥 important
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {description && (
            <motion.p
              style={{ opacity }}
              className="text-white max-w-md leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* ✅ LIST SUPPORT */}
          {Array.isArray(list) && list.length > 0 && (
            <ul className="text-white max-w-md space-y-2 list-disc pl-5">
              {list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {/* ✅ SECOND PARAGRAPH */}
          {paragraph2 && (
            <p className="text-white max-w-md leading-relaxed">{paragraph2}</p>
          )}

          {/* CTA */}
          {ctaText && (
            <Button className="w-40" href={"/contact-us"}>
              {ctaText}
            </Button>
          )}
        </div>

        {/* IMAGE */}
        <motion.div
          style={{ y: yImg }}
          className="relative flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full max-w-105"
          >
            <div className="absolute inset-0 bg-(--blue-3) opacity-20 blur-3xl rounded-2xl" />

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <img
                src={image}
                alt="media"
                className="w-full h-105 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#00171f]/70 via-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

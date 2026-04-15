"use client";

import { motion } from "framer-motion";
import { SparkleParticles } from "./SparkleParticles";

const OtherPageHero = ({ title = "About Us" }) => {
  return (
    <section
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{
        height: "60vh",
        minHeight: "400px",
        background: "var(--bg-soft)",
      }}
    >
      {/* 🌟 PARTICLES BACKGROUND */}
      <SparkleParticles
        className="absolute inset-0 w-full h-full"
        particleColor={["#ffffff", "#ffffff"]}
      />

      {/* 🌑 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 px-4">
        
        {/* 🚀 REVEAL + SCALE TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          style={{ color: "#ffffff" }}
        >
          {title}
        </motion.h1>

        {/* ✨ UNDERLINE ANIMATION */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-0.75 mx-auto mt-4 rounded-full"
          style={{ background: "var(--blue-3)" }}
        />

      </div>
    </section>
  );
};

export default OtherPageHero;
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const awards = [
  "/public/Achievement1.png",
  "/public/Achievement2.jpg",
  "/public/Achievement3.png",
  "/public/Achievement4.png",
  "/public/Achievement5.png",
  "/public/Achievement6.png",
  "/public/Achievement7.webp",
];

const Achievements = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % awards.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getPosition = (index) => {
    if (index === active)
      return "scale-105 opacity-100 z-20 translate-x-0";

    if (index === (active + 1) % awards.length)
      return "translate-x-[110%] scale-90 opacity-70 z-10";

    if (index === (active - 1 + awards.length) % awards.length)
      return "translate-x-[-110%] scale-90 opacity-70 z-10";

    return "scale-75 opacity-0";
  };

  return (
    <section
      className="py-14 overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #ffffff 85%, #e6f2f8 100%)",
      }}
    >
      {/* 🔥 Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 px-4" // ✅ reduced gap
      >
        <h2
          className="text-3xl md:text-3xl font-semibold mb-2"
          style={{ color: "#003863" }}
        >
          Our Achievements & Awards
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Recognized for excellence, innovation, and impactful results across industries.
        </p>
      </motion.div>

      {/* 🔥 Slider */}
      <div className="relative flex items-center justify-center h-[130px] md:h-[200px] -mt-3">
        {awards.map((img, index) => (
          <motion.div
            key={index}
            className={`absolute transition-all duration-700 
            w-[140px] sm:w-[170px] md:w-[150px] 
            h-[100px] sm:h-[120px] md:h-[110px] 
            rounded-xl backdrop-blur-md 
            flex items-center justify-center
            ${getPosition(index)}`}
            style={{
              background: "rgba(5, 25, 35, 0.85)",
              boxShadow:
                index === active
                  ? "0px 15px 30px rgba(17,138,178,0.25)"
                  : "0px 8px 15px rgba(0,0,0,0.2)",
            }}
            whileHover={{
              scale: 1.12,
              rotate: 2,
            }}
          >
            <img
              src={img}
              alt="award"
              className="h-14 sm:h-16 md:h-20 object-contain"
            />
          </motion.div>
        ))}
      </div>

      {/* 🔥 subtle floating blobs */}
      <motion.div
        className="absolute top-6 left-6 w-28 h-28 bg-[#118ab2]/20 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-36 h-36 bg-[#00509d]/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
};

export default Achievements;
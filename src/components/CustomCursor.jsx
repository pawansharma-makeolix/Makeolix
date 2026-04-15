"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  // ⚡ Direct motion values (no re-render on every move)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ⚡ Smooth but FAST springs
  const springConfig = { damping: 20, stiffness: 500, mass: 0.2 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const ringX = useSpring(mouseX, { damping: 25, stiffness: 400 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 400 });

  const blurX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const blurY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    const elements = document.querySelectorAll("a, button");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* 🔥 Glow / Smoke Trail */}
      <motion.div
        style={{
          translateX: blurX,
          translateY: blurY,
        }}
        animate={{
          scale: isHovering ? 2.2 : 1.2,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9997]"
      >
        <div className="w-full h-full rounded-full bg-pink-500 blur-2xl" />
      </motion.div>

      {/* 🔵 Outer Ring */}
      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          borderColor: isHovering ? "#118ab2" : "#ff8fab",
        }}
        className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[9998]"
      />

      {/* ⚫ Center Dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          scale: isHovering ? 0.6 : 1,
        }}
        className="fixed top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400 pointer-events-none z-[9999]"
      />
    </>
  );
};

export default CustomCursor;
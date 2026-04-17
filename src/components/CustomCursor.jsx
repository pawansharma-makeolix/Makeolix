"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // ⚡ Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ⚡ Faster + smoother springs
  const cursorX = useSpring(mouseX, { stiffness: 700, damping: 25 });
  const cursorY = useSpring(mouseY, { stiffness: 700, damping: 25 });

  const ringX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  const blurX = useSpring(mouseX, { stiffness: 200, damping: 40 });
  const blurY = useSpring(mouseY, { stiffness: 200, damping: 40 });

  useEffect(() => {
    // ❌ mobile pe disable
    if (window.innerWidth < 768) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleHover = (e) => {
      if (e.target.closest("a, button")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const leaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mouseout", handleHover);
    window.addEventListener("mouseleave", leaveWindow);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mouseout", handleHover);
      window.removeEventListener("mouseleave", leaveWindow);
    };
  }, []);

  return (
    <>
      {/* 🔥 Glow */}
      <motion.div
        style={{ translateX: blurX, translateY: blurY }}
        animate={{
          scale: isHovering ? 2.5 : 1.3,
          opacity: isVisible ? (isHovering ? 0.5 : 0.25) : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-9997"
      >
        <div className="w-full h-full rounded-full bg-pink-500 blur-2xl" />
      </motion.div>

      {/* 🔵 Ring */}
      <motion.div
        style={{ translateX: ringX, translateY: ringY }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          borderColor: isHovering ? "#118ab2" : "#ff8fab",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-9998"
      />

      {/* ⚫ Dot */}
      <motion.div
        style={{ translateX: cursorX, translateY: cursorY }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400 pointer-events-none z-9999"
      />
    </>
  );
};

export default CustomCursor;
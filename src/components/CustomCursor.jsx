"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isDesktop = useRef(typeof window !== "undefined" && window.innerWidth >= 768);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 700, damping: 25 });
  const cursorY = useSpring(mouseY, { stiffness: 700, damping: 25 });

  const ringX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  useEffect(() => {
    if (!isDesktop.current) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // mousemove ke andar hi hover-target check — alag mouseover/mouseout listeners ki zaroorat nahi
      const target = e.target;
      const hovering = !!(target && target.closest && target.closest("a, button"));
      setIsHovering((prev) => (prev !== hovering ? hovering : prev));
    };

    const leaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leaveWindow);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leaveWindow);
    };
  }, []);

  if (!isDesktop.current) return null; // mobile pe render hi mat karo

  return (
    <>
      <motion.div
        style={{ translateX: ringX, translateY: ringY }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-400 pointer-events-none z-[100000]"
      />

      <motion.div
        style={{ translateX: cursorX, translateY: cursorY }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400 pointer-events-none z-[100000]"
      />
    </>
  );
};

export default CustomCursor;
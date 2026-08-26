"use client";

import { useEffect, useRef, useState } from "react";

export default function FooterBlob({ variant }) {
  const imageSrc = variant === "second" ? "/Blob2 (1).webp" : "/Blob21.webp";
  const blobRef = useRef(null);
  const containerRef = useRef(null);
  const rectRef = useRef(null);
  const posRef = useRef({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef(null);
  const insideRef = useRef(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateRect = () => {
      rectRef.current = container.getBoundingClientRect();
    };
    updateRect();

    const animate = () => {
      const p = posRef.current;
      const dx = p.targetX - p.currentX;
      const dy = p.targetY - p.currentY;

      // convergence ho chuka to loop rok do — idle me DOM write band
      if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
        rafRef.current = null;
        return;
      }

      p.currentX += dx * 0.15;
      p.currentY += dy * 0.15;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${p.currentX}px, ${p.currentY}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const move = (e) => {
      const rect = rectRef.current;
      if (!rect) return;

      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside !== insideRef.current) {
        insideRef.current = inside;
        setVisible(inside);
      }

      if (inside) {
        posRef.current.targetX = e.clientX - rect.left;
        posRef.current.targetY = e.clientY - rect.top;

        // loop idle pada tha to yahi se restart karo
        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(animate);
        }
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, { passive: true });

    // mount pe rAF start NAHI karte — sirf pehli baar mouse "inside" aayega tab start hoga

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        ref={blobRef}
        src={imageSrc}
        loading="lazy"
        alt=""
        className={`absolute w-25 md:w-37.5 lg:w-50 will-change-transform transition-opacity duration-300 ${visible ? "opacity-80" : "opacity-0"
          }`}
      />
    </div>
  );
}
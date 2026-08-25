"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon = true,
  type = "button", 
  className = "",
  ariaLabel,          // 👈 add this
}) {
  const base =
    "relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group overflow-hidden transition-all duration-500 cursor-pointer flex items-center";

  const variants = {
    primary:
      "bg-[linear-gradient(135deg,var(--blue-1),var(--blue-2))] text-[#e2eaf4] border border-[rgba(17,138,178,0.4)] shadow-[0_0_20px_rgba(0,80,157,0.35)]",
    outline: "bg-transparent text-white border border-[rgba(255,255,255,1)]",
  };

  const content = (
    <motion.div
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{
        scale: 1.03,
        boxShadow:
          variant === "primary"
            ? "0 0 40px rgba(17,138,178,0.6)"
            : "0 0 20px rgba(255,255,255,0.6)",
      }}
      whileTap={{ scale: 0.96 }}
    >
      ...
    </motion.div>
  );

  if (href) {
    return (
      <Link to={href} aria-label={ariaLabel}>   
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}                    
      style={{ background: "none", border: "none", padding: 0 }}
    >
      {content}
    </button>
  );
}




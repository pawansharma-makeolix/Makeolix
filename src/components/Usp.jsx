import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <circle cx="9" cy="9" r="9" fill="rgba(17,138,178,0.15)" />
    <path
      d="M5 9.2L7.6 12 13 6.5"
      stroke="#118ab2"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Usp = ({ heading, subheading, statsData = [] }) => {
  return (
    <div
      style={{
        width: "100%",
        background: "#051923",
        padding: "5rem 1.5rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={headingVariants}
        style={{ textAlign: "center", marginBottom: "3rem", maxWidth: 900, margin: "0 auto 3.5rem" }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#118ab2",
            marginBottom: "1rem",
            padding: "4px 14px",
            border: "1px solid rgba(17,138,178,0.3)",
            borderRadius: 99,
          }}
        >
          Why Makeolix
        </span>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 600,
            color: "#ffffff",
            margin: "0 0 0.9rem",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            style={{
              fontSize: "1rem",
              color: "#6a96b0",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            {subheading}
          </p>
        )}
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.25rem",
          maxWidth: 1100,
          margin: "0 auto",
          perspective: 1000,
        }}
      >
        {statsData.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.025,
              boxShadow:
                "0 20px 48px rgba(17,138,178,0.18), 0 0 0 1px rgba(17,138,178,0.55)",
              borderColor: "rgba(17,138,178,0.55)",
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }}
            style={{
              background: "#0a2433",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 18,
              padding: "2rem 1.75rem",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            {/* Subtle inner glow top-left */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 180,
                height: 180,
                background:
                  "radial-gradient(ellipse at top left, rgba(17,138,178,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Icon + Tag row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "1.25rem",
              }}
            >
              <CheckIcon />
              {item.tag && (
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#118ab2",
                  }}
                >
                  {item.tag}
                </span>
              )}
            </div>

            {/* Accent bar */}
            <motion.div
              whileHover={{ width: 52 }}
              style={{
                width: 32,
                height: 3,
                borderRadius: 99,
                background: "linear-gradient(90deg, #118ab2, #06d6a0)",
                marginBottom: "1rem",
                transition: "width 0.4s cubic-bezier(.22,1,.36,1)",
              }}
            />

            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#e8f4fa",
                margin: "0 0 0.6rem",
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#5a889e",
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Usp;


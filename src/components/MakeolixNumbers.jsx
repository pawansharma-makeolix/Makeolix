import React from "react";
import { motion } from "framer-motion";
import LinkRenderer from "./LinkRenderer";

const fadeUp = {
  hidden: { opacity: 0, y: 80, rotate: -3 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const colsMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

const MakeolixNumbers = ({
  heading,
  subheading,
  statsData = [],
  variant = "light",
  columns,
}) => {
  const isDark = variant === "dark";

  const lgCols =
    columns && colsMap[Number(columns)]
      ? colsMap[Number(columns)]
      : "lg:grid-cols-3";

  return (
    <div
      className={`w-full py-20 px-4 ${
        isDark
          ? "bg-[#051923]"
          : "bg-gradient-to-b from-white to-[#e6f2f8]"
      }`}
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <h2
          className={`${
            isDark ? "text-white" : "text-[#003863]"
          }`}
        >
          <LinkRenderer text={heading} />
        </h2>

        {subheading && (
          <p
            className={`mt-3 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <LinkRenderer text={subheading} />
          </p>
        )}
      </div>

      {/* Stats */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-8 max-w-6xl mx-auto`}
      >
        {statsData.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`p-6 rounded-2xl shadow-md ${
              isDark
                ? "bg-white"
                : "bg-[#051923]"
            }`}
          >
            {/* Number */}
            <h3
              className={`mb-2 ${
                isDark ? "text-[#003863]" : "text-[#118ab2]"
              }`}
            >
              {item.number}
            </h3>

            {/* Title */}
            <h4
              className={`mb-2 ${
                isDark ? "text-black" : "text-white"
              }`}
            >
              <LinkRenderer text={item.title} />
            </h4>

            {/* Description */}
            <p
              className={`${
                isDark ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <LinkRenderer text={item.desc} />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MakeolixNumbers;
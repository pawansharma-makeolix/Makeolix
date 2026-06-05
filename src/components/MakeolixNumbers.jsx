import React from "react";
import { motion } from "framer-motion";


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
  columns, // ← new prop
}) => {

  const isDark = variant === "dark";
  const lgCols = columns && colsMap[Number(columns)] ? colsMap[Number(columns)] : "lg:grid-cols-3";

  return (
    <div
      className={`w-full py-20 px-4 ${
        isDark
          ? "bg-[#051923]"
          : "bg-linear-to-b from-white to-[#e6f2f8]"
      }`}
    >
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2
          className={` ${
            isDark ? "text-white" : "text-[#003863]"
          }`}
        >
          {heading}
        </h2>

        {subheading && (
          <p className={`mt-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {subheading}
          </p>
        )}
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-8 max-w-6xl mx-auto`}>
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
            <h3
              className={` mb-2 ${
                isDark ? "text-[#003863]" : "text-[#118ab2]"
              }`}
            >
              {item.number}
            </h3>

            <h4
              className={` mb-2 ${
                isDark ? "text-black" : "text-white"
              }`}
            >
              {item.title}
            </h4>

            <p className={`${isDark ? "text-gray-600" : "text-gray-400"}`}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default MakeolixNumbers;
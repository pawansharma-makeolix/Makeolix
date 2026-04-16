import React from "react";
import { motion } from "framer-motion";

const stats = [
  {
    number: "10+",
    title: "Years of Experience",
    desc: "Expertise honed through a decade of diverse industry challenges.",
  },
  {
    number: "150+",
    title: "Specialist",
    desc: "A dedicated team of skilled professionals driving excellence.",
  },
  {
    number: "5,000+",
    title: "Marketing Consultations",
    desc: "Proven insights from a wealth of strategic consultations conducted.",
  },
  {
    number: "2",
    title: "Continents",
    desc: "Expanding global reach with successful endeavors on multiple continents.",
  },
  {
    number: "3,000+",
    title: "Executed Campaigns",
    desc: "A track record of executing effective and impactful marketing campaigns.",
  },
  {
    number: "100",
    title: "Established Partners Globally",
    desc: "Trusted partnerships fostering global connections and mutual success.",
  },
];

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

const MakeolixNumbers = ({
  heading = "The Makeolix in Numbers",
  subheading = "",
  statsData = stats,
}) => {
  return (
    <div
      className="w-full py-20 px-4"
      style={{
        background: "linear-gradient(180deg, #ffffff 85%, #e6f2f8 100%)",
      }}
    >
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-3xl font-semibold"
          style={{ color: "#003863" }}
        >
          {heading}
        </h2>

        {subheading && <p className="mt-3 text-gray-600">{subheading}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {statsData.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-6 rounded-2xl shadow-md"
            style={{
              backgroundColor: "#051923",
            }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "#118ab2" }}
            >
              {item.number}
            </h3>

            <h4
              className="text-lg font-semibold mb-2"
              style={{ color: "#ffffff" }}
            >
              {item.title}
            </h4>

            <p style={{ color: "#a0aec0" }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default MakeolixNumbers;

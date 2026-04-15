import React from "react";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    
    desc: "How Do I Choose the Best SEO Reseller Service Provider in India: Complete Guide for Growing Agencies 2026",
    date: "March 10, 2026",
    service: "SEO Reseller Service",
    img: "/Heroimage.jpg",
  },
  {
    id: 2,
    
    desc: "5 Top SEO Agencies in India to Boost Your Productivity in 2025",
    date: "October 12, 2025",
    service: "SEO",
    img: "/Heroimage.jpg",
  },
  {
    id: 3,
    desc: "Want More Traffic & Sales? Partner with a Top E-commerce SEO Agency in India",
    date: "September 10, 2025",
    service: "E-commerce",
    img: "/Heroimage.jpg",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

export default function BlogSection() {
  return (
    <section className="min-h-screen px-6 py-20 bg-[var(--bg-main)] text-white overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-3xl font-semibold mb-4 text-amber-50">
          Latest Blogs
        </h2>
        <p className="text-amber-50">
          Insights, ideas & creativity
        </p>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative rounded-2xl overflow-hidden bg-[var(--bg-soft)] shadow-xl group"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <motion.img
                src={blog.img}
                alt={blog.desc}
                className="w-full h-56 object-cover"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.6 }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              
              <p className="text-sm text-amber-50 mb-4">
                {blog.desc}
              </p>

              <div className="text-xs text-gray-400 mb-2">
                {blog.date}
              </div>
              <div className="text-xs text-[var(--blue-3)] mb-4">
                {blog.service}
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 rounded-full bg-[var(--blue-2)] text-white text-sm"
              >
                Read More
              </motion.button>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-pink)] to-transparent opacity-0 group-hover:opacity-20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.2 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          className="px-6 py-3 rounded-full bg-[var(--blue-1)] text-white text-sm shadow-lg"
        >
          View More Blogs
        </motion.button>
      </motion.div>

      {/* Floating animation background */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 left-10 w-32 h-32 bg-[var(--blue-2)] opacity-10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-[var(--accent-pink)] opacity-10 rounded-full blur-3xl"
      />
    </section>
  );
}

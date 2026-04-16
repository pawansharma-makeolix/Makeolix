"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY",
      )
      .then(() => {
        setLoading(false);
        setSuccess(true);
        form.current.reset();
      })
      .catch(() => {
        setLoading(false);
        setSuccess(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#001f3f] via-[#003863] to-[#00509d] p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-[#003863] mb-2">Contact Us</h2>
        <p className="text-gray-500 text-sm mb-6">
          We’d love to hear from you 👋
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00509d] transition"
          />

          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00509d] transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00509d] transition"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-linear-to-r from-[#003863] to-[#118ab2]"
          >
            {loading ? "Sending..." : "Send Message →"}
          </motion.button>
        </form>

        {/* SUCCESS / ERROR MESSAGE */}
        {success === true && (
          <p className="text-green-600 mt-4 text-sm">
            Message sent successfully ✅
          </p>
        )}
        {success === false && (
          <p className="text-red-500 mt-4 text-sm">Something went wrong ❌</p>
        )}
      </motion.div>
    </div>
  );
}

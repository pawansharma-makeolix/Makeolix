import React from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "./card-spotlight";
import FooterBlob from "../components/FooterBlob";
import Button from "../components/Button";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function UltraFooter() {
  return (

   <footer className="relative bg-(--bg-main) text-white pt-20 overflow-hidden">
    
    <FooterBlob />

    <CardSpotlight className="w-full relative z-10">

      {/* CTA + FORM */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 mb-10">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-(--bg-soft) p-8 rounded-3xl border border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all"
        >
          <h2 className="text-3xl mb-4 text-(--blue-3)">
            Let’s Grow Together
          </h2>

          <div className="flex gap-4 items-center mt-6">
           <Button>Book Call</Button>

            <motion.a whileHover={{ scale: 1.2 }} className="p-3 bg-green-500 rounded-full">
              <FaWhatsapp />
            </motion.a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-(--bg-soft) p-8 rounded-3xl border border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all"
        >
          <h3 className="mb-6 text-(--blue-2)">Quick Inquiry</h3>

          <input placeholder="Phone" className="w-full mb-4 bg-transparent border-b border-gray-600 p-2 focus:border-(--blue-3) outline-none" />
          <input placeholder="Budget" className="w-full mb-4 bg-transparent border-b border-gray-600 p-2 focus:border-(--blue-3) outline-none" />
          <textarea placeholder="Describe your project" className="w-full mb-4 bg-transparent border-b border-gray-600 p-2 focus:border-(--blue-3) outline-none" />

          <Button variant="outline">Submit</Button>
        </motion.form>
      </div>

      {/* SERVICE AREAS */}
      <div className="border-t border-gray-700 pt-6 pb-10 overflow-hidden">
        <h4 className="text-center text-(--blue-3) mb-4">Service Areas</h4>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-10 whitespace-nowrap text-sm text-(--text-muted)"
        >
          {Array(2)
            .fill([
              "Austin","Charlotte","Columbus","Denver","Indianapolis","Los Angeles","New York","Phoenix","San Diego","Seattle","Boston","Chicago","Dallas","Houston","Jacksonville","Miami","Philadelphia","San Antonio","San Francisco","Toronto"
            ])
            .flat()
            .map((city, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.15, color: "#fff" }}
                className="transition"
              >
                {city}
              </motion.a>
            ))}
        </motion.div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-10 mb-16">

        <div>
          <h3 className="text-2xl mb-4 text-(--blue-3)">About MakeOlix</h3>
          <p className="text-sm text-(--text-muted)">
            At MakeOlix, we are passionate about propelling your brand to new heights through innovative digital marketing strategies. With a dedicated team of experts, we craft compelling campaigns tailored to your unique needs.
          </p>

          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, rotate: 8 }}
                className="p-3 bg-(--bg-soft) rounded-full hover:bg-(--blue-2)"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-(--blue-2)">Our Company</h4>
          <ul className="space-y-2 text-sm text-(--text-muted)">
            {["Home","About Us","Case Studies","Blog","Contact Us"].map((item, i) => (
              <motion.li key={i} whileHover={{ x: 6 }}>
                <a href="#" className="hover:text-white">{item}</a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-(--blue-2)">Our Services</h4>
          <ul className="space-y-2 text-sm text-(--text-muted)">
            {["Web Design & Development","E-commerce SEO","Small Business","Social Media Management","Performance Marketing"].map((item, i) => (
              <motion.li key={i} whileHover={{ x: 6 }}>
                <a href="#" className="hover:text-white">{item}</a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-(--blue-2)">Contact Us</h4>

          <div className="flex gap-2 items-center mb-2">
            <FaEnvelope />
            <a href="mailto:contactus@makeolix.com" className="hover:text-white">
              contactus@makeolix.com
            </a>
          </div>

          <div className="flex gap-2 items-center">
            <FaPhoneAlt />
            <a href="tel:+911204537874" className="hover:text-white">
              +91 1204537874
            </a>
          </div>
        </div>
      </div>

      {/* OFFICES */}
      <div className="border-t border-gray-700 py-10 overflow-hidden">
        <h4 className="text-center text-(--blue-3) mb-6">Our Offices</h4>

        <motion.div
          animate={{ x: ["0%", "-60%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-12"
        >
          {Array(2).fill([
            {
              img: "/indianflag.png",
              address: "Suite G-02, H-143, Sector 63, Noida",
              mail: "contactus@makeolix.com",
              phone: "+91 1204537874"
            },
            {
              img: "/Usflag.webp",
              address: "8 The Green, Dover, DE 19901",
              mail: "contactus@makeolix.com",
              phone: "+1 302 550 8772"
            },
            {
              img: "/uaeflag.webp",
              address: "Arriving soon",
              mail: "contactus@makeolix.com"
            }
          ]).flat().map((item, i) => (

            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-(--bg-soft) p-4 rounded-xl min-w-60 border border-gray-700 hover:shadow-2xl"
            >
              <img src={item.img} className="mb-3 rounded w-8 h-7 object-cover" />

              <div className="flex gap-2 items-center text-sm mb-1">
                <FaMapMarkerAlt />
                {item.address}
              </div>

              <div className="flex gap-2 items-center text-sm mb-1">
                <FaEnvelope />
                <a href={`mailto:${item.mail}`} className="hover:text-white">
                  {item.mail}
                </a>
              </div>

              {item.phone && (
                <div className="flex gap-2 items-center text-sm">
                  <FaPhoneAlt />
                  <a href={`tel:${item.phone}`} className="hover:text-white">
                    {item.phone}
                  </a>
                </div>
              )}
            </motion.div>

          ))}
        </motion.div>
      </div>

      <div className="text-center text-sm text-(--text-muted) py-6 border-t border-gray-700">
        © 2026 MakeOlix Consulting Pvt Ltd. All Rights Reserved
      </div>

    </CardSpotlight>

  </footer>

  );
}
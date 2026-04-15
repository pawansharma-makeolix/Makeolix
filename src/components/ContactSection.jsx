import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  Building2,
  User,
  Briefcase,
  Sparkles,
  Send,
  ChevronRight
} from 'lucide-react';

// Business Form Component
const BusinessForm = ({ isActive }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessEmail: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Business Form:', formData);
  };

  const inputVariants = {
    focused: { 
      scale: 1.02,
      borderColor: "var(--blue-3)",
      boxShadow: "0 0 20px rgba(17,138,178,0.3)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    unfocused: { 
      scale: 1,
      borderColor: "rgba(17,138,178,0.2)",
      boxShadow: "none",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Company Name */}
        <motion.div 
          className="col-span-2 relative"
          variants={inputVariants}
          animate={focusedField === 'companyName' ? "focused" : "unfocused"}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#118ab2]">
            <Building2 size={18} />
          </div>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            onFocus={() => setFocusedField('companyName')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-300"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#118ab2] to-[#67e8f9]"
            initial={{ width: "0%" }}
            animate={{ width: focusedField === 'companyName' ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Business Email */}
        <motion.div 
          className="relative"
          variants={inputVariants}
          animate={focusedField === 'businessEmail' ? "focused" : "unfocused"}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#118ab2]">
            <Mail size={18} />
          </div>
          <input
            type="email"
            name="businessEmail"
            placeholder="Business Email"
            value={formData.businessEmail}
            onChange={handleChange}
            onFocus={() => setFocusedField('businessEmail')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-300"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
        </motion.div>

        {/* Phone */}
        <motion.div 
          className="relative"
          variants={inputVariants}
          animate={focusedField === 'phone' ? "focused" : "unfocused"}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#118ab2]">
            <Phone size={18} />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-300"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
        </motion.div>

        {/* Project Type */}
        <motion.div 
          className="col-span-2 relative"
          variants={inputVariants}
          animate={focusedField === 'projectType' ? "focused" : "unfocused"}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#118ab2]">
            <Briefcase size={18} />
          </div>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            onFocus={() => setFocusedField('projectType')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-300 appearance-none cursor-pointer"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          >
            <option value="" style={{ background: "#00171f" }}>Select Project Type</option>
            <option value="web" style={{ background: "#00171f" }}>Web Development</option>
            <option value="mobile" style={{ background: "#00171f" }}>Mobile App</option>
            <option value="ai" style={{ background: "#00171f" }}>AI Solution</option>
            <option value="consulting" style={{ background: "#00171f" }}>Consulting</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#118ab2] pointer-events-none">
            <ChevronRight size={18} className="rotate-90" />
          </div>
        </motion.div>

        {/* Budget Range */}
        <motion.div 
          className="col-span-2 relative"
          variants={inputVariants}
          animate={focusedField === 'budget' ? "focused" : "unfocused"}
        >
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            onFocus={() => setFocusedField('budget')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3.5 rounded-xl text-base transition-all duration-300 appearance-none cursor-pointer"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          >
            <option value="" style={{ background: "#00171f" }}>Budget Range</option>
            <option value="5k-10k" style={{ background: "#00171f" }}>$5k - $10k</option>
            <option value="10k-25k" style={{ background: "#00171f" }}>$10k - $25k</option>
            <option value="25k-50k" style={{ background: "#00171f" }}>$25k - $50k</option>
            <option value="50k+" style={{ background: "#00171f" }}>$50k+</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#118ab2] pointer-events-none">
            <ChevronRight size={18} className="rotate-90" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div 
          className="col-span-2 relative"
          variants={inputVariants}
          animate={focusedField === 'message' ? "focused" : "unfocused"}
        >
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            rows="3"
            className="w-full px-4 py-3.5 rounded-xl text-base transition-all duration-300 resize-none"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full relative group overflow-hidden rounded-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#003863] via-[#118ab2] to-[#00509d]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-semibold">
          <span>Send Business Inquiry</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Send size={18} />
          </motion.span>
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.button>

      {/* Success Message Animation (Hidden by default) */}
      <AnimatePresence>
        {false && ( // Set to true when form submitted successfully
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2 text-[#67e8f9] text-sm"
          >
            <CheckCircle2 size={16} />
            <span>Message sent successfully! We'll respond within 24 hours.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

// Career Form Component
const CareerForm = ({ isActive }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Career Form:', formData);
  };

  const inputVariants = {
    focused: { 
      scale: 1.02,
      borderColor: "var(--blue-3)",
      boxShadow: "0 0 20px rgba(17,138,178,0.3)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    unfocused: { 
      scale: 1,
      borderColor: "rgba(17,138,178,0.2)",
      boxShadow: "none",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Full Name */}
        <motion.div 
          className="col-span-2 relative"
          variants={inputVariants}
          animate={focusedField === 'fullName' ? "focused" : "unfocused"}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#118ab2]">
            <User size={18} />
          </div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            onFocus={() => setFocusedField('fullName')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-300"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#118ab2] to-[#67e8f9]"
            initial={{ width: "0%" }}
            animate={{ width: focusedField === 'fullName' ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Email */}
        <motion.div 
          className="relative"
          variants={inputVariants}
          animate={focusedField === 'email' ? "focused" : "unfocused"}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#118ab2]">
            <Mail size={18} />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-300"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
        </motion.div>

        {/* Phone */}
        <motion.div 
          className="relative"
          variants={inputVariants}
          animate={focusedField === 'phone' ? "focused" : "unfocused"}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#118ab2]">
            <Phone size={18} />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-300"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
        </motion.div>

        {/* Position */}
        <motion.div 
          className="col-span-2 relative"
          variants={inputVariants}
          animate={focusedField === 'position' ? "focused" : "unfocused"}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#118ab2]">
            <Briefcase size={18} />
          </div>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            onFocus={() => setFocusedField('position')}
            onBlur={() => setFocusedField(null)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-300 appearance-none cursor-pointer"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          >
            <option value="" style={{ background: "#00171f" }}>Position You're Applying For</option>
            <option value="frontend" style={{ background: "#00171f" }}>Frontend Developer</option>
            <option value="backend" style={{ background: "#00171f" }}>Backend Developer</option>
            <option value="fullstack" style={{ background: "#00171f" }}>Full Stack Developer</option>
            <option value="designer" style={{ background: "#00171f" }}>UI/UX Designer</option>
            <option value="pm" style={{ background: "#00171f" }}>Project Manager</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#118ab2] pointer-events-none">
            <ChevronRight size={18} className="rotate-90" />
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div 
          className="relative"
          variants={inputVariants}
          animate={focusedField === 'experience' ? "focused" : "unfocused"}
        >
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            onFocus={() => setFocusedField('experience')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3.5 rounded-xl text-base transition-all duration-300 appearance-none cursor-pointer"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          >
            <option value="" style={{ background: "#00171f" }}>Years of Experience</option>
            <option value="0-2" style={{ background: "#00171f" }}>0-2 Years</option>
            <option value="3-5" style={{ background: "#00171f" }}>3-5 Years</option>
            <option value="5-8" style={{ background: "#00171f" }}>5-8 Years</option>
            <option value="8+" style={{ background: "#00171f" }}>8+ Years</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#118ab2] pointer-events-none">
            <ChevronRight size={18} className="rotate-90" />
          </div>
        </motion.div>

        {/* Portfolio URL */}
        <motion.div 
          className="relative"
          variants={inputVariants}
          animate={focusedField === 'portfolio' ? "focused" : "unfocused"}
        >
          <input
            type="url"
            name="portfolio"
            placeholder="Portfolio/GitHub URL"
            value={formData.portfolio}
            onChange={handleChange}
            onFocus={() => setFocusedField('portfolio')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3.5 rounded-xl text-base transition-all duration-300"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
        </motion.div>

        {/* Cover Letter / Message */}
        <motion.div 
          className="col-span-2 relative"
          variants={inputVariants}
          animate={focusedField === 'message' ? "focused" : "unfocused"}
        >
          <textarea
            name="message"
            placeholder="Why do you want to join us? (Optional)"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            rows="3"
            className="w-full px-4 py-3.5 rounded-xl text-base transition-all duration-300 resize-none"
            style={{
              background: "rgba(0,23,31,0.6)",
              border: "1.5px solid rgba(17,138,178,0.2)",
              color: "#e0f2fe",
              backdropFilter: "blur(10px)",
            }}
          />
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full relative group overflow-hidden rounded-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#003863] via-[#118ab2] to-[#00509d]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-semibold">
          <span>Submit Application</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Send size={18} />
          </motion.span>
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.button>
    </motion.form>
  );
};

// Form Switcher Component
const FormSwitcher = ({ activeForm, setActiveForm }) => {
  return (
    <motion.div 
      className="relative flex bg-[rgba(0,23,31,0.7)] backdrop-blur-xl rounded-2xl p-1.5 border border-[rgba(17,138,178,0.25)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Animated Background Slider */}
      <motion.div
        className="absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-[#003863] to-[#118ab2]"
        initial={false}
        animate={{
          left: activeForm === 'business' ? '0.375rem' : '50%',
          right: activeForm === 'business' ? '50%' : '0.375rem',
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30 
        }}
        style={{
          boxShadow: "0 4px 20px rgba(17,138,178,0.5)"
        }}
      />

      {/* Business Button */}
      <motion.button
        className={`relative flex-1 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          activeForm === 'business' ? 'text-white' : 'text-[#94a3b8] hover:text-[#cbd5e1]'
        }`}
        onClick={() => setActiveForm('business')}
        whileHover={activeForm !== 'business' ? { scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
      >
        <Building2 size={18} />
        <span>Business</span>
        {activeForm === 'business' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Sparkles size={16} className="text-[#67e8f9]" />
          </motion.div>
        )}
      </motion.button>

      {/* Career Button */}
      <motion.button
        className={`relative flex-1 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          activeForm === 'career' ? 'text-white' : 'text-[#94a3b8] hover:text-[#cbd5e1]'
        }`}
        onClick={() => setActiveForm('career')}
        whileHover={activeForm !== 'career' ? { scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
      >
        <User size={18} />
        <span>Career</span>
        {activeForm === 'career' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Sparkles size={16} className="text-[#67e8f9]" />
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
};

// Main Contact Component
export default function ContactSection() {
  const [activeForm, setActiveForm] = useState('business');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      sub: "Mon-Fri 9am-6pm EST"
    },
    {
      icon: <Mail size={20} />,
      title: "Email Us",
      content: "hello@futuretech.com",
      sub: "We reply within 24 hours"
    },
    {
      icon: <MapPin size={20} />,
      title: "Visit Us",
      content: "123 Innovation Street",
      sub: "San Francisco, CA 94105"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "var(--bg-main)" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(17,138,178,0.15)_0%,transparent_70%)]" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,86,149,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,86,149,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(17,138,178,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,80,157,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(17,138,178,0.1)",
                border: "1px solid rgba(17,138,178,0.3)",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} style={{ color: "var(--blue-3)" }} />
              </motion.div>
              <span style={{ color: "var(--blue-3)" }} className="text-sm font-medium tracking-wider">
                GET IN TOUCH
              </span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span style={{ color: "#e0f2fe" }}>Let's Build </span>
              <motion.span
                style={{
                  background: "linear-gradient(135deg, #67e8f9, #118ab2, #00509d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Something Amazing
              </motion.span>
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Whether you have a project in mind or want to join our team, 
              we're here to help. Choose your path below and let's start the conversation.
            </motion.p>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer group"
                  style={{
                    background: "rgba(0,23,31,0.4)",
                    border: "1px solid rgba(17,138,178,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(17,138,178,0.4)",
                    boxShadow: "0 10px 30px rgba(17,138,178,0.15)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    className="p-3 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,56,99,0.6), rgba(17,138,178,0.4))",
                      border: "1px solid rgba(17,138,178,0.3)",
                    }}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div style={{ color: "var(--blue-3)" }}>
                      {info.icon}
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1" style={{ color: "#e0f2fe" }}>
                      {info.title}
                    </h3>
                    <p className="text-sm mb-0.5" style={{ color: "var(--text-muted)" }}>
                      {info.content}
                    </p>
                    <p className="text-xs" style={{ color: "var(--blue-3)" }}>
                      {info.sub}
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight size={18} style={{ color: "var(--blue-3)" }} />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats or Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex gap-8"
            >
              <div>
                <div className="text-2xl font-bold" style={{ color: "#67e8f9" }}>
                  24/7
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Support Available
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: "#67e8f9" }}>
                  &lt;2h
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Response Time
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: "#67e8f9" }}>
                  100%
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Satisfaction
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="relative"
          >
            {/* Form Card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "rgba(0,23,31,0.5)",
                border: "1px solid rgba(17,138,178,0.2)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
            >
              {/* Animated Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, transparent 0%, rgba(17,138,178,0.1) 50%, transparent 100%)",
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative p-8">
                {/* Form Switcher */}
                <div className="mb-8">
                  <FormSwitcher activeForm={activeForm} setActiveForm={setActiveForm} />
                </div>

                {/* Forms Container with AnimatePresence */}
                <div className="relative min-h-[500px]">
                  <AnimatePresence mode="wait">
                    {activeForm === 'business' ? (
                      <BusinessForm key="business" isActive={activeForm === 'business'} />
                    ) : (
                      <CareerForm key="career" isActive={activeForm === 'career'} />
                    )}
                  </AnimatePresence>
                </div>

                {/* Form Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-center"
                >
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    By submitting this form, you agree to our{' '}
                    <a href="#" style={{ color: "var(--blue-3)" }} className="hover:underline">
                      Privacy Policy
                    </a>
                    {' '}and{' '}
                    <a href="#" style={{ color: "var(--blue-3)" }} className="hover:underline">
                      Terms of Service
                    </a>
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full"
              style={{
                background: "linear-gradient(135deg, #118ab2, #00509d)",
                filter: "blur(20px)",
                opacity: 0.3,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
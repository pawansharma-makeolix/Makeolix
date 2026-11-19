import { motion, useReducedMotion } from "framer-motion";

const categories = [
  {
    number: "01",
    title: "Executive & Leadership Support",
    weeklyPrice: "$450 /week",
    monthlyPrice: "$1800 / month (160 hrs)",
    services: [
      "Executive Workflow Coordination",
      "Leadership Meeting Preparation",
      "Business Correspondence Management",
      "Stakeholder Follow-ups",
      "Business Research and Reporting",
      "Priority and Deadline Tracking",
      "Confidential Information Organisation",
    ],
    size: "lg:col-span-7",
  },
  {
    number: "02",
    title: "Customer Experience Support",
    weeklyPrice: "$550 /week",
    monthlyPrice: "$2200 / month (160 hrs)",
    services: [
      "Customer Query Management",
      "Client Onboarding Assistance",
      "Multichannel Communication Support",
      "Order and Account Coordination",
      "Complaint Follow-up Management",
      "Customer Feedback Collection",
      "Service Request Tracking",
    ],
    size: "lg:col-span-5",
  },
  {
    number: "03",
    title: "Business Operations Support",
    weeklyPrice: "$650 /week",
    monthlyPrice: "$2600 / month (160 hrs)",
    services: [
      "Business Documentation and Recordkeeping",
      "Data Organisation and Verification",
      "Invoice and Expense Administration",
      "Workflow and Process Coordination",
      "Vendor Communication",
      "Internal Reporting",
      "Operational Follow-up Management",
    ],
    size: "lg:col-span-5",
  },
  {
    number: "04",
    title: "Digital Marketing Support",
    weeklyPrice: "$750 /week",
    monthlyPrice: "$3000 / month (160 hrs)",
    services: [
      "Content Calendar Management",
      "Social Media Coordination",
      "Campaign Execution Assistance",
      "Email Marketing Coordination",
      "Creative Asset Management",
      "Competitor and Audience Research",
      "Marketing Performance Tracking",
    ],
    size: "lg:col-span-7",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function VirtualAssistantServices() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg-soft)] px-4 py-18 sm:px-6 sm:py-24 lg:px-10 lg:py-24">
      {/* Background Atmosphere */}

      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 max-w-3xl sm:mb-16 lg:mb-20"
        >
          <h2 className="max-w-3xl text-[var(--white)]">
            Choose the support that matches your{" "}
            <span className="relative inline-block text-[var(--blue-3)]">
              business priorities.
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-[var(--blue-3)] transition-all duration-700 group-hover:w-full"
              />
            </span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {categories.map((category, index) => (
            <motion.article
              key={category.number}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.12,
              }}
              variants={cardVariants}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: reduceMotion ? 0 : index * 0.10,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`va-service-card group relative isolate min-w-0 overflow-hidden rounded-[22px] border border-[var(--white)]/10 bg-[var(--bg-soft)] p-5 transition-[border-color,background-color,box-shadow] duration-500 sm:rounded-[28px] sm:p-7 lg:p-8 hover:border-[var(--blue-3)]/55 hover:bg-[var(--blue-1)]/25 hover:shadow-[0_20px_60px_rgba(0,80,157,0.13)] ${category.size}`}
            >
              {/* Top Animated Border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-[var(--blue-1)] via-[var(--blue-3)] to-[var(--white)] transition-all duration-700 ease-out group-hover:w-full"
              />

              {/* Background Gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at 100% 0%, color-mix(in srgb, var(--blue-3) 16%, transparent), transparent 65%)",
                }}
              />

              {/* Large Background Number */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-5 -z-10 select-none font-serif text-[130px] font-bold leading-none tracking-tighter text-[var(--white)]/[0.035] transition-[transform,color] duration-700 ease-out group-hover:-translate-x-3 group-hover:translate-y-2 group-hover:text-[var(--blue-3)]/[0.12] sm:text-[170px] lg:text-[190px]"
              >
                {category.number}
              </div>

              {/* Decorative Corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 overflow-hidden"
              >
                <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 border border-[var(--blue-3)]/10 transition-all duration-700 group-hover:scale-150 group-hover:border-[var(--blue-3)]/30" />
              </div>

              {/* Card Header */}
              <div className="relative mb-7">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-8 bg-[var(--blue-3)] transition-all duration-500 group-hover:w-14" />

                    <span className="font-serif text-sm font-bold tracking-[0.15em] text-[var(--blue-3)]">
                      {category.number}
                    </span>
                  </div>

                  {/* Animated Arrow */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--white)]/10 text-[var(--text-muted)] transition-all duration-500 group-hover:rotate-45 group-hover:border-[var(--blue-3)]/50 group-hover:bg-[var(--blue-2)]/20 group-hover:text-[var(--white)]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>

                <h3 className="relative z-10 max-w-[480px] text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--blue-3)]">
                  {category.title}
                </h3>

                {/* Pricing Row */}
                <div className="relative z-10 mt-3.5 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center rounded-full border border-[var(--blue-3)]/35 bg-[var(--blue-1)]/35 px-3.5 py-1 text-xs font-semibold tracking-wide text-[var(--white)] transition-colors duration-300 group-hover:border-[var(--blue-3)]/65 sm:text-[13px]">
                    {category.weeklyPrice}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[var(--white)]/12 bg-[var(--bg-main)]/60 px-3.5 py-1 text-xs font-medium text-[var(--text-muted)] transition-colors duration-300 group-hover:border-[var(--blue-3)]/40 group-hover:text-[var(--white)] sm:text-[13px]">
                    {category.monthlyPrice}
                  </span>
                </div>
              </div>

              {/* Animated Divider */}
              <div className="relative mb-6 h-px w-full bg-[var(--white)]/10">
                <div className="absolute left-0 top-0 h-px w-12 bg-[var(--blue-3)] transition-all duration-700 group-hover:w-1/2" />
              </div>

              {/* Services List */}
              <div className="relative grid grid-cols-1 gap-x-5 sm:grid-cols-2 lg:gap-x-7">
                {category.services.map((service) => (
                  <div
                    key={service}
                    className="va-service-item group/item flex min-h-[52px] items-center gap-3 border-b border-[var(--white)]/[0.07] py-3 transition-colors duration-300 hover:border-[var(--blue-3)]/40"
                  >
                    {/* Animated Indicator */}
                    <span
                      aria-hidden="true"
                      className="relative flex h-[8px] w-[8px] shrink-0 items-center justify-center rounded-full bg-[var(--blue-3)] transition-all duration-300 group-hover/item:scale-125 group-hover/item:shadow-[0_0_12px_var(--blue-3)]"
                    />

                    {/* Service Name */}
                    <span className="text-[12px] leading-[1.7] text-[var(--white)] transition-[color,transform] duration-300 group-hover/item:translate-x-1 group-hover/item:text-[var(--white)] sm:text-[13px]">
                      {service}
                    </span>

                    {/* Hover Arrow */}
                    <svg
                      aria-hidden="true"
                      className="ml-auto h-3.5 w-3.5 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--blue-3)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                ))}
              </div>

              {/* Bottom Corner Accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full border border-[var(--blue-3)]/10 transition-all duration-700 group-hover:-bottom-4 group-hover:-right-4 group-hover:scale-125 group-hover:border-[var(--blue-3)]/30"
              />

              {/* Bottom Accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-8 h-[2px] w-0 bg-gradient-to-r from-[var(--blue-2)] to-[var(--blue-3)] transition-all duration-700 group-hover:w-24"
              />
            </motion.article>
          ))}
        </div>
      </div>

      {/* Local responsive and accessibility styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .va-service-card,
          .va-service-item {
            transition: none !important;
          }
        }

        @media (hover: none) {
          .va-service-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
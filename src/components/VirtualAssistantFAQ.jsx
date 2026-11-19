import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQ_DATA = [
  {
    id: 1,
    question: "What are virtual assistant services?",
    answer:
      "Virtual assistant services provide remote professional support for business and administrative tasks. These services can include email management, scheduling, customer support, data entry, research, marketing coordination, and other operational responsibilities.",
  },
  {
    id: 2,
    question: "Are virtual assistant services suitable for small businesses?",
    answer:
      "Yes. Startups and small businesses can delegate time-consuming responsibilities without immediately expanding their in-house teams. Growing companies can also use virtual assistants to support existing workflows and manage increasing workloads.",
  },
  {
    id: 3,
    question: "How quickly can I get a virtual assistant?",
    answer:
      "Once we understand your requirements, we identify suitable support based on the tasks and skills involved. The onboarding timeline depends on the role, availability, and scope of work. We confirm the expected timeline when providing your quotation.",
  },
  {
    id: 4,
    question: "Can I hire a dedicated virtual assistant?",
    answer:
      "Yes. Depending on your requirements and the agreed service arrangement, we can discuss dedicated support for recurring business responsibilities and ongoing tasks.",
  },
  {
    id: 5,
    question: "Do you offer part-time and full-time virtual assistant services?",
    answer:
      "We discuss flexible working arrangements based on your workload, required hours, and business priorities. Contact our team to explore a suitable support plan.",
  },
  {
    id: 6,
    question: "How much do virtual assistant services cost?",
    answer:
      "The cost depends on the type of assistance, required skills, working hours, and scope of responsibilities. We provide customised quotations based on your business requirements rather than assuming every business needs the same package.",
  },
  {
    id: 7,
    question: "Is my business information kept secure?",
    answer:
      "Confidential work is handled under agreed confidentiality terms. You decide which tools, systems and accounts your assistant can access. We recommend using appropriate access controls and secure account permissions to protect business information.",
  },
  {
    id: 8,
    question: "Can my virtual assistant work in my time zone?",
    answer:
      "Working hours and communication overlap are discussed at the beginning of the engagement. We aim to establish an arrangement that fits your business schedule and communication requirements.",
  },
  {
    id: 9,
    question: "How is a virtual assistant different from an in-house employee?",
    answer:
      "A virtual assistant works remotely and provides support according to an agreed scope and working arrangement. This can reduce the need for office space, equipment, and traditional recruitment overheads while giving businesses access to the assistance they need.",
  },
  {
    id: 10,
    question: "Can I change my virtual assistant requirements later?",
    answer:
      "Yes. Business priorities can change, and we can discuss adjustments to your responsibilities, working hours, and service requirements based on the agreed engagement terms and available support.",
  },
];

export default function VirtualAssistantFAQ() {
  const [openId, setOpenId] = useState(1);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="va-faq"
      className="bg-[var(--bg-soft)] py-20 text-[var(--white)] md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <h2 className="heading-h2 text-[var(--white)]">
            Frequently Asked{" "}
            <span className="text-[var(--blue-3)]">Questions</span>
          </h2>
        </motion.div>

        {/* Clean Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-[var(--blue-3)] bg-[var(--white)] shadow-lg"
                    : "border-white/15 bg-[var(--white)]/95 hover:border-[var(--blue-3)]/60 hover:bg-[var(--white)]"
                }`}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left sm:px-6 sm:py-5 focus:outline-none"
                  >
                    <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors sm:mt-0 ${
                          isOpen
                            ? "bg-[var(--blue-2)] text-white"
                            : "bg-[var(--blue-1)]/10 text-[var(--blue-1)]"
                        }`}
                      >
                        {String(item.id).padStart(2, "0")}
                      </span>

                      <span
                        className={`font-serif text-base sm:text-lg font-bold leading-snug transition-colors ${
                          isOpen
                            ? "text-[var(--blue-1)]"
                            : "text-[var(--text-main)]"
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-[var(--blue-2)] text-white"
                          : "bg-slate-100 text-[var(--blue-1)]"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-[4.25rem]">
                        <p className="border-t border-slate-100 pt-3.5 text-sm sm:text-base leading-relaxed text-[color:var(--text-main)]/85">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
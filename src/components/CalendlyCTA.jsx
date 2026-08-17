import React, { useEffect, useState } from "react";

const CALENDLY_URL =
  "https://calendly.com/consultation-makeolix/30min?hide_gdpr_banner=1";

const CalendlyCTA = () => {
  const [isOpen, setIsOpen] = useState(false);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ESC to close */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* =====================================================
          FLOATING CONSULTATION CTA
      ===================================================== */}

      <div
        className="
          fixed
          bottom-7
          right-[82px]
          z-[9990]
          group

          max-md:bottom-[82px]
          max-md:right-4
        "
      >
        {/* =================================================
            EXPANDED CARD
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[66px]
            right-0

            w-[315px]

            translate-y-3
            scale-[0.96]
            origin-bottom-right

            rounded-[22px]
            border
            border-white/[0.09]

            bg-[#041820]/95
            p-5

            opacity-0
            invisible

            shadow-[0_25px_70px_rgba(0,0,0,0.55)]
            backdrop-blur-2xl

            transition-all
            duration-300
            ease-out

            group-hover:pointer-events-auto
            group-hover:visible
            group-hover:translate-y-0
            group-hover:scale-100
            group-hover:opacity-100

            max-md:bottom-[68px]
            max-md:w-[285px]
          "
        >
          {/* subtle glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-36
              w-36
              rounded-full
              bg-[#118ab2]/10
              blur-3xl
            "
          />

          {/* Top label */}
          <div className="relative mb-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#118ab2] opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-[#118ab2]" />
            </span>

            <span className="text-[8px] font-semibold tracking-[0.2em] text-slate-500">
              FREE CONSULTATION
            </span>
          </div>

          {/* Heading */}
          <h3
            className="
              relative
              font-['Merriweather']
              text-[21px]
              font-bold
              leading-[1.35]
              text-white
            "
          >
            Ready to grow
            <span className="block text-[#118ab2]">
              your business?
            </span>
          </h3>

          {/* Description */}
          <p className="relative mt-2.5 text-[11px] leading-[1.7] text-slate-400">
            Let's discuss your goals and explore the
            right strategy for your business.
          </p>

          {/* Meta */}
          <div className="relative mt-3 flex items-center gap-3 text-[9px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#118ab2]" />
              30 minutes
            </span>

            <span className="h-3 w-px bg-white/10" />

            <span>Online</span>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="
              relative
              mt-4
              flex
              w-full
              items-center
              justify-between

              rounded-xl
              border
              border-[#118ab2]/30

              bg-[#00509d]/20

              px-3.5
              py-3

              text-[11px]
              font-semibold
              text-white

              transition-all
              duration-300

              hover:border-[#118ab2]/70
              hover:bg-[#00509d]/35
              hover:shadow-[0_8px_25px_rgba(17,138,178,0.15)]
            "
          >
            <span>Schedule a Call</span>

            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-[#118ab2]/15
                text-sm
                text-[#6dd5ed]
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            >
              →
            </span>
          </button>
        </div>

        {/* =================================================
            MAIN FLOATING ORB
        ================================================= */}

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Book a consultation"
          className="
            relative
            flex
            h-[54px]
            w-[54px]
            items-center
            justify-center

            rounded-full

            border
            border-[#118ab2]/50

            bg-[#041820]

            text-white

            shadow-[0_12px_35px_rgba(0,0,0,0.45)]

            transition-all
            duration-300

            hover:scale-110
            hover:border-[#6dd5ed]/80
            hover:shadow-[0_0_35px_rgba(17,138,178,0.28)]

            focus:outline-none
          "
        >
          {/* Outer glow */}
          <span
            className="
              absolute
              inset-[-5px]
              rounded-full
              border
              border-[#118ab2]/10
              transition-all
              duration-500
              group-hover:inset-[-8px]
              group-hover:border-[#118ab2]/20
            "
          />

          {/* Icon circle */}
          <span
            className="
              flex
              h-[38px]
              w-[38px]
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-[#118ab2]
              to-[#00509d]
              shadow-[0_0_20px_rgba(17,138,178,0.2)]
            "
          >
            {/* Calendar icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-[17px] w-[17px]"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="17"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <path
                d="M8 2.5V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M16 2.5V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M3 9H21"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <path
                d="M8 13H8.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M12 13H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M16 13H16.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M8 17H8.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M12 17H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          {/* tiny indicator */}
          <span
            className="
              absolute
              right-1
              top-1
              h-2
              w-2
              rounded-full
              border
              border-[#041820]
              bg-[#6dd5ed]
              shadow-[0_0_8px_rgba(109,213,237,0.8)]
            "
          />
        </button>
      </div>

      {/* =====================================================
          CALENDLY MODAL
      ===================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[99999]

            flex
            items-center
            justify-center

            bg-[#00080c]/85
            p-5

            backdrop-blur-xl

            max-md:p-0
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          {/* Modal */}
          <div
            className="
              flex
              h-[92vh]
              w-full
              max-w-[1100px]
              flex-col
              overflow-hidden

              rounded-[24px]
              border
              border-[#118ab2]/20

              bg-[#051923]

              shadow-[0_40px_120px_rgba(0,0,0,0.7)]

              max-md:h-dvh
              max-md:rounded-none
              max-md:border-0
            "
          >
            {/* Header */}
            <div
              className="
                flex
                shrink-0
                items-center
                justify-between

                border-b
                border-white/[0.06]

                px-7
                py-5

                max-md:px-5
                max-md:py-4
              "
            >
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#118ab2]" />

                  <span className="text-[8px] font-bold tracking-[0.2em] text-slate-500">
                    MAKEOLIX CONSULTING
                  </span>
                </div>

                <h2
                  className="
                    font-['Merriweather']
                    text-[22px]
                    font-bold
                    text-white

                    max-md:text-[18px]
                  "
                >
                  Book your
                  <span className="text-[#118ab2]">
                    {" "}
                    consultation
                  </span>
                </h2>

                <p className="mt-1 text-[10px] text-slate-500">
                  Choose a convenient date and time to talk with our team.
                </p>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]

                  text-slate-300

                  transition-all
                  duration-300

                  hover:rotate-90
                  hover:border-[#118ab2]/50
                  hover:bg-[#118ab2]/10
                  hover:text-white
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Calendly */}
            <div className="min-h-0 flex-1 bg-white">
              <iframe
                src={CALENDLY_URL}
                title="MakeOlix Consultation Booking"
                className="h-full min-h-[620px] w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendlyCTA;
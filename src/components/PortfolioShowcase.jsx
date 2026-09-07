import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Mouse, MoveUpRight } from "lucide-react";

import Button from "./Button";


const PortfolioShowcase = ({
  projects = [],
  eyebrow = "Selected Work",
  title = "Projects that make an impression.",
  description = "",
}) => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[var(--bg-soft)]
        py-20
        sm:py-18
        lg:py-22
      "
    >
      {/* =========================================
          SMALL BACKGROUND ACCENT
      ========================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-32
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-[var(--blue-3)]/[0.045]
          blur-[100px]
        "
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">

        {/* =========================================
            SECTION INTRO
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-14 max-w-3xl sm:mb-16 lg:mb-20"
        >
          {/* Eyebrow */}

          {eyebrow && (
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--blue-3)]" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[var(--blue-3)]
                "
              >
                {eyebrow}
              </span>
            </div>
          )}

          {/* Heading */}

          <h2
            className="
              max-w-[900px]
              text-4xl
              font-semibold
              leading-[1.02]
              tracking-[-0.035em]
              text-[var(--white)]
              sm:text-5xl
              lg:text-6xl
              xl:text-[68px]
            "
          >
            {title}
          </h2>

          {/* Description */}

          {description && (
            <p
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-[var(--text-muted)]
                sm:text-base
              "
            >
              {description}
            </p>
          )}
        </motion.div>


        {/* =========================================
            PROJECT LIST
        ========================================== */}

        <div className="space-y-10 sm:space-y-14 lg:space-y-20">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id || index}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};


/* =========================================================
   PORTFOLIO CARD
========================================================= */

const PortfolioCard = ({ project, index }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const cardRef = useRef(null);

  const screenshots = project.screenshots || [];

  const currentScreenshot = screenshots[currentSlide];


  /* =====================================================
     LIGHT PARALLAX

     Only transforms are changed while scrolling.
     No manual scroll event listener.
  ====================================================== */

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-3%", "3%"]
  );

  const previewY = useTransform(
    scrollYProgress,
    [0, 1],
    [18, -18]
  );


  /* =====================================================
     SLIDER
  ====================================================== */

  const nextSlide = () => {
    if (screenshots.length <= 1) return;

    setCurrentSlide((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  };


  const previousSlide = () => {
    if (screenshots.length <= 1) return;

    setCurrentSlide((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };


  const selectSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };


  /* =====================================================
     OPEN EXTERNAL PROJECT

     Existing Button component is used.
  ====================================================== */

  const openProject = () => {
    if (!project.liveUrl) return;

    window.open(
      project.liveUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };


  return (
    <motion.article
      ref={cardRef}

      initial={{
        opacity: 0,
        y: 55,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
        amount: 0.12,
      }}

      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}

      className="
        group
        relative
        min-h-[620px]
        overflow-hidden
        rounded-[30px]
        border
        border-white/[0.08]
        bg-[var(--bg-soft)]
        shadow-[0_30px_90px_rgba(0,0,0,0.24)]
      "
    >

      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      {project.backgroundImage && (
        <motion.div
          style={{ y: backgroundY }}
          className="
            absolute
            -inset-y-8
            inset-x-0
            overflow-hidden
          "
        >
          <img
            src={project.backgroundImage}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="
              h-full
              w-full
              object-cover
              object-center
              opacity-90
              transition-transform
              duration-[1200ms]
              ease-out
              group-hover:scale-[1.035]
              group-hover:opacity-80
            "
          />
        </motion.div>
      )}


      {/* =====================================================
          OVERLAY
      ====================================================== */}

 <div
  aria-hidden="true"
  className="
    absolute
    inset-0
    bg-[linear-gradient(90deg,rgba(0,23,31,0.82)_0%,rgba(0,23,31,0.68)_32%,rgba(0,23,31,0.38)_62%,rgba(0,23,31,0.52)_100%)]
  "
/>
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_top,rgba(0,23,31,0.72),transparent_58%)]
        "
      />


      {/* =====================================================
          TOP RIGHT PROJECT NUMBER
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-6
          top-6
          z-10
          hidden
          font-mono
          text-[10px]
          tracking-[0.25em]
          text-white/25
          sm:block
          lg:right-10
          lg:top-8
        "
      >
        PROJECT {String(index + 1).padStart(2, "0")}
      </div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[620px]
          flex-col
          justify-between
          p-6
          sm:p-9
          lg:p-12
        "
      >

        {/* ================================================
            MAIN TWO COLUMN AREA
        ================================================= */}

       <div
  className={`
    grid
    flex-1
    grid-cols-1
    items-center
    gap-12
    lg:grid-cols-[1fr_1.15fr]
    lg:gap-14
    xl:gap-20
  `}
>

          {/* ==============================================
              LEFT SIDE
          =============================================== */}

          <div
  className={`
    max-w-[510px]
    ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}
  `}
>

            {/* Category */}

            <div className="mb-7 flex items-center gap-3">

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[var(--blue-3)]
                  shadow-[0_0_14px_rgba(17,138,178,0.7)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[var(--blue-3)]
                "
              >
                {project.category || "Featured Project"}
              </span>

            </div>


            {/* Title */}

            <h3
              className="
                max-w-[520px]
                text-4xl
                font-semibold
                leading-[0.94]
                tracking-[-0.04em]
                text-[var(--white)]
                sm:text-5xl
                lg:text-[58px]
                xl:text-[64px]
              "
            >
              {project.title}
            </h3>


            {/* Description */}

            {project.description && (
              <p
                className="
                  mt-7
                  max-w-[450px]
                  text-sm
                  leading-7
                  text-white/95
                  sm:text-[15px]
                "
              >
                {project.description}
              </p>
            )}


            {/* Features */}

            {project.features?.length > 0 && (
              <div className="mt-7 space-y-3">

                {project.features.slice(0, 3).map(
                  (feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.15 + featureIndex * 0.06,
                      }}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[var(--blue-3)]/40
                          bg-[var(--blue-3)]/10
                        "
                      >
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[var(--blue-3)]
                          "
                        />
                      </span>

                      <span className="text-xs text-white/80">
                        {feature}
                      </span>
                    </motion.div>
                  )
                )}

              </div>
            )}


            {/* =============================================
                BUTTON
            ============================================== */}

            <div className="mt-9">

              <Button
                type="button"
                variant="primary"
                icon={true}
                onClick={openProject}
                ariaLabel={`View ${project.title} project`}
              >
                View Project
              </Button>

            </div>

          </div>


          {/* ==============================================
              RIGHT SIDE
          =============================================== */}

          <motion.div
  style={{ y: previewY }}
  className={`
    relative
    w-full
    ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}
  `}
>

            {/* Small glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-3
                rounded-[30px]
                bg-[var(--blue-3)]/[0.08]
                opacity-0
                blur-2xl
                transition-opacity
                duration-700
                group-hover:opacity-100
              "
            />


            {/* ============================================
                BROWSER WINDOW
            ============================================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-white/15
                bg-white
                shadow-[0_30px_70px_rgba(0,0,0,0.42)]
                transition-transform
                duration-700
                ease-out
                group-hover:-translate-y-1
              "
            >

              {/* Browser Header */}

              <div
                className="
                  relative
                  z-30
                  flex
                  h-10
                  items-center
                  gap-1.5
                  border-b
                  border-black/[0.08]
                  bg-white
                  px-4
                "
              >

                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />

                <div
                  className="
                    ml-4
                    flex
                    h-6
                    flex-1
                    items-center
                    overflow-hidden
                    rounded-full
                    bg-black/[0.035]
                    px-3
                    text-[9px]
                    text-black/35
                  "
                >
                  <span className="truncate">
                    {project.liveUrl
                      ?.replace(/^https?:\/\//, "")
                      .replace(/\/$/, "") || "website.com"}
                  </span>
                </div>

              </div>


              {/* ==========================================
                  SCREENSHOT VIEWPORT
              =========================================== */}

              <div
                className="
                  relative
                  h-[330px]
                  overflow-y-auto
                  overscroll-contain
                  scroll-smooth
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >

                <AnimatePresence mode="wait" initial={false}>

                  {currentScreenshot ? (
                    <motion.img
                      key={currentScreenshot.image}
                      src={currentScreenshot.image}
                      alt={`${project.title} ${
                        currentScreenshot.name || "page"
                      } screenshot`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}

                      initial={{
                        opacity: 0,
                      }}

                      animate={{
                        opacity: 1,
                      }}

                      exit={{
                        opacity: 0,
                      }}

                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}

                      className="
                        block
                        h-auto
                        w-full
                        select-none
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-[330px]
                        items-center
                        justify-center
                        bg-[var(--bg-soft)]
                        text-sm
                        text-white/40
                      "
                    >
                      No screenshot available
                    </div>
                  )}

                </AnimatePresence>


                {/* Scroll hint */}

                

              </div>


              {/* ==========================================
                  PREVIOUS BUTTON
              =========================================== */}

              {screenshots.length > 1 && (
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous page screenshot"
                  className="
                    absolute
                    left-4
                    top-1/2
                    z-40
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/10
                    bg-white/90
                    text-black/65
                    shadow-lg
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-[var(--blue-3)]
                    hover:text-white
                  "
                >
                  <ArrowLeft size={16} />
                </button>
              )}


              {/* ==========================================
                  NEXT BUTTON
              =========================================== */}

              {screenshots.length > 1 && (
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next page screenshot"
                  className="
                    absolute
                    right-4
                    top-1/2
                    z-40
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/10
                    bg-white/90
                    text-black/65
                    shadow-lg
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-[var(--blue-3)]
                    hover:text-white
                  "
                >
                  <ArrowRight size={16} />
                </button>
              )}

            </div>


            {/* ============================================
                SLIDER FOOTER
            ============================================= */}

            {screenshots.length > 1 && (
              <div className="mt-5 flex items-center justify-between gap-5">

                {/* Page name */}

                <div className="flex min-w-0 items-center gap-3">

                  <span
                    className="
                      shrink-0
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-white/30
                    "
                  >
                    Viewing
                  </span>

                  <span className="h-px w-5 shrink-0 bg-white/15" />

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={currentScreenshot?.name || currentSlide}
                      initial={{
                        opacity: 0,
                        x: 6,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -6,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="
                        truncate
                        text-xs
                        font-medium
                        text-white/70
                      "
                    >
                      {currentScreenshot?.name ||
                        `Page ${currentSlide + 1}`}
                    </motion.span>
                  </AnimatePresence>

                </div>


                {/* Counter + dots */}

                <div className="flex shrink-0 items-center gap-3">

                  <span
                    className="
                      font-mono
                      text-[10px]
                      text-white/30
                    "
                  >
                    {String(currentSlide + 1).padStart(2, "0")}
                    {" / "}
                    {String(screenshots.length).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-1.5">

                    {screenshots.map(
                      (screenshot, screenshotIndex) => (
                        <button
                          key={screenshotIndex}
                          type="button"
                          onClick={() =>
                            selectSlide(screenshotIndex)
                          }
                          aria-label={`Show ${
                            screenshot.name ||
                            `page ${screenshotIndex + 1}`
                          } screenshot`}
                          className={`
                            h-1.5
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              currentSlide === screenshotIndex
                                ? "w-7 bg-[var(--blue-3)]"
                                : "w-1.5 bg-white/25 hover:bg-white/50"
                            }
                          `}
                        />
                      )
                    )}

                  </div>

                </div>

              </div>
            )}

          </motion.div>

        </div>


        {/* ================================================
            BOTTOM META
        ================================================= */}

        {(project.platform || project.year) && (
          <div
            className="
              mt-10
              flex
              flex-wrap
              items-center
              justify-between
              gap-5
              border-t
              border-white/[0.08]
              pt-5
            "
          >

            <div className="flex items-center gap-7">

              {project.platform && (
                <div className="flex items-center gap-2.5">
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-white/25
                    "
                  >
                    Platform
                  </span>

                  <span className="text-xs font-medium text-white/90">
                    {project.platform}
                  </span>
                </div>
              )}

              {project.year && (
                <div className="flex items-center gap-2.5">
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-white/25
                    "
                  >
                    Year
                  </span>

                  <span className="text-xs font-medium text-white/90">
                    {project.year}
                  </span>
                </div>
              )}

            </div>


            

          </div>
        )}

      </div>

    </motion.article>
  );
};


export default PortfolioShowcase;
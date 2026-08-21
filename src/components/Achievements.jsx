"use client";

import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const awards = [
  {
    image: "/Top firms - Makeolix consulting.webp",
    alt: "Among Digital Marketing's Top Firms",
    title: "Among Digital Marketing's Top Firms",
    description:
      "Being recognized among Top Digital Marketing Firms reflects our focus on building strategies that go beyond visibility. ",
    link: "https://topfirms.co/company-detail/5411/makeolix-consulting",
  },
  {
    image: "/Best in search - Makeolix consulting.webp",
    alt: "Recognized for Local SEO Expertise",
    title: "Recognized for Local SEO Expertise",
    description:
      "Our Local SEO recognition highlights our ability to help businesses strengthen their presence in location-based search. ",
    link: "https://www.topseos.com/profile/makeolix-consulting",
  },
  {
    image: "/Good Firms - Makeolix consulting.webp",
    alt: "Recognized for SEO Excellence",
    title: "Recognized for SEO Excellence",
    description:
      "Our recognition as a Top SEO Services Company reflects our commitment to delivering strategic, results-focused SEO solutions.",
    link: "https://www.goodfirms.co/company/makeolix-consulting",
  },
  {
    image: "/Crowd Reviews - Makeolix Consulting.webp",
    alt: "Recognized by Clients, Trusted by the Crowd",
    title: "Recognized by Clients, Trusted by the Crowd",
    description:
      "Recognized by CrowdReviews through client-driven feedback, reflecting MakeOlix’s commitment to delivering meaningful digital marketing results.",
    link: "https://www.crowdreviews.com/makeolix-consulting/company-info",
  },
  {
    image: "/C2creview - Makeolix Consulting.webp",
    alt: "Verified Digital Marketing Excellence",
    title: "Verified Digital Marketing Excellence",
    description:
      "Our Verified Digital Marketing recognition reflects our commitment to delivering professional, strategy-led solutions for modern businesses. ",
    link: "https://c2creview.co/company/makeolix-consulting",
  },
  {
    image: "/Sortlist - Makeolix Consulting.webp",
    alt: "Recognized by Sortlist for Digital Expertise ",
    title: "Recognized by Sortlist for Digital Expertise ",
    description:
      "Our Sortlist recognition reflects our commitment to delivering strategic, creative, and performance-driven digital solutions.",
    link: "https://www.sortlist.com/agency/makeolix-consulting",
  },
  {
    image: "/Selected Firms - Makeolix Consulting.webp",
    alt: "Trusted for E-Commerce SEO",
    title: "Trusted for E-Commerce SEO",
    description:
      "Recognized as a Top E-Commerce SEO Company, we help online businesses strengthen organic visibility across products, categories, and high-intent searches. ",
    link: "https://selectedfirms.co/agency/makeolix-consulting",
  },
  // {
  //   image: "/Designrush - Makeolix consulting.webp",
  //   alt: "Recognized Where Leading Agencies Stand Out",
  //   title: "Recognized Where Leading Agencies Stand Out",
  //   description:
  //     "Featured on DesignRush for delivering SEO, eCommerce, web development, and digital marketing solutions.",
  //   link: "https://www.designrush.com/agency/profile/makeolix-consulting",
  // },
  {
    image: "/Crunchbase - Makeolix consulting.webp",
    alt: "Built for Growth. Positioned for Scale.",
    title: "Built for Growth. Positioned for Scale.",
    description:
      "Recognized on Crunchbase as a digital marketing company focused on scalable digital growth solutions.",
    link: "https://www.crunchbase.com/organization/makeolix-consulting",
  },
  {
    image: "/Techimply - Makeolix consulting.webp",
    alt: "A Digital Partner Across Every Growth Stage",
    title: "A Digital Partner Across Every Growth Stage",
    description:
      "Featured on Techimply for our expertise in SEO, eCommerce, web development, and digital marketing.",
    link: "https://www.crunchbase.com/organization/makeolix-consulting",
  },
  {
    image: "/Digital agency network - Makeolix consulting.webp",
    alt: "Verified Expertise. Results That Matte",
    title: "Verified Expertise. Results That Matter.",
    description:
      "Recognized as a Verified Agency for delivering results-driven SEO and digital marketing solutions.",
    link: "https://digitalagencynetwork.com/agency/makeolix-consulting/",
  },
  {
    image: "/Trustindex - Makeolix Consulting.webp",
    alt: "Our Reputation, Written by Our Clients",
    title: "Our Reputation, Written by Our Clients",
    description:
      "Our verified Trustindex profile showcases genuine client reviews and experiences with MakeOlix.",
    link: "https://www.trustindex.io/reviews/www.makeolix.com",
  },
  {
    image: "/g2 - Makeolix Consulting.webp",
    alt: "Part of the Global Digital Services Conversation",
    title: "Part of the Global Digital Services Conversation",
    description:
      "Featured on G2 for our digital marketing, SEO, Shopify, and eCommerce expertise.",
    link: "https://www.g2.com/products/makeolix-consulting/reviews",
  },
  // {
  //   image: "/Agency Network - Makeolix Consulting.webp",
  //   alt: "Verified in the Agency Network",
  //   title: "Verified in the Agency Network",
  //   description:
  //     "Recognized as a Verified Agency for providing SEO, web development, and digital marketing services.",
  //   link: "https://agencynetwork.org/agency/483/makeolix-consulting-noida",
  // },
];

const Achievements = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Lightweight auto slider
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % awards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  const nextAward = () => {
    setActive((prev) => (prev + 1) % awards.length);
  };

  const previousAward = () => {
    setActive((prev) => (prev - 1 + awards.length) % awards.length);
  };

  const currentAward = awards[active];

  return (
    <section
      className="relative overflow-hidden bg-[#00171f] py-16 sm:py-20 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* ================= HEADING ================= */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-14">
          <h2
            className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
            style={{
              fontFamily: "Merriweather, serif",
            }}
          >
            Our Achievements & Awards
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base sm:leading-7">
            Celebrating the milestones, partnerships, and results that
            continue to shape our journey of digital excellence.
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* ================= LEFT CONTENT ================= */}
          <div className="order-2 md:order-1">

            <div
              key={active}
              className="animate-[fadeIn_.25s_ease-out]"
            >
              {/* Number */}
              <div className="mb-4 flex items-center gap-4 sm:mb-6">
                <span className="text-5xl font-light leading-none text-white/[0.07] sm:text-6xl md:text-7xl">
                  {String(active + 1).padStart(2, "0")}
                </span>

                <span className="h-px w-10 bg-white/10 sm:w-14" />
              </div>

              {/* Title */}
              <h3 className="max-w-lg text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
                {currentAward.title}
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/45 sm:mt-5 sm:text-base">
                {currentAward.description}
              </p>

              {/* Controls */}
              <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">

                <button
                  type="button"
                  onClick={previousAward}
                  aria-label="Previous award"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors duration-200 hover:border-[#118ab2] hover:bg-[#118ab2]/10 hover:text-white sm:h-11 sm:w-11"
                >
                  <FiArrowLeft
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                  />
                </button>

                <button
                  type="button"
                  onClick={nextAward}
                  aria-label="Next award"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors duration-200 hover:border-[#118ab2] hover:bg-[#118ab2]/10 hover:text-white sm:h-11 sm:w-11"
                >
                  <FiArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>

                {/* Progress Dots */}
                <div className="ml-1 flex items-center gap-1.5 sm:ml-3">
                  {awards.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Show award ${index + 1}`}
                      className="flex items-center py-2"
                    >
                      <span
                        className={`h-1 rounded-full transition-[width,background-color] duration-200 ${active === index
                            ? "w-7 bg-[#118ab2]"
                            : "w-2 bg-white/15 hover:bg-white/30"
                          }`}
                      />
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT SHOWCASE ================= */}
          <div className="order-1 min-w-0 md:order-2">

            <div className="relative mx-auto w-full max-w-[580px]">

              {/* Decorative Frames */}
              <div className="absolute inset-[4%] rounded-[28px] border border-white/[0.035]" />

              <div className="absolute inset-[8%] rounded-[25px] border border-[#118ab2]/10" />

              {/* Main Card Area */}
              <div className="relative flex min-h-[280px] items-center justify-center px-5 py-7 sm:min-h-[330px] sm:px-8 sm:py-9 md:min-h-[350px]">

                {/* ================= AWARD LINK ================= */}
                <a
                  key={active}
                  href={currentAward.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${currentAward.alt}`}
                  className="group relative z-10 flex h-[230px] w-full max-w-[380px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#061f28] transition-[border-color,box-shadow] duration-300 hover:border-[#118ab2]/50 hover:shadow-[0_20px_50px_rgba(17,138,178,0.12)] sm:h-[275px] sm:max-w-[440px] md:h-[290px]"
                >

                  {/* Top Accent */}
                  <span className="absolute left-1/2 top-0 z-30 h-[2px] w-20 -translate-x-1/2 bg-[#118ab2] transition-[width] duration-300 group-hover:w-32" />

                  {/* Corner Decorations */}
                  <span className="absolute left-5 top-5 z-30 h-5 w-5 border-l border-t border-[#118ab2]/40" />

                  <span className="absolute bottom-5 right-5 z-30 h-5 w-5 border-b border-r border-[#118ab2]/40" />

                  {/* Award Image */}
                  <img
                    src={currentAward.image}
                    alt={currentAward.alt}
                    width="440"
                    height="290"
                    loading={active === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="relative z-10 max-h-[165px] max-w-[230px] object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:max-h-[205px] sm:max-w-[290px]"
                  />

                  {/* ================= HOVER OVERLAY ================= */}
                  <span className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center bg-gradient-to-t from-[#00171f]/90 via-[#00171f]/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">



                  </span>
                </a>
              </div>
            </div>

            {/* ================= THUMBNAILS ================= */}
            <div className="mt-3 overflow-x-auto pb-2 sm:mt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

              <div className="flex min-w-max justify-center gap-2 px-2 sm:gap-2.5">

                {awards.map((award, index) => (
                  <button
                    key={award.image}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Select ${award.alt}`}
                    className={`group relative flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border transition-[border-color,background-color] duration-200 sm:h-16 sm:w-[72px] ${active === index
                        ? "border-[#118ab2] bg-[#118ab2]/10"
                        : "border-white/[0.06] bg-white/[0.025] hover:border-white/20"
                      }`}
                  >
                    <img
                      src={award.image}
                      alt={award.alt}
                      width="72"
                      height="64"
                      loading="lazy"
                      decoding="async"
                      className={`max-h-9 max-w-[48px] object-contain transition-opacity duration-200 sm:max-h-11 sm:max-w-[55px] ${active === index
                          ? "opacity-100"
                          : "opacity-35 group-hover:opacity-75"
                        }`}
                    />

                    {/* Active Indicator */}
                    {active === index && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#118ab2]" />
                    )}
                  </button>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
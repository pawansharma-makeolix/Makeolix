import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendingUp,
  CalendarRange,
  PiggyBank,
  Compass,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    id: "digital-roots",
    num: "01",
    title: "Digital marketing roots",
    icon: TrendingUp,
    positionClass: "lg:col-start-1 lg:row-start-1",
    fromX: 80,
    fromY: 60,
    spokePath: "M 500 310 C 410 310, 390 155, 290 155",
    renderDescription: (seoLink) => (
      <>
        We are a digital marketing and{" "}
        <a
          href={seoLink}
          className="group/link inline-flex items-center gap-0.5 font-semibold text-[var(--blue-2)] underline decoration-[#118ab2]/50 decoration-2 underline-offset-4 transition-colors hover:text-[var(--blue-3)] hover:decoration-[var(--accent-pink)]"
        >
          <span>trusted SEO agency</span>
          <ArrowUpRight className="inline h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
        , so our assistants understand growth, not just admin.
      </>
    ),
  },
  {
    id: "flexible-plans",
    num: "02",
    title: "Flexible plans",
    icon: CalendarRange,
    positionClass: "lg:col-start-3 lg:row-start-1",
    fromX: -80,
    fromY: 60,
    spokePath: "M 500 310 C 590 310, 610 155, 710 155",
    renderDescription: () => (
      <>
        Weekly or monthly options suit startups and established teams alike.
      </>
    ),
  },
  {
    id: "lower-overhead",
    num: "03",
    title: "Lower overhead",
    icon: PiggyBank,
    positionClass: "lg:col-start-3 lg:row-start-2",
    fromX: -80,
    fromY: -60,
    spokePath: "M 500 310 C 590 310, 610 465, 710 465",
    renderDescription: () => (
      <>
        Remote support means no office space, equipment, or payroll costs.
      </>
    ),
  },
  {
    id: "more-time",
    num: "04",
    title: "More time for strategy",
    icon: Compass,
    positionClass: "lg:col-start-1 lg:row-start-2",
    fromX: 80,
    fromY: -60,
    spokePath: "M 500 310 C 410 310, 390 465, 290 465",
    renderDescription: () => (
      <>
        Delegate the repetitive work and focus on revenue and decisions only you
        can make.
      </>
    ),
  },
];

export default function WhyChooseMakeolix({ seoLink = "https://makeolix.com/services/seo" }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── DESKTOP: True Viewport Lock (Pin) + Step-by-Step Card Reveal ───
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray(".orbital-card");
        const spokes = gsap.utils.toArray(".orbital-spoke");
        const dots = gsap.utils.toArray(".hub-dot");

        // Prepare SVG stroke lengths for clean line-drawing animation
        spokes.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 0,
          });
        });

        // Initial hidden states for all 4 cards
        cards.forEach((card) => {
          const fx = Number(card.dataset.fromX || 0);
          const fy = Number(card.dataset.fromY || 0);
          gsap.set(card, {
            opacity: 0,
            x: fx,
            y: fy,
            scale: 0.85,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".desktop-pin-stage",
            start: "top top",
            end: "+=2400", // Scroll distance while screen stays locked
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        // Rotate outer dashed orbit ring across the entire pinned scroll
        tl.to(
          ".hub-orbit-ring",
          {
            rotation: 180,
            ease: "none",
            duration: 4,
          },
          0
        );

        // Reveal each spoke + card + progress dot sequentially (0 -> 1 -> 2 -> 3)
        cards.forEach((card, i) => {
          const stepStart = i * 1;

          tl.to(
            spokes[i],
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 0.45,
              ease: "power2.out",
            },
            stepStart
          )
            .to(
              card,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.65,
                ease: "back.out(1.4)",
              },
              stepStart + 0.15
            )
            .to(
              dots[i],
              {
                backgroundColor: "#4cc9f0",
                scale: 1.4,
                duration: 0.3,
              },
              stepStart + 0.25
            );
        });

        // Small breathing hold at the end so user sees all 4 cards before unpinning
        tl.to({}, { duration: 0.5 });
      });

      // ─── MOBILE & TABLET: Individual Scroll Reveal Per Card ───
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray(".mobile-reason-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 36, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.3)",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-makeolix"
      className="relative bg-[var(--bg-main)] text-[var(--white)] selection:bg-[#118ab2] selection:text-white"
    >
      {/* ─── DESKTOP PINNED ORBITAL STAGE (Locks screen while cards reveal 1-by-1) ─── */}
      <div className="desktop-pin-stage relative hidden h-screen w-full items-center overflow-hidden bg-[var(--bg-main)] lg:flex">
        {/* Ambient Center Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(17,138,178,0.22),rgba(0,80,157,0.12)_45%,transparent_70%)]"
        />

        {/* Faint Architectural Dot Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#4cc9f0_1px,transparent_1px)] [background-size:28px_28px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="relative">
            {/* Animated SVG Spoke Connectors */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 620"
              fill="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="spokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#118ab2" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#4cc9f0" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ff8fab" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {REASONS.map((item) => (
                <path
                  key={item.id}
                  d={item.spokePath}
                  stroke="url(#spokeGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="orbital-spoke"
                />
              ))}
            </svg>

            {/* Center Locked Heading Hub */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <div className="pointer-events-auto relative flex h-72 w-72 xl:h-80 xl:w-80 flex-col items-center justify-center rounded-full border border-[#118ab2]/45 bg-[var(--bg-soft)]/95 p-8 text-center shadow-[0_0_80px_rgba(17,138,178,0.32)] backdrop-blur-md">
                {/* Rotating Dashed Orbit Ring */}
                <div
                  aria-hidden="true"
                  className="hub-orbit-ring pointer-events-none absolute -inset-3.5 rounded-full border border-dashed border-[#4cc9f0]/45"
                >
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--accent-pink)] shadow-[0_0_12px_#ff8fab]" />
                  <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#118ab2] shadow-[0_0_12px_#118ab2]" />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-full border border-white/10"
                />

                

                <h2 className="font-serif text-2xl xl:text-[26px] leading-snug font-bold text-[var(--white)]">
                  Why Do Businesses Choose{" "}
                  <span className="bg-gradient-to-r from-[#4cc9f0] to-[#118ab2] bg-clip-text text-transparent">
                    Makeolix Consulting?
                  </span>
                </h2>

                {/* 4-Step Scroll Progress Indicator Dots */}
                <div aria-hidden="true" className="mt-4 flex items-center gap-2">
                  {REASONS.map((r) => (
                    <span
                      key={r.id}
                      className="hub-dot h-2 w-2 rounded-full bg-white/20"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Corner Cards Grid */}
            <div className="relative z-10 grid grid-cols-[1fr_290px_1fr] xl:grid-cols-[1fr_330px_1fr] grid-rows-2 gap-x-8 gap-y-20">
              {REASONS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    data-from-x={item.fromX}
                    data-from-y={item.fromY}
                    className={`orbital-card group relative rounded-2xl border border-white/90 bg-[var(--white)] p-6 xl:p-7 text-[var(--text-main)] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow] duration-300 hover:border-[#118ab2] hover:shadow-[0_25px_55px_-12px_rgba(17,138,178,0.35)] ${item.positionClass}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-6 top-0 h-1 origin-center scale-x-0 rounded-b-full bg-gradient-to-r from-[var(--blue-1)] via-[var(--blue-3)] to-[var(--accent-pink)] transition-transform duration-300 group-hover:scale-x-100"
                    />

                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--blue-1)] via-[var(--blue-2)] to-[var(--blue-3)] text-white shadow-md shadow-[#00509d]/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="font-serif text-sm font-bold tracking-wider text-[#003863]/40 transition-colors group-hover:text-[var(--blue-3)]">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="heading-h4 mb-2.5 text-[var(--blue-1)] transition-colors group-hover:text-[var(--blue-2)]">
                      {item.title}
                    </h3>

                    <p className="text-sm xl:text-[15px] leading-relaxed text-[color:var(--text-main)]/80">
                      {item.renderDescription(seoLink)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE & TABLET SEQUENTIAL SCROLL LAYOUT (Below lg) ─── */}
      <div className="relative overflow-hidden py-20 lg:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#4cc9f0_1px,transparent_1px)] [background-size:24px_24px]"
        />

        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#118ab2]/35 bg-[var(--bg-soft)] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#4cc9f0] uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-pink)]" />
              Why Choose Us
            </div>
            <h2 className="heading-h2 text-[var(--white)]">
              Why Do Businesses Choose{" "}
              <span className="bg-gradient-to-r from-[#118ab2] via-[#4cc9f0] to-[#118ab2] bg-clip-text text-transparent">
                Makeolix Consulting?
              </span>
            </h2>
          </div>

          <div className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-[#118ab2] before:via-[#4cc9f0] before:to-[var(--accent-pink)]">
            {REASONS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="mobile-reason-card relative pl-14"
                >
                  <span className="absolute top-6 left-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#4cc9f0] bg-[var(--bg-main)] text-[10px] font-bold text-white shadow-[0_0_12px_rgba(76,201,240,0.5)]">
                    {item.num}
                  </span>

                  <div className="rounded-2xl border border-white/90 bg-[var(--white)] p-6 text-[var(--text-main)] shadow-xl">
                    <div className="mb-3.5 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--blue-1)] via-[var(--blue-2)] to-[var(--blue-3)] text-white shadow-md">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="heading-h4 text-[var(--blue-1)]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-[15px] leading-relaxed text-[color:var(--text-main)]/80">
                      {item.renderDescription(seoLink)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";

/**
 * HalloweenHero — FINAL (offer valid till 31st Oct)
 *
 * Use: jahan <Hero /> import hota hai wahan
 *   import Hero from "./HalloweenHero";
 * Halloween ke baad purana import wapas laga do.
 *
 * Speed:
 *  - Saari loop animation CSS transform/opacity (GPU), koi blur/filter animate nahi
 *  - Hero screen se bahar jaate hi saari animation pause (IntersectionObserver)
 *  - Koi video / particles engine / extra image nahi — sab inline SVG
 *  - Mobile par kam elements, prefers-reduced-motion par sab band
 */

const BANNER = "/Makeolix%20consulting%20home%20page%20banner.webp";

/* ============================ SVG ARTWORK ============================ */

const Bat = () => (
  <svg viewBox="0 0 64 40" className="w-full h-auto overflow-visible" aria-hidden="true">
    <g fill="#140b1f" stroke="#ff8a1f" strokeWidth=".7" strokeLinejoin="round">
      <path
        className="mkx-wing mkx-wing-l"
        d="M32 22C26 10 12 6 1 12C6 14 7 18 7 22C10 19 14 20 16 25C19 22 23 24 25 29C27 26 30 26 32 30Z"
      />
      <path
        className="mkx-wing mkx-wing-r"
        d="M32 22C38 10 52 6 63 12C58 14 57 18 57 22C54 19 50 20 48 25C45 22 41 24 39 29C37 26 34 26 32 30Z"
      />
      <ellipse cx="32" cy="25" rx="4.2" ry="7.5" />
      <circle cx="32" cy="16.5" r="4.2" />
      <path d="M28.6 14L27.4 8.5L31 12.4ZM35.4 14L36.6 8.5L33 12.4Z" />
    </g>
    <circle cx="30.6" cy="16" r=".9" fill="#ffd27a" />
    <circle cx="33.4" cy="16" r=".9" fill="#ffd27a" />
  </svg>
);

const Pumpkin = ({ className = "" }) => (
  <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="mkxPk" cx="50%" cy="38%" r="68%">
        <stop offset="0" stopColor="#ffb02e" />
        <stop offset=".55" stopColor="#f26a00" />
        <stop offset="1" stopColor="#a63500" />
      </radialGradient>
      <radialGradient id="mkxFace" cx="50%" cy="50%" r="60%">
        <stop offset="0" stopColor="#fff3a8" />
        <stop offset="1" stopColor="#ffc928" />
      </radialGradient>
    </defs>
    <path d="M58 26C56 14 60 8 68 6L70 12C65 14 64 19 64 26Z" fill="#3e6b1f" />
    <path d="M68 12C78 8 88 12 90 22C82 20 74 20 68 12Z" fill="#4f8a28" opacity=".85" />
    <ellipse cx="30" cy="68" rx="25" ry="36" fill="url(#mkxPk)" />
    <ellipse cx="90" cy="68" rx="25" ry="36" fill="url(#mkxPk)" />
    <ellipse cx="45" cy="68" rx="24" ry="40" fill="url(#mkxPk)" />
    <ellipse cx="75" cy="68" rx="24" ry="40" fill="url(#mkxPk)" />
    <ellipse cx="60" cy="68" rx="18" ry="42" fill="url(#mkxPk)" />
    <g fill="none" stroke="#8c2b00" strokeWidth="1.6" opacity=".35" strokeLinecap="round">
      <path d="M45 30C38 55 38 82 45 106" />
      <path d="M75 30C82 55 82 82 75 106" />
      <path d="M26 42C16 62 18 84 28 100" />
      <path d="M94 42C104 62 102 84 92 100" />
    </g>
    <path d="M38 58L52 58L45 44Z" fill="url(#mkxFace)" />
    <path d="M68 58L82 58L75 44Z" fill="url(#mkxFace)" />
    <path d="M60 66L55 74L65 74Z" fill="url(#mkxFace)" />
    <path
      d="M34 80C42 92 52 90 56 84L60 92L64 84C68 90 78 92 86 80C78 84 70 82 66 78L60 82L54 78C50 82 42 84 34 80Z"
      fill="url(#mkxFace)"
    />
  </svg>
);

const Ghost = () => (
  <svg viewBox="0 0 80 100" className="w-full h-auto" aria-hidden="true">
    <defs>
      <linearGradient id="mkxGh" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
        <stop offset="1" stopColor="#bfe9f7" stopOpacity=".55" />
      </linearGradient>
    </defs>
    <path d="M8 92V42C8 18 22 4 40 4s32 14 32 38v50l-10-9-11 9-11-9-11 9-11-9z" fill="url(#mkxGh)" />
    <path d="M10 56C2 58-2 66 2 72C6 68 10 66 14 66Z" fill="url(#mkxGh)" />
    <path d="M70 56C78 58 82 66 78 72C74 68 70 66 66 66Z" fill="url(#mkxGh)" />
    <ellipse cx="30" cy="40" rx="5" ry="7" fill="#0b1b24" />
    <ellipse cx="50" cy="40" rx="5" ry="7" fill="#0b1b24" />
    <ellipse cx="40" cy="58" rx="6" ry="8" fill="#0b1b24" />
    <circle cx="31.5" cy="37.5" r="1.6" fill="#fff" />
    <circle cx="51.5" cy="37.5" r="1.6" fill="#fff" />
  </svg>
);

const Spider = () => (
  <svg viewBox="0 0 44 44" className="w-full h-auto" aria-hidden="true">
    <g stroke="#0d0714" strokeWidth="2" strokeLinecap="round" fill="none">
      <path d="M18 24C10 20 6 22 3 30" />
      <path d="M18 26C10 28 8 34 8 40" />
      <path d="M18 22C11 14 8 14 5 8" />
      <path d="M19 20C15 12 15 8 17 3" />
      <path d="M26 24C34 20 38 22 41 30" />
      <path d="M26 26C34 28 36 34 36 40" />
      <path d="M26 22C33 14 36 14 39 8" />
      <path d="M25 20C29 12 29 8 27 3" />
    </g>
    <ellipse cx="22" cy="28" rx="8" ry="9.5" fill="#0d0714" />
    <circle cx="22" cy="16" r="5.5" fill="#0d0714" />
    <circle cx="20" cy="15" r="1.3" fill="#ff5a3c" />
    <circle cx="24" cy="15" r="1.3" fill="#ff5a3c" />
    <path d="M22 24L19 30L22 34L25 30Z" fill="#ff5a3c" opacity=".8" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 200 200" className="w-full h-auto" aria-hidden="true">
    <defs>
      <radialGradient id="mkxMoon" cx="38%" cy="35%" r="75%">
        <stop offset="0" stopColor="#fffbe8" />
        <stop offset=".6" stopColor="#ffe9a8" />
        <stop offset="1" stopColor="#f5b04a" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="92" fill="url(#mkxMoon)" />
    <g fill="#e6b45e" opacity=".45">
      <circle cx="68" cy="70" r="16" />
      <circle cx="128" cy="62" r="9" />
      <circle cx="118" cy="122" r="22" />
      <circle cx="62" cy="128" r="8" />
      <circle cx="152" cy="108" r="6" />
    </g>
  </svg>
);

const Cobweb = () => (
  <svg viewBox="0 0 160 160" className="w-full h-auto" aria-hidden="true">
    <g stroke="#fff" strokeOpacity=".35" strokeWidth="1" fill="none" strokeLinecap="round">
      <path d="M0 0L160 0M0 0L0 160M0 0L140 100M0 0L100 140M0 0L155 50M0 0L50 155" />
      <path d="M30 0C30 14 14 30 0 30" />
      <path d="M58 0C60 26 28 58 0 58" />
      <path d="M90 0C92 40 40 92 0 90" />
      <path d="M124 0C124 56 58 124 0 124" />
    </g>
  </svg>
);

const Ground = () => (
  <svg
    viewBox="0 0 1440 220"
    preserveAspectRatio="xMidYMax slice"
    className="absolute bottom-0 left-0 w-full h-[20vh] min-h-[110px] z-[4] pointer-events-none"
    aria-hidden="true"
  >
    <g fill="#020b10">
      <path d="M0 220V160C120 130 240 150 380 158S640 128 800 142 1100 170 1250 140 1380 128 1440 142V220Z" />
      <path d="M930 160v-40a16 16 0 0132 0v40z" />
      <path d="M1000 164v-28a12 12 0 0124 0v28z" />
    </g>
    <g stroke="#020b10" strokeLinecap="round" fill="none">
      <path d="M1250 170C1252 130 1246 100 1256 60" strokeWidth="10" />
      <path d="M1254 100C1230 84 1214 80 1196 60" strokeWidth="6" />
      <path d="M1256 80C1280 66 1296 66 1316 44" strokeWidth="5" />
      <path d="M1216 76C1208 62 1210 50 1200 40" strokeWidth="3" />
      <path d="M1296 60C1304 50 1304 40 1316 30" strokeWidth="3" />
      <path d="M1256 62C1254 46 1262 34 1258 20" strokeWidth="4" />
    </g>
  </svg>
);

/* ============================ DATA ============================ */

// delay negative = page load par hi udte hue dikhenge
const bats = [
  { top: "14%", w: "w-12 md:w-16", dur: 16, delay: -4, bob: 2.4, show: "" },
  { top: "30%", w: "w-8 md:w-10", dur: 22, delay: -13, bob: 3.1, show: "" },
  { top: "52%", w: "w-7 md:w-9", dur: 18, delay: -8, bob: 2.0, show: "" },
  { top: "8%", w: "w-14 md:w-20", dur: 26, delay: -20, bob: 2.8, show: "hidden md:block" },
  { top: "40%", w: "w-8", dur: 20, delay: -2, bob: 2.2, show: "hidden md:block" },
  { top: "22%", w: "w-6", dur: 13, delay: -10, bob: 1.8, show: "hidden md:block" },
  { top: "62%", w: "w-10", dur: 24, delay: -17, bob: 2.6, show: "hidden lg:block" },
];

// hanging spiders: left/right position, thread length, size, drop timing
const spiders = [
  { pos: { right: "26%" }, thread: "h-24 lg:h-36", size: "w-8 lg:w-11", drop: 6, delay: 0, show: "hidden md:flex" },
  { pos: { right: "10%" }, thread: "h-14 lg:h-20", size: "w-6 lg:w-8", drop: 5, delay: -2, show: "flex" },
  { pos: { right: "42%" }, thread: "h-10 lg:h-14", size: "w-5 lg:w-7", drop: 7, delay: -4, show: "hidden lg:flex" },
  { pos: { left: "44%" }, thread: "h-16 lg:h-24", size: "w-6 lg:w-8", drop: 8, delay: -1, show: "hidden lg:flex" },
];

// floating embers (neeche se upar)
const embers = [
  { l: "8%", s: 4, d: 9, t: 0, show: "" },
  { l: "22%", s: 3, d: 12, t: -4, show: "hidden sm:block" },
  { l: "36%", s: 5, d: 10, t: -7, show: "" },
  { l: "52%", s: 3, d: 13, t: -2, show: "hidden md:block" },
  { l: "64%", s: 4, d: 11, t: -9, show: "" },
  { l: "74%", s: 3, d: 8, t: -5, show: "hidden md:block" },
  { l: "86%", s: 5, d: 12, t: -1, show: "" },
  { l: "93%", s: 3, d: 10, t: -6, show: "hidden sm:block" },
];

// twinkling stars (upar ka aasmaan)
const stars = [
  ["10%", "6%"], ["18%", "16%"], ["30%", "9%"], ["42%", "4%"], ["50%", "14%"],
  ["58%", "7%"], ["66%", "18%"], ["76%", "5%"], ["84%", "20%"], ["92%", "10%"],
];

const lines = [
  ["Prices", "so", "low,"],
  ["it's", "scary"],
];

/* ============================ COMPONENT ============================ */

const HalloweenHero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  let letterIndex = 0;

  // Hero screen se bahar => saari animation pause (CPU/GPU bachta hai)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("mkx-paused", !entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: "easeOut" },
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden text-white"
      style={{ backgroundColor: "var(--bg-main, #00171f)" }}
    >
      <style>{`
        @keyframes mkx-fly    { from { transform: translate3d(-22vw,0,0) } to { transform: translate3d(122vw,0,0) } }
        @keyframes mkx-bob    { 0%,100% { transform: translate3d(0,0,0) rotate(-5deg) } 50% { transform: translate3d(0,-34px,0) rotate(6deg) } }
        @keyframes mkx-flap   { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(.3) } }
        @keyframes mkx-float  { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-18px,0) } }
        @keyframes mkx-drift  { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(16px,-26px,0) } }
        @keyframes mkx-sway   { 0%,100% { transform: rotate(-5deg) } 50% { transform: rotate(5deg) } }
        @keyframes mkx-drop   { 0%,100% { transform: translate3d(0,-8px,0) } 50% { transform: translate3d(0,26px,0) } }
        @keyframes mkx-glow   { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
        @keyframes mkx-fog    { from { transform: translate3d(-6%,0,0) } to { transform: translate3d(6%,0,0) } }
        @keyframes mkx-flick  { 0%,17%,21%,60%,64%,100% { opacity: 1 } 19%,62% { opacity: .45 } }
        @keyframes mkx-twinkle{ 0%,100% { opacity: .15 } 50% { opacity: .9 } }
        @keyframes mkx-ember  { 0% { transform: translate3d(0,0,0); opacity: 0 } 15% { opacity: .9 } 100% { transform: translate3d(24px,-85vh,0); opacity: 0 } }
        @keyframes mkx-letter {
          0%   { opacity: 0; transform: translate3d(0,.55em,0) rotate(7deg) scale(.9) }
          60%  { opacity: 1; transform: translate3d(0,-.06em,0) rotate(-1deg) scale(1.03) }
          100% { opacity: 1; transform: none }
        }
        @keyframes mkx-spin   { to { transform: rotate(360deg) } }
        @keyframes mkx-shine  { 0%,55% { transform: translate3d(-130%,0,0) skewX(-20deg) } 100% { transform: translate3d(330%,0,0) skewX(-20deg) } }
        @keyframes mkx-ping   { 0% { transform: scale(1); opacity: .8 } 80%,100% { transform: scale(2.6); opacity: 0 } }
        @keyframes mkx-beat   { 0%,100% { transform: scale(1) } 50% { transform: scale(1.045) } }

        .mkx-bat-fly  { position: absolute; left: 0; will-change: transform; animation: mkx-fly linear infinite; }
        .mkx-bat-bob  { animation: mkx-bob ease-in-out infinite; }
        .mkx-wing     { transform-box: fill-box; animation: mkx-flap .38s ease-in-out infinite; will-change: transform; }
        .mkx-wing-l   { transform-origin: 100% 100%; }
        .mkx-wing-r   { transform-origin: 0% 100%; }
        .mkx-float    { animation: mkx-float 5s ease-in-out infinite; will-change: transform; }
        .mkx-drift    { animation: mkx-drift 8s ease-in-out infinite; will-change: transform; }
        .mkx-sway     { transform-origin: top center; animation: mkx-sway 5s ease-in-out infinite; will-change: transform; }
        .mkx-dropper  { animation: mkx-drop ease-in-out infinite; will-change: transform; }
        .mkx-glow     { animation: mkx-glow 3.2s ease-in-out infinite; }
        .mkx-fog      { animation: mkx-fog 16s ease-in-out infinite alternate; will-change: transform; }
        .mkx-scary    { animation: mkx-flick 4.5s linear 3.2s infinite; }
        .mkx-star     { animation: mkx-twinkle 3s ease-in-out infinite; }
        .mkx-ember    { position: absolute; bottom: -10px; border-radius: 9999px; background: #ffa83a; box-shadow: 0 0 8px 2px rgba(255,140,30,.7); animation: mkx-ember linear infinite; will-change: transform, opacity; }
        .mkx-letter   { display: inline-block; opacity: 0; animation: mkx-letter .6s cubic-bezier(.2,.8,.2,1) forwards; will-change: transform, opacity; }

        /* Offer badge */
        .mkx-beat     { animation: mkx-beat 2.4s ease-in-out infinite; }
        .mkx-ring     { position: absolute; left: 50%; top: 50%; width: 300%; aspect-ratio: 1; margin: -150% 0 0 -150%;
                        background: conic-gradient(from 0deg, transparent 0 55%, #ff8a1f 75%, #ffd27a 85%, #118ab2 95%, transparent 100%);
                        animation: mkx-spin 3.2s linear infinite; will-change: transform; }
        .mkx-shine    { position: absolute; inset: 0 auto 0 0; width: 35%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent);
                        animation: mkx-shine 3.6s ease-in-out infinite; will-change: transform; }
        .mkx-ping     { animation: mkx-ping 1.6s ease-out infinite; }

        .mkx-paused *, .mkx-paused { animation-play-state: paused !important; }

        @media (prefers-reduced-motion: reduce) {
          .mkx-bat-fly, .mkx-bat-bob, .mkx-wing, .mkx-float, .mkx-drift, .mkx-sway, .mkx-dropper,
          .mkx-glow, .mkx-fog, .mkx-scary, .mkx-star, .mkx-ember, .mkx-beat, .mkx-ring,
          .mkx-shine, .mkx-ping { animation: none; }
          .mkx-bat-fly { transform: translate3d(30vw,0,0); }
          .mkx-ember { display: none; }
          .mkx-letter { animation: none; opacity: 1; }
        }
      `}</style>

      {/* ---------- Banner image ---------- */}
      <img
        src={BANNER}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Halka overlay (image saaf rahe) */}
      <div className="absolute inset-0 z-[1] md:hidden bg-[#00171f]/55" />
      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,23,31,.72) 0%, rgba(0,23,31,.38) 38%, rgba(0,23,31,0) 68%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 10%, rgba(255,160,40,.18), transparent 70%), radial-gradient(50% 40% at 10% 100%, rgba(120,60,200,.16), transparent 70%)",
        }}
      />

      {/* ---------- Decorations ---------- */}
      {/* Stars */}
      {stars.map(([l, t], i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`mkx-star absolute z-[2] h-[3px] w-[3px] rounded-full bg-white ${i % 2 ? "hidden md:block" : ""}`}
          style={{ left: l, top: t, animationDelay: `${(i % 5) * 0.6}s` }}
        />
      ))}

      {/* Moon */}
      <div aria-hidden="true" className="absolute z-[2] right-[5%] top-[6%] w-28 sm:w-40 lg:w-56" style={{ opacity: 0.95 }}>
        <div
          className="absolute -inset-[45%] rounded-full mkx-glow"
          style={{ background: "radial-gradient(circle, rgba(255,190,90,.38) 0%, transparent 62%)" }}
        />
        <div className="relative">
          <Moon />
        </div>
      </div>

      {/* Fog */}
      <div
        aria-hidden="true"
        className="mkx-fog absolute z-[3] -left-[12%] -right-[12%] bottom-0 h-[38%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 25% 100%, rgba(255,255,255,.16), transparent), radial-gradient(ellipse 35% 55% at 70% 100%, rgba(130,200,230,.18), transparent)",
        }}
      />

      {/* Embers */}
      {embers.map((e, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`mkx-ember z-[5] ${e.show}`}
          style={{ left: e.l, width: e.s, height: e.s, animationDuration: `${e.d}s`, animationDelay: `${e.t}s` }}
        />
      ))}

      {/* Bats */}
      {bats.map((b, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`mkx-bat-fly z-[5] ${b.show}`}
          style={{ top: b.top, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        >
          <div className={`mkx-bat-bob ${b.w}`} style={{ animationDuration: `${b.bob}s` }}>
            <Bat />
          </div>
        </div>
      ))}

      {/* Cobweb */}
      <div aria-hidden="true" className="absolute z-[2] left-0 top-0 w-24 sm:w-32 lg:w-44 opacity-80">
        <Cobweb />
      </div>

      {/* Hanging spiders (upar-neeche utarte + jhoolte) */}
      {spiders.map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`absolute z-[5] top-0 ${s.show}`}
          style={s.pos}
        >
          <div className="mkx-dropper" style={{ animationDuration: `${s.drop}s`, animationDelay: `${s.delay}s` }}>
            <div className="mkx-sway flex flex-col items-center">
              <span className={`block w-px bg-white/55 ${s.thread}`} />
              <div className={`${s.size} -mt-1`}>
                <Spider />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Ghost */}
      <div aria-hidden="true" className="absolute z-[5] right-[30%] bottom-[30%] w-12 lg:w-16 hidden sm:block">
        <div className="mkx-drift relative">
          <div
            className="absolute -inset-[60%] rounded-full mkx-glow"
            style={{ background: "radial-gradient(circle, rgba(190,235,255,.35), transparent 65%)" }}
          />
          <div className="relative">
            <Ghost />
          </div>
        </div>
      </div>

      {/* Pumpkins */}
      <div aria-hidden="true" className="absolute z-[6] right-[4%] bottom-[2%] flex items-end gap-1">
        <div className="relative w-16 sm:w-24 lg:w-32 mkx-float" style={{ animationDuration: "6s" }}>
          <div
            className="absolute -inset-[50%] mkx-glow"
            style={{ background: "radial-gradient(circle, rgba(255,140,20,.45), transparent 60%)" }}
          />
          <Pumpkin className="relative w-full h-auto" />
        </div>
        <div className="relative w-10 sm:w-14 lg:w-20 hidden sm:block">
          <div
            className="absolute -inset-[50%] mkx-glow"
            style={{ background: "radial-gradient(circle, rgba(255,140,20,.4), transparent 60%)", animationDelay: "1.2s" }}
          />
          <Pumpkin className="relative w-full h-auto" />
        </div>
      </div>

      <Ground />

      {/* ---------- Content (left aligned) ---------- */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-28"
        style={{ textShadow: "0 2px 20px rgba(0,23,31,.85)" }}
      >
        <div className="max-w-2xl text-left">
          {/* H1 — 2 lines, letter-by-letter pop reveal */}
          <h1 className="font-extrabold tracking-tight mb-6" aria-label="Prices so low, it's scary">
            {lines.map((words, li) => (
              <span
                key={li}
                aria-hidden="true"
                className={`block leading-[1.02] ${
                  li === 0
                    ? "text-4xl sm:text-5xl lg:text-6xl text-white/95"
                    : "text-6xl sm:text-7xl lg:text-8xl mt-1"
                }`}
              >
                {words.map((word, wi) => {
                  const isScary = word === "scary";
                  return (
                    <span
                      key={wi}
                      className={`inline-block whitespace-nowrap mr-[0.22em] ${isScary ? "mkx-scary" : ""}`}
                      style={
                        isScary
                          ? {
                              color: "#ff8a1f",
                              textShadow: "0 0 16px rgba(255,138,31,.9), 0 0 42px rgba(255,100,0,.55)",
                            }
                          : undefined
                      }
                    >
                      {word.split("").map((ch, ci) => {
                        const d = 300 + letterIndex++ * 60;
                        return (
                          <span key={ci} className="mkx-letter" style={{ animationDelay: `${d}ms` }}>
                            {ch}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p className="text-lg sm:text-xl text-white mb-8 max-w-xl" {...rise(2.0)}>
            This Halloween, Makeolix is dropping a treat with zero tricks: Flat 30% OFF on all plans!
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mb-7" {...rise(2.3)}>
            <Button href={"/contact-us"} ariaLabel="Get in touch with MakeOlix">
              Get In Touch
            </Button>
            <Button variant="outline" href={"/about"} ariaLabel="Know more about MakeOlix">
              Know More
            </Button>
          </motion.div>

          {/* Offer badge — rotating glow border + shine + live dot */}
          <motion.div {...rise(2.7)}>
            <div className="mkx-beat inline-block">
              <div className="relative inline-flex overflow-hidden rounded-full p-[1.5px]">
                <span className="mkx-ring" aria-hidden="true" />
                <div className="relative flex items-center gap-3 overflow-hidden rounded-full bg-[#06141b]/95 pl-3 pr-5 py-2.5 sm:py-3">
                  <span className="mkx-shine" aria-hidden="true" />
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="mkx-ping absolute inline-flex h-full w-full rounded-full bg-[#ff8a1f]" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff8a1f]" />
                  </span>
                  <Pumpkin className="h-6 w-6 sm:h-7 sm:w-7 shrink-0" />
                  <span className="relative text-sm sm:text-base font-semibold text-white tracking-wide">
                    Offer valid until <span className="text-[#ffb347]">31st October.</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HalloweenHero;
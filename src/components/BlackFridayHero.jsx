"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Monitor, MapPin, ShoppingCart, Share2, ArrowUpRight } from "lucide-react";
import Button from "./Button";

/**
 * BlackFridayHero — FINAL v3
 *
 * Use: import Hero from "./BlackFridayHero";   (sale ke baad purana import wapas)
 *
 * Timeline (pure CSS, sirf transform + opacity => compositor par, smooth):
 *   0.00s  balloon (black/red, logo ke saath) screen ke CENTER me neeche se aata hai
 *   1.50s  balloon thartharata hai, pin aati hai
 *   2.05s  POP -> flash + shockwave + rays + tukde + confetti + POORI SCREEN hilti hai
 *   2.25s  heading ka har letter alag-alag udta hua aata hai
 *   2.75s+ services udte hue aate hain, phir dance (hover par "Explore now", click => service page)
 *   3.30s+ spotlights "on" hote hain, countdown, CTA
 *
 * Page speed:
 *  - Koi will-change / blur / filter / backdrop-blur / box-shadow animation nahi
 *  - Koi extra library nahi (react-router-dom + lucide-react already project me hain)
 *  - Hero screen se bahar => saari animation pause; reduced-motion => seedha final state
 *  - Desktop-only mouse parallax + cursor glow (rAF, settle hote hi band)
 *  - BANNER ko .webp/.avif me convert karke use karo (PNG sabse bada LCP bottleneck hota hai)
 */

/* ============================ EDIT HERE ============================ */

const BANNER = "/Cinematic Midnight Gift Display.png"; // <- .webp / .avif me convert karke yahan lagao
const BANNER_MOBILE = ""; // optional: chhota mobile crop, e.g. "/black-friday-mobile.webp"
const LOGO = "/logo1.png";
const OFFER = "Flat 30% OFF";
const VALID_TILL = "30th November";
const SALE_END = "2026-11-30T23:59:59+05:30";

// `to` => us service ke page ka route (apne routes ke hisaab se badlo)
const SERVICES = [
  { label: "SEO", Icon: Search, to: "/services/seo" },
  { label: "Performance Marketing", Icon: TrendingUp, to: "/services/performance-marketing" },
  { label: "Website Design & Development", Icon: Monitor, to: "/services/website-design-development" },
  { label: "Local SEO Services", Icon: MapPin, to: "/services/local-seo" },
  { label: "Ecommerce Development", Icon: ShoppingCart, to: "/services/ecommerce-development" },
  { label: "Social Media Marketing", Icon: Share2, to: "/services/social-media-marketing" },
];

// Banner ke upar jo lamps bane hain unki horizontal position (%) aur unka color (r,g,b)
// Beams wahin se girte hain. Position banner se match na ho to sirf `x` badal do.
const BEAMS = [
  { x: "24%", c: "255,200,61", a: [-6, 4], d: 7, t: 0, show: "hidden sm:block" },
  { x: "35%", c: "255,240,205", a: [5, -5], d: 8, t: 0.25, show: "" },
  { x: "65%", c: "255,200,61", a: [-5, 5], d: 9, t: 0.5, show: "" },
  { x: "76%", c: "255,72,92", a: [4, -6], d: 7.5, t: 0.75, show: "hidden sm:block" },
];

const POP = 2.05; // CSS keyframes ke saath match karta hai
const REVEAL = 2.25;

/* ============================ SVG ARTWORK ============================ */

// Ek baar define, sab SVG me url(#id) se use hota hai
const Defs = () => (
  <svg width="0" height="0" className="absolute" aria-hidden="true">
    <defs>
      <linearGradient id="bfGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff3c4" />
        <stop offset=".45" stopColor="#ffc83d" />
        <stop offset="1" stopColor="#b86e00" />
      </linearGradient>
      <radialGradient id="bfShine" cx=".35" cy=".3" r=".8">
        <stop offset="0" stopColor="#fff" stopOpacity=".6" />
        <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".4" />
      </radialGradient>
    </defs>
  </svg>
);

const BALLOON_PATH = "M60 4C30 4 8 28 8 62C8 96 34 126 54 138L66 138C86 126 112 96 112 62C112 28 90 4 60 4Z";

// Glossy BLACK -> RED balloon (upar red light, neeche deep black) + gold rim
const Balloon = () => (
  <svg viewBox="0 0 120 190" className="h-auto w-full overflow-visible" aria-hidden="true">
    <defs>
      <radialGradient id="bfBody" cx="34%" cy="26%" r="95%">
        <stop offset="0" stopColor="#ff6a5c" />
        <stop offset=".22" stopColor="#d3162a" />
        <stop offset=".5" stopColor="#5a0813" />
        <stop offset=".78" stopColor="#15060a" />
        <stop offset="1" stopColor="#000" />
      </radialGradient>
      <radialGradient id="bfBounce" cx="80%" cy="86%" r="44%">
        <stop offset="0" stopColor="#ff4a3d" stopOpacity=".42" />
        <stop offset="1" stopColor="#ff4a3d" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="bfHi" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".85" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <clipPath id="bfClip">
        <path d={BALLOON_PATH} />
      </clipPath>
    </defs>
    <path d="M60 148C52 160 70 168 58 178C51 185 63 188 60 190" fill="none" stroke="#ffe08a" strokeOpacity=".75" strokeWidth="1.3" strokeLinecap="round" />
    <path d={BALLOON_PATH} fill="url(#bfBody)" />
    <g clipPath="url(#bfClip)">
      <ellipse cx="90" cy="108" rx="44" ry="42" fill="url(#bfBounce)" />
    </g>
    <path d={BALLOON_PATH} fill="none" stroke="url(#bfGold)" strokeOpacity=".6" strokeWidth="1.2" />
    <ellipse cx="33" cy="38" rx="11" ry="22" transform="rotate(-28 33 38)" fill="url(#bfHi)" />
    <ellipse cx="22" cy="66" rx="2.6" ry="6" transform="rotate(-14 22 66)" fill="#fff" fillOpacity=".8" />
    <path d="M52 138Q60 133 68 138L64 147Q60 150 56 147Z" fill="#1a0508" />
    <path d="M56 140Q60 138 64 140" fill="none" stroke="#ffc83d" strokeOpacity=".6" strokeWidth="1" />
  </svg>
);

const Pin = () => (
  <svg viewBox="0 0 120 24" className="h-auto w-full" aria-hidden="true">
    <path d="M0 12L84 9L84 15Z" fill="#d9dde3" />
    <rect x="82" y="7" width="6" height="10" rx="2" fill="#aab0ba" />
    <circle cx="100" cy="12" r="11" fill="url(#bfGold)" />
  </svg>
);

// glossy foil balloon (kisi bhi color me)
const MiniBalloon = ({ color }) => {
  const d = "M20 2C9 2 2 10 2 21C2 32 11 41 18 45L22 45C29 41 38 32 38 21C38 10 31 2 20 2Z";
  return (
    <svg viewBox="0 0 40 64" className="h-auto w-full overflow-visible" aria-hidden="true">
      <path d="M20 46C17 52 24 56 19 60C16 63 21 63 20 64" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
      <path d={d} style={{ fill: color }} />
      <path d={d} fill="url(#bfShine)" />
      <path d="M17 45L20 49L23 45Z" style={{ fill: color }} />
    </svg>
  );
};

const Coin = () => (
  <svg viewBox="0 0 64 64" className="h-auto w-full" aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="#b86e00" />
    <circle cx="32" cy="32" r="27" fill="url(#bfGold)" />
    <circle cx="32" cy="32" r="21" fill="none" stroke="#b86e00" strokeOpacity=".5" strokeWidth="2" strokeDasharray="2 3" />
    <text x="32" y="42" textAnchor="middle" fontSize="28" fontWeight="900" fill="#7a4500">%</text>
    <path d="M12 22A22 22 0 0 1 30 8" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// premium gold seal (scalloped medal) — star-edge path ek baar compute hota hai
const SEAL_PATH =
  Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2;
    const r = i % 2 ? 27.5 : 31;
    return `${i ? "L" : "M"}${(32 + Math.cos(a) * r).toFixed(1)} ${(32 + Math.sin(a) * r).toFixed(1)}`;
  }).join("") + "Z";

const Seal = () => (
  <svg viewBox="0 0 64 64" className="h-auto w-full" aria-hidden="true">
    <path d={SEAL_PATH} fill="#b86e00" />
    <path d={SEAL_PATH} fill="url(#bfGold)" transform="translate(32 32) scale(.94) translate(-32 -32)" />
    <circle cx="32" cy="32" r="19" fill="#120d02" />
    <circle cx="32" cy="32" r="19" fill="none" stroke="url(#bfGold)" strokeWidth="1.6" />
    <circle cx="32" cy="32" r="15" fill="none" stroke="#ffc83d" strokeOpacity=".45" strokeWidth=".8" strokeDasharray="1.5 2.5" />
    <path d="M32 21L35 28.5L43 29L37 34.5L38.8 42.5L32 38.3L25.2 42.5L27 34.5L21 29L29 28.5Z" fill="url(#bfGold)" />
    <path d={SEAL_PATH} fill="url(#bfShine)" />
  </svg>
);

const PriceTag = ({ label, size = 20 }) => (
  <svg viewBox="0 0 80 110" className="h-auto w-full" aria-hidden="true">
    <rect x="6" y="14" width="68" height="92" rx="9" fill="url(#bfGold)" />
    <rect x="6" y="14" width="68" height="92" rx="9" fill="url(#bfShine)" />
    <circle cx="40" cy="27" r="5" fill="#00171f" />
    <rect x="12" y="40" width="56" height="60" rx="6" fill="none" stroke="#1b1b1b" strokeOpacity=".35" strokeDasharray="3 3" />
    <text x="40" y="78" textAnchor="middle" fontSize={size} fontWeight="800" fill="#1b1b1b">{label}</text>
  </svg>
);

const Sparkle = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
    <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" fill="#ffe08a" />
  </svg>
);

/* ============================ DATA ============================ */

// deterministic random — SSR/hydration safe
const rnd = (n) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

// udke aane ka random start point (vw/vh => har screen par sahi)
const fly = (n) => ({
  "--x": `${(rnd(n) - 0.5) * 90}vw`,
  "--y": `${(rnd(n + 30) - 0.5) * 80}vh`,
  "--r": `${(rnd(n + 60) - 0.5) * 900}deg`,
});

const COLORS = ["var(--bf-gold)", "var(--bf-red)", "var(--white)", "var(--blue-3)", "var(--bf-orange)"];
const SHARD_COLORS = ["var(--bf-red)", "#150407", "var(--bf-red)", "#3a0a10"];

const CONFETTI = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2 + rnd(i) * 0.5;
  const d = 150 + rnd(i + 50) * 260;
  const rot = (rnd(i + 9) - 0.5) * 900;
  const w = 6 + rnd(i + 3) * 6;
  const h = 10 + rnd(i + 7) * 8;
  const round = i % 4 === 0;
  return {
    style: {
      "--dx": `${Math.cos(a) * d}px`,
      "--dy": `${Math.sin(a) * d * 0.8 - 60}px`,
      "--r1": `${rot * 0.6}deg`,
      "--r2": `${rot}deg`,
      width: w,
      height: round ? w : h,
      marginLeft: -w / 2,
      marginTop: -h / 2,
      background: COLORS[i % COLORS.length],
      borderRadius: round ? 9999 : 2,
      animationDuration: `${1.5 + rnd(i + 20) * 0.7}s`,
      animationDelay: `${POP}s`,
    },
    show: i < 12 ? "" : "hidden sm:block",
  };
});

const SHARDS = Array.from({ length: 9 }, (_, i) => {
  const a = (i / 9) * Math.PI * 2 + rnd(i + 100) * 0.6;
  const d = 110 + rnd(i + 120) * 130;
  const s = 16 + rnd(i + 160) * 16;
  return {
    "--dx": `${Math.cos(a) * d}px`,
    "--dy": `${Math.sin(a) * d}px`,
    "--r": `${(rnd(i + 140) - 0.5) * 720}deg`,
    width: s,
    height: s,
    marginLeft: -s / 2,
    marginTop: -s / 2,
    background: SHARD_COLORS[i % SHARD_COLORS.length],
    clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
    animationDelay: `${POP}s`,
  };
});

const RAYS = Array.from({ length: 12 }, (_, i) => ({ a: i * 30 + 15, show: i % 2 ? "hidden sm:block" : "" }));

const MINI = [
  { l: "3%", w: "w-8 sm:w-10", c: "var(--bf-red)", d: 17, t: 0.4, show: "" },
  { l: "12%", w: "w-6 sm:w-8", c: "var(--bf-gold)", d: 21, t: 5, show: "hidden sm:block" },
  { l: "86%", w: "w-7 sm:w-9", c: "var(--bf-gold)", d: 19, t: 2, show: "" },
  { l: "93%", w: "w-8 sm:w-10", c: "#1d1d1d", d: 23, t: 7, show: "hidden sm:block" },
  { l: "76%", w: "w-6", c: "var(--bf-red)", d: 25, t: 11, show: "hidden lg:block" },
  { l: "21%", w: "w-6", c: "#f2f2f2", d: 27, t: 14, show: "hidden lg:block" },
];

// Banner ke apne gift/bag/coin se takrane na isliye sirf khuli jagah par, thode aur bade:
// [type, left, top, width px, float duration, offset, show]
const FLOATERS = [
  ["coin", "15%", "30%", 48, 6, 0, "hidden sm:block"],
  ["seal", "87%", "27%", 42, 7, 0.8, "hidden sm:block"],
  ["coin", "82%", "46%", 40, 7, 0.4, "hidden lg:block"],
  ["seal", "9%", "47%", 36, 6, 1.2, "hidden lg:block"],
];

const SPARKLES = [
  ["9%", "12%", 14, 0, ""],
  ["26%", "26%", 10, 0.8, "hidden sm:block"],
  ["38%", "8%", 12, 1.6, ""],
  ["62%", "10%", 10, 0.4, "hidden md:block"],
  ["74%", "24%", 14, 1.2, ""],
  ["90%", "14%", 12, 2, "hidden sm:block"],
  ["84%", "56%", 12, 0.6, "hidden lg:block"],
];

const DUST = [
  { l: "8%", s: 4, d: 10, show: "" },
  { l: "24%", s: 3, d: 13, show: "hidden sm:block" },
  { l: "38%", s: 5, d: 11, show: "" },
  { l: "55%", s: 3, d: 14, show: "hidden md:block" },
  { l: "68%", s: 4, d: 12, show: "" },
  { l: "80%", s: 3, d: 9, show: "hidden md:block" },
  { l: "92%", s: 5, d: 13, show: "" },
];

// Heading: word = nowrap block => letters kabhi alag line me nahi jaayenge
let n = 0;
const HEADING = ["Black", "Friday", "Sale"].map((word) => ({
  word,
  letters: word.split("").map((ch) => {
    const i = n++;
    return { ch, i, s: fly(i + 1) };
  }),
}));

const SERVICE_FLY = SERVICES.map((_, i) => fly(i + 200));

const LETTER_STYLE = {
  backgroundImage: "linear-gradient(180deg,#fff3c4 0%,#ffc83d 55%,#ff9d00 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/* ============================ CSS ============================ */

const CSS = `
  .bf-hero { --bf-gold:#ffc83d; --bf-gold-soft:#ffe08a; --bf-orange:#ff9d00; --bf-red:#e5192b; --bf-ink:#120d02; }

  /* ---- intro balloon ---- */
  @keyframes bf-balloon {
    0%    { transform: translate3d(0,75vh,0) scale(.5); opacity: 0; animation-timing-function: cubic-bezier(.22,1,.36,1); }
    59%   { transform: translate3d(0,0,0) scale(1);     opacity: 1; animation-timing-function: linear; }
    68%   { transform: translate3d(0,0,0) scale(1);     opacity: 1; animation-timing-function: ease-in; }
    93%   { transform: translate3d(0,0,0) scale(1.12);  opacity: 1; animation-timing-function: linear; }
    94.5% { transform: translate3d(0,0,0) scale(1.4);   opacity: 0; visibility: visible; }
    100%  { transform: translate3d(0,0,0) scale(1.4);   opacity: 0; visibility: hidden; }
  }
  @keyframes bf-pin {
    0%,60% { transform: translate3d(260px,-70px,0) rotate(10deg); opacity: 0; animation-timing-function: cubic-bezier(.4,0,.2,1); }
    78%    { transform: translate3d(0,0,0) rotate(0deg);          opacity: 1; animation-timing-function: linear; }
    82%    { transform: translate3d(0,0,0) rotate(0deg);          opacity: 1; animation-timing-function: ease-out; }
    96%    { transform: translate3d(80px,-40px,0) rotate(25deg);  opacity: 0; visibility: visible; }
    100%   { transform: translate3d(80px,-40px,0) rotate(25deg);  opacity: 0; visibility: hidden; }
  }
  @keyframes bf-shake {
    0%,100% { transform: translate3d(0,0,0) rotate(0deg) }
    15% { transform: translate3d(-2px,0,0) rotate(-2deg) }
    30% { transform: translate3d(2px,0,0) rotate(2deg) }
    45% { transform: translate3d(-3px,0,0) rotate(-2.5deg) }
    60% { transform: translate3d(3px,0,0) rotate(2.5deg) }
    75% { transform: translate3d(-2px,0,0) rotate(-1.5deg) }
    90% { transform: translate3d(2px,0,0) rotate(1deg) }
  }
  @keyframes bf-sway { 0%,100% { transform: rotate(-4deg) } 50% { transform: rotate(4deg) } }

  /* ---- pop burst (fill "both" => khatam hone ke baad gayab rehta hai) ---- */
  @keyframes bf-ring  { 0% { transform: scale(0); opacity: 1 } 100% { transform: scale(8); opacity: 0 } }
  @keyframes bf-core  { 0% { transform: scale(0); opacity: .95 } 100% { transform: scale(3); opacity: 0 } }
  @keyframes bf-flash { 0% { opacity: 0 } 8% { opacity: .4 } 100% { opacity: 0 } }
  @keyframes bf-shard {
    0%   { opacity: 0; transform: translate3d(0,0,0) rotate(0deg) }
    1%   { opacity: 1 }
    70%  { opacity: 1 }
    100% { opacity: 0; transform: translate3d(var(--dx),var(--dy),0) rotate(var(--r)) }
  }
  @keyframes bf-conf {
    0%   { opacity: 0; transform: translate3d(0,0,0) rotate(0deg) scale(.6) }
    2%   { opacity: 1 }
    45%  { opacity: 1; transform: translate3d(var(--dx),var(--dy),0) rotate(var(--r1)) scale(1) }
    100% { opacity: 0; transform: translate3d(calc(var(--dx) * 1.08), calc(var(--dy) + 160px), 0) rotate(var(--r2)) scale(1) }
  }
  @keyframes bf-ray {
    0%   { opacity: 0; transform: rotate(var(--a)) translate3d(0,30px,0) scaleY(.2) }
    10%  { opacity: .95 }
    100% { opacity: 0; transform: rotate(var(--a)) translate3d(0,230px,0) scaleY(1) }
  }

  /* poora banner hilta hai (mobile par amplitude aadha) */
  .bf-quake { --qa: 1; animation: bf-quake .9s linear ${POP}s; }
  @media (max-width: 640px) { .bf-quake { --qa: .55; } }
  @keyframes bf-quake {
    0%,100% { transform: none }
    6%  { transform: translate3d(calc(-16px * var(--qa)), calc(10px * var(--qa)), 0) rotate(calc(-.8deg * var(--qa))) scale(1.06) }
    16% { transform: translate3d(calc(14px * var(--qa)), calc(-12px * var(--qa)), 0) rotate(calc(.7deg * var(--qa))) scale(1.05) }
    28% { transform: translate3d(calc(-11px * var(--qa)), calc(8px * var(--qa)), 0) rotate(calc(-.5deg * var(--qa))) scale(1.045) }
    40% { transform: translate3d(calc(9px * var(--qa)), calc(-6px * var(--qa)), 0) rotate(calc(.4deg * var(--qa))) scale(1.035) }
    54% { transform: translate3d(calc(-6px * var(--qa)), calc(4px * var(--qa)), 0) rotate(calc(-.25deg * var(--qa))) scale(1.025) }
    70% { transform: translate3d(calc(3px * var(--qa)), calc(-2px * var(--qa)), 0) scale(1.012) }
    85% { transform: translate3d(calc(-1px * var(--qa)), calc(1px * var(--qa)), 0) scale(1.004) }
  }

  /* ---- reveal ---- */
  @keyframes bf-up { from { opacity: 0; transform: translate3d(0,18px,0) } to { opacity: 1; transform: none } }
  /* letters + services: door se udke aate hain, overshoot karke baithte hain */
  @keyframes bf-fly {
    0%   { opacity: 0; transform: translate3d(var(--x),var(--y),0) rotate(var(--r)) scale(.3) }
    15%  { opacity: 1 }
    75%  { opacity: 1; transform: translate3d(0,-8px,0) rotate(calc(var(--r) * -.03)) scale(1.12) }
    100% { opacity: 1; transform: none }
  }
  /* spotlight "on" hone ka flicker */
  @keyframes bf-lampon { 0% { opacity: 0 } 15% { opacity: 1 } 25% { opacity: .35 } 38% { opacity: 1 } 48% { opacity: .6 } 60%,100% { opacity: 1 } }
  @keyframes bf-drop {
    0%   { transform: translate3d(0,-260px,0) }
    55%  { transform: translate3d(0,14px,0) }
    75%  { transform: translate3d(0,-6px,0) }
    90%  { transform: translate3d(0,2px,0) }
    100% { transform: none }
  }
  @keyframes bf-pop   { 0% { opacity: 0; transform: scale(0) } 60% { opacity: 1; transform: scale(1.15) } 100% { opacity: 1; transform: none } }

  /* ---- loops ---- */
  @keyframes bf-dance {
    0%,100% { transform: translate3d(0,0,0) rotate(-3deg) scale(1,1) }
    25%     { transform: translate3d(0,-14px,0) rotate(3deg) scale(.97,1.04) }
    50%     { transform: translate3d(0,0,0) rotate(-2deg) scale(1.05,.94) }
    75%     { transform: translate3d(0,-8px,0) rotate(3deg) scale(1,1) }
  }
  @keyframes bf-glow    { 0%,100% { opacity: .45 } 50% { opacity: 1 } }
  @keyframes bf-ping    { 0% { transform: scale(1); opacity: .8 } 80%,100% { transform: scale(2.6); opacity: 0 } }
  @keyframes bf-twinkle { 0%,100% { opacity: 0; transform: scale(.5) rotate(0deg) } 50% { opacity: 1; transform: scale(1) rotate(45deg) } }
  @keyframes bf-dust    { 0% { transform: translate3d(0,0,0); opacity: 0 } 15% { opacity: .9 } 100% { transform: translate3d(18px,-90vh,0); opacity: 0 } }
  @keyframes bf-rise    {
    0%   { transform: translate3d(0,0,0) }
    25%  { transform: translate3d(14px,-30vh,0) }
    50%  { transform: translate3d(-10px,-60vh,0) }
    75%  { transform: translate3d(14px,-90vh,0) }
    100% { transform: translate3d(0,-125vh,0) }
  }
  @keyframes bf-float  { 0%,100% { transform: translate3d(0,0,0) rotate(-4deg) } 50% { transform: translate3d(0,-14px,0) rotate(4deg) } }
  @keyframes bf-spin3d { from { transform: rotateY(0deg) } to { transform: rotateY(360deg) } }
  @keyframes bf-beam   { from { transform: rotate(var(--b1)) } to { transform: rotate(var(--b2)) } }
  @keyframes bf-sheen  { 0% { transform: translate3d(-130%,0,0) skewX(-20deg) } 16%,100% { transform: translate3d(520%,0,0) skewX(-20deg) } }
  /* countdown digit flip + colon blink */
  @keyframes bf-flip {
    0%   { opacity: 0; transform: translate3d(0,-60%,0) rotateX(-80deg) scale(.9) }
    60%  { opacity: 1; transform: translate3d(0,6%,0) rotateX(10deg) scale(1.12) }
    100% { opacity: 1; transform: none }
  }
  @keyframes bf-blink { 0%,100% { opacity: 1 } 50% { opacity: .2 } }

  .bf-balloon { animation: bf-balloon 2.2s linear both; }
  .bf-pin     { animation: bf-pin 2.5s linear both; }
  .bf-shake   { transform-origin: 50% 60%; animation: bf-shake .55s linear 1.5s; }
  .bf-sway    { transform-origin: 50% 82%; animation: bf-sway 2.4s ease-in-out infinite; }
  .bf-ring    { animation: bf-ring .8s ease-out both; }
  .bf-core    { animation: bf-core .4s ease-out both; }
  .bf-flash   { animation: bf-flash .6s ease-out both; }
  .bf-shard   { animation: bf-shard .9s ease-out both; }
  .bf-conf    { animation: bf-conf 2s ease-out both; }
  .bf-ray     { transform-origin: 50% 0; animation: bf-ray .8s ease-out both; }

  .bf-up      { animation: bf-up .7s ease-out backwards; }
  .bf-fly     { animation: bf-fly 1.2s cubic-bezier(.2,.7,.2,1) backwards; }
  .bf-lampon  { animation: bf-lampon 1.4s linear backwards; }
  .bf-drop    { animation: bf-drop 1.1s ease-out backwards; }
  .bf-popin   { animation: bf-pop .7s cubic-bezier(.2,.8,.3,1) backwards; }

  .bf-dance   { animation: bf-dance 1.7s ease-in-out infinite backwards; }
  .bf-glow    { animation: bf-glow 3.2s ease-in-out infinite; }
  .bf-ping    { animation: bf-ping 1.6s ease-out infinite; }
  .bf-twinkle { animation: bf-twinkle 3s ease-in-out infinite backwards; }
  .bf-dust    { animation: bf-dust linear infinite backwards; }
  .bf-rise    { animation: bf-rise linear infinite backwards; }
  .bf-float   { animation: bf-float 5s ease-in-out infinite; }
  .bf-spin3d  { animation: bf-spin3d 7s linear infinite; }
  .bf-swing   { transform-origin: 50% 0; animation: bf-sway 3.4s ease-in-out infinite; }
  .bf-beam    { transform-origin: 50% 0; animation: bf-beam 7s ease-in-out infinite alternate; }
  .bf-sheen   { animation: bf-sheen 6s ease-in-out infinite backwards; }
  .bf-flip    { animation: bf-flip .5s cubic-bezier(.2,.8,.3,1); }
  .bf-blink   { animation: bf-blink 1s ease-in-out infinite; }

  .bf-paused *, .bf-paused { animation-play-state: paused !important; }

  @media (prefers-reduced-motion: reduce) {
    .bf-hero *, .bf-hero *::before, .bf-hero *::after { animation: none !important; }
    .bf-art, .bf-burst, .bf-flash, .bf-dust, .bf-rise { display: none !important; }
  }
`;

/* ============================ COUNTDOWN ============================ */

const Countdown = () => {
  const [left, setLeft] = useState(null);

  useEffect(() => {
    const end = new Date(SALE_END).getTime();
    if (Number.isNaN(end)) return;
    const tick = () => {
      if (!document.hidden) setLeft(Math.max(0, end - Date.now()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left === null || left <= 0) return null;

  const s = Math.floor(left / 1000);
  // [label, value, max] — max progress bar ke liye
  const units = [
    ["Days", Math.floor(s / 86400), 30],
    ["Hrs", Math.floor((s % 86400) / 3600), 24],
    ["Mins", Math.floor((s % 3600) / 60), 60],
    ["Secs", s % 60, 60],
  ];

  return (
    <div
      role="timer"
      aria-label={`Sale ends in ${units[0][1]} days ${units[1][1]} hours ${units[2][1]} minutes`}
      className="bf-up flex flex-col items-center gap-3"
      style={{ animationDelay: `${REVEAL + 1.4}s` }}
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="bf-ping absolute inline-flex h-full w-full rounded-full bg-[var(--bf-gold)]" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--bf-gold)]" />
        </span>
        Sale ends in
      </span>

      <div className="flex items-start gap-1.5 sm:gap-2.5">
        {units.map(([label, v, max], i) => (
          <Fragment key={label}>
            {i > 0 && (
              <span aria-hidden="true" className="bf-blink mt-1.5 text-xl font-bold text-[color:var(--bf-gold)] sm:mt-2 sm:text-2xl">
                :
              </span>
            )}
            <div
              className="bf-popin relative flex min-w-[3.4rem] flex-col items-center overflow-hidden rounded-xl border border-[color:var(--bf-gold)]/40 bg-[var(--bg-soft)] px-2 pb-2.5 pt-1.5 sm:min-w-[4.2rem] sm:pt-2"
              style={{ perspective: 300, animationDelay: `${REVEAL + 1.5 + i * 0.12}s` }}
            >
              <span aria-hidden="true" className="bf-glow pointer-events-none absolute inset-0 rounded-xl border border-[color:var(--bf-gold)]" style={{ animationDelay: `${i * 0.4}s` }} />
              <span
                aria-hidden="true"
                className="bf-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3"
                style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)", animationDelay: `${REVEAL + 2 + i * 0.6}s` }}
              />
              <span key={v} className="bf-flip relative block text-xl font-bold leading-none tabular-nums text-[color:var(--bf-gold)] sm:text-2xl">
                {String(v).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] text-[color:var(--text-muted)] sm:text-xs">{label}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[var(--bf-gold)]"
                style={{
                  transform: `scaleX(${Math.min(1, (v + 1) / max)})`,
                  transition: v === 0 ? "none" : "transform 1s linear",
                }}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

/* ============================ COMPONENT ============================ */

const BlackFridayHero = () => {
  const sectionRef = useRef(null);
  const farRef = useRef(null);
  const nearRef = useRef(null);
  const glowRef = useRef(null);

  // screen se bahar => animation pause
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("bf-paused", !entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // mouse parallax + cursor glow — sirf desktop (hover + fine pointer), rAF, settle hote hi band
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let inside = false;
    let tx = 0, ty = 0, cx = 0, cy = 0; // parallax
    let gtx = 0, gty = 0, gx = 0, gy = 0; // glow

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      gx += (gtx - gx) * 0.14;
      gy += (gty - gy) * 0.14;
      if (farRef.current) farRef.current.style.transform = `translate3d(${cx * -10}px,${cy * -8}px,0)`;
      if (nearRef.current) nearRef.current.style.transform = `translate3d(${cx * -22}px,${cy * -16}px,0)`;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${gx}px,${gy}px,0)`;
      const busy =
        Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 || Math.abs(gtx - gx) > 0.5 || Math.abs(gty - gy) > 0.5;
      raf = busy ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      const r = el.getBoundingClientRect();
      gtx = e.clientX - r.left;
      gty = e.clientY - r.top;
      tx = (gtx / r.width - 0.5) * 2;
      ty = (gty / r.height - 0.5) * 2;
      if (!inside) {
        inside = true;
        gx = gtx;
        gy = gty;
        if (glowRef.current) glowRef.current.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      inside = false;
      tx = 0;
      ty = 0;
      if (glowRef.current) glowRef.current.style.opacity = "0";
      if (!raf) raf = requestAnimationFrame(loop);
    };

    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bf-hero relative isolate min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      <style>{CSS}</style>
      <Defs />

      {/* ===== Poora hero (isi wrapper ko pop par hilaya jaata hai) ===== */}
      <div className="bf-quake relative flex min-h-screen items-center">
        {/* Background */}
        <picture>
          {BANNER_MOBILE && <source media="(max-width: 640px)" srcSet={BANNER_MOBILE} />}
          <img src={BANNER} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 z-0 h-full w-full object-cover" />
        </picture>

        {/* Text ke peeche halka dark vignette — legibility + depth (static, free) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(62% 55% at 50% 42%, rgba(0,8,22,.5), transparent 75%)" }}
        />

        {/* Cursor glow (sirf desktop) */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-[2] -ml-[260px] -mt-[260px] h-[520px] w-[520px] opacity-0 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle, rgba(255,200,61,.2), rgba(255,200,61,.06) 40%, transparent 68%)" }}
        />

        {/* Spotlights — banner ke lamps se girti hain. 3 layer = naram edges (blur ke bina) */}
        {BEAMS.map((b, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`bf-lampon pointer-events-none absolute top-0 z-[2] h-[88%] w-[38%] -translate-x-1/2 sm:w-[22%] ${b.show}`}
            style={{ left: b.x, animationDelay: `${REVEAL + b.t}s` }}
          >
            <div className="bf-beam h-full w-full" style={{ "--b1": `${b.a[0]}deg`, "--b2": `${b.a[1]}deg`, animationDuration: `${b.d}s` }}>
              <span
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, rgba(${b.c},.15), rgba(${b.c},.03) 70%, transparent)`,
                  clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)",
                }}
              />
              <span
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, rgba(${b.c},.2), rgba(${b.c},.04) 65%, transparent)`,
                  clipPath: "polygon(47% 0, 53% 0, 83% 100%, 17% 100%)",
                }}
              />
              <span
                className="bf-glow absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, rgba(255,255,255,.3), rgba(${b.c},.05) 55%, transparent)`,
                  clipPath: "polygon(49% 0, 51% 0, 66% 100%, 34% 100%)",
                  animationDelay: `${b.t}s`,
                }}
              />
            </div>
            {/* lamp ka glow */}
            <span
              className="bf-glow absolute -top-3 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full"
              style={{ background: `radial-gradient(circle, #fff, rgba(${b.c},.8) 38%, transparent 70%)` }}
            />
          </div>
        ))}

        {/* Far layer */}
        <div ref={farRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3]">
          {SPARKLES.map(([l, t, s, d, show], i) => (
            <span key={i} className={`bf-twinkle absolute ${show}`} style={{ left: l, top: t, width: s, height: s, animationDelay: `${REVEAL + d}s` }}>
              <Sparkle />
            </span>
          ))}

          {DUST.map((p, i) => (
            <span
              key={i}
              className={`bf-dust absolute bottom-[-10px] rounded-full bg-[var(--bf-gold)] shadow-[0_0_8px_2px_rgba(255,200,60,.6)] ${p.show}`}
              style={{ left: p.l, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${REVEAL + i * 0.8}s` }}
            />
          ))}

          {/* Coins (3D spin) + seals (float) */}
          {FLOATERS.map(([type, l, t, w, dur, d, show], i) => {
            const isCoin = type === "coin";
            const Art = isCoin ? Coin : Seal;
            return (
              <div key={i} className={`bf-popin absolute ${show}`} style={{ left: l, top: t, width: w, animationDelay: `${REVEAL + 0.6 + d * 0.3}s` }}>
                <div className="bf-float" style={{ animationDuration: `${dur}s`, animationDelay: `${-d}s` }}>
                  <div style={{ perspective: 500 }}>
                    <div className={isCoin ? "bf-spin3d" : ""} style={{ animationDelay: `${-d * 2}s` }}>
                      <Art />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {MINI.map((b, i) => (
            <div key={i} className={`bf-rise absolute bottom-[-90px] ${b.w} ${b.show}`} style={{ left: b.l, animationDuration: `${b.d}s`, animationDelay: `${REVEAL + b.t}s` }}>
              <MiniBalloon color={b.c} />
            </div>
          ))}
        </div>

        {/* Near layer — sirf hanging tags (gift/bag/coin banner me pehle se hain) */}
        <div ref={nearRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5]">
          {[
            { pos: "left-[5%]", label: "SALE", size: 19, delay: 0.2 },
            { pos: "right-[6%]", label: "%", size: 40, delay: 0.4 },
          ].map((t) => (
            <div key={t.label} className={`bf-drop absolute top-0 ${t.pos}`} style={{ animationDelay: `${REVEAL + t.delay}s` }}>
              <div className="bf-swing flex flex-col items-center" style={{ animationDelay: `${REVEAL + 1 + t.delay}s` }}>
                <span className="block h-8 w-px bg-white/55 sm:h-16 lg:h-24" />
                <div className="-mt-1 w-12 sm:w-16 lg:w-20">
                  <PriceTag label={t.label} size={t.size} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center md:px-10">
          {/* h1 — har word nowrap, har letter alag udta hai (font/size index.css se) */}
          <div className="relative mb-5">
            <div
              aria-hidden="true"
              className="bf-up pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[340px] -translate-x-1/2 -translate-y-1/2 sm:h-[340px] sm:w-[620px]"
              style={{ animationDelay: `${REVEAL + 0.6}s` }}
            >
              <div
                className="bf-glow h-full w-full rounded-full"
                style={{ background: "radial-gradient(closest-side, rgba(255,184,0,.3), transparent)" }}
              />
            </div>
            <h1 className="flex flex-wrap justify-center gap-x-[.28em] px-3 py-2" aria-label="Black Friday Sale">
              {HEADING.map(({ word, letters }) => (
                <span key={word} aria-hidden="true" className="inline-block whitespace-nowrap">
                  {letters.map(({ ch, i, s }) => (
                    <span key={i} className="bf-fly inline-block" style={{ ...LETTER_STYLE, ...s, animationDelay: `${REVEAL + i * 0.05}s` }}>
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          <p className="bf-up mb-8 max-w-xl text-base text-white sm:text-lg" style={{ animationDelay: `${REVEAL + 0.9}s` }}>
            This Black Friday, Makeolix brings {OFFER} on every plan. Pick your growth service before the sale ends.
          </p>

          {/* Services — udte hue aate hain, dance karte hain; hover => "Explore now", click => service page */}
          <ul className="mb-8 flex max-w-3xl flex-wrap justify-center gap-2.5 sm:gap-3">
            {SERVICES.map(({ label, Icon, to }, i) => (
              <li
                key={label}
                className="bf-fly max-w-full transition-transform duration-200 hover:scale-105"
                style={{ ...SERVICE_FLY[i], animationDelay: `${REVEAL + 0.5 + i * 0.12}s` }}
              >
                <Link
                  to={to}
                  className="bf-dance group flex items-center gap-2.5 rounded-full border border-[color:var(--bf-gold)]/35 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.16)] transition-[border-color,box-shadow] duration-300 hover:border-[color:var(--bf-gold)] hover:shadow-[0_0_22px_rgba(255,200,61,.4)] hover:[animation-play-state:paused] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--bf-gold)] sm:text-base"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,200,61,.22), rgba(18,13,2,.92) 60%)",
                    animationDelay: `${REVEAL + 2.4 + i * 0.13}s`,
                  }}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--bf-gold)] text-[color:var(--bf-ink)] transition-transform duration-500 group-hover:rotate-[360deg] sm:h-8 sm:w-8">
                    <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
                  </span>
                  {/* label <-> "Explore now" swap (width fix rehti hai => layout shift nahi) */}
                  <span className="grid overflow-hidden">
                    <span className="col-start-1 row-start-1 transition-[transform,opacity] duration-300 group-hover:-translate-y-full group-hover:opacity-0 group-focus-visible:-translate-y-full group-focus-visible:opacity-0">
                      {label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="col-start-1 row-start-1 flex translate-y-full items-center gap-1 whitespace-nowrap text-[color:var(--bf-gold)] opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                    >
                      Explore now
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Countdown (space reserved => layout shift nahi) */}
          <div className="mb-8 min-h-[104px] sm:min-h-[116px]">
            <Countdown />
          </div>

          <div className="bf-up flex flex-wrap justify-center gap-4" style={{ animationDelay: `${REVEAL + 1.8}s` }}>
            <Button href={"/contact-us"} ariaLabel="Get in touch with MakeOlix">
              Claim The Offer
            </Button>
            <Button variant="outline" href={"/about-us"} ariaLabel="Know more about MakeOlix">
              Know More
            </Button>
          </div>
        </div>
      </div>

      {/* ===== Intro overlay: balloon + pop burst — SCREEN KE CENTER me (hilta nahi) ===== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
        <span className="bf-flash absolute inset-0 bg-white" style={{ animationDelay: `${POP}s` }} />
        <div className="relative h-0 w-0">
          <div className="bf-art absolute left-0 top-0 w-36 -translate-x-1/2 -translate-y-[45%] sm:w-44 lg:w-52">
            <div className="bf-balloon">
              <div className="bf-shake">
                <div className="bf-sway relative">
                  <Balloon />
                  <div className="absolute left-1/2 top-[34%] grid aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 p-[7%] shadow-[0_2px_10px_rgba(0,0,0,.35)] ring-2 ring-[color:var(--bf-gold)]">
                    <img src={LOGO} alt="" decoding="async" className="h-full w-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bf-pin absolute left-[88%] top-[24%] w-16 sm:w-24">
              <Pin />
            </div>
          </div>

          <div className="bf-burst absolute left-0 top-0">
            {[0, 0.12].map((d) => (
              <span
                key={d}
                className="bf-ring absolute -ml-7 -mt-7 h-14 w-14 rounded-full border-[3px] border-[color:var(--bf-gold-soft)]"
                style={{ animationDelay: `${POP + d}s` }}
              />
            ))}
            <span
              className="bf-core absolute -ml-14 -mt-14 h-28 w-28 rounded-full"
              style={{ background: "radial-gradient(circle, #fff, rgba(255,255,255,0) 70%)", animationDelay: `${POP}s` }}
            />
            {RAYS.map((r, i) => (
              <span
                key={i}
                className={`bf-ray absolute -ml-px h-20 w-[3px] rounded-full ${r.show}`}
                style={{ "--a": `${r.a}deg`, background: "linear-gradient(180deg, #fff, var(--bf-gold) 45%, transparent)", animationDelay: `${POP}s` }}
              />
            ))}
            {SHARDS.map((s, i) => (
              <span key={i} className="bf-shard absolute" style={s} />
            ))}
            {CONFETTI.map((c, i) => (
              <span key={i} className={`bf-conf absolute ${c.show}`} style={c.style} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlackFridayHero;
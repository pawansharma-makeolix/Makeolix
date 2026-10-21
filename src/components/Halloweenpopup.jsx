"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

/**
 * HalloweenPopup v2 — "Hurry, deal closing soon"
 *
 * Lagana: App.jsx mein Router ke ANDAR ek baar (tumne already lagaya hua hai):
 *   const HalloweenPopup = lazy(() => import("./components/HalloweenPopup"));
 *   <Suspense fallback={null}><HalloweenPopup /></Suspense>
 *
 * Kab khulta hai : 6 sec baad ya desktop par exit-intent (4 sec ke baad armed)
 * Kitni baar     : ek session mein ek baar (band karne par save hota hai)
 * Testing        : URL ke end mein  ?popup=test  => 1 sec mein khulega, har baar
 * Band hoga      : 31 Oct 11:59 PM IST ke baad apne aap
 * Nahi dikhega   : /contact-us, /privacy-policy, /terms-and-conditions par
 */

const OFFER_START = new Date("2026-10-21T00:00:00+05:30").getTime();
const OFFER_END = new Date("2026-10-31T23:59:59+05:30").getTime();
const SHOW_AFTER_MS = 6000;
const STORAGE_KEY = "mkx-halloween-popup-seen";
const HIDDEN_ON = ["/contact-us", "/privacy-policy", "/terms-and-conditions"];

/* ============================ SVG ART ============================ */

const Pumpkin = ({ className = "" }) => (
  <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="mkqPk" cx="50%" cy="38%" r="68%">
        <stop offset="0" stopColor="#ffb02e" />
        <stop offset=".55" stopColor="#f26a00" />
        <stop offset="1" stopColor="#a63500" />
      </radialGradient>
      <radialGradient id="mkqFace" cx="50%" cy="50%" r="60%">
        <stop offset="0" stopColor="#fff3a8" />
        <stop offset="1" stopColor="#ffc928" />
      </radialGradient>
    </defs>
    <path d="M58 26C56 14 60 8 68 6L70 12C65 14 64 19 64 26Z" fill="#3e6b1f" />
    <path d="M68 12C78 8 88 12 90 22C82 20 74 20 68 12Z" fill="#4f8a28" opacity=".85" />
    <ellipse cx="30" cy="68" rx="25" ry="36" fill="url(#mkqPk)" />
    <ellipse cx="90" cy="68" rx="25" ry="36" fill="url(#mkqPk)" />
    <ellipse cx="45" cy="68" rx="24" ry="40" fill="url(#mkqPk)" />
    <ellipse cx="75" cy="68" rx="24" ry="40" fill="url(#mkqPk)" />
    <ellipse cx="60" cy="68" rx="18" ry="42" fill="url(#mkqPk)" />
    <g fill="none" stroke="#8c2b00" strokeWidth="1.6" opacity=".35" strokeLinecap="round">
      <path d="M45 30C38 55 38 82 45 106" />
      <path d="M75 30C82 55 82 82 75 106" />
      <path d="M26 42C16 62 18 84 28 100" />
      <path d="M94 42C104 62 102 84 92 100" />
    </g>
    <path d="M38 58L52 58L45 44Z" fill="url(#mkqFace)" />
    <path d="M68 58L82 58L75 44Z" fill="url(#mkqFace)" />
    <path d="M60 66L55 74L65 74Z" fill="url(#mkqFace)" />
    <path
      d="M34 80C42 92 52 90 56 84L60 92L64 84C68 90 78 92 86 80C78 84 70 82 66 78L60 82L54 78C50 82 42 84 34 80Z"
      fill="url(#mkqFace)"
    />
  </svg>
);

const Bat = () => (
  <svg viewBox="0 0 64 40" className="w-full h-auto overflow-visible" aria-hidden="true">
    <g fill="#0b0414" stroke="#ff8a1f" strokeWidth=".8" strokeLinejoin="round">
      <path className="mkq-wing mkq-wl" d="M32 22C26 10 12 6 1 12C6 14 7 18 7 22C10 19 14 20 16 25C19 22 23 24 25 29C27 26 30 26 32 30Z" />
      <path className="mkq-wing mkq-wr" d="M32 22C38 10 52 6 63 12C58 14 57 18 57 22C54 19 50 20 48 25C45 22 41 24 39 29C37 26 34 26 32 30Z" />
      <ellipse cx="32" cy="25" rx="4.2" ry="7.5" />
      <circle cx="32" cy="16.5" r="4.2" />
      <path d="M28.6 14L27.4 8.5L31 12.4ZM35.4 14L36.6 8.5L33 12.4Z" />
    </g>
    <circle cx="30.6" cy="16" r=".9" fill="#ffd27a" />
    <circle cx="33.4" cy="16" r=".9" fill="#ffd27a" />
  </svg>
);

const Ghost = () => (
  <svg viewBox="0 0 80 100" className="w-full h-auto" aria-hidden="true">
    <defs>
      <linearGradient id="mkqGh" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".95" />
        <stop offset="1" stopColor="#bfe9f7" stopOpacity=".5" />
      </linearGradient>
    </defs>
    <path d="M8 92V42C8 18 22 4 40 4s32 14 32 38v50l-10-9-11 9-11-9-11 9-11-9z" fill="url(#mkqGh)" />
    <path d="M10 56C2 58-2 66 2 72C6 68 10 66 14 66Z" fill="url(#mkqGh)" />
    <path d="M70 56C78 58 82 66 78 72C74 68 70 66 66 66Z" fill="url(#mkqGh)" />
    <ellipse cx="30" cy="40" rx="5" ry="7" fill="#0b1b24" />
    <ellipse cx="50" cy="40" rx="5" ry="7" fill="#0b1b24" />
    <ellipse cx="40" cy="58" rx="6" ry="8" fill="#0b1b24" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 200 200" className="w-full h-auto" aria-hidden="true">
    <defs>
      <radialGradient id="mkqMoon" cx="38%" cy="35%" r="75%">
        <stop offset="0" stopColor="#fffbe8" />
        <stop offset=".6" stopColor="#ffe9a8" />
        <stop offset="1" stopColor="#f5b04a" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="92" fill="url(#mkqMoon)" />
    <g fill="#e6b45e" opacity=".45">
      <circle cx="68" cy="70" r="16" />
      <circle cx="128" cy="62" r="9" />
      <circle cx="118" cy="122" r="22" />
      <circle cx="62" cy="128" r="8" />
    </g>
  </svg>
);

const House = ({ className = "" }) => (
  <svg viewBox="0 0 140 176" className={className} aria-hidden="true">
    <g fill="#080312">
      <rect x="20" y="64" width="10" height="26" />
      <polygon points="0,98 52,58 104,98" />
      <rect x="6" y="96" width="92" height="80" />
      <rect x="84" y="44" width="38" height="132" />
      <polygon points="80,46 103,6 126,46" />
      <rect x="101" y="0" width="3" height="10" />
    </g>
    <g fill="#ffc83d">
      <rect className="mkq-win" x="18" y="114" width="14" height="20" rx="1" />
      <rect className="mkq-win mkq-win2" x="60" y="114" width="14" height="20" rx="1" />
      <rect className="mkq-win mkq-win3" x="95" y="66" width="14" height="20" rx="7" />
      <rect className="mkq-win" x="95" y="108" width="14" height="18" rx="1" />
    </g>
    <path d="M38 176V150a10 10 0 0120 0V176Z" fill="#14081f" />
  </svg>
);

const Tree = ({ className = "" }) => (
  <svg viewBox="0 0 120 200" className={className} aria-hidden="true">
    <g stroke="#080312" strokeLinecap="round" fill="none">
      <path d="M60 200C62 160 56 130 64 96" strokeWidth="9" />
      <path d="M62 130C42 118 28 112 14 92" strokeWidth="5" />
      <path d="M64 108C84 98 98 96 112 76" strokeWidth="5" />
      <path d="M30 108C24 96 26 86 18 76" strokeWidth="3" />
      <path d="M96 96C102 86 100 76 108 66" strokeWidth="3" />
      <path d="M64 96C62 80 70 68 66 52" strokeWidth="4" />
    </g>
  </svg>
);

/* ============================ HELPERS ============================ */

const pad = (n) => String(n).padStart(2, "0");

const useCountdown = (active) => {
  const [left, setLeft] = useState(() => Math.max(0, OFFER_END - Date.now()));
  useEffect(() => {
    if (!active) return;
    const tick = () => setLeft(Math.max(0, OFFER_END - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [active]);
  const s = Math.floor(left / 1000);
  return {
    left,
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
};

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="grid h-14 w-[3.6rem] sm:h-16 sm:w-16 place-items-center rounded-xl border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.04]">
      <span className="text-2xl sm:text-3xl font-extrabold tabular-nums text-white">{pad(value)}</span>
    </div>
    <span className="mt-1.5 text-[11px] sm:text-xs text-white/65">{label}</span>
  </div>
);

const bats = [
  { top: "10%", w: 34, dur: 7, delay: -2 },
  { top: "26%", w: 24, dur: 10, delay: -6 },
  { top: "18%", w: 20, dur: 13, delay: -9 },
];

/* ============================ COMPONENT ============================ */

const HalloweenPopup = () => {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const blocked = HIDDEN_ON.includes(pathname);
  const expired = Date.now() > OFFER_END;
  const { left, d, h, m, s } = useCountdown(open);
  const pct = Math.max(4, Math.min(100, (left / (OFFER_END - OFFER_START)) * 100));

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      /* storage blocked */
    }
    lastFocus.current?.focus?.();
  }, []);

  /* ---- triggers ---- */
  useEffect(() => {
    if (expired || blocked) return;

    const force = new URLSearchParams(window.location.search).get("popup") === "test";
    if (!force) {
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) return;
      } catch (e) {
        /* ignore */
      }
    }

    let armed = false;
    const show = () => {
      lastFocus.current = document.activeElement;
      setOpen(true);
      cleanup();
    };
    const timer = setTimeout(show, force ? 1000 : SHOW_AFTER_MS);
    const armTimer = setTimeout(() => (armed = true), 4000);
    const onLeave = (e) => {
      if (armed && e.clientY <= 0) show();
    };
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover && !force) document.addEventListener("mouseleave", onLeave);

    function cleanup() {
      clearTimeout(timer);
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", onLeave);
    }
    return cleanup;
  }, [expired, blocked]);

  /* ---- Esc, focus trap, body scroll lock ---- */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll("a[href], button:not([disabled])");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (typeof document === "undefined" || expired) return null;

  return createPortal(
    <AnimatePresence>
      {open && !blocked && left > 0 && (
        <motion.div
          key="mkq-overlay"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          style={{ background: "radial-gradient(circle at 50% 40%, rgba(40,12,60,.82), rgba(0,8,12,.92))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
          data-lenis-prevent
        >
          <style>{`
            @keyframes mkq-fly    { from { transform: translate3d(-60px,0,0) } to { transform: translate3d(520px,0,0) } }
            @keyframes mkq-flap   { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(.3) } }
            @keyframes mkq-bob    { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-10px,0) } }
            @keyframes mkq-drift  { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(10px,-14px,0) } }
            @keyframes mkq-glow   { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
            @keyframes mkq-fog    { from { transform: translate3d(-8%,0,0) } to { transform: translate3d(8%,0,0) } }
            @keyframes mkq-win    { 0%,100% { opacity: 1 } 45% { opacity: .5 } 50% { opacity: 1 } 70% { opacity: .75 } }
            @keyframes mkq-twinkle{ 0%,100% { opacity: .2 } 50% { opacity: 1 } }
            @keyframes mkq-shine  { 0%,55% { transform: translate3d(-130%,0,0) skewX(-20deg) } 100% { transform: translate3d(380%,0,0) skewX(-20deg) } }
            @keyframes mkq-beat   { 0%,100% { transform: scale(1) } 50% { transform: scale(1.04) } }
            @keyframes mkq-blink  { 0%,100% { opacity: 1 } 50% { opacity: .3 } }
            @keyframes mkq-flick  { 0%,17%,21%,62%,66%,100% { opacity: 1 } 19%,64% { opacity: .5 } }
            @keyframes mkq-bar    { 0%,100% { opacity: 1 } 50% { opacity: .7 } }

            .mkq-bat   { position: absolute; left: 0; will-change: transform; animation: mkq-fly linear infinite; }
            .mkq-wing  { transform-box: fill-box; animation: mkq-flap .36s ease-in-out infinite; }
            .mkq-wl    { transform-origin: 100% 100%; }
            .mkq-wr    { transform-origin: 0% 100%; }
            .mkq-bob   { animation: mkq-bob 4s ease-in-out infinite; will-change: transform; }
            .mkq-drift { animation: mkq-drift 6s ease-in-out infinite; will-change: transform; }
            .mkq-glow  { animation: mkq-glow 3s ease-in-out infinite; }
            .mkq-fog   { animation: mkq-fog 12s ease-in-out infinite alternate; will-change: transform; }
            .mkq-win   { animation: mkq-win 3.4s linear infinite; }
            .mkq-win2  { animation-delay: -1.2s; }
            .mkq-win3  { animation-delay: -2.2s; }
            .mkq-star  { animation: mkq-twinkle 3s ease-in-out infinite; }
            .mkq-beat  { animation: mkq-beat 1.9s ease-in-out infinite; }
            .mkq-blink { animation: mkq-blink 1.1s ease-in-out infinite; }
            .mkq-flick { animation: mkq-flick 4.5s linear 1s infinite; }
            .mkq-bar   { animation: mkq-bar 1.6s ease-in-out infinite; }
            .mkq-shine { position: absolute; inset: 0 auto 0 0; width: 28%;
                         background: linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent);
                         animation: mkq-shine 3s ease-in-out infinite; will-change: transform; }

            @media (prefers-reduced-motion: reduce) {
              .mkq-bat, .mkq-wing, .mkq-bob, .mkq-drift, .mkq-glow, .mkq-fog, .mkq-win,
              .mkq-star, .mkq-beat, .mkq-blink, .mkq-flick, .mkq-bar, .mkq-shine { animation: none; }
              .mkq-bat { transform: translate3d(200px,0,0); }
            }
          `}</style>

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mkq-title"
            className="relative my-auto grid w-full max-w-[860px] overflow-hidden rounded-3xl border border-white/10 bg-[#051923] text-white shadow-[0_30px_90px_rgba(0,0,0,.65)] md:grid-cols-[0.95fr_1.1fr]"
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* ---------------- Art panel ---------------- */}
            <div
              aria-hidden="true"
              className="relative h-52 overflow-hidden md:h-auto md:min-h-[520px]"
              style={{
                background:
                  "linear-gradient(180deg, #12062a 0%, #3b1560 52%, #a63a12 88%, #ff7a1a 100%)",
              }}
            >
              {/* stars */}
              {[
                ["12%", "8%"], ["26%", "18%"], ["40%", "6%"], ["54%", "22%"],
                ["66%", "10%"], ["8%", "30%"], ["46%", "34%"], ["34%", "28%"],
              ].map(([l, t], i) => (
                <span
                  key={i}
                  className="mkq-star absolute h-[3px] w-[3px] rounded-full bg-white"
                  style={{ left: l, top: t, animationDelay: `${i * 0.45}s` }}
                />
              ))}

              {/* moon + glow */}
              <div className="absolute right-[9%] top-[8%] w-16 sm:w-20 md:w-32">
                <div
                  className="mkq-glow absolute -inset-[55%] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(255,200,110,.45), transparent 62%)" }}
                />
                <div className="relative">
                  <Moon />
                </div>
              </div>

              {/* bats */}
              {bats.map((b, i) => (
                <div
                  key={i}
                  className="mkq-bat"
                  style={{ top: b.top, width: b.w, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
                >
                  <Bat />
                </div>
              ))}

              {/* ghost */}
              <div className="mkq-drift absolute left-[52%] top-[34%] w-8 md:w-12 opacity-90">
                <Ghost />
              </div>

              {/* fog */}
              <div
                className="mkq-fog absolute -left-[10%] -right-[10%] bottom-0 h-1/3"
                style={{
                  background:
                    "radial-gradient(ellipse 45% 60% at 30% 100%, rgba(255,255,255,.2), transparent), radial-gradient(ellipse 40% 55% at 78% 100%, rgba(255,190,120,.25), transparent)",
                }}
              />

              {/* tree + house + ground */}
              <Tree className="absolute bottom-[8%] right-[3%] h-24 md:h-44 w-auto" />
              <House className="absolute bottom-[7%] left-[5%] h-32 md:h-60 w-auto" />
              <div
                className="absolute inset-x-0 bottom-0 h-[10%]"
                style={{ background: "linear-gradient(180deg, #080312, #05020b)" }}
              />

              {/* pumpkins */}
              <div className="absolute bottom-[3%] right-[24%] md:right-[18%] w-14 md:w-24 mkq-bob">
                <div
                  className="mkq-glow absolute -inset-[60%]"
                  style={{ background: "radial-gradient(circle, rgba(255,150,30,.55), transparent 62%)" }}
                />
                <Pumpkin className="relative w-full h-auto" />
              </div>
              <div className="absolute bottom-[3%] right-[6%] hidden md:block w-14">
                <Pumpkin className="w-full h-auto" />
              </div>
            </div>

            {/* ---------------- Content panel ---------------- */}
            <div className="relative px-6 py-7 sm:px-9 sm:py-9 text-center md:text-left">
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close offer"
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white/85 transition hover:bg-black/55 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#118ab2] md:bg-white/10 md:hover:bg-white/20"
              >
                <X size={18} />
              </button>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#ff8a1f]/50 bg-[#ff8a1f]/10 px-3 py-1 text-xs sm:text-sm font-semibold text-[#ffb347]">
                <span className="mkq-blink h-2 w-2 rounded-full bg-[#ff8a1f]" aria-hidden="true" />
                Deal closing soon
              </div>

              <h2 id="mkq-title" className="text-3xl sm:text-4xl font-extrabold leading-[1.1]">
                Hurry up!
                <span className="block text-white/90 text-2xl sm:text-3xl font-bold mt-1">
                  Don&apos;t let this deal{" "}
                  <span
                    className="mkq-flick"
                    style={{ color: "#ff8a1f", textShadow: "0 0 18px rgba(255,138,31,.75)" }}
                  >
                    slip away
                  </span>
                </span>
              </h2>

              {/* big offer */}
              <div className="mt-4 flex items-end justify-center gap-3 md:justify-start">
                <span
                  className="text-6xl sm:text-7xl font-black leading-none"
                  style={{
                    background: "linear-gradient(180deg, #ffd27a 0%, #ff8a1f 60%, #e85d04 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  30%
                </span>
                <span className="pb-1.5 text-left leading-tight">
                  <span className="block text-xl sm:text-2xl font-extrabold">OFF</span>
                  <span className="block text-sm text-white/70">on all plans</span>
                </span>
              </div>

              <p className="mt-3 text-sm sm:text-base text-white/75">
                Offer valid until <strong className="text-white">31st October</strong>. Miss it and
                this treat turns into a trick &mdash; it won&apos;t come back.
              </p>

              {/* countdown */}
              <div
                role="timer"
                aria-label="Time left for the offer"
                className="mt-5 flex items-start justify-center gap-2 sm:gap-3 md:justify-start"
              >
                <Unit value={d} label="Days" />
                <Unit value={h} label="Hours" />
                <Unit value={m} label="Mins" />
                <Unit value={s} label="Secs" />
              </div>

              {/* urgency bar */}
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[11px] sm:text-xs text-white/60">
                  <span>Offer window</span>
                  <span className="text-[#ffb347]">Closing soon</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="mkq-bar h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, #ff8a1f, #ffd27a)",
                    }}
                  />
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col items-center gap-3 md:items-stretch">
                <div className="mkq-beat">
                  <Link
                    to="/contact-us"
                    onClick={close}
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-base sm:text-lg font-bold text-[#1b0b00] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{
                      background: "linear-gradient(90deg, #ffb347, #ff8a1f)",
                      boxShadow: "0 8px 28px rgba(255,138,31,.4)",
                    }}
                  >
                    <span className="mkq-shine" aria-hidden="true" />
                    <span className="relative">Claim my 30% OFF</span>
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="text-sm text-white/55 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#118ab2]"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default HalloweenPopup;
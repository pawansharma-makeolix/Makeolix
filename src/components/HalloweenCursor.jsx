"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

/**
 * HalloweenCursor v2 — sirf HOME page ("/") par
 *
 * Pumpkin cursor (tilt + squish) + fire-colour ember trail + udta hua bat
 * Hover : pumpkin bada + glow tez, bat tez phadphadata hai
 * Click : squish + ghost-ring + 8 sparks ka burst
 * Input/textarea par normal text cursor wapas
 *
 * Speed optimizations:
 *  - Mouse hilne par hi rAF chalta hai, ruk jaaye to loop band (idle = 0% CPU)
 *  - Sirf transform (GPU) — layout/paint nahi
 *  - Hover check sirf tab jab target element badle (closest() har move par nahi)
 *  - Native cursor tab chhupta hai jab pehla mouse-move aaye (blank cursor flash nahi)
 *  - Tab hide / window blur par cursor chhup jaata hai, listeners passive
 *  - Touch device, reduced-motion aur home ke bahar: kuch bhi render/listen nahi hota
 */

const TRAIL = 7;
const TRAIL_COLORS = ["#ffe08a", "#ffc54d", "#ffa83a", "#ff8a1f", "#f2680f", "#d9480f", "#a63500"];
const SPARKS = [
  [0, -34], [24, -24], [34, 0], [24, 24], [0, 34], [-24, 24], [-34, 0], [-24, -24],
];
const INTERACTIVE = "a, button, [role='button'], summary, select, label, [data-cursor='hover']";
const TEXTUAL =
  "input:not([type='button']):not([type='submit']):not([type='checkbox']):not([type='radio']):not([type='range']), textarea, [contenteditable='true']";

const Pumpkin = () => (
  <svg viewBox="0 0 120 110" width="100%" height="100%" aria-hidden="true">
    <defs>
      <radialGradient id="mkcPk" cx="50%" cy="38%" r="68%">
        <stop offset="0" stopColor="#ffb02e" />
        <stop offset=".55" stopColor="#f26a00" />
        <stop offset="1" stopColor="#a63500" />
      </radialGradient>
      <radialGradient id="mkcFace" cx="50%" cy="50%" r="60%">
        <stop offset="0" stopColor="#fff3a8" />
        <stop offset="1" stopColor="#ffc928" />
      </radialGradient>
    </defs>
    <path d="M58 26C56 14 60 8 68 6L70 12C65 14 64 19 64 26Z" fill="#3e6b1f" />
    <path d="M68 12C78 8 88 12 90 22C82 20 74 20 68 12Z" fill="#4f8a28" />
    <ellipse cx="30" cy="68" rx="25" ry="36" fill="url(#mkcPk)" />
    <ellipse cx="90" cy="68" rx="25" ry="36" fill="url(#mkcPk)" />
    <ellipse cx="45" cy="68" rx="24" ry="40" fill="url(#mkcPk)" />
    <ellipse cx="75" cy="68" rx="24" ry="40" fill="url(#mkcPk)" />
    <ellipse cx="60" cy="68" rx="18" ry="42" fill="url(#mkcPk)" />
    <g fill="none" stroke="#8c2b00" strokeWidth="2" opacity=".3" strokeLinecap="round">
      <path d="M45 30C38 55 38 82 45 106" />
      <path d="M75 30C82 55 82 82 75 106" />
    </g>
    <path d="M38 58L52 58L45 44Z" fill="url(#mkcFace)" />
    <path d="M68 58L82 58L75 44Z" fill="url(#mkcFace)" />
    <path d="M60 66L55 74L65 74Z" fill="url(#mkcFace)" />
    <path
      d="M34 80C42 92 52 90 56 84L60 92L64 84C68 90 78 92 86 80C78 84 70 82 66 78L60 82L54 78C50 82 42 84 34 80Z"
      fill="url(#mkcFace)"
    />
  </svg>
);

const Bat = () => (
  <svg viewBox="0 0 64 40" width="100%" height="100%" aria-hidden="true" style={{ overflow: "visible" }}>
    <g fill="#0b0414" stroke="#ff8a1f" strokeWidth="1" strokeLinejoin="round">
      <path className="mkc-wing mkc-wl" d="M32 22C26 10 12 6 1 12C6 14 7 18 7 22C10 19 14 20 16 25C19 22 23 24 25 29C27 26 30 26 32 30Z" />
      <path className="mkc-wing mkc-wr" d="M32 22C38 10 52 6 63 12C58 14 57 18 57 22C54 19 50 20 48 25C45 22 41 24 39 29C37 26 34 26 32 30Z" />
      <ellipse cx="32" cy="25" rx="4.2" ry="7.5" />
      <circle cx="32" cy="16.5" r="4.2" />
      <path d="M28.6 14L27.4 8.5L31 12.4ZM35.4 14L36.6 8.5L33 12.4Z" />
    </g>
    <circle cx="30.6" cy="16" r="1" fill="#ffd27a" />
    <circle cx="33.4" cy="16" r="1" fill="#ffd27a" />
  </svg>
);

const HalloweenCursor = () => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const isHome = pathname === "/";

  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const active = isHome && fine && !reduce;

  const rootRef = useRef(null);
  const pumpRef = useRef(null);
  const fxRef = useRef(null); // ring + sparks (click point par)
  const batRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    const pump = pumpRef.current;
    const fx = fxRef.current;
    const bat = batRef.current;
    const trail = trailRefs.current;
    if (!root || !pump || !bat || !fx) return;

    const html = document.documentElement;

    let tx = -200, ty = -200;
    let x = tx, y = ty;
    let bx = tx, by = ty;
    let rot = 0, flip = 1, fast = false;
    const xs = new Float32Array(TRAIL).fill(tx);
    const ys = new Float32Array(TRAIL).fill(ty);
    let raf = 0;
    let running = false;
    let visible = false;
    let lastTarget = null;

    const show = () => {
      if (visible) return;
      visible = true;
      x = bx = tx;
      y = by = ty;
      xs.fill(tx);
      ys.fill(ty);
      html.classList.add("mkc-on"); // native cursor ab chhupao
      root.style.opacity = "1";
    };
    const hide = () => {
      visible = false;
      root.style.opacity = "0";
      html.classList.remove("mkc-on");
    };

    const loop = () => {
      const dx = tx - x;
      const dy = ty - y;
      x += dx * 0.55;
      y += dy * 0.55;
      rot += (Math.max(-28, Math.min(28, dx * 1.4)) - rot) * 0.2;
      pump.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg)`;

      let moving = Math.abs(dx) + Math.abs(dy) > 0.1;

      // ember trail
      let px = x, py = y;
      for (let i = 0; i < TRAIL; i++) {
        xs[i] += (px - xs[i]) * 0.3;
        ys[i] += (py - ys[i]) * 0.3;
        px = xs[i];
        py = ys[i];
        trail[i].style.transform = `translate3d(${xs[i].toFixed(1)}px,${ys[i].toFixed(1)}px,0)`;
        if (Math.abs(x - xs[i]) + Math.abs(y - ys[i]) > 0.3) moving = true;
      }

      // bat
      const gx = x + 34;
      const gy = y - 32;
      const bdx = gx - bx;
      bx += bdx * 0.09;
      by += (gy - by) * 0.09;
      if (bdx > 6) flip = 1;
      else if (bdx < -6) flip = -1;
      bat.style.transform = `translate3d(${bx.toFixed(1)}px,${by.toFixed(1)}px,0) scaleX(${flip})`;
      if (Math.abs(gx - bx) + Math.abs(gy - by) > 0.3) moving = true;

      // tez chalne par bat tez phadphadaye (dataset sirf badalne par)
      const isFast = Math.abs(dx) + Math.abs(dy) > 14;
      if (isFast !== fast) {
        fast = isFast;
        root.dataset.fast = fast ? "1" : "0";
      }

      if (moving) raf = requestAnimationFrame(loop);
      else {
        running = false;
        if (fast) {
          fast = false;
          root.dataset.fast = "0";
        }
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) show();
      start();
    };

    // hover state: sirf tab check jab target badle
    const onOver = (e) => {
      const t = e.target;
      if (t === lastTarget || !(t instanceof Element)) return;
      lastTarget = t;
      const hov = t.closest(INTERACTIVE) ? "1" : "0";
      const txt = t.closest(TEXTUAL) ? "1" : "0";
      if (root.dataset.hover !== hov) root.dataset.hover = hov;
      if (root.dataset.text !== txt) root.dataset.text = txt;
    };

    const onDown = () => {
      root.dataset.down = "1";
      fx.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      fx.classList.remove("mkc-go");
      void fx.offsetWidth; // animation restart
      fx.classList.add("mkc-go");
    };
    const onUp = () => {
      root.dataset.down = "0";
    };
    const onVis = () => document.hidden && hide();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("mkc-on");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [active]);

  if (!active || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={rootRef}
      className="mkc"
      data-hover="0"
      data-text="0"
      data-down="0"
      data-fast="0"
      aria-hidden="true"
      style={{ opacity: 0 }}
    >
      <style>{`
        html.mkc-on, html.mkc-on * { cursor: none !important; }
        html.mkc-on input, html.mkc-on textarea, html.mkc-on [contenteditable="true"] { cursor: text !important; }

        .mkc { position: fixed; inset: 0; z-index: 100000; pointer-events: none; transition: opacity .2s; contain: layout style; }
        .mkc > * { position: fixed; left: 0; top: 0; width: 0; height: 0; pointer-events: none; will-change: transform; }
        .mkc-layer { transition: opacity .15s; }
        .mkc[data-text="1"] .mkc-layer { opacity: 0; }

        /* pumpkin: left/top negative offsets (centered on pointer) */
        .mkc-pump { position: absolute; left: -15px; top: -14px; width: 30px; height: 28px; }
        .mkc-pump-in { position: relative; width: 100%; height: 100%; transition: transform .18s cubic-bezier(.2,.8,.2,1); }
        .mkc-glow { position: absolute; inset: -60%; border-radius: 9999px;
                    background: radial-gradient(circle, rgba(255,140,20,.55), transparent 62%);
                    animation: mkc-pulse 2.4s ease-in-out infinite; }
        .mkc[data-hover="1"] .mkc-pump-in { transform: scale(1.55); }
        .mkc[data-hover="1"] .mkc-glow { animation: none; opacity: 1; transform: scale(1.25); }
        .mkc[data-down="1"] .mkc-pump-in { transform: scale(.82); }
        .mkc[data-hover="1"][data-down="1"] .mkc-pump-in { transform: scale(1.25); }

        .mkc-ember { position: absolute; border-radius: 9999px; }

        .mkc-bat { position: absolute; left: -13px; top: -8px; width: 26px; height: 16px; }
        .mkc-bat-in { width: 100%; height: 100%; animation: mkc-bob 1.8s ease-in-out infinite; }
        .mkc-wing { transform-box: fill-box; animation: mkc-flap .34s ease-in-out infinite; }
        .mkc[data-fast="1"] .mkc-wing, .mkc[data-hover="1"] .mkc-wing { animation-duration: .16s; }
        .mkc-wl { transform-origin: 100% 100%; }
        .mkc-wr { transform-origin: 0% 100%; }

        /* click fx: ring + sparks */
        .mkc-ringin { position: absolute; left: -9px; top: -9px; width: 18px; height: 18px; border-radius: 9999px;
                      border: 2px solid rgba(255,200,110,.9); opacity: 0; }
        .mkc-spark  { position: absolute; left: -2px; top: -2px; width: 4px; height: 4px; border-radius: 9999px;
                      background: #ffd27a; opacity: 0; }
        .mkc-go .mkc-ringin { animation: mkc-ring .55s ease-out; }
        .mkc-go .mkc-spark  { animation: mkc-spark .5s ease-out; }

        @keyframes mkc-pulse { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
        @keyframes mkc-bob   { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-4px,0) } }
        @keyframes mkc-flap  { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(.3) } }
        @keyframes mkc-ring  { from { opacity: .95; transform: scale(.6) } to { opacity: 0; transform: scale(3.4) } }
        @keyframes mkc-spark { from { opacity: 1; transform: translate3d(0,0,0) scale(1) }
                               to   { opacity: 0; transform: translate3d(var(--dx), var(--dy), 0) scale(.2) } }
      `}</style>

      {/* ember trail — fire colours, peeche chhote */}
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div key={i} ref={(el) => (trailRefs.current[i] = el)} className="mkc-layer" style={{ opacity: 0.7 - i * 0.09 }}>
          <span
            className="mkc-ember"
            style={{
              width: 9 - i,
              height: 9 - i,
              left: -(9 - i) / 2,
              top: -(9 - i) / 2,
              background: TRAIL_COLORS[i],
              boxShadow: i < 3 ? `0 0 8px 1px ${TRAIL_COLORS[i]}` : "none",
            }}
          />
        </div>
      ))}

      {/* click burst */}
      <div ref={fxRef}>
        <div className="mkc-ringin" />
        {SPARKS.map(([dx, dy], i) => (
          <span key={i} className="mkc-spark" style={{ "--dx": `${dx}px`, "--dy": `${dy}px` }} />
        ))}
      </div>

      {/* bat */}
      <div ref={batRef} className="mkc-layer">
        <div className="mkc-bat">
          <div className="mkc-bat-in">
            <Bat />
          </div>
        </div>
      </div>

      {/* pumpkin */}
      <div ref={pumpRef} className="mkc-layer">
        <div className="mkc-pump">
          <span className="mkc-glow" />
          <div className="mkc-pump-in">
            <Pumpkin />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default HalloweenCursor;
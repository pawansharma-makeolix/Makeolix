
import { useEffect, useRef } from "react";

const FONT_FAMILY = "'Merriweather', Georgia, serif";

const clamp = (v, min = 0, max = 1) =>
  Math.max(min, Math.min(max, v));

const cssVar = (name, fallback) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim() || fallback;

export default function VirtualAssistantHero({
  headline = "Your Virtual Assistant, Always On.",
  description = "Smart, reliable support that handles your tasks so you can focus on growth.",
  scrollScatter = true,
  fontWeight = 700,
  className = "",
}) {
  const outerRef = useRef(null);
  const stageRef = useRef(null);
  const dotsRef = useRef(null);
  const glowRef = useRef(null);
  const spotRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    const canvas = dotsRef.current;
    const glowCanvas = glowRef.current;
    const spot = spotRef.current;

    if (!outer || !stage || !canvas || !glowCanvas) return;

    const ctx = canvas.getContext("2d");
    const glowCtx = glowCanvas.getContext("2d");

    if (!ctx || !glowCtx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const state = {
      width: 0,
      height: 0,
      count: 0,
      particles: new Float32Array(0),
      targetScroll: 0,
      currentScroll: 0,
      mouseX: -9999,
      mouseY: -9999,
      mouseOn: false,
      pointerMoving: false,
      pointerTime: 0,
      waves: [],
      startTime: 0,
      introDuration: 2400,
      visible: false,
      colors: {
        white: "#ffffff",
        blue: "#118ab2",
        blueDark: "#00509d",
        muted: "#a0aec0",
      },
    };

    let raf = 0;
    let alive = true;
    let resizeTimer = 0;
    let lastWidth = 0;
    let lastHeight = 0;
    let resizeObserver;
    let intersectionObserver;

    const readColors = () => {
      state.colors.white = cssVar("--white", "#ffffff");
      state.colors.blue = cssVar("--blue-3", "#118ab2");
      state.colors.blueDark = cssVar("--blue-2", "#00509d");
      state.colors.muted = cssVar("--text-muted", "#a0aec0");
    };

    // Text ko canvas par draw karke particle positions nikalta hai.
    const getTextPoints = () => {
      const { width: W, height: H } = state;
      const offscreen = document.createElement("canvas");

      offscreen.width = W;
      offscreen.height = H;

      const textCtx = offscreen.getContext("2d", {
        willReadFrequently: true,
      });

      if (!textCtx) return [];

      const words = headline.trim().split(/\s+/);

      // Slightly smaller, responsive heading size.
      let fontSize = Math.min(
        W < 480
          ? W * 0.115
          : W < 768
            ? W * 0.09
            : W * 0.075,
        H * 0.17,
        128
      );

      let lines = [];

      // Responsive line wrapping.
      while (fontSize > 20) {
        textCtx.font = `${fontWeight} ${fontSize}px ${FONT_FAMILY}`;

        lines = [];
        let currentLine = "";

        words.forEach((word) => {
          const testLine = currentLine
            ? `${currentLine} ${word}`
            : word;

          if (
            textCtx.measureText(testLine).width > W * 0.9 &&
            currentLine
          ) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });

        if (currentLine) lines.push(currentLine);

        if (
          lines.length <= 3 &&
          lines.every(
            (line) => textCtx.measureText(line).width <= W * 0.92
          )
        ) {
          break;
        }

        fontSize *= 0.94;
      }

      textCtx.clearRect(0, 0, W, H);
      textCtx.font = `${fontWeight} ${fontSize}px ${FONT_FAMILY}`;
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillStyle = "#ffffff";
      textCtx.strokeStyle = "#ffffff";
      textCtx.lineJoin = "round";
      textCtx.lineWidth = fontSize * 0.025;

      const lineHeight = fontSize * 1.12;
      const centerY = H * 0.43;

      const firstY =
        centerY - ((lines.length - 1) * lineHeight) / 2;

      lines.forEach((line, index) => {
        const y = firstY + index * lineHeight;

        textCtx.strokeText(line, W / 2, y);
        textCtx.fillText(line, W / 2, y);
      });

      const pixels = textCtx.getImageData(0, 0, W, H).data;
      const points = [];

      const step = W < 480 ? 4 : W < 900 ? 4 : 5;

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (pixels[(y * W + x) * 4 + 3] > 120) {
            points.push(x, y);
          }
        }
      }

      return points;
    };

    const buildParticles = () => {
      const rect = stage.getBoundingClientRect();

      const W = Math.max(1, Math.round(rect.width));
      const H = Math.max(1, Math.round(rect.height));

      state.width = W;
      state.height = H;

      // DPR limit keeps mobile rendering lighter.
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 768 ? 1.25 : 1.5
      );

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      glowCanvas.width = Math.round(W * dpr);
      glowCanvas.height = Math.round(H * dpr);

      glowCanvas.style.width = `${W}px`;
      glowCanvas.style.height = `${H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glowCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Background particle density responsive hai.
      const gapX = W < 480 ? 23 : W < 768 ? 25 : 28;
      const gapY = W < 480 ? 19 : W < 768 ? 21 : 23;

      const columns = Math.ceil(W / gapX) + 1;
      const rows = Math.ceil(H / gapY) + 1;

      const backgroundCount = columns * rows;

      const textPoints = getTextPoints();
      const textCount = textPoints.length / 2;

      // Text particles aur background particles.
      state.count = backgroundCount + textCount;

      // x, y, vx, vy, homeX, homeY, textX, textY, delay, isText
      const P = new Float32Array(state.count * 10);

      // Background particles.
      for (let i = 0; i < backgroundCount; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);

        const x = col * gapX;
        const y = row * gapY;

        const o = i * 10;

        P[o] = x;
        P[o + 1] = y;
        P[o + 4] = x;
        P[o + 5] = y;
      }

      // Text particles ko scattered starting positions milti hain.
      for (let i = 0; i < textCount; i++) {
        const o = (backgroundCount + i) * 10;

        const tx = textPoints[i * 2];
        const ty = textPoints[i * 2 + 1];

        const side = Math.floor(Math.random() * 4);

        let startX;
        let startY;

        if (side === 0) {
          startX = Math.random() * W;
          startY = -Math.random() * H * 0.6;
        } else if (side === 1) {
          startX = W + Math.random() * W * 0.6;
          startY = Math.random() * H;
        } else if (side === 2) {
          startX = Math.random() * W;
          startY = H + Math.random() * H * 0.6;
        } else {
          startX = -Math.random() * W * 0.6;
          startY = Math.random() * H;
        }

        P[o] = startX;
        P[o + 1] = startY;

        P[o + 4] = startX;
        P[o + 5] = startY;

        P[o + 6] = tx;
        P[o + 7] = ty;

        // Center ke particles pehle settle honge.
        const distance = Math.hypot(
          tx - W / 2,
          ty - H * 0.43
        );

        P[o + 8] =
          0.08 +
          (distance / Math.hypot(W, H)) * 0.65 +
          Math.random() * 0.22;

        P[o + 9] = 1;
      }

      state.particles = P;
      state.startTime = performance.now();

      ctx.clearRect(0, 0, W, H);
      glowCtx.clearRect(0, 0, W, H);

      drawStaticFrame();
      requestFrame();
    };

    const drawStaticFrame = () => {
      const {
        width: W,
        height: H,
        count: N,
        particles: P,
      } = state;

      ctx.clearRect(0, 0, W, H);
      glowCtx.clearRect(0, 0, W, H);

      ctx.fillStyle = state.colors.white;

      for (let i = 0; i < N; i++) {
        const o = i * 10;
        const isText = P[o + 9] === 1;

        if (isText) continue;

        const x = P[o];
        const y = P[o + 1];

        ctx.globalAlpha = 0.16;
        ctx.fillRect(x, y, 1.3, 1.3);
      }

      ctx.globalAlpha = 1;
    };

    const requestFrame = () => {
      if (!raf && alive && state.visible) {
        raf = requestAnimationFrame(render);
      }
    };

    const render = (now) => {
      raf = 0;

      if (!alive || !state.visible) return;

      const {
        width: W,
        height: H,
        count: N,
        particles: P,
      } = state;

      const elapsed = now - state.startTime;

      const introFinished =
        elapsed > state.introDuration + 1200;

      const scrollDifference =
        state.targetScroll - state.currentScroll;

      state.currentScroll += scrollDifference * 0.12;

      if (Math.abs(scrollDifference) < 0.001) {
        state.currentScroll = state.targetScroll;
      }

      const gather = 1 - state.currentScroll;

      const mouse = state.mouseOn;
      const mouseRadius = W < 640 ? 78 : 115;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      const pointerAge = now - state.pointerTime;

      const pointerMoving =
        state.pointerMoving && pointerAge < 450;

      ctx.clearRect(0, 0, W, H);
      glowCtx.clearRect(0, 0, W, H);

      ctx.fillStyle = state.colors.white;
      glowCtx.fillStyle = state.colors.blue;

      // Expired click waves remove karo.
      state.waves = state.waves.filter(
        (wave) => now - wave.time < 850
      );

      for (let i = 0; i < N; i++) {
        const o = i * 10;
        const isText = P[o + 9] === 1;

        let x = P[o];
        let y = P[o + 1];

        let hot = 0;

        if (isText) {
          const delay = P[o + 8] * 1000;

          const rawProgress = clamp(
            (elapsed - delay) / 950
          );

          // Spring-like bounce, with a gentle overshoot.
          const bounceProgress = reduceMotion
            ? 1
            : 1 -
              Math.exp(-6.5 * rawProgress) *
                Math.cos(10 * rawProgress);

          const introProgress =
            rawProgress >= 1 ? 1 : bounceProgress;

          const mix = introProgress * gather;

          const targetX =
            P[o + 4] +
            (P[o + 6] - P[o + 4]) * mix;

          const targetY =
            P[o + 5] +
            (P[o + 7] - P[o + 5]) * mix;

          const stiffness = reduceMotion ? 1 : 0.19;

          P[o + 2] =
            (P[o + 2] + (targetX - x) * stiffness) * 0.72;

          P[o + 3] =
            (P[o + 3] + (targetY - y) * stiffness) * 0.72;

          P[o] += P[o + 2];
          P[o + 1] += P[o + 3];

          x = P[o];
          y = P[o + 1];
        } else {
          // Background dots remain subtle and mostly static.
          x = P[o];
          y = P[o + 1];
        }

        // Cursor interaction: sharp glow + gentle particle push.
        if (mouse && !reduceMotion) {
          const dx = x - state.mouseX;
          const dy = y - state.mouseY;

          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < mouseRadiusSq) {
            const distance = Math.sqrt(distanceSq) || 1;

            hot = 1 - distance / mouseRadius;

            const force = hot * (isText ? 2.1 : 1.2);

            P[o + 2] += (dx / distance) * force;
            P[o + 3] += (dy / distance) * force;
          }
        }

        // Click/tap ripple.
        if (!reduceMotion && state.waves.length) {
          for (let w = 0; w < state.waves.length; w++) {
            const wave = state.waves[w];

            const age = now - wave.time;

            const dx = x - wave.x;
            const dy = y - wave.y;

            const distance = Math.hypot(dx, dy);

            const ringDistance = Math.abs(
              distance - age * 0.72
            );

            if (ringDistance < 28) {
              const strength =
                (1 - ringDistance / 28) *
                (1 - age / 850);

              hot = Math.max(hot, strength);

              P[o + 2] +=
                (dx / (distance || 1)) * strength * 1.8;

              P[o + 3] +=
                (dy / (distance || 1)) * strength * 1.8;
            }
          }
        }

        // Smoothly settle cursor movement.
        if (!isText && !reduceMotion) {
          P[o + 2] *= 0.82;
          P[o + 3] *= 0.82;

          P[o] += P[o + 2];
          P[o + 1] += P[o + 3];

          x = P[o];
          y = P[o + 1];
        }

        const speed =
          Math.abs(P[o + 2]) + Math.abs(P[o + 3]);

        if (isText) {
          const delay = P[o + 8] * 1000;

          const progress = clamp(
            (elapsed - delay) / 950
          );

          const alpha =
            (0.36 + progress * 0.58) * gather +
            hot * 0.35;

          const radius = 1.05 + hot * 0.8;

          ctx.globalAlpha = clamp(alpha);

          ctx.fillRect(
            x - radius,
            y - radius,
            radius * 2,
            radius * 2
          );

          // Crisp small glow, without CSS blur.
          if (hot > 0.08 && !reduceMotion) {
            glowCtx.globalAlpha = hot * 0.95;

            glowCtx.fillRect(
              x - 2,
              y - 2,
              4,
              4
            );
          }
        } else {
          const alpha = clamp(
            0.13 + speed * 0.045 + hot * 0.55,
            0.08,
            0.65
          );

          const radius = 0.7 + hot * 0.55;

          ctx.globalAlpha = alpha;

          ctx.fillRect(
            x - radius,
            y - radius,
            radius * 2,
            radius * 2
          );

          if (hot > 0.1 && !reduceMotion) {
            glowCtx.globalAlpha = hot * 0.8;

            glowCtx.fillRect(
              x - 1.6,
              y - 1.6,
              3.2,
              3.2
            );
          }
        }
      }

      ctx.globalAlpha = 1;
      glowCtx.globalAlpha = 1;

      // Description fades gently as particles scatter.
      if (copyRef.current) {
        copyRef.current.style.opacity = String(
          clamp(1 - state.currentScroll * 1.5)
        );
      }

      if (spot && state.mouseOn) {
        spot.style.transform = `translate3d(
          ${state.mouseX - 190}px,
          ${state.mouseY - 190}px,
          0
        )`;
      }

      // Continue only while something is moving.
      const introActive =
        !reduceMotion && !introFinished;

      const scrollActive =
        Math.abs(
          state.targetScroll - state.currentScroll
        ) > 0.001;

      const particlesMoving = (() => {
        for (let i = 0; i < N; i++) {
          const o = i * 10;

          if (
            Math.abs(P[o + 2]) > 0.04 ||
            Math.abs(P[o + 3]) > 0.04
          ) {
            return true;
          }
        }

        return false;
      })();

      const waveActive = state.waves.length > 0;

      if (
        introActive ||
        scrollActive ||
        pointerMoving ||
        particlesMoving ||
        waveActive
      ) {
        requestFrame();
      }
    };

    const updateScroll = () => {
      if (!scrollScatter) {
        state.targetScroll = 0;
        requestFrame();
        return;
      }

      const rect = outer.getBoundingClientRect();

      const travel = Math.max(
        1,
        outer.offsetHeight - window.innerHeight
      );

      state.targetScroll = clamp(-rect.top / travel);

      requestFrame();
    };

    const onPointerMove = (event) => {
      const rect = stage.getBoundingClientRect();

      state.mouseX = event.clientX - rect.left;
      state.mouseY = event.clientY - rect.top;

      state.mouseOn = true;
      state.pointerMoving = true;
      state.pointerTime = performance.now();

      if (spot) spot.style.opacity = "1";

      requestFrame();
    };

    const onPointerLeave = () => {
      state.mouseOn = false;
      state.pointerMoving = false;

      if (spot) spot.style.opacity = "0";

      requestFrame();
    };

    const onPointerDown = (event) => {
      const rect = stage.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      state.waves.push({
        x,
        y,
        time: performance.now(),
      });

      if (state.waves.length > 2) {
        state.waves.shift();
      }

      requestFrame();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        requestFrame();
      }
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();

      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      // Ignore tiny mobile browser-bar height changes.
      if (
        width === lastWidth &&
        Math.abs(height - lastHeight) < 70
      ) {
        return;
      }

      lastWidth = width;
      lastHeight = height;

      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        if (!alive) return;

        readColors();
        buildParticles();
        updateScroll();
      }, 140);
    };

    const start = async () => {
      readColors();

      try {
        if (document.fonts?.load) {
          await Promise.race([
            document.fonts.load(
              `${fontWeight} 100px ${FONT_FAMILY}`
            ),
            new Promise((resolve) =>
              window.setTimeout(resolve, 1200)
            ),
          ]);
        }
      } catch {
        // Fallback font will be used if web font fails.
      }

      if (!alive) return;

      buildParticles();
      updateScroll();

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(stage);

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          state.visible = entry.isIntersecting;

          if (state.visible) {
            requestFrame();
          } else {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        },
        { threshold: 0 }
      );

      intersectionObserver.observe(outer);
    };

    stage.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });

    stage.addEventListener("pointerleave", onPointerLeave, {
      passive: true,
    });

    stage.addEventListener("pointerdown", onPointerDown, {
      passive: true,
    });

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    window.addEventListener("resize", resize, {
      passive: true,
    });

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    start();

    return () => {
      alive = false;

      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);

      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();

      stage.removeEventListener(
        "pointermove",
        onPointerMove
      );

      stage.removeEventListener(
        "pointerleave",
        onPointerLeave
      );

      stage.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      window.removeEventListener(
        "scroll",
        updateScroll
      );

      window.removeEventListener(
        "resize",
        resize
      );

      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
    };
  }, [headline, description, scrollScatter, fontWeight]);

  return (
    <section
      ref={outerRef}
      className={`relative w-full bg-[var(--bg-main)] h-[100svh] ${className}`}
    >
      <div
        ref={stageRef}
        className={`relative w-full overflow-hidden ${
          scrollScatter
            ? "sticky top-0 h-[100svh]"
            : "h-[100svh]"
        } min-h-[480px]`}
        style={{
          color: "var(--white)",
          fontFamily: FONT_FAMILY,
          background: "var(--bg-main)",
        }}
      >
        {/* Subtle background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="dfh-aurora dfh-aurora-one"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--blue-2) 30%, transparent), transparent 68%)",
            }}
          />

          <div
            className="dfh-aurora dfh-aurora-two"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--blue-3) 22%, transparent), transparent 68%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, var(--bg-main) 100%)",
            }}
          />
        </div>

        {/* Sharp particle glow */}
        <canvas
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
        />

        {/* Main particle canvas */}
        <canvas
          ref={dotsRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* Sharper cursor spotlight */}
        <div
          ref={spotRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[380px] w-[380px] opacity-0 transition-opacity duration-200"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--blue-3) 24%, transparent) 0%, color-mix(in srgb, var(--blue-2) 13%, transparent) 28%, transparent 65%)",
          }}
        />

        {/* Accessible heading */}
        <h1 className="sr-only">{headline}</h1>

        {/* Supporting description */}
        {description && (
          <div
            ref={copyRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-5 pb-[max(13vh,72px)] text-center"
          >
            <p className="m-0 max-w-[820px] text-[14px] leading-[1.8] text-[var(--white)] sm:text-[16px] md:text-[17px]">
              {description}
            </p>
          </div>
        )}

        <style>{`
          .dfh-aurora {
            position: absolute;
            width: 65vmax;
            height: 65vmax;
            border-radius: 50%;
            pointer-events: none;
            will-change: transform;
            animation: dfh-drift 24s ease-in-out infinite alternate;
          }

          .dfh-aurora-one {
            left: -25vmax;
            top: -35vmax;
          }

          .dfh-aurora-two {
            right: -25vmax;
            bottom: -38vmax;
            animation-duration: 30s;
            animation-direction: alternate-reverse;
          }

          @keyframes dfh-drift {
            from {
              transform: translate3d(0, 0, 0) scale(1);
            }
            to {
              transform: translate3d(8vmax, 7vmax, 0) scale(1.12);
            }
          }

          @media (max-width: 640px) {
            .dfh-aurora {
              width: 90vmax;
              height: 90vmax;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .dfh-aurora {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}




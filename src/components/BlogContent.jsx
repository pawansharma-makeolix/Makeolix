import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { List, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// Animation Variants
// Tuned to be lighter/faster so scroll-triggered entrances don't jank:
// smaller travel distance, shorter durations, smaller stagger caps.
// ─────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: Math.min(i * 0.02, 0.08),
      ease: "easeOut",
    },
  }),
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const slideLeft = {
  hidden: {
    opacity: 0,
    x: -10,
  },

  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.26,
      delay: Math.min(i * 0.025, 0.08),
      ease: "easeOut",
    },
  }),
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.99,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

// Shared style hint so the browser promotes these to their own
// compositor layer instead of repainting on every animation frame.
// This is what actually removes the jank/lag during scroll-in.
const gpuHint = { willChange: "transform, opacity" };

// Shared viewport config for scroll-triggered reveals: once:true means
// each element's IntersectionObserver disconnects after first trigger,
// so it costs nothing on subsequent scrolling.
const revealViewport = {
  once: true,
  margin: "0px 0px -60px 0px",
  amount: 0.1,
};

// ─────────────────────────────────────────────────────────────────────
// Create safe heading ID
// ─────────────────────────────────────────────────────────────────────

const createHeadingId = (text, index) => {
  const safeText = String(text || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `blog-heading-${safeText || "section"}-${index}`;
};

// ─────────────────────────────────────────────────────────────────────
// Scroll-triggered wrapper
// ─────────────────────────────────────────────────────────────────────

const ScrollReveal = ({
  children,
  variants = fadeUp,
  custom = 0,
  className = "",
}) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={gpuHint}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={custom}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Render text with links
// ─────────────────────────────────────────────────────────────────────

const RenderTextWithLinks = ({ text, links = [] }) => {
  let content = [text];

  links.forEach((link) => {
    content = content.flatMap((part) => {
      if (typeof part !== "string") {
        return part;
      }

      const splitText = part.split(link.word);

      return splitText.flatMap((item, index) => {
        if (index !== splitText.length - 1) {
          const isMailLink = link.url?.startsWith("mailto:");

          const isExternalLink =
            link.url?.startsWith("http://") ||
            link.url?.startsWith("https://");

          const commonStyle = {
            color: "#118ab2",
            textDecoration: "underline",
            fontWeight: 800,
            display: "inline-block",
            transition:
              "transform 180ms ease, color 180ms ease",
            transformOrigin: "center",
          };

          const handleMouseEnter = (e) => {
            e.currentTarget.style.transform =
              "translateY(0px) scale(1.035)";
            e.currentTarget.style.color = "#fff";
          };

          const handleMouseLeave = (e) => {
            e.currentTarget.style.transform =
              "translateY(0) scale(1)";
            e.currentTarget.style.color = "#118ab2";
          };

          let linkElement;

          // ─────────────────────────────────────
          // EMAIL LINK
          // ─────────────────────────────────────
          if (isMailLink) {
            linkElement = (
              <a
                key={`${link.word}-${index}`}
                href={link.url}
                style={commonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {link.word}
              </a>
            );
          }

          // ─────────────────────────────────────
          // EXTERNAL LINK
          // ─────────────────────────────────────
          else if (isExternalLink || link.newTab) {
            linkElement = (
              <a
                key={`${link.word}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={commonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {link.word}
              </a>
            );
          }

          // ─────────────────────────────────────
          // INTERNAL LINK
          // ─────────────────────────────────────
          else {
            linkElement = (
              <Link
                key={`${link.word}-${index}`}
                to={link.url}
                style={commonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {link.word}
              </Link>
            );
          }

          return [item, linkElement];
        }

        return item;
      });
    });
  });

  return content;
};



// ─────────────────────────────────────────────────────────────────────
// H2 Block
// ─────────────────────────────────────────────────────────────────────

const H2Block = ({ text, index, id }) => (
  <ScrollReveal custom={index} className="relative mt-14 mb-5">
    <motion.div
      className="absolute -left-5 top-0 h-full w-1 rounded-full"
      style={{
        background: "var(--blue-3)",
        ...gpuHint,
      }}
      initial={{
        scaleY: 0,
        originY: 0,
      }}
      whileInView={{
        scaleY: 1,
      }}
      viewport={revealViewport}
      transition={{
        duration: 0.28,
        ease: "easeOut",
      }}
    />

    <h2
      id={id}
      className="scroll-mt-28 leading-tight pl-4"
      style={{
        background:
          "linear-gradient(90deg, #ffffff 0%, #ffffff 65%, #003863 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {text}
    </h2>
  </ScrollReveal>
);

// ─────────────────────────────────────────────────────────────────────
// H3 Block
// ─────────────────────────────────────────────────────────────────────

const H3Block = ({ text, index }) => (
  <ScrollReveal custom={index} className="mt-10 mb-4">
    <h3
      className="tracking-wide"
      style={{
        color: "var(--blue-3)",
      }}
    >
      {text}
    </h3>
  </ScrollReveal>
);

// ─────────────────────────────────────────────────────────────────────
// Paragraph Block
// ─────────────────────────────────────────────────────────────────────

const ParaBlock = ({ text, index, links }) => (
  <ScrollReveal custom={index} className="mb-5">
    <p
      className="text-base leading-relaxed"
      style={{
        color: "var(--white)",
      }}
    >
      <RenderTextWithLinks
        text={text}
        links={links}
      />
    </p>
  </ScrollReveal>
);

// ─────────────────────────────────────────────────────────────────────
// Bold Paragraph
// ─────────────────────────────────────────────────────────────────────

const BoldParaBlock = ({
  boldText,
  normalText,
  index,
}) => (
  <ScrollReveal custom={index} className="mb-5">
    <p
      className="text-base leading-relaxed"
      style={{
        color: "var(--text-muted)",
      }}
    >
      <strong
        style={{
          color: "#ffffff",
          fontWeight: 600,
        }}
      >
        {boldText}{" "}
      </strong>

      {normalText}
    </p>
  </ScrollReveal>
);

// ─────────────────────────────────────────────────────────────────────
// Image Block
// ─────────────────────────────────────────────────────────────────────

const ImageBlock = ({
  src,
  alt,
  caption,
  index,
}) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <motion.figure
      ref={ref}
      className="my-10 overflow-hidden rounded-2xl"
      style={{
        border: "1px solid rgba(17,138,178,0.18)",
      }}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="overflow-hidden">
        <motion.img
          src={src}
          alt={alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="w-full object-cover"
          style={{
            maxHeight: "480px",
            ...gpuHint,
          }}
          initial={{
            scale: 1.015,
          }}
          animate={
            inView
              ? {
                  scale: 1,
                }
              : {
                  scale: 1.015,
                }
          }
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        />
      </div>

      {caption && (
        <motion.figcaption
          className="px-4 py-3 text-center text-xs italic"
          style={{
            color: "var(--text-muted)",
            background: "rgba(0,23,31,0.7)",
          }}
          initial={{
            opacity: 0,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                }
          }
          transition={{
            delay: 0.1,
            duration: 0.25,
          }}
        >
          {caption}
        </motion.figcaption>
      )}
    </motion.figure>
  );
};

// ─────────────────────────────────────────────────────────────────────
// List Block
// ─────────────────────────────────────────────────────────────────────

const ListBlock = ({
  items,
  heading,
  index,
}) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <div
      ref={ref}
      className="my-6"
    >
      {heading && (
        <motion.p
          className="mb-3 text-base font-semibold"
          style={{
            color: "var(--blue-3)",
            ...gpuHint,
          }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {heading}
        </motion.p>
      )}

      <motion.ul
        className="space-y-3 pl-1"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{
              color: "var(--text-muted)",
              ...gpuHint,
            }}
            variants={slideLeft}
            custom={i}
          >
            <motion.span
              className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"
              style={{
                background: "var(--blue-3)",
              }}
              initial={{
                scale: 0,
              }}
              animate={
                inView
                  ? {
                      scale: 1,
                    }
                  : {
                      scale: 0,
                    }
              }
              transition={{
                delay: Math.min(i * 0.025 + 0.04, 0.14),
                duration: 0.2,
                ease: "easeOut",
              }}
            />

            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Numbered List Block
// ─────────────────────────────────────────────────────────────────────

const NumberedListBlock = ({ items }) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <motion.ol
      ref={ref}
      className="my-6 space-y-3 pl-1"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          className="flex items-start gap-4 text-sm leading-relaxed"
          style={{
            color: "var(--text-muted)",
            ...gpuHint,
          }}
          variants={slideLeft}
          custom={i}
        >
          <span
            className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{
              background: "rgba(17,138,178,0.15)",
              color: "var(--blue-3)",
              border: "1px solid rgba(17,138,178,0.3)",
            }}
          >
            {i + 1}
          </span>

          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Steps Block
// ─────────────────────────────────────────────────────────────────────

const StepsBlock = ({ items }) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <div
      ref={ref}
      className="my-8 space-y-4"
    >
      {items.map((step, i) => (
        <motion.div
          key={i}
          className="group relative flex gap-5 rounded-xl p-5"
          style={{
            background: "rgba(5,25,35,0.7)",
            border: "1px solid rgba(17,138,178,0.12)",
            ...gpuHint,
          }}
          variants={fadeUp}
          custom={i}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          whileHover={{
            borderColor: "rgba(17,138,178,0.4)",
            background: "rgba(5,25,35,0.95)",
            transition: {
              duration: 0.15,
            },
          }}
        >
          {/* Number badge */}
          <div
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            style={{
              background:
                "linear-gradient(135deg, var(--blue-2), var(--blue-3))",
              color: "#ffffff",
            }}
          >
            {i + 1}
          </div>

          <div className="min-w-0 flex-1">
            <h4
              className="mb-1 text-base font-semibold"
              style={{
                color: "#ffffff",
              }}
            >
              {step.title}
            </h4>

            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--text-muted)",
              }}
            >
              <RenderTextWithLinks
                text={step.description}
                links={step.links}
              />
            </p>
          </div>

          {/* Animated left glow line */}
          <motion.div
            className="absolute bottom-3 left-0 top-3 w-0.5 rounded-full"
            style={{
              background: "var(--blue-3)",
            }}
            initial={{
              scaleY: 0,
            }}
            whileHover={{
              scaleY: 1,
            }}
            transition={{
              duration: 0.18,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Divider Block
// ─────────────────────────────────────────────────────────────────────

const DividerBlock = () => (
  <ScrollReveal className="my-10">
    <motion.div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, transparent, var(--blue-3), transparent)",
        ...gpuHint,
      }}
      initial={{
        scaleX: 0,
      }}
      whileInView={{
        scaleX: 1,
      }}
      viewport={revealViewport}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    />
  </ScrollReveal>
);

// ─────────────────────────────────────────────────────────────────────
// Quote Block
// ─────────────────────────────────────────────────────────────────────

const QuoteBlock = ({
  text,
  index,
}) => (
  <ScrollReveal custom={index} className="my-8">
    <blockquote
      className="relative rounded-r-xl py-4 pl-6 pr-4 text-base italic leading-relaxed"
      style={{
        borderLeft: "3px solid var(--blue-3)",
        background: "rgba(17,138,178,0.07)",
        color: "var(--text-muted)",
      }}
    >
      {text}
    </blockquote>
  </ScrollReveal>
);

// ─────────────────────────────────────────────────────────────────────
// Table of Contents (Desktop)
//
// Why `position: fixed` instead of `sticky`:
// This component is reused across ~15 different pages, each with its
// own outer layout/wrapper. `position: sticky` silently breaks the
// moment ANY ancestor up the tree sets `overflow: hidden/auto/scroll`
// (even on just one axis), and we can't guarantee that never happens
// on 15 different pages. `position: fixed` anchors to the viewport and
// is immune to that — it only breaks if an ancestor sets `transform`,
// which is far rarer and not something this component itself does.
//
// To keep it fixed at the *correct* horizontal position (matching the
// grid column), we render an invisible "anchor" div inside the grid
// (this reserves the column's width/space exactly like before), then
// measure that anchor's position and size it onto the real fixed panel.
// ─────────────────────────────────────────────────────────────────────

const TOC_TOP_GAP = 112; // px, matches the 7rem offset used below

const TableOfContents = ({
  items,
  activeId,
  onItemClick,
}) => {
  const anchorRef = useRef(null);
  const panelRef = useRef(null);
  const [panelStyle, setPanelStyle] = useState(null);

  useEffect(() => {
    if (!items.length) {
      return undefined;
    }

    let ticking = false;

    // Decides which of the 3 states the TOC panel should be in, purely
    // from measured boxes — never assumes page structure outside this
    // component, so it can't leak onto the navbar/hero/footer.
    const compute = () => {
      ticking = false;

      const anchor = anchorRef.current;
      const panel = panelRef.current;

      if (!anchor) {
        return;
      }

      const anchorBox = anchor.getBoundingClientRect();
      const panelHeight = panel ? panel.offsetHeight : 0;

      // How far the panel is allowed to travel down inside the anchor
      // before its bottom edge would exit the anchor's own box.
      const maxTopWithinAnchor = Math.max(
        anchorBox.height - panelHeight,
        0
      );

      if (anchorBox.top >= TOC_TOP_GAP) {
        // Component hasn't reached the sticky point yet (e.g. still
        // inside the hero above it) — park at the top of our own column.
        setPanelStyle({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        });
      } else if (anchorBox.top <= TOC_TOP_GAP - maxTopWithinAnchor) {
        // Component's bottom is approaching (e.g. footer coming up) —
        // park at the bottom of our own column so it never spills out.
        setPanelStyle({
          position: "absolute",
          top: maxTopWithinAnchor,
          left: 0,
          width: "100%",
        });
      } else {
        // Comfortably inside the component — fixed to the viewport,
        // this is the part that visually "sticks" while scrolling.
        setPanelStyle({
          position: "fixed",
          top: TOC_TOP_GAP,
          left: anchorBox.left,
          width: anchorBox.width,
        });
      }
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(compute);
      }
    };

    compute();

    window.addEventListener("scroll", onScrollOrResize, {
      passive: true,
    });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("orientationchange", onScrollOrResize);

    let resizeObserver;

    if (typeof ResizeObserver !== "undefined" && anchorRef.current) {
      // Fires when the content column's height changes (e.g. images
      // finish loading), which changes our stretched anchor height too.
      resizeObserver = new ResizeObserver(onScrollOrResize);
      resizeObserver.observe(anchorRef.current);
    }

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener(
        "orientationchange",
        onScrollOrResize
      );

      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [items.length]);

  if (!items.length) {
    return null;
  }

  return (
    <>
      {/* Styled scrollbar for the TOC's internal nav list (webkit + firefox) */}
      <style>{`
        .blog-toc-nav-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .blog-toc-nav-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .blog-toc-nav-scroll::-webkit-scrollbar-thumb {
          background: rgba(17,138,178,0.35);
          border-radius: 999px;
        }
        .blog-toc-nav-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(17,138,178,0.6);
        }
        .blog-toc-nav-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(17,138,178,0.35) transparent;
        }
      `}</style>

      {/* Anchor: stretched to the full height of the content column
          (its sibling grid item) via self-stretch, and position:relative
          so it acts as the boundary box the panel is measured/parked
          against. This is what keeps the TOC confined to THIS component
          only, instead of floating over the hero/navbar/footer. */}
      <div
        ref={anchorRef}
        className="hidden lg:block lg:self-stretch"
        style={{
          position: "relative",
        }}
      >
        {/* Real panel: switches between parked-at-top, fixed-to-viewport,
            and parked-at-bottom based on scroll position (see compute()
            above). Rendered only once measured, to avoid a first-paint
            flash at the wrong position. */}
        {panelStyle && (
          <aside
            ref={panelRef}
            className="blog-toc"
            aria-label="Table of Contents"
            style={{
              ...panelStyle,
              maxHeight: "calc(100vh - 8.5rem)",
              zIndex: 40,
            }}
          >
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background:
                "linear-gradient(145deg, rgba(5,25,35,0.92), rgba(0,56,99,0.16))",
              border: "1px solid rgba(17,138,178,0.16)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.14)",
            }}
          >
            {/* TOC Header */}
            <div
              className="flex items-center gap-2 px-4 py-4"
              style={{
                borderBottom:
                  "1px solid rgba(17,138,178,0.14)",
              }}
            >
              <List
                size={17}
                strokeWidth={2}
                style={{
                  color: "var(--blue-3)",
                }}
              />

              <span
                className="text-sm font-semibold"
                style={{
                  color: "#ffffff",
                }}
              >
                Table of Contents
              </span>
            </div>

            {/* TOC Items */}
            <nav
              className="blog-toc-nav-scroll overflow-y-auto px-2 py-3"
              style={{
                maxHeight: "calc(100vh - 14.5rem)",
              }}
            >
              <div className="space-y-1">
                {items.map((item, index) => {
                  const isActive = activeId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onItemClick(item.id)}
                      className="
                        group
                        flex
                        w-full
                        items-start
                        gap-2
                        rounded-lg
                        px-3
                        py-2.5
                        text-left
                        transition-all
                        duration-200
                      "
                      style={{
                        color: isActive
                          ? "#ffffff"
                          : "var(--text-muted)",
                        background: isActive
                          ? "rgba(17,138,178,0.12)"
                          : "transparent",
                      }}
                    >
                      <ChevronRight
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{
                          color: isActive
                            ? "var(--blue-3)"
                            : "rgba(160,174,192,0.45)",
                          transform: isActive
                            ? "translateX(2px)"
                            : "translateX(0)",
                          transition:
                            "transform 0.2s ease",
                        }}
                      />

                      <span
                        className="text-xs leading-relaxed"
                        style={{
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
          </aside>
        )}
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Mobile / Tablet TOC — sticky compact bar under the header so it
// stays reachable while scrolling on small screens too.
// ─────────────────────────────────────────────────────────────────────

const MobileTableOfContents = ({
  items,
  activeId,
  onItemClick,
}) => {
  if (!items.length) {
    return null;
  }

  return (
    <div
      className="
        mb-8
        block
        lg:hidden
        sticky
        top-16
        z-20
      "
    >
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(145deg, rgba(5,25,35,0.96), rgba(0,56,99,0.22))",
          border: "1px solid rgba(17,138,178,0.16)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            borderBottom:
              "1px solid rgba(17,138,178,0.14)",
          }}
        >
          <List
            size={16}
            style={{
              color: "var(--blue-3)",
            }}
          />

          <span
            className="text-sm font-semibold"
            style={{
              color: "#ffffff",
            }}
          >
            Table of Contents
          </span>
        </div>

        {/* Horizontal scroll */}
        <div
          className="flex gap-2 overflow-x-auto p-3"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onItemClick(item.id)}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-xs transition-all duration-200"
                style={{
                  color: isActive
                    ? "#ffffff"
                    : "var(--text-muted)",
                  background: isActive
                    ? "rgba(17,138,178,0.22)"
                    : "rgba(255,255,255,0.035)",
                  border: isActive
                    ? "1px solid rgba(17,138,178,0.35)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Main BlogContent Component
// ─────────────────────────────────────────────────────────────────────

const BlogContent = ({ blocks = [] ,  blogDescription = "",}) => {
  // ─────────────────────────────────────────────────────────────────
  // Build TOC only from H2 blocks
  // Existing BlogData does NOT need to change.
  // ─────────────────────────────────────────────────────────────────

  const tocItems = useMemo(() => {
    return blocks
      .map((block, index) => {
        if (block.type !== "h2") {
          return null;
        }

        return {
          id: createHeadingId(block.text, index),
          text: block.text,
          index,
        };
      })
      .filter(Boolean);
  }, [blocks]);

  // ─────────────────────────────────────────────────────────────────
  // Active heading
  // ─────────────────────────────────────────────────────────────────

  const [activeId, setActiveId] = useState(
    tocItems[0]?.id || ""
  );

  // ─────────────────────────────────────────────────────────────────
  // Keep active ID correct when blog changes
  // ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    setActiveId(tocItems[0]?.id || "");
  }, [tocItems]);

  // ─────────────────────────────────────────────────────────────────
  // Observe headings while user scrolls
  // ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!tocItems.length) {
      return undefined;
    }

    const headingElements = tocItems
      .map((item) =>
        document.getElementById(item.id)
      )
      .filter(Boolean);

    if (!headingElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        if (visibleEntries.length > 0) {
          setActiveId(
            visibleEntries[0].target.id
          );
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -65% 0px",
        threshold: [0, 0.1, 0.25],
      }
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, [tocItems]);

  // ─────────────────────────────────────────────────────────────────
  // Smooth TOC navigation
  // ─────────────────────────────────────────────────────────────────

  const handleTocClick = (id) => {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    setActiveId(id);

    const headerOffset = 105;

    const elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY;

    const offsetPosition =
      elementPosition - headerOffset;

    window.scrollTo({
      top: Math.max(offsetPosition, 0),
      behavior: "smooth",
    });
  };

  return (
    <section
      className="w-full py-12 px-4"
      style={{
        background: "var(--bg-main)",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          Mobile / Tablet TOC
      ───────────────────────────────────────────────────────────── */}

      <div className="mx-auto w-full max-w-7xl">
        <MobileTableOfContents
          items={tocItems}
          activeId={activeId}
          onItemClick={handleTocClick}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Main Layout
          Desktop:
          TOC LEFT (sticky) + BLOG CONTENT RIGHT
      ───────────────────────────────────────────────────────────── */}

      <div
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          gap-8
          lg:grid-cols-[240px_minmax(0,1fr)]
          xl:grid-cols-[270px_minmax(0,1fr)]
          lg:items-start
        "
      >
        {/* ───────────────────────────────────────────────────────────
            LEFT STICKY TOC
        ─────────────────────────────────────────────────────────── */}

        <TableOfContents
          items={tocItems}
          activeId={activeId}
          onItemClick={handleTocClick}
        />

        {/* ───────────────────────────────────────────────────────────
            BLOG CONTENT
        ─────────────────────────────────────────────────────────── */}

        <div className="min-w-0">
          <div className="mx-auto w-full max-w-3xl">
            {blocks.map((block, i) => {
              switch (block.type) {
                // ────────────────────────────────────────────────
                // H2
                // ────────────────────────────────────────────────

                case "h2": {
                  const tocItem = tocItems.find(
                    (item) => item.index === i
                  );

                  return (
                    <H2Block
                      key={i}
                      text={block.text}
                      index={i}
                      id={tocItem?.id}
                    />
                  );
                }

                // ────────────────────────────────────────────────
                // H3
                // ────────────────────────────────────────────────

                case "h3":
                  return (
                    <H3Block
                      key={i}
                      text={block.text}
                      index={i}
                    />
                  );

                // ────────────────────────────────────────────────
                // Paragraph
                // ────────────────────────────────────────────────

                case "para":
                  return (
                    <ParaBlock
                      key={i}
                      text={block.text}
                      links={block.links}
                      index={i}
                    />
                  );

                // ────────────────────────────────────────────────
                // Bold Paragraph
                // ────────────────────────────────────────────────

                case "boldpara":
                  return (
                    <BoldParaBlock
                      key={i}
                      boldText={block.boldText}
                      normalText={block.normalText}
                      index={i}
                    />
                  );

                // ────────────────────────────────────────────────
                // Image
                // ────────────────────────────────────────────────

                case "image":
                  return (
                    <ImageBlock
                      key={i}
                      src={block.src}
                      alt={blogDescription || block.alt || ""}
                      caption={block.caption}
                      index={i}
                    />
                  );

                // ────────────────────────────────────────────────
                // List
                // ────────────────────────────────────────────────

                case "list":
                  return (
                    <ListBlock
                      key={i}
                      items={block.items}
                      heading={block.heading}
                      index={i}
                    />
                  );

                // ────────────────────────────────────────────────
                // Numbered List
                // ────────────────────────────────────────────────

                case "numberedlist":
                  return (
                    <NumberedListBlock
                      key={i}
                      items={block.items}
                    />
                  );

                // ────────────────────────────────────────────────
                // Steps
                // ────────────────────────────────────────────────

                case "steps":
                  return (
                    <StepsBlock
                      key={i}
                      items={block.items}
                    />
                  );

                // ────────────────────────────────────────────────
                // Divider
                // ────────────────────────────────────────────────

                case "divider":
                  return (
                    <DividerBlock key={i} />
                  );

                // ────────────────────────────────────────────────
                // Quote
                // ────────────────────────────────────────────────

                case "quote":
                  return (
                    <QuoteBlock
                      key={i}
                      text={block.text}
                      index={i}
                    />
                  );

                // ────────────────────────────────────────────────
                // Table
                // ────────────────────────────────────────────────

                case "table":
                  return (
                    <ScrollReveal
                      key={i}
                      className="my-8"
                      variants={fadeIn}
                    >
                      <div className="overflow-x-auto">
                        <table
                          className="w-full border-collapse"
                          style={{
                            border:
                              "1px solid rgba(255,255,255,0.2)",
                          }}
                        >
                          <thead>
                            <tr>
                              {block.data.headers.map(
                                (head, index) => (
                                  <th
                                    key={index}
                                    className="px-4 py-3 text-left font-bold"
                                    style={{
                                      border:
                                        "1px solid rgba(255,255,255,0.2)",
                                      color: "#ffffff",
                                      background:
                                        "rgba(17,138,178,0.08)",
                                    }}
                                  >
                                    {head}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>

                          <tbody>
                            {block.data.rows.map(
                              (row, index) => (
                                <tr key={index}>
                                  {row.map(
                                    (cell, i) => (
                                      <td
                                        key={i}
                                        className="px-4 py-3"
                                        style={{
                                          border:
                                            "1px solid rgba(255,255,255,0.2)",
                                          color:
                                            "var(--text-muted)",
                                        }}
                                      >
                                        {cell}
                                      </td>
                                    )
                                  )}
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </ScrollReveal>
                  );

                // ────────────────────────────────────────────────
                // Unknown block
                // ────────────────────────────────────────────────

                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogContent;

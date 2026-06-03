"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useEffect, useState, useRef } from "react";
import Button from "./Button";

const Hero = () => {
  const [init, setInit] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      }).then(() => setInit(true));
    }
  }, [isDesktop]);

  // ✅ Video ko force play karo — autoplay block ka fix
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay block hua — user interaction pe retry karo
        const playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("touchstart", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
        document.addEventListener("touchstart", playOnInteraction);
      });
    };

    if (video.readyState >= 3) {
      setVideoReady(true);
      tryPlay();
    } else {
      video.addEventListener("canplay", () => {
        setVideoReady(true);
        tryPlay();
      });
    }
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: "#051923" },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        push: { quantity: 4 },
        grab: { distance: 140, links: { opacity: 0.4 } },
      },
    },
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: ["#ef476f", "#fff", "#118ab2"] },
      links: { enable: true, distance: 110, color: "#ffffff", opacity: 0.7, width: 1 },
      move: { enable: true, speed: 1.2, direction: "none", outModes: { default: "bounce" } },
      size: { value: { min: 4, max: 6 } },
      opacity: { value: 0.7 },
      shape: { type: "circle" },
    },
    detectRetina: true,
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{ backgroundColor: "#051923" }}
    >
      {/* Video — hamesha DOM mein, opacity se control */}
      <video
        ref={videoRef}
        muted           // ✅ muted ZAROORI hai autoplay ke liye
        loop
        playsInline
        preload="auto"
        poster="/Heroimage.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        style={{
          opacity: isDesktop && videoReady ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Particles — mobile only */}
      {!isDesktop && init && (
        <Particles
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Content */}
      <div className="relative z-30 max-w-5xl px-6 text-white">
        <h1 className="leading-tight mb-6">
          We are MAKEOLIX
          <br />
          We are{" "}
          <span className="bg-linear-to-r from-white to-[#118ab2] bg-clip-text text-transparent">
            building brands across the GLOBE
          </span>
        </h1>

        <p className="text-amber-50 text-lg mb-8">
          We help brands dominate digital with AI-powered strategies.
        </p>

        <div className="flex justify-center gap-4">
          <Button href={"/contact-us"}>Get In Touch</Button>
          <Button variant="outline" href={"/about"}>Know More</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
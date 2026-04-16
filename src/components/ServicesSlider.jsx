import React, { useRef, useEffect, useState } from "react";
import { SparkleParticles } from "./SparkleParticles";
import Button from "../components/Button"

const services = [
  { title: "Web Development", image: "/web-dev.jpg" },
  { title: "Web Design", image: "/web-design.jpg" },
  { title: "Performance Marketing", image: "/performance.jpg" },
  { title: "Social Media Marketing", image: "/social.jpg" },
  { title: "Local SEO Service", image: "/seo-local.jpg" },
  { title: "Small Business Plan", image: "/business.jpg" },
  { title: "SEO Reseller Service", image: "/seo.jpg" }
];

const ServicesSlider = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const progress = useRef(50);
  const target = useRef(50);
  const [isActive, setIsActive] = useState(false);

  // Detect section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      progress.current += (target.current - progress.current) * 0.1;

      const active = (progress.current / 100) * (services.length - 1);

      itemsRef.current.forEach((el, i) => {
        if (!el) return;

        const ratio = (i - active) / (services.length - 1);

        const tx = ratio * 800;
        const ty = ratio * 200;
        const rot = ratio * 120;

        const z = services.length - Math.abs(i - active);

        el.style.transform = `translate3d(${tx}%, ${ty}%, 0) rotate(${rot}deg)`;
        el.style.zIndex = Math.round(z * 10);
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  // Scroll control (LOCK scroll inside section)
  useEffect(() => {
    const wheel = (e) => {
      if (!isActive) return;

      const next = target.current + e.deltaY * 0.05;

      // If inside range → prevent page scroll
      if (next > 0 && next < 100) {
        e.preventDefault();
      }

      target.current = Math.max(0, Math.min(100, next));
    };

    const el = containerRef.current;
    el.addEventListener("wheel", wheel, { passive: false });

    return () => el.removeEventListener("wheel", wheel);
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="relative py-20 overflow-hidden"
      style={{
        background: "#051923"
      }}
    >
      {/* Particles */}
      <SparkleParticles
        className="absolute inset-0 w-full h-full"
        particleColor={["#ffffff", "#ffffff"]}
      />

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: "#fff" }}>
            Our Services
          </h2>
          <p style={{ color: "#fff" }}>
            Discover a spectrum of services at Makeolix designed to amplify your
            online presence. From strategic social media campaigns and local SEO
            optimization to captivating website design, we offer tailored solutions
            that propel your brand to new heights in the ever-evolving digital landscape.
          </p>
        </div>

        {/* Slider */}
        <div className="relative h-[70vh]">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="absolute top-1/2 left-1/2 w-[260px] h-[360px] -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: "#051923" }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />

              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))",
                }}
              />

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {service.title}
                </h3>

              <Button variant="outline">Know More</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSlider;

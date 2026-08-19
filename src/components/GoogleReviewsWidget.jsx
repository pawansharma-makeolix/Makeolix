import { useEffect, useRef } from "react";

export default function GoogleReviewsWidget() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const loadScript = () => {
      const existingScript = document.querySelector(
        'script[src="https://elfsightcdn.com/platform.js"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadScript();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // 200px pehle hi load start ho jayega, taaki user pahunchte-pahunchte ready ho
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-(--bg-main) py-12 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-white text-3xl md:text-4xl font-semibold mb-8">
          What Our Customers Say
        </h2>

        <div className="rounded-3xl overflow-hidden">
          <div
            className="elfsight-app-ba96f079-404c-45c1-9042-6759db3a2ea9"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}
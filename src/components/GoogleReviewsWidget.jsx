import { useEffect } from "react";

export default function GoogleReviewsWidget() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://elfsightcdn.com/platform.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="elfsight-app-40e47a30-3a1f-4f0b-b5f0-90dfd1a1d3c8"
      data-elfsight-app-lazy
    />
  );
}
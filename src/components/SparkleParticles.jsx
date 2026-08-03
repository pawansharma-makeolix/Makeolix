"use client";

import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const SparkleParticles = ({
  className,
  particleColor = ["#118ab2", "#ffffff"],
}) => 
  {
  const [isReady, setIsReady] = useState(false);
  const id = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        onClick: {
          enable: false,
        },
      },
    },

    particles: {
      color: {
        value: particleColor,
      },

      number: {
        value: 30, // ✅ controlled density
      },

      size: {
        value: { min: 1, max: 4 },
      },

     opacity: {
    value: 0.25
},

      move: {
        enable: true,
        speed: 0.3, // ✅ slow = premium
        direction: "none",
        outModes: {
          default: "out",
        },
      },

      shape: {
        type: "circle",
      },
    },

    detectRetina: false,
  };

  return (
    isReady && <Particles id={id} options={options} className={className} />
  );


};

export default SparkleParticles;
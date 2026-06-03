"use client";

import React, { useState, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const videos = [
  { id: 1, src: "/Videos/client1.mp4", thumbnail: "/tina.jpg-new (1).jpg" },
  { id: 2, src: "/Videos/client2.mp4", thumbnail: "/patrick.jpg-new1.jpg" },
  { id: 3, src: "/Videos/client3.mp4", thumbnail: "/k9school.jpg-new (1).jpg" },
  { id: 4, src: "/Videos/client4.mp4", thumbnail: "/tanu.jpg-new (1).jpg" },
  { id: 5, src: "/Videos/client5.mp4", thumbnail: "/Corey.jpg-new (1).jpg" },
  { id: 6, src: "/Videos/client6.mp4", thumbnail: "/Gavin-Lawson.jpg-new (1).jpg" },
];

const VideoTestimonials = () => {
  const [active, setActive] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef([]);

  const next = () => {
    stopAll();
    setActive((prev) => (prev + 1) % videos.length);
  };

  const prev = () => {
    stopAll();
    setActive((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const stopAll = () => {
    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });
    setPlayingIndex(null);
  };

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });
    setPlayingIndex(index);
    const currentVideo = videoRefs.current[index];
    if (currentVideo) currentVideo.play().catch(() => {});
  };

  // ✅ Active aur adjacent cards ko preload karo, baaki none
  const getPreload = (index) => {
    const isActive = index === active;
    const isNext = index === (active + 1) % videos.length;
    const isPrev = index === (active - 1 + videos.length) % videos.length;
    if (isActive || isNext || isPrev) return "none"; // sirf play pe load
    return "none";
  };

  const getClass = (index) => {
    if (index === active) return "scale-100 opacity-100 z-20 translate-x-0";
    if (index === (active + 1) % videos.length)
      return "translate-x-[60%] scale-90 opacity-70 z-10";
    if (index === (active - 1 + videos.length) % videos.length)
      return "translate-x-[-60%] scale-90 opacity-70 z-10";
    return "scale-75 opacity-0";
  };

  return (
    <section
      className="w-full py-20 flex flex-col items-center"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-main) 0%, var(--bg-soft) 60%, var(--bg-main) 100%)",
      }}
    >
      <h2 className="mb-12 text-center" style={{ color: "#fff" }}>
        Client Testimonials
      </h2>

      <div className="relative w-full max-w-6xl h-75 sm:h-100 md:h-125 flex items-center justify-center overflow-hidden">
        {videos.map((video, i) => (
          <div
            key={video.id}
            className={`absolute transition-all duration-500 
            w-55 sm:w-70 md:w-85 h-full 
            rounded-xl overflow-hidden shadow-xl ${getClass(i)}`}
            style={{ backgroundColor: "#051923" }}
          >
            <div className="relative w-full h-full">
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={video.src}
                controls={playingIndex === i}
                className="w-full h-full object-cover"
                playsInline
                preload="none" // ✅ KEY FIX — koi bhi video page load pe download nahi hogi
                onEnded={() => setPlayingIndex(null)}
              />

              {/* Thumbnail + Play button — jab tak play na karo */}
              {playingIndex !== i && (
                <>
                  <img
                    src={video.thumbnail}
                    alt="thumbnail"
                    loading="lazy" // ✅ images bhi lazy load
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <button
                    onClick={() => handlePlay(i)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: "#118ab2" }}
                    >
                      ▶
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
          w-10 h-10 rounded-full flex items-center justify-center text-white z-30"
          style={{ backgroundColor: "#00509d" }}
        >
          <HiChevronLeft className="text-xl" />
        </button>

        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
          w-10 h-10 rounded-full flex items-center justify-center text-white z-30"
          style={{ backgroundColor: "#00509d" }}
        >
          <HiChevronRight className="text-xl" />
        </button>
      </div>
    </section>
  );
};

export default VideoTestimonials;
import React, { useRef, useEffect, useState } from "react";

function ScrollVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [started, setStarted] = useState(false); // overlay flag
  let targetTime = 0;
  let animationFrameId;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const handleScroll = () => {
      if (!started) return; // do nothing until video is started

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollRange = rect.height - windowHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollRange);
      const progress = scrollRange > 0 ? scrolled / scrollRange : 0;

      if (video.duration) {
        targetTime = video.duration * progress;
      }
    };

    const animate = () => {
      if (video && started && video.duration) {
        // smooth interpolation
        video.currentTime += (targetTime - video.currentTime) * 0.08;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [started]);

  const handleStart = () => {
    const video = videoRef.current;
    video.play().catch(() => console.log("Autoplay blocked"));
    setStarted(true);
  };

  return (
    <div ref={containerRef} className="relative h-[1000vh]">
      <div className="sticky top-0 h-screen w-screen bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src="/sample.mp4"
          className="h-full w-full object-contain"
          playsInline
          muted
        />
        {!started && (
          <div
            onClick={handleStart}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer z-50 text-white text-2xl"
          >
            Click anywhere to start
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="font-sans">
      <section className="h-screen flex items-center justify-center bg-purple-700 text-white text-4xl">
        Scroll down 👇
      </section>

      <ScrollVideo />

      <section className="h-screen flex items-center justify-center bg-green-600 text-white text-4xl">
        Done 🎉
      </section>
    </div>
  );
}

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const Finale: React.FC = () => {
  // Fire pastel celebratory confetti
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const end = Date.now() + (isMobile ? 1.6 : 3.5) * 1000;
    const particleCount = isMobile ? 2 : 3;
    const colors = ['#F6B8CF', '#C9B6F2', '#FFE5A3', '#B9DFC8', '#FFF7EC'];
    let rafId = 0;

    const frame = () => {
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 },
        colors,
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 },
        colors,
      });

      if (Date.now() < end && !document.hidden) {
        rafId = requestAnimationFrame(frame);
      }
    };

    frame();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      confetti.reset();
    };
  }, []);

  return (
    <div className="relative text-center px-4 max-w-2xl mx-auto z-20 flex flex-col items-center">
      {/* Background glowing halo */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-[#FF70A6]/20 via-[#C9B6F2]/20 to-[#FFE5A3]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Big Greeting */}
      <h1 className="font-handwriting text-3xl sm:text-5xl md:text-6xl text-[#FFE5A3] font-bold tracking-wide drop-shadow-[0_0_25px_rgba(255,229,163,0.7)] mb-3 animate-float-slow">
        Happy Vietnamese Women's Day! 💐
      </h1>

      {/* Dedicated subtitle to 12A1 */}
      <div className="glass-panel px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full border border-[#F6B8CF]/40 shadow-xl mb-4 sm:mb-6">
        <p className="text-sm sm:text-lg md:text-xl text-[#FFF7EC] font-medium tracking-wide">
          Gửi đến những bông hoa xinh đẹp của{' '}
          <span className="font-bold text-[#FF70A6] text-glow">12A1</span>
        </p>
      </div>

      {/* Closing signature */}
      <div className="mt-2 text-sm sm:text-base text-[#C9B6F2] font-handwriting text-2xl drop-shadow-md">
        Made with love, from the boys of 12A1 ♡
      </div>

      {/* Swarm of tiny fluttering background butterflies */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {[
          { x: -60, y: -40, delay: '0s', scale: 0.4 },
          { x: 90, y: -60, delay: '1s', scale: 0.35 },
          { x: -120, y: 80, delay: '2s', scale: 0.45 },
          { x: 140, y: 50, delay: '1.5s', scale: 0.3 },
        ].map((bf, idx) => (
          <div
            key={idx}
            className="absolute animate-float-slow"
            style={{
              left: `calc(50% + ${bf.x}px)`,
              top: `calc(30% + ${bf.y}px)`,
              transform: `scale(${bf.scale})`,
              animationDelay: bf.delay,
              opacity: 0.75,
            }}
          >
            <svg width="40" height="30" viewBox="0 0 40 30">
              <ellipse cx="14" cy="12" rx="10" ry="8" fill="#F6B8CF" opacity="0.8" />
              <ellipse cx="26" cy="12" rx="10" ry="8" fill="#C9B6F2" opacity="0.8" />
              <ellipse cx="20" cy="15" rx="3" ry="8" fill="#FFF7EC" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

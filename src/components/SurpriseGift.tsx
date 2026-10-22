import React, { useState } from 'react';

export const SurpriseGift: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div
      onClick={() => setOpened(!opened)}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none group py-1 sm:py-3 transition-transform duration-300 hover:scale-105"
      title="Chạm vào để thổi nến hoặc mở quà nha!"
    >
      {/* Floating mini cake with candle */}
      <div className="relative animate-float-slow">
        <svg viewBox="0 0 150 150" className="w-24 h-24 sm:w-32 sm:h-32 overflow-visible">
          <defs>
            <linearGradient id="cakeCreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDFC" />
              <stop offset="50%" stopColor="#FDE8F0" />
              <stop offset="100%" stopColor="#F6B8CF" />
            </linearGradient>
            <linearGradient id="cakeBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFEBD1" />
              <stop offset="100%" stopColor="#E5B989" />
            </linearGradient>
          </defs>

          {/* Candle Flame with glowing aura */}
          <ellipse cx="75" cy="22" rx="7" ry="11" fill="#FFB703" opacity="0.3" filter="drop-shadow(0 0 10px #FFB703)" />
          <path
            d="M 75 14 C 79 20, 80 26, 75 30 C 70 26, 71 20, 75 14 Z"
            fill="#FFD166"
            className="animate-pulse"
          />
          <ellipse cx="75" cy="26" rx="2.5" ry="3.5" fill="#FFF2CE" />

          {/* Candle stick */}
          <rect x="73" y="30" width="4" height="22" rx="2" fill="#C9B6F2" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* Top Layer Cream Frosting */}
          <path
            d="M 45 68 C 45 52, 105 52, 105 68 C 105 76, 45 76, 45 68 Z"
            fill="url(#cakeCreamGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          {/* Strawberries / cute berries on top */}
          <circle cx="58" cy="56" r="4.5" fill="#FF5376" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="92" cy="56" r="4.5" fill="#FF5376" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="75" cy="53" r="3.5" fill="#FFE5A3" />

          {/* Bottom Cake Tier */}
          <path
            d="M 40 70 L 40 98 C 40 114, 110 114, 110 98 L 110 70 C 100 76, 50 76, 40 70 Z"
            fill="url(#cakeBaseGrad)"
            stroke="#D9A16C"
            strokeWidth="1.2"
          />

          {/* Cream Dripping Details */}
          <path
            d="M 40 70 C 45 80, 52 82, 58 72 C 64 84, 72 82, 80 72 C 86 82, 94 82, 100 72 C 105 80, 110 76, 110 70"
            fill="#FFF7EC"
            stroke="#F6B8CF"
            strokeWidth="1.2"
          />

          {/* Cute Plate */}
          <ellipse cx="75" cy="108" rx="55" ry="10" fill="#FFF7EC" stroke="#C9B6F2" strokeWidth="1.5" />
          <ellipse cx="75" cy="108" rx="46" ry="7" fill="none" stroke="#F6B8CF" strokeWidth="0.8" />
        </svg>

        {/* Surprise sparkle badge */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#FF70A6] to-[#C9B6F2] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
          {opened ? '12A1 ♡' : 'Bữa chính nè 🎂'}
        </div>
      </div>

      <span className="text-xs text-[#FFE5A3] font-medium tracking-wide mt-1 opacity-90">
        (Bật mí từ các chàng trai)
      </span>
    </div>
  );
};

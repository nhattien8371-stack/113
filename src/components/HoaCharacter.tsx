import React, { useEffect, useState } from 'react';
import type { ButterflyMood } from '../types/story';

export type HoaMood =
  | 'idle'
  | 'welcome'
  | 'intro'
  | 'sparkle'
  | 'gentle'
  | 'wink'
  | 'happy-cake'
  | 'shy'
  | 'suspense'
  | 'smile-letter'
  | 'joy'
  | 'tender'
  | 'sincere'
  | 'celebrate'
  | 'fly'
  | 'hover'
  | 'look'
  | 'happy'
  | 'point'
  | 'curious';

interface HoaCharacterProps {
  mood?: HoaMood | ButterflyMood;
  scale?: number;
  className?: string;
  interactive?: boolean;
  isTransitioning?: boolean;
  onClick?: () => void;
}

export const HoaCharacter: React.FC<HoaCharacterProps> = ({
  mood = 'idle',
  scale = 1,
  className = '',
  interactive = true,
  isTransitioning = false,
  onClick,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [heartSparks, setHeartSparks] = useState<{ id: number; x: number; y: number; char: string }[]>([]);

  // Natural spontaneous blinking
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3200 + Math.random() * 2200);

    return () => clearInterval(blinkTimer);
  }, []);

  const handleInteraction = () => {
    if (!interactive) return;
    setIsTapped(true);
    if (onClick) onClick();

    // Spawn cute heart and sparkle particles
    const sparks = ['♡', '✨', '✿', '🌸', '💖'];
    const newSparks = Array.from({ length: 5 }).map((_, idx) => ({
      id: Date.now() + idx,
      x: (Math.random() - 0.5) * 70,
      y: -25 - Math.random() * 55,
      char: sparks[idx % sparks.length],
    }));
    setHeartSparks(newSparks);

    setTimeout(() => setIsTapped(false), 800);
    setTimeout(() => setHeartSparks([]), 1500);
  };

  // Render the distinctive rounded-square / rounded-rect neon eyes
  const renderEyes = () => {
    if (isBlinking) {
      return (
        <g stroke="#685072" strokeWidth="3.2" strokeLinecap="round" fill="none">
          <path d="M 82 136 Q 92 142 102 136" />
          <path d="M 122 136 Q 132 142 142 136" />
        </g>
      );
    }

    if (
      isTapped ||
      mood === 'happy' ||
      mood === 'happy-cake' ||
      mood === 'joy' ||
      mood === 'celebrate'
    ) {
      // Cheerful curved crescent eyes (^^)
      return (
        <g stroke="#685072" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M 80 138 Q 92 125 104 138" />
          <path d="M 120 138 Q 132 125 144 138" />
        </g>
      );
    }

    if (mood === 'wink' || mood === 'curious') {
      // Left eye wide, right eye playful wink with golden star
      return (
        <g>
          {/* Left eye: Wide glowing rounded-square */}
          <rect
            x="81"
            y="120"
            width="22"
            height="28"
            rx="9"
            fill="#381D47"
            stroke="#FFA5C3"
            strokeWidth="1.5"
          />
          <rect x="85" y="124" width="9" height="12" rx="4" fill="#FFFFFF" />
          <circle cx="97" cy="141" r="3" fill="#FFFFFF" />

          {/* Right eye: Playful wink curve */}
          <path d="M 120 136 Q 132 127 144 136" stroke="#685072" strokeWidth="3.8" strokeLinecap="round" fill="none" />
          {/* Wink star sparkle */}
          <path
            d="M 148 126 Q 150 120 152 126 Q 158 128 152 130 Q 150 136 148 130 Q 142 128 148 126 Z"
            fill="#FFD166"
            className="animate-spin"
            style={{ animationDuration: '4s' }}
          />
        </g>
      );
    }

    if (mood === 'sparkle') {
      // Sparkling wide eyes with diamond star highlights in pupils
      return (
        <g>
          {/* Left Eye */}
          <rect x="81" y="121" width="23" height="29" rx="9" fill="#381D47" stroke="#FFA5C3" strokeWidth="1.5" />
          <rect x="85" y="124" width="9" height="13" rx="4" fill="#FFFFFF" />
          <circle cx="97" cy="142" r="3.2" fill="#FFFFFF" />
          <path d="M 92 132 Q 95 130 98 132 Q 95 136 92 132 Z" fill="#FFE5A3" />

          {/* Right Eye */}
          <rect x="120" y="121" width="23" height="29" rx="9" fill="#381D47" stroke="#FFA5C3" strokeWidth="1.5" />
          <rect x="124" y="124" width="9" height="13" rx="4" fill="#FFFFFF" />
          <circle cx="136" cy="142" r="3.2" fill="#FFFFFF" />
          <path d="M 131 132 Q 134 130 137 132 Q 134 136 131 132 Z" fill="#FFE5A3" />
        </g>
      );
    }

    if (mood === 'shy') {
      // Shy cute gaze looking slightly to the side with soft rounded-square
      return (
        <g>
          <rect x="83" y="123" width="22" height="27" rx="9" fill="#381D47" stroke="#FFA5C3" strokeWidth="1.4" />
          <rect x="88" y="126" width="8" height="11" rx="4" fill="#FFFFFF" />
          <circle cx="98" cy="143" r="2.8" fill="#FFFFFF" />

          <rect x="123" y="123" width="22" height="27" rx="9" fill="#381D47" stroke="#FFA5C3" strokeWidth="1.4" />
          <rect x="128" y="126" width="8" height="11" rx="4" fill="#FFFFFF" />
          <circle cx="138" cy="143" r="2.8" fill="#FFFFFF" />
        </g>
      );
    }

    // Default: signature glowing rounded-square eyes (Mắt hình vuông bo tròn neon)
    return (
      <g>
        {/* Left Eye */}
        <g>
          <rect
            x="81"
            y="122"
            width="22"
            height="28"
            rx="9"
            fill="#381D47"
            stroke="#FFA5C3"
            strokeWidth="1.5"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,165,195,0.7))' }}
          />
          <rect x="83" y="130" width="18" height="18" rx="7" fill="#6B3475" opacity="0.4" />
          <rect x="85" y="125" width="9" height="13" rx="4" fill="#FFFFFF" />
          <circle cx="97" cy="142" r="3" fill="#FFFFFF" />
        </g>

        {/* Right Eye */}
        <g>
          <rect
            x="121"
            y="122"
            width="22"
            height="28"
            rx="9"
            fill="#381D47"
            stroke="#FFA5C3"
            strokeWidth="1.5"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,165,195,0.7))' }}
          />
          <rect x="123" y="130" width="18" height="18" rx="7" fill="#6B3475" opacity="0.4" />
          <rect x="125" y="125" width="9" height="13" rx="4" fill="#FFFFFF" />
          <circle cx="137" cy="142" r="3" fill="#FFFFFF" />
        </g>
      </g>
    );
  };

  // Render sweet smiling mouth tailored to current dialogue emotion
  const renderMouth = () => {
    if (
      isTapped ||
      mood === 'happy' ||
      mood === 'happy-cake' ||
      mood === 'joy' ||
      mood === 'celebrate' ||
      mood === 'sparkle'
    ) {
      // Big open radiant smile
      return (
        <path
          d="M 103 154 Q 112 166 121 154 Z"
          fill="#FF4B72"
          stroke="#E02955"
          strokeWidth="1.5"
        />
      );
    }

    if (mood === 'suspense') {
      // Cute round "o" suspense mouth
      return (
        <ellipse
          cx="112"
          cy="156"
          rx="3.5"
          ry="4.5"
          fill="#685072"
        />
      );
    }

    if (mood === 'shy') {
      // Gentle shy smile curve
      return (
        <path
          d="M 106 155 Q 112 159 118 154"
          stroke="#685072"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
      );
    }

    // Default warm gentle smile
    return (
      <path
        d="M 105 153 Q 112 161 119 153"
        stroke="#685072"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    );
  };

  // Subtle natural posture tilt based on dialogue mood
  const getTilt = () => {
    if (isTapped) return 'scale(1.08) translateY(-8px) rotate(4deg)';
    if (isTransitioning) return 'scale(1.04) rotate(3deg)';
    switch (mood) {
      case 'intro':
        return 'rotate(5deg) translateY(-2px)';
      case 'sparkle':
        return 'translateY(-4px) scale(1.02)';
      case 'wink':
      case 'curious':
        return 'rotate(-4deg) translateY(-2px)';
      case 'shy':
        return 'rotate(-3deg) translateY(2px)';
      case 'suspense':
        return 'translateY(-3px)';
      case 'happy-cake':
        return 'rotate(3.5deg) translateY(-4px)';
      case 'celebrate':
        return 'translateY(-5px) scale(1.03)';
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <div
      onClick={handleInteraction}
      className={`relative inline-block w-full h-full select-none cursor-pointer group ${className}`}
      style={{
        transform: `scale(${scale}) ${getTilt()}`,
        filter: 'drop-shadow(0 0 20px rgba(255, 112, 166, 0.65)) drop-shadow(0 0 38px rgba(201, 182, 242, 0.45))',
      }}
      title="Tớ là Hoa — Sứ giả 12A1 ♡ Chạm vào tớ nha!"
    >
      {/* Dynamic Heart & Star Sparkles on Tap */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {heartSparks.map((spark) => (
          <div
            key={spark.id}
            className="absolute font-bold text-[#FF70A6] animate-ping"
            style={{
              left: `calc(50% + ${spark.x}px)`,
              top: `calc(40% + ${spark.y}px)`,
              fontSize: '22px',
              textShadow: '0 0 10px #FFD166, 0 0 20px #FFF7EC',
            }}
          >
            {spark.char}
          </div>
        ))}
      </div>

      <svg
        viewBox="0 0 220 260"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        style={{ transformOrigin: 'center bottom' }}
      >
        <defs>
          {/* Bouquet wrapper paper gradients */}
          <linearGradient id="bouquetWrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F5" />
            <stop offset="35%" stopColor="#FDE3EC" />
            <stop offset="80%" stopColor="#F6B8CF" />
            <stop offset="100%" stopColor="#C9B6F2" />
          </linearGradient>

          <linearGradient id="bouquetFoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFEBF2" />
            <stop offset="100%" stopColor="#F5B2CB" />
          </linearGradient>

          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF70A6" />
            <stop offset="50%" stopColor="#FF9EBE" />
            <stop offset="100%" stopColor="#FF70A6" />
          </linearGradient>

          <linearGradient id="flowerRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2F6" />
            <stop offset="60%" stopColor="#FF70A6" />
            <stop offset="100%" stopColor="#E03869" />
          </linearGradient>

          {/* Soft Glow */}
          <filter id="neonAura" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Pulsing Aura Behind Mascot */}
        <ellipse
          cx="110"
          cy="140"
          rx="75"
          ry="85"
          fill="rgba(246, 184, 207, 0.35)"
          filter="url(#neonAura)"
          className="animate-pulse"
        />

        {/* ================= 1. BOUQUET CROWN FLOWERS (TOP) ================= */}
        {/* Has independent lag motion relative to body via CSS keyframes */}
        <g
          className="hoa-crown-lag"
          style={{
            transformOrigin: '110px 85px',
          }}
        >
          {/* Decorative Eucalyptus / Mint Leaves (independent gentle flutter) */}
          <g className="hoa-leaf-flutter" style={{ transformOrigin: '70px 85px' }}>
            <path d="M 70 85 Q 40 60 45 42 Q 62 48 74 76" fill="#88CCA0" stroke="#4F996B" strokeWidth="1.8" />
          </g>
          <g className="hoa-leaf-flutter" style={{ transformOrigin: '150px 85px', animationDelay: '-1.4s' }}>
            <path d="M 150 85 Q 180 60 175 42 Q 158 48 146 76" fill="#88CCA0" stroke="#4F996B" strokeWidth="1.8" />
          </g>
          <path d="M 110 50 Q 110 25 125 18 Q 132 35 116 52" fill="#7FB991" stroke="#4F996B" strokeWidth="1.5" />

          {/* Left Flower: White Daisy */}
          <g transform="translate(68, 72) scale(0.75)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-16"
                rx="6"
                ry="12"
                transform={`rotate(${angle})`}
                fill="#FFFDFC"
                stroke="#F2E6DF"
                strokeWidth="1.2"
              />
            ))}
            <circle cx="0" cy="0" r="10" fill="#FFE5A3" stroke="#F6C358" strokeWidth="1.8" />
          </g>

          {/* Right Flower: Soft Lavender Cosmos */}
          <g transform="translate(152, 72) scale(0.72)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <path
                key={idx}
                d="M -5 0 C -7 -10, -6 -18, -3 -20 Q 0 -18 3 -20 C 6 -18, 7 -10, 5 0 Z"
                transform={`rotate(${angle})`}
                fill="#D4C2F7"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            ))}
            <circle cx="0" cy="0" r="9" fill="#FFE5A3" stroke="#F6C358" strokeWidth="1.5" />
          </g>

          {/* Cute Yellow Buttercup Accent on Top Left */}
          <g transform="translate(90, 48) scale(0.55)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse key={idx} cx="0" cy="-14" rx="7" ry="11" transform={`rotate(${angle})`} fill="#FFE5A3" stroke="#F4B036" strokeWidth="1.2" />
            ))}
            <circle cx="0" cy="0" r="7" fill="#F4B036" />
          </g>

          {/* Baby's Breath White Florets Fluffing Out */}
          {[
            { cx: 52, cy: 60 },
            { cx: 168, cy: 58 },
            { cx: 80, cy: 38 },
            { cx: 140, cy: 40 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r="4.5"
              fill="#FFFFFF"
              stroke="#F6B8CF"
              strokeWidth="0.8"
              filter="drop-shadow(0 0 4px #FFFFFF)"
            />
          ))}

          {/* Main Hero Blossom: Beautiful Big Pink Rose Head in Center */}
          <g transform="translate(110, 62)">
            {/* Outer Rose Petals */}
            <path
              d="M -30 10 C -42 -15, -20 -36, 0 -38 C 20 -36, 42 -15, 30 10 Z"
              fill="url(#flowerRoseGrad)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Middle Petal Layers */}
            <path
              d="M -22 10 C -30 -10, -12 -28, 0 -30 C 12 -28, 30 -10, 22 10 Z"
              fill="#FFAEC9"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Heart Blossom Core */}
            <path
              d="M -14 6 C -20 -8, -6 -20, 0 -22 C 6 -20, 20 -8, 14 6 Z"
              fill="#FF6699"
              stroke="#FFF7EC"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="-8" r="4.5" fill="#FFE5A3" />
          </g>
        </g>

        {/* ================= 2. BOUQUET WRAPPER BODY (THE MASCOT FACE) ================= */}
        {/* Back Wrapping Flare */}
        <path
          d="M 52 92 C 52 92, 40 135, 65 210 C 100 232, 120 232, 155 210 C 180 135, 168 92, 168 92 Z"
          fill="url(#bouquetWrapGrad)"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        {/* Origami Fold Layer (Left flap) */}
        <path
          d="M 52 95 C 68 135, 80 175, 105 215 C 80 195, 60 155, 52 95 Z"
          fill="url(#bouquetFoldGrad)"
          opacity="0.85"
        />

        {/* Origami Fold Layer (Right flap) */}
        <path
          d="M 168 95 C 152 135, 140 175, 115 215 C 140 195, 160 155, 168 95 Z"
          fill="url(#bouquetFoldGrad)"
          opacity="0.85"
        />

        {/* Front Warm Face Panel of the Bouquet */}
        <ellipse
          cx="110"
          cy="142"
          rx="44"
          ry="48"
          fill="#FFF9F5"
          stroke="#FFA5C3"
          strokeWidth="2.5"
        />

        {/* Rosy Blush Cheeks with Soft Glow */}
        <ellipse
          cx="78"
          cy="148"
          rx={mood === 'shy' ? 10 : 8}
          ry={mood === 'shy' ? 7 : 5.5}
          fill="#FF70A6"
          opacity={mood === 'shy' ? 0.95 : 0.8}
          filter="url(#neonAura)"
        />
        <ellipse
          cx="142"
          cy="148"
          rx={mood === 'shy' ? 10 : 8}
          ry={mood === 'shy' ? 7 : 5.5}
          fill="#FF70A6"
          opacity={mood === 'shy' ? 0.95 : 0.8}
          filter="url(#neonAura)"
        />
        <circle cx="76" cy="146" r="2" fill="#FFFFFF" opacity="0.9" />
        <circle cx="144" cy="146" r="2" fill="#FFFFFF" opacity="0.9" />

        {/* Eyes: Signature Rounded-Square Anime Eyes */}
        {renderEyes()}

        {/* Mouth: Sweet Cute Smile */}
        {renderMouth()}

        {/* Tiny Golden Heart Badge on Front */}
        <path
          d="M 110 172 C 107 168, 102 169, 103 173 C 104 177, 110 181, 110 181 C 110 181, 116 177, 117 173 C 118 169, 113 168, 110 172 Z"
          fill="#FFD166"
          stroke="#FFA500"
          strokeWidth="0.8"
        />

        {/* ================= 3. CUTE RIBBON BOW AT BASE ================= */}
        {/* Has independent flutter motion */}
        <g
          className="hoa-crown-lag"
          style={{
            transform: 'translate(110px, 215px)',
            transformOrigin: '110px 215px',
          }}
        >
          {/* Left Ribbon Loop */}
          <path
            d="M 0 0 C -22 -15, -35 -2, -18 14 C -6 18, 0 5, 0 0 Z"
            fill="url(#ribbonGrad)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Right Ribbon Loop */}
          <path
            d="M 0 0 C 22 -15, 35 -2, 18 14 C 6 18, 0 5, 0 0 Z"
            fill="url(#ribbonGrad)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Ribbon Tails hanging down */}
          <path d="M -6 6 Q -18 25 -14 36 Q -6 28 -2 8" fill="#FF70A6" stroke="#FFFFFF" strokeWidth="1.2" />
          <path d="M 6 6 Q 18 25 14 36 Q 6 28 2 8" fill="#FF70A6" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Center Bow Knot */}
          <circle cx="0" cy="2" r="7" fill="#FFE5A3" stroke="#FF70A6" strokeWidth="2" />
          <circle cx="-1" cy="0" r="2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

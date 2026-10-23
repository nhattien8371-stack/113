import React, { useState } from 'react';
import type { FlowerType } from '../types/story';

interface BloomingFlowerProps {
  type: FlowerType;
  x: number; // percentage
  y: number; // percentage
  size?: number; // scale multiplier 0.6 - 1.5
  rotation?: number;
  swayDelay?: number;
  layer?: 'fore' | 'mid' | 'back';
  isBlooming?: boolean;
  interactive?: boolean;
  onBloom?: () => void;
  className?: string;
}

export const BloomingFlower: React.FC<BloomingFlowerProps> = ({
  type,
  x,
  y,
  size = 1,
  rotation = 0,
  swayDelay = 0,
  layer = 'mid',
  isBlooming = true,
  interactive = true,
  onBloom,
  className = '',
}) => {
  const [touched, setTouched] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleTouch = () => {
    if (!interactive) return;
    setTouched(true);
    if (onBloom) onBloom();

    // Trigger mini sparkles
    const newSparkles = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 40,
      y: -20 - Math.random() * 30,
    }));
    setSparkles(newSparkles);

    setTimeout(() => setTouched(false), 800);
    setTimeout(() => setSparkles([]), 1200);
  };

  // Render SVG based on flower species
  const renderFlowerGraphics = () => {
    switch (type) {
      /* ================= 1. WHITE DAISY WITH GOLDEN PISTIL ================= */
      case 'daisy':
        return (
          <g className="transition-transform duration-300" transform={`scale(${touched ? 1.18 : 1})`}>
            {/* Natural curved Stem */}
            <path
              d="M 50 140 Q 52 90 50 45"
              stroke="#68A57A"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Leaves */}
            <path
              d="M 50 105 Q 30 95 24 105 Q 35 118 50 110"
              fill="#7FB991"
              stroke="#589069"
              strokeWidth="1.2"
            />
            <path
              d="M 50 85 Q 70 75 76 85 Q 65 98 50 90"
              fill="#7FB991"
              stroke="#589069"
              strokeWidth="1.2"
            />

            {/* Bloom Petals (12 petals radiating outwards) */}
            <g transform="translate(50, 45)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
                <path
                  key={idx}
                  d="M -5 0 C -7 -18, -3 -26, 0 -30 C 3 -26, 7 -18, 5 0 Z"
                  transform={`rotate(${angle}) scale(${isBlooming ? 1 : 0.4})`}
                  fill="#FFFDFC"
                  stroke="#F2E6DF"
                  strokeWidth="0.8"
                  style={{
                    transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.03}s`,
                    filter: 'drop-shadow(0 2px 4px rgba(104, 80, 114, 0.15))',
                  }}
                />
              ))}

              {/* Golden Pistil with textured dots */}
              <circle cx="0" cy="0" r="11" fill="#FFE5A3" stroke="#F6C358" strokeWidth="1.5" />
              <circle cx="-3" cy="-3" r="2" fill="#F4B036" />
              <circle cx="3" cy="-2" r="2.2" fill="#F4B036" />
              <circle cx="-2" cy="3" r="2" fill="#F4B036" />
              <circle cx="3" cy="3" r="1.8" fill="#F4B036" />
              <circle cx="0" cy="0" r="2.5" fill="#FFF2CE" />
            </g>
          </g>
        );

      /* ================= 2. PASTEL PINK TULIP ================= */
      case 'tulip':
        return (
          <g className="transition-transform duration-300" transform={`scale(${touched ? 1.15 : 1})`}>
            {/* Tulip Stem */}
            <path
              d="M 50 140 Q 46 85 50 40"
              stroke="#5FA874"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Elegant long tulip leaf */}
            <path
              d="M 50 120 Q 25 90 20 50 Q 32 75 48 95"
              fill="#7BBF8F"
              stroke="#4E8C61"
              strokeWidth="1.5"
            />

            {/* Tulip Blossom Head */}
            <g
              transform={`translate(50, 40) scale(${isBlooming ? 1 : 0.6})`}
              style={{ transition: 'transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              {/* Back Petals */}
              <path
                d="M -14 0 C -24 -25, -12 -38, 0 -40 C 12 -38, 24 -25, 14 0 Z"
                fill="#F39CBB"
                opacity="0.9"
              />
              {/* Left Petal */}
              <path
                d="M -16 0 C -28 -15, -20 -35, -4 -38 C -1 -25, -2 -10, -8 0 Z"
                fill="#F7B2C9"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              {/* Right Petal */}
              <path
                d="M 16 0 C 28 -15, 20 -35, 4 -38 C 1 -25, 2 -10, 8 0 Z"
                fill="#F7B2C9"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              {/* Center Main Petal with gentle highlight */}
              <path
                d="M -12 0 C -16 -20, -10 -36, 0 -38 C 10 -36, 16 -20, 12 0 Z"
                fill="#FBD5E2"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              {/* Subtle inner blush */}
              <ellipse cx="0" cy="-14" rx="5" ry="12" fill="#FFA5C3" opacity="0.45" />
            </g>
          </g>
        );

      /* ================= 3. SOFT LAVENDER COSMOS ================= */
      case 'cosmos':
        return (
          <g className="transition-transform duration-300" transform={`scale(${touched ? 1.16 : 1})`}>
            {/* Slender Cosmos Stem */}
            <path
              d="M 50 140 Q 55 95 50 48"
              stroke="#6BB082"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Feathery leaves */}
            <path d="M 50 100 Q 35 90 28 85 M 50 90 Q 65 80 72 75" stroke="#7CBF92" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Cosmos Blossom (8 notched petals) */}
            <g transform="translate(50, 48)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <path
                  key={idx}
                  d="M -6 0 C -9 -14, -7 -25, -4 -28 Q 0 -26 4 -28 C 7 -25, 9 -14, 6 0 Z"
                  transform={`rotate(${angle}) scale(${isBlooming ? 1 : 0.45})`}
                  fill="#D4C2F7"
                  stroke="#E8DCFC"
                  strokeWidth="0.8"
                  style={{
                    transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.04}s`,
                    filter: 'drop-shadow(0 2px 4px rgba(104, 80, 114, 0.2))',
                  }}
                />
              ))}
              {/* Soft purple gradient center & yellow core */}
              <circle cx="0" cy="0" r="9" fill="#B497E8" />
              <circle cx="0" cy="0" r="6" fill="#FFE5A3" stroke="#F6C358" strokeWidth="1.2" />
            </g>
          </g>
        );

      /* ================= 4. WHITE BABY'S BREATH ================= */
      case 'baby':
        return (
          <g className="transition-transform duration-300" transform={`scale(${touched ? 1.15 : 1})`}>
            {/* Branching delicate stems */}
            <path d="M 50 140 Q 48 100 50 80" stroke="#77B98B" strokeWidth="2.5" fill="none" />
            <path d="M 50 95 Q 32 75 25 55" stroke="#77B98B" strokeWidth="2" fill="none" />
            <path d="M 50 90 Q 68 70 75 52" stroke="#77B98B" strokeWidth="2" fill="none" />
            <path d="M 50 80 Q 50 55 50 35" stroke="#77B98B" strokeWidth="2" fill="none" />
            <path d="M 32 75 Q 38 60 40 45" stroke="#77B98B" strokeWidth="1.5" fill="none" />
            <path d="M 68 70 Q 62 58 60 42" stroke="#77B98B" strokeWidth="1.5" fill="none" />

            {/* Clusters of tiny fluffy white florets */}
            {[
              { cx: 25, cy: 55, r: 6 },
              { cx: 75, cy: 52, r: 6.5 },
              { cx: 50, cy: 35, r: 7 },
              { cx: 40, cy: 45, r: 5.5 },
              { cx: 60, cy: 42, r: 5.5 },
              { cx: 20, cy: 65, r: 4.5 },
              { cx: 80, cy: 62, r: 5 },
            ].map((floret, i) => (
              <g
                key={i}
                transform={`translate(${floret.cx}, ${floret.cy}) scale(${isBlooming ? 1 : 0.3})`}
                style={{ transition: `transform 0.6s ease-out ${i * 0.05}s` }}
              >
                <circle cx="0" cy="0" r={floret.r} fill="#FFFFFF" stroke="#E3EDF7" strokeWidth="0.8" opacity="0.95" />
                <circle cx="0" cy="0" r={floret.r * 0.4} fill="#FFE5A3" />
              </g>
            ))}
          </g>
        );

      /* ================= 5. LITTLE GOLDEN BUTTERCUP ================= */
      case 'buttercup':
        return (
          <g className="transition-transform duration-300" transform={`scale(${touched ? 1.2 : 1})`}>
            {/* Delicate Stem */}
            <path
              d="M 50 140 Q 53 90 50 55"
              stroke="#68A57A"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Leaf */}
            <path
              d="M 50 100 Q 66 92 70 100 Q 60 110 50 105"
              fill="#7FB991"
              stroke="#589069"
              strokeWidth="1"
            />

            {/* 5 Cup-shaped Golden Petals */}
            <g transform="translate(50, 55)">
              {[0, 72, 144, 216, 288].map((angle, idx) => (
                <path
                  key={idx}
                  d="M -7 0 C -12 -12, -8 -20, 0 -22 C 8 -20, 12 -12, 7 0 Z"
                  transform={`rotate(${angle}) scale(${isBlooming ? 1 : 0.4})`}
                  fill="#FFE382"
                  stroke="#F5C038"
                  strokeWidth="0.9"
                  style={{
                    transition: `transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s`,
                    filter: 'drop-shadow(0 2px 5px rgba(255, 180, 0, 0.25))',
                  }}
                />
              ))}
              <circle cx="0" cy="0" r="6" fill="#F4B036" stroke="#D98A16" strokeWidth="1" />
              <circle cx="0" cy="0" r="2.5" fill="#FFF2CE" />
            </g>
          </g>
        );

      /* ================= 6. SWEET PASTEL ROSE ================= */
      case 'rose':
      default:
        return (
          <g className="transition-transform duration-300" transform={`scale(${touched ? 1.18 : 1})`}>
            {/* Rose Stem with small thorn */}
            <path d="M 50 140 Q 48 95 50 48" stroke="#569E6D" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 50 115 Q 35 105 30 112 Q 40 125 50 120" fill="#78BA8E" stroke="#48855B" strokeWidth="1.2" />
            <path d="M 50 92 Q 65 82 72 90 Q 62 102 50 97" fill="#78BA8E" stroke="#48855B" strokeWidth="1.2" />

            {/* Rose Blossom */}
            <g
              transform={`translate(50, 48) scale(${isBlooming ? 1 : 0.55})`}
              style={{ transition: 'transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <ellipse cx="0" cy="0" rx="20" ry="16" fill="#FFA5C3" stroke="#FFFFFF" strokeWidth="1.2" />
              <ellipse cx="-4" cy="-2" rx="14" ry="11" fill="#FF70A6" stroke="#FFFFFF" strokeWidth="1" />
              <ellipse cx="2" cy="0" rx="9" ry="7" fill="#E63968" />
              <circle cx="0" cy="-1" r="3.5" fill="#FFE5A3" />
            </g>
          </g>
        );
    }
  };

  // Determine distinct phase index (0 to 4) and layer motion factor
  const phaseIndex = Math.abs(Math.floor(swayDelay * 10)) % 5;
  const layerFactor = layer === 'fore' ? 1.0 : layer === 'mid' ? 0.72 : 0.45;

  return (
    <div
      onClick={handleTouch}
      className={`absolute cursor-pointer select-none ${className}`}
      style={{
        left: `${x}%`,
        bottom: `${Math.max(0, 100 - y)}%`,
        transform: `translateX(-50%) rotate(calc(${rotation}deg + var(--sway-phase-${phaseIndex}, 0) * ${layerFactor} * 1deg)) scale(calc(${size} * (1 + var(--beat-bounce, 0) * ${layerFactor})))`,
        transformOrigin: 'bottom center',
        filter: touched
          ? 'drop-shadow(0 0 16px rgba(255, 230, 170, 0.8))'
          : 'drop-shadow(0 6px 12px rgba(104, 80, 114, 0.25))',
        willChange: 'transform',
      }}
      title="Bông hoa xinh đẹp ♡ Chạm vào tớ nhé!"
    >
      {/* Floating Sparkles on Touch */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute rounded-full bg-[#FFE5A3] pointer-events-none animate-ping"
          style={{
            left: `calc(50% + ${sp.x}px)`,
            top: `calc(30% + ${sp.y}px)`,
            width: '6px',
            height: '6px',
            boxShadow: '0 0 10px #FFD166, 0 0 20px #FFF7EC',
          }}
        />
      ))}

      <svg
        width="110"
        height="150"
        viewBox="0 0 100 140"
        className="overflow-visible"
        style={{ transformOrigin: 'bottom center' }}
      >
        {renderFlowerGraphics()}
      </svg>
    </div>
  );
};

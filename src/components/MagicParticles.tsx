import React, { useMemo } from 'react';

interface MagicParticlesProps {
  intensity?: 'calm' | 'sparkle' | 'intense';
  showPetals?: boolean;
  showRays?: boolean;
}

export const MagicParticles: React.FC<MagicParticlesProps> = ({
  intensity = 'sparkle',
  showPetals = true,
  showRays = false,
}) => {
  // Generate random twinkling stars & fireflies
  const stars = useMemo(() => {
    const count = intensity === 'intense' ? 45 : intensity === 'sparkle' ? 32 : 22;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 88,
      size: Math.random() * 3.5 + 1.8,
      delay: Math.random() * 4,
      duration: Math.random() * 2.8 + 2.2,
      color: i % 4 === 0 ? '#FFE5A3' : i % 3 === 0 ? '#FF70A6' : i % 2 === 0 ? '#C9B6F2' : '#FFF7EC',
    }));
  }, [intensity]);

  // Generate floating falling pastel flower petals
  const petals = useMemo(() => {
    if (!showPetals) return [];
    const count = intensity === 'intense' ? 26 : 18;
    const colors = ['#F6B8CF', '#FF8CA3', '#FAD4E4', '#FFE5A3', '#D4C2F7', '#FFF7EC'];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 11,
      delay: Math.random() * 9,
      duration: Math.random() * 5 + 6.5,
      color: colors[i % colors.length],
      rotate: Math.random() * 360,
    }));
  }, [showPetals, intensity]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {/* Soft Ethereal Light Rays */}
      {showRays && (
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="rayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE5A3" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#F6B8CF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="120,0 260,0 620,1000 480,1000" fill="url(#rayGrad)" />
            <polygon points="360,0 500,0 860,1000 720,1000" fill="url(#rayGrad)" />
            <polygon points="620,0 740,0 1000,800 880,800" fill="url(#rayGrad)" />
          </svg>
        </div>
      )}

      {/* Floating Fireflies / Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 10px ${star.color}, 0 0 18px ${star.color}`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Floating Falling Flower Petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={{
            left: `${petal.x}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            style={{
              transform: `rotate(${petal.rotate}deg)`,
              filter: 'drop-shadow(0 2px 5px rgba(104, 80, 114, 0.25))',
            }}
          >
            <path
              d="M 10 0 C 18 6, 20 18, 10 26 C 0 18, 2 6, 10 0 Z"
              fill={petal.color}
              opacity="0.88"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

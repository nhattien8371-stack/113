import React, { useMemo } from 'react';
import { BloomingFlower } from './BloomingFlower';
import type { FlowerData } from '../types/story';

interface FlowerGardenProps {
  sceneId: number;
  bloomAll?: boolean;
}

export const FlowerGarden: React.FC<FlowerGardenProps> = ({
  sceneId,
  bloomAll = false,
}) => {
  // Rich, dense flower distribution across 3 depth layers
  const flowers: FlowerData[] = useMemo(() => [
    /* ================= LEFT FLORAL MEADOW (x: 1% - 34%) ================= */
    { id: 'fl-1', type: 'tulip', x: 5, y: 88, size: 1.25, rotation: -9, swayDelay: 0.2, layer: 'fore' },
    { id: 'fl-2', type: 'daisy', x: 10, y: 90, size: 1.15, rotation: 5, swayDelay: 0.8, layer: 'fore' },
    { id: 'fl-3', type: 'rose', x: 16, y: 86, size: 1.18, rotation: -6, swayDelay: 1.4, layer: 'fore' },
    { id: 'fl-4', type: 'baby', x: 3, y: 82, size: 1.05, rotation: -14, swayDelay: 0.5, layer: 'mid' },
    { id: 'fl-5', type: 'buttercup', x: 13, y: 92, size: 0.95, rotation: 10, swayDelay: 1.1, layer: 'fore' },
    { id: 'fl-6', type: 'cosmos', x: 21, y: 87, size: 1.15, rotation: 7, swayDelay: 1.7, layer: 'mid' },
    { id: 'fl-7', type: 'daisy', x: 27, y: 89, size: 1.0, rotation: -5, swayDelay: 0.9, layer: 'mid' },
    { id: 'fl-8', type: 'tulip', x: 8, y: 80, size: 0.85, rotation: 4, swayDelay: 2.1, layer: 'back' },
    { id: 'fl-9', type: 'buttercup', x: 1, y: 90, size: 0.9, rotation: -15, swayDelay: 0.3, layer: 'fore' },
    { id: 'fl-10', type: 'rose', x: 24, y: 92, size: 1.05, rotation: -8, swayDelay: 1.5, layer: 'fore' },
    { id: 'fl-11', type: 'baby', x: 18, y: 81, size: 0.9, rotation: 12, swayDelay: 2.4, layer: 'back' },
    { id: 'fl-12', type: 'cosmos', x: 31, y: 86, size: 1.08, rotation: -3, swayDelay: 0.6, layer: 'mid' },
    { id: 'fl-13', type: 'buttercup', x: 35, y: 91, size: 0.85, rotation: 9, swayDelay: 1.8, layer: 'fore' },

    /* ================= CENTER FLORAL ACCENTS (x: 36% - 65%) ================= */
    { id: 'fc-1', type: 'daisy', x: 39, y: 93, size: 0.9, rotation: -6, swayDelay: 1.3, layer: 'fore' },
    { id: 'fc-2', type: 'buttercup', x: 44, y: 95, size: 0.8, rotation: 8, swayDelay: 0.7, layer: 'mid' },
    { id: 'fc-3', type: 'rose', x: 48, y: 94, size: 0.85, rotation: -4, swayDelay: 1.9, layer: 'fore' },
    { id: 'fc-4', type: 'tulip', x: 53, y: 94, size: 0.88, rotation: 5, swayDelay: 1.2, layer: 'mid' },
    { id: 'fc-5', type: 'cosmos', x: 58, y: 93, size: 0.9, rotation: -7, swayDelay: 0.4, layer: 'fore' },
    { id: 'fc-6', type: 'baby', x: 62, y: 92, size: 0.75, rotation: 10, swayDelay: 2.2, layer: 'back' },
    { id: 'fc-7', type: 'buttercup', x: 42, y: 96, size: 0.7, rotation: -3, swayDelay: 1.0, layer: 'back' },
    { id: 'fc-8', type: 'daisy', x: 56, y: 96, size: 0.75, rotation: 4, swayDelay: 1.6, layer: 'back' },

    /* ================= RIGHT FLORAL MEADOW (x: 66% - 99%) ================= */
    { id: 'fr-1', type: 'tulip', x: 95, y: 88, size: 1.25, rotation: 11, swayDelay: 0.4, layer: 'fore' },
    { id: 'fr-2', type: 'daisy', x: 89, y: 90, size: 1.15, rotation: -5, swayDelay: 1.2, layer: 'fore' },
    { id: 'fr-3', type: 'rose', x: 83, y: 86, size: 1.2, rotation: 6, swayDelay: 0.7, layer: 'fore' },
    { id: 'fr-4', type: 'baby', x: 97, y: 83, size: 1.05, rotation: 14, swayDelay: 1.5, layer: 'mid' },
    { id: 'fr-5', type: 'buttercup', x: 86, y: 92, size: 0.95, rotation: -9, swayDelay: 0.3, layer: 'fore' },
    { id: 'fr-6', type: 'cosmos', x: 77, y: 87, size: 1.15, rotation: -8, swayDelay: 1.9, layer: 'mid' },
    { id: 'fr-7', type: 'daisy', x: 72, y: 89, size: 0.98, rotation: 7, swayDelay: 0.6, layer: 'mid' },
    { id: 'fr-8', type: 'tulip', x: 92, y: 81, size: 0.85, rotation: -4, swayDelay: 2.3, layer: 'back' },
    { id: 'fr-9', type: 'buttercup', x: 99, y: 91, size: 0.88, rotation: 16, swayDelay: 1.0, layer: 'fore' },
    { id: 'fr-10', type: 'rose', x: 75, y: 92, size: 1.05, rotation: 8, swayDelay: 1.6, layer: 'fore' },
    { id: 'fr-11', type: 'baby', x: 81, y: 81, size: 0.9, rotation: -12, swayDelay: 2.5, layer: 'back' },
    { id: 'fr-12', type: 'cosmos', x: 68, y: 87, size: 1.05, rotation: 4, swayDelay: 0.8, layer: 'mid' },
    { id: 'fr-13', type: 'buttercup', x: 65, y: 91, size: 0.85, rotation: -8, swayDelay: 1.7, layer: 'fore' },
  ], []);

  // Determine bloom state across the 13 parts
  const isFlowerBlooming = (flower: FlowerData) => {
    if (bloomAll || sceneId >= 10) return true;
    if (sceneId <= 3) return flower.layer === 'fore' || flower.x < 30 || flower.x > 70;
    if (sceneId <= 6) return flower.layer !== 'back' || flower.x < 45 || flower.x > 55;
    if (sceneId <= 9) return flower.id !== 'fc-7' && flower.id !== 'fc-8';
    return true;
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Background Soft Rolling Hill Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-56 opacity-50">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 0 300 L 0 150 Q 300 100 600 160 Q 900 220 1200 130 L 1200 300 Z"
            fill="#27183D"
          />
          <path
            d="M 0 300 L 0 190 Q 350 130 700 210 Q 1050 270 1200 170 L 1200 300 Z"
            fill="#1E1030"
          />
        </svg>
      </div>

      {/* Lush stylized grass and small wild buds at bottom rim */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-75 pointer-events-none transition-transform duration-300"
        style={{
          transform: 'skewX(calc(var(--grass-sway, 0) * -0.5 * 1deg))',
          transformOrigin: 'bottom center',
        }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          {Array.from({ length: 64 }).map((_, i) => {
            const x = (i / 64) * 1200;
            const height = 45 + (Math.sin(i * 1.4) * 28 + 26);
            const curve = Math.cos(i) * 22;
            const color = i % 4 === 0 ? '#548C69' : i % 3 === 0 ? '#6DB387' : i % 2 === 0 ? '#437354' : '#7CBF94';
            return (
              <path
                key={i}
                d={`M ${x} 120 Q ${x + curve} ${120 - height * 0.6} ${x + curve * 1.4} ${120 - height}`}
                stroke={color}
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>
      </div>

      {/* Flower Elements in Layered Order */}
      {/* 1. Back Layer (Soft background rhythm) */}
      <div className="absolute inset-0 pointer-events-none">
        {flowers
          .filter((f) => f.layer === 'back')
          .map((flower) => (
            <BloomingFlower
              key={flower.id}
              type={flower.type}
              x={flower.x}
              y={flower.y}
              size={flower.size}
              rotation={flower.rotation}
              swayDelay={flower.swayDelay}
              layer="back"
              isBlooming={isFlowerBlooming(flower)}
            />
          ))}
      </div>

      {/* 2. Mid Layer (Moderate sway) */}
      <div className="absolute inset-0 pointer-events-none">
        {flowers
          .filter((f) => f.layer === 'mid')
          .map((flower) => (
            <BloomingFlower
              key={flower.id}
              type={flower.type}
              x={flower.x}
              y={flower.y}
              size={flower.size}
              rotation={flower.rotation}
              swayDelay={flower.swayDelay}
              layer="mid"
              isBlooming={isFlowerBlooming(flower)}
            />
          ))}
      </div>

      {/* 3. Foreground Layer (Expressive rhythmic sway & subtle beat bounce) */}
      <div className="absolute inset-0 pointer-events-none">
        {flowers
          .filter((f) => f.layer === 'fore')
          .map((flower) => (
            <BloomingFlower
              key={flower.id}
              type={flower.type}
              x={flower.x}
              y={flower.y}
              size={flower.size}
              rotation={flower.rotation}
              swayDelay={flower.swayDelay}
              layer="fore"
              isBlooming={isFlowerBlooming(flower)}
            />
          ))}
      </div>
    </div>
  );
};

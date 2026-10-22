import React from 'react';
import { HoaCharacter } from './HoaCharacter';
import type { ButterflyMood } from '../types/story';

interface ButterflyProps {
  mood?: ButterflyMood;
  scale?: number;
  className?: string;
  interactive?: boolean;
  isTransitioning?: boolean;
  onClick?: () => void;
}

// Re-export HoaCharacter as the mascot
export const ButterflyCharacter: React.FC<ButterflyProps> = (props) => {
  return <HoaCharacter {...props} />;
};

export { HoaCharacter };

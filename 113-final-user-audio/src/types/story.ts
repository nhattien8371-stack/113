export type ButterflyMood =
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

export type FlowerType = 'daisy' | 'tulip' | 'cosmos' | 'baby' | 'buttercup' | 'rose';

export interface FlowerData {
  id: string;
  type: FlowerType;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  size: number; // scale multiplier
  rotation: number; // deg
  swayDelay: number; // sec
  isBlooming?: boolean;
  layer: 'fore' | 'mid' | 'back';
}

export interface SceneConfig {
  id: number;
  title: string;
  subtitle?: string;
  dialogueLines: string[];
  butterflyMood: ButterflyMood;
  butterflyPosition: { x: number; y: number }; // percentage coords (0-100)
  butterflyScale?: number;
  bgAtmosphere: 'twilight' | 'dawn' | 'warm-gold' | 'deep-magic' | 'blooming-day' | 'sunset-pastel' | 'celebration';
  nextButtonText: string;
  allowBack?: boolean;
}

export interface StoryContentConfig {
  meta: {
    classroom: string;
    occasion: string;
    theme: string;
    musicTrack: string;
    musicTitle: string;
  };
  scenes: SceneConfig[];
}

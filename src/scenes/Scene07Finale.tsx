import React from 'react';
import { Finale } from '../components/Finale';
import type { SceneConfig } from '../types/story';

interface SceneProps {
  config: SceneConfig;
}

export const Scene07Finale: React.FC<SceneProps> = ({ config }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4" data-scene={config.id}>
      <div className="z-20 mt-14 sm:mt-18 w-full max-w-2xl">
        <Finale />
      </div>
    </div>
  );
};

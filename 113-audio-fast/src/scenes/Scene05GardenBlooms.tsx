import React from 'react';
import { StoryText } from '../components/StoryText';
import type { SceneConfig } from '../types/story';

interface SceneProps {
  config: SceneConfig;
}

export const Scene05GardenBlooms: React.FC<SceneProps> = ({ config }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center px-4">
      <div className="z-20 mt-64 sm:mt-84 w-full max-w-lg">
        <StoryText
          lines={config.dialogueLines}
          speakerName="Hoa ♡"
          highlightWords={['20/10', 'cánh đàn ông', 'niềm vui', 'hạnh phúc']}
        />
      </div>
    </div>
  );
};

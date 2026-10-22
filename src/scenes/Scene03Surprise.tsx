import React from 'react';
import { StoryText } from '../components/StoryText';
import { SurpriseGift } from '../components/SurpriseGift';
import type { SceneConfig } from '../types/story';

interface SceneProps {
  config: SceneConfig;
}

export const Scene03Surprise: React.FC<SceneProps> = ({ config }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center px-4">
      {/* Surprise Mini Cake */}
      <div className="z-20 mt-14 sm:mt-16">
        <SurpriseGift />
      </div>

      {/* Conversational Speech Bubble */}
      <div className="z-20 mt-2 w-full max-w-lg">
        <StoryText
          lines={config.dialogueLines}
          speakerName="Hoa ♡"
          highlightWords={['tráng miệng', 'bữa chính']}
        />
      </div>
    </div>
  );
};

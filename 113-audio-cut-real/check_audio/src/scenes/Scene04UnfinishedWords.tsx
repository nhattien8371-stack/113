import React from 'react';
import { Envelope } from '../components/Envelope';
import type { SceneConfig } from '../types/story';

interface SceneProps {
  config: SceneConfig;
}

export const Scene04UnfinishedWords: React.FC<SceneProps> = ({ config }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center px-4 overflow-y-auto">
      <div className="z-20 mt-44 sm:mt-14 w-full max-w-xl pb-16">
        <Envelope paragraphs={config.dialogueLines} isOpen={true} />
      </div>
    </div>
  );
};

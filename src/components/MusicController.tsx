import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioVisualizer } from '../context/AudioVisualizerContext';

export const MusicController: React.FC = () => {
  const { isPlaying, togglePlay, audioTitle } = useAudioVisualizer();

  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-2 select-none">
      <button
        onClick={togglePlay}
        className={`glass-panel px-3.5 py-2.5 rounded-full flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'border-[#FF70A6] shadow-[0_0_18px_rgba(255,112,166,0.6)] text-[#FFF7EC] bg-[#FF70A6]/15'
            : 'border-[#C9B6F2]/40 text-[#C9B6F2] hover:text-[#FFF7EC] hover:border-[#FF70A6]/50'
        }`}
        title={isPlaying ? `Tắt nhạc (${audioTitle})` : `Bật nhạc: ${audioTitle}`}
      >
        {isPlaying ? (
          <>
            <Volume2 size={18} className="text-[#FF70A6] animate-pulse" />
            <div className="flex items-center gap-1 h-3.5">
              <span className="w-0.5 h-full bg-[#FF70A6] animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2/3 bg-[#FFE5A3] animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-full bg-[#C9B6F2] animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
              <span className="w-0.5 h-1/2 bg-[#B9DFC8] animate-[pulse_0.5s_ease-in-out_infinite_0.1s]" />
            </div>
            <span className="text-xs font-medium text-[#FFE5A3] hidden sm:inline max-w-[160px] truncate">
              {audioTitle}
            </span>
          </>
        ) : (
          <>
            <VolumeX size={18} />
            <span className="text-xs font-medium hidden sm:inline">Bật nhạc</span>
          </>
        )}
      </button>
    </div>
  );
};

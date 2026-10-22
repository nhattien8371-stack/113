import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Heart } from 'lucide-react';

interface SceneNavigationProps {
  currentScene: number;
  totalScenes: number;
  nextText: string;
  allowBack?: boolean;
  isTransitioning: boolean;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onOpenMessageModal?: () => void;
}

export const SceneNavigation: React.FC<SceneNavigationProps> = ({
  currentScene,
  totalScenes,
  nextText,
  allowBack = true,
  isTransitioning,
  onNext,
  onPrev,
  onReset,
  onOpenMessageModal,
}) => {
  const isFinalScene = currentScene === totalScenes;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-30 px-4 flex flex-col items-center pointer-events-none select-none">
      {/* Subtle Scene Progress Dots */}
      <div className="flex items-center gap-1 sm:gap-1.5 mb-3 bg-[#150D24]/75 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-[#F6B8CF]/25 pointer-events-auto shadow-lg max-w-[95vw] overflow-x-auto">
        {Array.from({ length: totalScenes }).map((_, idx) => {
          const sceneNum = idx + 1;
          const isActive = sceneNum === currentScene;
          const isPassed = sceneNum < currentScene;

          return (
            <div
              key={sceneNum}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-5 sm:w-6 h-2 bg-[#FF70A6] shadow-[0_0_8px_#FF70A6]'
                  : isPassed
                  ? 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#C9B6F2]'
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/20'
              }`}
              title={`Phần ${sceneNum}`}
            />
          );
        })}
        <span className="text-[10px] sm:text-[11px] font-sans font-medium text-[#FFE5A3] ml-1 tracking-wider whitespace-nowrap">
          {currentScene}/{totalScenes}
        </span>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
        {/* Back Button (shown if allowBack and not at Scene 1) */}
        {allowBack && currentScene > 1 && !isFinalScene && (
          <button
            onClick={onPrev}
            disabled={isTransitioning}
            className="glass-button px-4 py-3 rounded-full text-sm font-medium text-[#FFF7EC] flex items-center gap-1.5 opacity-90 hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Quay lại cảnh trước"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Quay lại</span>
          </button>
        )}

        {/* Primary Next Button or Final Controls */}
        {!isFinalScene ? (
          <button
            onClick={onNext}
            disabled={isTransitioning}
            className="glass-button px-7 py-3.5 rounded-full text-base sm:text-lg font-semibold text-[#FFF7EC] flex items-center gap-2 shadow-[0_0_25px_rgba(246,184,207,0.5)] border-2 border-[#F6B8CF] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
          >
            <span>{nextText}</span>
            <ChevronRight size={20} className="text-[#FFE5A3] animate-pulse" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {/* Replay Button */}
            <button
              onClick={onReset}
              disabled={isTransitioning}
              className="glass-button px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold text-[#FFF7EC] flex items-center gap-2 border border-[#C9B6F2] hover:bg-[#C9B6F2]/30 active:scale-95"
            >
              <RotateCcw size={18} className="text-[#FFE5A3]" />
              <span>Xem lại từ đầu</span>
            </button>

            {/* Send Message Button */}
            {onOpenMessageModal && (
              <button
                onClick={onOpenMessageModal}
                className="glass-button px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#FF70A6] to-[#C9B6F2] flex items-center gap-2 shadow-[0_0_30px_rgba(255,112,166,0.6)] border border-white/50 active:scale-95"
              >
                <Heart size={18} fill="#FFE5A3" className="text-[#FFE5A3]" />
                <span>Gửi một lời nhắn</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

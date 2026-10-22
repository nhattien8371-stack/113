import React, { useState } from 'react';
import { storyContent } from '../data/storyContent';
import { ButterflyCharacter } from './ButterflyCharacter';
import { FlowerGarden } from './FlowerGarden';
import { MagicParticles } from './MagicParticles';
import { SceneNavigation } from './SceneNavigation';
import { MusicController } from './MusicController';
import { MessageModal } from './MessageModal';
import { StoryText } from './StoryText';
import { SurpriseGift } from './SurpriseGift';
import { Envelope } from './Envelope';
import { Finale } from './Finale';
import { useWindowSize } from '../hooks/useWindowSize';
import { useAudioVisualizer } from '../context/AudioVisualizerContext';

export const SceneManager: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [, setUserHasInteracted] = useState(false);

  const { isPlaying, startMusic } = useAudioVisualizer();
  const { isMobile } = useWindowSize();
  const totalScenes = storyContent.scenes.length;
  const currentSceneConfig = storyContent.scenes.find((s) => s.id === currentSceneId) || storyContent.scenes[0];

  // Responsive coordinates to position Hoa prominently without any clipping
  const getHoaPos = () => {
    if (isMobile) {
      switch (currentSceneId) {
        case 6: return { x: 50, y: 'max(140px, 17vh)' };
        case 9: return { x: 50, y: 'max(115px, 13vh)' };
        case 13: return { x: 50, y: 'max(130px, 15vh)' };
        default: return { x: 50, y: 'max(145px, 18vh)' };
      }
    }
    // Desktop coordinates
    switch (currentSceneId) {
      case 6: return { x: 74, y: 'max(170px, 22vh)' };
      case 9: return { x: 24, y: 'max(190px, 26vh)' };
      case 13: return { x: 50, y: 'max(150px, 18vh)' };
      default: return { x: 50, y: 'max(160px, 20vh)' };
    }
  };

  const getHoaScale = () => {
    const base = currentSceneConfig.butterflyScale || 1.15;
    return isMobile ? base * 0.82 : base * 1.1;
  };

  // Emotional keyword highlights mapped to each of the 13 parts
  const getHighlightWords = (sceneId: number) => {
    switch (sceneId) {
      case 1: return ['Này cậu ơi!'];
      case 2: return ['Hoa', 'nàng tiên nhỏ', 'khu vườn hoa'];
      case 3: return ['nhiệm vụ đặc biệt'];
      case 4: return ['20/10', 'tâm tư, tình cảm', 'các bạn nam'];
      case 5: return ['biết gì hông'];
      case 6: return ['tráng miệng', 'bữa chính'];
      case 7: return ['chính thức', 'những bông hoa'];
      case 8: return ['hoàn hảo', 'trọn vẹn nhất'];
      case 9: return ['12A1', 'hoan hỉ', 'dùng bữa thật ngon'];
      case 10: return ['20/10', 'cánh đàn ông', 'niềm vui', 'hạnh phúc'];
      case 11: return ['yêu thương', 'xứng đáng', 'mỉm cười'];
      case 12: return ['xinh đẹp', 'tự tin', 'rạng rỡ', 'may mắn'];
      case 13: return ['Happy Vietnamese Women\'s Day', '12A1'];
      default: return ['20/10', 'Hoa', '12A1'];
    }
  };

  // Manual transition to Next Scene (strictly debounced)
  const handleNext = () => {
    if (isTransitioning) return;
    setUserHasInteracted(true);

    // Auto-start music smoothly upon user's first interaction if not yet started
    if (!isPlaying) {
      startMusic();
    }

    if (currentSceneId < totalScenes) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSceneId((prev) => prev + 1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 550);
      }, 400);
    }
  };

  // Manual transition to Previous Scene
  const handlePrev = () => {
    if (isTransitioning || currentSceneId <= 1) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentSceneId((prev) => prev - 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
    }, 400);
  };

  // Replay from start
  const handleReset = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSceneId(1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
    }, 450);
  };

  // Atmosphere background gradient based on active scene
  const getAtmosphereGradient = () => {
    switch (currentSceneConfig.bgAtmosphere) {
      case 'dawn':
        return 'linear-gradient(180deg, #180D26 0%, #281136 45%, #42183B 80%, #200E26 100%)';
      case 'twilight':
        return 'linear-gradient(180deg, #10071C 0%, #200E30 45%, #3B123E 80%, #160822 100%)';
      case 'warm-gold':
        return 'linear-gradient(180deg, #1C0C24 0%, #36172D 45%, #522434 80%, #220E22 100%)';
      case 'deep-magic':
        return 'linear-gradient(180deg, #0C0517 0%, #1A0B28 50%, #2D0E39 80%, #13071F 100%)';
      case 'blooming-day':
        return 'linear-gradient(180deg, #160B24 0%, #2D123F 45%, #46184C 80%, #1E0A28 100%)';
      case 'sunset-pastel':
        return 'linear-gradient(180deg, #190924 0%, #381232 45%, #4F183C 80%, #1B0720 100%)';
      case 'celebration':
        return 'linear-gradient(180deg, #12071F 0%, #290D37 45%, #451145 80%, #180624 100%)';
      default:
        return 'linear-gradient(180deg, #120B1E 0%, #2A1435 50%, #431742 100%)';
    }
  };

  // Render current scene content across the 13 parts
  const renderCurrentScene = () => {
    // Part 6: Birthday cake surprise
    if (currentSceneId === 6) {
      return (
        <div className="relative w-full flex flex-col items-center px-4">
          <div className="z-20 mt-60 sm:mt-20">
            <SurpriseGift />
          </div>
          <div className="z-20 mt-1 w-full max-w-lg">
            <StoryText
              lines={currentSceneConfig.dialogueLines}
              speakerName="Hoa ♡"
              highlightWords={['tráng miệng', 'bữa chính']}
            />
          </div>
        </div>
      );
    }

    // Part 9: Parchment letter envelope
    if (currentSceneId === 9) {
      return (
        <div className="relative w-full flex flex-col items-center px-4 overflow-y-auto">
          <div className="z-20 mt-52 sm:mt-14 w-full max-w-xl pb-16">
            <Envelope
              paragraphs={[
                'Có lẽ thời điểm này hơi trễ để gửi những lời chúc "chính thức" đến những bông hoa ở đây, nhưng mà để mọi thứ có thể hoàn hảo và trọn vẹn nhất nên là...',
                'Sự chậm trễ của các chàng đây, hy vọng các bông hoa của 12A1 sẽ hoan hỉ và dùng bữa thật ngon nhé! 💗',
              ]}
              isOpen={true}
            />
          </div>
        </div>
      );
    }

    // Part 13: Grand Finale Celebration
    if (currentSceneId === 13) {
      return (
        <div className="relative w-full flex flex-col items-center px-4">
          <div className="z-20 mt-56 sm:mt-68 w-full max-w-2xl">
            <Finale />
          </div>
        </div>
      );
    }

    // Parts 1, 2, 3, 4, 5, 7, 8, 10, 11, 12: Direct conversational speech bubble
    return (
      <div className="relative w-full flex flex-col items-center justify-center px-4">
        <div className="z-20 mt-64 sm:mt-76 w-full max-w-lg">
          <StoryText
            lines={currentSceneConfig.dialogueLines}
            speakerName="Hoa ♡"
            highlightWords={getHighlightWords(currentSceneId)}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none transition-colors duration-1000"
      style={{
        background: getAtmosphereGradient(),
      }}
    >
      {/* 1. Ambient Magic Particles & Falling Petals */}
      <MagicParticles
        intensity={currentSceneId >= 10 ? 'intense' : currentSceneId === 6 ? 'sparkle' : 'calm'}
        showPetals={true}
        showRays={currentSceneId === 6 || currentSceneId >= 10}
      />

      {/* 2. Top-Right Music Controller */}
      <MusicController />

      {/* 3. The Blooming Secret Garden */}
      <FlowerGarden
        sceneId={currentSceneId}
        bloomAll={currentSceneId >= 10}
      />

      {/* 4. Flying Character Hoa (Mascot) */}
      {/* SEPARATION OF WRAPPERS (PHẦN 6): Outer wrapper strictly handles positioning & centering */}
      <div
        className="fixed pointer-events-auto z-25 transition-all duration-700 ease-out"
        style={{
          left: `${getHoaPos().x}%`,
          top: `${getHoaPos().y}`,
          transform: 'translate(-50%, -50%)',
          transitionProperty: 'left, top',
        }}
      >
        {/* Inner animation wrapper handles music bobbing, music sway tilt, and scale without overriding centering */}
        <div
          style={{
            transform: `translateY(var(--hoa-bob, 0px)) rotate(calc(var(--hoa-tilt, 0) * 1deg)) scale(${
              isTransitioning ? getHoaScale() * 1.05 : getHoaScale()
            })`,
            transformOrigin: 'center 75%',
            willChange: 'transform',
            transition: 'transform 0.4s ease-out',
          }}
        >
          <ButterflyCharacter
            mood={isTransitioning ? 'intro' : currentSceneConfig.butterflyMood}
            scale={1}
            isTransitioning={isTransitioning}
          />
        </div>
      </div>

      {/* 5. Main Active Scene Content */}
      <div
        className={`relative w-full h-full z-20 flex flex-col justify-between transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {renderCurrentScene()}
      </div>

      {/* 6. Manual Scene Navigation Controls */}
      <SceneNavigation
        currentScene={currentSceneId}
        totalScenes={totalScenes}
        nextText={currentSceneConfig.nextButtonText}
        allowBack={currentSceneConfig.allowBack}
        isTransitioning={isTransitioning}
        onNext={handleNext}
        onPrev={handlePrev}
        onReset={handleReset}
        onOpenMessageModal={() => setIsMessageModalOpen(true)}
      />

      {/* 7. Interactive Message Modal */}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />
    </div>
  );
};

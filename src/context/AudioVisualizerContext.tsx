import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

interface AudioVisualizerContextType {
  isPlaying: boolean;
  hasInteracted: boolean;
  togglePlay: () => void;
  startMusic: () => void;
  stopMusic: () => void;
  audioTitle: string;
}

const AudioVisualizerContext = createContext<AudioVisualizerContextType | null>(null);

interface AudioProviderProps {
  children: React.ReactNode;
  primarySrc?: string;
  fallbackSrc?: string;
  title?: string;
}

export const AudioVisualizerProvider: React.FC<AudioProviderProps> = ({
  children,
  primarySrc = `${import.meta.env.BASE_URL || './'}audio/tung-ngay-yeu-em.mp3`,
  fallbackSrc = `${import.meta.env.BASE_URL || './'}audio/Từng Ngày Yêu Em.mp3`,
  title = 'Từng Ngày Yêu Em — Bùi Trường Linh',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Dynamic visualizer state refs (to avoid React re-renders at 60fps)
  const energyRef = useRef(0); // 0 (idle) to 1 (full music reactivity)
  const smoothedBassRef = useRef(0);
  const isPlayingRef = useRef(false);

  // Update ref when state changes
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Fallback gentle chime synthesizer using Web Audio API
  const playFallbackNote = useCallback((freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.0);

      osc.connect(gain);
      if (analyserRef.current) {
        try {
          gain.connect(analyserRef.current);
        } catch {
          // Ignore connection error if already closed
        }
      }
      if (gainNodeRef.current) {
        gain.connect(gainNodeRef.current);
      } else {
        gain.connect(ctx.destination);
      }

      osc.start();
      osc.stop(ctx.currentTime + 2.1);
    } catch {
      // AudioContext fallback
    }
  }, []);

  const startFallbackMelody = useCallback(() => {
    const melody = [523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 659.25, 587.33];
    let noteIdx = 0;
    synthIntervalRef.current = window.setInterval(() => {
      playFallbackNote(melody[noteIdx % melody.length]);
      noteIdx++;
    }, 1300);
  }, [playFallbackNote]);

  const stopFallbackMelody = useCallback(() => {
    if (synthIntervalRef.current !== null) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  // Initialize Audio & Web Audio API
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';

    // Try primary source, with fallback event listener
    audio.src = primarySrc;
    audio.addEventListener('error', () => {
      console.warn(`Primary audio ${primarySrc} error, trying fallback ${fallbackSrc}`);
      if (audio.src !== fallbackSrc) {
        audio.src = fallbackSrc;
        audio.load();
      }
    });

    audioRef.current = audio;

    // Initialize Web Audio Context & Analyser lazily or on user interaction
    const initWebAudio = () => {
      if (audioCtxRef.current) return;
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.82;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);

        if (!sourceNodeRef.current && audioRef.current) {
          try {
            const source = ctx.createMediaElementSource(audioRef.current);
            source.connect(analyser);
            sourceNodeRef.current = source;
          } catch (e) {
            console.warn('MediaElementSource initialization notice:', e);
          }
        }

        analyser.connect(gainNode);
        gainNode.connect(ctx.destination);

        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        gainNodeRef.current = gainNode;
      } catch (err) {
        console.warn('Web Audio initialization fallback:', err);
      }
    };

    // Continuous 60fps Animation Loop updating CSS variables on document.documentElement
    let lastTime = performance.now();
    const dataArray = new Uint8Array(128);

    const updateVisualizer = () => {
      const now = performance.now();
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const timeInSec = now / 1000;

      // 1. Ramp energy up/down smoothly based on playing state
      if (isPlayingRef.current) {
        energyRef.current = Math.min(1.0, energyRef.current + dt * 1.5);
      } else {
        energyRef.current = Math.max(0.0, energyRef.current - dt * 1.2);
      }
      const energy = energyRef.current;

      // 2. Frequency Analysis (Bass & Rhythm extraction)
      let rawBass = 0;
      let rawMid = 0;
      if (analyserRef.current && isPlayingRef.current) {
        try {
          analyserRef.current.getByteFrequencyData(dataArray);
          // Bass bins 1 to 5 (~40Hz - 180Hz for kick/bassline)
          let bassSum = 0;
          for (let i = 1; i <= 5; i++) {
            bassSum += dataArray[i];
          }
          rawBass = bassSum / (5 * 255);

          // Mid bins 6 to 18 (~200Hz - 800Hz for guitar strum / vocals)
          let midSum = 0;
          for (let i = 6; i <= 18; i++) {
            midSum += dataArray[i];
          }
          rawMid = midSum / (13 * 255);
        } catch {
          // Fallback if data read issues
        }
      } else if (isPlayingRef.current) {
        // If AnalyserNode not available or synthesiser active, generate natural tempo wave at 86 BPM
        const tempoWave = (Math.sin(timeInSec * ((86 / 60) * Math.PI * 2)) + 1) * 0.5;
        rawBass = 0.25 + tempoWave * 0.35;
        rawMid = 0.2;
      }

      // Smooth bass to prevent harsh jittering, preserving musical bounce
      smoothedBassRef.current = smoothedBassRef.current * 0.78 + rawBass * 0.22;
      const smoothBass = smoothedBassRef.current;

      // 3. Mathematical Rhythm Wave calculation for "Từng Ngày Yêu Em" (~86 BPM)
      // A gentle sway period of ~2.79 seconds per measure (omega ~ 2.25 rad/s)
      const swayOmega = 2.25;
      const swayTime = timeInSec * swayOmega;

      // 5 Distinct Phase streams for rich non-robotic garden motion
      const phases = [0, 1.25, 2.50, 3.75, 5.00];
      const rootStyle = document.documentElement.style;

      for (let i = 0; i < phases.length; i++) {
        const phaseOffset = phases[i];
        const wave = Math.sin(swayTime + phaseOffset);

        // Active sway: expands with bass & guitar kicks (from 3.8° to 9.2°)
        const activeSway = wave * (3.8 + smoothBass * 5.4 + rawMid * 1.5);
        // Idle sway: gentle 4.5s ambient breeze (2.2°)
        const idleWave = Math.sin(timeInSec * 1.35 + phaseOffset);
        const idleSway = idleWave * 2.2;

        // Smooth blend between idle and active
        const blendedSway = idleSway * (1 - energy) + activeSway * energy;
        rootStyle.setProperty(`--sway-phase-${i}`, blendedSway.toFixed(3));
      }

      // 4. Subtle Flower Beat Bounce (scale expansion 0% to 3.8%)
      const beatBounce = smoothBass * 0.038 * energy;
      rootStyle.setProperty('--beat-bounce', beatBounce.toFixed(4));

      // 5. Mascot Hoa gentle rhythmic bobbing (±4px) and sway tilt (3° to 6°)
      const hoaBob = (Math.sin(timeInSec * 4.5) * 2.5 + smoothBass * 3.0) * energy;
      rootStyle.setProperty('--hoa-bob', `${hoaBob.toFixed(2)}px`);

      const activeTilt = Math.sin(swayTime + 0.9) * (3.0 + smoothBass * 3.5);
      const idleTilt = Math.sin(timeInSec * 1.35) * 1.4;
      const hoaTilt = (idleTilt * (1 - energy)) + (activeTilt * energy);
      rootStyle.setProperty('--hoa-tilt', hoaTilt.toFixed(3));

      // 6. Grass & foliage rhythmic sway
      const grassSway = (Math.sin(swayTime + 0.6) * (1.8 + smoothBass * 2.6) * energy) + (Math.sin(timeInSec * 1.35) * 1.0 * (1 - energy));
      rootStyle.setProperty('--grass-sway', grassSway.toFixed(3));

      // 7. Energy status
      rootStyle.setProperty('--music-energy', energy.toFixed(3));

      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    animFrameRef.current = requestAnimationFrame(updateVisualizer);

    // Save init function to window or ref for trigger
    (audio as unknown as { _initAudio?: () => void })._initAudio = initWebAudio;

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      stopFallbackMelody();
      audio.pause();
      audio.src = '';
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [primarySrc, fallbackSrc, stopFallbackMelody]);

  // Start Music with smooth Fade-In
  const startMusic = useCallback(() => {
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio) return;

    // Trigger Web Audio init on user gesture
    if ((audio as unknown as { _initAudio?: () => void })._initAudio) {
      (audio as unknown as { _initAudio?: () => void })._initAudio!();
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }

    // Set initial volume for fade-in
    audio.volume = 0.05;
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.65, audioCtxRef.current.currentTime + 0.8);
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        // HTMLAudioElement volume fade-in
        let vol = 0.05;
        const fade = setInterval(() => {
          if (vol < 0.6) {
            vol += 0.05;
            if (audio) audio.volume = Math.min(0.6, vol);
          } else {
            clearInterval(fade);
          }
        }, 60);
      })
      .catch((err) => {
        console.warn('Audio play restricted or failed, using melodic synth:', err);
        setIsPlaying(true);
        startFallbackMelody();
      });
  }, [startFallbackMelody]);

  // Stop Music with smooth Fade-Out
  const stopMusic = useCallback(() => {
    stopFallbackMelody();
    const audio = audioRef.current;
    if (!audio) return;

    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.6);
    }

    let vol = audio.volume;
    const fade = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.06;
        if (audio) audio.volume = Math.max(0, vol);
      } else {
        clearInterval(fade);
        if (audio) {
          audio.pause();
          audio.volume = 0.6;
        }
        setIsPlaying(false);
      }
    }, 50);
  }, [stopFallbackMelody]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [isPlaying, startMusic, stopMusic]);

  return (
    <AudioVisualizerContext.Provider
      value={{
        isPlaying,
        hasInteracted,
        togglePlay,
        startMusic,
        stopMusic,
        audioTitle: title,
      }}
    >
      {children}
    </AudioVisualizerContext.Provider>
  );
};

export const useAudioVisualizer = (): AudioVisualizerContextType => {
  const context = useContext(AudioVisualizerContext);
  if (!context) {
    throw new Error('useAudioVisualizer must be used within an AudioVisualizerProvider');
  }
  return context;
};

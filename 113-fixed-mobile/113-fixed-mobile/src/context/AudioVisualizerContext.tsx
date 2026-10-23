import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

export type AudioSourceType = 'file' | 'synth' | 'none';

interface AudioVisualizerContextType {
  isPlaying: boolean;
  hasInteracted: boolean;
  togglePlay: () => void;
  startMusic: () => void;
  stopMusic: () => void;
  audioTitle: string;
  audioType: AudioSourceType;
}

const AudioVisualizerContext = createContext<AudioVisualizerContextType | null>(null);

interface AudioProviderProps {
  children: React.ReactNode;
  primarySrc?: string;
  fallbackSrc?: string;
  title?: string;
}

// 16-step nostalgic, heartwarming garden melody (Key of C / Am, ~86 BPM cadence)
const AUDIO_START_OFFSET_SECONDS = 7;

const CHIME_MELODY = [
  523.25,  // C5
  659.25,  // E5
  783.99,  // G5
  987.77,  // B5
  1046.50, // C6
  783.99,  // G5
  659.25,  // E5
  880.00,  // A5
  523.25,  // C5
  587.33,  // D5
  659.25,  // E5
  783.99,  // G5
  987.77,  // B5
  880.00,  // A5
  659.25,  // E5
  587.33,  // D5
];

export const AudioVisualizerProvider: React.FC<AudioProviderProps> = ({
  children,
  primarySrc = `${import.meta.env.BASE_URL || './'}audio/tung-ngay-yeu-em-piano.mp3`,
  fallbackSrc = `${import.meta.env.BASE_URL || './'}audio/tung-ngay-yeu-em.mp3`,
  title = 'Từng Ngày Yêu Em (Piano) — Bùi Trường Linh',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioType, setAudioType] = useState<AudioSourceType>('none');
  const [activeTitle, setActiveTitle] = useState<string>('Bật nhạc');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);
  const fileCheckFailedRef = useRef(false);

  // Dynamic visualizer state refs (to avoid React re-renders at 60fps)
  const energyRef = useRef(0); // 0 (idle) to 1 (full music reactivity)
  const smoothedBassRef = useRef(0);
  const isPlayingRef = useRef(false);
  const audioTypeRef = useRef<AudioSourceType>('none');


  // Update refs when state changes
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    audioTypeRef.current = audioType;
    window.dispatchEvent(new Event('audio-visualizer-wake'));
  }, [isPlaying, audioType]);

  // Safe AudioContext getter
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.82;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.22, ctx.currentTime);
      gainNode.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      gainNodeRef.current = gainNode;
    }
    return audioCtxRef.current;
  }, []);

  // Sweet, delicate Music Box / Celesta chime synthesizer
  const playCelestaNote = useCallback((freq: number) => {
    try {
      const ctx = getAudioContext();
      if (!ctx || ctx.state === 'closed') return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const masterGain = gainNodeRef.current;
      const analyser = analyserRef.current;

      // 1. Primary fundamental tone (warm sine wave)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // 2. Harmonic overtone (gentle octave chime shimmer with subtle detune)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.002, now);

      // 3. Envelopes
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.08, now + 0.006); // Soft chime strike
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.85); // Natural ring decay

      const overtoneGain = ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.022, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

      // 4. Low-pass filter for silky soft acoustic character
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2800, now);

      // Connect graph
      osc1.connect(noteGain);
      osc2.connect(overtoneGain);
      overtoneGain.connect(noteGain);
      noteGain.connect(filter);

      if (masterGain) {
        filter.connect(masterGain);
      } else {
        filter.connect(ctx.destination);
      }

      // Feed frequency analyser so the garden blooms & sways to the chime!
      if (analyser) {
        try {
          filter.connect(analyser);
        } catch {
          // ignore duplicate connect
        }
      }

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.9);
      osc2.stop(now + 1.9);
    } catch {
      // AudioContext fallback
    }
  }, [getAudioContext]);

  // Start the Music Box Melodic Arpeggio Loop with smooth fade-in
  const startFallbackMelody = useCallback(() => {
    if (synthIntervalRef.current !== null) {
      clearInterval(synthIntervalRef.current);
    }

    const ctx = getAudioContext();
    if (ctx && gainNodeRef.current) {
      const now = ctx.currentTime;
      gainNodeRef.current.gain.cancelScheduledValues(now);
      gainNodeRef.current.gain.setValueAtTime(0.01, now);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.22, now + 0.6);
    }

    // Play first note immediately
    playCelestaNote(CHIME_MELODY[noteIndexRef.current % CHIME_MELODY.length]);
    noteIndexRef.current++;

    // Then play subsequent notes at ~460ms intervals (relaxing, soothing tempo)
    synthIntervalRef.current = window.setInterval(() => {
      playCelestaNote(CHIME_MELODY[noteIndexRef.current % CHIME_MELODY.length]);
      noteIndexRef.current++;
    }, 460);
  }, [getAudioContext, playCelestaNote]);

  const stopFallbackMelody = useCallback(() => {
    if (synthIntervalRef.current !== null) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  // Initialize HTMLAudioElement and Visualizer Loop
  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleAudioEnded = () => {
      if (!isPlayingRef.current) return;
      try {
        audio.currentTime = AUDIO_START_OFFSET_SECONDS;
      } catch {
        // Ignore seek errors on older Safari versions.
      }
      audio.play().catch(() => {});
    };
    audio.addEventListener('ended', handleAudioEnded);

    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const targetFrameMs = isMobile ? 1000 / 30 : 1000 / 45;
    let lastTime = performance.now();
    let lastRenderTime = 0;
    const dataArray = new Uint8Array(128);

    const updateVisualizer = () => {
      if (document.hidden) {
        animFrameRef.current = null;
        return;
      }

      const now = performance.now();
      if (now - lastRenderTime < targetFrameMs) {
        animFrameRef.current = requestAnimationFrame(updateVisualizer);
        return;
      }
      lastRenderTime = now;

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
          let bassSum = 0;
          for (let i = 1; i <= 5; i++) {
            bassSum += dataArray[i];
          }
          rawBass = bassSum / (5 * 255);

          let midSum = 0;
          for (let i = 6; i <= 18; i++) {
            midSum += dataArray[i];
          }
          rawMid = midSum / (13 * 255);
        } catch {
          // Fallback if data read issues
        }
      }

      // If playing via synth or if frequency is quiet, add rhythmic tempo wave at ~86 BPM
      if (isPlayingRef.current && (audioTypeRef.current === 'synth' || rawBass < 0.05)) {
        const tempoWave = (Math.sin(timeInSec * ((86 / 60) * Math.PI * 2)) + 1) * 0.5;
        rawBass = Math.max(rawBass, 0.22 + tempoWave * 0.3);
        rawMid = Math.max(rawMid, 0.18);
      }

      // Smooth bass to prevent harsh jittering, preserving musical bounce
      smoothedBassRef.current = smoothedBassRef.current * 0.78 + rawBass * 0.22;
      const smoothBass = smoothedBassRef.current;

      // 3. Mathematical Rhythm Wave calculation (~86 BPM, ~2.25 rad/s)
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

      // 5. Grass & foliage rhythmic sway
      const grassSway =
        Math.sin(swayTime + 0.6) * (1.8 + smoothBass * 2.6) * energy +
        Math.sin(timeInSec * 1.35) * 1.0 * (1 - energy);
      rootStyle.setProperty('--grass-sway', grassSway.toFixed(3));

      if (!isPlayingRef.current && energyRef.current <= 0.001) {
        energyRef.current = 0;
        smoothedBassRef.current = 0;
        rootStyle.setProperty('--beat-bounce', '0');
        rootStyle.setProperty('--grass-sway', '0');
        animFrameRef.current = null;
        return;
      }

      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    const ensureVisualizerRunning = () => {
      if (animFrameRef.current === null && !document.hidden) {
        lastTime = performance.now();
        lastRenderTime = 0;
        animFrameRef.current = requestAnimationFrame(updateVisualizer);
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      } else if (isPlayingRef.current || energyRef.current > 0.001) {
        ensureVisualizerRunning();
      }
    };

    window.addEventListener('audio-visualizer-wake', ensureVisualizerRunning);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('audio-visualizer-wake', ensureVisualizerRunning);
      document.removeEventListener('visibilitychange', handleVisibility);
      stopFallbackMelody();
      audio.removeEventListener('ended', handleAudioEnded);
      audio.pause();
      audio.src = '';
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopFallbackMelody]);

  const playAudioFromOffset = useCallback((audio: HTMLAudioElement, src: string) => {
    return new Promise<void>((resolve, reject) => {
      const beginPlayback = () => {
        try {
          if (Number.isFinite(audio.duration) && audio.duration > AUDIO_START_OFFSET_SECONDS) {
            audio.currentTime = AUDIO_START_OFFSET_SECONDS;
          }
        } catch {
          // Some Safari versions can briefly reject seeking before metadata is ready.
        }

        audio.play().then(() => resolve()).catch(reject);
      };

      if (audio.src !== new URL(src, window.location.href).href) {
        audio.src = src;
      }

      if (audio.readyState >= 1) {
        beginPlayback();
      } else {
        const onLoadedMetadata = () => {
          audio.removeEventListener('error', onError);
          beginPlayback();
        };
        const onError = () => {
          audio.removeEventListener('loadedmetadata', onLoadedMetadata);
          reject(new Error('Audio metadata failed to load'));
        };
        audio.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
        audio.addEventListener('error', onError, { once: true });
        audio.load();
      }
    });
  }, []);

  // Start Music
  const startMusic = useCallback(() => {
    setHasInteracted(true);

    // 1. Resume AudioContext immediately on user touch/click
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const audio = audioRef.current;
    if (!audio) return;

    // If file playback previously failed completely on this device, use synth directly
    if (fileCheckFailedRef.current) {
      setAudioType('synth');
      setActiveTitle('Giai Điệu Khu Vườn ♫');
      setIsPlaying(true);
      startFallbackMelody();
      return;
    }

    // Connect audio element to Web Audio once
    if (!sourceNodeRef.current && audioCtxRef.current) {
      try {
        const source = audioCtxRef.current.createMediaElementSource(audio);
        if (analyserRef.current) source.connect(analyserRef.current);
        if (gainNodeRef.current) source.connect(gainNodeRef.current);
        sourceNodeRef.current = source;
      } catch {
        // Already connected or browser restricted
      }
    }

    // Restore master gain in case it was faded out
    if (ctx && gainNodeRef.current) {
      const now = ctx.currentTime;
      gainNodeRef.current.gain.cancelScheduledValues(now);
      gainNodeRef.current.gain.setValueAtTime(0.35, now);
    }

    // Resume if already loaded and paused
    if (audio.src && audio.src.includes('audio') && audio.currentTime > 0 && !audio.ended) {
      audio
        .play()
        .then(() => {
          setAudioType('file');
          setActiveTitle(title);
          setIsPlaying(true);
          let vol = audio.volume;
          const fade = setInterval(() => {
            if (vol < 0.65) {
              vol += 0.05;
              if (audio) audio.volume = Math.min(0.65, vol);
            } else {
              clearInterval(fade);
            }
          }, 40);
        })
        .catch(() => {
          fileCheckFailedRef.current = true;
          setAudioType('synth');
          setActiveTitle('Giai Điệu Khu Vườn ♫');
          setIsPlaying(true);
          startFallbackMelody();
        });
      return;
    }

    // Play primary audio track from the 7-second mark with smooth volume fade-in
    audio.volume = 0.05;
    playAudioFromOffset(audio, primarySrc)
      .then(() => {
        setAudioType('file');
        setActiveTitle(title);
        setIsPlaying(true);
        let vol = 0.05;
        const fade = setInterval(() => {
          if (vol < 0.65) {
            vol += 0.05;
            if (audio) audio.volume = Math.min(0.65, vol);
          } else {
            clearInterval(fade);
          }
        }, 50);
      })
      .catch((err) => {
        console.warn('Primary audio playback error, checking fallback:', err);
        if (fallbackSrc && fallbackSrc !== primarySrc) {
          playAudioFromOffset(audio, fallbackSrc)
            .then(() => {
              setAudioType('file');
              setActiveTitle(title);
              setIsPlaying(true);
            })
            .catch(() => {
              fileCheckFailedRef.current = true;
              setAudioType('synth');
              setActiveTitle('Giai Điệu Khu Vườn ♫');
              setIsPlaying(true);
              startFallbackMelody();
            });
        } else {
          fileCheckFailedRef.current = true;
          setAudioType('synth');
          setActiveTitle('Giai Điệu Khu Vườn ♫');
          setIsPlaying(true);
          startFallbackMelody();
        }
      });
  }, [
    getAudioContext,
    primarySrc,
    fallbackSrc,
    title,
    startFallbackMelody,
    playAudioFromOffset,
  ]);

  // Stop Music with smooth fade-out
  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    const ctx = audioCtxRef.current;

    // Fade out synth if active
    if (gainNodeRef.current && ctx && ctx.state === 'running') {
      const now = ctx.currentTime;
      gainNodeRef.current.gain.cancelScheduledValues(now);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, now + 0.35);
    }

    // Fade out HTML audio element if active
    if (audio && !audio.paused) {
      let vol = audio.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0.08) {
          vol -= 0.08;
          if (audio) audio.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeOut);
          if (audio) audio.pause();
        }
      }, 40);
    }

    stopFallbackMelody();
    setIsPlaying(false);
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
        audioTitle: activeTitle,
        audioType,
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

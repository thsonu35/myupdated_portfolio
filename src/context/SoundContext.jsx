import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  // 1. Consider setting this to false if you want sound on by default 
  // (but it will only play after the first user click anyway)
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);

  const initAudio = useCallback(async () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }

    // IMPORTANT: Resume the context if it's suspended (browser security)
    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
  }, []);

  const playOscillator = useCallback(async (type, freq, duration, vol) => {
    if (isMuted) return;

    // Ensure context is active before playing
    await initAudio();

    if (!audioCtxRef.current) return;

    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Envelope logic
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }, [isMuted, initAudio]);

  // Wrapped in async to ensure initialization finishes
  const playHover = useCallback(() => playOscillator('sine', 440, 0.1, 0.05), [playOscillator]);
  const playClick = useCallback(() => playOscillator('square', 220, 0.15, 0.1), [playOscillator]);
  const playType = useCallback(() => playOscillator('triangle', 600 + Math.random() * 200, 0.05, 0.02), [playOscillator]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playType }}>
      {children}
    </SoundContext.Provider>
  );
};
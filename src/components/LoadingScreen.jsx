import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  "Initializing System Core...",
  "Loading Developer Profile [SST]...",
  "Establishing Secure Connection...",
  "Bypassing Firewalls...",
  "Loading 3D Environment Vectors...",
  "Authenticating Identity...",
  "Access Granted."
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    const totalTime = 4000; // 4 seconds total load
    const interval = 50;
    const steps = totalTime / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min((step / steps) * 100, 100);
      setProgress(currentProgress);

      // Update log based on progress
      const logIndex = Math.min(
        Math.floor((currentProgress / 100) * bootSequence.length),
        bootSequence.length - 1
      );
      setCurrentLog(logIndex);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 800); // Wait a bit after 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-loading"
        initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ 
          opacity: 0, 
          scale: 1.5, // Warp zoom effect
          filter: "blur(20px)",
          transition: { duration: 1.2, ease: "easeInOut" }
        }}
        className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
      >
        {/* Intense CRT Scanlines */}
        <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-50" />
        
        {/* Flicker / Glitch overlay */}
        <motion.div 
          animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: 0.2, repeatType: "mirror" }}
          className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
        />

        <div className="relative z-10 w-[80%] max-w-2xl">
          <div className="flex justify-between items-end mb-2 text-neon-blue uppercase tracking-[0.3em] text-xs md:text-sm shadow-neon">
            <span className="animate-pulse">SYSTEM.BOOT_V3.0</span>
            <span className="font-bold text-lg">{Math.floor(progress)}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-glass-border overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-neon-blue shadow-[0_0_10px_#00f3ff]"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>

          {/* Boot Logs */}
          <div className="mt-6 h-32 overflow-hidden flex flex-col justify-end">
            {bootSequence.slice(0, currentLog + 1).map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm md:text-base mt-2 ${
                  idx === bootSequence.length - 1 
                    ? 'text-green-400 font-bold tracking-widest text-lg glow-green' 
                    : 'text-text-muted'
                }`}
              >
                <span className="text-neon-purple mr-3">[{String(idx + 1).padStart(2, '0')}]</span>
                {log}
              </motion.div>
            ))}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="w-3 h-5 bg-neon-blue inline-block mt-2"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;

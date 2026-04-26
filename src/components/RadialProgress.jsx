import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RadialProgress = ({ value, label, size = 120, strokeWidth = 8, color = "#00f3ff", suffix = "" }) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    let timer = setTimeout(() => {
      setProgress(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center" style={{ width: size, height: size + 40 }}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="transform -rotate-90 absolute" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute flex flex-col items-center text-center">
          <span className="text-2xl font-bold font-mono text-text-main">
            {progress}{suffix}
          </span>
        </div>
      </div>
      <div className="mt-4 text-xs font-mono uppercase tracking-widest text-text-muted text-center max-w-[100px]">
        {label}
      </div>
    </div>
  );
};

export default RadialProgress;

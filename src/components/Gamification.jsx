import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const StatCounter = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalMilSecDur = 2000;
    let incrementTime = (totalMilSecDur / end) * 2;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold text-neon-blue mb-2 font-mono">
        {count}{suffix}
      </div>
      <div className="text-sm text-text-muted uppercase tracking-widest">{label}</div>
    </div>
  );
};

const Gamification = () => {
  return (
    <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto relative z-10 border-y border-glass-border bg-black/20 my-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        <div className="col-span-2 md:col-span-4 flex flex-col items-center mb-4">
          <h3 className="text-xl font-bold text-text-main mb-2">Developer Level: <span className="text-neon-purple">Lv. 24</span></h3>
          <div className="w-full max-w-md h-2 bg-glass-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "85%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_#9d00ff]"
            />
          </div>
          <span className="text-xs text-text-muted mt-2">8,500 / 10,000 XP to Lv. 25</span>
        </div>

        <StatCounter value={2} label="Years Exp" suffix="+" />
        <StatCounter value={4} label="Projects" />
        <StatCounter value={50} label="APIs Built" suffix="+" />
        <StatCounter value={10} label="Coffees/Day" />
      </motion.div>
    </section>
  );
};

export default Gamification;

import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-full glass-panel flex items-center justify-center text-text-main hover:text-neon-blue transition-colors duration-300 z-50 overflow-hidden"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          y: isDark ? 0 : -30,
          opacity: isDark ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <FaMoon className="text-xl" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          y: isDark ? 30 : 0,
          opacity: isDark ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <FaSun className="text-xl" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

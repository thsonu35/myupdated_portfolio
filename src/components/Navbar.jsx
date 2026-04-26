import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useSound } from '../context/SoundContext';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/experience' },
  { name: 'Terminal', href: '/terminal' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const { isMuted, toggleMute, playHover, playClick } = useSound();
  const location = useLocation();

  // Hide Navbar completely on the Intro/Landing page
  if (location.pathname === '/') return null;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-[9900] py-4 px-6 md:px-12 flex justify-between items-center"
    >
      <Link to="/dashboard" onClick={playClick} onMouseEnter={playHover}>
        <div className="text-2xl font-bold text-gradient cursor-pointer">
          SST_OS
        </div>
      </Link>
      
      <ul className="hidden md:flex items-center space-x-6 glass-panel px-6 py-2 rounded-full">
        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.href;
          return (
            <li key={index}>
              <Link 
                to={link.href} 
                onMouseEnter={playHover}
                onClick={playClick}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 relative group ${isActive ? 'text-neon-blue' : 'text-text-muted hover:text-neon-blue'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-neon-blue transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </li>
          );
        })}
        <li className="pl-4 border-l border-glass-border flex gap-4">
          <ThemeToggle />
          <button 
            onClick={() => { toggleMute(); playClick(); }}
            className="text-text-muted hover:text-neon-blue transition-colors"
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </button>
        </li>
      </ul>

      {/* Mobile Menu Button - simplified */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={toggleMute} className="text-text-muted">
          {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
        </button>
        <ThemeToggle />
        <div className="text-neon-blue cursor-pointer" onClick={playClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

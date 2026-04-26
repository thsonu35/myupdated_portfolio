import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'System initialized. How can I assist you today, Commander?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { playHover, playClick, playType } = useSound();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide AIAssistant completely on the Intro/Landing page
  if (location.pathname === '/') return null;

  const handleSuggestion = (action, text) => {
    playClick();
    setMessages(prev => [...prev, { type: 'user', text }]);
    setIsTyping(true);
    
    // Simulate thinking/typing
    let responseText = '';
    setTimeout(() => {
      switch (action) {
        case 'projects':
          responseText = 'Navigating to the Projects sector...';
          setTimeout(() => navigate('/projects'), 1000);
          break;
        case 'skills':
          responseText = 'Initializing 3D Skills Matrix...';
          setTimeout(() => navigate('/skills'), 1000);
          break;
        case 'terminal':
          responseText = 'Accessing mainframe terminal...';
          setTimeout(() => navigate('/terminal'), 1000);
          break;
        default:
          responseText = 'Command acknowledged.';
      }
      
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text: responseText }]);
      
      // Simulate typing sound
      let i = 0;
      const typeInterval = setInterval(() => {
        playType();
        i++;
        if (i > 10) clearInterval(typeInterval);
      }, 50);
      
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9900]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 glass-panel border border-neon-blue/50 bg-black/80 shadow-[0_0_30px_rgba(0,243,255,0.2)] rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-neon-blue/10 px-4 py-3 border-b border-neon-blue/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
                <span className="text-neon-blue font-bold tracking-wider text-sm">SST.AI_CORE</span>
              </div>
              <button 
                onClick={() => { playClick(); setIsOpen(false); }}
                className="text-text-muted hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat Area */}
            <div className="p-4 h-64 overflow-y-auto flex flex-col gap-3 text-sm font-mono custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    msg.type === 'bot' 
                      ? 'bg-neon-blue/10 text-neon-blue self-start border border-neon-blue/20' 
                      : 'bg-neon-purple/20 text-neon-purple self-end border border-neon-purple/30'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-neon-blue self-start flex gap-1 px-3 py-2">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="p-3 border-t border-glass-border bg-black/50 flex flex-wrap gap-2">
              <button 
                onMouseEnter={playHover}
                onClick={() => handleSuggestion('projects', 'Show me your projects')}
                className="text-xs px-3 py-1.5 rounded-full border border-glass-border text-text-muted hover:text-neon-blue hover:border-neon-blue transition-colors"
              >
                View Projects
              </button>
              <button 
                onMouseEnter={playHover}
                onClick={() => handleSuggestion('skills', 'Display skills matrix')}
                className="text-xs px-3 py-1.5 rounded-full border border-glass-border text-text-muted hover:text-neon-purple hover:border-neon-purple transition-colors"
              >
                Explore Skills
              </button>
              <button 
                onMouseEnter={playHover}
                onClick={() => handleSuggestion('terminal', 'Open main terminal')}
                className="text-xs px-3 py-1.5 rounded-full border border-glass-border text-text-muted hover:text-white hover:border-white transition-colors"
              >
                Open Terminal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onMouseEnter={playHover}
        onClick={() => { playClick(); setIsOpen(!isOpen); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full glass-panel bg-primary-bg/80 border-2 border-neon-blue flex items-center justify-center text-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.4)] relative"
      >
        <FaRobot className="text-2xl z-10" />
        {/* Radar Ping Effect */}
        <span className="absolute inset-0 rounded-full border border-neon-blue animate-ping opacity-75"></span>
      </motion.button>
    </div>
  );
};

export default AIAssistant;

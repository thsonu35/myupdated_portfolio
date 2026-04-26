import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';
import { GoogleGenAI } from '@google/genai';

const commandsInfo = {
  help: "Available commands: help, about, skills, projects, contact, clear, whoami, matrix, ai <message>",
  about: "Backend Developer specializing in Node.js, Express, and Django.",
  skills: "Tech stack: Python, Django, Node.js, PostgreSQL, MongoDB, React.",
  projects: "Featured: API Engine, Log Monitoring System, Low-Code Workflow.",
  contact: `Email: ${import.meta.env.VITE_CONTACT_EMAIL} | Phone: ${import.meta.env.VITE_PHONE}`,
  whoami: "You are a guest user exploring the SST mainframe.",
};

const Terminal = ({ fullscreen = false }) => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const { playType } = useSound();

  // Initialize Gemini AI
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  // Boot sequence simulation
  useEffect(() => {
    const bootLogs = [
      "Initializing SST_OS v4.0.0...",
      "Mounting virtual file systems... OK",
      "Loading cryptographic keys... OK",
      "Connection established. Security protocols active.",
      "Type 'help' to see available commands or 'ai <message>' to chat."
    ];

    let i = 0;
    const bootInterval = setInterval(() => {
      setHistory(prev => [...prev, { type: 'system', text: bootLogs[i] }]);
      i++;
      if (i >= bootLogs.length) clearInterval(bootInterval);
    }, 400);

    return () => clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Autocomplete logic
      const availableCmds = Object.keys(commandsInfo);
      const match = availableCmds.find(cmd => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
      return;
    }

    if (e.key !== 'Enter' && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Meta') {
      playType();
    }

    if (e.key === 'Enter') {
      const cmdString = input.trim();
      const cmdLower = cmdString.toLowerCase();
      if (!cmdString) return;

      const newHistory = [...history, { type: 'user', text: `> ${cmdString}` }];
      setHistory(newHistory);
      setInput('');

      if (cmdLower === 'clear') {
        setHistory([]);
      } else if (cmdLower === 'matrix') {
        setIsMatrixMode(!isMatrixMode);
        setHistory([...newHistory, { type: 'output', text: `Matrix protocol ${!isMatrixMode ? 'engaged' : 'disengaged'}.` }]);
      } else if (cmdLower === 'sudo rm -rf /') {
        setHistory([...newHistory, { type: 'error', text: 'Nice try. Incident reported to system administrator.' }]);
      } else if (cmdLower.startsWith('ai ')) {
        const query = cmdString.substring(3).trim();
        if (!query) {
          setHistory([...newHistory, { type: 'error', text: 'Usage: ai <your message>' }]);
          return;
        }

        setIsAiThinking(true);
        try {
          // Warning: doing this client side exposes the key. Use backend for production!
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are an AI assistant built into the portfolio terminal of Sohan Singh Thakur, a Backend Developer. Keep answers brief and technical. User asked: ${query}`
          });
          setHistory([...newHistory, { type: 'ai-output', text: `[AI] ${response.text}` }]);
        } catch (err) {
          setHistory([...newHistory, { type: 'error', text: `AI Error: ${err.message}` }]);
        } finally {
          setIsAiThinking(false);
        }
      } else if (commandsInfo[cmdLower]) {
        // Simulate typing output
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'output', text: commandsInfo[cmdLower] }]);
        }, 300);
      } else {
        setHistory([...newHistory, { type: 'error', text: `Command not found: ${cmdString}. Type "help" for a list of commands.` }]);
      }
    }
  };

  const terminalClasses = fullscreen
    ? "w-full h-full p-8 flex flex-col"
    : "relative w-full max-w-4xl mx-auto py-24 px-6 md:px-12 z-10";

  const matrixClasses = isMatrixMode ? "text-green-500 text-shadow-green" : "";

  return (
    <section id="terminal" className={fullscreen ? "h-screen pt-20 pb-4 px-4" : terminalClasses}>
      {!fullscreen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-text-main">
            System <span className="text-gradient">Terminal</span>
          </h2>
        </motion.div>
      )}

      <motion.div 
        layout
        className={`glass-panel border border-neon-blue/30 rounded-xl overflow-hidden bg-[#050505]/90 shadow-[0_0_20px_rgba(0,243,255,0.1)] flex flex-col ${fullscreen ? 'h-full' : 'h-96'}`}
      >
        {/* Terminal Header */}
        <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-xs font-mono text-gray-400">root@sst-os:~</span>
        </div>

        {/* Terminal Body */}
        <div className={`p-6 font-mono text-sm overflow-y-auto flex-1 custom-scrollbar flex flex-col ${matrixClasses}`} onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-2 leading-relaxed ${
                isMatrixMode ? 'text-green-500' :
                line.type === 'user' ? 'text-neon-blue font-bold' : 
                line.type === 'error' ? 'text-red-400' : 
                line.type === 'ai-output' ? 'text-neon-purple' :
                'text-gray-300'
              }`}
            >
              {line.text}
            </motion.div>
          ))}
          
          {isAiThinking && (
            <div className="text-neon-purple flex gap-1 mb-2">
              <span>[AI processing</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.]</span>
            </div>
          )}

          <div className={`flex items-center mt-2 ${isMatrixMode ? 'text-green-500' : 'text-neon-blue'}`}>
            <span className="mr-2">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              disabled={isAiThinking}
              className={`bg-transparent border-none outline-none flex-1 font-mono ${isMatrixMode ? 'text-green-500' : 'text-gray-200'} ${isAiThinking ? 'opacity-50' : ''}`}
              spellCheck="false"
              autoComplete="off"
              autoFocus
            />
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className={`w-2 h-4 inline-block ml-1 ${isMatrixMode ? 'bg-green-500' : 'bg-neon-purple'}`}
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    </section>
  );
};

export default Terminal;

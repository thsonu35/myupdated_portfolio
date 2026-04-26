import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';

const commandsInfo = {
  help: "Commands: help, about, skills, projects, contact, clear, whoami, matrix, ai <msg>, ls, cd, pwd, date, echo, scan, ssh <ip>, crack, logs, cat, history",
  about: "Backend Developer specializing in Node.js, Express, Django & scalable systems.",
  skills: "Python, Django, Node.js, PostgreSQL, MongoDB, React, Redis, Docker",
  projects: "Low-Code Engine | Log Monitoring | API Processing System",
  contact: `Email: ${import.meta.env.VITE_CONTACT_EMAIL}`,
  whoami: "guest@sst-os (Access Level: Limited)",
  linkedin: "linkedin.com/in/sohan--thakur",
  github: "github.com/thsonu35",
};

const fileSystem = {
  "/home/sohan": ["projects", "skills.txt", "about.txt"],
  "/home/sohan/projects": ["api-engine.js", "log-system.py"],
};

const fileContents = {
  "/home/sohan/skills.txt": "Node.js, Django, MongoDB, PostgreSQL, Redis",
  "/home/sohan/about.txt": "Backend Developer focused on scalable systems.",
};

const Terminal = ({ fullscreen = false }) => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const [currentPath, setCurrentPath] = useState("/home/sohan");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const { playType } = useSound();

  const askai = async (message) => {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free", // FREE model
          messages: [
            {
              role: "user",
              content: message
            }
          ]
        })
      });

      const data = await res.json();

      return data?.choices?.[0]?.message?.content || "No response";

    } catch (err) {
      console.error(err);
      return "AI error";
    }
  };
  // Boot logs
  useEffect(() => {
    const logs = [
      "Initializing SST_OS v4.0.0...",
      "Mounting virtual file systems... OK",
      "Loading cryptographic keys... OK",
      "Connection established.",
      "Type 'help' to begin."
    ];

    let i = 0;
    const interval = setInterval(() => {
      setHistory(prev => [...prev, { type: 'system', text: logs[i] }]);
      i++;
      if (i >= logs.length) clearInterval(interval);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e) => {

    // ⬆️ history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (cmdHistory[newIndex]) {
        setInput(cmdHistory[newIndex]);
        setHistoryIndex(newIndex);
      }
      return;
    }

    // ⬇️ history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setInput(cmdHistory[newIndex]);
        setHistoryIndex(newIndex);
      } else {
        setInput('');
        setHistoryIndex(-1);
      }
      return;
    }

    // TAB autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const allCmds = [...Object.keys(commandsInfo), 'ls', 'cd', 'pwd', 'scan', 'ssh', 'crack', 'logs', 'cat', 'history'];
      const match = allCmds.find(cmd => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
      return;
    }

    if (e.key !== 'Enter') {
      playType();
      return;
    }

    const cmdString = input.trim();
    if (!cmdString) return;

    const cmdLower = cmdString.toLowerCase();

    const newHistory = [...history, { type: 'user', text: `> ${cmdString}` }];
    setHistory(newHistory);
    setInput('');

    setCmdHistory(prev => [cmdString, ...prev]);
    setHistoryIndex(-1);

    // ===== BASIC =====
    if (cmdLower === 'clear') return setHistory([]);

    if (cmdLower === 'whoami') {
      return setHistory([...newHistory, {
        type: 'output',
        text: navigator.userAgent
      }]);
    }

    if (cmdLower === 'matrix') {
      setIsMatrixMode(!isMatrixMode);
      return setHistory([...newHistory, {
        type: 'output',
        text: `Matrix ${!isMatrixMode ? 'enabled' : 'disabled'}`
      }]);
    }

    if (cmdLower === 'sudo rm -rf /') {
      return setHistory([...newHistory, { type: 'error', text: 'Nice try 😏' }]);
    }

    // ===== FILE SYSTEM =====
    if (cmdLower === 'ls') {
      const files = fileSystem[currentPath] || [];
      return setHistory([...newHistory, { type: 'output', text: files.join('   ') }]);
    }

    if (cmdLower.startsWith('cd ')) {
      const path = cmdString.split(' ')[1];

      if (path === '..') {
        const parent = currentPath.split('/').slice(0, -1).join('/') || "/home";
        setCurrentPath(parent);
        return setHistory([...newHistory, { type: 'output', text: parent }]);
      }

      const newPath = `${currentPath}/${path}`.replace(/\/+/g, '/');
      if (fileSystem[newPath]) {
        setCurrentPath(newPath);
        return setHistory([...newHistory, { type: 'output', text: newPath }]);
      }

      return setHistory([...newHistory, { type: 'error', text: 'Directory not found' }]);
    }

    if (cmdLower === 'pwd') {
      return setHistory([...newHistory, { type: 'output', text: currentPath }]);
    }

    if (cmdLower === 'cat') {
      return setHistory([...newHistory, {
        type: 'error',
        text: 'Usage: cat <filename>'
      }]);
    }

    if (cmdLower.startsWith('cat ')) {
      const file = cmdString.split(' ')[1];
      const fullPath = `${currentPath}/${file}`.replace(/\/+/g, '/');

      if (fileContents[fullPath]) {
        return setHistory([...newHistory, {
          type: 'output',
          text: fileContents[fullPath]
        }]);
      }

      return setHistory([...newHistory, {
        type: 'error',
        text: `cat: ${file}: No such file`
      }]);
    }

    // ===== UTIL =====
    if (cmdLower.startsWith('echo ')) {
      return setHistory([...newHistory, {
        type: 'output',
        text: cmdString.slice(5)
      }]);
    }

    if (cmdLower === 'date') {
      return setHistory([...newHistory, {
        type: 'output',
        text: new Date().toString()
      }]);
    }

    if (cmdLower === 'history') {
      return setHistory([...newHistory, {
        type: 'output',
        text: cmdHistory.join('\n')
      }]);
    }

    // ===== HACKER COMMANDS =====
    if (cmdLower === 'scan') {
      ["Scanning network...", "22/tcp open ssh", "80/tcp open http", "Scan complete"]
        .forEach((t, i) => setTimeout(() => {
          setHistory(prev => [...prev, { type: 'output', text: t }]);
        }, i * 300));
      return;
    }

    if (cmdLower.startsWith('ssh ')) {
      const ip = cmdString.split(' ')[1];
      [`Connecting ${ip}`, "Authenticating...", "Access granted"]
        .forEach((t, i) => setTimeout(() => {
          setHistory(prev => [...prev, { type: 'output', text: t }]);
        }, i * 400));
      return;
    }

    if (cmdLower === 'crack') {
      let c = 0;
      const interval = setInterval(() => {
        const fake = Math.random().toString(36).substring(2, 7);
        setHistory(prev => [...prev, { type: 'output', text: `Trying: ${fake}` }]);
        if (++c > 12) {
          clearInterval(interval);
          setHistory(prev => [...prev, { type: 'output', text: 'Password cracked: admin@123' }]);
        }
      }, 120);
      return;
    }

    if (cmdLower === 'logs') {
      let i = 0;
      const interval = setInterval(() => {
        setHistory(prev => [...prev, {
          type: 'output',
          text: `[${new Date().toLocaleTimeString()}] running...`
        }]);
        if (++i > 10) clearInterval(interval);
      }, 400);
      return;
    }

    // ===== STATIC =====
    if (commandsInfo[cmdLower]) {
      return setHistory([...newHistory, {
        type: 'output',
        text: commandsInfo[cmdLower]
      }]);
    }

    // ===== AI =====
    setIsAiThinking(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [{ role: "user", content: cmdString }]
        })
      });

      const data = await res.json();

      const text =
        data?.choices?.[0]?.message?.content || "No response";

      setHistory(prev => [...prev, {
        type: 'ai-output',
        text: `[AI] ${text}`
      }]);

    } catch (err) {
      console.error(err);
      setHistory(prev => [...prev, {
        type: 'error',
        text: `AI error`
      }]);
    } finally {
      setIsAiThinking(false);
    }
  };
  const terminalClasses = fullscreen
    ? "w-full h-full p-8 flex flex-col"
    : "relative w-full max-w-4xl mx-auto py-24 px-6 md:px-12 z-10";

  const matrixClasses = isMatrixMode ? "text-green-500" : "";

  return (
    <section id="terminal" className={fullscreen ? "h-screen pt-20 pb-4 px-4" : terminalClasses}>
      <motion.div className={`glass-panel border border-neon-blue/30 rounded-xl overflow-hidden bg-[#050505]/90 flex flex-col ${fullscreen ? 'h-full' : 'h-96'}`}>

        <div className="p-6 font-mono text-sm overflow-y-auto flex-1 flex flex-col">
          {history.map((line, i) => (
            <div key={i}>{line.text}</div>
          ))}

          {isAiThinking && <div>AI processing...</div>}

          <div className="flex mt-2">
            <span>&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <div ref={bottomRef} />
        </div>
      </motion.div>
    </section>
  );
};

export default Terminal;
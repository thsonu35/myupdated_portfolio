import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import RadialProgress from '../components/RadialProgress';
import MagneticButton from '../components/MagneticButton';
import { useSound } from '../context/SoundContext';

const Dashboard = () => {
  const { playHover, playClick } = useSound();

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto relative z-10 flex flex-col items-center">

        {/* Top Header HUD */}
        <div className="w-full flex justify-between items-end mb-12 border-b border-neon-blue/30 pb-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold font-mono text-neon-blue"
            >
              MAIN_DASHBOARD
            </motion.h1>
            <p className="text-text-muted font-mono text-sm tracking-widest uppercase mt-2">
              SST OS // Core Interface
            </p>
          </div>
          <div className="hidden md:flex gap-8">
            <div className="text-right">
              <div className="text-xs text-neon-purple uppercase">System Status</div>
              <div className="text-green-400 font-bold font-mono animate-pulse">OPTIMAL</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-neon-purple uppercase">Uptime</div>
              <div className="text-white font-mono">99.9%</div>
            </div>
          </div>
        </div>

        {/* Central HUD Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Panel: Profile Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 border border-glass-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>
            <h2 className="text-xl font-bold font-mono text-text-main mb-6 uppercase border-b border-glass-border pb-2 inline-block">
              User Profile
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-neon-blue flex items-center justify-center p-1 relative">
                <div className="absolute inset-0 rounded-full border-t-2 border-neon-purple animate-spin" style={{ animationDuration: '3s' }}></div>
                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=SST`} alt="Avatar" className="w-full h-full rounded-full bg-primary-bg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Sohan Singh Thakur</h3>
                <p className="text-neon-blue text-sm font-mono">Backend Developer</p>
              </div>
            </div>
            <div className="space-y-4 text-sm font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-text-muted">ID:</span>
                <span className="text-white">SST-994</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-text-muted">Clearance:</span>
                <span className="text-red-400 font-bold">LEVEL 5</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-text-muted">Location:</span>
                <span className="text-white">Bangalore, IN</span>
              </div>
            </div>
            <Link to="/contact">
              <MagneticButton
                onMouseEnter={playHover} onClick={playClick}
                className="w-full mt-6 py-3 border border-neon-blue/50 text-neon-blue font-mono hover:bg-neon-blue hover:text-black transition-colors rounded"
              >
                ACCESS CONTACT
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Center Panel: Radial Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 border border-neon-blue/30 shadow-[0_0_30px_rgba(0,243,255,0.1)] flex flex-col items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
            <h2 className="text-xl font-bold font-mono text-neon-blue mb-8 uppercase tracking-widest text-shadow-neon self-start absolute top-6 left-6">
              Telemetry
            </h2>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <RadialProgress value={4} label="Projects" color="#00f3ff" />
              <RadialProgress value={50} label="APIs Built" color="#9d00ff" suffix="+" />
              <RadialProgress value={4 / 2} label="Years Exp" color="#ff00ff" suffix="+" />
              <RadialProgress value={78} label="Uptime %" color="#00ff00" />
            </div>
          </motion.div>

          {/* Right Panel: Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <NavModule to="/projects" title="PROJECTS_ARCHIVE" subtitle="Access classified builds" color="neon-blue" playHover={playHover} playClick={playClick} />
            <NavModule to="/skills" title="SKILLS_MATRIX" subtitle="3D tech stack visualization" color="neon-purple" playHover={playHover} playClick={playClick} />
            <NavModule to="/experience" title="TIMELINE_LOG" subtitle="Professional history" color="white" playHover={playHover} playClick={playClick} />
            <NavModule to="/terminal" title="ROOT_TERMINAL" subtitle="Direct system access + AI" color="red-500" playHover={playHover} playClick={playClick} />
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

const NavModule = ({ to, title, subtitle, color, playHover, playClick }) => {
  return (
    <Link to={to} className="group block h-full">
      <motion.div
        onMouseEnter={playHover}
        onClick={playClick}
        whileHover={{ x: -10 }}
        className="glass-panel p-6 border border-glass-border hover:border-neon-blue/50 transition-all duration-300 h-full flex flex-col justify-center relative overflow-hidden"
      >
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${color} opacity-50 group-hover:opacity-100 group-hover:w-2 transition-all duration-300`}></div>
        <h3 className={`text-lg font-bold font-mono mb-1 text-${color === 'white' ? 'text-main' : color} group-hover:text-neon-blue transition-colors`}>
          {title}
        </h3>
        <p className="text-xs text-text-muted font-mono tracking-widest">{subtitle}</p>

        {/* Animated grid background on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
      </motion.div>
    </Link>
  );
};

export default Dashboard;

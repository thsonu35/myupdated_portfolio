import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import TerminalPage from './pages/TerminalPage';
import { Toaster } from 'react-hot-toast';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terminal" element={<TerminalPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function AppContent() {
  return (
    <div className="min-h-screen font-sans selection:bg-neon-blue selection:text-primary-bg overflow-x-hidden relative">
      <CustomCursor />
      <Navbar />
      <AIAssistant />
      <AnimatedRoutes />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <ThemeProvider>
        <SoundProvider>
          <AppContent />
        </SoundProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useSound } from '../context/SoundContext';

const projects = [
  {
    title: "Low-Code Workflow & API Engine",
    description: "A robust backend engine allowing dynamic creation and execution of workflows, simplifying API orchestration.",
    details: "Built with Node.js and Express. Features a drag-and-drop workflow builder, custom script execution in sandboxed environments, and extensive third-party integration support. Reduced API integration time by 40%.",
    tags: ["Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    title: "API Integration & Data Processing",
    description: "System for handling large-scale data processing and seamless integration with third-party APIs (REST/SOAP).",
    details: "Developed using Python and Django. Handles over 1M+ daily transactions. Implemented Celery for async task queues and Redis for caching, ensuring high availability and fault tolerance.",
    tags: ["Python", "Django", "PostgreSQL", "Celery"]
  },
  {
    title: "Log Monitoring & Error Handling",
    description: "Centralized logging service for real-time monitoring, error tracking, and alerting across microservices.",
    details: "Built with FastAPI to handle high throughput asynchronous log ingestion. Integrated Elasticsearch for fast querying and visualized data using custom Kibana dashboards.",
    tags: ["FastAPI", "Elasticsearch", "Redis", "Docker"]
  },
  {
    title: "Backend API Service",
    description: "High-performance API backend built with FastAPI, featuring asynchronous processing and WebSocket support.",
    details: "Designed a microservices architecture. Features real-time WebSocket communication for live data feeds and SQLAlchemy for complex data relationships.",
    tags: ["FastAPI", "Python", "SQLAlchemy", "WebSockets"]
  }
];

const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { playHover, playClick } = useSound();

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleClick() {
    playClick();
    setIsFlipped(!isFlipped);

    // Trigger particle burst effect
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 500);
  }

  return (
    <div
      className="relative w-full h-[350px] perspective-1000 group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={playHover}
      onClick={handleClick}
    >
      {/* Click Particle Burst Effect */}
      {showParticles && (
        <motion.div
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 z-50 rounded-xl border-2 border-neon-blue pointer-events-none"
        />
      )}

      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden glass-panel rounded-xl border border-glass-border bg-primary-bg/50 px-8 py-10 overflow-hidden flex flex-col justify-between">
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(0, 243, 255, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-text-main mb-4 group-hover:text-neon-blue transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-text-muted mb-6 leading-relaxed flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 text-xs font-medium text-neon-purple bg-neon-purple/10 rounded-full border border-neon-purple/20">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-sm font-semibold text-neon-blue text-center w-full mt-2 animate-pulse">
              Click to decrypt details
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 backface-hidden glass-panel rounded-xl border border-neon-blue/50 bg-primary-bg/80 px-8 py-10 overflow-hidden flex flex-col justify-center items-center text-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* Animated flowing border on back */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,243,255,0.8)_360deg)] animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-[2px] rounded-xl bg-primary-bg/95 backdrop-blur-sm" />
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold text-neon-blue mb-4">
              System Architecture
            </h3>
            <p className="text-text-main leading-relaxed text-sm">
              {project.details}
            </p>
            {/* <button 
              onMouseEnter={playHover}
              className="mt-8 px-6 py-2 rounded-full border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(157,0,255,0.2)]"
              onClick={(e) => { 
                e.stopPropagation(); 
                playClick(); 
                alert('Initiating repository transfer protocol...'); 
              }}
            >
              Access Source
            </button> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-text-main">
          Classified <span className="text-gradient">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;

import React from 'react';
import { motion } from 'framer-motion';
import { FaNodeJs, FaPython, FaDatabase, FaServer } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-text-main">
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="glass-panel glass-panel-hover p-8 md:p-12 relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-purple rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neon-blue rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 text-lg leading-relaxed text-text-muted">
              <p className="mb-6">
                I am a dedicated <span className="text-neon-blue font-semibold">Backend Developer</span> with 2+ years of experience specializing in Node.js, Express, and Django. 
                My passion lies in architecting robust, scalable, and secure server-side applications that power modern web experiences.
              </p>
              <p>
                From designing complex database schemas (MongoDB, SQL, PostgreSQL) to building efficient REST APIs and optimizing backend performance, 
                I thrive on solving intricate technical challenges and delivering clean, maintainable code.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="glass-panel p-4 flex flex-col items-center justify-center gap-2 hover:border-neon-blue/50 transition-colors">
                <FaNodeJs className="text-4xl text-green-500" />
                <span className="text-sm font-semibold text-text-main">Node.js</span>
              </div>
              <div className="glass-panel p-4 flex flex-col items-center justify-center gap-2 hover:border-neon-blue/50 transition-colors">
                <FaPython className="text-4xl text-yellow-500" />
                <span className="text-sm font-semibold text-text-main">Python/Django</span>
              </div>
              <div className="glass-panel p-4 flex flex-col items-center justify-center gap-2 hover:border-neon-blue/50 transition-colors">
                <FaDatabase className="text-4xl text-blue-400" />
                <span className="text-sm font-semibold text-text-main">Databases</span>
              </div>
              <div className="glass-panel p-4 flex flex-col items-center justify-center gap-2 hover:border-neon-blue/50 transition-colors">
                <FaServer className="text-4xl text-purple-500" />
                <span className="text-sm font-semibold text-text-main">REST APIs</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

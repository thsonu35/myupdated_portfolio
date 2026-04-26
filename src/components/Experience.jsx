import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Python Developer",
    company: "Zino Technology",
    period: "2025 – Present",
    highlights: [
      "API integration (REST/SOAP)",
      "PostgreSQL & data processing",
      "Linux + SSH deployment",
      "Debugging & performance optimization"
    ]
  },
  {
    role: "Junior Developer",
    company: "BestPeers Infosystem",
    period: "2024 – 2025",
    highlights: [
      "Assisted in building RESTful APIs using Django Rest Framework",
      "Optimized database queries in PostgreSQL",
      "Collaborated on frontend integrations",
      "Participated in agile development workflows"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-text-main">
          Work <span className="text-gradient">Experience</span>
        </h2>

        <div className="relative border-l-2 border-neon-blue/30 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neon-blue/30 -translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="mb-16 relative md:flex md:justify-between md:items-center md:w-full group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1.5 md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-neon-purple border-2 border-primary-bg z-10 group-hover:bg-neon-blue group-hover:shadow-[0_0_10px_#00f3ff] transition-all duration-300"></div>

              {/* Content Card */}
              <motion.div 
                className={`glass-panel glass-panel-hover p-6 md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-main">{exp.role}</h3>
                    <h4 className="text-neon-blue font-medium">{exp.company}</h4>
                  </div>
                  <span className="text-xs text-neon-purple px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-2 text-text-muted text-sm">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-neon-blue mr-2 mt-1">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;

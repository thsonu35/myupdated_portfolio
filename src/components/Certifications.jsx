import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaShieldAlt, FaPython } from 'react-icons/fa';

const certifications = [
  {
    title: "Cisco Cybersecurity Internship",
    issuer: "Cisco",
    icon: <FaShieldAlt className="text-4xl text-neon-blue" />,
    color: "group-hover:border-neon-blue/50 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
  },
  {
    title: "EC-Council Python Certification",
    issuer: "EC-Council",
    icon: <FaPython className="text-4xl text-neon-purple" />,
    color: "group-hover:border-neon-purple/50 group-hover:shadow-[0_0_15px_rgba(157,0,255,0.3)]"
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-text-main">
          Licenses & <span className="text-gradient">Certifications</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`glass-panel p-8 flex items-center gap-6 group transition-all duration-300 cursor-pointer hover:-translate-y-2 ${cert.color}`}
            >
              <div className="bg-primary-bg p-4 rounded-full border border-glass-border shadow-inner">
                {cert.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-main mb-2">{cert.title}</h3>
                <p className="text-text-muted font-medium flex items-center gap-2">
                  <FaCertificate className="text-neon-blue text-xs" />
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;

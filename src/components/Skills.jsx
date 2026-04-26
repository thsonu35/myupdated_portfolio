import React, { useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const skillsData = [
  "Python", "Django", "FastAPI", "Node.js", "Express",
  "PostgreSQL", "MongoDB", "Redis", "MySQL",
  "React", "JavaScript", "Docker", "Git", "Linux", "CI/CD"
];

const OrbitingSkill = ({ text, radius, speed, angleOffset, color }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current && !hovered) {
      // Orbit around center
      const time = state.clock.getElapsedTime() * speed + angleOffset;
      groupRef.current.position.x = Math.cos(time) * radius;
      groupRef.current.position.z = Math.sin(time) * radius;
      // Bob up and down slightly
      groupRef.current.position.y = Math.sin(time * 2) * (radius * 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[hovered ? 0.4 : 0.2, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 2 : 0.5} 
          wireframe={!hovered}
        />
        <Html distanceFactor={15} center>
          <div className={`px-2 py-1 rounded text-xs font-bold transition-all duration-300 whitespace-nowrap ${
            hovered 
              ? 'bg-black/80 text-white border border-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.8)]' 
              : 'text-gray-300 pointer-events-none'
          }`}>
            {text}
          </div>
        </Html>
      </mesh>
    </group>
  );
};

const SkillsSystem = () => {
  // Generate orbital parameters for each skill
  const orbits = useMemo(() => {
    return skillsData.map((skill, i) => {
      // Distribute into 3 orbital rings
      const ring = (i % 3) + 1;
      const radius = ring * 3;
      const speed = (0.2 / ring) * (i % 2 === 0 ? 1 : -1); // Alternate directions
      const angleOffset = (Math.PI * 2 * i) / skillsData.length;
      
      let color = "#00f3ff"; // cyan
      if (ring === 2) color = "#9d00ff"; // purple
      if (ring === 3) color = "#ff00ff"; // magenta

      return { text: skill, radius, speed, angleOffset, color };
    });
  }, []);

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden glass-panel border border-neon-blue/20 relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none z-10" />
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-neon-blue font-mono text-sm uppercase tracking-widest animate-pulse">
          Neural Matrix Active
        </h3>
        <p className="text-gray-400 text-xs">Hover nodes to inspect sectors</p>
      </div>

      <Canvas camera={{ position: [0, 4, 12], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#00f3ff" />
        <Stars radius={50} depth={20} count={2000} factor={2} fade speed={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          {/* Central Core */}
          <mesh>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#000" emissive="#00f3ff" emissiveIntensity={1} wireframe />
            <Html center>
              <div className="text-white/50 text-xs font-mono tracking-widest pointer-events-none mix-blend-screen">
                CORE
              </div>
            </Html>
          </mesh>

          {/* Orbital Rings visible lines */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.95, 3.05, 64]} />
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[5.95, 6.05, 64]} />
            <meshBasicMaterial color="#9d00ff" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[8.95, 9.05, 64]} />
            <meshBasicMaterial color="#ff00ff" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>

          {/* Skill Nodes */}
          {orbits.map((orbit, i) => (
            <OrbitingSkill key={i} {...orbit} />
          ))}
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-text-main">
          Technical <span className="text-gradient">Ecosystem</span>
        </h2>
        
        <SkillsSystem />
      </motion.div>
    </section>
  );
};

export default Skills;

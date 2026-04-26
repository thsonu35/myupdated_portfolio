import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import MagneticButton from './MagneticButton';

const AbstractAvatar = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      // Add slight pulse based on mouse
      meshRef.current.scale.setScalar(1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#00f3ff"
          emissive="#9d00ff"
          emissiveIntensity={0.6}
          wireframe
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// A component to make stars react slightly to mouse movement
const InteractiveStars = () => {
  const group = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (mousePosition.x * 0.05 - group.current.rotation.y) * 0.1;
      group.current.rotation.x += (-mousePosition.y * 0.05 - group.current.rotation.x) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const Hero = ({ onEnterSystem }) => {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* 3D Background & Avatar (Lazy loaded via Suspense) */}
      <div className="absolute inset-0 z-0 bg-primary-bg transition-colors duration-500">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <InteractiveStars />
            <AbstractAvatar />
          </Canvas>
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-neon-blue font-semibold tracking-widest uppercase mb-4"
        >
          Backend Developer
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-text-main"
        >
          SOHAN SINGH <span className="text-gradient">THAKUR</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl md:text-2xl text-text-muted mb-10 max-w-2xl"
        >
          Building scalable, secure, and high-performance backend systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pointer-events-auto"
        >
          <MagneticButton
            onClick={onEnterSystem}
            className="px-8 py-4 rounded-none border border-neon-blue bg-neon-blue/10 text-neon-blue font-mono font-bold hover:bg-neon-blue hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.3)] tracking-widest uppercase relative overflow-hidden group"
          >
            <span className="relative z-10">Initialize System</span>
            <div className="absolute inset-0 bg-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left -z-0"></div>
          </MagneticButton>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs uppercase tracking-widest text-text-muted mb-2">System Ready</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Added 'type' to the destructured props
const MagneticButton = ({ children, className, onClick, href, type = 'button' }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Element = href ? motion.a : motion.button;

  // FIXED: Changed hardcoded 'button' to use the 'type' prop
  const props = href ? { href } : { onClick, type };

  return (
    <Element
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </Element>
  );
};

export default MagneticButton;
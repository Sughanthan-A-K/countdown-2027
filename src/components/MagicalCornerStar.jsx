import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MagicalCornerStar({ onStarClick, shouldAnimateFlight = true }) {
  useEffect(() => {
    // Gentle vibration when star lands
    const timer = setTimeout(() => {
      if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
    }, shouldAnimateFlight ? 1100 : 0);
    return () => clearTimeout(timer);
  }, [shouldAnimateFlight]);

  return (
    <motion.div
      initial={shouldAnimateFlight ? { 
        x: 280, 
        y: -300, 
        scale: 0.1, 
        opacity: 0, 
        rotate: 180 
      } : { 
        scale: 0.8, 
        opacity: 0 
      }}
      animate={{ 
        x: 0, 
        y: 0, 
        scale: 1, 
        opacity: 1, 
        rotate: 0 
      }}
      transition={shouldAnimateFlight ? { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      } : { 
        duration: 0.4, 
        ease: "easeOut" 
      }}
      className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-40 cursor-pointer select-none pointer-events-auto flex items-center justify-center w-10 h-10"
      onClick={(e) => {
        e.stopPropagation();
        onStarClick();
      }}
    >
      {/* The Twinkling Star (Exactly like GandhiPic eye star, 25px: 5px larger than Gandhi's 20px) */}
      <motion.div
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 0.85 }}
        className="text-[#f7d13d] flex items-center justify-center pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 6px rgba(247,209,61,1)) drop-shadow(0 0 12px rgba(247,209,61,0.7))' }}
        animate={{ 
          opacity: [0.3, 1, 1, 0.3, 0.3], 
          scale: [0.75, 1.15, 1, 0.75, 0.75],
          rotate: [0, 90, 180, 270, 270] 
        }} 
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          times: [0, 0.15, 0.35, 0.5, 1],
          ease: "easeInOut"
        }}
      >
        <svg width="25" height="25" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0 C 10 8, 12 10, 20 10 C 12 10, 10 12, 10 20 C 10 12, 8 10, 0 10 C 8 10, 10 8, 10 0 Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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
      className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-40 cursor-pointer select-none pointer-events-auto"
      onClick={(e) => {
        e.stopPropagation();
        onStarClick();
      }}
    >
      {/* Golden Pulse Aura Ring */}
      <motion.div
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.7, 0, 0.7]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: "easeInOut"
        }}
        className="absolute -inset-2 rounded-full bg-[#f7d13d]/30 blur-[4px] pointer-events-none"
      />

      {/* Main Star Button with Twinkle & Float Animation */}
      <motion.div
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 8, -8, 0],
          filter: [
            'drop-shadow(0 0 6px #f7d13d) drop-shadow(0 0 12px rgba(247,209,61,0.6))',
            'drop-shadow(0 0 14px #f7d13d) drop-shadow(0 0 24px rgba(247,209,61,0.9))',
            'drop-shadow(0 0 6px #f7d13d) drop-shadow(0 0 12px rgba(247,209,61,0.6))',
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: "easeInOut"
        }}
        className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10"
      >
        {/* Five-point Golden Star SVG */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-full h-full text-[#f7d13d]"
          fill="currentColor"
          stroke="#b8860b"
          strokeWidth="1.2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>

        {/* Center Sparkle Accent */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/90"
        >
          <Sparkles size={14} className="drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
        </motion.div>
      </motion.div>

      {/* Orbiting Mini Sparkles */}
      <motion.div
        animate={{
          scale: [0, 1.2, 0],
          opacity: [0, 1, 0],
          x: [0, 12, 16],
          y: [0, -12, -16]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.0,
          repeatDelay: 0.6,
          ease: "easeOut"
        }}
        className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#f7d13d] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [0, 1.2, 0],
          opacity: [0, 1, 0],
          x: [0, -10, -14],
          y: [0, 10, 14]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          delay: 1.0,
          repeatDelay: 0.8,
          ease: "easeOut"
        }}
        className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-[#f7d13d] shadow-[0_0_6px_#f7d13d] pointer-events-none"
      />
    </motion.div>
  );
}

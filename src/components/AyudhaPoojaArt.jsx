import React from 'react';
import { motion } from 'framer-motion';

export default function AyudhaPoojaArt({ isDarkMode }) {
  // Use user-provided high-quality images from /public
  const imageSrc = isDarkMode ? '/HAP Dark mode.png' : '/HAP Light mode.png';

  return (
    <div className="relative w-full max-w-[260px] h-48 sm:h-52 flex flex-col items-center justify-center select-none my-auto">
      {/* Soft Ethereal Breathing Aura */}
      <motion.div
        animate={{
          scale: [0.94, 1.05, 0.94],
          opacity: isDarkMode ? [0.35, 0.55, 0.35] : [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-44 h-44 rounded-full blur-2xl pointer-events-none"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(245,158,11,0.5) 0%, rgba(217,119,6,0.15) 60%, transparent 75%)'
            : 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(251,191,36,0.12) 60%, transparent 75%)',
        }}
      />

      {/* Floating Gentle Festive Sparkles */}
      {[
        { top: '8%', left: '12%', delay: 0 },
        { top: '15%', right: '10%', delay: 1.1 },
        { bottom: '16%', left: '14%', delay: 1.9 },
        { bottom: '10%', right: '12%', delay: 0.6 },
      ].map((pos, idx) => (
        <motion.div
          key={idx}
          className="absolute text-amber-400 dark:text-amber-300 pointer-events-none z-20"
          style={{ ...pos }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.7, 1.25, 0.7],
            y: [-2, 2, -2],
          }}
          transition={{
            duration: 2.6,
            delay: pos.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0 C 10 7, 13 10, 20 10 C 13 10, 10 13, 10 20 C 10 13, 7 10, 0 10 C 7 10, 10 7, 10 0 Z" />
          </svg>
        </motion.div>
      ))}

      {/* Clean High-Resolution Ayudha Pooja Art Image with subtle floating animation */}
      <motion.div
        animate={{
          y: [-3, 3, -3],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full flex items-center justify-center z-10"
      >
        <img
          src={imageSrc}
          alt="Happy Ayudha Pooja"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
          style={
            isDarkMode
              ? {
                  filter: 'drop-shadow(0 0 16px rgba(245,158,11,0.35)) drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
                }
              : {
                  filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.08))',
                }
          }
        />
      </motion.div>
    </div>
  );
}

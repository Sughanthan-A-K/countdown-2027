import React from 'react';
import { motion } from 'framer-motion';

export default function AyudhaPoojaArt({ isDarkMode }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-[210px] max-h-[190px] sm:max-w-[230px] sm:max-h-[210px] w-full h-full flex items-center justify-center overflow-hidden rounded-2xl"
      >
        <img
          src="/HPH_clean.png"
          alt="Happy Pooja Holidays"
          className={`w-full h-full object-contain select-none pointer-events-none transition-all duration-300 ${
            isDarkMode 
              ? 'drop-shadow-[0_4px_16px_rgba(255,255,255,0.12)]' 
              : 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
          }`}
          loading="eager"
        />
      </motion.div>
    </div>
  );
}

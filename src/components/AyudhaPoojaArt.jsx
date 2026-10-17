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
          src="/HPH.jpg"
          alt="Happy Pooja Holidays"
          className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
          loading="eager"
        />
      </motion.div>
    </div>
  );
}

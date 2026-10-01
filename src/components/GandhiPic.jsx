import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function GandhiPic({ isDarkMode, onEyeClick, hasKey }) {
  const strokeColor = isDarkMode ? '#f5f5f5' : '#171717';
  
  return (
    <div className="relative w-40 h-32 sm:w-48 sm:h-40 my-4 flex justify-center items-center">
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Glasses Left */}
        <circle cx="60" cy="50" r="22" stroke={strokeColor} strokeWidth="6" />
        {/* Glasses Right */}
        <circle cx="140" cy="50" r="22" stroke={strokeColor} strokeWidth="6" />
        
        {/* Glasses Bridge */}
        <path d="M82 50 Q 100 35, 118 50" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
        
        {/* Glasses Sides */}
        <path d="M38 50 Q 20 45, 10 60" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
        <path d="M162 50 Q 180 45, 190 60" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />

        {/* Nose line */}
        <path d="M100 50 L 100 85 L 90 90" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Moustache */}
        <path d="M75 100 Q 100 95, 125 100 Q 130 110, 115 110 Q 100 105, 85 110 Q 70 110, 75 100 Z" fill={strokeColor} />
      </svg>
      
      {/* The Twinkling Eye (Right eye) */}
                  {!hasKey && (
      <div 
         onClick={(e) => {
           e.stopPropagation(); // prevent calendar dragging if possible
           if (onEyeClick) onEyeClick();
         }}
         className="absolute cursor-pointer z-50 flex items-center justify-center w-12 h-12 rounded-full"
         style={{ 
            top: '35%', left: '72%', // Positioned elegantly at the top-right corner of the right lens
            transform: 'translate(-50%, -50%)'
         }}
      >
        {/* The Twinkling Star (Visual Only) */}
                        {/* The Twinkling Star (Visual Only) */}
        <motion.div
           className="text-[#f7d13d] pointer-events-none"
           style={{ filter: 'drop-shadow(0 0 4px rgba(247,209,61,1))' }}
           animate={{ 
             opacity: [0, 1, 1, 0, 0], 
             scale: [0, 1, 1, 0, 0],
             rotate: [0, 90, 180, 270, 270] 
           }} 
           transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              times: [0, 0.1, 0.3, 0.4, 1], // Quick pop up, hold a bit, shrink back, wait 2s
              ease: "easeInOut"
           }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 0 C 10 8, 12 10, 20 10 C 12 10, 10 12, 10 20 C 10 12, 8 10, 0 10 C 8 10, 10 8, 10 0 Z" /></svg>
        </motion.div>
      </div>
      )}
    </div>
  );
}

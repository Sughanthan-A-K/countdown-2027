import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpeechBubble({ text, show, isDarkMode, onNext, btnText, position = 'bottom' }) {
  const positionClasses = position === 'top' 
    ? 'top-[4%] sm:top-[8%]' 
    : 'bottom-[10%] sm:bottom-[15%]';

  const sizeClasses = position === 'top'
    ? 'px-4 py-3 max-w-[260px] w-[80vw] text-xs' // Smaller size
    : 'px-6 py-4 max-w-[300px] w-[85vw] text-sm sm:text-base'; // Normal size

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: position === 'top' ? -20 : 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: position === 'top' ? -20 : 20 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className={`absolute ${positionClasses} left-1/2 -translate-x-1/2 z-[400] pointer-events-none ${sizeClasses} rounded-3xl shadow-2xl text-center font-bold border-2 ${
            isDarkMode ? 'bg-white text-black border-neutral-200' : 'bg-neutral-900 text-white border-neutral-800'
          }`}
        >
          <div className="whitespace-pre-wrap leading-relaxed">{text}</div>
          
          {onNext && (
            <button 
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(30);
                onNext();
              }} 
              className={`mt-3 px-5 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full transition-transform active:scale-95 pointer-events-auto ${
                isDarkMode ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {btnText || 'Next'}
            </button>
          )}

          {position === 'top' ? (
            <div className={`absolute -bottom-[12px] left-1/2 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[14px] border-transparent ${
              isDarkMode ? 'border-t-white' : 'border-t-neutral-900'
            }`} />
          ) : (
            <div className={`absolute -top-[12px] left-1/2 -translate-x-1/2 border-l-[12px] border-r-[12px] border-b-[16px] border-transparent ${
              isDarkMode ? 'border-b-white' : 'border-b-neutral-900'
            }`} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

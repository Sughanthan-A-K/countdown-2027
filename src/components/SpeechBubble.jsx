import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpeechBubble({ text, show, isDarkMode, onNext }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className={`absolute bottom-[10%] sm:bottom-[15%] left-1/2 -translate-x-1/2 z-[150] px-6 py-4 rounded-3xl shadow-2xl max-w-[300px] w-[85vw] text-center font-bold text-sm sm:text-base border-2 ${
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
              className={`mt-4 px-6 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-transform active:scale-95 ${
                isDarkMode ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              Next ➔
            </button>
          )}

          <div className={`absolute -top-[12px] left-1/2 -translate-x-1/2 border-l-[12px] border-r-[12px] border-b-[16px] border-transparent ${
            isDarkMode ? 'border-b-white' : 'border-b-neutral-900'
          }`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

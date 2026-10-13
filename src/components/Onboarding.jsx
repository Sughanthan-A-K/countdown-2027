import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDaysRemaining, normalizeDate } from '../utils/date';

export default function Onboarding({ onComplete, globalLang, setGlobalLang }) {
  const [index, setIndex] = useState(0);
  const daysLeft = getDaysRemaining(normalizeDate(new Date()));

  const pages = globalLang === 'english' ? [
    { isLangSelect: true },
    <>Hi Bro,<br/><br/>I created this...<br/><br/>It's me,<br/><span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-black drop-shadow-md text-4xl sm:text-5xl">Sughanthan!</span></>,
    <>But wondering why?<br/>Just a small piece of information...</>,
    <>There are only <span className="text-yellow-400">{daysLeft} days</span> left until this year ends...<br/><span className="text-xl sm:text-2xl text-neutral-400">(including today!)</span></>,
    <>I hope you did something productive today...</>,
    <>Didn't you?<br/>Let it go, there are still <span className="text-blue-400">{daysLeft - 1} days</span> left!</>,
    <>And I've made a calendar in this....<br/>Check it out...</>
  ] : [
    { isLangSelect: true },
    <>Hi Bro,<br/><br/>Itha naan thaan create pannen...<br/><br/>It's me,<br/><span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-black drop-shadow-md text-4xl sm:text-5xl">Sughanthan!</span></>,
    <>But ethukku nu yosikkiriya?<br/>Just oru chinna information...</>,
    <>Intha varusham mudiya innum <span className="text-yellow-400">{daysLeft} days</span> thaan irukku...<br/><span className="text-xl sm:text-2xl text-neutral-400">(innaiku sethu thaan solren!)</span></>,
    <>I hope innaiku nee ethavathu urupidiya panni iruppa nu nenaikkiren...</>,
    <>Apdi illaya?<br/>Free ah vidu, innum <span className="text-blue-400">{daysLeft - 1} days</span> irukku!</>,
    <>And ithula naan oru calendar panni irukken....<br/>check panni paaren...</>
  ];

  const handleDragEnd = (e, info) => {
    // Disable drag on language select screen
    if (pages[index].isLangSelect) return;

    if (info.offset.x < -40 && index < pages.length - 1) {
      setIndex(i => i + 1);
    } else if (info.offset.x > 40 && index > 1) { // can't swipe back to lang select
      setIndex(i => i - 1);
    } else if (info.offset.x < -40 && index === pages.length - 1) {
      onComplete();
    }
  };

  const handleLangSelect = (lang) => {
    setGlobalLang(lang);
    localStorage.setItem('globalLang', lang);
    setIndex(1); // Move to the next page automatically
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }} 
      animate={{ opacity: 1 }} 
      exit={{ 
        x: "-150vw",
        y: "50vh", 
        rotateZ: -25, 
        opacity: 0, 
        transition: { duration: 0.7, ease: [0.4, 0, 1, 1] } // Fast swipe-tear to the left
      }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center p-8 z-[200] touch-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          drag={pages[index].isLangSelect ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className={`w-full flex-1 flex items-center justify-center ${!pages[index].isLangSelect ? 'cursor-grab active:cursor-grabbing' : ''}`}
        >
          {pages[index].isLangSelect ? (
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl sm:text-3xl text-neutral-400 font-bold mb-8 tracking-widest uppercase text-center">
                Choose your Language
              </h2>
              <button 
                onClick={() => handleLangSelect('english')}
                className="w-56 py-4 rounded-xl font-bold text-xl bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 active:scale-95 transition-all"
              >
                English
              </button>
              <button 
                onClick={() => handleLangSelect('tanglish')}
                className="w-56 py-4 rounded-xl font-bold text-xl bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 active:scale-95 transition-all"
              >
                Tanglish
              </button>
            </div>
          ) : (
            <h1 className="text-3xl sm:text-4xl text-white font-black leading-snug tracking-tight text-center">
              {pages[index]}
            </h1>
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-12 flex gap-3 z-10">
        {!pages[index].isLangSelect && pages.slice(1).map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i + 1 === index ? 'bg-white scale-125' : 'bg-neutral-800'}`} />
        ))}
      </div>
      
      {!pages[index].isLangSelect && (
        <motion.div 
          animate={{ opacity: [0.2, 1, 0.2] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-24 text-neutral-500 font-bold text-xs tracking-[0.3em] uppercase pointer-events-none z-10"
        >
          {index === pages.length - 1 ? (globalLang === 'english' ? 'Swipe left to start' : 'Swipe left to start') : (globalLang === 'english' ? 'Swipe left' : 'Swipe left')}
        </motion.div>
      )}
    </motion.div>
  );
}

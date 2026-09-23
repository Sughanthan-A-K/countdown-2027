import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDaysRemaining, normalizeDate } from '../utils/date';

export default function Onboarding({ onComplete }) {
  const [index, setIndex] = useState(0);
  const daysLeft = getDaysRemaining(normalizeDate(new Date()));

  const pages = [
    <>Hi Bro,<br/><br/>Itha naan thaan create pannen...<br/><br/>It's me,<br/><span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-black drop-shadow-md text-4xl sm:text-5xl">Sughanthan!</span></>,
    <>But ethukku nu yosikkiriya?<br/>Just oru chinna information...</>,
    <>Intha varusham mudiya innum <span className="text-yellow-400">{daysLeft} days</span> thaan irukku...<br/><span className="text-xl sm:text-2xl text-neutral-400">(innaiku sethu thaan solren!)</span></>,
    <>I hope innaiku nee ethavathu urupidiya panni iruppa nu nenaikkiren...</>,
    <>Apdi illaya?<br/>Free ah vidu, innum <span className="text-blue-400">{daysLeft - 1} days</span> irukku!</>,
    <>And ithula naan oru calendar panni irukken....<br/>check panni paaren...</>
  ];

  const handleDragEnd = (e, info) => {
    if (info.offset.x < -40 && index < pages.length - 1) {
      setIndex(i => i + 1);
    } else if (info.offset.x > 40 && index > 0) {
      setIndex(i => i - 1);
    } else if (info.offset.x < -40 && index === pages.length - 1) {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center p-8 z-[200] touch-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <h1 className="text-3xl sm:text-4xl text-white font-black leading-snug tracking-tight text-center">
            {pages[index]}
          </h1>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-12 flex gap-3 z-10">
        {pages.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === index ? 'bg-white scale-125' : 'bg-neutral-800'}`} />
        ))}
      </div>
      
      <motion.div 
        animate={{ opacity: [0.2, 1, 0.2] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-24 text-neutral-500 font-bold text-xs tracking-[0.3em] uppercase pointer-events-none z-10"
      >
        {index === pages.length - 1 ? 'Swipe left to start' : 'Swipe left'}
      </motion.div>
    </motion.div>
  );
}

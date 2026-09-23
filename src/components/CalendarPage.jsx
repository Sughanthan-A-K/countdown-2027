import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, PartyPopper, Star } from 'lucide-react';

export default function CalendarPage({ dateText, daysRemaining, index, onTear, isTop, isDarkMode, isTearLocked }) {
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);
  const [exitRotate, setExitRotate] = useState(0);
  const [isTorn, setIsTorn] = useState(false);
  
  const isFinished = daysRemaining <= 0; 
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-300, 0, 300], [-25, 0, 45]); 
  const rotateY = useTransform(x, [-300, 0, 300], [-20, 0, 20]);
  const rotateZ = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  
  const shadowOpacity = useTransform(y, [0, 300], [0, 0.4]);
  const gradientAngle = useTransform(x, [-300, 300], [60, -60]);
  
  const dropShadow = useTransform(
    y,
    [0, 300],
    ['0 20px 40px -10px rgba(0,0,0,0.1)', '0 50px 70px -20px rgba(0,0,0,0.3)']
  );

  const handleDragEnd = (event, info) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    const velocity = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);
    
    if (distance > 100 || velocity > 200) {
      if (navigator.vibrate) navigator.vibrate([40, 30, 40]); // Tear feedback
      setIsTorn(true);
      const throwRight = info.offset.x > 0;
      
      setExitX(info.offset.x + (throwRight ? 300 : -300));
      setExitY(info.offset.y + 1500); 
      setExitRotate(info.offset.x * 0.05 + (throwRight ? 60 : -60));
      
      onTear(); 
    }
  };

  const handleDragStart = () => {
    // Optionally trigger an event to parent
    if (window.hideBubble) window.hideBubble();
  };

  const cardBg = isDarkMode ? 'bg-neutral-900' : 'bg-white';
  const cardBorder = isDarkMode ? 'border-neutral-300' : 'border-neutral-800';
  const textPrimary = isDarkMode ? 'text-neutral-100' : 'text-neutral-800';
  const textSecondary = isDarkMode ? 'text-neutral-400' : 'text-neutral-500';
  const pillBg = isDarkMode ? 'bg-neutral-100' : 'bg-neutral-800';
  const pillText = isDarkMode ? 'text-neutral-900' : 'text-white';
  const pillBgOutline = isDarkMode ? 'bg-neutral-900 border-neutral-300' : 'bg-white border-neutral-800';
  const pillTextOutline = isDarkMode ? 'text-neutral-200' : 'text-neutral-800';

  return (
    <motion.div
      style={{
        zIndex: isTop ? 100 : 100 - index,
        pointerEvents: isTop && !isTorn && !isFinished && !isTearLocked ? 'auto' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        x: isTop ? x : 0,
        y: isTop ? y : 0, 
        rotateX: isTop ? rotateX : 0,
        rotateY: isTop ? rotateY : 0,
        rotateZ: isTop ? rotateZ : 0,
        scale: 1, 
        transformOrigin: 'top center',
        backfaceVisibility: 'hidden'
      }}
      drag={isTop && !isTorn && !isFinished && !isTearLocked}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={1.2} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={isTop && !isTorn ? { x: 0, y: 0, rotate: 0 } : undefined}
      exit={{ 
        x: exitX, 
        y: exitY, 
        rotate: exitRotate,
        opacity: 1,
        scale: 1,
        transition: { duration: 1.2, ease: "easeIn" }
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
      className="absolute flex items-center justify-center inset-0 select-none touch-none"
    >
      <div className="relative pt-4 w-full flex justify-center">
        {/* Removed transition-colors because View Transition handles the visual fade/wipe instantly */}
        <div className={`absolute top-1 left-[15%] w-12 h-4 rounded-t-lg border-t-2 border-l-2 border-r-2 z-10 ${cardBg} ${cardBorder}`} />
        <div className={`absolute top-1 right-[15%] w-12 h-4 rounded-t-lg border-t-2 border-l-2 border-r-2 z-10 ${cardBg} ${cardBorder}`} />
        
        <motion.div 
          className={`w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] rounded-3xl flex flex-col relative overflow-hidden border-2 z-20 ${cardBg} ${cardBorder}`}
          style={{
            boxShadow: isTop ? dropShadow : '0 20px 40px -10px rgba(0,0,0,0.1)',
            backfaceVisibility: 'hidden'
          }}
        >
          {isTop && (
            <motion.div 
              className={`absolute inset-0 pointer-events-none z-50 ${isDarkMode ? 'mix-blend-overlay' : 'mix-blend-multiply'}`}
              style={{
                opacity: shadowOpacity,
                background: `linear-gradient(${gradientAngle.get()}deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.05) 100%)`
              }}
            />
          )}

          {isFinished ? (
            // CELEBRATION UI
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="flex-1 flex flex-col items-center justify-between relative z-10 w-full p-6 text-center overflow-hidden"
            >
              <motion.div className="absolute top-8 left-6 text-yellow-400" animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8], rotate: [0, 90, 180] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                <Sparkles size={24} />
              </motion.div>
              <motion.div className="absolute top-16 right-8 text-yellow-500" animate={{ opacity: [1, 0.2, 1], scale: [1.2, 0.8, 1.2], rotate: [0, -90, -180] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
                <Star size={20} fill="currentColor" />
              </motion.div>
              <motion.div className="absolute bottom-24 left-8 text-yellow-500" animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1], rotate: [0, 45, 90] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}>
                <Star size={16} fill="currentColor" />
              </motion.div>
              <motion.div className="absolute bottom-32 right-6 text-yellow-400" animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.4, 0.9], rotate: [0, -45, -90] }} transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}>
                <Sparkles size={28} />
              </motion.div>

              <div className="flex flex-col items-center gap-1 w-full mt-4 z-10">
                <h1 className={`text-2xl sm:text-3xl font-black leading-none ${textPrimary}`}>
                  CONGRATS!
                </h1>
                <p className={`font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mt-1 ${textSecondary}`}>
                  You successfully reached
                </p>
              </div>

              <motion.div className="flex flex-col items-center justify-center w-full my-auto z-10" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                <h1 className={`text-[2.5rem] sm:text-[3rem] font-black leading-[1] tracking-tighter ${textPrimary}`}>
                  HAPPY<br/>NEW YEAR
                </h1>
                <motion.span className="text-4xl sm:text-5xl font-black text-yellow-500 mt-2 tracking-widest drop-shadow-md" animate={{ color: ['#eab308', '#f59e0b', '#eab308'] }} transition={{ repeat: Infinity, duration: 2 }}>
                  2027
                </motion.span>
              </motion.div>
              
              <motion.div className={`mb-2 px-6 py-3 rounded-full flex items-center gap-2 shadow-lg z-10 ${pillBg}`} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                <PartyPopper size={16} className={isDarkMode ? 'text-neutral-900' : 'text-yellow-400'} />
                <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase ${pillText}`}>
                  Journey Complete
                </span>
              </motion.div>
            </motion.div>
          ) : (
            // COUNTDOWN UI
            <>
              <div className="pt-8 sm:pt-10 px-8 flex flex-col items-center w-full z-10 relative">
                <h2 className={`text-lg sm:text-xl font-black tracking-widest uppercase ${textPrimary}`}>
                  {dateText}
                </h2>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mt-2">
                <div className="w-full flex justify-start pl-8 z-20 mb-[-1rem]">
                  <span className={`font-bold text-xs sm:text-sm tracking-widest uppercase ${textSecondary}`}>
                    Today
                  </span>
                </div>
                
                <h1 className={`text-[7.5rem] sm:text-[9.5rem] font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                  {daysRemaining}
                </h1>
                
                <div className="w-full flex justify-end pr-8 z-20 mt-[-1rem]">
                  <span className={`font-bold text-lg sm:text-xl italic ${textSecondary}`}>
                    th day
                  </span>
                </div>
              </div>
              
              <div className="pb-6 sm:pb-8 flex justify-center w-full z-10 relative">
                <div className={`px-6 py-2 rounded-full border-2 ${pillBgOutline}`}>
                  <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase ${pillTextOutline}`}>
                    To reach 2027
                  </span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

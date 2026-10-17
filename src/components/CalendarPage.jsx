import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, Star, Share2, Rocket, Gift } from 'lucide-react';
import GandhiPic from './GandhiPic';
import ConfettiBurst from './ConfettiBurst';
import BirthdayLogo from './BirthdayLogo';
import AyudhaPoojaArt from './AyudhaPoojaArt';
import MagicalCornerStar from './MagicalCornerStar';
import { incrementGlobalWish, isWishAllowed } from '../utils/wishesService';

export default function CalendarPage({ dateText, daysRemaining, index, onTear, onEyeClick, isTop, isDarkMode, isTearLocked, isGandhiJayanti, isBirthday, onBirthdaySecret, isDiwali, forceDiwaliMode, diwaliPhase, diwaliRevealed, onCalendarReveal, diwaliPhoto, hasGandhiKey, hasCornerStar, onStarClick, shouldAnimateStarFlight, onDevTap, onDevHoldStart, onDevHoldEnd, onShareSpecialCard, globalLang, isSharedCardView, forceShowShareHint, isAyudhaPooja }) {
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);
  const [exitRotate, setExitRotate] = useState(0);
  const [isTorn, setIsTorn] = useState(false);
  const [startFinaleLoop, setStartFinaleLoop] = useState(false);

  // Special card share hint & sparkle indicator
  const [hasDismissedShareHint, setHasDismissedShareHint] = useState(() => {
    return localStorage.getItem('has_seen_special_share_hint') === 'true';
  });
  const [showShareIntroHint, setShowShareIntroHint] = useState(false);

  useEffect(() => {
    if (diwaliPhase === 1) {
      const timer = setTimeout(() => setStartFinaleLoop(true), 2300); // Launches at 2.3s (original timing requested by user)
      return () => clearTimeout(timer);
    }
  }, [diwaliPhase]);
  
  const isFinished = daysRemaining <= 0;
  const isDiwaliActive = isDiwali || forceDiwaliMode; 
  const isSpecialRevealed = isTop && (isBirthday || isGandhiJayanti || isAyudhaPooja || (isDiwaliActive && diwaliRevealed));

  // Show intro hint & sparkle:
  // - In shared card view: Exactly when forceShowShareHint becomes true (synced with Start Countdown 2027)
  // - In normal calendar view: exactly 5 seconds (5000ms) after Diwali card reveal
  useEffect(() => {
    if (isSpecialRevealed && onShareSpecialCard && !hasDismissedShareHint) {
      if (isSharedCardView) {
        if (forceShowShareHint) {
          setShowShareIntroHint(true);
        } else {
          setShowShareIntroHint(false);
        }
      } else {
        const delayMs = (isDiwaliActive || isAyudhaPooja) ? 5000 : 1200;
        const t1 = setTimeout(() => {
          setShowShareIntroHint(true);
        }, delayMs);
        return () => clearTimeout(t1);
      }
    }
  }, [isSpecialRevealed, onShareSpecialCard, hasDismissedShareHint, isDiwaliActive, isAyudhaPooja, isSharedCardView, forceShowShareHint]);

  const handleShareTap = () => {
    if (!hasDismissedShareHint) {
      localStorage.setItem('has_seen_special_share_hint', 'true');
      setHasDismissedShareHint(true);
    }
    setShowShareIntroHint(false);
    if (onShareSpecialCard) {
      onShareSpecialCard();
    }
  };
  
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
      const canTear = onTear(); 
      if (canTear === false) return; // Prevent tearing visually if blocked

      // If user tears the Birthday page on Oct 14 without tapping, automatically count it as a wish
      // Strictly disabled during onboarding tutorial and on any date before Oct 14!
      if (isBirthday && !isTearLocked && isWishAllowed()) {
        const alreadyWished = localStorage.getItem('sughanthan_bday_wished') === 'true';
        if (!alreadyWished) {
          localStorage.setItem('sughanthan_bday_wished', 'true');
          const currentCount = parseInt(localStorage.getItem('sughanthan_bday_wishes_count') || '0', 10);
          localStorage.setItem('sughanthan_bday_wishes_count', (currentCount + 1).toString());
          window.dispatchEvent(new CustomEvent('tear_wished_sughanthan_bday'));
          incrementGlobalWish();
        }
      }

      if (navigator.vibrate) navigator.vibrate([40, 30, 40]); // Tear feedback
      setIsTorn(true);
      const throwRight = info.offset.x > 0;
      
      setExitX(info.offset.x + (throwRight ? 300 : -300));
      setExitY(info.offset.y + 1500); 
      setExitRotate(info.offset.x * 0.05 + (throwRight ? 60 : -60));
    }
  };

  const handleDragStart = () => {
    // Optionally trigger an event to parent
    if (window.hideBubble) window.hideBubble();
  };

  const effectiveDarkMode = isDarkMode || isDiwaliActive;
  
  const cardBg = effectiveDarkMode ? 'bg-neutral-900' : 'bg-white';
  const cardBorder = effectiveDarkMode ? 'border-neutral-300' : 'border-neutral-800';
  const textPrimary = effectiveDarkMode ? 'text-neutral-100' : 'text-neutral-800';
  const textSecondary = effectiveDarkMode ? 'text-neutral-400' : 'text-neutral-500';
  const pillBg = effectiveDarkMode ? 'bg-neutral-100' : 'bg-neutral-800';
  const pillText = effectiveDarkMode ? 'text-neutral-900' : 'text-white';
  const pillBgOutline = effectiveDarkMode ? 'bg-neutral-900 border-neutral-300' : 'bg-white border-neutral-800';
  const pillTextOutline = effectiveDarkMode ? 'text-neutral-200' : 'text-neutral-800';

  const isFirstOutExploded = diwaliRevealed;

  return (
    <motion.div
      style={{
        zIndex: (isTop && diwaliPhase >= 1) ? 1000 : (isTop ? 100 : 100 - index),
        opacity: (!isTop && diwaliPhase >= 1 && !diwaliRevealed) ? 0 : 1,
        pointerEvents: isTop && !isTorn && !isFinished ? 'auto' : 'none',
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
        <div className={`absolute top-1 left-[15%] ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'} w-12 h-4 rounded-t-lg border-t-2 border-l-2 border-r-2 z-10 ${cardBg} ${cardBorder}`} />
        <div className={`absolute top-1 right-[15%] ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'} w-12 h-4 rounded-t-lg border-t-2 border-l-2 border-r-2 z-10 ${cardBg} ${cardBorder}`} />
        
        {isTop && hasCornerStar && (
          <div className="w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] absolute top-4 pointer-events-none z-30">
            <MagicalCornerStar 
              onStarClick={onStarClick} 
              shouldAnimateFlight={shouldAnimateStarFlight} 
            />
          </div>
        )}

        {/* Share Hint Tooltip - Floating ABOVE the calendar card so it never blocks greetings or fireworks */}
        {isSpecialRevealed && onShareSpecialCard && (
          <AnimatePresence>
            {showShareIntroHint && (
              <div className="w-[85vw] max-w-[340px] absolute -top-12 z-50 flex justify-end pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShareTap();
                  }}
                  className={`relative max-w-[220px] px-3.5 py-2.5 rounded-2xl text-[11px] leading-snug font-semibold shadow-2xl border cursor-pointer pointer-events-auto select-none ${
                    effectiveDarkMode
                      ? 'bg-neutral-900/95 text-neutral-100 border-neutral-700 shadow-black/60'
                      : 'bg-white/95 text-neutral-900 border-neutral-300 shadow-neutral-400/50'
                  }`}
                >
                  <span>
                    {(globalLang || localStorage.getItem('globalLang')) === 'english'
                      ? "Tap here to share your wish with others ✨"
                      : "Unga wish-a mathavangalukku share panna inga tap pannunga! ✨"}
                  </span>
                  {/* Downward pointing arrow right above the top-right corner star */}
                  <div className={`absolute -bottom-1.5 right-4 w-3 h-3 rotate-45 border-b border-r ${
                    effectiveDarkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-300'
                  }`} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        )}

        <motion.div 
          className={`w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] rounded-3xl flex flex-col relative overflow-hidden border-2 z-20 ${diwaliPhase === 1 ? 'border-transparent bg-transparent shadow-none' : `${cardBg} ${cardBorder} transition-all duration-1000`}`}
          style={{
            boxShadow: isTop ? (diwaliPhase === 1 ? 'none' : dropShadow) : '0 20px 40px -10px rgba(0,0,0,0.1)',
            backfaceVisibility: 'hidden'
          }}
        >
          {isTop && (
            <motion.div 
              className={`absolute inset-0 pointer-events-none z-50 ${effectiveDarkMode ? 'mix-blend-overlay' : 'mix-blend-multiply'}`}
              style={{
                opacity: shadowOpacity,
                background: `linear-gradient(${gradientAngle.get()}deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.05) 100%)`
              }}
            />
          )}

          {/* Special Cards Hidden Share Trigger inside card */}
          {isSpecialRevealed && onShareSpecialCard && (
            <>
              {/* Invisible Top-Right Hitbox: Tap to share anytime */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareTap();
                }}
                className="absolute top-0 right-0 w-20 h-20 z-40 cursor-pointer pointer-events-auto flex items-start justify-end p-3.5"
                title="Tap to share your wish"
              >
                {/* Exactly like Gandhi's eye twinkling star with smooth synchronized entry */}
                <AnimatePresence>
                  {showShareIntroHint && (
                    <motion.div
                      key="share-hint-star"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[#f7d13d] pointer-events-none mt-1 mr-1"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(247,209,61,0.9))' }}
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.25, 0.9, 1.2, 1],
                          rotate: [0, 90, 180, 270, 360],
                          opacity: [1, 0.85, 1, 0.85, 1]
                        }} 
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 0 C 10 8, 12 10, 20 10 C 12 10, 10 12, 10 20 C 10 12, 8 10, 0 10 C 8 10, 10 8, 10 0 Z" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
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
                <PartyPopper size={16} className={effectiveDarkMode ? 'text-neutral-900' : 'text-yellow-400'} />
                <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase ${pillText}`}>
                  Journey Complete
                </span>
              </motion.div>
            </motion.div>
          ) : isGandhiJayanti ? (
              <>
                <div className={`pt-6 sm:pt-8 px-8 flex flex-col items-center w-full z-10 relative ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                  <h2 className={`text-lg sm:text-xl font-black tracking-widest uppercase ${textPrimary}`}>
                    {dateText}
                  </h2>
                  <motion.h3 
                     initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
                     className="text-[#f7d13d] font-black text-xs sm:text-sm tracking-widest uppercase mt-2 drop-shadow-sm text-center"
                  >
                    Happy Gandhi Jayanti
                  </motion.h3>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mt-4">
                  <GandhiPic isDarkMode={effectiveDarkMode} onEyeClick={onEyeClick} hasKey={hasGandhiKey} />
                </div>
                
                <div className={`pb-6 sm:pb-8 flex flex-col items-center justify-center w-full z-10 relative gap-0 ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                  <div className="flex items-baseline gap-1">
                    <h1 className={`text-5xl sm:text-6xl font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                      {daysRemaining}
                    </h1>
                    <span className={`font-bold text-sm sm:text-base italic ${textSecondary}`}>
                      th day
                    </span>
                  </div>
                  <div 
                    className={`px-5 py-1.5 rounded-full border-2 mt-3 cursor-default select-none ${pillBgOutline}`}
                    onClick={(e) => { e.stopPropagation(); if (onDevTap) onDevTap(); }}
                    onPointerDown={(e) => { e.stopPropagation(); if (onDevHoldStart) onDevHoldStart(); }}
                    onPointerUp={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                    onPointerLeave={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                  >
                    <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase ${pillTextOutline}`}>
                      To reach 2027
                    </span>
                  </div>
                </div>
              </>
            ) : isBirthday ? (
              <>
                <div className={`pt-4 sm:pt-6 px-8 flex flex-col items-center w-full z-10 relative ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                  <h2 className={`text-lg sm:text-xl font-black tracking-widest uppercase ${textPrimary}`}>
                    {dateText}
                  </h2>
                  <motion.h3 
                     initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                     className="text-amber-500 dark:text-amber-400 font-bold text-xs sm:text-sm tracking-wider mt-1 drop-shadow-sm text-center flex items-center gap-1.5"
                  >
                    <span>Hey, It's My Birthday! 🎂</span>
                  </motion.h3>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
                  <BirthdayLogo isDarkMode={effectiveDarkMode} onSecretTrigger={onBirthdaySecret} isTop={isTop} />
                </div>
                
                <div className={`pb-6 sm:pb-8 flex flex-col items-center justify-center w-full z-10 relative gap-0 ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                  <div className="flex items-baseline gap-1">
                    <h1 className={`text-5xl sm:text-6xl font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                      {daysRemaining}
                    </h1>
                    <span className={`font-bold text-sm sm:text-base italic ${textSecondary}`}>
                      th day
                    </span>
                  </div>
                  <div 
                    className={`px-5 py-1.5 rounded-full border-2 mt-3 cursor-default select-none ${pillBgOutline}`}
                    onClick={(e) => { e.stopPropagation(); if (onDevTap) onDevTap(); }}
                    onPointerDown={(e) => { e.stopPropagation(); if (onDevHoldStart) onDevHoldStart(); }}
                    onPointerUp={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                    onPointerLeave={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                  >
                    <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase ${pillTextOutline}`}>
                      To reach 2027
                    </span>
                  </div>
                </div>
              </>
            ) : isAyudhaPooja ? (
              <>
                <div className="pt-5 sm:pt-7 px-8 flex flex-col items-center w-full z-10 relative">
                  <h2 className={`text-lg sm:text-xl font-black tracking-widest uppercase ${textPrimary}`}>
                    {dateText}
                  </h2>
                  <motion.h3 
                     initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                     className="text-amber-500 font-black text-xs sm:text-sm tracking-widest uppercase mt-1.5 drop-shadow-sm text-center"
                  >
                    Happy Ayudha Pooja
                  </motion.h3>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
                  <AyudhaPoojaArt isDarkMode={effectiveDarkMode} />
                </div>
                
                <div className="pb-6 sm:pb-8 flex flex-col items-center justify-center w-full z-10 relative gap-0">
                  <div className="flex items-baseline gap-1">
                    <h1 className={`text-5xl sm:text-6xl font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                      {daysRemaining}
                    </h1>
                    <span className={`font-bold text-sm sm:text-base italic ${textSecondary}`}>
                      th day
                    </span>
                  </div>
                  <div 
                    className={`px-5 py-1.5 rounded-full border-2 mt-3 cursor-default select-none ${pillBgOutline}`}
                    onClick={(e) => { e.stopPropagation(); if (onDevTap) onDevTap(); }}
                    onPointerDown={(e) => { e.stopPropagation(); if (onDevHoldStart) onDevHoldStart(); }}
                    onPointerUp={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                    onPointerLeave={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                  >
                    <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase ${pillTextOutline}`}>
                      To reach 2027
                    </span>
                  </div>
                </div>
              </>
            ) : isDiwaliActive ? (
              <>
                {/* Background Fireworks spanning the entire card natively! */}
                <div className={`absolute inset-0 z-0 overflow-hidden rounded-3xl ${effectiveDarkMode ? 'opacity-100' : 'opacity-80'}`} style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', isolation: 'isolate' }}>
                  <ConfettiBurst active={diwaliRevealed || startFinaleLoop} origin={{ y: 0.5, x: 0.5 }} loop={true} skipInitial={!startFinaleLoop} onFirstBurst={onCalendarReveal} />
                </div>

                <div className={`pt-6 sm:pt-8 px-8 flex flex-col items-center w-full z-10 relative ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                  <h2 className={`text-lg sm:text-xl font-black tracking-widest uppercase ${textPrimary}`}>
                    {dateText}
                  </h2>
                </div>

                <div className={`flex-1 flex flex-col items-center justify-center relative z-30 w-full mt-[-20px] transition-opacity duration-1000 opacity-100`}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={diwaliPhase === 1 ? { duration: 1.0, delay: 0.1, ease: "easeOut" } : { duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <h3 
                       className="font-black text-4xl sm:text-5xl tracking-widest uppercase text-center leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400"
                       style={{ 
                         filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.85)) drop-shadow(0 4px 10px rgba(0,0,0,0.7))',
                         WebkitTextStroke: '1px rgba(184,115,51,0.5)' 
                       }}
                    >
                      Happy<br/>Diwali
                    </h3>
                    <span 
                      className="mt-3 font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase text-yellow-300"
                      style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.85))' }}
                    >
                      To you & your family
                    </span>
                  </motion.div>
                </div>
                
                <div className={`pb-6 sm:pb-8 flex flex-col items-center justify-center w-full z-10 relative gap-0 ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                  <div className="flex items-baseline gap-1">
                    <h1 className={`text-5xl sm:text-6xl font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                      {daysRemaining}
                    </h1>
                    <span className={`font-bold text-sm sm:text-base italic ${textSecondary}`}>
                      th day
                    </span>
                  </div>
                  <div 
                    className={`px-5 py-1.5 rounded-full border-2 mt-3 cursor-default select-none ${pillBgOutline}`}
                    onClick={(e) => { e.stopPropagation(); if (onDevTap) onDevTap(); }}
                    onPointerDown={(e) => { e.stopPropagation(); if (onDevHoldStart) onDevHoldStart(); }}
                    onPointerUp={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                    onPointerLeave={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                  >
                    <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase ${pillTextOutline}`}>
                      To reach 2027
                    </span>
                  </div>
                </div>
              </>
            ) : (
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
                  <div 
                    className={`px-6 py-2 rounded-full border-2 cursor-default select-none ${pillBgOutline}`}
                    onClick={(e) => { e.stopPropagation(); if (onDevTap) onDevTap(); }}
                    onPointerDown={(e) => { e.stopPropagation(); if (onDevHoldStart) onDevHoldStart(); }}
                    onPointerUp={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                    onPointerLeave={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                  >
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

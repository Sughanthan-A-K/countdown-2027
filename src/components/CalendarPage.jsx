import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, Star, Share2, Rocket, Gift } from 'lucide-react';
import GandhiPic from './GandhiPic';
import ConfettiBurst from './ConfettiBurst';
import BirthdayLogo from './BirthdayLogo';
import AyudhaPoojaArt from './AyudhaPoojaArt';
import AyudhaPoojaCard from './AyudhaPoojaCard';
import VijayadashamiCard from './VijayadashamiCard';
import MagicalCornerStar from './MagicalCornerStar';
import DiwaliRocketUI from './DiwaliRocketUI';
import LokiTimelineCrack from './LokiTimelineCrack';
import LokiTimelinePortal from './LokiTimelinePortal';
import LokiMindStoneShatter from './LokiMindStoneShatter';
import { incrementGlobalWish, isWishAllowed } from '../utils/wishesService';

export default function CalendarPage({ dateText, daysRemaining, index, onTear, onEyeClick, isTop, isDarkMode, isTearLocked, isGandhiJayanti, isBirthday, onBirthdaySecret, isDiwali, forceDiwaliMode, diwaliPhase, diwaliRevealed, onCalendarReveal, diwaliPhoto, hasGandhiKey, hasCornerStar, onStarClick, shouldAnimateStarFlight, onDevTap, onDevHoldStart, onDevHoldEnd, onShareSpecialCard, globalLang, isSharedCardView, forceShowShareHint, isAyudhaPooja, isVijayadashami, onCtaReady, isDec16Blocked, lokiCrackStage = 0, onLokiCardTap, isDec16UnderlyingHidden, activeBeams = null, beamTransforms = null, circleRadius = 98, previewAllBeams = false }) {
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
  const [showReturningShareTwinkle, setShowReturningShareTwinkle] = useState(false);
  const [isDiwaliRocketFlying, setIsDiwaliRocketFlying] = useState(false);
  const [showDiwaliRocketAmbient, setShowDiwaliRocketAmbient] = useState(false);
  const [ayudhaPoojaPhase, setAyudhaPoojaPhase] = useState(() => {
    const isDev = localStorage.getItem('isDevMode') === 'true';
    return (!isDev && localStorage.getItem('ayudhaPoojaEventDone_2026') === 'true') ? 4 : 0;
  });
  const [vijayadashamiPhase, setVijayadashamiPhase] = useState(() => {
    const isDev = localStorage.getItem('isDevMode') === 'true';
    return (!isDev && localStorage.getItem('vijayadashamiEventDone_2026') === 'true') ? 4 : 0;
  });

  useEffect(() => {
    if (diwaliPhase === 1) {
      const timer = setTimeout(() => setStartFinaleLoop(true), 2300); // Launches at 2.3s (original timing requested by user)
      return () => clearTimeout(timer);
    }
  }, [diwaliPhase]);
  
  const isFinished = daysRemaining <= 0;
  const isDiwaliActive = isDiwali || forceDiwaliMode; 
  const isSpecialRevealed = isTop && (isBirthday || isGandhiJayanti || isAyudhaPooja || isVijayadashami || (isDiwaliActive && diwaliRevealed));

  // Show intro hint & sparkle:
  // - In shared card view: Exactly when forceShowShareHint becomes true (synced with Start Countdown 2027)
  // - In normal calendar view: exactly when 5 Outs burst (or triggered dynamically by Ayudha Pooja / Vijayadashami)
  useEffect(() => {
    if (isSpecialRevealed && onShareSpecialCard && !hasDismissedShareHint) {
      if (isSharedCardView) {
        if (forceShowShareHint) {
          setShowShareIntroHint(true);
        } else {
          setShowShareIntroHint(false);
        }
      } else if (isVijayadashami) {
        // For Vijayadashami: Tooltip is strictly triggered by onTriggerShareStar after wish video completely finishes + 1s delay
      } else if (isDiwaliActive) {
        // For Diwali: strictly triggered after 5 Outs burst callback
      } else if (!isAyudhaPooja) {
        const t1 = setTimeout(() => {
          setShowShareIntroHint(true);
        }, 1200);
        return () => clearTimeout(t1);
      }
    }
  }, [isSpecialRevealed, onShareSpecialCard, hasDismissedShareHint, isDiwaliActive, isAyudhaPooja, isVijayadashami, vijayadashamiPhase, isSharedCardView, forceShowShareHint]);

  const handleShareTap = () => {
    if (isDiwaliActive) {
      if (isDiwaliRocketFlying) return; // Prevent double trigger while rocket is swooshing
      setIsDiwaliRocketFlying(true);
      if (!hasDismissedShareHint) {
        localStorage.setItem('has_seen_special_share_hint', 'true');
        setHasDismissedShareHint(true);
      }
      setShowShareIntroHint(false);

      // 3D Rocket flight takes ~1.3s to loop & blast out of screen, then open Share!
      setTimeout(() => {
        setIsDiwaliRocketFlying(false);
        if (onShareSpecialCard) {
          onShareSpecialCard();
        }
      }, 1300);
      return;
    }

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
  
  // Start normal original calendar (white in Light Mode / dark in Dark Mode).
  // Once the Saraswathi or Vijayadashami wish video drops (phase 4), seamlessly and invisibly transition to matching tone!
  const isAyudhaWishActive = isAyudhaPooja && ayudhaPoojaPhase === 4;
  const isVijayadashamiWishActive = isVijayadashami && vijayadashamiPhase === 4;
  const isSpecialWishActive = isAyudhaWishActive || isVijayadashamiWishActive;

  const cardBg = isSpecialWishActive
    ? (isVijayadashamiWishActive
        ? (effectiveDarkMode ? 'bg-[#181818]' : 'bg-[#e6decc]')
        : (effectiveDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#e4dbce]'))
    : (effectiveDarkMode ? 'bg-neutral-900' : 'bg-white');
  const cardBorder = isSpecialWishActive
    ? (effectiveDarkMode ? 'border-amber-900/60' : 'border-amber-700/30')
    : (effectiveDarkMode ? 'border-neutral-300' : 'border-neutral-800');
  const textPrimary = isSpecialWishActive
    ? (effectiveDarkMode ? 'text-amber-100' : 'text-[#3d2e1e]')
    : (effectiveDarkMode ? 'text-neutral-100' : 'text-neutral-800');
  const textSecondary = isSpecialWishActive
    ? (effectiveDarkMode ? 'text-amber-300/70' : 'text-[#7d654c]')
    : (effectiveDarkMode ? 'text-neutral-400' : 'text-neutral-500');
  const pillBg = effectiveDarkMode ? 'bg-neutral-100' : 'bg-neutral-800';
  const pillText = effectiveDarkMode ? 'text-neutral-900' : 'text-white';
  const pillBgOutline = isSpecialWishActive
    ? (isVijayadashamiWishActive
        ? (effectiveDarkMode ? 'bg-[#181818] border-amber-800/60' : 'bg-[#e6decc] border-amber-800/40')
        : (effectiveDarkMode ? 'bg-[#0f0f0f] border-amber-800/60' : 'bg-[#f0e8dc] border-amber-800/40'))
    : (effectiveDarkMode ? 'bg-neutral-900 border-neutral-300' : 'bg-white border-neutral-800');
  const pillTextOutline = isSpecialWishActive
    ? (effectiveDarkMode ? 'text-amber-200' : 'text-[#4a3b2c]')
    : (effectiveDarkMode ? 'text-neutral-200' : 'text-neutral-800');

  const isFirstOutExploded = diwaliRevealed;

  return (
    <motion.div
      style={{
        zIndex: (isTop && diwaliPhase >= 1) ? 1000 : (isTop ? 100 : 100 - index),
        opacity: (isDec16UnderlyingHidden) ? 0 : ((!isTop && diwaliPhase >= 1 && !diwaliRevealed) ? 0 : 1),
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
      drag={isTop && !isTorn && !isFinished && !isTearLocked && !isDec16Blocked}
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
        {/* Top binder rings / anchor tabs */}
        {!(isTop && isDec16Blocked && lokiCrackStage >= 5) && (
          <>
            <div className={`absolute top-1 left-[15%] ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'} w-12 h-4 rounded-t-lg border-t-2 border-l-2 border-r-2 z-10 transition-colors duration-500 ${
              isDec16Blocked && lokiCrackStage >= 3 ? 'border-emerald-400 bg-neutral-900 shadow-[0_-2px_14px_rgba(16,185,129,0.75)]' :
              (isDec16Blocked && lokiCrackStage === 2 ? 'border-emerald-500/80 bg-neutral-900 shadow-[0_-2px_8px_rgba(16,185,129,0.45)]' :
              (isDec16Blocked && lokiCrackStage === 1 ? 'border-emerald-600/60 bg-neutral-900 shadow-[0_-1px_5px_rgba(16,185,129,0.3)]' :
              `${cardBg} ${cardBorder}`))
            }`} />
            <div className={`absolute top-1 right-[15%] ${diwaliPhase === 1 ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'} w-12 h-4 rounded-t-lg border-t-2 border-l-2 border-r-2 z-10 transition-colors duration-500 ${
              isDec16Blocked && lokiCrackStage >= 3 ? 'border-emerald-400 bg-neutral-900 shadow-[0_-2px_14px_rgba(16,185,129,0.75)]' :
              (isDec16Blocked && lokiCrackStage === 2 ? 'border-emerald-500/80 bg-neutral-900 shadow-[0_-2px_8px_rgba(16,185,129,0.45)]' :
              (isDec16Blocked && lokiCrackStage === 1 ? 'border-emerald-600/60 bg-neutral-900 shadow-[0_-1px_5px_rgba(16,185,129,0.3)]' :
              `${cardBg} ${cardBorder}`))
            }`} />
          </>
        )}
        
        {isTop && hasCornerStar && (
          <div className="w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] absolute top-4 pointer-events-none z-30">
            <MagicalCornerStar 
              onStarClick={onStarClick} 
              shouldAnimateFlight={shouldAnimateStarFlight} 
            />
          </div>
        )}

        {/* Share Hint Tooltip - Floating ABOVE the calendar card and top buttons so it never gets obscured */}
        {isSpecialRevealed && onShareSpecialCard && (
          <AnimatePresence>
            {showShareIntroHint && (
              <div className="w-[85vw] max-w-[340px] absolute -top-16 z-[100] flex justify-end pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShareTap();
                  }}
                  className={`relative max-w-[240px] px-3.5 py-2.5 rounded-2xl text-[11px] leading-snug font-semibold shadow-2xl border cursor-pointer pointer-events-auto select-none ${
                    effectiveDarkMode
                      ? 'bg-neutral-900/95 text-neutral-100 border-neutral-700 shadow-black/80'
                      : 'bg-white/95 text-neutral-900 border-neutral-300 shadow-neutral-500/50'
                  }`}
                >
                  <span>
                    {(globalLang || localStorage.getItem('globalLang')) === 'english' ? (
                      <>Tap this <span className="text-amber-500 dark:text-amber-400 font-bold underline decoration-amber-400/50 underline-offset-2">invisible button</span> here to share this card! ✨</>
                    ) : (
                      <>Intha card-a share panna intha <span className="text-amber-500 dark:text-amber-400 font-bold underline decoration-amber-400/50 underline-offset-2">invisible button-a</span> tap pannunga! ✨</>
                    )}
                  </span>
                  {/* Downward pointing arrow right above the top-right corner invisible button */}
                  <div className={`absolute -bottom-1.5 right-4 w-3 h-3 rotate-45 border-b border-r ${
                    effectiveDarkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-300'
                  }`} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        )}

        {/* Loki / Wanda Mind Stone Explosive Glass Shatter Effect (Stage 5) */}
        {isTop && isDec16Blocked && lokiCrackStage >= 5 && (
          <LokiMindStoneShatter />
        )}

        <motion.div 
          onClick={(e) => {
            if (isTop && isDec16Blocked && onLokiCardTap) {
              onLokiCardTap();
            }
          }}
          animate={
            isTop && isDec16Blocked && lokiCrackStage >= 5 ? {
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.1 } // Instantly disappears as it shatters into pieces
            } : {
              opacity: 1,
              scale: 1
            }
          }
          className={`w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] rounded-3xl flex flex-col relative overflow-visible border-2 z-20 ${
            isDec16Blocked && lokiCrackStage >= 3 ? 'bg-black/90 border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all duration-700' :
            (isDec16Blocked && lokiCrackStage === 2 ? 'bg-neutral-900/90 border-emerald-500/70 shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-500' :
            (isDec16Blocked && lokiCrackStage === 1 ? 'border-emerald-600/50 transition-all duration-500' :
            (diwaliPhase === 1 ? 'border-transparent bg-transparent shadow-none' : `${cardBg} ${cardBorder} transition-all duration-500`)))
          }`}
          style={{
            boxShadow: isTop ? (diwaliPhase === 1 ? 'none' : (isDec16Blocked && lokiCrackStage >= 3 ? '0 0 60px rgba(16,185,129,0.55)' : (isDec16Blocked && lokiCrackStage === 2 ? '0 0 30px rgba(16,185,129,0.35)' : dropShadow))) : '0 20px 40px -10px rgba(0,0,0,0.1)',
            backfaceVisibility: 'hidden',
            display: isTop && isDec16Blocked && lokiCrackStage >= 5 ? 'none' : 'flex'
          }}
        >
          {/* Dec 16 Loki Multiverse Crack (Progressive Tap Stages 1 to 4 or Preview Mode) */}
          {isTop && isDec16Blocked && (lokiCrackStage > 0 || previewAllBeams) && (
            <LokiTimelineCrack 
              crackStage={lokiCrackStage} 
              activeBeams={activeBeams}
              beamTransforms={beamTransforms}
              circleRadius={circleRadius}
              previewAllBeams={previewAllBeams}
            />
          )}
          {isTop && !isAyudhaWishActive && (
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
                {/* Modern subtle dashed beacon ripple pointing to the invisible hitbox (replaces star) */}
                <AnimatePresence>
                  {showShareIntroHint && (
                    <motion.div
                      key="share-hint-beacon"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative w-10 h-10 flex items-center justify-center pointer-events-none"
                    >
                      {/* Outer expanding ripple ring */}
                      <motion.div
                        animate={{ 
                          scale: [0.8, 1.8],
                          opacity: [0.9, 0]
                        }}
                        transition={{ 
                          duration: 1.8, 
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                        className={`absolute inset-0 rounded-full border-2 border-dashed ${
                          effectiveDarkMode ? 'border-amber-400' : 'border-amber-500'
                        }`}
                      />

                      {/* Middle pulsing glow ring */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 1.8, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className={`absolute w-7 h-7 rounded-full border border-amber-400/80 ${
                          effectiveDarkMode ? 'bg-amber-400/10' : 'bg-amber-500/10'
                        } backdrop-blur-[1px]`}
                        style={{ filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.6))' }}
                      />

                      {/* Central pulsing target dot */}
                      <motion.div
                        animate={{ 
                          scale: [0.9, 1.25, 0.9],
                          opacity: [0.85, 1, 0.85]
                        }}
                        transition={{ 
                          duration: 1.2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                      />
                    </motion.div>
                  )}

                  {/* Diwali Rocket 3D (Replaces star twinkle for Diwali card) */}
                  {isDiwaliActive && (
                    <DiwaliRocketUI 
                      isFlying={isDiwaliRocketFlying} 
                      isAmbient={showDiwaliRocketAmbient} 
                    />
                  )}

                  {/* Returning users who already tapped/dismissed share tooltip: graceful subtle vector golden star twinkle (for non-Diwali cards) */}
                  {!isDiwaliActive && showReturningShareTwinkle && !showShareIntroHint && (
                    <motion.div
                      key="returning-share-twinkle-star"
                      initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0.4, 1, 0],
                        scale: [0.3, 1.3, 0.85, 1.35, 0.2],
                        rotate: [0, 45, 90, 135, 180]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        duration: 2.8, 
                        times: [0, 0.25, 0.5, 0.75, 1],
                        ease: "easeInOut" 
                      }}
                      className="relative w-8 h-8 flex items-center justify-center pointer-events-none"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,1)]">
                        <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                      </svg>
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
                <div className="pt-4 sm:pt-6 px-8 flex flex-col items-center w-full z-10 relative">
                  <h2 className={`text-lg sm:text-xl font-black tracking-widest uppercase ${textPrimary}`}>
                    {dateText}
                  </h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full overflow-hidden">
                  <AyudhaPoojaCard
                    isTop={isTop}
                    isDarkMode={effectiveDarkMode}
                    daysRemaining={daysRemaining}
                    textPrimary={textPrimary}
                    textSecondary={textSecondary}
                    onShareSpecialCard={onShareSpecialCard}
                    onPhaseChange={(p) => setAyudhaPoojaPhase(p)}
                    onTriggerShareStar={() => {
                      if (onCtaReady) {
                        onCtaReady();
                      }
                      if (!hasDismissedShareHint || isSharedCardView) {
                        setShowShareIntroHint(true);
                      } else {
                        // Already dismissed tooltip users: show graceful twinkle star at invisible share button
                        setShowReturningShareTwinkle(true);
                        setTimeout(() => {
                          setShowReturningShareTwinkle(false);
                        }, 3500); // twinkle once then fade out
                      }
                    }}
                  />
                </div>
                
                <div className="pb-6 sm:pb-8 flex flex-col items-center justify-center w-full z-10 relative gap-0">
                  <div 
                    className={`px-5 py-1.5 rounded-full border-2 mt-2 cursor-default select-none ${pillBgOutline}`}
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
            ) : isVijayadashami ? (
              <>
                <div className="pt-4 sm:pt-6 px-8 flex flex-col items-center w-full z-10 relative">
                  <h2 className={`text-lg sm:text-xl font-black tracking-widest uppercase ${textPrimary}`}>
                    {dateText}
                  </h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full overflow-hidden">
                  <VijayadashamiCard
                    isTop={isTop}
                    isDarkMode={effectiveDarkMode}
                    daysRemaining={daysRemaining}
                    textPrimary={textPrimary}
                    textSecondary={textSecondary}
                    onShareSpecialCard={onShareSpecialCard}
                    onPhaseChange={(p) => setVijayadashamiPhase(p)}
                    onTriggerShareStar={() => {
                      if (onCtaReady) {
                        onCtaReady();
                      }
                      if (!hasDismissedShareHint || isSharedCardView) {
                        setShowShareIntroHint(true);
                      } else {
                        // Already dismissed tooltip users: show graceful twinkle star at invisible share button
                        setShowReturningShareTwinkle(true);
                        setTimeout(() => {
                          setShowReturningShareTwinkle(false);
                        }, 3500); // twinkle once then fade out
                      }
                    }}
                  />
                </div>
                
                <div className="pb-6 sm:pb-8 flex flex-col items-center justify-center w-full z-10 relative gap-0">
                  <div 
                    className={`px-5 py-1.5 rounded-full border-2 mt-2 cursor-default select-none ${pillBgOutline}`}
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
                  <ConfettiBurst 
                    active={diwaliRevealed || startFinaleLoop} 
                    origin={{ y: 0.5, x: 0.5 }} 
                    loop={true} 
                    skipInitial={!startFinaleLoop} 
                    onFirstBurst={onCalendarReveal}
                    onFifthBurst={() => {
                      if (onCtaReady) onCtaReady();
                      if (!hasDismissedShareHint || isSharedCardView) {
                        setShowShareIntroHint(true);
                      } else {
                        // Returning users who dismissed tooltip: show subtle floating 3D rocket in corner
                        setShowDiwaliRocketAmbient(true);
                        setTimeout(() => {
                          setShowDiwaliRocketAmbient(false);
                        }, 3500);
                      }
                    }} 
                  />
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
                <div className={`pt-8 sm:pt-10 px-8 flex flex-col items-center w-full z-10 relative ${isDec16Blocked && lokiCrackStage > 0 ? 'z-[60]' : ''}`}>
                  <h2 
                    className={`text-lg sm:text-xl font-black tracking-widest uppercase transition-all duration-700 ${
                      isDec16Blocked && lokiCrackStage > 0 
                        ? 'text-white drop-shadow-[0_0_12px_rgba(52,211,153,0.85)]' 
                        : textPrimary
                    }`}
                  >
                    {dateText}
                  </h2>
                </div>

                <div className={`flex-1 flex flex-col items-center justify-center relative w-full mt-2 ${isDec16Blocked && lokiCrackStage > 0 ? 'z-[60]' : 'z-10'}`}>
                  <div className="w-full flex justify-start pl-8 z-20 mb-[-1rem]">
                    <span 
                      className={`font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-700 ${
                        isDec16Blocked && lokiCrackStage > 0 
                          ? 'text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' 
                          : textSecondary
                      }`}
                    >
                      Today
                    </span>
                  </div>
                  
                  <h1 
                    className={`text-[7.5rem] sm:text-[9.5rem] font-black leading-none tracking-tighter text-center select-none transition-all duration-700 ${
                      isDec16Blocked && lokiCrackStage > 0 
                        ? 'text-white drop-shadow-[0_0_35px_rgba(52,211,153,0.9)] text-shadow-[0_0_50px_#10b981]' 
                        : textPrimary
                    }`}
                  >
                    {daysRemaining}
                  </h1>
                  
                  <div className="w-full flex justify-end pr-8 z-20 mt-[-1rem]">
                    <span 
                      className={`font-bold text-lg sm:text-xl italic transition-all duration-700 ${
                        isDec16Blocked && lokiCrackStage > 0 
                          ? 'text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' 
                          : textSecondary
                      }`}
                    >
                      th day
                    </span>
                  </div>
                </div>
                
                <div className={`pb-6 sm:pb-8 flex justify-center w-full relative ${isDec16Blocked && lokiCrackStage > 0 ? 'z-[60]' : 'z-10'}`}>
                  <div 
                    className={`px-6 py-2 rounded-full border-2 cursor-default select-none transition-all duration-700 ${
                      isDec16Blocked && lokiCrackStage > 0
                        ? 'bg-black/90 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.6)]'
                        : pillBgOutline
                    }`}
                    onClick={(e) => { e.stopPropagation(); if (onDevTap) onDevTap(); }}
                    onPointerDown={(e) => { e.stopPropagation(); if (onDevHoldStart) onDevHoldStart(); }}
                    onPointerUp={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                    onPointerLeave={(e) => { e.stopPropagation(); if (onDevHoldEnd) onDevHoldEnd(); }}
                  >
                    <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase ${
                      isDec16Blocked && lokiCrackStage > 0 ? 'text-emerald-300' : pillTextOutline
                    }`}>
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

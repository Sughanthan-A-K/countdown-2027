import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BirthdayLogo({ isDarkMode, onSecretTrigger }) {
  const [wishesCount, setWishesCount] = useState(() => {
    const saved = localStorage.getItem('sughanthan_bday_wishes_count');
    return saved !== null ? parseInt(saved, 10) : 0;
  });
  const [hasWished, setHasWished] = useState(() => {
    return localStorage.getItem('sughanthan_bday_wished') === 'true';
  });
  const [isButtonVisible, setIsButtonVisible] = useState(() => {
    // If already wished previously, hide button so logo is centered; otherwise show "Tap to Wish"
    return localStorage.getItem('sughanthan_bday_wished') !== 'true';
  });
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const holdStartTimeRef = useRef(null);
  const holdAnimFrameRef = useRef(null);
  const hideTimerRef = useRef(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Listen for refresh / reset event to reset wish count to 0 and restore button
  useEffect(() => {
    const handleResetEvent = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setWishesCount(0);
      setHasWished(false);
      setIsButtonVisible(true);
      localStorage.removeItem('sughanthan_bday_wished');
      localStorage.setItem('sughanthan_bday_wishes_count', '0');
    };
    window.addEventListener('reset_sughanthan_bday', handleResetEvent);
    return () => window.removeEventListener('reset_sughanthan_bday', handleResetEvent);
  }, []);

  // Friend Tap-to-Wish Handler
  const handleTap = (e) => {
    e.stopPropagation();

    if (!hasWished) {
      setHasWished(true);
      setIsButtonVisible(true);
      localStorage.setItem('sughanthan_bday_wished', 'true');
      setWishesCount((prev) => {
        const next = prev + 1;
        localStorage.setItem('sughanthan_bday_wishes_count', next.toString());
        return next;
      });

      // Automatically hide "Thank You ❤️" button after 10 seconds smoothly
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setIsButtonVisible(false);
      }, 10000);

      // Tactile vibration on mobile
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([35, 45, 65]);
      }

      // Celebratory confetti pop
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#f59e0b', '#ec4899', '#38bdf8', '#10b981', '#ffffff'],
      });
    } else {
      // Already wished on this device: subtle feedback, no annoying popup
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(15);
      }
    }
  };

  // Check if 14-second hold is allowed:
  // Allowed ONLY on or after Oct 14, 6:00 PM (18:00) IST!
  // In dev mode (isDevMode or test flag), allow testing if explicitly set
  const isHoldAllowed = () => {
    const now = new Date();
    // Oct 14 2026 at 18:00:00 local time
    const unlockTime = new Date(2026, 9, 14, 18, 0, 0);
    // If current system date is >= Oct 14 6PM, or dev mode override exists
    const isDev = typeof window !== 'undefined' && localStorage.getItem('isDevMode') === 'true';
    const devDateStr = typeof window !== 'undefined' ? localStorage.getItem('devOverrideDate') : null;
    if (isDev && devDateStr) {
      const devDate = new Date(parseInt(devDateStr, 10));
      // In dev mode, if the user navigated to Oct 14, check current time or allow after 6PM:
      if (devDate.getMonth() === 9 && devDate.getDate() === 14) {
        // If system time is >= 18:00 or dev mode unlock enabled
        return now.getHours() >= 18 || localStorage.getItem('dev_force_unlock_bday_hold') === 'true';
      }
    }
    return now >= unlockTime;
  };

  // Secret 14-Second Hold Handlers
  const startHold = (e) => {
    e.stopPropagation();

    // STRICT RULE: If not yet Oct 14, 6:00 PM, hold will NOT start or progress at all!
    if (!isHoldAllowed()) {
      return;
    }

    setIsHolding(true);
    holdStartTimeRef.current = Date.now();

    const checkHold = () => {
      if (!holdStartTimeRef.current) return;
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min(1, elapsed / 14000);
      setHoldProgress(progress);

      if (progress >= 1) {
        setIsHolding(false);
        setHoldProgress(0);
        holdStartTimeRef.current = null;
        if (typeof window !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([80, 50, 100, 60, 200]);
        }
        if (onSecretTrigger) {
          onSecretTrigger(wishesCount);
        }
      } else {
        holdAnimFrameRef.current = requestAnimationFrame(checkHold);
      }
    };

    holdAnimFrameRef.current = requestAnimationFrame(checkHold);
  };

  const endHold = (e) => {
    if (e) e.stopPropagation();
    if (holdProgress < 1) {
      setIsHolding(false);
      setHoldProgress(0);
      holdStartTimeRef.current = null;
      if (holdAnimFrameRef.current) {
        cancelAnimationFrame(holdAnimFrameRef.current);
      }
    }
  };

  const badgeBorder = isDarkMode ? 'border-neutral-700 bg-neutral-800 text-neutral-200' : 'border-neutral-300 bg-white text-neutral-800';

  return (
    <div className="relative flex flex-col items-center justify-center w-full select-none my-1">
      {/* Interactive Free-Floating Transparent Vector Logo */}
      <div
        className="relative cursor-pointer touch-none flex items-center justify-center"
        onClick={handleTap}
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Wish Counter Badge (Moved further to the right side, clear of hair) */}
        <motion.div
          animate={hasWished ? { scale: [1, 1.25, 1] } : {}}
          className={`absolute -top-1 -right-3 sm:-right-4 z-30 flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black tracking-wider shadow-sm border ${badgeBorder}`}
        >
          <Heart size={12} className={hasWished ? 'fill-red-500 text-red-500' : 'text-neutral-400'} />
          <span className="font-mono text-xs">{wishesCount}</span>
        </motion.div>

        {/* SLEEK MODERN TECH-AURA & CELESTIAL BACKDROP (Behind Logo) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          {/* 1. Concentric Minimal Tech Orbit Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center"
            style={{ opacity: isDarkMode ? 0.35 : 0.22 }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full fill-none">
              {/* Ultra-fine modern concentric geometric rings */}
              <circle cx="100" cy="100" r="95" stroke={isDarkMode ? '#fbbf24' : '#d97706'} strokeWidth="0.8" strokeDasharray="3 9" />
              <circle cx="100" cy="100" r="82" stroke={isDarkMode ? '#f59e0b' : '#b45309'} strokeWidth="1" strokeDasharray="18 6 4 6" opacity="0.7" />
              <circle cx="100" cy="100" r="68" stroke={isDarkMode ? '#fde68a' : '#92400e'} strokeWidth="0.6" strokeDasharray="2 6" opacity="0.5" />
              {/* Corner crosshairs / tick marks */}
              <line x1="100" y1="2" x2="100" y2="9" stroke={isDarkMode ? '#fbbf24' : '#d97706'} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="100" y1="191" x2="100" y2="198" stroke={isDarkMode ? '#fbbf24' : '#d97706'} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="100" x2="9" y2="100" stroke={isDarkMode ? '#fbbf24' : '#d97706'} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="191" y1="100" x2="198" y2="100" stroke={isDarkMode ? '#fbbf24' : '#d97706'} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* 2. Soft Ethereal Breathing Aura */}
          <motion.div
            animate={{
              scale: [0.92, 1.06, 0.92],
              opacity: isDarkMode ? [0.25, 0.45, 0.25] : [0.12, 0.22, 0.12],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-48 h-48 sm:w-52 sm:h-52 rounded-full blur-2xl"
            style={{
              background: isDarkMode
                ? 'radial-gradient(circle, rgba(245,158,11,0.65) 0%, rgba(217,119,6,0.18) 55%, transparent 75%)'
                : 'radial-gradient(circle, rgba(245,158,11,0.45) 0%, rgba(251,191,36,0.12) 55%, transparent 75%)',
            }}
          />

          {/* 3. Floating Golden Sparkle Stars */}
          {[
            { top: '15%', left: '18%', delay: 0 },
            { top: '22%', right: '16%', delay: 1.2 },
            { bottom: '26%', left: '16%', delay: 2.1 },
            { bottom: '18%', right: '20%', delay: 0.6 },
          ].map((pos, idx) => (
            <motion.div
              key={idx}
              className="absolute text-amber-400 dark:text-amber-300 pointer-events-none"
              style={{ ...pos }}
              animate={{
                opacity: [0.1, 0.85, 0.1],
                scale: [0.7, 1.2, 0.7],
                y: [-2, 2, -2],
              }}
              transition={{
                duration: 2.8,
                delay: pos.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0 C 10 7, 13 10, 20 10 C 13 10, 10 13, 10 20 C 10 13, 7 10, 0 10 C 7 10, 10 7, 10 0 Z" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Free-Floating Vector Logo Image - With Gentle Floating Movement */}
        <motion.div
          animate={{
            y: [-3.5, 3.5, -3.5],
            rotateZ: [-0.5, 0.5, -0.5],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center transition-transform active:scale-95 duration-150 z-10"
        >
          <img
            src="/sughanthan_gold_transparent.png"
            alt="Sughanthan Gold Logo"
            className="w-full h-full object-contain pointer-events-none select-none"
            style={
              isDarkMode
                ? {
                    filter: 'drop-shadow(0 0 18px rgba(245,158,11,0.5)) drop-shadow(0 4px 10px rgba(0,0,0,0.6))',
                  }
                : {
                    filter: 'drop-shadow(0 6px 14px rgba(217,119,6,0.22))',
                  }
            }
          />
        </motion.div>
      </div>

      {/* Minimal Status Button - Positioned absolutely below so the Logo & Count remain strictly centered permanently */}
      <div className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        <AnimatePresence>
          {isButtonVisible && (
            <motion.div
              key="bday-wish-button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.5 } }}
              className="pointer-events-auto flex flex-col items-center"
            >
              <motion.button
                onClick={handleTap}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest uppercase border transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap ${
                  hasWished
                    ? isDarkMode
                      ? 'bg-neutral-800 border-neutral-700 text-neutral-300'
                      : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                    : isDarkMode
                    ? 'bg-white text-black border-white hover:bg-neutral-200'
                    : 'bg-black text-white border-black hover:bg-neutral-800'
                }`}
              >
                {hasWished ? (
                  <>
                    <Heart size={12} className="fill-red-500 text-red-500" />
                    <span>Thank You ❤️</span>
                  </>
                ) : (
                  <span>Tap to Wish</span>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Trophy, Crown, Flame, Star, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * BirthdaySecretSurprise
 * TOP-SECRET SURPRISE FOR SUGHANTHAN'S 14TH OCTOBER BIRTHDAY EVENING!
 * Built exclusively to celebrate Sughanthan's milestone with an animated wave of each individual wish!
 */
export default function BirthdaySecretSurprise({ isOpen, onClose, wishesCount = 1, isDarkMode }) {
  const [animatingCount, setAnimatingCount] = useState(0);
  const [activeWishItem, setActiveWishItem] = useState(null);
  const [isSequenceDone, setIsSequenceDone] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState([]);

  // Dynamic tribute pool for each incoming wish
  const wishMessagesPool = [
    { title: "Heartfelt Love ❤️", note: "Keep inspiring us, Sughanthan!", color: "#ec4899" },
    { title: "Dream High 🚀", note: "May every goal turn into a massive win!", color: "#38bdf8" },
    { title: "Code Wizard ⚡", note: "Flawless code, brilliant ideas forever!", color: "#10b981" },
    { title: "Golden Spirit 🌟", note: "Your creativity and energy shine bright!", color: "#f59e0b" },
    { title: "Victory & Joy 🏆", note: "Health, happiness & peace always!", color: "#a855f7" },
    { title: "Legendary Year 🔥", note: "Unstoppable momentum in 2026 and 2027!", color: "#f97316" },
  ];

  useEffect(() => {
    if (!isOpen) {
      setAnimatingCount(0);
      setActiveWishItem(null);
      setIsSequenceDone(false);
      setFloatingParticles([]);
      return;
    }

    const totalTarget = Math.max(1, wishesCount);

    // Initial celebratory blast
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ec4899', '#38bdf8', '#10b981', '#ffffff'],
    });

    // Step-by-step sequential wish animations for each count!
    let current = 0;
    // Calculate interval so if count is 10, each plays around 800ms
    const stepInterval = Math.max(600, Math.min(1200, 7000 / totalTarget));

    const timer = setInterval(() => {
      current++;
      setAnimatingCount(current);

      // Select dynamic tribute message
      const msg = wishMessagesPool[(current - 1) % wishMessagesPool.length];
      setActiveWishItem({
        id: current,
        num: current,
        title: msg.title,
        note: msg.note,
        color: msg.color,
      });

      // Micro vibration & celebratory confetti on each wish wave
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([25, 30, 45]);
      }

      // Small localized sparkle pop
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { x: 0.3 + Math.random() * 0.4, y: 0.5 },
        colors: [msg.color, '#FFD700', '#ffffff'],
      });

      if (current >= totalTarget) {
        clearInterval(timer);
        setTimeout(() => {
          setIsSequenceDone(true);
          // Grand finale confetti shower
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.45 },
            colors: ['#FFD700', '#ec4899', '#38bdf8', '#10b981', '#f59e0b'],
          });
        }, 1000);
      }
    }, stepInterval);

    return () => clearInterval(timer);
  }, [isOpen, wishesCount]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 select-none"
      >
        {/* Background Ambient Cosmic Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.22)_0,transparent_75%)]" />

        <motion.div
          initial={{ scale: 0.85, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 30 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className={`relative w-full max-w-sm rounded-3xl p-6 sm:p-7 border-2 shadow-2xl flex flex-col items-center text-center overflow-hidden ${
            isDarkMode 
              ? 'bg-neutral-900 border-amber-500/40 text-white shadow-[0_0_50px_rgba(245,158,11,0.25)]' 
              : 'bg-white border-amber-300 text-neutral-900 shadow-[0_0_50px_rgba(245,158,11,0.2)]'
          }`}
        >
          {/* Header Crown & Date */}
          <div className="flex items-center gap-1.5 text-amber-400 mb-1">
            <Crown size={18} className="text-amber-400 animate-bounce" />
            <span className="text-[11px] uppercase font-black tracking-widest text-amber-500">
              Oct 14 • Milestone Evening
            </span>
            <Crown size={18} className="text-amber-400 animate-bounce" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Happy Birthday<br />Sughanthan!
          </h1>

          {/* Floating Gold Logo Spotlight */}
          <div className="relative my-3 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute w-28 h-28 rounded-full border border-dashed border-amber-400/40 pointer-events-none"
            />
            <div className="w-24 h-24 flex items-center justify-center drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <img
                src="/sughanthan_gold_transparent.png"
                alt="Sughanthan Gold"
                className="w-full h-full object-contain select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Real-time Incremental Wishing Counter */}
          <div className="my-1.5 px-4 py-1.5 rounded-full bg-neutral-800/60 border border-amber-500/30 flex items-center gap-2">
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wide">
              Wish <span className="text-amber-400 font-mono font-black text-sm">{animatingCount}</span> of <span className="font-mono text-neutral-400">{Math.max(1, wishesCount)}</span> Received
            </span>
          </div>

          {/* Dynamic Step-By-Step Wish Presentation Animation */}
          <div className="w-full min-h-[90px] flex items-center justify-center my-2 px-1">
            <AnimatePresence mode="wait">
              {activeWishItem && (
                <motion.div
                  key={activeWishItem.id}
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full p-3 rounded-2xl border flex flex-col items-center"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(23, 23, 23, 0.7)' : 'rgba(254, 243, 199, 0.4)',
                    borderColor: activeWishItem.color,
                    boxShadow: `0 4px 20px ${activeWishItem.color}25`,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} style={{ color: activeWishItem.color }} />
                    <span className="text-xs font-black uppercase tracking-wider" style={{ color: activeWishItem.color }}>
                      Wish #{activeWishItem.num}: {activeWishItem.title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold mt-1 text-neutral-200 dark:text-neutral-200 light:text-neutral-800 italic">
                    "{activeWishItem.note}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Final Sequence Message */}
          {isSequenceDone && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] sm:text-xs font-bold text-amber-400 tracking-wide mt-1"
            >
              ✨ All {wishesCount} wishes delivered with love & joy! ✨
            </motion.p>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-3 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg active:scale-95 transition-transform"
          >
            Thank You Everyone ❤️
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AyudhaPoojaCard({
  isDarkMode,
  daysRemaining,
  textPrimary,
  textSecondary,
  onShareSpecialCard,
  onTriggerShareStar,
  onPhaseChange,
}) {
  // Phase sequence:
  // 0: Initial card (clean original calendar with "74th day").
  //    At 1.0s, an intense luminous flash & expansion burst (velicham) detonates the number!
  // 1: Blast flash/velicham -> number instantly disappears.
  // 2: Pure empty mystery center (NO emojis) - User wonders "Ennada enna aachu?", taps to reveal!
  // 3: Hanging Oonjal Meme frame:
  //    - Top tag: "TODAY SPECIAL" (no inner share/drop buttons)
  //    - Pooja Image (mild zoom)
  //    - Pooja Video 1: mildly zoomed in (scale 1.15) so it's not small/sunken, text clearly legible, duration halved (~6.5s)
  //    - Pooja Video 2: original clean aspect
  //    - User tap on frame -> unhooks and drops frame with gravity!
  // 4: Saraswathi Wish Video:
  //    - Prominent larger size (w-[92%] max-w-[270px])
  //    - Plays through, and freezes cleanly right where Saraswathi is fully revealed without hiding or looping back!
  //    - Replays from start on user tap
  //    - Immediately upon freeze, triggers the calendar's corner star & tooltip!

  const [phase, setPhase] = useState(0); 
  const [subPhase, setSubPhase] = useState('image'); // 'image' | 'video1' | 'video2'

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);

  // 1. Exactly 1s: Luminous flash & explosion burst (velicham)
  useEffect(() => {
    if (phase === 0) {
      const burstTimer = setTimeout(() => {
        setPhase(1); // flash / velicham burst
        setTimeout(() => {
          setPhase(2); // empty mystery center waiting for user tap
        }, 500);
      }, 1000);
      return () => clearTimeout(burstTimer);
    }
  }, [phase]);

  // User taps on the empty mystery card -> triggers meme sequence
  const handleMysteryTap = () => {
    if (phase === 2) {
      setPhase(3); 
      setSubPhase('image');
    }
  };

  // When phase 3 starts (Meme sequence), start looping Meme Audio
  useEffect(() => {
    if (phase === 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      // 3.2s of image -> go to Video 1
      const tImg = setTimeout(() => {
        setSubPhase('video1');
      }, 3200);
      return () => clearTimeout(tImg);
    }
  }, [phase]);

  // Video 1 playback (halved duration ~6.5s)
  useEffect(() => {
    if (phase === 3 && subPhase === 'video1') {
      if (video1Ref.current) {
        video1Ref.current.currentTime = 0;
        video1Ref.current.play().catch(() => {});
      }

      const tVid1 = setTimeout(() => {
        setSubPhase('video2');
      }, 6500);

      return () => clearTimeout(tVid1);
    }
  }, [phase, subPhase]);

  // Video 2 playback
  useEffect(() => {
    if (phase === 3 && subPhase === 'video2') {
      if (video2Ref.current) {
        video2Ref.current.currentTime = 0;
        video2Ref.current.play().catch(() => {});
      }
    }
  }, [phase, subPhase]);

  // User taps meme frame -> unhooks and drops frame with gravity
  const triggerDropToWishVideo = () => {
    if (phase === 3) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPhase(4); // Drop & reveal wish video
      if (onPhaseChange) {
        onPhaseChange(4);
      }
    }
  };

  // When wish video finishes, FREEZE on the majestic fully revealed Saraswathi frame!
  // And immediately trigger corner star & tooltip!
  const handleWishVideoEnded = () => {
    if (wishVideoRef.current) {
      wishVideoRef.current.pause();
      // Keep paused on the last beautiful frame so Saraswathi stays fully visible
    }
    if (onTriggerShareStar) {
      onTriggerShareStar();
    }
  };

  // Also trigger star as fallback if video is long (at 4s)
  useEffect(() => {
    if (phase === 4) {
      if (wishVideoRef.current) {
        wishVideoRef.current.currentTime = 0;
        wishVideoRef.current.play().catch(() => {});
      }

      const starFallback = setTimeout(() => {
        if (onTriggerShareStar) {
          onTriggerShareStar();
        }
      }, 4000);

      return () => clearTimeout(starFallback);
    }
  }, [phase, onTriggerShareStar]);

  // Replay wish video on tap when in phase 4
  const handleWishVideoTap = () => {
    if (phase === 4 && wishVideoRef.current) {
      wishVideoRef.current.currentTime = 0;
      wishVideoRef.current.play().catch(() => {});
    }
  };

  const poojaImgSrc = isDarkMode 
    ? "/Image and Audio/Pooja Dark mode.png" 
    : "/Image and Audio/Pooja.png";

  const wishVideoSrc = isDarkMode 
    ? "/Image and Audio/Dark Mode.mp4" 
    : "/Image and Audio/Light Mode.mp4";

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden select-none">
      {/* Background Hidden Meme Audio */}
      <audio 
        ref={audioRef} 
        src="/Image and Audio/Meme Audio.mp3" 
        loop 
        preload="auto" 
      />

      {/* =========================================================================
          PHASE 0, 1, 2: Center Day Counter -> 1s Luminous Burst / Velicham -> Empty
          ========================================================================= */}
      {(phase === 0 || phase === 1 || phase === 2) && (
        <div 
          onClick={handleMysteryTap}
          className={`flex-1 flex flex-col items-center justify-center relative z-10 w-full ${phase === 2 ? 'cursor-pointer pointer-events-auto' : ''}`}
        >
          {phase === 0 && (
            <div className="w-full flex justify-start pl-8 z-20 mb-[-1rem]">
              <span className={`font-bold text-xs sm:text-sm tracking-widest uppercase ${textSecondary}`}>
                Today
              </span>
            </div>
          )}

          <motion.div
            animate={
              phase === 1
                ? {
                    scale: [1, 1.4, 0.1],
                    filter: [
                      "brightness(1) blur(0px) contrast(1)", 
                      "brightness(4) blur(4px) contrast(2)", 
                      "brightness(0) blur(16px)"
                    ],
                    opacity: [1, 1, 0],
                  }
                : phase === 2
                ? { opacity: 0, scale: 0.5 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            {phase === 0 && (
              <h1 className={`text-[7rem] sm:text-[8.5rem] font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                {daysRemaining}
              </h1>
            )}

            {/* Powerful Luminous Blast Flash (Velicham) without cartoon emojis */}
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ 
                  opacity: [0, 1, 0.8, 0], 
                  scale: [0.5, 1.8, 2.8] 
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Core White-Hot Light */}
                <div className="w-36 h-36 rounded-full bg-white blur-xl opacity-95" />
                {/* Outer Golden Aura Flash */}
                <div className="absolute w-52 h-52 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 blur-2xl opacity-80" />
              </motion.div>
            )}
          </motion.div>

          {phase === 0 && (
            <div className="w-full flex justify-end pr-8 z-20 mt-[-1rem]">
              <span className={`font-bold text-lg sm:text-xl italic ${textSecondary}`}>
                th day
              </span>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          PHASE 3: Hanging Oonjal Meme Frame (TODAY SPECIAL)
          ========================================================================= */}
      {phase === 3 && (
        <div className="flex-1 w-full flex items-center justify-center relative z-20 my-auto py-1">
          <motion.div
            key="hanging-meme-frame"
            initial={{ opacity: 0, scale: 0.75, y: -30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: [-1.6, 1.6, -1.6],
              transition: {
                y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }
            }}
            exit={{
              y: 450,
              rotate: 22,
              opacity: 0,
              scale: 0.65,
              transition: { duration: 0.55, ease: [0.32, 0, 0.67, 0] }
            }}
            onClick={triggerDropToWishVideo}
            className="w-[88%] max-w-[260px] aspect-[4/5] max-h-[300px] flex flex-col items-center cursor-pointer pointer-events-auto select-none"
            title="Tap to reveal special wish!"
          >
            {/* Hanging chain on top */}
            <div className="w-full flex justify-between px-6 mb-[-3px] z-30">
              <div className="w-1 h-3 bg-amber-400 rounded-full shadow-sm" />
              <div className="w-1 h-3 bg-amber-400 rounded-full shadow-sm" />
            </div>

            {/* Frame Box */}
            <div className={`w-full h-full rounded-2xl p-2 flex flex-col shadow-2xl border-2 backdrop-blur-md overflow-hidden relative ${
              isDarkMode 
                ? 'bg-neutral-900/95 border-amber-500/40 shadow-black/80' 
                : 'bg-white/95 border-amber-600/30 shadow-neutral-400/60'
            }`}>
              {/* Header: TODAY SPECIAL (Pure clean header) */}
              <div className="w-full flex items-center justify-center pb-1 px-1 border-b border-amber-500/20">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Today Special
                </span>
              </div>

              {/* Meme Visuals */}
              <div className="flex-1 relative w-full mt-1 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {/* 1. POOJA IMAGE */}
                  {subPhase === 'image' && (
                    <motion.div
                      key="pooja-image"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1.08 }}
                      exit={{ 
                        opacity: 0, 
                        clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                        x: -15,
                        transition: { duration: 0.4 }
                      }}
                      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
                    >
                      <img
                        src={poojaImgSrc}
                        alt="Ayudha Pooja Special"
                        className="w-full h-full object-contain scale-[1.08]"
                      />
                    </motion.div>
                  )}

                  {/* 2. POOJA VIDEO 1 (Stepped zoom to scale 1.15: text fully visible, not small/sunken) */}
                  {subPhase === 'video1' && (
                    <motion.div
                      key="pooja-video-1"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.35 } }}
                      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
                    >
                      <video
                        ref={video1Ref}
                        src="/Image and Audio/Pooja Video 1.mp4"
                        playsInline
                        muted
                        autoPlay
                        className="w-full h-full object-contain scale-[1.15]"
                      />
                    </motion.div>
                  )}

                  {/* 3. POOJA VIDEO 2 (Clean original contain) */}
                  {subPhase === 'video2' && (
                    <motion.div
                      key="pooja-video-2"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
                    >
                      <video
                        ref={video2Ref}
                        src="/Image and Audio/Pooja Video 2.mp4"
                        playsInline
                        muted
                        autoPlay
                        loop
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* =========================================================================
          PHASE 4: Saraswathi Wish Video
          - Larger size (w-[92%] max-w-[270px])
          - Freezes cleanly on the full Saraswathi frame (no loop hide!)
          - Replays on tap
          ========================================================================= */}
      {phase === 4 && (
        <motion.div
          key="saraswathi-wish-phase"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={handleWishVideoTap}
          className="flex-1 w-full flex flex-col items-center justify-center my-auto py-1 relative z-10 cursor-pointer pointer-events-auto"
          title="Tap to replay wish"
        >
          {/* Prominent, larger sized frame with smooth border */}
          <div className="relative w-[92%] max-w-[270px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-amber-600/30">
            <video
              ref={wishVideoRef}
              src={wishVideoSrc}
              playsInline
              autoPlay
              onEnded={handleWishVideoEnded}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

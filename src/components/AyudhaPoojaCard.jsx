import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AyudhaPoojaCard({
  isDarkMode,
  daysRemaining,
  textPrimary,
  textSecondary,
  onShareSpecialCard,
  onTriggerShareStar, // Callback to notify CalendarPage to reveal star & tooltip
}) {
  // Phase sequence:
  // 0: Normal card center ("74th day") - waits for user tap OR auto-burst
  // 1: Spark/fuse burst effect on the number -> vanishes!
  // 2: Meme sequence (Pooja Image -> Video 1 -> Video 2) inside hanging oonjal swing frame + Meme audio
  // 3: Unhook & drop animation (oonjal kaindhu keezha vizhura drop)
  // 4: Saraswathi Wish Video (Light Mode.mp4 / Dark Mode.mp4) compactly nested in center, 
  //    with "nth day" + "To reach 2027" restored at bottom, and 3s after loop -> triggers share star!

  const [phase, setPhase] = useState(0); // starts as normal card
  const [subPhase, setSubPhase] = useState('image'); // 'image' | 'video1' | 'video2'

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);

  // Auto fuse-burst trigger if user doesn't tap within 2.5s
  useEffect(() => {
    if (phase === 0) {
      const autoTimer = setTimeout(() => {
        triggerFuseBurst();
      }, 2500);
      return () => clearTimeout(autoTimer);
    }
  }, [phase]);

  // Fuse blow / burst animation
  const triggerFuseBurst = () => {
    if (phase === 0) {
      setPhase(1); // bursting
      setTimeout(() => {
        setPhase(2); // start meme sequence
        setSubPhase('image');
      }, 650);
    }
  };

  // When phase 2 starts (Meme sequence), play Meme Audio in loop
  useEffect(() => {
    if (phase === 2) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      // After 3.2s on image, transition smoothly to Video 1
      const tImage = setTimeout(() => {
        setSubPhase('video1');
      }, 3200);
      return () => clearTimeout(tImage);
    }
  }, [phase]);

  // Video 1 playback
  useEffect(() => {
    if (phase === 2 && subPhase === 'video1' && video1Ref.current) {
      video1Ref.current.currentTime = 0;
      video1Ref.current.play().catch(() => {});
    }
  }, [phase, subPhase]);

  // Video 2 playback
  useEffect(() => {
    if (phase === 2 && subPhase === 'video2' && video2Ref.current) {
      video2Ref.current.currentTime = 0;
      video2Ref.current.play().catch(() => {});
    }
  }, [phase, subPhase]);

  const handleVideo1Ended = () => {
    if (phase === 2) {
      setSubPhase('video2');
    }
  };

  const handleVideo2Ended = () => {
    if (phase === 2) {
      triggerDropToWishVideo();
    }
  };

  // User taps or clicks during meme phase -> unhooks and drops frame into wish video
  const triggerDropToWishVideo = () => {
    if (phase === 2) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPhase(3); // unhook & drop animation
      setTimeout(() => {
        setPhase(4); // Wish video reveal
      }, 650);
    }
  };

  // When wish video starts (Phase 4):
  // Play wish video with audio, and 3 seconds later trigger the share star in corner!
  useEffect(() => {
    if (phase === 4) {
      if (wishVideoRef.current) {
        wishVideoRef.current.currentTime = 0;
        wishVideoRef.current.play().catch(() => {});
      }

      // After 3 seconds of Saraswathi wish video, reveal the corner star!
      const starTimer = setTimeout(() => {
        if (onTriggerShareStar) {
          onTriggerShareStar();
        }
      }, 3000);

      return () => clearTimeout(starTimer);
    }
  }, [phase, onTriggerShareStar]);

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
          PHASE 0 & 1: Normal Calendar Center (nth day) with Fuse-out / Spark Burst
          ========================================================================= */}
      {(phase === 0 || phase === 1) && (
        <div 
          onClick={triggerFuseBurst}
          className="flex-1 flex flex-col items-center justify-center relative z-10 w-full cursor-pointer"
        >
          <div className="w-full flex justify-start pl-8 z-20 mb-[-1rem]">
            <span className={`font-bold text-xs sm:text-sm tracking-widest uppercase ${textSecondary}`}>
              Today
            </span>
          </div>

          <motion.div
            animate={
              phase === 1
                ? {
                    scale: [1, 1.25, 0.4],
                    filter: ["brightness(1) blur(0px)", "brightness(3) blur(2px)", "brightness(0) blur(12px)"],
                    opacity: [1, 1, 0],
                    rotate: [0, -6, 8]
                  }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            <h1 className={`text-[7rem] sm:text-[8.5rem] font-black leading-none tracking-tighter text-center ${textPrimary}`}>
              {daysRemaining}
            </h1>

            {/* Spark / fuse blowout particles */}
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [1, 0], scale: [0.8, 2.5] }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 blur-md opacity-80" />
                <span className="absolute text-3xl">⚡</span>
              </motion.div>
            )}
          </motion.div>

          <div className="w-full flex justify-end pr-8 z-20 mt-[-1rem]">
            <span className={`font-bold text-lg sm:text-xl italic ${textSecondary}`}>
              th day
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 2 & 3: Hanging Meme Oonjal Frame (Compact, no overlap, zoom video)
          ========================================================================= */}
      {(phase === 2 || phase === 3) && (
        <div className="flex-1 w-full flex items-center justify-center relative z-20 my-auto py-1">
          <motion.div
            key="hanging-meme-frame"
            initial={{ opacity: 0, scale: 0.75, y: -30 }}
            animate={
              phase === 3
                ? {
                    // Oonjal kaindhu keezha vizhura drop animation
                    y: 420,
                    rotate: 22,
                    opacity: 0,
                    scale: 0.7,
                    transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] }
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    // Gentle oonjal swinging motion
                    rotate: [-1.5, 1.5, -1.5],
                    transition: {
                      y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    }
                  }
            }
            onClick={triggerDropToWishVideo}
            className="w-[88%] max-w-[260px] aspect-[4/5] max-h-[300px] flex flex-col items-center cursor-pointer pointer-events-auto select-none"
            title="Tap to reveal Ayudha Pooja wish!"
          >
            {/* Hanging chain/rope on top */}
            <div className="w-full flex justify-between px-6 mb-[-3px] z-30">
              <div className="w-1 h-3 bg-amber-400 rounded-full shadow-sm" />
              <div className="w-1 h-3 bg-amber-400 rounded-full shadow-sm" />
            </div>

            {/* Frame Outer Box */}
            <div className={`w-full h-full rounded-2xl p-2 flex flex-col shadow-2xl border-2 backdrop-blur-md overflow-hidden relative ${
              isDarkMode 
                ? 'bg-neutral-900/95 border-amber-500/40 shadow-black/80' 
                : 'bg-white/95 border-amber-600/30 shadow-neutral-400/60'
            }`}>
              {/* Header: TODAY SPECIAL */}
              <div className="w-full flex items-center justify-between pb-1 px-1 border-b border-amber-500/20">
                <span className="text-[9px] font-black tracking-widest uppercase text-amber-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Today Special
                </span>
                <span className="text-[8px] font-bold opacity-60">
                  Tap to drop ✨
                </span>
              </div>

              {/* Meme Container */}
              <div className="flex-1 relative w-full mt-1 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {/* 1. POOJA IMAGE */}
                  {subPhase === 'image' && (
                    <motion.div
                      key="pooja-image"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ 
                        opacity: 0, 
                        clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                        x: -15,
                        transition: { duration: 0.4 }
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black"
                    >
                      <img
                        src={poojaImgSrc}
                        alt="Ayudha Pooja Special"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}

                  {/* 2. POOJA VIDEO 1 (ZOOMED to eliminate excessive black borders as requested) */}
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
                        onEnded={handleVideo1Ended}
                        // Scaled 1.45x so the center meme content fills the frame cleanly without thick borders!
                        className="w-full h-full object-cover scale-[1.45]"
                      />
                    </motion.div>
                  )}

                  {/* 3. POOJA VIDEO 2 */}
                  {subPhase === 'video2' && (
                    <motion.div
                      key="pooja-video-2"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black"
                    >
                      <video
                        ref={video2Ref}
                        src="/Image and Audio/Pooja Video 2.mp4"
                        playsInline
                        muted
                        autoPlay
                        onEnded={handleVideo2Ended}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom tag */}
              <div className="w-full pt-1 flex justify-center">
                <span className="text-[8px] font-bold tracking-wider text-amber-500/80">
                  Ayudha Pooja Special Meme 🌸
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* =========================================================================
          PHASE 4: Beautiful, Compact Saraswathi Wish Video with Restored Counter
          ========================================================================= */}
      {phase === 4 && (
        <motion.div
          key="saraswathi-wish-phase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 w-full flex flex-col items-center justify-between py-1 relative z-10"
        >
          {/* Subtitle Greeting */}
          <div className="flex flex-col items-center w-full mt-[-2px]">
            <motion.h3 
              initial={{ opacity: 0.8 }} 
              animate={{ opacity: 1 }} 
              transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
              className="text-amber-500 font-black text-xs sm:text-sm tracking-widest uppercase drop-shadow-sm text-center"
            >
              Happy Ayudha Pooja
            </motion.h3>
          </div>

          {/* Compact Beautiful Video Frame (height compact so it never overflows) */}
          <div className="relative w-[85%] max-w-[240px] aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-amber-500/40 my-auto bg-black">
            <video
              ref={wishVideoRef}
              src={wishVideoSrc}
              playsInline
              loop
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>

          {/* Standard Special Card Days Remaining Counter restored below the visual */}
          <div className="flex items-baseline gap-1 mt-1">
            <h1 className={`text-4xl sm:text-5xl font-black leading-none tracking-tighter text-center ${textPrimary}`}>
              {daysRemaining}
            </h1>
            <span className={`font-bold text-xs sm:text-sm italic ${textSecondary}`}>
              th day
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AyudhaPoojaCard({
  isDarkMode,
  daysRemaining,
  textPrimary,
  textSecondary,
  onShareSpecialCard,
}) {
  // Phase sequence:
  // 0: Initial normal calendar day view ("74th day") for 1.2s
  // 1: Day hides, reveals Pooja Image with looping Meme Audio & gentle swing/oonjal
  // 2: Video 1 (muted) with paper cut transition & meme audio
  // 3: Video 2 (muted) with paper cut transition & meme audio
  // 4: Dropping/Unhooking: Meme frame drops down like unhooking from oonjal
  // 5: Final Wish Video (Light Mode.mp4 / Dark Mode.mp4) with original audio
  const [phase, setPhase] = useState(0);
  const [isDropped, setIsDropped] = useState(false);

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);

  // Initial reveal timer: Hide day and show meme after 1.2 seconds
  useEffect(() => {
    const t0 = setTimeout(() => {
      setPhase(1); // Show Pooja image & start meme audio
    }, 1200);
    return () => clearTimeout(t0);
  }, []);

  // When phase becomes 1 (Pooja Image), play meme audio and timer to Video 1
  useEffect(() => {
    if (phase === 1) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Autoplay policy fallback: Will play on user first interaction/tap
        });
      }

      // After 3.5s of Pooja image, transition to Video 1
      const t1 = setTimeout(() => {
        setPhase(2);
      }, 3500);
      return () => clearTimeout(t1);
    }
  }, [phase]);

  // When phase becomes 2 (Video 1), play video 1 (muted)
  useEffect(() => {
    if (phase === 2 && video1Ref.current) {
      video1Ref.current.currentTime = 0;
      video1Ref.current.play().catch(() => {});
    }
  }, [phase]);

  // When phase becomes 3 (Video 2), play video 2 (muted)
  useEffect(() => {
    if (phase === 3 && video2Ref.current) {
      video2Ref.current.currentTime = 0;
      video2Ref.current.play().catch(() => {});
    }
  }, [phase]);

  // Handle Video 1 ended -> go to Video 2
  const handleVideo1Ended = () => {
    if (phase === 2) {
      setPhase(3);
    }
  };

  // Handle Video 2 ended -> trigger unhook drop into wish video
  const handleVideo2Ended = () => {
    if (phase === 3) {
      triggerDropToWishVideo();
    }
  };

  // User tap / pause on meme frame -> triggers immediate drop to wish video
  const triggerDropToWishVideo = () => {
    if (phase >= 1 && phase < 4) {
      // Stop meme audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPhase(4); // Drop animation
      setTimeout(() => {
        setIsDropped(true);
        setPhase(5); // Wish video
      }, 700);
    }
  };

  // When phase 5 starts, play the wish video (with its original audio)
  useEffect(() => {
    if (phase === 5 && wishVideoRef.current) {
      wishVideoRef.current.currentTime = 0;
      wishVideoRef.current.play().catch(() => {});
    }
  }, [phase]);

  const poojaImgSrc = isDarkMode 
    ? "/Image and Audio/Pooja Dark mode.png" 
    : "/Image and Audio/Pooja.png";

  const wishVideoSrc = isDarkMode 
    ? "/Image and Audio/Dark Mode.mp4" 
    : "/Image and Audio/Light Mode.mp4";

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Background Hidden Meme Audio */}
      <audio 
        ref={audioRef} 
        src="/Image and Audio/Meme Audio.mp3" 
        loop 
        preload="auto" 
      />

      {/* Background Wish Video (Light Mode.mp4 or Dark Mode.mp4) - plays when meme drops */}
      <div 
        className={`absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-700 ${
          phase === 5 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <video
          ref={wishVideoRef}
          src={wishVideoSrc}
          playsInline
          loop
          className="w-full h-full object-cover rounded-2xl"
          // Wish videos have audio unmuted as requested!
        />
        {/* Subtle festive greeting overlay on top of wish video */}
        <div className="absolute top-2 inset-x-0 flex justify-center pointer-events-none z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/60 text-amber-300 backdrop-blur-sm border border-amber-500/30 shadow-lg">
            Happy Ayudha Pooja
          </span>
        </div>
      </div>

      {/* PHASE 0: Initial Normal Calendar "nth day" before vanishing */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="initial-day-counter"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 flex flex-col items-center justify-center relative z-10 w-full"
          >
            <div className="w-full flex justify-start pl-8 z-20 mb-[-1rem]">
              <span className={`font-bold text-xs sm:text-sm tracking-widest uppercase ${textSecondary}`}>
                Today
              </span>
            </div>
            <h1 className={`text-[6.5rem] sm:text-[8rem] font-black leading-none tracking-tighter text-center ${textPrimary}`}>
              {daysRemaining}
            </h1>
            <div className="w-full flex justify-end pr-8 z-20 mt-[-1rem]">
              <span className={`font-bold text-lg sm:text-xl italic ${textSecondary}`}>
                th day
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASES 1 to 4: Hanging Meme Frame with Oonjal Swing Animation & Paper Tear Cuts */}
      <AnimatePresence>
        {phase >= 1 && phase <= 4 && !isDropped && (
          <motion.div
            key="hanging-meme-frame"
            initial={{ opacity: 0, scale: 0.75, y: -40 }}
            animate={
              phase === 4
                ? {
                    // Oonjal kaindhu keezha vizhura animation (unhooking and dropping by gravity)
                    y: 400,
                    rotate: 18,
                    opacity: 0,
                    scale: 0.85,
                    transition: { duration: 0.65, ease: [0.32, 0, 0.67, 0] }
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    // Oonjal swinging effect (hanging swing animation)
                    rotate: [-1.8, 1.8, -1.8],
                    transition: {
                      y: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      rotate: { repeat: Infinity, duration: 3.2, ease: "easeInOut" }
                    }
                  }
            }
            exit={{ y: 400, opacity: 0 }}
            onClick={triggerDropToWishVideo}
            className="relative z-20 w-[92%] max-w-[290px] aspect-[4/5] flex flex-col items-center cursor-pointer pointer-events-auto"
            title="Tap to reveal special wish!"
          >
            {/* Hanging chain/rope indicator at top of frame */}
            <div className="w-full flex justify-between px-8 mb-[-4px] z-30">
              <div className="w-1 h-3 bg-amber-400 rounded-full shadow-sm" />
              <div className="w-1 h-3 bg-amber-400 rounded-full shadow-sm" />
            </div>

            {/* Frame Outer Card */}
            <div className={`w-full h-full rounded-2xl p-2.5 flex flex-col shadow-2xl border-2 backdrop-blur-md overflow-hidden relative ${
              isDarkMode 
                ? 'bg-neutral-900/95 border-amber-500/40 shadow-black/80' 
                : 'bg-white/95 border-amber-600/30 shadow-neutral-400/60'
            }`}>
              {/* Top Banner Tag: "TODAY SPECIAL" */}
              <div className="w-full flex items-center justify-between pb-1.5 px-1 border-b border-amber-500/20">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Today Special
                </span>
                <span className="text-[9px] font-bold opacity-60 text-right">
                  Tap to open ✨
                </span>
              </div>

              {/* Meme Content Container with Paper-tear / Cinematic transitions */}
              <div className="flex-1 relative w-full mt-1.5 rounded-xl overflow-hidden bg-black/10 flex items-center justify-center">
                
                {/* 1. POOJA IMAGE */}
                <AnimatePresence mode="wait">
                  {phase === 1 && (
                    <motion.div
                      key="pooja-image"
                      initial={{ opacity: 0, scale: 0.92, filter: "brightness(1.2)" }}
                      animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
                      exit={{ 
                        opacity: 0, 
                        clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)", // Paper-tear diagonal slice
                        x: -20,
                        transition: { duration: 0.45, ease: "easeIn" }
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={poojaImgSrc}
                        alt="Ayudha Pooja Special"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}

                  {/* 2. POOJA VIDEO 1 (Muted) */}
                  {phase === 2 && (
                    <motion.div
                      key="pooja-video-1"
                      initial={{ 
                        opacity: 0, 
                        clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)", // Paper-tear entry slice
                        x: 20 
                      }}
                      animate={{ 
                        opacity: 1, 
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
                        x: 0 
                      }}
                      exit={{ 
                        opacity: 0, 
                        clipPath: "polygon(0 0, 100% 15%, 100% 100%, 0 85%)", 
                        scale: 0.95,
                        transition: { duration: 0.45 } 
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center bg-black"
                    >
                      <video
                        ref={video1Ref}
                        src="/Image and Audio/Pooja Video 1.mp4"
                        playsInline
                        muted
                        autoPlay
                        onEnded={handleVideo1Ended}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}

                  {/* 3. POOJA VIDEO 2 (Muted) */}
                  {phase >= 3 && (
                    <motion.div
                      key="pooja-video-2"
                      initial={{ 
                        opacity: 0, 
                        scale: 1.05, 
                        filter: "contrast(1.15)" 
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        filter: "contrast(1)" 
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
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

              {/* Bottom hint on frame */}
              <div className="w-full pt-1.5 flex justify-center">
                <span className="text-[9px] font-semibold tracking-wider text-amber-500/80">
                  Ayudha Pooja Special Meme 🌸
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

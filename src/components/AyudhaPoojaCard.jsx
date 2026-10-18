import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AyudhaPoojaCard({
  isDarkMode,
  daysRemaining,
  textPrimary,
  textSecondary,
  onShareSpecialCard,
  onTriggerShareStar,
}) {
  // Phase sequence:
  // 0: Initial card with center "74th day" - automatically after 1s, blast/fuse blowout effect happens
  // 1: Blowout explosion / fuse goes off -> number vanishes
  // 2: Blank mystery state ("Enna da number-a kaanom") - User MUST tap to trigger meme!
  // 3: Hanging Oonjal Meme frame:
  //    - Pooja Image (plays looping Meme Audio)
  //    - Smooth transition to Pooja Video 1 (cut to half duration ~6s, mild zoom out scale 1.18 so text is not hidden)
  //    - Transition to Pooja Video 2 (zoomed scale 1.25 so black bars are covered)
  //    - User tap -> drops frame with unhook gravity animation
  // 4: Final Wish Video (Background fills full card natively with Light Mode.mp4 / Dark Mode.mp4)
  //    - First time plays once through on tap / drop
  //    - Every time user taps again, replays the wish video
  //    - 3s after wish video starts -> triggers corner share star!

  const [phase, setPhase] = useState(0); 
  const [subPhase, setSubPhase] = useState('image'); // 'image' | 'video1' | 'video2'

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);

  // 1. Exactly 1 second-la number fuse blowout aagidanum
  useEffect(() => {
    if (phase === 0) {
      const burstTimer = setTimeout(() => {
        setPhase(1); // blowout animation
        setTimeout(() => {
          setPhase(2); // number vanished, waiting for user tap
        }, 600);
      }, 1000); // 1 second
      return () => clearTimeout(burstTimer);
    }
  }, [phase]);

  // User taps when number is vanished -> starts meme sequence!
  const handleMysteryTap = () => {
    if (phase === 2) {
      setPhase(3); // Start meme sequence
      setSubPhase('image');
    }
  };

  // When phase 3 starts (Meme sequence), start Meme Audio
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

  // Video 1 duration: cut in half (~6.5s)
  useEffect(() => {
    if (phase === 3 && subPhase === 'video1') {
      if (video1Ref.current) {
        video1Ref.current.currentTime = 0;
        video1Ref.current.play().catch(() => {});
      }

      // Halved duration: after 6.5s move to Video 2
      const tVid1 = setTimeout(() => {
        setSubPhase('video2');
      }, 6500);

      return () => clearTimeout(tVid1);
    }
  }, [phase, subPhase]);

  // Video 2 playback (loops until user taps or finishes)
  useEffect(() => {
    if (phase === 3 && subPhase === 'video2') {
      if (video2Ref.current) {
        video2Ref.current.currentTime = 0;
        video2Ref.current.play().catch(() => {});
      }
    }
  }, [phase, subPhase]);

  // User tap while meme is running -> unhooks, drops frame, and reveals background wish video!
  const triggerDropToWishVideo = () => {
    if (phase === 3) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPhase(4); // Drop & reveal wish video
    }
  };

  // Replay wish video on tap when in phase 4
  const handleWishVideoTap = () => {
    if (phase === 4 && wishVideoRef.current) {
      wishVideoRef.current.currentTime = 0;
      wishVideoRef.current.play().catch(() => {});
    }
  };

  // When wish video (phase 4) starts, play once and trigger share star after 3 seconds
  useEffect(() => {
    if (phase === 4) {
      if (wishVideoRef.current) {
        wishVideoRef.current.currentTime = 0;
        wishVideoRef.current.play().catch(() => {});
      }

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
          SARASWATHI WISH VIDEO: Full-bleed background card video
          Fills behind the card naturally, plays on drop and replays on every user tap!
          ========================================================================= */}
      <div 
        onClick={handleWishVideoTap}
        className={`absolute inset-0 z-0 flex items-center justify-center transition-opacity duration-700 ${
          phase === 4 ? 'opacity-100 cursor-pointer pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <video
          ref={wishVideoRef}
          src={wishVideoSrc}
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle festive greeting pill */}
        <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none z-10">
          <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/70 text-amber-300 backdrop-blur-md border border-amber-500/40 shadow-xl">
            Happy Ayudha Pooja
          </span>
        </div>
      </div>

      {/* =========================================================================
          PHASE 0, 1, 2: Center Day Counter -> 1s Fuse Blowout -> Mystery Waiting
          ========================================================================= */}
      {(phase === 0 || phase === 1 || phase === 2) && (
        <div 
          onClick={handleMysteryTap}
          className={`flex-1 flex flex-col items-center justify-center relative z-10 w-full ${phase === 2 ? 'cursor-pointer pointer-events-auto' : ''}`}
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
                    scale: [1, 1.3, 0.2],
                    filter: ["brightness(1) blur(0px)", "brightness(3) blur(2px)", "brightness(0) blur(14px)"],
                    opacity: [1, 1, 0],
                    rotate: [0, -8, 10]
                  }
                : phase === 2
                ? { opacity: 0, scale: 0.5 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            <h1 className={`text-[7rem] sm:text-[8.5rem] font-black leading-none tracking-tighter text-center ${textPrimary}`}>
              {daysRemaining}
            </h1>

            {/* Spark/fuse blowout flash */}
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [1, 0], scale: [0.8, 2.8] }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 blur-lg opacity-90" />
                <span className="absolute text-4xl">⚡</span>
              </motion.div>
            )}
          </motion.div>

          {/* Mystery hint when number is vanished */}
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <span className="text-3xl mb-1.5">❓</span>
              <span className="text-xs font-bold text-amber-500 tracking-wider bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
                Tap to see what happened! ✨
              </span>
            </motion.div>
          )}

          <div className="w-full flex justify-end pr-8 z-20 mt-[-1rem]">
            <span className={`font-bold text-lg sm:text-xl italic ${textSecondary}`}>
              th day
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 3: Hanging Oonjal Meme Frame (Pooja Image -> Video 1 -> Video 2)
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
              rotate: [-1.5, 1.5, -1.5],
              transition: {
                y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }
            }}
            exit={{
              y: 420,
              rotate: 22,
              opacity: 0,
              scale: 0.7,
              transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] }
            }}
            onClick={triggerDropToWishVideo}
            className="w-[88%] max-w-[260px] aspect-[4/5] max-h-[300px] flex flex-col items-center cursor-pointer pointer-events-auto select-none"
            title="Tap to drop and reveal wish!"
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

              {/* Meme Visuals */}
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

                  {/* 2. POOJA VIDEO 1 (Mild zoom-out to scale 1.18 so text is not cut) */}
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
                        className="w-full h-full object-cover scale-[1.18]"
                      />
                    </motion.div>
                  )}

                  {/* 3. POOJA VIDEO 2 (Zoomed scale 1.25 to eliminate top/bottom black bars) */}
                  {subPhase === 'video2' && (
                    <motion.div
                      key="pooja-video-2"
                      initial={{ opacity: 0, scale: 1.05 }}
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
                        className="w-full h-full object-cover scale-[1.25]"
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

      {/* When phase is 4 (Wish video playing), empty flex space to let full background video shine */}
      {phase === 4 && <div className="flex-1 w-full" />}
    </div>
  );
}

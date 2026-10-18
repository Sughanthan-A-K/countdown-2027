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
  // 0: Initial card with center "74th day" - after exactly 1 second, blast animation happens
  // 1: Blowout explosion / fuse flash -> ONLY center vanishes (Today / th day / pill all vanish, leaving empty mystery center!)
  // 2: Mystery blank center - User taps -> triggers the hanging oonjal meme frame!
  // 3: Hanging Oonjal Meme frame:
  //    - Top tag: "TODAY SPECIAL" with pulsing red live dot
  //    - Gentle oonjal swaying motion
  //    - Pooja Image (plays looping Meme Audio)
  //    - Smooth cut to Pooja Video 1 (zoom out to object-contain scale-100 so all text is crystal clear, halved duration ~6.5s)
  //    - Smooth cut to Pooja Video 2 (original object-contain as earlier without forced zoom)
  //    - User tap on frame -> frame unhooks and drops with gravity!
  // 4: Saraswathi Wish Video:
  //    - Compacted height, perfectly centered in card
  //    - Light Mode uses the video's matching parchment background (#e6dccb)
  //    - Dark Mode uses the video's matching deep background (#14100c)
  //    - Replays video from start on every user tap
  //    - Exactly 3s after wish video starts -> triggers the corner star and tooltip hint!

  const [phase, setPhase] = useState(0); 
  const [subPhase, setSubPhase] = useState('image'); // 'image' | 'video1' | 'video2'

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);

  // 1. Exactly 1 second-la blast aaganum
  useEffect(() => {
    if (phase === 0) {
      const burstTimer = setTimeout(() => {
        setPhase(1); // blowout animation
        setTimeout(() => {
          setPhase(2); // center blank, waiting for user tap
        }, 550);
      }, 1000);
      return () => clearTimeout(burstTimer);
    }
  }, [phase]);

  // User taps on the blank mystery card -> starts the meme sequence
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

  // Video 1 playback (cut to half duration ~6.5s)
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

  // User taps meme frame -> unhooks and drops frame
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

  // When wish video starts (Phase 4), play and trigger corner share star after 3s
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
          PHASE 0, 1, 2: Center Day Counter -> 1s Blast -> Blank Center Waiting
          (Today / th day only show before blast; after blast, only blank space waits for tap)
          ========================================================================= */}
      {(phase === 0 || phase === 1 || phase === 2) && (
        <div 
          onClick={handleMysteryTap}
          className={`flex-1 flex flex-col items-center justify-center relative z-10 w-full ${phase === 2 ? 'cursor-pointer pointer-events-auto' : ''}`}
        >
          {/* Today tag only visible before blast */}
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
                    scale: [1, 1.35, 0.2],
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
            {phase === 0 && (
              <h1 className={`text-[7rem] sm:text-[8.5rem] font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                {daysRemaining}
              </h1>
            )}

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

          {/* Blank mystery state after blast: tap anywhere to see what happened */}
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <span className="text-3xl mb-1.5 animate-bounce">❓</span>
              <span className="text-xs font-bold text-amber-500 tracking-wider bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
                Tap to see what happened! ✨
              </span>
            </motion.div>
          )}

          {/* th day tag only visible before blast */}
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

                  {/* 2. POOJA VIDEO 1 (Zoomed out: object-contain scale-100 so all text is 100% visible) */}
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
                        className="w-full h-full object-contain scale-100"
                      />
                    </motion.div>
                  )}

                  {/* 3. POOJA VIDEO 2 (Restored to earlier original object-contain as requested) */}
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
          PHASE 4: Compact Saraswathi Wish Video perfectly centered in card
          Seamless background match & replay on tap
          ========================================================================= */}
      {phase === 4 && (
        <motion.div
          key="saraswathi-wish-phase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={handleWishVideoTap}
          className="flex-1 w-full flex flex-col items-center justify-center my-auto py-2 relative z-10 cursor-pointer pointer-events-auto"
          title="Tap to replay wish!"
        >
          {/* Subtitle */}
          <div className="flex flex-col items-center w-full mb-2">
            <motion.h3 
              initial={{ opacity: 0.8 }} 
              animate={{ opacity: 1 }} 
              transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
              className="text-amber-500 font-black text-xs sm:text-sm tracking-widest uppercase drop-shadow-sm text-center"
            >
              Happy Ayudha Pooja
            </motion.h3>
          </div>

          {/* Compact Video Frame: height reduced, centered cleanly */}
          <div className="relative w-[82%] max-w-[220px] aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 bg-black">
            <video
              ref={wishVideoRef}
              src={wishVideoSrc}
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-2 text-center">
            <span className="text-[9px] font-bold tracking-wider text-amber-500/80 uppercase">
              Tap to replay 🔁
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

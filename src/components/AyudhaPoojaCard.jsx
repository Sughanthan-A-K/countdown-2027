import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrackerBurst2D from './CrackerBurst2D';

export default function AyudhaPoojaCard({
  isDarkMode,
  daysRemaining,
  textPrimary,
  textSecondary,
  onShareSpecialCard,
  onTriggerShareStar,
  onPhaseChange, // Informs CalendarPage when wish video starts so card background changes invisibly
}) {
  // Phase sequence:
  // 0: Initial card (clean white in Light Mode / dark in Dark Mode) with "74th day".
  //    Exactly after 1.0s, a clean, professional fade-burst occurs without emojis/thunder.
  // 1: 2D Pattasu explosion -> number disappears completely.
  // 2: Clean empty mystery center: User sees empty space, taps it to reveal meme!
  // 3: Hanging Oonjal Meme frame:
  //    - Top tag: "TODAY SPECIAL" with red live dot
  //    - Pooja Image (scale-1.16)
  //    - Pooja Video 1 (scale-1.74, duration 3.2s)
  //    - Pooja Video 2 (original clean object-contain)
  //    - USER TAPS:
  //      * Music DOES NOT abruptly stop!
  //      * Central "Just Kidding 😂" message pops up for 1.4s with smooth humor
  //      * Then music fades/stops, and the frame falls down (gravity drop)
  // 4: Saraswathi Wish Video:
  //    - Full-bleed natural video spanning behind the entire card view
  //    - Replays video smoothly on every tap
  //    - Exactly 3s later, triggers the calendar's corner star & tooltip!

  const [phase, setPhase] = useState(0); 
  const [subPhase, setSubPhase] = useState('image'); // 'image' | 'video1' | 'video2'
  const [showJustKidding, setShowJustKidding] = useState(false);
  const [isFalling, setIsFalling] = useState(false);

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);

  // 1. Exactly 1s: 2D Pattasu / Firecracker blast animation explodes the number away
  useEffect(() => {
    if (phase === 0) {
      const burstTimer = setTimeout(() => {
        setPhase(1); // 2D firecracker explosion
        setTimeout(() => {
          setPhase(2); // purely empty mystery center waiting for user tap
        }, 600);
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

      // Step 1: 3.0s of Pooja Image -> go to Video 1
      const tImg = setTimeout(() => {
        setSubPhase('video1');
      }, 3000);
      return () => clearTimeout(tImg);
    }
  }, [phase]);

  // Step 2: Video 1 duration (3.2s) -> go to Video 2
  useEffect(() => {
    if (phase === 3 && subPhase === 'video1') {
      if (video1Ref.current) {
        video1Ref.current.currentTime = 0;
        video1Ref.current.play().catch(() => {});
      }

      const tVid1 = setTimeout(() => {
        setSubPhase('video2');
      }, 3200); // 3.2 seconds

      return () => clearTimeout(tVid1);
    }
  }, [phase, subPhase]);

  // Step 3: Video 2 playback
  useEffect(() => {
    if (phase === 3 && subPhase === 'video2') {
      if (video2Ref.current) {
        video2Ref.current.currentTime = 0;
        video2Ref.current.play().catch(() => {});
      }
    }
  }, [phase, subPhase]);

  // When Meme Audio finishes its cycle, loop back from the beginning unless user tapped
  const handleAudioEnded = () => {
    if (phase === 3 && !showJustKidding) {
      setSubPhase('image'); // restarts from first image!
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      setTimeout(() => {
        if (phase === 3 && !showJustKidding) setSubPhase('video1');
      }, 3000);
    }
  };

  // User taps meme frame:
  // 1. Music DOES NOT cut immediately!
  // 2. Shows "Just Kidding 😂" message in center
  // 3. After 1.4s, card falls down with gravity drop animation into wish video
  const triggerDropToWishVideo = () => {
    if (phase === 3 && !showJustKidding) {
      setShowJustKidding(true);

      // After 1.4s of "Just Kidding", trigger the fall drop animation
      setTimeout(() => {
        setIsFalling(true);
        if (audioRef.current) {
          audioRef.current.pause();
        }

        setTimeout(() => {
          setPhase(4); // Reveal full-card wish video
          if (onPhaseChange) {
            onPhaseChange(4);
          }
        }, 550);
      }, 1400);
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
      {/* Background Meme Audio */}
      <audio 
        ref={audioRef} 
        src="/Image and Audio/Meme Audio.mp3" 
        onEnded={handleAudioEnded}
        preload="auto" 
      />

      {/* =========================================================================
          PHASE 4: SARASWATHI WISH VIDEO (Full-bleed card video - not inside inner small frame!)
          Fills naturally without small inner borders, with original festive wish vibe
          ========================================================================= */}
      {phase === 4 && (
        <motion.div
          key="saraswathi-full-bleed-wish"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onClick={handleWishVideoTap}
          className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer pointer-events-auto"
          title="Tap to replay"
        >
          <video
            ref={wishVideoRef}
            src={wishVideoSrc}
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* =========================================================================
          PHASE 0, 1, 2: Center Day Counter -> 1s Clean Professional Blast -> Empty
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
                    scale: [1, 1.25, 0],
                    filter: ["brightness(1) blur(0px)", "brightness(2.5) blur(2px)", "brightness(3) blur(12px)"],
                    opacity: [1, 1, 0],
                    rotate: [0, -6, 8]
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

            {/* 2D Pattasu explosion */}
            {phase === 1 && <CrackerBurst2D />}
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
          With "Just Kidding 😂" message before gravity fall
          ========================================================================= */}
      {phase === 3 && (
        <div className="flex-1 w-full flex items-center justify-center relative z-20 my-auto py-1">
          {/* Central "Just Kidding" Pop-up when user taps */}
          <AnimatePresence>
            {showJustKidding && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-50 pointer-events-none flex flex-col items-center"
              >
                <div className="px-5 py-2 rounded-2xl bg-black/85 backdrop-blur-md border-2 border-amber-400 text-amber-300 shadow-2xl shadow-black/80 flex items-center gap-2">
                  <span className="text-xl">😂</span>
                  <span className="text-sm font-black tracking-widest uppercase drop-shadow-md">
                    Just Kidding!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key="hanging-meme-frame"
            initial={{ opacity: 0, scale: 0.75, y: -30 }}
            animate={
              isFalling
                ? {
                    y: 460,
                    rotate: 24,
                    opacity: 0,
                    scale: 0.65,
                    transition: { duration: 0.55, ease: [0.32, 0, 0.67, 0] }
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: [-1.6, 1.6, -1.6],
                    transition: {
                      y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    }
                  }
            }
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
              {/* Header: TODAY SPECIAL */}
              <div className="w-full flex items-center justify-center pb-1 px-1 border-b border-amber-500/20">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Today Special
                </span>
              </div>

              {/* Meme Visuals Container with dynamic theme background: white in Light Mode, black in Dark Mode */}
              <div className={`flex-1 relative w-full mt-1 rounded-xl overflow-hidden flex items-center justify-center transition-colors duration-300 ${
                isDarkMode ? 'bg-black' : 'bg-white'
              }`}>
                <AnimatePresence mode="wait">
                  {/* 1. POOJA IMAGE (Zoomed by +1.5px: scale 1.175, shifted up by 4px mb-1) */}
                  {subPhase === 'image' && (
                    <motion.div
                      key="pooja-image"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ 
                        opacity: 0, 
                        clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                        x: -15,
                        transition: { duration: 0.4 }
                      }}
                      className={`absolute inset-0 flex items-center justify-center overflow-hidden mb-1 ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                      }`}
                    >
                      <img
                        src={poojaImgSrc}
                        alt="Ayudha Pooja Special"
                        className="w-full h-full object-contain scale-[1.175]"
                      />
                    </motion.div>
                  )}

                  {/* 2. POOJA VIDEO 1 (White in Light Mode, Black in Dark Mode for bars) */}
                  {subPhase === 'video1' && (
                    <motion.div
                      key="pooja-video-1"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.35 } }}
                      className={`absolute inset-0 flex items-center justify-center overflow-hidden ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                      }`}
                    >
                      <video
                        ref={video1Ref}
                        src="/Image and Audio/Pooja Video 1.mp4"
                        playsInline
                        muted
                        autoPlay
                        className="w-full h-full object-contain scale-[1.74]"
                      />
                    </motion.div>
                  )}

                  {/* 3. POOJA VIDEO 2 (White in Light Mode, Black in Dark Mode for bars) */}
                  {subPhase === 'video2' && (
                    <motion.div
                      key="pooja-video-2"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute inset-0 flex items-center justify-center overflow-hidden ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                      }`}
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
    </div>
  );
}

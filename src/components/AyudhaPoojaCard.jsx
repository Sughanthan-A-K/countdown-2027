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
  // 0: Initial card (clean white in Light / dark in Dark) with "74th day".
  //    Exactly after 1.0s, the magical festival wheel (sudarshana / sacred pooja chakra) spins into center!
  // 1: Sacred Chakra spinning vortex effect:
  //    - Sacred golden rotating chakra / wheel appears
  //    - It spins rapidly, absorbing / dissolving the number into golden dust
  //    - Leaves an active, glowing sacred golden ring/wheel pulsing in center!
  // 2: Active pulsing chakra waiting for user tap:
  //    - Clearly tells the user something special is happening ("yetho effort aanaal dhaan adhu aagudhu-nu theriyum")
  //    - Pulsing golden sacred wheel invites user tap naturally!
  // 3: Hanging Oonjal Meme frame:
  //    - Top tag: "TODAY SPECIAL" with red live dot
  //    - Pooja Image (zoomed scale-1.08, plays looping Meme Audio)
  //    - Pooja Video 1 (lightly zoomed scale-1.08, halved duration ~6.5s)
  //    - Pooja Video 2 (original clean object-contain)
  //    - User tap -> unhooks and drops with gravity!
  // 4: Saraswathi Wish Video:
  //    - Compacted height, centered cleanly
  //    - Seamless background transition to match video tone
  //    - 3s later triggers corner share star & tooltip!

  const [phase, setPhase] = useState(0); 
  const [subPhase, setSubPhase] = useState('image'); // 'image' | 'video1' | 'video2'

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);

  // 1. After 1 second: Chakra spins in and dissolves the number
  useEffect(() => {
    if (phase === 0) {
      const timer = setTimeout(() => {
        setPhase(1); // Spinning chakra starts dissolving number
        setTimeout(() => {
          setPhase(2); // Active glowing chakra waiting for tap
        }, 800);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // User taps the glowing sacred chakra -> triggers the meme sequence
  const handleChakraTap = () => {
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

  // User taps meme frame -> unhooks and drops frame
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
          PHASE 0, 1, 2: Day Counter -> Spinning Sacred Wheel/Chakra -> Pulsing Tap
          ========================================================================= */}
      {(phase === 0 || phase === 1 || phase === 2) && (
        <div 
          onClick={handleChakraTap}
          className={`flex-1 flex flex-col items-center justify-center relative z-10 w-full ${phase === 2 ? 'cursor-pointer pointer-events-auto' : ''}`}
        >
          {phase === 0 && (
            <div className="w-full flex justify-start pl-8 z-20 mb-[-1rem]">
              <span className={`font-bold text-xs sm:text-sm tracking-widest uppercase ${textSecondary}`}>
                Today
              </span>
            </div>
          )}

          <div className="relative flex items-center justify-center">
            {/* Number dissolving when wheel spins */}
            <motion.div
              animate={
                phase === 1
                  ? {
                      scale: [1, 1.15, 0],
                      opacity: [1, 0.8, 0],
                      filter: ["blur(0px)", "blur(4px)", "blur(12px)"],
                    }
                  : phase === 2
                  ? { opacity: 0, scale: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {phase === 0 && (
                <h1 className={`text-[7rem] sm:text-[8.5rem] font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                  {daysRemaining}
                </h1>
              )}
            </motion.div>

            {/* Sacred Golden Chakra / Wheel spinning into center */}
            {(phase === 1 || phase === 2) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                animate={
                  phase === 1
                    ? {
                        opacity: [0, 1, 1],
                        scale: [0.3, 1.25, 1],
                        rotate: [0, 540, 1080],
                      }
                    : {
                        opacity: 1,
                        scale: [1, 1.08, 1],
                        rotate: 360,
                        transition: {
                          scale: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
                          rotate: { repeat: Infinity, duration: 6, ease: "linear" }
                        }
                      }
                }
                transition={phase === 1 ? { duration: 0.8, ease: "easeOut" } : undefined}
                className="absolute flex items-center justify-center pointer-events-none"
              >
                {/* Glowing Aura Ring */}
                <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-amber-400/30 via-orange-500/20 to-yellow-300/30 blur-xl animate-pulse" />

                {/* Ornate Sacred Wheel / Chakra SVG */}
                <svg
                  width="110"
                  height="110"
                  viewBox="0 0 100 100"
                  className="text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                >
                  {/* Outer Spoke Rim */}
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />

                  {/* 8 Sacred Wheel Spokes (Pooja Wheel) */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle} 50 50)`}>
                      <line x1="50" y1="10" x2="50" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="50" cy="11" r="2.5" fill="#f59e0b" />
                      <path d="M48 24 L50 20 L52 24 Z" fill="currentColor" />
                    </g>
                  ))}

                  {/* Inner Floral Core */}
                  <circle cx="50" cy="50" r="14" fill={isDarkMode ? "#1f1811" : "#fef3c7"} stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="7" fill="#f59e0b" />
                  <circle cx="50" cy="50" r="3" fill="#ffffff" />
                </svg>

                {/* Sparkle particle around the wheel */}
                <motion.div
                  animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute -top-1 -right-1 text-amber-300 text-xs"
                >
                  ✨
                </motion.div>
              </motion.div>
            )}
          </div>

          {phase === 0 && (
            <div className="w-full flex justify-end pr-8 z-20 mt-[-1rem]">
              <span className={`font-bold text-lg sm:text-xl italic ${textSecondary}`}>
                th day
              </span>
            </div>
          )}

          {/* Under-wheel subtle pulsing invitation so user knows to tap */}
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 flex items-center justify-center pointer-events-none"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500/90 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 backdrop-blur-sm shadow-sm">
                Tap the wheel ✨
              </span>
            </motion.div>
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
              {/* Header: TODAY SPECIAL */}
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

                  {/* 2. POOJA VIDEO 1 */}
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
                        className="w-full h-full object-contain scale-[1.08]"
                      />
                    </motion.div>
                  )}

                  {/* 3. POOJA VIDEO 2 */}
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
          ========================================================================= */}
      {phase === 4 && (
        <motion.div
          key="saraswathi-wish-phase"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={handleWishVideoTap}
          className="flex-1 w-full flex flex-col items-center justify-center my-auto py-1 relative z-10 cursor-pointer pointer-events-auto"
          title="Tap to replay"
        >
          <div className="relative w-[80%] max-w-[210px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-amber-600/30">
            <video
              ref={wishVideoRef}
              src={wishVideoSrc}
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

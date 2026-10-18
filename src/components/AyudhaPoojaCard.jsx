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
  // 0: Initial card (clean white in Light Mode / dark in Dark Mode) with "Today", "74th day".
  // 1: Exactly after 1.2s, a stylish festive rotating Chakra / Wheel of Fortune energy effect spins into center,
  //    swirling the number into a gold vortex and vanishing it with a clear, deliberate visual effect!
  // 2: Pulsing glowing chakra center portal with shimmering particles - user clearly sees something magical is waiting, taps it!
  // 3: Hanging Oonjal Meme frame:
  //    - Gentle sway animation
  //    - Top tag: "TODAY SPECIAL" with red live dot (NO "Tap to Drop" or inner share buttons!)
  //    - Pooja Image (zoomed slightly scale-1.08 to fit nicely, plays looping Meme Audio)
  //    - Pooja Video 1: mildly zoomed in (scale-1.08) so it's not sunken, all text visible, duration halved (~6.5s)
  //    - Pooja Video 2: original clean object-contain without forced stretch
  //    - User tap on frame -> frame drops down by gravity!
  // 4: Saraswathi Wish Video:
  //    - Compacted height, perfectly centered in card
  //    - NO top "Ayudha Pooja" text, NO "Tap to replay" text (video already has text)
  //    - Card background changes seamlessly to match video's background tone
  //    - Replays video smoothly on every tap
  //    - Exactly 3s later, triggers the calendar's corner star & tooltip!

  const [phase, setPhase] = useState(0); 
  const [subPhase, setSubPhase] = useState('image'); // 'image' | 'video1' | 'video2'

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);

  // 1. After 1.2s: Chakra wheel spin & vortex effect dissolves the number
  useEffect(() => {
    if (phase === 0) {
      const spinTimer = setTimeout(() => {
        setPhase(1); // Chakra wheel spins & absorbs the number
        setTimeout(() => {
          setPhase(2); // Waiting in glowing portal state
        }, 850);
      }, 1200);
      return () => clearTimeout(spinTimer);
    }
  }, [phase]);

  // User taps on the glowing chakra portal -> reveals meme
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
          PHASE 0, 1, 2: Center Day Counter -> Chakra Wheel Spin & Disappear -> Interactive Portal
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

          <div className="relative flex items-center justify-center">
            {/* Spinning Golden Wheel / Chakra Effect during Phase 1 & 2 */}
            <AnimatePresence>
              {(phase === 1 || phase === 2) && (
                <motion.div
                  key="chakra-wheel"
                  initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: phase === 1 ? [0.4, 1.3, 1] : [1, 1.1, 1],
                    rotate: 360 
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: phase === 1 ? 1.2 : 4, ease: "linear" },
                    scale: { duration: 0.8 }
                  }}
                  className="absolute pointer-events-none z-30 flex items-center justify-center"
                >
                  {/* Intricate Ayudha Pooja Sacred Wheel SVG */}
                  <svg width="140" height="140" viewBox="0 0 100 100" className="text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.85" />
                    <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                    <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.9" />
                    {/* 8 Spokes / Rays */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="12"
                        x2="50"
                        y2="42"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        transform={`rotate(${deg} 50 50)`}
                      />
                    ))}
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Number: Swirls into the chakra wheel and vanishes */}
            <motion.div
              animate={
                phase === 1
                  ? {
                      scale: [1, 0.7, 0],
                      rotate: [0, 180, 360],
                      opacity: [1, 0.8, 0],
                      filter: ["blur(0px)", "blur(2px)", "blur(8px)"],
                    }
                  : phase === 2
                  ? { opacity: 0, scale: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="relative flex items-center justify-center"
            >
              {phase === 0 && (
                <h1 className={`text-[7rem] sm:text-[8.5rem] font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                  {daysRemaining}
                </h1>
              )}
            </motion.div>

            {/* In Phase 2: Gentle pulsating aura inside the wheel inviting the user to tap */}
            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute flex flex-col items-center justify-center pointer-events-none z-40"
              >
                <div className="w-16 h-16 rounded-full bg-amber-400/20 blur-md animate-pulse" />
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
                  {/* 1. POOJA IMAGE (Nicely zoomed scale-1.08) */}
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

                  {/* 2. POOJA VIDEO 1 (Lightly zoomed scale-1.08, halved duration ~6.5s) */}
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

                  {/* 3. POOJA VIDEO 2 (Clean original object-contain) */}
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
          PHASE 4: Saraswathi Wish Video (Clean, Compact, Seamless)
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
          {/* Compact Video Frame */}
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

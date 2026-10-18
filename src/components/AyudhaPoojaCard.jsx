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
  // 1: Blowout flash/fade -> number disappears completely.
  // 2: Clean empty mystery center: User sees empty space, taps it to reveal meme!
  // 3: Hanging Oonjal Meme frame:
  //    - Gentle sway animation
  //    - Top tag: "TODAY SPECIAL" with red live dot (NO "Tap to Drop" or inner share buttons!)
  //    - Pooja Image (zoomed slightly to fit nicely, plays looping Meme Audio)
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

  // Step 2: Video 1 duration shortened to 4.0s as requested -> go to Video 2
  useEffect(() => {
    if (phase === 3 && subPhase === 'video1') {
      if (video1Ref.current) {
        video1Ref.current.currentTime = 0;
        video1Ref.current.play().catch(() => {});
      }

      const tVid1 = setTimeout(() => {
        setSubPhase('video2');
      }, 4000); // 4 seconds

      return () => clearTimeout(tVid1);
    }
  }, [phase, subPhase]);

  // Step 3: Video 2 playback (plays the remaining time until music loop repeats or user taps)
  useEffect(() => {
    if (phase === 3 && subPhase === 'video2') {
      if (video2Ref.current) {
        video2Ref.current.currentTime = 0;
        video2Ref.current.play().catch(() => {});
      }
    }
  }, [phase, subPhase]);

  // When Meme Audio finishes its cycle, loop back from the beginning (restart from first image & replay audio)
  // Loop continues until user taps to drop the frame!
  const handleAudioEnded = () => {
    if (phase === 3) {
      setSubPhase('image'); // restarts from first image!
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      // Trigger image -> video1 after 3s again
      setTimeout(() => {
        if (phase === 3) setSubPhase('video1');
      }, 3000);
    }
  };

  // User taps meme frame -> unhooks and drops frame with gravity into wish video
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
      {/* Background Meme Audio (plays once until end, no re-looping) */}
      <audio 
        ref={audioRef} 
        src="/Image and Audio/Meme Audio.mp3" 
        onEnded={handleAudioEnded}
        preload="auto" 
      />

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

            {/* 2D Pattasu explosion: Vector spark rays, shockwave ring & flying embers */}
            {phase === 1 && <CrackerBurst2D />}
          </motion.div>

          {/* Clean purely empty center after blast - No question marks, no emojis! */}
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
              {/* Header: TODAY SPECIAL (NO "Tap to Drop" or inner share text!) */}
              <div className="w-full flex items-center justify-center pb-1 px-1 border-b border-amber-500/20">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Today Special
                </span>
              </div>

              {/* Meme Visuals */}
              <div className="flex-1 relative w-full mt-1 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {/* 1. POOJA IMAGE (Zoomed in by 2-4%: scale 1.18) */}
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
                      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
                    >
                      <img
                        src={poojaImgSrc}
                        alt="Ayudha Pooja Special"
                        className="w-full h-full object-contain scale-[1.18]"
                      />
                    </motion.div>
                  )}

                  {/* 2. POOJA VIDEO 1 (Nalla zoom in: scale 1.60, shortened to 4s) */}
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
                        className="w-full h-full object-contain scale-[1.60]"
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
          - Centered cleanly with reduced height
          - NO duplicate "Happy Ayudha Pooja" (video has it)
          - NO "Tap to replay" text
          - Seamless transition
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
          {/* Compact Video Frame: height reduced, centered cleanly without duplicate titles */}
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

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrackerBurst2D from './CrackerBurst2D';

export default function AyudhaPoojaCard({
  isTop = true,
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

  const isDev = typeof window !== 'undefined' && localStorage.getItem('isDevMode') === 'true';
  const isAlreadyDone = !isDev && typeof window !== 'undefined' && localStorage.getItem('ayudhaPoojaEventDone_2026') === 'true';
  const [phase, setPhase] = useState(() => (isAlreadyDone ? 4 : 0)); 
  const [subPhase, setSubPhase] = useState('image'); // 'image' | 'video1' | 'video2'
  const [memeTapStep, setMemeTapStep] = useState(null); // null | 'holidays' | 'kidding'
  const [isFalling, setIsFalling] = useState(false);

  const audioRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const wishVideoRef = useRef(null);
  const wishAudioRef = useRef(null);

  // If already completed previously, notify parent of phase 4 right on mount
  useEffect(() => {
    if (isAlreadyDone && onPhaseChange) {
      onPhaseChange(4);
    }
  }, []);

  // 1. Exactly 1s after card becomes top/visible: 2D Pattasu / Firecracker blast animation explodes the number away
  useEffect(() => {
    if (isTop && phase === 0) {
      const burstTimer = setTimeout(() => {
        setPhase(1); // 2D firecracker explosion
        setTimeout(() => {
          setPhase(2); // purely empty mystery center waiting for user tap
        }, 600);
      }, 1000);
      return () => clearTimeout(burstTimer);
    }
  }, [isTop, phase]);

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
    if (phase === 3 && !memeTapStep) {
      setSubPhase('image'); // restarts from first image!
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      setTimeout(() => {
        if (phase === 3 && !memeTapStep) setSubPhase('video1');
      }, 3000);
    }
  };

  // User taps meme frame:
  // 1. Shows "Happy Pooja Holidays" (with Pooja in red text) for 2.5s
  // 2. Then switches smoothly to "Just Kidding" for 2.0s
  // 3. Then meme frame falls down with gravity drop animation into wish video
  const triggerDropToWishVideo = () => {
    if (phase === 3 && !memeTapStep) {
      setMemeTapStep('holidays'); // Step 1: "Happy Pooja Holidays" (2.5s)

      // Step 2: After 2.5s, change to "Just Kidding"
      setTimeout(() => {
        setMemeTapStep('kidding');

        // Step 3: After 2.0s of "Just Kidding", trigger fall drop animation into Saraswathi wish video
        setTimeout(() => {
          setIsFalling(true);
          if (onPhaseChange) {
            onPhaseChange(4); // Starts smooth card color transition
          }
          if (audioRef.current) {
            audioRef.current.pause();
          }

          setTimeout(() => {
            setPhase(4); // Reveal wish video
          }, 550);
        }, 2000);
      }, 2500);
    }
  };

  // Replay wish video & audio on tap when in phase 4
  const handleWishVideoTap = () => {
    if (phase === 4) {
      if (wishVideoRef.current) {
        wishVideoRef.current.playbackRate = 1;
        wishVideoRef.current.currentTime = 0;
        wishVideoRef.current.play().catch(() => {});
      }
      if (wishAudioRef.current) {
        wishAudioRef.current.currentTime = 0;
        wishAudioRef.current.play().catch(() => {});
      }
    }
  };

  const hasTriggeredShareRef = useRef(false);

  // Trigger corner share star and tooltip 1s after the wish video/audio has played
  const triggerShareWithDelay = () => {
    // Save completion state in localStorage so returning user or user after onboarding sees Saraswathi wish directly!
    try {
      localStorage.setItem('ayudhaPoojaEventDone_2026', 'true');
    } catch (e) {
      console.warn("Storage error:", e);
    }

    if (!hasTriggeredShareRef.current) {
      hasTriggeredShareRef.current = true;
      setTimeout(() => {
        if (onTriggerShareStar) {
          onTriggerShareStar();
        }
      }, 1000); // exactly 1 second delay
    }
  };

  // When wish audio finishes playing
  const handleWishAudioEnded = () => {
    triggerShareWithDelay();
  };

  // Video freeze & audio sync logic:
  // Video plays smoothly and freezes at 4.5s.
  // At the EXACT SAME MOMENT, audio is paused simultaneously!
  const handleWishTimeUpdate = () => {
    const video = wishVideoRef.current;
    if (!video) return;

    const t = video.currentTime;

    // Smoothly step down playbackRate near the freeze point without hammering CPU/GPU on every frame
    if (t >= 3.8 && t < 4.5) {
      if (video.playbackRate !== 0.6) {
        video.playbackRate = 0.6;
      }
    } else if (t >= 4.5 && !video.paused) {
      video.playbackRate = 1;
      video.pause();
      // Simultaneously pause the wish audio at the exact same moment!
      if (wishAudioRef.current && !wishAudioRef.current.paused) {
        wishAudioRef.current.pause();
      }
      triggerShareWithDelay();
    }
  };

  const poojaImgSrc = isDarkMode 
    ? "/Image and Audio/Pooja Dark mode.png" 
    : "/Image and Audio/Pooja.png";

  const wishVideoSrc = isDarkMode 
    ? "/Image and Audio/Dark Mode.mp4" 
    : "/Image and Audio/Light Mode.mp4";

  // When wish video starts (Phase 4) or when isDarkMode / theme toggles:
  // Re-sync video & audio so switching between Light and Dark mode seamlessly continues playing with sound!
  useEffect(() => {
    if (phase === 4) {
      if (wishVideoRef.current) {
        wishVideoRef.current.playbackRate = 1;
        wishVideoRef.current.currentTime = 0;
        wishVideoRef.current.play().catch(() => {});
      }
      if (wishAudioRef.current) {
        wishAudioRef.current.load();
        wishAudioRef.current.currentTime = 0;
        wishAudioRef.current.play().catch((err) => {
          console.warn("Wish audio playback error:", err);
        });
      }

      // Fallback timer: wish video is ~5.8s; in case audio onEnded doesn't fire (e.g. autoplay restriction), trigger after 5.8s + 1s = 6.8s
      const fallbackTimer = setTimeout(() => {
        triggerShareWithDelay();
      }, 7000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [phase, isDarkMode]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden select-none">
      {/* Background Meme Audio */}
      <audio 
        ref={audioRef} 
        src="/Image and Audio/Meme Audio.mp3" 
        onEnded={handleAudioEnded}
        preload="auto" 
      />

      {/* Wish Video Audio Track (key ensures element re-mounts/reloads cleanly on theme change) */}
      <audio
        key={`wish-audio-${isDarkMode ? 'dark' : 'light'}`}
        ref={wishAudioRef}
        src={wishVideoSrc}
        onEnded={handleWishAudioEnded}
        preload="auto"
      />

      {/* =========================================================================
          PHASE 4: SARASWATHI WISH VIDEO
          - Scaled up by 5px and centered cleanly
          - Video smoothly slows down (decelerates) and pauses at 4.5s
          - Audio plays fully to completion
          - "Today", "74th day" counter placed right at the bottom
          ========================================================================= */}
      {phase === 4 && (
        <motion.div
          key="saraswathi-full-bleed-wish"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onClick={handleWishVideoTap}
          className={`w-full h-full flex flex-col items-center justify-between pointer-events-auto cursor-pointer relative pb-1 ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#e4dbce]'}`}
          title="Tap to replay"
        >
          {/* Centered video scaled up by another 5px (315px + 5px = 320px, scale 1.07) */}
          <div className="flex-1 w-full flex items-center justify-center my-auto overflow-hidden">
            <div className="w-[100%] max-w-[320px] aspect-square flex items-center justify-center overflow-hidden">
              <video
                key={`wish-video-${isDarkMode ? 'dark' : 'light'}`}
                ref={wishVideoRef}
                src={wishVideoSrc}
                playsInline
                autoPlay
                muted
                loop={false}
                onTimeUpdate={handleWishTimeUpdate}
                className="w-full h-full object-contain scale-[1.07]"
              />
            </div>
          </div>

          {/* Special Card Counter: "Today", "74th day" */}
          <div className="w-full flex flex-col items-center justify-center pb-1 z-20">
            <div className="flex items-baseline gap-1.5">
              <span className={`font-bold text-xs sm:text-sm tracking-widest uppercase mr-0.5 ${textSecondary}`}>
                Today
              </span>
              <h1 className={`text-4xl sm:text-5xl font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                {daysRemaining}
              </h1>
              <span className={`font-bold text-sm sm:text-base italic ${textSecondary}`}>
                th day
              </span>
            </div>
          </div>
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
          {/* Central message pill when user taps: 1. Happy Pooja Holidays -> 2. Just Kidding */}
          <AnimatePresence mode="wait">
            {memeTapStep === 'holidays' && (
              <motion.div
                key="msg-happy-pooja-holidays"
                initial={{ opacity: 0, scale: 0.85, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.92, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-50 pointer-events-none flex flex-col items-center"
              >
                <div className="relative px-5 py-2.5 rounded-full bg-neutral-950/90 backdrop-blur-xl border border-amber-400/40 text-amber-100 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(251,191,36,0.3)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                  <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase">
                    Happy <span className="text-red-500 font-black">Pooja</span> Holidays
                  </span>
                  <span className="text-amber-400 text-xs">🎉</span>
                </div>
              </motion.div>
            )}

            {memeTapStep === 'kidding' && (
              <motion.div
                key="msg-just-kidding"
                initial={{ opacity: 0, scale: 0.85, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-50 pointer-events-none flex flex-col items-center"
              >
                <div className="relative px-6 py-2.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-amber-400/40 text-amber-200 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(251,191,36,0.25)] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-200 animate-pulse shadow-[0_0_8px_#fbbf24]" />
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-amber-100">
                    Just Kidding
                  </span>
                  <span className="text-amber-400/90 text-xs font-serif italic">✨</span>
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
            className="w-[88%] max-w-[260px] aspect-[4/5] max-h-[305px] flex flex-col items-center cursor-pointer pointer-events-auto select-none"
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
                  {/* 1. POOJA IMAGE (Height increased by 4px at bottom: pb-1) */}
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
                      className={`absolute inset-0 flex items-center justify-center overflow-hidden pb-1 ${
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

                  {/* 2. POOJA VIDEO 1 (Cropped letterbox bars: white in Light Mode, black in Dark Mode) */}
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
                      <div 
                        className="w-full h-full flex items-center justify-center overflow-hidden"
                        style={{
                          // Crops the video's internal baked-in top & bottom black letterbox bars (~17%) cleanly!
                          clipPath: 'inset(17.5% 0% 17.5% 0%)',
                        }}
                      >
                        <video
                          ref={video1Ref}
                          src="/Image and Audio/Pooja Video 1.mp4"
                          playsInline
                          muted
                          autoPlay
                          className="w-full h-full object-contain scale-[1.74]"
                        />
                      </div>
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

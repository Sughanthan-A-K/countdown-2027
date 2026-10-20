import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrackerBurst2D from './CrackerBurst2D';

export default function VijayadashamiCard({
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
  // 0: Initial card (clean white in Light Mode / dark in Dark Mode) with "73rd day" (or 75th if past/dev).
  //    Exactly after 1.0s, a clean 2D Pattasu explosion explodes the number away.
  // 1: 2D Pattasu explosion -> number disappears completely.
  // 2: Clean empty mystery center: User sees empty space, taps it to reveal meme!
  // 3: Hanging Oonjal Meme frame:
  //    - Top tag: "TODAY SPECIAL" with red live dot
  //    - "Yesterday but" image (scale-1.16) with top message badge "Yesterday But Now..."
  //    - Switches after 3.0s to "Vijayaதசமி Meme" image with top message badge "Vijayadashami Special"
  //    - Switches after 3.2s to "Vijaya____.mp4" video (looped)
  //    - USER TAPS:
  //      * Central "Happy VIJAY Dashami" (VIJAY in bright red) pops up for 2.5s
  //      * Then switches smoothly to "Just Kidding" for 2.0s
  //      * Then the frame falls down (gravity drop) into wish video
  // 4: Vijayadashami Wish Video:
  //    - Full-bleed natural video spanning behind the entire card view
  //    - Replays video smoothly on every tap
  //    - Synchronized pause at 4.5s
  //    - Exactly 1s later, triggers the calendar's corner star & tooltip!

  const isDev = typeof window !== 'undefined' && localStorage.getItem('isDevMode') === 'true';
  const isAlreadyDone = !isDev && typeof window !== 'undefined' && localStorage.getItem('vijayadashamiEventDone_2026') === 'true';
  const [phase, setPhase] = useState(() => (isAlreadyDone ? 4 : 0)); 
  const [arrowFlying, setArrowFlying] = useState(false);
  const [subPhase, setSubPhase] = useState('yesterday'); // 'yesterday' | 'meme' | 'video'
  const [showButNowBadge, setShowButNowBadge] = useState(false);
  const [memeTapStep, setMemeTapStep] = useState(null); // null | 'vijay' | 'kidding'
  const [isFalling, setIsFalling] = useState(false);

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const wishVideoRef = useRef(null);
  const wishAudioRef = useRef(null);

  // If already completed previously, notify parent of phase 4 right on mount
  useEffect(() => {
    if (isAlreadyDone && onPhaseChange) {
      onPhaseChange(4);
    }
  }, []);

  // 1. Vijayadashami Arrow & 2D blast sequence:
  //    - At 0.8s: Golden blazing arrow flies in from top-right corner pointing to 73rd day
  //    - At 1.15s: Arrow hits the center of "73" -> triggers 2D Pattasu explosion -> number explodes away!
  //    - At 1.75s: Transition to phase 2 (empty mystery center waiting for user tap)
  useEffect(() => {
    if (isTop && phase === 0) {
      const arrowTimer = setTimeout(() => {
        setArrowFlying(true);
      }, 750);

      const impactTimer = setTimeout(() => {
        setPhase(1); // 2D firecracker explosion triggered by arrow strike!
        setTimeout(() => {
          setPhase(2); // purely empty mystery center waiting for user tap
        }, 600);
      }, 1150);

      return () => {
        clearTimeout(arrowTimer);
        clearTimeout(impactTimer);
      };
    }
  }, [isTop, phase]);

  // User taps on the empty mystery card -> triggers meme sequence
  const handleMysteryTap = () => {
    if (phase === 2) {
      setPhase(3); 
      setSubPhase('yesterday');
      setShowButNowBadge(false);
    }
  };

  // When phase 3 starts (Meme sequence):
  // 1. "Yesterday" shows with Meme Audio
  // 2. At 1.8s, "But Now..." badge message pops up
  // 3. At 3.0s, transition to Vijayaதசமி Meme
  // 4. Meme Audio plays across BOTH "Yesterday" and "Vijayaதசமி Meme",
  //    and smoothly fades to silent in the final 0.5s of "Vijayaதசமி Meme"!
  useEffect(() => {
    if (phase === 3 && subPhase === 'yesterday') {
      if (audioRef.current) {
        audioRef.current.volume = 1;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn("Audio autoplay prevented, will play on interaction:", err);
        });
      }

      // Step 1a: After 1.8s, "But Now..." message appears
      const tButNow = setTimeout(() => {
        setShowButNowBadge(true);
      }, 1800);

      // Step 1b: At 3.0s, transition into Vijayaதசமி Meme (Audio keeps playing without stopping!)
      const tToMeme = setTimeout(() => {
        setSubPhase('meme');
      }, 3000);

      return () => {
        clearTimeout(tButNow);
        clearTimeout(tToMeme);
      };
    }
  }, [phase, subPhase]);

  // Step 2: "Vijayaதசமி Meme" Image duration (3.2s):
  // Audio continues playing throughout, then in the last 0.5s fades smoothly to 0 before Vijaya____ video starts
  useEffect(() => {
    if (phase === 3 && subPhase === 'meme') {
      let fadeInterval = null;

      // Start smooth fade 0.5s before transition (at 2700ms) with small 30ms steps for pure whisper-smooth fade
      const tFade = setTimeout(() => {
        fadeInterval = setInterval(() => {
          if (audioRef.current) {
            if (audioRef.current.volume > 0.05) {
              audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.06);
            } else {
              audioRef.current.volume = 0;
            }
          }
        }, 30);
      }, 2700);

      const tMeme = setTimeout(() => {
        if (fadeInterval) clearInterval(fadeInterval);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.volume = 1;
        }
        setSubPhase('video');
      }, 3200); // 3.2 seconds total meme duration

      return () => {
        clearTimeout(tFade);
        clearTimeout(tMeme);
        if (fadeInterval) clearInterval(fadeInterval);
      };
    }
  }, [phase, subPhase]);

  // Step 3: Vijaya____.mp4 Video playback:
  // Plays with its own full native audio loud and clear!
  useEffect(() => {
    if (phase === 3 && subPhase === 'video') {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (videoRef.current) {
        const v = videoRef.current;
        v.currentTime = 0;
        // Attempt unmuted play first:
        v.muted = false;
        v.volume = 1;
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.warn("Unmuted autoplay restricted by browser, retrying muted:", e);
            // If browser policy blocks sound without direct tap, start playback muted so video immediately plays!
            v.muted = true;
            v.play().catch((err) => console.error("Video play fallback failed:", err));
          });
        }
      }
    }
  }, [phase, subPhase]);

  // When Meme Audio finishes (or when subPhase resets), stop audio if not in 'yesterday'
  const handleAudioEnded = () => {
    // Audio is strictly for 'yesterday'
  };

  // User taps meme frame:
  // 1. Shows "Happy VIJAY Dashami" (with VIJAY in red text) for 2.5s
  // 2. Then switches smoothly to "Again Kidding" for 2.0s
  // 3. Then meme frame falls down with gravity drop animation into wish video
  const triggerDropToWishVideo = () => {
    if (phase === 3 && !memeTapStep) {
      setMemeTapStep('vijay'); // Step 1: "Happy VIJAY Dashami" (2.5s)

      // Step 2: After 2.5s, change to "Again Kidding"
      setTimeout(() => {
        setMemeTapStep('kidding');

        // Step 3: After 2.0s of "Again Kidding", trigger fall drop animation into Vijayadashami wish video
        setTimeout(() => {
          setIsFalling(true);
          if (onPhaseChange) {
            onPhaseChange(4); // Starts smooth card color transition
          }
          if (audioRef.current) {
            audioRef.current.pause();
          }
          if (videoRef.current) {
            videoRef.current.pause();
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
    try {
      localStorage.setItem('vijayadashamiEventDone_2026', 'true');
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

  const wishVideoSrc = isDarkMode 
    ? "/Image and Audio/VijayaDashami. Dark Mode.mp4" 
    : "/Image and Audio/VijayaDashami. Light Mode.mp4";

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

      // Fallback timer: wish video is 6.0s; in case audio onEnded doesn't fire, trigger after 6.0s + 1s = 7.0s
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
        key={`vijaya-wish-audio-${isDarkMode ? 'dark' : 'light'}`}
        ref={wishAudioRef}
        src={wishVideoSrc}
        onEnded={handleWishAudioEnded}
        preload="auto" 
      />

      {/* =========================================================================
          PHASE 4: VIJAYADASHAMI WISH VIDEO
          - Scaled up by 5px and centered cleanly
          - Video smoothly slows down (decelerates) and pauses at 4.5s
          - Audio pauses simultaneously at 4.5s
          - "Today", "73rd day" counter placed right at the bottom
          ========================================================================= */}
      {phase === 4 && (
        <motion.div
          key="vijayadashami-full-bleed-wish"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onClick={handleWishVideoTap}
          className={`w-full h-full flex flex-col items-center justify-between pointer-events-auto cursor-pointer relative pb-1 ${isDarkMode ? 'bg-[#181818]' : 'bg-[#e6decc]'}`}
          title="Tap to replay"
        >
          {/* Centered video scaled up cleanly */}
          <div className="flex-1 w-full flex items-center justify-center my-auto overflow-hidden">
            <div className="w-[100%] max-w-[320px] aspect-square flex items-center justify-center overflow-hidden">
              <video
                key={`vijaya-wish-video-${isDarkMode ? 'dark' : 'light'}`}
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

          {/* Special Card Counter: "Today", "73rd day" */}
          <div className="w-full flex flex-col items-center justify-center pb-1 z-20">
            <div className="flex items-baseline gap-1.5">
              <span className={`font-bold text-xs sm:text-sm tracking-widest uppercase mr-0.5 ${textSecondary}`}>
                Today
              </span>
              <h1 className={`text-4xl sm:text-5xl font-black leading-none tracking-tighter text-center ${textPrimary}`}>
                {daysRemaining}
              </h1>
              <span className={`font-bold text-sm sm:text-base italic ${textSecondary}`}>
                {daysRemaining === 1 ? 'st day' : daysRemaining === 2 ? 'nd day' : daysRemaining === 3 ? 'rd day' : 'th day'}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          PHASE 0, 1, 2: Center Day Counter -> Vijayadashami Bow & Arrow Strike -> 2D Blast -> Empty
          ========================================================================= */}
      {(phase === 0 || phase === 1 || phase === 2) && (
        <div 
          onClick={handleMysteryTap}
          className={`flex-1 flex flex-col items-center justify-center relative z-10 w-full overflow-hidden ${phase === 2 ? 'cursor-pointer pointer-events-auto' : ''}`}
        >
          {/* Flying Golden Arrow (Villu / Arrow Animation) - Pierces in, then blasts into sparks with 73! */}
          <AnimatePresence>
            {(phase === 0 || phase === 1) && arrowFlying && (
              <motion.div
                key="vijaya-flying-arrow"
                initial={{ x: -260, y: -260, rotate: 225, opacity: 0, scale: 0.7 }}
                animate={
                  phase === 1
                    ? {
                        x: 0,
                        y: 0,
                        rotate: 225,
                        scale: [1, 1.4, 0], // Explodes outward into the blast
                        filter: [
                          "brightness(1) blur(0px)",
                          "brightness(3) blur(2px)",
                          "brightness(4) blur(10px)"
                        ],
                        opacity: [1, 1, 0],
                      }
                    : { 
                        x: [ -260, 10, 0 ], 
                        y: [ -260, 10, 0 ], 
                        rotate: 225, 
                        opacity: 1, 
                        scale: 1 
                      }
                }
                exit={{ opacity: 0, scale: 0 }}
                transition={
                  phase === 1
                    ? { duration: 0.45, ease: "easeOut" }
                    : { duration: 0.38, times: [0, 0.88, 1], ease: "easeIn" }
                }
                className="absolute z-40 pointer-events-none flex items-center justify-center"
              >
                {/* Ancient Golden Blazing Arrow pointing down-left toward center */}
                <svg width="120" height="28" viewBox="0 0 120 28" fill="none" className="overflow-hidden">
                  <defs>
                    <linearGradient id="arrowTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="15%" stopColor="#fbbf24" stopOpacity="1" />
                      <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <filter id="goldenGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3.5" result="glow" />
                      <feComposite in="SourceGraphic" in2="glow" operator="over" />
                    </filter>
                    {/* Clip-path to hide the tip so it looks deeply pierced/embedded inside */}
                    <clipPath id="pierceClip">
                      <rect x="12" y="0" width="108" height="28" />
                    </clipPath>
                  </defs>

                  {/* Luminous streak trail behind the arrow (stretching back right) */}
                  <line x1="30" y1="14" x2="120" y2="14" stroke="url(#arrowTrailGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />

                  {/* Arrow Wooden / Golden Shaft */}
                  <line x1="16" y1="14" x2="96" y2="14" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
                  <line x1="20" y1="14" x2="92" y2="14" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Traditional Triple Curved Fletching at the tail */}
                  <path d="M94 14C100 9 108 7 114 7M94 14C100 19 108 21 114 21" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                  <path d="M86 14C92 10 100 8 106 8M86 14C92 18 100 20 106 20" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Razor Sharp Golden Arrowhead - Clipped at the tip (x < 12) so it looks embedded inside the target */}
                  <g clipPath="url(#pierceClip)">
                    <g filter="url(#goldenGlow)">
                      <polygon points="2,14 24,5 18,14 24,23" fill="url(#bladeGrad)" stroke="#f59e0b" strokeWidth="1" />
                      <line x1="6" y1="14" x2="22" y2="14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      {/* Blazing energy tip sparkle */}
                      <circle cx="12" cy="14" r="3.5" fill="#ffffff" />
                    </g>
                  </g>

                  {/* Impact crack / penetration ripple at the insertion point */}
                  <line x1="12" y1="8" x2="12" y2="20" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

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
                {daysRemaining === 1 ? 'st day' : daysRemaining === 2 ? 'nd day' : daysRemaining === 3 ? 'rd day' : 'th day'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          PHASE 3: Hanging Oonjal Meme Frame (TODAY SPECIAL)
          With "Happy VIJAY Dashami" (VIJAY in red) -> "Just Kidding" message before gravity fall
          ========================================================================= */}
      {phase === 3 && (
        <div className="flex-1 w-full flex items-center justify-center relative z-20 my-auto py-1">
          {/* Central message pill when user taps: 1. Happy VIJAY Dashami -> 2. Just Kidding */}
          <AnimatePresence mode="wait">
            {memeTapStep === 'vijay' && (
              <motion.div
                key="msg-happy-vijay-dashami"
                initial={{ opacity: 0, scale: 0.85, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.92, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-50 pointer-events-none flex flex-col items-center"
              >
                <div className="relative px-5 py-2.5 rounded-full bg-neutral-950/90 backdrop-blur-xl border border-amber-400/40 text-amber-100 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(251,191,36,0.3)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                  <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase">
                    HAPPY <span className="text-red-500 font-black">VIJAY</span>'a DASHAMI
                  </span>
                  <span className="text-amber-400 text-xs">🎉</span>
                </div>
              </motion.div>
            )}

            {memeTapStep === 'kidding' && (
              <motion.div
                key="msg-again-kidding-vijay"
                initial={{ opacity: 0, scale: 0.85, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-50 pointer-events-none flex flex-col items-center"
              >
                <div className="relative px-6 py-2.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-amber-400/40 text-amber-200 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(251,191,36,0.25)] flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-200 animate-pulse shadow-[0_0_8px_#fbbf24]" />
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-amber-100">
                    Again Kidding
                  </span>
                  <span className="text-amber-400/90 text-xs font-serif italic">✨</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key="hanging-meme-frame-vijaya"
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={
              isFalling
                ? {
                    y: 420,
                    rotate: 18,
                    opacity: 0,
                    scale: 0.7,
                    transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] }
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: [-0.7, 0.7, -0.7],
                    transition: {
                      y: { duration: 0.4, ease: "easeOut" },
                      scale: { duration: 0.4, ease: "easeOut" },
                      rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }
                  }
            }
            style={{ 
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
            onClick={triggerDropToWishVideo}
            className="w-[92%] max-w-[276px] aspect-[4/5] max-h-[326px] flex flex-col items-center cursor-pointer pointer-events-auto select-none"
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
              {/* Header: Fixed clean title "Yesterday" during phase 1, "Today Special" otherwise */}
              <div className="w-full flex items-center justify-center pb-1 px-1 border-b border-amber-500/20">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  {subPhase === 'yesterday' ? 'Yesterday' : 'Today Special'}
                </span>
              </div>

              {/* Meme Visuals Container */}
              <div className={`flex-1 relative w-full mt-1 rounded-xl overflow-hidden flex items-center justify-center transition-colors duration-300 ${
                isDarkMode ? 'bg-black' : 'bg-white'
              }`}>
                {/* "But Now..." floating message badge popping up right over "Yesterday But" before Vijayaதசமி Meme arrives */}
                <AnimatePresence>
                  {subPhase === 'yesterday' && showButNowBadge && (
                    <motion.div
                      key="badge-but-now"
                      initial={{ opacity: 0, scale: 0.75, y: 10, filter: "blur(3px)" }}
                      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.85, y: -6, filter: "blur(3px)" }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute z-30 pointer-events-none flex flex-col items-center"
                    >
                      <div className="px-4 py-1.5 rounded-full bg-neutral-950/90 backdrop-blur-xl border border-amber-400/50 text-amber-200 shadow-[0_10px_25px_rgba(0,0,0,0.85),0_0_15px_rgba(251,191,36,0.35)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase text-amber-100">
                          But Now...
                        </span>
                        <span className="text-amber-400 text-xs">✨</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {/* 1. YESTURDAY BUT IMAGE - Scaled to 0.99 (reduced by 5px) */}
                  {subPhase === 'yesterday' && (
                    <motion.div
                      key="yesterday-but-image"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.96,
                        transition: { duration: 0.35, ease: "easeOut" }
                      }}
                      className={`absolute inset-0 flex items-center justify-center overflow-hidden p-1 ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                      }`}
                    >
                      <img
                        src="/Image and Audio/Yesturday But.webp"
                        alt="Yesterday But"
                        className="w-full h-full object-contain scale-[0.99]"
                      />
                    </motion.div>
                  )}

                  {/* 2. VIJAYADASHAMI MEME IMAGE - Grand sparkle entry with stars, zoom, and glow */}
                  {subPhase === 'meme' && (
                    <motion.div
                      key="vijaya-meme-image"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ 
                        opacity: 0, 
                        scale: 1.08, 
                        filter: "blur(4px)",
                        transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } 
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`absolute inset-0 flex items-center justify-center overflow-hidden ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                      }`}
                    >
                      {/* Natural twinkling golden stars drifting across the frame for the full meme duration */}
                      {[
                        { top: '10%', left: '12%', delay: 0, duration: 1.2, size: 16 },
                        { top: '18%', right: '14%', delay: 0.3, duration: 1.5, size: 20 },
                        { top: '48%', left: '8%', delay: 0.6, duration: 1.3, size: 15 },
                        { top: '42%', right: '10%', delay: 0.85, duration: 1.4, size: 18 },
                        { bottom: '18%', left: '16%', delay: 0.4, duration: 1.6, size: 19 },
                        { bottom: '12%', right: '15%', delay: 0.15, duration: 1.3, size: 22 },
                        { top: '28%', left: '46%', delay: 0.5, duration: 1.1, size: 14 },
                        { bottom: '32%', right: '38%', delay: 0.75, duration: 1.5, size: 17 },
                      ].map((star, idx) => (
                        <motion.div
                          key={`twinkle-star-${idx}`}
                          animate={{
                            opacity: [0, 1, 0.25, 1, 0],
                            scale: [0.3, 1.4, 0.7, 1.5, 0.3],
                            rotate: [0, 90, 180, 270, 360],
                          }}
                          transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut",
                          }}
                          style={{
                            position: 'absolute',
                            top: star.top,
                            left: star.left,
                            right: star.right,
                            bottom: star.bottom,
                            width: star.size,
                            height: star.size,
                          }}
                          className="pointer-events-none z-20 flex items-center justify-center"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,1)]">
                            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                          </svg>
                        </motion.div>
                      ))}

                      <img
                        src="/Image and Audio/VijayaDashami Meme.webp"
                        alt="Vijayadashami Meme"
                        className="w-full h-full object-contain scale-[1.08]"
                      />
                    </motion.div>
                  )}

                  {/* 3. VIJAYA____ VIDEO - Exact letterbox crop (top & bottom 12.5% black bars removed, zero width zoom/distortion) */}
                  {subPhase === 'video' && (
                    <motion.div
                      key="vijaya-video-3"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`absolute inset-0 flex items-center justify-center overflow-hidden ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                      }`}
                    >
                      <div 
                        className="w-full relative overflow-hidden flex items-center justify-center"
                        style={{
                          aspectRatio: '1920 / 814', // Exact active content ratio (1920x814, removing top 12.5% & bottom 12.5%)
                        }}
                      >
                        <video
                          ref={videoRef}
                          src="/Image and Audio/Vijaya____.mp4"
                          playsInline
                          webkit-playsinline="true"
                          autoPlay
                          loop
                          preload="auto"
                          className="w-full absolute left-0 right-0 max-w-none"
                          style={{
                            aspectRatio: '16 / 9',
                            top: '-16.7%', // Centers the active 75% video height into the 1920x814 container
                          }}
                        />
                      </div>
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

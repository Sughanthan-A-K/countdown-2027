import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiBurst from './ConfettiBurst';

const fuseVariants = {
  idle: { pathLength: 1 },
  burning: { 
    pathLength: 0,
    transition: { duration: 3.0, ease: "linear" }
  }
};

const sparkVariants = {
  idle: { x: 65, y: 5 },
  burning: {
    x: [65.0, 58.2, 51.9, 44.6, 35.0, 23.2, 15.6, 9.0, 0.0], 
    y: [5.0, 0.3, -10.0, -20.3, -25.0, -20.5, -10.5, -0.5, 4.0],
    transition: { duration: 3.0, ease: "linear", times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1] }
  }
};

export default function DiwaliEvent({ onComplete, onReveal, onExplode, onBlackout, isDarkMode }) {
  const [phase, setPhase] = useState('init'); // init (waiting for 1st tap), dimming, dark, match, lit, launching, done, freeze
  const [matchPos, setMatchPos] = useState({ x: -500, y: -500 }); // The FLAME position
  
  const touchOrigin = useRef({ x: -500, y: -500 });
  const hasIgnited = useRef(false); // Where user is touching (bottom of stick)
  
  const [isStriking, setIsStriking] = useState(false);
  const [isFlameLit, setIsFlameLit] = useState(false);
  const [showSparks, setShowSparks] = useState(false);
  const [hasMovedMatch, setHasMovedMatch] = useState(false);
  const matchAudioRef = useRef(null);
  const flickerAudioRef = useRef(null);
  const flameAudioRef = useRef(null);
  const fuseAudioRef = useRef(null);
  const cylinderBlastAudioRef = useRef(null);
  const matchTimeoutRef = useRef(null);
  const burnProgressTimerRef = useRef(null);
  const [burnProgress, setBurnProgress] = useState(0); // 0 (tip/start) to 1 (burned down to thumb)
  const [isSmoking, setIsSmoking] = useState(false); // Whisps of light smoke right as flame extinguishes
  const [isExtinguishing, setIsExtinguishing] = useState(false); // Smooth scale down/fizzle transition for flame

  // 1st Tap handler: triggers flicker audio + neon die animation -> full dark
  const handleFirstTapToDim = (e) => {
    if (phase === 'init') {
      if (e && e.cancelable && e.type === 'touchstart') {
        // Prevent synthetic delayed click
        e.preventDefault();
      }
      setPhase('dimming');

      // Play flicker audio directly synchronously during user gesture (Required by iOS/WhatsApp Webview)
      try {
        let played = false;
        if (flickerAudioRef.current) {
          flickerAudioRef.current.playbackRate = 1.1;
          flickerAudioRef.current.currentTime = 0;
          flickerAudioRef.current.volume = 1.0;
          const p = flickerAudioRef.current.play();
          if (p !== undefined) {
            p.then(() => { played = true; }).catch(() => {});
          } else {
            played = true;
          }
        }
        
        // Also spawn a direct Audio object immediately as rock-solid redundancy
        const directAudio = new Audio(encodeURI('/Diwali Audios/Flicker.mp3'));
        directAudio.playbackRate = 1.1;
        directAudio.volume = 1.0;
        directAudio.play().catch(() => {});
      } catch (e) {
        console.warn('Flicker sound play catch:', e);
      }

      // Also prime/unlock all other audios on this first user gesture (critical for iOS/Android)
      try {
        if (matchAudioRef.current) matchAudioRef.current.load();
        if (flameAudioRef.current) flameAudioRef.current.load();
        if (fuseAudioRef.current) fuseAudioRef.current.load();
        if (cylinderBlastAudioRef.current) cylinderBlastAudioRef.current.load();
      } catch (e) {}

      // After 1.8s neon-die flicker animation: screen goes full dark.
      // NOW in the dark, the transformer falling sparks trigger to illuminate the ground cylinder & fuse!
      setTimeout(() => {
        setPhase('dark');
        setShowSparks(true);
        if (onBlackout) onBlackout();

        // Sparks cascade down for 2.4s and then stop
        setTimeout(() => {
          setShowSparks(false);
        }, 2400);
      }, 1800);
    }
  };

  const stopFlameAudio = () => {
    if (flameAudioRef.current) {
      try {
        flameAudioRef.current.pause();
        flameAudioRef.current.currentTime = 0;
      } catch (e) {}
    }
  };

  const clearBurnTimers = () => {
    if (matchTimeoutRef.current) clearTimeout(matchTimeoutRef.current);
    if (burnProgressTimerRef.current) cancelAnimationFrame(burnProgressTimerRef.current);
    setIsSmoking(false);
    setIsExtinguishing(false);
  };

  const handlePointerMove = (e) => {
    if (phase === 'match') {
      const isTouch = e.touches && e.touches.length > 0;
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      touchOrigin.current = { x: clientX, y: clientY };
      if (!hasMovedMatch) setHasMovedMatch(true);
      
      // Dynamic tilt: points UP when at top, smoothly tilts DOWN-LEFT when dragged to the bottom
      const height = window.innerHeight || 800;
      const ratio = clientY / height;
      const tilt = Math.min(1, Math.max(0, (ratio - 0.3) / 0.5)); // 0 at 30% screen, 1 at 80% screen
      
      const flameX = clientX + (-15 - tilt * 45); // from -15 to -60
      const flameY = clientY + (-80 + tilt * 130); // from -80 to +50
      
      setMatchPos({ x: flameX, y: flameY });
    }
  };

  const handleDarkTap = (e) => {
    if (phase === 'init') {
      handleFirstTapToDim(e);
      return;
    }

    if (phase === 'dark') {
      if (navigator.vibrate) navigator.vibrate([50, 50]);
      const isTouch = e.touches && e.touches.length > 0;
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      touchOrigin.current = { x: clientX, y: clientY };
      
      const height = window.innerHeight || 800;
      const ratio = clientY / height;
      const tilt = Math.min(1, Math.max(0, (ratio - 0.3) / 0.5));
      
      const flameX = clientX + (-15 - tilt * 45);
      const flameY = clientY + (-80 + tilt * 130);
      
      setMatchPos({ x: flameX, y: flameY });
      setPhase('match');

      // Play match strike audio on tap
      try {
        if (matchAudioRef.current) {
          matchAudioRef.current.currentTime = 0;
          matchAudioRef.current.play().catch((err) => console.warn('Audio play error:', err));
        }
      } catch (e) {
        console.warn('Match sound play error:', e);
      }

      // Delay flame/fire appearance by 0.25s after the strike sound starts
      setIsFlameLit(false);
      setBurnProgress(0);
      setHasMovedMatch(false);
      clearBurnTimers();

      setTimeout(() => {
        setIsFlameLit(true);
        setIsStriking(true);
        setTimeout(() => setIsStriking(false), 400);

        // Play gentle mild burning flame audio for 8s (soft volume ~0.15)
        try {
          if (flameAudioRef.current) {
            flameAudioRef.current.currentTime = 0;
            flameAudioRef.current.volume = 0.15; // Extra mild & gentle as requested
            flameAudioRef.current.play().catch((err) => console.warn('Flame sound error:', err));
          }
        } catch (e) {}

        // Match burns down naturally over 8 seconds. Flame travels down the stick toward the hand, leaving burnt black ash behind!
        const burnStartTime = performance.now();
        const burnDuration = 8000;

        const trackBurn = (now) => {
          const elapsed = now - burnStartTime;
          const progress = Math.min(1, elapsed / burnDuration);
          setBurnProgress(progress);

          if (progress < 1) {
            burnProgressTimerRef.current = requestAnimationFrame(trackBurn);
          } else {
            // Natural ending: flame smooth fizzle, embers glow, and light smoke rises before full dark
            stopFlameAudio();
            setIsExtinguishing(true); // Smoothly shrink flame to 0 over 300ms
            setIsSmoking(true); // Release rising smoke whisps from the red ember

            setTimeout(() => {
              setIsFlameLit(false);
              setIsExtinguishing(false);
            }, 300);

            // Smoke lingers for 0.5s and then cleanly fades to dark
            setTimeout(() => {
              setIsSmoking(false);
              setBurnProgress(0);
              setPhase('dark');
            }, 800);
          }
        };
        burnProgressTimerRef.current = requestAnimationFrame(trackBurn);

      }, 250);
    }
  };

  // Distance from a point (px, py) to a line segment between (x1, y1) and (x2, y2)
  const distToSegment = (px, py, x1, y1, x2, y2) => {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  };

  // Check collision between match flame and the fuse spark in animation frame
  // Ref for ignition delay
  const ignitionStartTime = React.useRef(0);

  useEffect(() => {
    if (phase !== 'match' || !isFlameLit) return;

    const checkCollision = () => {
      const hitbox = document.getElementById('fuse-hitbox');
      if (hitbox) {
        const rect = hitbox.getBoundingClientRect();
        const sparkX = rect.left + rect.width / 2;
        const sparkY = rect.top + rect.height / 2;
        
        // Check 1: Distance from moving flame directly to fuse tip
        const distToFlame = Math.hypot(activeFlameX - sparkX, activeFlameY - sparkY);

        // Check 2: Distance from stick's entire active flame & burning zone (from match head to active flame)
        const distToBurningStick = distToSegment(sparkX, sparkY, matchPos.x, matchPos.y, activeFlameX, activeFlameY);

        // Instant ignition if active flame OR burning stick touches the fuse tip!
        const isTouchingFuse = distToFlame < 55 || distToBurningStick < 40;

        if (isTouchingFuse && !hasIgnited.current) {
          hasIgnited.current = true;
          clearBurnTimers();
          stopFlameAudio();

          if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
          setPhase('lit');
          
          // Play Fuse burning audio right when thiri lights up!
          try {
            if (fuseAudioRef.current) {
              fuseAudioRef.current.currentTime = 0;
              fuseAudioRef.current.play().catch((err) => console.warn('Fuse sound error:', err));
            }
          } catch (e) {}

          // Fuse burns for 3.0 seconds
          setTimeout(() => {
            // Stop fuse audio as it finishes burning into cylinder
            try {
              if (fuseAudioRef.current) {
                fuseAudioRef.current.pause();
                fuseAudioRef.current.currentTime = 0;
              }
            } catch (e) {}

            setPhase('launching');

            // Play Cylinder Out Blast audio right at launch!
            try {
              if (cylinderBlastAudioRef.current) {
                cylinderBlastAudioRef.current.currentTime = 0;
                cylinderBlastAudioRef.current.play().catch((err) => console.warn('Cylinder blast sound error:', err));
              }
            } catch (e) {}

            // Sharp pop vibration when the cylinder launches from the ground
            if (typeof window !== 'undefined' && navigator.vibrate) {
              navigator.vibrate([150]); 
            }
          }, 3000);
          
          // Rocket reaches apex natively via physics in ~2.6s (Handled by ConfettiBurst physics engine now via handleRocketExplode!)
          return; // Prevent multiple triggers
        }
      }
      if (phase === 'match' && isFlameLit) {
        requestAnimationFrame(checkCollision);
      }
    };
    const animId = requestAnimationFrame(checkCollision);
    return () => cancelAnimationFrame(animId);
  }, [phase, isFlameLit, matchPos, onReveal, onComplete, onExplode]);

  const handleRocketExplode = () => {
    setPhase('explode'); // Trigger flashes and background fade
    
    if (onExplode) onExplode();
    
    setTimeout(() => {
      setPhase('fadeout_bg');
    }, 100);
    
    // Let golden shower rain for 7 seconds before fading out smoothly
    setTimeout(() => {
      setPhase('fadeout_shower');
    }, 7000);
    
    // Allow golden shower to fade out completely over 1-2s before unmounting
    setTimeout(() => {
      if (onReveal) onReveal();
      if (onComplete) onComplete();
    }, 9000);
  };

  // Burning flame coordinates traveling down the stick toward the user's touch (origin)
  // At burnProgress 0: flame is at matchPos. At 1: flame reaches touchOrigin.
  const activeFlameX = matchPos.x + (touchOrigin.current.x - matchPos.x) * (burnProgress * 0.85);
  const activeFlameY = matchPos.y + (touchOrigin.current.y - matchPos.y) * (burnProgress * 0.85);

  // Mask styling for match light (hole tracks the moving flame)
  // Light radius is focused closely around the flame (65px) so only the flame area and stick are lit, no giant background bleed
  const torchMask = (phase === 'match' && (isFlameLit || isSmoking))
    ? `radial-gradient(circle 65px at ${activeFlameX}px ${activeFlameY}px, transparent 15px, rgba(0,0,0,0.85) 45px, black 65px)` 
    : 'none';
    
  // Mask for objects that are ONLY visible in the dark light
  const wireRevealMask = (phase === 'match' && (isFlameLit || isSmoking))
    ? `radial-gradient(circle 65px at ${activeFlameX}px ${activeFlameY}px, black 15px, rgba(0,0,0,0.6) 45px, transparent 65px)`
    : 'none';

  return (
    <>
      <style>{`
        @keyframes neon-die {
          0% { opacity: 0; }
          10% { opacity: 0.8; }
          15% { opacity: 0.1; }
          25% { opacity: 0.9; }
          35% { opacity: 0.2; }
          45% { opacity: 1; }
          50% { opacity: 0; }
          55% { opacity: 1; }
          80% { opacity: 0; background: white; } /* Bulb burst */
          90% { opacity: 1; background: black; }
          100% { opacity: 1; background: black; }
        }
        @keyframes fuse-spark-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-15px, -20px) scale(0); opacity: 0; }
        }
        @keyframes fuse-spark-2 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(15px, -15px) scale(0); opacity: 0; }
        }
        @keyframes fuse-spark-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-10px, 15px) scale(0); opacity: 0; }
        }
        @keyframes white-flash {
          0% { opacity: 1; }
          10% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fire-flicker {
           0% { transform: scale(1) rotate(-2deg); }
           50% { transform: scale(1.1) rotate(2deg); }
           100% { transform: scale(1) rotate(-2deg); }
        }
        @keyframes fire-flicker-reverse {
           0% { transform: scale(1) rotate(2deg); }
           50% { transform: scale(1.1) rotate(-2deg); }
           100% { transform: scale(1) rotate(2deg); }
        }
        @keyframes match-strike {
           0% { transform: scale(3); opacity: 1; }
           100% { transform: scale(1); opacity: 0; }
        }
        @keyframes flame-grow {
           0% { transform: scale(0.25); opacity: 0.35; }
           30% { transform: scale(0.45); opacity: 0.65; }
           60% { transform: scale(0.68); opacity: 0.85; }
           100% { transform: scale(0.85); opacity: 1; }
        }
        @keyframes float-up {
           0% { transform: translateY(0) scale(1); opacity: 1; }
           100% { transform: translateY(-30px) scale(0.5); opacity: 0; }
        }
        @keyframes smoke-rise-1 {
           0% { transform: translate(0, 0) scale(0.6); opacity: 0.7; }
           50% { transform: translate(-6px, -22px) scale(1.4); opacity: 0.45; }
           100% { transform: translate(-12px, -45px) scale(2.2); opacity: 0; }
        }
        @keyframes smoke-rise-2 {
           0% { transform: translate(0, 0) scale(0.7); opacity: 0.65; }
           50% { transform: translate(7px, -24px) scale(1.5); opacity: 0.4; }
           100% { transform: translate(14px, -48px) scale(2.4); opacity: 0; }
        }
        @keyframes smoke-rise-3 {
           0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
           50% { transform: translate(2px, -26px) scale(1.3); opacity: 0.5; }
           100% { transform: translate(5px, -52px) scale(2.1); opacity: 0; }
        }
        @keyframes ember-flicker {
           0%, 100% { opacity: 0.9; transform: scale(1); }
           50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes spark-fall-1 {
          0% { transform: translate(0, 0) scale(1.2); opacity: 1; }
          40% { transform: translate(-30px, 45vh) scale(1.1); opacity: 1; }
          75% { transform: translate(-55px, 80vh) scale(0.9); opacity: 0.95; }
          88% { transform: translate(-65px, 92vh) scale(0.7); opacity: 0.8; }
          100% { transform: translate(-80px, 93vh) scale(0); opacity: 0; }
        }
        @keyframes spark-fall-2 {
          0% { transform: translate(0, 0) scale(1.4); opacity: 1; }
          35% { transform: translate(-10px, 40vh) scale(1.2); opacity: 1; }
          70% { transform: translate(-25px, 78vh) scale(1.0); opacity: 0.9; }
          85% { transform: translate(-32px, 91vh) scale(0.6); opacity: 0.75; }
          100% { transform: translate(-40px, 92vh) scale(0); opacity: 0; }
        }
        @keyframes spark-fall-3 {
          0% { transform: translate(0, 0) scale(1.3); opacity: 1; }
          45% { transform: translate(25px, 50vh) scale(1.15); opacity: 1; }
          75% { transform: translate(15px, 82vh) scale(0.95); opacity: 0.95; }
          90% { transform: translate(8px, 93vh) scale(0.7); opacity: 0.8; }
          100% { transform: translate(0px, 94vh) scale(0); opacity: 0; }
        }
        @keyframes spark-fall-4 {
          0% { transform: translate(0, 0) scale(1.1); opacity: 1; }
          30% { transform: translate(-45px, 35vh) scale(1.0); opacity: 1; }
          65% { transform: translate(-80px, 75vh) scale(0.85); opacity: 0.9; }
          85% { transform: translate(-95px, 90vh) scale(0.6); opacity: 0.7; }
          100% { transform: translate(-110px, 92vh) scale(0); opacity: 0; }
        }
        @keyframes spark-fall-5 {
          0% { transform: translate(0, 0) scale(1.5); opacity: 1; }
          40% { transform: translate(10px, 48vh) scale(1.3); opacity: 1; }
          75% { transform: translate(-15px, 81vh) scale(1.0); opacity: 0.95; }
          90% { transform: translate(-25px, 92vh) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-35px, 94vh) scale(0); opacity: 0; }
        }
        @keyframes ground-impact-scatter {
          0% { transform: scale(0.5); opacity: 0.9; }
          50% { transform: scale(1.6); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes drag-guide-pulse {
          0% { opacity: 0.2; transform: translateY(-4px); }
          50% { opacity: 0.85; transform: translateY(4px); }
          100% { opacity: 0.2; transform: translateY(-4px); }
        }
        @keyframes tap-hint-pulse {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .dimming-layer {
          animation: neon-die 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Main interaction layer */}
      <div 
        className={`fixed inset-0 z-[900] touch-none ${phase === 'done' || phase === 'lit' || phase === 'launching' ? 'pointer-events-none' : 'pointer-events-auto'}`}
        onPointerMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onPointerDown={handleDarkTap}
        onTouchStart={phase === 'init' ? handleDarkTap : undefined}
      >
        {/* Blackout overlay (Remains ON until explode to simulate dark night sky) */}
        {(phase !== 'init' && phase !== 'done' && phase !== 'freeze' && phase !== 'explode' && phase !== 'fadeout_bg' && phase !== 'fadeout_shower') && (
          <div 
            className={`absolute inset-0 bg-black pointer-events-none ${
              phase === 'dimming' ? 'dimming-layer' : ''
            }`}
            style={{
              WebkitMaskImage: torchMask,
              maskImage: torchMask,
              opacity: phase === 'dark' || phase === 'match' || phase === 'lit' || phase === 'launching' ? 1 : undefined
            }}
          />
        )}

        {/* Electrical Transformer Falling Sparks Effect during Dark phase */}
        {showSparks && (
          <div className="absolute inset-0 pointer-events-none z-[960] overflow-hidden">
            {/* Spark 1 */}
            <div 
              className="absolute top-0 left-[22%] w-2 h-2.5 rounded-full bg-amber-100"
              style={{
                boxShadow: '0 0 12px 3px #ff7700, 0 0 24px 6px #ff4400',
                animation: 'spark-fall-1 1.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards'
              }}
            />

            {/* Spark 2 */}
            <div 
              className="absolute top-0 left-[20%] w-2.5 h-3 rounded-full bg-yellow-100"
              style={{
                boxShadow: '0 0 14px 4px #ff9900, 0 0 28px 8px #ff5500',
                animation: 'spark-fall-2 1.55s cubic-bezier(0.2, 0.1, 0.25, 1) 0.08s forwards'
              }}
            />

            {/* Spark 3 */}
            <div 
              className="absolute top-0 left-[18%] w-2 h-2 rounded-full bg-orange-100"
              style={{
                boxShadow: '0 0 10px 3px #ff8800, 0 0 20px 5px #ff3300',
                animation: 'spark-fall-3 1.65s cubic-bezier(0.25, 0.1, 0.3, 1) 0.15s forwards'
              }}
            />

            {/* Spark 4 */}
            <div 
              className="absolute top-0 left-[24%] w-1.5 h-2 rounded-full bg-amber-50"
              style={{
                boxShadow: '0 0 8px 2px #ffaa00, 0 0 18px 4px #ff4400',
                animation: 'spark-fall-4 1.5s cubic-bezier(0.22, 0.1, 0.25, 1) 0.05s forwards'
              }}
            />

            {/* Spark 5 */}
            <div 
              className="absolute top-0 left-[19%] w-3 h-3.5 rounded-full bg-white"
              style={{
                boxShadow: '0 0 16px 5px #ffaa00, 0 0 32px 10px #ff6600',
                animation: 'spark-fall-5 1.7s cubic-bezier(0.2, 0.1, 0.28, 1) 0.12s forwards'
              }}
            />

            {/* Ground impact scatter flash when sparks land near the bottom left firework */}
            <div 
              className="absolute bottom-6 left-[16%] w-12 h-12 rounded-full bg-orange-500/80 pointer-events-none"
              style={{
                filter: 'blur(8px)',
                animation: 'ground-impact-scatter 0.6s ease-out 1.25s forwards',
                opacity: 0
              }}
            />
          </div>
        )}

        {/* Objects hidden in dark (revealed only by match light) */}
        {(phase === 'match' || phase === 'lit' || phase === 'launching') && (
          <div 
            className="absolute inset-0 z-[950] pointer-events-none transition-opacity duration-75"
            style={{
              WebkitMaskImage: (phase === 'lit' || phase === 'launching') ? 'none' : ((isFlameLit || isSmoking) ? wireRevealMask : 'radial-gradient(circle 0px, transparent, transparent)'),
              maskImage: (phase === 'lit' || phase === 'launching') ? 'none' : ((isFlameLit || isSmoking) ? wireRevealMask : 'radial-gradient(circle 0px, transparent, transparent)'),
            }}
          >
            {/* The Matchstick (Drawn from touch point to flame) */}
            {(phase === 'match' || phase === 'lit') && (isFlameLit || isSmoking) && (
              <div>
                <svg className={`absolute top-0 left-0 w-full h-full pointer-events-none drop-shadow-xl z-40 transition-all duration-1000 ${phase === 'lit' ? 'opacity-0 translate-y-32 delay-[800ms]' : 'opacity-100'}`}>
                  {/* Unburnt Wood Stick (from touch origin to flame tip) */}
                  <line 
                    x1={touchOrigin.current.x} 
                    y1={touchOrigin.current.y} 
                    x2={activeFlameX} 
                    y2={activeFlameY} 
                    stroke="#d2b48c" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                  />

                  {/* Burnt Charred Black Ash (behind the moving flame, where it has already burned through) */}
                  {burnProgress > 0.05 && (
                    <line 
                      x1={matchPos.x} 
                      y1={matchPos.y} 
                      x2={activeFlameX} 
                      y2={activeFlameY} 
                      stroke="#1a1a1a" 
                      strokeWidth="4.5" 
                      strokeLinecap="round" 
                      opacity="0.8"
                    />
                  )}

                  {/* Burnt Head */}
                  <circle cx={matchPos.x} cy={matchPos.y} r="4.5" fill="#111" />
                  
                  {/* Glowing red ember directly underneath the flame */}
                  <circle 
                    cx={activeFlameX} 
                    cy={activeFlameY} 
                    r={isSmoking ? 3.5 : 3} 
                    fill="#ff4500" 
                    className={isSmoking ? "animate-[ember-flicker_0.4s_infinite]" : ""}
                    style={{ filter: isSmoking ? 'drop-shadow(0 0 5px #ff2200)' : 'none' }}
                  />
                </svg>

                {/* Animated Flame at the tip of the match (moves down the stick over 8s) */}
                <div 
                  className={`absolute z-50 pointer-events-none transition duration-[300ms] ${phase === 'lit' || !isFlameLit || isExtinguishing ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} 
                  style={{ left: activeFlameX, top: activeFlameY - 12, transform: 'translate(-50%, -50%)', transformOrigin: 'center bottom' }}
                >
                   {isStriking && isFlameLit && (
                     <div className="absolute -inset-10 bg-yellow-100 rounded-full md:blur-xl blur-sm animate-[match-strike_0.3s_ease-out]" />
                   )}
                   
                   {/* Crisp Sharp Fire SVG with 2.6s smooth gradual growth matching entire audio */}
                   <div className="origin-bottom animate-[flame-grow_2.6s_cubic-bezier(0.2,0.8,0.3,1)_forwards]">
                     <svg viewBox="0 0 30 50" className="w-6 h-10 animate-[fire-flicker_0.15s_infinite_alternate] origin-bottom md:drop-shadow-[0_0_10px_rgba(255,165,0,0.8)] drop-shadow-[0_0_4px_rgba(255,165,0,0.5)]">
                       <path d="M15 0 C 25 15, 30 25, 25 40 C 20 50, 10 50, 5 40 C 0 25, 5 15, 15 0 Z" fill="#ff4500" />
                       <path d="M15 15 C 22 25, 23 35, 15 45 C 7 35, 8 25, 15 15 Z" fill="#ffd700" />
                       <path d="M15 28 C 18 35, 17 40, 15 42 C 13 40, 12 35, 15 28 Z" fill="#ffffff" />
                     </svg>
                   </div>
                   
                   {/* Continuous floating sparks */}
                   {phase === 'match' && isFlameLit && (
                     <>
                       <div className="absolute top-0 left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-[float-up_0.6s_infinite]" />
                       <div className="absolute top-2 right-1 w-1 h-1 bg-orange-300 rounded-full animate-[float-up_0.8s_infinite_0.2s]" />
                     </>
                   )}
                </div>

                 {/* Natural Light Smoke rising from the glowing red ember when flame extinguishes */}
                {isSmoking && (
                  <div 
                    className="absolute z-50 pointer-events-none" 
                    style={{ left: activeFlameX, top: activeFlameY, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* Soft light grey smoke wisps */}
                    <div className="absolute -top-1 left-0 w-2.5 h-2.5 bg-neutral-300/40 rounded-full blur-[2px] animate-[smoke-rise-1_0.75s_ease-out_forwards]" />
                    <div className="absolute -top-2 left-1 w-3 h-3 bg-neutral-400/35 rounded-full blur-[2.5px] animate-[smoke-rise-2_0.85s_ease-out_0.1s_forwards]" />
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-neutral-200/45 rounded-full blur-[1.5px] animate-[smoke-rise-3_0.65s_ease-out_0.15s_forwards]" />
                  </div>
                )}

                {/* Intuitive visual drag hint: animated subtle dashed arrow pointing towards fuse when match is lit */}
                {phase === 'match' && isFlameLit && !hasMovedMatch && (
                  <div 
                    className="absolute pointer-events-none z-50 select-none flex flex-col items-center"
                    style={{ 
                      left: activeFlameX - 18, 
                      top: activeFlameY + 28, 
                      transform: 'translate(-50%, 0)' 
                    }}
                  >
                    <div className="flex flex-col items-center animate-[drag-guide-pulse_1.5s_infinite] opacity-80">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-amber-200/90 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        Drag to fuse ⤦
                      </span>
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-300 drop-shadow-[0_0_6px_#ff9900]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="17" y1="7" x2="7" y2="17" strokeDasharray="3 2" />
                        <polyline points="17 17 7 17 7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* The Firework on the Ground */}
            <div className="absolute bottom-6 left-[15%] h-32 flex flex-col justify-end items-center pointer-events-none">
              
              {/* Cylinder Container (Pans down to naturally track the rocket) */}
              <motion.div 
                className="relative w-8 h-28 z-20"
                animate={(phase === 'launching' || phase === 'explode' || phase === 'fadeout_bg' || phase === 'fadeout_shower') ? { y: '100vh' } : { y: 0 }}
                transition={{ duration: 2.6, ease: "easeIn" }}
              >
                
                {/* Cylinder Visuals (overflow-hidden to contain patterns) */}
                <div className="absolute inset-0 rounded-t-sm border-b-0 border-2 border-purple-900 bg-purple-700 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #facc15 4px, #facc15 8px)' }} />
                  <div className="w-full h-2 bg-yellow-400 border-y border-red-500 mt-2 z-10" />
                  <div className="w-full h-4 bg-red-500 border-y-2 border-yellow-300 z-10 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-yellow-100 opacity-50" />
                  </div>
                  <div className="w-full h-2 bg-yellow-400 border-y border-red-500 mb-4 z-10" />
                </div>
                
                {/* The Curved Physical Fuse precisely attached to the lower yellow band */}
                {/* Cylinder is h-28 (112px). Yellow band is 16px from bottom (height 8px). Top of band is 112-24=88px from top. */}
                <div className="absolute w-20 h-20 z-30 pointer-events-none" style={{ top: '88px', left: '100%' }}>
                  {/* Curved SVG path */}
                  <svg width="100%" height="100%" viewBox="0 0 80 80" className="overflow-visible">
                    <motion.path 
                      id="fuse-path"
                      d="M 0 4 C 15 4, 15 -25, 35 -25 C 50 -25, 55 5, 65 5" 
                      fill="none" 
                      stroke="#808080" 
                      strokeWidth="3.5"
                      strokeLinecap="round"
                                            variants={fuseVariants}
                      initial="idle"
                      animate={['lit', 'launching', 'explode', 'fadeout_bg', 'fadeout_shower'].includes(phase) ? "burning" : "idle"}
                    />
                  </svg>

                  {/* Dedicated invisible hitbox exactly at the tip of the fuse (65, 5) for flawless collision detection */}
                  <div id="fuse-hitbox" className="absolute w-12 h-12 rounded-full" style={{ left: '65px', top: '5px', transform: 'translate(-50%, -50%)' }} />

                  {/* The Spark that follows the shrinking fuse path using highly reliable coordinate keyframes */}
                  {(phase === 'init' || phase === 'dimming' || phase === 'dark' || phase === 'match' || phase === 'lit') && (
                    <motion.div 
                      className="absolute z-40 pointer-events-none origin-center"
                                            variants={sparkVariants}
                      initial="idle"
                      animate={phase === 'lit' ? "burning" : "idle"}
                      style={{ 
                        top: 0,
                        left: 0,
                        marginLeft: '-8px', // Center the w-4 element exactly on the X,Y coord
                        marginTop: '-8px'
                      }}
                    >
                       <div className={`w-4 h-4 rounded-full transition-colors duration-200 blur-[1px] shadow-[0_0_8px_#ff8800] ${phase === 'lit' ? 'bg-orange-400' : 'bg-transparent'}`} />
                       
                       {/* Flying Pori Pori (Sparks) */}
                       {phase === 'lit' && (
                         <>
                           <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-[fuse-spark-1_0.4s_linear_infinite]" />
                           <div className="absolute top-1/2 left-1/2 w-[3px] h-[3px] bg-orange-300 rounded-full animate-[fuse-spark-2_0.5s_linear_infinite_0.1s]" />
                           <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-[fuse-spark-3_0.3s_linear_infinite_0.2s]" />
                           <div className="absolute top-1/2 left-1/2 w-[2px] h-[2px] bg-yellow-400 rounded-full animate-[fuse-spark-1_0.5s_linear_infinite_0.3s]" style={{ transform: 'rotate(90deg)' }} />
                         </>
                       )}
                    </motion.div>
                  )}
                </div>

                {/* Enormous Muzzle Flash at launch (Realistic POP) - Moved to -top-24 to align with top of cylinder */}
                {phase === 'launching' && (
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 z-50 flex items-center justify-center pointer-events-none">
                     <div className="absolute inset-0 bg-gradient-to-t from-orange-400 via-yellow-200 to-transparent rounded-full md:blur-[12px] blur-[4px] mix-blend-screen animate-[white-flash_1s_ease-out_forwards]" />
                     <div className="w-16 h-16 bg-white rounded-full md:blur-md blur-sm animate-[white-flash_1s_ease-out_forwards]" />
                     {/* Paper debris flying out! (Restored per user request) */}
                     <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                           <motion.div 
                             key={i} 
                             className="absolute top-1/2 left-1/2 w-3 h-2 bg-[#d2a679] border-[1px] border-[#a07050]"
                             initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                             animate={{ 
                               x: (Math.random() - 0.5) * 160, 
                               y: -40 - Math.random() * 100, 
                               rotate: Math.random() * 720,
                               opacity: 0 
                             }}
                             transition={{ duration: 1, ease: "easeOut" }}
                           />
                        ))}
                     </div>
                  </div>
                )}
              </motion.div>

            </div>
          </div>
        )}

        {/* Explosion Phase & Golden Shower */}
        <AnimatePresence>
          {(phase === 'launching' || phase === 'explode' || phase === 'fadeout_bg' || phase === 'fadeout_shower') && (
            <>
              {/* Black Sky - fades out so CalendarPage underneath shows through. z-[940] puts it BEHIND the cylinder at z-[950]! */}
              <motion.div className="fixed inset-0 z-[940] pointer-events-none">
                <motion.div 
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: (phase === 'fadeout_bg' || phase === 'fadeout_shower') ? 0 : 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.div className="fixed inset-0 z-[960] pointer-events-none">
              {/* Live Golden Shower & Launch Physics (Falls gracefully without looping) */}
              <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${phase === 'fadeout_shower' ? 'opacity-0' : 'opacity-100'}`}>
                 <ConfettiBurst 
                   active={true} 
                   origin={{ y: 0.20, x: 0.5 }} 
                   launchOrigin={{ y: 0.82, x: 0.19 }} // Shoots exactly from the top center of the cylinder!
                   forceRocket={true} 
                   loop={false}
                   onFirstBurst={handleRocketExplode}
                 />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      </div>

      {/* Hidden audio elements for robust mobile browser streaming */}
      <audio ref={flickerAudioRef} src={encodeURI('/Diwali Audios/Flicker.mp3')} preload="auto" playsInline />
      <audio ref={matchAudioRef} src={encodeURI('/Diwali Audios/Match stick.mp3')} preload="auto" playsInline />
      <audio ref={flameAudioRef} src={encodeURI('/Diwali Audios/Flame sound.mp3')} preload="auto" playsInline />
      <audio ref={fuseAudioRef} src={encodeURI('/Diwali Audios/Fuse or Thiri.mp3')} preload="auto" playsInline />
      <audio ref={cylinderBlastAudioRef} src={encodeURI('/Diwali Audios/Cylender out blast.mp3')} preload="auto" playsInline />
    </>
  );
}






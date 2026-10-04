import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiBurst from './ConfettiBurst';

export default function DiwaliEvent({ onComplete, onReveal, onExplode, isDarkMode }) {
  const [phase, setPhase] = useState('init'); // init, dimming, dark, match, lit, launching, done, freeze
  const [matchPos, setMatchPos] = useState({ x: -500, y: -500 }); // The FLAME position
  
  const touchOrigin = useRef({ x: -500, y: -500 }); // Where user is touching (bottom of stick)

  useEffect(() => {
    // Sequence starts
    const t1 = setTimeout(() => setPhase('dimming'), 1500);
    // Dimming takes 2s to pop to dark
    const t2 = setTimeout(() => setPhase('dark'), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const [isStriking, setIsStriking] = useState(false);

  const handlePointerMove = (e) => {
    if (phase === 'match') {
      const isTouch = e.touches && e.touches.length > 0;
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      touchOrigin.current = { x: clientX, y: clientY };
      // Move matchstick significantly higher (80px) and slightly left so the user's finger doesn't obscure the flame on mobile!
      const flameX = clientX - 15;
      const flameY = clientY - 80;
      setMatchPos({ x: flameX, y: flameY });
    }
  };

  const handleDarkTap = (e) => {
    if (phase === 'dark') {
      if (navigator.vibrate) navigator.vibrate([50, 50]);
      const isTouch = e.touches && e.touches.length > 0;
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      touchOrigin.current = { x: clientX, y: clientY };
      setMatchPos({ x: clientX - 15, y: clientY - 25 });
      setPhase('match');
      
      // Trigger a rapid match-strike spark animation
      setIsStriking(true);
      setTimeout(() => setIsStriking(false), 400);
    }
  };

  // Check collision between match flame and the fuse spark in animation frame
  useEffect(() => {
    if (phase !== 'match') return;

    const checkCollision = () => {
      const spark = document.getElementById('fuse-start');
      if (spark) {
        const rect = spark.getBoundingClientRect();
        const sparkX = rect.left + rect.width / 2;
        const sparkY = rect.top + rect.height / 2;
        
        // Use the ACTUAL finger position (touchOrigin) for collision, not the visually offset matchPos, 
        // ensuring they don't have to guess where the hitbox is. Increased radius to 100 for easy lighting.
        const dist = Math.hypot(touchOrigin.current.x - sparkX, touchOrigin.current.y - sparkY);
        if (dist < 100) {
          if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
          setPhase('lit');
          
          // Fuse burns for 2.0 seconds
          setTimeout(() => setPhase('launching'), 2000);
          
          // Rocket reaches apex natively via physics in ~2.6s
          setTimeout(() => {
            setPhase('explode'); // Trigger flashes and background fade
            if (navigator.vibrate) navigator.vibrate([200, 100, 300, 100, 400]); 
            
            if (onExplode) onExplode();
            
            setTimeout(() => {
              setPhase('fadeout_bg');
            }, 100);
            
            // Allow golden shower to fall
            setTimeout(() => {
              if (onReveal) onReveal();
              onComplete();
            }, 6000);

          }, 4600); // 2000 (fuse) + 2600 (flight)
        }
      }
      if (phase === 'match') {
        requestAnimationFrame(checkCollision);
      }
    };
    const animId = requestAnimationFrame(checkCollision);
    return () => cancelAnimationFrame(animId);
  }, [phase, matchPos, onReveal, onComplete]);

  // Mask styling for match light (hole is precisely at the flame)
  const torchMask = phase === 'match' 
    ? `radial-gradient(circle 120px at ${matchPos.x}px ${matchPos.y}px, transparent 20px, rgba(0,0,0,0.85) 90px, black 120px)` 
    : 'none';
    
  // Mask for objects that are ONLY visible in the dark light
  const wireRevealMask = phase === 'match'
    ? `radial-gradient(circle 120px at ${matchPos.x}px ${matchPos.y}px, black 20px, rgba(0,0,0,0.6) 90px, transparent 120px)`
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
        @keyframes float-up {
           0% { transform: translateY(0) scale(1); opacity: 1; }
           100% { transform: translateY(-30px) scale(0.5); opacity: 0; }
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
      >
        {/* Blackout overlay (Remains ON until explode to simulate dark night sky) */}
        {(phase !== 'init' && phase !== 'done' && phase !== 'freeze' && phase !== 'explode' && phase !== 'fadeout_bg') && (
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

        {/* Objects hidden in dark (revealed by match light) */}
        {(phase === 'match' || phase === 'lit' || phase === 'launching') && (
          <div 
            className="absolute inset-0 z-[950] pointer-events-none transition-opacity duration-75"
            style={{
              WebkitMaskImage: (phase === 'lit' || phase === 'launching') ? 'none' : wireRevealMask,
              maskImage: (phase === 'lit' || phase === 'launching') ? 'none' : wireRevealMask,
            }}
          >
            {/* The Matchstick (Drawn from touch point to flame) */}
            {phase === 'match' && (
              <>
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none drop-shadow-xl z-40">
                  {/* Stick */}
                  <line x1={touchOrigin.current.x} y1={touchOrigin.current.y} x2={matchPos.x} y2={matchPos.y} stroke="#d2b48c" strokeWidth="6" strokeLinecap="round" />
                  {/* Burnt Head */}
                  <circle cx={matchPos.x} cy={matchPos.y} r="5" fill="#222" />
                </svg>

                {/* Animated Flame at the tip of the match */}
                <div className="absolute z-50 pointer-events-none" style={{ left: matchPos.x, top: matchPos.y - 12, transform: 'translate(-50%, -50%)' }}>
                   {isStriking && (
                     <div className="absolute -inset-10 bg-yellow-100 rounded-full blur-xl animate-[match-strike_0.3s_ease-out]" />
                   )}
                   
                   {/* Crisp Sharp Fire SVG */}
                   <svg viewBox="0 0 30 50" className="w-6 h-10 animate-[fire-flicker_0.15s_infinite_alternate] origin-bottom drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]">
                     <path d="M15 0 C 25 15, 30 25, 25 40 C 20 50, 10 50, 5 40 C 0 25, 5 15, 15 0 Z" fill="#ff4500" />
                     <path d="M15 15 C 22 25, 23 35, 15 45 C 7 35, 8 25, 15 15 Z" fill="#ffd700" />
                     <path d="M15 28 C 18 35, 17 40, 15 42 C 13 40, 12 35, 15 28 Z" fill="#ffffff" />
                   </svg>
                   
                   {/* Continuous floating sparks */}
                   <div className="absolute top-0 left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-[float-up_0.6s_infinite]" />
                   <div className="absolute top-2 right-1 w-1 h-1 bg-orange-300 rounded-full animate-[float-up_0.8s_infinite_0.2s]" />
                </div>
              </>
            )}

            {/* The Firework on the Ground */}
            <div className="absolute bottom-6 left-[15%] h-32 flex flex-col justify-end items-center pointer-events-none">
              
              {/* Cylinder Container (Pans down to naturally track the rocket) */}
              <motion.div 
                className="relative w-8 h-28 z-20"
                animate={(phase === 'launching' || phase === 'explode' || phase === 'fadeout_bg') ? { y: '100vh' } : { y: 0 }}
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
                
                {/* The Natural Curved Fuse */}
                <div className="absolute -bottom-1 -right-8 w-10 h-10 z-30">
                  {/* Elegant curved fuse line */}
                  <svg className="absolute w-full h-full text-neutral-400 overflow-visible" viewBox="0 0 10 10">
                     <motion.path 
                       d="M 0,8 Q 5,8 8,0" 
                       fill="none" 
                       stroke="currentColor" 
                       strokeWidth="1.5" 
                       strokeLinecap="round"
                       initial={{ pathLength: 1 }}
                       animate={phase === 'lit' ? { pathLength: 0 } : {}}
                       transition={{ duration: 2.0, ease: "linear" }}
                     />
                  </svg>
                  
                  {/* Clean, beautiful glowing spark tracking the curve */}
                  {(phase === 'init' || phase === 'dimming' || phase === 'dark' || phase === 'match' || phase === 'lit') && (
                    <motion.div 
                      id="fuse-start"
                      className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center z-40 pointer-events-auto"
                      initial={{ x: '50%', y: '-50%' }}
                      animate={phase === 'lit' ? { x: '-150%', y: '150%' } : {}}
                      transition={{ duration: 2.0, ease: "linear" }}
                    >
                       <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${phase === 'lit' ? 'bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]' : 'bg-transparent'}`} />
                       {phase === 'lit' && (
                         <div className="absolute w-4 h-4 bg-orange-500 rounded-full blur-[2px] animate-[fire-flicker_0.1s_infinite_alternate]" />
                       )}
                    </motion.div>
                  )}
                </div>

                {/* Elegant Muzzle Flash at launch */}
                {phase === 'launching' && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-t from-orange-400 to-yellow-100 rounded-full blur-[8px] mix-blend-screen animate-[white-flash_0.3s_ease-out_forwards] z-50 flex items-center justify-center">
                     <div className="w-8 h-8 bg-white rounded-full blur-[4px]" />
                  </div>
                )}
              </motion.div>

            </div>
          </div>
        )}

        {/* Explosion Phase & Golden Shower */}
        <AnimatePresence>
          {(phase === 'launching' || phase === 'explode' || phase === 'fadeout_bg') && (
            <motion.div className="fixed inset-0 z-[960] pointer-events-none">
              {/* Black Sky - fades out so CalendarPage underneath shows through */}
              <motion.div 
                className="absolute inset-0 bg-black -z-20"
                initial={{ opacity: 1 }}
                animate={{ opacity: phase === 'fadeout_bg' ? 0 : 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Massive White Flash on Explosion (Timed exactly with explode phase) */}
              {(phase === 'explode' || phase === 'fadeout_bg') && <div className="absolute inset-0 bg-white z-[970] animate-[white-flash_0.8s_ease-out_forwards]" />}
              
              {/* Explosion Fireball (Timed exactly with explode phase) */}
              {(phase === 'explode' || phase === 'fadeout_bg') && (
                <div 
                  className="absolute w-96 h-96 bg-gradient-to-r from-white via-yellow-400 to-orange-500 rounded-full blur-3xl animate-[match-strike_0.5s_ease-out_forwards] mix-blend-screen z-[980]"
                  style={{ top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />
              )}

              {/* Live Golden Shower & Launch Physics (Falls gracefully without looping) */}
              <div className="absolute inset-0 -z-10 transition-opacity duration-2000 opacity-100">
                 <ConfettiBurst 
                   active={true} 
                   origin={{ y: 0.25, x: 0.5 }} 
                   launchOrigin={{ y: 0.85, x: 0.15 }} // Shoots from the bottom-left cylinder position!
                   forceRocket={true} 
                   loop={false} 
                 />
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </>
  );
}

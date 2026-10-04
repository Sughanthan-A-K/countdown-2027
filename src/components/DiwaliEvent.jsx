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
      
      // Trigger a rapid match-strike spark animation
      setIsStriking(true);
      setTimeout(() => setIsStriking(false), 400);
    }
  };

  // Check collision between match flame and the fuse spark in animation frame
  useEffect(() => {
    if (phase !== 'match') return;

    const checkCollision = () => {
      const hitbox = document.getElementById('fuse-hitbox');
      if (hitbox) {
        const rect = hitbox.getBoundingClientRect();
        const sparkX = rect.left + rect.width / 2;
        const sparkY = rect.top + rect.height / 2;
        
        // Use the VISUAL flame position (matchPos) vs the dedicated static hitbox.
        // Extremely generous 120px radius and fast 400ms hold so user never gets frustrated.
        const dist = Math.hypot(matchPos.x - sparkX, matchPos.y - sparkY);
        if (dist < 40) {
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
          return; // Prevent multiple triggers
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
            {(phase === 'match' || phase === 'lit') && (
              <div className={`transition-all duration-1000 ${phase === 'lit' ? 'opacity-0 translate-y-10 delay-500' : 'opacity-100'}`}>
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
                   {phase === 'match' && (
                     <>
                       <div className="absolute top-0 left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-[float-up_0.6s_infinite]" />
                       <div className="absolute top-2 right-1 w-1 h-1 bg-orange-300 rounded-full animate-[float-up_0.8s_infinite_0.2s]" />
                     </>
                   )}
                </div>
              </div>
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
                
                {/* The Curved Physical Fuse precisely attached to the lower yellow band */}
                {/* Cylinder is h-28 (112px). Yellow band is 16px from bottom (height 8px). Top of band is 112-24=88px from top. */}
                <div className="absolute w-20 h-20 z-30 pointer-events-none" style={{ top: '88px', left: '100%' }}>
                  {/* Curved SVG path */}
                  <svg width="100%" height="100%" viewBox="0 0 80 80" className="overflow-visible">
                    <motion.path 
                      id="fuse-path"
                      d="M 0 4 C 15 4, 15 -25, 35 -25 C 50 -25, 55 5, 65 5" 
                      fill="none" 
                      stroke="#8B4513" 
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 1 }}
                      animate={['lit', 'launching', 'explode', 'fadeout_bg'].includes(phase) ? { pathLength: 0 } : { pathLength: 1 }}
                      transition={{ duration: 2.0, ease: "linear" }}
                      style={{ pathLength: 1 }}
                    />
                  </svg>

                  {/* Dedicated invisible hitbox exactly at the tip of the fuse (65, 5) for flawless collision detection */}
                  <div id="fuse-hitbox" className="absolute w-12 h-12 rounded-full" style={{ left: '65px', top: '5px', transform: 'translate(-50%, -50%)' }} />

                  {/* The Spark that follows the shrinking fuse path using highly reliable coordinate keyframes */}
                  {(phase === 'init' || phase === 'dimming' || phase === 'dark' || phase === 'match' || phase === 'lit') && (
                    <motion.div 
                      className="absolute z-40 pointer-events-none origin-center"
                      initial={{ x: 65, y: 5 }}
                      animate={phase === 'lit' ? { 
                        x: [65.0, 58.2, 51.9, 44.6, 35.0, 23.2, 15.6, 9.0, 0.0], 
                        y: [5.0, 0.3, -10.0, -20.3, -25.0, -20.5, -10.5, -0.5, 4.0] 
                      } : { x: 65, y: 5 }}
                      transition={{ duration: 2.0, ease: "linear", times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1] }}
                      style={{ 
                        top: 0,
                        left: 0,
                        marginLeft: '-8px', // Center the w-4 element exactly on the X,Y coord
                        marginTop: '-8px'
                      }}
                    >
                       <div className={`w-4 h-4 rounded-full transition-colors duration-200 blur-[1px] shadow-[0_0_8px_#ff8800] ${phase === 'lit' ? 'bg-orange-400' : 'bg-transparent'}`} />
                    </motion.div>
                  )}
                </div>

                {/* Enormous Muzzle Flash at launch (Realistic POP) - Moved to -top-24 to align with top of cylinder */}
                {phase === 'launching' && (
                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 z-50 flex items-center justify-center pointer-events-none">
                     <div className="absolute inset-0 bg-gradient-to-t from-orange-400 via-yellow-200 to-transparent rounded-full blur-[12px] mix-blend-screen animate-[white-flash_1s_ease-out_forwards]" />
                     <div className="w-16 h-16 bg-white rounded-full blur-md animate-[white-flash_1s_ease-out_forwards]" />
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
          {(phase === 'launching' || phase === 'explode' || phase === 'fadeout_bg') && (
            <>
              {/* Black Sky - fades out so CalendarPage underneath shows through. z-[940] puts it BEHIND the cylinder at z-[950]! */}
              <motion.div className="fixed inset-0 z-[940] pointer-events-none">
                <motion.div 
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: phase === 'fadeout_bg' ? 0 : 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.div className="fixed inset-0 z-[960] pointer-events-none">
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
                   launchOrigin={{ y: 0.82, x: 0.19 }} // Shoots exactly from the top center of the cylinder!
                   forceRocket={true} 
                   loop={false} 
                 />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      </div>
    </>
  );
}

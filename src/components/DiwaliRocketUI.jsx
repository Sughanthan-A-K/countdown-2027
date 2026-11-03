import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DiwaliRocketUI
 * 
 * - Rocket is cleanly isolated in its container with a rich warm Diwali halo glow.
 * - Surrounding golden diamond stars continuously appear at RANDOM positions around the rocket,
 *   twinkle brightly with pure white cores, rotate, and fade out.
 * - When tapped (isFlying):
 *    1. Fuse burns with sparks
 *    2. Blazing fiery base exhaust jet ignites
 *    3. Rocket blasts off to the top-right sky
 */

// 4 distinct quadrants around the rocket so stars NEVER crowd or touch each other:
// Zone 0: Top-Left (near wick/nose)
const ZONE_TOP_LEFT = [
  { top: '4px', left: '2px' },
  { top: '12px', left: '-2px' },
  { top: '-2px', left: '8px' }
];

// Zone 1: Top-Right (above the nosecone)
const ZONE_TOP_RIGHT = [
  { top: '-2px', right: '6px' },
  { top: '6px', right: '0px' },
  { top: '14px', right: '-4px' }
];

// Zone 2: Bottom-Right (flank of rocket body)
const ZONE_BOTTOM_RIGHT = [
  { bottom: '8px', right: '2px' },
  { bottom: '0px', right: '8px' },
  { bottom: '16px', right: '-2px' }
];

// Zone 3: Bottom-Left (near base of stick)
const ZONE_BOTTOM_LEFT = [
  { bottom: '12px', left: '2px' },
  { bottom: '2px', left: '10px' },
  { bottom: '18px', left: '-2px' }
];

const SEPARATED_ZONES = [ZONE_TOP_LEFT, ZONE_TOP_RIGHT, ZONE_BOTTOM_RIGHT, ZONE_BOTTOM_LEFT];

function RandomTwinkleStar({ index }) {
  const zone = SEPARATED_ZONES[index];
  const [starState, setStarState] = useState(() => ({
    spot: zone[Math.floor(Math.random() * zone.length)],
    size: 5 + Math.random() * 2, // 5px - 7px
    key: 0
  }));

  const cycleDuration = 2.0 + (index * 0.35);

  const handleAnimationComplete = () => {
    // Pick a new random spot strictly INSIDE this star's exclusive zone so stars never overlap!
    const nextSpot = zone[Math.floor(Math.random() * zone.length)];
    const nextSize = 5 + Math.random() * 2;
    setStarState(prev => ({
      spot: nextSpot,
      size: nextSize,
      key: prev.key + 1
    }));
  };

  return (
    <motion.div
      key={starState.key}
      style={{
        position: 'absolute',
        top: starState.spot.top,
        left: starState.spot.left,
        right: starState.spot.right,
        bottom: starState.spot.bottom,
        width: `${starState.size}px`,
        height: `${starState.size}px`
      }}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{
        opacity: [0, 1, 0.85, 1, 0],
        scale: [0.1, 1.35, 1, 1.3, 0.1],
        rotate: index % 2 === 0 ? [0, 180, 360] : [360, 180, 0]
      }}
      transition={{
        duration: cycleDuration,
        delay: index * 0.55,
        ease: "easeInOut"
      }}
      onAnimationComplete={handleAnimationComplete}
      className="pointer-events-none flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
        {/* Diamond 4-point Sparkle */}
        <path 
          d="M 12 0 Q 12 9 21 12 Q 12 15 12 24 Q 12 15 3 12 Q 12 9 12 0 Z" 
          fill="#fef08a" 
          style={{ filter: 'drop-shadow(0 0 5px #facc15) drop-shadow(0 0 10px #eab308)' }}
        />
        {/* Bright white core center */}
        <circle cx="12" cy="12" r="2.2" fill="#ffffff" />
      </svg>
    </motion.div>
  );
}

export default function DiwaliRocketUI({ 
  isFlying = false, 
  isAmbient = true 
}) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {!isFlying && isAmbient && (
          <div className="relative w-12 h-12 flex items-center justify-center">
            
            {/* Ambient Warm Golden/Rose Halo Glow (Enhanced balanced glow) */}
            <motion.div
              animate={{
                scale: [0.95, 1.25, 0.95],
                opacity: [0.35, 0.65, 0.35]
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-2 rounded-full bg-gradient-to-tr from-rose-500/30 via-amber-400/35 to-yellow-300/25 blur-md pointer-events-none"
            />

            {/* 1. Dynamic Twinkling Stars appearing at RANDOM positions each cycle */}
            {[0, 1, 2, 3].map((idx) => (
              <RandomTwinkleStar key={idx} index={idx} />
            ))}

            {/* 2. Main Rocket Body (Breathing with smooth gentle fade & float) */}
            <motion.div
              key="ambient-diwali-rocket"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.35, 1, 0.35],
                scale: [0.96, 1.04, 0.96],
                y: [2, -3, 2],
                rotate: [-1, 2, -1]
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9,
                transition: { duration: 0.25, ease: "easeOut" } 
              }}
              transition={{ 
                opacity: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-12 h-12 flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(244,63,94,0.35)]"
            >
              <svg 
                viewBox="0 0 400 400" 
                className="w-12 h-12 overflow-visible"
              >
                <defs>
                  {/* 3D Cylindrical Shading for Pink Body */}
                  <linearGradient id="bodyPinkGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d82" />
                    <stop offset="30%" stopColor="#f43f5e" />
                    <stop offset="70%" stopColor="#e11d48" />
                    <stop offset="100%" stopColor="#9f1239" />
                  </linearGradient>

                  {/* 3D Cylindrical Shading for Yellow Stripes */}
                  <linearGradient id="yellowBandGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="35%" stopColor="#facc15" />
                    <stop offset="80%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>

                  {/* Conical Head Shading */}
                  <linearGradient id="coneHeadGloss" x1="20%" y1="0%" x2="90%" y2="100%">
                    <stop offset="0%" stopColor="#ff5c8d" />
                    <stop offset="40%" stopColor="#f43f5e" />
                    <stop offset="85%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#881337" />
                  </linearGradient>

                  {/* Rounded Purple Wooden Stick */}
                  <linearGradient id="stickPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="45%" stopColor="#7e22ce" />
                    <stop offset="100%" stopColor="#581c87" />
                  </linearGradient>

                  {/* Curved Fuse Tube Shading */}
                  <linearGradient id="fuseTube" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>

                  {/* Fuse Tip Star Gradients */}
                  <linearGradient id="starYellowBevel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef9c3" />
                    <stop offset="40%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>
                  <linearGradient id="starPinkBevel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fda4af" />
                    <stop offset="40%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#9f1239" />
                  </linearGradient>
                </defs>

                {/* ------------------------------------------------------------- */}
                {/* MAIN ROCKET MESH (Pointing at ~30 deg towards top-right)      */}
                {/* ------------------------------------------------------------- */}
                <g transform="translate(200, 200) rotate(30) translate(-200, -200)">
                  
                  {/* 1. Purple Rounded Stick (Positioned to the side, not dead center) */}
                  <rect 
                    x="208" 
                    y="255" 
                    width="20" 
                    height="120" 
                    rx="10" 
                    fill="url(#stickPurple)" 
                    className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                  />

                  {/* 2. White Curved Fuse (Thiri) emerging from left base, curving back up to stars */}
                  <path 
                    d="M 160 255 C 105 265, 80 205, 98 175" 
                    fill="none" 
                    stroke="url(#fuseTube)" 
                    strokeWidth="11" 
                    strokeLinecap="round" 
                    className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                  />

                  {/* 3. Rocket Cylindrical Body (Pill capsule shape with rounded base) */}
                  <g>
                    {/* Clip path for crisp striped body */}
                    <clipPath id="rocketBodyClip">
                      <path d="M 148 120 L 252 120 L 252 245 C 252 268, 148 268, 148 245 Z" />
                    </clipPath>

                    <g clipPath="url(#rocketBodyClip)">
                      {/* Full Pink Base Capsule */}
                      <rect x="145" y="115" width="110" height="155" fill="url(#bodyPinkGloss)" />

                      {/* Band 1: Golden-Yellow Upper Stripe */}
                      <rect x="145" y="130" width="110" height="34" fill="url(#yellowBandGloss)" />

                      {/* Band 2: Golden-Yellow Lower Stripe */}
                      <rect x="145" y="196" width="110" height="34" fill="url(#yellowBandGloss)" />

                      {/* Left edge 3D gloss specular highlight across cylinder */}
                      <path d="M 152 120 L 160 120 L 160 255 L 152 250 Z" fill="#ffffff" opacity="0.35" />
                      {/* Right edge shadow tone */}
                      <path d="M 244 120 L 252 120 L 252 250 L 244 255 Z" fill="#000000" opacity="0.18" />
                    </g>
                  </g>

                  {/* 4. Conical Nosecone Cap (Realistic overlapping 3D flared cone) */}
                  <g>
                    {/* Flared conical body */}
                    <path 
                      d="M 140 128 Q 200 148 260 128 L 200 52 Z" 
                      fill="url(#coneHeadGloss)" 
                      className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
                    />

                    {/* Convex curved bottom lip (Solid thick 3D rim) */}
                    <path 
                      d="M 140 128 Q 200 148 260 128" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      opacity="0.6" 
                    />

                    {/* Gloss sheen on top face of cone */}
                    <path 
                      d="M 148 124 L 200 58 L 200 138 Q 174 135 148 124 Z" 
                      fill="#ffffff" 
                      opacity="0.22" 
                    />
                  </g>

                  {/* 5. Layered Stars at Tip of Fuse (Point 98, 175) */}
                  {/* Pink Star (Behind, shifted top-left) */}
                  <g transform="translate(90, 168) scale(1.65)">
                    <path 
                      d="M 0 -8 L 2.4 -2.4 L 8.2 -2.4 L 3.5 1.3 L 5.3 7.0 L 0 3.4 L -5.3 7.0 L -3.5 1.3 L -8.2 -2.4 L -2.4 -2.4 Z" 
                      fill="url(#starPinkBevel)" 
                      className="filter drop-shadow-[0_2px_4px_rgba(159,18,57,0.5)]"
                    />
                  </g>

                  {/* Yellow 3D Star (Directly on tip, in front) */}
                  <g transform="translate(100, 176) scale(1.9)">
                    <path 
                      d="M 0 -8 L 2.4 -2.4 L 8.2 -2.4 L 3.5 1.3 L 5.3 7.0 L 0 3.4 L -5.3 7.0 L -3.5 1.3 L -8.2 -2.4 L -2.4 -2.4 Z" 
                      fill="url(#starYellowBevel)" 
                      className="filter drop-shadow-[0_2px_5px_rgba(202,138,4,0.6)]"
                    />
                    {/* Subtle 3D faceted center highlight */}
                    <path d="M 0 -8 L 2.4 -2.4 L 0 0 Z" fill="#ffffff" opacity="0.4" />
                  </g>
                </g>
              </svg>
            </motion.div>
          </div>
        )}

        {isFlying && (
          <motion.div
            key="flying-diwali-rocket"
            initial={{ 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: 0, 
              rotate: 0 
            }}
            animate={{ 
              // 1. Fuse burns (0s -> 0.35s)
              // 2. Powerful fiery blast-off to top-right sky (0.35s -> 1.3s)
              opacity: [1, 1, 1, 1, 0],
              scale: [1, 1.15, 1.35, 1.1, 0.4],
              x: [0, -4, 4, 180, 520],
              y: [0, 2, -2, -260, -780],
              rotate: [0, -3, 3, -15, -25]
            }}
            transition={{ 
              duration: 1.3, 
              times: [0, 0.15, 0.35, 0.75, 1],
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="fixed z-[9999] pointer-events-none w-16 h-16"
            style={{ filter: "drop-shadow(0 0 16px rgba(251,191,36,0.95))" }}
          >
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="flyPink" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff4d82" />
                    <stop offset="40%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#9f1239" />
                  </linearGradient>
                  <linearGradient id="flyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <linearGradient id="flyCone" x1="20%" y1="0%" x2="90%" y2="100%">
                    <stop offset="0%" stopColor="#ff5c8d" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#881337" />
                  </linearGradient>
                  <linearGradient id="flyStick" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#581c87" />
                  </linearGradient>
                  <clipPath id="flyBodyClip">
                    <path d="M 148 120 L 252 120 L 252 245 C 252 268, 148 268, 148 245 Z" />
                  </clipPath>
                </defs>

                <g transform="translate(200, 200) rotate(30) translate(-200, -200)">
                  {/* Stick slightly offset to the side */}
                  <rect x="208" y="255" width="20" height="120" rx="10" fill="url(#flyStick)" />

                  {/* Body */}
                  <g clipPath="url(#flyBodyClip)">
                    <rect x="145" y="115" width="110" height="155" fill="url(#flyPink)" />
                    <rect x="145" y="130" width="110" height="34" fill="url(#flyYellow)" />
                    <rect x="145" y="196" width="110" height="34" fill="url(#flyYellow)" />
                  </g>

                  {/* Nosecone */}
                  <path d="M 140 128 Q 200 148 260 128 L 200 52 Z" fill="url(#flyCone)" />
                  <path d="M 140 128 Q 200 148 260 128" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
                </g>
              </svg>

              {/* BLAZING FIERY EXHAUST FLAME: Directly at the bottom base of the rocket cylinder */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.3, 1.9, 1.6, 0.4], 
                  opacity: [0, 1, 1, 0.9, 0] 
                }}
                transition={{ 
                  duration: 1.3, 
                  times: [0, 0.25, 0.5, 0.8, 1],
                  ease: "easeOut" 
                }}
                className="absolute left-1/2 bottom-1 -translate-x-1/2 w-10 h-10 pointer-events-none"
              >
                {/* Outer warm orange flame glow aura */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-600 via-amber-500 to-yellow-300 blur-sm shadow-[0_0_24px_#f97316]" />
                
                {/* Core bright white-yellow fiery exhaust jet */}
                <motion.div 
                  animate={{ scaleY: [1, 1.5, 1.2], scaleX: [1, 0.85, 1] }}
                  transition={{ repeat: Infinity, duration: 0.12 }}
                  className="absolute left-1/2 top-1 -translate-x-1/2 w-5 h-7 rounded-full bg-gradient-to-t from-amber-400 via-yellow-200 to-white shadow-[0_0_14px_#ffffff]"
                />
              </motion.div>

              {/* Continuous Golden Sparkle Exhaust Trail streaming behind rocket */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`exhaust-spark-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0.8, 0],
                    scale: [0.2, 1.4, 0.6, 0],
                    x: [0, -Math.cos(i * 0.6) * 35 - 15],
                    y: [10, Math.sin(i * 0.6) * 45 + 30 + i * 8]
                  }}
                  transition={{ 
                    duration: 0.7, 
                    repeat: Infinity, 
                    delay: 0.2 + (i % 5) * 0.08,
                    ease: "easeOut" 
                  }}
                  className="absolute left-1/2 bottom-0 w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-200 shadow-[0_0_8px_#fde047]"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

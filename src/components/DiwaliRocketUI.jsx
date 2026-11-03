import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DiwaliRocketUI
 * 
 * Beautiful custom SVG & Canvas Vector Rocket inspired by traditional Diwali Rocket:
 * - Cylindrical rocket body with alternating hot-pink & yellow stripes
 * - Conical hot-pink cap (head) with white highlight rim
 * - Curved side wick (thiri) with spark on the tip
 * - Slim purple wooden stick extending downwards from bottom base
 * - When tapped (isFlying):
 *    1. Wick sparks aggressively & burns down to rocket base (~0.4s)
 *    2. Blazing fiery exhaust flame ignites at base of rocket (NOT on stick)
 *    3. Rocket blasts off upwards to the top-right sky with particle trail!
 */
export default function DiwaliRocketUI({ 
  isFlying = false, 
  isAmbient = true,
  onLaunchComplete = null 
}) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none select-none">
      <AnimatePresence>
        {!isFlying && isAmbient && (
          <motion.div
            key="ambient-diwali-rocket"
            initial={{ opacity: 0, scale: 0.5, rotate: 22 }}
            animate={{ 
              opacity: 1,
              scale: [0.95, 1.05, 0.95],
              y: [0, -3, 0],
              rotate: [20, 24, 20]
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 2.8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="relative w-11 h-11 flex items-center justify-center"
          >
            {/* Ambient Outer Warm Glow */}
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md pointer-events-none" />

            <svg 
              viewBox="0 0 100 120" 
              className="w-11 h-11 overflow-visible filter drop-shadow-[0_2px_8px_rgba(244,63,94,0.5)]"
            >
              <defs>
                {/* 3D Cylindrical Shading for Pink Body */}
                <linearGradient id="bodyPinkGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="35%" stopColor="#fb7185" />
                  <stop offset="70%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#9f1239" />
                </linearGradient>

                {/* 3D Cylindrical Shading for Yellow Stripes */}
                <linearGradient id="bodyYellowGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="35%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>

                {/* Cone Cap Gradient */}
                <linearGradient id="conePinkGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="40%" stopColor="#fda4af" />
                  <stop offset="80%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>

                {/* Wooden Stick Gradient (Purple/Wood hue) */}
                <linearGradient id="stickGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#5b21b6" />
                </linearGradient>
              </defs>

              {/* Group rotated pointing to top-right (standard launch angle ~42deg) */}
              <g transform="translate(42, 60) rotate(42) translate(-42, -60)">
                {/* 1. Slim Extended Wooden Stick (extending downwards from center-bottom of rocket) */}
                <line 
                  x1="42" 
                  y1="72" 
                  x2="42" 
                  y2="118" 
                  stroke="url(#stickGrad)" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                />

                {/* 2. Side Curved Wick (Thiri) emerging from bottom-left corner of rocket */}
                <path 
                  d="M 33 72 C 22 75, 18 64, 22 55" 
                  fill="none" 
                  stroke="#f1f5f9" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />

                {/* 3. Rocket Cylindrical Body (hot pink & yellow horizontal bands) */}
                {/* Base pink container */}
                <rect x="29" y="32" width="26" height="40" rx="4" fill="url(#bodyPinkGrad)" />
                {/* Yellow Band 1 */}
                <rect x="29" y="42" width="26" height="8" fill="url(#bodyYellowGrad)" />
                {/* Yellow Band 2 */}
                <rect x="29" y="58" width="26" height="8" fill="url(#bodyYellowGrad)" />

                {/* 4. Conical Hot-Pink Cap (Head) */}
                {/* Subtle base shadow under rim */}
                <ellipse cx="42" cy="33" rx="15" ry="3.5" fill="#4c0519" opacity="0.4" />
                {/* White highlight rim */}
                <path d="M 25 33 Q 42 36 59 33 L 42 10 Z" fill="url(#conePinkGrad)" />
                <ellipse cx="42" cy="33" rx="14.5" ry="2.2" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
              </g>

              {/* Sparkle on the tip of the wick (Thiri) */}
              <motion.g
                animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              >
                {/* Golden star sparkle on wick tip */}
                <path 
                  d="M 27 65 L 28.5 68 L 32 68.5 L 29.5 70.5 L 30.5 74 L 27 72 L 23.5 74 L 24.5 70.5 L 22 68.5 L 25.5 68 Z" 
                  fill="#facc15" 
                  stroke="#ca8a04" 
                  strokeWidth="0.5"
                  className="filter drop-shadow-[0_0_4px_#facc15]"
                />
              </motion.g>
            </svg>

            {/* Natural ambient floating sparkles around rocket */}
            <motion.div 
              animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
              className="absolute -top-1 -right-0.5 w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_6px_#fde047]"
            />
            <motion.div 
              animate={{ scale: [0, 1, 0], opacity: [0, 0.9, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.4, ease: "easeOut" }}
              className="absolute top-2 -left-1 w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_5px_#fbbf24]"
            />
          </motion.div>
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
              // 1. Thiri burns & shakes slightly (0s -> 0.35s)
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
            className="fixed z-[9999] pointer-events-none w-14 h-14"
            style={{ filter: "drop-shadow(0 0 14px rgba(251,191,36,0.9))" }}
          >
            {/* SVG Rocket matching exact colors & structure */}
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="flyBodyPink" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="35%" stopColor="#fb7185" />
                    <stop offset="70%" stopColor="#e11d48" />
                    <stop offset="100%" stopColor="#9f1239" />
                  </linearGradient>
                  <linearGradient id="flyBodyYellow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="35%" stopColor="#fef08a" />
                    <stop offset="70%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <linearGradient id="flyConePink" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="40%" stopColor="#fda4af" />
                    <stop offset="80%" stopColor="#e11d48" />
                    <stop offset="100%" stopColor="#881337" />
                  </linearGradient>
                  <linearGradient id="flyStick" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#5b21b6" />
                  </linearGradient>
                </defs>

                <g transform="translate(42, 60) rotate(42) translate(-42, -60)">
                  {/* Extended Purple Wooden Stick */}
                  <line x1="42" y1="72" x2="42" y2="124" stroke="url(#flyStick)" strokeWidth="3.2" strokeLinecap="round" />

                  {/* Cylindrical Body */}
                  <rect x="29" y="32" width="26" height="40" rx="4" fill="url(#flyBodyPink)" />
                  <rect x="29" y="42" width="26" height="8" fill="url(#flyBodyYellow)" />
                  <rect x="29" y="58" width="26" height="8" fill="url(#flyBodyYellow)" />

                  {/* Conical Cap */}
                  <ellipse cx="42" cy="33" rx="15" ry="3.5" fill="#4c0519" opacity="0.4" />
                  <path d="M 25 33 Q 42 36 59 33 L 42 10 Z" fill="url(#flyConePink)" />
                  <ellipse cx="42" cy="33" rx="14.5" ry="2.2" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
                </g>
              </svg>

              {/* BLAZING FIERY EXHAUST FLAME: Directly at the bottom base of the rocket cylinder! */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1.8, 1.5, 0.4], 
                  opacity: [0, 1, 1, 0.9, 0] 
                }}
                transition={{ 
                  duration: 1.3, 
                  times: [0, 0.25, 0.5, 0.8, 1],
                  ease: "easeOut" 
                }}
                className="absolute left-1/2 bottom-2 -translate-x-1/2 w-8 h-8 pointer-events-none"
              >
                {/* Outer warm orange flame glow aura */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-600 via-amber-500 to-yellow-300 blur-sm shadow-[0_0_20px_#f97316]" />
                
                {/* Core bright white-yellow fiery exhaust jet */}
                <motion.div 
                  animate={{ scaleY: [1, 1.5, 1.2], scaleX: [1, 0.85, 1] }}
                  transition={{ repeat: Infinity, duration: 0.12 }}
                  className="absolute left-1/2 top-1 -translate-x-1/2 w-4 h-6 rounded-full bg-gradient-to-t from-amber-400 via-yellow-200 to-white shadow-[0_0_12px_#ffffff]"
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

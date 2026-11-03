import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DiwaliRocketUI
 * 
 * Custom Vector Diwali Rocket strictly matching reference:
 * - Cylindrical rocket body with alternating hot-pink & yellow stripes
 * - Conical hot-pink head with natural curved arc rim on bottom edge only (NO full transparent circle!)
 * - Side curved wick (thiri) with layered stars on the end:
 *     - Pink star in back, slightly offset
 *     - Yellow star on top
 * - Extended purple wooden stick downwards
 * - Cleaned up: removed distracting floating yellow dots above rocket
 * - When tapped (isFlying):
 *    1. Thiri burns down with sparks (~0.35s)
 *    2. Blazing fiery exhaust flame ignites at rocket base
 *    3. Rocket blasts off upwards to the top-right sky with particle trail!
 */
export default function DiwaliRocketUI({ 
  isFlying = false, 
  isAmbient = true 
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
            <div className="absolute inset-0 rounded-full bg-amber-400/15 blur-md pointer-events-none" />

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

                {/* Wooden Stick Gradient (Purple hue) */}
                <linearGradient id="stickGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#5b21b6" />
                </linearGradient>
              </defs>

              {/* Group rotated pointing to top-right (~42deg) */}
              <g transform="translate(42, 60) rotate(42) translate(-42, -60)">
                {/* 1. Slim Extended Wooden Stick */}
                <line 
                  x1="42" 
                  y1="72" 
                  x2="42" 
                  y2="120" 
                  stroke="url(#stickGrad)" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                />

                {/* 2. Side Curved Wick (Thiri) curving out from bottom-left corner and ending at (16, 52) */}
                <path 
                  d="M 32 72 C 20 74, 12 62, 16 52" 
                  fill="none" 
                  stroke="#f1f5f9" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />

                {/* 3. Rocket Cylindrical Body (hot pink & yellow horizontal bands) */}
                <rect x="29" y="32" width="26" height="40" rx="3.5" fill="url(#bodyPinkGrad)" />
                <rect x="29" y="42" width="26" height="8" fill="url(#bodyYellowGrad)" />
                <rect x="29" y="58" width="26" height="8" fill="url(#bodyYellowGrad)" />

                {/* 4. Conical Hot-Pink Cap (Head) */}
                {/* Solid conical hat */}
                <path d="M 26 33 Q 42 36.5 58 33 L 42 9 Z" fill="url(#conePinkGrad)" />
                {/* Single bottom rim white curved highlight line (NO full loop/ellipse!) */}
                <path 
                  d="M 26 33 Q 42 36.5 58 33" 
                  fill="none" 
                  stroke="#ffffff" 
                  strokeWidth="1.6" 
                  strokeLinecap="round"
                  opacity="0.95" 
                />

                {/* 5. Layered Stars at Wick (Thiri) End Point (16, 52) */}
                {/* Pink Star (behind, slightly offset to top-left) */}
                <path 
                  d="M 13.5 44.5 L 14.8 47.7 L 18.2 47.7 L 15.5 49.7 L 16.5 53 L 13.5 51 L 10.5 53 L 11.5 49.7 L 8.8 47.7 L 12.2 47.7 Z" 
                  fill="#f43f5e" 
                  stroke="#be123c" 
                  strokeWidth="0.5"
                  className="filter drop-shadow-[0_0_4px_#fb7185]"
                />

                {/* Yellow Star (directly on top of the wick tip, right in front of pink star) */}
                <path 
                  d="M 16 46 L 17.6 49.6 L 21.6 49.6 L 18.3 52 L 19.6 55.8 L 16 53.4 L 12.4 55.8 L 13.7 52 L 10.4 49.6 L 14.4 49.6 Z" 
                  fill="#fde047" 
                  stroke="#ca8a04" 
                  strokeWidth="0.6"
                  className="filter drop-shadow-[0_0_6px_#facc15]"
                />
              </g>
            </svg>
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
              // 1. Thiri burns down (0s -> 0.35s)
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
                  <rect x="29" y="32" width="26" height="40" rx="3.5" fill="url(#flyBodyPink)" />
                  <rect x="29" y="42" width="26" height="8" fill="url(#flyBodyYellow)" />
                  <rect x="29" y="58" width="26" height="8" fill="url(#flyBodyYellow)" />

                  {/* Conical Cap */}
                  <path d="M 26 33 Q 42 36.5 58 33 L 42 9 Z" fill="url(#flyConePink)" />
                  <path d="M 26 33 Q 42 36.5 58 33" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
                </g>
              </svg>

              {/* BLAZING FIERY EXHAUST FLAME: Directly at the bottom base of the rocket cylinder */}
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

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DiwaliRocketUI
 * 
 * Renders a stylized 3D rocket in the top-right share corner for Diwali:
 * 1. Default subtle ambient floating & sparkle state.
 * 2. When tapped (isFlying = true): 3D perspective pop-out from card, energetic loop/swirl,
 *    smoke/sparkle trails, and swooshing out of screen (top-right sky) before triggering share!
 */
export default function DiwaliRocketUI({ isFlying = false, isAmbient = true }) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none select-none">
      <AnimatePresence>
        {!isFlying && isAmbient && (
          <motion.div
            key="ambient-diwali-rocket"
            initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
            animate={{ 
              opacity: [0, 1, 0.9, 1, 0],
              scale: [0.4, 1.05, 1, 1.08, 0.2],
              y: [6, -2, 2, -2, -6],
              rotate: [-25, -20, -28, -22, -15]
            }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ 
              duration: 3.2, 
              times: [0, 0.2, 0.5, 0.8, 1],
              ease: "easeInOut" 
            }}
            className="relative w-10 h-10 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(244,63,94,0.6)]"
          >
            <img 
              src="/diwali_rocket_3d.png" 
              alt="Diwali Rocket" 
              className="w-9 h-9 object-contain"
              draggable={false}
            />
            {/* Sparkles around rocket */}
            <motion.div 
              animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_6px_#fde047]"
            />
            <motion.div 
              animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: 0.3, ease: "easeOut" }}
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_5px_#fbbf24]"
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
              rotateZ: -25,
              rotateX: 0,
              rotateY: 0,
              filter: "drop-shadow(0 0 10px rgba(251,191,36,0.8))"
            }}
            animate={{ 
              // 3D pop out towards camera (scale 1 -> 1.8), loop/swirl, and blast out to top-right sky
              opacity: [1, 1, 1, 1, 0],
              scale: [1, 1.8, 1.5, 1.2, 0.5],
              x: [0, -35, 20, 120, 420],
              y: [0, -20, 40, -180, -650],
              rotateZ: [-25, -60, 30, -35, -45],
              rotateY: [0, -30, 45, 0, 0]
            }}
            transition={{ 
              duration: 1.4, 
              times: [0, 0.25, 0.55, 0.8, 1],
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="fixed z-[9999] pointer-events-none w-14 h-14"
            style={{ 
              perspective: 1000, 
              transformStyle: 'preserve-3d' 
            }}
          >
            <img 
              src="/diwali_rocket_3d.png" 
              alt="Flying Rocket" 
              className="w-14 h-14 object-contain"
              draggable={false}
            />

            {/* Glowing Flame & Exhaust Particles */}
            <motion.div 
              animate={{ 
                scale: [1, 1.8, 1.2], 
                opacity: [0.8, 1, 0.9] 
              }}
              transition={{ repeat: Infinity, duration: 0.15 }}
              className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-200 blur-[1px] shadow-[0_0_15px_#f59e0b]"
            />

            {/* Sparkle Trail Burst */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: 0, 
                  scale: 0.2, 
                  x: -Math.cos(i * 0.8) * 40 - 20, 
                  y: Math.sin(i * 0.8) * 40 + 30 
                }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
                className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_8px_#fde047]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

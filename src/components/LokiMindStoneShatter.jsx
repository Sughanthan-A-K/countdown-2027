import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiMindStoneShatter
 * 
 * Cinematic Cosmic Glass Shatter with Intense, Slow-Motion Shockwave Ripple:
 * - Slower, more majestic shatter explosion (slow-mo cinematic drift).
 * - Multi-ring cosmic shockwave ripples expanding across the screen.
 * - Dynamic light flashpulse + glass dust specks that disperse as the portal opens.
 */
export default function LokiMindStoneShatter({ onAnimationComplete }) {
  // 16 polygonal crystalline glass shards with cinematic slow-motion outward trajectory
  const shards = [
    // Top-Left shards
    { id: 1, clip: 'polygon(0% 0%, 50% 0%, 25% 25%, 0% 30%)', x: -460, y: -490, rZ: -120, rX: 45, rY: -35, scale: 0.25, d: 3.2 },
    { id: 2, clip: 'polygon(25% 25%, 50% 0%, 50% 35%, 15% 40%)', x: -280, y: -530, rZ: -80, rX: 60, rY: 25, scale: 0.3, d: 3.5 },
    { id: 3, clip: 'polygon(0% 30%, 25% 25%, 28% 50%, 0% 55%)', x: -530, y: -170, rZ: -140, rX: -35, rY: 50, scale: 0.25, d: 3.3 },
    
    // Top-Right shards
    { id: 4, clip: 'polygon(50% 0%, 100% 0%, 100% 30%, 75% 25%)', x: 490, y: -470, rZ: 130, rX: 50, rY: 40, scale: 0.25, d: 3.2 },
    { id: 5, clip: 'polygon(50% 0%, 75% 25%, 50% 35%)', x: 250, y: -540, rZ: 85, rX: -45, rY: 30, scale: 0.3, d: 3.6 },
    { id: 6, clip: 'polygon(75% 25%, 100% 30%, 100% 55%, 72% 50%)', x: 550, y: -160, rZ: 150, rX: 40, rY: -50, scale: 0.28, d: 3.3 },

    // Center Core Shards
    { id: 7, clip: 'polygon(25% 25%, 50% 35%, 35% 55%, 15% 40%)', x: -330, y: -120, rZ: -170, rX: 75, rY: -55, scale: 0.22, d: 3.0 },
    { id: 8, clip: 'polygon(50% 35%, 75% 25%, 85% 45%, 65% 55%)', x: 350, y: -110, rZ: 175, rX: -70, rY: 55, scale: 0.22, d: 3.0 },
    { id: 9, clip: 'polygon(35% 55%, 50% 35%, 65% 55%, 50% 70%)', x: 0, y: -230, rZ: 260, rX: 90, rY: 80, scale: 0.18, d: 2.8 },
    { id: 10, clip: 'polygon(28% 50%, 50% 70%, 30% 78%, 0% 75%)', x: -450, y: 170, rZ: -150, rX: -55, rY: -45, scale: 0.26, d: 3.2 },
    { id: 11, clip: 'polygon(50% 70%, 72% 50%, 100% 75%, 70% 78%)', x: 460, y: 190, rZ: 160, rX: 60, rY: 45, scale: 0.26, d: 3.2 },

    // Bottom-Left shards
    { id: 12, clip: 'polygon(0% 55%, 28% 50%, 0% 75%)', x: -540, y: 100, rZ: -110, rX: 40, rY: 60, scale: 0.3, d: 3.4 },
    { id: 13, clip: 'polygon(0% 75%, 30% 78%, 50% 100%, 0% 100%)', x: -430, y: 490, rZ: -125, rX: -60, rY: 45, scale: 0.25, d: 3.1 },
    { id: 14, clip: 'polygon(30% 78%, 50% 70%, 50% 100%)', x: -190, y: 520, rZ: -75, rX: 70, rY: -35, scale: 0.28, d: 3.5 },

    // Bottom-Right shards
    { id: 15, clip: 'polygon(50% 100%, 50% 70%, 70% 78%)', x: 200, y: 510, rZ: 80, rX: -70, rY: 35, scale: 0.28, d: 3.5 },
    { id: 16, clip: 'polygon(70% 78%, 100% 75%, 100% 100%, 50% 100%)', x: 450, y: 480, rZ: 130, rX: 55, rY: -45, scale: 0.25, d: 3.1 },
  ];

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {/* 0. BLINDING SUPERNOVA CENTER FLASHBURST (Fast GPU radial blend) */}
      <motion.div
        initial={{ opacity: 1, scale: 0.2 }}
        animate={{ 
          opacity: [1, 1, 0], 
          scale: [0.2, 3.0, 4.5] 
        }}
        transition={{ duration: 0.55, ease: [0.05, 0.95, 0.2, 1] }}
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, rgba(209,250,229,0.9) 40%, transparent 70%)',
          willChange: 'transform, opacity'
        }}
      />
      <motion.div
        initial={{ opacity: 0.9, scale: 0.3 }}
        animate={{ 
          opacity: [0.9, 0.7, 0], 
          scale: [0.3, 3.8, 5.5] 
        }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.85) 0%, rgba(16,185,129,0.5) 45%, transparent 75%)',
          willChange: 'transform, opacity'
        }}
      />

      {/* 1. Powerful Primary Emerald Shockwave Ripple Ring (Pure GPU transform scale) */}
      <motion.div
        initial={{ scale: 0.1, opacity: 1 }}
        animate={{ 
          scale: [0.1, 4.5], 
          opacity: [1, 0.7, 0]
        }}
        transition={{ 
          duration: 1.3, 
          ease: [0.05, 0.85, 0.25, 1] 
        }}
        className="absolute rounded-full border-4 border-white pointer-events-none"
        style={{
          width: '300px',
          height: '300px',
          boxShadow: '0 0 40px #34d399, inset 0 0 25px #a7f3d0',
          willChange: 'transform, opacity'
        }}
      />

      {/* 2. Secondary High-Speed Distortion Shockwave Ring */}
      <motion.div
        initial={{ scale: 0.05, opacity: 1 }}
        animate={{ 
          scale: [0.05, 5.2], 
          opacity: [1, 0.5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          delay: 0.04,
          ease: [0.08, 0.9, 0.3, 1] 
        }}
        className="absolute rounded-full border-2 border-teal-200 pointer-events-none"
        style={{
          width: '260px',
          height: '260px',
          boxShadow: '0 0 45px #10b981',
          willChange: 'transform, opacity'
        }}
      />

      {/* 3. Third Atmospheric Deep Emerald Pressure Wave */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.85 }}
        animate={{ 
          scale: [0.2, 4.8], 
          opacity: [0.85, 0] 
        }}
        transition={{ 
          duration: 1.7, 
          delay: 0.08,
          ease: "easeOut" 
        }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(52,211,153,0.5) 0%, rgba(16,185,129,0.2) 50%, transparent 75%)',
          willChange: 'transform, opacity'
        }}
      />

      {/* 4. Instant Impact Light Flash */}
      <motion.div
        initial={{ opacity: 1, scale: 0.8 }}
        animate={{ opacity: 0, scale: 2.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.6) 35%, transparent 70%)',
          willChange: 'transform, opacity'
        }}
      />

      {/* 5. 16 Realistic Polygonal Glass Shards scattering outward in smooth 60fps trajectory */}
      {shards.map((s, index) => (
        <motion.div
          key={`shard-${s.id}`}
          initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
          animate={{
            x: s.x,
            y: s.y,
            rotate: s.rZ,
            scale: s.scale,
            opacity: 0
          }}
          transition={{
            duration: s.d,
            ease: [0.12, 0.82, 0.38, 1],
            delay: 0.01
          }}
          onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
          className="absolute w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] rounded-3xl pointer-events-none"
          style={{
            clipPath: s.clip,
            background: 'linear-gradient(135deg, rgba(6,78,59,0.95) 0%, rgba(16,185,129,0.85) 50%, rgba(5,150,105,0.95) 100%)',
            border: '2px solid rgba(167, 243, 208, 0.95)',
            boxShadow: '0 0 20px rgba(16,185,129,0.7)',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity'
          }}
        >
          {/* Glass Crystal Inner Refraction highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none" />
        </motion.div>
      ))}

      {/* 6. Dispersing glass dust particles riding the slow shockwave (Optimized count for 60fps) */}
      {[...Array(14)].map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const dist = 320 + (i % 4) * 70;
        const targetX = Math.cos(angle) * dist;
        const targetY = Math.sin(angle) * dist;

        return (
          <motion.div
            key={`glass-dust-${i}`}
            initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
            animate={{ 
              x: targetX, 
              y: targetY, 
              scale: 0.2, 
              opacity: 0 
            }}
            transition={{
              duration: 1.6 + (i % 3) * 0.3,
              ease: [0.15, 0.85, 0.35, 1]
            }}
            className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#34d399]"
            style={{ willChange: 'transform, opacity' }}
          />
        );
      })}
    </div>
  );
}

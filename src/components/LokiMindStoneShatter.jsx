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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
      {/* 1. Powerful Primary Emerald Shockwave Ripple Ring (Slow-motion majestic expansion) */}
      <motion.div
        initial={{ scale: 0.2, opacity: 1, borderWidth: '18px' }}
        animate={{ 
          scale: [0.3, 3.8], 
          opacity: [1, 0.7, 0],
          borderWidth: ['18px', '1px']
        }}
        transition={{ 
          duration: 2.2, 
          ease: [0.12, 0.8, 0.32, 1] 
        }}
        className="absolute rounded-full border-emerald-300 shadow-[0_0_60px_#10b981,_inset_0_0_40px_#34d399] pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
        }}
      />

      {/* 2. Secondary High-Speed Distortion Shockwave Ring */}
      <motion.div
        initial={{ scale: 0.1, opacity: 1, borderWidth: '24px' }}
        animate={{ 
          scale: [0.2, 5.0], 
          opacity: [0.95, 0.5, 0],
          borderWidth: ['24px', '2px']
        }}
        transition={{ 
          duration: 2.5, 
          delay: 0.12,
          ease: [0.15, 0.85, 0.35, 1] 
        }}
        className="absolute rounded-full border-teal-200/90 shadow-[0_0_80px_#6ee7b7] pointer-events-none"
        style={{
          width: '280px',
          height: '280px',
        }}
      />

      {/* 3. Third Atmospheric Deep Emerald Pressure Wave */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0.85 }}
        animate={{ 
          scale: [0.4, 4.2], 
          opacity: [0.85, 0] 
        }}
        transition={{ 
          duration: 2.6, 
          delay: 0.2,
          ease: "easeOut" 
        }}
        className="absolute rounded-full bg-radial from-emerald-400/40 via-teal-500/20 to-transparent blur-xl pointer-events-none"
        style={{
          width: '360px',
          height: '360px',
        }}
      />

      {/* 4. Instant Impact Light Flash */}
      <motion.div
        initial={{ opacity: 1, scale: 0.8 }}
        animate={{ opacity: 0, scale: 2.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute w-72 h-72 rounded-full bg-white blur-3xl pointer-events-none"
      />

      {/* 5. 16 Realistic Polygonal Glass Shards scattering outward in slow motion */}
      {shards.map((s, index) => (
        <motion.div
          key={`shard-${s.id}`}
          initial={{ x: 0, y: 0, rotateZ: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
          animate={{
            x: s.x,
            y: s.y,
            rotateZ: s.rZ,
            rotateX: s.rX,
            rotateY: s.rY,
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
            boxShadow: '0 0 35px rgba(16,185,129,0.85), inset 0 0 20px rgba(110,231,183,0.6)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Glass Crystal Inner Refraction highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
        </motion.div>
      ))}

      {/* 6. Dispersing glass dust particles riding the slow shockwave */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const dist = 320 + (i % 5) * 80;
        const targetX = Math.cos(angle) * dist;
        const targetY = Math.sin(angle) * dist;

        return (
          <motion.div
            key={`glass-dust-${i}`}
            initial={{ x: 0, y: 0, scale: 1.5, opacity: 1 }}
            animate={{ 
              x: targetX, 
              y: targetY, 
              scale: 0.2, 
              opacity: 0 
            }}
            transition={{
              duration: 1.8 + (i % 4) * 0.3,
              ease: [0.15, 0.85, 0.35, 1]
            }}
            className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#34d399]"
          />
        );
      })}
    </div>
  );
}

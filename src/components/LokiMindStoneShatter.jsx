import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiMindStoneShatter
 * 
 * Cinematic Cosmic Zero-Gravity Slow-Motion Glass Shatter & Space Shockwave:
 * - Shards drift gracefully outward in deep space physics (slow, cinematic float & spin).
 * - Multi-ring emerald cosmic shockwave ripples slowly expand across the void.
 * - Ethereal ambient light pulse and floating cosmic glass dust specks.
 */
export default function LokiMindStoneShatter({ onAnimationComplete }) {
  // 16 polygonal crystalline glass shards drifting slowly in cosmic zero-g
  const shards = [
    // Top-Left shards
    { id: 1, clip: 'polygon(0% 0%, 50% 0%, 25% 25%, 0% 30%)', x: -380, y: -420, rZ: -75, rX: 30, rY: -25, scale: 0.35, d: 3.8 },
    { id: 2, clip: 'polygon(25% 25%, 50% 0%, 50% 35%, 15% 40%)', x: -220, y: -460, rZ: -50, rX: 45, rY: 20, scale: 0.4, d: 4.0 },
    { id: 3, clip: 'polygon(0% 30%, 25% 25%, 28% 50%, 0% 55%)', x: -440, y: -140, rZ: -90, rX: -25, rY: 35, scale: 0.35, d: 3.9 },
    
    // Top-Right shards
    { id: 4, clip: 'polygon(50% 0%, 100% 0%, 100% 30%, 75% 25%)', x: 410, y: -400, rZ: 85, rX: 35, rY: 30, scale: 0.35, d: 3.8 },
    { id: 5, clip: 'polygon(50% 0%, 75% 25%, 50% 35%)', x: 200, y: -470, rZ: 55, rX: -35, rY: 25, scale: 0.4, d: 4.1 },
    { id: 6, clip: 'polygon(75% 25%, 100% 30%, 100% 55%, 72% 50%)', x: 460, y: -130, rZ: 95, rX: 30, rY: -40, scale: 0.38, d: 3.9 },

    // Center Core Shards
    { id: 7, clip: 'polygon(25% 25%, 50% 35%, 35% 55%, 15% 40%)', x: -260, y: -90, rZ: -110, rX: 55, rY: -40, scale: 0.3, d: 3.6 },
    { id: 8, clip: 'polygon(50% 35%, 75% 25%, 85% 45%, 65% 55%)', x: 280, y: -80, rZ: 115, rX: -50, rY: 40, scale: 0.3, d: 3.6 },
    { id: 9, clip: 'polygon(35% 55%, 50% 35%, 65% 55%, 50% 70%)', x: 0, y: -180, rZ: 160, rX: 65, rY: 60, scale: 0.25, d: 3.5 },
    { id: 10, clip: 'polygon(28% 50%, 50% 70%, 30% 78%, 0% 75%)', x: -360, y: 140, rZ: -100, rX: -40, rY: -35, scale: 0.36, d: 3.9 },
    { id: 11, clip: 'polygon(50% 70%, 72% 50%, 100% 75%, 70% 78%)', x: 380, y: 150, rZ: 105, rX: 45, rY: 35, scale: 0.36, d: 3.9 },

    // Bottom-Left shards
    { id: 12, clip: 'polygon(0% 55%, 28% 50%, 0% 75%)', x: -440, y: 70, rZ: -75, rX: 30, rY: 45, scale: 0.4, d: 4.0 },
    { id: 13, clip: 'polygon(0% 75%, 30% 78%, 50% 100%, 0% 100%)', x: -350, y: 420, rZ: -85, rX: -45, rY: 35, scale: 0.35, d: 3.8 },
    { id: 14, clip: 'polygon(30% 78%, 50% 70%, 50% 100%)', x: -150, y: 450, rZ: -55, rX: 55, rY: -25, scale: 0.38, d: 4.1 },

    // Bottom-Right shards
    { id: 15, clip: 'polygon(50% 100%, 50% 70%, 70% 78%)', x: 160, y: 440, rZ: 60, rX: -55, rY: 25, scale: 0.38, d: 4.1 },
    { id: 16, clip: 'polygon(70% 78%, 100% 75%, 100% 100%, 50% 100%)', x: 370, y: 410, rZ: 90, rX: 40, rY: -35, scale: 0.35, d: 3.8 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
      {/* 1. Gracefully Expanding Cosmic Emerald Shockwave Ripple Ring (Slow Space Ripple) */}
      <motion.div
        initial={{ scale: 0.2, opacity: 1, borderWidth: '14px' }}
        animate={{ 
          scale: [0.25, 3.8], 
          opacity: [1, 0.75, 0],
          borderWidth: ['14px', '1px']
        }}
        transition={{ 
          duration: 2.8, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="absolute rounded-full border-emerald-300 shadow-[0_0_50px_#10b981,_inset_0_0_35px_#34d399] pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
        }}
      />

      {/* 2. Secondary Ethereal Distortion Ripple Ring */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0.9, borderWidth: '18px' }}
        animate={{ 
          scale: [0.15, 4.8], 
          opacity: [0.9, 0.5, 0],
          borderWidth: ['18px', '1.5px']
        }}
        transition={{ 
          duration: 3.2, 
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="absolute rounded-full border-teal-200/80 shadow-[0_0_70px_#6ee7b7] pointer-events-none"
        style={{
          width: '280px',
          height: '280px',
        }}
      />

      {/* 3. Deep Space Pressure Atmosphere Wave */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0.8 }}
        animate={{ 
          scale: [0.3, 4.0], 
          opacity: [0.8, 0] 
        }}
        transition={{ 
          duration: 3.5, 
          delay: 0.3,
          ease: "easeOut" 
        }}
        className="absolute rounded-full bg-radial from-emerald-400/35 via-teal-500/15 to-transparent blur-2xl pointer-events-none"
        style={{
          width: '360px',
          height: '360px',
        }}
      />

      {/* 4. Soft Cosmic Impact Bloom */}
      <motion.div
        initial={{ opacity: 0.9, scale: 0.7 }}
        animate={{ opacity: 0, scale: 2.5 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute w-72 h-72 rounded-full bg-emerald-100 blur-3xl pointer-events-none"
      />

      {/* 5. 16 Realistic Polygonal Glass Shards drifting naturally in Slow-Motion Zero-G */}
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
            opacity: [1, 0.95, 0.8, 0]
          }}
          transition={{
            duration: s.d,
            ease: [0.16, 0.92, 0.36, 1], // Smooth space-glide deceleration
            delay: 0.02
          }}
          onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
          className="absolute w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] rounded-3xl pointer-events-none"
          style={{
            clipPath: s.clip,
            background: 'linear-gradient(135deg, rgba(6,78,59,0.95) 0%, rgba(16,185,129,0.85) 50%, rgba(5,150,105,0.95) 100%)',
            border: '2px solid rgba(167, 243, 208, 0.95)',
            boxShadow: '0 0 30px rgba(16,185,129,0.8), inset 0 0 18px rgba(110,231,183,0.5)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Glass Crystal Inner Refraction highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
        </motion.div>
      ))}

      {/* 6. Weightless floating cosmic glass dust specks floating gently in zero-gravity */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const dist = 280 + (i % 5) * 70;
        const targetX = Math.cos(angle) * dist;
        const targetY = Math.sin(angle) * dist;

        return (
          <motion.div
            key={`glass-dust-${i}`}
            initial={{ x: 0, y: 0, scale: 1.3, opacity: 1 }}
            animate={{ 
              x: targetX, 
              y: targetY, 
              scale: 0.2, 
              opacity: [1, 0.8, 0] 
            }}
            transition={{
              duration: 2.8 + (i % 4) * 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: (i * 0.03)
            }}
            className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#34d399]"
          />
        );
      })}
    </div>
  );
}

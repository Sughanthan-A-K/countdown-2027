import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiMindStoneShatter
 * 
 * Cinematic Natural Glass Shatter & Anime Shockwave:
 * - High-velocity explosive initial impulse (0.0s to 0.1s snap)
 * - Natural 3D tumbling shards with realistic varied inertia
 * - Pure neon green & incandescent white shockwave flashes
 * - Dispersing glass crystalline dust
 */
export default function LokiMindStoneShatter({ onAnimationComplete }) {
  // 18 realistic polygonal crystalline glass shards with high-energy explosive trajectories
  const shards = [
    // Top-Left corner & razor slivers
    { id: 1, clip: 'polygon(0% 0%, 48% 0%, 25% 25%, 0% 28%)', x: -520, y: -540, rZ: -160, rX: 180, rY: -90, scale: 0.18, d: 2.2 },
    { id: 2, clip: 'polygon(25% 25%, 48% 0%, 50% 32%, 18% 38%)', x: -310, y: -580, rZ: -95, rX: 210, rY: 80, scale: 0.22, d: 2.4 },
    { id: 3, clip: 'polygon(0% 28%, 25% 25%, 28% 48%, 0% 52%)', x: -590, y: -190, rZ: -180, rX: -120, rY: 150, scale: 0.19, d: 2.3 },
    
    // Top-Right razor slivers
    { id: 4, clip: 'polygon(48% 0%, 100% 0%, 100% 28%, 74% 24%)', x: 540, y: -520, rZ: 170, rX: 190, rY: 110, scale: 0.18, d: 2.2 },
    { id: 5, clip: 'polygon(48% 0%, 74% 24%, 50% 32%)', x: 280, y: -590, rZ: 110, rX: -180, rY: 90, scale: 0.24, d: 2.5 },
    { id: 6, clip: 'polygon(74% 24%, 100% 28%, 100% 52%, 72% 48%)', x: 610, y: -180, rZ: 190, rX: 140, rY: -160, scale: 0.2, d: 2.3 },

    // Center Core Epicenter (High blast acceleration)
    { id: 7, clip: 'polygon(25% 25%, 50% 32%, 36% 52%, 18% 38%)', x: -380, y: -140, rZ: -240, rX: 280, rY: -190, scale: 0.15, d: 2.0 },
    { id: 8, clip: 'polygon(50% 32%, 74% 24%, 82% 44%, 64% 52%)', x: 410, y: -130, rZ: 250, rX: -270, rY: 180, scale: 0.15, d: 2.0 },
    { id: 9, clip: 'polygon(36% 52%, 50% 32%, 64% 52%, 50% 68%)', x: 0, y: -290, rZ: 380, rX: 320, rY: 260, scale: 0.12, d: 1.8 },
    { id: 10, clip: 'polygon(28% 48%, 50% 68%, 30% 76%, 0% 72%)', x: -490, y: 190, rZ: -210, rX: -190, rY: -140, scale: 0.2, d: 2.2 },
    { id: 11, clip: 'polygon(50% 68%, 72% 48%, 100% 72%, 70% 76%)', x: 510, y: 210, rZ: 220, rX: 200, rY: 150, scale: 0.2, d: 2.2 },

    // Bottom-Left shards
    { id: 12, clip: 'polygon(0% 52%, 28% 48%, 0% 72%)', x: -600, y: 120, rZ: -150, rX: 160, rY: 200, scale: 0.22, d: 2.4 },
    { id: 13, clip: 'polygon(0% 72%, 30% 76%, 50% 100%, 0% 100%)', x: -480, y: 540, rZ: -160, rX: -220, rY: 160, scale: 0.18, d: 2.2 },
    { id: 14, clip: 'polygon(30% 76%, 50% 68%, 50% 100%)', x: -220, y: 570, rZ: -110, rX: 250, rY: -120, scale: 0.2, d: 2.5 },

    // Bottom-Right shards
    { id: 15, clip: 'polygon(50% 100%, 50% 68%, 70% 76%)', x: 230, y: 560, rZ: 115, rX: -250, rY: 130, scale: 0.2, d: 2.5 },
    { id: 16, clip: 'polygon(70% 76%, 100% 72%, 100% 100%, 50% 100%)', x: 500, y: 530, rZ: 170, rX: 210, rY: -170, scale: 0.18, d: 2.2 },

    // Extra sharp needle slivers for realistic shattered glass
    { id: 17, clip: 'polygon(46% 45%, 54% 45%, 50% 58%)', x: 40, y: 180, rZ: 420, rX: 360, rY: -300, scale: 0.08, d: 1.6 },
    { id: 18, clip: 'polygon(42% 38%, 46% 45%, 38% 48%)', x: -60, y: -160, rZ: -450, rX: -360, rY: 280, scale: 0.08, d: 1.6 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
      {/* 0. FULL-SCREEN BLINDING COSMIC SCREEN FLASH OVERLAY (Spreads across 100vw x 100vh) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.95, 0.7, 0] 
        }}
        transition={{ duration: 0.85, times: [0, 0.08, 0.25, 1], ease: "easeOut" }}
        className="fixed inset-0 pointer-events-none z-[150] bg-radial from-white via-emerald-400/60 to-black/80"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 0B. Card Center Blinding Supernova Epicenter Burst */}
      <motion.div
        initial={{ opacity: 1, scale: 0.05 }}
        animate={{ 
          opacity: [1, 1, 0], 
          scale: [0.05, 4.5, 7.5] 
        }}
        transition={{ duration: 0.6, ease: [0.02, 0.98, 0.15, 1] }}
        className="absolute w-80 h-80 rounded-full bg-white blur-2xl pointer-events-none z-[120]"
      />
      <motion.div
        initial={{ opacity: 1, scale: 0.1 }}
        animate={{ 
          opacity: [1, 0.85, 0], 
          scale: [0.1, 5.5, 9.0] 
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute w-96 h-96 rounded-full bg-emerald-400/90 blur-3xl pointer-events-none z-[110]"
      />

      {/* 1. Fast Full-Screen High-Velocity Shockwave Ring Expanding outward past screen */}
      <motion.div
        initial={{ scale: 0.05, opacity: 1, borderWidth: '40px' }}
        animate={{ 
          scale: [0.05, 8.5], 
          opacity: [1, 0.9, 0],
          borderWidth: ['40px', '1px']
        }}
        transition={{ 
          duration: 1.2, 
          ease: [0.02, 0.9, 0.2, 1] 
        }}
        className="absolute rounded-full border-white shadow-[0_0_120px_#34d399,_inset_0_0_80px_#a7f3d0] pointer-events-none z-[100]"
        style={{
          width: '320px',
          height: '320px',
        }}
      />

      {/* 2. Secondary Emerald Expansion Shockwave sweeping entire display */}
      <motion.div
        initial={{ scale: 0.05, opacity: 1, borderWidth: '32px' }}
        animate={{ 
          scale: [0.05, 9.8], 
          opacity: [1, 0.75, 0],
          borderWidth: ['32px', '2px']
        }}
        transition={{ 
          duration: 1.4, 
          delay: 0.03,
          ease: [0.05, 0.92, 0.25, 1] 
        }}
        className="absolute rounded-full border-teal-200 shadow-[0_0_140px_#10b981] pointer-events-none z-[95]"
        style={{
          width: '280px',
          height: '280px',
        }}
      />

      {/* 3. Volumetric Jade Atmosphere Wave Covering screen to reveal portal */}
      <motion.div
        initial={{ scale: 0.1, opacity: 0.95 }}
        animate={{ 
          scale: [0.1, 8.0], 
          opacity: [0.95, 0] 
        }}
        transition={{ 
          duration: 1.6, 
          delay: 0.05,
          ease: "easeOut" 
        }}
        className="absolute rounded-full bg-radial from-emerald-300/80 via-teal-500/50 to-transparent blur-3xl pointer-events-none z-[90]"
        style={{
          width: '360px',
          height: '360px',
        }}
      />

      {/* 4. Realistic Polygonal Glass Shards scattering with physical tumble & momentum */}
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
            ease: [0.08, 0.85, 0.25, 1],
            delay: 0.0
          }}
          onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
          className="absolute w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] rounded-3xl pointer-events-none"
          style={{
            clipPath: s.clip,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(52,211,153,0.9) 35%, rgba(5,150,105,0.95) 100%)',
            border: '2px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 0 35px rgba(52,211,153,0.9), inset 0 0 20px rgba(255,255,255,0.7)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Glass Specular Glint */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent pointer-events-none" />
        </motion.div>
      ))}

      {/* 5. Fine Dispersing Glass Dust Sparks */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const dist = 340 + (i % 6) * 75;
        const targetX = Math.cos(angle) * dist;
        const targetY = Math.sin(angle) * dist;

        return (
          <motion.div
            key={`glass-dust-${i}`}
            initial={{ x: 0, y: 0, scale: 1.8, opacity: 1 }}
            animate={{ 
              x: targetX, 
              y: targetY, 
              scale: 0.1, 
              opacity: 0 
            }}
            transition={{
              duration: 1.4 + (i % 5) * 0.25,
              ease: [0.08, 0.88, 0.28, 1]
            }}
            className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_14px_#34d399]"
          />
        );
      })}
    </div>
  );
}

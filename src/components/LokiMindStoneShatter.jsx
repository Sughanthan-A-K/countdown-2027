import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiMindStoneShatter
 * 
 * Clean Glass Shatter (Without excessive explosive shockwaves/bursts):
 * As requested: "Glass odanchi therija pothum antha vedicha mathiri vara effect vena"
 * - The card fractures into 16 realistic polygonal crystalline glass shards that drift outward.
 * - Gentle twinkling glass glints & dust specks.
 * - No heavy flashbangs or boiling shockwaves.
 */
export default function LokiMindStoneShatter({ onAnimationComplete }) {
  // 16 polygonal crystalline glass shards that cleanly scatter outward
  const shards = [
    // Top-Left shards
    { id: 1, clip: 'polygon(0% 0%, 50% 0%, 25% 25%, 0% 30%)', x: -320, y: -350, rZ: -70, rX: 25, rY: -20, scale: 0.35, d: 2.2 },
    { id: 2, clip: 'polygon(25% 25%, 50% 0%, 50% 35%, 15% 40%)', x: -180, y: -380, rZ: -45, rX: 35, rY: 15, scale: 0.4, d: 2.4 },
    { id: 3, clip: 'polygon(0% 30%, 25% 25%, 28% 50%, 0% 55%)', x: -360, y: -120, rZ: -90, rX: -20, rY: 30, scale: 0.35, d: 2.3 },
    
    // Top-Right shards
    { id: 4, clip: 'polygon(50% 0%, 100% 0%, 100% 30%, 75% 25%)', x: 340, y: -330, rZ: 75, rX: 30, rY: 25, scale: 0.35, d: 2.2 },
    { id: 5, clip: 'polygon(50% 0%, 75% 25%, 50% 35%)', x: 160, y: -390, rZ: 50, rX: -25, rY: 20, scale: 0.4, d: 2.5 },
    { id: 6, clip: 'polygon(75% 25%, 100% 30%, 100% 55%, 72% 50%)', x: 380, y: -110, rZ: 95, rX: 25, rY: -30, scale: 0.38, d: 2.3 },

    // Center Core Shards
    { id: 7, clip: 'polygon(25% 25%, 50% 35%, 35% 55%, 15% 40%)', x: -220, y: -80, rZ: -110, rX: 45, rY: -35, scale: 0.3, d: 2.1 },
    { id: 8, clip: 'polygon(50% 35%, 75% 25%, 85% 45%, 65% 55%)', x: 240, y: -70, rZ: 115, rX: -40, rY: 35, scale: 0.3, d: 2.1 },
    { id: 9, clip: 'polygon(35% 55%, 50% 35%, 65% 55%, 50% 70%)', x: 0, y: -160, rZ: 180, rX: 60, rY: 50, scale: 0.25, d: 2.0 },
    { id: 10, clip: 'polygon(28% 50%, 50% 70%, 30% 78%, 0% 75%)', x: -310, y: 120, rZ: -100, rX: -35, rY: -25, scale: 0.36, d: 2.3 },
    { id: 11, clip: 'polygon(50% 70%, 72% 50%, 100% 75%, 70% 78%)', x: 320, y: 130, rZ: 105, rX: 40, rY: 25, scale: 0.36, d: 2.3 },

    // Bottom-Left shards
    { id: 12, clip: 'polygon(0% 55%, 28% 50%, 0% 75%)', x: -370, y: 60, rZ: -70, rX: 25, rY: 40, scale: 0.4, d: 2.4 },
    { id: 13, clip: 'polygon(0% 75%, 30% 78%, 50% 100%, 0% 100%)', x: -290, y: 350, rZ: -80, rX: -40, rY: 30, scale: 0.35, d: 2.2 },
    { id: 14, clip: 'polygon(30% 78%, 50% 70%, 50% 100%)', x: -120, y: 370, rZ: -50, rX: 45, rY: -20, scale: 0.38, d: 2.5 },

    // Bottom-Right shards
    { id: 15, clip: 'polygon(50% 100%, 50% 70%, 70% 78%)', x: 130, y: 360, rZ: 50, rX: -45, rY: 20, scale: 0.38, d: 2.5 },
    { id: 16, clip: 'polygon(70% 78%, 100% 75%, 100% 100%, 50% 100%)', x: 310, y: 340, rZ: 85, rX: 35, rY: -30, scale: 0.35, d: 2.2 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
      {/* 16 Realistic Polygonal Glass Shards scattering outward with zero heavy explosion flash */}
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
            ease: [0.16, 0.84, 0.44, 1],
            delay: 0.02
          }}
          onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
          className="absolute w-[85vw] max-w-[340px] aspect-[3/4] max-h-[450px] rounded-3xl pointer-events-none"
          style={{
            clipPath: s.clip,
            background: 'linear-gradient(135deg, rgba(6,78,59,0.95) 0%, rgba(16,185,129,0.85) 50%, rgba(5,150,105,0.95) 100%)',
            border: '2px solid rgba(110, 231, 183, 0.9)',
            boxShadow: '0 0 25px rgba(16,185,129,0.7), inset 0 0 15px rgba(52,211,153,0.5)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Glass Crystal Inner Refraction highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Interactive Multiverse Crack for Dec 16:
 * - crackStage 0: 100% hidden, completely normal card.
 * - crackStage 1: Subtle initial fissure drawing across the card.
 * - crackStage 2: Deeper electrical branching with green glow bleeding through.
 * - crackStage 3: Full cosmic breach: universe nebula & stars visible, glowing border, reality torn open!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
      {/* Background Dim & Cosmic Glow inside the card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isFullUniverse ? 0.95 : (crackStage === 2 ? 0.75 : 0.45) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black/80 pointer-events-none"
      />

      {/* Cosmic Nebula & Stars behind the crack (revealed on stage 2 & 3) */}
      {crackStage >= 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ 
            opacity: isFullUniverse ? [0.7, 1, 0.8] : 0.5,
            scale: isFullUniverse ? 1.4 : 1.05,
            rotate: [0, 8, -4, 0]
          }}
          transition={{ 
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 14, repeat: Infinity, ease: "linear" }
          }}
          className="absolute w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.55) 0%, rgba(5,150,105,0.35) 40%, rgba(6,78,59,0.2) 65%, transparent 85%)',
            filter: 'blur(22px)'
          }}
        />
      )}

      {/* Cosmic star specks inside the breach */}
      {isFullUniverse && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scale: [0.6, 1.4, 0.6]
              }}
              transition={{
                duration: 1.4 + (i % 3) * 0.7,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut"
              }}
              className="absolute rounded-full bg-emerald-200 shadow-[0_0_8px_#34d399]"
              style={{
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
                top: `${20 + (i * 6) % 60}%`,
                left: `${25 + (i * 7) % 50}%`
              }}
            />
          ))}
        </div>
      )}

      {/* Central Loki Emerald Crack / Rift (SVG Vector with organic branching) */}
      <svg 
        viewBox="0 0 200 400" 
        className="relative w-52 h-84 pointer-events-none filter drop-shadow-[0_0_18px_rgba(52,211,153,0.95)]"
      >
        <defs>
          <linearGradient id="lokiGreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="30%" stopColor="#34d399" />
            <stop offset="70%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          
          <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Glowing Rift Outer Bleed */}
        <motion.path
          d="M 100 20 L 105 80 L 92 130 L 112 180 L 88 240 L 106 310 L 98 380"
          stroke="#10b981"
          strokeWidth={isFullUniverse ? "20" : (crackStage === 2 ? "12" : "6")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
          filter="url(#emeraldGlow)"
          animate={{
            strokeWidth: isFullUniverse ? [18, 26, 18] : [10, 14, 10],
            opacity: [0.5, 0.85, 0.5]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Core Electric Beam */}
        <motion.path
          d="M 100 20 L 105 80 L 92 130 L 112 180 L 88 240 L 106 310 L 98 380"
          stroke="url(#lokiGreenGradient)"
          strokeWidth={isFullUniverse ? "9" : (crackStage === 2 ? "5" : "2.5")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {/* Inner intense white-mint fracture line */}
        <motion.path
          d="M 100 20 L 105 80 L 92 130 L 112 180 L 88 240 L 106 310 L 98 380"
          stroke="#f0fdf4"
          strokeWidth={isFullUniverse ? "3.5" : "1.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Branch Cracks Left & Right (Stage 2 and Stage 3) */}
        {crackStage >= 2 && (
          <motion.path
            d="M 105 80 L 75 110 M 92 130 L 60 155 M 112 180 L 140 160 M 88 240 L 125 265 M 106 310 L 70 335"
            stroke="#34d399"
            strokeWidth={isFullUniverse ? "3" : "1.8"}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}

        {/* Deep Wild Secondary Branches (Stage 3 Full Universe) */}
        {isFullUniverse && (
          <motion.path
            d="M 75 110 L 45 105 M 60 155 L 35 180 M 140 160 L 175 175 M 125 265 L 160 280 M 70 335 L 40 350"
            stroke="#6ee7b7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          />
        )}
      </svg>
    </div>
  );
}

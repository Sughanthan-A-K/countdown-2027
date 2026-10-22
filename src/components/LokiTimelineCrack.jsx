import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Interactive Multiverse Crack for Dec 16:
 * - crackStage 0: 100% hidden, completely normal card.
 * - crackStage 1: Subtle initial fissure drawing across the card.
 * - crackStage 2: Deeper electrical branching with green glow bleeding through.
 * - crackStage 3: Full cosmic breach: universe nebula & stars visible.
 * - crackStage 4 (Creep & Sunbeam Light Rays Phase):
 *   Crack widens massively with piercing volumetric green light rays (like sunbeams breaking through clouds)
 *   radiating across the screen for 2 seconds before the final glass shatter!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-visible rounded-3xl">
      {/* Background Dim & Cosmic Glow inside the card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isFullUniverse ? 0.95 : (crackStage === 2 ? 0.75 : 0.45) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black/80 pointer-events-none rounded-3xl"
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

      {/* Volumetric Sunbeam Light Rays breaking through the cracks on 4th tap (like sunlight breaking through dark clouds) */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
          {/* Intense central emerald flare pulse */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.5, 2.8], opacity: [0.2, 1, 0.85] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-200 to-white blur-2xl"
          />

          {/* 8 Piercing Volumetric Light Shafts / Sunbeams shooting out through the fractures across the screen */}
          {[
            { angle: -65, length: '120vw', width: '38px', delay: 0 },
            { angle: -25, length: '140vw', width: '45px', delay: 0.1 },
            { angle: 15, length: '130vw', width: '35px', delay: 0.05 },
            { angle: 60, length: '125vw', width: '50px', delay: 0.15 },
            { angle: 115, length: '135vw', width: '40px', delay: 0.08 },
            { angle: 155, length: '120vw', width: '48px', delay: 0.12 },
            { angle: -120, length: '140vw', width: '42px', delay: 0.18 },
            { angle: -160, length: '130vw', width: '36px', delay: 0.06 }
          ].map((beam, i) => (
            <motion.div
              key={`sunbeam-${i}`}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ 
                scaleY: [0, 1.2, 1],
                opacity: [0, 0.9, 0.75]
              }}
              transition={{
                duration: 1.8,
                delay: beam.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute pointer-events-none origin-bottom"
              style={{
                width: beam.width,
                height: beam.length,
                transform: `rotate(${beam.angle}deg)`,
                background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(110,231,183,0.85) 25%, rgba(16,185,129,0.5) 60%, transparent 100%)',
                filter: 'blur(6px)',
                mixBlendMode: 'screen'
              }}
            />
          ))}
        </div>
      )}

      {/* SVG Lightning Fissure Paths */}
      <svg 
        viewBox="0 0 200 400" 
        className="w-full h-full absolute inset-0 pointer-events-none z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lokiGreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="fissureGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={isLightRaysCreeping ? "9" : (isFullUniverse ? "5" : "2.5")} result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Deep Glow Fissure */}
        <motion.path
          d="M 100 20 L 105 80 L 92 130 L 112 180 L 88 240 L 106 310 L 98 380"
          stroke="#10b981"
          strokeWidth={isLightRaysCreeping ? "24" : (isFullUniverse ? "14" : (crackStage === 2 ? "8" : "4"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#fissureGlow)"
          opacity={isLightRaysCreeping ? 1 : (isFullUniverse ? 0.9 : 0.6)}
          animate={{
            strokeWidth: isLightRaysCreeping ? [16, 26, 22] : (isFullUniverse ? [12, 16, 12] : [6, 9, 6])
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Core Electric Beam */}
        <motion.path
          d="M 100 20 L 105 80 L 92 130 L 112 180 L 88 240 L 106 310 L 98 380"
          stroke="url(#lokiGreenGradient)"
          strokeWidth={isLightRaysCreeping ? "14" : (isFullUniverse ? "9" : (crackStage === 2 ? "5" : "2.5"))}
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
          strokeWidth={isLightRaysCreeping ? "6" : (isFullUniverse ? "3.5" : "1.5")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Branch Cracks Left & Right */}
        {crackStage >= 2 && (
          <motion.path
            d="M 105 80 L 75 110 M 92 130 L 60 155 M 112 180 L 140 160 M 88 240 L 125 265 M 106 310 L 70 335"
            stroke="#34d399"
            strokeWidth={isLightRaysCreeping ? "5" : (isFullUniverse ? "3" : "1.8")}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}

        {/* Deep Wild Secondary Branches */}
        {isFullUniverse && (
          <motion.path
            d="M 75 110 L 45 105 M 60 155 L 35 180 M 140 160 L 175 175 M 125 265 L 160 280 M 70 335 L 40 350"
            stroke="#6ee7b7"
            strokeWidth={isLightRaysCreeping ? "4" : "2"}
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

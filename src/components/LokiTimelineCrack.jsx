import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Realistic Organic Glass Fracture System for Dec 16:
 * - crackStage 0: Hidden.
 * - crackStage 1: Fine, realistic spiderweb impact micro-fissures radiating from an organic strike point (x: 108, y: 195).
 * - crackStage 2: Deeper crystalline fractures with secondary branching fissures & emerald glow bleed.
 * - crackStage 3: Full cosmic breach: universe nebula & stars visible through jagged broken glass apertures.
 * - crackStage 4: Piercing emerald volumetric crepuscular rays radiating through realistic jagged cracks.
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  // Impact origin coordinates for the glass crack
  const originX = 108;
  const originY = 195;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-visible rounded-3xl">
      {/* Background Dimming & Multiverse Void tint behind the glass */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isFullUniverse ? 0.95 : (crackStage === 2 ? 0.75 : 0.45) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black/85 pointer-events-none rounded-3xl"
      />

      {/* Cosmic Void & Emerald Nebula visible behind fractures (Stage 2 & 3) */}
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

      {/* Stage 4: Volumetric Light Beams Streaming Through Cracked Apertures */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              <radialGradient id="holeBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#a7f3d0" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="rayGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayGrad2" x1="50%" y1="50%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#a7f3d0" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayGrad3" x1="50%" y1="50%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#6ee7b7" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <filter id="softGlowRay" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            {/* Core bloom */}
            <motion.ellipse
              cx={originX}
              cy={originY}
              rx="24"
              ry="24"
              fill="url(#holeBloom)"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.5, 1.4, 1.2], opacity: [0, 1, 0.9] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              filter="url(#softGlowRay)"
            />

            {/* Light Cones aligned with the realistic fracture lines */}
            <motion.polygon
              points={`${originX},${originY} 150,150 420,-60 280,-120`}
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.6, delay: 0.05, ease: "easeOut" }}
            />
            <motion.polygon
              points={`${originX},${originY} 120,230 440,240 380,360`}
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.7, delay: 0.15, ease: "easeOut" }}
            />
            <motion.polygon
              points={`${originX},${originY} 75,260 280,560 140,580`}
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
            />
            <motion.polygon
              points={`${originX},${originY} 50,170 -160,340 -200,200`}
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.6, delay: 0.08, ease: "easeOut" }}
            />
            <motion.polygon
              points={`${originX},${originY} 70,120 -120,-80 -220,40`}
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.7, delay: 0.12, ease: "easeOut" }}
            />
            <motion.polygon
              points={`${originX},${originY} 115,100 80,-180 200,-180`}
              fill="url(#rayGrad3)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 1.6, delay: 0.06, ease: "easeOut" }}
            />
          </svg>
        </div>
      )}

      {/* SVG Realistic Spiderweb & Radial Broken Glass Fractures */}
      <svg 
        viewBox="0 0 200 400" 
        className="w-full h-full absolute inset-0 pointer-events-none z-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glassAuraGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={isLightRaysCreeping ? "7" : (isFullUniverse ? "4" : "2")} result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Deep Emerald Glow Aura behind glass cracks */}
        <motion.path
          d={`
            M 108 195 L 115 150 L 105 105 L 118 65 L 112 15
            M 108 195 L 138 175 L 165 145 L 188 120
            M 108 195 L 145 210 L 178 225 L 195 240
            M 108 195 L 125 245 L 140 295 L 158 355 L 165 385
            M 108 195 L 95 250 L 82 305 L 75 350 L 68 390
            M 108 195 L 72 220 L 45 245 L 18 265
            M 108 195 L 68 180 L 38 165 L 8 150
            M 108 195 L 78 145 L 58 105 L 35 60
          `}
          stroke="#10b981"
          strokeWidth={isLightRaysCreeping ? "14" : (isFullUniverse ? "9" : (crackStage === 2 ? "5" : "2.5"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glassAuraGlow)"
          opacity={isLightRaysCreeping ? 1 : (isFullUniverse ? 0.85 : 0.6)}
        />

        {/* 2. Realistic Primary Radial Glass Fractures (Irregular jagged lines shooting out from impact) */}
        <motion.path
          d={`
            M 108 195 L 115 150 L 105 105 L 118 65 L 112 15
            M 108 195 L 138 175 L 165 145 L 188 120
            M 108 195 L 145 210 L 178 225 L 195 240
            M 108 195 L 125 245 L 140 295 L 158 355 L 165 385
            M 108 195 L 95 250 L 82 305 L 75 350 L 68 390
            M 108 195 L 72 220 L 45 245 L 18 265
            M 108 195 L 68 180 L 38 165 L 8 150
            M 108 195 L 78 145 L 58 105 L 35 60
          `}
          stroke={crackStage >= 2 ? "#34d399" : "#6ee7b7"}
          strokeWidth={isLightRaysCreeping ? "4.5" : (isFullUniverse ? "3" : (crackStage === 2 ? "2" : "1.2"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* 3. Concentric Transverse Spiderweb Rings (Realistic broken glass arcs connecting radial cracks) */}
        <motion.path
          d={`
            M 98 165 L 115 160 L 128 175 L 125 195 L 118 215 L 98 215 L 85 200 L 88 180 Z
            M 85 135 L 115 125 L 148 150 L 155 185 L 140 230 L 105 240 L 70 230 L 60 190 L 68 155 Z
            ${crackStage >= 2 ? 'M 65 95 L 115 80 L 170 120 L 185 175 L 165 260 L 115 285 L 50 260 L 35 185 L 48 125 Z' : ''}
            ${isFullUniverse ? 'M 45 50 L 115 35 L 190 90 L 198 210 L 180 320 L 115 345 L 25 300 L 15 165 L 28 85 Z' : ''}
          `}
          stroke={crackStage >= 2 ? "#a7f3d0" : "#d1fae5"}
          strokeWidth={isLightRaysCreeping ? "3" : (isFullUniverse ? "2" : (crackStage === 2 ? "1.4" : "0.9"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        />

        {/* 4. Fine Secondary Micro-Crystalline Fissures (Stage 2 & Stage 3) */}
        {crackStage >= 2 && (
          <motion.path
            d={`
              M 115 150 L 132 135 M 105 105 L 88 90 M 118 65 L 135 52
              M 138 175 L 152 195 M 165 145 L 185 165
              M 145 210 L 162 195 M 178 225 L 190 205
              M 125 245 L 148 260 M 140 295 L 125 325
              M 95 250 L 72 265 M 82 305 L 95 330
              M 72 220 L 55 205 M 45 245 L 30 225
              M 68 180 L 52 195 M 38 165 L 25 185
              M 78 145 L 62 165 M 58 105 L 42 125
            `}
            stroke="#6ee7b7"
            strokeWidth={isLightRaysCreeping ? "2.5" : (isFullUniverse ? "1.6" : "1.0")}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          />
        )}

        {/* 5. Pure Crystalline White-Hot Highlight Edges (gives the hyper-realistic glass reflection) */}
        <motion.path
          d={`
            M 108 195 L 115 150 L 105 105 L 118 65
            M 108 195 L 138 175 L 165 145
            M 108 195 L 145 210 L 178 225
            M 108 195 L 125 245 L 140 295
            M 108 195 L 95 250 L 82 305
            M 108 195 L 72 220 L 45 245
            M 108 195 L 68 180 L 38 165
            M 108 195 L 78 145 L 58 105
            M 98 165 L 115 160 L 128 175
            M 85 135 L 115 125 L 148 150
          `}
          stroke="#ffffff"
          strokeWidth={isLightRaysCreeping ? "2.2" : (isFullUniverse ? "1.4" : "0.8")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 6. Impact Center Crystalline Puncture Shards (Real shatter point) */}
        <motion.polygon
          points="108,191 113,195 109,200 104,196"
          fill="#ffffff"
          stroke="#a7f3d0"
          strokeWidth="1"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

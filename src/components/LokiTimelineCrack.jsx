import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Interactive Multiverse Crack for Dec 16:
 * - Natural glass fracture pattern with organic branching, micro-fissures, and irregular dendritic propagation.
 * - crackStage 0: 100% hidden, completely normal card.
 * - crackStage 1: Subtle initial natural glass fracture drawing across the card.
 * - crackStage 2: Deeper dendritic fractures with branching forks and glowing emerald bleeding.
 * - crackStage 3: Full cosmic breach: universe nebula & stars visible through the fractured web.
 * - crackStage 4 (Light Ray Creep & Glass Fracture Transition):
 *   Natural emerald sunlight / crepuscular beam shafts beaming through jagged broken glass fractures,
 *   glowing white-hot along the edges for 2 seconds before the final glass shatter!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  // Realistic dendritic glass fracture path:
  // Starts top-center, branches with small jagged micro-zigzags like real tempered/shattered glass
  const mainSpinePath = "M 102 10 L 98 42 L 106 78 L 94 116 L 108 152 L 102 188 L 114 224 L 92 268 L 104 312 L 96 354 L 100 395";
  
  // Primary branch fractures
  const primaryBranchesPath = 
    "M 106 78 L 78 98 L 56 122 M 106 78 L 128 92 L 154 112 " +
    "M 94 116 L 68 144 L 42 162 " +
    "M 102 188 L 138 174 L 172 168 M 102 188 L 64 212 L 32 238 " +
    "M 114 224 L 148 248 L 178 282 " +
    "M 92 268 L 62 294 L 38 336 M 104 312 L 136 332 L 164 365";

  // Fine secondary micro-cracks (Stage 3 & 4)
  const microBranchesPath = 
    "M 78 98 L 84 130 M 128 92 L 142 68 M 68 144 L 82 172 M 138 174 L 152 206 " +
    "M 64 212 L 48 190 M 148 248 L 132 284 M 62 294 L 80 324 M 136 332 L 154 308 " +
    "M 56 122 L 28 132 M 172 168 L 192 182 M 32 238 L 18 262 M 178 282 L 194 310";

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-visible rounded-3xl">
      {/* Background Dim & Cosmic Glow inside the card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isFullUniverse ? 0.95 : (crackStage === 2 ? 0.75 : 0.45) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black/85 pointer-events-none rounded-3xl"
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

      {/* Stage 4: Light traveling through cracked broken glass gaps */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          {/* SVG Volumetric Light Cones streaming out through fracture gaps */}
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

            {/* Core puncture bloom hole */}
            <motion.ellipse
              cx="102"
              cy="188"
              rx="24"
              ry="24"
              fill="url(#holeBloom)"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.4, 1.2], 
                opacity: [0, 1, 0.9] 
              }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              filter="url(#softGlowRay)"
            />

            {/* Natural Crepuscular Beams Beaming Out Through Glass Fractures */}
            <motion.polygon
              points="102,188 138,174 380,-80 260,-120"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.6, delay: 0.05, ease: "easeOut" }}
            />

            <motion.polygon
              points="102,188 114,224 420,120 400,240"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.7, delay: 0.15, ease: "easeOut" }}
            />

            <motion.polygon
              points="102,188 92,268 320,520 200,560"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
            />

            <motion.polygon
              points="102,188 64,212 -120,540 -180,420"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.6, delay: 0.08, ease: "easeOut" }}
            />

            <motion.polygon
              points="102,188 94,116 -200,80 -220,190"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.7, delay: 0.12, ease: "easeOut" }}
            />

            <motion.polygon
              points="102,188 106,78 -80,-100 -180,-30"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.8, delay: 0.02, ease: "easeOut" }}
            />

            <motion.polygon
              points="102,188 102,10 40,-160 160,-160"
              fill="url(#rayGrad3)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 1.6, delay: 0.06, ease: "easeOut" }}
            />

            <motion.polygon
              points="102,188 100,395 40,580 160,580"
              fill="url(#rayGrad3)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.7, delay: 0.14, ease: "easeOut" }}
            />
          </svg>
        </div>
      )}

      {/* SVG Natural Dendritic Glass Fissure Paths */}
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
            <feGaussianBlur stdDeviation={isLightRaysCreeping ? "8" : (isFullUniverse ? "4.5" : "2")} result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Outer Deep Glow Fissure (Main Spine) */}
        <motion.path
          d={mainSpinePath}
          stroke="#10b981"
          strokeWidth={isLightRaysCreeping ? "20" : (isFullUniverse ? "12" : (crackStage === 2 ? "7" : "3.5"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#fissureGlow)"
          opacity={isLightRaysCreeping ? 1 : (isFullUniverse ? 0.9 : 0.6)}
          animate={{
            strokeWidth: isLightRaysCreeping ? [16, 22, 18] : (isFullUniverse ? [10, 14, 10] : [5, 8, 5])
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 2. Core Vibrant Glass Spine */}
        <motion.path
          d={mainSpinePath}
          stroke="url(#lokiGreenGradient)"
          strokeWidth={isLightRaysCreeping ? "12" : (isFullUniverse ? "8" : (crackStage === 2 ? "4.5" : "2"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {/* 3. Razor Sharp Glass Edge (White-Hot Core) */}
        <motion.path
          d={mainSpinePath}
          stroke="#f0fdf4"
          strokeWidth={isLightRaysCreeping ? "4.5" : (isFullUniverse ? "2.5" : "1.2")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 4. Natural Branch Cracks (Stage 2+) */}
        {crackStage >= 2 && (
          <>
            <motion.path
              d={primaryBranchesPath}
              stroke="#059669"
              strokeWidth={isLightRaysCreeping ? "10" : (isFullUniverse ? "6" : "3")}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#fissureGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.path
              d={primaryBranchesPath}
              stroke="#34d399"
              strokeWidth={isLightRaysCreeping ? "4.5" : (isFullUniverse ? "2.5" : "1.4")}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.path
              d={primaryBranchesPath}
              stroke="#f0fdf4"
              strokeWidth={isLightRaysCreeping ? "2" : "0.9"}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.9"
            />
          </>
        )}

        {/* 5. Natural Dendritic Micro-Fissures (Stage 3+) */}
        {isFullUniverse && (
          <>
            <motion.path
              d={microBranchesPath}
              stroke="#10b981"
              strokeWidth={isLightRaysCreeping ? "4" : "2"}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            />
            <motion.path
              d={microBranchesPath}
              stroke="#a7f3d0"
              strokeWidth={isLightRaysCreeping ? "1.8" : "1"}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            />
          </>
        )}

        {/* 6. Stage 4: Super intense razor-sharp white glass fracture sheen */}
        {isLightRaysCreeping && (
          <motion.path
            d={`${mainSpinePath} ${primaryBranchesPath} ${microBranchesPath}`}
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}

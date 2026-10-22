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
 * - crackStage 4 (Light Ray Creep & Glass Fracture Transition):
 *   Natural emerald sunlight / crepuscular beam shafts beaming through jagged broken glass fractures
 *   (referencing Images 2, 3, 4: light traveling through broken glass gaps), glowing white-hot along the edges
 *   for 2 seconds before the final glass shatter!
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

      {/* Stage 4: Light traveling through cracked broken glass gaps (Images 2, 3, 4) */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          {/* SVG Volumetric Light Cones / Crepuscular God Rays streaming out from crack apertures */}
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              {/* Radial gradient from fracture puncture hole at (105, 180) */}
              <radialGradient id="holeBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#a7f3d0" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              {/* Linear gradients for fan shafts radiating outward */}
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

            {/* Core puncture bloom hole where the fracture point originates */}
            <motion.ellipse
              cx="105"
              cy="180"
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
            {/* Beam 1: Top-Right fissure gap shaft */}
            <motion.polygon
              points="105,180 140,160 380,-80 260,-120"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.6, delay: 0.05, ease: "easeOut" }}
            />

            {/* Beam 2: Right horizontal breach beam */}
            <motion.polygon
              points="105,180 112,185 420,120 400,240"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.7, delay: 0.15, ease: "easeOut" }}
            />

            {/* Beam 3: Bottom-Right branch shaft */}
            <motion.polygon
              points="105,180 88,240 320,520 200,560"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
            />

            {/* Beam 4: Bottom-Left fissure shaft */}
            <motion.polygon
              points="105,180 88,240 -120,540 -180,420"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.6, delay: 0.08, ease: "easeOut" }}
            />

            {/* Beam 5: Left branch gap shaft */}
            <motion.polygon
              points="105,180 92,130 -200,80 -220,190"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.7, delay: 0.12, ease: "easeOut" }}
            />

            {/* Beam 6: Top-Left branch shaft */}
            <motion.polygon
              points="105,180 105,80 -80,-100 -180,-30"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.8, delay: 0.02, ease: "easeOut" }}
            />

            {/* Beam 7: Upward vertical fracture beam */}
            <motion.polygon
              points="105,180 100,20 40,-160 160,-160"
              fill="url(#rayGrad3)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 1.6, delay: 0.06, ease: "easeOut" }}
            />

            {/* Beam 8: Downward spine fracture beam */}
            <motion.polygon
              points="105,180 98,380 40,580 160,580"
              fill="url(#rayGrad3)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.7, delay: 0.14, ease: "easeOut" }}
            />
          </svg>
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
          strokeWidth={isLightRaysCreeping ? "22" : (isFullUniverse ? "14" : (crackStage === 2 ? "8" : "4"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#fissureGlow)"
          opacity={isLightRaysCreeping ? 1 : (isFullUniverse ? 0.9 : 0.6)}
          animate={{
            strokeWidth: isLightRaysCreeping ? [16, 24, 20] : (isFullUniverse ? [12, 16, 12] : [6, 9, 6])
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
            strokeWidth={isLightRaysCreeping ? "6" : (isFullUniverse ? "3" : "1.8")}
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
            strokeWidth={isLightRaysCreeping ? "4.5" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          />
        )}

        {/* Stage 4: Hot white edge highlights on secondary fractures (matching bright fractured glass edges in Images 2, 3, 4) */}
        {isLightRaysCreeping && (
          <motion.path
            d="M 105 80 L 75 110 M 92 130 L 60 155 M 112 180 L 140 160 M 88 240 L 125 265 M 106 310 L 70 335 M 75 110 L 45 105 M 60 155 L 35 180 M 140 160 L 175 175 M 125 265 L 160 280 M 70 335 L 40 350"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ opacity: [0.6, 1, 0.7] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Clean Natural Glass Fractures (NO spiderweb concentric rings):
 * - Organic, jagged natural glass stress fractures traversing across the card.
 * - Progressive widening:
 *   - Tap 1: Single fine razor fracture cutting across the card.
 *   - Tap 2: Secondary organic jagged fractures branching outward with emerald glow bleed.
 *   - Tap 3: Wide breach showing the deep cosmic universe behind the broken glass.
 *   - Tap 4: Piercing emerald volumetric light rays beaming through the jagged fracture fissures.
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-visible rounded-3xl">
      {/* Background Dimming inside the card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isFullUniverse ? 0.95 : (crackStage === 2 ? 0.75 : 0.45) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black/85 pointer-events-none rounded-3xl"
      />

      {/* Cosmic Nebula behind the fracture */}
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

      {/* Stage 4: Light Rays Beaming Out Through the Fissures */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              <radialGradient id="fissureCoreBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#a7f3d0" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="rayGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayGradB" x1="50%" y1="50%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#a7f3d0" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <filter id="softRayBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            {/* Core bloom at the intersection */}
            <motion.ellipse
              cx="105"
              cy="210"
              rx="24"
              ry="24"
              fill="url(#fissureCoreBloom)"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.5, 1.4, 1.2], opacity: [0, 1, 0.9] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              filter="url(#softRayBlur)"
            />

            {/* Crepuscular Rays radiating along the fracture angles */}
            <motion.polygon
              points="105,210 145,140 420,-60 280,-120"
              fill="url(#rayGradA)"
              filter="url(#softRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.6, delay: 0.05, ease: "easeOut" }}
            />
            <motion.polygon
              points="105,210 160,260 440,280 340,420"
              fill="url(#rayGradA)"
              filter="url(#softRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.7, delay: 0.15, ease: "easeOut" }}
            />
            <motion.polygon
              points="105,210 75,310 260,560 120,580"
              fill="url(#rayGradA)"
              filter="url(#softRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
            />
            <motion.polygon
              points="105,210 50,190 -160,280 -200,160"
              fill="url(#rayGradB)"
              filter="url(#softRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.6, delay: 0.08, ease: "easeOut" }}
            />
            <motion.polygon
              points="105,210 95,90 60,-180 180,-180"
              fill="url(#rayGradB)"
              filter="url(#softRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 1.6, delay: 0.06, ease: "easeOut" }}
            />
          </svg>
        </div>
      )}

      {/* SVG Natural Jagged Glass Fissures (NO spiderweb circles) */}
      <svg 
        viewBox="0 0 200 400" 
        className="w-full h-full absolute inset-0 pointer-events-none z-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="fissureGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={isLightRaysCreeping ? "8" : (isFullUniverse ? "5" : "2.5")} result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Deep Atmospheric Emerald Glow along the crack */}
        <motion.path
          d="M 85 10 L 98 75 L 88 140 L 105 210 L 92 285 L 115 350 L 102 390"
          stroke="#10b981"
          strokeWidth={isLightRaysCreeping ? "18" : (isFullUniverse ? "12" : (crackStage === 2 ? "7" : "3.5"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#fissureGlowFilter)"
          opacity={isLightRaysCreeping ? 1 : (isFullUniverse ? 0.9 : 0.6)}
        />

        {/* 2. Primary Deep Glass Fracture (Natural jagged line slicing through the card) */}
        <motion.path
          d="M 85 10 L 98 75 L 88 140 L 105 210 L 92 285 L 115 350 L 102 390"
          stroke="#34d399"
          strokeWidth={isLightRaysCreeping ? "6" : (isFullUniverse ? "4" : (crackStage === 2 ? "2.5" : "1.4"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* 3. Razor-Sharp Inner White Glass Core */}
        <motion.path
          d="M 85 10 L 98 75 L 88 140 L 105 210 L 92 285 L 115 350 L 102 390"
          stroke="#ffffff"
          strokeWidth={isLightRaysCreeping ? "2.5" : (isFullUniverse ? "1.8" : "0.9")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 4. Secondary Natural Branch Fractures (Stage 2 & 3) */}
        {crackStage >= 2 && (
          <>
            {/* Emerald glow for branches */}
            <motion.path
              d="M 98 75 L 135 110 L 165 125 M 88 140 L 55 170 L 25 185 M 105 210 L 145 240 L 180 250 M 92 285 L 60 320 L 35 340 M 115 350 L 145 375"
              stroke="#10b981"
              strokeWidth={isLightRaysCreeping ? "10" : (isFullUniverse ? "6" : "3")}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#fissureGlowFilter)"
              opacity={0.8}
            />

            {/* Sharp branch lines */}
            <motion.path
              d="M 98 75 L 135 110 L 165 125 M 88 140 L 55 170 L 25 185 M 105 210 L 145 240 L 180 250 M 92 285 L 60 320 L 35 340 M 115 350 L 145 375"
              stroke="#6ee7b7"
              strokeWidth={isLightRaysCreeping ? "3.5" : (isFullUniverse ? "2.2" : "1.2")}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            />

            {/* White highlights for branches */}
            <motion.path
              d="M 98 75 L 135 110 L 165 125 M 88 140 L 55 170 L 25 185 M 105 210 L 145 240 L 180 250 M 92 285 L 60 320 L 35 340 M 115 350 L 145 375"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.8"
            />
          </>
        )}

        {/* 5. Deep Wild Tertiary Fractures (Stage 3 Full Cosmic Breach) */}
        {isFullUniverse && (
          <motion.path
            d="M 135 110 L 145 70 M 55 170 L 40 210 M 145 240 L 160 215 M 60 320 L 75 355"
            stroke="#a7f3d0"
            strokeWidth={isLightRaysCreeping ? "2.5" : "1.2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          />
        )}
      </svg>
    </div>
  );
}

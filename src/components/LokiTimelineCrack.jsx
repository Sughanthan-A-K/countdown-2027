import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Hyper-Realistic Glass Fracture for Dec 16:
 * - Natural glass impact puncture & realistic radial fissures with micro-capillary spiderweb fractures.
 * - Glass refractive physical edge highlights (frosted glass edge reflection, specular glints).
 * - Subtle inner cosmic depth (only reveals deep cosmic glow through the actual gap width).
 * - Tap Stage 1: Fine sharp hairline glass crack spreading from central impact.
 * - Tap Stage 2: Spiderweb radial branches fracturing out from the core with frosted glass micro-cracks.
 * - Tap Stage 3: Deep fissure opening with realistic glass splinter shards and dimensional depth.
 * - Tap Stage 4: Intense volumetric sunlight / crepuscular beam shafts beaming through the jagged fracture apertures for 2s before shatter!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-visible rounded-3xl">
      {/* Subtle realistic card dimming behind broken glass (no flat black box) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isFullUniverse ? 0.75 : (crackStage === 2 ? 0.5 : 0.25) }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 bg-neutral-950/60 pointer-events-none rounded-3xl backdrop-brightness-75"
      />

      {/* Subtle deep cosmic emerald presence behind the fissure (revealed only as crack deepens) */}
      {crackStage >= 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isFullUniverse ? 0.65 : 0.35,
            scale: isFullUniverse ? 1.2 : 1
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute w-56 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.3) 0%, rgba(6,78,59,0.15) 50%, transparent 80%)',
            filter: 'blur(20px)'
          }}
        />
      )}

      {/* Stage 4: Light traveling through cracked broken glass gaps */}
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
                <stop offset="30%" stopColor="#a7f3d0" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#10b981" stopOpacity="0.4" />
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
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>

            {/* Core puncture bloom hole */}
            <motion.ellipse
              cx="102"
              cy="185"
              rx="20"
              ry="20"
              fill="url(#holeBloom)"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.5, 1.3, 1.1], opacity: [0, 1, 0.9] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              filter="url(#softGlowRay)"
            />

            {/* Crepuscular God Rays streaming out from crack apertures */}
            <motion.polygon
              points="102,185 138,155 360,-70 240,-110"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.6, delay: 0.05, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 115,190 410,130 390,250"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.7, delay: 0.15, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,245 310,510 190,550"
              fill="url(#rayGrad1)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,245 -110,530 -170,410"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.6, delay: 0.08, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 88,135 -190,90 -210,200"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.7, delay: 0.12, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 106,75 -70,-90 -170,-20"
              fill="url(#rayGrad2)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.8, delay: 0.02, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 98,25 35,-150 155,-150"
              fill="url(#rayGrad3)"
              filter="url(#softGlowRay)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 1.6, delay: 0.06, ease: "easeOut" }}
            />
          </svg>
        </div>
      )}

      {/* Realistic Physics Glass Fracture Vector (Jagged, sharp, fractured glass with micro-cracks) */}
      <svg 
        viewBox="0 0 200 400" 
        className="w-full h-full absolute inset-0 pointer-events-none z-20 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glass edge shadow filter simulating physical depth inside the glass pane */}
          <filter id="glassDepthShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0.6" dy="0.8" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* 1. Subtle Dark Crevice Depth (The physical shadow inside the fractured glass gap) */}
        <path
          d="M 98 15 L 101 42 L 95 78 L 106 115 L 94 150 L 102 185 L 92 225 L 104 268 L 96 312 L 103 355 L 97 388"
          stroke="#000000"
          strokeWidth={isLightRaysCreeping ? "3.2" : (isFullUniverse ? "2.4" : (crackStage === 2 ? "1.6" : "1.1"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.8}
        />

        {/* 2. Micro-Fracture Webbing (Realistic frosted capillary spiderweb glass cracks) */}
        {crackStage >= 2 && (
          <g opacity={isFullUniverse ? 0.95 : 0.7}>
            {/* Impact Center Spiderweb ring cracks */}
            <path
              d="M 92 175 L 102 170 L 112 176 L 114 188 L 104 196 L 94 192 Z"
              stroke="#e2e8f0"
              strokeWidth="0.65"
              fill="none"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <path
              d="M 82 165 L 102 158 L 122 168 L 126 195 L 105 208 L 84 200 Z"
              stroke="#e2e8f0"
              strokeWidth="0.5"
              strokeDasharray="4 1.5 2 1"
              fill="none"
              strokeLinejoin="round"
              opacity="0.65"
            />

            {/* Radiating Micro-Capillaries (Ultra-fine sharp crystalline glass lines) */}
            <path
              d="
                M 101 42 L 80 52 L 68 48 
                M 95 78 L 65 92 L 48 88 M 65 92 L 58 112 
                M 106 115 L 132 102 L 152 110 M 132 102 L 140 85 
                M 94 150 L 72 142 L 54 155 M 72 142 L 64 130 
                M 102 185 L 135 172 L 165 182 M 135 172 L 148 158 
                M 102 185 L 68 198 L 42 192 M 68 198 L 58 220 
                M 92 225 L 122 238 L 146 230 M 122 238 L 130 258 
                M 104 268 L 78 285 L 56 278 M 78 285 L 70 308 
                M 96 312 L 128 325 L 150 338 M 128 325 L 136 308 
                M 103 355 L 75 370 L 52 365
              "
              stroke="#cbd5e1"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glassDepthShadow)"
            />

            {/* Realistic Frosted Micro-Splinters (Small sharp shards hugging the cracks) */}
            <path
              d="
                M 98 120 L 92 128 L 97 132 Z
                M 104 165 L 110 172 L 105 176 Z
                M 90 205 L 85 212 L 91 216 Z
                M 103 245 L 109 252 L 102 256 Z
              "
              fill="rgba(255,255,255,0.4)"
              stroke="#f8fafc"
              strokeWidth="0.4"
            />
          </g>
        )}

        {/* 3. Deep Secondary Fissures (Stage 3 & 4) */}
        {isFullUniverse && (
          <path
            d="
              M 48 88 L 28 82 M 58 112 L 35 125 
              M 152 110 L 180 118 M 140 85 L 165 72 
              M 42 192 L 18 188 M 58 220 L 32 235 
              M 165 182 L 188 178 M 148 158 L 175 145 
              M 146 230 L 178 240 M 130 258 L 152 275 
              M 56 278 L 25 285 M 70 308 L 45 328
            "
            stroke="#94a3b8"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}

        {/* 4. Main Structural Glass Fracture (Natural jagged line with physical refraction) */}
        <motion.path
          d="M 98 15 L 101 42 L 95 78 L 106 115 L 94 150 L 102 185 L 92 225 L 104 268 L 96 312 L 103 355 L 97 388"
          stroke="#f8fafc"
          strokeWidth={isLightRaysCreeping ? "2.4" : (isFullUniverse ? "1.8" : (crackStage === 2 ? "1.2" : "0.9"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          filter="url(#glassDepthShadow)"
        />

        {/* 5. Pure Crystal Glass Specular Edge Highlight (Natural glass shimmer, NOT a thick neon bulb) */}
        <motion.path
          d="M 98 15 L 101 42 L 95 78 L 106 115 L 94 150 L 102 185 L 92 225 L 104 268 L 96 312 L 103 355 L 97 388"
          stroke="#ffffff"
          strokeWidth={isLightRaysCreeping ? "1.2" : (isFullUniverse ? "0.9" : "0.6")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.95}
        />

        {/* 6. Subtle Emerald Multiverse Energy bleeding ONLY strictly through the fracture seam */}
        <motion.path
          d="M 98 15 L 101 42 L 95 78 L 106 115 L 94 150 L 102 185 L 92 225 L 104 268 L 96 312 L 103 355 L 97 388"
          stroke="#34d399"
          strokeWidth={isLightRaysCreeping ? "2.8" : (isFullUniverse ? "2.0" : (crackStage === 2 ? "1.2" : "0.6"))}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={isLightRaysCreeping ? 0.9 : (isFullUniverse ? 0.75 : 0.45)}
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Specular Crystal Glints at sharp fissure vertices */}
        {[
          { cx: 101, cy: 42 },
          { cx: 95, cy: 78 },
          { cx: 106, cy: 115 },
          { cx: 94, cy: 150 },
          { cx: 102, cy: 185 },
          { cx: 92, cy: 225 },
          { cx: 104, cy: 268 },
          { cx: 96, cy: 312 },
          { cx: 103, cy: 355 }
        ].map((pt, idx) => (
          <circle
            key={`glint-${idx}`}
            cx={pt.cx}
            cy={pt.cy}
            r={isLightRaysCreeping ? "1.8" : "1.2"}
            fill="#ffffff"
            opacity={0.9}
          />
        ))}
      </svg>
    </div>
  );
}

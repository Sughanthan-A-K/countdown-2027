import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Progressive, Realistic Broken Glass Cracking:
 * 
 * RULES IMPLEMENTED:
 * 1. Persistent Fractures:
 *    - Tap 1 crack draws ONCE on Tap 1, then STAYS FULLY DRAWN forever. Does NOT re-animate/blink on Tap 2, 3, or 4!
 *    - Tap 2 crack draws ONCE on Tap 2, then STAYS FULLY DRAWN forever.
 *    - Tap 3 crack draws ONCE on Tap 3, then STAYS FULLY DRAWN forever.
 * 
 * 2. Gap Widening (Spine fracture gap mildly deepens & widens tap by tap):
 *    - Tap 1: Spine strokeWidth 1.2px, gap 0.5px.
 *    - Tap 2: Spine strokeWidth 2.2px, gap 1.5px with deep emerald light bleeding through.
 *    - Tap 3: Spine strokeWidth 3.8px, gap 3.0px with intense nebula light.
 *    - Tap 4: Spine strokeWidth 6.0px, gap 5.5px as glass splits right before shatter.
 * 
 * 3. Corner-to-Corner Reach (Not confined to center, extends all the way to card edges & corners!):
 *    - Coordinates stretch to x: 0..200 and y: 0..400.
 * 
 * 4. Ultra-Slow, Majestic Drawing Speeds:
 *    - Tap 2: ~2.8s slow natural jagged creep from spine outwards.
 *    - Tap 3: ~3.2s slow spiderwebbing reaching card corners.
 *    - Tap 4: ~4.0s slow deep splintering and emerald god rays before final shatter!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  // Gap width progression for the primary spine fracture
  const spineGap = crackStage === 1 ? 0.6 : (crackStage === 2 ? 1.8 : (crackStage === 3 ? 3.5 : 5.5));
  const spineStroke = crackStage === 1 ? 1.2 : (crackStage === 2 ? 2.0 : (crackStage === 3 ? 2.8 : 3.6));

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
      {/* Background Dimming as glass is damaged */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: crackStage >= 4 ? 0.9 : (crackStage === 3 ? 0.72 : (crackStage === 2 ? 0.48 : 0.22)) 
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-black/85 pointer-events-none rounded-3xl"
      />

      {/* Behind-the-glass portal emerald glow (bleeding through crack gaps) */}
      {crackStage >= 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: crackStage >= 4 ? 0.95 : (crackStage === 3 ? 0.82 : 0.48),
            scale: crackStage >= 4 ? 1.4 : (crackStage === 3 ? 1.2 : 1.0),
          }}
          transition={{ duration: 2.0, ease: "easeOut" }}
          className="absolute w-80 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(16,185,129,0.55) 0%, rgba(5,150,105,0.25) 50%, transparent 75%)',
            filter: 'blur(30px)'
          }}
        />
      )}

      {/* Stage 4: Crepuscular emerald god rays projecting out through the broken glass fractures */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              <radialGradient id="glassImpactBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#a7f3d0" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="glassRay1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="glassRay2" x1="50%" y1="50%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#a7f3d0" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="glassRay3" x1="50%" y1="50%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#6ee7b7" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <filter id="glassRayBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* Impact Center Point Bloom (develops gradually as crack widens) */}
            <motion.ellipse
              cx="102"
              cy="185"
              rx="24"
              ry="24"
              fill="url(#glassImpactBloom)"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.3, 1.6, 1.4], opacity: [0, 0.4, 1] }}
              transition={{ duration: 3.5, delay: 0.5, ease: "easeOut" }}
              filter="url(#glassRayBlur)"
            />

            {/* Crepuscular Rays radiating out through the crack fissures */}
            <motion.polygon
              points="102,185 145,150 380,-80 260,-120"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.95] }}
              transition={{ duration: 2.5, delay: 1.2, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 118,190 420,120 400,240"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.9] }}
              transition={{ duration: 2.4, delay: 1.5, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,250 320,520 200,560"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.95] }}
              transition={{ duration: 2.5, delay: 1.3, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,250 -120,540 -180,420"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0.85] }}
              transition={{ duration: 2.4, delay: 1.4, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 88,125 -200,80 -220,190"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.95] }}
              transition={{ duration: 2.5, delay: 1.2, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 106,75 -80,-100 -180,-30"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0.85] }}
              transition={{ duration: 2.4, delay: 1.5, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 98,15 40,-160 160,-160"
              fill="url(#glassRay3)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 1] }}
              transition={{ duration: 2.5, delay: 1.1, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 102,385 40,580 160,580"
              fill="url(#glassRay3)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.35, 0.95] }}
              transition={{ duration: 2.5, delay: 1.3, ease: "easeOut" }}
            />
          </svg>
        </div>
      )}

      {/* NATURAL BROKEN GLASS FRACTURE SVG */}
      <svg 
        viewBox="0 0 200 400" 
        className="w-full h-full absolute inset-0 pointer-events-none z-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glassRefract" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={crackStage >= 3 ? "1.6" : "0.9"} />
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* TAP 1: Primary Spine Fracture (Shoots down ~1.4s on 1st tap, STAYS CONSTANT!) */}
        {/* ============================================================ */}
        {/* Deep Emerald Light Bleeding Through Widening Spine Gap */}
        {crackStage >= 2 && (
          <motion.path
            d="M 98 0 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 400"
            stroke="#10b981"
            strokeWidth={spineGap * 2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glassRefract)"
            animate={{ strokeWidth: spineGap * 2.5, opacity: crackStage >= 3 ? 0.9 : 0.6 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* Shadow seam behind spine */}
        <motion.path
          d="M 98.5 0 L 104.5 65.5 L 108.5 78.5 L 92.5 122.5 L 102.5 185.5 L 85.5 248.5 L 106.5 312.5 L 96.5 350.5 L 102.5 400"
          stroke="rgba(0, 0, 0, 0.7)"
          strokeWidth={spineStroke + 0.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={crackStage === 1 ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Left Edge of the Spine Crack (Widens apart tap by tap) */}
        <motion.path
          d={`M ${98 - spineGap} 0 L ${104 - spineGap} 65 L ${108 - spineGap} 78 L ${92 - spineGap} 122 L ${102 - spineGap} 185 L ${85 - spineGap} 248 L ${106 - spineGap} 312 L ${96 - spineGap} 350 L ${102 - spineGap} 400`}
          stroke="#ffffff"
          strokeWidth={spineStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={crackStage === 1 ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Right Edge of the Spine Crack (Widens apart tap by tap) */}
        <motion.path
          d={`M ${98 + spineGap} 0 L ${104 + spineGap} 65 L ${108 + spineGap} 78 L ${92 + spineGap} 122 L ${102 + spineGap} 185 L ${85 + spineGap} 248 L ${106 + spineGap} 312 L ${96 + spineGap} 350 L ${102 + spineGap} 400`}
          stroke={crackStage >= 2 ? "rgba(167, 243, 208, 0.9)" : "rgba(255, 255, 255, 0.7)"}
          strokeWidth={Math.max(0.7, spineStroke * 0.7)}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={crackStage === 1 ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ============================================================ */}
        {/* TAP 2: Natural Secondary Branch Fractures (Creeps slowly outwards over ~2.8s, STAYS CONSTANT!) */}
        {/* ============================================================ */}
        {crackStage >= 2 && (
          <g key="crack-stage-2-persistent">
            {/* Emerald glow inside branch seams */}
            <motion.path
              d="M 108 78 L 76 100 L 45 108 L 15 112 M 92 122 L 64 146 L 35 158 L 8 165 M 102 185 L 142 152 L 175 136 L 195 128 M 85 248 L 126 274 L 165 288 L 192 296 M 106 312 L 72 336 L 40 348 L 12 355"
              stroke="#059669"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glassRefract)"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Natural crystalline branch fracture lines extending outwards towards the edges */}
            <motion.path
              d="M 108 78 L 76 100 L 45 108 L 15 112 M 92 122 L 64 146 L 35 158 L 8 165 M 102 185 L 142 152 L 175 136 L 195 128 M 85 248 L 126 274 L 165 288 L 192 296 M 106 312 L 72 336 L 40 348 L 12 355"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Branch double-refraction lines */}
            <motion.path
              d="M 109 79 L 77 101 L 46 109 L 16 113 M 93 123 L 65 147 L 36 159 M 103 186 L 143 153 L 176 137 M 86 249 L 127 275 L 166 289 M 107 313 L 73 337 L 41 349"
              stroke="rgba(52, 211, 153, 0.85)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 3: Spiderwebbing & Corner-Reaching Fissures (Spreads slowly over ~3.2s, STAYS CONSTANT!) */}
        {/* ============================================================ */}
        {crackStage >= 3 && (
          <g key="crack-stage-3-persistent">
            {/* Extended spiderweb fissures running all the way to corners (0..200, 0..400) */}
            <motion.path
              d="M 76 100 L 55 55 L 25 20 L 0 5 M 108 78 L 140 45 L 175 22 L 200 8 M 64 146 L 45 108 M 102 185 L 118 162 L 142 152 M 142 152 L 165 210 L 195 240 L 200 248 M 85 248 L 78 290 L 52 350 L 20 385 L 5 400 M 126 274 L 155 330 L 180 375 L 195 400 M 72 336 L 40 348"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.2, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Impact Center Starburst Lines radiating from (102, 185) */}
            <motion.path
              d="M 102 185 L 90 168 M 102 185 L 116 172 M 102 185 L 112 202 M 102 185 L 88 196 M 102 185 L 100 164 M 102 185 L 120 188"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.0, delay: 0.1, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Emerald refraction along the spiderweb fissures */}
            <motion.path
              d="M 76 100 L 55 55 M 108 78 L 140 45 M 102 185 L 118 162 M 142 152 L 165 210 M 85 248 L 78 290 M 126 274 L 155 330"
              stroke="rgba(52, 211, 153, 0.85)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.2, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 4: Full-Card Corner-to-Corner Glass Fracture Proliferation (Over 4.0s) */}
        {/* ============================================================ */}
        {crackStage >= 4 && (
          <g key="crack-stage-4-cascades">
            {/* Wave 1 (0.0s - 2.2s): Heavy Corner & Edge Fractures reaching top-left, top-right, bottom-left, bottom-right */}
            <motion.path
              d="M 25 20 L 5 60 L 0 90 M 175 22 L 195 55 L 200 95 M 0 160 L 15 175 L 35 158 M 200 160 L 185 175 L 175 136 M 5 280 L 25 270 L 45 305 M 200 280 L 180 270 L 165 288 M 5 400 L 40 375 L 72 336 M 195 400 L 160 375 L 126 274 M 55 55 L 92 122 M 140 45 L 118 162 M 78 290 L 102 185 M 155 330 L 106 312"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Wave 1 Emerald Seam Underglow */}
            <motion.path
              d="M 25 20 L 5 60 M 175 22 L 195 55 M 0 160 L 15 175 M 200 160 L 185 175 M 5 400 L 40 375 M 195 400 L 160 375 M 55 55 L 92 122 M 140 45 L 118 162"
              stroke="rgba(52, 211, 153, 0.9)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Wave 2 (1.8s - 3.6s): Deep Cross-Splintering into Dense Crystalline Shards */}
            <motion.path
              d="M 5 60 L 45 108 M 195 55 L 142 152 M 15 175 L 64 146 M 185 175 L 142 152 M 25 270 L 85 248 M 180 270 L 126 274 M 40 375 L 106 312 M 160 375 L 106 312 M 15 112 L 5 160 M 195 128 L 200 160 M 8 165 L 5 280 M 192 296 L 200 280"
              stroke="rgba(240, 253, 244, 0.95)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 1.8, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Glowing hot white-mint edges before final shatter at 4.0s */}
            <motion.path
              d="M 98 0 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 400 M 108 78 L 76 100 L 45 108 M 92 122 L 64 146 M 102 185 L 142 152 M 85 248 L 126 274 M 106 312 L 72 336"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.6, 1, 0.8] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}

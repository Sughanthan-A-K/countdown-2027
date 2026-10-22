import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Progressive, Realistic Broken Glass Cracking:
 * 
 * 1. Clean Single Lines:
 *    - Pure single crystalline fracture path with natural jagged geometry.
 *    - Pure emerald green light bleeds through the crack gaps.
 * 
 * 2. Gap Widening:
 *    - Tap 1: Single fine crack.
 *    - Tap 2: Center spine opens slightly, green light glows through.
 *    - Tap 3: Center spine opens wider, pure green aura radiates.
 *    - Tap 4: Center spine splits wide as deep cracks continuously multiply.
 * 
 * 3. Exact Neon Light Rays From Card Center (Tak Tak Nu Bursting Out):
 *    - Exact same intense neon beam styling is preserved.
 *    - Radial gradients centered exactly on the fracture origin (102, 185) so rays beam from card center OUTWARDS.
 *    - Reveals with snappy "tak tak" random bursts (rapid 0.25s entrance with snappy spring/easing) one by one!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  // Single clean fissure stroke & gap width
  const spineStroke = crackStage === 1 ? 1.4 : (crackStage === 2 ? 2.2 : (crackStage === 3 ? 3.4 : 5.0));
  const glowWidth = crackStage === 1 ? 0 : (crackStage === 2 ? 4 : (crackStage === 3 ? 8 : 14));

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-visible rounded-3xl">
      {/* Background Dimming as glass is damaged */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: crackStage >= 4 ? 0.35 : (crackStage === 3 ? 0.25 : (crackStage === 2 ? 0.15 : 0.08)) 
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black/50 pointer-events-none rounded-3xl"
      />

      {/* Behind-the-glass pure emerald ambient light */}
      {crackStage >= 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: crackStage >= 4 ? 0.95 : (crackStage === 3 ? 0.8 : 0.45),
            scale: crackStage >= 4 ? 1.35 : (crackStage === 3 ? 1.2 : 1.0),
          }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="absolute w-80 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(16,185,129,0.6) 0%, rgba(5,150,105,0.3) 50%, transparent 75%)',
            filter: 'blur(30px)'
          }}
        />
      )}

      {/* Stage 4: Exact Neon God Rays Beaming from Card Center Outwards in Snappy "Tak Tak" Random Bursts */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              {/* Central origin bloom where rays originate */}
              <radialGradient id="neonCenterBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="30%" stopColor="#6ee7b7" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#059669" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              {/* Radial gradient centered at (102, 185) so light is intense AT CARD CENTER and beams OUTWARD */}
              <radialGradient id="radialNeonRayOut" cx="102" cy="185" r="320" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              {/* Crisp neon glow filter */}
              <filter id="neonBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur1" />
                <feGaussianBlur stdDeviation="9" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Impact Center Point Bloom */}
            <motion.ellipse
              cx="102"
              cy="185"
              rx="24"
              ry="24"
              fill="url(#neonCenterBloom)"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.3, 2.0], opacity: [0.5, 1.0] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              filter="url(#neonBeamGlow)"
            />

            {/* Rays originating exactly at center (102, 185) and shooting OUTWARD to the screen bounds */}
            {/* Ray 1: Snaps out at 0.08s */}
            <motion.polygon
              points="102,185 130,165 720,-240 540,-290"
              fill="url(#radialNeonRayOut)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.08, ease: [0.18, 0.89, 0.32, 1.28] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Ray 2: Snaps out at 0.22s */}
            <motion.polygon
              points="102,185 98,40 -60,-360 260,-360"
              fill="url(#radialNeonRayOut)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.22, ease: [0.18, 0.89, 0.32, 1.28] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Ray 3: Snaps out at 0.42s */}
            <motion.polygon
              points="102,185 85,115 -420,-260 -500,-100"
              fill="url(#radialNeonRayOut)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.42, ease: [0.18, 0.89, 0.32, 1.28] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Ray 4: Snaps out at 0.58s */}
            <motion.polygon
              points="102,185 88,145 -520,60 -540,280"
              fill="url(#radialNeonRayOut)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.58, ease: [0.18, 0.89, 0.32, 1.28] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Ray 5: Snaps out at 0.78s */}
            <motion.polygon
              points="102,185 118,190 820,120 780,360"
              fill="url(#radialNeonRayOut)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.78, ease: [0.18, 0.89, 0.32, 1.28] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Ray 6: Snaps out at 0.95s */}
            <motion.polygon
              points="102,185 85,230 -420,840 -480,620"
              fill="url(#radialNeonRayOut)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.95, ease: [0.18, 0.89, 0.32, 1.28] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Ray 7: Snaps out at 1.15s */}
            <motion.polygon
              points="102,185 115,235 620,820 400,880"
              fill="url(#radialNeonRayOut)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 1.15, ease: [0.18, 0.89, 0.32, 1.28] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Ray 8: Snaps out at 1.35s */}
            <motion.polygon
              points="102,185 102,320 -60,880 260,880"
              fill="url(#radialNeonRayOut)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 1.35, ease: [0.18, 0.89, 0.32, 1.28] }}
              style={{ transformOrigin: "102px 185px" }}
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
          <filter id="pureGreenGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={crackStage >= 3 ? "2.2" : "1.2"} />
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* TAP 1: Clean SINGLE LINE Spine Fracture (Shoots down ~1.4s on 1st tap, STAYS CONSTANT!) */}
        {/* ============================================================ */}
        {/* Pure Emerald Light Bleeding Through Widening Spine Gap */}
        {crackStage >= 2 && (
          <motion.path
            d="M 98 0 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 400"
            stroke="#10b981"
            strokeWidth={glowWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#pureGreenGlow)"
            animate={{ 
              strokeWidth: crackStage >= 4 ? [glowWidth, glowWidth * 1.5] : glowWidth,
              opacity: crackStage >= 4 ? [0.7, 1.0] : 0.75 
            }}
            transition={{ duration: 2.0 }}
          />
        )}

        {/* Single crisp crystalline fracture line (No double line!) */}
        <motion.path
          d="M 98 0 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 400"
          stroke={crackStage >= 2 ? "#d1fae5" : "#ffffff"}
          strokeWidth={spineStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={crackStage === 1 ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ============================================================ */}
        {/* TAP 2: Clean SINGLE LINE Branch Fractures (Creeps slowly over ~2.8s, STAYS CONSTANT!) */}
        {/* ============================================================ */}
        {crackStage >= 2 && (
          <g key="crack-stage-2-persistent">
            {/* Emerald glow inside branch seams */}
            <motion.path
              d="M 108 78 L 76 100 L 45 108 L 15 112 M 92 122 L 64 146 L 35 158 L 8 165 M 102 185 L 142 152 L 175 136 L 195 128 M 85 248 L 126 274 L 165 288 L 192 296 M 106 312 L 72 336 L 40 348 L 12 355"
              stroke="#059669"
              strokeWidth={crackStage >= 3 ? "3.2" : "2.2"}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Single clean crystalline branch lines */}
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
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 3: Clean Spiderwebbing to Corners (Spreads over ~3.2s, STAYS CONSTANT!) */}
        {/* ============================================================ */}
        {crackStage >= 3 && (
          <g key="crack-stage-3-persistent">
            {/* Pure emerald seam glow */}
            <motion.path
              d="M 76 100 L 55 55 L 25 20 L 0 5 M 108 78 L 140 45 L 175 22 L 200 8 M 64 146 L 45 108 M 102 185 L 118 162 L 142 152 M 142 152 L 165 210 L 195 240 L 200 248 M 85 248 L 78 290 L 52 350 L 20 385 L 5 400 M 126 274 L 155 330 L 180 375 L 195 400 M 72 336 L 40 348"
              stroke="#059669"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.2, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Single clean spiderweb lines reaching corners */}
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
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.0, delay: 0.1, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 4: Continuous Cracks Spreading Rapidly While Rays Escalate Brightness (Exactly 2.0s) */}
        {/* ============================================================ */}
        {crackStage >= 4 && (
          <g key="crack-stage-4-cascades">
            {/* Wave 1 (0.0s - 1.0s): Secondary radial cracks continuously spreading */}
            <motion.path
              d="M 25 20 L 5 60 L 0 90 M 175 22 L 195 55 L 200 95 M 0 160 L 15 175 L 35 158 M 200 160 L 185 175 L 175 136 M 5 280 L 25 270 L 45 305 M 200 280 L 180 270 L 165 288 M 5 400 L 40 375 L 72 336 M 195 400 L 160 375 L 126 274 M 55 55 L 92 122 M 140 45 L 118 162 M 78 290 L 102 185 M 155 330 L 106 312"
              stroke="#34d399"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M 25 20 L 5 60 L 0 90 M 175 22 L 195 55 L 200 95 M 0 160 L 15 175 L 35 158 M 200 160 L 185 175 L 175 136 M 5 280 L 25 270 L 45 305 M 200 280 L 180 270 L 165 288 M 5 400 L 40 375 L 72 336 M 195 400 L 160 375 L 126 274 M 55 55 L 92 122 M 140 45 L 118 162 M 78 290 L 102 185 M 155 330 L 106 312"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Wave 2 (0.8s - 1.8s): Micro-fissures continuously cracking through all shards */}
            <motion.path
              d="M 5 60 L 45 108 M 195 55 L 142 152 M 15 175 L 64 146 M 185 175 L 142 152 M 25 270 L 85 248 M 180 270 L 126 274 M 40 375 L 106 312 M 160 375 L 106 312 M 15 112 L 5 160 M 195 128 L 200 160 M 8 165 L 5 280 M 192 296 L 200 280"
              stroke="#34d399"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M 5 60 L 45 108 M 195 55 L 142 152 M 15 175 L 64 146 M 185 175 L 142 152 M 25 270 L 85 248 M 180 270 L 126 274 M 40 375 L 106 312 M 160 375 L 106 312 M 15 112 L 5 160 M 195 128 L 200 160 M 8 165 L 5 280 M 192 296 L 200 280"
              stroke="#ffffff"
              strokeWidth="0.95"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}

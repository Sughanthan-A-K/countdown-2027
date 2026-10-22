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
 * 3. Intense Neon God Rays (Strong Piercing Laser Beams):
 *    - Not a faint wash, but strong piercing neon emerald laser shafts with white-hot cores.
 *    - Sequenced organically to reveal one by one as the cracks shoot open across the card!
 *    - Over 2.0s, each ray blasts outward piercing far across the full screen in 3D,
 *      then triggers the majestic glass shatter!
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

      {/* Stage 4: Strong, Piercing Neon Emerald God Rays Revealing One by One as Cracks Spread */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              {/* Intense neon core bloom at fracture origin */}
              <radialGradient id="neonImpactBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#059669" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              {/* Strong Neon Ray Gradients: White-hot luminous core transitioning to electric emerald */}
              <linearGradient id="strongNeonRay1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="15%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="strongNeonRay2" x1="50%" y1="50%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="15%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="strongNeonRay3" x1="50%" y1="50%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="15%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Tighter blur for crisp, piercing neon beams */}
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
              rx="22"
              ry="22"
              fill="url(#neonImpactBloom)"
              initial={{ scale: 0.2, opacity: 0.3 }}
              animate={{ scale: [0.3, 2.2], opacity: [0.3, 1.0] }}
              transition={{ duration: 2.0, ease: "easeIn" }}
              filter="url(#neonBeamGlow)"
            />

            {/* Ray 1: Top-Right fissure shaft (reveals at 0.1s as top right crack shoots) */}
            <motion.polygon
              points="102,185 145,150 780,-280 560,-320"
              fill="url(#strongNeonRay1)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1.0], scale: [0.3, 1.0] }}
              transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Ray 2: Top vertical fissure shaft (reveals at 0.2s as spine opens) */}
            <motion.polygon
              points="102,185 98,15 -60,-360 260,-360"
              fill="url(#strongNeonRay3)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1.0], scale: [0.3, 1.0] }}
              transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Ray 3: Top-Left branch shaft (reveals at 0.35s as top-left crack branches) */}
            <motion.polygon
              points="102,185 106,75 -380,-300 -480,-130"
              fill="url(#strongNeonRay2)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1.0], scale: [0.3, 1.0] }}
              transition={{ duration: 1.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Ray 4: Left horizontal fissure shaft (reveals at 0.5s as left cracks expand) */}
            <motion.polygon
              points="102,185 88,125 -500,80 -520,320"
              fill="url(#strongNeonRay2)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1.0], scale: [0.3, 1.0] }}
              transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Ray 5: Right horizontal fissure shaft (reveals at 0.65s as right cracks branch) */}
            <motion.polygon
              points="102,185 118,190 820,120 780,360"
              fill="url(#strongNeonRay1)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1.0], scale: [0.3, 1.0] }}
              transition={{ duration: 1.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Ray 6: Bottom-Left fissure shaft (reveals at 0.8s as lower cracks spread) */}
            <motion.polygon
              points="102,185 85,250 -420,840 -480,620"
              fill="url(#strongNeonRay2)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1.0], scale: [0.3, 1.0] }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Ray 7: Bottom-Right fissure shaft (reveals at 0.95s as bottom-right cracks connect) */}
            <motion.polygon
              points="102,185 85,250 620,820 400,880"
              fill="url(#strongNeonRay1)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1.0], scale: [0.3, 1.0] }}
              transition={{ duration: 1.3, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Ray 8: Downward spine fissure shaft (reveals at 1.1s as card fully splits) */}
            <motion.polygon
              points="102,185 102,385 -60,880 260,880"
              fill="url(#strongNeonRay3)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1.0], scale: [0.3, 1.0] }}
              transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
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

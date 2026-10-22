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
 * 3. Exact Neon God Rays - Blasting from Card Center outwards with snap ("Tak Tak") reveals:
 *    - Light rays emanate directly from center crack point (102, 185) shooting outwards across the viewport.
 *    - Linear gradients flow strictly from Center (x1="102", y1="185", 100% white-emerald) -> Outer (0% transparent).
 *    - Fast, punchy snap reveals ("Tak Tak") with random stagger intervals:
 *      (0.08s -> 0.28s -> 0.44s -> 0.65s -> 0.82s -> 1.05s -> 1.25s -> 1.42s).
 *    - At 2.0s, final glass shatter triggers!
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

      {/* Stage 4: Strong Neon Emerald God Rays Blasting From Center Outward with "Tak Tak" Random Snaps */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              {/* Intense neon core bloom at fracture origin (102, 185) */}
              <radialGradient id="neonImpactBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#10b981" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#059669" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              {/* Exact Linear Gradients: Originating bright at center (102, 185) -> Fading outward */}
              {/* Ray 1: Toward Top-Right (780, -280) */}
              <linearGradient id="rayFromCenter1" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="670" y2="-250">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Ray 2: Toward Top-Vertical (100, -360) */}
              <linearGradient id="rayFromCenter2" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="100" y2="-360">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Ray 3: Toward Top-Left (-430, -210) */}
              <linearGradient id="rayFromCenter3" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="-430" y2="-210">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Ray 4: Toward Left (-510, 200) */}
              <linearGradient id="rayFromCenter4" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="-510" y2="200">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Ray 5: Toward Right (800, 240) */}
              <linearGradient id="rayFromCenter5" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="800" y2="240">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Ray 6: Toward Bottom-Left (-450, 730) */}
              <linearGradient id="rayFromCenter6" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="-450" y2="730">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Ray 7: Toward Bottom-Right (510, 850) */}
              <linearGradient id="rayFromCenter7" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="510" y2="850">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Ray 8: Toward Bottom-Vertical (100, 880) */}
              <linearGradient id="rayFromCenter8" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="100" y2="880">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Crisp neon glow filter */}
              <filter id="neonBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur1" />
                <feGaussianBlur stdDeviation="8" result="blur2" />
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
              fill="url(#neonImpactBloom)"
              initial={{ scale: 0.2, opacity: 0.2 }}
              animate={{ scale: [0.3, 2.2], opacity: [0.3, 1.0] }}
              transition={{ duration: 2.0, ease: "easeIn" }}
              filter="url(#neonBeamGlow)"
            />

            {/* Fast, Punchy Snap Reveals ("Tak Tak") from Center Outwards with Random Delays */}

            {/* Snap 1: Top-Right ray blasts out at 0.08s */}
            <motion.polygon
              points="102,185 135,160 780,-280 560,-320"
              fill="url(#rayFromCenter1)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.08, ease: [0.18, 0.89, 0.32, 1.25] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Snap 2: Top-Vertical ray blasts out at 0.28s */}
            <motion.polygon
              points="102,185 106,60 260,-360 -60,-360"
              fill="url(#rayFromCenter2)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.28, ease: [0.18, 0.89, 0.32, 1.25] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Snap 3: Left ray blasts out at 0.44s */}
            <motion.polygon
              points="102,185 80,140 -500,80 -520,320"
              fill="url(#rayFromCenter4)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, delay: 0.44, ease: [0.18, 0.89, 0.32, 1.25] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Snap 4: Top-Left ray blasts out at 0.65s */}
            <motion.polygon
              points="102,185 92,110 -380,-300 -480,-130"
              fill="url(#rayFromCenter3)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.65, ease: [0.18, 0.89, 0.32, 1.25] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Snap 5: Right ray blasts out at 0.82s */}
            <motion.polygon
              points="102,185 125,200 820,120 780,360"
              fill="url(#rayFromCenter5)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.82, ease: [0.18, 0.89, 0.32, 1.25] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Snap 6: Bottom-Left ray blasts out at 1.05s */}
            <motion.polygon
              points="102,185 85,240 -420,840 -480,620"
              fill="url(#rayFromCenter6)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 1.05, ease: [0.18, 0.89, 0.32, 1.25] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Snap 7: Bottom-Right ray blasts out at 1.25s */}
            <motion.polygon
              points="102,185 120,240 620,820 400,880"
              fill="url(#rayFromCenter7)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, delay: 1.25, ease: [0.18, 0.89, 0.32, 1.25] }}
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Snap 8: Bottom-Vertical spine ray blasts out at 1.42s */}
            <motion.polygon
              points="102,185 102,300 260,880 -60,880"
              fill="url(#rayFromCenter8)"
              filter="url(#neonBeamGlow)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 1.42, ease: [0.18, 0.89, 0.32, 1.25] }}
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

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
 * 3. Exact 4th Tap 3-Wave Sequence Requested by User:
 *    - Wave 1 (0.0s): First set of new cracks shoots outward across the card.
 *    - Wave 2 (after 0.5s): Second set of additional creeping cracks shoots and fractures deeper.
 *    - Wave 3 (after 0.5s = 1.0s): MASSIVE catastrophic primary crack fissure (periya crack) tears through the card!
 *    - Shatter (after 0.5s = 1.5s): Whole card violently shatters into flying glass shards into the portal!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;

  // Single clean fissure stroke & gap width
  const spineStroke = crackStage === 1 ? 1.4 : (crackStage === 2 ? 2.2 : (crackStage === 3 ? 3.4 : 5.2));
  const glowWidth = crackStage === 1 ? 0 : (crackStage === 2 ? 4 : (crackStage === 3 ? 8 : 16));

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-visible rounded-3xl">
      {/* Background Dimming as glass is damaged */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: crackStage >= 4 ? 0.38 : (crackStage === 3 ? 0.25 : (crackStage === 2 ? 0.15 : 0.08)) 
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
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-80 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(16,185,129,0.6) 0%, rgba(5,150,105,0.3) 50%, transparent 75%)',
            filter: 'blur(30px)'
          }}
        />
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
              strokeWidth: crackStage >= 4 ? [glowWidth, glowWidth * 1.6] : glowWidth,
              opacity: crackStage >= 4 ? [0.75, 1.0] : 0.75 
            }}
            transition={{ duration: 1.5 }}
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
        {/* TAP 4: Exact Sequence: Wave 1 (0.0s) -> Wave 2 (0.5s) -> Massive Periya Crack (1.0s) -> Shatter (1.5s) */}
        {/* ============================================================ */}
        {crackStage >= 4 && (
          <g key="crack-stage-4-cascades">
            {/* --- 1. First Wave Cracks (Starts instantly at 0.0s) --- */}
            <motion.path
              d="M 25 20 L 5 60 L 0 90 M 175 22 L 195 55 L 200 95 M 0 160 L 15 175 L 35 158 M 200 160 L 185 175 L 175 136 M 5 280 L 25 270 L 45 305 M 200 280 L 180 270 L 165 288 M 5 400 L 40 375 L 72 336 M 195 400 L 160 375 L 126 274"
              stroke="#34d399"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
            <motion.path
              d="M 25 20 L 5 60 L 0 90 M 175 22 L 195 55 L 200 95 M 0 160 L 15 175 L 35 158 M 200 160 L 185 175 L 175 136 M 5 280 L 25 270 L 45 305 M 200 280 L 180 270 L 165 288 M 5 400 L 40 375 L 72 336 M 195 400 L 160 375 L 126 274"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />

            {/* --- 2. Second Wave Cracks (Starts after 0.5s) --- */}
            <motion.path
              d="M 5 60 L 45 108 M 195 55 L 142 152 M 15 175 L 64 146 M 185 175 L 142 152 M 25 270 L 85 248 M 180 270 L 126 274 M 40 375 L 106 312 M 160 375 L 106 312 M 15 112 L 5 160 M 195 128 L 200 160 M 8 165 L 5 280 M 192 296 L 200 280 M 55 55 L 92 122 M 140 45 L 118 162 M 78 290 L 102 185 M 155 330 L 106 312"
              stroke="#34d399"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
            />
            <motion.path
              d="M 5 60 L 45 108 M 195 55 L 142 152 M 15 175 L 64 146 M 185 175 L 142 152 M 25 270 L 85 248 M 180 270 L 126 274 M 40 375 L 106 312 M 160 375 L 106 312 M 15 112 L 5 160 M 195 128 L 200 160 M 8 165 L 5 280 M 192 296 L 200 280 M 55 55 L 92 122 M 140 45 L 118 162 M 78 290 L 102 185 M 155 330 L 106 312"
              stroke="#ffffff"
              strokeWidth="1.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
            />

            {/* --- 3. Third Wave: MASSIVE PERIYA CRACK (Starts after 0.5s = 1.0s) --- */}
            {/* Heavy glowing green under-fracture for the massive crack */}
            <motion.path
              d="M 10 30 L 58 75 L 42 140 L 102 185 L 165 230 L 140 310 L 190 380 M 195 20 L 145 80 L 102 185 L 60 260 L 15 370"
              stroke="#10b981"
              strokeWidth="7.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 1.0, ease: [0.12, 1, 0.28, 1] }}
            />
            {/* White-hot jagged giant fracture tearing right across the card diagonal */}
            <motion.path
              d="M 10 30 L 58 75 L 42 140 L 102 185 L 165 230 L 140 310 L 190 380 M 195 20 L 145 80 L 102 185 L 60 260 L 15 370"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 1.0, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}

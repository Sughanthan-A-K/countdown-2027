import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Progressive, Realistic Broken Glass Cracking:
 * - Dynamic key={crackStage} ensures Framer Motion executes the full slow drawing animation
 *   freshly on EVERY tap without snapping or skipping!
 * 
 * - Tap 1: Single vertical glass fracture slowly crawling down (duration: 1.8s).
 * - Tap 2: Multiple branch fractures creeping slowly outward from the center (duration: 2.2s).
 * - Tap 3: Extensive spiderweb fissures slowly interconnecting across the card (duration: 2.5s).
 * - Tap 4: HEAVILY SHATTERED GLASS COVERAGE! Hundreds of dense micro-fractures slowly multiplying
 *   and crawling across the entire card (duration: 3.0s).
 * - 3D God Rays: Emerge from the crack center (scale 0 -> 1) and shoot OUTWARD towards the viewer and edges!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  return (
    <div key={`loki-crack-stage-${crackStage}`} className="absolute inset-0 pointer-events-none">
      {/* ============================================================ */}
      {/* 3D PROJECTED GOD RAYS (SHOOTING OUTWARD FROM GLASS HOLE TOWARDS THE SCREEN) */}
      {/* ============================================================ */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible flex items-center justify-center">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              {/* Radial gradient: Pure hot white-mint at crack hole (cx, cy) = (102, 185), fading outwards */}
              <radialGradient id="outwardBurst" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="20%" stopColor="#a7f3d0" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              {/* Linear gradients pointing strictly from inside crack (0%) towards screen outer edges (100%) */}
              <linearGradient id="rayOutward1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="15%" stopColor="#a7f3d0" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayOutward2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="15%" stopColor="#6ee7b7" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayOutwardUp" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="15%" stopColor="#a7f3d0" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="rayOutwardDown" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="15%" stopColor="#a7f3d0" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <filter id="godRaySoftBlur" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>

            {/* Central Crack Light Bloom (Expanding outward from 0) */}
            <motion.ellipse
              cx="102"
              cy="185"
              rx="35"
              ry="35"
              fill="url(#outwardBurst)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 1.6], opacity: [0, 1, 0.95] }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              filter="url(#godRaySoftBlur)"
              style={{ transformOrigin: "102px 185px" }}
            />

            {/* Beams shooting OUTWARD from crack (102, 185) towards outside */}
            {/* 1. Outward Top-Right */}
            <motion.polygon
              points="102,185 135,160 650,-350 420,-420"
              fill="url(#rayOutward1)"
              filter="url(#godRaySoftBlur)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 2.2, delay: 0.05, ease: "easeOut" }}
              style={{ transformOrigin: "102px 185px" }}
            />
            {/* 2. Outward Right */}
            <motion.polygon
              points="102,185 115,195 720,100 690,300"
              fill="url(#rayOutward1)"
              filter="url(#godRaySoftBlur)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 2.3, delay: 0.12, ease: "easeOut" }}
              style={{ transformOrigin: "102px 185px" }}
            />
            {/* 3. Outward Bottom-Right */}
            <motion.polygon
              points="102,185 90,230 620,820 400,890"
              fill="url(#rayOutward1)"
              filter="url(#godRaySoftBlur)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 2.4, delay: 0.08, ease: "easeOut" }}
              style={{ transformOrigin: "102px 185px" }}
            />
            {/* 4. Outward Bottom-Left */}
            <motion.polygon
              points="102,185 90,230 -420,850 -520,680"
              fill="url(#rayOutward2)"
              filter="url(#godRaySoftBlur)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 2.2, delay: 0.1, ease: "easeOut" }}
              style={{ transformOrigin: "102px 185px" }}
            />
            {/* 5. Outward Left */}
            <motion.polygon
              points="102,185 90,130 -520,70 -540,250"
              fill="url(#rayOutward2)"
              filter="url(#godRaySoftBlur)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 2.3, delay: 0.14, ease: "easeOut" }}
              style={{ transformOrigin: "102px 185px" }}
            />
            {/* 6. Outward Top-Left */}
            <motion.polygon
              points="102,185 106,85 -320,-280 -480,-160"
              fill="url(#rayOutward2)"
              filter="url(#godRaySoftBlur)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 2.4, delay: 0.03, ease: "easeOut" }}
              style={{ transformOrigin: "102px 185px" }}
            />
            {/* 7. Outward Direct Up */}
            <motion.polygon
              points="102,185 98,20 -80,-420 280,-420"
              fill="url(#rayOutwardUp)"
              filter="url(#godRaySoftBlur)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 1, 0.85] }}
              transition={{ duration: 2.2, delay: 0.06, ease: "easeOut" }}
              style={{ transformOrigin: "102px 185px" }}
            />
            {/* 8. Outward Direct Down */}
            <motion.polygon
              points="102,185 102,380 -80,920 280,920"
              fill="url(#rayOutwardDown)"
              filter="url(#godRaySoftBlur)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 2.3, delay: 0.15, ease: "easeOut" }}
              style={{ transformOrigin: "102px 185px" }}
            />
          </svg>
        </div>
      )}

      {/* ============================================================ */}
      {/* CARD BODY WITH FRACTURES (NATURAL GLASS CRACK NETWORK) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
        {/* Background Dimming as glass is damaged */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: crackStage >= 4 ? 0.88 : (crackStage === 3 ? 0.7 : (crackStage === 2 ? 0.45 : 0.2)) 
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-black/80 pointer-events-none rounded-3xl"
        />

        {/* Behind-the-glass portal emerald glow (bleeding through crack gaps) */}
        {crackStage >= 2 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: crackStage >= 4 ? 0.95 : (crackStage === 3 ? 0.8 : 0.45),
              scale: crackStage >= 4 ? 1.35 : (crackStage === 3 ? 1.2 : 1.0),
            }}
            transition={{ 
              duration: 2.0,
              ease: "easeOut"
            }}
            className="absolute w-80 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 45%, rgba(16,185,129,0.55) 0%, rgba(5,150,105,0.25) 50%, transparent 75%)',
              filter: 'blur(30px)'
            }}
          />
        )}

        {/* NATURAL BROKEN GLASS FRACTURE SVG */}
        <svg 
          viewBox="0 0 200 400" 
          className="w-full h-full absolute inset-0 pointer-events-none z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glassRefract" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={crackStage >= 3 ? "1.6" : "0.9"} />
            </filter>
          </defs>

          {/* ============================================================ */}
          {/* TAP 1: Clean Primary Spine Fracture (Slow drawing ~1.8s) */}
          {/* ============================================================ */}
          {/* Shadow seam behind spine */}
          <motion.path
            d="M 98.5 15.5 L 104.5 65.5 L 108.5 78.5 L 92.5 122.5 L 102.5 185.5 L 85.5 248.5 L 106.5 312.5 L 96.5 350.5 L 102.5 385.5"
            stroke="rgba(0, 0, 0, 0.65)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Main Glass Hairline Spine */}
          <motion.path
            d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385"
            stroke={crackStage >= 2 ? "#e6fffa" : "#ffffff"}
            strokeWidth={crackStage >= 3 ? "1.6" : "1.2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Double-edge refraction line */}
          <motion.path
            d="M 99.5 15 L 105.5 65 L 109.5 78 L 93.5 122 L 103.5 185 L 86.5 248 L 107.5 312 L 97.5 350 L 103.5 385"
            stroke={crackStage >= 2 ? "rgba(110, 231, 183, 0.8)" : "rgba(255, 255, 255, 0.55)"}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ============================================================ */}
          {/* TAP 2: Natural Secondary Branch Fractures (Slow drawing ~2.2s) */}
          {/* ============================================================ */}
          {crackStage >= 2 && (
            <g>
              {/* Emerald glow inside branch seams */}
              <motion.path
                d="M 108 78 L 76 100 L 52 108 M 92 122 L 64 146 L 46 158 M 102 185 L 142 152 L 168 138 M 85 248 L 124 272 L 152 284 M 106 312 L 72 336 L 48 346"
                stroke="#059669"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#glassRefract)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Natural crystalline branch fracture lines */}
              <motion.path
                d="M 108 78 L 76 100 L 52 108 M 92 122 L 64 146 L 46 158 M 102 185 L 142 152 L 168 138 M 85 248 L 124 272 L 152 284 M 106 312 L 72 336 L 48 346"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Branch double-refraction lines */}
              <motion.path
                d="M 109 79 L 77 101 L 53 109 M 93 123 L 65 147 M 103 186 L 143 153 M 86 249 L 125 273 M 107 313 L 73 337"
                stroke="rgba(52, 211, 153, 0.85)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </g>
          )}

          {/* ============================================================ */}
          {/* TAP 3: Extensive Spiderwebbing & Shard Polygonal Fractures (Slow drawing ~2.5s) */}
          {/* ============================================================ */}
          {crackStage >= 3 && (
            <g>
              {/* Interconnecting spiderweb polygon fissures across shards */}
              <motion.path
                d="M 76 100 L 64 146 M 64 146 L 88 180 M 102 185 L 118 162 L 142 152 M 142 152 L 152 210 L 124 272 M 85 248 L 82 284 L 106 312 M 76 100 L 96 84 M 124 272 L 108 302 M 72 336 L 90 360"
                stroke="#ffffff"
                strokeWidth="1.0"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Impact Center Starburst Lines radiating from (102, 185) */}
              <motion.path
                d="M 102 185 L 92 170 M 102 185 L 114 174 M 102 185 L 110 200 M 102 185 L 90 194 M 102 185 L 100 166 M 102 185 L 118 188"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Emerald refraction along the spiderweb fissures */}
              <motion.path
                d="M 76 100 L 64 146 M 102 185 L 118 162 M 142 152 L 152 210 M 85 248 L 82 284"
                stroke="rgba(52, 211, 153, 0.85)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </g>
          )}

          {/* ============================================================ */}
          {/* TAP 4: MASSIVE DENSE GLASS SHATTER BREAKDOWN (DENSE CRACK COVERAGE ~3.0s) */}
          {/* ============================================================ */}
          {crackStage >= 4 && (
            <g>
              {/* Tier 1: Dense secondary fissures across every single zone */}
              <motion.path
                d="M 52 108 L 26 114 M 46 158 L 18 165 M 168 138 L 192 128 M 152 284 L 188 296 M 48 346 L 20 354 M 98 15 L 62 42 M 104 65 L 140 45 M 92 122 L 130 110 M 88 180 L 58 215 M 110 200 L 148 230 M 85 248 L 48 262 M 106 312 L 144 338 M 96 350 L 58 376 M 102 385 L 140 375"
                stroke="#ffffff"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Tier 2: Micro stress craze lines spreading throughout each shard block */}
              <motion.path
                d="M 62 42 L 52 108 M 140 45 L 142 152 M 58 215 L 82 284 M 148 230 L 124 272 M 48 262 L 48 346 M 144 338 L 102 385 M 26 114 L 46 158 M 192 128 L 168 200 M 168 200 L 188 296 M 18 165 L 48 262 M 58 376 L 96 350 M 130 110 L 118 162 M 76 100 L 104 65 M 124 272 L 144 338 M 108 78 L 130 110"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1.0"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Tier 3: High-density spiderweb micro-fissures (Screen crawling with cracks) */}
              <motion.path
                d="M 62 42 L 80 25 M 140 45 L 165 25 M 26 114 L 15 85 M 192 128 L 185 85 M 18 165 L 10 215 M 188 296 L 195 240 M 48 346 L 15 315 M 144 338 L 190 355 M 58 376 L 30 390 M 140 375 L 170 390"
                stroke="rgba(167, 243, 208, 0.9)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Glowing hot white-mint edges before final shatter */}
              <motion.path
                d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385 M 108 78 L 76 100 L 52 108 M 92 122 L 64 146 M 102 185 L 142 152 M 85 248 L 124 272 M 106 312 L 72 336"
                stroke="#ffffff"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

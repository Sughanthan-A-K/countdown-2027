import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Non-Overlapping Spatial Glass Fracture System:
 * 
 * RULE: "Engha crack aaghalayo, engha space iruko angha thaan crack varanum... Crack melaye crack vara koodathu!"
 * 
 * - Zone Division (Zero Overlap):
 *   - Tap 1 (Zone 1 - Spine): Center vertical fracture from top to bottom (x ≈ 90..110).
 *   - Tap 2 (Zone 2 - Left Mid & Right Mid): Secondary branches stretching only into mid-left (x: 10..75, y: 80..160) and mid-right (x: 130..195, y: 130..200).
 *   - Tap 3 (Zone 3 - Top & Bottom Corners): Spreads into previously untouched quadrants: Top-Left (x: 0..50, y: 0..80), Top-Right (x: 150..200, y: 0..80), Bottom-Left (x: 0..70, y: 280..400), Bottom-Right (x: 130..200, y: 280..400).
 *   - Tap 4 (Zone 4 - Pure Empty Voids in 3 Distinct Timed Waves):
 *     - Wave 1 (0.0s): Cracks the remaining empty middle spaces (x: 50..85, y: 200..260) and (x: 115..150, y: 80..130).
 *     - Wave 2 (0.5s): Cracks the remaining empty perimeter patches (left outer edge y: 180..270) and (right outer edge y: 210..270).
 *     - Wave 3 (1.0s): Massive final fracture cuts across the untouched empty regions directly to card edges!
 *     - Shatter (1.5s): Card completely explodes into slow-mo shards!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  // Single clean fissure stroke & gap width
  const spineStroke = crackStage === 1 ? 1.4 : (crackStage === 2 ? 2.0 : (crackStage === 3 ? 2.8 : 4.0));
  const glowWidth = crackStage === 1 ? 0 : (crackStage === 2 ? 3 : (crackStage === 3 ? 6 : 10));

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
            <feGaussianBlur stdDeviation={crackStage >= 3 ? "2.0" : "1.2"} />
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* TAP 1: ZONE 1 ONLY - Clean Center Vertical Spine (x ≈ 90..110) */}
        {/* ============================================================ */}
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
              strokeWidth: crackStage >= 4 ? [glowWidth, glowWidth * 1.4] : glowWidth,
              opacity: crackStage >= 4 ? [0.75, 1.0] : 0.75 
            }}
            transition={{ duration: 1.5 }}
          />
        )}

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
        {/* TAP 2: ZONE 2 ONLY - Reaches into Empty Left-Mid & Right-Mid (Zero overlap with Zone 1) */}
        {/* ============================================================ */}
        {crackStage >= 2 && (
          <g key="crack-stage-2-persistent">
            {/* Emerald glow inside branch seams */}
            <motion.path
              d="M 108 78 L 76 95 L 45 104 L 12 110 M 92 122 L 64 142 L 35 152 L 10 158 M 102 185 L 138 155 L 170 140 L 195 132 M 85 248 L 122 268 L 158 280 L 190 286"
              stroke="#059669"
              strokeWidth={crackStage >= 3 ? "2.8" : "2.0"}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Single clean crystalline branch lines into empty spaces */}
            <motion.path
              d="M 108 78 L 76 95 L 45 104 L 12 110 M 92 122 L 64 142 L 35 152 L 10 158 M 102 185 L 138 155 L 170 140 L 195 132 M 85 248 L 122 268 L 158 280 L 190 286"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 3: ZONE 3 ONLY - Reaches into Empty Corners & Perimeter (Zero overlap with Zone 1 & 2) */}
        {/* ============================================================ */}
        {crackStage >= 3 && (
          <g key="crack-stage-3-persistent">
            {/* Emerald glow into 4 empty corners */}
            <motion.path
              d="M 76 95 L 50 50 L 22 18 L 0 5 M 104 65 L 140 38 L 175 16 L 200 4 M 106 312 L 68 340 L 36 368 L 8 395 M 96 350 L 132 368 L 168 385 L 195 398"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Single clean crystalline corner cracks */}
            <motion.path
              d="M 76 95 L 50 50 L 22 18 L 0 5 M 104 65 L 140 38 L 175 16 L 200 4 M 106 312 L 68 340 L 36 368 L 8 395 M 96 350 L 132 368 L 168 385 L 195 398"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 4: ZONE 4 ONLY - Reaches Strictly Empty Untouched Voids (No overlapping existing lines!) */}
        {/* ============================================================ */}
        {crackStage >= 4 && (
          <g key="crack-stage-4-cascades">
            {/* --- WAVE 1 (0.0s): Cracks the remaining empty middle pockets --- */}
            {/* Top-Right empty space (x: 130..190, y: 70..120) & Bottom-Left empty pocket (x: 15..60, y: 210..270) */}
            <motion.path
              d="M 140 38 L 162 70 L 195 85 M 64 142 L 38 185 L 15 220"
              stroke="#34d399"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
            <motion.path
              d="M 140 38 L 162 70 L 195 85 M 64 142 L 38 185 L 15 220"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />

            {/* --- WAVE 2 (0.5s): Cracks the remaining empty lower-right & upper-left gaps --- */}
            {/* Lower-Right empty pocket (x: 140..195, y: 190..260) & Upper-Left edge (x: 0..40, y: 60..90) */}
            <motion.path
              d="M 170 140 L 185 190 L 195 240 M 50 50 L 25 65 L 0 75 M 122 268 L 150 315 L 180 340 M 68 340 L 40 310 L 12 280"
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
              d="M 170 140 L 185 190 L 195 240 M 50 50 L 25 65 L 0 75 M 122 268 L 150 315 L 180 340 M 68 340 L 40 310 L 12 280"
              stroke="#ffffff"
              strokeWidth="1.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
            />

            {/* --- WAVE 3 (1.0s): MASSIVE CATASTROPHIC FRACTURE (Connects remaining untouched edges before shatter) --- */}
            <motion.path
              d="M 0 135 L 35 152 L 85 200 L 122 268 L 165 310 L 200 330"
              stroke="#10b981"
              strokeWidth="5.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 1.0, ease: [0.12, 1, 0.28, 1] }}
            />
            <motion.path
              d="M 0 135 L 35 152 L 85 200 L 122 268 L 165 310 L 200 330"
              stroke="#ffffff"
              strokeWidth="2.2"
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

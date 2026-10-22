import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Progressive, Realistic Broken Glass Cracking:
 * 
 * - TAP 1:
 *   Spine crack shooting down the center from top to bottom.
 * 
 * - TAP 2 (Spreading into Inner Empty Space):
 *   Cracks branch slowly from the spine out into inner empty space.
 * 
 * - TAP 3 (THE 2-BEAM 3D LIGHT BURST REQUESTED BY USER):
 *   - REMOVED the starburst lines / jolikkuradhu at center (clean, pure fracture gap).
 *   - NOW 2 POWERFUL 3D BEAMS (oru 2ndu vachiko):
 *     1. Beam 1: Blasts piercing out from center (102, 185) toward upper-right across full screen!
 *     2. Beam 2: Blasts piercing out from center (102, 185) toward bottom-left across full screen!
 *     Natural 3D perspective projection directly from the center aperture.
 * 
 * - TAP 4 (Spreading into remaining gaps & shatter):
 *   - 0.0s: Cracks creep into top corners.
 *   - 0.5s: Cracks branch into mid/pill gaps.
 *   - 1.0s: Final perimeter cracks reach outer corners.
 *   - 1.5s: Glass completely shatters into the portal!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  // Single clean fissure stroke & gap width
  const spineStroke = crackStage === 1 ? 1.4 : (crackStage === 2 ? 2.2 : (crackStage === 3 ? 3.2 : 4.4));
  const glowWidth = crackStage === 1 ? 0 : (crackStage === 2 ? 4 : (crackStage === 3 ? 8 : 14));

  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center pointer-events-none overflow-visible rounded-3xl">
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

      {/* ============================================================ */}
      {/* TAP 3: 2 POWERFUL 3D LIGHT BEAMS FROM CENTER (No jolikkuradhu / No starburst) */}
      {/* ============================================================ */}
      {crackStage >= 3 && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              <linearGradient id="beam1Grad" x1="0%" y1="50%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="15%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="38%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="beam2Grad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="15%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="38%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <filter id="pure3DBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="sharp" />
                <feGaussianBlur stdDeviation="9" result="soft" />
                <feMerge>
                  <feMergeNode in="soft" />
                  <feMergeNode in="sharp" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Beam 1: Blasts from center (102, 185) towards upper-right across full screen! */}
            <motion.polygon
              points="102,185 116,180 820,-240 560,-320"
              fill="url(#beam1Grad)"
              filter="url(#pure3DBeamGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: [0, 1, 0.88]
              }}
              style={{ transformOrigin: "102px 185px" }}
              transition={{ 
                duration: 0.18,
                ease: [0.08, 0.82, 0.17, 1] 
              }}
            />

            {/* Beam 2: Blasts from center (102, 185) towards bottom-left across full screen! */}
            <motion.polygon
              points="102,185 90,192 -480,780 -260,860"
              fill="url(#beam2Grad)"
              filter="url(#pure3DBeamGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: [0, 1, 0.88]
              }}
              style={{ transformOrigin: "102px 185px" }}
              transition={{ 
                duration: 0.22,
                delay: 0.04,
                ease: [0.08, 0.82, 0.17, 1] 
              }}
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
        {/* TAP 1: Center Spine Fracture (Shoots down on 1st tap, STAYS CONSTANT!) */}
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
              opacity: crackStage >= 4 ? [0.75, 1.0] : 0.75 
            }}
            transition={{ duration: 1.5 }}
          />
        )}

        {/* Single crisp crystalline fracture line cutting across card */}
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
        {/* TAP 2: Spreading from Center into Inner-Mid Empty Space */}
        {/* ============================================================ */}
        {crackStage >= 2 && (
          <g key="crack-stage-2-persistent">
            {/* Emerald glow inside branch seams */}
            <motion.path
              d="M 108 78 L 76 100 L 45 108 M 92 122 L 64 146 L 40 156 M 102 185 L 140 152 L 165 138 M 85 248 L 126 274 L 155 286 M 106 312 L 72 336 L 44 348"
              stroke="#059669"
              strokeWidth={crackStage >= 3 ? "3.0" : "2.0"}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Natural crystalline branches spreading outwards from spine */}
            <motion.path
              d="M 108 78 L 76 100 L 45 108 M 92 122 L 64 146 L 40 156 M 102 185 L 140 152 L 165 138 M 85 248 L 126 274 L 155 286 M 106 312 L 72 336 L 44 348"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 3: Spreading further outward into Mid-Outer Empty Space (NO JOLIKKURADHU) */}
        {/* ============================================================ */}
        {crackStage >= 3 && (
          <g key="crack-stage-3-persistent">
            {/* Pure emerald seam glow */}
            <motion.path
              d="M 76 100 L 64 146 M 102 185 L 118 162 L 140 152 M 140 152 L 155 210 L 126 274 M 85 248 L 76 290 L 72 336 L 90 360 M 45 108 L 30 116 M 40 156 L 26 172 M 165 138 L 182 148 M 155 286 L 175 304 M 44 348 L 30 364"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
            />

            {/* Single clean spiderweb lines advancing toward the outer gaps */}
            <motion.path
              d="M 76 100 L 64 146 M 102 185 L 118 162 L 140 152 M 140 152 L 155 210 L 126 274 M 85 248 L 76 290 L 72 336 L 90 360 M 45 108 L 30 116 M 40 156 L 26 172 M 165 138 L 182 148 M 155 286 L 175 304 M 44 348 L 30 364"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 4: SPREADING TO ALL REMAINING CORNERS & EMPTY EDGE SPACES */}
        {/* ============================================================ */}
        {crackStage >= 4 && (
          <g key="crack-stage-4-empty-spaces">
            {/* --- WAVE 1 (0.0s): Spreading into Upper-Left & Upper-Right Empty Spaces --- */}
            <motion.path
              d="M 45 108 L 30 75 L 14 42 L 0 15 M 30 75 L 15 88 L 0 95 M 104 65 L 135 42 L 168 22 L 200 5 M 140 152 L 168 115 L 186 82 L 200 62"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
            <motion.path
              d="M 45 108 L 30 75 L 14 42 L 0 15 M 30 75 L 15 88 L 0 95 M 104 65 L 135 42 L 168 22 L 200 5 M 140 152 L 168 115 L 186 82 L 200 62"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />

            {/* --- WAVE 2 (after 0.5s): Spreading into Mid-Left (Behind "TODAY") & Mid-Right (Behind "th day") Empty Spaces --- */}
            <motion.path
              d="M 26 172 L 12 188 L 0 205 M 26 172 L 8 155 L 0 145 M 182 148 L 195 165 L 200 185 M 155 210 L 180 235 L 200 252 M 85 248 L 55 235 L 20 220 L 0 215"
              stroke="#10b981"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
            />
            <motion.path
              d="M 26 172 L 12 188 L 0 205 M 26 172 L 8 155 L 0 145 M 182 148 L 195 165 L 200 185 M 155 210 L 180 235 L 200 252 M 85 248 L 55 235 L 20 220 L 0 215"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
            />

            {/* --- WAVE 3 (after 0.5s = 1.0s): Spreading into Bottom-Left & Bottom-Right Empty Corner Spaces --- */}
            <motion.path
              d="M 30 364 L 14 382 L 0 400 M 44 348 L 20 330 L 0 315 M 175 304 L 190 340 L 200 380 M 175 304 L 195 295 L 200 280 M 96 350 L 125 375 L 155 400 M 106 312 L 138 335 L 175 360 L 200 375"
              stroke="#10b981"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 1.0, ease: [0.12, 1, 0.28, 1] }}
            />
            <motion.path
              d="M 30 364 L 14 382 L 0 400 M 44 348 L 20 330 L 0 315 M 175 304 L 190 340 L 200 380 M 175 304 L 195 295 L 200 280 M 96 350 L 125 375 L 155 400 M 106 312 L 138 335 L 175 360 L 200 375"
              stroke="#ffffff"
              strokeWidth="1.3"
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

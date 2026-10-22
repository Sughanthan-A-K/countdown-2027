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
 * - TAP 3 (TRUE 3D PROJECTION FROM CENTER OUT TO SCREEN):
 *   "card center point la iruthu card ah vittu veliya ponum bro"
 *   -> Exactly 2 volumetric light cones with apex anchored at Card Center (50%, 46.25%).
 *   -> Origin: 0 width at center -> expanding outwards into wide volumetric light shafts traveling AWAY from center,
 *      shooting out through the card onto the screen!
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
      {/* TAP 3 & TAP 4: OUTWARD 3D LIGHT BEAMS FROM CRACK SEAM SEGMENTS */}
      {/* Card-kulla irukura exact crack line/fissure-la irunthu thaan light screen-ku veliya pogum */}
      {/* ============================================================ */}
      {crackStage >= 3 && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              {/* --- TAP 3 ORIGINAL 2 BEAMS --- */}
              {/* Beam 1: Origin at crack seam (102, 185) -> (140, 152), shoots OUTWARDS towards Top-Right screen */}
              <linearGradient 
                id="outwardBeam1" 
                gradientUnits="userSpaceOnUse"
                x1="121" 
                y1="168" 
                x2="670" 
                y2="-300"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Beam 2: Blue line in image - Center spine crack seam (102, 185) -> (85, 248), shoots OUTWARDS towards Bottom-Left screen */}
              <linearGradient 
                id="outwardBeam2" 
                gradientUnits="userSpaceOnUse"
                x1="93" 
                y1="216" 
                x2="-450" 
                y2="730"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* --- TAP 4 FRESH CRACK SEAMS --- */}
              {/* Fresh Seam A: Wave 1 Top-Right Corner Crack (168, 22 -> 200, 5) -> shoots out Far Top-Right */}
              <linearGradient 
                id="outwardBeamWave1Corner" 
                gradientUnits="userSpaceOnUse"
                x1="184" 
                y1="13" 
                x2="850" 
                y2="-220"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Fresh Seam B: Wave 2 Mid-Left Edge Crack (12, 188 -> 0, 205) -> shoots out Direct Mid-Left */}
              <linearGradient 
                id="outwardBeamWave2MidLeft" 
                gradientUnits="userSpaceOnUse"
                x1="6" 
                y1="196" 
                x2="-520" 
                y2="260"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Fresh Seam C: Wave 1 Upper-Left Edge Crack (30, 75 -> 0, 15) -> shoots out Steep Top-Left */}
              <linearGradient 
                id="outwardBeamWave1TopLeft" 
                gradientUnits="userSpaceOnUse"
                x1="15" 
                y1="45" 
                x2="-450" 
                y2="-320"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Fresh Seam D: Wave 3 Bottom-Left Corner Crack (30, 364 -> 0, 400) -> shoots out Far Bottom-Left */}
              <linearGradient 
                id="outwardBeamWave3BottomLeft" 
                gradientUnits="userSpaceOnUse"
                x1="15" 
                y1="382" 
                x2="-500" 
                y2="880"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Fresh Seam E: Wave 2 Mid-Right Lower Branch (155, 210 -> 200, 252) -> shoots out Lower-Right */}
              <linearGradient 
                id="outwardBeamWave2MidRight" 
                gradientUnits="userSpaceOnUse"
                x1="177" 
                y1="231" 
                x2="780" 
                y2="420"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Fresh Seam F: Wave 3 Bottom-Right Edge Crack (175, 304 -> 200, 380) -> shoots out Steep Bottom-Right */}
              <linearGradient 
                id="outwardBeamWave3BottomRight" 
                gradientUnits="userSpaceOnUse"
                x1="187" 
                y1="342" 
                x2="650" 
                y2="890"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Crisp piercing beam glow */}
              <filter id="outwardBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur1" />
                <feGaussianBlur stdDeviation="9" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* --- TAP 3 BEAM 1: From crack seam (102, 185) -> (140, 152) expanding out towards Top-Right --- */}
            <motion.polygon
              points="102,185 140,152 780,-280 560,-320"
              fill="url(#outwardBeam1)"
              filter="url(#outwardBeamGlow)"
              style={{ transformOrigin: "121px 168px" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.08, 1], 
                opacity: crackStage >= 4 ? [0.95, 1.0] : [0, 1, 0.95] 
              }}
              transition={{ duration: 0.22, ease: [0.1, 0.9, 0.2, 1] }}
            />

            {/* --- TAP 3 BEAM 2 (Blue Line in screenshot): From spine crack seam (102, 185) -> (85, 248) expanding out towards Bottom-Left --- */}
            <motion.polygon
              points="102,185 85,248 -420,840 -480,620"
              fill="url(#outwardBeam2)"
              filter="url(#outwardBeamGlow)"
              style={{ transformOrigin: "93px 216px" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.08, 1], 
                opacity: crackStage >= 4 ? [0.95, 1.0] : [0, 1, 0.95] 
              }}
              transition={{ duration: 0.24, delay: 0.03, ease: [0.1, 0.9, 0.2, 1] }}
            />

            {/* ============================================================ */}
            {/* TAP 4: BRAND NEW CRACK LINES CREATING ASYMMETRIC LIGHT BURSTS */}
            {/* Slicing outward from the brand-new corner/edge cracks that form on 4th tap */}
            {/* ============================================================ */}
            {crackStage >= 4 && (
              <g key="tap-4-cascading-light-shafts">
                {/* --- 1st POP (0.04s): Top-Right brand new corner crack (168,22 -> 200,5) slicing Far Top-Right --- */}
                <motion.polygon
                  points="168,22 200,5 880,-120 720,-340"
                  fill="url(#outwardBeamWave1Corner)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "184px 13px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.05, 1], opacity: [0, 1, 0.9] }}
                  transition={{ duration: 0.14, delay: 0.04, ease: [0.05, 0.95, 0.1, 1] }}
                />

                {/* --- 2nd POP (0.26s): Mid-Left brand new edge crack (12,188 -> 0,205) slicing direct West --- */}
                <motion.polygon
                  points="12,188 0,205 -500,320 -500,160"
                  fill="url(#outwardBeamWave2MidLeft)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "6px 196px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.05, 1], opacity: [0, 1, 0.88] }}
                  transition={{ duration: 0.14, delay: 0.26, ease: [0.05, 0.95, 0.1, 1] }}
                />

                {/* --- 3rd POP (0.52s): Upper-Left brand new edge crack (30,75 -> 0,15) slicing steep North-West --- */}
                <motion.polygon
                  points="30,75 0,15 -380,-380 -220,-420"
                  fill="url(#outwardBeamWave1TopLeft)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "15px 45px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.05, 1], opacity: [0, 1, 0.92] }}
                  transition={{ duration: 0.14, delay: 0.52, ease: [0.05, 0.95, 0.1, 1] }}
                />

                {/* --- 4th POP (0.78s): Mid-Right brand new branch crack (155,210 -> 200,252) slicing East-South-East --- */}
                <motion.polygon
                  points="155,210 200,252 820,380 750,180"
                  fill="url(#outwardBeamWave2MidRight)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "177px 231px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.05, 1], opacity: [0, 1, 0.86] }}
                  transition={{ duration: 0.14, delay: 0.78, ease: [0.05, 0.95, 0.1, 1] }}
                />

                {/* --- 5th POP (1.04s): Bottom-Left brand new corner crack (30,364 -> 0,400) slicing South-West --- */}
                <motion.polygon
                  points="30,364 0,400 -450,880 -280,900"
                  fill="url(#outwardBeamWave3BottomLeft)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "15px 382px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.05, 1], opacity: [0, 1, 0.9] }}
                  transition={{ duration: 0.14, delay: 1.04, ease: [0.05, 0.95, 0.1, 1] }}
                />

                {/* --- 6th POP (1.30s): Bottom-Right brand new corner crack (175,304 -> 200,380) slicing South-East --- */}
                <motion.polygon
                  points="175,304 200,380 720,850 560,900"
                  fill="url(#outwardBeamWave3BottomRight)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "187px 342px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.05, 1], opacity: [0, 1, 0.92] }}
                  transition={{ duration: 0.14, delay: 1.30, ease: [0.05, 0.95, 0.1, 1] }}
                />
              </g>
            )}
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
        {/* TAP 3: Spreading further outward into Mid-Outer Empty Space */}
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

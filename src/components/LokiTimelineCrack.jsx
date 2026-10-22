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
      {/* TAP 3 & TAP 4: OUTWARD 3D LIGHT BEAMS POPPING FROM CRACK ORIGINS */}
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
              {/* Beam 1: Origin at center (102, 185) -> shoots out towards Top-Right (780, -280) */}
              <linearGradient 
                id="outwardBeam1" 
                gradientUnits="userSpaceOnUse"
                x1="102" 
                y1="185" 
                x2="670" 
                y2="-300"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Beam 2: Origin at center (102, 185) -> shoots out towards Bottom-Left (-450, 730) */}
              <linearGradient 
                id="outwardBeam2" 
                gradientUnits="userSpaceOnUse"
                x1="102" 
                y1="185" 
                x2="-450" 
                y2="730"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* --- TAP 4 EXTRA RANDOM BEAMS ACROSS ALL SIDES --- */}
              {/* Wave 1: Top-Left (from center 102, 185 -> through top-left to -480, -200) */}
              <linearGradient 
                id="outwardBeamTopLeft" 
                gradientUnits="userSpaceOnUse"
                x1="102" 
                y1="185" 
                x2="-430" 
                y2="-210"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Wave 2: Mid-Right (from center 102, 185 -> through mid-right to 800, 240) */}
              <linearGradient 
                id="outwardBeamMidRight" 
                gradientUnits="userSpaceOnUse"
                x1="102" 
                y1="185" 
                x2="800" 
                y2="240"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Wave 2: Bottom-Right (from center 102, 185 -> through bottom-right to 530, 850) */}
              <linearGradient 
                id="outwardBeamBottomRight" 
                gradientUnits="userSpaceOnUse"
                x1="102" 
                y1="185" 
                x2="530" 
                y2="850"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Wave 3: Top-Center Vertical (from center 102, 185 -> through top spine to 100, -360) */}
              <linearGradient 
                id="outwardBeamTopVertical" 
                gradientUnits="userSpaceOnUse"
                x1="102" 
                y1="185" 
                x2="100" 
                y2="-360"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Wave 3: Mid-Left (from center 102, 185 -> through mid-left to -510, 200) */}
              <linearGradient 
                id="outwardBeamMidLeft" 
                gradientUnits="userSpaceOnUse"
                x1="102" 
                y1="185" 
                x2="-510" 
                y2="200"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Wave 3: Bottom-Center Downward (from center 102, 185 -> through bottom spine to 100, 880) */}
              <linearGradient 
                id="outwardBeamBottomDown" 
                gradientUnits="userSpaceOnUse"
                x1="102" 
                y1="185" 
                x2="100" 
                y2="880"
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

            {/* --- TAP 3 BEAM 1: Top-Right fissure shaft radiating outward from center (102, 185) --- */}
            <motion.polygon
              points="102,185 145,150 780,-280 560,-320"
              fill="url(#outwardBeam1)"
              filter="url(#outwardBeamGlow)"
              style={{ transformOrigin: "102px 185px" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.08, 1], 
                opacity: crackStage >= 4 ? [0.95, 1.0] : [0, 1, 0.95] 
              }}
              transition={{ duration: 0.22, ease: [0.1, 0.9, 0.2, 1] }}
            />

            {/* --- TAP 3 BEAM 2: Bottom-Left fissure shaft radiating outward from center (102, 185) --- */}
            <motion.polygon
              points="102,185 85,250 -420,840 -480,620"
              fill="url(#outwardBeam2)"
              filter="url(#outwardBeamGlow)"
              style={{ transformOrigin: "102px 185px" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.08, 1], 
                opacity: crackStage >= 4 ? [0.95, 1.0] : [0, 1, 0.95] 
              }}
              transition={{ duration: 0.24, delay: 0.03, ease: [0.1, 0.9, 0.2, 1] }}
            />

            {/* ============================================================ */}
            {/* TAP 4: RANDOM OUTWARD LIGHT BURSTS POPPING WITH NEW CRACKS */}
            {/* ============================================================ */}
            {crackStage >= 4 && (
              <g key="tap-4-cascading-light-shafts">
                {/* --- FIRST POP (0.05s): 1 Beam -> Top-Left (Now total 3 beams) --- */}
                <motion.polygon
                  points="102,185 106,75 -380,-300 -480,-130"
                  fill="url(#outwardBeamTopLeft)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "102px 185px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.08, 1], opacity: [0, 1, 0.95] }}
                  transition={{ duration: 0.22, delay: 0.05, ease: [0.1, 0.9, 0.2, 1] }}
                />

                {/* --- SECOND POP (0.55s): 2 Beams -> Mid-Right & Bottom-Right --- */}
                <motion.polygon
                  points="102,185 118,190 820,120 780,360"
                  fill="url(#outwardBeamMidRight)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "102px 185px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.08, 1], opacity: [0, 1, 0.95] }}
                  transition={{ duration: 0.22, delay: 0.55, ease: [0.1, 0.9, 0.2, 1] }}
                />
                <motion.polygon
                  points="102,185 85,250 620,820 400,880"
                  fill="url(#outwardBeamBottomRight)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "102px 185px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.08, 1], opacity: [0, 1, 0.95] }}
                  transition={{ duration: 0.22, delay: 0.62, ease: [0.1, 0.9, 0.2, 1] }}
                />

                {/* --- THIRD POP (1.05s): 3 Beams -> Top-Vertical, Mid-Left & Bottom-Down across all sides --- */}
                <motion.polygon
                  points="102,185 98,15 -60,-360 260,-360"
                  fill="url(#outwardBeamTopVertical)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "102px 185px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.08, 1], opacity: [0, 1, 0.95] }}
                  transition={{ duration: 0.22, delay: 1.05, ease: [0.1, 0.9, 0.2, 1] }}
                />
                <motion.polygon
                  points="102,185 88,125 -500,80 -520,320"
                  fill="url(#outwardBeamMidLeft)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "102px 185px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.08, 1], opacity: [0, 1, 0.95] }}
                  transition={{ duration: 0.22, delay: 1.12, ease: [0.1, 0.9, 0.2, 1] }}
                />
                <motion.polygon
                  points="102,185 102,385 -60,880 260,880"
                  fill="url(#outwardBeamBottomDown)"
                  filter="url(#outwardBeamGlow)"
                  style={{ transformOrigin: "102px 185px" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.08, 1], opacity: [0, 1, 0.95] }}
                  transition={{ duration: 0.22, delay: 1.20, ease: [0.1, 0.9, 0.2, 1] }}
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

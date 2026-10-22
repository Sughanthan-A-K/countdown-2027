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

      {/* Behind-the-glass pure emerald ambient light - Escalates naturally on Tap 4 */}
      {crackStage >= 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: crackStage >= 4 ? 0.95 : (crackStage === 3 ? 0.8 : 0.45),
            scale: crackStage >= 4 ? 1.4 : (crackStage === 3 ? 1.2 : 1.0),
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-80 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.85) 0%, rgba(5,150,105,0.45) 50%, transparent 75%)',
            filter: 'blur(35px)'
          }}
        />
      )}

      {/* TAP 4: Center Core White-Hot Escalation - Exactly centered at Card Center point (100, 200) */}
      {crackStage >= 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.4, 0.8, 1.0],
            scale: [0.6, 1.0, 1.5, 2.0]
          }}
          transition={{ duration: 2.0, ease: [0.12, 0.8, 0.2, 1] }}
          className="absolute w-48 h-48 rounded-full pointer-events-none z-[65]"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle at center, #ffffff 0%, rgba(167,243,208,0.95) 25%, rgba(52,211,153,0.7) 50%, rgba(16,185,129,0.3) 70%, transparent 85%)',
            filter: 'blur(18px)',
            mixBlendMode: 'screen'
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

              {/* --- TAP 4 EXTRA BEAMS FROM EXACT CRACK SEAMS --- */}
              {/* Seam 3: Top Spine Crack (104, 65) -> (108, 78) - shoots out towards Top-Center/Right */}
              <linearGradient 
                id="outwardBeamTopSpine" 
                gradientUnits="userSpaceOnUse"
                x1="106" 
                y1="71" 
                x2="60" 
                y2="-380"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 4: Upper-Left Branch Crack (76, 100) -> (45, 108) - shoots out towards Top-Left screen */}
              <linearGradient 
                id="outwardBeamUpperLeft" 
                gradientUnits="userSpaceOnUse"
                x1="60" 
                y1="104" 
                x2="-400" 
                y2="-220"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 5: Mid-Left Branch Crack (40, 156) -> (26, 172) - shoots out towards Mid-Left screen */}
              <linearGradient 
                id="outwardBeamMidLeftSeam" 
                gradientUnits="userSpaceOnUse"
                x1="33" 
                y1="164" 
                x2="-520" 
                y2="170"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 6: Mid-Right Branch Crack (165, 138) -> (182, 148) - shoots out towards Mid-Right screen */}
              <linearGradient 
                id="outwardBeamMidRightSeam" 
                gradientUnits="userSpaceOnUse"
                x1="173" 
                y1="143" 
                x2="780" 
                y2="140"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 7: Lower-Right Branch Crack (85, 248) -> (126, 274) - shoots out towards Bottom-Right screen */}
              <linearGradient 
                id="outwardBeamLowerRightSeam" 
                gradientUnits="userSpaceOnUse"
                x1="105" 
                y1="261" 
                x2="650" 
                y2="780"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 8: Bottom Spine Crack (96, 350) -> (102, 400) - shoots out towards Bottom-Center screen */}
              <linearGradient 
                id="outwardBeamBottomSpineSeam" 
                gradientUnits="userSpaceOnUse"
                x1="99" 
                y1="375" 
                x2="90" 
                y2="880"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="12%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* --- MICRO-CRACK SLIVERS (Chinna chinna cracks-la irunthu vara beams) --- */}
              {/* Micro 1: Top-Right corner micro crack (168, 22 -> 200, 5) */}
              <linearGradient id="microBeamTopRight" gradientUnits="userSpaceOnUse" x1="184" y1="13" x2="680" y2="-280">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Micro 2: Upper-Left far edge micro crack (14, 42 -> 0, 15) */}
              <linearGradient id="microBeamUpperEdge" gradientUnits="userSpaceOnUse" x1="7" y1="28" x2="-450" y2="-180">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Micro 3: Bottom-Left corner micro crack (14, 382 -> 0, 400) */}
              <linearGradient id="microBeamBottomCorner" gradientUnits="userSpaceOnUse" x1="7" y1="391" x2="-420" y2="780">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Micro 4: Right edge gap micro crack (155, 210 -> 180, 235) */}
              <linearGradient id="microBeamRightEdge" gradientUnits="userSpaceOnUse" x1="167" y1="222" x2="720" y2="420">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#6ee7b7" stopOpacity="0.8" />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />

            {/* --- TAP 3 BEAM 2: From spine crack seam (102, 185) -> (85, 248) expanding out towards Bottom-Left --- */}
            <motion.polygon
              points="102,185 85,248 -420,840 -480,620"
              fill="url(#outwardBeam2)"
              filter="url(#outwardBeamGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.03, ease: "easeOut" }}
            />

            {/* ============================================================ */}
            {/* TAP 4: RANDOM OUTWARD LIGHT BURSTS (TAKKU TAKKUNU INSTANT FLASH) */}
            {/* No scale-down/pinch animations! Direct instant light shoot! */}
            {/* ============================================================ */}
            {crackStage >= 4 && (
              <g key="tap-4-cascading-light-shafts">
                {/* --- 1st POP (0.04s): Piercing Upper-Left corner --- */}
                <motion.polygon
                  points="76,100 45,108 -340,-260 -240,-360"
                  fill="url(#outwardBeamUpperLeft)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.95 }}
                  transition={{ duration: 0.08, delay: 0.04 }}
                />

                {/* --- 2nd POP (0.22s): Blade beam slicing through Mid-Right --- */}
                {/* Seam (165,138 -> 182,148) -> shoots STRAIGHT OUT to right edge (680,80 to 760,260) */}
                <motion.polygon
                  points="165,138 182,148 760,260 680,80"
                  fill="url(#outwardBeamMidRightSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.08, delay: 0.22 }}
                />

                {/* --- 3rd POP (0.42s): Upper-Right corner gap --- */}
                <motion.polygon
                  points="168,22 200,5 560,-220 480,-300"
                  fill="url(#microBeamTopRight)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.08, delay: 0.42 }}
                />

                {/* --- 4th POP (0.60s): Steep upward fissure shaft tilting North-North-West --- */}
                <motion.polygon
                  points="104,65 108,78 40,-420 -80,-380"
                  fill="url(#outwardBeamTopSpine)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.92 }}
                  transition={{ duration: 0.08, delay: 0.60 }}
                />

                {/* --- 5th POP (0.80s): Narrow oblique beam cutting through Lower-Right corner --- */}
                <motion.polygon
                  points="85,248 126,274 580,720 460,820"
                  fill="url(#outwardBeamLowerRightSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.88 }}
                  transition={{ duration: 0.08, delay: 0.80 }}
                />

                {/* --- 6th POP (1.00s): Sharp horizontal sliver piercing West --- */}
                <motion.polygon
                  points="40,156 26,172 -480,220 -500,130"
                  fill="url(#outwardBeamMidLeftSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.08, delay: 1.00 }}
                />

                {/* --- 7th POP (1.15s): Right edge gap behind 'th day' --- */}
                <motion.polygon
                  points="155,210 180,235 680,350 620,460"
                  fill="url(#microBeamRightEdge)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.08, delay: 1.15 }}
                />

                {/* --- 8th POP (1.30s): Off-center vertical beam piercing South-South-East --- */}
                <motion.polygon
                  points="96,350 102,400 190,880 70,880"
                  fill="url(#outwardBeamBottomSpineSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.92 }}
                  transition={{ duration: 0.08, delay: 1.30 }}
                />

                {/* --- 9th POP (1.45s): Bottom-Left corner far gap --- */}
                <motion.polygon
                  points="14,382 0,400 -320,680 -380,580"
                  fill="url(#microBeamBottomCorner)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.08, delay: 1.45 }}
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

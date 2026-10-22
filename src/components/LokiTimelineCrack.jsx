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
              {/* --- TAP 3 ORIGINAL 2 BEAMS (Infinite Screen Piercing) --- */}
              {/* Beam 1: Origin at crack seam (102, 185) -> (140, 152), shoots OUTWARDS past screen */}
              <linearGradient 
                id="outwardBeam1" 
                gradientUnits="userSpaceOnUse"
                x1="121" 
                y1="168" 
                x2="3500" 
                y2="-1800"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Beam 2: From center spine crack seam (102, 185) -> (85, 248), shoots OUTWARDS past screen */}
              <linearGradient 
                id="outwardBeam2" 
                gradientUnits="userSpaceOnUse"
                x1="93" 
                y1="216" 
                x2="-2800" 
                y2="4200"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* --- TAP 4 EXTRA BEAMS FROM EXACT CRACK SEAMS (Infinite Lengths) --- */}
              {/* Seam 3: Top Spine Crack (104, 65) -> (108, 78) */}
              <linearGradient 
                id="outwardBeamTopSpine" 
                gradientUnits="userSpaceOnUse"
                x1="106" 
                y1="71" 
                x2="-300" 
                y2="-4000"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 4: Upper-Left Branch Crack (76, 100) -> (45, 108) */}
              <linearGradient 
                id="outwardBeamUpperLeft" 
                gradientUnits="userSpaceOnUse"
                x1="60" 
                y1="104" 
                x2="-3200" 
                y2="-2600"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 5: Mid-Left Branch Crack (40, 156) -> (26, 172) */}
              <linearGradient 
                id="outwardBeamMidLeftSeam" 
                gradientUnits="userSpaceOnUse"
                x1="33" 
                y1="164" 
                x2="-4000" 
                y2="500"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 6: Mid-Right Branch Crack (165, 138) -> (182, 148) */}
              <linearGradient 
                id="outwardBeamMidRightSeam" 
                gradientUnits="userSpaceOnUse"
                x1="173" 
                y1="143" 
                x2="4200" 
                y2="900"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 7: Lower-Right Branch Crack (85, 248) -> (126, 274) */}
              <linearGradient 
                id="outwardBeamLowerRightSeam" 
                gradientUnits="userSpaceOnUse"
                x1="105" 
                y1="261" 
                x2="3500" 
                y2="4200"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Seam 8: Bottom Spine Crack (96, 350) -> (102, 400) */}
              <linearGradient 
                id="outwardBeamBottomSpineSeam" 
                gradientUnits="userSpaceOnUse"
                x1="99" 
                y1="375" 
                x2="600" 
                y2="4500"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* --- MICRO-CRACK SLIVERS (Infinite lengths) --- */}
              {/* Micro 1: Top-Right corner micro crack (168, 22 -> 200, 5) */}
              <linearGradient id="microBeamTopRight" gradientUnits="userSpaceOnUse" x1="184" y1="13" x2="3500" y2="-2200">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Micro 2: Upper-Left far edge micro crack (14, 42 -> 0, 15) */}
              <linearGradient id="microBeamUpperEdge" gradientUnits="userSpaceOnUse" x1="7" y1="28" x2="-3500" y2="-1800">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Micro 3: Bottom-Left corner micro crack (14, 382 -> 0, 400) */}
              <linearGradient id="microBeamBottomCorner" gradientUnits="userSpaceOnUse" x1="7" y1="391" x2="-3500" y2="4200">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Micro 4: Right edge gap micro crack (155, 210 -> 180, 235) */}
              <linearGradient id="microBeamRightEdge" gradientUnits="userSpaceOnUse" x1="167" y1="222" x2="4000" y2="2800">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.8" />
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

            {/* --- TAP 3 BEAM 1: From crack seam (102, 185) -> (140, 152) expanding INFINITELY across screen --- */}
            <motion.polygon
              points="102,185 140,152 4200,-1600 3200,-2200"
              fill="url(#outwardBeam1)"
              filter="url(#outwardBeamGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />

            {/* --- TAP 3 BEAM 2: From spine crack seam (102, 185) -> (85, 248) expanding INFINITELY across screen --- */}
            <motion.polygon
              points="102,185 85,248 -2600,4500 -3200,3800"
              fill="url(#outwardBeam2)"
              filter="url(#outwardBeamGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.03, ease: "easeOut" }}
            />

            {/* ============================================================ */}
            {/* TAP 4: ASYMMETRIC RANDOM TIMING LIGHT BURSTS (SOLID & CLEAN) */}
            {/* ============================================================ */}
            {crackStage >= 4 && (
              <g key="tap-4-cascading-light-shafts">
                {/* --- 1st POP (0.04s): Piercing Upper-Left corner --- */}
                <motion.polygon
                  points="76,100 45,108 -3400,-2600 -2400,-3600"
                  fill="url(#outwardBeamUpperLeft)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.95 }}
                  transition={{ duration: 0.08, delay: 0.04 }}
                />

                {/* --- 2nd POP (0.38s): Blade beam slicing through Mid-Right --- */}
                <motion.polygon
                  points="165,138 182,148 4500,1800 4200,300"
                  fill="url(#outwardBeamMidRightSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.08, delay: 0.38 }}
                />

                {/* --- 3rd POP (0.52s): Upper-Right corner gap --- */}
                <motion.polygon
                  points="168,22 200,5 3800,-1600 3200,-2400"
                  fill="url(#microBeamTopRight)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.08, delay: 0.52 }}
                />

                {/* --- 4th POP (0.85s): Steep upward fissure shaft tilting North-North-West --- */}
                <motion.polygon
                  points="104,65 108,78 400,-4200 -800,-3800"
                  fill="url(#outwardBeamTopSpine)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.92 }}
                  transition={{ duration: 0.08, delay: 0.85 }}
                />

                {/* --- 5th POP (1.02s): Narrow oblique beam cutting through Lower-Right corner --- */}
                <motion.polygon
                  points="85,248 126,274 3800,4200 3000,4800"
                  fill="url(#outwardBeamLowerRightSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.88 }}
                  transition={{ duration: 0.08, delay: 1.02 }}
                />

                {/* --- 6th POP (1.18s): Sharp horizontal sliver piercing West --- */}
                <motion.polygon
                  points="40,156 26,172 -4200,1200 -4500,200"
                  fill="url(#outwardBeamMidLeftSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.08, delay: 1.18 }}
                />

                {/* --- 7th POP (1.35s): Right edge gap behind 'th day' --- */}
                <motion.polygon
                  points="155,210 180,235 4400,3200 3800,1200"
                  fill="url(#microBeamRightEdge)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.08, delay: 1.35 }}
                />

                {/* --- 8th POP (1.42s): Off-center vertical beam piercing South-South-East --- */}
                <motion.polygon
                  points="96,350 102,400 1200,4500 200,4500"
                  fill="url(#outwardBeamBottomSpineSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.92 }}
                  transition={{ duration: 0.08, delay: 1.42 }}
                />

                {/* --- 9th POP (1.58s): Bottom-Left corner far gap --- */}
                <motion.polygon
                  points="14,382 0,400 -2600,4800 -3400,4000"
                  fill="url(#microBeamBottomCorner)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.08, delay: 1.58 }}
                />
              </g>
            )}

            {/* ============================================================ */}
            {/* LUMINOUS CRACK DUST PARTICLES (LIGHT SHAFTS-KULLA DRIFTING SPECKS) */}
            {/* Dense cluster originating at high-fracture seams drifting infinitely into outer beams */}
            {/* ============================================================ */}
            {crackStage >= 3 && (
              <g key="crack-luminous-dust-motes">
                {[
                  // Primary Origin: Center Spine & Hub (102, 185) -> Shooting along Top-Right Infinite Beam
                  { cx: 104, cy: 182, r: 1.5, dx: 720, dy: -420, dur: 3.4, delay: 0.05 },
                  { cx: 112, cy: 174, r: 1.1, dx: 950, dy: -550, dur: 4.1, delay: 0.35 },
                  { cx: 124, cy: 162, r: 1.8, dx: 1200, dy: -680, dur: 4.6, delay: 0.70 },
                  { cx: 135, cy: 154, r: 1.3, dx: 840, dy: -480, dur: 3.8, delay: 1.10 },
                  { cx: 108, cy: 178, r: 0.9, dx: 1100, dy: -620, dur: 4.2, delay: 1.50 },

                  // Primary Origin: Center Spine & Hub (102, 185) -> Shooting along Bottom-Left Infinite Beam
                  { cx: 98, cy: 190, r: 1.6, dx: -680, dy: 720, dur: 3.6, delay: 0.15 },
                  { cx: 92, cy: 215, r: 1.2, dx: -880, dy: 920, dur: 4.3, delay: 0.50 },
                  { cx: 88, cy: 238, r: 1.9, dx: -1100, dy: 1150, dur: 4.8, delay: 0.85 },
                  { cx: 84, cy: 252, r: 1.1, dx: -760, dy: 800, dur: 3.9, delay: 1.25 },
                  { cx: 95, cy: 205, r: 0.9, dx: -1020, dy: 1080, dur: 4.5, delay: 1.65 },

                  // Upper Fractures: Top Spine & Branch (108, 78) & (92, 122)
                  { cx: 106, cy: 72, r: 1.4, dx: -120, dy: -850, dur: 3.8, delay: 0.25 },
                  { cx: 76, cy: 98, r: 1.3, dx: -820, dy: -640, dur: 4.0, delay: 0.60 },
                  { cx: 52, cy: 106, r: 1.7, dx: -960, dy: -740, dur: 4.5, delay: 0.95 },
                  { cx: 92, cy: 122, r: 1.2, dx: -750, dy: -420, dur: 4.1, delay: 1.35 },
                  { cx: 64, cy: 144, r: 1.5, dx: -880, dy: 160, dur: 4.2, delay: 0.40 },

                  // Lower Fractures: Spine Split (85, 248) & Lower Branch (126, 274)
                  { cx: 105, cy: 260, r: 1.5, dx: 860, dy: 920, dur: 4.2, delay: 0.30 },
                  { cx: 122, cy: 272, r: 1.3, dx: 980, dy: 1050, dur: 4.7, delay: 0.75 },
                  { cx: 106, cy: 312, r: 1.6, dx: 450, dy: 1100, dur: 4.4, delay: 1.05 },
                  { cx: 98, cy: 355, r: 1.2, dx: 260, dy: 950, dur: 3.9, delay: 1.45 },
                  { cx: 145, cy: 282, r: 1.4, dx: 1050, dy: 850, dur: 4.6, delay: 0.80 },

                  // Mid-Perimeter Gaps: (165, 138) & (40, 156)
                  { cx: 168, cy: 142, r: 1.5, dx: 1100, dy: 240, dur: 4.3, delay: 0.45 },
                  { cx: 180, cy: 146, r: 1.1, dx: 1250, dy: 180, dur: 4.8, delay: 0.90 },
                  { cx: 38, cy: 158, r: 1.6, dx: -1050, dy: 220, dur: 4.4, delay: 0.55 },
                  { cx: 28, cy: 170, r: 1.2, dx: -1200, dy: 310, dur: 4.9, delay: 1.15 },
                ].map((pt, i) => (
                  <motion.circle
                    key={`dust-infinite-${i}`}
                    cx={pt.cx}
                    cy={pt.cy}
                    r={pt.r}
                    fill="#ffffff"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{
                      opacity: [0, 0.9, 0.95, 0.7, 0],
                      scale: [0.3, 1.4, 1.2, 0.9, 0],
                      x: [0, pt.dx],
                      y: [0, pt.dy]
                    }}
                    transition={{
                      duration: pt.dur,
                      delay: pt.delay,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                ))}
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
        {/* Strictly contained within card borders (y: 10 to y: 390) so glow doesn't bleed out */}
        {/* ============================================================ */}
        {/* Pure Emerald Light Bleeding Through Widening Spine Gap */}
        {crackStage >= 2 && (
          <motion.path
            d="M 98 12 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 388"
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

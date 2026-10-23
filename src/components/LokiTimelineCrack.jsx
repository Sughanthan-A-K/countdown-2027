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
export default function LokiTimelineCrack({ crackStage = 0, stage4Step = null }) {
  if (crackStage <= 0) return null;

  // If stage4Step is explicitly controlled (e.g. 1 to 5), use it; otherwise default to full normal behavior (null = full)
  const isStepMode = crackStage === 4 && stage4Step !== null;
  const showOuterBeams = crackStage >= 4 && (!isStepMode || stage4Step >= 1);
  const showRadialWave = crackStage >= 4 && (!isStepMode || stage4Step >= 2);
  const showVeil = crackStage >= 4 && (!isStepMode || stage4Step >= 3);
  const showCenterBursts = crackStage >= 4 && (!isStepMode || stage4Step >= 4);

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

              {/* Climax Center Infinite Beam 1 (Left): Origin at Center-Left Spine Fissure (92, 122) -> (64, 146) */}
              <linearGradient id="climaxLeftInfiniteBeam" gradientUnits="userSpaceOnUse" x1="78" y1="134" x2="-4500" y2="-600">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Climax Final Infinite Beam 3 (Center Aperture Core): Origin at Center Hub (102, 185) -> blasting East-North-East */}
              <linearGradient id="climaxCenterInfiniteBeam" gradientUnits="userSpaceOnUse" x1="102" y1="185" x2="4800" y2="-800">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* --- 5 NEW CRACK LIGHT GRADIENTS (From user red-marked fissures) --- */}
              {/* Red Line 1: Center-Left Spine segment (92, 122 -> 102, 185) -> shooting West-South-West */}
              <linearGradient id="beamRedLine1" gradientUnits="userSpaceOnUse" x1="97" y1="153" x2="-4500" y2="1200">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Red Line 2: Upper Spine segment (108, 78 -> 92, 122) -> shooting West-North-West */}
              <linearGradient id="beamRedLine2" gradientUnits="userSpaceOnUse" x1="100" y1="100" x2="-4000" y2="-2200">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Red Line 3: Upper-Right branch segment (140, 45 -> 175, 22) -> shooting North-East */}
              <linearGradient id="beamRedLine3" gradientUnits="userSpaceOnUse" x1="157" y1="33" x2="3800" y2="-3200">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Red Line 4: Mid-Left branch segment (64, 146 -> 40, 156) -> shooting South-West */}
              <linearGradient id="beamRedLine4" gradientUnits="userSpaceOnUse" x1="52" y1="151" x2="-4500" y2="2400">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              {/* Red Line 5: Lower-Right Center branch (140, 152 -> 165, 138 & 155, 210) -> shooting East-South-East */}
              <linearGradient id="beamRedLine5" gradientUnits="userSpaceOnUse" x1="155" y1="210" x2="4500" y2="3400">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="6%" stopColor="#a7f3d0" stopOpacity="0.95" />
                <stop offset="18%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.45" />
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
            {/* TAP 4: NATURAL PROGRESSION */}
            {/* Phase 1: Surrounding cracks radiate FIRST with organic delays (0.6s -> 2.6s) */}
            {/* Phase 2: Center cracks burst rapidly & FAST (3.0s -> 3.48s) leading into 3.6s Shatter! */}
            {/* ============================================================ */}
            {showOuterBeams && (
              <g key="tap-4-cascading-light-shafts">
                {/* --- 1. SURROUNDING OUTER CRACKS RADIATE FIRST WITH DELAYS (0.6s - 2.6s) --- */}
                {/* Upper-Left Corner Beam (0.65s) */}
                <motion.polygon
                  points="76,100 45,108 -3400,-2600 -2400,-3600"
                  fill="url(#outwardBeamUpperLeft)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.25, delay: isStepMode ? 0 : 0.65, ease: "easeOut" }}
                />

                {/* Blade Beam Mid-Right (1.20s) */}
                <motion.polygon
                  points="165,138 4200,300 4500,1800 182,148"
                  fill="url(#outwardBeamMidRightSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.25, delay: isStepMode ? 0.05 : 1.20, ease: "easeOut" }}
                />

                {/* Upper-Right Corner Gap (1.75s) */}
                <motion.polygon
                  points="168,22 200,5 3800,-1600 3200,-2400"
                  fill="url(#microBeamTopRight)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.22, delay: isStepMode ? 0.1 : 1.75, ease: "easeOut" }}
                />

                {/* Lower-Right Corner Beam (2.20s) */}
                <motion.polygon
                  points="85,248 126,274 3800,4200 3000,4800"
                  fill="url(#outwardBeamLowerRightSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.88 }}
                  transition={{ duration: 0.20, delay: isStepMode ? 0.15 : 2.20, ease: "easeOut" }}
                />

                {/* Bottom-Left Corner Gap (2.55s) */}
                <motion.polygon
                  points="14,382 0,400 -2600,4800 -3400,4000"
                  fill="url(#microBeamBottomCorner)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ duration: 0.18, delay: isStepMode ? 0.2 : 2.55, ease: "easeOut" }}
                />

                {/* South Spine Off-Center Beam (2.85s) */}
                <motion.polygon
                  points="96,350 102,400 1200,4500 200,4500"
                  fill="url(#outwardBeamBottomSpineSeam)"
                  filter="url(#outwardBeamGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.92 }}
                  transition={{ duration: 0.14, delay: isStepMode ? 0.25 : 2.85, ease: "easeOut" }}
                />

                {/* --- 2. CENTER CRACKS BURST RAPID & FAST (3.05s - 3.48s) --- */}
                {showCenterBursts && (
                  <>
                    {/* Upper Center Spine Fissure (3.05s) */}
                    <motion.polygon
                      points="108,78 -3800,-3200 -4200,-1800 92,122"
                      fill="url(#beamRedLine2)"
                      filter="url(#outwardBeamGlow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.92 }}
                      transition={{ duration: 0.10, delay: isStepMode ? 0 : 3.05, ease: "easeOut" }}
                    />

                    {/* Steep Upward Top Spine Shaft (3.18s) */}
                    <motion.polygon
                      points="104,65 108,78 400,-4200 -800,-3800"
                      fill="url(#outwardBeamTopSpine)"
                      filter="url(#outwardBeamGlow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.92 }}
                      transition={{ duration: 0.08, delay: isStepMode ? 0.05 : 3.18, ease: "easeOut" }}
                    />

                    {/* Left side Center Fissure (3.28s) */}
                    <motion.polygon
                      points="92,122 64,146 -4500,-600 -4200,-1800"
                      fill="url(#climaxLeftInfiniteBeam)"
                      filter="url(#outwardBeamGlow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.95 }}
                      transition={{ duration: 0.08, delay: isStepMode ? 0.1 : 3.28, ease: "easeOut" }}
                    />

                    {/* Center Fissures Red Line 1 (3.36s) */}
                    <motion.polygon
                      points="92,122 -4500,600 -4500,1800 102,185"
                      fill="url(#beamRedLine1)"
                      filter="url(#outwardBeamGlow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.95 }}
                      transition={{ duration: 0.07, delay: isStepMode ? 0.15 : 3.36, ease: "easeOut" }}
                    />

                    {/* Center Fissures Red Line 5 (3.42s) */}
                    <motion.polygon
                      points="140,152 4200,2400 4500,3800 155,210"
                      fill="url(#beamRedLine5)"
                      filter="url(#outwardBeamGlow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.95 }}
                      transition={{ duration: 0.06, delay: isStepMode ? 0.2 : 3.42, ease: "easeOut" }}
                    />

                    {/* FINAL MEGA CENTER CLIMAX BEAM (3.48s): Central Hub Peak Laser -> Directly triggering 3.6s Shatter! */}
                    <motion.polygon
                      points="102,185 140,152 4800,-400 3800,-1600"
                      fill="url(#climaxCenterInfiniteBeam)"
                      filter="url(#outwardBeamGlow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1.0 }}
                      transition={{ duration: 0.06, delay: isStepMode ? 0.25 : 3.48, ease: "easeOut" }}
                    />
                  </>
                )}
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
        {/* TAP 4: ESCALATING BRIGHT SWELLING OVER THE ENTIRE CARD */}
        {/* Light spreads smoothly from center to encompass the FULL card before exploding */}
        {/* ============================================================ */}
        {crackStage >= 4 && (
          <g key="crack-stage-4-center-bright-core">
            <defs>
              {/* Radial gradient that grows seamlessly from pure white core to full card emerald light */}
              <radialGradient id="exactCardCenterCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="30%" stopColor="#d1fae5" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
              </radialGradient>
            </defs>

            {/* 1. Concentric Radial Wave expanding from Center to engulf the entire card uniformly */}
            {showRadialWave && (
              <motion.circle
                cx="100"
                cy="200"
                r="220"
                fill="url(#exactCardCenterCore)"
                initial={{ scale: 0.1, opacity: 0 }}
                animate={isStepMode ? {
                  scale: 0.95,
                  opacity: 0.9
                } : {
                  scale: [0.1, 0.4, 0.8, 1.4],
                  opacity: [0, 0.4, 0.85, 1.0]
                }}
                transition={{
                  duration: isStepMode ? 0.3 : 5.0,
                  times: isStepMode ? undefined : [0, 0.65, 0.85, 1.0],
                  ease: [0.25, 1, 0.5, 1]
                }}
                style={{ mixBlendMode: "screen" }}
              />
            )}

            {/* 2. Full-Card Uniform Glowing Veil: Every single corner, top, and edge washes in pure luminous light */}
            {showVeil && (
              <motion.rect
                x="0"
                y="0"
                width="200"
                height="400"
                rx="16"
                fill="#ecfdf5"
                initial={{ opacity: 0 }}
                animate={isStepMode ? {
                  opacity: 0.95
                } : {
                  opacity: [0, 0, 0.25, 0.8, 1.0]
                }}
                transition={{
                  duration: isStepMode ? 0.3 : 5.0,
                  times: isStepMode ? undefined : [0, 0.65, 0.78, 0.92, 1.0],
                  ease: "easeInOut"
                }}
                style={{ mixBlendMode: "screen" }}
              />
            )}

            {/* 3. Final Climax Flash: At 5.0s, the entire card achieves 100% white-emerald glow right at explosion moment */}
            {showCenterBursts && (
              <motion.rect
                x="0"
                y="0"
                width="200"
                height="400"
                rx="16"
                fill="#ffffff"
                initial={{ opacity: 0 }}
                animate={isStepMode ? {
                  opacity: 0.9
                } : {
                  opacity: [0, 0, 0, 0.3, 0.95]
                }}
                transition={{
                  duration: isStepMode ? 0.2 : 5.1,
                  times: isStepMode ? undefined : [0, 0.7, 0.85, 0.95, 1.0],
                  ease: "easeIn"
                }}
                style={{ mixBlendMode: "screen" }}
              />
            )}
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 1: Center Spine Fracture (Shoots down on 1st tap, STAYS CONSTANT!) */}
        {/* Extends cleanly right up to the card edges without crossing outside */}
        {/* ============================================================ */}

        {/* Single crisp crystalline fracture line touching card edges (y: 6 to y: 394) */}
        <motion.path
          d="M 98 6 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 394"
          stroke={crackStage >= 2 ? "#d1fae5" : "#ffffff"}
          strokeWidth={spineStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={crackStage === 1 ? { pathLength: 0 } : false}
          animate={{ 
            pathLength: 1,
            stroke: crackStage >= 4 ? ["#d1fae5", "#ffffff"] : (crackStage >= 2 ? "#d1fae5" : "#ffffff"),
            strokeWidth: crackStage >= 4 ? [spineStroke, spineStroke * 1.5] : spineStroke
          }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ============================================================ */}
        {/* TAP 2: Spreading from Center into Inner-Mid Empty Space */}
        {/* ============================================================ */}
        {crackStage >= 2 && (
          <g key="crack-stage-2-persistent">
            {/* Emerald glow inside branch seams - Escalates on Tap 4 */}
            <motion.path
              d="M 108 78 L 76 100 L 45 108 M 92 122 L 64 146 L 40 156 M 102 185 L 140 152 L 165 138 M 85 248 L 126 274 L 155 286 M 106 312 L 72 336 L 44 348"
              stroke="#059669"
              strokeWidth={crackStage >= 3 ? "3.0" : "2.0"}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={crackStage === 2 ? { pathLength: 0 } : false}
              animate={{ 
                pathLength: 1,
                stroke: crackStage >= 4 ? ["#059669", "#34d399", "#a7f3d0"] : "#059669",
                strokeWidth: crackStage >= 4 ? [3.0, 7.5] : (crackStage >= 3 ? 3.0 : 2.0),
                opacity: crackStage >= 4 ? [0.8, 1.0] : 0.8
              }}
              transition={{ duration: 1.8, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
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
              animate={{ 
                pathLength: 1,
                strokeWidth: crackStage >= 4 ? [1.2, 2.2] : 1.2
              }}
              transition={{ duration: 2.5, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 3: Spreading further outward into Mid-Outer Empty Space */}
        {/* ============================================================ */}
        {crackStage >= 3 && (
          <g key="crack-stage-3-persistent">
            {/* Pure emerald seam glow - Escalates on Tap 4 */}
            <motion.path
              d="M 76 100 L 64 146 M 102 185 L 118 162 L 140 152 M 140 152 L 155 210 L 126 274 M 85 248 L 76 290 L 72 336 L 90 360 M 45 108 L 30 116 M 40 156 L 26 172 M 165 138 L 182 148 M 155 286 L 175 304 M 44 348 L 30 364"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={crackStage === 3 ? { pathLength: 0 } : false}
              animate={{ 
                pathLength: 1,
                stroke: crackStage >= 4 ? ["#059669", "#34d399", "#a7f3d0"] : "#059669",
                strokeWidth: crackStage >= 4 ? [2.4, 6.5] : 2.4,
                opacity: crackStage >= 4 ? [0.85, 1.0] : 0.85
              }}
              transition={{ duration: 1.8, delay: 0.05, ease: [0.12, 1, 0.28, 1] }}
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
              animate={{ 
                pathLength: 1,
                strokeWidth: crackStage >= 4 ? [1.1, 2.0] : 1.1
              }}
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

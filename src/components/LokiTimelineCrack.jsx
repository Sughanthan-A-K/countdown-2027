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
export default function LokiTimelineCrack({ 
  crackStage = 0, 
  stage4Step = null, 
  activeBeams = null, 
  beamTransforms = null,
  circleRadius = 220,
  previewAllBeams = false
}) {
  if (crackStage <= 0 && !previewAllBeams) return null;

  // Helper to check if a specific beam is enabled (null = all enabled by default)
  const isBeamActive = (beamId) => {
    if (!activeBeams) return true;
    return activeBeams.includes(beamId);
  };

  // Helper to dynamically swing ONLY the outer projection points of a beam,
  // keeping the base seam points [p1, p2] 100% physically fixed on the crack fracture!
  const getDynamicBeamPoints = (beamId, defaultPointsStr) => {
    // defaultPointsStr format: "p1x,p1y p2x,p2y p3x,p3y p4x,p4y"
    // p1, p2 = fixed crack seam points on the card
    // p3, p4 = outer piercing projection points traveling far out onto the screen
    if (!beamTransforms) return defaultPointsStr;
    const globalT = beamTransforms.global || { angle: 0, scaleX: 1, scaleY: 1 };
    const beamT = beamTransforms[beamId] || { angle: 0, scaleX: 1, scaleY: 1 };

    const totalAngle = (globalT.angle || 0) + (beamT.angle || 0);
    const totalScale = (globalT.scaleX || 1) * (beamT.scaleX || 1);

    if (totalAngle === 0 && totalScale === 1) {
      return defaultPointsStr;
    }

    const pts = defaultPointsStr.trim().split(/\s+/).map(pair => {
      const [x, y] = pair.split(',').map(Number);
      return [x, y];
    });

    if (pts.length < 4) return defaultPointsStr;

    // Anchor is the EXACT midpoint of the crack seam segment (p1 and p2)
    const [p1, p2, p3, p4] = pts;
    const anchorX = (p1[0] + p2[0]) / 2;
    const anchorY = (p1[1] + p2[1]) / 2;

    const rad = (totalAngle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Rotate & scale ONLY the outer piercing points (p3 and p4) around the crack seam anchor
    const rotatePoint = ([px, py]) => {
      const dx = (px - anchorX) * totalScale;
      const dy = (py - anchorY) * totalScale;
      const rx = anchorX + (dx * cos - dy * sin);
      const ry = anchorY + (dx * sin + dy * cos);
      return `${Math.round(rx)},${Math.round(ry)}`;
    };

    const newP3 = rotatePoint(p3);
    const newP4 = rotatePoint(p4);

    // Points p1 and p2 remain 100% UNCHANGED and locked into the crack seam!
    return `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${newP3} ${newP4}`;
  };

  // In Tap 3 (Climax), all outer beams, center bursts, and radial wave swell together with Tak... Tak, Tak, Tak timing!
  const showOuterBeams = previewAllBeams || crackStage >= 3;
  const showRadialWave = previewAllBeams || crackStage >= 3;
  const showCenterBursts = previewAllBeams || crackStage >= 3;

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
      {(crackStage >= 3 || previewAllBeams) && (
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
                <stop offset="6%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#d1fae5" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
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

            {/* ============================================================ */}
            {/* TAP 3 CLIMAX SEQUENCE: ACCELERATING TAK... TAK, TAK, TAK! */}
            {/* 11 Checked Lights emerge with organic accelerating rhythm: */}
            {/* Starts steady (0.15s, 0.70s) -> then faster (1.15s, 1.50s) -> then rapid (1.80s, 2.05s, 2.25s) -> then lightning bursts (2.42s, 2.56s, 2.68s, 2.78s)! */}
            {/* Once emerged, every light blazes and smoothly morphs into pure blinding supernova white! */}
            {/* ============================================================ */}
            {showOuterBeams && (
              <g key="tap-3-climax-light-shafts">
                {/* 1. Beam 102: Tap 3 Beam 2 Lower-Left Spine Seam (0.15s) - TAK! */}
                {isBeamActive(102) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(102, "102,185 85,248 -2600,4500 -3200,3800")}
                    fill="url(#outwardBeam2)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.9, 1.0] }}
                    transition={{ duration: 0.25, delay: previewAllBeams ? 0 : 0.15, ease: "easeOut" }}
                  />
                )}

                {/* 2. Beam 1: Upper-Left Corner Beam (0.70s) - ...TAK! */}
                {isBeamActive(1) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(1, "76,100 45,108 -3400,-2600 -2400,-3600")}
                    fill="url(#outwardBeamUpperLeft)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.88, 1.0] }}
                    transition={{ duration: 0.22, delay: previewAllBeams ? 0 : 0.70, ease: "easeOut" }}
                  />
                )}

                {/* 3. Beam 2: Blade Beam Mid-Right (1.15s) - TAK! */}
                {isBeamActive(2) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(2, "165,138 182,148 4500,1800 4200,300")}
                    fill="url(#outwardBeamMidRightSeam)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.88, 1.0] }}
                    transition={{ duration: 0.20, delay: previewAllBeams ? 0 : 1.15, ease: "easeOut" }}
                  />
                )}

                {/* 4. Beam 4: Lower-Right Corner Beam (1.50s) - TAK! */}
                {isBeamActive(4) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(4, "85,248 126,274 3800,4200 3000,4800")}
                    fill="url(#outwardBeamLowerRightSeam)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.9, 1.0] }}
                    transition={{ duration: 0.18, delay: previewAllBeams ? 0 : 1.50, ease: "easeOut" }}
                  />
                )}

                {/* 5. Beam 6: South Spine Off-Center Beam (1.80s) - TAK! */}
                {isBeamActive(6) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(6, "96,350 102,400 1200,4500 200,4500")}
                    fill="url(#outwardBeamBottomSpineSeam)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.92, 1.0] }}
                    transition={{ duration: 0.15, delay: previewAllBeams ? 0 : 1.80, ease: "easeOut" }}
                  />
                )}

                {/* 6. Beam 7: Upper Center Spine Fissure (2.05s) - TAK! */}
                {isBeamActive(7) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(7, "108,78 92,122 -4200,-1800 -3800,-3200")}
                    fill="url(#beamRedLine2)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.92, 1.0] }}
                    transition={{ duration: 0.12, delay: previewAllBeams ? 0 : 2.05, ease: "easeOut" }}
                  />
                )}

                {/* 7. Beam 8: Steep Upward Top Spine Shaft (2.25s) - TAK! */}
                {isBeamActive(8) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(8, "104,65 108,78 400,-4200 -800,-3800")}
                    fill="url(#outwardBeamTopSpine)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.93, 1.0] }}
                    transition={{ duration: 0.10, delay: previewAllBeams ? 0 : 2.25, ease: "easeOut" }}
                  />
                )}

                {/* 8. Beam 9: Left-side Center Fissure (2.42s) - TAK! */}
                {isBeamActive(9) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(9, "92,122 64,146 -4500,-600 -4200,-1800")}
                    fill="url(#climaxLeftInfiniteBeam)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.95, 1.0] }}
                    transition={{ duration: 0.08, delay: previewAllBeams ? 0 : 2.42, ease: "easeOut" }}
                  />
                )}

                {/* 9. Beam 10: Center Fissures Red Line 1 (2.56s) - TAK! */}
                {isBeamActive(10) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(10, "92,122 102,185 -4500,1800 -4500,600")}
                    fill="url(#beamRedLine1)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.95, 1.0] }}
                    transition={{ duration: 0.07, delay: previewAllBeams ? 0 : 2.56, ease: "easeOut" }}
                  />
                )}

                {/* 10. Beam 11: Center Fissures Red Line 5 (2.68s) - TAK! */}
                {isBeamActive(11) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(11, "140,152 155,210 4500,3800 4200,2400")}
                    fill="url(#beamRedLine5)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.95, 1.0] }}
                    transition={{ duration: 0.06, delay: previewAllBeams ? 0 : 2.68, ease: "easeOut" }}
                  />
                )}

                {/* 11. Beam 12: FINAL MEGA CLIMAX LASER (2.78s) - MEGA TAK BURST! */}
                {isBeamActive(12) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(12, "102,185 140,152 4800,-400 3800,-1600")}
                    fill="url(#climaxCenterInfiniteBeam)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1.0] }}
                    transition={{ duration: 0.06, delay: previewAllBeams ? 0 : 2.78, ease: "easeOut" }}
                  />
                )}

                {/* Optional Fallback if user explicitly enables 101, 3, or 5 in tool */}
                {isBeamActive(101) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(101, "102,185 140,152 4200,-1600 3200,-2200")}
                    fill="url(#outwardBeam1)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: previewAllBeams ? 0 : 0.35, ease: "easeOut" }}
                  />
                )}
                {isBeamActive(3) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(3, "168,22 200,5 3800,-1600 3200,-2400")}
                    fill="url(#microBeamTopRight)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    transition={{ duration: 0.22, delay: previewAllBeams ? 0 : 1.35, ease: "easeOut" }}
                  />
                )}
                {isBeamActive(5) && (
                  <motion.polygon
                    points={getDynamicBeamPoints(5, "14,382 0,400 -2600,4800 -3400,4000")}
                    fill="url(#microBeamBottomCorner)"
                    filter="url(#outwardBeamGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    transition={{ duration: 0.18, delay: previewAllBeams ? 0 : 1.65, ease: "easeOut" }}
                  />
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
        {/* TAP 3 / CLIMAX: ESCALATING BRIGHT SWELLING OVER THE ENTIRE CARD */}
        {/* Light spreads smoothly from center to encompass the FULL card before exploding */}
        {/* ============================================================ */}
        {(crackStage >= 3 || previewAllBeams) && (
          <g key="crack-stage-3-center-bright-core">
            <defs>
              {/* Radial gradient that grows seamlessly from green into pure supernova white */}
              <radialGradient id="exactCardCenterCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="30%" stopColor="#d1fae5" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
              </radialGradient>
              <radialGradient id="supernovaWhiteCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="70%" stopColor="#ecfdf5" stopOpacity="0.95" />
                <stop offset="90%" stopColor="#a7f3d0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.5" />
              </radialGradient>
            </defs>

            {/* 1. Concentric Radial Wave: Starts tiny (scale 0.15), swells steadily to 160px (scale 1.0), and holds bright white before blast */}
            <motion.circle
              cx="100"
              cy="200"
              r={circleRadius || 160}
              fill="url(#exactCardCenterCore)"
              initial={{ scale: previewAllBeams ? 1.0 : 0.15, opacity: previewAllBeams ? 0.95 : 0 }}
              animate={previewAllBeams ? {
                scale: 1.0,
                opacity: 0.95,
                fill: "url(#exactCardCenterCore)"
              } : {
                // Starts small green (0.15) at 0s, expands with accelerating Tak lights up to 2.4s, reaches 1.0 at 2.6s, morphs to blinding white and holds for 2s!
                scale: [0.15, 0.35, 0.65, 0.95, 1.0, 1.05],
                opacity: [0, 0.5, 0.8, 0.95, 1.0, 1.0],
                fill: [
                  "url(#exactCardCenterCore)",
                  "url(#exactCardCenterCore)",
                  "url(#exactCardCenterCore)",
                  "url(#supernovaWhiteCore)",
                  "url(#supernovaWhiteCore)",
                  "url(#supernovaWhiteCore)"
                ]
              }}
              transition={previewAllBeams ? { duration: 0.3 } : {
                duration: 4.5,
                times: [0, 0.25, 0.45, 0.6, 0.75, 1.0],
                ease: "easeInOut"
              }}
              style={{ mixBlendMode: "screen" }}
            />
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
        {/* TAP 3 / CLIMAX SPREADING TO ALL CORNERS & EMPTY EDGE SPACES */}
        {/* Spreads seamlessly with accelerating Tak waves on Tap 3 */}
        {/* ============================================================ */}
        {(crackStage >= 3 || previewAllBeams) && (
          <g key="crack-stage-3-empty-spaces">
            {/* --- WAVE 1 (0.15s): Spreading into Upper-Left & Upper-Right Empty Spaces --- */}
            <motion.path
              d="M 45 108 L 30 75 L 14 42 L 0 15 M 30 75 L 15 88 L 0 95 M 104 65 L 135 42 L 168 22 L 200 5 M 140 152 L 168 115 L 186 82 L 200 62"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                stroke: ["#10b981", "#34d399", "#d1fae5", "#ffffff"],
                strokeWidth: [2.5, 4.5]
              }}
              transition={{ duration: 3.2, delay: previewAllBeams ? 0 : 0.15, ease: "easeOut" }}
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
              transition={{ duration: 0.6, delay: previewAllBeams ? 0 : 0.15, ease: "easeOut" }}
            />

            {/* --- WAVE 2 (after 0.8s): Spreading into Mid-Left (Behind "TODAY") & Mid-Right (Behind "th day") Empty Spaces --- */}
            <motion.path
              d="M 26 172 L 12 188 L 0 205 M 26 172 L 8 155 L 0 145 M 182 148 L 195 165 L 200 185 M 155 210 L 180 235 L 200 252 M 85 248 L 55 235 L 20 220 L 0 215"
              stroke="#10b981"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                stroke: ["#10b981", "#34d399", "#d1fae5", "#ffffff"],
                strokeWidth: [2.2, 4.2]
              }}
              transition={{ duration: 2.8, delay: previewAllBeams ? 0 : 0.8, ease: "easeOut" }}
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
              transition={{ duration: 0.5, delay: previewAllBeams ? 0 : 0.8, ease: "easeOut" }}
            />

            {/* --- WAVE 3 (after 1.5s): Spreading into Bottom-Left & Bottom-Right Empty Corner Spaces --- */}
            <motion.path
              d="M 30 364 L 14 382 L 0 400 M 44 348 L 20 330 L 0 315 M 175 304 L 190 340 L 200 380 M 175 304 L 195 295 L 200 280 M 96 350 L 125 375 L 155 400 M 106 312 L 138 335 L 175 360 L 200 375"
              stroke="#10b981"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#pureGreenGlow)"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                stroke: ["#10b981", "#34d399", "#d1fae5", "#ffffff"],
                strokeWidth: [2.6, 5.0]
              }}
              transition={{ duration: 2.2, delay: previewAllBeams ? 0 : 1.5, ease: [0.12, 1, 0.28, 1] }}
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
              transition={{ duration: 0.45, delay: previewAllBeams ? 0 : 1.5, ease: [0.12, 1, 0.28, 1] }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Progressive, Realistic Broken Glass Cracking (Matching User's 4 Taps):
 * - ALL CRACKS DEVELOP SLOWLY AND NATURALLY:
 *   - Even small branch cracks take a full ~1.8s with slow physical deceleration!
 * 
 * - Tap 1:
 *   Single clean vertical fissure developing slowly from top to bottom (duration 1.8s).
 * 
 * - Tap 2:
 *   Natural secondary tension fractures creeping outward from the central spine SLOWLY (duration 2.0s),
 *   with subtle trapped emerald reflections inside the broken glass seams.
 * 
 * - Tap 3:
 *   Extensive glass spiderwebbing, interconnecting polygonal shard fissures, and impact starburst
 *   crawling slowly across the pane (duration 2.2s).
 * 
 * - Tap 4:
 *   DENSE SHATTERING NETWORK SPREADS VERY SLOWLY across the card (duration 2.5s),
 *   while VOLUMETRIC 3D GOD RAYS project beyond the card flooding the full screen like blinding emerald sunlight!
 *   Holds for 3.2 seconds before the final glass shatter!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  return (
    <>
      {/* 1. Card-Confined Glass Damaged Layer (Darkening + Crack SVG network) */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
        {/* Background Dimming as glass is damaged */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: crackStage >= 4 ? 0.88 : (crackStage === 3 ? 0.72 : (crackStage === 2 ? 0.48 : 0.22)) 
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-black/85 pointer-events-none rounded-3xl"
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
          {/* TAP 1: Clean Primary Spine Fracture (Shoots slowly down ~1.8s) */}
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
            transition={{ duration: 1.8, ease: [0.12, 0.9, 0.25, 1] }}
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
            transition={{ duration: 1.8, ease: [0.12, 0.9, 0.25, 1] }}
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
            transition={{ duration: 1.8, ease: [0.12, 0.9, 0.25, 1] }}
          />

          {/* ============================================================ */}
          {/* TAP 2: Natural Secondary Branch Fractures (Spreading slowly outward ~2.0s) */}
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
                transition={{ duration: 2.0, delay: 0.1, ease: [0.12, 0.9, 0.25, 1] }}
              />

              {/* Natural crystalline branch fracture lines (VERY SLOW CRAWL) */}
              <motion.path
                d="M 108 78 L 76 100 L 52 108 M 92 122 L 64 146 L 46 158 M 102 185 L 142 152 L 168 138 M 85 248 L 124 272 L 152 284 M 106 312 L 72 336 L 48 346"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.0, ease: [0.12, 0.9, 0.25, 1] }}
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
                transition={{ duration: 2.0, ease: [0.12, 0.9, 0.25, 1] }}
              />
            </g>
          )}

          {/* ============================================================ */}
          {/* TAP 3: Extensive Spiderwebbing & Shard Polygonal Fractures (Slow Crawl ~2.2s) */}
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
                transition={{ duration: 2.2, ease: [0.12, 0.9, 0.25, 1] }}
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
                transition={{ duration: 1.8, delay: 0.15, ease: [0.12, 0.9, 0.25, 1] }}
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
                transition={{ duration: 2.2, ease: [0.12, 0.9, 0.25, 1] }}
              />
            </g>
          )}

          {/* ============================================================ */}
          {/* TAP 4: Dense Glass Shatter Breakdown (Continuous Very Slow Spread ~2.5s) */}
          {/* ============================================================ */}
          {crackStage >= 4 && (
            <g>
              {/* Additional Dense Shatter Network: More micro-cracks breaking through every zone */}
              <motion.path
                d="M 52 108 L 30 114 M 46 158 L 24 165 M 168 138 L 188 128 M 152 284 L 182 294 M 48 346 L 26 354 M 98 15 L 68 40 M 104 65 L 132 45 M 92 122 L 122 110 M 88 180 L 68 215 M 110 200 L 138 230 M 85 248 L 54 260 M 106 312 L 136 335 M 96 350 L 64 375"
                stroke="#ffffff"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.4, ease: [0.12, 0.9, 0.25, 1] }}
              />

              {/* Cross-fissure micro stress web */}
              <motion.path
                d="M 68 40 L 52 108 M 132 45 L 142 152 M 68 215 L 82 284 M 138 230 L 124 272 M 54 260 L 48 346 M 136 335 L 102 385"
                stroke="rgba(167, 243, 208, 0.9)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, delay: 0.15, ease: [0.12, 0.9, 0.25, 1] }}
              />

              {/* Glowing hot white-mint edges before final shatter */}
              <motion.path
                d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385 M 108 78 L 76 100 L 52 108 M 92 122 L 64 146 M 102 185 L 142 152 M 85 248 L 124 272 M 106 312 L 72 336"
                stroke="#ffffff"
                strokeWidth="1.8"
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

      {/* 2. 3D FULL-SCREEN VOLUMETRIC EMERALD GOD RAYS (Stage 4) */}
      {/* Rendered outside card clipping: Projects deep into the room across the entire viewport! */}
      {isLightRaysCreeping && (
        <div className="fixed inset-0 pointer-events-none z-[120] overflow-hidden flex items-center justify-center">
          {/* Screen-Wide Atmospheric Volumetric Mist / Blinding Flash Pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.85, 0.7], 
              scale: [0.9, 1.25, 1.1] 
            }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(167,243,208,0.45)_0%,_rgba(16,185,129,0.3)_35%,_transparent_75%)] backdrop-blur-[2px]"
          />

          <svg 
            viewBox="0 0 1000 1000" 
            preserveAspectRatio="none"
            className="w-full h-full absolute inset-0 pointer-events-none overflow-visible"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              <radialGradient id="screenCenterBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#a7f3d0" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="fullScreenBeam1" x1="50%" y1="50%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="fullScreenBeam2" x1="50%" y1="50%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#a7f3d0" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="fullScreenBeam3" x1="50%" y1="50%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#6ee7b7" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="fullScreenBeam4" x1="50%" y1="50%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#a7f3d0" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <filter id="volumetricGodRayBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="16" />
              </filter>
            </defs>

            {/* Central Blinding Impact Core Bloom (originating from card center at 500, 500) */}
            <motion.circle
              cx="500"
              cy="500"
              r="120"
              fill="url(#screenCenterBloom)"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.2, 1.8, 1.5], opacity: [0, 1, 0.95] }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              filter="url(#volumetricGodRayBlur)"
            />

            {/* Huge 3D Crepuscular Shafts beaming completely out of the card across the whole screen */}
            {/* Beam 1: Top-Right Shaft shooting to the screen corner */}
            <motion.polygon
              points="500,500 540,460 1150,-150 850,-200"
              fill="url(#fullScreenBeam1)"
              filter="url(#volumetricGodRayBlur)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.95, 0.8], scale: 1 }}
              transition={{ duration: 2.0, delay: 0.05, ease: "easeOut" }}
              style={{ transformOrigin: "500px 500px" }}
            />

            {/* Beam 2: Far Right Shaft shooting across screen edge */}
            <motion.polygon
              points="500,500 520,530 1200,350 1180,680"
              fill="url(#fullScreenBeam1)"
              filter="url(#volumetricGodRayBlur)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0.75], scale: 1 }}
              transition={{ duration: 2.2, delay: 0.15, ease: "easeOut" }}
              style={{ transformOrigin: "500px 500px" }}
            />

            {/* Beam 3: Bottom-Right Shaft streaming downward */}
            <motion.polygon
              points="500,500 480,540 980,1200 680,1250"
              fill="url(#fullScreenBeam4)"
              filter="url(#volumetricGodRayBlur)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.95, 0.8], scale: 1 }}
              transition={{ duration: 2.4, delay: 0.1, ease: "easeOut" }}
              style={{ transformOrigin: "500px 500px" }}
            />

            {/* Beam 4: Bottom-Left Shaft streaming toward user bottom-left */}
            <motion.polygon
              points="500,500 460,520 -150,1180 -250,900"
              fill="url(#fullScreenBeam2)"
              filter="url(#volumetricGodRayBlur)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0.75], scale: 1 }}
              transition={{ duration: 2.1, delay: 0.08, ease: "easeOut" }}
              style={{ transformOrigin: "500px 500px" }}
            />

            {/* Beam 5: Far Left Shaft blazing across screen edge */}
            <motion.polygon
              points="500,500 470,470 -250,300 -220,600"
              fill="url(#fullScreenBeam2)"
              filter="url(#volumetricGodRayBlur)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.95, 0.8], scale: 1 }}
              transition={{ duration: 2.3, delay: 0.12, ease: "easeOut" }}
              style={{ transformOrigin: "500px 500px" }}
            />

            {/* Beam 6: Top-Left Shaft shooting to upper-left screen corner */}
            <motion.polygon
              points="500,500 480,450 -180,-150 150,-220"
              fill="url(#fullScreenBeam3)"
              filter="url(#volumetricGodRayBlur)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0.75], scale: 1 }}
              transition={{ duration: 2.2, delay: 0.02, ease: "easeOut" }}
              style={{ transformOrigin: "500px 500px" }}
            />

            {/* Beam 7: Top High Vertical Shaft cutting straight up through screen top */}
            <motion.polygon
              points="500,500 520,460 380,-250 620,-250"
              fill="url(#fullScreenBeam3)"
              filter="url(#volumetricGodRayBlur)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.95, 0.85], scale: 1 }}
              transition={{ duration: 2.1, delay: 0.06, ease: "easeOut" }}
              style={{ transformOrigin: "500px 500px" }}
            />

            {/* Beam 8: Bottom High Vertical Shaft cutting straight down through screen bottom */}
            <motion.polygon
              points="500,500 480,540 380,1250 620,1250"
              fill="url(#fullScreenBeam4)"
              filter="url(#volumetricGodRayBlur)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0.8], scale: 1 }}
              transition={{ duration: 2.3, delay: 0.14, ease: "easeOut" }}
              style={{ transformOrigin: "500px 500px" }}
            />
          </svg>
        </div>
      )}
    </>
  );
}

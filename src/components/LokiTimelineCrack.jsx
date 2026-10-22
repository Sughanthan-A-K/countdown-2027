import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Progressive, Realistic Broken Glass Cracking:
 * - Tap 1: Clean vertical hairline fracture shoots down smoothly.
 * - Tap 2: Primary branch fissures shoot outward from the spine with subtle emerald refraction.
 * - Tap 3: Interconnecting spiderweb polygon fissures + starburst stress lines.
 * - Tap 4 (Aggressive Cascading Fracture Waves):
 *   During the 2.5 seconds hold, fractures spread and multiply aggressively in 3 distinct timed waves:
 *     - Wave 1 (0.0s - 0.7s): Dense secondary branches shoot across all quadrants.
 *     - Wave 2 (0.6s - 1.4s): Deep cross-connecting micro-fractures splinter the glass panes into shards.
 *     - Wave 3 (1.2s - 2.0s): Full-surface perimeter spiderweb crazing and edge fractures spider across the entire card,
 *       while volumetric emerald crepuscular god rays beam through the fractured gaps,
 *       and the glass fractures widen and glow white-hot right before the final shatter!
 */
export default function LokiTimelineCrack({ crackStage = 0 }) {
  if (crackStage <= 0) return null;

  const isFullUniverse = crackStage >= 3;
  const isLightRaysCreeping = crackStage >= 4;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
      {/* Background Dimming as glass is damaged */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: crackStage >= 4 ? 0.88 : (crackStage === 3 ? 0.7 : (crackStage === 2 ? 0.45 : 0.2)) 
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black/85 pointer-events-none rounded-3xl"
      />

      {/* Behind-the-glass portal emerald glow (bleeding through crack gaps) */}
      {crackStage >= 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: crackStage >= 4 ? 0.95 : (crackStage === 3 ? 0.8 : 0.45),
            scale: crackStage >= 4 ? 1.4 : (crackStage === 3 ? 1.2 : 1.0),
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeOut"
          }}
          className="absolute w-80 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(16,185,129,0.55) 0%, rgba(5,150,105,0.25) 50%, transparent 75%)',
            filter: 'blur(30px)'
          }}
        />
      )}

      {/* Stage 4: Crepuscular emerald god rays projecting out through the broken glass fractures */}
      {isLightRaysCreeping && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              <radialGradient id="glassImpactBloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#a7f3d0" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="glassRay1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="glassRay2" x1="50%" y1="50%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#a7f3d0" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="glassRay3" x1="50%" y1="50%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#6ee7b7" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>

              <filter id="glassRayBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* Impact Center Point Bloom */}
            <motion.ellipse
              cx="102"
              cy="185"
              rx="24"
              ry="24"
              fill="url(#glassImpactBloom)"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.4, 1.6, 1.3], opacity: [0, 1, 0.9] }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              filter="url(#glassRayBlur)"
            />

            {/* Crepuscular Rays radiating out from fracture openings */}
            <motion.polygon
              points="102,185 145,150 380,-80 260,-120"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 2.0, delay: 0.1, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 118,190 420,120 400,240"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 2.1, delay: 0.25, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,250 320,520 200,560"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 2.2, delay: 0.15, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,250 -120,540 -180,420"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 2.0, delay: 0.12, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 88,125 -200,80 -220,190"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 2.1, delay: 0.18, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 106,75 -80,-100 -180,-30"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 2.2, delay: 0.05, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 98,15 40,-160 160,-160"
              fill="url(#glassRay3)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.85] }}
              transition={{ duration: 2.0, delay: 0.08, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 102,385 40,580 160,580"
              fill="url(#glassRay3)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 2.1, delay: 0.2, ease: "easeOut" }}
            />
          </svg>
        </div>
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
        {/* TAP 1: Clean Primary Spine Fracture (Shoots down ~1.4s) */}
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
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Main Glass Hairline Spine */}
        <motion.path
          d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385"
          stroke={crackStage >= 2 ? "#e6fffa" : "#ffffff"}
          strokeWidth={crackStage >= 4 ? "2.2" : (crackStage >= 3 ? "1.6" : "1.2")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ============================================================ */}
        {/* TAP 2: Natural Secondary Branch Fractures (Spreading ~1.5s) */}
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
              transition={{ duration: 1.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 3: Spiderwebbing & Interconnecting Polygon Fissures (~1.4s) */}
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
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* TAP 4: Aggressive Continuous Fracture Cascades (Multiplies & Spreads Across Card) */}
        {/* ============================================================ */}
        {crackStage >= 4 && (
          <g>
            {/* --- WAVE 1 (Starts 0.0s): Heavy Secondary Radial Fractures --- */}
            <motion.path
              d="M 52 108 L 28 114 L 10 118 M 46 158 L 22 165 L 8 168 M 168 138 L 188 128 L 198 122 M 152 284 L 182 294 L 196 300 M 48 346 L 24 354 L 12 358 M 98 15 L 68 40 L 45 62 M 104 65 L 136 44 L 160 30 M 92 122 L 124 108 L 155 98 M 88 180 L 64 214 L 40 236 M 110 200 L 140 228 L 170 248 M 85 248 L 52 262 L 28 274 M 106 312 L 138 335 L 165 352 M 96 350 L 62 376 L 38 390"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Wave 1 Emerald Seam Light */}
            <motion.path
              d="M 52 108 L 28 114 M 46 158 L 22 165 M 168 138 L 188 128 M 152 284 L 182 294 M 48 346 L 24 354 M 98 15 L 68 40 M 104 65 L 136 44 M 92 122 L 124 108 M 88 180 L 64 214 M 110 200 L 140 228 M 85 248 L 52 262 M 106 312 L 138 335 M 96 350 L 62 376"
              stroke="rgba(52, 211, 153, 0.9)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* --- WAVE 2 (Starts 0.5s): Dense Cross-Splintering into Fine Shards --- */}
            <motion.path
              d="M 45 62 L 76 100 M 160 30 L 142 152 M 155 98 L 168 138 M 28 114 L 46 158 M 64 214 L 82 284 M 140 228 L 124 272 M 170 248 L 152 284 M 52 262 L 48 346 M 138 335 L 102 385 M 62 376 L 102 385 M 22 165 L 40 236 M 188 128 L 170 248"
              stroke="#ffffff"
              strokeWidth="0.95"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* --- WAVE 3 (Starts 1.0s): Perimeter Spiderweb Crazing (Spreads to Every Corner) --- */}
            <motion.path
              d="M 10 118 L 8 168 L 22 200 L 40 236 M 198 122 L 190 180 L 196 300 M 45 62 L 20 50 L 10 118 M 160 30 L 180 50 L 198 122 M 28 274 L 12 358 L 38 390 M 196 300 L 185 360 L 165 352 L 140 380 L 102 385 M 68 40 L 98 15 L 136 44 M 92 170 L 64 146 M 114 174 L 142 152 M 110 200 L 124 272 M 90 194 L 85 248"
              stroke="rgba(240, 253, 244, 0.95)"
              strokeWidth="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Deep Glass Edge Luminescence & Vibration before shattering */}
            <motion.path
              d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385 M 108 78 L 76 100 L 52 108 M 92 122 L 64 146 M 102 185 L 142 152 M 85 248 L 124 272 M 106 312 L 72 336"
              stroke="#ffffff"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.7, 1, 0.85] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}

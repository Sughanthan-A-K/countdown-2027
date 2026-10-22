import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Progressive, Realistic Broken Glass Cracking:
 * - Tap 1: Clean vertical hairline fracture shoots down smoothly.
 * - Tap 2: Primary natural branch fissures spread outward from the spine with subtle emerald refraction.
 * - Tap 3: Interconnecting spiderweb polygon fissures + starburst stress lines.
 * - Tap 4 (Natural Creeping Glass Fractures over 4.0s before shatter):
 *   No artificial circular / polygon outlines! Pure natural jagged glass crack extensions.
 *   Develops very slowly and continuously across 4 full seconds:
 *     - Wave 1 (0.0s - 2.0s): Jagged crystalline fissures creep organically across all quadrants.
 *     - Wave 2 (1.8s - 3.4s): Secondary hairline micro-cracks spiderweb through the fragments.
 *     - Wave 3 (3.0s - 4.0s): High-intensity emerald crepuscular god rays project through the gaps,
 *       and fracture edges heat up to white-hot glow right as the 4.0s timer triggers the shatter!
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
          opacity: crackStage >= 4 ? 0.9 : (crackStage === 3 ? 0.7 : (crackStage === 2 ? 0.45 : 0.2)) 
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
            scale: crackStage >= 4 ? 1.4 : (crackStage === 3 ? 1.2 : 1.0),
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

      {/* Stage 4: Crepuscular emerald god rays projecting out through the broken glass fractures (Starts after 1.8s of cracking) */}
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

            {/* Impact Center Point Bloom (develops gradually as crack widens) */}
            <motion.ellipse
              cx="102"
              cy="185"
              rx="24"
              ry="24"
              fill="url(#glassImpactBloom)"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.3, 1.6, 1.4], opacity: [0, 0.4, 1] }}
              transition={{ duration: 3.5, delay: 0.5, ease: "easeOut" }}
              filter="url(#glassRayBlur)"
            />

            {/* Crepuscular Rays radiating out through the crack fissures */}
            <motion.polygon
              points="102,185 145,150 380,-80 260,-120"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.95] }}
              transition={{ duration: 2.5, delay: 1.2, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 118,190 420,120 400,240"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.9] }}
              transition={{ duration: 2.4, delay: 1.5, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,250 320,520 200,560"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.95] }}
              transition={{ duration: 2.5, delay: 1.3, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,250 -120,540 -180,420"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0.85] }}
              transition={{ duration: 2.4, delay: 1.4, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 88,125 -200,80 -220,190"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.95] }}
              transition={{ duration: 2.5, delay: 1.2, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 106,75 -80,-100 -180,-30"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0.85] }}
              transition={{ duration: 2.4, delay: 1.5, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 98,15 40,-160 160,-160"
              fill="url(#glassRay3)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 1] }}
              transition={{ duration: 2.5, delay: 1.1, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 102,385 40,580 160,580"
              fill="url(#glassRay3)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.35, 0.95] }}
              transition={{ duration: 2.5, delay: 1.3, ease: "easeOut" }}
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
        {/* TAP 4: Organic Jagged Fissures Creeping Across 4.0s (NO circles / NO fake polygons) */}
        {/* ============================================================ */}
        {crackStage >= 4 && (
          <g>
            {/* Wave 1 (0.0s - 2.0s): Natural Jagged Creeping Cracks (Extending branches outward naturally) */}
            <motion.path
              d="M 52 108 L 32 112 L 14 116 M 46 158 L 26 164 L 8 168 M 168 138 L 186 128 L 196 122 M 152 284 L 178 292 L 194 298 M 48 346 L 28 352 L 12 358 M 98 15 L 72 38 L 48 60 M 104 65 L 132 44 L 158 30 M 92 122 L 122 108 L 152 98 M 88 180 L 66 212 L 42 234 M 110 200 L 138 226 L 168 246 M 85 248 L 54 262 L 30 274 M 106 312 L 136 334 L 162 350 M 96 350 L 64 374 L 40 388"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Wave 1 Emerald Seam Underglow */}
            <motion.path
              d="M 52 108 L 32 112 L 14 116 M 46 158 L 26 164 L 8 168 M 168 138 L 186 128 L 196 122 M 152 284 L 178 292 L 194 298 M 48 346 L 28 352 L 12 358 M 98 15 L 72 38 L 48 60 M 104 65 L 132 44 L 158 30 M 92 122 L 122 108 L 152 98 M 88 180 L 66 212 M 110 200 L 138 226 M 85 248 L 54 262 M 106 312 L 136 334 M 96 350 L 64 374"
              stroke="rgba(52, 211, 153, 0.9)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Wave 2 (1.8s - 3.4s): Secondary Jagged Hairline Micro-Splinters (Creeping along shards) */}
            <motion.path
              d="M 72 38 L 94 50 M 48 60 L 76 100 M 132 44 L 142 80 M 158 30 L 168 85 M 122 108 L 118 162 M 66 212 L 82 284 M 138 226 L 124 272 M 54 262 L 48 346 M 136 334 L 102 385 M 64 374 L 102 385 M 32 112 L 26 164 M 186 128 L 168 246"
              stroke="rgba(240, 253, 244, 0.95)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Glowing hot white-mint edges right before shatter (at 3.2s -> 4.0s) */}
            <motion.path
              d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385 M 108 78 L 76 100 L 52 108 M 92 122 L 64 146 M 102 185 L 142 152 M 85 248 L 124 272 M 106 312 L 72 336"
              stroke="#ffffff"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.6, 1, 0.8] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}

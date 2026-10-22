import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Realistic Broken Glass Fractures for Dec 16:
 * - Natural glass fracture network with sharp, jagged crystalline crack fissures, spiderweb tension micro-fractures,
 *   and internal light reflections.
 * - Dynamic path drawing on EVERY crack tap:
 *   - Tap 1: Spine fracture shoots down smoothly from top to bottom (pathLength 0 -> 1).
 *   - Tap 2: Branch fissures shoot outward from the spine like real cracking glass (pathLength 0 -> 1).
 *   - Tap 3: Interconnecting spiderweb fissures & micro stress-fractures rapidly shoot and connect between shards (pathLength 0 -> 1).
 *   - Tap 4: High-intensity crepuscular green god rays project through the gaps, holding for 2 seconds before shatter!
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
        animate={{ opacity: isFullUniverse ? 0.75 : (crackStage === 2 ? 0.45 : 0.2) }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 bg-black/80 pointer-events-none rounded-3xl"
      />

      {/* Behind-the-glass portal emerald glow (bleeding only through the crack gaps) */}
      {crackStage >= 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isFullUniverse ? [0.6, 0.9, 0.6] : 0.4,
            scale: isFullUniverse ? 1.25 : 1.0,
          }}
          transition={{ 
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-80 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(16,185,129,0.5) 0%, rgba(5,150,105,0.25) 45%, transparent 75%)',
            filter: 'blur(28px)'
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
              rx="22"
              ry="22"
              fill="url(#glassImpactBloom)"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.5, 1.4, 1.2], opacity: [0, 1, 0.9] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              filter="url(#glassRayBlur)"
            />

            {/* Crepuscular Rays radiating out from fracture openings */}
            <motion.polygon
              points="102,185 145,150 380,-80 260,-120"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.6, delay: 0.05, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 118,190 420,120 400,240"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.7, delay: 0.15, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,250 320,520 200,560"
              fill="url(#glassRay1)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 85,250 -120,540 -180,420"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.6, delay: 0.08, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 88,125 -200,80 -220,190"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.7, delay: 0.12, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 106,75 -80,-100 -180,-30"
              fill="url(#glassRay2)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.7] }}
              transition={{ duration: 1.8, delay: 0.02, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 98,15 40,-160 160,-160"
              fill="url(#glassRay3)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.8] }}
              transition={{ duration: 1.6, delay: 0.06, ease: "easeOut" }}
            />
            <motion.polygon
              points="102,185 102,385 40,580 160,580"
              fill="url(#glassRay3)"
              filter="url(#glassRayBlur)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.75] }}
              transition={{ duration: 1.7, delay: 0.14, ease: "easeOut" }}
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
            <feGaussianBlur stdDeviation={crackStage >= 3 ? "1.8" : "1.0"} />
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* LAYER 1: Deep Emerald Seam Glow (Bleeding only inside the fissure gaps) */}
        {/* ============================================================ */}
        {crackStage >= 2 && (
          <g>
            {/* Primary Fissure Emerald Underglow */}
            <motion.path
              d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385"
              stroke="#059669"
              strokeWidth={crackStage >= 4 ? "4.5" : (crackStage >= 3 ? "3.2" : "2")}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glassRefract)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Branch Seams Underglow */}
            <motion.path
              d="M 108 78 L 74 102 L 52 110 L 30 114 M 92 122 L 62 148 L 44 162 M 102 185 L 145 150 L 172 135 M 85 248 L 128 274 L 160 286 M 106 312 L 68 338 L 42 348"
              stroke="#10b981"
              strokeWidth={crackStage >= 4 ? "3.2" : (crackStage >= 3 ? "2.2" : "1.4")}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glassRefract)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* LAYER 2: Primary Spine Fracture (Shooting down smoothly on Tap 1) */}
        {/* ============================================================ */}
        {/* Shadow seam behind the glass crack (gives realistic physical depth) */}
        <motion.path
          d="M 98.5 15.5 L 104.5 65.5 L 108.5 78.5 L 92.5 122.5 L 102.5 185.5 L 85.5 248.5 L 106.5 312.5 L 96.5 350.5 L 102.5 385.5"
          stroke="rgba(0, 0, 0, 0.7)"
          strokeWidth={crackStage >= 3 ? "2" : "1.2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Main Glass Fracture Edge (Crisp crystalline hairline shooting down) */}
        <motion.path
          d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385"
          stroke={crackStage >= 3 ? "#e6fffa" : "#ffffff"}
          strokeWidth={crackStage >= 4 ? "2" : (crackStage >= 3 ? "1.5" : "1.1")}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          opacity={0.95}
        />

        {/* Parallel double-refraction line shooting down with the crack */}
        <motion.path
          d="M 99.5 15 L 105.5 65 L 109.5 78 L 93.5 122 L 103.5 185 L 86.5 248 L 107.5 312 L 97.5 350 L 103.5 385"
          stroke={crackStage >= 2 ? "rgba(110, 231, 183, 0.75)" : "rgba(255, 255, 255, 0.5)"}
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ============================================================ */}
        {/* LAYER 3: Stage 2 - Branching Tension Cracks (Shooting outward from spine) */}
        {/* ============================================================ */}
        {crackStage >= 2 && (
          <g>
            {/* Branch fracture paths shooting outward like live cracking glass */}
            <motion.path
              d="M 108 78 L 74 102 L 52 110 L 30 114 M 92 122 L 62 148 L 44 162 M 102 185 L 145 150 L 172 135 M 85 248 L 128 274 L 160 286 M 106 312 L 68 338 L 42 348"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Branch emerald refraction shooting along with the cracks */}
            <motion.path
              d="M 109 79 L 75 103 L 53 111 M 93 123 L 63 149 M 103 186 L 146 151 M 86 249 L 129 275 M 107 313 L 69 339"
              stroke="rgba(52, 211, 153, 0.8)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* LAYER 4: Stage 3 & 4 - Spiderweb Micro-Fractures (Shooting and interconnecting) */}
        {/* ============================================================ */}
        {crackStage >= 3 && (
          <g>
            {/* Fine secondary spiderwebbing connecting across shards */}
            <motion.path
              d="M 74 102 L 62 148 M 62 148 L 88 180 M 102 185 L 115 160 L 145 150 M 145 150 L 152 210 L 128 274 M 85 248 L 80 285 L 106 312 M 74 102 L 95 85 M 128 274 L 110 300 M 68 338 L 88 360"
              stroke="#ffffff"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Tiny crystalline glass stress fractures around impact point (102, 185) */}
            <motion.path
              d="M 102 185 L 94 172 M 102 185 L 112 176 M 102 185 L 108 198 M 102 185 L 92 192 M 102 185 L 100 168 M 102 185 L 116 188"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Emerald light bleeding through micro-gaps */}
            <motion.path
              d="M 74 102 L 62 148 M 102 185 L 115 160 M 145 150 L 152 210 M 85 248 L 80 285"
              stroke="rgba(52, 211, 153, 0.75)"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* LAYER 5: Stage 4 - White-hot glass edges before shattering */}
        {/* ============================================================ */}
        {isLightRaysCreeping && (
          <motion.path
            d="M 98 15 L 104 65 L 108 78 L 92 122 L 102 185 L 85 248 L 106 312 L 96 350 L 102 385 M 108 78 L 74 102 L 52 110 M 92 122 L 62 148 M 102 185 L 145 150 M 85 248 L 128 274 M 106 312 L 68 338"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}

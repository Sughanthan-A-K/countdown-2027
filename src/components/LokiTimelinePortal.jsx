import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelinePortal
 * 
 * Exact 1:1 match with user's reference image:
 * - Screen completely flooded with ethereal, atmospheric emerald aurora glow and reflections.
 * - Central vertical opening is an organic, irregular portal rift with rugged, frayed, torn cloud-like borders
 *   (exactly like the rift in the Loki Season 2 finale screenshot where the loom fabric tears open).
 * - A distant celestial cosmic void visible inside the rift with a soft focal light origin.
 * - Organic dark timeline branches/vines rendered with pure, ultra-smooth SVG curves, perfectly continuous
 *   and naturally swaying via soft rotational/translational transforms without any broken or kinked kinks.
 */
export default function LokiTimelinePortal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[80] overflow-hidden">
      {/* 1. Full Page Deep Emerald Atmospheric Glow & Reflection (Flooding the entire screen like in reference) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[#021811]"
      />

      {/* Broad luminous aurora fields across the entire background */}
      <motion.div
        animate={{
          opacity: [0.75, 0.95, 0.75],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 55% 50%, rgba(16,185,129,0.7) 0%, rgba(5,150,105,0.5) 35%, rgba(4,120,87,0.35) 60%, rgba(2,44,34,0.85) 90%)',
          filter: 'blur(30px)'
        }}
      />

      {/* SVG Organic Distortion Filters for the irregular jagged portal border ONLY */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="lokiOrganicRiftEdge" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <filter id="smoothBranchGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#010f0b" floodOpacity="0.9" />
          </filter>
        </defs>
      </svg>

      {/* 2. The Organic Asymmetrical Portal Opening (Matching reference image shape) */}
      <div className="absolute inset-y-0 w-full max-w-[420px] flex items-center justify-center pointer-events-none">
        {/* Outer illuminated cloudy rift lip */}
        <motion.div
          animate={{
            scaleX: [0.96, 1.04, 0.96],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-full w-56 sm:w-64 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(167,243,208,0.9) 0%, rgba(52,211,153,0.7) 35%, rgba(16,185,129,0.4) 65%, transparent 85%)',
            filter: 'url(#lokiOrganicRiftEdge) blur(12px)'
          }}
        />

        {/* Inner Void / Deep Spacetime Tear (Irregular non-linear opening) */}
        <motion.div
          animate={{
            scaleY: [0.98, 1.02, 0.98],
            scaleX: [0.95, 1.05, 0.95]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-[110%] w-24 sm:w-32 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, #052e24 0%, #022018 45%, #01140e 75%, transparent 100%)',
            borderLeft: '3px solid rgba(209,250,229,0.85)',
            borderRight: '3px solid rgba(209,250,229,0.85)',
            boxShadow: '0 0 45px rgba(52,211,153,0.9), inset 0 0 35px rgba(0,0,0,0.85)',
            filter: 'url(#lokiOrganicRiftEdge) blur(4px)'
          }}
        />

        {/* Soft Point of Light Origin (The distant nexus glimmer seen in reference image) */}
        <motion.div
          animate={{
            scale: [0.85, 1.25, 0.85],
            opacity: [0.75, 1, 0.75]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[62%] w-10 h-10 rounded-full bg-emerald-200/90 blur-md shadow-[0_0_40px_#a7f3d0,0_0_80px_#34d399] pointer-events-none"
        />

        {/* Intense white-mint core tear spine */}
        <motion.div
          animate={{
            opacity: [0.85, 1, 0.85],
            scaleX: [0.9, 1.2, 0.9]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-full w-4 sm:w-5 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(209,250,229,0.95) 25%, #ffffff 60%, rgba(167,243,208,0.9) 85%, rgba(255,255,255,0.1) 100%)',
            boxShadow: '0 0 25px #6ee7b7, 0 0 50px #10b981',
            filter: 'url(#lokiOrganicRiftEdge) blur(3px)'
          }}
        />
      </div>

      {/* 3. Dark Multiverse Timeline Branches (Rigid, interactive draggable branches placed in front with z-10) */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Branch 1: Upper graceful arc crossing from beyond left (-150) to beyond right (1150) */}
        <motion.g
          animate={{ 
            y: [-14, 14, -14],
            x: [-8, 8, -8],
            rotate: [-0.8, 0.8, -0.8]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "500px 300px" }}
        >
          <motion.g
            drag
            dragSnapToOrigin
            dragElastic={0.035}
            dragConstraints={{ left: -100, right: 100, top: -70, bottom: 70 }}
            dragTransition={{ 
              power: 0,
              timeConstant: 1800,
              bounceStiffness: 12, 
              bounceDamping: 22 
            }}
            whileDrag={{ cursor: 'grabbing' }}
            className="pointer-events-auto cursor-grab"
            style={{ transformOrigin: "500px 300px" }}
          >
            {/* Invisible extra-wide hit-area stroke for effortless grab anywhere across the branch */}
            <path
              d="M -150 220 Q 250 340, 500 370 T 1150 390"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.001"
              strokeWidth="90"
              strokeLinecap="round"
            />
            {/* Ambient drop shadow */}
            <path
              d="M -150 220 Q 250 340, 500 370 T 1150 390"
              fill="none"
              stroke="#000000"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Main Dark Silhouette Body */}
            <path
              d="M -150 220 Q 250 340, 500 370 T 1150 390"
              fill="none"
              stroke="#050a08"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Subtle Darkest Emerald Edge Glint */}
            <path
              d="M -150 219 Q 250 339, 500 369 T 1150 389"
              fill="none"
              stroke="#062d22"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </motion.g>
        </motion.g>

        {/* Branch 2: High Sweeping gentle branch */}
        <motion.g
          animate={{ 
            y: [12, -12, 12],
            x: [6, -6, 6],
            rotate: [1.0, -1.0, 1.0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ transformOrigin: "500px 150px" }}
        >
          <motion.g
            drag
            dragSnapToOrigin
            dragElastic={0.035}
            dragConstraints={{ left: -100, right: 100, top: -70, bottom: 70 }}
            dragTransition={{ 
              power: 0,
              timeConstant: 1800,
              bounceStiffness: 12, 
              bounceDamping: 22 
            }}
            whileDrag={{ cursor: 'grabbing' }}
            className="pointer-events-auto cursor-grab"
            style={{ transformOrigin: "500px 150px" }}
          >
            <path
              d="M -120 70 Q 400 160, 680 140 T 1120 180"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.001"
              strokeWidth="90"
              strokeLinecap="round"
            />
            <path
              d="M -120 70 Q 400 160, 680 140 T 1120 180"
              fill="none"
              stroke="#000000"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M -120 70 Q 400 160, 680 140 T 1120 180"
              fill="none"
              stroke="#050a08"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M -120 69 Q 400 159, 680 139 T 1120 179"
              fill="none"
              stroke="#062d22"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </motion.g>
        </motion.g>

        {/* Branch 3: Lower Ascending Vine (Smooth continuous bezier curve) */}
        <motion.g
          animate={{ 
            y: [-16, 16, -16],
            x: [-6, 6, -6],
            rotate: [-0.9, 0.9, -0.9]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transformOrigin: "500px 750px" }}
        >
          <motion.g
            drag
            dragSnapToOrigin
            dragElastic={0.035}
            dragConstraints={{ left: -100, right: 100, top: -70, bottom: 70 }}
            dragTransition={{ 
              power: 0,
              timeConstant: 1800,
              bounceStiffness: 12, 
              bounceDamping: 22 
            }}
            whileDrag={{ cursor: 'grabbing' }}
            className="pointer-events-auto cursor-grab"
            style={{ transformOrigin: "500px 750px" }}
          >
            <path
              d="M -150 820 Q 200 720, 520 670 T 1150 860"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.001"
              strokeWidth="90"
              strokeLinecap="round"
            />
            <path
              d="M -150 820 Q 200 720, 520 670 T 1150 860"
              fill="none"
              stroke="#000000"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M -150 820 Q 200 720, 520 670 T 1150 860"
              fill="none"
              stroke="#050a08"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M -150 819 Q 200 719, 520 669 T 1150 859"
              fill="none"
              stroke="#062d22"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.6"
            />
          </motion.g>
        </motion.g>

        {/* Branch 4: Long Diagonal Branch crossing gracefully through the rift */}
        <motion.g
          animate={{ 
            x: [-12, 12, -12],
            y: [10, -10, 10],
            rotate: [-0.6, 0.6, -0.6]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "500px 500px" }}
        >
          <motion.g
            drag
            dragSnapToOrigin
            dragElastic={0.035}
            dragConstraints={{ left: -100, right: 100, top: -70, bottom: 70 }}
            dragTransition={{ 
              power: 0,
              timeConstant: 1800,
              bounceStiffness: 12, 
              bounceDamping: 22 
            }}
            whileDrag={{ cursor: 'grabbing' }}
            className="pointer-events-auto cursor-grab"
            style={{ transformOrigin: "500px 500px" }}
          >
            <path
              d="M 1150 80 Q 750 380, 450 550 T -120 880"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.001"
              strokeWidth="90"
              strokeLinecap="round"
            />
            <path
              d="M 1150 80 Q 750 380, 450 550 T -120 880"
              fill="none"
              stroke="#000000"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M 1150 80 Q 750 380, 450 550 T -120 880"
              fill="none"
              stroke="#050a08"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 1150 79 Q 750 379, 450 549 T -120 879"
              fill="none"
              stroke="#062d22"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </motion.g>
        </motion.g>

        {/* Branch 5: Mid-lower gentle horizontal vine */}
        <motion.g
          animate={{ 
            y: [12, -12, 12],
            x: [8, -8, 8],
            rotate: [0.7, -0.7, 0.7]
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          style={{ transformOrigin: "500px 520px" }}
        >
          <motion.g
            drag
            dragSnapToOrigin
            dragElastic={0.035}
            dragConstraints={{ left: -100, right: 100, top: -70, bottom: 70 }}
            dragTransition={{ 
              power: 0,
              timeConstant: 1800,
              bounceStiffness: 12, 
              bounceDamping: 22 
            }}
            whileDrag={{ cursor: 'grabbing' }}
            className="pointer-events-auto cursor-grab"
            style={{ transformOrigin: "500px 520px" }}
          >
            <path
              d="M -100 480 Q 300 420, 650 490 T 1150 510"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.001"
              strokeWidth="90"
              strokeLinecap="round"
            />
            <path
              d="M -100 480 Q 300 420, 650 490 T 1150 510"
              fill="none"
              stroke="#000000"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M -100 480 Q 300 420, 650 490 T 1150 510"
              fill="none"
              stroke="#050a08"
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <path
              d="M -100 479 Q 300 419, 650 489 T 1150 509"
              fill="none"
              stroke="#062d22"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.6"
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}

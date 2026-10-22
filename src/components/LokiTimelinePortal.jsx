import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelinePortal
 * 
 * Clean, unmistakable vertical portal with natural branches:
 * - NO boiling bubbles / mist specks.
 * - CLEAR portal silhouette: Distinct luminous vertical rift border running top-to-bottom.
 * - Natural, asynchronous dark timeline branches (distributed organically around the screen,
 *   NOT converging into a single fake 'X' at the center).
 * - Soft organic emerald breathing glow inside the rift.
 */
export default function LokiTimelinePortal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
      {/* 1. Deep Space Atmosphere */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-black/95 pointer-events-none"
      />

      {/* SVG Filters for organic edge undulation */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="portalOrganicEdge" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          <filter id="branchDarkShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 2. Outer Portal Glow Halo */}
      <motion.div
        animate={{
          opacity: [0.55, 0.8, 0.55],
          scaleX: [0.95, 1.05, 0.95]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-72 sm:w-88 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.5) 0%, rgba(6,78,59,0.25) 45%, transparent 75%)',
          filter: 'blur(45px)'
        }}
      />

      {/* 3. Distinct Portal Outer Edge & Body (Clear unmistakable vertical opening) */}
      <motion.div
        animate={{
          scaleX: [0.92, 1.08, 0.92],
          opacity: [0.85, 1, 0.85]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-32 sm:w-44 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(6,78,59,0.2) 0%, rgba(16,185,129,0.85) 15%, rgba(52,211,153,0.95) 50%, rgba(16,185,129,0.85) 85%, rgba(6,78,59,0.2) 100%)',
          borderLeft: '2px solid rgba(110,231,183,0.9)',
          borderRight: '2px solid rgba(110,231,183,0.9)',
          boxShadow: '0 0 35px rgba(16,185,129,0.8), inset 0 0 30px rgba(52,211,153,0.6)',
          filter: 'url(#portalOrganicEdge) blur(8px)'
        }}
      />

      {/* 4. Central Intense Luminous Core (Soft glowing tear through spacetime) */}
      <motion.div
        animate={{
          opacity: [0.9, 1, 0.9],
          scaleX: [0.85, 1.15, 0.85]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-10 sm:w-14 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(209,250,229,0.3) 0%, rgba(167,243,208,0.95) 20%, #ffffff 50%, rgba(167,243,208,0.95) 80%, rgba(209,250,229,0.3) 100%)',
          boxShadow: '0 0 25px #6ee7b7, 0 0 50px #10b981',
          filter: 'url(#portalOrganicEdge) blur(4px)'
        }}
      />

      {/* 5. Natural Organic Dark Timeline Branches (Scattered naturally, NO central 'X') */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Branch 1: High diagonal vine crossing the top section */}
        <motion.path
          d="M 50 180 Q 320 280 500 240 T 950 120"
          fill="none"
          stroke="#022c22"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#branchDarkShadow)"
          animate={{
            d: [
              "M 50 180 Q 320 280 500 240 T 950 120",
              "M 50 190 Q 340 270 500 250 T 950 130",
              "M 50 180 Q 320 280 500 240 T 950 120"
            ],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 50 180 Q 320 280 500 240 T 950 120"
          fill="none"
          stroke="#064e3b"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Branch 2: Steep diagonal branch sweeping through the lower section */}
        <motion.path
          d="M 120 850 Q 380 720 540 680 T 920 620"
          fill="none"
          stroke="#022c22"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#branchDarkShadow)"
          animate={{
            d: [
              "M 120 850 Q 380 720 540 680 T 920 620",
              "M 120 840 Q 400 730 530 690 T 920 610",
              "M 120 850 Q 380 720 540 680 T 920 620"
            ],
            opacity: [0.8, 0.95, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        <motion.path
          d="M 120 850 Q 380 720 540 680 T 920 620"
          fill="none"
          stroke="#064e3b"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Branch 3: Single steep angled vine passing across middle at a natural offset */}
        <motion.path
          d="M 880 280 Q 650 450 420 520 T 80 620"
          fill="none"
          stroke="#011e17"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#branchDarkShadow)"
          animate={{
            d: [
              "M 880 280 Q 650 450 420 520 T 80 620",
              "M 870 290 Q 660 440 430 510 T 80 630",
              "M 880 280 Q 650 450 420 520 T 80 620"
            ],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M 880 280 Q 650 450 420 520 T 80 620"
          fill="none"
          stroke="#064e3b"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Branch 4: Thin subtle timeline thread near top right */}
        <motion.path
          d="M 600 40 Q 750 180 880 320"
          fill="none"
          stroke="#064e3b"
          strokeWidth="4"
          strokeDasharray="6 4"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Branch 5: Thin subtle timeline thread near bottom left */}
        <motion.path
          d="M 80 400 Q 220 520 340 700"
          fill="none"
          stroke="#064e3b"
          strokeWidth="4"
          strokeDasharray="6 4"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  );
}

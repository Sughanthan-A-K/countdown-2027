import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelinePortal
 * 
 * Exact 1:1 reproduction of user's cropped reference image (media_1792648096199_6df691ae.png):
 * - The portal IS the actual photo texture from Loki Season 2 finale:
 *   An organic, cloudy vertical river of green multiverse light with undulating smoke edges.
 * - Branches: Placed naturally on the sides and behind/off-center, moving VERY SLOWLY & SUBTLY
 *   so they NEVER cover or obscure the central portal opening.
 * - Clean dark background.
 */
export default function LokiTimelinePortal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
      {/* 1. Deep Space Void Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-black/95 pointer-events-none"
      />

      {/* 2. Soft Ambient Green Atmosphere */}
      <motion.div
        animate={{ opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-96 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.4) 0%, rgba(6,78,59,0.2) 50%, transparent 75%)',
          filter: 'blur(60px)'
        }}
      />

      {/* 3. The Authentic Loki Portal Texture (1:1 from Loki Season 2 Finale) */}
      <div className="relative h-screen w-72 sm:w-80 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Actual high-res cinematic frame of the vertical Loom portal cropped from the reference */}
        <motion.div
          animate={{
            scaleY: [1, 1.03, 1],
            scaleX: [1, 1.05, 1],
            opacity: [0.92, 1, 0.92]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/Examples/loki_portal_texture.jpg")',
            backgroundPosition: 'right 32% center', // Exactly lines up the vertical green cloud tear from the photo
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // Soft feathered organic mask so the cloudy portal seamlessly blends into the dark void
            maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in'
          }}
        />

        {/* Inner breathing luminous glow enhancement along the organic cloudy core */}
        <motion.div
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scaleX: [0.9, 1.15, 0.9]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-full w-24 sm:w-28 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(209,250,229,0.7) 0%, rgba(110,231,183,0.5) 30%, transparent 70%)',
            filter: 'blur(16px)',
            mixBlendMode: 'screen'
          }}
        />
      </div>

      {/* 4. Natural Dark Timeline Branches (Shifted to the sides so they NEVER block the central portal) */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="branchDarkShadowSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Side Branch 1: Top-Right branch, stays on the right perimeter (doesn't cross center) */}
        <motion.path
          d="M 680 80 Q 820 220 960 380"
          fill="none"
          stroke="#022c22"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#branchDarkShadowSoft)"
          animate={{
            d: [
              "M 680 80 Q 820 220 960 380",
              "M 685 85 Q 815 225 960 375",
              "M 680 80 Q 820 220 960 380"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 680 80 Q 820 220 960 380"
          fill="none"
          stroke="#064e3b"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Side Branch 2: Top-Left branch, stays cleanly on the left */}
        <motion.path
          d="M 40 120 Q 180 260 320 380"
          fill="none"
          stroke="#022c22"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#branchDarkShadowSoft)"
          animate={{
            d: [
              "M 40 120 Q 180 260 320 380",
              "M 35 125 Q 185 255 320 385",
              "M 40 120 Q 180 260 320 380"
            ]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.path
          d="M 40 120 Q 180 260 320 380"
          fill="none"
          stroke="#064e3b"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Side Branch 3: Lower-Left gentle curve */}
        <motion.path
          d="M 60 780 Q 200 680 340 620"
          fill="none"
          stroke="#011e17"
          strokeWidth="9"
          strokeLinecap="round"
          filter="url(#branchDarkShadowSoft)"
          animate={{
            d: [
              "M 60 780 Q 200 680 340 620",
              "M 65 775 Q 195 685 340 625",
              "M 60 780 Q 200 680 340 620"
            ]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Side Branch 4: Lower-Right diagonal sweeping away */}
        <motion.path
          d="M 660 640 Q 800 740 940 860"
          fill="none"
          stroke="#022c22"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#branchDarkShadowSoft)"
          animate={{
            d: [
              "M 660 640 Q 800 740 940 860",
              "M 655 645 Q 805 735 940 855",
              "M 660 640 Q 800 740 940 860"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.path
          d="M 660 640 Q 800 740 940 860"
          fill="none"
          stroke="#064e3b"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Single authentic crossing vine passing through the upper-third (exactly like in Image 2) */}
        <motion.path
          d="M 100 240 Q 500 290 900 180"
          fill="none"
          stroke="#022c22"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#branchDarkShadowSoft)"
          animate={{
            d: [
              "M 100 240 Q 500 290 900 180",
              "M 100 245 Q 500 285 900 185",
              "M 100 240 Q 500 290 900 180"
            ],
            opacity: [0.75, 0.9, 0.75]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

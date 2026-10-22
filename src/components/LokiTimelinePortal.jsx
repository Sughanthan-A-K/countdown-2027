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
 * - Organic dark timeline branches/vines weaving through the scene, animated with very slow, gentle, hypnotic drift (no artificial dashed lines).
 */
export default function LokiTimelinePortal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
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

      {/* SVG Organic Distortion Filters for the irregular jagged portal border */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="lokiOrganicRiftEdge" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <filter id="branchDeepShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 2. The Organic Asymmetrical Portal Opening (Matching reference image shape) */}
      <div className="absolute inset-y-0 w-full max-w-[420px] flex items-center justify-center">
        {/* Outer illuminated cloudy rift lip */}
        <motion.div
          animate={{
            scaleX: [0.96, 1.04, 0.96],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-full w-56 sm:w-64"
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
          className="absolute h-[110%] w-24 sm:w-32"
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
          className="absolute top-[62%] w-10 h-10 rounded-full bg-emerald-200/90 blur-md shadow-[0_0_40px_#a7f3d0,0_0_80px_#34d399]"
        />

        {/* Intense white-mint core tear spine */}
        <motion.div
          animate={{
            opacity: [0.85, 1, 0.85],
            scaleX: [0.9, 1.2, 0.9]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-full w-4 sm:w-5"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(209,250,229,0.95) 25%, #ffffff 60%, rgba(167,243,208,0.9) 85%, rgba(255,255,255,0.1) 100%)',
            boxShadow: '0 0 25px #6ee7b7, 0 0 50px #10b981',
            filter: 'url(#lokiOrganicRiftEdge) blur(3px)'
          }}
        />
      </div>

      {/* 3. Dark Multiverse Timeline Branches (Completely solid, organic vine curves - ZERO dashed lines, hypnotic slow natural sway) */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Branch 1: Natural heavy arc crossing upper left down toward right */}
        <motion.path
          d="M 40 220 C 220 280, 380 320, 520 420 C 650 510, 780 480, 960 410"
          fill="none"
          stroke="#021c15"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#branchDeepShadow)"
          animate={{
            d: [
              "M 40 220 C 220 280, 380 320, 520 420 C 650 510, 780 480, 960 410",
              "M 40 240 C 230 265, 395 340, 520 405 C 640 525, 770 495, 960 430",
              "M 40 220 C 220 280, 380 320, 520 420 C 650 510, 780 480, 960 410"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 40 220 C 220 280, 380 320, 520 420 C 650 510, 780 480, 960 410"
          fill="none"
          stroke="#043828"
          strokeWidth="4.5"
          strokeLinecap="round"
          animate={{
            d: [
              "M 40 220 C 220 280, 380 320, 520 420 C 650 510, 780 480, 960 410",
              "M 40 240 C 230 265, 395 340, 520 405 C 640 525, 770 495, 960 430",
              "M 40 220 C 220 280, 380 320, 520 420 C 650 510, 780 480, 960 410"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Branch 2: High sweeping branch crossing the upper void */}
        <motion.path
          d="M 120 80 C 350 150, 620 120, 880 210"
          fill="none"
          stroke="#021c15"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#branchDeepShadow)"
          animate={{
            d: [
              "M 120 80 C 350 150, 620 120, 880 210",
              "M 120 105 C 335 135, 635 145, 880 190",
              "M 120 80 C 350 150, 620 120, 880 210"
            ]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.path
          d="M 120 80 C 350 150, 620 120, 880 210"
          fill="none"
          stroke="#043828"
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={{
            d: [
              "M 120 80 C 350 150, 620 120, 880 210",
              "M 120 105 C 335 135, 635 145, 880 190",
              "M 120 80 C 350 150, 620 120, 880 210"
            ]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Branch 3: Lower sweeping tendril ascending across center */}
        <motion.path
          d="M 80 780 C 260 740, 480 620, 640 670 C 780 710, 860 810, 940 860"
          fill="none"
          stroke="#021c15"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#branchDeepShadow)"
          animate={{
            d: [
              "M 80 780 C 260 740, 480 620, 640 670 C 780 710, 860 810, 940 860",
              "M 80 760 C 275 755, 465 640, 640 650 C 765 730, 875 790, 940 840",
              "M 80 780 C 260 740, 480 620, 640 670 C 780 710, 860 810, 940 860"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.path
          d="M 80 780 C 260 740, 480 620, 640 670 C 780 710, 860 810, 940 860"
          fill="none"
          stroke="#043828"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: [
              "M 80 780 C 260 740, 480 620, 640 670 C 780 710, 860 810, 940 860",
              "M 80 760 C 275 755, 465 640, 640 650 C 765 730, 875 790, 940 840",
              "M 80 780 C 260 740, 480 620, 640 670 C 780 710, 860 810, 940 860"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Branch 4: Thin organic solid secondary tendrils (NO dashed lines) */}
        <motion.path
          d="M 280 340 C 420 460, 560 520, 740 620"
          fill="none"
          stroke="#021c15"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#branchDeepShadow)"
          animate={{
            d: [
              "M 280 340 C 420 460, 560 520, 740 620",
              "M 280 355 C 430 450, 550 535, 740 610",
              "M 280 340 C 420 460, 560 520, 740 620"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
          d="M 720 180 C 580 320, 440 480, 260 580"
          fill="none"
          stroke="#032b1f"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#branchDeepShadow)"
          animate={{
            d: [
              "M 720 180 C 580 320, 440 480, 260 580",
              "M 720 195 C 570 310, 450 495, 260 570",
              "M 720 180 C 580 320, 440 480, 260 580"
            ]
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </svg>
    </div>
  );
}

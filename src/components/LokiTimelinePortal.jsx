import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelinePortal
 * 
 * 1:1 Recreation of the iconic scene from Loki Season 2 finale ("God of Stories"):
 * When Loki steps out onto the gangway and breaks open the Loom to hold the timelines.
 * 
 * In the user's reference image (public/Examples/Loki Portal.jpg):
 * - A powerful, towering VERTICAL glowing green tear/pillar of timeline energy stands behind Loki.
 * - Glowing green timeline threads & living branches (the multiverse branches Loki grabs) weave into it.
 * - Deep dark emerald cosmos ambience.
 * - Pulsing core energy running vertically across the entire screen height.
 */
export default function LokiTimelinePortal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
      {/* 1. Deep Emerald Multiverse Atmosphere */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,78,59,0.5)_0%,_rgba(2,44,34,0.7)_40%,_rgba(0,0,0,0.95)_75%)]"
      />

      {/* 2. Living Timeline Branches / Strands Weaving into the Center Vertical Rift */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="branchSuperGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Major Branch A: Sweeping from top-right into central vertical seam */}
        <motion.path
          d="M 950 80 C 750 200, 600 350, 500 500 C 450 600, 300 800, 100 950"
          fill="none"
          stroke="#34d399"
          strokeWidth="4"
          filter="url(#branchSuperGlow)"
          animate={{
            d: [
              "M 950 80 C 750 200, 600 350, 500 500 C 450 600, 300 800, 100 950",
              "M 950 100 C 730 220, 580 340, 500 500 C 470 590, 320 780, 100 930",
              "M 950 80 C 750 200, 600 350, 500 500 C 450 600, 300 800, 100 950"
            ],
            opacity: [0.6, 0.95, 0.6]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Major Branch B: Sweeping from top-left into center */}
        <motion.path
          d="M 80 50 C 250 220, 420 380, 500 500 C 560 620, 720 780, 920 950"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="3.5"
          filter="url(#branchSuperGlow)"
          animate={{
            d: [
              "M 80 50 C 250 220, 420 380, 500 500 C 560 620, 720 780, 920 950",
              "M 60 70 C 270 200, 440 370, 500 500 C 540 640, 700 800, 940 930",
              "M 80 50 C 250 220, 420 380, 500 500 C 560 620, 720 780, 920 950"
            ],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Branch C: Curving Timeline Tendril from bottom-right up to vertical core */}
        <motion.path
          d="M 900 650 Q 700 550 500 500 T 200 450"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeDasharray="12 6"
          filter="url(#branchSuperGlow)"
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Branch D: High-altitude tendril weaving across */}
        <motion.path
          d="M 200 120 Q 380 300 500 500 T 800 700"
          fill="none"
          stroke="#a7f3d0"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          filter="url(#branchSuperGlow)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
      </svg>

      {/* 3. Outer Broad Vertical Pillar Glow (Spanning Top-to-Bottom of the screen) */}
      <motion.div
        animate={{
          scaleX: [0.85, 1.3, 0.85],
          opacity: [0.55, 0.9, 0.55]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-64 sm:w-80 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.7) 0%, rgba(5,150,105,0.4) 35%, transparent 70%)',
          filter: 'blur(50px)'
        }}
      />

      {/* 4. The Loom Vertical Pillar of Energy (Dense Emerald Beam like in the photo) */}
      <motion.div
        animate={{
          scaleX: [0.9, 1.25, 0.9],
          scaleY: [0.98, 1.02, 0.98],
          opacity: [0.75, 1, 0.75]
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-28 sm:w-36 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(6,78,59,0.3) 0%, rgba(16,185,129,0.9) 20%, rgba(110,231,183,0.95) 50%, rgba(16,185,129,0.9) 80%, rgba(6,78,59,0.3) 100%)',
          filter: 'blur(18px)'
        }}
      />

      {/* 5. Central Vertical Singularity Core (Bright White-Gold-Emerald Razor Seam) */}
      <motion.div
        animate={{
          scaleX: [0.8, 1.4, 0.8],
          opacity: [0.85, 1, 0.85]
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-8 sm:w-12 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(167,243,208,0.95) 25%, #ffffff 50%, rgba(167,243,208,0.95) 75%, rgba(255,255,255,0.2) 100%)',
          boxShadow: '0 0 30px #6ee7b7, 0 0 70px #10b981, 0 0 120px #059669',
          filter: 'blur(5px)'
        }}
      />

      {/* 6. Razor-sharp Central White Beam */}
      <motion.div
        animate={{
          opacity: [0.9, 1, 0.9],
          scaleX: [0.8, 1.3, 0.8]
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-2 sm:w-3 bg-white shadow-[0_0_20px_#ffffff,0_0_40px_#6ee7b7,0_0_80px_#10b981]"
      />

      {/* 7. Floating Timeline Sparks Streaming Along the Vertical Column */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`loki-stream-sparks-${i}`}
          initial={{
            x: (Math.random() - 0.5) * 160,
            y: 400 + Math.random() * 200,
            scale: 0.5 + Math.random() * 0.8,
            opacity: 0
          }}
          animate={{
            y: -400 - Math.random() * 200,
            x: (Math.random() - 0.5) * 140,
            scale: [0.4, 1.5, 0.2],
            opacity: [0, 1, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3.0 + (i % 5) * 0.7,
            delay: (i * 0.18) % 3,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-emerald-100 shadow-[0_0_12px_#34d399,0_0_4px_#ffffff]"
          style={{
            width: `${(i % 3) + 2.5}px`,
            height: `${(i % 3) + 2.5}px`
          }}
        />
      ))}
    </div>
  );
}

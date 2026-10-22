import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelinePortal
 * 
 * Modeled strictly from the Loki Season 2 finale ("God of Stories"):
 * When Loki steps out onto the gangway and breaks open the Loom to hold the timelines.
 * 
 * Visual features:
 * - A tall vertical golden-emerald cosmic rift / temporal fissure running top-to-bottom.
 * - Glowing green timeline branches / tendrils weaving into the rift.
 * - Hypnotic undulating aurora ribbons along the vertical rift.
 * - Central bright white-gold-emerald singularity beam.
 * - Floating temporal embers and glowing green thread specks.
 */
export default function LokiTimelinePortal() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
      {/* 1. Deep space backdrop aura */}
      <motion.div 
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.3)_0%,_rgba(6,78,59,0.4)_45%,_transparent_75%)]"
      />

      {/* 2. Living Timeline Branches / Tendrils (Loki God of Stories Weaving Threads) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lokiBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
          </linearGradient>
          <filter id="branchGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Branch 1: Top-Right weaving down into center */}
        <motion.path
          d="M 320 -50 Q 240 120 180 200 T 170 450"
          fill="none"
          stroke="url(#lokiBranchGrad)"
          strokeWidth="3"
          filter="url(#branchGlow)"
          animate={{
            d: [
              "M 320 -50 Q 240 120 180 200 T 170 450",
              "M 310 -50 Q 260 140 190 220 T 180 450",
              "M 320 -50 Q 240 120 180 200 T 170 450"
            ],
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Branch 2: Top-Left branch sweeping across */}
        <motion.path
          d="M 20 -40 Q 80 150 160 220 T 170 500"
          fill="none"
          stroke="url(#lokiBranchGrad)"
          strokeWidth="2.5"
          filter="url(#branchGlow)"
          animate={{
            d: [
              "M 20 -40 Q 80 150 160 220 T 170 500",
              "M 30 -40 Q 70 170 150 240 T 160 500",
              "M 20 -40 Q 80 150 160 220 T 170 500"
            ],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Branch 3: Curving timeline thread near right edge */}
        <motion.path
          d="M 340 100 Q 250 250 200 320 T 190 520"
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          strokeDasharray="4 3"
          filter="url(#branchGlow)"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Branch 4: Thin left tendril */}
        <motion.path
          d="M 0 200 Q 100 280 150 350 T 160 520"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="1.8"
          strokeDasharray="6 4"
          filter="url(#branchGlow)"
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      {/* 3. Outer Vertical Aurora Fissure / Column (Soft diffuse green glow) */}
      <motion.div
        animate={{ 
          scaleX: [0.85, 1.25, 0.85],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[140%] w-48 sm:w-56"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.7) 0%, rgba(5,150,105,0.4) 40%, transparent 75%)',
          filter: 'blur(35px)'
        }}
      />

      {/* 4. Secondary Vertical Loom Rift (Wavy Column) */}
      <motion.div
        animate={{
          scaleY: [0.96, 1.04, 0.96],
          rotate: [-1, 1.5, -1],
          opacity: [0.75, 1, 0.75]
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[150%] w-24 sm:w-28"
        style={{
          background: 'linear-gradient(180deg, rgba(52,211,153,0.1) 0%, rgba(16,185,129,0.85) 30%, rgba(110,231,183,0.95) 50%, rgba(16,185,129,0.85) 70%, rgba(52,211,153,0.1) 100%)',
          filter: 'blur(16px)',
          borderRadius: '9999px'
        }}
      />

      {/* 5. Sharp Core Vertical Tear (The White-Gold-Emerald Temporal Beam from the Image) */}
      <motion.div
        animate={{
          scaleX: [0.8, 1.3, 0.8],
          opacity: [0.85, 1, 0.85]
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[160%] w-8 sm:w-10 rounded-full"
        style={{
          background: 'linear-gradient(180deg, rgba(209,250,229,0.2) 0%, rgba(167,243,208,0.9) 25%, #ffffff 50%, rgba(167,243,208,0.9) 75%, rgba(209,250,229,0.2) 100%)',
          boxShadow: '0 0 35px #6ee7b7, 0 0 60px #10b981, 0 0 90px #059669',
          filter: 'blur(4px)'
        }}
      />

      {/* 6. Razor-sharp white filament down the vertical center */}
      <motion.div
        animate={{
          opacity: [0.9, 1, 0.9],
          scaleX: [0.9, 1.2, 0.9]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[160%] w-1.5 sm:w-2 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#6ee7b7]"
      />

      {/* 7. Floating Temporal Particles streaming along the vertical portal */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`loki-stream-particle-${i}`}
          initial={{
            x: (Math.random() - 0.5) * 120,
            y: 250 + Math.random() * 100,
            scale: 0.5 + Math.random() * 0.8,
            opacity: 0
          }}
          animate={{
            y: -300 - Math.random() * 100,
            x: (Math.random() - 0.5) * 100,
            scale: [0.4, 1.4, 0.2],
            opacity: [0, 1, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.8 + (i % 5) * 0.6,
            delay: (i * 0.22) % 3,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-emerald-200 shadow-[0_0_10px_#34d399,0_0_3px_#ffffff]"
          style={{
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`
          }}
        />
      ))}
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelinePortal
 * 
 * 1:1 match with user's cropped reference image (media_1792647123506_30a2c954.png):
 * - NOT a rigid laser beam or flat straight line.
 * - An organic, cloudy, undulating temporal rift torn through reality like smoke / aurora borealis.
 * - Central luminous core with soft cloudy mist billowing outward.
 * - Dark timeline branches / vines (thick & dark emerald-black) crossing through the green cloudy rift.
 * - Organic SVG displacement turbulence that breathes naturally.
 */
export default function LokiTimelinePortal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
      {/* 1. Deep Multiverse Vignette & Background Atmosphere */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-black/90 pointer-events-none"
      />

      {/* SVG Filters for organic smoke / cloud displacement */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="lokiCloudTurbulence" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          <filter id="branchDarkGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 2. Outer Cloudy Emerald Aurora Haze (Atmospheric Smoke spreading vertically) */}
      <motion.div
        animate={{
          opacity: [0.65, 0.9, 0.65],
          scaleY: [0.98, 1.02, 0.98],
          scaleX: [0.95, 1.08, 0.95]
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-80 sm:w-96 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.55) 0%, rgba(5,150,105,0.3) 40%, rgba(6,78,59,0.15) 60%, transparent 80%)',
          filter: 'blur(50px)'
        }}
      />

      {/* 3. The Organic Cloudy Rift Column (Undulating cloudy texture matching image 2) */}
      <motion.div
        animate={{
          opacity: [0.8, 1, 0.8],
          scaleX: [0.9, 1.15, 0.9]
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-40 sm:w-52 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(110,231,183,0.85) 0%, rgba(52,211,153,0.7) 30%, rgba(16,185,129,0.5) 60%, transparent 85%)',
          filter: 'url(#lokiCloudTurbulence) blur(14px)'
        }}
      />

      {/* 4. Second Cloud Layer (Slightly yellow-green mist like in reference image 2) */}
      <motion.div
        animate={{
          opacity: [0.5, 0.85, 0.5],
          scaleY: [1.02, 0.98, 1.02],
          scaleX: [1.1, 0.9, 1.1]
        }}
        transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute h-screen w-28 sm:w-36 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217,249,157,0.7) 0%, rgba(110,231,183,0.65) 35%, rgba(16,185,129,0.3) 70%, transparent 90%)',
          filter: 'url(#lokiCloudTurbulence) blur(10px)'
        }}
      />

      {/* 5. Central Organic Luminous Seam (Soft undulating tear, NOT a razor line) */}
      <motion.div
        animate={{
          opacity: [0.85, 1, 0.85],
          scaleX: [0.85, 1.25, 0.85]
        }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-12 sm:w-16 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #ffffff 0%, rgba(209,250,229,0.95) 25%, rgba(110,231,183,0.75) 55%, transparent 85%)',
          filter: 'url(#lokiCloudTurbulence) blur(6px)'
        }}
      />

      {/* 6. Dark Timeline Branches (As requested: "branches la dark ah irukanum" crossing across the green cloud) */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Dark Loom Branch 1: Thick dark vine cutting diagonally across center like in Image 2 */}
        <motion.path
          d="M 120 180 Q 380 420 500 500 T 920 820"
          fill="none"
          stroke="#022c22" // Deep dark black-emerald
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#branchDarkGlow)"
          animate={{
            d: [
              "M 120 180 Q 380 420 500 500 T 920 820",
              "M 130 190 Q 360 440 500 500 T 910 810",
              "M 120 180 Q 380 420 500 500 T 920 820"
            ],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner subtle green core vein for Dark Branch 1 */}
        <motion.path
          d="M 120 180 Q 380 420 500 500 T 920 820"
          fill="none"
          stroke="#064e3b"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Dark Loom Branch 2: Steep diagonal branch sweeping from top-right to bottom-left */}
        <motion.path
          d="M 880 120 Q 620 380 500 500 T 150 880"
          fill="none"
          stroke="#022c22"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#branchDarkGlow)"
          animate={{
            d: [
              "M 880 120 Q 620 380 500 500 T 150 880",
              "M 860 130 Q 640 360 500 500 T 170 870",
              "M 880 120 Q 620 380 500 500 T 150 880"
            ],
            opacity: [0.8, 0.95, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Dark Loom Branch 3: Low crossing vine */}
        <motion.path
          d="M 50 620 Q 300 560 500 500 T 950 420"
          fill="none"
          stroke="#011e17"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#branchDarkGlow)"
          animate={{ opacity: [0.75, 0.95, 0.75] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fine Dark Tendrils weaving around the cloudy rift */}
        <motion.path
          d="M 300 250 Q 420 380 500 500 T 720 750"
          fill="none"
          stroke="#064e3b"
          strokeWidth="4"
          strokeDasharray="8 6"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* 7. Organic Floating Mist Particles (Soft glowing dust billowing vertically) */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`loki-cloud-particle-${i}`}
          initial={{
            x: (Math.random() - 0.5) * 160,
            y: 350 + Math.random() * 200,
            scale: 0.6 + Math.random() * 1.2,
            opacity: 0
          }}
          animate={{
            y: -350 - Math.random() * 200,
            x: (Math.random() - 0.5) * 140,
            scale: [0.5, 1.8, 0.3],
            opacity: [0, 0.75, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4.5 + (i % 4) * 0.9,
            delay: (i * 0.25) % 4,
            ease: "easeInOut"
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${(i % 4) + 4}px`,
            height: `${(i % 4) + 4}px`,
            backgroundColor: i % 2 === 0 ? 'rgba(110,231,183,0.7)' : 'rgba(52,211,153,0.5)',
            boxShadow: '0 0 16px rgba(16,185,129,0.9), 0 0 6px #ffffff',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
}

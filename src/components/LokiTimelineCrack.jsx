import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelineCrack
 * 
 * Renders the interactive multiverse tear & cosmos anomaly on Dec 16:
 * 1. Smooth glowing Loki emerald green fracture/tear in the center of the card.
 * 2. Cosmic nebula, stars, and temporal light beaming from inside the crack.
 * 3. Dynamic ambient glow that reflects onto the calendar card and surrounding space.
 */
export default function LokiTimelineCrack({ isExpanded = false, onClick }) {
  return (
    <div 
      className="absolute inset-0 z-40 flex items-center justify-center cursor-pointer pointer-events-auto overflow-hidden rounded-3xl"
      onClick={onClick}
    >
      {/* Background Dim & Cosmic Glow inside the card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 0.95 : 0.7 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-black/60 pointer-events-none"
      />

      {/* Cosmic Nebula & Stars behind the crack */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.6, 1, 0.7],
          scale: isExpanded ? 1.4 : [0.95, 1.05, 0.95],
          rotate: [0, 10, -5, 0]
        }}
        transition={{ 
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 12, repeat: Infinity, ease: "linear" }
        }}
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(5,150,105,0.3) 35%, rgba(6,78,59,0.2) 60%, transparent 80%)',
          filter: 'blur(20px)'
        }}
      />

      {/* Cosmic star specks inside the breach */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [0.6, 1.4, 0.6]
            }}
            transition={{
              duration: 1.5 + (i % 3) * 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-emerald-200 shadow-[0_0_8px_#34d399]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${25 + (i * 5) % 50}%`,
              left: `${30 + (i * 7) % 40}%`
            }}
          />
        ))}
      </div>

      {/* Central Loki Emerald Crack / Rift (SVG Vector with organic branching) */}
      <svg 
        viewBox="0 0 200 400" 
        className="relative w-48 h-80 pointer-events-none filter drop-shadow-[0_0_15px_rgba(52,211,153,0.9)]"
      >
        <defs>
          <linearGradient id="lokiGreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="30%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          
          <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central Glowing Rift Outer Bleed */}
        <motion.path
          d="M 100 20 L 105 80 L 92 130 L 112 180 L 88 240 L 106 310 L 98 380"
          stroke="#10b981"
          strokeWidth={isExpanded ? "16" : "8"}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
          filter="url(#emeraldGlow)"
          animate={{
            strokeWidth: isExpanded ? [16, 22, 16] : [6, 10, 6],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Core Electric Beam */}
        <motion.path
          d="M 100 20 L 105 80 L 92 130 L 112 180 L 88 240 L 106 310 L 98 380"
          stroke="url(#lokiGreenGradient)"
          strokeWidth={isExpanded ? "8" : "3.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Inner intense white-gold fracture line */}
        <motion.path
          d="M 100 20 L 105 80 L 92 130 L 112 180 L 88 240 L 106 310 L 98 380"
          stroke="#ecfdf5"
          strokeWidth={isExpanded ? "3" : "1.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Branch Cracks Left & Right */}
        <motion.path
          d="M 105 80 L 75 110 M 92 130 L 60 155 M 112 180 L 140 160 M 88 240 L 125 265 M 106 310 L 70 335"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

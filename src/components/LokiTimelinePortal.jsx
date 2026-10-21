import React from 'react';
import { motion } from 'framer-motion';

/**
 * LokiTimelinePortal
 * 
 * When Dec 16 splits in half and drifts apart in space,
 * this hypnotic swirling TVA time portal appears behind the split cards.
 */
export default function LokiTimelinePortal() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
      {/* Outer Rotating Energy Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="w-80 h-80 rounded-full border-2 border-dashed border-emerald-400/40 absolute flex items-center justify-center"
      >
        <div className="w-72 h-72 rounded-full border border-emerald-300/30" />
      </motion.div>

      {/* Counter-rotating swirling cosmic vortex */}
      <motion.div
        animate={{ rotate: -360, scale: [0.95, 1.05, 0.95] }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 15, ease: "linear" },
          scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
        className="w-64 h-64 rounded-full absolute"
        style={{
          background: 'conic-gradient(from 0deg, rgba(16,185,129,0.8), rgba(52,211,153,0.3), rgba(6,78,59,0.9), rgba(16,185,129,0.8))',
          filter: 'blur(16px)'
        }}
      />

      {/* Bright Core Portal Nexus */}
      <motion.div
        animate={{ 
          scale: [0.85, 1.2, 0.85],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-200 to-white shadow-[0_0_50px_#10b981] absolute"
      />

      {/* Floating Temporal Particles beaming out from portal */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`portal-particle-${i}`}
          initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [1, 0.8, 0],
            x: Math.cos(i * (Math.PI / 6)) * 140,
            y: Math.sin(i * (Math.PI / 6)) * 140
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: i * 0.2,
            ease: "easeOut"
          }}
          className="w-2.5 h-2.5 rounded-full bg-emerald-200 shadow-[0_0_10px_#34d399] absolute"
        />
      ))}
    </div>
  );
}

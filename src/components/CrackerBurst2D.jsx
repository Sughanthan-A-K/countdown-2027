import React from 'react';
import { motion } from 'framer-motion';

// Handcrafted 2D Pattasu / Firecracker Burst Animation
// Creates an authentic 2D vector firecracker explosion with central pop flash,
// radial glowing sparks, flying ember dots, and expanding shockwave ring.
export default function CrackerBurst2D() {
  // 12 directional spark rays around the blast
  const rays = [
    { angle: 0, dist: 75, delay: 0 },
    { angle: 30, dist: 65, delay: 0.02 },
    { angle: 60, dist: 85, delay: 0.01 },
    { angle: 90, dist: 70, delay: 0.03 },
    { angle: 120, dist: 90, delay: 0.02 },
    { angle: 150, dist: 65, delay: 0.01 },
    { angle: 180, dist: 80, delay: 0 },
    { angle: 210, dist: 75, delay: 0.02 },
    { angle: 240, dist: 90, delay: 0.01 },
    { angle: 270, dist: 70, delay: 0.03 },
    { angle: 300, dist: 85, delay: 0.02 },
    { angle: 330, dist: 65, delay: 0.01 },
  ];

  // 16 flying ember sparks with diverse colors (gold, orange, ruby, bright yellow)
  const embers = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16 + (Math.sin(i * 3) * 12);
    const rad = (angle * Math.PI) / 180;
    const dist = 55 + (i % 4) * 22;
    const colors = ['#f59e0b', '#ef4444', '#fbbf24', '#f97316', '#ffffff'];
    return {
      id: i,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      size: 3 + (i % 3) * 2,
      color: colors[i % colors.length],
      delay: (i % 3) * 0.02,
    };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      {/* 1. Rapid expanding shockwave ring */}
      <motion.div
        initial={{ scale: 0.2, opacity: 1, borderWidth: 6 }}
        animate={{ scale: 2.4, opacity: 0, borderWidth: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-28 h-28 rounded-full border border-amber-400"
      />

      {/* 2. Intense center pattasu flash */}
      <motion.div
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: [0.3, 1.8, 0], opacity: [1, 0.9, 0] }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-yellow-200 via-amber-400 to-orange-500 blur-sm shadow-[0_0_40px_rgba(251,191,36,0.9)]"
      />

      {/* 3. Pure white core pop */}
      <motion.div
        initial={{ scale: 0.2, opacity: 1 }}
        animate={{ scale: [0.2, 1.2, 0], opacity: [1, 1, 0] }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="absolute w-12 h-12 rounded-full bg-white shadow-[0_0_20px_#ffffff]"
      />

      {/* 4. 2D Pattasu directional spark lines */}
      <svg className="absolute w-64 h-64 overflow-visible" viewBox="-100 -100 200 200">
        {rays.map((ray, i) => {
          const rad = (ray.angle * Math.PI) / 180;
          const x2 = Math.cos(rad) * ray.dist;
          const y2 = Math.sin(rad) * ray.dist;
          return (
            <motion.line
              key={i}
              x1="0"
              y1="0"
              x2={x2}
              y2={y2}
              stroke={i % 2 === 0 ? '#fbbf24' : '#f97316'}
              strokeWidth={i % 3 === 0 ? 3 : 2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
              transition={{ duration: 0.45, delay: ray.delay, ease: 'easeOut' }}
            />
          );
        })}
      </svg>

      {/* 5. Flying particle embers */}
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: ember.x,
            y: ember.y,
            scale: [1, 1.3, 0],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.55, delay: ember.delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute rounded-full shadow-sm"
          style={{
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            boxShadow: `0 0 8px ${ember.color}`,
          }}
        />
      ))}
    </div>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// Helper to compute coordinates starting completely outside the visible screen (top-right sky)
const getOffscreenCoords = () => {
  if (typeof window === 'undefined') return { startX: 450, startY: -450 };
  const W = window.innerWidth;
  const H = window.innerHeight;
  const cardW = Math.min(W * 0.85, 340);
  const startX = Math.round((W + cardW) / 2 + 90);
  const startY = -Math.round(H * 0.45 + 100);
  return { startX, startY };
};

// Helper: Linear interpolation along the trajectory points
function interpolatePoint(points, progress) {
  for (let i = 0; i < points.length - 1; i++) {
    if (progress >= points[i].t && progress <= points[i + 1].t) {
      const segmentRatio = (progress - points[i].t) / (points[i + 1].t - points[i].t);
      return {
        x: Math.round(points[i].x + (points[i + 1].x - points[i].x) * segmentRatio),
        y: Math.round(points[i].y + (points[i + 1].y - points[i].y) * segmentRatio),
      };
    }
  }
  return points[points.length - 1];
}

export default function MagicalCornerStar({ onStarClick, shouldAnimateFlight = true }) {
  const [coords] = useState(getOffscreenCoords);
  const [showLandingBurst, setShowLandingBurst] = useState(false);

  // Flight duration: 2.6 seconds (whimsical, playful Disney loop)
  const FLIGHT_DURATION = 2.6;

  // Tinker Bell Trajectory:
  // Starts off-screen sky -> swoops into screen -> loops around the center (round adichithu) -> glides up to top-left corner (0, 0)
  const trajectoryPoints = useMemo(() => [
    { t: 0.00, x: coords.startX, y: coords.startY },
    { t: 0.16, x: Math.round(coords.startX * 0.58), y: Math.round(coords.startY * 0.42) },
    { t: 0.30, x: 270, y: 80 },
    { t: 0.44, x: 170, y: 270 }, // Bottom of the loop
    { t: 0.56, x: 50, y: 210 },  // Sweeping up left side of loop
    { t: 0.68, x: 80, y: 85 },   // Top arch of loop
    { t: 0.78, x: 160, y: 120 }, // Center swirl
    { t: 0.88, x: 40, y: 25 },   // Climbing towards top-left corner
    { t: 0.95, x: -6, y: -8 },   // Gentle overshoot
    { t: 1.00, x: 0, y: 0 },     // Soft landing at perch
  ], [coords]);

  const trajectoryX = useMemo(() => trajectoryPoints.map(p => p.x), [trajectoryPoints]);
  const trajectoryY = useMemo(() => trajectoryPoints.map(p => p.y), [trajectoryPoints]);
  const trajectoryTimes = useMemo(() => trajectoryPoints.map(p => p.t), [trajectoryPoints]);

  // Generate 20 stardust particles along the flight path ("star laa ah chinnatha kottikite varanum")
  const stardustParticles = useMemo(() => {
    const count = 20;
    const particles = [];
    for (let i = 0; i < count; i++) {
      const progress = 0.14 + (i / count) * 0.82; // between t=0.14 and t=0.96
      const pt = interpolatePoint(trajectoryPoints, progress);
      particles.push({
        t: progress,
        x: pt.x,
        y: pt.y,
      });
    }
    return particles;
  }, [trajectoryPoints]);

  useEffect(() => {
    if (!shouldAnimateFlight) return;

    // Trigger haptic vibration & landing burst right when star touches down at 2.6s
    const timer = setTimeout(() => {
      setShowLandingBurst(true);
      if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
      setTimeout(() => setShowLandingBurst(false), 750);
    }, FLIGHT_DURATION * 1000 - 50);

    return () => clearTimeout(timer);
  }, [shouldAnimateFlight]);

  return (
    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-40 pointer-events-none">
      {/* Tinker Bell Fairy Dust: Tiny golden stars continuously raining down along the path */}
      {shouldAnimateFlight && stardustParticles.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{
            x: p.x,
            y: p.y,
            scale: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: p.x + (idx % 2 === 0 ? 8 : -8),
            y: p.y + 26 + (idx % 3) * 6, // Raining down gently with gravity ("kottikite varanum")
            scale: [0, idx % 2 === 0 ? 1.25 : 0.95, 0.6, 0],
            opacity: [0, 1, 0.85, 0],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: 0.85,
            delay: p.t * FLIGHT_DURATION, // Spawns in real-time as the star flies past!
            ease: "easeOut",
          }}
          className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 5px rgba(247,209,61,0.95))' }}
        >
          <svg 
            width={idx % 2 === 0 ? 12 : 9} 
            height={idx % 2 === 0 ? 12 : 9} 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="text-[#f7d13d]"
          >
            <path d="M10 0 C 10 8, 12 10, 20 10 C 12 10, 10 12, 10 20 C 10 12, 8 10, 0 10 C 8 10, 10 8, 10 0 Z" />
          </svg>
        </motion.div>
      ))}

      {/* Landing Sparkle Burst when the star touches down on the card corner */}
      {showLandingBurst && (
        <div className="absolute top-0 left-0 w-10 h-10 flex items-center justify-center pointer-events-none z-50">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.3, 0],
                x: Math.cos(i * (Math.PI / 4)) * 26,
                y: Math.sin(i * (Math.PI / 4)) * 26,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-full bg-[#f7d13d] shadow-[0_0_10px_#f7d13d]"
            />
          ))}
        </div>
      )}

      {/* Main Tinker Bell Star: Swoops in from outer space, loops around screen, perches & twinkles */}
      <motion.div
        initial={shouldAnimateFlight ? {
          x: coords.startX,
          y: coords.startY,
          scale: 0.1,
          opacity: 0,
          rotate: 0,
        } : {
          x: 0,
          y: 0,
          scale: 0.8,
          opacity: 0,
          rotate: 0,
        }}
        animate={shouldAnimateFlight ? {
          x: trajectoryX,
          y: trajectoryY,
          scale: [0.2, 0.7, 1.25, 1.35, 1.25, 1.2, 1.15, 1.1, 1.05, 1],
          opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          rotate: [0, 180, 360, 540, 720, 900, 1080, 1260, 1440, 1440],
        } : {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotate: 0,
        }}
        transition={shouldAnimateFlight ? {
          duration: FLIGHT_DURATION,
          times: trajectoryTimes,
          ease: "easeInOut",
        } : {
          duration: 0.4,
          ease: "easeOut",
        }}
        className="w-10 h-10 flex items-center justify-center cursor-pointer select-none pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          onStarClick();
        }}
      >
        {/* Exact Gandhi Eye Sparkle Star (25px: 5px larger than Gandhi's 20px) */}
        <motion.div
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.85 }}
          className="text-[#f7d13d] flex items-center justify-center pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 6px rgba(247,209,61,1)) drop-shadow(0 0 14px rgba(247,209,61,0.8))' }}
          animate={{
            opacity: [0.35, 1, 1, 0.35, 0.35],
            scale: [0.85, 1.15, 1, 0.85, 0.85],
            rotate: [0, 90, 180, 270, 270],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            times: [0, 0.15, 0.35, 0.5, 1],
            ease: "easeInOut",
          }}
        >
          <svg width="25" height="25" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0 C 10 8, 12 10, 20 10 C 12 10, 10 12, 10 20 C 10 12, 8 10, 0 10 C 8 10, 10 8, 10 0 Z" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper to compute coordinates starting completely outside the visible screen (top-right sky)
const getOffscreenCoords = () => {
  if (typeof window === 'undefined') return { startX: 450, startY: -450 };
  const W = window.innerWidth;
  const H = window.innerHeight;
  const cardW = Math.min(W * 0.85, 340);
  // Distance from corner to well past the right screen edge
  const startX = Math.round((W + cardW) / 2 + 80);
  // Distance from corner to well past the top screen edge
  const startY = -Math.round(H * 0.45 + 90);
  return { startX, startY };
};

const TRAIL_PARTICLES = [1, 2, 3, 4, 5];

export default function MagicalCornerStar({ onStarClick, shouldAnimateFlight = true }) {
  const [coords] = useState(getOffscreenCoords);
  const [showLandingBurst, setShowLandingBurst] = useState(false);

  useEffect(() => {
    if (!shouldAnimateFlight) return;

    // Trigger haptic vibration & landing burst right when star touches down at 1.8s
    const timer = setTimeout(() => {
      setShowLandingBurst(true);
      if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
      setTimeout(() => setShowLandingBurst(false), 700);
    }, 1750);

    return () => clearTimeout(timer);
  }, [shouldAnimateFlight]);

  // Disney curved swoop trajectory keyframes:
  // Starts high outside the screen on the right -> swoops down across the sky -> dips gracefully -> curves up and lands gently at (0, 0)
  const trajectoryX = [coords.startX, coords.startX * 0.7, coords.startX * 0.35, coords.startX * 0.1, -8, 0];
  const trajectoryY = [coords.startY, coords.startY * 0.6, -40, 35, -12, 0];
  const trajectoryTimes = [0, 0.15, 0.4, 0.65, 0.85, 1];

  return (
    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-40 pointer-events-none">
      {/* Disney Fairy Dust Stardust Trail that arcs behind the star during flight */}
      {shouldAnimateFlight && TRAIL_PARTICLES.map((idx) => (
        <motion.div
          key={idx}
          initial={{
            x: coords.startX,
            y: coords.startY,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: trajectoryX,
            y: trajectoryY,
            scale: [0, (0.85 - idx * 0.13), (0.6 - idx * 0.1), 0],
            opacity: [0, (0.9 - idx * 0.14), (0.5 - idx * 0.08), 0],
          }}
          transition={{
            duration: 1.8,
            delay: idx * 0.07,
            times: trajectoryTimes,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 6px rgba(247,209,61,0.9))' }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#f7d13d]" />
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

      {/* Main Star: Swoops in from outer space, then perches in corner and twinkles */}
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
          scale: [0.2, 0.7, 1.25, 1.35, 1.15, 1],
          opacity: [0, 1, 1, 1, 1, 1],
          rotate: [0, 180, 450, 680, 720, 720],
        } : {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotate: 0,
        }}
        transition={shouldAnimateFlight ? {
          duration: 1.8,
          times: trajectoryTimes,
          ease: [0.25, 1, 0.5, 1],
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

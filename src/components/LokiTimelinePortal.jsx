import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function DraggableBranch({ children, origin = "500px 300px", windConfig }) {
  // Raw target offsets driven by user drag gestures
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Ultra-heavy damped spring: Even if user drags fast, spring moves slowly and resists speed!
  const smoothX = useSpring(targetX, { stiffness: 18, damping: 25, mass: 2.5 });
  const smoothY = useSpring(targetY, { stiffness: 18, damping: 25, mass: 2.5 });

  const isDragging = useRef(false);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const initialTargetX = targetX.get();
    const initialTargetY = targetY.get();

    const handlePointerMove = (moveEvent) => {
      if (!isDragging.current) return;
      const dx = moveEvent.clientX - startClientX;
      const dy = moveEvent.clientY - startClientY;
      
      // Heavy friction scaling factor (0.18): Dragging mouse 100px only moves target 18px!
      const resistanceFactor = 0.18;
      const clampedX = Math.max(-80, Math.min(80, initialTargetX + dx * resistanceFactor));
      const clampedY = Math.max(-60, Math.min(60, initialTargetY + dy * resistanceFactor));
      
      targetX.set(clampedX);
      targetY.set(clampedY);
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      // When released, target springs smoothly back to origin (0, 0)
      targetX.set(0);
      targetY.set(0);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  return (
    <motion.g
      animate={{ 
        y: windConfig.y,
        x: windConfig.x,
        rotate: windConfig.rotate
      }}
      transition={{ duration: windConfig.duration, repeat: Infinity, ease: "easeInOut", delay: windConfig.delay || 0 }}
      style={{ transformOrigin: origin }}
    >
      <motion.g
        style={{ x: smoothX, y: smoothY, transformOrigin: origin }}
        onPointerDown={handlePointerDown}
        className="pointer-events-auto cursor-grab active:cursor-grabbing select-none"
      >
        {children}
      </motion.g>
    </motion.g>
  );
}

/**
 * LokiTimelinePortal
 * 
 * Exact 1:1 match with user's reference image:
 * - Screen completely flooded with ethereal, atmospheric emerald aurora glow and reflections.
 * - Central vertical opening is an organic, irregular portal rift with rugged, frayed, torn cloud-like borders
 *   (exactly like the rift in the Loki Season 2 finale screenshot where the loom fabric tears open).
 * - A distant celestial cosmic void visible inside the rift with a soft focal light origin.
 * - Organic dark timeline branches/vines rendered with pure, ultra-smooth SVG curves, perfectly continuous
 *   and naturally swaying via soft rotational/translational transforms without any broken or kinked kinks.
 */
export default function LokiTimelinePortal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[80] overflow-hidden">
      {/* 1. Full Page Deep Emerald Atmospheric Glow & Reflection (Flooding the entire screen like in reference) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[#01140e]"
      />

      {/* Layer 1: Vivid Luminous Emerald Aurora Atmosphere */}
      <motion.div
        animate={{
          opacity: [0.85, 1, 0.85],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.85) 0%, rgba(5,150,105,0.7) 35%, rgba(4,120,87,0.5) 60%, rgba(1,25,18,0.92) 90%)',
          filter: 'blur(35px)'
        }}
      />

      {/* Layer 2: Radiant Center Halo Aura (Vibrant Bright Mint & Emerald Glow behind the Portal) */}
      <motion.div
        animate={{
          scale: [0.95, 1.15, 0.95],
          opacity: [0.75, 0.95, 0.75]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[85vh] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(52,211,153,0.75) 0%, rgba(16,185,129,0.55) 40%, rgba(5,150,105,0.25) 70%, transparent 95%)',
          filter: 'blur(45px)'
        }}
      />

      {/* SVG Organic Distortion Filters for the irregular jagged portal border ONLY */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="lokiOrganicRiftEdge" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <filter id="smoothBranchGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#010f0b" floodOpacity="0.9" />
          </filter>
        </defs>
      </svg>

      {/* 2. The Organic Asymmetrical Portal Opening (Contained with organic natural tapered Ends, Expanding smoothly over time) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        {/* Outer illuminated cloudy rift lip */}
        <motion.div
          initial={{ scaleX: 1.0, scaleY: 1.0, opacity: 0.85 }}
          animate={{
            // Organic asymmetrical widening from current base shape into an uneven wider rift
            scaleX: [1.0, 1.25, 1.45, 1.38, 1.42],
            scaleY: [1.0, 1.02, 1.04, 1.01, 1.03],
            borderRadius: [
              '15% 75% 55% 35% / 70% 25% 65% 45%',
              '25% 65% 60% 30% / 65% 35% 60% 50%',
              '10% 80% 50% 40% / 75% 20% 70% 40%',
              '18% 72% 56% 36% / 68% 28% 64% 46%'
            ],
            opacity: [0.85, 0.95, 1, 0.94, 0.98]
          }}
          transition={{
            scaleX: { duration: 9.0, ease: [0.16, 1, 0.3, 1] },
            scaleY: { duration: 9.5, ease: [0.16, 1, 0.3, 1] },
            borderRadius: { duration: 10.0, ease: "easeInOut" },
            opacity: { duration: 5, ease: "easeOut" }
          }}
          className="absolute h-[92vh] max-h-[920px] w-64 sm:w-80 pointer-events-none"
          style={{
            transformOrigin: "52% 48%",
            background: 'radial-gradient(ellipse at 50% 50%, rgba(167,243,208,0.85) 0%, rgba(52,211,153,0.6) 30%, rgba(16,185,129,0.3) 55%, transparent 75%)',
            filter: 'blur(25px)'
          }}
        />

        {/* Inner Void / Deep Spacetime Tear (Starts from current shape, widens organically & unevenly over time) */}
        <motion.div
          initial={{ scaleX: 1.0, scaleY: 1.0 }}
          animate={{
            // Slow organic width increase: expands unevenly (more width around mid-upper center)
            scaleX: [1.0, 1.3, 1.6, 1.5, 1.55],
            scaleY: [1.0, 1.02, 1.03, 1.01, 1.02],
            // Asymmetrical borderRadius shifts dynamically as width increases so it doesn't look like a uniform box
            borderRadius: [
              '20% 65% 40% 60% / 65% 35% 55% 45%',
              '35% 55% 48% 52% / 58% 42% 50% 50%',
              '15% 75% 38% 62% / 70% 30% 58% 42%',
              '22% 68% 42% 58% / 64% 36% 54% 46%'
            ]
          }}
          transition={{
            scaleX: { duration: 9.5, ease: [0.16, 1, 0.3, 1] },
            scaleY: { duration: 10.0, ease: [0.16, 1, 0.3, 1] },
            borderRadius: { duration: 10.5, ease: "easeInOut" }
          }}
          className="absolute h-[86vh] max-h-[860px] w-24 sm:w-36 pointer-events-none"
          style={{
            transformOrigin: "52% 46%", // Off-center origin so width increases asymmetrically
            background: 'radial-gradient(ellipse at 50% 55%, #04251c 0%, #021a13 45%, #010f0a 80%, transparent 100%)',
            borderLeft: '4px solid #d1fae5',
            borderRight: '4px solid #a7f3d0',
            borderTop: '3px solid #6ee7b7',
            borderBottom: '4px solid #34d399',
            boxShadow: '0 0 35px #a7f3d0, 0 0 70px #34d399, 0 0 110px #10b981, inset 0 0 30px rgba(0,0,0,0.9)',
            filter: 'url(#lokiOrganicRiftEdge)'
          }}
        />

        {/* Soft Point of Light Origin (The distant nexus glimmer seen in reference image) */}
        <motion.div
          animate={{
            scale: [0.9, 1.35, 0.9],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[58%] w-12 h-12 rounded-full bg-emerald-100 blur-sm shadow-[0_0_50px_#a7f3d0,0_0_100px_#34d399,0_0_160px_#10b981] pointer-events-none"
        />

        {/* Intense white-mint core tear spine (Contained height with organic natural pinch at top and bottom) */}
        <motion.div
          initial={{ scaleX: 0.3, opacity: 0.7 }}
          animate={{
            scaleX: [0.3, 1.0, 1.15, 0.95, 1.0],
            opacity: [0.7, 1, 0.9, 1, 0.9]
          }}
          transition={{
            scaleX: { duration: 6.0, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute h-[82vh] max-h-[820px] w-5 sm:w-6 pointer-events-none rounded-[50%]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(209,250,229,0.9) 15%, #ffffff 50%, rgba(167,243,208,0.9) 85%, transparent 100%)',
            boxShadow: '0 0 35px #a7f3d0, 0 0 70px #34d399, 0 0 120px #10b981',
            filter: 'url(#lokiOrganicRiftEdge) blur(2.5px)'
          }}
        />
      </div>

      {/* 3. Dark Multiverse Timeline Branches (Rigid, interactive draggable branches placed in front with z-10) */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Branch 1: Upper graceful arc crossing from beyond left (-150) to beyond right (1150) */}
        <DraggableBranch
          origin="500px 300px"
          windConfig={{
            y: [-14, 14, -14],
            x: [-8, 8, -8],
            rotate: [-0.8, 0.8, -0.8],
            duration: 18,
            delay: 0
          }}
        >
          {/* Invisible extra-wide hit-area stroke for effortless grab anywhere across the branch */}
          <path
            d="M -150 220 Q 250 340, 500 370 T 1150 390"
            fill="none"
            stroke="#000000"
            strokeOpacity="0.001"
            strokeWidth="90"
            strokeLinecap="round"
          />
          {/* Ambient drop shadow */}
          <path
            d="M -150 220 Q 250 340, 500 370 T 1150 390"
            fill="none"
            stroke="#000000"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.95"
          />
          {/* Main Dark Silhouette Body */}
          <path
            d="M -150 220 Q 250 340, 500 370 T 1150 390"
            fill="none"
            stroke="#050a08"
            strokeWidth="11"
            strokeLinecap="round"
          />
          {/* Subtle Darkest Emerald Edge Glint */}
          <path
            d="M -150 219 Q 250 339, 500 369 T 1150 389"
            fill="none"
            stroke="#062d22"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </DraggableBranch>

        {/* Branch 2: High Sweeping gentle branch */}
        <DraggableBranch
          origin="500px 150px"
          windConfig={{
            y: [12, -12, 12],
            x: [6, -6, 6],
            rotate: [1.0, -1.0, 1.0],
            duration: 22,
            delay: 1
          }}
        >
          <path
            d="M -120 70 Q 400 160, 680 140 T 1120 180"
            fill="none"
            stroke="#000000"
            strokeOpacity="0.001"
            strokeWidth="90"
            strokeLinecap="round"
          />
          <path
            d="M -120 70 Q 400 160, 680 140 T 1120 180"
            fill="none"
            stroke="#000000"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M -120 70 Q 400 160, 680 140 T 1120 180"
            fill="none"
            stroke="#050a08"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M -120 69 Q 400 159, 680 139 T 1120 179"
            fill="none"
            stroke="#062d22"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </DraggableBranch>

        {/* Branch 3: Lower Ascending Vine (Smooth continuous bezier curve) */}
        <DraggableBranch
          origin="500px 750px"
          windConfig={{
            y: [-16, 16, -16],
            x: [-6, 6, -6],
            rotate: [-0.9, 0.9, -0.9],
            duration: 20,
            delay: 2
          }}
        >
          <path
            d="M -150 820 Q 200 720, 520 670 T 1150 860"
            fill="none"
            stroke="#000000"
            strokeOpacity="0.001"
            strokeWidth="90"
            strokeLinecap="round"
          />
          <path
            d="M -150 820 Q 200 720, 520 670 T 1150 860"
            fill="none"
            stroke="#000000"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M -150 820 Q 200 720, 520 670 T 1150 860"
            fill="none"
            stroke="#050a08"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M -150 819 Q 200 719, 520 669 T 1150 859"
            fill="none"
            stroke="#062d22"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </DraggableBranch>

        {/* Branch 4: Long Diagonal Branch crossing gracefully through the rift */}
        <DraggableBranch
          origin="500px 500px"
          windConfig={{
            x: [-12, 12, -12],
            y: [10, -10, 10],
            rotate: [-0.6, 0.6, -0.6],
            duration: 24,
            delay: 0.5
          }}
        >
          <path
            d="M 1150 80 Q 750 380, 450 550 T -120 880"
            fill="none"
            stroke="#000000"
            strokeOpacity="0.001"
            strokeWidth="90"
            strokeLinecap="round"
          />
          <path
            d="M 1150 80 Q 750 380, 450 550 T -120 880"
            fill="none"
            stroke="#000000"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 1150 80 Q 750 380, 450 550 T -120 880"
            fill="none"
            stroke="#050a08"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 1150 79 Q 750 379, 450 549 T -120 879"
            fill="none"
            stroke="#062d22"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </DraggableBranch>

        {/* Branch 5: Mid-lower gentle horizontal vine */}
        <DraggableBranch
          origin="500px 520px"
          windConfig={{
            y: [12, -12, 12],
            x: [8, -8, 8],
            rotate: [0.7, -0.7, 0.7],
            duration: 19,
            delay: 2.5
          }}
        >
          <path
            d="M -100 480 Q 300 420, 650 490 T 1150 510"
            fill="none"
            stroke="#000000"
            strokeOpacity="0.001"
            strokeWidth="90"
            strokeLinecap="round"
          />
          <path
            d="M -100 480 Q 300 420, 650 490 T 1150 510"
            fill="none"
            stroke="#000000"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M -100 480 Q 300 420, 650 490 T 1150 510"
            fill="none"
            stroke="#050a08"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          <path
            d="M -100 479 Q 300 419, 650 489 T 1150 509"
            fill="none"
            stroke="#062d22"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.6"
          />
        </DraggableBranch>
      </svg>
    </div>
  );
}

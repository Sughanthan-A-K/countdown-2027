import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * LokiLifePowerSpread
 * 
 * Symmetrical bi-directional pulse spreading outward from the exact user tap point:
 * 1. From tap point, a glowing green pulse (exact length from before, with bright white-mint filament)
 *    travels Left and Right simultaneously.
 * 2. Behind the traveling green pulse, the branch smoothly awakens from dark black into subtle living green.
 * 3. Once all 5 branches have been tapped and their pulses finish, they trigger a staggered, sudden transformation
 *    ("smooth-ah maarakoodadhu... takk takk takk-nu maaranum") into vibrant full Loki green!
 */
function LokiLifePowerSpread({ 
  branchPathRef, 
  tapRatio = 0.5, 
  isEnergized, 
  isFinalBranch = false,
  allEnergizedStage = false 
}) {
  if (!isEnergized || !branchPathRef.current) return null;

  const pathEl = branchPathRef.current;
  const totalLen = pathEl.getTotalLength ? pathEl.getTotalLength() : 1400;
  const tapLen = totalLen * Math.min(0.95, Math.max(0.05, tapRatio));

  // Pulse length: standard dynamic slug length
  const pulseLen = 220;

  // Generate subpath helper
  const getSubpath = (fromLen, toLen) => {
    const samples = 35;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const l = fromLen + (i / samples) * (toLen - fromLen);
      const pt = pathEl.getPointAtLength(l);
      d += (i === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : ` L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
    }
    return d;
  };

  // Rightward path (from tap to end)
  const rightD = getSubpath(tapLen, totalLen);
  // Leftward path (from tap to start)
  const leftD = getSubpath(tapLen, 0);

  const rightDistance = totalLen - tapLen;
  const leftDistance = tapLen;
  // Duration of venom traveling pulse across the branch
  // Continuous smooth glide that never cuts out
  const duration = 7.0;

  const renderTravelingPulse = (pathD, distance, key) => (
    <g key={key}>
      {/* 1. Behind the pulse: Awakened subtle living body inside branch */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#004D2B"
        strokeWidth="11"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut" }}
        opacity={0.9}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="#006B3C"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut" }}
        opacity={0.8}
      />

      {/* 2. The Traveling Pulse - Loki Authentic Sacred Timeline Color Flow */}
      {/* Strictly contained inside branch borders without overflowing outside */}
      <g style={{ filter: "url(#venomPulseDistort)" }}>
        {/* Layer A: Volumetric Edge Glow - Kept within branch width (14px) */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#008F4C"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0.45, 1],
            opacity: [0.3, 0.85, 0.6]
          }}
          transition={{ duration, ease: "easeInOut" }}
          style={{ filter: "blur(2px)" }}
        />

        {/* Layer B: True Loki Green (#00C853) & Electric Green (#00FF66) Body (9px) */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#00C853"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0.5, 1],
            opacity: [0.4, 0.95, 0.85]
          }}
          transition={{ duration, ease: "easeInOut" }}
        />

        {/* Layer C: Neon Green (#39FF14) Radiant Core (5px) */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#39FF14"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0.55, 1],
            opacity: [0.5, 1, 0.9]
          }}
          transition={{ duration, ease: "easeInOut" }}
        />

        {/* Layer D: Mint Green (#7CFFB2) & Pale Green Glow (#B9FFD0) Center Filament (2px) */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#B9FFD0"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0.6, 1],
            opacity: [0.6, 1, 0.95]
          }}
          transition={{ duration, ease: "easeInOut" }}
        />
      </g>
    </g>
  );

  return (
    <g>
      {/* Symmetrical Left and Right Pulses spreading outward seamlessly from tap point to the ends */}
      {renderTravelingPulse(rightD, rightDistance, "pulse-right")}
      {renderTravelingPulse(leftD, leftDistance, "pulse-left")}

      {/* Full Living Pulsation when branch awakens (Stays within branch silhouette borders) */}
      {allEnergizedStage && (
        <g style={{ filter: "url(#venomPulseDistort)" }}>
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#008F4C"
            strokeWidth="15"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.7] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{ filter: "blur(3px)" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#00C853"
            strokeWidth="9"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.85] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#39FF14"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.95] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#B9FFD0"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.98] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        </g>
      )}
    </g>
  );
}

function DraggableBranch({ 
  id,
  children, 
  origin = "500px 300px", 
  windConfig,
  pathData,
  onEnergize,
  energizedData,
  allEnergizedStage,
  isFinalBranch = false,
  isClickable = false
}) {
  const branchPathRef = useRef(null);
  const [tapRatio, setTapRatio] = useState(0.5);

  // When energized via cascade, if tapRatio is specified in energizedData use it
  useEffect(() => {
    if (energizedData?.tapRatio !== undefined) {
      setTapRatio(energizedData.tapRatio);
    }
  }, [energizedData?.tapRatio]);

  const handlePointerDown = (e) => {
    if (!isClickable) return;
    e.stopPropagation();

    // Trigger Loki God of Stories life magic power flow starting exactly from touch point!
    const svg = e.currentTarget.closest('svg');
    let clickX = 500;
    let clickY = 500;
    if (svg) {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      clickX = svgP.x;
      clickY = svgP.y;
    }

    // Determine normalized tap ratio along path
    if (branchPathRef.current) {
      const pathEl = branchPathRef.current;
      const totalLen = pathEl.getTotalLength ? pathEl.getTotalLength() : 1400;
      let bestLen = 0;
      let minDistance = Infinity;

      const steps = 50;
      for (let i = 0; i <= steps; i++) {
        const len = (i / steps) * totalLen;
        const p = pathEl.getPointAtLength(len);
        const dist = Math.hypot(p.x - clickX, p.y - clickY);
        if (dist < minDistance) {
          minDistance = dist;
          bestLen = len;
        }
      }
      setTapRatio(bestLen / totalLen);
    }

    if (onEnergize) {
      onEnergize(id, clickX, clickY);
    }
  };

  return (
    <motion.g
      // Individual natural organic wind breathing
      animate={{ 
        y: windConfig.y,
        x: windConfig.x,
        rotate: windConfig.rotate
      }}
      transition={{
        duration: windConfig.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: windConfig.delay || 0
      }}
      style={{ transformOrigin: origin }}
    >
      <g
        onPointerDown={isClickable ? handlePointerDown : undefined}
        className={isClickable ? "pointer-events-auto cursor-pointer select-none" : "pointer-events-none select-none"}
      >
        {/* Hidden reference path to compute exact total length and subpaths on click */}
        <path ref={branchPathRef} d={pathData} fill="none" stroke="none" />

        {children}

        {/* --- LOKI GOD OF STORIES MAGIC LIFE POWER FLOW OVERLAY --- */}
        {/* Symmetrical Left and Right Pulse Spread from Tap Point */}
        {energizedData && (
          <LokiLifePowerSpread 
            branchPathRef={branchPathRef}
            tapRatio={tapRatio}
            isEnergized={true} 
            isFinalBranch={isFinalBranch}
            allEnergizedStage={allEnergizedStage}
          />
        )}
      </g>
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
  // Track which branches have been energized with Loki's life magic
  const [energizedBranches, setEnergizedBranches] = useState({});
  // Track individual branch awakened full stages when all 5 are touched ("takk takk takk" stagger)
  const [awakenedStages, setAwakenedStages] = useState({});
  // Track which branch was tapped last (the 5th branch that triggered the continuous venom cascade)
  const [lastTappedBranchId, setLastTappedBranchId] = useState(null);
  // Smooth continuous parallax voyage progression (0 to 1)
  // Driven automatically like smooth portfolio scroll / camera dolly:
  const [voyageProgress, setVoyageProgress] = useState(0);

  // Cinematic Intro State:
  // hasDiscovered = false -> Only single isolated mystery vine in darkness, portal stays far away in deep space!
  const [hasDiscovered, setHasDiscovered] = useState(false);

  const handleBranchEnergize = (id, clickX, clickY) => {
    // Only Branch 1 initiates discovery:
    if (!hasDiscovered) {
      setHasDiscovered(true);
    }

    // Energize Branch 1
    setEnergizedBranches(prev => {
      if (prev[id]?.active) return prev; // already energized
      const updated = {
        ...prev,
        [id]: {
          active: true,
          x: clickX,
          y: clickY,
          timestamp: Date.now()
        }
      };

      // 1. Fluid Venom Propagation cascades across remaining branches from organic sides:
      const cascadeConfig = [
        { id: 'branch-2', tapRatio: 0.05, delay: 1200 },
        { id: 'branch-3', tapRatio: 0.95, delay: 2400 },
        { id: 'branch-4', tapRatio: 0.08, delay: 3600 },
        { id: 'branch-5', tapRatio: 0.92, delay: 4800 },
      ];

      cascadeConfig.forEach(item => {
        if (item.id !== id) {
          setTimeout(() => {
            setEnergizedBranches(autoPrev => ({
              ...autoPrev,
              [item.id]: {
                active: true,
                tapRatio: item.tapRatio,
                timestamp: Date.now()
              }
            }));
          }, item.delay);
        }
      });

      // 2. Continuous Parallax Camera Flight (Portfolio Smooth Scroll feel):
      // - 0s to 5.0s: Venom propagates across all branches.
      // - 5.0s to 8.5s: 3.5 seconds pure rest & glow observation.
      // - At 8.5s: The smooth camera flight seamlessly starts!
      // All branches and the portal move simultaneously with smooth progressive parallax depth.
      setTimeout(() => {
        setVoyageProgress(1);
      }, 8500);

      return updated;
    });
  };

  // Total energized count (0 to 5):
  // As user crosses branches one by one, the distant portal gently approaches closer step-by-step!
  const energizedCount = Object.keys(energizedBranches).length;
  // Starting distant scale = 0.52 (stays far away at beginning as requested!)
  // Grows incrementally closer with each passed branch: 0.52 -> 0.62 -> 0.72 -> 0.85 -> 1.0!
  const portalDistanceScale = 0.52 + energizedCount * 0.1;
  // Starting normal width = 16px (w-4), progressively widens up to 56px (w-14) as user infuses branches
  const whiteCoreWidth = Math.min(56, 16 + energizedCount * 8);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[80] overflow-hidden">
      {/* 0. Full Page Darkness Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[#000805]"
      />

      {/* SVG Organic Distortion Filters for the irregular jagged portal border & venom tendrils */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="lokiOrganicRiftEdge" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <filter id="smoothBranchGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#010f0b" floodOpacity="0.9" />
          </filter>

          {/* Venom tendril organic distortion for the traveling life pulse */}
          <filter id="venomPulseDistort" x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.12" numOctaves="3" result="venomNoise" />
            <feDisplacementMap in="SourceGraphic" in2="venomNoise" scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* 2. DISTANT DEEP SPACE BACKGROUND: THE SACRED PORTAL (THE LOOM)
          - Hidden until branch-1 is activated.
          - As our camera flies through the branches, the portal smoothly grows closer
            reaching its destination after passing the branches!
      */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ x: "-90vw", scale: 0.22, opacity: 0, filter: "blur(28px)" }}
        animate={hasDiscovered ? {
          x: "0vw",
          scale: voyageProgress > 0 ? 0.98 : 0.28,
          opacity: voyageProgress > 0 ? 1 : 0.6,
          filter: voyageProgress > 0 ? "blur(0px)" : "blur(12px)"
        } : {
          x: "-90vw",
          scale: 0.22,
          opacity: 0,
          filter: "blur(28px)"
        }}
        transition={voyageProgress > 0 ? {
          scale: { duration: 42.0, ease: [0.12, 1, 0.28, 1], delay: 4.0 },
          opacity: { duration: 25.0, ease: "easeInOut" },
          filter: { duration: 38.0, ease: [0.12, 1, 0.28, 1], delay: 3.0 },
          x: { duration: 14.0, ease: [0.16, 1, 0.3, 1] }
        } : {
          duration: 14.0,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ transformOrigin: "50% 50%" }}
      >
        {/* Layer 1: Authentic Loki Climax Emerald Aurora Atmosphere */}
        <motion.div
          animate={{
            opacity: hasDiscovered ? [0.85, 1, 0.85] : 0.65,
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,200,83,0.85) 0%, rgba(0,143,76,0.7) 35%, rgba(0,77,43,0.5) 60%, rgba(11,31,22,0.95) 90%)',
            filter: 'blur(35px)'
          }}
        />

        {/* Layer 2: Radiant Center Halo Aura - Electric Green & Mint Glow */}
        <motion.div
          animate={{
            scale: [0.95, 1.15, 0.95],
            opacity: hasDiscovered ? [0.75, 0.95, 0.75] : 0.55
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[85vh] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,255,102,0.75) 0%, rgba(0,200,83,0.55) 40%, rgba(0,107,60,0.25) 70%, transparent 95%)',
            filter: 'blur(45px)'
          }}
        />

        {/* Outer illuminated cloudy rift lip - Pale Green Glow & Lime Green Flow */}
        <motion.div
          initial={{ scaleX: 1.0, scaleY: 1.0, opacity: 0.85 }}
          animate={{
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
          className="absolute h-[120vh] w-64 sm:w-80 pointer-events-none"
          style={{
            transformOrigin: "52% 48%",
            background: 'radial-gradient(ellipse at 50% 50%, rgba(185,255,208,0.85) 0%, rgba(124,255,178,0.6) 30%, rgba(0,200,83,0.3) 55%, transparent 75%)',
            filter: 'blur(25px)'
          }}
        />

        {/* Inner Void / Deep Spacetime Tear */}
        <motion.div
          initial={{ scaleX: 1.0, scaleY: 1.0 }}
          animate={{
            scaleX: [1.0, 1.3, 1.6, 1.5, 1.55],
            scaleY: [1.0, 1.02, 1.03, 1.01, 1.02],
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
          className="absolute h-[115vh] w-24 sm:w-36 pointer-events-none"
          style={{
            transformOrigin: "52% 46%",
            background: 'radial-gradient(ellipse at 50% 55%, #004D2B 0%, #006B3C 45%, #0B1F16 80%, transparent 100%)',
            borderLeft: '4px solid #B9FFD0',
            borderRight: '4px solid #7CFFB2',
            borderTop: '3px solid #00FF66',
            borderBottom: '4px solid #00C853',
            boxShadow: '0 0 35px #7CFFB2, 0 0 70px #00FF66, 0 0 110px #00C853, inset 0 0 30px rgba(0,0,0,0.9)',
            filter: 'url(#lokiOrganicRiftEdge)'
          }}
        />

        {/* Soft Point of Light Origin */}
        <motion.div
          animate={{
            scale: [0.9, 1.35, 0.9],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[58%] w-12 h-12 rounded-full bg-[#B9FFD0] blur-sm shadow-[0_0_50px_#B9FFD0,0_0_100px_#00FF66,0_0_160px_#00C853] pointer-events-none"
        />

        {/* Intense white-mint core tear spine */}
        <motion.div
          animate={{
            width: `${whiteCoreWidth}px`,
            opacity: [0.85, 1, 0.85],
            boxShadow: energizedCount > 0 
              ? `0 0 ${35 + energizedCount * 10}px #ffffff, 0 0 ${70 + energizedCount * 14}px #B9FFD0, 0 0 ${110 + energizedCount * 18}px #00FF66`
              : '0 0 35px #B9FFD0, 0 0 70px #00FF66, 0 0 110px #00C853'
          }}
          transition={{
            width: { duration: 25.0, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute h-[110vh] pointer-events-none rounded-[50%]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(185,255,208,0.9) 15%, #ffffff 50%, rgba(124,255,178,0.9) 85%, transparent 100%)',
            filter: 'url(#lokiOrganicRiftEdge) blur(2.5px)'
          }}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. MULTIVERSE TIMELINE BRANCHES: UNIFIED PERSPECTIVE FLIGHT */}
      {/* ========================================================================= */}
      {/* 
        Ultra-Smooth Portfolio Scroll / Locomotive Parallax Flight:
        All branches are interconnected in the same cosmic space.
        When camera voyages forward towards the distant portal (voyageProgress: 0 -> 1):
        - All branches move smoothly and concurrently at their respective depth (z-layer) parallax speeds!
        - Foreground Branch 1 sweeps gently past the camera first (scale 1 -> 3.2).
        - Branch 2 (2nd depth) smoothly scales past (scale 1 -> 2.6).
        - Branch 5 (3rd depth) smoothly scales (scale 1 -> 2.2).
        - Branch 3 (4th depth) smoothly scales (scale 1 -> 1.8).
        - Branch 4 (deepest depth) smoothly scales (scale 1 -> 1.5).
        Zero sudden jumps! Exactly like smooth scrolling in a high-end 3D portfolio!
      */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {['branch-1', 'branch-2', 'branch-3', 'branch-4', 'branch-5'].map(bId => {
            const data = energizedBranches[bId];
            return (
              <clipPath id={`power-reveal-${bId}`} key={`clip-${bId}`}>
                {data ? (
                  <motion.circle
                    cx={data.x || 500}
                    cy={data.y || 500}
                    initial={{ r: 0 }}
                    animate={{ r: 1600 }}
                    transition={{ duration: 45.0, ease: [0.16, 0.95, 0.35, 1] }}
                  />
                ) : (
                  <circle cx="500" cy="500" r="0" />
                )}
              </clipPath>
            );
          })}
        </defs>

        {/* Branch 1: Forefront Depth (Closest to camera, Layer 1) */}
        {/* ONLY this single big branch is clickable! */}
        {/* Physics: Since it's nearest to camera, it starts largest (scale: 1.15) */}
        {/* When camera accelerates forward, it rushes past first in 0s-12s, scaling to 3.8 and gently brushing upper screen */}
        <motion.g
          initial={{ scale: 1.15, y: 0, x: 0 }}
          animate={voyageProgress > 0 ? {
            scale: 3.8,
            y: -520,
            x: 80,
            opacity: 0.75
          } : { scale: 1.15, y: 0, x: 0, opacity: 1 }}
          transition={{
            duration: 16.0,
            delay: 0,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ transformOrigin: "500px 440px" }}
        >
          <DraggableBranch
            id="branch-1"
            pathData="M -400 310 Q 150 480, 520 440 T 1450 390"
            origin="500px 440px"
            onEnergize={handleBranchEnergize}
            energizedData={energizedBranches['branch-1']}
            allEnergizedStage={awakenedStages['branch-1']}
            isFinalBranch={lastTappedBranchId === 'branch-1'}
            isClickable={!energizedBranches['branch-1']?.active} // Clickable only until first tap
            windConfig={{
              y: [-18, 18, -18],
              x: [12, -12, 12],
              rotate: [-1.2, 1.2, -1.2],
              duration: 22,
              delay: 0
            }}
          >
            {/* Invisible extra-wide hit-area stroke for effortless grab anywhere across the branch */}
            <path
              d="M -400 310 Q 150 480, 520 440 T 1450 390"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.001"
              strokeWidth="120"
              strokeLinecap="round"
            />
            {/* Ambient drop shadow */}
            <path
              d="M -400 310 Q 150 480, 520 440 T 1450 390"
              fill="none"
              stroke="#000000"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Main Dark Silhouette Body (Pure dark black) */}
            <path
              d="M -400 310 Q 150 480, 520 440 T 1450 390"
              fill="none"
              stroke="#000000"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M -400 310 Q 150 480, 520 440 T 1450 390"
              fill="none"
              stroke="#050a08"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Subtle dark emerald glint */}
            <path
              d="M -400 309 Q 150 479, 520 439 T 1450 389"
              fill="none"
              stroke="#062d22"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </DraggableBranch>
        </motion.g>

        {/* Branches 2 to 5: Long hanging, flowing cosmic branches */}
        {/* Strictly display-only (pointer-events-none): User cannot tap them! */}
        <g 
          style={{ 
            opacity: hasDiscovered ? 1 : 0, 
            transition: 'opacity 2.5s ease-out 0.5s',
            pointerEvents: 'none'
          }}
        >
          {/* Branch 2: Depth Layer 2 (~10s distance behind Branch 1) */}
          {/* Starts at natural perspective scale (0.92). Crosses camera at ~10s-22s */}
          {/* Sweeps near top of screen naturally */}
          <motion.g
            initial={{ scale: 0.92, y: 0, x: 0 }}
            animate={voyageProgress > 0 ? {
              scale: 3.2,
              y: -580,
              x: -60,
              opacity: 0.8
            } : { scale: 0.92, y: 0, x: 0, opacity: 1 }}
            transition={{
              duration: 18.0,
              delay: 8.0, // ~8-10 seconds distance behind branch 1
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ transformOrigin: "500px 160px" }}
          >
            <DraggableBranch
              id="branch-2"
              pathData="M -350 40 Q 250 220, 680 160 T 1420 120"
              origin="500px 160px"
              onEnergize={handleBranchEnergize}
              energizedData={energizedBranches['branch-2']}
              allEnergizedStage={awakenedStages['branch-2']}
              isFinalBranch={lastTappedBranchId === 'branch-2'}
              windConfig={{
                y: [16, -16, 16],
                x: [8, -8, 8],
                rotate: [1.2, -1.2, 1.2],
                duration: 25,
                delay: 1
              }}
            >
              <path
                d="M -350 40 Q 250 220, 680 160 T 1420 120"
                fill="none"
                stroke="#000000"
                strokeOpacity="0.001"
                strokeWidth="110"
                strokeLinecap="round"
              />
              <path
                d="M -350 40 Q 250 220, 680 160 T 1420 120"
                fill="none"
                stroke="#000000"
                strokeWidth="15"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M -350 40 Q 250 220, 680 160 T 1420 120"
                fill="none"
                stroke="#050a08"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M -350 39 Q 250 219, 680 159 T 1420 119"
                fill="none"
                stroke="#062d22"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </DraggableBranch>
          </motion.g>

          {/* Branch 5: Depth Layer 3 (~18-20s total distance, ~10s behind Branch 2) */}
          {/* Starts smaller in the distance (scale: 0.72) */}
          {/* Sweeps near the lower quadrant of the screen */}
          <motion.g
            initial={{ scale: 0.72, y: 0, x: 0 }}
            animate={voyageProgress > 0 ? {
              scale: 2.7,
              y: 420,
              x: 50,
              opacity: 0.85
            } : { scale: 0.72, y: 0, x: 0, opacity: 1 }}
            transition={{
              duration: 18.0,
              delay: 16.0, // Staggered ~10s after branch 2
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ transformOrigin: "500px 540px" }}
          >
            <DraggableBranch
              id="branch-5"
              pathData="M -320 540 Q 280 430, 720 560 T 1420 520"
              origin="500px 540px"
              onEnergize={handleBranchEnergize}
              energizedData={energizedBranches['branch-5']}
              allEnergizedStage={awakenedStages['branch-5']}
              isFinalBranch={lastTappedBranchId === 'branch-5'}
              windConfig={{
                y: [15, -15, 15],
                x: [10, -10, 10],
                rotate: [0.9, -0.9, 0.9],
                duration: 21,
                delay: 2.5
              }}
            >
              <path
                d="M -320 540 Q 280 430, 720 560 T 1420 520"
                fill="none"
                stroke="#000000"
                strokeOpacity="0.001"
                strokeWidth="110"
                strokeLinecap="round"
              />
              <path
                d="M -320 540 Q 280 430, 720 560 T 1420 520"
                fill="none"
                stroke="#000000"
                strokeWidth="13"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M -320 540 Q 280 430, 720 560 T 1420 520"
                fill="none"
                stroke="#050a08"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M -320 539 Q 280 429, 720 559 T 1420 519"
                fill="none"
                stroke="#062d22"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </DraggableBranch>
          </motion.g>

          {/* Branch 3: Depth Layer 4 (~26s total distance, ~10s behind Branch 5) */}
          {/* Starts even further back and smaller (scale: 0.55) */}
          {/* Sweeps near bottom screen */}
          <motion.g
            initial={{ scale: 0.55, y: 0, x: 0 }}
            animate={voyageProgress > 0 ? {
              scale: 2.3,
              y: 520,
              x: -40,
              opacity: 0.9
            } : { scale: 0.55, y: 0, x: 0, opacity: 1 }}
            transition={{
              duration: 18.0,
              delay: 24.0, // Staggered ~8-10s after branch 5
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ transformOrigin: "500px 720px" }}
          >
            <DraggableBranch
              id="branch-3"
              pathData="M -380 890 Q 200 680, 580 720 T 1450 820"
              origin="500px 720px"
              onEnergize={handleBranchEnergize}
              energizedData={energizedBranches['branch-3']}
              allEnergizedStage={awakenedStages['branch-3']}
              isFinalBranch={lastTappedBranchId === 'branch-3'}
              windConfig={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [-1.4, 1.4, -1.4],
                duration: 24,
                delay: 2
              }}
            >
              <path
                d="M -380 890 Q 200 680, 580 720 T 1450 820"
                fill="none"
                stroke="#000000"
                strokeOpacity="0.001"
                strokeWidth="120"
                strokeLinecap="round"
              />
              <path
                d="M -380 890 Q 200 680, 580 720 T 1450 820"
                fill="none"
                stroke="#000000"
                strokeWidth="17"
                strokeLinecap="round"
                opacity="0.95"
              />
              <path
                d="M -380 890 Q 200 680, 580 720 T 1450 820"
                fill="none"
                stroke="#050a08"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M -380 889 Q 200 679, 580 719 T 1450 819"
                fill="none"
                stroke="#062d22"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
              />
            </DraggableBranch>
          </motion.g>

          {/* Branch 4: Deepest Layer 5 (Deep cosmic horizon, ~34s total distance) */}
          {/* Starts smallest and furthest back (scale: 0.42) */}
          {/* Sweeps diagonally across upper-right / center edge before portal */}
          <motion.g
            initial={{ scale: 0.42, y: 0, x: 0 }}
            animate={voyageProgress > 0 ? {
              scale: 1.9,
              y: -380,
              x: 120,
              opacity: 0.95
            } : { scale: 0.42, y: 0, x: 0, opacity: 1 }}
            transition={{
              duration: 18.0,
              delay: 32.0, // Staggered ~8-10s after branch 3
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ transformOrigin: "500px 520px" }}
          >
            <DraggableBranch
              id="branch-4"
              pathData="M 1450 30 Q 820 420, 480 620 T -350 940"
              origin="500px 520px"
              onEnergize={handleBranchEnergize}
              energizedData={energizedBranches['branch-4']}
              allEnergizedStage={awakenedStages['branch-4']}
              isFinalBranch={lastTappedBranchId === 'branch-4'}
              windConfig={{
                x: [-14, 14, -14],
                y: [12, -12, 12],
                rotate: [-0.9, 0.9, -0.9],
                duration: 26,
                delay: 0.5
              }}
            >
              <path
                d="M 1450 30 Q 820 420, 480 620 T -350 940"
                fill="none"
                stroke="#000000"
                strokeOpacity="0.001"
                strokeWidth="120"
                strokeLinecap="round"
              />
              <path
                d="M 1450 30 Q 820 420, 480 620 T -350 940"
                fill="none"
                stroke="#000000"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 1450 30 Q 820 420, 480 620 T -350 940"
                fill="none"
                stroke="#050a08"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M 1450 29 Q 820 419, 480 619 T -350 939"
                fill="none"
                stroke="#062d22"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </DraggableBranch>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}

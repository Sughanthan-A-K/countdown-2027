import React, { useRef, useState, useMemo } from 'react';
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
  // When discovering Branch 1, it runs in a rich, smooth, continuous 5.5s glide
  const duration = isFinalBranch ? 6.5 : 5.5;

  const renderTravelingPulse = (pathD, distance, key) => (
    <g key={key}>
      {/* 1. Behind the pulse: Awakened subtle living body using Forest Green (#004D2B) and Deep Emerald (#006B3C) */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#004D2B"
        strokeWidth="9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeOut" }}
        opacity={0.85}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="#006B3C"
        strokeWidth="4.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeOut" }}
        opacity={0.75}
      />

      {/* 2. The Traveling Pulse - Loki Authentic Sacred Timeline Color Flow */}
      <g style={{ filter: "url(#venomPulseDistort)" }}>
        {/* Layer A: Atmospheric Malachite (#0BDA51) & Emerald (#008F4C) Volumetric Aura Bloom */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#008F4C"
          strokeWidth="24"
          strokeLinecap="butt"
          strokeDasharray={isFinalBranch ? `${distance + 600} ${distance + 600}` : `${pulseLen} ${distance + 500}`}
          initial={{ strokeDashoffset: isFinalBranch ? distance + 600 : pulseLen }}
          animate={{ strokeDashoffset: isFinalBranch ? 0 : -(distance + 100) }}
          transition={{ duration, ease: "easeOut" }}
          opacity={0.65}
          style={{ filter: "blur(6px)" }}
        />

        {/* Layer B: True Loki Green (#00C853) & Electric Green (#00FF66) Body */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#00C853"
          strokeWidth="12"
          strokeLinecap="butt"
          strokeDasharray={isFinalBranch ? `${distance + 600} ${distance + 600}` : `${pulseLen} ${distance + 500}`}
          initial={{ strokeDashoffset: isFinalBranch ? distance + 600 : pulseLen }}
          animate={{ strokeDashoffset: isFinalBranch ? 0 : -(distance + 100) }}
          transition={{ duration, ease: "easeOut" }}
          opacity={0.9}
        />

        {/* Layer C: Neon Green (#39FF14) & Lime Green (#A8FF60) Radiant Core */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#39FF14"
          strokeWidth="6.5"
          strokeLinecap="butt"
          strokeDasharray={isFinalBranch ? `${distance + 600} ${distance + 600}` : `${pulseLen} ${distance + 500}`}
          initial={{ strokeDashoffset: isFinalBranch ? distance + 600 : pulseLen }}
          animate={{ strokeDashoffset: isFinalBranch ? 0 : -(distance + 100) }}
          transition={{ duration, ease: "easeOut" }}
          opacity={0.98}
        />

        {/* Layer D: Mint Green (#7CFFB2) & Pale Green Glow (#B9FFD0) Center Filament */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#B9FFD0"
          strokeWidth="2.8"
          strokeLinecap="butt"
          strokeDasharray={isFinalBranch ? `${distance + 600} ${distance + 600}` : `${pulseLen} ${distance + 500}`}
          initial={{ strokeDashoffset: isFinalBranch ? distance + 600 : pulseLen }}
          animate={{ strokeDashoffset: isFinalBranch ? 0 : -(distance + 100) }}
          transition={{ duration, ease: "easeOut" }}
          opacity={1}
        />
      </g>
    </g>
  );

  return (
    <g>
      {/* Symmetrical Left and Right Pulses spreading outward from tap point */}
      {renderTravelingPulse(rightD, rightDistance, "pulse-right")}
      {renderTravelingPulse(leftD, leftDistance, "pulse-left")}

      {/* Full Final Burst when all branches connect (Full Loki God of Stories Climax Glow) */}
      {allEnergizedStage && (
        <g style={{ filter: "url(#venomPulseDistort)" }}>
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#00C853"
            strokeWidth="32"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.7] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: "blur(10px)" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#00FF66"
            strokeWidth="18"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.85] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#7CFFB2"
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.95] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
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
  flyOut3D = false,
  flyOutDelay = 0
}) {
  const branchPathRef = useRef(null);
  const [tapRatio, setTapRatio] = useState(0.5);

  const handlePointerDown = (e) => {
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
      // Unbroken Continuous Smooth 3D Flight:
      // Moves with steady, constant velocity straight towards the camera, sweeps past the viewpoint, and only then fades!
      animate={flyOut3D ? {
        scale: [1, 35],
        y: [0, 1100],
        opacity: [1, 1, 1, 0]
      } : { 
        y: windConfig.y,
        x: windConfig.x,
        rotate: windConfig.rotate
      }}
      transition={flyOut3D ? {
        duration: 3.2,
        times: [0, 0.75, 0.92, 1.0], // Full 100% opacity as it approaches and crosses viewpoint, fades only behind viewer!
        ease: "linear" // 100% steady, smooth uninterrupted speed!
      } : {
        duration: windConfig.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: windConfig.delay || 0
      }}
      style={{ transformOrigin: origin }}
    >
      <g
        onPointerDown={handlePointerDown}
        className="pointer-events-auto cursor-pointer select-none"
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
  // Track individual branches 3D bullet pass-by states
  // When a branch's venom completes its flow, that branch flies straight towards the user's camera,
  // growing huge and crossing past the screen like a 3D bullet in an IMAX movie!
  const [flyOutBranches, setFlyOutBranches] = useState({});

  // Cinematic Intro State:
  // hasDiscovered = false -> Only single isolated mystery vine in darkness, portal stays far away in deep space!
  const [hasDiscovered, setHasDiscovered] = useState(false);

  const handleBranchEnergize = (id, clickX, clickY) => {
    // When user taps Branch 1:
    if (!hasDiscovered) {
      setHasDiscovered(true);
    }

    // Energize the tapped branch
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

      const tappedCount = Object.keys(updated).length;

      // Tap 1 & Tap 2: Each branch passes past viewpoint after venom completes
      if (tappedCount < 3) {
        setTimeout(() => {
          setFlyOutBranches(flyPrev => ({ ...flyPrev, [id]: true }));
        }, 3200);
      }

      // Tap 3 (THIRD CLICK):
      // Connects & triggers the remaining 2 branches automatically!
      // All 3 branches (3, 4, 5) radiate full green living venom and together pass past the viewpoint!
      if (tappedCount === 3) {
        const remainingBranchIds = ['branch-1', 'branch-2', 'branch-3', 'branch-4', 'branch-5'].filter(bId => !updated[bId]);
        remainingBranchIds.forEach((remId, rIdx) => {
          setTimeout(() => {
            setEnergizedBranches(autoPrev => ({
              ...autoPrev,
              [remId]: {
                active: true,
                x: 500,
                y: 500,
                timestamp: Date.now()
              }
            }));
          }, (rIdx + 1) * 350);
        });

        // Staggered full living green venom pulsation on all branches
        ['branch-1', 'branch-2', 'branch-3', 'branch-4', 'branch-5'].forEach((bId, bIdx) => {
          setTimeout(() => {
            setAwakenedStages(stagePrev => ({ ...stagePrev, [bId]: true }));
          }, 1200 + bIdx * 200);
        });

        // All remaining branches together sweep and pass past the viewpoint
        setTimeout(() => {
          setFlyOutBranches(flyPrev => ({
            ...flyPrev,
            [id]: true,
            ...(remainingBranchIds.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}))
          }));
        }, 3800);
      }

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
          - Initially 100% COMPLETELY HIDDEN (opacity: 0, x: -90vw, scale: 0.25).
            Not even a trace visible at the start. Only the single loom branch exists in the dark.
          - On First Tap (hasDiscovered = true):
            Very, very slowly (14.0s duration) emerges from deep cosmic blur (blur: 24px -> blur: 3px)
            gliding gradually towards the distant central background horizon (scale: 0.25 -> 0.55).
            It NEVER jumps or appears abruptly!
      */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ x: "-90vw", scale: 0.25, opacity: 0, filter: "blur(28px)" }}
        animate={hasDiscovered ? {
          x: "0vw",
          scale: 0.38 + energizedCount * 0.08, // Stays in deep space (starts small: 0.38)
          opacity: Math.min(1, 0.2 + energizedCount * 0.16), // Extremely gradual emergence
          filter: `blur(${Math.max(1, 10 - energizedCount * 2)}px)` // Slow de-blur as branches pass
        } : {
          x: "-90vw",
          scale: 0.25,
          opacity: 0,
          filter: "blur(28px)"
        }}
        transition={{
          duration: 14.0, // ULTRA SLOW gradual celestial emergence!
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
      {/* 3. MULTIVERSE TIMELINE BRANCHES: FIXED VIEWPORT SVG */}
      {/* SVG is always 100% fixed across the screen (never shifted off-screen to the right!) */}
      {/* ========================================================================= */}
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dynamic Expanding Circular Clip-Paths for Each Branch Centered at User Tap Point */}
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
                    // Ultra deep slow motion over 45 seconds - meditative and ultra gradual
                    transition={{ duration: 45.0, ease: [0.16, 0.95, 0.35, 1] }}
                  />
                ) : (
                  <circle cx="500" cy="500" r="0" />
                )}
              </clipPath>
            );
          })}
        </defs>
        {/* Branch 1: Long flowing hanging branch across the entire cosmos */}
        <DraggableBranch
          id="branch-1"
          pathData="M -400 310 Q 150 480, 520 440 T 1450 390"
          origin="500px 440px"
          onEnergize={handleBranchEnergize}
          energizedData={energizedBranches['branch-1']}
          allEnergizedStage={awakenedStages['branch-1']}
          isFinalBranch={lastTappedBranchId === 'branch-1'}
          flyOut3D={flyOutBranches['branch-1']}
          flyOutDelay={0}
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

        {/* Branches 2 to 5: Long hanging, flowing cosmic branches */}
        {/* Initially hidden with pointer-events-none so ONLY Branch 1 is clickable! Once discovered, pointer-events are enabled for effortless interaction */}
        <g 
          style={{ 
            opacity: hasDiscovered ? 1 : 0, 
            transition: 'opacity 2.5s ease-out 0.5s',
            pointerEvents: hasDiscovered ? 'auto' : 'none'
          }}
        >
          {/* Branch 2: High sweeping undulating branch */}
          <DraggableBranch
            id="branch-2"
            pathData="M -350 40 Q 250 220, 680 160 T 1420 120"
            origin="500px 160px"
            onEnergize={handleBranchEnergize}
            energizedData={energizedBranches['branch-2']}
            allEnergizedStage={awakenedStages['branch-2']}
            isFinalBranch={lastTappedBranchId === 'branch-2'}
            flyOut3D={flyOutBranches['branch-2']}
            flyOutDelay={0}
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

          {/* Branch 3: Low hanging massive vine */}
          <DraggableBranch
            id="branch-3"
            pathData="M -380 890 Q 200 680, 580 720 T 1450 820"
            origin="500px 720px"
            onEnergize={handleBranchEnergize}
            energizedData={energizedBranches['branch-3']}
            allEnergizedStage={awakenedStages['branch-3']}
            isFinalBranch={lastTappedBranchId === 'branch-3'}
            flyOut3D={flyOutBranches['branch-3']}
            flyOutDelay={0}
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

          {/* Branch 4: Long sweeping diagonal cascade */}
          <DraggableBranch
            id="branch-4"
            pathData="M 1450 30 Q 820 420, 480 620 T -350 940"
            origin="500px 520px"
            onEnergize={handleBranchEnergize}
            energizedData={energizedBranches['branch-4']}
            allEnergizedStage={awakenedStages['branch-4']}
            isFinalBranch={lastTappedBranchId === 'branch-4'}
            flyOut3D={flyOutBranches['branch-4']}
            flyOutDelay={0}
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

          {/* Branch 5: Mid-lower undulating vine */}
          <DraggableBranch
            id="branch-5"
            pathData="M -320 540 Q 280 430, 720 560 T 1420 520"
            origin="500px 540px"
            onEnergize={handleBranchEnergize}
            energizedData={energizedBranches['branch-5']}
            allEnergizedStage={awakenedStages['branch-5']}
            isFinalBranch={lastTappedBranchId === 'branch-5'}
            flyOut3D={flyOutBranches['branch-5']}
            flyOutDelay={0}
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
        </g>
      </svg>
    </div>
  );
}

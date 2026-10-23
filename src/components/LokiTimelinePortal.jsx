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
  allEnergizedStage = false,
  scaleFactor = 1.0
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
  const duration = isFinalBranch ? 6.5 : 12.0;

  // Scale factor: expands the venom layers to match branch thickness!
  const s = scaleFactor;

  const renderTravelingPulse = (pathD, distance, key) => (
    <g key={key}>
      {/* 1. Behind the pulse: Awakened subtle living dark-green body scaled to branch thickness */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#064e3b"
        strokeWidth={9 * s}
        strokeLinecap="butt"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeOut" }}
        opacity={0.8}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="#047857"
        strokeWidth={4 * s}
        strokeLinecap="butt"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeOut" }}
        opacity={0.65}
      />

      {/* 2. The Traveling Pulse - ALL LAYERS PROPORTIONAL TO BRANCH SIZE with Venom-tendril organic edge */}
      <g style={{ filter: "url(#venomPulseDistort)" }}>
        {/* Layer A: Atmospheric emerald volumetric aura bloom */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#10b981"
          strokeWidth={20 * s}
          strokeLinecap="butt"
          strokeDasharray={isFinalBranch ? `${distance + 600} ${distance + 600}` : `${pulseLen} ${distance + 500}`}
          initial={{ strokeDashoffset: isFinalBranch ? distance + 600 : pulseLen }}
          animate={{ strokeDashoffset: isFinalBranch ? 0 : -(distance + 100) }}
          transition={{ duration, ease: "easeOut" }}
          opacity={0.55}
          style={{ filter: `blur(${Math.max(3, 5 * s)}px)` }}
        />

        {/* Layer B: Deep vibrant emerald/lime body */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#22c55e"
          strokeWidth={11 * s}
          strokeLinecap="butt"
          strokeDasharray={isFinalBranch ? `${distance + 600} ${distance + 600}` : `${pulseLen} ${distance + 500}`}
          initial={{ strokeDashoffset: isFinalBranch ? distance + 600 : pulseLen }}
          animate={{ strokeDashoffset: isFinalBranch ? 0 : -(distance + 100) }}
          transition={{ duration, ease: "easeOut" }}
          opacity={0.85}
        />

        {/* Layer C: Vibrant bright lime core */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#84cc16"
          strokeWidth={6 * s}
          strokeLinecap="butt"
          strokeDasharray={isFinalBranch ? `${distance + 600} ${distance + 600}` : `${pulseLen} ${distance + 500}`}
          initial={{ strokeDashoffset: isFinalBranch ? distance + 600 : pulseLen }}
          animate={{ strokeDashoffset: isFinalBranch ? 0 : -(distance + 100) }}
          transition={{ duration, ease: "easeOut" }}
          opacity={0.95}
        />

        {/* Layer D: Intense white-mint core filament */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5 * s}
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

      {/* Full Final Burst when all branches connect (Smooth vibrant living venom glow) */}
      {allEnergizedStage && (
        <g style={{ filter: "url(#venomPulseDistort)" }}>
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#10b981"
            strokeWidth={32 * s}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.75, 0.6] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: `blur(${Math.max(4, 8 * s)}px)` }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#4ade80"
            strokeWidth={15 * s}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.95] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#ffffff"
            strokeWidth={3 * s}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.9] }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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
  flyOutDelay = 0,
  scaleFactor = 1.0
}) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  const smoothX = useSpring(targetX, { stiffness: 18, damping: 25, mass: 2.5 });
  const smoothY = useSpring(targetY, { stiffness: 18, damping: 25, mass: 2.5 });

  const isDragging = useRef(false);
  const branchPathRef = useRef(null);

  const [tapRatio, setTapRatio] = useState(0.5);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const initialTargetX = targetX.get();
    const initialTargetY = targetY.get();

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
      const totalLen = pathEl.getTotalLength();
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

    const handlePointerMove = (moveEvent) => {
      if (!isDragging.current) return;
      const dx = moveEvent.clientX - startClientX;
      const dy = moveEvent.clientY - startClientY;
      
      const resistanceFactor = 0.18;
      const clampedX = Math.max(-80, Math.min(80, initialTargetX + dx * resistanceFactor));
      const clampedY = Math.max(-60, Math.min(60, initialTargetY + dy * resistanceFactor));
      
      targetX.set(clampedX);
      targetY.set(clampedY);
    };

    const handlePointerUp = () => {
      isDragging.current = false;
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
      // Wind sway normal animation OR 3D Fly-Out past screen towards camera
      animate={flyOut3D ? {
        scale: [1, 1.4, 3.8, 8.5],
        opacity: [1, 1, 0.9, 0],
        y: [0, -30, -120, -350]
      } : { 
        y: windConfig.y,
        x: windConfig.x,
        rotate: windConfig.rotate
      }}
      transition={flyOut3D ? {
        duration: 3.2,
        delay: flyOutDelay,
        ease: [0.15, 0.85, 0.35, 1]
      } : {
        duration: windConfig.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: windConfig.delay || 0
      }}
      style={{ transformOrigin: origin }}
    >
      <motion.g
        style={{ x: smoothX, y: smoothY, transformOrigin: origin }}
        onPointerDown={handlePointerDown}
        className="pointer-events-auto cursor-grab active:cursor-grabbing select-none"
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
            scaleFactor={scaleFactor}
          />
        )}
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
  // Track which branches have been energized with Loki's life magic
  const [energizedBranches, setEnergizedBranches] = useState({});
  // Track individual branch awakened full stages when all 5 are touched ("takk takk takk" stagger)
  const [awakenedStages, setAwakenedStages] = useState({});
  // Track which branch was tapped last (the 5th branch that triggered the continuous venom cascade)
  const [lastTappedBranchId, setLastTappedBranchId] = useState(null);
  // Track 3D fly-out state (branches fly towards camera and past the screen)
  const [trigger3DFlyOut, setTrigger3DFlyOut] = useState(false);

  const handleBranchEnergize = (id, clickX, clickY) => {
    setEnergizedBranches(prev => {
      const next = {
        ...prev,
        [id]: {
          active: true,
          x: clickX,
          y: clickY,
          timestamp: Date.now()
        }
      };

      const count = Object.keys(next).length;
      if (count === 5) {
        setLastTappedBranchId(id);

        // Sequence:
        // 1. Final 5th branch continuous venom surge flows to ends in ~4-5s
        // 2. Venom spreads across all remaining branches smoothly igniting them
        const allBranchIds = ['branch-1', 'branch-2', 'branch-3', 'branch-4', 'branch-5'];
        allBranchIds.forEach((bId, idx) => {
          setTimeout(() => {
            setAwakenedStages(stagePrev => ({ ...stagePrev, [bId]: true }));
          }, 3500 + idx * 400);
        });

        // 3. Once all branches are fully glowing, trigger 3D Fly-Out past screen
        setTimeout(() => {
          setTrigger3DFlyOut(true);
        }, 6500);
      }

      return next;
    });
  };

  // Total energized count (0 to 5) directly expands the inner white core spine width!
  const energizedCount = Object.keys(energizedBranches).length;
  // Starting normal width = 16px (w-4), progressively widens up to 56px (w-14) as user infuses branches
  const whiteCoreWidth = Math.min(56, 16 + energizedCount * 8);

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

          {/* Venom tendril organic distortion for the traveling life pulse */}
          <filter id="venomPulseDistort" x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.12" numOctaves="3" result="venomNoise" />
            <feDisplacementMap in="SourceGraphic" in2="venomNoise" scale="9" xChannelSelector="R" yChannelSelector="G" />
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
          className="absolute h-[120vh] w-64 sm:w-80 pointer-events-none"
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
          className="absolute h-[115vh] w-24 sm:w-36 pointer-events-none"
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

        {/* Intense white-mint core tear spine (Width starts normal & increases organically as Loki touches branches) */}
        <motion.div
          animate={{
            width: `${whiteCoreWidth}px`,
            opacity: [0.85, 1, 0.85],
            boxShadow: energizedCount > 0 
              ? `0 0 ${35 + energizedCount * 10}px #ffffff, 0 0 ${70 + energizedCount * 14}px #a7f3d0, 0 0 ${110 + energizedCount * 18}px #34d399`
              : '0 0 35px #a7f3d0, 0 0 70px #34d399, 0 0 110px #10b981'
          }}
          transition={{
            width: { duration: 25.0, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute h-[110vh] pointer-events-none rounded-[50%]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(209,250,229,0.9) 15%, #ffffff 50%, rgba(167,243,208,0.9) 85%, transparent 100%)',
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
        <defs>
          {/* 3D Perspective Linear Gradients for Vine Silhouette Depth:
              Tapering smoothly from close-up foreground (thick, saturated) towards the distant portal (thin, darker) */}
          <linearGradient id="branch1_depth_grad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#0c1712" stopOpacity="1" />
            <stop offset="55%" stopColor="#030806" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020604" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="branch2_depth_grad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#0c1813" stopOpacity="1" />
            <stop offset="60%" stopColor="#030806" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020604" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="branch3_depth_grad" x1="0%" y1="100%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#0d1a14" stopOpacity="1" />
            <stop offset="55%" stopColor="#030806" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020604" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="branch4_depth_grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d1a14" stopOpacity="1" />
            <stop offset="50%" stopColor="#030806" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020604" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="branch5_depth_grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#0c1712" stopOpacity="1" />
            <stop offset="55%" stopColor="#030806" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020604" stopOpacity="0.75" />
          </linearGradient>

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
        {/* Branch 1: The Massive Foreground Branch Cluster (Near screen on Top-Left: thick trunk clump with multiple braided roots) */}
        <DraggableBranch
          id="branch-1"
          pathData="M -150 220 Q 250 340, 500 370 T 1150 390"
          origin="500px 300px"
          onEnergize={handleBranchEnergize}
          energizedData={energizedBranches['branch-1']}
          allEnergizedStage={awakenedStages['branch-1']}
          isFinalBranch={lastTappedBranchId === 'branch-1'}
          flyOut3D={trigger3DFlyOut}
          flyOutDelay={0}
          scaleFactor={2.2}
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
            strokeWidth="110"
            strokeLinecap="round"
          />
          {/* Ambient drop shadow with heavy 3D depth for close foreground trunk */}
          <path
            d="M -150 220 Q 250 340, 500 370 T 1150 390"
            fill="none"
            stroke="#000000"
            strokeWidth="35"
            strokeLinecap="round"
            opacity="0.95"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.95))" }}
          />

          {/* MASSIVE FOREGROUND TRUNK CLUMP (Top-Left near camera: up to 55px thick, tapering to 9px in distance) */}
          {/* Outer cluster base silhouette */}
          <path
            d="M -150 180 Q 150 280, 420 350"
            fill="none"
            stroke="url(#branch1_depth_grad)"
            strokeWidth="38"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M -150 250 Q 180 320, 450 365"
            fill="none"
            stroke="url(#branch1_depth_grad)"
            strokeWidth="32"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Main Huge Root Trunk extending towards portal */}
          <path
            d="M -150 220 Q 250 340, 500 370"
            fill="none"
            stroke="url(#branch1_depth_grad)"
            strokeWidth="48"
            strokeLinecap="round"
          />
          {/* Main Continuous Spine tapering smoothly towards the distant portal */}
          <path
            d="M -150 220 Q 250 340, 500 370 T 1150 390"
            fill="none"
            stroke="url(#branch1_depth_grad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Subtle Darkest Emerald Edge Glint */}
          <path
            d="M -150 219 Q 250 339, 500 369 T 1150 389"
            fill="none"
            stroke="#062d22"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.65"
          />
        </DraggableBranch>

        {/* Branch 2: Distant High Thin Branch (Way in the background, near the portal: thin delicate wire) */}
        <DraggableBranch
          id="branch-2"
          pathData="M -120 70 Q 400 160, 680 140 T 1120 180"
          origin="500px 150px"
          onEnergize={handleBranchEnergize}
          energizedData={energizedBranches['branch-2']}
          allEnergizedStage={awakenedStages['branch-2']}
          isFinalBranch={lastTappedBranchId === 'branch-2'}
          flyOut3D={trigger3DFlyOut}
          flyOutDelay={0.25}
          scaleFactor={0.55}
          windConfig={{
            y: [10, -10, 10],
            x: [5, -5, 5],
            rotate: [0.8, -0.8, 0.8],
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
          {/* Distant soft shadow */}
          <path
            d="M -120 70 Q 400 160, 680 140 T 1120 180"
            fill="none"
            stroke="#000000"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.75"
          />
          {/* Thin delicate distant branch body (6px thin) */}
          <path
            d="M -120 70 Q 400 160, 680 140 T 1120 180"
            fill="none"
            stroke="url(#branch2_depth_grad)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M -120 69 Q 400 159, 680 139 T 1120 179"
            fill="none"
            stroke="#062d22"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.55"
          />
        </DraggableBranch>

        {/* Branch 3: Lower Ascending Vine (Medium distance, crossing up towards portal) */}
        <DraggableBranch
          id="branch-3"
          pathData="M -150 820 Q 200 720, 520 670 T 1150 860"
          origin="500px 750px"
          onEnergize={handleBranchEnergize}
          energizedData={energizedBranches['branch-3']}
          allEnergizedStage={awakenedStages['branch-3']}
          isFinalBranch={lastTappedBranchId === 'branch-3'}
          flyOut3D={trigger3DFlyOut}
          flyOutDelay={0.5}
          scaleFactor={0.75}
          windConfig={{
            y: [-14, 14, -14],
            x: [-6, 6, -6],
            rotate: [-0.8, 0.8, -0.8],
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
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M -150 820 Q 200 720, 520 670 T 1150 860"
            fill="none"
            stroke="url(#branch3_depth_grad)"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          <path
            d="M -150 819 Q 200 719, 520 669 T 1150 859"
            fill="none"
            stroke="#062d22"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.55"
          />
        </DraggableBranch>

        {/* Branch 4: Distant Deep Diagonal Branch (Thin delicate thread crossing behind portal) */}
        <DraggableBranch
          id="branch-4"
          pathData="M 1150 80 Q 750 380, 450 550 T -120 880"
          origin="500px 500px"
          onEnergize={handleBranchEnergize}
          energizedData={energizedBranches['branch-4']}
          allEnergizedStage={awakenedStages['branch-4']}
          isFinalBranch={lastTappedBranchId === 'branch-4'}
          flyOut3D={trigger3DFlyOut}
          flyOutDelay={0.75}
          scaleFactor={0.5}
          windConfig={{
            x: [-10, 10, -10],
            y: [8, -8, 8],
            rotate: [-0.5, 0.5, -0.5],
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
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Distant thin branch (6px) */}
          <path
            d="M 1150 80 Q 750 380, 450 550 T -120 880"
            fill="none"
            stroke="url(#branch4_depth_grad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 1150 79 Q 750 379, 450 549 T -120 879"
            fill="none"
            stroke="#062d22"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </DraggableBranch>

        {/* Branch 5: Mid-lower gentle horizontal vine (Thin distant line entering portal) */}
        <DraggableBranch
          id="branch-5"
          pathData="M -100 480 Q 300 420, 650 490 T 1150 510"
          origin="500px 520px"
          onEnergize={handleBranchEnergize}
          energizedData={energizedBranches['branch-5']}
          allEnergizedStage={awakenedStages['branch-5']}
          isFinalBranch={lastTappedBranchId === 'branch-5'}
          flyOut3D={trigger3DFlyOut}
          flyOutDelay={1.0}
          scaleFactor={0.55}
          windConfig={{
            y: [10, -10, 10],
            x: [6, -6, 6],
            rotate: [0.6, -0.6, 0.6],
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
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.75"
          />
          {/* Distant thin branch (6px) */}
          <path
            d="M -100 480 Q 300 420, 650 490 T 1150 510"
            fill="none"
            stroke="url(#branch5_depth_grad)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M -100 479 Q 300 419, 650 489 T 1150 509"
            fill="none"
            stroke="#062d22"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.55"
          />
        </DraggableBranch>
      </svg>
    </div>
  );
}

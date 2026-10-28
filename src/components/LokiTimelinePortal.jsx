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
  allEnergizedStage = false,
  strokeScale = 1.0 // Scales venom stroke widths proportionally to branch depth!
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
        strokeWidth={11 * strokeScale}
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
        strokeWidth={6 * strokeScale}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, ease: "easeInOut" }}
        opacity={0.8}
      />

      {/* 2. The Traveling Pulse - Loki Authentic Sacred Timeline Color Flow */}
      {/* Strictly contained inside branch borders without overflowing outside */}
      <g style={{ filter: "url(#venomPulseDistort)" }}>
        {/* Layer A: Volumetric Edge Glow - Proportional to branch width */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#008F4C"
          strokeWidth={14 * strokeScale}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0.45, 1],
            opacity: [0.3, 0.85, 0.6]
          }}
          transition={{ duration, ease: "easeInOut" }}
          style={{ filter: "blur(2px)" }}
        />

        {/* Layer B: True Loki Green (#00C853) & Electric Green (#00FF66) Body */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#00C853"
          strokeWidth={9 * strokeScale}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0.5, 1],
            opacity: [0.4, 0.95, 0.85]
          }}
          transition={{ duration, ease: "easeInOut" }}
        />

        {/* Layer C: Neon Green (#39FF14) Radiant Core */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#39FF14"
          strokeWidth={5 * strokeScale}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0.55, 1],
            opacity: [0.5, 1, 0.9]
          }}
          transition={{ duration, ease: "easeInOut" }}
        />

        {/* Layer D: Mint Green (#7CFFB2) & Pale Green Glow (#B9FFD0) Center Filament */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#B9FFD0"
          strokeWidth={Math.max(1, 2 * strokeScale)}
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
            strokeWidth={15 * strokeScale}
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
            strokeWidth={9 * strokeScale}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.85] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#39FF14"
            strokeWidth={5 * strokeScale}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.95] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#B9FFD0"
            strokeWidth={Math.max(1, 2 * strokeScale)}
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
  isClickable = false,
  strokeScale = 1.0
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
            strokeScale={strokeScale}
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

  // Replay key to force full fresh mount reset on Shift + R
  const [replayKey, setReplayKey] = useState(0);

  // Dev Shortcut: Press "Shift + R" to replay/reset portal scene instantly without tapping 3 times!
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && (e.key === 'R' || e.key === 'r')) {
        e.preventDefault();
        setEnergizedBranches({});
        setAwakenedStages({});
        setLastTappedBranchId(null);
        setVoyageProgress(0);
        setHasDiscovered(false);
        setReplayKey(k => k + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

      // 2. Parallax Camera Flight:
      // User watches venom spread completely across all 5 branches (cascade completes at ~10.5s).
      // After venom fully flows across all branches, camera flight begins smoothly at 11.5s!
      setTimeout(() => {
        setVoyageProgress(1);
      }, 11500);

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

  // Deep Multiverse Tapestry Filaments (~16 subtle background timelines that form the Yggdrasil tree tapestry)
  const cosmicFilaments = [
    { d: "M -350 180 Q 180 80, 520 220 T 1400 160", width: 1.2, opacity: 0.28, color: "#00C853", windDur: 27 },
    { d: "M -300 280 Q 300 380, 750 260 T 1420 320", width: 1.5, opacity: 0.35, color: "#39FF14", windDur: 31 },
    { d: "M -380 420 Q 220 540, 620 440 T 1450 480", width: 1.0, opacity: 0.25, color: "#00E676", windDur: 29 },
    { d: "M -320 620 Q 350 500, 780 640 T 1400 580", width: 1.3, opacity: 0.32, color: "#7CFFB2", windDur: 33 },
    { d: "M -400 780 Q 250 860, 680 760 T 1420 840", width: 1.6, opacity: 0.38, color: "#00FF66", windDur: 26 },
    { d: "M 1400 90 Q 750 280, 380 140 T -320 240", width: 1.1, opacity: 0.30, color: "#00C853", windDur: 30 },
    { d: "M 1420 380 Q 820 240, 420 410 T -350 360", width: 1.4, opacity: 0.36, color: "#39FF14", windDur: 28 },
    { d: "M 1450 680 Q 780 780, 350 630 T -300 720", width: 1.2, opacity: 0.28, color: "#00FF66", windDur: 34 },
    { d: "M -360 80 Q 420 180, 850 100 T 1420 190", width: 0.9, opacity: 0.22, color: "#B9FFD0", windDur: 35 },
    { d: "M -340 490 Q 150 390, 580 510 T 1450 430", width: 1.4, opacity: 0.34, color: "#00E676", windDur: 32 },
    { d: "M -390 850 Q 320 720, 710 880 T 1400 790", width: 1.0, opacity: 0.26, color: "#39FF14", windDur: 25 },
    { d: "M 1420 220 Q 900 420, 460 300 T -350 420", width: 1.3, opacity: 0.32, color: "#00C853", windDur: 31 },
    { d: "M 1450 510 Q 880 620, 490 530 T -320 610", width: 1.1, opacity: 0.28, color: "#7CFFB2", windDur: 29 },
    { d: "M -350 950 Q 280 820, 680 940 T 1420 890", width: 1.5, opacity: 0.35, color: "#00FF66", windDur: 27 },
    { d: "M -320 15 Q 380 120, 780 40 T 1450 110", width: 0.8, opacity: 0.20, color: "#B9FFD0", windDur: 36 },
    { d: "M 1400 820 Q 850 930, 420 840 T -340 910", width: 1.2, opacity: 0.29, color: "#00E676", windDur: 30 }
  ];

  return (
    <div key={replayKey} className="fixed inset-0 flex items-center justify-center pointer-events-none z-[80] overflow-hidden">
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
          - Initially 100% COMPLETELY HIDDEN (opacity: 0, x: -90vw, scale: 0.15).
          - On First Tap (hasDiscovered = true):
            Emerges in far deep space distance (scale: 0.20, blurry).
          - Stays far away in distance until voyage begins.
          - When Voyage begins (voyageProgress > 0):
            Moves forward strictly synchronized with the camera's 24-second branch journey!
      */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ x: "-90vw", scale: 0.15, opacity: 0, filter: "blur(32px)" }}
        animate={hasDiscovered ? {
          x: "0vw",
          scale: voyageProgress > 0 ? [0.20, 0.32, 0.55, 1.05] : 0.20,
          opacity: voyageProgress > 0 ? [0.4, 0.6, 0.85, 1] : 0.45,
          filter: voyageProgress > 0 ? ["blur(14px)", "blur(10px)", "blur(4px)", "blur(0px)"] : "blur(14px)"
        } : {
          x: "-90vw",
          scale: 0.15,
          opacity: 0,
          filter: "blur(32px)"
        }}
        transition={voyageProgress > 0 ? {
          scale: { duration: 24.0, ease: [0.25, 0.1, 0.25, 1.0], times: [0, 0.4, 0.75, 1] },
          opacity: { duration: 24.0, ease: [0.25, 0.1, 0.25, 1.0], times: [0, 0.4, 0.75, 1] },
          filter: { duration: 24.0, ease: [0.25, 0.1, 0.25, 1.0], times: [0, 0.4, 0.75, 1] },
          x: { duration: 8.0, ease: [0.16, 1, 0.3, 1] }
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

        {/* Outer illuminated cloudy rift lip - Scales naturally along with the 24s camera journey */}
        <motion.div
          initial={{ scaleX: 1.0, scaleY: 1.0, opacity: 0.85 }}
          animate={voyageProgress > 0 ? {
            scaleX: [0.5, 0.8, 1.15, 1.42],
            scaleY: [0.6, 0.85, 1.0, 1.03],
            borderRadius: [
              '15% 75% 55% 35% / 70% 25% 65% 45%',
              '25% 65% 60% 30% / 65% 35% 60% 50%',
              '10% 80% 50% 40% / 75% 20% 70% 40%',
              '18% 72% 56% 36% / 68% 28% 64% 46%'
            ],
            opacity: [0.5, 0.75, 0.92, 0.98]
          } : {
            scaleX: 0.5,
            scaleY: 0.6,
            opacity: 0.5
          }}
          transition={{
            scaleX: { duration: 24.0, ease: [0.25, 0.1, 0.25, 1.0], times: [0, 0.4, 0.75, 1] },
            scaleY: { duration: 24.0, ease: [0.25, 0.1, 0.25, 1.0], times: [0, 0.4, 0.75, 1] },
            borderRadius: { duration: 10.0, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 24.0, ease: "easeOut", times: [0, 0.4, 0.75, 1] }
          }}
          className="absolute h-[120vh] w-64 sm:w-80 pointer-events-none"
          style={{
            transformOrigin: "52% 48%",
            background: 'radial-gradient(ellipse at 50% 50%, rgba(185,255,208,0.85) 0%, rgba(124,255,178,0.6) 30%, rgba(0,200,83,0.3) 55%, transparent 75%)',
            filter: 'blur(25px)'
          }}
        />

        {/* Inner Void / Deep Spacetime Tear - Synchronized with the 24s camera journey */}
        <motion.div
          initial={{ scaleX: 1.0, scaleY: 1.0 }}
          animate={voyageProgress > 0 ? {
            scaleX: [0.45, 0.75, 1.15, 1.55],
            scaleY: [0.55, 0.8, 0.98, 1.02],
            borderRadius: [
              '20% 65% 40% 60% / 65% 35% 55% 45%',
              '35% 55% 48% 52% / 58% 42% 50% 50%',
              '15% 75% 38% 62% / 70% 30% 58% 42%',
              '22% 68% 42% 58% / 64% 36% 54% 46%'
            ]
          } : {
            scaleX: 0.45,
            scaleY: 0.55
          }}
          transition={{
            scaleX: { duration: 24.0, ease: [0.25, 0.1, 0.25, 1.0], times: [0, 0.4, 0.75, 1] },
            scaleY: { duration: 24.0, ease: [0.25, 0.1, 0.25, 1.0], times: [0, 0.4, 0.75, 1] },
            borderRadius: { duration: 10.5, repeat: Infinity, ease: "easeInOut" }
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
      {/* 3. MULTIVERSE TIMELINE BRANCHES: UNIFIED PERSPECTIVE DEPTH STACK          */}
      {/* ========================================================================= */}
      {/* 
        CORRECT REAL-WORLD Z-STACKING ORDER (from back/deep to front/camera):
        1. Deepest Background: Branch 4 (~1px near portal)
        2. Far-Mid Depth:      Branch 3 (~2-3px)
        3. Mid Depth:          Branch 5 (~3-4px)
        4. Near Depth:         Branch 2 (~5px)
        5. FOREGROUND (TOP):   Branch 1 (~8px, User Grab/Tap Vine)
        
        Because of this, thin distant branches will NEVER paint over or overlap on 
        top of the thick foreground branches!
        
        SYNCHRONIZED PULL (All elements locked to one shared continuous timeline):
        Total synchronized camera travel = 24.0s (ease: [0.25, 0.1, 0.25, 1.0]).
        - Layer 1 (Nearest, 8px): Passes camera first (0s -> 9s)
        - Layer 2 (5px): Enters near focus, passes camera (5s -> 14s)
        - Layer 3 (4px): Follows in line, passes camera (9s -> 18s)
        - Layer 4 (2.5px): Follows in line, passes camera (13s -> 22s)
        - Layer 5 (1px near portal): Sweeps past camera (17s -> 24s)
        - Portal: Approaches from depth simultaneously and locks into full bloom (0s -> 24s)!
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

        {/* ------------------------------------------------------------- */}
        {/* MULTIVERSE TAPESTRY FILAMENTS (LOKI YGGDRASIL WORLD TREE)     */}
        {/* Rendered at deepest layer right in front of the distant portal */}
        {/* Sweeps gracefully out past the camera as the journey advances */}
        {/* ------------------------------------------------------------- */}
        <g 
          style={{ 
            opacity: hasDiscovered ? 1 : 0, 
            transition: 'opacity 3.0s ease-out 0.8s',
            pointerEvents: 'none'
          }}
        >
          {cosmicFilaments.map((f, i) => (
            <motion.g
              key={`filament-${i}`}
              animate={voyageProgress > 0 ? {
                scale: [1, 1.4, 3.2],
                y: [0, (i % 2 === 0 ? -1 : 1) * (200 + i * 40), (i % 2 === 0 ? -1 : 1) * 1600],
                x: [0, (i % 3 === 0 ? 1 : -1) * (60 + i * 15), (i % 3 === 0 ? 1 : -1) * 700],
                opacity: [f.opacity, f.opacity * 1.5, 0]
              } : {
                y: [i % 2 === 0 ? 6 : -6, i % 2 === 0 ? -6 : 6, i % 2 === 0 ? 6 : -6],
                opacity: [f.opacity, f.opacity * 1.3, f.opacity]
              }}
              transition={voyageProgress > 0 ? {
                duration: 22.0,
                delay: 0,
                ease: [0.25, 0.1, 0.25, 1.0],
                times: [0, 0.5, 0.9 + (i % 3) * 0.04]
              } : {
                duration: f.windDur,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Soft dark shadow line */}
              <path
                d={f.d}
                fill="none"
                stroke="#000805"
                strokeWidth={f.width * 2.8}
                strokeLinecap="round"
                opacity={0.7}
              />
              {/* Outer timeline glowing filament */}
              <path
                d={f.d}
                fill="none"
                stroke={f.color}
                strokeWidth={f.width * 1.8}
                strokeLinecap="round"
                opacity={0.6}
                style={{ filter: "blur(1.5px)" }}
              />
              {/* Core bright neon timeline filament */}
              <path
                d={f.d}
                fill="none"
                stroke="#ffffff"
                strokeWidth={Math.max(0.6, f.width * 0.7)}
                strokeLinecap="round"
                opacity={0.85}
              />
            </motion.g>
          ))}
        </g>

        {/* ------------------------------------------------------------- */}
        {/* DEPTH LAYER 5: Branch 4 (~1px near Portal, diagonal thread)    */}
        {/* Starts far -> reaches foreground ~16s -> sweeps past camera!  */}
        {/* ------------------------------------------------------------- */}
        <g 
          style={{ 
            opacity: hasDiscovered ? 1 : 0, 
            transition: 'opacity 2.5s ease-out 0.5s',
            pointerEvents: 'none'
          }}
        >
          <motion.g
            animate={voyageProgress > 0 ? {
              scale: [1, 1.4, 2.8, 4.2],
              y: [0, 100, 750, 1950],
              x: [0, -40, -180, -450],
              opacity: [1, 1, 1, 0]
            } : { scale: 1, y: 0, x: 0, opacity: 1 }}
            transition={{
              duration: 24.0,
              delay: 0,
              ease: [0.25, 0.1, 0.25, 1.0],
              times: [0, 0.45, 0.75, 0.98]
            }}
            style={{ transformOrigin: "600px 480px" }}
          >
            <DraggableBranch
              id="branch-4"
              pathData="M 1450 30 Q 820 420, 480 620 T -350 940"
              origin="500px 520px"
              strokeScale={0.7}
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
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 1450 30 Q 820 420, 480 620 T -350 940"
                fill="none"
                stroke="#050a08"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M 1450 29 Q 820 419, 480 619 T -350 939"
                fill="none"
                stroke="#062d22"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </DraggableBranch>
          </motion.g>

          {/* ----------------------------------------------------------- */}
          {/* DEPTH LAYER 4: Branch 3 (~2-3px visual -> grows to 8px pass) */}
          {/* Approaches from deep depth, expands to foreground, sweeps out */}
          {/* ----------------------------------------------------------- */}
          <motion.g
            animate={voyageProgress > 0 ? {
              scale: [1, 1.6, 3.2, 4.6],
              y: [0, 80, 550, 1850],
              x: [0, -20, -90, -260],
              opacity: [1, 1, 1, 0]
            } : { scale: 1, y: 0, x: 0, opacity: 1 }}
            transition={{
              duration: 24.0,
              delay: 0,
              ease: [0.25, 0.1, 0.25, 1.0],
              times: [0, 0.4, 0.72, 0.92]
            }}
            style={{ transformOrigin: "500px 720px" }}
          >
            <DraggableBranch
              id="branch-3"
              pathData="M -380 890 Q 200 680, 580 720 T 1450 820"
              origin="500px 720px"
              strokeScale={0.8}
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
                strokeWidth="11"
                strokeLinecap="round"
                opacity="0.95"
              />
              <path
                d="M -380 890 Q 200 680, 580 720 T 1450 820"
                fill="none"
                stroke="#050a08"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M -380 889 Q 200 679, 580 719 T 1450 819"
                fill="none"
                stroke="#062d22"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </DraggableBranch>
          </motion.g>

          {/* ----------------------------------------------------------- */}
          {/* DEPTH LAYER 3: Branch 5 (~3-4px -> Foreground Sweep)        */}
          {/* Approaches, grows thick, and cleanly passes camera out of view */}
          {/* ----------------------------------------------------------- */}
          <motion.g
            animate={voyageProgress > 0 ? {
              scale: [1, 1.7, 3.2, 4.4],
              y: [0, 150, 680, 1900],
              x: [0, 40, 130, 320],
              opacity: [1, 1, 1, 0]
            } : { scale: 1, y: 0, x: 0, opacity: 1 }}
            transition={{
              duration: 24.0,
              delay: 0,
              ease: [0.25, 0.1, 0.25, 1.0],
              times: [0, 0.35, 0.65, 0.88]
            }}
            style={{ transformOrigin: "500px 540px" }}
          >
            <DraggableBranch
              id="branch-5"
              pathData="M -320 540 Q 280 430, 720 560 T 1420 520"
              origin="500px 540px"
              strokeScale={0.85}
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
                strokeWidth="12"
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
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </DraggableBranch>
          </motion.g>

          {/* ----------------------------------------------------------- */}
          {/* DEPTH LAYER 2: Branch 2 (~5px -> Grows large and passes top)*/}
          {/* Approaches from depth, expands to Branch 1 size, then sweeps */}
          {/* ----------------------------------------------------------- */}
          <motion.g
            animate={voyageProgress > 0 ? {
              scale: [1, 1.8, 3.4],
              y: [0, -350, -1850],
              x: [0, -60, -320],
              opacity: [1, 1, 0]
            } : { scale: 1, y: 0, x: 0, opacity: 1 }}
            transition={{
              duration: 24.0,
              delay: 0,
              ease: [0.25, 0.1, 0.25, 1.0],
              times: [0, 0.35, 0.72]
            }}
            style={{ transformOrigin: "500px 160px" }}
          >
            <DraggableBranch
              id="branch-2"
              pathData="M -350 40 Q 250 220, 680 160 T 1420 120"
              origin="500px 160px"
              strokeScale={1.0}
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
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </DraggableBranch>
          </motion.g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* DEPTH LAYER 1: FOREFRONT MAIN TIMELINE (Branch 1 - Forefront) */}
        {/* Passes camera smoothly first, leaving view by ~10s           */}
        {/* ------------------------------------------------------------- */}
        <motion.g
          animate={voyageProgress > 0 ? {
            scale: [1, 2.8],
            y: [0, -1700],
            x: [0, -280],
            opacity: [1, 0]
          } : { scale: 1, y: 0, x: 0, opacity: 1 }}
          transition={{
            duration: 24.0,
            delay: 0,
            ease: [0.25, 0.1, 0.25, 1.0],
            times: [0, 0.42]
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
            {/* Main Dark Silhouette Body - Forefront Width: 16 */}
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
      </svg>
    </div>
  );
}

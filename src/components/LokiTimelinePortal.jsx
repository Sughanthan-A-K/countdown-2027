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
  // Continuous smooth glide that never stops or stutters
  const duration = 6.0;

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
        transition={{ duration, ease: "linear" }}
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
        transition={{ duration, ease: "linear" }}
        opacity={0.8}
      />

      {/* 2. The Traveling Pulse - Loki Authentic Sacred Timeline Color Flow */}
      {/* Strictly contained inside branch borders without overflowing outside */}
      <g style={{ filter: "url(#venomPulseDistort)" }}>
        {/* Layer A: Volumetric Edge Glow - Continuous smooth linear sweep */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#008F4C"
          strokeWidth={14 * strokeScale}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration, ease: "linear" }}
          style={{ filter: "blur(2px)" }}
        />

        {/* Layer B: True Loki Green & Electric Green Body */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#00C853"
          strokeWidth={9 * strokeScale}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.9 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration, ease: "linear" }}
        />

        {/* Layer C: Neon Green Radiant Core */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#39FF14"
          strokeWidth={5 * strokeScale}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration, ease: "linear" }}
        />

        {/* Layer D: Mint Green Center Filament */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#B9FFD0"
          strokeWidth={Math.max(1, 2 * strokeScale)}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration, ease: "linear" }}
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

  // Portal opening stage: 0 = hidden, 1 = thin hairline vertical crack, 2 = slowly opening organic portal
  const [portalStage, setPortalStage] = useState(0);

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
        setPortalStage(0);
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

      // Fluid Venom Propagation cascades across remaining branches one by one:
      const cascadeConfig = [
        { id: 'branch-2', tapRatio: 0.05, delay: 1000 },
        { id: 'branch-5', tapRatio: 0.92, delay: 2000 },
        { id: 'branch-3', tapRatio: 0.95, delay: 3000 },
        { id: 'branch-4', tapRatio: 0.08, delay: 4000 },
        // Cosmic filaments also energize sequentially
        ...Array.from({ length: 16 }).map((_, idx) => ({
          id: `filament-${idx}`,
          tapRatio: idx % 2 === 0 ? 0.05 : 0.95,
          delay: 4500 + idx * 300
        }))
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

      // Once venom has spread across almost all branches (~7.0s):
      // Stage 1: A subtle thin vertical hairline tear appears in the center!
      setTimeout(() => {
        setPortalStage(1);
      }, 7000);

      // Stage 2 (~8.5s): Slowly, organically cracks open across 20 full seconds!
      setTimeout(() => {
        setPortalStage(2);
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
          - Exactly Centered Portal (NOT full screen height - sized naturally ~52vh / 360px high)
          - Intro opens ultra-slowly across 20.0 seconds!
          - Organic mystical portal gateway shape (almond / vesica piscis gateway).
      */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={portalStage > 0 ? {
          opacity: 1
        } : {
          opacity: 0
        }}
        transition={{
          duration: 2.0,
          ease: "easeOut"
        }}
        style={{ transformOrigin: "50% 50%" }}
      >
        {/* Layer 1: Cosmic Aurora Background Halo (Centered) */}
        <motion.div
          animate={portalStage === 2 ? {
            opacity: 0.85,
            scale: 1.0
          } : {
            opacity: portalStage === 1 ? 0.25 : 0,
            scale: 0.6
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,200,83,0.7) 0%, rgba(0,143,76,0.45) 35%, rgba(0,77,43,0.2) 65%, transparent 85%)',
            filter: 'blur(35px)'
          }}
        />

        {/* Layer 2: Radiant Center Elliptical Glow */}
        <motion.div
          animate={portalStage === 2 ? {
            opacity: 0.75,
            scale: 1.0
          } : {
            opacity: portalStage === 1 ? 0.3 : 0,
            scale: 0.4
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[240px] sm:w-[320px] h-[380px] sm:h-[440px] rounded-[50%] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,255,102,0.65) 0%, rgba(0,200,83,0.4) 40%, rgba(0,107,60,0.15) 70%, transparent 95%)',
            filter: 'blur(30px)'
          }}
        />

        {/* Outer illuminated portal gateway border - 20s ultra-slow opening */}
        <motion.div
          animate={portalStage === 2 ? {
            scaleX: 1.0,
            opacity: 0.95
          } : {
            scaleX: 0.04,
            opacity: portalStage === 1 ? 0.75 : 0
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-[340px] sm:h-[420px] w-[180px] sm:w-[240px] pointer-events-none rounded-[50%]"
          style={{
            transformOrigin: "50% 50%",
            background: 'radial-gradient(ellipse at 50% 50%, rgba(185,255,208,0.75) 0%, rgba(124,255,178,0.45) 35%, rgba(0,200,83,0.2) 60%, transparent 80%)',
            filter: 'blur(16px)'
          }}
        />

        {/* Inner Organic Gateway Tear Void - Centered Portal Aperture */}
        <motion.div
          animate={portalStage === 2 ? {
            scaleX: 1.0,
            opacity: 1
          } : {
            scaleX: 0.03,
            opacity: portalStage === 1 ? 0.85 : 0
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-[300px] sm:h-[380px] w-[120px] sm:w-[170px] pointer-events-none rounded-[50%]"
          style={{
            transformOrigin: "50% 50%",
            background: 'radial-gradient(ellipse at 50% 50%, #002b18 0%, #004D2B 45%, #0B1F16 80%, transparent 100%)',
            borderLeft: '3px solid #B9FFD0',
            borderRight: '3px solid #7CFFB2',
            borderTop: '2.5px solid #00FF66',
            borderBottom: '2.5px solid #00C853',
            boxShadow: '0 0 25px #7CFFB2, 0 0 50px #00FF66, 0 0 80px #00C853, inset 0 0 25px rgba(0,0,0,0.95)',
            filter: 'url(#lokiOrganicRiftEdge)'
          }}
        />

        {/* Center Point of Origin Light Star */}
        <motion.div
          animate={portalStage > 0 ? {
            scale: [0.85, 1.25, 0.85],
            opacity: 1
          } : {
            scale: 0,
            opacity: 0
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-8 h-8 rounded-full bg-[#ffffff] blur-sm shadow-[0_0_30px_#ffffff,0_0_60px_#B9FFD0,0_0_100px_#00FF66] pointer-events-none"
        />

        {/* Calm White-Mint Core Aperture Spine - Starts as hairline vertical crack, expands smoothly over 20s */}
        <motion.div
          animate={portalStage === 2 ? {
            width: "18px",
            opacity: 0.95
          } : {
            width: portalStage === 1 ? "2px" : "0px",
            opacity: portalStage === 1 ? 0.9 : 0
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-[280px] sm:h-[350px] pointer-events-none rounded-[50%]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(185,255,208,0.95) 15%, #ffffff 50%, rgba(124,255,178,0.95) 85%, transparent 100%)',
            boxShadow: '0 0 25px #ffffff, 0 0 45px #B9FFD0, 0 0 75px #00FF66',
            filter: 'url(#lokiOrganicRiftEdge) blur(1px)'
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
        {/* Rendered at deepest layer, pure dark black silhouette branches */}
        {/* Awakens with venom pulse proportional to its thickness        */}
        {/* ------------------------------------------------------------- */}
        <g 
          style={{ 
            opacity: hasDiscovered ? 1 : 0, 
            transition: 'opacity 2.5s ease-out 0.5s',
            pointerEvents: 'none'
          }}
        >
          {cosmicFilaments.map((f, i) => {
            const filamentId = `filament-${i}`;
            const isEnergized = energizedBranches[filamentId]?.active;
            return (
              <motion.g
                key={filamentId}
                animate={{
                  y: [i % 2 === 0 ? 5 : -5, i % 2 === 0 ? -5 : 5, i % 2 === 0 ? 5 : -5]
                }}
                transition={{
                  duration: f.windDur,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* 1. Pure dark silhouette body */}
                <path
                  d={f.d}
                  fill="none"
                  stroke="#000000"
                  strokeWidth={f.width * 2.8}
                  strokeLinecap="round"
                  opacity={0.92}
                />
                <path
                  d={f.d}
                  fill="none"
                  stroke="#050a08"
                  strokeWidth={f.width * 1.8}
                  strokeLinecap="round"
                />
                <path
                  d={f.d}
                  fill="none"
                  stroke="#062d22"
                  strokeWidth={Math.max(0.6, f.width * 0.8)}
                  strokeLinecap="round"
                  opacity={0.6}
                />

                {/* 2. Proportional Venom Life Pulse when energized */}
                {isEnergized && (
                  <g style={{ filter: "url(#venomPulseDistort)" }}>
                    <motion.path
                      d={f.d}
                      fill="none"
                      stroke="#008F4C"
                      strokeWidth={f.width * 2.5}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.8 }}
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      transition={{ duration: 5.5, ease: "linear" }}
                      style={{ filter: "blur(1.5px)" }}
                    />
                    <motion.path
                      d={f.d}
                      fill="none"
                      stroke="#00C853"
                      strokeWidth={f.width * 1.6}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.9 }}
                      animate={{ pathLength: 1, opacity: 0.9 }}
                      transition={{ duration: 5.5, ease: "linear" }}
                    />
                    <motion.path
                      d={f.d}
                      fill="none"
                      stroke="#39FF14"
                      strokeWidth={f.width * 0.9}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 1 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 5.5, ease: "linear" }}
                    />
                    <motion.path
                      d={f.d}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth={Math.max(0.5, f.width * 0.4)}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 1 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 5.5, ease: "linear" }}
                    />
                  </g>
                )}
              </motion.g>
            );
          })}
        </g>

        {/* ------------------------------------------------------------- */}
        {/* DEPTH LAYER 5: Branch 4 (Diagonal timeline vine)              */}
        {/* ------------------------------------------------------------- */}
        <g 
          style={{ 
            opacity: hasDiscovered ? 1 : 0, 
            transition: 'opacity 2.5s ease-out 0.5s',
            pointerEvents: 'none'
          }}
        >
          <motion.g>
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
          {/* DEPTH LAYER 4: Branch 3 (Lower timeline vine)               */}
          {/* ----------------------------------------------------------- */}
          <motion.g>
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
          {/* DEPTH LAYER 3: Branch 5 (Mid-lower flowing timeline vine)   */}
          {/* ----------------------------------------------------------- */}
          <motion.g>
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
          {/* DEPTH LAYER 2: Branch 2 (Upper timeline vine)               */}
          {/* ----------------------------------------------------------- */}
          <motion.g>
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
        {/* User grabs/taps to start the God of Stories power cascade!    */}
        {/* ------------------------------------------------------------- */}
        <motion.g>
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

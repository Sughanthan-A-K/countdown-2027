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

  // Generate natural continuous spine path from start to end (Single Unbroken Path)
  const fullPathD = useMemo(() => {
    const samples = 90;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const prog = i / samples;
      const l = prog * totalLen;
      const pt = pathEl.getPointAtLength(l);
      const wave = Math.sin(prog * 24 + 1) * (Math.sin(prog * Math.PI) * 2.2 * strokeScale);
      const x = pt.x + wave * 0.4;
      const y = pt.y + wave;
      d += (i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return d;
  }, [totalLen, strokeScale]);

  // Secondary fine capillary root veins that branch off organically
  const fullVeinB = useMemo(() => {
    const samples = 75;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const prog = i / samples;
      const l = prog * totalLen;
      const pt = pathEl.getPointAtLength(l);
      const wave = Math.sin(prog * 20 + 3.5) * (Math.sin(prog * Math.PI) * 2.5 * strokeScale);
      const x = pt.x + wave * 0.4;
      const y = pt.y + wave;
      d += (i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return d;
  }, [totalLen, strokeScale]);

  const fullVeinC = useMemo(() => {
    const samples = 75;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const prog = i / samples;
      const l = prog * totalLen;
      const pt = pathEl.getPointAtLength(l);
      const wave = Math.sin(prog * 22 + 6.0) * (Math.sin(prog * Math.PI) * 2.5 * strokeScale);
      const x = pt.x + wave * 0.4;
      const y = pt.y + wave;
      d += (i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return d;
  }, [totalLen, strokeScale]);

  // Natural biological root awakening - slower, calmer, majestic spreading across the timeline
  const duration = 10.5;

  return (
    <g>
      {/* Clip path circle expanding outward from tap point: Guarantees 0 seam lines or marks at tap origin! */}
      <defs>
        <clipPath id={`life-expand-${branchPathRef.current?.id || totalLen}`}>
          <motion.circle
            cx={pathEl.getPointAtLength(tapLen).x}
            cy={pathEl.getPointAtLength(tapLen).y}
            initial={{ r: 0 }}
            animate={{ r: totalLen * 1.3 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          />
        </clipPath>
      </defs>

      {/* Single Unbroken Bio-luminescent Root Vein Network - Clear & Prominent 3X Scale */}
      <g clipPath={`url(#life-expand-${branchPathRef.current?.id || totalLen})`}>
        {/* 1. Bark Cracking Pre-glow: Emerald warmth glowing gently */}
        <path
          d={fullPathD}
          fill="none"
          stroke="#004D2B"
          strokeWidth={20 * strokeScale}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
          style={{ filter: "blur(4px)" }}
        />

        {/* 2. Deep Green Bio-luminescent Vascular Flesh - 3X width for easy mobile viewing */}
        <path
          d={fullPathD}
          fill="none"
          stroke="#008F4C"
          strokeWidth={14 * strokeScale}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.92}
          style={{ filter: "blur(1.5px)" }}
        />
        <path
          d={fullPathD}
          fill="none"
          stroke="#00C853"
          strokeWidth={10 * strokeScale}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.95}
        />

        {/* 3. Secondary Capillary Vein Roots - Clear capillary fibers */}
        <path
          d={fullVeinB}
          fill="none"
          stroke="#00E676"
          strokeWidth={Math.max(1.8, 4.5 * strokeScale)}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
          style={{ filter: "blur(0.8px)" }}
        />
        <path
          d={fullVeinC}
          fill="none"
          stroke="#7CFFB2"
          strokeWidth={Math.max(1.4, 3.2 * strokeScale)}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.9}
        />

        {/* 4. Electric Neon Core Vein + Starlight Center - Clear bright core */}
        <g style={{ filter: "url(#venomInnerCoreDistort)" }}>
          {/* Neon Green Core Pulse */}
          <path
            d={fullPathD}
            fill="none"
            stroke="#39FF14"
            strokeWidth={6.8 * strokeScale}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.98}
          />

          {/* Mint Star Vein Filament */}
          <path
            d={fullPathD}
            fill="none"
            stroke="#B9FFD0"
            strokeWidth={Math.max(1.8, 3.8 * strokeScale)}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={1}
          />

          {/* Pure White Starlight Center Core - Prominent glowing center thread */}
          <path
            d={fullPathD}
            fill="none"
            stroke="#ffffff"
            strokeWidth={Math.max(1.0, 2.2 * strokeScale)}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={1}
            style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9))" }}
          />
        </g>
      </g>

      {/* Awakened Breathing Life: Once infused, the branch gently breathes and pulses with living energy */}
      {allEnergizedStage && (
        <motion.g
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Subtle living atmospheric envelope */}
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#008F4C"
            strokeWidth={13 * strokeScale}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
            style={{ filter: "blur(2px)" }}
          />
          <motion.path
            d={pathEl.getAttribute('d')}
            fill="none"
            stroke="#00C853"
            strokeWidth={9 * strokeScale}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
          />

          {/* Living core breath */}
          <g style={{ filter: "url(#venomInnerCoreDistort)" }}>
            <motion.path
              d={pathEl.getAttribute('d')}
              fill="none"
              stroke="#39FF14"
              strokeWidth={5.5 * strokeScale}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeOut" }}
            />
            <motion.path
              d={pathEl.getAttribute('d')}
              fill="none"
              stroke="#B9FFD0"
              strokeWidth={Math.max(1.2, 2.5 * strokeScale)}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              transition={{ duration: 2.0, ease: "easeOut" }}
            />
            <motion.path
              d={pathEl.getAttribute('d')}
              fill="none"
              stroke="#ffffff"
              strokeWidth={Math.max(0.6, 1.0 * strokeScale)}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 2.0, ease: "easeOut" }}
            />
          </g>
        </motion.g>
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

  // Convergence Grip Point: Where all branches get held together by Loki's hand on 2nd tap after portal opened
  const [gripPoint, setGripPoint] = useState(null);
  const [isGatheringHand, setIsGatheringHand] = useState(false);

  // Cinematic Sequences:
  // portalVoyageStage:
  // 0 = Idle portal open
  // 1 = Portal pulls close & draws branches into portal vortex (approaching portal)
  // 2 = Traveling inside portal warp tunnel (3 seconds deep cosmic travel)
  // 3 = Brilliant White Flashout light burst
  // 4 = Pitch Black Cut Screen
  const [portalVoyageStage, setPortalVoyageStage] = useState(0);

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
        setGripPoint(null);
        setIsGatheringHand(false);
        setPortalVoyageStage(0);
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

    // First Tap: Normal organic life spread from Branch 1 to all branches in natural tree sequence!
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

      // Normal Organic Tree Branching Propagation:
      // Branch 1 uyir perum pothu, adhutha branches ku uyir thodarndhu slow & calm-ah paravudhu
      const cascadeConfig = [
        { id: 'branch-2', tapRatio: 0.02, delay: 3800 },
        { id: 'branch-5', tapRatio: 0.98, delay: 5200 },
        { id: 'branch-3', tapRatio: 0.02, delay: 7500 },
        { id: 'filament-1', tapRatio: 0.02, delay: 8200 },
        { id: 'filament-6', tapRatio: 0.98, delay: 9000 },
        { id: 'branch-4', tapRatio: 0.98, delay: 10800 },
        { id: 'filament-3', tapRatio: 0.02, delay: 11500 },
        { id: 'filament-9', tapRatio: 0.98, delay: 12200 },
        { id: 'filament-0', tapRatio: 0.02, delay: 13000 },
        { id: 'filament-4', tapRatio: 0.98, delay: 13800 },
        { id: 'filament-2', tapRatio: 0.02, delay: 15200 },
        { id: 'filament-5', tapRatio: 0.98, delay: 16000 },
        { id: 'filament-7', tapRatio: 0.02, delay: 16800 },
        { id: 'filament-8', tapRatio: 0.98, delay: 17600 },
        { id: 'filament-10', tapRatio: 0.02, delay: 18400 },
        { id: 'filament-11', tapRatio: 0.98, delay: 19200 },
        { id: 'filament-12', tapRatio: 0.02, delay: 20000 },
        { id: 'filament-13', tapRatio: 0.98, delay: 20800 },
        { id: 'filament-14', tapRatio: 0.02, delay: 21600 },
        { id: 'filament-15', tapRatio: 0.98, delay: 22400 },
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

      // Once life has fully spread across the whole cosmic tree (~23s):
      // Stage 1: A subtle thin vertical hairline tear appears in the center gently!
      setTimeout(() => {
        setPortalStage(1);
      }, 23000);

      // Stage 2 (~26s): Slowly, organically cracks open into a lean slender spacetime portal!
      setTimeout(() => {
        setPortalStage(2);
      }, 26000);

      return updated;
    });
  };

  // 2nd Interaction: When portal has opened (portalStage >= 2), user simply taps / holds anywhere!
  // 1. All branches instantly converge into the user's hand without needing any grip effect circles.
  // 2. Portal rushes close to the foreground and draws all branches into its cosmic rift vortex.
  // 3. User travels inside the portal for ~3 seconds with swirling multiverse light.
  // 4. Brilliant blinding white flash of light, followed by sudden dramatic CUT TO BLACK!
  const getSvgCoordinates = (e) => {
    const svg = e.currentTarget.closest('svg') || document.querySelector('svg#loki-timeline-svg');
    if (!svg) return { x: 500, y: 500 };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: svgP.x, y: svgP.y };
  };

  const handlePointerDownGather = (e) => {
    if (portalStage < 2 || portalVoyageStage > 0) return;
    const coords = getSvgCoordinates(e);
    setGripPoint(coords);
    setIsGatheringHand(true);

    // Sequence 1: Portal approaches close and draws all branches inside (0s -> 1.8s)
    setPortalVoyageStage(1);

    // Sequence 2: Dive inside the portal warp tunnel, 3 seconds travel (1.8s -> 4.8s)
    setTimeout(() => {
      setPortalVoyageStage(2);
    }, 1800);

    // Sequence 3: Pure white flash burst (at 4.8s)
    setTimeout(() => {
      setPortalVoyageStage(3);
    }, 4800);

    // Sequence 4: Sudden dramatic CUT TO BLACK SCREEN! (at 5.3s)
    setTimeout(() => {
      setPortalVoyageStage(4);
    }, 5300);
  };

  const handlePointerMoveGather = (e) => {
    if (!isGatheringHand || portalVoyageStage >= 2) return;
    const coords = getSvgCoordinates(e);
    setGripPoint(coords);
  };

  const handlePointerUpGather = () => {
    setIsGatheringHand(false);
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
  // Scaled up ~3x for distinct visibility on mobile screens while maintaining distance hierarchy
  const cosmicFilaments = [
    { d: "M -350 180 Q 180 80, 520 220 T 1400 160", width: 2.7, opacity: 0.32, color: "#00C853", windDur: 32 },
    { d: "M -300 280 Q 300 380, 750 260 T 1420 320", width: 3.2, opacity: 0.38, color: "#39FF14", windDur: 36 },
    { d: "M -380 420 Q 220 540, 620 440 T 1450 480", width: 2.2, opacity: 0.28, color: "#00E676", windDur: 34 },
    { d: "M -320 620 Q 350 500, 780 640 T 1400 580", width: 3.0, opacity: 0.35, color: "#7CFFB2", windDur: 38 },
    { d: "M -400 780 Q 250 860, 680 760 T 1420 840", width: 3.5, opacity: 0.40, color: "#00FF66", windDur: 30 },
    { d: "M 1400 90 Q 750 280, 380 140 T -320 240", width: 2.4, opacity: 0.30, color: "#00C853", windDur: 35 },
    { d: "M 1420 380 Q 820 240, 420 410 T -350 360", width: 3.2, opacity: 0.36, color: "#39FF14", windDur: 33 },
    { d: "M 1450 680 Q 780 780, 350 630 T -300 720", width: 2.6, opacity: 0.32, color: "#00FF66", windDur: 39 },
    { d: "M -360 80 Q 420 180, 850 100 T 1420 190", width: 1.8, opacity: 0.25, color: "#B9FFD0", windDur: 40 },
    { d: "M -340 490 Q 150 390, 580 510 T 1450 430", width: 2.9, opacity: 0.34, color: "#00E676", windDur: 37 },
    { d: "M -390 850 Q 320 720, 710 880 T 1400 790", width: 2.2, opacity: 0.28, color: "#39FF14", windDur: 31 },
    { d: "M 1420 220 Q 900 420, 460 300 T -350 420", width: 2.7, opacity: 0.32, color: "#00C853", windDur: 36 },
    { d: "M 1450 510 Q 880 620, 490 530 T -320 610", width: 2.4, opacity: 0.30, color: "#7CFFB2", windDur: 34 },
    { d: "M -350 950 Q 280 820, 680 940 T 1420 890", width: 3.2, opacity: 0.38, color: "#00FF66", windDur: 32 },
    { d: "M -320 15 Q 380 120, 780 40 T 1450 110", width: 1.6, opacity: 0.24, color: "#B9FFD0", windDur: 42 },
    { d: "M 1400 820 Q 850 930, 420 840 T -340 910", width: 2.4, opacity: 0.30, color: "#00E676", windDur: 35 }
  ];

  // Loki Hand Grip Convergence Physics:
  // When user taps on 2nd tap (or holds and moves), all branches AND all 16 filaments
  // physically bend and gather into Loki's hand coordinate (gx, gy) like in the finale!
  const getBranchPath = (baseD, branchId) => {
    if (!gripPoint) return baseD;
    const gx = gripPoint.x;
    const gy = gripPoint.y;

    if (branchId === 'branch-1') {
      return `M -400 310 Q ${gx * 0.45} ${gy + 10}, ${gx} ${gy} T 1450 390`;
    }
    if (branchId === 'branch-2') {
      return `M -350 40 Q ${gx * 0.38} ${gy - 12}, ${gx} ${gy - 4} T 1420 120`;
    }
    if (branchId === 'branch-5') {
      return `M -320 540 Q ${gx * 0.45} ${gy + 14}, ${gx} ${gy + 4} T 1420 520`;
    }
    if (branchId === 'branch-3') {
      return `M -380 890 Q ${gx * 0.40} ${gy + 20}, ${gx} ${gy + 8} T 1450 820`;
    }
    if (branchId === 'branch-4') {
      return `M 1450 30 Q ${gx * 1.3} ${gy - 15}, ${gx} ${gy - 6} T -350 940`;
    }

    // For filaments (filament-0 to filament-15):
    if (typeof branchId === 'string' && branchId.startsWith('filament-')) {
      const idx = parseInt(branchId.replace('filament-', ''), 10) || 0;
      const spreadY = ((idx % 7) - 3) * 3; // tiny natural yarn spread in fist
      const startX = idx % 2 === 0 ? -360 : 1440;
      const startY = (idx * 60 + 50) % 950;
      const endX = idx % 2 === 0 ? 1440 : -360;
      const endY = (startY + 300) % 950;
      return `M ${startX} ${startY} Q ${gx * 0.5 + (idx % 3) * 10} ${gy + spreadY}, ${gx} ${gy + spreadY} T ${endX} ${endY}`;
    }

    return baseD;
  };

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

          {/* Dynamic Living Venom Fluid filter: creeping fluid tendrils that grasp and flow with true life */}
          <filter id="livingVenomFluidDistort" x="-25%" y="-50%" width="150%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.09" numOctaves="3" result="venomNoise" />
            <feDisplacementMap in="SourceGraphic" in2="venomNoise" scale="8.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Organic Venom filter for inner core: 40% organic fluid wave ripple */}
          <filter id="venomInnerCoreDistort" x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035 0.12" numOctaves="3" result="venomNoise" />
            <feDisplacementMap in="SourceGraphic" in2="venomNoise" scale="5.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          <radialGradient id="venomGripPulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#00C853" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#004D2B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* 2. DISTANT DEEP SPACE BACKGROUND: THE SACRED PORTAL (THE LOOM)
          - Exactly Centered Portal (LEAN, SLENDER, SLEEK shape - NO bulky/fat look)
          - Intro opens ultra-slowly across 20.0 seconds!
          - Mystical slender vertical spacetime tear aperture.
          - On 2nd Tap (portalVoyageStage >= 1): Portal accelerates forward to camera!
      */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={
          portalVoyageStage === 1
            ? { opacity: 1, scale: 2.8, z: 50 }
            : portalVoyageStage >= 2
            ? { opacity: 1, scale: 12, z: 200 }
            : portalStage > 0
            ? { opacity: 1, scale: 1, z: 0 }
            : { opacity: 0, scale: 0.8, z: -100 }
        }
        transition={
          portalVoyageStage === 1
            ? { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
            : portalVoyageStage >= 2
            ? { duration: 3.2, ease: "easeIn" }
            : { duration: 2.0, ease: "easeOut" }
        }
        style={{ transformOrigin: "50% 50%" }}
      >
        {/* Layer 1: Slender Cosmic Aurora Halo (Lean vertical ellipse) */}
        <motion.div
          animate={portalStage === 2 ? {
            opacity: 0.85,
            scaleY: 1.0,
            scaleX: 1.0
          } : {
            opacity: portalStage === 1 ? 0.25 : 0,
            scaleY: 0.7,
            scaleX: 0.2
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[220px] sm:w-[280px] h-[380px] sm:h-[450px] rounded-[50%] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,200,83,0.75) 0%, rgba(0,143,76,0.45) 40%, rgba(0,77,43,0.15) 70%, transparent 90%)',
            filter: 'blur(30px)'
          }}
        />

        {/* Layer 2: Radiant Center Lean Halo Glow */}
        <motion.div
          animate={portalStage === 2 ? {
            opacity: 0.75,
            scaleY: 1.0,
            scaleX: 1.0
          } : {
            opacity: portalStage === 1 ? 0.3 : 0,
            scaleY: 0.6,
            scaleX: 0.15
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[120px] sm:w-[160px] h-[340px] sm:h-[400px] rounded-[50%] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,255,102,0.7) 0%, rgba(0,200,83,0.4) 45%, rgba(0,107,60,0.15) 75%, transparent 95%)',
            filter: 'blur(22px)'
          }}
        />

        {/* Outer illuminated lean portal slit border - 20s ultra-slow opening */}
        <motion.div
          animate={portalStage === 2 ? {
            scaleX: 1.0,
            opacity: 0.95
          } : {
            scaleX: 0.03,
            opacity: portalStage === 1 ? 0.75 : 0
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-[320px] sm:h-[380px] w-[70px] sm:w-[95px] pointer-events-none rounded-[50%]"
          style={{
            transformOrigin: "50% 50%",
            background: 'radial-gradient(ellipse at 50% 50%, rgba(185,255,208,0.75) 0%, rgba(124,255,178,0.45) 35%, rgba(0,200,83,0.2) 65%, transparent 85%)',
            filter: 'blur(12px)'
          }}
        />

        {/* Inner Slender Spacetime Void Tear - Clean, lean vertical aperture (NOT bulky) */}
        <motion.div
          animate={portalStage === 2 ? {
            scaleX: 1.0,
            opacity: 1
          } : {
            scaleX: 0.02,
            opacity: portalStage === 1 ? 0.85 : 0
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-[290px] sm:h-[350px] w-[35px] sm:w-[48px] pointer-events-none rounded-[50%]"
          style={{
            transformOrigin: "50% 50%",
            background: 'radial-gradient(ellipse at 50% 50%, #002213 0%, #004225 50%, #0B1F16 85%, transparent 100%)',
            borderLeft: '2.5px solid #B9FFD0',
            borderRight: '2.5px solid #7CFFB2',
            borderTop: '2px solid #00FF66',
            borderBottom: '2px solid #00C853',
            boxShadow: '0 0 20px #7CFFB2, 0 0 45px #00FF66, 0 0 70px #00C853, inset 0 0 20px rgba(0,0,0,0.95)',
            filter: 'url(#lokiOrganicRiftEdge)'
          }}
        />

        {/* Center Point of Origin Light Star - Gentle, smooth breathing glow (NO sudden on/off) */}
        <motion.div
          animate={portalStage > 0 ? {
            scale: [0.95, 1.1, 0.95],
            opacity: [0.65, 0.9, 0.65]
          } : {
            scale: 0,
            opacity: 0
          }}
          transition={portalStage > 0 ? {
            duration: 5.0,
            repeat: Infinity,
            ease: "easeInOut"
          } : {
            duration: 2.5,
            ease: "easeOut"
          }}
          className="absolute w-5 h-5 rounded-full bg-[#ffffff] blur-[3px] shadow-[0_0_20px_#ffffff,0_0_35px_#B9FFD0,0_0_55px_#00FF66] pointer-events-none"
        />

        {/* Slender White-Mint Core Aperture Spine - Starts as hairline vertical crack, expands smoothly over 20s */}
        <motion.div
          animate={portalStage === 2 ? {
            width: "7px",
            opacity: 0.9
          } : {
            width: portalStage === 1 ? "1.5px" : "0px",
            opacity: portalStage === 1 ? 0.75 : 0
          }}
          transition={{ duration: 20.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-[270px] sm:h-[330px] pointer-events-none rounded-[50%]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(185,255,208,0.85) 15%, rgba(255,255,255,0.95) 50%, rgba(124,255,178,0.85) 85%, transparent 100%)',
            boxShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px #B9FFD0, 0 0 50px #00FF66',
            filter: 'url(#lokiOrganicRiftEdge) blur(0.8px)'
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
        id="loki-timeline-svg"
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        onPointerDown={portalStage >= 2 ? handlePointerDownGather : undefined}
        onPointerMove={portalStage >= 2 ? handlePointerMoveGather : undefined}
        onPointerUp={portalStage >= 2 ? handlePointerUpGather : undefined}
        onPointerLeave={portalStage >= 2 ? handlePointerUpGather : undefined}
        className={`absolute inset-0 w-full h-full overflow-visible z-10 select-none ${
          portalStage >= 2 ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
        }`} 
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

        {/* SVG Container wrapping all branches with entrance/portal-pull transforms */}
        <motion.g
          animate={
            portalVoyageStage === 1
              ? { scale: 0.7, opacity: 0.95 }
              : portalVoyageStage >= 2
              ? { scale: 0.05, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={
            portalVoyageStage === 1
              ? { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
              : portalVoyageStage >= 2
              ? { duration: 1.2, ease: "easeIn" }
              : { duration: 0.5 }
          }
          style={{ transformOrigin: "500px 500px" }}
        >
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
            const filamentD = getBranchPath(f.d, filamentId);
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
                {/* 1. Slim dark silhouette body */}
                <path
                  d={filamentD}
                  fill="none"
                  stroke="#000000"
                  strokeWidth={f.width * 2.0}
                  strokeLinecap="round"
                  opacity={0.85}
                />
                <path
                  d={filamentD}
                  fill="none"
                  stroke="#050a08"
                  strokeWidth={f.width * 1.4}
                  strokeLinecap="round"
                />
                <path
                  d={filamentD}
                  fill="none"
                  stroke="#062d22"
                  strokeWidth={Math.max(0.5, f.width * 0.7)}
                  strokeLinecap="round"
                  opacity={0.5}
                />

                {/* 2. Slow Bio-Luminescent Root Vein Infusion into Filaments (Same unified look as main branches) */}
                {isEnergized && (
                  <g>
                    {/* Living outer atmospheric envelope */}
                    <motion.path
                      d={filamentD}
                      fill="none"
                      stroke="#008F4C"
                      strokeWidth={f.width * 2.6}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 0.8, 0.9] }}
                      transition={{ duration: 7.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ filter: "blur(1.5px)" }}
                    />
                    <motion.path
                      d={filamentD}
                      fill="none"
                      stroke="#00C853"
                      strokeWidth={f.width * 1.8}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 0.9, 0.98] }}
                      transition={{ duration: 7.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                    {/* Inner core life spark & starlight line moving in sync */}
                    <g style={{ filter: "url(#venomInnerCoreDistort)" }}>
                      <motion.path
                        d={filamentD}
                        fill="none"
                        stroke="#39FF14"
                        strokeWidth={f.width * 1.2}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 7.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.path
                        d={filamentD}
                        fill="none"
                        stroke="#B9FFD0"
                        strokeWidth={Math.max(0.6, f.width * 0.7)}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 7.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.path
                        d={filamentD}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={Math.max(0.4, f.width * 0.4)}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        transition={{ duration: 7.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </g>
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
              pathData={getBranchPath("M 1450 30 Q 820 420, 480 620 T -350 940", 'branch-4')}
              origin="500px 520px"
              strokeScale={0.42}
              onEnergize={handleBranchEnergize}
              energizedData={energizedBranches['branch-4']}
              allEnergizedStage={awakenedStages['branch-4']}
              isFinalBranch={lastTappedBranchId === 'branch-4'}
              windConfig={{
                x: [-8, 8, -8],
                y: [6, -6, 6],
                rotate: [-0.5, 0.5, -0.5],
                duration: 28,
                delay: 0.5
              }}
            >
              <path
                d={getBranchPath("M 1450 30 Q 820 420, 480 620 T -350 940", 'branch-4')}
                fill="none"
                stroke="#000000"
                strokeOpacity="0.001"
                strokeWidth="100"
                strokeLinecap="round"
              />
              <path
                d={getBranchPath("M 1450 30 Q 820 420, 480 620 T -350 940", 'branch-4')}
                fill="none"
                stroke="#000000"
                strokeWidth="4.2"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d={getBranchPath("M 1450 30 Q 820 420, 480 620 T -350 940", 'branch-4')}
                fill="none"
                stroke="#050a08"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d={getBranchPath("M 1450 29 Q 820 419, 480 619 T -350 939", 'branch-4')}
                fill="none"
                stroke="#062d22"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.35"
              />
            </DraggableBranch>
          </motion.g>

          {/* ----------------------------------------------------------- */}
          {/* DEPTH LAYER 4: Branch 3 (Lower timeline vine)               */}
          {/* ----------------------------------------------------------- */}
          <motion.g>
            <DraggableBranch
              id="branch-3"
              pathData={getBranchPath("M -380 890 Q 200 680, 580 720 T 1450 820", 'branch-3')}
              origin="500px 720px"
              strokeScale={0.58}
              onEnergize={handleBranchEnergize}
              energizedData={energizedBranches['branch-3']}
              allEnergizedStage={awakenedStages['branch-3']}
              isFinalBranch={lastTappedBranchId === 'branch-3'}
              windConfig={{
                y: [-12, 12, -12],
                x: [-6, 6, -6],
                rotate: [-0.8, 0.8, -0.8],
                duration: 25,
                delay: 2
              }}
            >
              <path
                d={getBranchPath("M -380 890 Q 200 680, 580 720 T 1450 820", 'branch-3')}
                fill="none"
                stroke="#000000"
                strokeOpacity="0.001"
                strokeWidth="110"
                strokeLinecap="round"
              />
              <path
                d={getBranchPath("M -380 890 Q 200 680, 580 720 T 1450 820", 'branch-3')}
                fill="none"
                stroke="#000000"
                strokeWidth="5.8"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d={getBranchPath("M -380 890 Q 200 680, 580 720 T 1450 820", 'branch-3')}
                fill="none"
                stroke="#050a08"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
              <path
                d={getBranchPath("M -380 889 Q 200 679, 580 719 T 1450 819", 'branch-3')}
                fill="none"
                stroke="#062d22"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
            </DraggableBranch>
          </motion.g>

          {/* ----------------------------------------------------------- */}
          {/* DEPTH LAYER 3: Branch 5 (Mid-lower flowing timeline vine)   */}
          {/* ----------------------------------------------------------- */}
          <motion.g>
            <DraggableBranch
              id="branch-5"
              pathData={getBranchPath("M -320 540 Q 280 430, 720 560 T 1420 520", 'branch-5')}
              origin="500px 540px"
              strokeScale={0.75}
              onEnergize={handleBranchEnergize}
              energizedData={energizedBranches['branch-5']}
              allEnergizedStage={awakenedStages['branch-5']}
              isFinalBranch={lastTappedBranchId === 'branch-5'}
              windConfig={{
                y: [12, -12, 12],
                x: [8, -8, 8],
                rotate: [0.8, -0.8, 0.8],
                duration: 22,
                delay: 2.5
              }}
            >
              <path
                d={getBranchPath("M -320 540 Q 280 430, 720 560 T 1420 520", 'branch-5')}
                fill="none"
                stroke="#000000"
                strokeOpacity="0.001"
                strokeWidth="110"
                strokeLinecap="round"
              />
              <path
                d={getBranchPath("M -320 540 Q 280 430, 720 560 T 1420 520", 'branch-5')}
                fill="none"
                stroke="#000000"
                strokeWidth="7.8"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d={getBranchPath("M -320 540 Q 280 430, 720 560 T 1420 520", 'branch-5')}
                fill="none"
                stroke="#050a08"
                strokeWidth="5.0"
                strokeLinecap="round"
              />
              <path
                d={getBranchPath("M -320 539 Q 280 429, 720 559 T 1420 519", 'branch-5')}
                fill="none"
                stroke="#062d22"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.45"
              />
            </DraggableBranch>
          </motion.g>

          {/* ----------------------------------------------------------- */}
          {/* DEPTH LAYER 2: Branch 2 (Upper timeline vine)               */}
          {/* ----------------------------------------------------------- */}
          <motion.g>
            <DraggableBranch
              id="branch-2"
              pathData={getBranchPath("M -350 40 Q 250 220, 680 160 T 1420 120", 'branch-2')}
              origin="500px 160px"
              strokeScale={0.88}
              onEnergize={handleBranchEnergize}
              energizedData={energizedBranches['branch-2']}
              allEnergizedStage={awakenedStages['branch-2']}
              isFinalBranch={lastTappedBranchId === 'branch-2'}
              windConfig={{
                y: [16, -16, 16],
                x: [8, -8, 8],
                rotate: [1.2, -1.2, 1.2],
                duration: 24,
                delay: 1
              }}
            >
              <path
                d={getBranchPath("M -350 40 Q 250 220, 680 160 T 1420 120", 'branch-2')}
                fill="none"
                stroke="#000000"
                strokeOpacity="0.001"
                strokeWidth="110"
                strokeLinecap="round"
              />
              <path
                d={getBranchPath("M -350 40 Q 250 220, 680 160 T 1420 120", 'branch-2')}
                fill="none"
                stroke="#000000"
                strokeWidth="10.0"
                strokeLinecap="round"
                opacity="0.88"
              />
              <path
                d={getBranchPath("M -350 40 Q 250 220, 680 160 T 1420 120", 'branch-2')}
                fill="none"
                stroke="#050a08"
                strokeWidth="6.5"
                strokeLinecap="round"
              />
              <path
                d={getBranchPath("M -350 39 Q 250 219, 680 159 T 1420 119", 'branch-2')}
                fill="none"
                stroke="#062d22"
                strokeWidth="2.8"
                strokeLinecap="round"
                opacity="0.5"
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
            pathData={getBranchPath("M -400 310 Q 150 480, 520 440 T 1450 390", 'branch-1')}
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
              d={getBranchPath("M -400 310 Q 150 480, 520 440 T 1450 390", 'branch-1')}
              fill="none"
              stroke="#000000"
              strokeOpacity="0.001"
              strokeWidth="140"
              strokeLinecap="round"
            />
            {/* Ambient drop shadow */}
            <path
              d={getBranchPath("M -400 310 Q 150 480, 520 440 T 1450 390", 'branch-1')}
              fill="none"
              stroke="#000000"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Main Dark Silhouette Body - 3X Larger Forefront Branch for effortless mobile view & tap */}
            <path
              d={getBranchPath("M -400 310 Q 150 480, 520 440 T 1450 390", 'branch-1')}
              fill="none"
              stroke="#000000"
              strokeWidth="13"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d={getBranchPath("M -400 310 Q 150 480, 520 440 T 1450 390", 'branch-1')}
              fill="none"
              stroke="#050a08"
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            {/* Subtle dark emerald glint */}
            <path
              d={getBranchPath("M -400 309 Q 150 479, 520 439 T 1450 389", 'branch-1')}
              fill="none"
              stroke="#062d22"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.55"
            />
          </DraggableBranch>
        </motion.g>
        </motion.g>

        {/* ========================================================================= */}
        {/* LOKI GOD OF STORIES: THE SACRED HAND GRIP KNOT                           */}
        {/* Visual tension knot/fist where all cosmic timelines converge in user's touch */}
        {/* ========================================================================= */}
        {/* User requested: antha hold panda edathula irukura effect vena -> clean convergence only */}
      </svg>

      {/* ========================================================================= */}
      {/* 4. TRAVELING INSIDE THE PORTAL: 3 SECONDS HYPERSPACE WARP VOYAGE          */}
      {/* ========================================================================= */}
      {portalVoyageStage >= 2 && portalVoyageStage < 4 && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Swirling emerald timeline energy tunnel */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #00FF66, #004D2B, #39FF14, #002213, #7CFFB2, #00FF66)',
              filter: 'blur(40px)',
            }}
            animate={{ rotate: 360, scale: [1, 2.5, 4] }}
            transition={{
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 3.0, ease: "easeInOut" }
            }}
          />

          {/* Streaking spacetime warp rays */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[3px] bg-gradient-to-t from-transparent via-[#B9FFD0] to-white rounded-full"
                style={{
                  height: '120vh',
                  transform: `rotate(${i * 22.5}deg)`,
                  transformOrigin: '50% 50%',
                  filter: 'blur(1px)'
                }}
                animate={{
                  scaleY: [0.2, 1.8, 2.4],
                  opacity: [0.3, 1, 0.4]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: (i % 4) * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Deep focal hyperspace star */}
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-white blur-xl shadow-[0_0_80px_#ffffff,0_0_150px_#00FF66]"
            animate={{ scale: [1, 3, 8] }}
            transition={{ duration: 3.0, ease: "easeIn" }}
          />
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 5. BRILLIANT WHITE FLASHOUT (Stage 3)                                    */}
      {/* ========================================================================= */}
      {portalVoyageStage >= 3 && portalVoyageStage < 4 && (
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeIn" }}
        />
      )}

      {/* ========================================================================= */}
      {/* 6. DRAMATIC CUT TO PITCH BLACK SCREEN (Stage 4)                          */}
      {/* ========================================================================= */}
      {portalVoyageStage === 4 && (
        <motion.div
          className="absolute inset-0 bg-[#000000] pointer-events-auto z-40"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        />
      )}
    </div>
  );
}

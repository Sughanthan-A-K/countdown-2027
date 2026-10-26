import React, { useState, useRef, useEffect } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, X, CheckSquare, Square, Eye, FileText, CheckCircle2, Compass, Copy, Check, GripHorizontal, GripVertical, Lock, Unlock, Undo2, Redo2, Clock, Sparkles, Layers, Minimize2, Maximize2 } from 'lucide-react';

export const STAGE_4_STEPS = [
  { id: 1, name: "4.1: Edge & Corner Beams", desc: "Outer cracks emit light shafts (0.6s - 2.85s)" },
  { id: 2, name: "4.2: Center Radial Wave", desc: "Concentric white/emerald core wave swells from center" },
  { id: 3, name: "4.3: Center Laser Bursts", desc: "Central fissures burst mega high-speed beams (3.0s - 3.48s)" },
  { id: 4, name: "4.4: Climax Light Burst", desc: "Final Mega Central Light Piercing Climax" },
  { id: 5, name: "4.5: Full Screen Light Piercing", desc: "All 14 volumetric beams radiate simultaneously before detonation" },
];

export const LIGHT_BEAMS_LIST = [
  // --- TAP 3 VOLUMETRIC CONE BEAMS ---
  { id: 101, name: "Tap 3 Beam 1: Upper-Right", delay: "0.00s", origin: "Center Seam (102,185 -> 140,152)", group: "Tap 3" },
  { id: 102, name: "Tap 3 Beam 2: Lower-Left", delay: "0.03s", origin: "Spine Seam (102,185 -> 85,248)", group: "Tap 3" },

  // --- TAP 4 OUTER EDGES & CORNERS ---
  { id: 1, name: "Upper-Left Corner Beam", delay: "0.65s", origin: "Top-Left (45,108)", group: "Outer" },
  { id: 2, name: "Blade Beam Mid-Right", delay: "1.20s", origin: "Right Edge (182,148)", group: "Outer" },
  { id: 3, name: "Upper-Right Corner Gap", delay: "1.75s", origin: "Top-Right (200,5)", group: "Outer" },
  { id: 4, name: "Lower-Right Corner Beam", delay: "2.20s", origin: "Bottom-Right (126,274)", group: "Outer" },
  { id: 5, name: "Bottom-Left Corner Gap", delay: "2.55s", origin: "Bottom-Left (0,400)", group: "Outer" },
  { id: 6, name: "South Spine Off-Center", delay: "2.85s", origin: "Bottom-Center (102,400)", group: "Outer" },

  // --- TAP 4 CENTER CLIMAX BURSTS ---
  { id: 7, name: "Upper Center Spine Fissure", delay: "3.05s", origin: "Center-Up (92,122)", group: "Center" },
  { id: 8, name: "Steep Upward Top Spine Shaft", delay: "3.18s", origin: "Top-Spine (108,78)", group: "Center" },
  { id: 9, name: "Left-side Center Fissure", delay: "3.28s", origin: "Mid-Left (64,146)", group: "Center" },
  { id: 10, name: "Center Fissures Red Line 1", delay: "3.36s", origin: "Center-Spine (102,185)", group: "Center" },
  { id: 11, name: "Center Fissures Red Line 5", delay: "3.42s", origin: "Mid-Right (155,210)", group: "Center" },
  { id: 12, name: "Final Mega Central Climax Beam", delay: "3.48s", origin: "Central Hub Laser", group: "Center" },
];

// Individual Draggable Beam Item with dedicated Drag Handle
function ReorderableBeamRow({
  beam,
  index,
  timelineConfig,
  isCheckedInStep,
  onToggleBeam,
  onUpdateTimelineConfig,
  currentStageBadge
}) {
  const dragControls = useDragControls();

  const currentDelay = timelineConfig?.delays?.[beam.id] !== undefined
    ? timelineConfig.delays[beam.id]
    : parseFloat(beam.delay.replace('s', ''));
  
  const currentDur = timelineConfig?.durations?.[beam.id] !== undefined
    ? timelineConfig.durations[beam.id]
    : (beam.id >= 7 ? 0.08 : 0.20);

  return (
    <Reorder.Item 
      key={`order-beam-${beam.id}`} 
      value={beam.id}
      dragListener={false}
      dragControls={dragControls}
      className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1.5 hover:border-purple-600/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 truncate flex-1">
          {/* Strict Drag Handle Button */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="flex items-center text-neutral-500 hover:text-purple-400 cursor-grab active:cursor-grabbing p-0.5 rounded touch-none"
            title="Drag from here to reorder"
          >
            <GripVertical size={14} />
            <span className="text-[9px] font-mono text-purple-400/80 font-bold ml-0.5 w-4">
              #{index + 1}
            </span>
          </div>
          <span className="w-4 h-4 rounded bg-purple-950 text-purple-300 border border-purple-700/60 font-mono font-bold text-[9px] flex items-center justify-center flex-shrink-0">
            {beam.id}
          </span>
          <span className="text-[10px] font-medium text-neutral-200 truncate">
            {beam.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Checkbox toggle into current step/active beams */}
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBeam?.(beam.id);
            }}
            title={isCheckedInStep ? `Active in current step (${currentStageBadge}). Click to disable.` : `Inactive in current step (${currentStageBadge}). Click to enable.`}
            className={`text-[8px] px-1.5 py-0.5 rounded font-mono border transition-all ${
              isCheckedInStep 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600/60 font-bold shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                : 'bg-neutral-900 text-neutral-500 border-neutral-800'
            }`}
          >
            {isCheckedInStep ? 'ACTIVE' : 'OFF'}
          </button>
          <span className="text-[9px] font-mono text-purple-300 font-bold whitespace-nowrap">
            {currentDelay.toFixed(2)}s
          </span>
        </div>
      </div>

      {/* Delay Slider */}
      <div 
        className="flex items-center gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <span className="text-[8px] font-mono text-neutral-400 w-10">Delay:</span>
        <input
          type="range"
          min="0"
          max="4.0"
          step="0.05"
          value={currentDelay}
          onChange={(e) => onUpdateTimelineConfig?.({
            delays: { [beam.id]: parseFloat(e.target.value) }
          })}
          className="flex-1 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
        />
      </div>

      {/* Duration Slider */}
      <div 
        className="flex items-center gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <span className="text-[8px] font-mono text-neutral-400 w-10">Burst:</span>
        <input
          type="range"
          min="0.04"
          max="1.50"
          step="0.02"
          value={currentDur}
          onChange={(e) => onUpdateTimelineConfig?.({
            durations: { [beam.id]: parseFloat(e.target.value) }
          })}
          className="flex-1 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
        />
        <span className="text-[8px] font-mono text-emerald-400 w-8 text-right">
          {currentDur.toFixed(2)}s
        </span>
      </div>
    </Reorder.Item>
  );
}

export default function LokiStage4Tester({
  crackStage,
  onSetCrackStage,
  stepIndex,
  onSetStepIndex,
  onToggleAutoPlay,
  isAutoPlaying,
  activeBeams,
  onToggleBeam,
  onSelectAllBeams,
  onDeselectAllBeams,
  currentSoloBeam,
  onSetSoloBeam,
  previewBeams = new Set(),
  onTogglePreviewBeam,
  onAllPreviewOn,
  onAllPreviewOff,
  previewAllBeams = false,
  onTogglePreviewAllBeams,
  beamTransforms = {},
  canUndoTransforms = false,
  canRedoTransforms = false,
  onUndoBeamTransform,
  onRedoBeamTransform,
  onUpdateBeamTransform,
  onResetBeamTransform,
  radialWaveConfig = { enabled: true, radius: 220, delay: 0.8, duration: 4.0 },
  onUpdateRadialWaveConfig,
  timelineConfig = { delays: {}, durations: {} },
  onUpdateTimelineConfig,
  onClose
}) {
  // Track beams that user has inspected with the Eye icon
  const [viewedBeams, setViewedBeams] = useState(() => new Set());
  // Store user notes for each beam { [beamId]: "note text" }
  const [beamNotes, setBeamNotes] = useState(() => ({}));
  const [editingNoteBeamId, setEditingNoteBeamId] = useState(null);

  // Direction/Angle Tuner Target Mode: 'global' (all beams) or specific beamId (number)
  const [tuneTarget, setTuneTarget] = useState('global');
  const [copiedConfig, setCopiedConfig] = useState(false);

  // Lock positions system per stage / mini-step:
  // key: "stage_3", "stage_4_step_1", "stage_4_step_2", "stage_4_step_3", "stage_4_step_4"
  // value: { lockedAt, transforms, checkedBeams, activeCount }
  const [lockedSteps, setLockedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('loki_locked_steps');
      return saved ? JSON.parse(saved) : {};
    } catch (_) { return {}; }
  });

  const currentStepKey = crackStage === 3 
    ? 'stage_3' 
    : (crackStage === 4 ? `stage_4_step_${stepIndex}` : null);

  const isCurrentStepLocked = currentStepKey ? Boolean(lockedSteps[currentStepKey]) : false;

  const handleToggleLockCurrentStep = () => {
    if (!currentStepKey) return;
    setLockedSteps(prev => {
      const next = { ...prev };
      if (next[currentStepKey]) {
        delete next[currentStepKey];
      } else {
        next[currentStepKey] = {
          stepName: crackStage === 3 ? "Stage 3 (T3 Center Cones)" : STAGE_4_STEPS[stepIndex - 1]?.name,
          stage: crackStage,
          stepIndex: crackStage === 4 ? stepIndex : null,
          transforms: { ...beamTransforms },
          checkedBeams: activeBeams ? [...activeBeams] : [],
          radialWaveConfig: (crackStage === 4 && stepIndex === 2) ? { ...radialWaveConfig } : undefined,
          lockedAt: new Date().toLocaleTimeString()
        };
      }
      localStorage.setItem('loki_locked_steps', JSON.stringify(next));
      return next;
    });
  };

  const totalLockedCount = Object.keys(lockedSteps).length;
  const [pos1, setPos1] = useState(() => {
    try {
      const saved = localStorage.getItem('loki_tester_pos1');
      return saved ? JSON.parse(saved) : { x: 24, y: 70 };
    } catch (_) { return { x: 24, y: 70 }; }
  });

  const [pos2, setPos2] = useState(() => {
    try {
      const saved = localStorage.getItem('loki_tester_pos2');
      return saved ? JSON.parse(saved) : { x: 320, y: 70 };
    } catch (_) { return { x: 320, y: 70 }; }
  });

  const [pos3, setPos3] = useState(() => {
    try {
      const saved = localStorage.getItem('loki_tester_pos3');
      return saved ? JSON.parse(saved) : { x: 880, y: 70 };
    } catch (_) { return { x: 880, y: 70 }; }
  });

  const [pos4, setPos4] = useState(() => {
    try {
      const saved = localStorage.getItem('loki_tester_pos4');
      return saved ? JSON.parse(saved) : { x: 1220, y: 70 };
    } catch (_) { return { x: 1220, y: 70 }; }
  });

  // Ordered list of beam IDs for custom sequencing
  const [orderedBeamIds, setOrderedBeamIds] = useState(() => {
    if (timelineConfig?.order && Array.isArray(timelineConfig.order) && timelineConfig.order.length > 0) {
      return timelineConfig.order;
    }
    return LIGHT_BEAMS_LIST.map(b => b.id);
  });

  // Active filter tab in Tool 4: 'all', 3 (Tap 3), 4.1, 4.2, 4.3, 4.4, 4.5
  const [tool4StageFilter, setTool4StageFilter] = useState('all');

  // Tool Box Minimize States (tool 1, 2, 3, 4)
  const [minimizedTools, setMinimizedTools] = useState(() => {
    try {
      const saved = localStorage.getItem('loki_tester_minimized');
      return saved ? JSON.parse(saved) : {};
    } catch (_) { return {}; }
  });

  const toggleMinimize = (toolNum) => {
    setMinimizedTools(prev => {
      const next = { ...prev, [toolNum]: !prev[toolNum] };
      localStorage.setItem('loki_tester_minimized', JSON.stringify(next));
      return next;
    });
  };

  const tool1Ref = useRef(null);
  const tool2Ref = useRef(null);
  const tool3Ref = useRef(null);
  const tool4Ref = useRef(null);

  const handleDragEnd = (toolKey, info) => {
    const updater = (prev) => {
      const nextPos = {
        x: Math.round((prev?.x || 0) + info.offset.x),
        y: Math.round((prev?.y || 0) + info.offset.y)
      };
      localStorage.setItem(`loki_tester_${toolKey}`, JSON.stringify(nextPos));
      return nextPos;
    };
    if (toolKey === 'pos1') setPos1(updater);
    if (toolKey === 'pos2') setPos2(updater);
    if (toolKey === 'pos3') setPos3(updater);
    if (toolKey === 'pos4') setPos4(updater);
  };

  // Joystick dragging state
  const joystickRef = useRef(null);
  const [isDraggingJoystick, setIsDraggingJoystick] = useState(false);

  const activeTransform = (tuneTarget === 'global' ? beamTransforms?.global : beamTransforms?.[tuneTarget]) || {
    angle: 0,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0
  };

  const handleRowTapPreview = (e, beamId) => {
    e.stopPropagation();
    setViewedBeams(prev => new Set(prev).add(beamId));
    // Tapping row selects it as the active Target in Tool 3 (3D Angle & Direction)
    setTuneTarget(beamId);
    // Tapping the row also toggles Solo View: if already viewing, turn off back to normal; if not, preview this beam!
    onSetSoloBeam(beamId);
  };

  const handleCheckboxToggle = (e, beamId) => {
    e.stopPropagation();
    // When a beam is checked/uncheck, if checked make it the target in Tool 3
    onToggleBeam(beamId);
    setTuneTarget(beamId);
  };

  const handleUpdateNote = (beamId, text) => {
    setBeamNotes(prev => ({
      ...prev,
      [beamId]: text
    }));
  };

  // Joystick pointer calculations: Pure directional angle from crack seam
  const handleJoystickPointer = (clientX, clientY) => {
    if (!joystickRef.current || !onUpdateBeamTransform) return;
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    // Calculate aiming angle in degrees (-180 to +180)
    const angleDeg = Math.round(Math.atan2(dy, dx) * (180 / Math.PI));

    onUpdateBeamTransform(tuneTarget, {
      angle: angleDeg
    });
  };

  const handleCopyConfiguration = () => {
    const configData = {
      timestamp: new Date().toLocaleTimeString(),
      checkedBeams: activeBeams || [],
      currentSoloBeam,
      tuneTarget,
      transforms: beamTransforms,
      notes: beamNotes,
      lockedStepsSummary: {
        totalLocked: totalLockedCount,
        steps: lockedSteps
      }
    };

    const formatted = JSON.stringify(configData, null, 2);
    navigator.clipboard.writeText(formatted).then(() => {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2200);
    });
  };
  return (
    <>
      {/* ============================================================ */}
      {/* TOOL 1: STAGE & STEP CONTROLLER (DRAGGABLE) */}
      {/* ============================================================ */}
      <motion.div
        ref={tool1Ref}
        drag
        dragMomentum={false}
        initial={pos1}
        animate={pos1}
        onDragEnd={(_, info) => handleDragEnd('pos1', info)}
        className={`fixed top-0 left-0 z-[9999] pointer-events-auto bg-neutral-900/95 backdrop-blur-md border border-emerald-500/50 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] text-white select-none font-sans text-xs transition-all ${
          minimizedTools[1] ? 'p-2 w-auto cursor-pointer hover:border-emerald-400 hover:scale-105' : 'p-3.5 w-72'
        }`}
        onClick={minimizedTools[1] ? () => toggleMinimize(1) : undefined}
      >
        {minimizedTools[1] ? (
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center font-bold text-[11px]">
              T1
            </span>
            <div className="flex flex-col pr-1">
              <span className="text-[10px] font-bold text-emerald-300 leading-none">Stage Control</span>
              <span className="text-[8px] font-mono text-neutral-400 leading-tight">
                {crackStage === 0 ? 'OFF' : (crackStage === 5 ? 'BLAST' : (crackStage === 6 ? 'PORTAL' : `STAGE ${crackStage}`))}
              </span>
            </div>
            <Maximize2 size={12} className="text-emerald-400" />
          </div>
        ) : (
          <>
            {/* Drag Handle Bar */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-700/80 cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-2">
                <GripHorizontal size={14} className="text-emerald-400" />
                <span className="font-bold tracking-wide text-emerald-300 text-[11px]">1. STAGE & TIMELINE</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize(1);
                  }}
                  className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-emerald-300 transition-colors"
                  title="Minimize Tool 1"
                >
                  <Minimize2 size={12} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  title="Close All (Shift+T)"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Main Stage Selectors */}
            <div className="mb-2.5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                <span>Stages (0 to 6)</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {crackStage === 0 ? 'OFF' : (crackStage === 5 ? 'STAGE 5 (BLAST)' : (crackStage === 6 ? 'STAGE 6 (PORTAL)' : `STAGE ${crackStage}`))}
                </span>
              </div>

              {/* Quick Click Badges */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {[0, 1, 2, 3, 4, 5, 6].map((stg) => (
                  <button
                    key={`stg-${stg}`}
                    onClick={() => onSetCrackStage(stg)}
                    className={`py-1 rounded-lg font-bold transition-all text-xs ${
                      crackStage === stg 
                        ? 'bg-emerald-500 text-black shadow-[0_0_10px_#10b981]' 
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                    }`}
                  >
                    {stg === 0 ? 'Off' : (stg === 5 ? 'Blast' : (stg === 6 ? 'Portal' : `T${stg}`))}
                  </button>
                ))}
              </div>

              {/* Prev / Next Buttons to step through Off -> T1 -> T2 -> T3 -> T4 -> Blast -> Portal */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onSetCrackStage(Math.max(0, crackStage - 1))}
                  disabled={crackStage <= 0}
                  className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 transition-colors font-medium text-xs text-neutral-200"
                >
                  <ChevronLeft size={13} />
                  Prev Stage
                </button>
                <button
                  onClick={() => onSetCrackStage(Math.min(6, crackStage + 1))}
                  disabled={crackStage >= 6}
                  className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 transition-colors font-medium text-xs text-neutral-200"
                >
                  Next Stage
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* Tap 4 Sub-Step Stepper */}
            <div className="pt-2 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                  Stage 4 Sequence
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-mono">
                  Step {stepIndex} / {STAGE_4_STEPS.length}
                </span>
              </div>

              <div className="bg-neutral-950/80 p-2 rounded-xl border border-neutral-800 mb-2">
                <div className="font-semibold text-emerald-300 text-[11px]">
                  {STAGE_4_STEPS[stepIndex - 1]?.name}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 leading-tight">
                  {STAGE_4_STEPS[stepIndex - 1]?.desc}
                </div>
              </div>

              {/* Stepper Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onSetStepIndex(Math.max(1, stepIndex - 1))}
                  disabled={stepIndex <= 1}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 transition-colors font-medium text-xs"
                >
                  <ChevronLeft size={13} />
                  Prev
                </button>
                <button
                  onClick={() => onSetStepIndex(Math.min(STAGE_4_STEPS.length, stepIndex + 1))}
                  disabled={stepIndex >= STAGE_4_STEPS.length}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 transition-colors font-medium text-xs"
                >
                  Next
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* STEP 4.2 CENTER RADIAL WAVE CONTROLS */}
              {crackStage === 4 && stepIndex === 2 && (
                <div className="mt-3 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-emerald-300 flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={radialWaveConfig?.enabled !== false}
                        onChange={(e) => onUpdateRadialWaveConfig?.({ enabled: e.target.checked })}
                        className="accent-emerald-400 w-3.5 h-3.5 rounded cursor-pointer"
                      />
                      <span>Enable Center Radial Wave</span>
                    </label>
                    <span className="text-[9px] font-mono text-emerald-400">
                      {radialWaveConfig?.enabled !== false ? 'ON' : 'OFF'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                      <span>Wave Radius:</span>
                      <span className="font-mono text-emerald-300 font-bold">{radialWaveConfig?.radius || 220}px</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="450"
                      step="5"
                      value={radialWaveConfig?.radius || 220}
                      disabled={radialWaveConfig?.enabled === false}
                      onChange={(e) => onUpdateRadialWaveConfig?.({ radius: parseInt(e.target.value, 10) })}
                      className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* ============================================================ */}
      {/* TOOL 2: LIGHT BEAMS CHECKLIST & NOTES (DRAGGABLE 2-COLUMN VIEW) */}
      {/* Show Tool 2 strictly from Stage 3 (T3) onwards! */}
      {/* ============================================================ */}
      {crackStage >= 3 && (
        <motion.div
          ref={tool2Ref}
          drag
          dragMomentum={false}
          initial={pos2}
          animate={pos2}
          onDragEnd={(_, info) => handleDragEnd('pos2', info)}
          className={`fixed top-0 left-0 z-[9999] pointer-events-auto bg-neutral-900/95 backdrop-blur-md border border-amber-500/50 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.25)] text-white select-none font-sans text-xs scrollbar-thin scrollbar-thumb-neutral-700 transition-all ${
            minimizedTools[2] ? 'p-2 w-auto cursor-pointer hover:border-amber-400 hover:scale-105' : 'p-3.5 w-[540px] max-h-[82vh] overflow-y-auto'
          }`}
          onClick={minimizedTools[2] ? () => toggleMinimize(2) : undefined}
        >
        {minimizedTools[2] ? (
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/50 flex items-center justify-center font-bold text-[11px]">
              T2
            </span>
            <div className="flex flex-col pr-1">
              <span className="text-[10px] font-bold text-amber-300 leading-none">Beams Selector</span>
              <span className="text-[8px] font-mono text-neutral-400 leading-tight">
                {activeBeams ? `${activeBeams.length} Active` : `${LIGHT_BEAMS_LIST.length} Total`}
              </span>
            </div>
            <Maximize2 size={12} className="text-amber-400" />
          </div>
        ) : (
          <>
        {/* Drag Handle Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-700/80 cursor-grab active:cursor-grabbing sticky top-0 bg-neutral-900/95 z-10 pt-0.5">
          <div className="flex items-center gap-2">
            <GripHorizontal size={14} className="text-amber-400" />
            <span className="font-bold tracking-wide text-amber-300 text-[11px]">
              2. BEAMS SELECTOR ({LIGHT_BEAMS_LIST.length})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Step Position Lock Toggle Button */}
            {currentStepKey && (
              <button
                onClick={handleToggleLockCurrentStep}
                title={isCurrentStepLocked ? "Step is Locked! Click to Unlock" : "Lock current beam angles for this step"}
                className={`px-2 py-0.5 rounded-lg border font-bold flex items-center gap-1 text-[9px] transition-all ${
                  isCurrentStepLocked 
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_10px_#f59e0b]' 
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white hover:border-neutral-500'
                }`}
              >
                {isCurrentStepLocked ? <Lock size={11} className="stroke-[2.5]" /> : <Unlock size={11} />}
                <span>{isCurrentStepLocked ? 'LOCKED' : 'LOCK STEP'}</span>
              </button>
            )}

            {/* Master Preview Locked Beams Simultaneously */}
            {(() => {
              // Count strictly how many unique beams have been checked & locked across all locked steps
              const lockedBeamsSet = new Set();
              Object.values(lockedSteps).forEach(stepData => {
                if (Array.isArray(stepData.checkedBeams)) {
                  stepData.checkedBeams.forEach(id => lockedBeamsSet.add(id));
                }
              });
              const lockedCount = lockedBeamsSet.size;

              return (
                <label 
                  title="Show locked beams together simultaneously in preview"
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border font-bold text-[9px] cursor-pointer transition-all select-none ${
                    previewAllBeams 
                      ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_#06b6d4]' 
                      : 'bg-neutral-800/90 text-cyan-300 border-cyan-700/60 hover:bg-neutral-800 hover:border-cyan-500'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={previewAllBeams} 
                    onChange={onTogglePreviewAllBeams}
                    className="w-3 h-3 accent-cyan-400 cursor-pointer" 
                  />
                  <span>PREVIEW ({lockedCount})</span>
                </label>
              );
            })()}

            {/* View All Beams ON / OFF in Screen */}
            <button
              onClick={onAllPreviewOn}
              title="Turn ON preview for all beams"
              className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900 transition-colors font-medium"
            >
              All ON
            </button>
            <button
              onClick={onAllPreviewOff}
              title="Turn OFF preview for all beams"
              className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors font-medium"
            >
              All OFF
            </button>
            <div className="w-px h-3 bg-neutral-700 mx-0.5" />
            {/* Checkbox All Check / Clear for 3D Angle Tool */}
            <button
              onClick={onSelectAllBeams}
              title="Check all beams into 3D Angle list"
              className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              Check All
            </button>
            <button
              onClick={onDeselectAllBeams}
              title="Clear all checked beams from 3D Angle list"
              className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize(2);
              }}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-amber-300 transition-colors ml-1"
              title="Minimize Tool 2"
            >
              <Minimize2 size={12} />
            </button>
          </div>
        </div>

        {/* Solo Beam Stepper: Prev / Next scoped strictly to current relevant beams */}
        {(() => {
          // Identify relevant beams strictly for current stage / step without duplicates
          let stepBeams = [];
          if (crackStage <= 2) {
            stepBeams = [];
          } else if (crackStage === 3) {
            stepBeams = LIGHT_BEAMS_LIST; // Allow solo stepping through all in Tap 3
          } else if (crackStage === 4) {
            if (stepIndex === 1) {
              stepBeams = LIGHT_BEAMS_LIST.filter(b => b.group === "Outer"); // [1..6]
            } else if (stepIndex === 2) {
              stepBeams = [];
            } else if (stepIndex === 3) {
              stepBeams = LIGHT_BEAMS_LIST.filter(b => b.id >= 7 && b.id <= 11); // [7..11]
            } else if (stepIndex === 4) {
              stepBeams = LIGHT_BEAMS_LIST.filter(b => b.id === 12); // [12] Mega Central Climax Beam
            } else {
              stepBeams = LIGHT_BEAMS_LIST; // 4.5 All 14 beams
            }
          }

          const currentIdx = stepBeams.findIndex(b => b.id === currentSoloBeam);

          return (
            <div className="flex items-center gap-1.5 mb-2.5 bg-neutral-950/80 p-1.5 rounded-xl border border-neutral-800">
              <button
                disabled={stepBeams.length === 0}
                onClick={() => {
                  if (stepBeams.length === 0) return;
                  const prevIdx = currentIdx <= 0 ? stepBeams.length - 1 : currentIdx - 1;
                  onSetSoloBeam(stepBeams[prevIdx].id);
                }}
                className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-[11px] font-semibold text-neutral-200 transition-colors"
              >
                <ChevronLeft size={13} />
                Prev Beam
              </button>
              <div className="text-[10px] font-mono px-3 py-0.5 rounded bg-amber-950/70 border border-amber-600/40 text-amber-300 font-bold whitespace-nowrap">
                {currentSoloBeam ? `Solo Beam #${currentSoloBeam}` : (stepBeams.length > 0 ? `${stepBeams.length} Beams in Step` : 'No Beams')}
              </div>
              <button
                disabled={stepBeams.length === 0}
                onClick={() => {
                  if (stepBeams.length === 0) return;
                  const nextIdx = (currentIdx === -1 || currentIdx >= stepBeams.length - 1) ? 0 : currentIdx + 1;
                  onSetSoloBeam(stepBeams[nextIdx].id);
                }}
                className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-[11px] font-semibold text-neutral-200 transition-colors"
              >
                Next Beam
                <ChevronRight size={13} />
              </button>
            </div>
          );
        })()}

        {/* 2-COLUMN VIEW: LEFT = CHECKED BEAMS | RIGHT = UNCHECKED BEAMS */}
        {(() => {
          // Identify beams SPECIFIC to current stage / step only (NO duplicates from previous steps):
          // Stage 3 (T3): Only Tap 3 beams [101, 102]
          // Stage 4 Step 1 (4.1): Outer beams [1..6]
          // Stage 4 Step 2 (4.2): Center Radial Wave (no new beams, wave controls in Tool 1)
          // Stage 4 Step 3 (4.3): Center Laser Bursts [7..12]
          // Stage 4 Step 4 (4.4): Shatter preview (all 14 beams)
          let relevantBeams = [];
          if (crackStage <= 2) {
            relevantBeams = [];
          } else if (crackStage === 3) {
            // In Tap 3: allow choosing and ordering ANY beam (defaults to 101, 102 but allows all)
            relevantBeams = LIGHT_BEAMS_LIST;
          } else if (crackStage === 4) {
            if (stepIndex === 1) {
              relevantBeams = LIGHT_BEAMS_LIST.filter(b => b.group === "Outer");
            } else if (stepIndex === 2) {
              relevantBeams = [];
            } else if (stepIndex === 3) {
              relevantBeams = LIGHT_BEAMS_LIST.filter(b => b.id >= 7 && b.id <= 11);
            } else if (stepIndex === 4) {
              relevantBeams = LIGHT_BEAMS_LIST.filter(b => b.id === 12);
            } else {
              relevantBeams = LIGHT_BEAMS_LIST;
            }
          }

          if (relevantBeams.length === 0) {
            return (
              <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-800 text-center space-y-1 my-1">
                <div className="text-[11px] font-bold text-emerald-400">
                  {crackStage === 4 && stepIndex === 2 ? 'Center Radial Wave Step' : 'No New Beams In This Step'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {crackStage === 4 && stepIndex === 2 
                    ? 'Previous beams (1 to 6) retain their locked angles. Use Tool 1 to adjust Radial Wave radius & toggle!'
                    : 'All previous beams keep their locked angles from earlier steps.'}
                </div>
              </div>
            );
          }

          const selectedBeams = relevantBeams.filter(b => activeBeams ? activeBeams.includes(b.id) : true);
          const unselectedBeams = relevantBeams.filter(b => activeBeams ? !activeBeams.includes(b.id) : false);

          const renderBeamItem = (beam, isChecked) => {
            const isSolo = currentSoloBeam === beam.id;
            const isPreviewOn = previewBeams.has(beam.id);
            const isViewing = isSolo || isPreviewOn;
            const isViewed = viewedBeams.has(beam.id);
            const hasNote = Boolean(beamNotes[beam.id]?.trim());
            const isEditingNote = editingNoteBeamId === beam.id;

            return (
              <div
                key={`beam-${beam.id}`}
                className={`rounded-lg border transition-all ${
                  isViewing
                    ? 'bg-amber-950/70 border-amber-500/90 text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50'
                    : isChecked
                    ? (isViewed 
                        ? 'bg-sky-950/40 border-sky-500/60 text-sky-100 shadow-[0_0_8px_rgba(14,165,233,0.18)]' 
                        : 'bg-emerald-950/40 border-emerald-500/50 hover:border-emerald-400 text-neutral-100 shadow-[0_0_6px_rgba(16,185,129,0.15)]')
                    : 'bg-neutral-950/60 border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewedBeams(prev => new Set(prev).add(beam.id));
                    setTuneTarget(beam.id);
                    // Tapping row turns light ON / OFF in preview & screen (does NOT uncheck from list)
                    onTogglePreviewBeam(beam.id);
                  }}
                  className="flex items-center justify-between p-1.5 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 overflow-hidden flex-1">
                    <span className={`text-[10px] font-mono font-bold w-5 h-5 flex-shrink-0 flex items-center justify-center rounded transition-all ${
                      isViewing
                        ? 'bg-amber-500 text-black font-extrabold shadow-[0_0_8px_#f59e0b]'
                        : isChecked 
                        ? (isViewed 
                            ? 'bg-sky-500 text-black font-bold shadow-[0_0_6px_rgba(14,165,233,0.6)]' 
                            : 'bg-emerald-900/90 text-emerald-300 border border-emerald-500/60')
                        : 'bg-neutral-800 text-neutral-400 border border-neutral-700/60'
                    }`}>
                      {beam.id}
                    </span>
                    <div className="truncate flex-1">
                      <div className="text-[10px] font-medium leading-tight truncate flex items-center gap-1">
                        <span className="truncate">{beam.name}</span>
                        {isViewing && (
                          <span className="text-[8px] px-1 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-600 font-sans font-bold animate-pulse">
                            ON
                          </span>
                        )}
                        {!isViewing && isViewed && (
                          <span className="text-[8px] px-1 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-700/60 font-sans font-semibold">
                            Viewed
                          </span>
                        )}
                      </div>
                      <div className="text-[8px] font-mono text-neutral-500">
                        {beam.delay}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-1">
                    {/* Note Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingNoteBeamId(isEditingNote ? null : beam.id);
                      }}
                      title={hasNote ? `Note: ${beamNotes[beam.id]}` : "Add test note"}
                      className={`p-1 rounded transition-colors ${
                        hasNote 
                          ? 'text-amber-400 bg-amber-950/80 border border-amber-600/40' 
                          : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <FileText size={11} />
                    </button>

                    {/* Dedicated Checkbox (Clicking this alone checks/unchecks into 3D Angle Tool) */}
                    <button
                      onClick={(e) => handleCheckboxToggle(e, beam.id)}
                      title={isChecked ? "Uncheck (remove from 3D Angle list)" : "Check (add to 3D Angle list)"}
                      className={`p-1 rounded transition-colors ${
                        isChecked ? 'text-emerald-400 hover:bg-neutral-800' : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {isChecked ? <CheckSquare size={14} /> : <Square size={14} />}
                    </button>
                  </div>
                </div>

                {/* Inline Note Box */}
                {(isEditingNote || hasNote) && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="px-2 pb-1.5 pt-1 border-t border-neutral-800/80 bg-neutral-950/60 rounded-b-lg"
                  >
                    <input
                      type="text"
                      value={beamNotes[beam.id] || ''}
                      onChange={(e) => handleUpdateNote(beam.id, e.target.value)}
                      placeholder="Add note..."
                      className="w-full bg-neutral-900 border border-neutral-700/80 rounded px-1.5 py-0.5 text-[9px] text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-sky-500 font-sans"
                    />
                  </div>
                )}
              </div>
            );
          };

          return (
            <div className="grid grid-cols-2 gap-2.5">
              {/* LEFT SIDE: CHECKED BEAMS */}
              <div className="bg-neutral-950/90 p-2 rounded-xl border border-emerald-500/40 flex flex-col">
                <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-emerald-900/50">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                    <CheckSquare size={11} /> Checked ({selectedBeams.length})
                  </span>
                  <span className="text-[8px] text-emerald-400/70 font-mono">
                    {crackStage === 3 ? 'T3 ACTIVE' : 'LEFT SIDE'}
                  </span>
                </div>
                {selectedBeams.length === 0 ? (
                  <div className="text-[10px] text-neutral-500 italic py-6 text-center">
                    No beams checked.<br/>Click on right side to add.
                  </div>
                ) : (
                  <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                    {selectedBeams.map((beam) => renderBeamItem(beam, true))}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: UNCHECKED BEAMS */}
              <div className="bg-neutral-950/40 p-2 rounded-xl border border-neutral-800 flex flex-col">
                <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-neutral-800">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1">
                    <Square size={11} /> Unchecked / Off ({unselectedBeams.length})
                  </span>
                  <span className="text-[8px] text-neutral-500 font-mono">
                    OFF
                  </span>
                </div>
                {unselectedBeams.length === 0 ? (
                  <div className="text-[10px] text-neutral-500 italic py-6 text-center">
                    {crackStage === 3 ? 'Both T3 Beams Active!' : 'All beams are currently checked!'}
                  </div>
                ) : (
                  <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                    {unselectedBeams.map((beam) => renderBeamItem(beam, false))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
        </>
        )}
      </motion.div>
      )}

      {/* ============================================================ */}
      {/* TOOL 3: 3D ANGLE & DIRECTION TUNER (DRAGGABLE) */}
      {/* Show Tool 3 strictly from Stage 3 (T3) onwards! */}
      {/* ============================================================ */}
      {crackStage >= 3 && (
        <motion.div
          ref={tool3Ref}
          drag
          dragMomentum={false}
          initial={pos3}
          animate={pos3}
          onDragEnd={(_, info) => handleDragEnd('pos3', info)}
          className={`fixed top-0 left-0 z-[9999] pointer-events-auto bg-neutral-900/95 backdrop-blur-md border border-cyan-500/50 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] text-white select-none font-sans text-xs transition-all ${
            minimizedTools[3] ? 'p-2 w-auto cursor-pointer hover:border-cyan-400 hover:scale-105' : 'p-3.5 w-80'
          }`}
          onClick={minimizedTools[3] ? () => toggleMinimize(3) : undefined}
        >
        {minimizedTools[3] ? (
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 flex items-center justify-center font-bold text-[11px]">
              T3
            </span>
            <div className="flex flex-col pr-1">
              <span className="text-[10px] font-bold text-cyan-300 leading-none">3D Angle Tuner</span>
              <span className="text-[8px] font-mono text-neutral-400 leading-tight">
                {tuneTarget === 'global' ? 'Global' : `Beam #${tuneTarget}`}
              </span>
            </div>
            <Maximize2 size={12} className="text-cyan-400" />
          </div>
        ) : (
          <>
        {/* Drag Handle Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-700/80 cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <GripHorizontal size={14} className="text-cyan-400" />
            <span className="font-bold tracking-wide text-cyan-300 text-[11px] flex items-center gap-1">
              <Compass size={12} /> 3. 3D ANGLE & DIRECTION
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Undo & Redo Controls */}
            <div className="flex items-center gap-0.5 bg-neutral-950 p-0.5 rounded-lg border border-neutral-800">
              <button
                onClick={onUndoBeamTransform}
                disabled={!canUndoTransforms || isCurrentStepLocked}
                title="Undo Angle/Spread change"
                className="p-1 rounded hover:bg-neutral-800 disabled:opacity-25 text-cyan-400 hover:text-cyan-200 transition-colors"
              >
                <Undo2 size={12} />
              </button>
              <button
                onClick={onRedoBeamTransform}
                disabled={!canRedoTransforms || isCurrentStepLocked}
                title="Redo Angle/Spread change"
                className="p-1 rounded hover:bg-neutral-800 disabled:opacity-25 text-cyan-400 hover:text-cyan-200 transition-colors"
              >
                <Redo2 size={12} />
              </button>
            </div>

            {/* Target Selector: Global vs Target Beam */}
            <div className="flex items-center gap-1 bg-neutral-950 p-0.5 rounded-lg border border-neutral-800">
              <button
                onClick={() => setTuneTarget('global')}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                  tuneTarget === 'global' ? 'bg-cyan-500 text-black shadow-[0_0_6px_#06b6d4]' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  const targetId = currentSoloBeam || (activeBeams && activeBeams[0]) || 1;
                  setTuneTarget(targetId);
                }}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                  tuneTarget !== 'global' ? 'bg-amber-500 text-black shadow-[0_0_6px_#f59e0b]' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tuneTarget !== 'global' ? `#${tuneTarget}` : 'Target'}
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize(3);
              }}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-cyan-300 transition-colors ml-0.5"
              title="Minimize Tool 3"
            >
              <Minimize2 size={12} />
            </button>
          </div>
        </div>

        {/* If target beam is active, show ONLY checked beams as multi-row wrapping / smoothly scrollable badges */}
        {tuneTarget !== 'global' && (() => {
          let stepBeams = [];
          if (crackStage <= 2) {
            stepBeams = [];
          } else if (crackStage === 3) {
            stepBeams = LIGHT_BEAMS_LIST; // Allow tuning target across all beams in Tap 3
          } else if (crackStage === 4) {
            if (stepIndex === 1) {
              stepBeams = LIGHT_BEAMS_LIST.filter(b => b.group === "Outer");
            } else if (stepIndex === 2) {
              stepBeams = [];
            } else if (stepIndex === 3) {
              stepBeams = LIGHT_BEAMS_LIST.filter(b => b.id >= 7 && b.id <= 11);
            } else if (stepIndex === 4) {
              stepBeams = LIGHT_BEAMS_LIST.filter(b => b.id === 12);
            } else {
              stepBeams = LIGHT_BEAMS_LIST;
            }
          }
          const availableTargetBeams = stepBeams.filter(b => activeBeams ? activeBeams.includes(b.id) : true);

          if (availableTargetBeams.length === 0) {
            return (
              <div className="text-[10px] text-neutral-500 italic mb-2 py-1 bg-neutral-950/60 rounded-lg px-2 border border-neutral-800 text-center">
                Check beams in Tool 2 to tune angles
              </div>
            );
          }

          return (
            <div className="mb-2">
              <div className="flex items-center justify-between text-[9px] text-neutral-400 mb-1 font-semibold uppercase tracking-wider">
                <span>Select Beam to Aim:</span>
                <span className="text-amber-400 font-mono font-bold">#{tuneTarget} Selected</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 max-h-20 overflow-y-auto p-1 bg-neutral-950/70 rounded-xl border border-neutral-800 scrollbar-thin scrollbar-thumb-neutral-700">
                {availableTargetBeams.map((b) => (
                  <button
                    key={`pill-${b.id}`}
                    onClick={() => setTuneTarget(b.id)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono whitespace-nowrap transition-all ${
                      tuneTarget === b.id 
                        ? 'bg-amber-500 text-black font-extrabold shadow-[0_0_8px_#f59e0b] scale-105' 
                        : 'bg-neutral-800/90 text-neutral-300 hover:text-white hover:bg-neutral-700 border border-neutral-700/60'
                    }`}
                  >
                    #{b.id}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Interactive 3D Gimbal / Joystick Pad */}
        <div className="bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-3">
          {/* Circular Joystick */}
          <div
            ref={joystickRef}
            onPointerDown={(e) => {
              if (isCurrentStepLocked) return;
              setIsDraggingJoystick(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              handleJoystickPointer(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (isDraggingJoystick && !isCurrentStepLocked) {
                handleJoystickPointer(e.clientX, e.clientY);
              }
            }}
            onPointerUp={(e) => {
              setIsDraggingJoystick(false);
              try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
            }}
            className={`w-18 h-18 rounded-full bg-neutral-900 border-2 border-dashed relative flex items-center justify-center select-none shadow-[inset_0_0_12px_rgba(0,0,0,0.8)] ${
              isCurrentStepLocked 
                ? 'border-neutral-700 opacity-40 cursor-not-allowed' 
                : 'border-cyan-500/40 cursor-crosshair'
            }`}
            title={isCurrentStepLocked ? "Step is locked" : "Drag joystick to rotate & direct light rays in 3D"}
          >
            {/* Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-800 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-800 pointer-events-none" />
            
            {/* Angle Indicator Line */}
            <div
              className="absolute w-1/2 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 origin-left left-1/2 top-1/2 pointer-events-none"
              style={{ transform: `translateY(-50%) rotate(${activeTransform.angle || 0}deg)` }}
            />

            {/* Draggable Knob positioned along angle ring */}
            <div
              className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 shadow-[0_0_8px_#06b6d4] flex items-center justify-center pointer-events-none transition-transform absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${activeTransform.angle || 0}deg) translateX(28px)`
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Precision Values & Sliders */}
          <div className="flex-1 space-y-1.5">
            {isCurrentStepLocked && (
              <div className="py-1 px-1.5 rounded-lg bg-amber-950/70 border border-amber-600/60 text-amber-300 text-[9px] font-semibold flex items-center gap-1">
                <Lock size={10} className="stroke-[2.5]" />
                <span>Locked! Unlock in Tool 2 to edit</span>
              </div>
            )}
            {/* Angle Slider */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                <span>Angle:</span>
                <span className="font-mono text-cyan-300 font-bold">{activeTransform.angle || 0}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                disabled={isCurrentStepLocked}
                value={activeTransform.angle || 0}
                onChange={(e) => onUpdateBeamTransform(tuneTarget, { angle: parseInt(e.target.value, 10) })}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>

            {/* Spread / Scale Width Slider */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                <span>Spread:</span>
                <span className="font-mono text-emerald-300 font-bold">{(activeTransform.scaleX || 1).toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="3.0"
                step="0.1"
                disabled={isCurrentStepLocked}
                value={activeTransform.scaleX || 1}
                onChange={(e) => onUpdateBeamTransform(tuneTarget, { 
                  scaleX: parseFloat(e.target.value), 
                  scaleY: parseFloat(e.target.value) 
                })}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>

            {/* Reset Target Button */}
            <div className="flex items-center justify-end pt-0.5">
              <button
                onClick={() => onResetBeamTransform(tuneTarget)}
                disabled={isCurrentStepLocked}
                className="text-[9px] text-neutral-400 hover:text-rose-400 disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors flex items-center gap-0.5"
              >
                <RotateCcw size={10} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Copy Beam Configuration Action Box with Locked Steps Badge */}
        <div className="mt-2 flex items-center gap-1.5">
          <button
            onClick={handleCopyConfiguration}
            className={`flex-1 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all text-[11px] ${
              copiedConfig 
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_#10b981]' 
                : 'bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
            }`}
          >
            {copiedConfig ? <Check size={14} /> : <Copy size={14} />}
            {copiedConfig ? "Config & Locked Steps Copied!" : `Copy Config (${totalLockedCount} Locked)`}
          </button>
          
          <button
            onClick={() => onResetBeamTransform('all')}
            title="Reset all angles & directions to default"
            className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Locked Steps Summary Bar */}
        {totalLockedCount > 0 && (
          <div className="mt-2 p-1.5 rounded-xl bg-amber-950/40 border border-amber-600/40 text-[9px]">
            <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
              <span className="flex items-center gap-1">
                <Lock size={10} /> Locked Steps: {totalLockedCount}
              </span>
              <button 
                onClick={() => {
                  setLockedSteps({});
                  localStorage.removeItem('loki_locked_steps');
                }}
                className="text-[8px] text-neutral-400 hover:text-rose-400 underline cursor-pointer"
              >
                Clear Locks
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(lockedSteps).map(([k, stepData]) => (
                <span 
                  key={k} 
                  className={`px-1.5 py-0.5 rounded text-[8px] font-mono border ${
                    k === currentStepKey 
                      ? 'bg-amber-500 text-black font-bold border-amber-400' 
                      : 'bg-neutral-900 text-amber-200/80 border-amber-900/60'
                  }`}
                >
                  {k === 'stage_3' ? 'T3' : `T4.${stepData.stepIndex}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between pt-2 mt-2 border-t border-neutral-800 text-[9px] text-neutral-500">
          <span>Draggable Modal</span>
          <span className="font-mono text-neutral-400">Shift + T</span>
        </div>
        </>
        )}
      </motion.div>
      )}

      {/* ============================================================ */}
      {/* TOOL 4: TIMELINE & ORDER SEQUENCER (DRAGGABLE) */}
      {/* Drag & Drop Reorder, Stage Assignments, Live Sync & Play Order */}
      {/* ============================================================ */}
      {crackStage >= 3 && (
        <motion.div
          ref={tool4Ref}
          drag
          dragMomentum={false}
          initial={pos4}
          animate={pos4}
          onDragEnd={(_, info) => handleDragEnd('pos4', info)}
          className={`fixed top-0 left-0 z-[9999] pointer-events-auto bg-neutral-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] text-white select-none font-sans text-xs scrollbar-thin scrollbar-thumb-neutral-700 transition-all ${
            minimizedTools[4] ? 'p-2 w-auto cursor-pointer hover:border-purple-400 hover:scale-105' : 'p-3.5 w-96 max-h-[84vh] overflow-y-auto'
          }`}
          onClick={minimizedTools[4] ? () => toggleMinimize(4) : undefined}
        >
        {minimizedTools[4] ? (
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/50 flex items-center justify-center font-bold text-[11px]">
              T4
            </span>
            <div className="flex flex-col pr-1">
              <span className="text-[10px] font-bold text-purple-300 leading-none">Timeline & Order</span>
              <span className="text-[8px] font-mono text-neutral-400 leading-tight">
                {isAutoPlaying ? 'PLAYING...' : 'Sequence Ready'}
              </span>
            </div>
            <Maximize2 size={12} className="text-purple-400" />
          </div>
        ) : (
          <>
          {/* Drag Handle Bar */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-700/80 cursor-grab active:cursor-grabbing sticky top-0 bg-neutral-900/95 z-10 pt-0.5">
            <div className="flex items-center gap-2">
              <GripHorizontal size={14} className="text-purple-400" />
              <span className="font-bold tracking-wide text-purple-300 text-[11px] flex items-center gap-1">
                <Clock size={12} /> 4. TIMELINE & ORDER SEQUENCER
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {/* PLAY BUTTON INSIDE TOOL 4 */}
              <button
                onClick={onToggleAutoPlay}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all text-[10px] font-bold ${
                  isAutoPlaying 
                    ? 'bg-amber-500 text-black shadow-[0_0_12px_#f59e0b] animate-pulse' 
                    : 'bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                }`}
                title={isAutoPlaying ? "Stop Sequence Play" : "Play Sequence Order (From Tap 3 to before Blast)"}
              >
                {isAutoPlaying ? <Pause size={11} className="stroke-[2.5]" /> : <Play size={11} className="fill-white" />}
                <span>{isAutoPlaying ? "PLAYING..." : "PLAY ORDER"}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMinimize(4);
                }}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-purple-300 transition-colors ml-0.5"
                title="Minimize Tool 4"
              >
                <Minimize2 size={12} />
              </button>
            </div>
          </div>

          {/* Radial Wave Master Timing Controls */}
          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-700/50 mb-3 space-y-2">
            <div className="flex items-center justify-between font-bold text-purple-300 text-[10px]">
              <span className="flex items-center gap-1">
                <Sparkles size={11} className="text-purple-400" /> Center Radial Wave Timing
              </span>
              <span className="font-mono text-purple-200 text-[9px]">
                {radialWaveConfig?.enabled !== false ? 'ACTIVE' : 'MUTED'}
              </span>
            </div>

            {/* Wave Start Delay */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                <span>Wave Start Delay:</span>
                <span className="font-mono text-purple-300 font-bold">{(radialWaveConfig?.delay !== undefined ? radialWaveConfig.delay : 0.8).toFixed(2)}s</span>
              </div>
              <input
                type="range"
                min="0"
                max="4.0"
                step="0.05"
                value={radialWaveConfig?.delay !== undefined ? radialWaveConfig.delay : 0.8}
                onChange={(e) => onUpdateRadialWaveConfig?.({ delay: parseFloat(e.target.value) })}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Wave Growth Duration */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                <span>Wave Swell Duration:</span>
                <span className="font-mono text-purple-300 font-bold">{(radialWaveConfig?.duration || 4.0).toFixed(2)}s</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={radialWaveConfig?.duration || 4.0}
                onChange={(e) => onUpdateRadialWaveConfig?.({ duration: parseFloat(e.target.value) })}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>
          </div>

          {/* Filter / Category Selector for quick stage grouping */}
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-800">
            <span className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
              <Layers size={11} /> Filter:
            </span>
            <div className="flex items-center gap-1">
              {[
                { key: 'active', label: 'Selected' },
                { key: 'all', label: 'All' },
                { key: '3', label: 'T3' },
                { key: '4.1', label: '4.1' },
                { key: '4.3', label: '4.3' },
                { key: '4.4', label: '4.4' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setTool4StageFilter(tab.key)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-colors ${
                    tool4StageFilter === tab.key
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Drag & Drop Reorderable List Header */}
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-purple-300/90 px-1 mb-1.5">
            <span className="flex items-center gap-1">
              <GripVertical size={11} /> Drag to Reorder Sequence
            </span>
            <span className="text-[9px] text-neutral-400 font-normal">
              Order: 1 to {orderedBeamIds.length}
            </span>
          </div>

          {/* Reorderable Beams List */}
          {(() => {
            // Compute filtered list so Reorder.Group values strictly match rendered children!
            // When tool4StageFilter === 'active', only display beams checked in Tool 2 (activeBeams)!
            const displayedBeamIds = orderedBeamIds.filter(beamId => {
              const b = LIGHT_BEAMS_LIST.find(item => item.id === beamId);
              if (!b) return false;
              if (tool4StageFilter === 'active') {
                return activeBeams ? activeBeams.includes(beamId) : true;
              }
              if (tool4StageFilter === '3') return b.group === 'Tap 3';
              if (tool4StageFilter === '4.1') return b.group === 'Outer';
              if (tool4StageFilter === '4.3') return b.id >= 7 && b.id <= 11;
              if (tool4StageFilter === '4.4') return b.id === 12;
              return true;
            });

            const currentStageBadge = crackStage === 3 
              ? 'T3' 
              : (crackStage === 4 ? `4.${stepIndex}` : 'T4');

            return (
              <Reorder.Group 
                axis="y" 
                values={displayedBeamIds} 
                onReorder={(newFilteredOrder) => {
                  // Merge new filtered order back into the master orderedBeamIds
                  const remaining = orderedBeamIds.filter(id => !displayedBeamIds.includes(id));
                  let filteredIdx = 0;
                  const merged = orderedBeamIds.map(id => {
                    if (displayedBeamIds.includes(id)) {
                      return newFilteredOrder[filteredIdx++];
                    }
                    return id;
                  });
                  setOrderedBeamIds(merged);
                  onUpdateTimelineConfig?.({ order: merged });
                }}
                className="space-y-1.5"
              >
                {displayedBeamIds.map((beamId, index) => {
                  const beam = LIGHT_BEAMS_LIST.find(b => b.id === beamId);
                  if (!beam) return null;
                  const isCheckedInStep = activeBeams && activeBeams.includes(beam.id);

                  return (
                    <ReorderableBeamRow
                      key={`reorder-beam-${beam.id}`}
                      beam={beam}
                      index={index}
                      timelineConfig={timelineConfig}
                      isCheckedInStep={isCheckedInStep}
                      onToggleBeam={onToggleBeam}
                      onUpdateTimelineConfig={onUpdateTimelineConfig}
                      currentStageBadge={currentStageBadge}
                    />
                  );
                })}
              </Reorder.Group>
            );
          })()}

          {/* Bottom Actions: Auto-Distribute Timings according to arranged order & Reset */}
          <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                // Auto calculate delays strictly matching user's arranged sequence order!
                // Starts at 0.0s for first beam, then increases naturally up to 3.5s
                const newDelays = {};
                const total = orderedBeamIds.length;
                orderedBeamIds.forEach((id, idx) => {
                  const calculatedDelay = (idx / Math.max(1, total - 1)) * 3.4;
                  newDelays[id] = parseFloat(calculatedDelay.toFixed(2));
                });
                onUpdateTimelineConfig?.({ delays: newDelays });
              }}
              className="text-[9px] px-2 py-1 rounded bg-purple-950/70 hover:bg-purple-900 border border-purple-600/50 text-purple-200 transition-colors flex items-center gap-1 font-semibold"
              title="Automatically set delays to play strictly 1-by-1 in the dragged order"
            >
              <Clock size={10} /> Auto-Sync Timing to Order
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('loki_timeline_config');
                const defaultOrder = LIGHT_BEAMS_LIST.map(b => b.id);
                setOrderedBeamIds(defaultOrder);
                onUpdateTimelineConfig?.({
                  order: defaultOrder,
                  delays: {
                    101: 0.00, 102: 0.03, 1: 0.65, 2: 1.20, 3: 1.75, 4: 2.20,
                    5: 2.55, 6: 2.85, 7: 3.05, 8: 3.18, 9: 3.28, 10: 3.36, 11: 3.42, 12: 3.48
                  },
                  durations: {
                    101: 0.10, 102: 0.10, 1: 0.25, 2: 0.25, 3: 0.22, 4: 0.20,
                    5: 0.18, 6: 0.14, 7: 0.10, 8: 0.08, 9: 0.08, 10: 0.07, 11: 0.06, 12: 0.06
                  }
                });
              }}
              className="text-[9px] text-neutral-400 hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <RotateCcw size={10} /> Reset Default
            </button>
          </div>
          </>
        )}
        </motion.div>
      )}
    </>
  );
}

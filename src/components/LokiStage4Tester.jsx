import React, { useState, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, X, CheckSquare, Square, Eye, FileText, CheckCircle2, Compass, Copy, Check } from 'lucide-react';

export const STAGE_4_STEPS = [
  { id: 1, name: "4.1: Edge & Corner Beams", desc: "Outer cracks emit light shafts (0.6s - 2.85s)" },
  { id: 2, name: "4.2: Center Radial Wave", desc: "Concentric white/emerald core wave swells from center" },
  { id: 3, name: "4.3: Center Laser Bursts", desc: "Central fissures burst mega high-speed beams (3.0s - 3.48s)" },
  { id: 4, name: "4.4: Shatter into Portal", desc: "Stage 5 Multiverse Portal Breach" },
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
  beamTransforms = {},
  onUpdateBeamTransform,
  onResetBeamTransform,
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

  const handleEyeClick = (e, beamId) => {
    e.stopPropagation();
    setViewedBeams(prev => new Set(prev).add(beamId));
    onSetSoloBeam(beamId);
  };

  const handleUpdateNote = (beamId, text) => {
    setBeamNotes(prev => ({
      ...prev,
      [beamId]: text
    }));
  };

  // Joystick pointer calculations
  const handleJoystickPointer = (clientX, clientY) => {
    if (!joystickRef.current || !onUpdateBeamTransform) return;
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    // Calculate angle in degrees (-180 to +180)
    const angleDeg = Math.round(Math.atan2(dy, dx) * (180 / Math.PI));
    // Calculate distance ratio (offset reach)
    const dist = Math.min(rect.width / 2, Math.sqrt(dx * dx + dy * dy));
    const reach = parseFloat((dist / (rect.width / 2)).toFixed(2));

    onUpdateBeamTransform(tuneTarget, {
      angle: angleDeg,
      offsetX: Math.round(dx * 0.4),
      offsetY: Math.round(dy * 0.4)
    });
  };

  const handleCopyConfiguration = () => {
    const configData = {
      timestamp: new Date().toLocaleTimeString(),
      checkedBeams: activeBeams || [],
      currentSoloBeam,
      tuneTarget,
      transforms: beamTransforms,
      notes: beamNotes
    };

    const formatted = JSON.stringify(configData, null, 2);
    navigator.clipboard.writeText(formatted).then(() => {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2200);
    });
  };
  return (
    <div className="fixed top-16 left-6 z-[9999] pointer-events-auto bg-neutral-900/95 backdrop-blur-md border border-emerald-500/50 rounded-2xl p-4 shadow-[0_0_35px_rgba(16,185,129,0.35)] text-white w-80 max-h-[88vh] overflow-y-auto select-none font-sans text-xs scrollbar-thin scrollbar-thumb-neutral-700">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-700/80 sticky top-0 bg-neutral-900/95 z-10 pt-0.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="font-bold tracking-wide text-emerald-300">LOKI STAGE & BEAM TESTER</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          title="Close (Shift+T)"
        >
          <X size={15} />
        </button>
      </div>

      {/* Main Stage Selectors */}
      <div className="mb-3">
        <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
          Main Stages (0 - 5)
        </div>
        <div className="grid grid-cols-6 gap-1">
          {[0, 1, 2, 3, 4, 5].map((stg) => (
            <button
              key={`stg-${stg}`}
              onClick={() => onSetCrackStage(stg)}
              className={`py-1.5 rounded-lg font-bold transition-all text-xs ${
                crackStage === stg 
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_#10b981]' 
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
              }`}
            >
              {stg === 0 ? 'Off' : (stg === 5 ? 'Portal' : `T${stg}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Tap 4 Sub-Step Stepper */}
      <div className="mb-3 pt-2.5 border-t border-neutral-800">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
            Stage 4 Breakdown
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-mono">
            Step {stepIndex} / {STAGE_4_STEPS.length}
          </span>
        </div>

        <div className="bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800 mb-2">
          <div className="font-semibold text-emerald-300 text-xs">
            {STAGE_4_STEPS[stepIndex - 1]?.name}
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
            {STAGE_4_STEPS[stepIndex - 1]?.desc}
          </div>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSetStepIndex(Math.max(1, stepIndex - 1))}
            disabled={stepIndex <= 1}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 transition-colors font-medium text-xs"
          >
            <ChevronLeft size={14} />
            Prev
          </button>
          <button
            onClick={onToggleAutoPlay}
            className={`px-3 py-1.5 rounded-lg flex items-center justify-center transition-colors ${
              isAutoPlaying 
                ? 'bg-amber-500 text-black font-semibold shadow-[0_0_10px_#f59e0b]' 
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
            }`}
            title={isAutoPlaying ? "Pause Auto-play" : "Play Continuous Sequence"}
          >
            {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={() => onSetStepIndex(Math.min(STAGE_4_STEPS.length, stepIndex + 1))}
            disabled={stepIndex >= STAGE_4_STEPS.length}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 transition-colors font-medium text-xs"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* NEW TOOL: INDIVIDUAL LIGHT BEAMS CONTROLLER (BOTTOM OF PANEL) */}
      {/* ============================================================ */}
      <div className="pt-2.5 border-t border-neutral-800">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
            <span>⚡</span> Light Beams Selector ({LIGHT_BEAMS_LIST.length})
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={onSelectAllBeams}
              className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              All
            </button>
            <button
              onClick={onDeselectAllBeams}
              className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Solo Beam Stepper: Prev / Next */}
        <div className="flex items-center gap-1.5 mb-2.5 bg-neutral-950/80 p-1.5 rounded-xl border border-neutral-800">
          <button
            onClick={() => {
              const current = currentSoloBeam || 1;
              const prev = current <= 1 ? LIGHT_BEAMS_LIST.length : current - 1;
              onSetSoloBeam(prev);
            }}
            className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-200 transition-colors"
          >
            <ChevronLeft size={13} />
            Prev Beam
          </button>
          <div className="text-[10px] font-mono px-2 py-1 rounded bg-amber-950/70 border border-amber-600/40 text-amber-300 font-bold whitespace-nowrap">
            {currentSoloBeam ? `#${currentSoloBeam}` : 'Custom'}
          </div>
          <button
            onClick={() => {
              const current = currentSoloBeam || 0;
              const next = current >= LIGHT_BEAMS_LIST.length ? 1 : current + 1;
              onSetSoloBeam(next);
            }}
            className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-200 transition-colors"
          >
            Next Beam
            <ChevronRight size={13} />
          </button>
        </div>

        {/* List of 14 Light Beams with individual checkboxes & sequence number */}
        {/* Selected beams pinned to the top in a distinct highlight container */}
        {(() => {
          const selectedBeams = LIGHT_BEAMS_LIST.filter(b => activeBeams ? activeBeams.includes(b.id) : true);
          const unselectedBeams = LIGHT_BEAMS_LIST.filter(b => activeBeams ? !activeBeams.includes(b.id) : false);

          const renderBeamItem = (beam, isChecked) => {
            const isSolo = currentSoloBeam === beam.id;
            const isViewed = viewedBeams.has(beam.id);
            const hasNote = Boolean(beamNotes[beam.id]?.trim());
            const isEditingNote = editingNoteBeamId === beam.id;

            return (
              <div
                key={`beam-${beam.id}`}
                className={`rounded-lg border transition-all ${
                  isSolo
                    ? 'bg-amber-950/70 border-amber-500/90 text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50'
                    : isViewed
                    ? 'bg-sky-950/40 border-sky-500/60 text-sky-100 shadow-[0_0_8px_rgba(14,165,233,0.18)]'
                    : isChecked
                    ? 'bg-emerald-950/40 border-emerald-500/50 hover:border-emerald-400 text-neutral-100 shadow-[0_0_6px_rgba(16,185,129,0.15)]'
                    : 'bg-neutral-950/50 border-neutral-800/80 text-neutral-500 opacity-60 hover:opacity-100'
                }`}
              >
                <div 
                  onClick={() => onToggleBeam(beam.id)}
                  className="flex items-center justify-between p-1.5 cursor-pointer"
                >
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <span className={`text-[10px] font-mono font-bold w-5 h-5 flex items-center justify-center rounded transition-all ${
                      isSolo
                        ? 'bg-amber-500 text-black font-extrabold shadow-[0_0_6px_#f59e0b]'
                        : isViewed
                        ? 'bg-sky-500 text-black font-bold shadow-[0_0_6px_rgba(14,165,233,0.6)]'
                        : isChecked 
                        ? 'bg-emerald-900/90 text-emerald-300 border border-emerald-500/60' 
                        : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {beam.id}
                    </span>
                    <div className="truncate flex-1">
                      <div className="text-[11px] font-medium leading-tight truncate flex items-center gap-1.5">
                        <span className="truncate">{beam.name}</span>
                        {isViewed && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-sky-900/80 text-sky-300 border border-sky-600/50 flex items-center gap-0.5 font-sans font-semibold">
                            <CheckCircle2 size={9} /> Viewed
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] text-neutral-400 font-mono">
                        {beam.delay} • {beam.origin}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 pl-2">
                    {/* Note Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingNoteBeamId(isEditingNote ? null : beam.id);
                      }}
                      title={hasNote ? `Note: ${beamNotes[beam.id]}` : "Add test note for this beam"}
                      className={`p-1 rounded transition-colors ${
                        hasNote 
                          ? 'text-amber-400 bg-amber-950/80 border border-amber-600/40' 
                          : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <FileText size={12} />
                    </button>

                    {/* Eye Solo Button */}
                    <button
                      onClick={(e) => handleEyeClick(e, beam.id)}
                      title={isSolo ? "Turn Off Solo Preview" : "Preview this beam (Solo View & Marks as Viewed)"}
                      className={`p-1 rounded transition-all ${
                        isSolo 
                          ? 'bg-amber-500 text-black shadow-[0_0_8px_#f59e0b]' 
                          : isViewed
                          ? 'text-sky-300 hover:text-amber-300 hover:bg-neutral-800'
                          : 'text-neutral-500 hover:text-amber-300 hover:bg-neutral-800'
                      }`}
                    >
                      <Eye size={13} />
                    </button>

                    {/* Checkbox */}
                    <div className={isChecked ? 'text-emerald-400' : 'text-neutral-600'}>
                      {isChecked ? <CheckSquare size={14} /> : <Square size={14} />}
                    </div>
                  </div>
                </div>

                {/* Inline Note Box */}
                {(isEditingNote || hasNote) && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="px-2 pb-2 pt-1 border-t border-neutral-800/80 bg-neutral-950/60 rounded-b-lg"
                  >
                    <input
                      type="text"
                      value={beamNotes[beam.id] || ''}
                      onChange={(e) => handleUpdateNote(beam.id, e.target.value)}
                      placeholder="Add note (e.g. good / angle too wide / remove)..."
                      className="w-full bg-neutral-900 border border-neutral-700/80 rounded px-2 py-1 text-[10px] text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-sky-500 font-sans"
                    />
                  </div>
                )}
              </div>
            );
          };

          return (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {/* PINNED CHECKED BEAMS SECTION (TOP) */}
              <div className="bg-neutral-950/90 p-2 rounded-xl border border-emerald-500/40">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-emerald-900/50">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                    <CheckSquare size={11} /> Active / Checked Beams ({selectedBeams.length})
                  </span>
                  {selectedBeams.length > 0 && (
                    <span className="text-[9px] text-emerald-300 font-mono">
                      {selectedBeams.map(b => `#${b.id}`).join(', ')}
                    </span>
                  )}
                </div>
                {selectedBeams.length === 0 ? (
                  <div className="text-[10px] text-neutral-500 italic py-1 text-center">
                    No beams checked. Click below to add.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {selectedBeams.map((beam) => renderBeamItem(beam, true))}
                  </div>
                )}
              </div>

              {/* UNCHECKED BEAMS SECTION (REMAINING) */}
              {unselectedBeams.length > 0 && (
                <div className="bg-neutral-950/40 p-2 rounded-xl border border-neutral-800">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5 flex items-center gap-1">
                    <Square size={11} /> Inactive / Unchecked ({unselectedBeams.length})
                  </div>
                  <div className="space-y-1">
                    {unselectedBeams.map((beam) => renderBeamItem(beam, false))}
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* ============================================================ */}
      {/* 3D DIRECTION & ANGLE TUNER (JOYSTICK + SLIDERS + COPY CONFIG) */}
      {/* ============================================================ */}
      <div className="pt-2.5 mt-2.5 border-t border-neutral-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
            <Compass size={13} className="text-cyan-400" /> 3D Beam Angle & Direction
          </span>
          {/* Target Selector: Global vs Current Selected Beam */}
          <div className="flex items-center gap-1 bg-neutral-950 p-0.5 rounded-lg border border-neutral-800">
            <button
              onClick={() => setTuneTarget('global')}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors ${
                tuneTarget === 'global' ? 'bg-cyan-500 text-black shadow-[0_0_6px_#06b6d4]' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All Beams
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
              {tuneTarget !== 'global' ? `Beam #${tuneTarget}` : 'Target Beam'}
            </button>
          </div>
        </div>

        {/* If target beam is active, show target quick selector pills */}
        {tuneTarget !== 'global' && (
          <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1 scrollbar-none">
            {LIGHT_BEAMS_LIST.map((b) => (
              <button
                key={`pill-${b.id}`}
                onClick={() => setTuneTarget(b.id)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-mono whitespace-nowrap transition-colors ${
                  tuneTarget === b.id 
                    ? 'bg-amber-500 text-black font-bold shadow-[0_0_6px_#f59e0b]' 
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                #{b.id}
              </button>
            ))}
          </div>
        )}

        {/* Interactive 3D Gimbal / Joystick Pad */}
        <div className="bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-3">
          {/* Circular Joystick */}
          <div
            ref={joystickRef}
            onPointerDown={(e) => {
              setIsDraggingJoystick(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              handleJoystickPointer(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (isDraggingJoystick) {
                handleJoystickPointer(e.clientX, e.clientY);
              }
            }}
            onPointerUp={(e) => {
              setIsDraggingJoystick(false);
              try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
            }}
            className="w-20 h-20 rounded-full bg-neutral-900 border-2 border-dashed border-cyan-500/40 relative flex items-center justify-center cursor-crosshair select-none shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]"
            title="Drag joystick to rotate & direct light rays in 3D"
          >
            {/* Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-800 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-800 pointer-events-none" />
            
            {/* Angle Indicator Line */}
            <div
              className="absolute w-1/2 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 origin-left left-1/2 top-1/2 pointer-events-none"
              style={{ transform: `translateY(-50%) rotate(${activeTransform.angle || 0}deg)` }}
            />

            {/* Draggable Knob */}
            <div
              className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 shadow-[0_0_10px_#06b6d4] flex items-center justify-center pointer-events-none transition-transform"
              style={{
                transform: `translate(${(activeTransform.offsetX || 0) * 0.6}px, ${(activeTransform.offsetY || 0) * 0.6}px)`
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Precision Values & Sliders */}
          <div className="flex-1 space-y-2">
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
                value={activeTransform.angle || 0}
                onChange={(e) => onUpdateBeamTransform(tuneTarget, { angle: parseInt(e.target.value, 10) })}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Spread / Scale Width Slider */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                <span>Spread / Width:</span>
                <span className="font-mono text-emerald-300 font-bold">{(activeTransform.scaleX || 1).toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="3.0"
                step="0.1"
                value={activeTransform.scaleX || 1}
                onChange={(e) => onUpdateBeamTransform(tuneTarget, { 
                  scaleX: parseFloat(e.target.value), 
                  scaleY: parseFloat(e.target.value) 
                })}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Reset Target Button */}
            <div className="flex items-center justify-end pt-0.5">
              <button
                onClick={() => onResetBeamTransform(tuneTarget)}
                className="text-[9px] text-neutral-400 hover:text-rose-400 transition-colors flex items-center gap-0.5"
              >
                <RotateCcw size={10} /> Reset Angle
              </button>
            </div>
          </div>
        </div>

        {/* Copy Beam Configuration Action Box */}
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
            {copiedConfig ? "Config Copied! Send to Assistant" : "Copy Live Beam Angles & Config"}
          </button>
          
          <button
            onClick={() => onResetBeamTransform('all')}
            title="Reset all angles & directions to default"
            className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-neutral-800 text-[10px] text-neutral-400">
        <span>Toggle Shortcut:</span>
        <span className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300 border border-neutral-700">
          Shift + T
        </span>
      </div>
    </div>
  );
}

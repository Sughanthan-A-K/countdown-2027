import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GripHorizontal, X, RotateCcw, CheckSquare, Square, Eye, EyeOff, Sliders, Sparkles, Lock, Check, Copy } from 'lucide-react';

export const LIGHT_BEAMS_LIST = [
  // Outer Beams (1 to 6)
  { id: 1, name: "1. Upper-Left Corner Beam", group: "Outer", origin: "Top-Left (45,108)" },
  { id: 2, name: "2. Blade Beam Mid-Right", group: "Outer", origin: "Right Edge (182,148)" },
  { id: 3, name: "3. Upper-Right Corner Gap", group: "Outer", origin: "Top-Right (200,5)" },
  { id: 4, name: "4. Lower-Right Corner Beam", group: "Outer", origin: "Bottom-Right (126,274)" },
  { id: 5, name: "5. Bottom-Left Corner Gap", group: "Outer", origin: "Bottom-Left (0,400)" },
  { id: 6, name: "6. South Spine Off-Center", group: "Outer", origin: "Bottom-Center (102,400)" },

  // Center & Climax Beams (101, 102, 7 to 12)
  { id: 101, name: "7. Tap 3 Beam 1: Upper-Right", group: "Center", origin: "Center Seam (102,185)" },
  { id: 102, name: "8. Tap 3 Beam 2: Lower-Left", group: "Center", origin: "Spine Seam (102,185)" },
  { id: 7, name: "9. Upper Center Spine Fissure", group: "Center", origin: "Center-Up (92,122)" },
  { id: 8, name: "10. Steep Upward Top Spine", group: "Center", origin: "Top-Spine (108,78)" },
  { id: 9, name: "11. Left Center Fissure", group: "Center", origin: "Mid-Left (64,146)" },
  { id: 10, name: "12. Center Fissure Red Line 1", group: "Center", origin: "Center-Spine (102,185)" },
  { id: 11, name: "13. Center Fissure Red Line 5", group: "Center", origin: "Mid-Right (155,210)" },
  { id: 12, name: "14. Final Mega Central Climax", group: "Center", origin: "Central Hub Laser" },
];

export default function LokiLightMasterToolbox({
  checkedBeams,
  onToggleCheckBeam,
  activePreviewBeams,
  onTogglePreviewBeam,
  onAllPreviewOn,
  onAllPreviewOff,
  beamTransforms,
  onUpdateBeamTransform,
  onResetBeamTransform,
  circleRadius,
  onChangeCircleRadius,
  onLockConfiguration,
  onClose
}) {
  // Target beam for Angle & Spread tuning: defaults to first checked beam or 1
  const [tuneTarget, setTuneTarget] = useState(1);
  const [isLockedSuccess, setIsLockedSuccess] = useState(false);
  const [isCopiedSuccess, setIsCopiedSuccess] = useState(false);
  const joystickRef = useRef(null);
  const [isDraggingJoystick, setIsDraggingJoystick] = useState(false);

  const [panelPos, setPanelPos] = useState(() => {
    try {
      const saved = localStorage.getItem('loki_single_toolbox_pos');
      return saved ? JSON.parse(saved) : { x: 20, y: 70 };
    } catch (_) {
      return { x: 20, y: 70 };
    }
  });

  const activeT = beamTransforms?.[tuneTarget] || { angle: 0, scaleX: 1, offsetX: 0, offsetY: 0 };
  const targetBeamObj = LIGHT_BEAMS_LIST.find(b => b.id === tuneTarget) || LIGHT_BEAMS_LIST[0];

  // 2-Column separation:
  // LEFT COLUMN = CHECKED BEAMS (Final chosen lights)
  // RIGHT COLUMN = UNCHECKED BEAMS
  const checkedList = LIGHT_BEAMS_LIST.filter(b => checkedBeams?.includes(b.id));
  const uncheckedList = LIGHT_BEAMS_LIST.filter(b => !checkedBeams?.includes(b.id));

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
      angle: angleDeg,
      offsetX: Math.round(dx * 0.4),
      offsetY: Math.round(dy * 0.4)
    });
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDraggingJoystick) return;
      handleJoystickPointer(e.clientX, e.clientY);
    };
    const handlePointerUp = () => {
      if (isDraggingJoystick) setIsDraggingJoystick(false);
    };

    if (isDraggingJoystick) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingJoystick, tuneTarget]);

  // Copy all checked light angles and configuration to clipboard
  const handleCopyConfig = () => {
    const configToExport = {
      checkedBeams: checkedBeams || [],
      circleRadius: circleRadius,
      beamAngles: (checkedBeams || []).map(beamId => {
        const b = LIGHT_BEAMS_LIST.find(item => item.id === beamId);
        const t = beamTransforms?.[beamId] || { angle: 0, scaleX: 1 };
        return {
          id: beamId,
          name: b?.name || `Beam ${beamId}`,
          angle: t.angle || 0,
          spread: t.scaleX || 1
        };
      }),
      rawTransforms: beamTransforms || {}
    };

    const text = JSON.stringify(configToExport, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopiedSuccess(true);
        setTimeout(() => setIsCopiedSuccess(false), 2200);
      });
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={panelPos}
      animate={panelPos}
      onDragEnd={(_, info) => {
        const nextPos = {
          x: Math.round(panelPos.x + info.offset.x),
          y: Math.round(panelPos.y + info.offset.y)
        };
        setPanelPos(nextPos);
        localStorage.setItem('loki_single_toolbox_pos', JSON.stringify(nextPos));
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-auto w-[360px] max-w-[95vw] bg-neutral-900/95 backdrop-blur-md border border-emerald-500/60 rounded-2xl shadow-[0_0_35px_rgba(16,185,129,0.35)] text-white select-none font-sans text-xs p-3.5 space-y-3"
    >
      {/* Title Header with Close */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-700/80 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <GripHorizontal size={14} className="text-emerald-400" />
          <span className="font-bold tracking-wide text-emerald-300 text-[11px] uppercase">
            Climax Light Master Studio
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          title="Close Toolbox (Checked lights remain locked!)"
        >
          <X size={14} />
        </button>
      </div>

      {/* Global Quick Action Bar: All ON / All OFF + Lock Button */}
      <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onAllPreviewOn}
            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-600/50 transition-colors"
          >
            ALL ON
          </button>
          <button
            onClick={onAllPreviewOff}
            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            ALL OFF
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* COPY CONFIG BUTTON */}
          <button
            onClick={handleCopyConfig}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
              isCopiedSuccess
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_#06b6d4]'
                : 'bg-neutral-800 text-cyan-300 border-cyan-500/40 hover:bg-neutral-700 hover:text-white'
            }`}
            title="Copy all checked lights and their tuned angles to clipboard"
          >
            {isCopiedSuccess ? <Check size={11} /> : <Copy size={11} />}
            <span>{isCopiedSuccess ? 'COPIED!' : 'COPY ANGLES'}</span>
          </button>

          {/* Master LOCK Button */}
          <button
            onClick={() => {
              onLockConfiguration?.();
              setIsLockedSuccess(true);
              setTimeout(() => setIsLockedSuccess(false), 2200);
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
              isLockedSuccess
                ? 'bg-emerald-500 text-black shadow-[0_0_12px_#10b981]'
                : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
            }`}
            title="Lock selected checked lights and their angles permanently into normal card flow"
          >
            {isLockedSuccess ? <Check size={12} /> : <Lock size={12} />}
            <span>{isLockedSuccess ? 'LOCKED!' : 'LOCK & SAVE'}</span>
          </button>
        </div>
      </div>

      {/* 3D DIRECTION & ANGLE TUNER (Physical Seam Anchored) */}
      <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-cyan-500/40 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-bold">
          <span className="text-cyan-300 flex items-center gap-1">
            <Sliders size={12} className="text-cyan-400" /> Light Direction & Angle
          </span>
          <span className="text-cyan-200 font-mono text-[9px] truncate max-w-[170px]">
            Target: {targetBeamObj.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Circular 3D Joystick Compass */}
          <div
            ref={joystickRef}
            onPointerDown={(e) => {
              setIsDraggingJoystick(true);
              handleJoystickPointer(e.clientX, e.clientY);
            }}
            className="relative w-16 h-16 rounded-full bg-neutral-900 border-2 border-cyan-500/50 flex items-center justify-center cursor-crosshair select-none shadow-[inset_0_0_12px_rgba(0,0,0,0.8)] shrink-0"
            title="Drag joystick to aim beam direction around crack seam anchor"
          >
            {/* Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-800 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-800 pointer-events-none" />
            
            {/* Angle Indicator Line */}
            <div
              className="absolute w-1/2 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 origin-left left-1/2 top-1/2 pointer-events-none"
              style={{ transform: `translateY(-50%) rotate(${activeT.angle || 0}deg)` }}
            />

            {/* Draggable Knob */}
            <div
              className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-300 shadow-[0_0_8px_#06b6d4] flex items-center justify-center pointer-events-none"
              style={{
                transform: `translate(${(activeT.offsetX || 0) * 0.5}px, ${(activeT.offsetY || 0) * 0.5}px)`
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Precision Sliders */}
          <div className="flex-1 space-y-1.5">
            {/* Angle Slider */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                <span>Angle:</span>
                <span className="font-mono text-cyan-300 font-bold">{activeT.angle || 0}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                value={activeT.angle || 0}
                onChange={(e) => onUpdateBeamTransform?.(tuneTarget, { angle: parseInt(e.target.value, 10) })}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Width / Spread Slider */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
                <span>Spread:</span>
                <span className="font-mono text-emerald-300 font-bold">{(activeT.scaleX || 1).toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="3.0"
                step="0.1"
                value={activeT.scaleX || 1}
                onChange={(e) => onUpdateBeamTransform?.(tuneTarget, { scaleX: parseFloat(e.target.value) })}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Reset Button */}
            <div className="flex justify-end">
              <button
                onClick={() => onResetBeamTransform?.(tuneTarget)}
                className="text-[9px] text-neutral-400 hover:text-rose-400 transition-colors flex items-center gap-0.5"
              >
                <RotateCcw size={9} /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER RADIAL WAVE / CIRCLE CONTROLS */}
      <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-600/40 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-bold text-purple-300">
          <span className="flex items-center gap-1">
            <Sparkles size={11} className="text-purple-400" /> Center Expanding Circle (Radial Wave)
          </span>
          <span className="font-mono text-purple-200 text-[10px]">{circleRadius}px</span>
        </div>
        <input
          type="range"
          min="40"
          max="360"
          step="5"
          value={circleRadius}
          onChange={(e) => onChangeCircleRadius?.(parseInt(e.target.value, 10))}
          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
        />
      </div>

      {/* 2-COLUMN VIEW: LEFT = CHECKED BEAMS | RIGHT = UNCHECKED BEAMS */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 px-1">
          <span>Check to move Right ➔ Left</span>
          <span className="text-[9px] text-emerald-400 font-mono">
            {checkedList.length}/14 Final
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* LEFT SIDE: CHECKED BEAMS (Final chosen lights) */}
          <div className="bg-neutral-950/90 p-2 rounded-xl border border-emerald-500/50 flex flex-col min-h-[160px]">
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-emerald-900/60">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                <CheckSquare size={11} /> Checked ({checkedList.length})
              </span>
              <span className="text-[8px] text-emerald-400/80 font-mono font-bold">LEFT</span>
            </div>

            {checkedList.length === 0 ? (
              <div className="text-[10px] text-neutral-500 italic py-6 text-center">
                No lights checked.<br />Check lights on Right ➔ to add!
              </div>
            ) : (
              <div className="space-y-1 max-h-[190px] overflow-y-auto pr-0.5 custom-scrollbar">
                {checkedList.map((beam) => {
                  const isVisibleNow = activePreviewBeams?.includes(beam.id);
                  const isTuningThis = tuneTarget === beam.id;

                  return (
                    <div
                      key={`checked-${beam.id}`}
                      onClick={() => setTuneTarget(beam.id)}
                      className={`p-1.5 rounded-lg border text-[10px] cursor-pointer transition-all flex items-center justify-between ${
                        isTuningThis
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)] text-white'
                          : 'bg-emerald-950/30 border-emerald-600/40 text-neutral-200 hover:border-emerald-500/70'
                      }`}
                    >
                      {/* Checkbox button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCheckBeam(beam.id);
                        }}
                        className="p-0.5 text-emerald-400 hover:text-rose-400 transition-colors"
                        title="Uncheck to move back to Right"
                      >
                        <CheckSquare size={13} />
                      </button>

                      <div className="flex-1 mx-1 truncate font-semibold leading-tight">
                        {beam.name}
                      </div>

                      {/* Tap light ON/OFF button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePreviewBeam(beam.id);
                          setTuneTarget(beam.id);
                        }}
                        className={`p-1 rounded-md transition-colors ${
                          isVisibleNow
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                            : 'bg-neutral-800 text-neutral-500 hover:text-neutral-300'
                        }`}
                        title={isVisibleNow ? 'Light is ON (Click to turn OFF)' : 'Light is OFF (Click to turn ON)'}
                      >
                        {isVisibleNow ? <Eye size={11} /> : <EyeOff size={11} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: UNCHECKED BEAMS */}
          <div className="bg-neutral-950/60 p-2 rounded-xl border border-neutral-800 flex flex-col min-h-[160px]">
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-neutral-800">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1">
                <Square size={11} /> Unchecked ({uncheckedList.length})
              </span>
              <span className="text-[8px] text-neutral-500 font-mono">RIGHT</span>
            </div>

            {uncheckedList.length === 0 ? (
              <div className="text-[10px] text-neutral-500 italic py-6 text-center">
                All 14 lights checked on Left!
              </div>
            ) : (
              <div className="space-y-1 max-h-[190px] overflow-y-auto pr-0.5 custom-scrollbar">
                {uncheckedList.map((beam) => {
                  const isVisibleNow = activePreviewBeams?.includes(beam.id);
                  const isTuningThis = tuneTarget === beam.id;

                  return (
                    <div
                      key={`unchecked-${beam.id}`}
                      onClick={() => setTuneTarget(beam.id)}
                      className={`p-1.5 rounded-lg border text-[10px] cursor-pointer transition-all flex items-center justify-between ${
                        isTuningThis
                          ? 'bg-cyan-950/50 border-cyan-500 text-white shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                          : 'bg-neutral-900/60 border-neutral-800/80 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {/* Checkbox button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCheckBeam(beam.id);
                        }}
                        className="p-0.5 text-neutral-500 hover:text-emerald-400 transition-colors"
                        title="Check to move to Left (Checked)"
                      >
                        <Square size={13} />
                      </button>

                      <div className="flex-1 mx-1 truncate font-medium leading-tight">
                        {beam.name}
                      </div>

                      {/* Tap light ON/OFF button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePreviewBeam(beam.id);
                          setTuneTarget(beam.id);
                        }}
                        className={`p-1 rounded-md transition-colors ${
                          isVisibleNow
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                            : 'bg-neutral-800 text-neutral-500 hover:text-neutral-300'
                        }`}
                        title={isVisibleNow ? 'Light is ON (Click to turn OFF)' : 'Light is OFF (Click to turn ON)'}
                      >
                        {isVisibleNow ? <Eye size={11} /> : <EyeOff size={11} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-1.5 border-t border-neutral-800 text-[9px] text-neutral-400 flex items-center justify-between">
        <span>Click row to select angle target</span>
        <span className="font-mono text-emerald-400 font-bold">Shift + T</span>
      </div>
    </motion.div>
  );
}
